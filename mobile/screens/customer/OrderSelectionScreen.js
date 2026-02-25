import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { ordersAPI } from '../../services/api';
import { customerOrdersScreenStyles } from './styles/CustomerOrdersScreenStyles';

export default function OrderSelectionScreen({ navigation, route }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await ordersAPI.getMyOrders();
      setOrders(data);
    } catch (e) {
      Alert.alert('Errore', 'Non ho potuto caricare i tuoi ordini.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const toggleSection = status => {
    setExpandedSections(prev => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const selectOrder = order => {
    // Torna indietro al CreateTicket con l'ordine selezionato
    navigation.navigate('CreateTicket', {
      orderId: order.id,
      orderData: order,
    });
  };

  const getStatusColor = status => {
    switch (status) {
      case 'pending':
        return '#FF9800';
      case 'accepted':
        return '#2196F3';
      case 'preparing':
        return '#9C27B0';
      case 'pickup':
        return '#FF5722';
      case 'in_transit':
        return '#4CAF50';
      case 'delivered':
        return '#607D8B';
      case 'cancelled':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const renderOrder = ({ item }) => (
    <TouchableOpacity
      style={customerOrdersScreenStyles.orderCard}
      onPress={() => selectOrder(item)}
    >
      <View style={customerOrdersScreenStyles.orderHeader}>
        <Text style={customerOrdersScreenStyles.orderId}>
          Ordine #{item.id.toString().slice(-5)}
        </Text>
        <View style={customerOrdersScreenStyles.orderStatus}>
          <Text style={customerOrdersScreenStyles.orderStatusText}>
            {item.status === 'pending' && '⏳ IN ATTESA'}
            {item.status === 'accepted' && '✓ ACCETTATO'}
            {item.status === 'preparing' && '👨‍🍳 IN PREPARAZIONE'}
            {item.status === 'pickup' && '📦 PRONTO PER RITIRO'}
            {item.status === 'in_transit' && '🚗 IN CONSEGNA'}
            {item.status === 'delivered' && '✅ CONSEGNATO'}
            {item.status === 'cancelled' && '❌ CANCELLATO'}
          </Text>
        </View>
      </View>

      {item.restaurant_name && (
        <View style={customerOrdersScreenStyles.restaurantInfo}>
          <Text style={customerOrdersScreenStyles.restaurantName}>{item.restaurant_name}</Text>
          {item.restaurant_address && (
            <Text style={customerOrdersScreenStyles.restaurantAddress}>
              📍 {item.restaurant_address}
            </Text>
          )}
        </View>
      )}

      <View style={customerOrdersScreenStyles.orderInfo}>
        <Text style={customerOrdersScreenStyles.orderDate}>
          {item.created_at
            ? new Date(item.created_at).toLocaleDateString('it-IT', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })
            : 'Data non disponibile'}
        </Text>
        <Text style={customerOrdersScreenStyles.orderTotal}>
          €{item.total_amount || item.total_price || item.total}
        </Text>
        {item.delivery_fee && (
          <Text style={customerOrdersScreenStyles.deliveryFee}>Consegna: €{item.delivery_fee}</Text>
        )}
      </View>

      <View style={customerOrdersScreenStyles.orderItems}>
        <Text style={customerOrdersScreenStyles.itemsTitle}>Articoli:</Text>
        {item.items?.slice(0, 3).map((orderItem, index) => (
          <View key={index} style={customerOrdersScreenStyles.orderItem}>
            <Text style={customerOrdersScreenStyles.itemQuantity}>{orderItem.quantity}x</Text>
            <Text style={customerOrdersScreenStyles.itemName}>{orderItem.name}</Text>
            <Text style={customerOrdersScreenStyles.itemPrice}>€{orderItem.price}</Text>
          </View>
        ))}
        {item.items?.length > 3 && (
          <Text style={customerOrdersScreenStyles.moreItems}>
            +{item.items.length - 3} altri articoli
          </Text>
        )}
      </View>

      {/* Badge di selezione */}
      <View style={customerOrdersScreenStyles.selectOrderOverlay}>
        <Text style={customerOrdersScreenStyles.selectOrderText}>✓</Text>
      </View>
    </TouchableOpacity>
  );

  const renderStatusSeparator = (status, count, statusInfo, isExpanded) => {
    return (
      <TouchableOpacity
        style={[
          customerOrdersScreenStyles.statusSeparator,
          { borderLeftColor: getStatusColor(status) },
        ]}
        onPress={() => toggleSection(status)}
      >
        <View style={customerOrdersScreenStyles.statusSeparatorContent}>
          <View style={customerOrdersScreenStyles.statusSeparatorLeft}>
            <Text style={customerOrdersScreenStyles.statusSeparatorIcon}>{statusInfo.icon}</Text>
            <Text style={customerOrdersScreenStyles.statusSeparatorTitle}>{statusInfo.label}</Text>
          </View>
          <View style={customerOrdersScreenStyles.statusSeparatorRight}>
            <Text style={customerOrdersScreenStyles.statusSeparatorCount}>{count}</Text>
            <Text style={customerOrdersScreenStyles.statusSeparatorToggle}>
              {isExpanded ? '🔼' : '🔽'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderOrdersWithSeparators = () => {
    const statusGroups = {};

    orders.forEach(order => {
      if (!statusGroups[order.status]) {
        statusGroups[order.status] = [];
      }
      statusGroups[order.status].push(order);
    });

    const statusInfo = {
      pending: { label: 'In Attesa', icon: '⏳' },
      accepted: { label: 'Accettati', icon: '✓' },
      preparing: { label: 'In Preparazione', icon: '👨‍🍳' },
      pickup: { label: 'Pronti', icon: '📦' },
      in_transit: { label: 'In Consegna', icon: '🚗' },
      delivered: { label: 'Consegnati', icon: '✅' },
      cancelled: { label: 'Cancellati', icon: '❌' },
    };

    const result = [];

    Object.keys(statusGroups).forEach(status => {
      const groupOrders = statusGroups[status];
      const isExpanded = !!expandedSections[status];

      result.push(
        <View key={`separator-${status}`}>
          {renderStatusSeparator(status, groupOrders.length, statusInfo[status], isExpanded)}
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

  if (loading)
    return (
      <View style={customerOrdersScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={customerOrdersScreenStyles.loadingText}>Caricamento ordini...</Text>
      </View>
    );

  return (
    <View style={customerOrdersScreenStyles.container}>
      <View style={customerOrdersScreenStyles.header}>
        <View style={customerOrdersScreenStyles.headerContent}>
          <Text style={customerOrdersScreenStyles.title}>Seleziona Ordine</Text>
          <TouchableOpacity
            style={customerOrdersScreenStyles.cancelSelectButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={customerOrdersScreenStyles.cancelSelectText}>✕ Annulla</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={customerOrdersScreenStyles.statusTabsContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchOrders} />}
      >
        <View style={customerOrdersScreenStyles.separatorHeader}>
          <Text style={customerOrdersScreenStyles.separatorTitle}>
            Scegli l'ordine da associare
          </Text>
          <Text style={customerOrdersScreenStyles.separatorSubtitle}>
            {orders.length} ordini disponibili
          </Text>
        </View>
        {renderOrdersWithSeparators()}
      </ScrollView>
    </View>
  );
}
