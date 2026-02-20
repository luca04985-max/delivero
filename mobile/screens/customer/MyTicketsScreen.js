import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeRequest } from '../../services/api';
import { myTicketsScreenStyles } from './styles/MyTicketsScreenStyles';
import { decode } from 'base-64';

export default function MyTicketsScreen({ navigation }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDescription, setNewTicketDescription] = useState('');
  const [newTicketType, setNewTicketType] = useState('complaint');
  const [userId, setUserId] = useState(null);

  // Ottieni user_id dal token JWT
  useEffect(() => {
    const getUserIdFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Decodifica il token JWT per ottenere user_id
          const parts = token.split('.');
          const payload = parts[1];
          const decoded = JSON.parse(decode(payload));
          setUserId(decoded.userId);
          console.log('Decoded user ID:', decoded.userId);
        }
      } catch (error) {
        console.error('Error getting user ID:', error);
      }
    };

    getUserIdFromToken();
  }, []);

  // Estrai dati ordine passati dalla navigazione
  const orderData = route.params?.orderData;
  const orderId = route.params?.orderId;
  console.log('MyTicketsScreen - OrderData from route:', orderData);
  console.log('MyTicketsScreen - OrderId from route:', orderId);
  console.log('MyTicketsScreen - All route params:', route.params);

  const ticketTypes = [
    { label: '🐛 Bug', value: 'bug' },
    { label: '😞 Reclamo', value: 'complaint' },
    { label: '💡 Suggerimento', value: 'feature_request' },
    { label: '🆘 Supporto', value: 'support' }
  ];

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await makeRequest('/tickets/customer', { method: 'GET' });
      setTickets(data || []);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async () => {
    if (!newTicketTitle.trim() || !newTicketDescription.trim()) {
      Alert.alert('Errore', 'Compila tutti i campi obbligatori');
      return;
    }

    try {
      setLoading(true);
      const response = await makeRequest('/tickets/customer', {
        method: 'POST',
        body: JSON.stringify({
          title: newTicketTitle,
          description: newTicketDescription,
          type: newTicketType,
          order_id: orderId || null, // Associa l'ordine se presente
          user_id: userId, // Aggiungi user_id dal token
        }),
      });

      Alert.alert('Successo', 'Segnalazione inviata!', [
        {
          text: 'OK',
          onPress: () => {
            setNewTicketTitle('');
            setNewTicketDescription('');
            setNewTicketType('complaint');
            setShowNewTicketModal(false);
            loadTickets(); // Ricarica i ticket
          }
        }
      ]);
    } catch (error) {
      console.error('Error creating ticket:', error);
      Alert.alert('Errore', error?.message || 'Errore durante l\'invio');
    } finally {
      setLoading(false);
    }
  };

  const renderTicket = ({ item }) => {
    console.log('=== RENDERING TICKET ===');
    console.log('Rendering ticket:', item);
    console.log('Order ID in ticket:', item.order_id);

    return (
      <TouchableOpacity
        style={myTicketsScreenStyles.ticketCard}
        onPress={() => navigation.navigate('TicketDetail', { ticketId: item.id })}
      >
        <View style={myTicketsScreenStyles.ticketHeader}>
          <Text style={myTicketsScreenStyles.ticketTitle}>{item.title}</Text>
          <Text style={myTicketsScreenStyles.ticketId}>#{item.id}</Text>
        </View>

        <Text style={myTicketsScreenStyles.ticketDescription}>{item.description}</Text>

        {/* Mostra informazioni ordine associato se presente */}
        {item.order_id && (
          <View style={myTicketsScreenStyles.orderInfo}>
            <Text style={myTicketsScreenStyles.orderLabel}>Ordine Associato:</Text>
            <Text style={myTicketsScreenStyles.orderId}>#{item.order_id?.toString().slice(-5)}</Text>
          </View>
        )}

        <View style={myTicketsScreenStyles.ticketFooter}>
          <Text style={myTicketsScreenStyles.ticketDate}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
          <Text style={[
            myTicketsScreenStyles.ticketStatus,
            item.status === 'open' && myTicketsScreenStyles.statusOpen,
            item.status === 'in_progress' && myTicketsScreenStyles.statusInProgress,
            item.status === 'resolved' && myTicketsScreenStyles.statusResolved,
          ]}>
            {item.status === 'open' ? 'Aperto' :
              item.status === 'in_progress' ? 'In corso' :
                item.status === 'resolved' ? 'Risolto' : item.status}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={myTicketsScreenStyles.container}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text style={myTicketsScreenStyles.loadingText}>Caricamento ticket...</Text>
      </View>
    );
  }

  return (
    <View style={myTicketsScreenStyles.container}>
      <View style={myTicketsScreenStyles.header}>
        <View style={myTicketsScreenStyles.headerContent}>
          <Text style={myTicketsScreenStyles.title}>🎫 I Miei Ticket</Text>
          <TouchableOpacity
            style={myTicketsScreenStyles.newTicketButton}
            onPress={() => setShowNewTicketModal(true)}
          >
            <Text style={myTicketsScreenStyles.newTicketText}>+ Nuovo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={tickets}
        renderItem={renderTicket}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={myTicketsScreenStyles.ticketsList}
        ListEmptyComponent={
          <View style={myTicketsScreenStyles.emptyContainer}>
            <Text style={myTicketsScreenStyles.emptyText}>😅 Nessun ticket trovato</Text>
            <Text style={myTicketsScreenStyles.emptyText}>Crea il tuo primo ticket</Text>
          </View>
        }
      />

      {/* Modal per nuovo ticket */}
      {showNewTicketModal && (
        <View style={myTicketsScreenStyles.modalOverlay}>
          <View style={myTicketsScreenStyles.modalContainer}>
            <View style={myTicketsScreenStyles.modalHeader}>
              <Text style={myTicketsScreenStyles.modalTitle}>Nuova Segnalazione</Text>
              <TouchableOpacity
                style={myTicketsScreenStyles.closeButton}
                onPress={() => setShowNewTicketModal(false)}
              >
                <Text style={myTicketsScreenStyles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={myTicketsScreenStyles.modalBody}>
              {/* Tipo di Segnalazione */}
              <View style={myTicketsScreenStyles.formGroup}>
                <Text style={myTicketsScreenStyles.label}>Tipo di Segnalazione *</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, marginTop: 10 }}>
                  {ticketTypes.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      onPress={() => setNewTicketType(item.value)}
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: newTicketType === item.value ? '#007AFF' : '#ddd',
                        backgroundColor: newTicketType === item.value ? '#E3F2FD' : '#fff',
                        marginRight: 8,
                        marginBottom: 8,
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      <Text style={{ marginRight: 4 }}>{item.label.split(' ')[0]}</Text>
                      <Text style={{
                        color: newTicketType === item.value ? '#007AFF' : '#444',
                        fontWeight: newTicketType === item.value ? '600' : '400'
                      }}>
                        {item.label.split(' ')[1]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={myTicketsScreenStyles.formGroup}>
                <Text style={myTicketsScreenStyles.label}>Titolo *</Text>
                <TextInput
                  style={myTicketsScreenStyles.modalInput}
                  placeholder="Di cosa si tratta?"
                  value={newTicketTitle}
                  onChangeText={setNewTicketTitle}
                  multiline={false}
                />
              </View>

              <View style={myTicketsScreenStyles.formGroup}>
                <Text style={myTicketsScreenStyles.label}>Descrizione Dettagliata *</Text>
                <TextInput
                  style={[myTicketsScreenStyles.modalInput, { height: 120, textAlignVertical: 'top' }]}
                  placeholder="Scrivi qui i dettagli..."
                  value={newTicketDescription}
                  onChangeText={setNewTicketDescription}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
            </ScrollView>

            <View style={myTicketsScreenStyles.modalFooter}>
              <TouchableOpacity
                style={[myTicketsScreenStyles.modalButton, myTicketsScreenStyles.cancelButton]}
                onPress={() => setShowNewTicketModal(false)}
              >
                <Text style={myTicketsScreenStyles.cancelButtonText}>Annulla</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[myTicketsScreenStyles.modalButton, myTicketsScreenStyles.createButton]}
                onPress={createTicket}
                disabled={loading}
              >
                <Text style={myTicketsScreenStyles.createButtonText}>
                  {loading ? 'Invio...' : 'Invia'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
