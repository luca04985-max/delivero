import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, FlatList,
  TextInput, Alert, ActivityIndicator, RefreshControl, Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeRequest } from '../../services/api';
// Correzione import tema (2 livelli su)
import { mobileTheme } from '../../theme';
import { customerHomeScreenStyles } from './styles/CustomerHomeScreenStyles';

const { width } = Dimensions.get('window');

export default function CustomerHomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' o 'map'
  const [userLocation, setUserLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Servizi Speciali (quelli che hai caricato nei file)
  const specialServices = [
    { id: 'medical', name: 'Trasporto', emoji: '🚑', screen: 'MedicalTransport' },
    { id: 'docs', name: 'Documenti', emoji: '📁', screen: 'DocumentPickup' },
  ];

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    await requestLocation();
    loadCategories();
    loadData();
  };

  const requestLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("GPS disattivato", "Usa la posizione per vedere i servizi a Roma Est.");
      return;
    }
    let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setUserLocation(loc.coords);
    setMapRegion({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    });
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

      const savedFavs = await AsyncStorage.getItem('favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
    } catch (e) {
      console.error('Error loading data:', e);
    } finally {
      setRefreshing(false);
    }
  };

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchText.toLowerCase()) ||
    r.category.toLowerCase().includes(searchText.toLowerCase())
  );

  // GESTIONE CLIC SU MAPPA
  const handleMapMessage = (event) => {
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
    const markers = filteredRestaurants.map(rest => `
        L.marker([${rest.latitude || 41.88}, ${rest.longitude || 12.67}])
            .addTo(map)
            .bindPopup(\`
                <div style="font-family: sans-serif; padding: 5px;">
                    <b style="font-size: 14px;">${rest.name}</b><br/>
                    <span style="color: #666;">${rest.category}</span><br/>
                    <button 
                        onclick="window.ReactNativeWebView.postMessage('restaurant:${rest.id}')"
                        style="margin-top: 8px; background: ${mobileTheme.colors.primary}; color: white; border: none; padding: 5px 10px; border-radius: 5px; width: 100%;"
                    >
                        Vedi Menu
                    </button>
                </div>
            \`);
    `).join('\n');

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
          <Text style={customerHomeScreenStyles.subtitle}>📍 {userLocation ? 'Roma Est Attiva' : 'Ricerca posizione...'}</Text>
        </View>
        <TouchableOpacity
          style={customerHomeScreenStyles.mapToggleBtn}
          onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
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
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 15 }}>
              {specialServices.map(service => (
                <TouchableOpacity
                  key={service.id}
                  style={customerHomeScreenStyles.serviceCircle}
                  onPress={() => navigation.navigate(service.screen)}
                >
                  <View style={customerHomeScreenStyles.iconCircle}><Text style={{ fontSize: 24 }}>{service.emoji}</Text></View>
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
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={customerHomeScreenStyles.categoryPill} onPress={() => navigation.navigate('Restaurants', { category: item.name })}>
                  <Text style={customerHomeScreenStyles.categoryText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingHorizontal: 15 }}
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
                  <Text style={customerHomeScreenStyles.restSub}>{rest.category} • ⭐ {rest.rating}</Text>
                </View>
                <View style={customerHomeScreenStyles.restBadge}><Text style={customerHomeScreenStyles.badgeText}>{rest.time || '25'} min</Text></View>
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

