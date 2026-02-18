# WebSocket Real-time Tracking System

## 🚀 Overview

This WebSocket system provides real-time tracking capabilities for the Delivero app, bridging between native WebSocket clients and Socket.IO infrastructure.

## 📡 Architecture

```
React Native App ←→ WebSocket Bridge (Port 3001) ←→ Socket.IO (Port 5000) ←→ Database
                      (ws://localhost:3001)              (socket.io)
```

## 🔧 Components

### 1. WebSocket Bridge (`src/websocket-server.js`)
- **Port**: 3001 (configurable via `WS_PORT` env var)
- **Path**: `/tracking/{orderId}`
- **Protocol**: Native WebSocket
- **Authentication**: JWT token verification

### 2. Mobile Client (`mobile/screens/customer/OrderTrackingLiveScreen.js`)
- **Connection**: `ws://localhost:3001/tracking/{orderId}`
- **Fallback**: Polling every 30 seconds if WebSocket fails
- **Status Indicators**: Real-time/Connecting/Polling

## 🎯 Features

### Real-time Updates
- **Location Updates**: Rider position tracking
- **Order Status**: Delivery status changes
- **ETA Updates**: Estimated time of arrival

### Authentication & Security
- **JWT Verification**: Secure token-based auth
- **Room-based Access**: Users only see their orders
- **Role-based Permissions**: Customer/Rider/Manager access

### Fallback System
- **Automatic Fallback**: Polling if WebSocket fails
- **Connection Health**: Ping-pong heartbeat
- **Reconnection**: Automatic retry logic

## 📱 Client Integration

### Connection URL
```javascript
const ws = new WebSocket(`ws://localhost:3001/tracking/${orderId}`);
```

### Authentication
```javascript
ws.onopen = () => {
    ws.send(JSON.stringify({
        type: 'authenticate',
        token: jwtToken
    }));
};
```

### Message Types
```javascript
// Location update (Rider → Server)
ws.send(JSON.stringify({
    type: 'location_update',
    rider_latitude: 41.880025,
    rider_longitude: 12.67594,
    eta_minutes: 15
}));

// Order update (Server → Client)
{
    type: 'location_update',
    rider_latitude: 41.880025,
    rider_longitude: 12.67594,
    timestamp: '2024-01-01T12:00:00.000Z'
}
```

## 🛠️ Setup & Installation

### 1. Install Dependencies
```bash
cd backend
npm install ws
```

### 2. Environment Variables
```bash
# .env
WS_PORT=3001
JWT_SECRET=your-secret-key
```

### 3. Start Server
```bash
npm run dev
# WebSocket bridge starts on port 3001
# Main API server on port 5000
```

## 🧪 Testing

### Test Client
```bash
node src/test-websocket.js
```

### Manual Testing
```javascript
// Connect to WebSocket
const ws = new WebSocket('ws://localhost:3001/tracking/123');

// Send test message
ws.send(JSON.stringify({
    type: 'location_update',
    rider_latitude: 41.880025,
    rider_longitude: 12.67594
}));
```

## 📊 Message Types

### Client → Server
- `authenticate`: JWT token authentication
- `location_update`: Rider position (riders only)
- `order_update`: Order status changes
- `ping`: Connection health check

### Server → Client
- `connection_established`: Connection confirmed
- `authentication_success`: Auth successful
- `authentication_error`: Auth failed
- `location_update`: New rider position
- `order_update`: Order status change
- `orderTrackingState`: Current order state
- `error`: Error messages
- `pong`: Ping response

## 🔍 Debugging

### Server Logs
```bash
# WebSocket bridge logs
🔌 WebSocket Bridge server started on port 3001
👤 Client abc123 connected for order 123
✅ Client abc123 authenticated as user 456 (customer)
📍 Location update from rider 789 for order 123
```

### Client Logs
```bash
🔌 Connecting to WebSocket for order tracking...
✅ WebSocket connected for real-time tracking
✅ WebSocket authentication successful
📡 WebSocket real-time update: {type: 'location_update', ...}
```

## 🚨 Troubleshooting

### Common Issues

1. **Connection Failed**
   - Check if WebSocket bridge is running on port 3001
   - Verify firewall settings
   - Check CORS configuration

2. **Authentication Failed**
   - Verify JWT token is valid
   - Check JWT_SECRET matches between services
   - Ensure token hasn't expired

3. **No Real-time Updates**
   - Verify client joined correct order room
   - Check user permissions for the order
   - Ensure rider is assigned to the order

### Health Check
```bash
# Test WebSocket connection
curl -i -N -H "Connection: Upgrade" \
     -H "Upgrade: websocket" \
     -H "Sec-WebSocket-Key: test" \
     -H "Sec-WebSocket-Version: 13" \
     http://localhost:3001/tracking/123
```

## 🔄 Integration with Existing Systems

### Socket.IO Integration
The WebSocket bridge automatically forwards messages to Socket.IO rooms:
- Location updates → `riderLocationUpdate` event
- Order updates → `orderStatusUpdate` event
- Manager notifications → `activeOrderUpdate` event

### API Integration
Use the bridge for broadcasting from API routes:
```javascript
import wsBridge from './websocket-server.js';

// Broadcast location update from API
wsBridge.broadcastLocationUpdate(orderId, lat, lon, eta);

// Broadcast order update from API  
wsBridge.broadcastOrderUpdate(orderId, orderData);
```

## 📈 Performance

### Connection Limits
- **Concurrent Connections**: ~1000 per server instance
- **Message Rate**: ~100 messages/second per connection
- **Memory Usage**: ~1MB per 100 connections

### Optimization Tips
1. **Connection Pooling**: Reuse connections when possible
2. **Message Batching**: Group multiple updates
3. **Cleanup**: Regular cleanup of disconnected clients
4. **Monitoring**: Track connection stats and performance

## 🔒 Security Considerations

- **JWT Validation**: All connections must authenticate
- **Room Isolation**: Users can only access their orders
- **Rate Limiting**: Prevent message flooding
- **Input Validation**: Sanitize all incoming data
- **HTTPS**: Use WSS in production

## 🚀 Production Deployment

### Environment Setup
```bash
# Production environment variables
WS_PORT=3001
NODE_ENV=production
JWT_SECRET=production-secret
FRONTEND_ORIGINS=https://yourapp.com
```

### Docker Configuration
```dockerfile
EXPOSE 3001
EXPOSE 5000
```

### Load Balancing
- Use WebSocket-aware load balancer
- Enable sticky sessions
- Monitor connection health

## 📞 Support

For issues with WebSocket implementation:
1. Check server logs for errors
2. Verify network connectivity
3. Test with simple client first
4. Check JWT token validity
5. Review order permissions
