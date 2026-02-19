import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, ActivityIndicator, Image } from 'react-native';
import { useCart } from '../../context/CartContext';

export default function ShoppingScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    loadShoppingData();
  }, []);

  const loadShoppingData = async () => {
    setLoading(true);
    try {
      // Dati realistici per supermercati e categorie
      const mockCategories = [
        { id: 1, name: 'Frutta e Verdura', emoji: '🥬', color: '#4CAF50' },
        { id: 2, name: 'Carne e Pesce', emoji: '🥩', color: '#FF5722' },
        { id: 3, name: 'Latticini', emoji: '🧀', color: '#FFC107' },
        { id: 4, name: 'Panetteria', emoji: '🍞', color: '#795548' },
        { id: 5, name: 'Bevande', emoji: '🥤', color: '#2196F3' },
        { id: 6, name: 'Casa e Cura', emoji: '🧴', color: '#9C27B0' },
      ];

      const mockBrands = [
        { id: 1, name: 'Carrefour', emoji: '🏬', color: '#FF0000', products: 1240, rating: 4.2 },
        { id: 2, name: 'Conad', emoji: '🏪', color: '#0066FF', products: 856, rating: 4.1 },
        { id: 3, name: 'Lidl', emoji: '🏬', color: '#FFD700', products: 920, rating: 4.0 },
        { id: 4, name: 'Esselunga', emoji: '🏪', color: '#00AA00', products: 1180, rating: 4.3 },
        { id: 5, name: 'Coop', emoji: '🛒', color: '#FF6600', products: 980, rating: 4.1 },
        { id: 6, name: 'Pam', emoji: '🏪', color: '#003366', products: 720, rating: 3.9 },
      ];

      setCategories(mockCategories);
      setBrands(mockBrands);
    } catch (error) {
      console.error('Errore caricamento dati shopping:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('CategoryProducts', { category: item })}
    >
      <Text style={styles.categoryEmoji}>{item.emoji}</Text>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderBrand = ({ item }) => (
    <TouchableOpacity
      style={[styles.brandCard, { borderTopColor: item.color }]}
      onPress={() => navigation.navigate('BrandProducts', { brand: item })}
    >
      <View style={styles.brandHeader}>
        <Text style={styles.brandEmoji}>{item.emoji}</Text>
        <View style={styles.brandInfo}>
          <Text style={styles.brandName}>{item.name}</Text>
          <Text style={styles.brandSubtitle}>{item.products} prodotti</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
          </View>
        </View>
      </View>
      <View style={styles.brandFooter}>
        <Text style={styles.deliveryInfo}>🚚 Consegna 30-45 min</Text>
        <Text style={styles.minOrder}>Min. €15</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066FF" />
        <Text style={styles.loadingText}>Caricamento negozi...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Roma Est</Text>
        <Text style={styles.subtitle}>Supermercati e Negozi</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Cerca negozio o prodotto..."
          style={styles.searchInput}
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categorie</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategory}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Supermercati</Text>
        <FlatList
          data={brands.filter(b =>
            b.name.toLowerCase().includes(searchText.toLowerCase()) ||
            searchText === ''
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBrand}
          contentContainerStyle={styles.brandsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: { backgroundColor: '#0066FF', padding: 20, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  subtitle: { color: '#fff', opacity: 0.8 },
  searchContainer: { padding: 15 },
  searchInput: { backgroundColor: '#fff', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#ddd' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', paddingHorizontal: 15, marginBottom: 10 },
  categoriesList: { paddingHorizontal: 15 },
  categoryCard: { alignItems: 'center', justifyContent: 'center', width: 100, height: 80, borderRadius: 12, marginRight: 10, elevation: 2 },
  categoryEmoji: { fontSize: 24, marginBottom: 4 },
  categoryName: { fontSize: 12, color: '#fff', fontWeight: '600', textAlign: 'center' },
  brandsList: { padding: 15 },
  brandCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 2, borderTopWidth: 4 },
  brandHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  brandEmoji: { fontSize: 30, marginRight: 15 },
  brandInfo: { flex: 1 },
  brandName: { fontSize: 18, fontWeight: 'bold' },
  brandSubtitle: { color: '#666', fontSize: 13 },
  ratingContainer: { marginTop: 4 },
  rating: { fontSize: 12, color: '#FF6B00', fontWeight: '600' },
  brandFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  deliveryInfo: { fontSize: 12, color: '#4CAF50' },
  minOrder: { fontSize: 12, color: '#666', fontWeight: '600' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#666' }
});