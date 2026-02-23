import React, { useEffect, useState } from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { io } from 'socket.io-client';
import { makeRequest } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { orderTrackingLiveScreenStyles } from './styles/OrderTrackingLiveScreenStyles';

const SOCKET_URL = 'https://delivero-gyjx.onrender.com';

// Funzione per tradurre gli stati in italiano
const translateStatus = (status) => {
    const statusMap = {
        'pending': 'In attesa',
        'confirmed': 'Confermato',
        'preparing': 'In preparazione',
        'ready': 'Pronto',
        'picked_up': 'Ritirato',
        'in_transit': 'In viaggio',
        'delivered': 'Consegnato',
        'cancelled': 'Annullato'
    };
    return statusMap[status] || status || 'In preparazione';
};

export default function OrderTrackingLiveScreen({ route }) {
    const { orderId } = route.params || {}; // Get orderId from navigation params
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
            console.log('[CustomerOrderTracking] === STARTING FALLBACK FETCH ===');

            // If orderId is specified, fetch only that order
            if (orderId) {
                console.log('[CustomerOrderTracking] fetching single order:', orderId);
                const data = await makeRequest(`/orders/active/all`, { method: 'GET' });
                const list = Array.isArray(data) ? data : (data?.data || []);
                const targetOrder = list.find(o => String(o.id) === String(orderId));

                if (targetOrder) {
                    console.log('[CustomerOrderTracking] found target order:', targetOrder);
                    const next = {};
                    const { rider_latitude, rider_longitude } = targetOrder;

                    if (rider_latitude != null && rider_longitude != null) {
                        const lat = parseFloat(rider_latitude);
                        const lng = parseFloat(rider_longitude);

                        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
                            console.log('[CustomerOrderTracking] invalid coords for order:', orderId);
                            setLoading(false);
                            return;
                        }

                        next[String(orderId)] = {
                            orderId: targetOrder.id,
                            lat,
                            lng,
                            eta_minutes: targetOrder.eta_minutes,
                            status: targetOrder.status,
                            delivery_latitude: targetOrder.delivery_latitude,
                            delivery_longitude: targetOrder.delivery_longitude,
                            customer_id: targetOrder.customer_id,
                            restaurant_id: targetOrder.restaurant_id,
                        };

                        console.log('[CustomerOrderTracking] added single rider for order:', orderId);
                        setRiders(next);
                    } else {
                        console.log('[CustomerOrderTracking] no rider coords for order:', orderId);
                    }
                    setLoading(false);
                    return;
                }
            }

            // Otherwise, fetch all orders (default behavior)
            console.log('[CustomerOrderTracking] fallback fetch /orders/active/all');
            const data = await makeRequest('/orders/active/all', { method: 'GET' });
            console.log('[CustomerOrderTracking] raw response:', data);

            const list = Array.isArray(data) ? data : (data?.data || []);
            console.log('[CustomerOrderTracking] parsed list length:', list.length);
            if (list.length > 0) {
                console.log('[CustomerOrderTracking] first item:', list[0]);
            }

            // Process all orders (only if no specific orderId)
            const next = {};
            for (const o of list) {
                console.log('[CustomerOrderTracking] processing order:', o);
                console.log('[CustomerOrderTracking] FULL ORDER DATA:', JSON.stringify(o, null, 2));
                console.log('[CustomerOrderTracking] AVAILABLE FIELDS:', Object.keys(o));
                console.log('[CustomerOrderTracking] RIDER COORDS CHECK:', {
                    rider_latitude: o?.rider_latitude,
                    rider_longitude: o?.rider_longitude,
                    delivery_latitude: o?.delivery_latitude,
                    delivery_longitude: o?.delivery_longitude
                });
                if (o?.rider_latitude == null || o?.rider_longitude == null) {
                    console.log('[CustomerOrderTracking] skipping order - missing coords:', o.id);
                    continue;
                }
                const lat = parseFloat(o.rider_latitude);
                const lng = parseFloat(o.rider_longitude);
                console.log('[CustomerOrderTracking] parsed coords:', lat, lng);
                console.log('[CustomerOrderTracking] delivery coords available:', {
                    delivery_lat: o.delivery_latitude,
                    delivery_lon: o.delivery_longitude,
                    customer_id: o.customer_id,
                    restaurant_id: o.restaurant_id
                });
                if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
                    console.log('[CustomerOrderTracking] skipping order - invalid coords:', o.id);
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
                console.log('[CustomerOrderTracking] added rider for order:', o.id);
            }

            const nextCount = Object.keys(next).length;
            console.log('[CustomerOrderTracking] final riders count:', nextCount);
            console.log('[CustomerOrderTracking] riders data:', next);

            // Debug dettagliato per ogni rider
            Object.values(next).forEach(rider => {
                console.log(`[CustomerOrderTracking] Rider #${rider.orderId}:`, {
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
                console.log('[CustomerOrderTracking] setting riders state...');
                setRiders(prev => {
                    console.log('[CustomerOrderTracking] previous riders:', prev);
                    const updated = { ...prev, ...next };
                    console.log('[CustomerOrderTracking] updated riders:', updated);
                    // Force WebView remount to show new markers
                    setMapKey(k => {
                        const newKey = k + 1;
                        console.log('[CustomerOrderTracking] mapKey changing from', k, 'to', newKey);
                        return newKey;
                    });
                    return updated;
                });
            }

            setLoading(false);
        } catch (e) {
            console.log('[CustomerOrderTracking] fallback fetch error', e?.message || e);
            setLoading(false);
        }
    };

    useEffect(() => {
        let socket;

        const initSocket = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log('[CustomerOrderTracking] init socket', SOCKET_URL, 'token?', !!token);

                if (!token) {
                    console.log('[CustomerOrderTracking] missing token: cannot connect socket');
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
                    console.log('[CustomerOrderTracking] socket connected', socket.id);
                    try {
                        socket.emit('joinCustomerRoom');
                        console.log('[CustomerOrderTracking] emitted joinCustomerRoom');
                    } catch (e) {
                        console.log('[CustomerOrderTracking] failed to emit joinCustomerRoom', e?.message || e);
                    }
                });

                socket.on('disconnect', (reason) => {
                    console.log('[CustomerOrderTracking] socket disconnected', reason);
                });

                socket.on('connect_error', (err) => {
                    console.log('[CustomerOrderTracking] socket connect_error', err?.message || err);
                });

                socket.on('error', (err) => {
                    console.log('[CustomerOrderTracking] socket error', err?.message || err);
                });

                // Backend emits updates to customer room on their order status
                socket.on('activeOrderUpdate', (data) => {
                    console.log('[CustomerOrderTracking] activeOrderUpdate', data);
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
                console.log('[CustomerOrderTracking] init socket error', e?.message || e);
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

    // Temporaneamente disabilitato per test
    // if (Platform.OS === 'web') {
    //     console.log('[CustomerOrderTracking] PLATFORM IS WEB - showing web message');
    //     return <View style={orderTrackingLiveScreenStyles.center}><Text>Usa la Dashboard Web per la mappa interattiva</Text></View>;
    // }

    console.log('[CustomerOrderTracking] PLATFORM IS MOBILE - rendering map');

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

        console.log('[CustomerOrderTracking] generating HTML with', riderPositions.length, 'riders');
        console.log('[CustomerOrderTracking] map center:', centerLat, centerLon, 'zoom:', zoomLevel);

        // Icone personalizzate
        const riderIcon = `
            L.divIcon({
                html: '<div style="background: #FF6B35; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">🏍️</div>',
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                popupAnchor: [0, -20],
                className: 'rider-icon'
            });
        `;

        const destinationIcon = `
            L.divIcon({
                html: '<div style="background: #4CAF50; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">📍</div>',
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                popupAnchor: [0, -20],
                className: 'destination-icon'
            });
        `;

        // Marker per ogni rider con icona personalizzata
        const riderMarkers = riderPositions.map(r => `
            L.marker([${r.lat}, ${r.lng}], {icon: riderIcon})
                .addTo(map);
        `).join('\n');

        // Aggiungi marker di destinazione con icona personalizzata
        const deliveryMarkers = riderPositions.map(r => {
            const deliveryLat = r.delivery_latitude || (r.lat + 0.01);
            const deliveryLon = r.delivery_longitude || (r.lng + 0.01);
            return `
                L.marker([${deliveryLat}, ${deliveryLon}], {icon: destinationIcon})
                    .addTo(map);
            `;
        }).join('\n');

        // Aggiungi routing con strade reali per ogni rider
        const routes = riderPositions.map(r => {
            const deliveryLat = r.delivery_latitude || (r.lat + 0.01);
            const deliveryLon = r.delivery_longitude || (r.lng + 0.01);

            return `
                try {
                    L.Routing.control({
                        waypoints: [
                            L.latLng(${r.lat}, ${r.lng}),
                            L.latLng(${deliveryLat}, ${deliveryLon})
                        ],
                        routeWhileDragging: false,
                        addWaypoints: false,
                        createMarker: function() { return null; },
                        lineOptions: {
                            styles: [{color: '#FF6B35', weight: 4, opacity: 0.8}]
                        }
                    }).addTo(map);
                    console.log('🛣️ Customer routing loaded for order ${r.orderId}');
                } catch (error) {
                    console.log('❌ Customer routing failed for order ${r.orderId}:', error);
                }
            `;
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
                    
                    /* Nascondi solo i testi delle indicazioni stradali, ma mostra la strada */
                    .leaflet-routing-container {
                        display: none !important;
                    }
                    
                    /* Stile per le icone personalizzate */
                    .rider-icon, .destination-icon {
                        background: transparent !important;
                        border: none !important;
                    }
                    
                    .rider-icon div, .destination-icon div {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }
                </style>
            </head>
            <body>
                <div id="map"></div>
                <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
                <script>
                    console.log('🗺️ Customer map initializing...');
                    var map = L.map('map').setView([${centerLat}, ${centerLon}], ${zoomLevel});
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: 'OpenStreetMap contributors'
                    }).addTo(map);
                    
                    // Definisci icone personalizzate
                    var riderIcon = L.divIcon({
                        html: '<div style="background: #FF6B35; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">🏍️</div>',
                        iconSize: [40, 40],
                        iconAnchor: [20, 20],
                        popupAnchor: [0, -20],
                        className: 'rider-icon'
                    });
                    
                    var destinationIcon = L.divIcon({
                        html: '<div style="background: #4CAF50; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">📍</div>',
                        iconSize: [40, 40],
                        iconAnchor: [20, 20],
                        popupAnchor: [0, -20],
                        className: 'destination-icon'
                    });
                    
                    // Aggiungi marker rider con icona personalizzata
                    ${riderMarkers}
                    
                    // Aggiungi marker destinazione con icona personalizzata
                    ${deliveryMarkers}
                    
                    // Aggiungi routing con strade reali
                    ${routes}
                    
                    // Debug finale
                    console.log('🗺️ Customer map loaded with ' + ${riderPositions.length} + ' riders');
                    
                    // Force map refresh after 1 second
                    setTimeout(function() {
                        map.invalidateSize();
                    }, 1000);
                </script>
            </body>
            </html>
        `;
    };

    console.log('[CustomerOrderTracking] PLATFORM IS MOBILE - rendering map');

    return (
        <View style={orderTrackingLiveScreenStyles.container}>
            <WebView
                key={mapKey} // Force complete remount when riders change
                style={orderTrackingLiveScreenStyles.map}
                source={{ html: generateMapHtml() }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                renderLoading={() => <ActivityIndicator style={orderTrackingLiveScreenStyles.loader} size="large" />}
            />
            {Object.values(riders).length > 0 && (
                <View style={orderTrackingLiveScreenStyles.etaInfoBox}>
                    <Text style={orderTrackingLiveScreenStyles.etaHeader}>📍 Tracciamento Ordine</Text>
                    <View style={orderTrackingLiveScreenStyles.etaRow}>
                        <Text style={orderTrackingLiveScreenStyles.etaLabel}>Stato:</Text>
                        <Text style={orderTrackingLiveScreenStyles.etaValue}>
                            {translateStatus(Object.values(riders)[0]?.status)}
                        </Text>
                    </View>
                    <View style={orderTrackingLiveScreenStyles.etaRow}>
                        <Text style={orderTrackingLiveScreenStyles.etaLabel}>Consegna stimata:</Text>
                        <Text style={orderTrackingLiveScreenStyles.etaValue}>
                            {Object.values(riders)[0]?.eta_minutes ? `${Object.values(riders)[0].eta_minutes} min` : 'Calcolando...'}
                        </Text>
                    </View>
                    <View style={orderTrackingLiveScreenStyles.etaStatus}>
                        <View style={orderTrackingLiveScreenStyles.statusDot}></View>
                        <Text style={orderTrackingLiveScreenStyles.statusText}>
                            Rider in viaggio verso la tua destinazione
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}
