import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { ordersAPI } from '../../services/api';
import { customerOrdersScreenStyles } from './styles/CustomerOrdersScreenStyles';

export default function CustomerOrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      const data = await ordersAPI.getMyOrders();
      setOrders(data);
    } catch (e) {
      Alert.alert("Errore", "Non ho potuto caricare i tuoi ordini.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const renderOrder = ({ item }) => (
    <View style={customerOrdersScreenStyles.orderCard}>
      <View style={customerOrdersScreenStyles.orderHeader}>
        <Text style={customerOrdersScreenStyles.orderId}>Ordine #{item.id.toString().slice(-5)}</Text>
        <View style={customerOrdersScreenStyles.orderStatus}>
          <Text style={customerOrdersScreenStyles.orderStatusText}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={customerOrdersScreenStyles.orderInfo}>
        <Text style={customerOrdersScreenStyles.orderDate}>{item.created_at || 'Data non disponibile'}</Text>
        <Text style={customerOrdersScreenStyles.orderTotal}>€{item.total_price || item.total}</Text>
      </View>
      <View style={customerOrdersScreenStyles.orderItems}>
        {item.items?.slice(0, 2).map((orderItem, index) => (
          <View key={index} style={customerOrdersScreenStyles.orderItem}>
            <Text style={customerOrdersScreenStyles.itemQuantity}>{orderItem.quantity}x</Text>
            <Text style={customerOrdersScreenStyles.itemName}>{orderItem.name}</Text>
            <Text style={customerOrdersScreenStyles.itemPrice}>€{orderItem.price}</Text>
          </View>
        ))}
      </View>
      {item.status !== 'delivered' && item.status !== 'cancelled' ? (
        <TouchableOpacity
          style={customerOrdersScreenStyles.trackButton}
          onPress={() => navigation.navigate('OrderTrackingLive', { orderId: item.id })}
        >
          <Text style={customerOrdersScreenStyles.trackButtonText}>Traccia Live 📍</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={customerOrdersScreenStyles.trackButton} onPress={() => Alert.alert("Reorder", "Funzione in arrivo!")}>
          <Text style={customerOrdersScreenStyles.trackButtonText}>Ordina di nuovo</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) return (
    <View style={customerOrdersScreenStyles.loadingContainer}>
      <ActivityIndicator size="large" />
      <Text style={customerOrdersScreenStyles.loadingText}>Caricamento ordini...</Text>
    </View>
  );

  return (
    <View style={customerOrdersScreenStyles.container}>
      <View style={customerOrdersScreenStyles.header}>
        <View style={customerOrdersScreenStyles.headerContent}>
          <Text style={customerOrdersScreenStyles.title}>I Miei Ordini</Text>
        </View>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchOrders} />}
        contentContainerStyle={customerOrdersScreenStyles.ordersList}
        ListEmptyComponent={
          <View style={customerOrdersScreenStyles.emptyContainer}>
            <Text style={customerOrdersScreenStyles.emptyText}>Nessun ordine trovato</Text>
          </View>
        }
      />
    </View>
  );
}