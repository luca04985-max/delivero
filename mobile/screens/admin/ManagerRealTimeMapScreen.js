import React, { useEffect, useState } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { io } from 'socket.io-client';
import { makeRequest } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { managerRealTimeMapScreenStyles } from './styles/ManagerRealTimeMapScreenStyles';

const SOCKET_URL = 'https://delivero-gyjx.onrender.com';

export default function ManagerRealTimeMapScreen() {
    const [riders, setRiders] = useState({});
    const [loading, setLoading] = useState(true);
    const [mapKey, setMapKey] = useState(0); // Force WebView remount
    const [region, setRegion] = useState({
        latitude: 41.880025,
        longitude: 12.67594,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const loadActiveOrdersFallback = async () => {
        try {
            console.log('[ManagerRealTimeMap] fallback fetch /orders/active/all');
            const data = await makeRequest('/orders/active/all', { method: 'GET' });
            console.log('[ManagerRealTimeMap] raw response:', data);

            const list = Array.isArray(data) ? data : (data?.data || []);
            console.log('[ManagerRealTimeMap] parsed list length:', list.length);
            if (list.length > 0) {
                console.log('[ManagerRealTimeMap] first item:', list[0]);
            }

            const next = {};
            for (const o of list) {
                console.log('[ManagerRealTimeMap] processing order:', o);
                console.log('[ManagerRealTimeMap] FULL ORDER DATA:', JSON.stringify(o, null, 2));
                if (o?.rider_latitude == null || o?.rider_longitude == null) {
                    console.log('[ManagerRealTimeMap] skipping order - missing coords:', o.id);
                    continue;
                }
                const lat = parseFloat(o.rider_latitude);
                const lng = parseFloat(o.rider_longitude);
                console.log('[ManagerRealTimeMap] parsed coords:', lat, lng);
                console.log('[ManagerRealTimeMap] delivery coords available:', {
                    delivery_lat: o.delivery_latitude,
                    delivery_lon: o.delivery_longitude,
                    customer_id: o.customer_id,
                    restaurant_id: o.restaurant_id
                });
                if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
                    console.log('[ManagerRealTimeMap] skipping order - invalid coords:', o.id);
                    continue;
                }
                next[String(o.id)] = {
                    orderId: o.id,
                    lat,
                    lng,
                    eta_minutes: o.eta_minutes,
                    status: o.status,
                    delivery_latitude: o.delivery_latitude,
                    delivery_longitude: o.delivery_longitude,
                    customer_id: o.customer_id,
                    restaurant_id: o.restaurant_id,
                };
                console.log('[ManagerRealTimeMap] added rider for order:', o.id);
            }

            const nextCount = Object.keys(next).length;
            console.log('[ManagerRealTimeMap] final riders count:', nextCount);
            console.log('[ManagerRealTimeMap] riders data:', next);

            // Debug dettagliato per ogni rider
            Object.values(next).forEach(rider => {
                console.log(`[ManagerRealTimeMap] Rider #${rider.orderId}:`, {
                    lat: rider.lat,
                    lng: rider.lng,
                    hasDeliveryCoords: !!(rider.delivery_latitude && rider.delivery_longitude),
                    delivery_lat: rider.delivery_latitude,
                    delivery_lon: rider.delivery_longitude,
                    status: rider.status,
                    eta: rider.eta_minutes
                });
            });

            if (nextCount > 0) {
                console.log('[ManagerRealTimeMap] setting riders state...');
                setRiders(prev => {
                    console.log('[ManagerRealTimeMap] previous riders:', prev);
                    const updated = { ...prev, ...next };
                    console.log('[ManagerRealTimeMap] updated riders:', updated);
                    // Force WebView remount to show new markers
                    setMapKey(k => {
                        const newKey = k + 1;
                        console.log('[ManagerRealTimeMap] mapKey changing from', k, 'to', newKey);
                        return newKey;
                    });
                    return updated;
                });
            }

            setLoading(false);
        } catch (e) {
            console.log('[ManagerRealTimeMap] fallback fetch error', e?.message || e);
            setLoading(false);
        }
    };

    useEffect(() => {
        let socket;

        const initSocket = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log('[ManagerRealTimeMap] init socket', SOCKET_URL, 'token?', !!token);

                if (!token) {
                    console.log('[ManagerRealTimeMap] missing token: cannot connect socket');
                    setLoading(false);
                    return;
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
                    console.log('[ManagerRealTimeMap] socket connected', socket.id);
                    try {
                        socket.emit('joinManagerRoom');
                        console.log('[ManagerRealTimeMap] emitted joinManagerRoom');
                    } catch (e) {
                        console.log('[ManagerRealTimeMap] failed to emit joinManagerRoom', e?.message || e);
                    }
                });

                socket.on('disconnect', (reason) => {
                    console.log('[ManagerRealTimeMap] socket disconnected', reason);
                });

                socket.on('connect_error', (err) => {
                    console.log('[ManagerRealTimeMap] socket connect_error', err?.message || err);
                });

                socket.on('error', (err) => {
                    console.log('[ManagerRealTimeMap] socket error', err?.message || err);
                });

                // Backend emits updates to managers room on rider location/order status
                socket.on('activeOrderUpdate', (data) => {
                    console.log('[ManagerRealTimeMap] activeOrderUpdate', data);
                    const orderId = data?.orderId;
                    const lat = data?.latitude;
                    const lng = data?.longitude;
                    if (!orderId || lat == null || lng == null) {
                        setLoading(false);
                        return;
                    }
                    setRiders(prev => ({
                        ...prev,
                        [String(orderId)]: {
                            orderId,
                            lat,
                            lng,
                            eta_minutes: data?.eta_minutes,
                            status: data?.status,
                            delivery_latitude: data?.delivery_latitude,
                            delivery_longitude: data?.delivery_longitude,
                            customer_id: data?.customer_id,
                            restaurant_id: data?.restaurant_id,
                        }
                    }));
                    setLoading(false);
                });
            } catch (e) {
                console.log('[ManagerRealTimeMap] init socket error', e?.message || e);
                setLoading(false);
            }
        };

        initSocket();

        // Fallback: populate markers even if socket updates are not arriving yet
        loadActiveOrdersFallback();
        const interval = setInterval(loadActiveOrdersFallback, 15000);

        return () => {
            try {
                socket?.disconnect();
            } catch (e) {
                // ignore
            }

            try {
                clearInterval(interval);
            } catch (e) {
                // ignore
            }
        };
    }, []);

    useEffect(() => {
        const loadMyLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                console.log('[ManagerRealTimeMap] location permission', status);
                if (status !== 'granted') return;
                const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
                console.log('[ManagerRealTimeMap] my location', loc?.coords);
                setMapRegion(prev => ({
                    ...prev,
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                }));
            } catch (e) {
                console.log('[ManagerRealTimeMap] location error', e?.message || e);
                // keep fallback
            }
        };
        if (Platform.OS !== 'web') {
            loadMyLocation();
        }
    }, []);

    if (Platform.OS === 'web') {
        return <View style={managerRealTimeMapScreenStyles.center}><Text>Usa la Dashboard Web per la mappa interattiva</Text></View>;
    }

    // Generate HTML for OpenStreetMap with riders tracking
    const generateMapHtml = () => {
        // Calcola il centro basato sulla posizione dei rider
        const riderPositions = Object.values(riders);
        let centerLat = 41.880025; // Default Roma
        let centerLon = 12.67594;
        let zoomLevel = 13;

        if (riderPositions.length > 0) {
            // Calcola il centro medio di tutti i rider
            const avgLat = riderPositions.reduce((sum, r) => sum + r.lat, 0) / riderPositions.length;
            const avgLon = riderPositions.reduce((sum, r) => sum + r.lng, 0) / riderPositions.length;
            centerLat = avgLat;
            centerLon = avgLon;
            zoomLevel = 14; // Zoom più ravvicinato se ci sono rider
        }

        console.log('[ManagerRealTimeMap] generating HTML with', riderPositions.length, 'riders');
        console.log('[ManagerRealTimeMap] map center:', centerLat, centerLon, 'zoom:', zoomLevel);

        // Marker per ogni rider (senza popup)
        const riderMarkers = riderPositions.map(r => `
            L.marker([${r.lat}, ${r.lng}])
                .addTo(map);
        `).join('\n');

        // Aggiungi percorsi per ogni rider verso la sua destinazione
        const routes = riderPositions.map(r => {
            console.log('[ManagerRealTimeMap] Processing rider routes for order', r.orderId, {
                hasDeliveryCoords: !!(r.delivery_latitude && r.delivery_longitude),
                delivery_lat: r.delivery_latitude,
                delivery_lon: r.delivery_longitude
            });

            if (r.delivery_latitude && r.delivery_longitude) {
                return `
                    // Test semplice polyline invece di routing
                    L.polyline([
                        [${r.lat}, ${r.lng}],
                        [${r.delivery_latitude}, ${r.delivery_longitude}]
                    ], {
                        color: '#FF6B35',
                        weight: 4,
                        opacity: 0.8,
                        smoothFactor: 1
                    }).addTo(map);
                    console.log('🛣️ Admin polyline added for order', ${r.orderId});
                `;
            } else {
                return `
                    L.polyline([
                        [${r.lat}, ${r.lng}],
                        [${r.lat + 0.005}, ${r.lng + 0.005}]
                    ], {
                        color: '#FF6B35',
                        weight: 4,
                        opacity: 0.6,
                        dashArray: '5, 10'
                    }).addTo(map);
                `;
            }
            return '';
        }).join('\n');

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />
                <style>
                    body { margin:0; padding:0; }
                    #map { position:absolute; top:0; bottom:0; width:100%; height:100%; }
                    .debug-info {
                        position: absolute;
                        top: 10px;
                        left: 10px;
                        background: rgba(255, 255, 255, 0.9);
                        padding: 8px 12px;
                        border-radius: 8px;
                        z-index: 1000;
                        font-size: 14px;
                        font-weight: bold;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    }
                    /* Nascondi i testi delle indicazioni stradali */
                    .leaflet-routing-container {
                        display: none !important;
                    }
                </style>
            </head>
            <body>
                <div class="debug-info">🏍 Riders Attivi: ${riderPositions.length}</div>
                <div id="map"></div>
                <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
                <script>
                    console.log('🗺️ Admin map initializing...');
                    console.log('🗺️ Available libraries:', {
                        L: typeof L !== 'undefined',
                        Routing: typeof L.Routing !== 'undefined'
                    });
                    
                    var map = L.map('map').setView([${centerLat}, ${centerLon}], ${zoomLevel});
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: 'OpenStreetMap contributors'
                    }).addTo(map);
                    
                    // Aggiungi marker rider (senza popup)
                    ${riderMarkers}
                    
                    // Aggiungi percorsi verso destinazioni
                    ${routes}
                    
                    // Debug finale
                    console.log('🗺️ Admin map loaded with ' + ${riderPositions.length} + ' riders');
                    console.log('🗺️ Map center set to:', [${centerLat}, ${centerLon}]);
                    
                    // Force map refresh after 1 second
                    setTimeout(function() {
                        map.invalidateSize();
                        console.log('🗺️ Map size invalidated');
                    }, 1000);
                </script>
            </body>
            </html>
        };

    return (
        <View style={managerRealTimeMapScreenStyles.container}>
            <WebView
                key={mapKey} // Force complete remount when riders change
                style={managerRealTimeMapScreenStyles.map}
                source={{ html: generateMapHtml() }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                renderLoading={() => <ActivityIndicator style={managerRealTimeMapScreenStyles.loader} size="large" />}
            />
        </View>
    );
}
