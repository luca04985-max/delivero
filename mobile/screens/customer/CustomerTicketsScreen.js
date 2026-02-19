import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { ordersAPI } from '../../services/api';
import { customerTicketsScreenStyles } from './styles/CustomerTicketsScreenStyles';

export default function CustomerTicketsScreen() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });

  const fetchTickets = async () => {
    try {
      const data = await ordersAPI.getCustomerTickets();
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
      await ordersAPI.createCustomerTicket(newTicket);
      Alert.alert('Successo', 'Ticket inviato con successo');
      setNewTicket({ title: '', description: '' });
      setShowModal(false);
      fetchTickets();
    } catch (e) {
      Alert.alert('Errore', 'Impossibile inviare il ticket');
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <View style={customerTicketsScreenStyles.container}>
      <View style={customerTicketsScreenStyles.header}>
        <View style={customerTicketsScreenStyles.headerContent}>
          <Text style={customerTicketsScreenStyles.title}>🎫 I Miei Ticket</Text>
        </View>
      </View>

      {loading ? (
        <View style={customerTicketsScreenStyles.loadingContainer}>
          <Text style={customerTicketsScreenStyles.loadingText}>Caricamento ticket...</Text>
        </View>
      ) : tickets.length === 0 ? (
        <View style={customerTicketsScreenStyles.emptyContainer}>
          <Text style={customerTicketsScreenStyles.emptyText}>Nessun ticket trovato</Text>
        </View>
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={customerTicketsScreenStyles.ticketsList}
          renderItem={({ item }) => (
            <TouchableOpacity style={customerTicketsScreenStyles.ticketCard}>
              <View style={customerTicketsScreenStyles.ticketHeader}>
                <Text style={customerTicketsScreenStyles.ticketTitle}>{item.title}</Text>
                <Text style={customerTicketsScreenStyles.ticketDate}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
              
              <Text style={customerTicketsScreenStyles.ticketDescription}>{item.description}</Text>
              
              <View style={customerTicketsScreenStyles.statusContainer}>
                <View style={[
                  customerTicketsScreenStyles.statusBadge,
                  item.status === 'open' ? customerTicketsScreenStyles.statusOpen : customerTicketsScreenStyles.statusClosed
                ]}>
                  <Text style={customerTicketsScreenStyles.statusText}>
                    {item.status === 'open' ? 'Aperto' : 'Chiuso'}
                  </Text>
                </View>
              </View>

              {item.response && (
                <View style={customerTicketsScreenStyles.responseBox}>
                  <Text style={customerTicketsScreenStyles.responseTitle}>Risposta:</Text>
                  <Text style={customerTicketsScreenStyles.responseText}>{item.response}</Text>
                </View>
              )}

              <TouchableOpacity 
                style={customerTicketsScreenStyles.actionButton}
                onPress={() => setShowModal(true)}
              >
                <Text style={customerTicketsScreenStyles.actionButtonText}>Aggiungi Risposta</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={customerTicketsScreenStyles.fab}
        onPress={() => setShowModal(true)}
      >
        <Text style={customerTicketsScreenStyles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={customerTicketsScreenStyles.modalOverlay}>
          <View style={customerTicketsScreenStyles.modalContent}>
            <Text style={customerTicketsScreenStyles.modalTitle}>Nuova Risposta</Text>
            
            <TextInput
              style={customerTicketsScreenStyles.input}
              placeholder="Titolo"
              value={newTicket.title}
              onChangeText={(text) => setNewTicket(prev => ({ ...prev, title: text }))}
            />
            
            <TextInput
              style={[customerTicketsScreenStyles.input, customerTicketsScreenStyles.textArea]}
              placeholder="Descrizione"
              value={newTicket.description}
              onChangeText={(text) => setNewTicket(prev => ({ ...prev, description: text }))}
              multiline
            />
            
            <View style={customerTicketsScreenStyles.modalButtons}>
              <TouchableOpacity
                style={[customerTicketsScreenStyles.button, customerTicketsScreenStyles.cancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={customerTicketsScreenStyles.cancelButtonText}>Annulla</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[customerTicketsScreenStyles.button, customerTicketsScreenStyles.createButton]}
                onPress={createTicket}
              >
                <Text style={customerTicketsScreenStyles.createButtonText}>Invia</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
