import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, RefreshControl, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { adminAPI } from '../../services/api';
import { adminDashboardOrderStyles as styles } from './styles/AdminDashboardOrdersStyles';
import { mobileTheme } from '../../theme';

export default function AdminDashboardOrders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = status => {
    setExpandedSections(prev => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const fetchOrders = async () => {
    try {
      const data = await adminAPI.getAllOrders();
      setOrders(Array.isArray(data) ? data : data.data || []);
    } catch (e) {
      Alert.alert('Errore', 'Non ho potuto caricare tutti gli ordini.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  // Funzione per renderizzare il separatore di stato
  const renderStatusSeparator = (status, count, statusInfo, isExpanded) => {
    return (
      <TouchableOpacity
        style={styles.statusSeparator}
        onPress={() => toggleSection(status)}
        activeOpacity={0.7}
      >
        <View style={styles.statusSeparatorContent}>
          <View style={styles.statusSeparatorLeft}>
            <Text style={styles.statusSeparatorIcon}>{statusInfo.icon}</Text>
            <Text style={styles.statusSeparatorTitle}>{statusInfo.label}</Text>
          </View>
          <View style={styles.statusSeparatorRight}>
            <Text style={styles.statusSeparatorCount}>{count}</Text>
            <Text style={styles.statusSeparatorToggle}>{isExpanded ? '🔼' : '🔽'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Funzione per renderizzare gli ordini con separatori
  const renderOrdersWithSeparators = () => {
    const statusGroups = {};

    // Raggruppa gli ordini per stato
    orders.forEach(order => {
      const status = order.status || 'unknown';
      if (!statusGroups[status]) {
        statusGroups[status] = [];
      }
      statusGroups[status].push(order);
    });

    const statusInfo = {
      pending: { label: 'In Attesa', icon: '⏳' },
      confirmed: { label: 'Confermati', icon: '✅' },
      preparing: { label: 'In Preparazione', icon: '👨‍🍳' },
      ready: { label: 'Pronti', icon: '📦' },
      pickup: { label: 'Ritiro', icon: '📦' },
      in_transit: { label: 'In Viaggio', icon: '🚚' },
      delivered: { label: 'Consegnati', icon: '✅' },
      cancelled: { label: 'Cancellati', icon: '❌' },
    };

    const result = [];

    Object.keys(statusGroups).forEach(status => {
      const groupOrders = statusGroups[status];
      const isExpanded = !!expandedSections[status];

      result.push(
        <View key={`separator-${status}`}>
          {renderStatusSeparator(
            status,
            groupOrders.length,
            statusInfo[status] || { label: status, icon: '📋' },
            isExpanded,
          )}
        </View>,
      );

      if (isExpanded) {
        groupOrders.forEach(order => {
          result.push(<View key={`order-${order.id}`}>{renderOrder({ item: order })}</View>);
        });
      }
    });

    return result;
  };

  const renderOrder = ({ item }) => {
    const isDelivered = String(item.status || '').toUpperCase() === 'DELIVERED';
    const IN_TRANSIT = String(item.status || '').toUpperCase() === 'IN_TRANSIT';

    return (
      <View style={[styles.card, isDelivered && styles.deliveredCard]}>
        <View style={styles.orderHeader}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>Ordine #{item.id}</Text>
            <Text style={styles.orderDate}>Cliente: {item.customer_name || '—'}</Text>
            <Text style={styles.orderDate}>Rider: {item.rider_name || '—'}</Text>
            <Text style={styles.orderDate}>Indirizzo: {item.delivery_address || '—'}</Text>
            <Text style={styles.orderDate}>
              ETA: {item.eta_minutes != null ? `${item.eta_minutes} min` : '—'}
            </Text>
          </View>
          <View style={styles.orderStatus}>
            <Text style={styles.orderStatusText}>
              {item.status === 'pending' && '⏳ IN ATTESA'}
              {item.status === 'confirmed' && '✓ ACCETTATO'}
              {item.status === 'preparing' && '👨‍🍳 IN PREPARAZIONE'}
              {item.status === 'ready' && '📦 PRONTO'}
              {item.status === 'pickup' && '📦 RITIRO'}
              {item.status === 'in_transit' && '🚚 IN VIAGGIO'}
              {item.status === 'delivered' && '✅ CONSEGNATO'}
              {item.status === 'cancelled' && '❌ CANCELLATO'}
            </Text>
          </View>
        </View>

        <View style={styles.orderItems}>
          <Text style={styles.orderTotal}>
            €{item.total_amount != null ? Number(item.total_amount).toFixed(2) : '0.00'}
          </Text>
        </View>

        {IN_TRANSIT && (
          <TouchableOpacity
            style={styles.trackButton}
            onPress={() => navigation.navigate('ManagerRealTimeMap', { orderId: item.id })}
          >
            <Text style={styles.trackButtonText}>Traccia</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>Tutti gli Ordini</Text>
        <Text style={styles.subtitle}>Gestione completa ordini</Text>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={mobileTheme.colors.secondary} />
          <Text style={styles.loadingText}>Caricamento ordini...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={styles.content}
      >
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nessun ordine trovato</Text>
            <Text style={styles.emptySubtext}>Non ci sono ordini nel sistema</Text>
          </View>
        ) : (
          renderOrdersWithSeparators()
        )}
      </ScrollView>
    </View>
  );
}
