import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeRequest } from '../../services/api';
import { createTicketScreenStyles } from './styles/CreateTicketScreenStyles';
import { decode } from 'base-64';
import { useToast } from '../../hooks/useToast';
import { useUserRole } from '../../hooks/useUserRole';

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
  
  // Hook custom
  const { toast, showToast } = useToast();
  const { userRole, isRider, isCustomer } = useUserRole();

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
        }
      } catch (error) {
        console.error('Error getting user ID:', error);
      }
    };

    getUserIdFromToken();
  }, []);

  // Dati dell'ordine passati dalla navigazione
  const orderData = route.params?.orderData;
  const orderId = route.params?.orderId;

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
        { label: '🆘 Supporto', value: 'support' }
      ]
    : [
        { label: '🐛 Bug', value: 'bug' },
        { label: '😞 Reclamo', value: 'complaint' },
        { label: '🆘 Supporto', value: 'support' }
      ];

  const createTicket = async () => {
    if (!newTicket.title.trim() || !newTicket.description.trim()) {
      showToast('⚠️ Compila tutti i campi obbligatori', 'warning');
      return;
    }

    try {
      setSubmitting(true);

      // Prepara i dati del ticket
      const ticketData = {
        title: newTicket.title,
        description: newTicket.description,
        type: newTicket.type,
        order_id: orderId || null, // Associa l'ordine se presente
        user_id: userId, // Aggiungi user_id dal token
      };

      // Determina l'endpoint basato sul ruolo
      const endpoint = isRider ? '/tickets/rider' : '/tickets/customer';
      
      const response = await makeRequest(endpoint, {
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
      console.error('Error creating ticket:', error);
      showToast('❌ Impossibile creare il ticket', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={createTicketScreenStyles.container}>
      {/* Toast Notification */}
      {toast.visible && (
        <View style={[
          createTicketScreenStyles.toast,
          { backgroundColor: toast.type === 'error' ? '#FF3B30' : toast.type === 'success' ? '#34C759' : '#007AFF' }
        ]}>
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
        {/* Ordine Associato */}
        {orderData && (
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
            {ticketTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                style={[
                  createTicketScreenStyles.ticketTypeButton,
                  newTicket.type === type.value && createTicketScreenStyles.ticketTypeButtonSelected
                ]}
                onPress={() => setNewTicket({ ...newTicket, type: type.value })}
              >
                <Text style={[
                  createTicketScreenStyles.ticketTypeButtonText,
                  newTicket.type === type.value && createTicketScreenStyles.ticketTypeButtonTextSelected
                ]}>
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
            onChangeText={(text) => setNewTicket({ ...newTicket, title: text })}
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
            onChangeText={(text) => setNewTicket({ ...newTicket, description: text })}
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
            (submitting || !newTicket.title.trim() || !newTicket.description.trim()) && 
            createTicketScreenStyles.submitButtonDisabled
          ]}
          onPress={createTicket}
          disabled={submitting || !newTicket.title.trim() || !newTicket.description.trim()}
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
    </View>
  );
}
