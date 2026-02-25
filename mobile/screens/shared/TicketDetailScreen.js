import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeRequest } from '../../services/api';
import { ticketDetailScreenStyles } from './styles/TicketDetailScreenStyles';
import { useUserRole } from '../../hooks/useUserRole';
import { useToast } from '../../hooks/useToast';
import { useTicketDetail } from '../../hooks/useTicketDetail';

/**
 * Schermata dettagli ticket - condivisa tra customer e rider
 * Usa hook custom per gestire ruolo utente e caricamento dati
 */
export default function TicketDetailScreen({ navigation, route }) {
  const { ticketId } = route.params || {};
  const [newResponse, setNewResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Hook custom
  const { userRole, isRider, isCustomer } = useUserRole();
  const { toast, showToast } = useToast();
  const { ticket, loading, refreshing, error, onRefresh } = useTicketDetail(ticketId, userRole);

  // Controlla se proveniamo da CreateTicket
  const isFromCreateTicket = route.params?.fromCreateTicket || false;

  // Nascondi completamente il pulsante indietro nell'header
  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      gestureEnabled: false,
    });
  }, [navigation]);

  const addResponse = async () => {
    if (!newResponse.trim()) {
      showToast('⚠️ La risposta non può essere vuota', 'warning');
      return;
    }

    try {
      setSubmitting(true);
      const response = await makeRequest(`/tickets/${ticketId}/comments`, {
        method: 'POST',
        data: {
          comment: newResponse,
        },
      });

      // Se la risposta contiene i dati del commento, considerala come successo
      if (response && response.id && response.comment) {
        showToast('✅ Risposta inviata con successo', 'success');
        setNewResponse('');
        onRefresh(); // Ricarica i dati
      } else if (response.success) {
        showToast('✅ Risposta inviata con successo', 'success');
        setNewResponse('');
        onRefresh(); // Ricarica i dati
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

  const getStatusColor = status => {
    switch (status) {
      case 'open':
        return '#4CAF50';
      case 'in_progress':
        return '#FF9800';
      case 'resolved':
        return '#2196F3';
      default:
        return '#757575';
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

  const getTypeEmoji = type => {
    switch (type) {
      case 'complaint':
        return '😞';
      case 'praise':
        return '😊';
      case 'suggestion':
        return '💡';
      case 'issue':
        return '⚠️';
      default:
        return '📋';
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

  if (error || !ticket) {
    return (
      <View style={ticketDetailScreenStyles.container}>
        <Text style={ticketDetailScreenStyles.errorText}>
          {error ? 'Errore nel caricamento' : 'Ticket non trovato'}
        </Text>
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
      {/* Toast Notification */}
      {toast.visible && (
        <View
          style={[
            ticketDetailScreenStyles.toast,
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
          <Text style={ticketDetailScreenStyles.toastText}>{toast.message}</Text>
        </View>
      )}

      <ScrollView
        style={ticketDetailScreenStyles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header del Ticket */}
        <View style={ticketDetailScreenStyles.headerCard}>
          <View style={ticketDetailScreenStyles.headerCardTop}>
            <View
              style={[
                ticketDetailScreenStyles.statusBadge,
                { backgroundColor: getStatusColor(ticket.status) },
              ]}
            >
              <Text style={ticketDetailScreenStyles.statusText}>
                {getStatusText(ticket.status)}
              </Text>
            </View>
            <Text style={ticketDetailScreenStyles.ticketType}>
              {getTypeEmoji(ticket.type)} {ticket.type}
            </Text>
          </View>

          <View style={ticketDetailScreenStyles.ticketMeta}>
            <Text style={ticketDetailScreenStyles.titleCard}>{ticket.title}</Text>
            <Text style={ticketDetailScreenStyles.ticketDate}>
              {new Date(ticket.created_at).toLocaleDateString('it-IT', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <Text style={ticketDetailScreenStyles.ticketId}>#{ticket.id}</Text>
          </View>
        </View>

        {/* Descrizione del Ticket */}
        <View style={ticketDetailScreenStyles.section}>
          {/* Ordine Associato (se presente) */}
          {ticket.order_id && (
            <View style={ticketDetailScreenStyles.section}>
              <Text style={ticketDetailScreenStyles.sectionTitle}>📦 Ordine Associato</Text>
              <View
                style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: 10,
                  padding: 15,
                  marginBottom: 20,
                  borderLeftWidth: 4,
                  borderLeftColor: '#FF6B00',
                }}
              >
                <Text style={{ fontWeight: 'bold', color: '#333', marginBottom: 5 }}>
                  Ordine #{ticket.order_id?.toString().slice(-5)}
                </Text>
                <Text style={{ color: '#666', fontSize: 12 }}>
                  {new Date(ticket.order_created_at).toLocaleDateString('it-IT')}
                </Text>
                <Text style={{ color: '#FF6B00', fontWeight: 'bold', marginTop: 5 }}>
                  €{ticket.total_amount || ticket.total_price || ticket.total}
                </Text>
                <Text style={{ color: '#666', fontSize: 12, marginTop: 5 }}>
                  📍 {ticket.delivery_address}
                </Text>
              </View>
            </View>
          )}
          <Text style={ticketDetailScreenStyles.sectionTitle}>📋 Descrizione</Text>
          <View style={ticketDetailScreenStyles.descriptionBox}>
            <Text style={ticketDetailScreenStyles.ticketDescription}>{ticket.description}</Text>
          </View>
        </View>

        {/* Risposte */}
        <View style={ticketDetailScreenStyles.section}>
          <Text style={ticketDetailScreenStyles.sectionTitle}>
            💬 Risposte {(ticket.comments || ticket.responses)?.length || 0}
          </Text>

          {(ticket.comments || ticket.responses) &&
          (ticket.comments || ticket.responses).length > 0 ? (
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
                      minute: '2-digit',
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
              />
              <TouchableOpacity
                style={[
                  ticketDetailScreenStyles.submitButton,
                  { opacity: submitting || !newResponse.trim() ? 0.6 : 1 },
                ]}
                onPress={addResponse}
                disabled={submitting || !newResponse.trim()}
              >
                {submitting ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={ticketDetailScreenStyles.submitButtonText}>Invia Risposta</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
