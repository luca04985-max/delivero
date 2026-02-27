import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,

  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
  Modal,
  StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useCart } from '../../context/CartContext';
import { ordersAPI, paymentsAPI } from '../../services/api';
import { geocodeAddress } from '../../services/geocoding';
import locationService from '../../services/locationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from '../../hooks/useToast';
import { mobileTheme } from '../../theme';
// Importiamo lo stylesheet come 'styles' per brevità nel codice
import styles from './styles/CartScreenStyles';

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [geocodingTimeout, setGeocodingTimeout] = useState(null);
  const { showToast } = useToast();

  // Saved addresses/cards (from PaymentMethodsScreen asyncstorage)
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const deliveryFee = 2.5;
  const finalTotal = cart.totalPrice + deliveryFee;

  // Ottieni posizione corrente quando si apre il checkout
  useEffect(() => {
    if (checkoutVisible) {
      // Prima prova a usare la posizione già disponibile
      const cachedLocation = locationService.getLocationSync();
      console.log('📍 CartScreen: Cache check - cachedLocation:', cachedLocation);
      console.log(
        '📍 CartScreen: Cache check - service.hasLocation():',
        locationService.hasLocation(),
      );
      console.log(
        '📍 CartScreen: Cache check - service.currentLocation:',
        locationService.currentLocation,
      );

      if (cachedLocation) {
        setCurrentLocation(cachedLocation);
        console.log('📍 CartScreen: Using cached location from service');
      } else {
        console.log('📍 CartScreen: No cached location available, trying to get fresh location...');
        // Se non abbiamo cache, prova a ottenere la posizione attiva con retry
        tryGetLocationWithRetry();
      }

      // Load saved addresses/cards when opening checkout
      (async () => {
        try {
          const a = await AsyncStorage.getItem('saved_addresses_v1');
          setSavedAddresses(a ? JSON.parse(a) : []);
          // fetch saved cards from server
          try {
            const serverCards = await paymentsAPI.getSavedCards();
            setSavedCards(serverCards || []);
          } catch (e) {
            console.warn('Failed to load saved cards from server', e);
            setSavedCards([]);
          }
        } catch (e) {
          console.warn('Failed to load saved payment methods', e);
        }
      })();
    }
  }, [checkoutVisible, tryGetLocationWithRetry]);

  // Funzione per ottenere posizione con retry
  const tryGetLocationWithRetry = useCallback(async (retryCount = 0) => {
    const maxRetries = 2;

    try {
      console.log(
        `📍 CartScreen: Getting location with retry... (attempt ${retryCount + 1}/${maxRetries + 1})`,
      );
      const location = await getCurrentLocation(false);

      if (location) {
        console.log('✅ CartScreen: Location obtained with retry');
        return;
      }

      if (retryCount < maxRetries) {
        console.log(
          `📍 CartScreen: Location failed, retrying in 2 seconds... (${retryCount + 1}/${maxRetries})`,
        );
        setTimeout(() => tryGetLocationWithRetry(retryCount + 1), 2000);
      } else {
        console.log('📍 CartScreen: All location attempts failed, GPS may be disabled');
      }
    } catch (error) {
      console.error('❌ CartScreen: Error in location retry:', error);

      if (retryCount < maxRetries) {
        setTimeout(() => tryGetLocationWithRetry(retryCount + 1), 2000);
      }
    }
  }, [getCurrentLocation]);

  // Ottieni la posizione corrente del cliente (usa locationService)
  const getCurrentLocation = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoadingLocation(true);
      }

      console.log('📍 CartScreen: Getting location from service...');
      const location = await locationService.getCurrentLocation(false, 'CartScreen');

      if (location) {
        setCurrentLocation(location);
        console.log('✅ CartScreen: Location obtained from service:', location);
        return location;
      } else {
        console.warn('⚠️ CartScreen: No location available from service');
        return null;
      }
    } catch (error) {
      console.error('❌ CartScreen: Error getting location from service:', error);
      return null;
    } finally {
      if (showLoading) {
        setLoadingLocation(false);
      }
    }
  }, []);

  // Funzione per usare la posizione corrente come indirizzo
  const useCurrentLocationAsAddress = async () => {
    try {
      setLoadingLocation(true);
      const coords = await getCurrentLocation(false); // Non mostrare loading duplicato

      if (coords) {
        // Reverse geocoding per ottenere l'indirizzo dalle coordinate
        const address = await reverseGeocode(coords.latitude, coords.longitude);

        if (address) {
          setDeliveryAddress(address);
          // Imposta anche le coordinate per la mappa
          setMapCoordinates({
            latitude: coords.latitude,
            longitude: coords.longitude,
            displayName: address,
          });
          console.log('📍 CartScreen: Used current location as address:', address);
        } else {
          // Se reverse geocoding fallisce, usa coordinate grezze
          const fallbackAddress = `Posizione GPS (${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)})`;
          setDeliveryAddress(fallbackAddress);
          setMapCoordinates({
            latitude: coords.latitude,
            longitude: coords.longitude,
            displayName: fallbackAddress,
          });
          console.log('📍 CartScreen: Used GPS coordinates as address:', fallbackAddress);
        }
      }
    } catch (error) {
      console.error('❌ CartScreen: Error using current location:', error);
      Alert.alert('Errore', 'Impossibile ottenere la posizione corrente');
    } finally {
      setLoadingLocation(false);
    }
  };

  // Funzione per reverse geocoding (coordinate → indirizzo)
  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&countrycodes=IT`,
        {
          headers: {
            'User-Agent': 'DeliveroApp/1.0',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        if (data && data.display_name) {
          // Estrai solo l'indirizzo principale (rimuovi dettagli extra)
          const addressParts = data.display_name.split(',');
          if (addressParts.length >= 3) {
            return addressParts.slice(0, 3).join(',').trim();
          }
          return data.display_name;
        }
      }
      return null;
    } catch (error) {
      console.warn('Reverse geocoding error:', error);
      return null;
    }
  };

  // Funzione per geocodificare l'indirizzo quando cambia (con debouncing)
  const handleAddressChange = address => {
    setDeliveryAddress(address);

    // Cancella il timeout precedente
    if (geocodingTimeout) {
      clearTimeout(geocodingTimeout);
    }

    // Imposta un nuovo timeout per il geocoding (debounce di 1 secondo)
    if (address.trim().length > 5) {
      const timeout = setTimeout(async () => {
        console.log('🗺️ Debounced geocoding for:', address);
        const coords = await geocodeDeliveryAddress(address.trim());
        setMapCoordinates(coords);
      }, 1000);

      setGeocodingTimeout(timeout);
    } else {
      setMapCoordinates(null);
    }
  };

  // Funzione per generare HTML della mappa interattiva
  const generateMapHtml = () => {
    // Se non abbiamo coordinate, mostra mappa vuota con messaggio
    if (!currentLocation && !mapCoordinates) {
      return `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                    <style>
                        body { margin:0; padding:0; background:${mobileTheme.colors.background}; }
                        #map { position:absolute; top:0; bottom:0; width:100%; height:100%; }
                        .no-location { position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; background:white; padding:20px; border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,0.1); }
                    </style>
                </head>
                <body>
                    <div id="map"></div>
                    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                    <script>
                        var map = L.map('map').setView([41.9028, 12.4964], 13);
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: '© OpenStreetMap contributors'
                        }).addTo(map);
                        
                        // Mostra messaggio che GPS non è disponibile
                        var noLocationDiv = L.divIcon({
                            html: '<div class="no-location">📍<br><strong>GPS non disponibile</strong><br><small>Abilita GPS per vedere la tua posizione</small></div>',
                            iconSize: [200, 100],
                            className: 'no-location-marker'
                        });
                        
                        L.marker([41.9028, 12.4964], {icon: noLocationDiv}).addTo(map);
                    </script>
                </body>
                </html>
            `;
    }

    // Usa coordinate geocoded o posizione corrente come fallback
    const centerLat = mapCoordinates?.latitude || currentLocation?.latitude || 41.9028;
    const centerLon = mapCoordinates?.longitude || currentLocation?.longitude || 12.4964;
    const zoomLevel = mapCoordinates ? 16 : 14;

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
                    var map = L.map('map').setView([${centerLat}, ${centerLon}], ${zoomLevel});
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors'
                    }).addTo(map);
                    
                    // Marker per posizione corrente
                    ${currentLocation
        ? `
                    L.marker([${currentLocation.latitude}, ${currentLocation.longitude}])
                        .addTo(map)
                        .bindPopup('<b>📍 La tua posizione</b><br/>Posizione GPS attuale');
                    `
        : ''
      }
                    
                    // Marker per indirizzo geocodificato
                    ${mapCoordinates
        ? `
                    L.marker([${mapCoordinates.latitude}, ${mapCoordinates.longitude}])
                        .addTo(map)
                        .bindPopup('<b>🏠 Indirizzo di consegna</b><br/>${deliveryAddress || ''}');
                    `
        : ''
      }
                </script>
            </body>
            </html>
        `;
  };

  // Funzione per geocodificare l'indirizzo
  const geocodeDeliveryAddress = async address => {
    try {
      console.log('🗺️ Geocoding address:', address);
      const coords = await geocodeAddress(address);
      if (coords) {
        console.log('✅ Geocoding successful:', coords);
        return coords;
      } else {
        console.warn('⚠️ Geocoding failed, using Rome fallback');
        return null;
      }
    } catch (error) {
      console.error('❌ Geocoding error:', error);
      return null;
    }
  };

  const confirmCheckout = async () => {
    if (!deliveryAddress.trim()) {
      Alert.alert('Indirizzo mancante', "Inserisci dove vuoi ricevere l'ordine");
      return;
    }

    setPlacingOrder(true);
    let orderId;
    try {
      // Usa le coordinate già geocodificate o calcolale ora
      let finalCoords = null;

      // Se non abbiamo coordinate geocodificate, prova a geocodificare ora
      if (!finalCoords && mapCoordinates) {
        finalCoords = {
          delivery_latitude: mapCoordinates.latitude,
          delivery_longitude: mapCoordinates.longitude,
        };
      }

      // Se ancora non abbiamo coordinate, prova a geocodificare ora
      if (!finalCoords && deliveryAddress.trim()) {
        const geocodedCoords = await geocodeDeliveryAddress(deliveryAddress.trim());
        if (geocodedCoords) {
          finalCoords = {
            delivery_latitude: geocodedCoords.latitude,
            delivery_longitude: geocodedCoords.longitude,
          };
          console.log('🗺️ Geocoded coordinates found:', finalCoords);
        }
      }

      // Se ancora non abbiamo coordinate, prova a ottenere la posizione GPS del cliente
      if (!finalCoords) {
        const gpsCoords = await getCurrentLocation();
        if (gpsCoords) {
          finalCoords = {
            delivery_latitude: gpsCoords.latitude,
            delivery_longitude: gpsCoords.longitude,
          };
          console.log('📱 Using GPS coordinates as fallback');
        }
      }

      // If we have coordinates and an address, ask the user if they want to save it
      if (finalCoords && deliveryAddress && deliveryAddress.trim()) {
        try {
          const exists = (savedAddresses || []).some(a => {
            // consider equal if same displayName or very close coordinates
            if (!a) return false;
            if (a.displayName && a.displayName === deliveryAddress.trim()) return true;
            if (a.latitude && a.longitude) {
              const latDiff = Math.abs(Number(a.latitude) - Number(finalCoords.delivery_latitude || 0));
              const lonDiff = Math.abs(Number(a.longitude) - Number(finalCoords.delivery_longitude || 0));
              return latDiff < 0.0005 && lonDiff < 0.0005;
            }
            return false;
          });

          if (!exists) {
            Alert.alert(
              'Salvare indirizzo?',
              'Vuoi salvare questo indirizzo tra quelli utilizzati di frequente?',
              [
                { text: 'No', style: 'cancel' },
                {
                  text: 'Sì',
                  onPress: async () => {
                    try {
                      // Try save to server first
                      try {
                        const payload = {
                          label: deliveryAddress.trim(),
                          displayName: deliveryAddress.trim(),
                          latitude: finalCoords.delivery_latitude || null,
                          longitude: finalCoords.delivery_longitude || null,
                        };
                        const saved = await userAPI.saveAddress(payload);
                        const next = [saved, ...(savedAddresses || [])];
                        setSavedAddresses(next);
                        // keep a local cache as fallback
                        await AsyncStorage.setItem('saved_addresses_v1', JSON.stringify(next));
                        showToast('Indirizzo salvato', 'success');
                        return;
                      } catch (serverErr) {
                        console.warn('Server save failed, falling back to local storage', serverErr);
                      }

                      // Fallback: persist locally
                      const newAddr = {
                        id: Date.now().toString(),
                        label: deliveryAddress.trim(),
                        displayName: deliveryAddress.trim(),
                        latitude: finalCoords.delivery_latitude || null,
                        longitude: finalCoords.delivery_longitude || null,
                      };
                      const next = [newAddr, ...(savedAddresses || [])];
                      setSavedAddresses(next);
                      await AsyncStorage.setItem('saved_addresses_v1', JSON.stringify(next));
                      showToast('Indirizzo salvato (locale)', 'success');
                    } catch (err) {
                      console.warn('Failed to persist address', err);
                      showToast('Impossibile salvare l\'indirizzo', 'error');
                    }
                  },
                },
              ],
            );
          }
        } catch (e) {
          console.warn('Error checking/saving address', e);
        }
      }

      const orderPayload = {
        restaurantId: cart.restaurantId,
        items: cart.items,
        totalAmount: finalTotal,
        deliveryAddress: deliveryAddress.trim(),
        ...finalCoords,
        payment_method: paymentMethod,
        payment_method_token:
          paymentMethod === 'card' && selectedCardId
            ? savedCards.find(c => c.id === selectedCardId)?.token
            : undefined,
      };

      console.log('📦 Creating order with coordinates:', finalCoords);

      const created = await ordersAPI.create(orderPayload);
      orderId = created?.order?.id;

      // Se abbiamo trovato coordinate con geocoding dopo la creazione, aggiornale
      if (
        orderId &&
        finalCoords &&
        (!created?.order?.delivery_latitude || !created?.order?.delivery_longitude)
      ) {
        try {
          console.log('🔄 Updating delivery coordinates for order:', orderId);
          await ordersAPI.updateDeliveryCoordinates(
            orderId,
            finalCoords.delivery_latitude,
            finalCoords.delivery_longitude,
          );
          console.log('✅ Delivery coordinates updated successfully');
        } catch (updateError) {
          console.warn('⚠️ Failed to update delivery coordinates:', updateError);
        }
      }

      if (paymentMethod === 'cash') {
        console.log('💰 Frontend: Creating cash payment for order:', orderId);
        await paymentsAPI.createCashPayment(orderId);
        console.log('✅ Frontend: Cash payment created successfully');
      } else {
        console.log('💳 Frontend: Creating Stripe payment for order:', orderId);
        const token = paymentMethod === 'card' && selectedCardId ? savedCards.find(c => c.id === selectedCardId)?.token : undefined;
        await paymentsAPI.createStripePayment(orderId, token);
        console.log('✅ Frontend: Stripe payment created successfully');
      }

      clearCart();
      setCheckoutVisible(false);
      console.log('🛒 Cart: Navigating to OrderTracking with orderId:', orderId);
      navigation.navigate('OrderTracking', { orderId });
    } catch (e) {
      console.error('❌ Frontend: Error during checkout:', e);
      console.error('❌ Frontend: Error details:', {
        message: e.message,
        paymentMethod: paymentMethod,
        orderId: orderId,
      });
      Alert.alert('Errore', e.message || 'Riprova più tardi');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>
            Carrello Vuoto
          </Text>
          <Text style={styles.emptySubtext}>
            Sembra che tu non abbia ancora aggiunto nulla di delizioso.
          </Text>
          <TouchableOpacity
            style={[styles.checkoutButton, { width: '100%', marginTop: mobileTheme.spacing[6] }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.checkoutButtonText}>Esplora Ristoranti</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Il tuo Ordine</Text>
        </View>
      </View>

      <ScrollView style={styles.cartContent} showsVerticalScrollIndicator={false}>
        {/* Restaurant items (single-restaurant cart behavior) */}
        {cart.restaurantItems && cart.restaurantItems.length > 0 &&
          cart.restaurantItems.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.itemImage}>
                <Text style={styles.paymentEmoji}>🍲</Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>€{item.price}</Text>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Text style={styles.quantityText}>−</Text>
                  </TouchableOpacity>
                  <Text style={[styles.quantityText, styles.quantitySpacing]}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
                <Text style={styles.removeButtonText}>Elimina</Text>
              </TouchableOpacity>
            </View>
          ))}

        {/* Shopping items: group by category/aisle for supermarket UX */}
        {cart.shoppingItems && cart.shoppingItems.length > 0 && (
          <View style={styles.shoppingSection}>
            <Text style={[styles.titleCard, styles.sectionHeaderNoMargin]}>Spesa</Text>
            {(() => {
              const groups = cart.shoppingItems.reduce((acc, it) => {
                const key = it.category || it.aisle || 'Prodotti';
                if (!acc[key]) acc[key] = [];
                acc[key].push(it);
                return acc;
              }, {});

              return Object.keys(groups).map(cat => (
                <View key={cat} style={styles.shoppingCategory}>
                  <Text style={[styles.sectionTitle, styles.sectionHeaderNoMargin]}>{cat}</Text>
                  {groups[cat].map(item => (
                    <View key={item.id} style={styles.cartItem}>
                      <View style={styles.itemImage}>
                        <Text style={styles.paymentEmoji}>🛒</Text>
                      </View>
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>€{item.price}</Text>

                        <View style={styles.quantityContainer}>
                          <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Text style={styles.quantityText}>−</Text>
                          </TouchableOpacity>
                          <Text style={[styles.quantityText, styles.quantitySpacing]}>{item.quantity}</Text>
                          <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Text style={styles.quantityText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
                        <Text style={styles.removeButtonText}>Elimina</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ));
            })()}
          </View>
        )}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Riepilogo Costi</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotale</Text>
            <Text style={styles.summaryValue}>€{cart.totalPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Consegna</Text>
            <Text style={styles.summaryValue}>€{deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Totale</Text>
            <Text style={styles.totalValue}>€{finalTotal.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => setCheckoutVisible(true)}>
          <Text style={styles.checkoutButtonText}>Procedi al Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.clearButton, { marginTop: mobileTheme.spacing[3] }]} onPress={clearCart}>
          <Text style={styles.clearButtonText}>Svuota Carrello</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Checkout */}
      <Modal visible={checkoutVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={[styles.summaryTitle, { fontSize: 22 }]}>Completa l'ordine</Text>

            {/* Mappa interattiva */}
            <View style={styles.mapContainer}>
              {loadingLocation ? (
                <View style={styles.mapLoader || { flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size="large" color={mobileTheme.colors.primary} />
                  <Text style={styles.mapLoadingText}>Caricamento mappa...</Text>
                </View>
              ) : (
                <WebView
                  style={styles.webViewFlex}
                  source={{ html: generateMapHtml() }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={false}
                />
              )}
            </View>

            <Text style={[styles.summaryLabel, { marginBottom: 10 }]}>Indirizzo di consegna</Text>

            {/* Saved addresses (if any) */}
            {savedAddresses && savedAddresses.length > 0 && (
              <View style={styles.savedList}>
                {savedAddresses.map(a => (
                  <TouchableOpacity
                    key={a.id}
                    style={styles.savedAddressRow}
                    onPress={() => {
                      setDeliveryAddress(a.displayName || a.label);
                      if (a.latitude && a.longitude) {
                        setMapCoordinates({ latitude: a.latitude, longitude: a.longitude, displayName: a.displayName || a.label });
                      }
                      setSelectedAddressId(a.id);
                    }}
                  >
                    <Text style={styles.savedText}>{a.displayName || a.label}</Text>
                    <Text style={styles.savedTextSecondary}>{selectedAddressId === a.id ? '✓' : ''}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={[{ flexDirection: 'row', marginBottom: mobileTheme.spacing[3] }, styles.centerAligned]}>
              <TextInput
                style={styles.addressInput}
                placeholder="Es. Via Garibaldi 12, Roma"
                value={deliveryAddress}
                onChangeText={handleAddressChange}
              />
              <TouchableOpacity
                style={styles.locationButton}
                onPress={useCurrentLocationAsAddress}
                disabled={loadingLocation}
              >
                {loadingLocation ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.locationButtonIcon}>📍</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Selezione Metodo di Pagamento */}
            <Text style={[styles.summaryLabel, { marginBottom: 15 }]}>Metodo di Pagamento</Text>
            <View style={styles.paymentRow}>
              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  { marginRight: mobileTheme.spacing[3] },
                  paymentMethod === 'cash' && styles.paymentOptionSelected,
                ]}
                onPress={() => setPaymentMethod('cash')}
              >
                <View style={styles.centerAligned}>
                  <Text style={styles.paymentEmoji}>💵</Text>
                  <Text style={paymentMethod === 'cash' ? styles.paymentOptionTextSelected : styles.paymentOptionText}>
                    Contanti
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  styles.paymentOptionLast,
                  paymentMethod === 'card' && styles.paymentOptionSelected,
                ]}
                onPress={() => setPaymentMethod('card')}
              >
                <View style={styles.centerAligned}>
                  <Text style={styles.paymentEmoji}>💳</Text>
                  <Text style={paymentMethod === 'card' ? styles.paymentOptionTextSelected : styles.paymentOptionText}>
                    Carta di Credito
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Saved cards selection when paymentMethod is card */}
            {paymentMethod === 'card' && savedCards && savedCards.length > 0 && (
              <View style={styles.savedCardsContainer}>
                <Text style={[styles.summaryLabel, { marginBottom: mobileTheme.spacing[2] }]}>Carte salvate</Text>
                {savedCards.map(c => (
                  <TouchableOpacity
                    key={c.id}
                    style={styles.savedAddressRow}
                    onPress={() => setSelectedCardId(c.id)}
                  >
                    <Text style={styles.savedText}>{c.masked}</Text>
                    <Text style={styles.savedTextSecondary}>{selectedCardId === c.id ? '✓' : ''}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.smallNote}>Oppure usa il pulsante 📍 per impostare la tua posizione attuale</Text>

            <TouchableOpacity
              style={[styles.checkoutButton, placingOrder && unifiedStyles.disabledButton]}
              onPress={confirmCheckout}
              disabled={placingOrder}
            >
              {placingOrder ? (
                <ActivityIndicator color="white" />
              ) : paymentMethod === 'card' ? (
                <Text style={styles.checkoutButtonText}>Conferma e Paga</Text>
              ) : (
                <Text style={styles.checkoutButtonText}>Conferma</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCheckoutVisible(false)} style={styles.clearButtonMarginTop || { marginTop: mobileTheme.spacing[4] }}>
              <Text style={styles.cancelText}>Annulla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
