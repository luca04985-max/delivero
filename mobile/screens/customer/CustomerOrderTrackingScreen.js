// FILE LOADED TEST
console.log('📁 CustomerOrderTrackingScreen.js FILE LOADED');

import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { ordersAPI } from '../../services/api';
import * as Location from 'expo-location';
import { mobileTheme } from '../../theme';
import { customerOrderTrackingScreenStyles, customerOrderTrackingWebStyles } from './styles/CustomerOrderTrackingScreenStyles';

const styles = customerOrderTrackingScreenStyles;

export default function CustomerOrderTrackingScreen({ route, navigation }) {
  console.log('🚀 CustomerOrderTrackingScreen MOUNTED');
  const { orderId } = route.params || {};
  console.log('📍 Route params:', { orderId, route: route.params });

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [riderLocation, setRiderLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [trackHistory, setTrackHistory] = useState([]);
  const [, setRefreshing] = useState(false);
  const [detailsExpanded, setDetailsExpanded] = useState(true);

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
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    console.log('🔄 CustomerOrderTrackingScreen useEffect RUNNING');
    if (!orderId) {
      console.log('❌ No orderId found');
      Alert.alert('Errore', 'ID ordine non fornito');
      navigation.goBack();
      return;
    }

    console.log('✅ orderId found, loading tracking info...');
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

    // Refresh tracking every 1 minute for more frequent updates
    const interval = setInterval(loadTrackingInfo, 60000);
    return () => clearInterval(interval);
  }, [orderId, loadTrackingInfo, navigation]);

  // ETA countdown disabilitato per coerenza con admin
  // useEffect(() => {
  //   if (!order?.eta_minutes) return;

  //   const etaInterval = setInterval(() => {
  //     setOrder(prev => {
  //       if (!prev) return prev;
  //       const newEta = prev.eta_minutes - 1;
  //       if (newEta > 0) {
  //         return { ...prev, eta_minutes: newEta };
  //       } else {
  //         clearInterval(etaInterval);
  //         return prev;
  //       }
  //     });
  //   }, 60000); // Update every minute

  //   return () => clearInterval(etaInterval);
  // }, [order?.eta_minutes]);



  // Debug: log when loading state changes
  React.useEffect(() => {
    console.log('🔄 Loading state changed:', loading);
  }, [loading]);

  if (loading) {
    return (
      <View style={customerOrderTrackingScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color={mobileTheme.colors.secondary} />
        <Text style={customerOrderTrackingScreenStyles.loadingText}>
          Caricamento tracciamento...
        </Text>
      </View>
    );
  }

  // Generate HTML for OpenStreetMap with rider and customer tracking
  const generateCustomerTrackingMapHtml = () => {
    console.log('🔧 generateCustomerTrackingMapHtml called with:', {
      riderLat: riderLocation?.latitude,
      riderLon: riderLocation?.longitude,
      customerLat: customerLocation?.latitude,
      customerLon: customerLocation?.longitude,
      trackHistoryLength: trackHistory?.length || 0
    });

    const riderLat = riderLocation?.latitude;
    const riderLon = riderLocation?.longitude;
    const customerLat = customerLocation?.latitude || 41.880025;
    const customerLon = customerLocation?.longitude || 12.67594;

    // Center on rider location if available, otherwise on customer
    const centerLat = riderLat || customerLat;
    const centerLon = riderLon || customerLon;
    const zoomLevel = riderLat ? 15 : 16; // Zoom più alto se c'è il rider

    // Prepare JS representation of history points to inject into the WebView
    const historyPtsJs = trackHistory && trackHistory.length > 0
      ? '[' + trackHistory.map(p => `[${parseFloat(p.latitude)}, ${parseFloat(p.longitude)}]`).join(',') + ']'
      : 'null';

    // Debug log on RN side before injecting HTML
    console.log('📍 generateCustomerTrackingMapHtml', { riderLat, riderLon, customerLat, customerLon, historyLength: trackHistory?.length || 0 });

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
              console.log('customer:web:script:start', { center:[${centerLat}, ${centerLon}], zoom:${zoomLevel}, historyExists: ${trackHistory && trackHistory.length > 0 ? 'true' : 'false'} });

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
                  var historyPts = ${historyPtsJs};

                  if (riderLat && riderLon) {
                    addRiderMarker(riderLat, riderLon);
                  }
                  addCustomerMarker(customerLat, customerLon);

                  // If we have a track history, draw it (polyline + small dots) and fit bounds to it
                  try {
                    if (historyPts && Array.isArray(historyPts) && historyPts.length > 0) {
                      L.polyline(historyPts, { color: '${mobileTheme.colors.error}', weight: 3 }).addTo(map);
                      // draw small dots for history points
                      historyPts.forEach(function(pt){
                        try{ L.circleMarker(pt, { radius: 4, color: '${mobileTheme.colors.error}', fillColor: '${mobileTheme.colors.error}', fillOpacity: 0.9 }).addTo(map); }catch(e){}
                      });
                      try { var bounds = L.latLngBounds(historyPts); map.fitBounds(bounds, { padding: [50, 50] }); } catch (e) {}
                      post({ type: 'route:history', points: historyPts.length });
                    } else {
                      // Solo routing OSRM - niente linea retta
                      if (riderLat && riderLon) {
                        console.log('🛣️ Forzo routing OSRM con:', riderLat, riderLon, '→', customerLat, customerLon);
                        
                        // Forza il caricamento di Leaflet Routing Machine se non c'è
                        if (!window.L.Routing) {
                          console.warn('⚠️ Carico Leaflet Routing Machine...');
                          var script = document.createElement('script');
                          script.src = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js';
                          script.onload = function() {
                            console.log('✅ Leaflet Routing Machine caricato');
                            createRoute();
                          };
                          document.head.appendChild(script);
                        } else {
                          createRoute();
                        }
                        
                        function createRoute() {
                          try {
                            var control = L.Routing.control({
                              waypoints: [L.latLng(riderLat, riderLon), L.latLng(customerLat, customerLon)],
                              router: L.Routing.osrmv1({ 
                                serviceUrl: 'https://router.project-osrm.org/route/v1',
                                profile: 'driving',
                                useHints: false,
                                timeout: 30000
                              }),
                              createMarker: function() { return null; },
                              addWaypoints: false,
                              show: false,
                              routeWhileDragging: false,
                              fitSelectedRoute: false, // Disabilitato per mantenere focus sul rider
                              lineOptions: { 
                                styles: [{ color: '${mobileTheme.colors.error}', weight: 4, opacity: 0.9 }],
                                extendToWaypoints: false
                              }
                            }).addTo(map);
                            
                            control.on('routesfound', function(e){ 
                              console.log('✅ Route OSRM trovata:', e.routes.length, 'percorsi');
                              post({type:'route:found', orderId:${order?.id || null}}); 
                            });
                            
                            control.on('routingerror', function(err){ 
                              console.warn('❌ Errore routing OSRM:', err);
                              post({type:'route:error', error: String(err)}); 
                            });
                            
                          } catch(e) {
                            console.error('❌ Errore creazione routing:', e);
                            post({type:'route:failed', error: String(e)});
                          }
                        }
                      } else {
                        console.warn('⚠️ Nessuna posizione rider disponibile');
                      }
                    }
                  } catch (e) { console.warn('route draw failed', e); post({type:'route:failed', error:String(e)}); }
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
      {/* Map a schermo intero */}
      {(() => {
        console.log('📍 Map render check:', {
          hasRider: !!riderLocation,
          hasCustomer: !!customerLocation,
          hasOrder: !!order,
          orderId,
          loading
        });
        // Show map if we have orderId or any location data
        return orderId && !loading;
      })() && (
          <View style={customerOrderTrackingScreenStyles.fullMapContainer}>
            <WebView
              style={customerOrderTrackingScreenStyles.fullMap}
              source={{ html: generateCustomerTrackingMapHtml() }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              originWhitelist={["*"]}
              onMessage={event => {
                try {
                  const d = JSON.parse(event.nativeEvent.data);
                  console.log('[CustomerOrderTracking] WebView message:', d);
                } catch (e) {
                  console.log('[CustomerOrderTracking] WebView raw message:', event.nativeEvent.data);
                }
              }}
              renderLoading={() => (
                <ActivityIndicator style={customerOrderTrackingScreenStyles.mapLoader} size="large" />
              )}
            />
          </View>
        )}

      {(!orderId || loading) && (
        <View style={customerOrderTrackingScreenStyles.loadingContainer}>
          <Text style={customerOrderTrackingScreenStyles.loadingText}>
            {loading ? 'Caricamento tracciamento...' : 'Nessun ordine selezionato'}
          </Text>
          <Text style={{ fontSize: 12, color: '#666', marginTop: 10 }}>
            Debug: orderId={orderId}, loading={loading}
          </Text>
        </View>
      )}

      {/* Dettagli ordine direttamente sulla mappa */}
      {order && (
        <View style={customerOrderTrackingScreenStyles.detailsContainer}>
          {/* Header con icona espansione */}
          <TouchableOpacity
            style={customerOrderTrackingScreenStyles.detailsHeader}
            onPress={() => setDetailsExpanded(!detailsExpanded)}
          >
            <View style={customerOrderTrackingScreenStyles.headerContent}>
              <Text style={customerOrderTrackingScreenStyles.sectionTitle}>🎯 Tracciamento Ordine</Text>
              {!detailsExpanded && order?.eta_minutes && order.status === 'in_transit' && (
                <Text style={customerOrderTrackingScreenStyles.headerEta}>⏱️ {order.eta_minutes} min</Text>
              )}
            </View>
            <Text style={customerOrderTrackingScreenStyles.expandIcon}>
              {detailsExpanded ? '▼' : '▲'}
            </Text>
          </TouchableOpacity>

          {/* Dettagli espandibili */}
          {detailsExpanded && (
            <>
              <View style={customerOrderTrackingScreenStyles.detailRow}>
                <Text style={customerOrderTrackingScreenStyles.detailLabel}>🆔 ID Ordine:</Text>
                <Text style={customerOrderTrackingScreenStyles.detailValue}>#{order?.id}</Text>
              </View>

              <View style={customerOrderTrackingScreenStyles.detailRow}>
                <Text style={customerOrderTrackingScreenStyles.detailLabel}>{statusEmoji[order?.status] || '📦'} Stato:</Text>
                <Text style={customerOrderTrackingScreenStyles.detailValue}>
                  {statusText[order?.status] || 'Non disponibile'}
                </Text>
              </View>

              {order?.eta_minutes && order.status === 'in_transit' && (
                <View style={customerOrderTrackingScreenStyles.detailRow}>
                  <Text style={customerOrderTrackingScreenStyles.detailLabel}>⏱️ ETA:</Text>
                  <Text style={customerOrderTrackingScreenStyles.detailValue}>
                    {order.eta_minutes} minuti
                  </Text>
                </View>
              )}

              <View style={customerOrderTrackingScreenStyles.detailRow}>
                <Text style={customerOrderTrackingScreenStyles.detailLabel}>📍 Indirizzo:</Text>
                <Text style={customerOrderTrackingScreenStyles.detailValue}>
                  {order?.delivery_address || 'Non disponibile'}
                </Text>
              </View>

              <View style={customerOrderTrackingScreenStyles.detailRow}>
                <Text style={customerOrderTrackingScreenStyles.detailLabel}>💰 Totale:</Text>
                <Text style={customerOrderTrackingScreenStyles.detailValue}>
                  €{order?.total_amount || '0.00'}
                </Text>
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
}
