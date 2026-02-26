import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import { makeRequest } from '../../services/api';
import debounce from 'lodash.debounce';
import { restaurantsScreenStyles } from './styles/RestaurantsScreenStyles';
import { sharedCategoryStyles } from './styles/SharedCategoryStyles';
import { mobileTheme } from '../../theme';

export default function RestaurantsScreen({ navigation, route }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  /* eslint-disable-next-line no-unused-vars */
  const [filters, _setFilters] = useState({
    rating_min: 0,
    max_delivery_time: 60,
    max_delivery_cost: 100,
  });

  // 1. Caricamento iniziale
  useEffect(() => {
    loadCategories();
    loadRestaurants('', 'All');
    // Intentionally run once on mount to bootstrap categories + restaurants.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [route.params?.category, categories, loadRestaurants]);

  const loadCategories = useCallback(async () => {
    try {
      const data = await makeRequest('/restaurants/categories', { method: 'GET' });
      setCategories(['All', ...(data || [])]);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }, []);

  // 2. Funzione principale di fetch (modificata per essere più robusta)
  const loadRestaurants = useCallback(async (searchQuery, category) => {
    const searchQueryEffective = typeof searchQuery === 'undefined' ? searchText : searchQuery;
    const categoryEffective = typeof category === 'undefined' ? selectedCategory : category;
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (searchQueryEffective) params.append('search', searchQueryEffective);
      if (categoryEffective !== 'All') params.append('category', categoryEffective);
      if (filters.rating_min > 0) params.append('rating_min', filters.rating_min);

      params.append('max_delivery_time', filters.max_delivery_time);
      params.append('max_delivery_cost', filters.max_delivery_cost);

      // Limita i risultati quando "All" è selezionato per ridurre il sovraccarico
      if (categoryEffective === 'All') {
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
  }, [filters, searchText, selectedCategory]);

  // 3. Implementazione DEBOUNCE
  // Usiamo useCallback per evitare che la funzione venga ricreata ad ogni render
  const debouncedSearch = useMemo(() => {
    const fn = debounce((query, cat) => {
      loadRestaurants(query, cat);
    }, 500);
    return fn;
  }, [loadRestaurants]);

  // cleanup for debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel && debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = text => {
    setSearchText(text);
    debouncedSearch(text, selectedCategory);
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    loadRestaurants(searchText, category); // Al click cambiamo subito, no debounce
  };

  // categories rendered inline below; helper removed

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={restaurantsScreenStyles.restaurantCard}
      onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}
    >
      <View style={restaurantsScreenStyles.restaurantImage}>
        <Text style={restaurantsScreenStyles.emojiLarge}>🍽️</Text>
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
          <Text style={restaurantsScreenStyles.title}>Ristoranti</Text>
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
        <View style={restaurantsScreenStyles.topRow}>
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
            <View style={restaurantsScreenStyles.categoryActiveBadge}>
              <Text style={restaurantsScreenStyles.categoryActiveBadgeText}>✓</Text>
            </View>
          </TouchableOpacity>

          {/* Separatore visivo */}
          <View style={restaurantsScreenStyles.separatorVertical} />

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
