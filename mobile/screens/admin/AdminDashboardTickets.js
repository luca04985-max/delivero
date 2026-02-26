import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator, Alert, Modal } from 'react-native';
import { adminAPI } from '../../services/api';
import { adminDashboardTicketsStyles as styles } from './styles/AdminDashboardTicketsStyles';
import { mobileTheme } from '../../theme';

export default function AdminDashboardTickets({ navigation: _navigation }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const loadTickets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAdminTickets();
      const ticketsData = Array.isArray(data) ? data : data.data || [];

      // Filtra solo ticket validi
      const validTickets = ticketsData.filter(
        ticket => ticket.id != null || ticket.ticket_status != null,
      );

      setTickets(validTickets);
    } catch (error) {
      console.error('Error loading tickets:', error);
      Alert.alert('Errore', 'Non ho potuto caricare tutti i ticket.');
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadTickets().finally(() => setRefreshing(false));
  }, [loadTickets]);

  // Ottimizzazione: memoizza il raggruppamento dei ticket per stato
  // grouped tickets memo removed — grouping is done inline where needed

  // Funzione per toggle delle sezioni
  const toggleSection = useCallback(ticket_status => {
    setExpandedSections(prev => ({
      ...prev,
      [ticket_status]: !prev[ticket_status],
    }));
  }, []);

  // Funzioni helper
  const getStatusColor = useCallback(status => {
    switch (status) {
      case 'open':
        return mobileTheme.colors.success;
      case 'in_progress':
        return mobileTheme.colors.warning;
      case 'closed':
        return mobileTheme.colors.text.tertiary;
      case 'resolved':
        return mobileTheme.colors.primary;
      default:
        return mobileTheme.colors.text.secondary;
    }
  }, []);

  const getStatusText = useCallback(status => {
    switch (status) {
      case 'open':
        return '🟢 Aperti';
      case 'in_progress':
        return '🟠 In corso';
      case 'closed':
        return '🔴 Chiusi';
      case 'resolved':
        return '🔵 Risolti';
      default:
        return status;
    }
  }, []);

  // Funzione per renderizzare il separatore di stato
  const renderStatusSeparator = (status, count, statusInfo, isExpanded) => {
    return (
      <TouchableOpacity
        style={[styles.statusSeparator, { borderLeftColor: getStatusColor(status) }]}
        onPress={() => toggleSection(status)}
      >
        <View style={styles.statusSeparatorContent}>
          <View style={styles.statusSeparatorLeft}>
            <Text style={styles.statusSeparatorIcon}>{statusInfo.icon}</Text>
            <Text style={styles.statusSeparatorTitle}>{statusInfo.label}</Text>
          </View>
          <View style={styles.statusSeparatorRight}>
            <Text style={styles.statusSeparatorCount}>{count}</Text>
            <Text style={styles.statusSeparatorToggle}>{isExpanded ? '🔼' : '🔽'}</Text>
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
      const status = ticket.ticket_status || ticket.status || 'unknown';
      if (!statusGroups[status]) {
        statusGroups[status] = [];
      }
      statusGroups[status].push(ticket);
    });

    const statusInfo = {
      open: { label: 'Aperti', icon: '🔓' },
      in_progress: { label: 'In Corso', icon: '⚙️' },
      closed: { label: 'Chiusi', icon: '✅' },
      resolved: { label: 'Risolti', icon: '🎯' },
    };

    const result = [];

    Object.keys(statusGroups).forEach(status => {
      const groupTickets = statusGroups[status];
      const isExpanded = !!expandedSections[status];

      result.push(
        <View key={`separator-${status}`}>
          {renderStatusSeparator(
            status,
            groupTickets.length,
            statusInfo[status] || { label: status, icon: '📋' },
            isExpanded,
          )}
        </View>,
      );

      if (isExpanded) {
        groupTickets.forEach(ticket => {
          result.push(<View key={`ticket-${ticket.id}`}>{renderTicket({ item: ticket })}</View>);
        });
      }
    });

    return result;
  };

  const renderTicket = ({ item }) => {
    const handlePress = () => {
      setSelectedTicket(item);
    };

    return (
      <TouchableOpacity style={styles.ticketCard} onPress={handlePress}>
        <View style={styles.headerCard}>
          <Text style={styles.titleCard}>{item.title}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {getStatusText(item.ticket_status || item.status || 'open')}
            </Text>
          </View>
        </View>
        <Text style={styles.ticketDescription}>{item.description}</Text>
        <View style={styles.ticketFooter}>
          <Text style={styles.ticketDate}>#{item.id}</Text>
          <Text style={styles.ticketId}>
            {item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>Tutti i Ticket</Text>
        <Text style={styles.subtitle}>Gestione completa ticket</Text>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={mobileTheme.colors.primary} />
          <Text style={styles.loadingText}>Caricamento ticket...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={styles.content}
      >
        {tickets.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nessun ticket trovato</Text>
            <Text style={styles.emptySubtext}>Non ci sono ticket nel sistema</Text>
          </View>
        ) : (
          renderTicketsWithSeparators()
        )}
      </ScrollView>

      {/* Modal per dettagli ticket */}
      <Modal
        visible={!!selectedTicket}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedTicket(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.headerCard}>
              <Text style={styles.ticketId}>#{selectedTicket?.id}</Text>
              <Text style={styles.modalTitle}>Dettagli Ticket</Text>
            </View>

            {!selectedTicket ? (
              <View style={styles.editField}>
                <Text style={styles.textInput}>Nessun ticket selezionato</Text>
              </View>
            ) : (
              <ScrollView style={styles.modalScroll}>
                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>Informazioni Generali</Text>

                  <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Titolo:</Text>
                    <Text style={styles.fieldValue}>{selectedTicket?.title || '—'}</Text>
                  </View>

                  <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Descrizione:</Text>
                    <Text style={styles.fieldValue}>{selectedTicket?.description || '—'}</Text>
                  </View>

                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Tipo:</Text>
                      <View
                        style={[
                          styles.priorityBadge,
                          selectedTicket?.type === 'bug'
                            ? styles.priorityHigh
                            : selectedTicket?.type === 'complaint'
                            ? styles.priorityMedium
                            : styles.priorityLow,
                        ]}
                      >
                        <Text style={styles.priorityText}>
                          {selectedTicket?.type?.toUpperCase() || '—'}
                        </Text>
                      </View>
                    </View>
                </View>

                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>Stato e Priorità</Text>

                  <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Stato:</Text>
                    <View
                      style={[
                        styles.priorityBadge,
                        selectedTicket?.status === 'open'
                          ? styles.statusOpen
                          : selectedTicket?.status === 'resolved'
                          ? styles.statusResolved
                          : styles.statusInProgress,
                      ]}
                    >
                      <Text style={styles.priorityText}>
                        {selectedTicket?.status?.toUpperCase() || '—'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Priorità:</Text>
                    <View
                      style={[
                        styles.priorityBadge,
                        selectedTicket?.priority === 'high'
                          ? styles.priorityHigh
                          : selectedTicket?.priority === 'medium'
                          ? styles.priorityMedium
                          : styles.priorityLow,
                      ]}
                    >
                      <Text style={styles.priorityText}>
                        {selectedTicket?.priority?.toUpperCase() || '—'}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>Informazioni Utente</Text>

                  <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Utente:</Text>
                    <Text style={styles.fieldValue}>{selectedTicket?.user_name || '—'}</Text>
                  </View>

                  <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Email:</Text>
                    <Text style={styles.fieldValue}>{selectedTicket?.user_email || '—'}</Text>
                  </View>
                </View>

                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>Date</Text>

                  <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Creato:</Text>
                    <Text style={styles.fieldValue}>
                      {selectedTicket?.created_at
                        ? new Date(selectedTicket.created_at).toLocaleString()
                        : '—'}
                    </Text>
                  </View>

                  <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Aggiornato:</Text>
                    <Text style={styles.fieldValue}>
                      {selectedTicket?.updated_at
                        ? new Date(selectedTicket.updated_at).toLocaleString()
                        : '—'}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            )}

            <View style={styles.editActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setSelectedTicket(null)}>
                <Text style={styles.btnCancelText}>Chiudi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
