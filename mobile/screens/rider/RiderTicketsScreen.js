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
