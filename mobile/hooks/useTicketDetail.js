import { useState, useCallback, useEffect } from 'react';
import { makeRequest } from '../services/api';

/**
 * Hook custom per gestire il caricamento dei dettagli ticket
 * @param {string} ticketId - ID del ticket
 * @param {string} userRole - Ruolo dell'utente ('rider' | 'customer')
 * @returns {Object} { ticket, loading, refreshing, error, loadTicketDetail, onRefresh }
 */
export const useTicketDetail = (ticketId, userRole) => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadTicketDetail = useCallback(async () => {
    if (!ticketId) {
      console.error('❌ No ticketId provided');
      return;
    }

    try {
      setError(null);

      // Determina l'endpoint basato sul ruolo
      const endpoint =
        userRole === 'rider' ? `/tickets/rider/${ticketId}` : `/tickets/customer/${ticketId}`;

      console.log(`🌐 Loading ticket from API: ${endpoint} (${userRole})`);

      const data = await makeRequest(endpoint, { method: 'GET' });
      setTicket(data);
    } catch (err) {
      console.error('❌ Error loading ticket detail:', err);
      setError(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [ticketId, userRole]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadTicketDetail();
  }, [loadTicketDetail]);

  // Carica il ticket quando cambia ticketId o userRole
  useEffect(() => {
    if (ticketId && userRole) {
      loadTicketDetail();
    }
  }, [ticketId, userRole, loadTicketDetail]);

  return {
    ticket,
    loading,
    refreshing,
    error,
    loadTicketDetail,
    onRefresh,
  };
};
