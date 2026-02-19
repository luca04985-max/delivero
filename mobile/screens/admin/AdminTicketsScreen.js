import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { makeRequest } from '../../services/api';
import { adminTicketsScreenStyles } from './styles/AdminTicketsScreenStyles';

export default function AdminTicketsScreen() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      setLoading(true);
      // Endpoint admin in backend: GET /tickets/admin
      const data = await makeRequest('/tickets/admin', { method: 'GET' });
      setTickets(data);
    } catch (e) {
      Alert.alert("Errore", "Impossibile recuperare i ticket");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      // Backend: PATCH /tickets/:id/status
      await makeRequest(`/tickets/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      Alert.alert("Fatto", "Stato ticket aggiornato");
      fetchAll();
    } catch (e) { Alert.alert("Errore", "Aggiornamento fallito"); }
  };

  return (
    <View style={adminTicketsScreenStyles.container}>
      <View style={adminTicketsScreenStyles.listContent}>
        <Text style={adminTicketsScreenStyles.title}>Gestione Supporto</Text>
        {loading ? <ActivityIndicator size="large" /> : (
          <FlatList
            data={tickets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={adminTicketsScreenStyles.ticketCard}>
                <View style={adminTicketsScreenStyles.headerRow}>
                  <Text style={adminTicketsScreenStyles.ticketTitle}>{item.title}</Text>
                  <View style={adminTicketsScreenStyles.typeBadge}>
                    <Text style={adminTicketsScreenStyles.ticketType}>{item.type.toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={adminTicketsScreenStyles.ticketDesc}>{item.description}</Text>
                <View style={adminTicketsScreenStyles.actions}>
                  <TouchableOpacity onPress={() => updateStatus(item.id, 'resolved')} style={adminTicketsScreenStyles.resolveBtn}>
                    <Text style={adminTicketsScreenStyles.resolveBtnText}>Risolto</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}