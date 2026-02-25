import { useState, useEffect, useRef } from 'react';
import { ordersAPI } from '../services/api';
import locationService from '../services/locationService';

/**
 * Calculate distance between two points using Haversine formula
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

/**
 * Calculate improved ETA based on real distance and speed
 */
function calculateImprovedETA(riderLat, riderLon, deliveryLat, deliveryLon, speed) {
  // If no speed, use average urban speed (25 km/h)
  const avgSpeedMS = speed > 0 ? speed : (25 * 1000) / 3600; // 25 km/h to m/s

  // Calculate real distance
  const distanceM = calculateDistance(riderLat, riderLon, deliveryLat, deliveryLon);

  // Base ETA in minutes
  let etaMinutes = Math.ceil(distanceM / avgSpeedMS / 60);

  // Add buffer for traffic, stops, etc. (20% buffer)
  etaMinutes = Math.ceil(etaMinutes * 1.2);

  // Cap between 1 and 60 minutes
  etaMinutes = Math.max(1, Math.min(etaMinutes, 60));

  return etaMinutes;
}

/**
 * Hook that sends rider GPS location to backend every 5 seconds
 * while an active order is being delivered.
 * Only active when app is in foreground.
 **/

export const useRiderLocationSender = (orderId, riderStatus) => {
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);
  const lastLocationRef = useRef(null);

  console.log('📍 useRiderLocationSender called:', { orderId, riderStatus });

  useEffect(() => {
    // Only send location if order is in transit/pickup/delivering states
    if (!orderId || !['accepted', 'pickup', 'in_transit', 'delivering'].includes(riderStatus)) {
      console.log('📍 Location sender INACTIVE - invalid order or status:', {
        orderId,
        riderStatus,
      });
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    console.log('📍 Location sender ACTIVATED for order:', orderId, 'status:', riderStatus);

    const startLocationTracking = async () => {
      try {
        console.log('📍 [RiderLocationSender] Starting location tracking for order:', orderId);
        setLocating(true);

        // Send location immediately first time
        const getCurrentLocation = async () => {
          try {
            console.log('📍 [RiderLocationSender] Getting location for order:', orderId);
            const location = await locationService.getCurrentLocation(false, 'RiderLocationSender');

            if (!location) {
              console.warn('📍 [RiderLocationSender] No location available for order:', orderId);
              return;
            }

            const { latitude, longitude, speed } = location;

            // Get delivery coordinates from order data
            let eta_minutes = null;
            try {
              // Fetch order data to get delivery coordinates
              const orderData = await ordersAPI.trackOrder(orderId);
              if (orderData?.delivery_latitude && orderData?.delivery_longitude) {
                eta_minutes = calculateImprovedETA(
                  latitude,
                  longitude,
                  parseFloat(orderData.delivery_latitude),
                  parseFloat(orderData.delivery_longitude),
                  speed,
                );
                console.log(
                  '📍 [RiderLocationSender] Calculated improved ETA:',
                  eta_minutes,
                  'minutes',
                );
              } else {
                console.warn(
                  '📍 [RiderLocationSender] No delivery coordinates available for ETA calculation',
                );
              }
            } catch (orderError) {
              console.warn(
                '📍 [RiderLocationSender] Failed to fetch order data for ETA:',
                orderError.message,
              );
            }

            // Send to backend
            try {
              console.log('📍 [RiderLocationSender] Sending location for order:', orderId, {
                latitude,
                longitude,
                eta_minutes,
              });
              await ordersAPI.updateRiderLocation(orderId, latitude, longitude, eta_minutes);
              console.log(
                '✅ [RiderLocationSender] Location sent successfully for order:',
                orderId,
              );
              lastLocationRef.current = { latitude, longitude };
              setError(null);
            } catch (apiError) {
              // Don't treat "non tracciabile" as an error - it's expected behavior
              if (apiError.message && apiError.message.includes('non in stato tracciabile')) {
                console.log(
                  'ℹ️ [RiderLocationSender] Order not trackable - stopping location updates',
                );
                // Clear the interval since order is no longer trackable
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                  intervalRef.current = null;
                }
              } else {
                console.warn('❌ [RiderLocationSender] Failed to send location:', apiError.message);
                setError(apiError.message);
              }
            }
          } catch (e) {
            console.warn('📍 [RiderLocationSender] Failed to get location:', e.message);
            setError('Unable to get current location');
          }
        };

        // Get location immediately
        await getCurrentLocation();

        // Then set interval for every 5 seconds
        intervalRef.current = setInterval(getCurrentLocation, 5000);
      } catch (e) {
        console.error('Location tracking error:', e);
        setError(e.message);
      } finally {
        setLocating(false);
      }
    };

    startLocationTracking();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [orderId, riderStatus]);

  return {
    isLocating: locating,
    lastLocation: lastLocationRef.current,
    error,
  };
};

export default useRiderLocationSender;
