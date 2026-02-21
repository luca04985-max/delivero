import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { ordersAPI } from '../../services/api';
import { riderActiveScreenStyles } from './styles/RiderActiveScreenStyles';
import { useToast } from '../../hooks/useToast';
import { useRiderLocationSender } from '../../hooks/useRiderLocationSender';

export default function RiderActiveScreen() {
  const [activeOrders, setActiveOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Hook custom per toast
  const { toast, showToast } = useToast();

  useEffect(() => {
    fetchActiveOrders();
  }, []);

  const fetchActiveOrders = async () => {
    try {
      const data = await ordersAPI.getActiveRiderOrders();
      setActiveOrders(data);
    } catch (e) {
      console.error('Error fetching active orders:', e);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await ordersAPI.updateOrderRiderStatus(orderId, newStatus);
      showToast(`✅ Stato aggiornato: ${newStatus}`, 'success');
      fetchActiveOrders();
    } catch (e) {
      console.error('Error updating status:', e);
      showToast('❌ Impossibile aggiornare lo stato', 'error');
    }
  };

  const ActiveOrderCard = ({ item }) => {
    //useRiderLocationSender(item?.id, item?.status);

    return (
      <View style={riderActiveScreenStyles.activeCard}>
        <Text style={riderActiveScreenStyles.statusBadge}>{item.status.toUpperCase()}</Text>
        <Text style={riderActiveScreenStyles.customerName}>Cliente: {item.customer_name || 'Utente'}</Text>
        <Text style={riderActiveScreenStyles.address}>📍 {item.delivery_address}</Text>

        <View style={riderActiveScreenStyles.row}>
          {item.status === 'accepted' && (
            <TouchableOpacity style={riderActiveScreenStyles.btnPickup} onPress={() => updateStatus(item.id, 'pickup')}>
              <Text style={riderActiveScreenStyles.btnText}>Ritirato</Text>
            </TouchableOpacity>
          )}
          {(item.status === 'pickup' || item.status === 'accepted') && (
            <TouchableOpacity style={riderActiveScreenStyles.btnTransit} onPress={() => updateStatus(item.id, 'in_transit')}>
              <Text style={riderActiveScreenStyles.btnText}>In Viaggio</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={riderActiveScreenStyles.btnComplete} onPress={() => updateStatus(item.id, 'delivered')}>
            <Text style={riderActiveScreenStyles.btnText}>Consegnato ✅</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={riderActiveScreenStyles.container}>
      <View style={riderActiveScreenStyles.header}>
        <Text style={riderActiveScreenStyles.headerTitle}>Le tue consegne attive</Text>
      </View>
      <FlatList
        data={activeOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ActiveOrderCard item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchActiveOrders} />
        }
        ListEmptyComponent={
          <View style={riderActiveScreenStyles.emptyContainer}>
            <Text style={riderActiveScreenStyles.emptyText}>Nessuna consegna attiva</Text>
            <Text style={riderActiveScreenStyles.emptySubtext}>Accetta un ordine per iniziare</Text>
          </View>
        }
      />
    </View>
  );
}