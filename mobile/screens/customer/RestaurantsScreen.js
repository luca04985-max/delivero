import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { makeRequest } from '../../services/api';
import debounce from 'lodash.debounce';
import { restaurantsScreenStyles } from './styles/RestaurantsScreenStyles';
import { sharedHeaderStyles } from './styles/SharedHeaderStyles';
import { sharedCategoryStyles } from './styles/SharedCategoryStyles';
import { mobileTheme } from '../../theme';

export default function RestaurantsScreen({ navigation, route }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    rating_min: 0,
    max_delivery_time: 60,
    max_delivery_cost: 100,
  });

  // 1. Caricamento iniziale
  useEffect(() => {
    loadCategories();
    loadRestaurants('', 'All');
  }, []);

  // 1.1. Gestione categoria passata dalla navigazione
  useEffect(() => {
    if (route.params?.category) {
      const categoryFromRoute = route.params.category;
      console.log('Category from route:', categoryFromRoute);

      // Attendi che le categorie siano caricate, poi imposta quella corretta
      const checkAndSetCategory = () => {
        if (categories.length > 1) {
          // Più di 'All' significa che sono caricate
          if (categories.includes(categoryFromRoute)) {
            setSelectedCategory(categoryFromRoute);
            loadRestaurants('', categoryFromRoute);
          } else {
            console.log('Category not found in available categories:', categoryFromRoute);
          }
        }
      };

      // Se le categorie sono già caricate, imposta subito, altrimenti aspetta
      if (categories.length > 1) {
        checkAndSetCategory();
      } else {
        // Aspetta un po' e riprova (perché le categorie potrebbero caricarsi dopo)
        setTimeout(checkAndSetCategory, 1000);
      }
    }
  }, [route.params?.category, categories]);

  const loadCategories = async () => {
    try {
      const data = await makeRequest('/restaurants/categories', { method: 'GET' });
      setCategories(['All', ...(data || [])]);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  // 2. Funzione principale di fetch (modificata per essere più robusta)
  const loadRestaurants = async (searchQuery = searchText, category = selectedCategory) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (searchQuery) params.append('search', searchQuery);
      if (category !== 'All') params.append('category', category);
      if (filters.rating_min > 0) params.append('rating_min', filters.rating_min);

      params.append('max_delivery_time', filters.max_delivery_time);
      params.append('max_delivery_cost', filters.max_delivery_cost);

      // Limita i risultati quando "All" è selezionato per ridurre il sovraccarico
      if (category === 'All') {
        params.append('limit', '20');
      }

      const url = `/restaurants?${params.toString()}`;
      const data = await makeRequest(url, { method: 'GET' });
      setRestaurants(data || []);
    } catch (error) {
      console.error('Error loading restaurants:', error);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  // 3. Implementazione DEBOUNCE
  // Usiamo useCallback per evitare che la funzione venga ricreata ad ogni render
  const debouncedSearch = useCallback(
    debounce((query, cat) => {
      loadRestaurants(query, cat);
    }, 500),
    [filters], // Si aggiorna se cambiano i filtri
  );

  const handleSearch = text => {
    setSearchText(text);
    debouncedSearch(text, selectedCategory);
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    loadRestaurants(searchText, category); // Al click cambiamo subito, no debounce
  };

  const renderCategoryItem = ({ item }) => {
    // Ref per controllare se questa è la categoria attiva
    const isActive = selectedCategory === item;

    return (
      <TouchableOpacity
        key={item}
        style={[
          restaurantsScreenStyles.categoryCard,
          isActive && sharedCategoryStyles.categoryCardActive,
        ]}
        onPress={() => handleCategoryChange(item)}
      >
        <Text
          style={[
            restaurantsScreenStyles.categoryButtonText,
            isActive && sharedCategoryStyles.categoryButtonTextActive,
          ]}
        >
          {item}
        </Text>

        {/* Badge speciale per categoria attiva */}
        {isActive && (
          <View
            style={{
              position: 'absolute',
              top: -5,
              right: -5,
              backgroundColor: 'primary',
              borderRadius: 10,
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 10,
                fontWeight: 'bold',
              }}
            >
              ✓
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={restaurantsScreenStyles.restaurantCard}
      onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}
    >
      <View style={restaurantsScreenStyles.restaurantImage}>
        <Text style={{ fontSize: 32, color: '#666' }}>🍽️</Text>
      </View>
      <View style={restaurantsScreenStyles.restaurantContent}>
        <View style={restaurantsScreenStyles.restaurantHeader}>
          <Text style={restaurantsScreenStyles.restaurantName}>{item.name}</Text>
          <TouchableOpacity style={restaurantsScreenStyles.favoriteButton}>
            <Text>❤️</Text>
          </TouchableOpacity>
        </View>
        <Text style={restaurantsScreenStyles.restaurantInfo}>{item.category}</Text>
        <View style={restaurantsScreenStyles.restaurantFooter}>
          <View style={restaurantsScreenStyles.ratingContainer}>
            <Text>⭐</Text>
            <Text style={restaurantsScreenStyles.rating}>
              {Number(item.rating || 0).toFixed(1)}
            </Text>
          </View>
          <Text style={restaurantsScreenStyles.deliveryInfo}>{item.delivery_time || 0} min</Text>
          <View style={restaurantsScreenStyles.deliveryBadge}>
            <Text style={restaurantsScreenStyles.deliveryText}>
              €{Number(item.delivery_cost || 0).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={restaurantsScreenStyles.container}>
      <View style={restaurantsScreenStyles.header}>
        <View style={restaurantsScreenStyles.headerContent}>
          <Text style={restaurantsScreenStyles.title}>🍽️ Ristoranti</Text>
          <Text style={restaurantsScreenStyles.subtitle}>Scopri nuove destinazioni</Text>
        </View>
      </View>

      <View style={restaurantsScreenStyles.searchContainer}>
        <TextInput
          style={restaurantsScreenStyles.searchInput}
          placeholder="🔍 Cerca ristoranti..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      <View style={restaurantsScreenStyles.categoriesContainer}>
        {/* Categoria attiva fissa a sinistra */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={[restaurantsScreenStyles.categoryCard, sharedCategoryStyles.categoryCardActive]}
            onPress={() => handleCategoryChange(selectedCategory)}
          >
            <Text
              style={[
                restaurantsScreenStyles.categoryButtonText,
                sharedCategoryStyles.categoryButtonTextActive,
              ]}
            >
              {selectedCategory}
            </Text>
            {/* Badge speciale per categoria attiva */}
            <View
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: mobileTheme.colors.primary,
                borderRadius: 10,
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: mobileTheme.colors.white,
                  fontSize: 10,
                  fontWeight: 'bold',
                }}
              >
                ✓
              </Text>
            </View>
          </TouchableOpacity>

          {/* Separatore visivo */}
          <View
            style={{
              width: 1,
              height: 30,
              backgroundColor: mobileTheme.colors.border,
              marginHorizontal: mobileTheme.spacing[2],
            }}
          />

          {/* Altre categorie scorrevoli */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={restaurantsScreenStyles.categoriesList}
          >
            {categories
              .filter(cat => cat !== selectedCategory)
              .map(category => (
                <TouchableOpacity
                  key={category}
                  style={restaurantsScreenStyles.categoryCard}
                  onPress={() => handleCategoryChange(category)}
                >
                  <Text style={restaurantsScreenStyles.categoryButtonText}>{category}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>

      {loading && restaurants.length === 0 ? null : (
        <FlatList
          data={restaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={restaurantsScreenStyles.restaurantsList}
          ListEmptyComponent={
            <View style={restaurantsScreenStyles.emptyContainer}>
              <Text style={restaurantsScreenStyles.emptyText}>😅 Nessun ristorante trovato</Text>
              <Text style={restaurantsScreenStyles.emptyText}>
                Prova a cambiare i filtri o la ricerca
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
