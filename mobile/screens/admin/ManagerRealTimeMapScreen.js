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
                var iconHtml = '<div style="width:40px;height:40px;background:${mobileTheme.colors.primary};color:#fff;display:flex;align-items:center;justify-content:center;border-radius:50%;font-weight:700;box-shadow:0 6px 14px rgba(0,0,0,0.18);">' + (String(${r.orderId}).slice(-2)) + '</div>';
                var icon = L.divIcon({ className: 'rider-marker-icon', html: iconHtml, iconSize:[40,40], iconAnchor:[20,20] });
                L.marker([${r.lat}, ${r.lng}], { icon: icon, zIndexOffset: 600 }).addTo(map);
              }catch(e){ console.warn('rider marker render failed', e); }
            })();
        `,
      )
      .join('\n');

    // Aggiungi percorsi per ogni rider verso la sua destinazione
    var routes = riderPositions
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
                        }).catch(function(e2){ console.warn('osrm fetch failed', e2); L.polyline([[riderLat, riderLon],[deliveryLat, deliveryLon]], { color: '${mobileTheme.colors.primary}', weight:4, opacity:0.8 }).addTo(map); try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:osrm_error:${r.orderId}:'+String(e2)); }catch(e){} });
                      } catch (ex) {
                        L.polyline([[riderLat, riderLon],[deliveryLat, deliveryLon]], { color: '${mobileTheme.colors.primary}', weight:4, opacity:0.8 }).addTo(map);
                        try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:fallback_drawn:${r.orderId}'); }catch(e){}
                      }
                    }
                  } catch (e) {
                    console.warn('route draw failed', e);
                    L.polyline([[riderLat, riderLon],[deliveryLat, deliveryLon]], { color: '${mobileTheme.colors.primary}', weight:4, opacity:0.8 }).addTo(map);
                    try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('route:exception_fallback:${r.orderId}:'+ (e && e.message)); }catch(e){}
                  }

                  // Destination marker (styled) — no popup
                  try{
                    var destHtml = '<div style="width:18px;height:18px;background:#ff5722;border-radius:50%;box-shadow:0 4px 10px rgba(0,0,0,0.18);"></div>';
                    var destIcon = L.divIcon({ className: 'dest-marker-icon', html: destHtml, iconSize:[18,18], iconAnchor:[9,9] });
                    L.marker([deliveryLat, deliveryLon], { icon: destIcon, zIndexOffset: 500 }).addTo(map);
                  }catch(e){ try{ L.circleMarker([deliveryLat, deliveryLon], { radius:6, color: '#ff5722', fillColor:'#ff5722', fillOpacity:1 }).addTo(map); }catch(_){} }

                  // Midpoint info (compute distance) and add entry to bottom panel
                  var midLat = (riderLat + deliveryLat)/2;
                  var midLon = (riderLon + deliveryLon)/2;
                  function haversine(lat1, lon1, lat2, lon2){
                    var toRad = function(v){return v*Math.PI/180;};
                    var R = 6371; // km
                    var dLat = toRad(lat2-lat1);
                    var dLon = toRad(lon2-lon1);
                    var a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)*Math.sin(dLon/2);
                    var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                    return R*c;
                  }
                  var distKm = haversine(riderLat, riderLon, deliveryLat, deliveryLon).toFixed(2);
                  try {
                    var panel = document.getElementById('route-info-panel');
                    if (panel) {
                      var entry = document.createElement('div');
                      entry.className = 'route-entry';
                      entry.innerHTML = '<div class="avatar" style="background:'+ '${mobileTheme.colors.primary}' +'; width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;">🏍️</div><div class="meta"><b>Ordine: ${r.orderId}</b><br/>ETA: ${r.eta_minutes || "--"} min<br/>' + distKm + ' km</div>';
                      panel.appendChild(entry);
                      try { window.ReactNativeWebView && window.ReactNativeWebView.postMessage('panel:entry_added:${r.orderId}'); } catch(e){}
                    }
                  } catch (e) { console.warn('panel add failed', e); }
                })();
            `;
      })
      .join('\n');

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <style>
            body { margin:0; padding:0; }
            #map { position:absolute; top:0; bottom:0; width:100%; height:100%; }
            .route-info-popup .leaflet-popup-content-wrapper { background: rgba(255,255,255,0.95); border-radius:6px; padding:6px 8px; }
            .route-info-box { font-size:12px; line-height:1.2; }
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
          <script>
            (function(){
              var leafletCssCandidates = ['https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css'];
              var leafletJsCandidates = ['https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js'];
              var routingJsCandidates = ['https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet-routing-machine/3.2.12/leaflet-routing-machine.min.js'];

              function loadCss(url){return new Promise(function(resolve,reject){
              if(document.querySelector('link[href="'+url+'"]')) return resolve();
              var l=document.createElement('link'); l.rel='stylesheet'; l.href=url; l.onload=resolve; l.onerror=function(){reject(url)}; document.head.appendChild(l);
              });}

              function loadScript(url){return new Promise(function(resolve,reject){
              if(window.L) return resolve();
              var s=document.createElement('script'); s.src=url; s.onload=resolve; s.onerror=function(){reject(url)}; document.head.appendChild(s);
              });}

              function tryList(list, loader){
              return list.reduce(function(p,url){
                return p.catch(function(){return loader(url);});
              }, Promise.reject());
              }

                      Promise.resolve()
                        .then(function(){ return tryList(leafletCssCandidates, loadCss).then(function(){ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('cdn:css:loaded'); }).catch(function(){ console.warn('Leaflet CSS failed'); window.ReactNativeWebView && window.ReactNativeWebView.postMessage('cdn:css:failed'); }); })
                        .then(function(){ return tryList(leafletJsCandidates, loadScript).then(function(){ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('cdn:js:loaded'); }); })
                        .then(function(){ return tryList(routingJsCandidates, loadScript).then(function(){ window.ReactNativeWebView && window.ReactNativeWebView.postMessage('cdn:routing:loaded'); }).catch(function(){console.warn('Routing machine failed'); window.ReactNativeWebView && window.ReactNativeWebView.postMessage('cdn:routing:failed');}); })
                        .then(function(){
                            if(!window.L) { console.error('Leaflet not available'); window.ReactNativeWebView && window.ReactNativeWebView.postMessage('leaflet:not_available'); return; }
                                window.ReactNativeWebView && window.ReactNativeWebView.postMessage('map:init');
                                console.log('🗺️ Admin map initializing...');
                                var map = L.map('map').setView([${centerLat}, ${centerLon}], ${zoomLevel});
                                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'OpenStreetMap contributors' }).addTo(map);
                                // create bottom panel container
                                if (!document.getElementById('route-info-panel')) {
                                  var panel = document.createElement('div');
                                  panel.id = 'route-info-panel';
                                  document.body.appendChild(panel);
                                }
                                ${riderMarkers}
                                ${routes}
                                // After routes and markers added, compute overall bounds and fit map to show full paths
                                setTimeout(function(){
                                  try{
                                    var points = [];
                                    map.eachLayer(function(layer){
                                      try{
                                        if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
                                          var ll = layer.getLatLng(); if (ll) points.push(ll);
                                        } else if (layer instanceof L.Polyline) {
                                          var latlngs = layer.getLatLngs();
                                          if (!latlngs) return;
                                          // handle nested arrays
                                          var flatten = function(arr){ arr.forEach(function(i){ if (Array.isArray(i)) flatten(i); else if (i && i.lat) points.push(i); }); };
                                          flatten(latlngs);
                                        }
                                      }catch(e){}
                                    });
                                    if (points.length>0) {
                                      var bounds = L.latLngBounds(points);
                                      map.fitBounds(bounds, { padding: [80,80] });
                                      window.ReactNativeWebView && window.ReactNativeWebView.postMessage('map:fitted:'+points.length);
                                    }
                                  }catch(e){ console.warn('fit bounds failed', e); }
                                  console.log('🗺️ Admin map loaded with ' + ${riderPositions.length} + ' riders');
                                  window.ReactNativeWebView && window.ReactNativeWebView.postMessage('map:loaded:${riderPositions.length}');
                                  setTimeout(function(){ map.invalidateSize(); }, 1000);
                                }, 600);
                        })
                        .catch(function(err){ console.error('Map init failed', err); window.ReactNativeWebView && window.ReactNativeWebView.postMessage('map:init_failed:'+ (err && err.toString())); });
            })();
          </script>
        </body>
        </html>
      `;
    console.log('[ManagerRealTimeMap] HTML length:', html.length);
    console.log('[ManagerRealTimeMap] HTML preview:', html.substring(0, 200) + '...');
    return html;
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
