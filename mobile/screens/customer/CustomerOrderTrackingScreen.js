import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { ordersAPI } from '../../services/api';
import * as Location from 'expo-location';
import { mobileTheme } from '../../theme';
import { customerOrderTrackingScreenStyles, customerOrderTrackingWebStyles } from './styles/CustomerOrderTrackingScreenStyles';

const styles = customerOrderTrackingScreenStyles;

// Leaflet Map for Web
/* eslint-disable-next-line no-unused-vars */
const _LeafletTrackingMap = ({ riderLocation, customerLocation, order, history = [] }) => {
  const mapContainerId = React.useMemo(() => 'customer-tracking-map-' + Math.random().toString(36).slice(2), []);

  React.useEffect(() => {
    if (Platform.OS !== 'web') return;

    const leafletCssCandidates = [
      'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css',
    ];
    const leafletJsCandidates = [
      'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js',
    ];

    const addCss = url =>
      new Promise((resolve, reject) => {
        const id = 'delivero-leaflet-css';
        if (document.getElementById(id)) return resolve();
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.id = id;
        link.onload = () => resolve();
        link.onerror = () => reject(new Error('CSS load failed: ' + url));
        document.head.appendChild(link);
      });

    const addScript = url =>
      new Promise((resolve, reject) => {
        const id = 'delivero-leaflet-js';
        if (window.L) return resolve();
        if (document.getElementById(id)) {
          // script already present but L not ready yet
          const s = document.getElementById(id);
          s.onload = () => resolve();
          s.onerror = () => reject(new Error('Script load failed: ' + url));
          return;
        }
        const script = document.createElement('script');
        script.src = url;
        script.id = id;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Script load failed: ' + url));
        document.head.appendChild(script);
      });

    const tryLoad = async () => {
      console.log('[CustomerOrderTracking] tryLoad start', mapContainerId);
      // Load CSS try list
      for (const css of leafletCssCandidates) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await addCss(css);
          console.log('[CustomerOrderTracking] loaded css', css);
          break;
        } catch (e) {
          console.warn('[CustomerOrderTracking] css failed', css, e?.message || e);
          // try next
        }
      }

      // Load JS with fallback
      let loaded = false;
      for (const js of leafletJsCandidates) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await addScript(js);
          console.log('[CustomerOrderTracking] loaded js', js);
          loaded = true;
          break;
        } catch (e) {
          console.warn('[CustomerOrderTracking] js failed', js, e?.message || e);
          // next
        }
      }

      if (!loaded || !window.L || !document.getElementById(mapContainerId)) {
        console.error('[CustomerOrderTracking] Leaflet not loaded or container missing', { loaded, hasL: !!window.L, mapContainerIdExists: !!document.getElementById(mapContainerId) });
        if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'cdn_failed', loaded, hasL: !!window.L }));
        return;
      }

      const L = window.L;

      // Namespace maps to reuse them
      window._deliveroMaps = window._deliveroMaps || {};
      let state = window._deliveroMaps[mapContainerId];

      const riderLat = riderLocation?.latitude || 40.7128;
      const riderLng = riderLocation?.longitude || -74.006;
      const customerLat = customerLocation?.latitude || 40.71;
      const customerLng = customerLocation?.longitude || -74.007;

      const centerLat = (riderLat + customerLat) / 2;
      const centerLng = (riderLng + customerLng) / 2;

      if (!state) {
        const map = L.map(mapContainerId).setView([centerLat, centerLng], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        state = { map, riderMarker: null, customerMarker: null, polylines: [] };
        window._deliveroMaps[mapContainerId] = state;
        console.log('[CustomerOrderTracking] map created', mapContainerId, centerLat, centerLng);
        if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'map_created', mapContainerId }));
      } else {
        try {
          state.map.setView([centerLat, centerLng], state.map.getZoom());
          console.log('[CustomerOrderTracking] map re-centered', centerLat, centerLng);
        } catch (e) {}
      }

      // Clear previous overlays
      state.polylines.forEach(p => {
        try { state.map.removeLayer(p); } catch (e) {}
      });
      state.polylines = [];
      if (state.riderMarker) {
        try { state.map.removeLayer(state.riderMarker); } catch (e) {}
        state.riderMarker = null;
      }
      if (state.customerMarker) {
        try { state.map.removeLayer(state.customerMarker); } catch (e) {}
        state.customerMarker = null;
      }

      // Rider marker
      const riderIcon = L.divIcon({
        className: 'rider-marker',
        html: `<div style="width:40px;height:40px;background:${mobileTheme.colors.errorBg};border:3px solid ${mobileTheme.colors.error};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 2px 8px rgba(220,38,38,0.4);animation:pulse 2s infinite;">🏍️</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20],
      });

      state.riderMarker = L.marker([riderLat, riderLng], { icon: riderIcon })
        .bindPopup(`<b>🏍️ Rider in consegna</b><br>ETA: ${order?.eta_minutes || 15} min`)
        .addTo(state.map);
      console.log('[CustomerOrderTracking] rider marker added', riderLat, riderLng);
      if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'marker:rider', lat: riderLat, lon: riderLng }));

      // Customer marker
      const customerIcon = L.divIcon({
        className: 'customer-marker',
        html: `<div style="width:40px;height:40px;background:${mobileTheme.colors.customer}33;border:3px solid ${mobileTheme.colors.customer};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 2px 8px rgba(2,132,199,0.3);">🏠</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20],
      });

      state.customerMarker = L.marker([customerLat, customerLng], { icon: customerIcon })
        .bindPopup('<b>🏠 La tua posizione</b>')
        .addTo(state.map);
      console.log('[CustomerOrderTracking] customer marker added', customerLat, customerLng);
      if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'marker:customer', lat: customerLat, lon: customerLng }));

      // Draw polyline
      if (history && Array.isArray(history) && history.length > 0) {
        const pts = history.map(p => [parseFloat(p.latitude), parseFloat(p.longitude)]);
        const poly = L.polyline(pts, { color: mobileTheme.colors.error, weight: 3 }).addTo(state.map);
        state.polylines.push(poly);
        console.log('[CustomerOrderTracking] history polyline added, pts:', pts.length);
        if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'polyline:history', points: pts.length }));
      } else {
        const poly = L.polyline([[riderLat, riderLng], [customerLat, customerLng]], {
          color: mobileTheme.colors.customer,
          weight: 2,
          opacity: 0.7,
          dashArray: '5, 5',
        }).addTo(state.map);
        state.polylines.push(poly);
        console.log('[CustomerOrderTracking] simple polyline added', { riderLat, riderLng, customerLat, customerLng });
        if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'polyline:simple' }));
      }

      // Destination marker as small dot
      try {
        L.circleMarker([customerLat, customerLng], { radius: 6, color: '#ff5722', fillColor: '#ff5722', fillOpacity: 1 }).addTo(state.map);
      } catch (e) {}

      // Add mid-route info popup: ETA, rider id, distance
      try {
        function haversine(lat1, lon1, lat2, lon2){
          var toRad = function(v){return v*Math.PI/180;};
          var R = 6371; // km
          var dLat = toRad(lat2-lat1);
          var dLon = toRad(lon2-lon1);
          var a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)*Math.sin(dLon/2);
          var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          return R*c;
        }
        var distKm = haversine(riderLat, riderLng, customerLat, customerLng).toFixed(2);
        var midLat = (riderLat + customerLat)/2;
        var midLng = (riderLng + customerLng)/2;
        var infoHtml = '<div style="font-size:12px;line-height:1.2">Rider: ' + (order?.rider_id || '--') + '<br/>ETA: ' + (order?.eta_minutes || '--') + ' min<br/>Distanza: ' + distKm + ' km</div>';
        L.popup({closeButton:false, autoClose:false, className:'customer-route-info'}).setLatLng([midLat, midLng]).setContent(infoHtml).addTo(state.map);
      } catch (e) {}

      const bounds = L.latLngBounds([[riderLat, riderLng], [customerLat, customerLng]]);
      try { state.map.fitBounds(bounds, { padding: [100, 100] }); } catch (e) {}
    };

    tryLoad();

    // Add CSS for animation only once
    if (!document.getElementById('delivero-leaflet-style')) {
      const injectedStyle = document.createElement('style');
      injectedStyle.id = 'delivero-leaflet-style';
      injectedStyle.textContent = `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `;
      document.head.appendChild(injectedStyle);
    }

    return () => {
      try {
        const s = window._deliveroMaps && window._deliveroMaps[mapContainerId];
        if (s && s.map) {
          s.map.remove();
          delete window._deliveroMaps[mapContainerId];
        }
      } catch (e) {}
    };
  }, [riderLocation, customerLocation, order?.eta_minutes, history, mapContainerId]);

  return (
    <View style={styles.mapContainer}>
      <div id={mapContainerId} style={customerOrderTrackingWebStyles.leafletDiv} />
    </View>
  );
};

export default function CustomerOrderTrackingScreen({ route, navigation }) {
  const { orderId } = route.params || {};
  const [order, setOrder] = useState(null);
  const [loading] = useState(true);
  const [riderLocation, setRiderLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [trackHistory, setTrackHistory] = useState([]);
  const [, setRefreshing] = useState(false);

  const loadTrackingInfo = React.useCallback(async () => {
    try {
      setRefreshing(true);
      console.log('📍 Loading tracking info for order:', orderId);
      const trackingData = await ordersAPI.getTrackingInfo(orderId);
      console.log('📍 Tracking data received:', trackingData);

      setOrder(trackingData);

      if (trackingData.rider_latitude && trackingData.rider_longitude) {
        const riderLoc = {
          latitude: parseFloat(trackingData.rider_latitude),
          longitude: parseFloat(trackingData.rider_longitude),
        };
        console.log('📍 Setting rider location:', riderLoc);
        setRiderLocation(riderLoc);
      } else {
        console.warn('📍 No rider location in tracking data');
      }

      // fetch track history
      try {
        const pts = await ordersAPI.getTrackHistory(orderId);
        setTrackHistory(pts || []);
      } catch (e) {
        console.warn('📍 Could not fetch track history', e);
      }
    } catch (error) {
      console.error('📍 Error loading tracking info:', error);
    } finally {
      setRefreshing(false);
    }
  }, [orderId]);

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
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
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
      navigator.geolocation.getCurrentPosition(position => {
        setCustomerLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }

    // Refresh tracking every 10 seconds
    const interval = setInterval(loadTrackingInfo, 10000);
    return () => clearInterval(interval);
  }, [orderId, loadTrackingInfo, navigation]);

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

  

  if (loading) {
    return (
      <View style={customerOrderTrackingScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color={mobileTheme.colors.primary} />
        <Text style={customerOrderTrackingScreenStyles.loadingText}>
          Caricamento tracciamento...
        </Text>
      </View>
    );
  }

  // Generate HTML for OpenStreetMap with rider and customer tracking
  const generateCustomerTrackingMapHtml = () => {
    const riderLat = riderLocation?.latitude;
    const riderLon = riderLocation?.longitude;
    const customerLat = customerLocation?.latitude || 41.880025;
    const customerLon = customerLocation?.longitude || 12.67594;

    // Center on customer location if no rider location
    const centerLat = riderLat ? (riderLat + customerLat) / 2 : customerLat;
    const centerLon = riderLon ? (riderLon + customerLon) / 2 : customerLon;
    const zoomLevel = riderLat ? 14 : 16; // Zoom più alto se solo cliente

    const polyline =
      trackHistory.length > 0
        ? trackHistory.map(p => `[${p.latitude}, ${p.longitude}]`).join(',')
        : riderLat
          ? `[[${riderLat}, ${riderLon}], [${customerLat}, ${customerLon}]]`
          : null;

    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <style>
              body { margin:0; padding:0; }
              #map { position:absolute; top:0; bottom:0; width:100%; height:100%; }
              .info-panel { background: rgba(255,255,255,0.95); padding:8px; border-radius:6px; font-size:13px; }
              .leaflet-routing-container { display:none !important; }
          </style>
      </head>
      <body>
          <div id="map"></div>
          <script>
            (function(){
              var cssCandidates = ['https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css'];
              var jsCandidates = ['https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js'];
              var routingCandidates = ['https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet-routing-machine/3.2.12/leaflet-routing-machine.min.js'];

              function loadCss(url){return new Promise(function(resolve,reject){ if(document.querySelector('link[href="'+url+'"]')) return resolve(); var l=document.createElement('link'); l.rel='stylesheet'; l.href=url; l.onload=resolve; l.onerror=function(){reject(url)}; document.head.appendChild(l); });}
              function loadScript(url){return new Promise(function(resolve,reject){ if(window.L) return resolve(); var s=document.createElement('script'); s.src=url; s.onload=resolve; s.onerror=function(){reject(url)}; document.head.appendChild(s); });}
              function tryList(list, loader){ return list.reduce(function(p,url){ return p.catch(function(){return loader(url);}); }, Promise.reject()); }

              function post(msg){ if(window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(msg)); else console.log('customer:web:', msg); }

              Promise.resolve()
                .then(function(){ return tryList(cssCandidates, loadCss).then(function(){ post({type:'cdn:css:loaded'}); }).catch(function(){ post({type:'cdn:css:failed'}); }); })
                .then(function(){ return tryList(jsCandidates, loadScript).then(function(){ post({type:'cdn:js:loaded'}); }); })
                .then(function(){ return tryList(routingCandidates, loadScript).then(function(){ post({type:'cdn:routing:loaded'}); }).catch(function(){ post({type:'cdn:routing:failed'}); }); })
                .then(function(){
                  if (!window.L) { post({type:'leaflet:not_available'}); return; }
                  post({type:'map:init', center:[${centerLat}, ${centerLon}], zoom:${zoomLevel}});
                  var map = L.map('map').setView([${centerLat}, ${centerLon}], ${zoomLevel});
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(map);

                  function addRiderMarker(lat, lon){
                    try{
                      var icon = L.divIcon({ className:'rider-marker', html: '<div style="width:40px;height:40px;background:${mobileTheme.colors.errorBg};border:3px solid ${mobileTheme.colors.error};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;">🏍️</div>', iconSize:[40,40], iconAnchor:[20,20] });
                      var m = L.marker([lat, lon], { icon: icon }).addTo(map);
                      try{ m.bindPopup('<b>🏍️ Rider</b><br/>ETA: ${order?.eta_minutes || '--'} min'); }catch(e){}
                      post({type:'marker:rider', lat:lat, lon:lon});
                      return m;
                    }catch(e){ console.warn('rider marker failed', e); }
                  }

                  function addCustomerMarker(lat, lon){
                    try{
                      var icon = L.divIcon({ className:'customer-marker', html: '<div style="width:40px;height:40px;background:${mobileTheme.colors.customer}33;border:3px solid ${mobileTheme.colors.customer};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;">🏠</div>', iconSize:[40,40], iconAnchor:[20,20] });
                      var m = L.marker([lat, lon], { icon: icon }).addTo(map);
                      try{ m.bindPopup('<b>🏠 Area di consegna</b><br/>${order?.delivery_address || 'Indirizzo non disponibile'}'); }catch(e){}
                      post({type:'marker:customer', lat:lat, lon:lon});
                      return m;
                    }catch(e){ console.warn('customer marker failed', e); }
                  }

                  var riderLat = ${riderLat || 'null'};
                  var riderLon = ${riderLon || 'null'};
                  var customerLat = ${customerLat};
                  var customerLon = ${customerLon};

                  if (riderLat && riderLon) {
                    addRiderMarker(riderLat, riderLon);
                  }
                  addCustomerMarker(customerLat, customerLon);

                  // Routing: try routing machine if available, otherwise simple polyline
                  try{
                    if (window.L && window.L.Routing && riderLat && riderLon) {
                      var control = L.Routing.control({
                        waypoints: [L.latLng(riderLat, riderLon), L.latLng(customerLat, customerLon)],
                        router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
                        createMarker: function() { return null; },
                        addWaypoints: false,
                        show: false,
                        routeWhileDragging: false,
                        fitSelectedRoute: true,
                        lineOptions: { styles: [{ color: '${mobileTheme.colors.error}', weight: 4, opacity: 0.9 }] }
                      }).addTo(map);
                      control.on('routesfound', function(e){ post({type:'route:found', orderId:${order?.id || null}}); });
                      control.on('routingerror', function(err){ post({type:'route:error', error: String(err)}); });
                    } else {
                      // fallback polyline
                      if (riderLat && riderLon) {
                        var pts = [[riderLat, riderLon], [customerLat, customerLon]];
                        L.polyline(pts, { color: '${mobileTheme.colors.error}', weight: 3 }).addTo(map);
                        post({type:'route:fallback', points: pts.length});
                        var bounds = L.latLngBounds(pts);
                        try { map.fitBounds(bounds, { padding: [50, 50] }); } catch (e) {}
                      }
                    }
                  } catch (e) { console.warn('route draw failed', e); post({type:'route:failed', error:String(e)}); }

                  // Add info control (bottom-left)
                  try{
                    var dist = '--';
                    if (riderLat && riderLon) {
                      var toRad = function(v){return v*Math.PI/180;};
                      var R = 6371;
                      var dLat = toRad(customerLat - riderLat);
                      var dLon = toRad(customerLon - riderLon);
                      var a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(toRad(riderLat))*Math.cos(toRad(customerLat))*Math.sin(dLon/2)*Math.sin(dLon/2);
                      var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                      dist = (R*c).toFixed(2);
                    }
                    var infoHtml = '<div class="info-panel">Rider: ${order?.rider_id || '--'}<br/>ETA: ${order?.eta_minutes || '--'} min<br/>Distanza: ' + dist + ' km</div>';
                    var infoControl = L.control({position:'bottomleft'});
                    infoControl.onAdd = function(){ var div = L.DomUtil.create('div'); div.innerHTML = infoHtml; return div; };
                    infoControl.addTo(map);
                    post({type:'control:info_added'});
                  }catch(e){ console.warn('info control failed', e); }

                })
                .catch(function(err){ post({type:'map:init_failed', error:String(err)}); });
            })();
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
          <Text style={customerOrderTrackingScreenStyles.title}>📍 Tracciamento Ordine</Text>
          <View style={customerOrderTrackingScreenStyles.statusBadge}>
            <Text style={customerOrderTrackingScreenStyles.statusText}>
              {statusEmoji[order?.status] || '📦'}
            </Text>
          </View>
        </View>
      </View>

      {/* Status Badge */}
      <View style={customerOrderTrackingScreenStyles.statusContainer}>
        <Text style={customerOrderTrackingScreenStyles.statusText}>
          {statusText[order?.status] || 'Non disponibile'}
        </Text>
        {order?.eta_minutes && order?.status === 'in_transit' && (
          <Text style={customerOrderTrackingScreenStyles.etaText}>
            ETA: {order.eta_minutes} minuti
          </Text>
        )}
      </View>

      {/* Map */}
      {(() => {
        console.log('📍 Map render check:', { riderLocation, customerLocation, order });
        // Show map if we have any location data or at least the order
        return customerLocation || order;
      })() && (
        <View style={customerOrderTrackingScreenStyles.mapContainer}>
          <WebView
            style={customerOrderTrackingScreenStyles.map}
            source={{ html: generateCustomerTrackingMapHtml() }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator style={customerOrderTrackingScreenStyles.mapLoader} size="large" />
            )}
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
          <Text style={customerOrderTrackingScreenStyles.detailValue}>
            €{parseFloat(order?.total_amount || 0).toFixed(2)}
          </Text>
        </View>

        <View style={customerOrderTrackingScreenStyles.detailRow}>
          <Text style={customerOrderTrackingScreenStyles.detailLabel}>Consegna a:</Text>
          <Text style={customerOrderTrackingScreenStyles.detailValue}>
            {order?.delivery_address || 'Indirizzo non disponibile'}
          </Text>
        </View>

        {order?.rider_id && (
          <View style={customerOrderTrackingScreenStyles.detailRow}>
            <Text style={customerOrderTrackingScreenStyles.detailLabel}>Rider assegnato:</Text>
            <Text style={customerOrderTrackingScreenStyles.detailValue}>ID: {order.rider_id}</Text>
          </View>
        )}

        {order?.eta_minutes && (
          <View style={customerOrderTrackingScreenStyles.etaBox}>
            <Text style={customerOrderTrackingScreenStyles.etaBoxTitle}>
              ⏱️ Tempo Stimato di Arrivo
            </Text>
            <Text style={customerOrderTrackingScreenStyles.etaBoxValue}>
              {order.eta_minutes} minuti
            </Text>
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
