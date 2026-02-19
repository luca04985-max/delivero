import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useCart } from '../../context/CartContext';

export default function BrandProductsScreen({ route, navigation }) {
  const { brand } = route.params || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { addToCart, itemCount } = useCart();

  useEffect(() => {
    loadProducts();
  }, [brand]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      // Prodotti realistici basati sul brand
      const mockProducts = generateProductsForBrand(brand);
      setProducts(mockProducts);
    } catch (error) {
      console.error('Errore caricamento prodotti:', error);
      Alert.alert('Errore', 'Impossibile caricare i prodotti');
    } finally {
      setLoading(false);
    }
  };

  const generateProductsForBrand = (brand) => {
    const baseProducts = {
      'Carrefour': [
        { name: 'Latte Inter', price: 1.29, category: 'Latticini', unit: '1L', image: '🥛' },
        { name: 'Pane Bianco', price: 1.99, category: 'Panetteria', unit: '500g', image: '🍞' },
        { name: 'Uova 12pz', price: 3.49, category: 'Latticini', unit: '12pz', image: '🥚' },
        { name: 'Pomodori', price: 2.99, category: 'Frutta e Verdura', unit: '1kg', image: '🍅' },
        { name: 'Mele Golden', price: 3.49, category: 'Frutta e Verdura', unit: '1kg', image: '🍎' },
        { name: 'Petto di Pollo', price: 8.99, category: 'Carne', unit: '1kg', image: '🍗' },
        { name: 'Acqua Minerale', price: 0.49, category: 'Bevande', unit: '1.5L', image: '💧' },
        { name: 'Pasta Gr. 500', price: 1.29, category: 'Panetteria', unit: '500g', image: '🍝' },
      ],
      'Conad': [
        { name: 'Mozzarella', price: 2.49, category: 'Latticini', unit: '125g', image: '🧀' },
        { name: 'Prosciutto Cotto', price: 4.99, category: 'Carne', unit: '200g', image: '🥓' },
        { name: 'Banane', price: 2.49, category: 'Frutta e Verdura', unit: '1kg', image: '🍌' },
        { name: 'Yogurt Bianco', price: 1.99, category: 'Latticini', unit: '4pz', image: '🥛' },
        { name: 'Biscotti', price: 2.99, category: 'Panetteria', unit: '400g', image: '🍪' },
        { name: 'Vino Rosso', price: 7.99, category: 'Bevande', unit: '750ml', image: '🍷' },
      ],
      'Lidl': [
        { name: 'Birra 6pz', price: 4.99, category: 'Bevande', unit: '6x330ml', image: '🍺' },
        { name: 'Cioccolato', price: 1.99, category: 'Dolci', unit: '100g', image: '🍫' },
        { name: 'Patate', price: 1.99, category: 'Frutta e Verdura', unit: '2kg', image: '🥔' },
        { name: 'Salmone', price: 12.99, category: 'Pesce', unit: '300g', image: '🐟' },
        { name: 'Caffè', price: 3.99, category: 'Bevande', unit: '250g', image: '☕' },
      ]
    };

    const brandProducts = baseProducts[brand?.name] || baseProducts['Carrefour'];

    // Aggiungi prodotti generici se ne servono altri
    const genericProducts = [
      { name: `${brand?.name} Product 1`, price: (Math.random() * 10 + 1).toFixed(2), category: 'Varie', unit: '1pz', image: '📦' },
      { name: `${brand?.name} Product 2`, price: (Math.random() * 10 + 1).toFixed(2), category: 'Varie', unit: '1pz', image: '📦' },
    ];

    return [...brandProducts, ...genericProducts].map((product, index) => ({
      id: index + 1,
      ...product,
      brand: brand?.name,
      inStock: Math.random() > 0.1, // 90% in stock
      discount: Math.random() > 0.8 ? Math.floor(Math.random() * 30 + 10) : 0 // 20% sconto
    }));
  };

  const handleAddToCart = (product) => {
    if (!product.inStock) {
      Alert.alert('Non Disponibile', 'Questo prodotto è temporaneamente esaurito');
      return;
    }

    addToCart({
      ...product,
      quantity: 1,
      type: 'shopping'
    });

    Alert.alert('Aggiunto!', `${product.name} aggiunto al carrello`);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => handleAddToCart(item)}>
      <View style={styles.productHeader}>
        <Text style={styles.productEmoji}>{item.image}</Text>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productCategory}>{item.category}</Text>
          <Text style={styles.productUnit}>{item.unit}</Text>
        </View>
        <View style={styles.productActions}>
          {item.discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{item.discount}%</Text>
            </View>
          )}
          <Text style={styles.productPrice}>€{item.price}</Text>
        </View>
      </View>
      <View style={styles.productFooter}>
        <View style={[styles.stockIndicator, { backgroundColor: item.inStock ? '#4CAF50' : '#F44336' }]}>
          <Text style={styles.stockText}>
            {item.inStock ? '✅ Disponibile' : '❌ Esaurito'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: item.inStock ? '#FF6B00' : '#ccc' }]}
          onPress={() => handleAddToCart(item)}
          disabled={!item.inStock}
        >
          <Text style={styles.addButtonText}>🛒 Aggiungi</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const categories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066FF" />
        <Text style={styles.loadingText}>Caricamento prodotti...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{brand?.emoji} {brand?.name}</Text>
        <Text style={styles.subtitle}>{products.length} prodotti disponibili</Text>
      </View>

      <View style={styles.filterContainer}>
        <FlatList
          data={['Tutti', ...categories]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedCategory === item && styles.selectedFilter
              ]}
              onPress={() => setSelectedCategory(item === 'Tutti' ? null : item)}
            >
              <Text style={[
                styles.filterText,
                selectedCategory === item && styles.selectedFilterText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.filterList}
        />
      </View>

      <FlatList
        data={selectedCategory
          ? products.filter(p => p.category === selectedCategory)
          : products
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, backgroundColor: '#f6f6f6', borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 20, fontWeight: 'bold' },
  subtitle: { color: '#666', marginTop: 4 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
  filterContainer: { backgroundColor: '#fff', paddingVertical: 10 },
  filterList: { paddingHorizontal: 15 },
  filterChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10
  },
  selectedFilter: { backgroundColor: '#FF6B00' },
  filterText: { fontSize: 14, color: '#666' },
  selectedFilterText: { color: '#fff', fontWeight: '600' },
  productsList: { padding: 15 },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  productHeader: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  productEmoji: { fontSize: 30, marginRight: 15 },
  productInfo: { flex: 1 },
  productName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  productCategory: { fontSize: 12, color: '#666', marginBottom: 2 },
  productUnit: { fontSize: 12, color: '#999' },
  productActions: { alignItems: 'flex-end' },
  discountBadge: {
    backgroundColor: '#F44336',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 4
  },
  discountText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  productPrice: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#f8f8f8'
  },
  stockIndicator: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  stockText: { fontSize: 10, color: '#fff', fontWeight: '600' },
  addButton: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15
  },
  addButtonText: { color: '#fff', fontSize: 12, fontWeight: '600' }
});
