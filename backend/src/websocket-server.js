import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { getIO, broadcastRiderLocation, broadcastOrderStatusChange } from './services/socket.js';

class WebSocketBridge {
    constructor() {
        this.wss = null;
        this.clients = new Map(); // clientId -> { socket, userId, role, orderId }
        this.orderClients = new Map(); // orderId -> Set of clientIds
    }

    initialize(server) {
        // Create WebSocket server on a different port or attach to existing HTTP server
        this.wss = new WebSocketServer({ 
            port: process.env.WS_PORT || 3001,
            path: '/tracking'
        });

        console.log(`🔌 WebSocket Bridge server started on port ${process.env.WS_PORT || 3001}`);

        this.wss.on('connection', (ws, req) => {
            console.log('🔌 New WebSocket connection attempt');
            
            // Extract orderId from URL
            const urlParts = req.url.split('/');
            const orderId = urlParts[urlParts.length - 1];
            
            if (!orderId || isNaN(orderId)) {
                console.log('❌ Invalid order ID in connection request');
                ws.close(1003, 'Invalid order ID');
                return;
            }

            // Generate client ID
            const clientId = this.generateClientId();
            
            // Store client with temporary auth status
            this.clients.set(clientId, {
                socket: ws,
                userId: null,
                role: null,
                orderId: parseInt(orderId),
                isAuthenticated: false
            });

            // Add to order room
            if (!this.orderClients.has(orderId)) {
                this.orderClients.set(orderId, new Set());
            }
            this.orderClients.get(orderId).add(clientId);

            console.log(`👤 Client ${clientId} connected for order ${orderId}`);

            // Handle messages from client
            ws.on('message', (message) => {
                this.handleMessage(clientId, message);
            });

            // Handle client disconnect
            ws.on('close', () => {
                this.handleDisconnect(clientId);
            });

            // Handle errors
            ws.on('error', (error) => {
                console.error(`❌ WebSocket error for client ${clientId}:`, error);
                this.handleDisconnect(clientId);
            });

            // Send welcome message
            this.sendToClient(clientId, {
                type: 'connection_established',
                clientId,
                orderId: parseInt(orderId),
                timestamp: new Date().toISOString()
            });
        });

        // Periodic cleanup of disconnected clients
        setInterval(() => {
            this.cleanupDisconnectedClients();
        }, 30000); // Every 30 seconds
    }

    generateClientId() {
        return Math.random().toString(36).substr(2, 9);
    }

    handleMessage(clientId, message) {
        const client = this.clients.get(clientId);
        if (!client) return;

        try {
            const data = JSON.parse(message);
            console.log(`📨 Message from client ${clientId}:`, data.type);

            switch (data.type) {
                case 'authenticate':
                    this.handleAuthentication(clientId, data.token);
                    break;
                case 'location_update':
                    this.handleLocationUpdate(clientId, data);
                    break;
                case 'order_update':
                    this.handleOrderUpdate(clientId, data);
                    break;
                case 'ping':
                    this.sendToClient(clientId, { type: 'pong', timestamp: new Date().toISOString() });
                    break;
                default:
                    console.log(`⚠️ Unknown message type: ${data.type}`);
            }
        } catch (error) {
            console.error(`❌ Error parsing message from client ${clientId}:`, error);
        }
    }

    async handleAuthentication(clientId, token) {
        const client = this.clients.get(clientId);
        if (!client) return;

        try {
            // Verify JWT token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            
            // Update client with auth info
            client.userId = decoded.userId;
            client.role = decoded.role;
            client.isAuthenticated = true;

            console.log(`✅ Client ${clientId} authenticated as user ${decoded.userId} (${decoded.role})`);

            // Send authentication success
            this.sendToClient(clientId, {
                type: 'authentication_success',
                userId: decoded.userId,
                role: decoded.role,
                timestamp: new Date().toISOString()
            });

            // Join Socket.IO room for this order
            try {
                const io = getIO();
                // Simulate joining order tracking room
                const socketData = {
                    userId: decoded.userId,
                    userRole: decoded.role,
                    emit: (event, data) => {
                        // Forward Socket.IO events to this WebSocket client
                        this.sendToClient(clientId, {
                            type: event,
                            data,
                            timestamp: new Date().toISOString()
                        });
                    }
                };

                // Check authorization and join room
                const db = await import('../config/db.js').then(m => m.default);
                const result = await db.query(
                    'SELECT id, user_id, rider_id, status FROM orders WHERE id = $1',
                    [client.orderId]
                );

                if (result.rows.length > 0) {
                    const order = result.rows[0];
                    const isCustomer = decoded.role === 'customer' && order.user_id === decoded.userId;
                    const isRider = decoded.role === 'rider' && order.rider_id === decoded.userId;
                    const isManager = ['manager', 'admin'].includes(decoded.role);

                    if (isCustomer || isRider || isManager) {
                        console.log(`✅ Client ${clientId} authorized for order ${client.orderId}`);
                        
                        // Send current order state
                        this.sendToClient(clientId, {
                            type: 'orderTrackingState',
                            data: {
                                orderId: client.orderId,
                                status: order.status,
                                timestamp: new Date()
                            },
                            timestamp: new Date().toISOString()
                        });
                    } else {
                        console.log(`❌ Client ${clientId} not authorized for order ${client.orderId}`);
                        this.sendToClient(clientId, {
                            type: 'error',
                            message: 'Not authorized for this order',
                            timestamp: new Date().toISOString()
                        });
                    }
                }
            } catch (error) {
                console.error('❌ Error checking order authorization:', error);
            }

        } catch (error) {
            console.error(`❌ Authentication failed for client ${clientId}:`, error);
            this.sendToClient(clientId, {
                type: 'authentication_error',
                message: 'Invalid token',
                timestamp: new Date().toISOString()
            });
        }
    }

    handleLocationUpdate(clientId, data) {
        const client = this.clients.get(clientId);
        if (!client || !client.isAuthenticated) {
            console.log(`❌ Unauthorized location update from client ${clientId}`);
            return;
        }

        // Only riders can send location updates
        if (client.role !== 'rider') {
            console.log(`❌ Non-rider client ${clientId} attempted location update`);
            return;
        }

        console.log(`📍 Location update from rider ${client.userId} for order ${client.orderId}:`, {
            latitude: data.rider_latitude,
            longitude: data.rider_longitude
        });

        // Broadcast to all clients tracking this order
        this.broadcastToOrder(client.orderId, {
            type: 'location_update',
            rider_latitude: data.rider_latitude,
            rider_longitude: data.rider_longitude,
            timestamp: new Date().toISOString()
        }, clientId); // Don't send back to sender

        // Also broadcast to Socket.IO clients
        try {
            broadcastRiderLocation(
                client.orderId, 
                data.rider_latitude, 
                data.rider_longitude, 
                data.eta_minutes
            );
        } catch (error) {
            console.error('❌ Error broadcasting to Socket.IO:', error);
        }
    }

    handleOrderUpdate(clientId, data) {
        const client = this.clients.get(clientId);
        if (!client || !client.isAuthenticated) {
            console.log(`❌ Unauthorized order update from client ${clientId}`);
            return;
        }

        console.log(`📦 Order update from client ${clientId} for order ${client.orderId}:`, data);

        // Broadcast to all clients tracking this order
        this.broadcastToOrder(client.orderId, {
            type: 'order_update',
            ...data,
            timestamp: new Date().toISOString()
        }, clientId); // Don't send back to sender

        // Also broadcast to Socket.IO clients
        try {
            if (data.status) {
                broadcastOrderStatusChange(client.orderId, client.userId, data.status);
            }
        } catch (error) {
            console.error('❌ Error broadcasting to Socket.IO:', error);
        }
    }

    sendToClient(clientId, message) {
        const client = this.clients.get(clientId);
        if (!client || client.socket.readyState !== 1) { // 1 = WebSocket.OPEN
            return;
        }

        try {
            client.socket.send(JSON.stringify(message));
        } catch (error) {
            console.error(`❌ Error sending message to client ${clientId}:`, error);
            this.handleDisconnect(clientId);
        }
    }

    broadcastToOrder(orderId, message, excludeClientId = null) {
        const orderClients = this.orderClients.get(orderId.toString());
        if (!orderClients) return;

        orderClients.forEach(clientId => {
            if (clientId !== excludeClientId) {
                this.sendToClient(clientId, message);
            }
        });
    }

    handleDisconnect(clientId) {
        const client = this.clients.get(clientId);
        if (!client) return;

        console.log(`🔌 Client ${clientId} disconnected`);

        // Remove from order room
        const orderClients = this.orderClients.get(client.orderId.toString());
        if (orderClients) {
            orderClients.delete(clientId);
            if (orderClients.size === 0) {
                this.orderClients.delete(client.orderId.toString());
            }
        }

        // Remove client
        this.clients.delete(clientId);
    }

    cleanupDisconnectedClients() {
        let cleanedCount = 0;
        
        this.clients.forEach((client, clientId) => {
            if (client.socket.readyState !== 1) { // Not OPEN
                this.handleDisconnect(clientId);
                cleanedCount++;
            }
        });

        if (cleanedCount > 0) {
            console.log(`🧹 Cleaned up ${cleanedCount} disconnected clients`);
        }
    }

    // Public method to broadcast from external sources (e.g., from API routes)
    broadcastLocationUpdate(orderId, latitude, longitude, etaMinutes) {
        this.broadcastToOrder(orderId, {
            type: 'location_update',
            rider_latitude: latitude,
            rider_longitude: longitude,
            eta_minutes: etaMinutes,
            timestamp: new Date().toISOString()
        });
    }

    broadcastOrderUpdate(orderId, orderData) {
        this.broadcastToOrder(orderId, {
            type: 'order_update',
            ...orderData,
            timestamp: new Date().toISOString()
        });
    }

    getStats() {
        return {
            totalClients: this.clients.size,
            ordersTracked: this.orderClients.size,
            authenticatedClients: Array.from(this.clients.values()).filter(c => c.isAuthenticated).length
        };
    }
}

// Create singleton instance
const wsBridge = new WebSocketBridge();

export default wsBridge;
