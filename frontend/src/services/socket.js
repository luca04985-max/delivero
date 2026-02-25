import { io } from 'socket.io-client';
import logger from '../utils/logger';

const URL = process.env.REACT_APP_WS_URL || 'http://localhost:5000';

let socket;
let connectionAttempts = 0;

export function initSocket(token) {
  if (socket) return socket;

  try {
    socket = io(URL, {
      auth: { token },
      transports: ['websocket'],
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 3, // Limita i tentativi per evitare spam
    });

    socket.on('connect', () => {
      logger.info('Socket connected');
      connectionAttempts = 0;
    });

    socket.on('connect_error', err => {
      connectionAttempts++;
      logger.warn(`Socket connection error (attempt ${connectionAttempts}):`, err.message);
      // Stop trying after max attempts
      if (connectionAttempts >= 3) {
        socket?.disconnect();
      }
    });

    socket.on('disconnect', () => {
      logger.info('Socket disconnected');
    });

    return socket;
  } catch (error) {
    logger.error('Error initializing socket:', error);
    return null;
  }
}

export function getSocket() {
  return socket;
}

const socketService = { initSocket, getSocket };
export default socketService;
