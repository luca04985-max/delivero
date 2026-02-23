import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { orderTrackingLiveScreenStyles } from './styles/OrderTrackingLiveScreenStyles';
import { makeRequest } from '../../services/api';

export default function OrderTrackingLiveScreen({ route }) {
    const { orderId } = route.params;
    const [order, setOrder] = useState(null);
    const [riderLocation, setRiderLocation] = useState(null);
    const [mapRegion, setMapRegion] = useState({
        latitude: 41.88,
        longitude: 12.67,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });

    useEffect(() => {
        const interval = setInterval(() => {
            fetchTrackingData();
        }, 5000); // Aggiorna ogni 5 secondi
        return () => clearInterval(interval);
    }, []);

    // Calcola ETA fallback basato sulla distanza se non disponibile dal backend
    const calculateFallbackETA = () => {
        if (order?.eta_minutes) {
            return order.eta_minutes;
        }

        // Se abbiamo coordinate rider e delivery, calcola ETA stimato
        if (riderLocation && order?.delivery_latitude && order?.delivery_longitude) {
            const distance = calculateDistance(
                riderLocation.latitude,
                riderLocation.longitude,
                parseFloat(order.delivery_latitude),
                parseFloat(order.delivery_longitude)
            );

            // Velocità media urbana: 25 km/h = 416.67 m/min
            const avgSpeedMPerMin = 416.67;
            const etaMinutes = Math.ceil(distance / avgSpeedMPerMin);

            console.log('📍 Calculated fallback ETA:', etaMinutes, 'minutes for distance:', distance, 'meters');
            return etaMinutes;
        }

        return '--';
    };

    // Funzione per calcolare la distanza (Haversine)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Earth's radius in meters
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    };

    const fetchTrackingData = async () => {
        try {
            console.log('📍 Customer fetching tracking data for order:', orderId);
            const data = await makeRequest(`/orders/${orderId}/track`);
            console.log('📍 Customer received tracking data:', data);
            setOrder(data);

            if (data?.rider_latitude && data?.rider_longitude) {
                const next = {
                    latitude: parseFloat(data.rider_latitude),
                    longitude: parseFloat(data.rider_longitude)
                };
                console.log('📍 Customer setting rider location:', next);
                setRiderLocation(next);
                setMapRegion(prev => ({
                    ...prev,
                    latitude: next.latitude,
                    longitude: next.longitude,
                }));
            } else {
                console.log('📍 Customer: No rider coordinates in data');
                console.log('📍 Customer data keys:', Object.keys(data || {}));
            }
        } catch (e) {
            console.error('❌ Customer tracking error:', e);
        }
    };

    // Generate HTML for OpenStreetMap with rider tracking
    const generateTrackingMapHtml = () => {
        // Centro sulla posizione del rider, con fallback su Roma
        const centerLat = riderLocation?.latitude || 41.880025;
        const centerLon = riderLocation?.longitude || 12.67594;

        // Zoom più ravvicinato se abbiamo coordinate rider
        const zoomLevel = riderLocation ? 16 : 15;

        console.log('🗺️ Map HTML generation - riderLocation:', riderLocation);
        console.log('🗺️ Map HTML generation - order delivery coords:', {
            lat: order?.delivery_latitude,
            lon: order?.delivery_longitude
        });

        const riderMarker = riderLocation ? `
            L.marker([${riderLocation.latitude}, ${riderLocation.longitude}])
                .addTo(map);
        ` : '';

        console.log('🗺️ Map HTML generation - riderMarker exists:', !!riderMarker);

        // Aggiungi marker customer se disponibili
        const customerMarker = order?.delivery_latitude && order?.delivery_longitude ? `
            L.marker([${order.delivery_latitude}, ${order.delivery_longitude}])
                .addTo(map);
        ` : '';

        console.log('🗺️ Map HTML generation - customerMarker exists:', !!customerMarker);

        // Aggiungi percorso tra rider e customer (solo routing con strade reali)
        const routePolyline = ''; // Rimuovo linea retta, uso solo routing

        console.log('🗺️ Map HTML generation - routePolyline exists:', !!routePolyline);

        // Funzione per aggiornare il centro della mappa quando il rider si muove
        const updateMapCenter = `
            function updateMapCenter() {
                if (window.currentRiderLocation) {
                    map.setView([window.currentRiderLocation.latitude, window.currentRiderLocation.longitude], 16);
                    console.log('🗺️ Map centered on rider:', window.currentRiderLocation);
                }
            }
        `;

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
                    /* Nascondi i testi delle indicazioni stradali */
                    .leaflet-routing-container {
                        display: none !important;
                    }
                </style>
            </head>
            <body>
                <div id="map"></div>
                <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
                <script>
                    var map = L.map('map').setView([${centerLat}, ${centerLon}], ${zoomLevel});
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: ' OpenStreetMap contributors'
                    }).addTo(map);
                    ${riderMarker}
                    ${customerMarker}
                    ${routePolyline}
                    
                    // Aggiungi routing con strade reali ma senza popup e indicazioni
                    ${riderLocation && order?.delivery_latitude && order?.delivery_longitude ? `
                        // Prova routing con strade reali
                        try {
                            L.Routing.control({
                                waypoints: [
                                    L.latLng(${riderLocation.latitude}, ${riderLocation.longitude}),
                                    L.latLng(${order.delivery_latitude}, ${order.delivery_longitude})
                                ],
                                routeWhileDragging: false,
                                addWaypoints: false,
                                createMarker: function() { return null; },
                                lineOptions: {
                                    styles: [{color: '#FF6B35', weight: 6, opacity: 1.0}]
                                }
                            }).addTo(map);
                            console.log('🛣️ Customer routing loaded successfully');
                        } catch (error) {
                            console.log('❌ Customer routing failed, using fallback line:', error);
                            // Fallback: linea retta se routing fallisce
                            L.polyline([
                                [${riderLocation.latitude}, ${riderLocation.longitude}],
                                [${order.delivery_latitude}, ${order.delivery_longitude}]
                            ], {
                                color: '#FF6B35',
                                weight: 6,
                                opacity: 1.0,
                                dashArray: '10, 5'
                            }).addTo(map);
                        }
                    ` : ''}
                    
                    // Funzione per aggiornare il centro quando il rider si muove
                    ${updateMapCenter}
                    
                    // Salva la posizione corrente del rider per aggiornamenti futuri
                    window.currentRiderLocation = ${riderLocation ? JSON.stringify(riderLocation) : null};
                </script>
            </body>
            </html>
        `;
    };

    return (
        <View style={orderTrackingLiveScreenStyles.container}>
            <WebView
                style={{ flex: 1 }}
                source={{ html: generateTrackingMapHtml() }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                renderLoading={() => <ActivityIndicator style={orderTrackingLiveScreenStyles.mapLoader} size="large" />}
            />
            <View style={orderTrackingLiveScreenStyles.infoBox}>
                <Text style={orderTrackingLiveScreenStyles.statusText}>Stato: {order?.status || 'In caricamento...'}</Text>
                <Text>Consegna stimata: {calculateFallbackETA()} min</Text>
            </View>
        </View>
    );
}