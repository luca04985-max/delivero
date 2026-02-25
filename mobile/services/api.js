import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';
import Constants from 'expo-constants';
import logger from '../utils/logger';

// Backend configuration
// Use Expo Constants to get API URL from app.json extra
const API_URL = Constants?.expoConfig?.extra?.apiUrl || 'https://delivero-gyjx.onrender.com/api';
const SOCKET_URL = API_URL.replace('/api', '');

let socket = null;

// Helper di fetch con interceptor per il token
async function makeRequest(endpoint, options = {}) {
  try {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const fullUrl = `${API_URL}${endpoint}`;

    // Assicurati che options.data sia stringificato correttamente
    let requestOptions = {
      ...options,
      headers,
    };

    // Se options.data esiste, convertilo a stringa JSON
    if (options.data) {
      requestOptions.body = JSON.stringify(options.data);
      logger.debug('Request body: ' + requestOptions.body);
    }

    const response = await fetch(fullUrl, requestOptions);

    const data = await response.json();
    if (!response.ok) {
      logger.error('Request failed:', data);
      throw data || { message: 'Errore nella richiesta' };
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// WebSocket tracking initialization
const initializeTrackingSocket = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      logger.warn('No token available for socket connection');
      return null;
    }

    if (socket && socket.connected) {
      return socket;
    }

    socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socket.on('connect', () => {
      logger.info('Connected to tracking socket');
    });

    socket.on('disconnect', () => {
      logger.info('Disconnected from tracking socket');
    });

    socket.on('error', err => {
      logger.error('Socket error:', err);
    });

    return socket;
  } catch (error) {
    logger.error('Failed to initialize tracking socket:', error);
    return null;
  }
};

// Join order tracking channel
export const joinOrderTracking = async orderId => {
  try {
    const sock = socket || (await initializeTrackingSocket());
    if (!sock) {
      throw new Error('Socket not initialized');
    }
    sock.emit('joinOrderTracking', orderId);
  } catch (error) {
    logger.error('Failed to join order tracking:', error);
    throw error;
  }
};

// Leave order tracking channel
export const leaveOrderTracking = orderId => {
  try {
    if (!socket) return;
    socket.emit('leaveOrderTracking', orderId);
  } catch (error) {
    logger.error('Failed to leave order tracking:', error);
  }
};

// Subscribe to location updates
export const onRiderLocationUpdate = callback => {
  if (!socket) return () => {};
  socket.off('riderLocationUpdate'); // remove previous listeners
  socket.on('riderLocationUpdate', callback);
  return () => socket.off('riderLocationUpdate');
};

// Subscribe to order status updates
export const onOrderStatusUpdate = callback => {
  if (!socket) return () => {};
  socket.off('orderStatusUpdate');
  socket.on('orderStatusUpdate', callback);
  return () => socket.off('orderStatusUpdate');
};

// Subscribe to tracking stopped (after delivery)
export const onTrackingStopped = callback => {
  if (!socket) return () => {};
  socket.off('trackingStopped');
  socket.on('trackingStopped', callback);
  return () => socket.off('trackingStopped');
};

// Calculate straight-line distance between two points (Haversine formula)
// internal: calculateDistance/ETA helpers removed (use local helpers where needed)

// Disconnect socket
const disconnectTrackingSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
    socket = null;
  }
};

export const authAPI = {
  register: async (email, password, name, role = 'customer') => {
    return makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role }),
    });
  },

  login: async (email, password) => {
    try {
      const data = await makeRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  },
};

export const ordersAPI = {
  // Customer endpoints
  getAll: async () => {
    return makeRequest('/orders', { method: 'GET' });
  },
  getMyOrders: async () => {
    return makeRequest('/orders/my', { method: 'GET' });
  },
  create: data =>
    makeRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getAvailable: async () => {
    return makeRequest('/orders/available', { method: 'GET' });
  },
  trackOrder: async id => {
    return makeRequest(`/orders/${id}/track`, { method: 'GET' });
  },
  updateDeliveryCoordinates: async (id, delivery_latitude, delivery_longitude) => {
    return makeRequest(`/orders/${id}/delivery-coordinates`, {
      method: 'PUT',
      body: JSON.stringify({ delivery_latitude, delivery_longitude }),
    });
  },
  cancelOrder: async id => {
    return makeRequest(`/orders/${id}/cancel`, { method: 'PUT' });
  },
  rateOrder: async (id, data) => {
    return makeRequest(`/orders/${id}/rate`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Rider endpoints
  getActiveRiderOrders: async () => {
    return makeRequest('/orders/rider/active', { method: 'GET' });
  },
  acceptOrder: async id => {
    return makeRequest(`/orders/${id}/accept`, { method: 'PUT' });
  },
  updateOrderStatus: async (id, status) => {
    logger.debug('API Call: updateOrderStatus', {
      url: `/orders/${id}/status`,
      method: 'PUT',
      body: { status },
    });
    return makeRequest(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
  updateOrderRiderStatus: async (id, status) => {
    logger.debug('API Call: updateOrderRiderStatus', {
      url: `/orders/${id}/rider-status`,
      method: 'PUT',
      body: { status },
    });
    return makeRequest(`/orders/${id}/rider-status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
  completeOrder: async id => {
    return makeRequest(`/orders/${id}/complete`, { method: 'PUT' });
  },
  completeDelivery: async id => {
    return makeRequest(`/orders/${id}/delivered`, { method: 'PUT' });
  },

  // Real-time tracking (rider sends location)
  updateRiderLocation: async (orderId, latitude, longitude, eta_minutes) => {
    return makeRequest(`/orders/${orderId}/location`, {
      method: 'POST',
      body: JSON.stringify({
        latitude,
        longitude,
        eta_minutes,
      }),
    });
  },

  // Get tracking info (customer/manager views)
  getTrackingInfo: async orderId => {
    return makeRequest(`/orders/${orderId}/track`, { method: 'GET' });
  },
  getTrackHistory: async orderId => {
    return makeRequest(`/orders/${orderId}/track-history`, { method: 'GET' });
  },

  // Manager: get all active orders with tracking
  getActiveOrdersTracking: async () => {
    return makeRequest('/orders/active/all', { method: 'GET' });
  },

  // Customer tickets
  getCustomerTickets: async () => {
    return makeRequest('/tickets/customer', { method: 'GET' });
  },
  createCustomerTicket: async data => {
    return makeRequest('/tickets/customer', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  // Rider tickets
  getRiderTickets: async () => {
    return makeRequest('/tickets/rider', { method: 'GET' });
  },
  getRiderTicketById: async ticketId => {
    return makeRequest(`/tickets/rider/${ticketId}`, { method: 'GET' });
  },
  createRiderTicket: async data => {
    return makeRequest('/tickets/rider', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Location sharing (riders)
  sendLocation: location =>
    makeRequest('/rider/location', {
      method: 'POST',
      body: JSON.stringify(location),
    }),
  getRiderLocation: riderId =>
    makeRequest(`/rider/${riderId}/location`, {
      method: 'GET',
    }),
};

export const userAPI = {
  getProfile: () => makeRequest('/user/profile', { method: 'GET' }),
  updateProfile: data =>
    makeRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  setPushToken: token =>
    makeRequest('/auth/push-token', {
      method: 'PUT',
      body: JSON.stringify({ push_token: token }),
    }),
};

export const adminAPI = {
  getStats: () => makeRequest('/admin/stats', { method: 'GET' }),
  getAllOrders: () => makeRequest('/admin/orders', { method: 'GET' }),
  getAllUsers: () => makeRequest('/admin/users', { method: 'GET' }),
  updateUserRole: (userId, role) =>
    makeRequest(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ newRole: role }),
    }),
  updateUser: (userId, data) =>
    makeRequest(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteUser: userId => makeRequest(`/admin/users/${userId}`, { method: 'DELETE' }),
  getFinanceReport: () => makeRequest('/admin/finance', { method: 'GET' }),
  getServiceMetrics: () => makeRequest('/admin/metrics', { method: 'GET' }),
  getTicketStats: () => makeRequest('/admin/tickets/stats', { method: 'GET' }),
  getAdminTickets: () => makeRequest('/tickets/admin', { method: 'GET' }),
};

export const paymentsAPI = {
  createCashPayment: orderId => {
    logger.info('API: Making cash payment request for order:', orderId);
    return makeRequest('/payments/cash/create', {
      method: 'POST',
      body: JSON.stringify({ orderId }),
    });
  },

  markCashCollected: orderId =>
    makeRequest('/payments/cash/collected', {
      method: 'POST',
      body: JSON.stringify({ orderId }),
    }),

  createStripePayment: (orderId, payment_method_token) =>
    makeRequest('/payments/create', {
      method: 'POST',
      body: JSON.stringify({ orderId, payment_method_token }),
    }),

  // confirmStripePayment removed: not used in frontend
  // Card tokenization (server-side)
  tokenizeCard: async (cardNumber, name) => {
    return makeRequest('/payments/cards/tokenize', {
      method: 'POST',
      body: JSON.stringify({ card_number: cardNumber, name }),
    });
  },
  getSavedCards: async () => {
    return makeRequest('/payments/cards', { method: 'GET' });
  },
  deleteCard: async id => {
    return makeRequest(`/payments/cards/${id}`, { method: 'DELETE' });
  },
};

export { makeRequest };
export default { authAPI, ordersAPI, userAPI, adminAPI, paymentsAPI, makeRequest };
