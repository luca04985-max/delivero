import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ordersAPI } from '../../services/api';
import { paymentsAPI } from '../../services/api';
import { riderActiveScreenStyles } from './styles/RiderActiveScreenStyles';
import { useToast } from '../../hooks/useToast';
import { useRiderLocationSender } from '../../hooks/useRiderLocationSender';
import logger from '../../utils/logger';

export default function RiderActiveScreen() {
  const [activeOrders, setActiveOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({}); // Stato per sezioni espanse

  // Hook custom per toast
  const { showToast } = useToast();

  useEffect(() => {
    fetchActiveOrders();
  }, []);

  // Refresh automatico quando lo screen diventa visibile
  useFocusEffect(
    React.useCallback(() => {
      logger.debug('RiderActiveScreen focused - refreshing orders');
      fetchActiveOrders();
    }, []),
  );

  // Funzione per toggle delle sezioni
  const toggleSection = status => {
    setExpandedSections(prev => ({
      ...prev,
      [status]: !prev[status], // Inverte lo stato: se era chiuso (false/undefined) lo apre (true)
    }));
  };

  const fetchActiveOrders = async () => {
    try {
      setRefreshing(true);
      logger.debug('Fetching active orders...');
      const data = await ordersAPI.getActiveRiderOrders();
      logger.debug('Received orders:', data);
      logger.debug('Orders count:', data?.length || 0);
      data?.forEach((order, index) => {
        logger.debug(`Order ${index + 1}:`, {
          id: order.id,
          status: order.status,
          rider_id: order.rider_id,
        });
      });
      setActiveOrders(data);
    } catch (e) {
      logger.error('Error fetching active orders:', e);
    } finally {
      setRefreshing(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await ordersAPI.updateOrderRiderStatus(orderId, newStatus);
      logger.info('Updated order status:', response);
      showToast(`✅ Stato aggiornato: ${newStatus}`, 'success');
      fetchActiveOrders();
      if (newStatus === 'delivered') {
        await paymentsAPI.markCashCollected(orderId);
      }
    } catch (e) {
      console.error('Error updating status:', e);
      showToast('❌ Impossibile aggiornare lo stato', 'error');
    }
  };

  const ActiveOrderCard = ({ item }) => {
    useRiderLocationSender(item?.id, item?.status);

    return (
      <View style={riderActiveScreenStyles.activeCard}>
        <Text style={riderActiveScreenStyles.statusBadge}>{item.status.toUpperCase()}</Text>
        <Text style={riderActiveScreenStyles.customerName}>
          Cliente: {item.customer_name || 'Utente'}
        </Text>
        <Text style={riderActiveScreenStyles.address}>📍 {item.delivery_address}</Text>

        <View style={riderActiveScreenStyles.row}>
          {item.status === 'accepted' && (
            <TouchableOpacity
              style={riderActiveScreenStyles.btnPickup}
              onPress={() => updateStatus(item.id, 'pickup')}
            >
              <Text style={riderActiveScreenStyles.btnText}>Ritirato</Text>
            </TouchableOpacity>
          )}
          {(item.status === 'pickup' || item.status === 'accepted') && (
            <TouchableOpacity
              style={riderActiveScreenStyles.btnTransit}
              onPress={() => updateStatus(item.id, 'in_transit')}
            >
              <Text style={riderActiveScreenStyles.btnText}>In Viaggio</Text>
            </TouchableOpacity>
          )}
          {item.status === 'in_transit' && (
            <TouchableOpacity
              style={riderActiveScreenStyles.btnComplete}
              onPress={() => updateStatus(item.id, 'delivered')}
            >
              <Text style={riderActiveScreenStyles.btnText}>Consegnato ✅</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderStatusSeparator = (status, count, info, isExpanded) => {
    return (
      <TouchableOpacity
        style={riderActiveScreenStyles.statusSeparator}
        onPress={() => toggleSection(status)} // Chiama la funzione toggle
      >
        <View style={riderActiveScreenStyles.statusSeparatorContent}>
          <Text>
            {info.icon} {info.label} ({count})
          </Text>
          {/* Cambia l'icona in base allo stato aperto/chiuso */}
          <Text>{isExpanded ? '🔼' : '🔽'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderOrdersWithSeparators = () => {
    const statusGroups = {};

    // Raggruppamento (rimane uguale)
    activeOrders.forEach(order => {
      if (!statusGroups[order.status]) {
        statusGroups[order.status] = [];
      }
      statusGroups[order.status].push(order);
    });

    const statusInfo = {
      accepted: { label: 'Accettati', icon: '📋' },
      pickup: { label: 'Ritirati', icon: '📦' },
      in_transit: { label: 'In Viaggio', icon: '🚚' },
      delivered: { label: 'Consegnati', icon: '✅' },
    };

    const result = [];

    // Ciclo sui gruppi di stato
    Object.keys(statusGroups).forEach(status => {
      const groupOrders = statusGroups[status];
      // Controlliamo se questa specifica sezione è espansa
      const isExpanded = !!expandedSections[status];

      // 1. Aggiungiamo sempre il separatore
      result.push(
        <View key={`separator-${status}`}>
          {/* Passiamo isExpanded al separatore per cambiare l'icona se vuoi */}
          {renderStatusSeparator(status, groupOrders.length, statusInfo[status], isExpanded)}
        </View>,
      );

      // 2. Aggiungiamo gli ordini SOLO se la sezione è espansa
      if (isExpanded) {
        groupOrders.forEach(order => {
          result.push(
            <View key={`order-${order.id}`}>
              <ActiveOrderCard item={order} />
            </View>,
          );
        });
      }
    });

    return result;
  };

  return (
    <View style={riderActiveScreenStyles.container}>
      <View style={riderActiveScreenStyles.header}>
        <Text style={riderActiveScreenStyles.headerTitle}>Le tue consegne attive</Text>
      </View>
      <ScrollView
        style={riderActiveScreenStyles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchActiveOrders} />}
      >
        {activeOrders.length === 0 ? (
          <View style={riderActiveScreenStyles.emptyContainer}>
            <Text style={riderActiveScreenStyles.emptyText}>Nessuna consegna attiva</Text>
            <Text style={riderActiveScreenStyles.emptySubtext}>Accetta un ordine per iniziare</Text>
          </View>
        ) : (
          renderOrdersWithSeparators()
        )}
      </ScrollView>
    </View>
  );
}
