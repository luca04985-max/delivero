import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
// useFocusEffect removed (unused)
import { makeRequest } from '../../services/api';
import { customerTicketsScreenStyles } from './styles/CustomerTicketsScreenStyles';

export default function CustomerTicketsScreen({ navigation }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({}); // Nuovo stato per sezioni espanse

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const loadTickets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await makeRequest('/tickets/customer', { method: 'GET' });
      const ticketsData = data || [];

      // Filtra solo ticket validi (con ID non null) - TEMPORANEAMENTE MOSTRA TUTTI
      const validTickets = ticketsData.filter(
        ticket => ticket.id != null || ticket.ticket_status != null,
      );

      setTickets(validTickets);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadTickets().finally(() => setRefreshing(false));
  }, [loadTickets]);

  // groupedTickets removed (unused) to reduce warnings

  // Funzione per toggle delle sezioni - ottimizzata con useCallback
  const toggleSection = useCallback(ticket_status => {
    setExpandedSections(prev => ({
      ...prev,
      [ticket_status]: !prev[ticket_status],
    }));
  }, []);

  // Funzioni helper memoizzate
  const getStatusColor = useCallback(status => {
    switch (status) {
      case 'open':
        return '#4CAF50';
      case 'in_progress':
        return '#FF9800';
      case 'closed':
        return '#9E9E9E';
      default:
        return '#666';
    }
  }, []);

  const getStatusText = useCallback(status => {
    switch (status) {
      case 'open':
        return '🟢 Aperti';
      case 'in_progress':
        return '🟠 In corso';
      case 'closed':
        return '🔴 Chiusi';
      default:
        return status;
    }
  }, []);

  // Funzione per renderizzare il separatore di stato
  const renderStatusSeparator = (status, count, statusInfo, isExpanded) => {
    return (
      <TouchableOpacity
        style={[
          customerTicketsScreenStyles.statusSeparator,
          { borderLeftColor: getStatusColor(status) },
        ]}
        onPress={() => toggleSection(status)}
      >
        <View style={customerTicketsScreenStyles.statusSeparatorContent}>
          <View style={customerTicketsScreenStyles.statusSeparatorLeft}>
            <Text style={customerTicketsScreenStyles.statusSeparatorIcon}>{statusInfo.icon}</Text>
            <Text style={customerTicketsScreenStyles.statusSeparatorTitle}>{statusInfo.label}</Text>
          </View>
          <View style={customerTicketsScreenStyles.statusSeparatorRight}>
            <Text style={customerTicketsScreenStyles.statusSeparatorCount}>{count}</Text>
            <Text style={customerTicketsScreenStyles.statusSeparatorToggle}>
              {isExpanded ? '🔼' : '🔽'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Funzione per renderizzare i ticket con separatori
  const renderTicketsWithSeparators = () => {
    const statusGroups = {};

    // Raggruppa i ticket per stato
    tickets.forEach(ticket => {
      if (!statusGroups[ticket.ticket_status]) {
        statusGroups[ticket.ticket_status] = [];
      }
      statusGroups[ticket.ticket_status].push(ticket);
    });

    const statusInfo = {
      open: { label: 'Aperti', icon: '🔓' },
      in_progress: { label: 'In Corso', icon: '⚙️' },
      resolved: { label: 'Risolti', icon: '✅' },
    };

    const result = [];

    // Ciclo sui gruppi di stato
    Object.keys(statusGroups).forEach(ticket_status => {
      const groupTickets = statusGroups[ticket_status];
      // Controlliamo se questa specifica sezione è espansa
      const isExpanded = !!expandedSections[ticket_status];

      // 1. Aggiungiamo sempre il separatore (con controllo di sicurezza)
      const statusData = statusInfo[ticket_status] || { label: ticket_status, icon: '📋' };
      result.push(
        <View key={`separator-${ticket_status}`}>
          {renderStatusSeparator(ticket_status, groupTickets.length, statusData, isExpanded)}
        </View>,
      );

      // 2. Aggiungiamo i ticket SOLO se la sezione è espansa
      if (isExpanded) {
        groupTickets.forEach(ticket => {
          // Aggiungi solo ticket con ID valido per evitare chiavi duplicate
          if (ticket.id != null) {
            result.push(<View key={`ticket-${ticket.id}`}>{renderTicket({ item: ticket })}</View>);
          }
        });
      }
    });

    return result;
  };

  const renderTicket = ({ item }) => {
    return (
      <TouchableOpacity
        style={customerTicketsScreenStyles.card}
        onPress={() => navigation.navigate('TicketDetail', { ticketId: item.id })}
      >
        <View style={customerTicketsScreenStyles.headerCard}>
          <Text style={customerTicketsScreenStyles.titleCard}>{item.title}</Text>
          <View
            style={[
              customerTicketsScreenStyles.statusBadge,
              { backgroundColor: getStatusColor(item.ticket_status) },
            ]}
          >
            <Text style={customerTicketsScreenStyles.statusText}>
              {getStatusText(item.ticket_status)}
            </Text>
          </View>
        </View>

        <Text style={customerTicketsScreenStyles.ticketDescription} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Mostra informazioni ordine associato se presente */}
        {item.ticket_order_id && (
          <View style={customerTicketsScreenStyles.orderInfo}>
            <Text style={customerTicketsScreenStyles.orderLabel}>Ordine Associato:</Text>
            <Text style={customerTicketsScreenStyles.orderId}>
              #{item.ticket_order_id?.toString().slice(-5)}
            </Text>
            <Text style={customerTicketsScreenStyles.orderDate}>
              Ordine del {new Date(item.order_created_at).toLocaleDateString()}
            </Text>
            <Text style={customerTicketsScreenStyles.orderTotal}>
              €{item.total_amount || item.total_price || item.total}
            </Text>
            <Text style={customerTicketsScreenStyles.orderAddress}>📍 {item.delivery_address}</Text>
          </View>
        )}

        <View style={customerTicketsScreenStyles.ticketFooter}>
          <Text style={customerTicketsScreenStyles.ticketDate}>
            {new Date(item.ticket_created_at).toLocaleDateString()}
          </Text>
          <Text style={customerTicketsScreenStyles.ticketId}>#{item.id}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={customerTicketsScreenStyles.container}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text style={customerTicketsScreenStyles.loadingText}>Caricamento ticket...</Text>
      </View>
    );
  }

  return (
    <View style={customerTicketsScreenStyles.container}>
      <View style={customerTicketsScreenStyles.header}>
        <View style={customerTicketsScreenStyles.headerContent}>
          <Text style={customerTicketsScreenStyles.title}>🎫 I Miei Ticket</Text>
        </View>
      </View>

      <ScrollView
        style={customerTicketsScreenStyles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {tickets.length === 0 ? (
          <View style={customerTicketsScreenStyles.emptyContainer}>
            <Text style={customerTicketsScreenStyles.emptyText}>Nessun ticket trovato</Text>
          </View>
        ) : (
          renderTicketsWithSeparators()
        )}
      </ScrollView>

      {/* FAB Button - Naviga a schermata separata */}
      <TouchableOpacity
        style={customerTicketsScreenStyles.fab}
        onPress={() => navigation.navigate('CreateTicket')}
      >
        <Text style={customerTicketsScreenStyles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
