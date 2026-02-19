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
import { makeRequest } from '../../services/api';
import { ticketCache } from '../../services/ticketCache';
import { customerTicketsScreenStyles } from './styles/CustomerTicketsScreenStyles';

export default function CustomerTicketsScreen({ navigation }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = useCallback(async (forceRefresh = false) => {
    try {
      // Controlla se abbiamo dati in cache validi
      if (!forceRefresh) {
        const cachedTickets = ticketCache.getTickets();
        if (cachedTickets) {
          setTickets(cachedTickets);
          setLoading(false);
          return;
        }
      }

      const data = await makeRequest('/tickets/customer', { method: 'GET' });
      const ticketsData = data || [];

      // Salva in cache
      ticketCache.setTickets(ticketsData);

      setTickets(ticketsData);
    } catch (error) {
      console.error('Error loading tickets:', error);
      Alert.alert('Errore', 'Impossibile caricare i ticket');
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadTickets(true).finally(() => setRefreshing(false));
  }, [loadTickets]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#4CAF50';
      case 'in_progress': return '#FF9800';
      case 'resolved': return '#2196F3';
      default: return '#757575';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'open': return 'Aperto';
      case 'in_progress': return 'In corso';
      case 'resolved': return 'Risolto';
      default: return status;
    }
  };

  const renderTicket = ({ item }) => (
    <TouchableOpacity
      style={customerTicketsScreenStyles.ticketCard}
      onPress={() => navigation.navigate('TicketDetail', { ticketId: item.id })}
    >
      <View style={customerTicketsScreenStyles.ticketHeader}>
        <Text style={customerTicketsScreenStyles.ticketTitle}>{item.title}</Text>
        <View style={[
          customerTicketsScreenStyles.statusBadge,
          { backgroundColor: getStatusColor(item.status) }
        ]}>
          <Text style={customerTicketsScreenStyles.statusText}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>

      <Text style={customerTicketsScreenStyles.ticketDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={customerTicketsScreenStyles.ticketFooter}>
        <Text style={customerTicketsScreenStyles.ticketDate}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
        <Text style={customerTicketsScreenStyles.ticketId}>#{item.id}</Text>
      </View>
    </TouchableOpacity>
  );

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
        <Text style={customerTicketsScreenStyles.title}>🎫 I Miei Ticket</Text>
      </View>

      <ScrollView
        style={customerTicketsScreenStyles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {tickets.length === 0 ? (
          <View style={customerTicketsScreenStyles.emptyContainer}>
            <Text style={customerTicketsScreenStyles.emptyText}>Nessun ticket trovato</Text>
            <Text style={customerTicketsScreenStyles.emptySubtext}>Crea il tuo primo ticket</Text>
          </View>
        ) : (
          <FlatList
            data={tickets}
            renderItem={renderTicket}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={customerTicketsScreenStyles.ticketsList}
            scrollEnabled={false}
          />
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
