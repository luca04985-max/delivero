import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
// cart hook not used in this screen yet
import { shoppingScreenStyles } from './styles/ShoppingScreenStyles';
import { sharedCategoryStyles } from './styles/SharedCategoryStyles';
import { mobileTheme } from '../../theme';

export default function ShoppingScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Frutta e Verdura'); // Categoria attiva di default
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    loadShoppingData();
  }, []);

  const loadShoppingData = async () => {
    setLoading(true);
    try {
      // Dati realistici per supermercati e categorie
      const mockCategories = [
        { id: 1, name: 'Frutta e Verdura', emoji: '🥬', color: mobileTheme.colors.success },
        { id: 2, name: 'Carne e Pesce', emoji: '🥩', color: mobileTheme.colors.primary },
        { id: 3, name: 'Latticini', emoji: '🧀', color: mobileTheme.colors.warning },
        { id: 4, name: 'Panetteria', emoji: '🍞', color: mobileTheme.colors.text.secondary },
        { id: 5, name: 'Bevande', emoji: '🥤', color: mobileTheme.colors.customer || mobileTheme.colors.accent },
        { id: 6, name: 'Casa e Cura', emoji: '🧴', color: mobileTheme.colors.manager || mobileTheme.colors.secondary },
      ];

      const mockBrands = [
        { id: 1, name: 'Carrefour', emoji: '🏬', color: mobileTheme.colors.primary, products: 1240, rating: 4.2 },
        { id: 2, name: 'Conad', emoji: '🏪', color: mobileTheme.colors.accent || mobileTheme.colors.secondary, products: 856, rating: 4.1 },
        { id: 3, name: 'Lidl', emoji: '🏬', color: mobileTheme.colors.warning, products: 920, rating: 4.0 },
        { id: 4, name: 'Esselunga', emoji: '🏪', color: mobileTheme.colors.success, products: 1180, rating: 4.3 },
        { id: 5, name: 'Coop', emoji: '🛒', color: mobileTheme.colors.primary, products: 980, rating: 4.1 },
        { id: 6, name: 'Pam', emoji: '🏪', color: mobileTheme.colors.secondary, products: 720, rating: 3.9 },
      ];

      setCategories(mockCategories);
      setBrands(mockBrands);
    } catch (error) {
      console.error('Errore caricamento dati shopping:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCategory = ({ item }) => {
    const isActive = selectedCategory === item.name;

    return (
      <TouchableOpacity
        key={item}
        style={[
          shoppingScreenStyles.categoryCard,
          isActive && sharedCategoryStyles.categoryCardActive,
        ]}
        onPress={() => setSelectedCategory(item.name)}
      >
        <Text
          style={[
            shoppingScreenStyles.categoryButtonText,
            isActive && sharedCategoryStyles.categoryButtonTextActive,
          ]}
        >
          {item.name}
        </Text>

        {/* Badge speciale per categoria attiva */}
        {isActive && (
          <View style={shoppingScreenStyles.categoryActiveBadge}>
            <Text style={shoppingScreenStyles.categoryActiveBadgeText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderBrand = ({ item }) => (
    <TouchableOpacity
      style={shoppingScreenStyles.brandCard}
      onPress={() => navigation.navigate('BrandProducts', { brand: item })}
    >
      <View style={shoppingScreenStyles.brandEmoji}>
        <Text style={shoppingScreenStyles.brandEmojiText}>{item.emoji}</Text>
      </View>
      <View style={shoppingScreenStyles.brandInfo}>
        <Text style={shoppingScreenStyles.brandName}>{item.name}</Text>
        <Text style={shoppingScreenStyles.brandDetails}>
          {item.products} prodotti • ⭐ {item.rating}
        </Text>
        <View style={shoppingScreenStyles.deliveryBadge}>
          <Text style={shoppingScreenStyles.deliveryText}>30-45 min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={shoppingScreenStyles.container}>
        <ActivityIndicator size="large" color={mobileTheme.colors.primary} />
        <Text style={shoppingScreenStyles.loadingText}>Caricamento negozi...</Text>
      </View>
    );
  }

  return (
    <View style={shoppingScreenStyles.container}>
      <View style={shoppingScreenStyles.header}>
        <View style={shoppingScreenStyles.headerContent}>
          <Text style={shoppingScreenStyles.title}>Shopping Roma Est</Text>
          <Text style={shoppingScreenStyles.subtitle}>Supermercati e Negozi</Text>
        </View>
      </View>

      <View style={shoppingScreenStyles.searchContainer}>
        <TextInput
          placeholder="Cerca negozio o prodotto..."
          style={shoppingScreenStyles.searchInput}
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>

      <View style={shoppingScreenStyles.section}>
        <Text style={shoppingScreenStyles.sectionTitle}>Categorie</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCategory}
          contentContainerStyle={shoppingScreenStyles.categoriesList}
        />
      </View>

      <View style={shoppingScreenStyles.section}>
        <Text style={shoppingScreenStyles.sectionTitle}>Supermercati</Text>
        <FlatList
          data={brands.filter(
            b => b.name.toLowerCase().includes(searchText.toLowerCase()) || searchText === '',
          )}
          keyExtractor={item => item.id.toString()}
          renderItem={renderBrand}
          contentContainerStyle={shoppingScreenStyles.brandsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
