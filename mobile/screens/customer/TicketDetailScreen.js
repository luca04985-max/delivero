import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
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

  // Controlla se proveniamo da CreateTicket
  const isFromCreateTicket = route.params?.fromCreateTicket || false;

  useEffect(() => {
    loadTicketDetail();
  }, [ticketId]);

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

      // Se non in cache, fai la chiamata API
      const data = await makeRequest(`/tickets/customer/${ticketId}`, { method: 'GET' });
      setTicket(data);
    } catch (error) {
      console.error('Error loading ticket detail:', error);
      Alert.alert('Errore', 'Impossibile caricare i dettagli del ticket');
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
      Alert.alert('Errore', 'La risposta non può essere vuota');
      return;
    }

    try {
      setSubmitting(true);
      const response = await makeRequest(`/tickets/customer/${ticketId}/responses`, {
        method: 'POST',
        data: {
          content: newResponse,
        },
      });

      if (response.success) {
        Alert.alert('Successo', 'Risposta inviata con successo');
        setNewResponse('');
        loadTicketDetail();
      } else {
        Alert.alert('Errore', response.message || 'Impossibile inviare la risposta');
      }
    } catch (error) {
      console.error('Error adding response:', error);
      Alert.alert('Errore', 'Impossibile inviare la risposta');
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
            <Text style={ticketDetailScreenStyles.ticketId}>#{ticket.id}</Text>
            <View style={[
              ticketDetailScreenStyles.statusBadge,
              { backgroundColor: getStatusColor(ticket.status) }
            ]}>
              <Text style={ticketDetailScreenStyles.statusText}>
                {getStatusText(ticket.status)}
              </Text>
            </View>
          </View>

          <Text style={ticketDetailScreenStyles.ticketTitle}>{ticket.title}</Text>

          <View style={ticketDetailScreenStyles.ticketMeta}>
            <Text style={ticketDetailScreenStyles.ticketType}>
              {getTypeEmoji(ticket.type)} {ticket.type}
            </Text>
            <Text style={ticketDetailScreenStyles.ticketDate}>
              {new Date(ticket.created_at).toLocaleDateString('it-IT', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </View>
        </View>

        {/* Descrizione del Ticket */}
        <View style={ticketDetailScreenStyles.section}>
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
            💬 Risposte ({ticket.responses?.length || 0})
          </Text>

          {ticket.responses && ticket.responses.length > 0 ? (
            ticket.responses.map((response, index) => (
              <View key={response.id || index} style={ticketDetailScreenStyles.responseCard}>
                <View style={ticketDetailScreenStyles.responseHeader}>
                  <View style={ticketDetailScreenStyles.responseAuthorContainer}>
                    <Text style={ticketDetailScreenStyles.responseAuthor}>
                      {response.author_name || 'Supporto'}
                    </Text>
                    <View style={ticketDetailScreenStyles.authorBadge}>
                      <Text style={ticketDetailScreenStyles.authorBadgeText}>
                        {response.author_role || 'Staff'}
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
                    {response.content}
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
    </View>
  );
}
