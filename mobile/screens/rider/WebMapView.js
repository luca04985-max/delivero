import React, { useEffect } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { mobileTheme } from '../../theme';

export default function WebMapView({ orders = [], riderLocation }) {
  const isWeb = Platform.OS === 'web';

  const mapId = 'rider-map-container';

  useEffect(() => {
    if (!isWeb) return;
    // Caricamento dinamico di Leaflet solo se siamo su Web
    const L = window.L;
    if (!L) return;

    const map = L.map(mapId).setView(
      [riderLocation?.latitude || 41.89, riderLocation?.longitude || 12.49],
      13,
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Marker Rider
    if (riderLocation) {
      L.marker([riderLocation.latitude, riderLocation.longitude], {
        icon: L.divIcon({ html: '🚴', className: 'rider-icon', iconSize: [30, 30] }),
      })
        .addTo(map)
        .bindPopup('Tu');
    }

    // Marker Ordini
    orders.forEach(order => {
      if (order.lat && order.lng) {
        L.marker([order.lat, order.lng]).addTo(map).bindPopup(`Ordine #${order.id}`);
      }
    });

    return () => map.remove();
  }, [isWeb, orders, riderLocation]);

  if (!isWeb) return null;

  return <View id={mapId} style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    borderRadius: mobileTheme.borderRadius.md,
    overflow: 'hidden',
  },
});
}
