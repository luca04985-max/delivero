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

export default function CustomerOrdersScreen({ navigation, route: _route }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab] = useState('all'); // 'all', 'pending', 'preparing', 'in_transit', 'delivered', 'cancelled'
  const [userRole, setUserRole] = useState(null);
  // selectMode removed (unused)
  // Aggiungi questa riga insieme agli altri useState
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = status => {
    setExpandedSections(prev => ({
      ...prev,
      [status]: !prev[status], // Inverte lo stato: se era chiuso (false/undefined) lo apre (true)
    }));
  };

  const fetchOrders = async () => {
    try {
      const data = await ordersAPI.getMyOrders();
      setOrders(data);

      // Detect user role from order data
      if (data && data.length > 0) {
        // Check if user is a separator based on order patterns
        const hasMultipleRestaurants = data.some(
          order => order.restaurant_id !== data[0].restaurant_id,
        );
        setUserRole(hasMultipleRestaurants ? 'separator' : 'customer');
      }
    } catch (e) {
      Alert.alert('Errore', 'Non ho potuto caricare i tuoi ordini.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getFilteredOrders = () => {
    let filtered = orders;

    if (activeTab !== 'all') {
      filtered = orders.filter(order => order.status === activeTab);
    }

    // If separator, only show orders from their assigned restaurants
    if (userRole === 'separator' && filtered.length > 0) {
      const separatorRestaurants = [...new Set(orders.map(o => o.restaurant_id))];
      filtered = filtered.filter(order => separatorRestaurants.includes(order.restaurant_id));
    }

    return filtered;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Funzione per controllare se sono passate 24 ore dalla consegna
  const is24HoursAfterDelivery = deliveryTime => {
    console.log('Delivery time:', deliveryTime);
    if (!deliveryTime) {
      console.log('No delivery time, returning false');
      return false;
    }

    const deliveryDate = new Date(deliveryTime);
    const now = new Date();
    const hoursDiff = (now - deliveryDate) / (1000 * 60 * 60); // Converti in ore
    console.log('Delivery date:', deliveryDate);
    console.log('Current date:', now);
    console.log('Hours difference:', hoursDiff);

    const result = hoursDiff >= 24;
    console.log('Is 24+ hours:', result);
    return result;
  };

  const renderOrder = ({ item }) => (
    <View style={customerOrdersScreenStyles.card}>
      <View style={customerOrdersScreenStyles.headerCard}>
        <Text style={customerOrdersScreenStyles.titleCard}>
          Ordine #{item.id.toString().slice(-5)}
        </Text>
        <View style={customerOrdersScreenStyles.statusBadge}>
          <Text style={customerOrdersScreenStyles.statusText}>
            {item.status === 'pending' && '⏳ IN ATTESA'}
            {item.status === 'accepted' && '✓ ACCETTATO'}
            {item.status === 'preparing' && '👨‍🍳 IN PREPARAZIONE'}
            {item.status === 'pickup' && '📦 PRONTO PER RITIRO'}
            {item.status === 'in_transit' && '🚗 IN VIAGGIO'}
            {item.status === 'delivered' && '✅ CONSEGNATO'}
            {item.status === 'cancelled' && '❌ CANCELLATO'}
          </Text>
        </View>
      </View>

      {item.restaurant_name && (
        <View style={customerOrdersScreenStyles.restaurantInfo}>
          <Text style={customerOrdersScreenStyles.restaurantLabel}>Ristorante :</Text>
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

      {item.notes && (
        <View style={customerOrdersScreenStyles.notesSection}>
          <Text style={customerOrdersScreenStyles.notesTitle}>📝 Note:</Text>
          <Text style={customerOrdersScreenStyles.notesText}>{item.notes}</Text>
        </View>
      )}

      {item.status === 'delivered' ? (
        <View style={customerOrdersScreenStyles.buttonRow}>
          <TouchableOpacity
            style={customerOrdersScreenStyles.trackButton}
            onPress={() => Alert.alert('Reorder', 'Funzione in arrivo!')}
          >
            <Text style={customerOrdersScreenStyles.trackButtonText}>Ordina di nuovo</Text>
          </TouchableOpacity>
          {!is24HoursAfterDelivery(item.actual_delivery_time) && (
            <TouchableOpacity
              style={[
                customerOrdersScreenStyles.trackButton,
                customerOrdersScreenStyles.createTicketButton,
              ]}
              onPress={() =>
                navigation.navigate('CreateTicket', {
                  orderId: item.id,
                  orderData: item,
                })
              }
            >
              <Text style={customerOrdersScreenStyles.trackButtonText}>📝 Apri Ticket</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : item.status === 'in_transit' ? (
        <View style={customerOrdersScreenStyles.buttonRow}>
          <TouchableOpacity
            style={customerOrdersScreenStyles.trackButton}
            onPress={() => navigation.navigate('OrderTrackingLive', { orderId: item.id })}
          >
            <Text style={customerOrdersScreenStyles.trackButtonText}>Traccia Live 📍</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              customerOrdersScreenStyles.trackButton,
              customerOrdersScreenStyles.createTicketButton,
            ]}
            onPress={() =>
              navigation.navigate('CreateTicket', {
                orderId: item.id,
                orderData: item,
              })
            }
          >
            <Text style={customerOrdersScreenStyles.trackButtonText}>📝 Apri Ticket</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={customerOrdersScreenStyles.buttonRow}>
          <TouchableOpacity
            style={[
              customerOrdersScreenStyles.trackButton,
              customerOrdersScreenStyles.createTicketButton,
            ]}
            onPress={() =>
              navigation.navigate('CreateTicket', {
                orderId: item.id,
                orderData: item,
              })
            }
          >
            <Text style={customerOrdersScreenStyles.trackButtonText}>📝 Apri Ticket</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderStatusSeparator = (status, count, statusInfo, isExpanded) => {
    // Fallback per status non definiti
    const safeInfo = statusInfo || {
      label: status.charAt(0).toUpperCase() + status.slice(1),
      icon: '📋',
    };

    return (
      <TouchableOpacity
        style={[customerOrdersScreenStyles.statusSeparator]}
        onPress={() => toggleSection(status)}
      >
        <View style={customerOrdersScreenStyles.statusSeparatorContent}>
          <View style={customerOrdersScreenStyles.statusSeparatorLeft}>
            <Text style={customerOrdersScreenStyles.statusSeparatorIcon}>{safeInfo.icon}</Text>
            <Text style={customerOrdersScreenStyles.statusSeparatorTitle}>{safeInfo.label}</Text>
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

    // Raggruppamento (rimane uguale)
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
      in_transit: { label: 'In Viaggio', icon: '🚗' },
      delivered: { label: 'Consegnati', icon: '✅' },
      cancelled: { label: 'Cancellati', icon: '❌' },
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
          <Text style={customerOrdersScreenStyles.title}>I Miei Ordini</Text>
        </View>
      </View>

      {/* Status Tabs - Solo per separator */}
      {userRole === 'separator' && (
        <ScrollView
          style={customerOrdersScreenStyles.statusTabsContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchOrders} />}
        >
          {renderOrdersWithSeparators()}
        </ScrollView>
      )}

      {/* Regular Orders List - Per customer */}
      {userRole !== 'separator' && (
        <FlatList
          data={getFilteredOrders()}
          keyExtractor={item => item.id.toString()}
          renderItem={renderOrder}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchOrders} />}
          contentContainerStyle={customerOrdersScreenStyles.ordersList}
          ListEmptyComponent={
            <View style={customerOrdersScreenStyles.emptyContainer}>
              <Text style={customerOrdersScreenStyles.emptyText}>Nessun ordine trovato</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
