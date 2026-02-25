import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useCart } from '../../context/CartContext';
import { brandProductsScreenStyles } from './styles/BrandProductsScreenStyles';

export default function BrandProductsScreen({ route, navigation: _navigation }) {
  const { brand } = route.params || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { addToCart } = useCart();

  const loadProducts = useCallback(async () => {
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
  }, [brand]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const generateProductsForBrand = brand => {
    const baseProducts = {
      Carrefour: [
        { name: 'Latte Inter', price: 1.29, category: 'Latticini', unit: '1L', image: '🥛' },
        { name: 'Pane Bianco', price: 1.99, category: 'Panetteria', unit: '500g', image: '🍞' },
        { name: 'Uova 12pz', price: 3.49, category: 'Latticini', unit: '12pz', image: '🥚' },
        { name: 'Pomodori', price: 2.99, category: 'Frutta e Verdura', unit: '1kg', image: '🍅' },
        {
          name: 'Mele Golden',
          price: 3.49,
          category: 'Frutta e Verdura',
          unit: '1kg',
          image: '🍎',
        },
        { name: 'Petto di Pollo', price: 8.99, category: 'Carne', unit: '1kg', image: '🍗' },
        { name: 'Acqua Minerale', price: 0.49, category: 'Bevande', unit: '1.5L', image: '💧' },
        { name: 'Pasta Gr. 500', price: 1.29, category: 'Panetteria', unit: '500g', image: '🍝' },
      ],
      Conad: [
        { name: 'Mozzarella', price: 2.49, category: 'Latticini', unit: '125g', image: '🧀' },
        { name: 'Prosciutto Cotto', price: 4.99, category: 'Carne', unit: '200g', image: '🥓' },
        { name: 'Banane', price: 2.49, category: 'Frutta e Verdura', unit: '1kg', image: '🍌' },
        { name: 'Yogurt Bianco', price: 1.99, category: 'Latticini', unit: '4pz', image: '🥛' },
        { name: 'Biscotti', price: 2.99, category: 'Panetteria', unit: '400g', image: '🍪' },
        { name: 'Vino Rosso', price: 7.99, category: 'Bevande', unit: '750ml', image: '🍷' },
      ],
      Lidl: [
        { name: 'Birra 6pz', price: 4.99, category: 'Bevande', unit: '6x330ml', image: '🍺' },
        { name: 'Cioccolato', price: 1.99, category: 'Dolci', unit: '100g', image: '🍫' },
        { name: 'Patate', price: 1.99, category: 'Frutta e Verdura', unit: '2kg', image: '🥔' },
        { name: 'Salmone', price: 12.99, category: 'Pesce', unit: '300g', image: '🐟' },
        { name: 'Caffè', price: 3.99, category: 'Bevande', unit: '250g', image: '☕' },
      ],
    };

    const brandProducts = baseProducts[brand?.name] || baseProducts['Carrefour'];

    // Aggiungi prodotti generici se ne servono altri
    const genericProducts = [
      {
        name: `${brand?.name} Product 1`,
        price: (Math.random() * 10 + 1).toFixed(2),
        category: 'Varie',
        unit: '1pz',
        image: '📦',
      },
      {
        name: `${brand?.name} Product 2`,
        price: (Math.random() * 10 + 1).toFixed(2),
        category: 'Varie',
        unit: '1pz',
        image: '📦',
      },
    ];

    return [...brandProducts, ...genericProducts].map((product, index) => ({
      id: index + 1,
      ...product,
      brand: brand?.name,
      inStock: Math.random() > 0.1, // 90% in stock
      discount: Math.random() > 0.8 ? Math.floor(Math.random() * 30 + 10) : 0, // 20% sconto
    }));
  };

  const handleAddToCart = product => {
    if (!product.inStock) {
      Alert.alert('Non Disponibile', 'Questo prodotto è temporaneamente esaurito');
      return;
    }

    addToCart({
      ...product,
      quantity: 1,
      type: 'shopping',
    });

    Alert.alert('Aggiunto!', `${product.name} aggiunto al carrello`);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={brandProductsScreenStyles.productCard}
      onPress={() => handleAddToCart(item)}
    >
      <View style={brandProductsScreenStyles.productHeader}>
        <Text style={brandProductsScreenStyles.productEmoji}>{item.image}</Text>
        <View style={brandProductsScreenStyles.productInfo}>
          <Text style={brandProductsScreenStyles.productName}>{item.name}</Text>
          <Text style={brandProductsScreenStyles.productCategory}>{item.category}</Text>
          <Text style={brandProductsScreenStyles.productUnit}>{item.unit}</Text>
        </View>
        <View style={brandProductsScreenStyles.productActions}>
          {item.discount > 0 && (
            <View style={brandProductsScreenStyles.discountBadge}>
              <Text style={brandProductsScreenStyles.discountText}>-{item.discount}%</Text>
            </View>
          )}
          <Text style={brandProductsScreenStyles.productPrice}>€{item.price}</Text>
        </View>
      </View>
      <View style={brandProductsScreenStyles.productFooter}>
        <View
          style={[
            brandProductsScreenStyles.stockIndicator,
            { backgroundColor: item.inStock ? '#4CAF50' : '#F44336' },
          ]}
        >
          <Text style={brandProductsScreenStyles.stockText}>
            {item.inStock ? '✅ Disponibile' : '❌ Esaurito'}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            brandProductsScreenStyles.addButton,
            { backgroundColor: item.inStock ? '#FF6B00' : '#ccc' },
          ]}
          onPress={() => handleAddToCart(item)}
          disabled={!item.inStock}
        >
          <Text style={brandProductsScreenStyles.addButtonText}>🛒 Aggiungi</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const categories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <View style={brandProductsScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066FF" />
        <Text style={brandProductsScreenStyles.loadingText}>Caricamento prodotti...</Text>
      </View>
    );
  }

  return (
    <View style={brandProductsScreenStyles.container}>
      <View style={brandProductsScreenStyles.header}>
        <Text style={brandProductsScreenStyles.title}>
          {brand?.emoji} {brand?.name}
        </Text>
        <Text style={brandProductsScreenStyles.subtitle}>
          {products.length} prodotti disponibili
        </Text>
      </View>

      <View style={brandProductsScreenStyles.filterContainer}>
        <FlatList
          data={['Tutti', ...categories]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                brandProductsScreenStyles.filterChip,
                selectedCategory === item && brandProductsScreenStyles.selectedFilter,
              ]}
              onPress={() => setSelectedCategory(item === 'Tutti' ? null : item)}
            >
              <Text
                style={[
                  brandProductsScreenStyles.filterText,
                  selectedCategory === item && brandProductsScreenStyles.selectedFilterText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={brandProductsScreenStyles.filterList}
        />
      </View>

      <FlatList
        data={selectedCategory ? products.filter(p => p.category === selectedCategory) : products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={brandProductsScreenStyles.productsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
