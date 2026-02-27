import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { io } from 'socket.io-client';
import { makeRequest } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { managerRealTimeMapScreenStyles } from './styles/ManagerRealTimeMapScreenStyles';
import { mobileTheme } from '../../theme';

const SOCKET_URL = 'https://delivero-gyjx.onrender.com';

export default function ManagerRealTimeMapScreen({ route }) {
  const { orderId } = route.params || {}; // Get orderId from navigation params
  const [riders, setRiders] = useState({});
  const [, setLoading] = useState(true);
  const [mapKey, setMapKey] = useState(0); // Force WebView remount
  // region state removed (not used)

  const loadActiveOrdersFallback = useCallback(async () => {
    try {
      console.log('[ManagerRealTimeMap] === STARTING FALLBACK FETCH ===');

      // If orderId is specified, fetch only that order
      if (orderId) {
        console.log('[ManagerRealTimeMap] fetching single order:', orderId);
        const data = await makeRequest(`/orders/active/all`, { method: 'GET' });
        const list = Array.isArray(data) ? data : data?.data || [];
        const targetOrder = list.find(o => String(o.id) === String(orderId));

        if (targetOrder) {
          console.log('[ManagerRealTimeMap] found target order:', targetOrder);
          const next = {};
          const { rider_latitude, rider_longitude } = targetOrder;

          if (rider_latitude != null && rider_longitude != null) {
            const lat = parseFloat(rider_latitude);
            const lng = parseFloat(rider_longitude);

            if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
              console.log('[ManagerRealTimeMap] invalid coords for order:', orderId);
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

            console.log('[ManagerRealTimeMap] added single rider for order:', orderId);
            setRiders(next);
          } else {
            console.log('[ManagerRealTimeMap] no rider coords for order:', orderId);
          }
          setLoading(false);
          return;
        }
      }

      // Otherwise, fetch all orders (default behavior)
      console.log('[ManagerRealTimeMap] fallback fetch /orders/active/all');
      const data = await makeRequest('/orders/active/all', { method: 'GET' });
      console.log('[ManagerRealTimeMap] raw response:', data);

      const list = Array.isArray(data) ? data : data?.data || [];
      console.log('[ManagerRealTimeMap] parsed list length:', list.length);
      if (list.length > 0) {
        console.log('[ManagerRealTimeMap] first item:', list[0]);
      }

      // Process all orders (only if no specific orderId)
      const next = {};
      for (const o of list) {
        if (o?.rider_latitude == null || o?.rider_longitude == null) {
          console.log('[ManagerRealTimeMap] skipping order - missing coords:', o.id);
          continue;
        }
        const lat = parseFloat(o.rider_latitude);
        const lng = parseFloat(o.rider_longitude);
        // keep only concise debug info
        console.log('[ManagerRealTimeMap] parsed coords for order', o.id);
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

      // brief summary per run
      console.log('[ManagerRealTimeMap] riders prepared count:', Object.keys(next).length);

      if (nextCount > 0) {
        console.log('[ManagerRealTimeMap] setting riders state...');
        setRiders(prev => {
          const updated = { ...prev, ...next };
          // Force WebView remount to show new markers
          setMapKey(k => k + 1);
          return updated;
        });
      }

      setLoading(false);
    } catch (e) {
      console.log('[ManagerRealTimeMap] fallback fetch error', e?.message || e);
      setLoading(false);
    }
  }, [orderId]);

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

        socket.on('disconnect', reason => {
          console.log('[ManagerRealTimeMap] socket disconnected', reason);
        });

        socket.on('connect_error', err => {
          console.log('[ManagerRealTimeMap] socket connect_error', err?.message || err);
        });

        socket.on('error', err => {
          console.log('[ManagerRealTimeMap] socket error', err?.message || err);
        });

        // Backend emits updates to managers room on rider location/order status
        socket.on('activeOrderUpdate', data => {
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
            },
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
  }, [loadActiveOrdersFallback]);

  // Temporaneamente disabilitato per test
  // if (Platform.OS === 'web') {
  //     console.log('[ManagerRealTimeMap] PLATFORM IS WEB - showing web message');
  //     return <View style={managerRealTimeMapScreenStyles.center}><Text>Usa la Dashboard Web per la mappa interattiva</Text></View>;
  // }

  console.log('[ManagerRealTimeMap] PLATFORM IS MOBILE - rendering map');

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

    // Marker per ogni rider (styled, senza popup)
    const riderMarkers = riderPositions
      .map(
        r => `
            (function(){
              try{
                var iconHtml = '<div style="width:36px;height:36px;background:linear-gradient(135deg, ${mobileTheme.colors.primary} 0%, ${mobileTheme.colors.primary}dd 100%);color:#fff;display:flex;align-items:center;justify-content:center;border-radius:50%;font-weight:700;box-shadow:0 6px 16px rgba(0,0,0,0.2);border:2px solid rgba(255,255,255,0.25);font-size:18px;position:relative;overflow:hidden;"><div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);border-radius:50%;"></div>🏍️</div>';
                var icon = L.divIcon({ className: 'rider-marker-icon', html: iconHtml, iconSize: [36, 36], iconAnchor: [18, 18] });
                var marker = L.marker([${r.lat}, ${r.lng}], { icon: icon, zIndexOffset: 800 }).addTo(map);
                
                // Add subtle pulse animation
                try {
                  var pulseDiv = marker.getElement().querySelector('.rider-marker-icon');
                  if (pulseDiv) {
                    pulseDiv.style.animation = 'riderPulse 2s infinite';
                  }
                } catch(e) {}
              }catch(e){ console.warn('rider marker render failed', e); }
            })();
        `,
      )
      .join('\n');

    // Aggiungi percorsi per ogni rider verso la sua destinazione
    const routes = riderPositions
      .map(r => {
        // Se non ci sono coordinate delivery, usa coordinate di fallback basate sulla posizione rider
        const deliveryLat = r.delivery_latitude || r.lat + 0.01;
        const deliveryLon = r.delivery_longitude || r.lng + 0.01;

        return `
                (function(){
                  var riderLat=${r.lat}, riderLon=${r.lng};
                  var deliveryLat=${deliveryLat}, deliveryLon=${deliveryLon};
                  try { window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:script_started:${r.orderId}'); } catch(e){}
                  try {
                    if (window.L && window.L.Routing && window.L.Routing.osrmv1) {
                      try { window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:using_routing:${r.orderId}'); } catch(e){}
                      // Use Routing Machine to draw route along roads (OSRM)
                      var control = L.Routing.control({
                        waypoints: [L.latLng(riderLat, riderLon), L.latLng(deliveryLat, deliveryLon)],
                        router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
                        createMarker: function() { return null; },
                        addWaypoints: false,
                        routeWhileDragging: false,
                        show: false,
                        fitSelectedRoute: false,
                        lineOptions: { styles: [{ color: '${mobileTheme.colors.primary}', weight: 4, opacity: 0.9 }] }
                      }).addTo(map);
                      // When route is found, optionally post message
                      control.on('routesfound', function(e){ try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:found:${r.orderId}'); }catch(ex){} });
                      control.on('routingerror', function(err){
                        console.warn('routing error', err);
                        try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:error:${r.orderId}:'+ (err && err.message)); }catch(e){}
                        // Try OSRM HTTP fallback before straight polyline
                        try {
                          var osrmUrl = 'https://router.project-osrm.org/route/v1/driving/' + riderLon + ',' + riderLat + ';' + deliveryLon + ',' + deliveryLat + '?overview=full&geometries=geojson';
                          fetch(osrmUrl).then(function(resp){ return resp.json(); }).then(function(json){
                            if (json && json.routes && json.routes.length>0 && json.routes[0].geometry && json.routes[0].geometry.coordinates) {
                              var coords = json.routes[0].geometry.coordinates.map(function(c){ return [c[1], c[0]]; });
                              L.polyline(coords, { color: '${mobileTheme.colors.primary}', weight:4, opacity:0.85 }).addTo(map);
                              try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:osrm_drawn:${r.orderId}'); }catch(e){}
                            } else {
                              L.polyline([[riderLat, riderLon],[deliveryLat, deliveryLon]], { color: '${mobileTheme.colors.primary}', weight:4, opacity:0.6 }).addTo(map);
                              try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:fallback_drawn:${r.orderId}'); }catch(e){}
                            }
                          }).catch(function(e2){ console.warn('osrm fetch failed', e2); L.polyline([[riderLat, riderLon],[deliveryLat, deliveryLon]], { color: '${mobileTheme.colors.primary}', weight:4, opacity:0.6 }).addTo(map); try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:osrm_error:${r.orderId}:'+String(e2)); }catch(e){} });
                        } catch (ex) {
                          L.polyline([[riderLat, riderLon],[deliveryLat, deliveryLon]], { color: '${mobileTheme.colors.primary}', weight:4, opacity:0.6 }).addTo(map);
                          try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:fallback_drawn:${r.orderId}'); }catch(e){}
                        }
                      });
                    } else {
                      // Try OSRM HTTP fallback then straight polyline
                      try {
                        var osrmUrl2 = 'https://router.project-osrm.org/route/v1/driving/' + riderLon + ',' + riderLat + ';' + deliveryLon + ',' + deliveryLat + '?overview=full&geometries=geojson';
                        fetch(osrmUrl2).then(function(resp){ return resp.json(); }).then(function(json){
                          if (json && json.routes && json.routes.length>0 && json.routes[0].geometry && json.routes[0].geometry.coordinates) {
                            var coords = json.routes[0].geometry.coordinates.map(function(c){ return [c[1], c[0]]; });
                            L.polyline(coords, { color: '${mobileTheme.colors.primary}', weight:4, opacity:0.85 }).addTo(map);
                            try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:osrm_drawn:${r.orderId}'); }catch(e){}
                          } else {
                            L.polyline([[riderLat, riderLon],[deliveryLat, deliveryLon]], { color: '${mobileTheme.colors.primary}', weight:4, opacity:0.8 }).addTo(map);
                            try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:fallback_drawn:${r.orderId}'); }catch(e){}
                          }
                        }).catch(function(e2){ console.warn('osrm fetch failed', e2); L.polyline([[riderLat, riderLon],[deliveryLat, deliveryLon]], { color: '${mobileTheme.colors.primary}', weight:4, opacity:0.6 }).addTo(map); try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:osrm_error:${r.orderId}:'+String(e2)); }catch(e){} });
                      } catch (ex) {
                        L.polyline([[riderLat, riderLon],[deliveryLat, deliveryLon]], { color: '${mobileTheme.colors.primary}', weight:4, opacity:0.6 }).addTo(map);
                        try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:fallback_drawn:${r.orderId}'); }catch(e){}
                      }
                    }
                  } catch(e) {
                    try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:exception_fallback:' + r.orderId + ':' + (e && e.message)); }catch(e){}
                  }

                  // Destination marker (styled) — arancione come customer
                  try{
                    var destHtml = '<div style="width:20px;height:20px;background:#ff5722;color:#fff;display:flex;align-items:center;justify-content:center;border-radius:50%;font-weight:700;box-shadow:0 4px 8px rgba(0,0,0,0.2);border:2px solid rgba(255,255,255,0.25);font-size:10px;">📍</div>';
                    var destIcon = L.divIcon({ className: 'dest-marker-icon', html: destHtml, iconSize: [20, 20], iconAnchor: [10, 10] });
                    L.marker([deliveryLat, deliveryLon], { icon: destIcon, zIndexOffset: 700 }).addTo(map);
                  }catch(e){ try{ L.circleMarker([deliveryLat, deliveryLon], { radius:8, color: '#ff5722', fillColor:'#ff5722', fillOpacity:1 }).addTo(map); }catch(_){} }
                })();
        `;
      })
      .join('\n');

    // Complete HTML template
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />
    <style>
        html, body, #map { height: 100%; width: 100%; margin: 0; padding: 0; }
        .rider-marker-icon { background: transparent !important; border: none !important; }
        .dest-marker-icon { background: transparent !important; border: none !important; }
        .info-panel { background: rgba(9, 13, 248, 0.95); padding: 8px 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); font-size: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 8px; }
        @keyframes riderPulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }
    </style>
</head>
<body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
    <script>
        var map = L.map('map').setView([${centerLat}, ${centerLon}], ${zoomLevel});
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Add rider markers
        ${riderMarkers}
        
        // Add routes
        ${routes}
        
        // Notify React Native that map is ready
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('map:ready');
        }
            
    </script>
</body>
</html>
    `;
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
        onMessage={e => console.log('[ManagerRealTimeMap] WebView message:', e.nativeEvent.data)}
        onError={e => console.error('[ManagerRealTimeMap] WebView error:', e.nativeEvent)}
        renderLoading={() => (
          <ActivityIndicator style={managerRealTimeMapScreenStyles.loader} size="large" />
        )}
      />
    </View>
  );
}