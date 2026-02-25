import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeRequest } from '../../services/api';
import { createTicketScreenStyles } from './styles/CreateTicketScreenStyles';
import { decode } from 'base-64';
import { useToast } from '../../hooks/useToast';
import { useUserRole } from '../../hooks/useUserRole';
import logger from '../../utils/logger';

/**
 * Schermata creazione ticket - condivisa tra customer e rider
 * Usa hook custom per toast e gestione ruolo
 */
export default function CreateTicketScreen({ navigation, route }) {
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    type: 'complaint',
  });
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showOrderSelector, setShowOrderSelector] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Hook custom
  const { toast, showToast } = useToast();
  const { isRider, isCustomer } = useUserRole();

  // Ottieni user_id dal token JWT e carica ordini
  useEffect(() => {
    const getUserIdFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          logger.debug('Token found:', token);
          // Decodifica il token JWT per ottenere user_id
          const parts = token.split('.');
          const payload = parts[1];
          const decoded = JSON.parse(decode(payload));
          setUserId(decoded.userId);

          // Carica gli ordini del cliente solo se è un customer
          if (isCustomer) {
            logger.info('Loading orders for customer:', decoded.userId);
            loadCustomerOrders(decoded.userId);
          }
        } else {
          logger.debug('No token found');
        }
      } catch (error) {
        logger.error('Error getting user ID:', error);
      }
    };

    getUserIdFromToken();
  }, [isCustomer]);

  // Carica gli ordini del rider quando cambia il tipo di ticket
  useEffect(() => {
    if (isRider && newTicket.type === 'delivery_issue') {
      logger.info('Loading delivering orders for rider');
      loadRiderOrders();
    }
  }, [isRider, newTicket.type]);

  // Carica gli ordini del rider (filtra solo accepted e in_transit)
  const loadRiderOrders = async () => {
    try {
      const response = await makeRequest('/orders/rider/active');
      logger.debug('Rider orders response:', response);
      if (response && response.length > 0) {
        logger.debug('First rider order fields:', Object.keys(response[0]));
      }
      // Filtra solo gli ordini in stato 'accepted' o 'in_transit'
      const activeOrders = response.filter(order => order.status === 'in_transit');
      setOrders(activeOrders || []);
    } catch (error) {
      logger.error('Error loading rider orders:', error);
    }
  };

  // Carica gli ordini del cliente
  const loadCustomerOrders = async _customerId => {
    try {
      const response = await makeRequest('/orders/my');
      logger.debug('Orders response:', response); // Debug log
      if (response && response.length > 0) {
        logger.debug('First order fields:', Object.keys(response[0])); // Mostra i campi disponibili
      }
      setOrders(response || []); // La risposta è direttamente l'array di ordini
    } catch (error) {
      logger.error('Error loading orders:', error);
    }
  };

  // Dati dell'ordine passati dalla navigazione
  const orderData = route.params?.orderData;
  const orderId = route.params?.orderId;

  // Inizializza l'ordine selezionato se passato dalla navigazione
  useEffect(() => {
    if (orderData && orderId) {
      setSelectedOrder({ id: orderId, ...orderData });
    }
  }, [orderData, orderId]);

  // Gestione selezione ordine
  const handleOrderSelect = order => {
    setSelectedOrder(order);
    setShowOrderSelector(false);
  };

  const handleRemoveOrder = () => {
    setSelectedOrder(null);
  };

  // Nascondi completamente il pulsante indietro nell'header
  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      gestureEnabled: false,
    });
  }, [navigation]);

  // Tipi di ticket basati sul ruolo
  const ticketTypes = isRider
    ? [
        { label: '🐛 Bug', value: 'bug' },
        { label: '🚚 Problema Consegna', value: 'delivery_issue' },
        { label: '🆘 Supporto', value: 'support' },
      ]
    : [
        { label: '🐛 Bug', value: 'bug' },
        { label: '😞 Reclamo', value: 'complaint' },
        { label: '🆘 Supporto', value: 'support' },
      ];

  const createTicket = async () => {
    if (!newTicket.title.trim() || !newTicket.description.trim()) {
      showToast('⚠️ Compila tutti i campi obbligatori', 'warning');
      return;
    }

    // Validazione ordine obbligatorio per rider con delivery_issue
    if (isRider && newTicket.type === 'delivery_issue' && !selectedOrder) {
      showToast('⚠️ Seleziona un ordine per segnalare un problema di consegna', 'warning');
      return;
    }

    try {
      setSubmitting(true);

      // Prepara i dati del ticket
      const ticketData = {
        title: newTicket.title,
        description: newTicket.description,
        type: newTicket.type,
        order_id: selectedOrder?.id || orderId || null, // Usa l'ordine selezionato o quello passato
        user_id: userId, // Aggiungi user_id dal token
      };

      // Determina l'endpoint basato sul ruolo
      const endpoint = isRider ? '/tickets/rider' : '/tickets/customer';

      await makeRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(ticketData),
      });

      showToast('✅ Ticket creato con successo', 'success');

      // Naviga indietro dopo breve delay per mostrare il toast
      setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate(isRider ? 'RiderTickets' : 'CustomerTickets');
        }
      }, 1500);
    } catch (error) {
      logger.error('Error creating ticket:', error);
      showToast('❌ Impossibile creare il ticket', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={createTicketScreenStyles.container}>
      {/* Toast Notification */}
      {toast.visible && (
        <View
          style={[
            createTicketScreenStyles.toast,
            {
              backgroundColor:
                toast.type === 'error'
                  ? '#FF3B30'
                  : toast.type === 'success'
                    ? '#34C759'
                    : '#007AFF',
            },
          ]}
        >
          <Text style={createTicketScreenStyles.toastText}>{toast.message}</Text>
        </View>
      )}

      <View style={createTicketScreenStyles.header}>
        <Text style={createTicketScreenStyles.title}>
          {isRider ? '🏍️ Nuovo Ticket Rider' : '👤 Nuovo Ticket Customer'}
        </Text>
      </View>

      <ScrollView
        style={createTicketScreenStyles.content}
        contentContainerStyle={createTicketScreenStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Sezione Selezione Ordine */}
        {(isCustomer || (isRider && newTicket.type === 'delivery_issue')) && (
          <View style={createTicketScreenStyles.section}>
            <Text style={createTicketScreenStyles.sectionTitle}>
              📦 {isCustomer ? 'Associa Ordine (Opzionale)' : 'Seleziona Ordine (Obbligatorio)'}
            </Text>

            {selectedOrder ? (
              <View style={createTicketScreenStyles.orderSummary}>
                <Text style={createTicketScreenStyles.orderTitle}>
                  Ordine #{selectedOrder.id?.toString().slice(-5)} -{' '}
                  {selectedOrder.restaurant_name || selectedOrder.customer_address}
                </Text>
                <Text style={createTicketScreenStyles.orderStatus}>
                  {new Date(selectedOrder.created_at).toLocaleDateString('it-IT')}
                </Text>
                <TouchableOpacity
                  style={createTicketScreenStyles.removeOrderButton}
                  onPress={handleRemoveOrder}
                >
                  <Text style={createTicketScreenStyles.removeOrderText}>Rimuovi</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={createTicketScreenStyles.selectOrderButton}
                onPress={() => setShowOrderSelector(true)}
              >
                <Text style={createTicketScreenStyles.selectOrderText}>➕ Seleziona Ordine</Text>
              </TouchableOpacity>
            )}

            <Text style={createTicketScreenStyles.helperText}>
              {isCustomer
                ? 'Associa un ordine per aiutarci a risolvere più rapidamente il problema'
                : "Seleziona l'ordine per cui stai segnalando il problema"}
            </Text>
          </View>
        )}

        {/* Ordine Associato (se passato dalla navigazione) */}
        {orderData && !selectedOrder && (
          <View style={createTicketScreenStyles.orderInfo}>
            <Text style={createTicketScreenStyles.orderInfoTitle}>📦 Ordine Associato</Text>
            <Text style={createTicketScreenStyles.orderInfoText}>
              Ordine #{orderId?.toString().slice(-5)} - {orderData.restaurant_name}
            </Text>
            <Text style={createTicketScreenStyles.orderInfoSubtext}>
              {new Date(orderData.created_at).toLocaleDateString('it-IT')}
            </Text>
          </View>
        )}

        {/* Tipo Ticket */}
        <View style={createTicketScreenStyles.section}>
          <Text style={createTicketScreenStyles.sectionTitle}>Tipo di Ticket</Text>
          <View style={createTicketScreenStyles.ticketTypesContainer}>
            {ticketTypes.map(type => (
              <TouchableOpacity
                key={type.value}
                style={[
                  createTicketScreenStyles.ticketTypeButton,
                  newTicket.type === type.value &&
                    createTicketScreenStyles.ticketTypeButtonSelected,
                ]}
                onPress={() => setNewTicket({ ...newTicket, type: type.value })}
              >
                <Text
                  style={[
                    createTicketScreenStyles.ticketTypeButtonText,
                    newTicket.type === type.value &&
                      createTicketScreenStyles.ticketTypeButtonTextSelected,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Titolo */}
        <View style={createTicketScreenStyles.section}>
          <Text style={createTicketScreenStyles.sectionTitle}>Titolo *</Text>
          <TextInput
            style={createTicketScreenStyles.input}
            placeholder="Inserisci un titolo breve..."
            value={newTicket.title}
            onChangeText={text => setNewTicket({ ...newTicket, title: text })}
            maxLength={100}
          />
          <Text style={createTicketScreenStyles.charCount}>
            {newTicket.title.length}/100 caratteri
          </Text>
        </View>

        {/* Descrizione */}
        <View style={createTicketScreenStyles.section}>
          <Text style={createTicketScreenStyles.sectionTitle}>Descrizione *</Text>
          <TextInput
            style={[createTicketScreenStyles.input, createTicketScreenStyles.textArea]}
            placeholder="Descrivi dettagliatamente il problema..."
            value={newTicket.description}
            onChangeText={text => setNewTicket({ ...newTicket, description: text })}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            maxLength={1000}
          />
          <Text style={createTicketScreenStyles.charCount}>
            {newTicket.description.length}/1000 caratteri
          </Text>
        </View>

        {/* Pulsante Invia */}
        <TouchableOpacity
          style={[
            createTicketScreenStyles.submitButton,
            (submitting ||
              !newTicket.title.trim() ||
              !newTicket.description.trim() ||
              (isRider && newTicket.type === 'delivery_issue' && !selectedOrder)) &&
              createTicketScreenStyles.submitButtonDisabled,
          ]}
          onPress={createTicket}
          disabled={
            submitting ||
            !newTicket.title.trim() ||
            !newTicket.description.trim() ||
            (isRider && newTicket.type === 'delivery_issue' && !selectedOrder)
          }
        >
          {submitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={createTicketScreenStyles.submitButtonText}>
              {isRider ? '🏍️ Invia Ticket Rider' : '👤 Invia Ticket Customer'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Selezione Ordine */}
      <Modal
        visible={showOrderSelector}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowOrderSelector(false)}
      >
        <View style={createTicketScreenStyles.modalContainer}>
          <View style={createTicketScreenStyles.modalHeader}>
            <Text style={createTicketScreenStyles.modalTitle}>Seleziona Ordine</Text>
            <TouchableOpacity
              style={createTicketScreenStyles.closeButton}
              onPress={() => setShowOrderSelector(false)}
            >
              <Text style={createTicketScreenStyles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {orders.length === 0 ? (
            <View style={createTicketScreenStyles.emptyState}>
              <Text style={createTicketScreenStyles.emptyStateText}>Nessun ordine trovato</Text>
            </View>
          ) : (
            <FlatList
              data={orders}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={createTicketScreenStyles.orderItem}
                  onPress={() => handleOrderSelect(item)}
                >
                  <View style={createTicketScreenStyles.orderItemContent}>
                    <Text style={createTicketScreenStyles.orderItemTitle}>
                      #{item.id?.toString().slice(-5)} - {item.restaurant_name}
                    </Text>
                    <Text style={createTicketScreenStyles.orderItemDate}>
                      {new Date(item.created_at).toLocaleDateString('it-IT')}
                    </Text>
                    <Text style={createTicketScreenStyles.orderItemStatus}>
                      Stato: {item.status}
                    </Text>
                  </View>
                  <Text style={createTicketScreenStyles.orderItemPrice}>
                    €{item.total_amount ? parseFloat(item.total_amount).toFixed(2) : '0.00'}
                  </Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={createTicketScreenStyles.orderList}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}
