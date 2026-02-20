import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { makeRequest } from '../../services/api';
import { createTicketScreenStyles } from './styles/CreateTicketScreenStyles';

export default function CreateTicketScreen({ navigation, route }) {
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    type: 'complaint',
  });
  const [submitting, setSubmitting] = useState(false);

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

  const ticketTypes = [
    { label: '🐛 Bug', value: 'bug' },
    { label: '😞 Reclamo', value: 'complaint' },
    { label: '🆘 Supporto', value: 'support' }
  ];

  const createTicket = async () => {
    if (!newTicket.title.trim() || !newTicket.description.trim()) {
      Alert.alert('Errore', 'Compila tutti i campi obbligatori');
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
      };

      const response = await makeRequest('/tickets/customer', {
        method: 'POST',
        body: JSON.stringify(ticketData),
      });

      Alert.alert('Successo', 'Ticket creato con successo', [
        {
          text: 'OK',
          onPress: () => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('CustomerTickets');
            }
          }
        }
      ]);
    } catch (error) {
      console.error('Error creating ticket:', error);
      Alert.alert('Errore', 'Impossibile creare il ticket');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={createTicketScreenStyles.container}>
      <View style={createTicketScreenStyles.header}>
        <Text style={createTicketScreenStyles.title}>Nuovo Ticket</Text>
      </View>

      <ScrollView style={createTicketScreenStyles.content}>
        {/* Ordine Associato (se presente) */}
        {orderData && (
          <View style={createTicketScreenStyles.formGroup}>
            <Text style={createTicketScreenStyles.label}>Ordine Associato</Text>
            <View style={createTicketScreenStyles.orderSummary}>
              <Text style={createTicketScreenStyles.orderTitle}>
                Ordine #{orderData.id.toString().slice(-5)}
              </Text>
              <Text style={createTicketScreenStyles.orderInfo}>
                {orderData.restaurant_name} - €{orderData.total_amount}
              </Text>
              <Text style={createTicketScreenStyles.orderStatus}>
                Stato: {orderData.status === 'pending' && '⏳ In Attesa'}
                {orderData.status === 'accepted' && '✓ Accettato'}
                {orderData.status === 'preparing' && '👨‍🍳 In Preparazione'}
                {orderData.status === 'pickup' && '📦 Pronto per Ritiro'}
                {orderData.status === 'delivering' && '🚗 In Consegna'}
                {orderData.status === 'delivered' && '✅ Consegnato'}
                {orderData.status === 'cancelled' && '❌ Cancellato'}
              </Text>
            </View>
            <TouchableOpacity
              style={createTicketScreenStyles.removeOrderButton}
              onPress={() => {
                // Rimuovi l'associazione ordine
                navigation.setParams({ orderId: null, orderData: null });
              }}
            >
              <Text style={createTicketScreenStyles.removeOrderText}>Rimuovi associazione</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tipo di Segnalazione */}
        <View style={createTicketScreenStyles.formGroup}>
          <Text style={createTicketScreenStyles.label}>Tipo di Segnalazione *</Text>
          <View style={createTicketScreenStyles.ticketTypesContainer}>
            {ticketTypes.map(type => (
              <TouchableOpacity
                key={type.value}
                style={[
                  createTicketScreenStyles.ticketTypeButton,
                  newTicket.type === type.value && createTicketScreenStyles.ticketTypeButtonActive
                ]}
                onPress={() => setNewTicket(prev => ({ ...prev, type: type.value }))}
              >
                <Text style={[
                  createTicketScreenStyles.ticketTypeText,
                  newTicket.type === type.value && createTicketScreenStyles.ticketTypeTextActive
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selezione Ordine (solo per supporto/reclamo) */}
        {(newTicket.type === 'support' || newTicket.type === 'complaint') && !orderData && (
          <View style={createTicketScreenStyles.formGroup}>
            <Text style={createTicketScreenStyles.label}>Ordine (Opzionale)</Text>
            <TouchableOpacity
              style={createTicketScreenStyles.selectOrderButton}
              onPress={() => navigation.navigate('OrderSelection')}
            >
              <Text style={createTicketScreenStyles.selectOrderText}>
                📋 Seleziona un ordine da associare
              </Text>
            </TouchableOpacity>
            <Text style={createTicketScreenStyles.helperText}>
              Associa un ordine per un supporto più rapido
            </Text>
          </View>
        )}

        {/* Titolo */}
        <View style={createTicketScreenStyles.formGroup}>
          <Text style={createTicketScreenStyles.label}>Titolo *</Text>
          <TextInput
            style={createTicketScreenStyles.input}
            placeholder="Breve descrizione del problema"
            value={newTicket.title}
            onChangeText={(text) => setNewTicket(prev => ({ ...prev, title: text }))}
            multiline={false}
          />
        </View>

        {/* Descrizione */}
        <View style={createTicketScreenStyles.formGroup}>
          <Text style={createTicketScreenStyles.label}>Descrizione Dettagliata *</Text>
          <TextInput
            style={[createTicketScreenStyles.input, createTicketScreenStyles.textArea]}
            placeholder="Descrivi il problema in dettaglio..."
            value={newTicket.description}
            onChangeText={(text) => setNewTicket(prev => ({ ...prev, description: text }))}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Pulsante Invia */}
        <TouchableOpacity
          style={[
            createTicketScreenStyles.submitButton,
            submitting && createTicketScreenStyles.submitButtonDisabled
          ]}
          onPress={createTicket}
          disabled={submitting}
        >
          <Text style={createTicketScreenStyles.submitButtonText}>
            {submitting ? 'Creazione...' : 'Crea Ticket'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
