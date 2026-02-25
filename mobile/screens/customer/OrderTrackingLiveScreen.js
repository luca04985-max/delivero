import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { io } from 'socket.io-client';
import { makeRequest } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { orderTrackingLiveScreenStyles } from './styles/OrderTrackingLiveScreenStyles';

const SOCKET_URL = 'https://delivero-gyjx.onrender.com';

const statusMap = {
  pending: 'In attesa',
  confirmed: 'Confermato',
  preparing: 'In preparazione',
  ready: 'Pronto',
  picked_up: 'Ritirato',
  in_transit: 'In viaggio',
  delivered: 'Consegnato',
  cancelled: 'Annullato',
};

const translateStatus = s => statusMap[s] || s || 'In preparazione';

export default function OrderTrackingLiveScreen() {
  // route/orderId not used in this simplified tracker
  const [riders, setRiders] = useState({});
  const [loading, setLoading] = useState(true);
  const [mapKey, setMapKey] = useState(0);

  const loadActiveOrdersFallback = useCallback(async () => {
    try {
      const data = await makeRequest('/orders/active/all', { method: 'GET' });
      const list = Array.isArray(data) ? data : data?.data || [];

      const next = {};
      for (const o of list) {
        if (o?.rider_latitude == null || o?.rider_longitude == null) continue;
        const lat = parseFloat(o.rider_latitude);
        const lng = parseFloat(o.rider_longitude);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
        next[String(o.id)] = {
          orderId: o.id,
          lat,
          lng,
          eta_minutes: o.eta_minutes,
          status: o.status,
          delivery_latitude: o.delivery_latitude,
          delivery_longitude: o.delivery_longitude,
        };
      }

      if (Object.keys(next).length > 0) {
        setRiders(prev => ({ ...prev, ...next }));
        setMapKey(k => k + 1);
      }
    } catch (e) {
      // keep quiet; fallback will show loader/state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let socket;

    const initSocket = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        socket = io(SOCKET_URL, {
          auth: { token },
          transports: ['websocket'],
        });

        socket.on('activeOrderUpdate', data => {
          const id = data?.orderId;
          const lat = data?.latitude;
          const lng = data?.longitude;
          if (!id || lat == null || lng == null) return;
          setRiders(prev => ({
            ...prev,
            [String(id)]: {
              orderId: id,
              lat,
              lng,
              eta_minutes: data?.eta_minutes,
              status: data?.status,
              delivery_latitude: data?.delivery_latitude,
              delivery_longitude: data?.delivery_longitude,
            },
          }));
          setMapKey(k => k + 1);
          setLoading(false);
        });
      } catch (e) {
        setLoading(false);
      }
    };

    initSocket();
    loadActiveOrdersFallback();
    const interval = setInterval(loadActiveOrdersFallback, 15000);

    return () => {
      try {
        socket?.disconnect();
      } catch (e) {
        // ignore
      }
      clearInterval(interval);
    };
  }, [loadActiveOrdersFallback]);

  const generateMapHtml = () => {
    const riderPositions = Object.values(riders);
    let centerLat = 41.880025;
    let centerLon = 12.67594;
    let zoomLevel = 13;
    if (riderPositions.length > 0) {
      const avgLat = riderPositions.reduce((s, r) => s + r.lat, 0) / riderPositions.length;
      const avgLon = riderPositions.reduce((s, r) => s + r.lng, 0) / riderPositions.length;
      centerLat = avgLat;
      centerLon = avgLon;
      zoomLevel = 14;
    }

    const riderMarkers = riderPositions
      .map(r => 'L.marker([' + r.lat + ', ' + r.lng + '], {icon: riderIcon}).addTo(map);')
      .join('\n');

    const deliveryMarkers = riderPositions
      .map(r => {
        const dLat = r.delivery_latitude || r.lat + 0.01;
        const dLng = r.delivery_longitude || r.lng + 0.01;
        return 'L.marker([' + dLat + ', ' + dLng + '], {icon: destinationIcon}).addTo(map);';
      })
      .join('\n');

    return (
      '<!DOCTYPE html>' +
      '<html><head><meta charset="utf-8"/>' +
      '<meta name="viewport" content="width=device-width,initial-scale=1"/>' +
      '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>' +
      '<style>html,body,#map{height:100%;margin:0;padding:0}</style>' +
      '</head><body>' +
      '<div id="map"></div>' +
      '<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>' +
      '<script>' +
      "var map = L.map('map').setView([" + centerLat + ',' + centerLon + '],' + zoomLevel + ');' +
      "L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'OSM'}).addTo(map);" +
      "var riderIcon = L.divIcon({className:'rider-icon'});var destinationIcon = L.divIcon({className:'destination-icon'});" +
      riderMarkers + deliveryMarkers +
      'setTimeout(function(){map.invalidateSize();},500);' +
      '</script></body></html>'
    );
  };

  if (loading) {
    return (
      <View style={orderTrackingLiveScreenStyles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={orderTrackingLiveScreenStyles.container}>
      <WebView
        key={mapKey}
        style={orderTrackingLiveScreenStyles.map}
        source={{ html: generateMapHtml() }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => <ActivityIndicator style={orderTrackingLiveScreenStyles.loader} size="large" />}
      />
      {Object.values(riders).length > 0 && (
        <View style={orderTrackingLiveScreenStyles.etaInfoBox}>
          <Text style={orderTrackingLiveScreenStyles.etaHeader}>📍 Tracciamento Ordine</Text>
          <Text style={orderTrackingLiveScreenStyles.etaValue}>
            {translateStatus(Object.values(riders)[0]?.status)} - {Object.values(riders)[0]?.eta_minutes ? `${Object.values(riders)[0].eta_minutes} min` : 'Calcolando...'}
          </Text>
        </View>
      )}
    </View>
  );
}
 