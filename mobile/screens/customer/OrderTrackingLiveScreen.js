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
            const data = await makeRequest(`/orders/${orderId}/track`);
            setOrder(data);
            if (data?.rider_latitude && data?.rider_longitude) {
                const next = {
                    latitude: parseFloat(data.rider_latitude),
                    longitude: parseFloat(data.rider_longitude)
                };
                setRiderLocation(next);
                setMapRegion(prev => ({
                    ...prev,
                    latitude: next.latitude,
                    longitude: next.longitude,
                }));
            }
        } catch (e) { console.log("Tracking error", e); }
    };

    // Generate HTML for OpenStreetMap with rider tracking
    const generateTrackingMapHtml = () => {
        const centerLat = riderLocation?.latitude || 41.880025;
        const centerLon = riderLocation?.longitude || 12.67594;

        const riderMarker = riderLocation ? `
            L.marker([${riderLocation.latitude}, ${riderLocation.longitude}])
                .addTo(map)
                .bindPopup('<b>Il tuo Rider</b><br/>Stato: ${order?.status || 'In viaggio'}<br/>ETA: ${order?.eta_minutes || '--'} min');
        ` : '';

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                <style>
                    body { margin:0; padding:0; }
                    #map { position:absolute; top:0; bottom:0; width:100%; height:100%; }
                </style>
            </head>
            <body>
                <div id="map"></div>
                <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                <script>
                    var map = L.map('map').setView([${centerLat}, ${centerLon}], 15);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: ' OpenStreetMap contributors'
                    }).addTo(map);
                    ${riderMarker}
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