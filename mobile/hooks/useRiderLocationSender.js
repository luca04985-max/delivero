import { useState, useEffect, useRef } from 'react';
import { ordersAPI } from '../services/api';
import locationService from '../services/locationService';
import logger from '../utils/logger';

function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = v => (v * Math.PI) / 180;
  const R = 6371000; // meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function calculateImprovedETA(riderLat, riderLon, deliveryLat, deliveryLon, speed) {
  const avgSpeedMS = speed > 0 ? speed : (25 * 1000) / 3600; // 25 km/h in m/s
  const distanceM = calculateDistance(riderLat, riderLon, deliveryLat, deliveryLon);
  let etaMinutes = Math.ceil(distanceM / avgSpeedMS / 60);
  etaMinutes = Math.ceil(etaMinutes * 1.2); // buffer
  etaMinutes = Math.max(1, Math.min(etaMinutes, 60));
  return etaMinutes;
}

export const useRiderLocationSender = (orderId, riderStatus) => {
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);
  const lastLocationRef = useRef(null);

  useEffect(() => {
    const activeStatuses = ['accepted', 'pickup', 'in_transit', 'delivering'];
    let mounted = true;

    const clearExisting = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (!orderId || !activeStatuses.includes(riderStatus)) {
      logger.debug('useRiderLocationSender inactive', { orderId, riderStatus });
      clearExisting();
      setLocating(false);
      return () => {};
    }

    setLocating(true);

    const sendLocation = async () => {
      try {
        const location = await locationService.getCurrentLocation(false, 'useRiderLocationSender');
        if (!location) {
          logger.debug('No location obtained');
          return;
        }

        const { latitude, longitude, speed } = location;

        // Try to fetch order tracking info to compute ETA
        let eta_minutes = null;
        try {
          const orderInfo = await ordersAPI.getTrackingInfo(orderId);
          if (orderInfo && orderInfo.delivery_latitude && orderInfo.delivery_longitude) {
            eta_minutes = calculateImprovedETA(
              latitude,
              longitude,
              parseFloat(orderInfo.delivery_latitude),
              parseFloat(orderInfo.delivery_longitude),
              speed,
            );
          }
        } catch (err) {
          logger.debug('Failed to fetch order info for ETA', err);
        }

        await ordersAPI.updateRiderLocation(orderId, latitude, longitude, eta_minutes);
        lastLocationRef.current = { latitude, longitude, eta_minutes, timestamp: Date.now() };
        logger.debug('Rider location sent', { orderId, latitude, longitude, eta_minutes });
      } catch (err) {
        logger.error('Failed to send rider location', err);
        if (mounted) setError(err.message || 'Unknown error');
      }
    };

    // Send immediately, then every 5s
    sendLocation();
    intervalRef.current = setInterval(sendLocation, 5000);

    return () => {
      mounted = false;
      clearExisting();
      setLocating(false);
    };
  }, [orderId, riderStatus]);

  return {
    isLocating: locating,
    lastLocation: lastLocationRef.current,
    error,
  };
};

export default useRiderLocationSender;
