import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { ordersAPI } from '../services/api';

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
            console.log('📍 Location sender INACTIVE - invalid order or status:', { orderId, riderStatus });
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        console.log('📍 Location sender ACTIVATED for order:', orderId, 'status:', riderStatus);

        const startLocationTracking = async () => {
            try {
                // Request foreground location permission
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setError('Location permission denied');
                    return;
                }

                setLocating(true);

                // Send location immediately first time
                const getCurrentLocation = async () => {
                    try {
                        const location = await Location.getCurrentPositionAsync({
                            accuracy: Location.Accuracy.High,
                            timeout: 5000
                        });

                        const { latitude, longitude } = location.coords;

                        // Calculate ETA based on current speed if available
                        let eta_minutes = null;
                        if (location.coords.speed !== null && location.coords.speed > 0) {
                            // Estimate ETA based on average delivery distance (~5km) and current speed
                            const avgDeliveryDistanceM = 5000;
                            const speedMS = location.coords.speed;
                            eta_minutes = Math.ceil(avgDeliveryDistanceM / speedMS / 60);
                            eta_minutes = Math.min(eta_minutes, 60); // cap at 60 mins
                        }

                        // Send to backend
                        try {
                            console.log('📍 Sending location for order:', orderId, { latitude, longitude, eta_minutes });
                            await ordersAPI.updateRiderLocation(orderId, latitude, longitude, eta_minutes);
                            console.log('✅ Location sent successfully for order:', orderId);
                            lastLocationRef.current = { latitude, longitude };
                            setError(null);
                        } catch (apiError) {
                            // Don't treat "non tracciabile" as an error - it's expected behavior
                            if (apiError.message && apiError.message.includes('non in stato tracciabile')) {
                                console.log('ℹ️ Order not trackable - stopping location updates');
                                // Clear the interval since order is no longer trackable
                                if (intervalRef.current) {
                                    clearInterval(intervalRef.current);
                                    intervalRef.current = null;
                                }
                            } else {
                                console.warn('❌ Failed to send location:', apiError.message);
                                setError(apiError.message);
                            }
                        }
                    } catch (e) {
                        console.warn('Failed to get location:', e.message);
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
        error
    };
};

export default useRiderLocationSender;
