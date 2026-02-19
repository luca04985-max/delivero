import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import { ordersAPI } from '../../services/api';

export default function RiderTicketsScreen() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });

  const fetchTickets = async () => {
    try {
      const data = await ordersAPI.getRiderTickets();
      setTickets(data);
    } catch (e) {
      Alert.alert("Errore", "Impossibile recuperare i ticket");
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async () => {
    if (!newTicket.title.trim() || !newTicket.description.trim()) {
      Alert.alert('Errore', 'Compila tutti i campi');
      return;
    }

    try {
      await ordersAPI.createRiderTicket(newTicket);
      Alert.alert('Successo', 'Ticket creato con successo');
      setNewTicket({ title: '', description: '' });
      setShowModal(false);
      fetchTickets();
    } catch (e) {
      Alert.alert('Errore', 'Impossibile creare il ticket');
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const renderTicket = ({ item }) => (
    <View style={styles.ticketCard}>
      <Text style={styles.ticketTitle}>{item.title}</Text>
      <Text style={styles.ticketType}>{item.type?.toUpperCase() || 'SUPPORTO'}</Text>
      <Text style={styles.ticketDesc}>{item.description}</Text>
      <Text style={styles.ticketDate}>Creato: {new Date(item.created_at).toLocaleDateString()}</Text>
      {item.status && (
        <Text style={[styles.ticketStatus, item.status === 'resolved' && styles.resolved]}>
          {item.status === 'resolved' ? 'RISOLTO' : 'APERTO'}
        </Text>
      )}
      {item.response && (
        <View style={styles.responseBox}>
          <Text style={styles.responseTitle}>Risposta Admin:</Text>
          <Text style={styles.responseText}>{item.response}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={styles.header}>
        <Text style={styles.title}>🎫 I Miei Ticket</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Caricamento...</Text>
        </View>
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTicket}
          contentContainerStyle={{ padding: 15 }}
          ListEmptyComponent={<Text style={styles.emptyText}>Nessun ticket trovato.</Text>}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuovo Ticket</Text>
            <TextInput style={styles.input} placeholder="Titolo" value={newTicket.title} onChangeText={(text) => setNewTicket({ ...newTicket, title: text })} />
            <TextInput style={[styles.input, styles.textArea]} placeholder="Descrizione" value={newTicket.description} onChangeText={(text) => setNewTicket({ ...newTicket, description: text })} multiline numberOfLines={4} />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setShowModal(false)}>
                <Text style={styles.cancelButtonText}>Annulla</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.createButton]} onPress={createTicket}>
                <Text style={styles.createButtonText}>Crea</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: '#0066FF', padding: 20, paddingTop: 50 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, color: '#666' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' },
  fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#0066FF', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 15, width: '90%', maxWidth: 400 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 10, backgroundColor: '#f9f9f9' },
  textArea: { height: 80, textAlignVertical: 'top' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  button: { flex: 1, padding: 12, borderRadius: 8, marginHorizontal: 5 },
  cancelButton: { backgroundColor: '#ccc' },
  createButton: { backgroundColor: '#0066FF' },
  cancelButtonText: { color: '#333', textAlign: 'center', fontWeight: 'bold' },
  createButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  ticketCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2, borderLeftWidth: 4, borderLeftColor: '#0066FF' },
  ticketTitle: { fontWeight: 'bold', fontSize: 16 },
  ticketType: { color: '#666', fontSize: 12, marginVertical: 5 },
  ticketDesc: { fontSize: 14, color: '#444' },
  ticketDate: { fontSize: 12, color: '#999', marginTop: 5 },
  ticketStatus: { position: 'absolute', top: 10, right: 10, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, fontSize: 10, backgroundColor: '#ff9800', color: '#fff' },
  resolved: { backgroundColor: '#28A745' },
  responseBox: { backgroundColor: '#f0f8f0', padding: 10, borderRadius: 8, marginTop: 10 },
  responseTitle: { fontSize: 12, fontWeight: 'bold', color: '#2e7d32', marginBottom: 5 },
  responseText: { fontSize: 13, color: '#333' }
});
