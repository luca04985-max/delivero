import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
// AsyncStorage not used here
import { makeRequest } from '../../services/api';
import { ticketDetailScreenStyles } from './styles/TicketDetailScreenStyles';
import { mobileTheme } from '../../theme';
import { useUserRole } from '../../hooks/useUserRole';
import { useToast } from '../../hooks/useToast';
import { useTicketDetail } from '../../hooks/useTicketDetail';
import logger from '../../utils/logger';

/**
 * Schermata dettagli ticket - condivisa tra customer e rider
 * Usa hook custom per gestire ruolo utente e caricamento dati
 */
export default function TicketDetailScreen({ navigation, route }) {
  const { ticketId } = route.params || {};
  const [newResponse, setNewResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Hook custom
  const { userRole } = useUserRole();
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
      logger.error('Error adding response:', error);
      showToast('❌ Impossibile inviare la risposta', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = status => {
    // kept for backward compatibility; prefer using style variants
    switch (status) {
      case 'open':
        return ticketDetailScreenStyles.statusOpen.backgroundColor;
      case 'in_progress':
        return ticketDetailScreenStyles.statusInProgress.backgroundColor;
      case 'resolved':
        return ticketDetailScreenStyles.statusResolved.backgroundColor;
      default:
        return ticketDetailScreenStyles.statusDefault.backgroundColor;
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
        <ActivityIndicator size="large" color={mobileTheme.colors.primary} />
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
            toast.type === 'error'
              ? ticketDetailScreenStyles.toastError
              : toast.type === 'success'
                ? ticketDetailScreenStyles.toastSuccess
                : ticketDetailScreenStyles.toastInfo,
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
                ticket.status === 'open'
                  ? ticketDetailScreenStyles.statusOpen
                  : ticket.status === 'in_progress'
                    ? ticketDetailScreenStyles.statusInProgress
                    : ticket.status === 'resolved'
                      ? ticketDetailScreenStyles.statusResolved
                      : ticketDetailScreenStyles.statusDefault,
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
              <View style={ticketDetailScreenStyles.orderBox}>
                <Text style={ticketDetailScreenStyles.orderBoxTitle}>
                  Ordine #{ticket.order_id?.toString().slice(-5)}
                </Text>
                <Text style={ticketDetailScreenStyles.orderBoxDate}>
                  {new Date(ticket.order_created_at).toLocaleDateString('it-IT')}
                </Text>
                <Text style={ticketDetailScreenStyles.orderBoxPrice}>
                  €{ticket.total_amount || ticket.total_price || ticket.total}
                </Text>
                <Text style={ticketDetailScreenStyles.orderBoxAddress}>
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
                  (submitting || !newResponse.trim()) && ticketDetailScreenStyles.submitButtonDisabled,
                ]}
                onPress={addResponse}
                disabled={submitting || !newResponse.trim()}
              >
                {submitting ? (
                  <ActivityIndicator size="small" color={mobileTheme.colors.white} />
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
