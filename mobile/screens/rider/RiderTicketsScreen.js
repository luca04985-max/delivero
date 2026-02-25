import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ordersAPI } from '../../services/api';
import { riderTicketsScreenStyles } from './styles/RiderTicketsScreenStyles';

export default function RiderTicketsScreen({ navigation }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({}); // Stato per sezioni espanse

  useEffect(() => {
    loadTickets();
  }, []);

  // Refresh automatico quando lo screen diventa visibile
  useFocusEffect(
    useCallback(() => {
      console.log('🔄 RiderTicketsScreen focused - refreshing tickets');
      loadTickets();
    }, [loadTickets]),
  );

  const loadTickets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ordersAPI.getRiderTickets();
      const ticketsData = data || [];

      // Filtra solo ticket validi (con ID non null)
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

  // Funzione per toggle delle sezioni
  const toggleSection = ticket_status => {
    setExpandedSections(prev => ({
      ...prev,
      [ticket_status]: !prev[ticket_status], // Inverte lo stato: se era chiuso (false/undefined) lo apre (true)
    }));
  };

  const getStatusColor = status => {
    switch (status) {
      case 'open':
        return '#4CAF50';
      case 'in_progress':
        return '#FF9800';
      case 'resolved':
        return '#2196F3';
      default:
        return '#666';
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'open':
        return 'Aperto';
      case 'in_progress':
        return 'In corso';
      case 'resolved':
        return 'Risolto';
      default:
        return status;
    }
  };

  // Funzione per renderizzare il separatore di stato
  const renderStatusSeparator = (status, count, statusInfo, isExpanded) => {
    return (
      <TouchableOpacity
        style={[
          riderTicketsScreenStyles.statusSeparator,
          { borderLeftColor: getStatusColor(status) },
        ]}
        onPress={() => toggleSection(status)}
      >
        <View style={riderTicketsScreenStyles.statusSeparatorContent}>
          <View style={riderTicketsScreenStyles.statusSeparatorLeft}>
            <Text style={riderTicketsScreenStyles.statusSeparatorIcon}>{statusInfo.icon}</Text>
            <Text style={riderTicketsScreenStyles.statusSeparatorTitle}>{statusInfo.label}</Text>
          </View>
          <View style={riderTicketsScreenStyles.statusSeparatorRight}>
            <Text style={riderTicketsScreenStyles.statusSeparatorCount}>{count}</Text>
            <Text style={riderTicketsScreenStyles.statusSeparatorToggle}>
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
        style={riderTicketsScreenStyles.ticketCard}
        onPress={() => navigation.navigate('TicketDetail', { ticketId: item.id })}
      >
        <View style={riderTicketsScreenStyles.headerCard}>
          <Text style={riderTicketsScreenStyles.titleCard}>{item.title}</Text>
          <View
            style={[
              riderTicketsScreenStyles.statusBadge,
              { backgroundColor: getStatusColor(item.ticket_status) },
            ]}
          >
            <Text style={riderTicketsScreenStyles.statusText}>
              {getStatusText(item.ticket_status)}
            </Text>
          </View>
        </View>

        <Text style={riderTicketsScreenStyles.ticketDescription} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Mostra informazioni ordine associato se presente */}
        {item.ticket_order_id && (
          <View style={riderTicketsScreenStyles.orderInfo}>
            <Text style={riderTicketsScreenStyles.orderLabel}>Ordine Associato:</Text>
            <Text style={riderTicketsScreenStyles.orderId}>
              #{item.ticket_order_id?.toString().slice(-5)}
            </Text>
            <Text style={riderTicketsScreenStyles.orderDate}>
              Ordine del {new Date(item.order_created_at).toLocaleDateString()}
            </Text>
            <Text style={riderTicketsScreenStyles.orderTotal}>
              €{item.total_amount || item.total_price || item.total}
            </Text>
            <Text style={riderTicketsScreenStyles.orderAddress}>📍 {item.delivery_address}</Text>
          </View>
        )}

        {/* Mostra risposta admin se presente */}
        {item.response && (
          <View style={riderTicketsScreenStyles.responseBox}>
            <Text style={riderTicketsScreenStyles.responseTitle}>Risposta Admin:</Text>
            <Text style={riderTicketsScreenStyles.responseText}>{item.response}</Text>
          </View>
        )}

        <View style={riderTicketsScreenStyles.ticketFooter}>
          <Text style={riderTicketsScreenStyles.ticketDate}>
            {new Date(item.ticket_created_at).toLocaleDateString()}
          </Text>
          <Text style={riderTicketsScreenStyles.ticketId}>#{item.id}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={riderTicketsScreenStyles.container}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text style={riderTicketsScreenStyles.loadingText}>Caricamento ticket...</Text>
      </View>
    );
  }

  return (
    <View style={riderTicketsScreenStyles.container}>
      <View style={riderTicketsScreenStyles.header}>
        <Text style={riderTicketsScreenStyles.title}>🎫 I Miei Ticket</Text>
      </View>

      <ScrollView
        style={riderTicketsScreenStyles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {tickets.length === 0 ? (
          <View style={riderTicketsScreenStyles.emptyContainer}>
            <Text style={riderTicketsScreenStyles.emptyText}>Nessun ticket trovato</Text>
            <Text style={riderTicketsScreenStyles.emptySubtext}>Crea il tuo primo ticket</Text>
          </View>
        ) : (
          renderTicketsWithSeparators()
        )}
      </ScrollView>

      {/* FAB Button - Naviga a schermata separata */}
      <TouchableOpacity
        style={riderTicketsScreenStyles.fab}
        onPress={() => navigation.navigate('CreateTicket')}
      >
        <Text style={riderTicketsScreenStyles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
