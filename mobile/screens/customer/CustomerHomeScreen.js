import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
} from 'react-native';
import { WebView } from 'react-native-webview';
// AsyncStorage not used after recent cleanup
import { makeRequest } from '../../services/api';
import locationService from '../../services/locationService';
// Correzione import tema (2 livelli su)
import { mobileTheme } from '../../theme';
import { customerHomeScreenStyles } from './styles/CustomerHomeScreenStyles';

export default function CustomerHomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');

  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' o 'map'
  const [userLocation, setUserLocation] = useState(null);
  // removed unused mapRegion and favorites states (not read anywhere)
  const [restaurants, setRestaurants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Servizi Speciali (quelli che hai caricato nei file)
  const specialServices = [
    { id: 'medical', name: 'Trasporto', emoji: '🚑', screen: 'MedicalTransport' },
    { id: 'docs', name: 'Documenti', emoji: '📁', screen: 'DocumentPickup' },
  ];

  useEffect(() => {
    initApp();
    // initApp orchestrates startup (location + loads). It's intentionally
    // not included in deps because it is recreated on each render and
    // depends on several local helpers. We intentionally run it once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initApp = async () => {
    await requestLocation();
    loadCategories();
    loadData();
  };

  const requestLocation = async (retryCount = 0) => {
    const maxRetries = 2;
    try {
      console.log(
        `📍 CustomerHomeScreen: Getting GPS location... (attempt ${retryCount + 1}/${maxRetries + 1})`,
      );
      const location = await locationService.getCurrentLocation(
        retryCount > 0,
        'CustomerHomeScreen',
      );

      if (location) {
        setUserLocation(location);
        console.log('✅ CustomerHomeScreen: GPS location set');
      } else if (retryCount < maxRetries) {
        console.log(
          `📍 CustomerHomeScreen: GPS failed, retrying in 2 seconds... (${retryCount + 1}/${maxRetries})`,
        );
        setTimeout(() => requestLocation(retryCount + 1), 2000);
      } else {
        console.warn('⚠️ CustomerHomeScreen: No GPS location available after retries');
        const existingLocation = locationService.getLocationSync();
        if (existingLocation) {
          console.log('✅ CustomerHomeScreen: Using existing location from service');
          setUserLocation(existingLocation);
        } else {
          console.log('✅ CustomerHomeScreen: No location available - waiting for GPS');
          setUserLocation(null);
        }
      }
    } catch (error) {
      console.error('❌ CustomerHomeScreen: Error getting location:', error);

      if (retryCount < maxRetries) {
        console.log(
          `📍 CustomerHomeScreen: GPS error, retrying in 2 seconds... (${retryCount + 1}/${maxRetries})`,
        );
        setTimeout(() => requestLocation(retryCount + 1), 2000);
      } else {
        const existingLocation = locationService.getLocationSync();
        if (existingLocation) {
          console.log('✅ CustomerHomeScreen: Using existing location after error');
          setUserLocation(existingLocation);
        } else {
          console.log('✅ CustomerHomeScreen: No location set after error - waiting for GPS');
          setUserLocation(null);
        }
      }
    }
  };

  const loadCategories = async () => {
    try {
      const data = await makeRequest('/restaurants/categories');
      if (data) {
        setCategories(data.map((c, i) => ({ id: i, name: c })));
      }
    } catch (e) {
      console.error('Error loading categories:', e);
    }
  };

  const loadData = async () => {
    setRefreshing(true);
    try {
      const res = await makeRequest('/restaurants');
      if (res) setRestaurants(res);

      // saved favorites not used in UI currently
    } catch (e) {
      console.error('Error loading data:', e);
    } finally {
      setRefreshing(false);
    }
  };

  const filteredRestaurants = restaurants.filter(
    r =>
      r.name.toLowerCase().includes(searchText.toLowerCase()) ||
      r.category.toLowerCase().includes(searchText.toLowerCase()),
  );

  // GESTIONE CLIC SU MAPPA
  const handleMapMessage = event => {
    const data = event.nativeEvent.data;
    if (data.startsWith('restaurant:')) {
      const restaurantId = data.split(':')[1];
      const restaurant = restaurants.find(r => r.id.toString() === restaurantId);
      if (restaurant) {
        navigation.navigate('RestaurantDetail', { restaurant });
      }
    }
  };

  const generateCustomerMapHtml = () => {
    const centerLat = userLocation?.latitude || 41.880025;
    const centerLon = userLocation?.longitude || 12.67594;

    // Generazione marker con postMessage corretto
    const markers = filteredRestaurants
      .map(
        rest => `
        L.marker([${rest.latitude || 41.88}, ${rest.longitude || 12.67}])
            .addTo(map)
            .bindPopup(\`
                <div style="font-family: sans-serif; padding: 5px;">
                    <b style="font-size: 14px;">${rest.name}</b><br/>
                    <span style="color: ${mobileTheme.colors.text.secondary};">${rest.category}</span><br/>
                    <button 
                        onclick="window.ReactNativeWebView.postMessage('restaurant:${rest.id}')"
                        style="margin-top: 8px; background: ${mobileTheme.colors.secondary}; color: white; border: none; padding: 5px 10px; border-radius: 5px; width: 100%;"
                    >
                        Vedi Menu
                    </button>
                </div>
            \`);
    `,
      )
      .join('\n');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
            <style>
                body { margin:0; padding:0; }
                #map { position:absolute; top:0; bottom:0; width:100%; height:100%; }
                .leaflet-popup-content-wrapper { border-radius: 12px; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                var map = L.map('map', { zoomControl: false }).setView([${centerLat}, ${centerLon}], 14);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                ${markers}
            </script>
        </body>
        </html>
    `;
  };

  return (
    <View style={customerHomeScreenStyles.container}>
      {/* Header con Toggle Mappa */}
      <View style={customerHomeScreenStyles.header}>
        <View>
          <Text style={customerHomeScreenStyles.title}>Delivero Roma</Text>
          <Text style={customerHomeScreenStyles.subtitle}>
            📍 {userLocation ? 'Roma Est Attiva' : 'Ricerca posizione...'}
          </Text>
        </View>
        <TouchableOpacity
          style={customerHomeScreenStyles.mapToggleBtn}
          onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
        >
          <Text style={customerHomeScreenStyles.mapToggleText}>
            {viewMode === 'list' ? '🗺️ Mappa' : '📜 Lista'}
          </Text>
        </TouchableOpacity>
      </View>

      {viewMode === 'list' ? (
        <ScrollView
          stickyHeaderIndices={[1]}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}
        >
          {/* 1. Servizi Rapidi (Orizzontali) */}
          <View style={customerHomeScreenStyles.whiteSection}>
            <Text style={customerHomeScreenStyles.sectionTitle}>Servizi Extra</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={customerHomeScreenStyles.serviceListContent}
            >
              {specialServices.map(service => (
                <TouchableOpacity
                  key={service.id}
                  style={customerHomeScreenStyles.serviceCircle}
                  onPress={() => navigation.navigate(service.screen)}
                >
                  <View style={customerHomeScreenStyles.iconCircle}>
                    <Text style={customerHomeScreenStyles.serviceEmoji}>{service.emoji}</Text>
                  </View>
                  <Text style={customerHomeScreenStyles.serviceText}>{service.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* 2. Search Bar (Sticky) */}
          <View style={customerHomeScreenStyles.searchSection}>
            <TextInput
              placeholder="Cerca pizza, sushi, farmacia..."
              style={customerHomeScreenStyles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* 3. Categorie Food (Orizzontali) */}
          <View style={customerHomeScreenStyles.section}>
            <Text style={customerHomeScreenStyles.sectionTitle}>Categorie Food</Text>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={customerHomeScreenStyles.categoryPill}
                  onPress={() => navigation.navigate('Restaurants', { category: item.name })}
                >
                  <Text style={customerHomeScreenStyles.categoryText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={customerHomeScreenStyles.categoryListContent}
            />
          </View>

          {/* 4. Lista Ristoranti */}
          <View style={customerHomeScreenStyles.section}>
            <Text style={customerHomeScreenStyles.sectionTitle}>Ristoranti Vicini</Text>
            {filteredRestaurants.map(rest => (
              <TouchableOpacity
                key={rest.id}
                style={customerHomeScreenStyles.restCard}
                onPress={() => navigation.navigate('RestaurantDetail', { restaurant: rest })}
              >
                <View style={customerHomeScreenStyles.restInfo}>
                  <Text style={customerHomeScreenStyles.restName}>{rest.name}</Text>
                  <Text style={customerHomeScreenStyles.restSub}>
                    {rest.category} • ⭐ {rest.rating}
                  </Text>
                </View>
                <View style={customerHomeScreenStyles.restBadge}>
                  <Text style={customerHomeScreenStyles.badgeText}>{rest.time || '25'} min</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        /* VISTA MAPPA INTERATTIVA */
        <View style={customerHomeScreenStyles.mapContainer}>
          <WebView
            style={customerHomeScreenStyles.map}
            source={{ html: generateCustomerMapHtml() }}
            onMessage={handleMapMessage} // Fondamentale per ricevere i clic dalla mappa
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
      )}
    </View>
  );
}
