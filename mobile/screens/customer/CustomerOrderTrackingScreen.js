import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { ordersAPI } from '../../services/api';
import * as Location from 'expo-location';
import { mobileTheme } from '../../theme';
import { customerOrderTrackingScreenStyles } from './styles/CustomerOrderTrackingScreenStyles';

// Leaflet Map for Web
const LeafletTrackingMap = ({ riderLocation, customerLocation, order, history = [] }) => {
  const mapContainerId = 'customer-tracking-map-' + Math.random().toString(36).slice(2);

  React.useEffect(() => {
    if (Platform.OS !== 'web') return;

    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.onload = () => {
      const L = window.L;
      if (!L || !document.getElementById(mapContainerId)) return;

      const riderLat = riderLocation?.latitude || 40.7128;
      const riderLng = riderLocation?.longitude || -74.0060;
      const customerLat = customerLocation?.latitude || 40.7100;
      const customerLng = customerLocation?.longitude || -74.0070;

      // Create map centered between rider and customer
      const centerLat = (riderLat + customerLat) / 2;
      const centerLng = (riderLng + customerLng) / 2;

      const map = L.map(mapContainerId).setView([centerLat, centerLng], 14);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Rider marker (red/orange - actively delivering)
      const riderIcon = L.divIcon({
        className: 'rider-marker',
        html: `<div style="
          width: 40px;
          height: 40px;
          background: #fee2e2;
          border: 3px solid #dc2626;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);
          animation: pulse 2s infinite;
        ">🏍️</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20],
      });

      L.marker([riderLat, riderLng], { icon: riderIcon })
        .bindPopup(`<b>🏍️ Rider in consegna</b><br>ETA: ${order?.eta_minutes || 15} min`)
        .addTo(map)
        .openPopup();

      // Customer marker (blue - waiting for delivery)
      const customerIcon = L.divIcon({
        className: 'customer-marker',
        html: `<div style="
          width: 40px;
          height: 40px;
          background: #dbeafe;
          border: 3px solid #0284c7;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3);
        ">🏠</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20],
      });

      L.marker([customerLat, customerLng], { icon: customerIcon })
        .bindPopup('<b>🏠 La tua posizione</b>')
        .addTo(map);

      // Draw polyline: use history if available else draw simple line
      if (history && Array.isArray(history) && history.length > 0) {
        const pts = history.map(p => [parseFloat(p.latitude), parseFloat(p.longitude)]);
        L.polyline(pts, { color: '#ef4444', weight: 3 }).addTo(map);
      } else {
        L.polyline([[riderLat, riderLng], [customerLat, customerLng]], {
          color: '#3b82f6',
          weight: 2,
          opacity: 0.7,
          dashArray: '5, 5',
        }).addTo(map);
      }

      // Fit bounds to show both
      const bounds = L.latLngBounds([[riderLat, riderLng], [customerLat, customerLng]]);
      map.fitBounds(bounds, { padding: [100, 100] });
    };

    document.head.appendChild(script);

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.getElementById(mapContainerId)) {
        const mapElement = document.getElementById(mapContainerId);
        if (mapElement._leaflet_map) {
          mapElement._leaflet_map.remove();
        }
      }
    };
  }, [riderLocation, customerLocation, order?.eta_minutes]);

  return (
    <View style={styles.mapContainer}>
      <div
        id={mapContainerId}
        style={{
          width: '100%',
          height: '400px',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      />
    </View>
  );
};

export default function CustomerOrderTrackingScreen({ route, navigation }) {
  const { orderId } = route.params || {};
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [riderLocation, setRiderLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [trackHistory, setTrackHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    if (!orderId) {
      Alert.alert('Errore', 'ID ordine non fornito');
      navigation.goBack();
      return;
    }

    loadTrackingInfo();

    // Get real customer location on native platforms
    const loadNativeCustomerLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        setCustomerLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      } catch (e) {
        // ignore and fallback to default
      }
    };

    if (Platform.OS !== 'web') {
      loadNativeCustomerLocation();
    }

    // Get real customer location if on web
    if (Platform.OS === 'web' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCustomerLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }
      );
    }

    // Refresh tracking every 10 seconds
    const interval = setInterval(loadTrackingInfo, 10000);
    return () => clearInterval(interval);
  }, [orderId]);

  // Update ETA countdown
  useEffect(() => {
    if (!order?.eta_minutes) return;

    const etaInterval = setInterval(() => {
      setOrder(prev => {
        if (!prev) return prev;
        const newEta = prev.eta_minutes - 1;
        if (newEta > 0) {
          return { ...prev, eta_minutes: newEta };
        } else {
          clearInterval(etaInterval);
          return prev;
        }
      });
    }, 60000); // Update every minute

    return () => clearInterval(etaInterval);
  }, [order?.eta_minutes]);

  const loadTrackingInfo = async () => {
    try {
      setRefreshing(true);
      const trackingData = await ordersAPI.getTrackingInfo(orderId);

      setOrder(trackingData);

      if (trackingData.rider_latitude && trackingData.rider_longitude) {
        setRiderLocation({
          latitude: parseFloat(trackingData.rider_latitude),
          longitude: parseFloat(trackingData.rider_longitude),
        });
      }

      // fetch track history
      try {
        const pts = await ordersAPI.getTrackHistory(orderId);
        setTrackHistory(pts.map(p => ({ latitude: parseFloat(p.latitude), longitude: parseFloat(p.longitude) })));
      } catch (e) {
        console.warn('Could not load track history', e.message);
      }

      // Set default customer location
      if (!customerLocation) {
        setCustomerLocation({
          latitude: 40.7100,
          longitude: -74.0070,
        });
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading tracking:', error);
      Alert.alert('Errore', 'Non è possibile caricare i dettagli della consegna');
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <View style={customerOrderTrackingScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color={mobileTheme.colors.primary} />
        <Text style={customerOrderTrackingScreenStyles.loadingText}>Caricamento tracciamento...</Text>
      </View>
    );
  }

  // Generate HTML for OpenStreetMap with rider and customer tracking
  const generateCustomerTrackingMapHtml = () => {
    const riderLat = riderLocation?.latitude || 41.880025;
    const riderLon = riderLocation?.longitude || 12.67594;
    const customerLat = customerLocation?.latitude || 41.880025;
    const customerLon = customerLocation?.longitude || 12.67594;

    const centerLat = (riderLat + customerLat) / 2;
    const centerLon = (riderLon + customerLon) / 2;

    const polyline = trackHistory.length > 0
      ? trackHistory.map(p => `[${p.latitude}, ${p.longitude}]`).join(',')
      : `[[${riderLat}, ${riderLon}], [${customerLat}, ${customerLon}]]`;

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
              var map = L.map('map').setView([${centerLat}, ${centerLon}], 14);
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '© OpenStreetMap contributors'
              }).addTo(map);
              
              // Rider marker
              L.marker([${riderLat}, ${riderLon}])
                  .addTo(map)
                  .bindPopup('<b>🏍️ Rider</b><br/>Stato: ${order?.status || 'In viaggio'}<br/>ETA: ${order?.eta_minutes || '--'} min');
              
              // Customer marker
              L.marker([${customerLat}, ${customerLon}])
                  .addTo(map)
                  .bindPopup('<b>🏠 La tua posizione</b>');
              
              // Route polyline
              L.polyline([${polyline}], { color: '#ef4444', weight: 3 }).addTo(map);
              
              // Fit bounds to show both
              var bounds = L.latLngBounds([[${riderLat}, ${riderLon}], [${customerLat}, ${customerLon}]]);
              map.fitBounds(bounds, { padding: [50, 50] });
          </script>
      </body>
      </html>
    `;
  };

  const statusEmoji = {
    pending: '⏳',
    accepted: '✅',
    pickup: '📦',
    in_transit: '🚚',
    delivered: '✔️',
  };

  const statusText = {
    pending: 'In sospeso',
    accepted: 'Accettato',
    pickup: 'In ritiro',
    in_transit: 'In consegna',
    delivered: 'Consegnato',
  };

  return (
    <View style={customerOrderTrackingScreenStyles.container}>
      {/* Header */}
      <View style={customerOrderTrackingScreenStyles.header}>
        <View style={customerOrderTrackingScreenStyles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={customerOrderTrackingScreenStyles.statusText}>← Indietro</Text>
          </TouchableOpacity>
          <Text style={customerOrderTrackingScreenStyles.title}>📍 Tracciamento Ordine</Text>
          <View style={customerOrderTrackingScreenStyles.statusBadge}>
            <Text style={customerOrderTrackingScreenStyles.statusText}>{statusEmoji[order?.status] || '📦'}</Text>
          </View>
        </View>
      </View>

      {/* Status Badge */}
      <View style={customerOrderTrackingScreenStyles.statusContainer}>
        <Text style={customerOrderTrackingScreenStyles.statusText}>{statusText[order?.status] || 'Non disponibile'}</Text>
        {order?.eta_minutes && order?.status === 'in_transit' && (
          <Text style={customerOrderTrackingScreenStyles.etaText}>ETA: {order.eta_minutes} minuti</Text>
        )}
      </View>

      {/* Map */}
      {riderLocation && customerLocation && (
        <View style={customerOrderTrackingScreenStyles.mapContainer}>
          <WebView
            style={customerOrderTrackingScreenStyles.map}
            source={{ html: generateCustomerTrackingMapHtml() }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            renderLoading={() => <ActivityIndicator style={customerOrderTrackingScreenStyles.mapLoader} size="large" />}
          />
        </View>
      )}

      {/* Order Details */}
      <View style={customerOrderTrackingScreenStyles.detailsContainer}>
        <Text style={customerOrderTrackingScreenStyles.sectionTitle}>📦 Dettagli Ordine</Text>

        <View style={customerOrderTrackingScreenStyles.detailRow}>
          <Text style={customerOrderTrackingScreenStyles.detailLabel}>ID Ordine:</Text>
          <Text style={customerOrderTrackingScreenStyles.detailValue}>#{order?.id}</Text>
        </View>

        <View style={customerOrderTrackingScreenStyles.detailRow}>
          <Text style={customerOrderTrackingScreenStyles.detailLabel}>Importo:</Text>
          <Text style={customerOrderTrackingScreenStyles.detailValue}>€{parseFloat(order?.total_amount || 0).toFixed(2)}</Text>
        </View>

        <View style={customerOrderTrackingScreenStyles.detailRow}>
          <Text style={customerOrderTrackingScreenStyles.detailLabel}>Consegna a:</Text>
          <Text style={customerOrderTrackingScreenStyles.detailValue}>{order?.delivery_address || 'Indirizzo non disponibile'}</Text>
        </View>

        {order?.rider_id && (
          <View style={customerOrderTrackingScreenStyles.detailRow}>
            <Text style={customerOrderTrackingScreenStyles.detailLabel}>Rider assegnato:</Text>
            <Text style={customerOrderTrackingScreenStyles.detailValue}>ID: {order.rider_id}</Text>
          </View>
        )}

        {order?.eta_minutes && (
          <View style={customerOrderTrackingScreenStyles.etaBox}>
            <Text style={customerOrderTrackingScreenStyles.etaBoxTitle}>⏱️ Tempo Stimato di Arrivo</Text>
            <Text style={customerOrderTrackingScreenStyles.etaBoxValue}>{order.eta_minutes} minuti</Text>
          </View>
        )}
      </View>

      {/* Refresh Button */}
      <TouchableOpacity
        style={customerOrderTrackingScreenStyles.refreshButton}
        onPress={loadTrackingInfo}
      >
        <Text style={customerOrderTrackingScreenStyles.refreshButtonText}>🔄 Aggiorna</Text>
      </TouchableOpacity>
    </View>
  );
}
