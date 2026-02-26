import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restaurantDetailScreenStyles } from './styles/RestaurantDetailScreenStyles';
import { mobileTheme } from '../../theme';
import { makeRequest } from '../../services/api';
import { useCart } from '../../context/CartContext';

export default function RestaurantDetailScreen({ route, navigation: _navigation }) {
  const { restaurant } = route.params;
  const { addToCart } = useCart();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const raw = await AsyncStorage.getItem('user');
        if (raw) {
          const u = JSON.parse(raw);
          setUserRole(u?.role);
        }
      } catch (e) {
        // ignore
      }
    };
    loadUser();
  }, []);

  const [restaurantDetail, setRestaurantDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customizationSelections, setCustomizationSelections] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const loadRestaurantDetail = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await makeRequest(`/restaurants/${restaurant.id}`, { method: 'GET' });
      setRestaurantDetail(data);

      // Set first category as selected (extract unique categories from menu items)
      if (data.menu && data.menu.length > 0) {
        const uniqueCategories = [...new Set(data.menu.map(item => item.category))];
        setSelectedCategory(uniqueCategories[0]);
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error loading restaurant:', error);
      Alert.alert('Errore', 'Non è stato possibile caricare il ristorante');
    } finally {
      setLoading(false);
    }
  }, [restaurant?.id]);

  useEffect(() => {
    if (restaurant?.id) {
      loadRestaurantDetail();
    }
  }, [restaurant?.id, loadRestaurantDetail]);

  const openProductModal = product => {
    setSelectedProduct(product);
    setCustomizationSelections({});
    setQuantity(1);
    setNotes('');
    setProductModal(true);
  };

  const closeProductModal = () => {
    setProductModal(false);
    setSelectedProduct(null);
  };

  const handleCustomizationChange = (customizationId, selectedOption) => {
    setCustomizationSelections(prev => ({
      ...prev,
      [customizationId]: selectedOption,
    }));
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    // Build customizations array
    const customizations = Object.entries(customizationSelections).map(([custId, value]) => ({
      id: custId,
      selected: value,
    }));

    // Add to cart
    addToCart(selectedProduct, restaurant.id, customizations);

    Alert.alert('✅ Aggiunto!', `${selectedProduct.name} x${quantity} aggiunto al carrello`);
    closeProductModal();
  };

  const renderCategoryTab = ({ item }) => (
    <TouchableOpacity
      style={[
        restaurantDetailScreenStyles.categoryTab,
        selectedCategory === item && restaurantDetailScreenStyles.categoryTabActive,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          restaurantDetailScreenStyles.categoryTabText,
          selectedCategory === item && restaurantDetailScreenStyles.categoryTabTextActive,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={restaurantDetailScreenStyles.productCard}
      onPress={() => openProductModal(item)}
    >
      <View style={restaurantDetailScreenStyles.productHeader}>
        <View style={restaurantDetailScreenStyles.productHeaderLeft}>
          <Text style={restaurantDetailScreenStyles.productName}>{item.name}</Text>
          <Text style={restaurantDetailScreenStyles.productDescription}>{item.description}</Text>
        </View>
        <Text style={restaurantDetailScreenStyles.productPrice}>€{item.price}</Text>
      </View>

      {item.allergens && item.allergens.length > 0 && (
        <Text style={restaurantDetailScreenStyles.allergens}>
          ⚠️ Contiene: {item.allergens.join(', ')}
        </Text>
      )}

      {item.customizations && item.customizations.length > 0 && (
        <Text style={restaurantDetailScreenStyles.customizationHint}>
          ⚙️ {item.customizations.length} personalizzazione disponibili
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderCustomization = ({ item }) => (
    <View style={restaurantDetailScreenStyles.customizationBlock}>
      <Text style={restaurantDetailScreenStyles.customizationLabel}>{item.name}</Text>

      {item.type === 'radio' && (
        <View style={restaurantDetailScreenStyles.customizationOptions}>
          {item.options?.map((option, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                restaurantDetailScreenStyles.optionButton,
                customizationSelections[item.id] === option.name &&
                  restaurantDetailScreenStyles.optionButtonSelected,
              ]}
              onPress={() => handleCustomizationChange(item.id, option.name)}
            >
              <Text
                style={[
                  restaurantDetailScreenStyles.optionText,
                  customizationSelections[item.id] === option.name &&
                    restaurantDetailScreenStyles.optionTextSelected,
                ]}
              >
                {option.name} {option.price > 0 && `+€${option.price.toFixed(2)}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {item.type === 'checkbox' && (
        <View style={restaurantDetailScreenStyles.customizationOptions}>
          {item.options?.map((option, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                restaurantDetailScreenStyles.checkboxButton,
                customizationSelections[item.id]?.includes(option.name) &&
                  restaurantDetailScreenStyles.checkboxButtonSelected,
              ]}
              onPress={() => {
                const selected = customizationSelections[item.id] || [];
                const updated = selected.includes(option.name)
                  ? selected.filter(s => s !== option.name)
                  : [...selected, option.name];
                handleCustomizationChange(item.id, updated);
              }}
            >
              <Text style={restaurantDetailScreenStyles.checkboxText}>
                {customizationSelections[item.id]?.includes(option.name) ? '☑️' : '☐'} {option.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {item.type === 'text' && (
        <TextInput
          style={restaurantDetailScreenStyles.textInput}
          placeholder={`Aggiungi ${item.name.toLowerCase()}`}
          value={customizationSelections[item.id] || ''}
          onChangeText={text => handleCustomizationChange(item.id, text)}
        />
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={restaurantDetailScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color={mobileTheme.colors.primary} />
        <Text style={restaurantDetailScreenStyles.loadingText}>Caricamento menu...</Text>
      </View>
    );
  }

  const currentCategoryProducts =
    restaurantDetail?.menu?.filter(item => item.category === selectedCategory) || [];

  return (
    <View style={restaurantDetailScreenStyles.container}>
      {/* Header */}
      <View style={restaurantDetailScreenStyles.header}>
        <View style={restaurantDetailScreenStyles.headerInfo}>
          <Text style={restaurantDetailScreenStyles.restaurantName}>{restaurantDetail?.name}</Text>
          <Text style={restaurantDetailScreenStyles.restaurantInfo}>
            ⭐{' '}
            {typeof restaurantDetail?.rating === 'number'
              ? restaurantDetail.rating.toFixed(1)
              : 'N/A'}{' '}
            • ⏱️ {restaurantDetail?.delivery_time}min • 💰 €
            {typeof restaurantDetail?.delivery_cost === 'number'
              ? restaurantDetail.delivery_cost.toFixed(2)
              : '0.00'}
          </Text>
        </View>
        {/* Show manage button to restaurant users/managers */}
        {(userRole === 'restaurant' || userRole === 'manager') && (
          <View style={restaurantDetailScreenStyles.manageButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                try {
                  const parent = _navigation.getParent && _navigation.getParent();
                  if (parent && typeof parent.navigate === 'function') {
                    parent.navigate('Inventory', { restaurantId: restaurant.id });
                    return;
                  }
                  _navigation.navigate('Inventory', { restaurantId: restaurant.id });
                } catch (e) {
                  Alert.alert('Navigazione', 'Apri Profilo -> Gestisci Inventory');
                  try {
                    _navigation.navigate('Profile');
                  } catch (e2) {
                    // ignore
                  }
                }
              }}
              style={restaurantDetailScreenStyles.manageButton}
            >
              <Text style={restaurantDetailScreenStyles.manageButtonText}>Gestisci Inventory</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Categories */}
      <FlatList
        data={categories}
        renderItem={renderCategoryTab}
        keyExtractor={(item, index) => item?.toString() || index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={restaurantDetailScreenStyles.categoriesList}
        contentContainerStyle={restaurantDetailScreenStyles.categoriesContent}
      />

      {/* Products */}
      <FlatList
        data={currentCategoryProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={true}
        style={restaurantDetailScreenStyles.productsList}
        contentContainerStyle={restaurantDetailScreenStyles.productsContent}
        ListEmptyComponent={
          <View style={restaurantDetailScreenStyles.emptyContainer}>
            <Text style={restaurantDetailScreenStyles.emptyText}>
              😅 Nessun prodotto in questa categoria
            </Text>
          </View>
        }
      />

      {/* Product Details Modal */}
      <Modal
        visible={productModal}
        transparent
        animationType="slide"
        onRequestClose={closeProductModal}
      >
        <View style={restaurantDetailScreenStyles.modalContainer}>
          <View style={restaurantDetailScreenStyles.modalContent}>
            {/* Modal Header */}
            <View style={restaurantDetailScreenStyles.modalHeader}>
              <TouchableOpacity onPress={closeProductModal}>
                <Text style={restaurantDetailScreenStyles.closeButton}>✕</Text>
              </TouchableOpacity>
              <Text style={restaurantDetailScreenStyles.modalTitle}>{selectedProduct?.name}</Text>
              <View style={restaurantDetailScreenStyles.spacer30} />
            </View>

            <ScrollView style={restaurantDetailScreenStyles.modalBody}>
              {/* Product Info */}
              <Text style={restaurantDetailScreenStyles.modalDescription}>
                {selectedProduct?.description}
              </Text>
              <Text style={restaurantDetailScreenStyles.modalPrice}>
                Prezzo:{' '}
                <Text style={restaurantDetailScreenStyles.priceValue}>
                  €{selectedProduct?.price}
                </Text>
              </Text>

              {selectedProduct?.allergens && selectedProduct.allergens.length > 0 && (
                <View style={restaurantDetailScreenStyles.allergenBlock}>
                  <Text style={restaurantDetailScreenStyles.allergenLabel}>
                    ⚠️ Contiene allergeni:
                  </Text>
                  <Text style={restaurantDetailScreenStyles.allergenText}>
                    {selectedProduct.allergens.join(', ')}
                  </Text>
                </View>
              )}

              {/* Customizations */}
              {selectedProduct?.customizations && selectedProduct.customizations.length > 0 && (
                <View style={restaurantDetailScreenStyles.customizationsSection}>
                  <Text style={restaurantDetailScreenStyles.customizationsTitle}>
                    ⚙️ Personalizzazioni
                  </Text>
                  <FlatList
                    data={selectedProduct.customizations}
                    renderItem={renderCustomization}
                    keyExtractor={item => item.id.toString()}
                    scrollEnabled={false}
                  />
                </View>
              )}

              {/* Notes */}
              <View style={restaurantDetailScreenStyles.notesSection}>
                <Text style={restaurantDetailScreenStyles.notesLabel}>📝 Note (opzionale)</Text>
                  <TextInput
                  style={restaurantDetailScreenStyles.notesInput}
                  placeholder="Aggiungi note al tuo ordine..."
                  multiline
                  numberOfLines={3}
                  value={notes}
                  onChangeText={setNotes}
                    placeholderTextColor={mobileTheme.colors.text.secondary}
                />
              </View>

              {/* Quantity Selector */}
              <View style={restaurantDetailScreenStyles.quantitySection}>
                <Text style={restaurantDetailScreenStyles.quantityLabel}>Quantità</Text>
                <View style={restaurantDetailScreenStyles.quantityControls}>
                  <TouchableOpacity
                    style={restaurantDetailScreenStyles.quantityButton}
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Text style={restaurantDetailScreenStyles.quantityButtonText}>−</Text>
                  </TouchableOpacity>
                  <Text style={restaurantDetailScreenStyles.quantityValue}>{quantity}</Text>
                  <TouchableOpacity
                    style={restaurantDetailScreenStyles.quantityButton}
                    onPress={() => setQuantity(quantity + 1)}
                  >
                    <Text style={restaurantDetailScreenStyles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            {/* Add to Cart Button */}
            <View style={restaurantDetailScreenStyles.modalFooter}>
              <TouchableOpacity
                style={restaurantDetailScreenStyles.addToCartButton}
                onPress={handleAddToCart}
              >
                <Text style={restaurantDetailScreenStyles.addToCartText}>
                  🛒 Aggiungi al carrello • €{(selectedProduct?.price * quantity).toFixed(2)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
