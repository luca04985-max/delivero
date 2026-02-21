import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeRequest } from '../../services/api';
import { ticketCache } from '../../services/ticketCache';
import { ticketDetailScreenStyles } from './styles/TicketDetailScreenStyles';

export default function TicketDetailScreen({ navigation, route }) {
  const { ticketId } = route.params || {};
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [newResponse, setNewResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: '' });
  const [userRole, setUserRole] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: '' });
    }, 10000); // 10 secondi come richiesto
  };

  // Controlla se proveniamo da CreateTicket
  const isFromCreateTicket = route.params?.fromCreateTicket || false;

  useEffect(() => {
    loadTicketDetail();
  }, [ticketId]);

  // Carica il ruolo dell'utente
  useEffect(() => {
    const loadUserRole = async () => {
      try {
        const userStr = await AsyncStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          setUserRole(user.role);
        }
      } catch (error) {
        console.error('Error loading user role:', error);
      }
    };
    loadUserRole();
  }, []);

  // Nascondi completamente il pulsante indietro nell'header
  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      gestureEnabled: false,
    });
  }, [navigation]);

  const loadTicketDetail = async () => {
    try {
      // Prima controlla nella cache
      const cachedTicket = ticketCache.getTicketById(ticketId);
      if (cachedTicket) {
        setTicket(cachedTicket);
        setLoading(false);
        return;
      }

      // Se non in cache, fai la chiamata API basata sul ruolo
      let data;
      if (userRole === 'rider') {
        console.log('🏍️ Loading rider ticket:', ticketId);
        data = await makeRequest(`/tickets/rider/${ticketId}`, { method: 'GET' });
      } else {
        console.log('👤 Loading customer ticket:', ticketId);
        data = await makeRequest(`/tickets/customer/${ticketId}`, { method: 'GET' });
      }

      setTicket(data);
    } catch (error) {
      console.error('Error loading ticket detail:', error);
      showToast('❌ Impossibile caricare i dettagli del ticket', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadTicketDetail();
  };

  const addResponse = async () => {
    if (!newResponse.trim()) {
      showToast('⚠️ La risposta non può essere vuota', 'warning');
      return;
    }
    console.log("Commento: " + newResponse)
    try {
      setSubmitting(true);
      const response = await makeRequest(`/tickets/${ticketId}/comments`, {
        method: 'POST',
        data: {
          comment: newResponse, // Cambiato da 'content' a 'comment'
        },
      });
      console.log("Response: " + JSON.stringify(response));
      console.log("Response success: " + response.success);

      // Se la risposta contiene i dati del commento, considerala come successo
      if (response && response.id && response.comment) {
        showToast('✅ Risposta inviata con successo', 'success');
        setNewResponse('');
        loadTicketDetail();
      } else if (response.success) {
        showToast('✅ Risposta inviata con successo', 'success');
        setNewResponse('');
        loadTicketDetail();
      } else {
        showToast('❌ Impossibile inviare la risposta', 'error');
      }
    } catch (error) {
      console.error('Error adding response:', error);
      showToast('❌ Impossibile inviare la risposta', 'error');
    } finally {
      setSubmitting(false);
    }
  };

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

  const getTypeEmoji = (type) => {
    switch (type) {
      case 'bug': return '🐛';
      case 'complaint': return '😞';
      case 'feature_request': return '💡';
      case 'support': return '🆘';
      default: return '📝';
    }
  };

  if (loading) {
    return (
      <View style={ticketDetailScreenStyles.container}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text style={ticketDetailScreenStyles.loadingText}>Caricamento dettagli...</Text>
      </View>
    );
  }

  if (!ticket) {
    return (
      <View style={ticketDetailScreenStyles.container}>
        <Text style={ticketDetailScreenStyles.errorText}>Ticket non trovato</Text>
        {!isFromCreateTicket && (
          <TouchableOpacity
            style={ticketDetailScreenStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={ticketDetailScreenStyles.backButtonText}>Torna indietro</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={ticketDetailScreenStyles.container}>
      <ScrollView
        style={ticketDetailScreenStyles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header del Ticket */}
        <View style={ticketDetailScreenStyles.ticketHeader}>
          <View style={ticketDetailScreenStyles.ticketHeaderTop}>
            <View style={[
              ticketDetailScreenStyles.statusBadge,
              { backgroundColor: getStatusColor(ticket.status) }
            ]}>
              <Text style={ticketDetailScreenStyles.statusText}>
                {getStatusText(ticket.status)}
              </Text>
            </View>
            <Text style={ticketDetailScreenStyles.ticketType}>
              {getTypeEmoji(ticket.type)} {ticket.type}
            </Text>
          </View>


          <View style={ticketDetailScreenStyles.ticketMeta}>
            <Text style={ticketDetailScreenStyles.ticketTitle}>{ticket.title}</Text>
            <Text style={ticketDetailScreenStyles.ticketDate}>
              {new Date(ticket.created_at).toLocaleDateString('it-IT', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {/* Descrizione del Ticket */}
        <View style={ticketDetailScreenStyles.section}>
          {/* Ordine Associato (se presente) */}
          {ticket.order_id && (
            <View style={ticketDetailScreenStyles.section}>
              <Text style={ticketDetailScreenStyles.sectionTitle}>📦 Ordine Associato</Text>
              <View style={{
                backgroundColor: '#f8f9fa',
                borderRadius: 10,
                padding: 15,
                borderLeftWidth: 4,
                borderLeftColor: '#FF6B00'
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: 8
                }}>
                  Ordine #{ticket.order_id}
                </Text>
                {ticket.total_amount && (
                  <Text style={{
                    fontSize: 14,
                    color: '#666',
                    marginBottom: 5
                  }}>
                    Importo: €{ticket.total_amount}
                  </Text>
                )}
                {ticket.order_status && (
                  <Text style={{
                    fontSize: 14,
                    color: '#666',
                    marginBottom: 5
                  }}>
                    Stato: {ticket.order_status === 'pending' && '⏳ In Attesa'}
                    {ticket.order_status === 'accepted' && '✓ Accettato'}
                    {ticket.order_status === 'preparing' && '👨‍🍳 In Preparazione'}
                    {ticket.order_status === 'pickup' && '📦 Pronto per Ritiro'}
                    {ticket.order_status === 'delivering' && '🚗 In Consegna'}
                    {ticket.order_status === 'delivered' && '✅ Consegnato'}
                    {ticket.order_status === 'cancelled' && '❌ Cancellato'}
                  </Text>
                )}
                {ticket.delivery_address && (
                  <Text style={{
                    fontSize: 14,
                    color: '#666'
                  }}>
                    📍 {ticket.delivery_address}
                  </Text>
                )}
              </View>
            </View>
          )}
          <Text style={ticketDetailScreenStyles.sectionTitle}>📋 Descrizione</Text>
          <View style={ticketDetailScreenStyles.descriptionBox}>
            <Text style={ticketDetailScreenStyles.ticketDescription}>
              {ticket.description}
            </Text>
          </View>
        </View>

        {/* Risposte */}
        <View style={ticketDetailScreenStyles.section}>
          <Text style={ticketDetailScreenStyles.sectionTitle}>
            💬 Risposte {(ticket.comments || ticket.responses)?.length || 0}
          </Text>

          {(ticket.comments || ticket.responses) && (ticket.comments || ticket.responses).length > 0 ? (
            (ticket.comments || ticket.responses).map((response, index) => (
              <View key={response.id || index} style={ticketDetailScreenStyles.responseCard}>
                <View style={ticketDetailScreenStyles.responseHeader}>
                  <View style={ticketDetailScreenStyles.responseAuthorContainer}>
                    <Text style={ticketDetailScreenStyles.responseAuthor}>
                      {response.user_name || response.author_name || 'Name: '}
                    </Text>
                    <View style={ticketDetailScreenStyles.authorBadge}>
                      <Text style={ticketDetailScreenStyles.authorBadgeText}>
                        {response.role || response.author_role || 'Ruolo: '}
                      </Text>
                    </View>
                  </View>
                  <Text style={ticketDetailScreenStyles.responseDate}>
                    {new Date(response.created_at).toLocaleDateString('it-IT', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                </View>
                <View style={ticketDetailScreenStyles.responseContentBox}>
                  <Text style={ticketDetailScreenStyles.responseContent}>
                    {response.comment || response.content}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={ticketDetailScreenStyles.noResponsesContainer}>
              <Text style={ticketDetailScreenStyles.noResponsesText}>
                😅 Nessuna risposta ancora
              </Text>
              <Text style={ticketDetailScreenStyles.noResponsesSubtext}>
                Sii il primo a rispondere
              </Text>
            </View>
          )}
        </View>

        {/* Form per nuova risposta */}
        {ticket.status !== 'resolved' && (
          <View style={ticketDetailScreenStyles.section}>
            <Text style={ticketDetailScreenStyles.sectionTitle}>✍️ Aggiungi Risposta</Text>
            <View style={ticketDetailScreenStyles.responseForm}>
              <TextInput
                style={ticketDetailScreenStyles.responseInput}
                placeholder="Scrivi qui la tua risposta..."
                value={newResponse}
                onChangeText={setNewResponse}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!submitting}
              />
              <TouchableOpacity
                style={[
                  ticketDetailScreenStyles.submitButton,
                  submitting && ticketDetailScreenStyles.submitButtonDisabled
                ]}
                onPress={addResponse}
                disabled={submitting}
              >
                <Text style={ticketDetailScreenStyles.submitButtonText}>
                  {submitting ? 'Invio...' : 'Invia Risposta'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Toast Notification */}
      {toast.visible && (
        <View style={{
          position: 'absolute',
          top: 50,
          left: 20,
          right: 20,
          backgroundColor: toast.type === 'success' ? '#4CAF50' :
            toast.type === 'error' ? '#F44336' :
              toast.type === 'warning' ? '#FF9800' : '#2196F3',
          padding: 15,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          zIndex: 1000,
        }}>
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
            flex: 1,
          }}>
            {toast.message}
          </Text>
        </View>
      )}
    </View>
  );
}
