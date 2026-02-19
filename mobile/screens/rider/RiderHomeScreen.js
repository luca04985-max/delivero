import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { ordersAPI } from '../../services/api';
import { riderHomeScreenStyles } from './styles/RiderHomeScreenStyles';

export default function RiderHomeScreen({ navigation }) {
  const [availableOrders, setAvailableOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAvailable = async () => {
    try {
      const data = await ordersAPI.getAvailable();
      console.log('📦 Available orders:', data);
      setAvailableOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchAvailable(); }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      await ordersAPI.acceptOrder(orderId);
      Alert.alert("Successo", "Ordine accettato! Vai alla sezione 'Attivi' per gestirlo.");
      fetchAvailable();
      navigation.navigate('Active');
    } catch (e) {
      Alert.alert("Errore", "L'ordine potrebbe essere già stato preso da un altro rider.");
    }
  };

  const renderOrder = ({ item }) => (
    <View style={riderHomeScreenStyles.card}>
      <View style={riderHomeScreenStyles.iconContainer}>
        <Text style={riderHomeScreenStyles.emoji}>📦</Text>
      </View>
      <View style={riderHomeScreenStyles.textGroup}>
        <Text style={riderHomeScreenStyles.address}>Da: {item.pickup_address || 'Punto Ritiro'}</Text>
        <Text style={riderHomeScreenStyles.address}>A: {item.delivery_address}</Text>
        <View style={riderHomeScreenStyles.payoutContainer}>
          <Text style={riderHomeScreenStyles.payout}>€{item.rider_payout || '5.00'}</Text>
        </View>
      </View>
      <TouchableOpacity style={riderHomeScreenStyles.acceptBtn} onPress={() => handleAcceptOrder(item.id)}>
        <Text style={riderHomeScreenStyles.acceptBtnText}>ACCETTA</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={riderHomeScreenStyles.container}>
      <View style={riderHomeScreenStyles.header}>
        <Text style={riderHomeScreenStyles.headerTitle}>Ordini Disponibili</Text>
        <View style={riderHomeScreenStyles.statusBadge}>
          <View style={riderHomeScreenStyles.statusDot}></View>
          <Text style={riderHomeScreenStyles.statusText}>Online</Text>
        </View>
      </View>
      <FlatList
        data={availableOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchAvailable} />}
        contentContainerStyle={{ padding: 15 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }}>Nessun ordine disponibile al momento.</Text>}
      />
    </View>
  );
}