import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ordersAPI } from '../../services/api';
import { riderHomeScreenStyles } from './styles/RiderHomeScreenStyles';
import { useToast } from '../../hooks/useToast';
import logger from '../../utils/logger';
import { mobileTheme } from '../../theme';

export default function RiderHomeScreen({ navigation }) {
  const [availableOrders, setAvailableOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Hook custom per toast
  const { showToast } = useToast();

  const fetchAvailable = async () => {
    try {
      setRefreshing(true);
      const data = await ordersAPI.getAvailable();
      setAvailableOrders(data);
    } catch (e) {
      logger.error('Error fetching available orders:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAvailable();
  }, []);

  // Refresh automatico quando lo screen diventa visibile
  useFocusEffect(
    useCallback(() => {
      logger.debug('RiderHomeScreen focused - refreshing available orders');
      fetchAvailable();
    }, []),
  );

  const handleAcceptOrder = async orderId => {
    try {
      await ordersAPI.acceptOrder(orderId);
      showToast('✅ Ordine accettato! Vai alla sezione "Attivi" per gestirlo', 'success');
      fetchAvailable();
      navigation.navigate('Active');
    } catch (e) {
      showToast("⚠️ L'ordine potrebbe essere già stato preso da un altro rider", 'warning');
    }
  };

  const renderOrder = ({ item }) => (
    <View style={riderHomeScreenStyles.card}>
      <View style={riderHomeScreenStyles.iconContainer}>
        <Text style={riderHomeScreenStyles.emoji}>📦</Text>
      </View>
      <View style={riderHomeScreenStyles.textGroup}>
        <Text style={riderHomeScreenStyles.address}>
          Da: {item.pickup_address || 'Punto Ritiro'}
        </Text>
        <Text style={riderHomeScreenStyles.address}>A: {item.delivery_address}</Text>
      </View>
      <TouchableOpacity
        style={riderHomeScreenStyles.acceptBtn}
        onPress={() => handleAcceptOrder(item.id)}
      >
        <Text style={riderHomeScreenStyles.acceptBtnText}>ACCETTA</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={riderHomeScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color={mobileTheme.colors.primary} />
      </View>
    );
  }

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
        keyExtractor={item => item.id.toString()}
        renderItem={renderOrder}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchAvailable} />}
        contentContainerStyle={riderHomeScreenStyles.contentPadding}
        ListEmptyComponent={<Text style={riderHomeScreenStyles.emptyText}>Nessun ordine disponibile al momento.</Text>}
      />
    </View>
  );
}
