import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import api from '../services/api';
import { pharmacyScreenStyles } from './styles/PharmacyScreenStyles';

export default function PharmacyScreen() {
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchPharmacies(); }, []);

  const fetchPharmacies = async () => {
    setLoading(true);
    try {
      const response = await api.get('/pharmacies');
      setPharmacies(response.data);
    } catch (error) {
      Alert.alert('Errore', 'Impossibile caricare le farmacie di Roma Est');
    } finally { setLoading(false); }
  };

  const selectPharmacy = async (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setLoading(true);
    try {
      const response = await api.get(`/pharmacies/${pharmacy.id}/products`);
      setProducts(response.data);
    } catch (error) {
      Alert.alert('Errore', 'Errore nel caricamento prodotti');
    } finally { setLoading(false); }
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <View style={pharmacyScreenStyles.container}>
      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}

      {!selectedPharmacy ? (
        <FlatList
          data={pharmacies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={pharmacyScreenStyles.card} onPress={() => selectPharmacy(item)}>
              <Text style={pharmacyScreenStyles.cardTitle}> {item.name}</Text>
              <Text style={pharmacyScreenStyles.cardSub}>{item.address}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => setSelectedPharmacy(null)} style={pharmacyScreenStyles.backBtn}>
            <Text style={{ color: '#007AFF' }}> Torna alle farmacie</Text>
          </TouchableOpacity>
          <Text style={pharmacyScreenStyles.sectionTitle}>Prodotti di {selectedPharmacy.name}</Text>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={pharmacyScreenStyles.productRow}>
                <Text>{item.name} - €{item.price}</Text>
                <TouchableOpacity onPress={() => addToCart(item)} style={pharmacyScreenStyles.addBtn}>
                  <Text style={{ color: '#fff' }}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      {cart.length > 0 && (
        <View style={pharmacyScreenStyles.footer}>
          <Text style={pharmacyScreenStyles.totalText}>Totale: €{totalPrice.toFixed(2)}</Text>
          <TouchableOpacity style={pharmacyScreenStyles.orderBtn} onPress={() => Alert.alert("Ordine", "Inviato al corriere!")}>
            <Text style={pharmacyScreenStyles.orderBtnText}>Conferma Ordine Farmacia</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}