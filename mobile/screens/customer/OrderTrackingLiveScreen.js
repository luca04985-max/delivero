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
        const centerLat = riderLocation?.latitude || 41.880025;
        const centerLon = riderLocation?.longitude || 12.67594;

        console.log('🗺️ Map HTML generation - riderLocation:', riderLocation);
        console.log('🗺️ Map HTML generation - order delivery coords:', {
            lat: order?.delivery_latitude,
            lon: order?.delivery_longitude
        });

        const riderMarker = riderLocation ? `
            L.marker([${riderLocation.latitude}, ${riderLocation.longitude}])
                .addTo(map)
                .bindPopup('<b>Il tuo Rider</b><br/>Stato: ${order?.status || 'In viaggio'}<br/>ETA: ${order?.eta_minutes || '--'} min');
        ` : '';

        console.log('🗺️ Map HTML generation - riderMarker exists:', !!riderMarker);

        // Aggiungi marker customer se disponibili
        const customerMarker = order?.delivery_latitude && order?.delivery_longitude ? `
            L.marker([${order.delivery_latitude}, ${order.delivery_longitude}])
                .addTo(map)
                .bindPopup('<b>Destinazione</b><br/>${order.delivery_address}');
        ` : '';

        console.log('🗺️ Map HTML generation - customerMarker exists:', !!customerMarker);

        // Aggiungi percorso tra rider e customer (fallback linea retta + routing)
        const routePolyline = riderLocation && order?.delivery_latitude && order?.delivery_longitude ? `
            // Fallback: linea retta sempre visibile
            L.polyline([
                [${riderLocation.latitude}, ${riderLocation.longitude}],
                [${order.delivery_latitude}, ${order.delivery_longitude}]
            ], {
                color: '#FF6B35',
                weight: 4,
                opacity: 0.6,
                dashArray: '5, 10'
            }).addTo(map);
            
            // Prova routing con strada reale
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
                console.log('🛣️ Routing loaded successfully');
            } catch (error) {
                console.log('❌ Routing failed, using fallback line:', error);
            }
        ` : '';

        console.log('🗺️ Map HTML generation - routePolyline exists:', !!routePolyline);

        return `
            < !DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                        <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />
                        <style>
                            body {margin:0; padding:0; }
                            #map {position:absolute; top:0; bottom:0; width:100%; height:100%; }
                        </style>
                    </head>
                    <body>
                        <div id="map"></div>
                        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                        <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
                        <script>
                            var map = L.map('map').setView([${centerLat}, ${centerLon}], 15);
                            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                attribution: ' OpenStreetMap contributors'
                    }).addTo(map);
                            ${riderMarker}
                            ${customerMarker}
                            ${routePolyline}

                    // Aggiungi routing con strada reale
                            ${riderLocation && order?.delivery_latitude && order?.delivery_longitude ? `
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
                    ` : ''}
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
                <Text>Consegna stimata: {order?.eta_minutes || '--'} min</Text>
            </View>
        </View>
    );
}