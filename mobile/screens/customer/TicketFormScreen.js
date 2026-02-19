import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Picker,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeRequest } from '../../services/api';
import { ticketFormScreenStyles } from './styles/TicketFormScreenStyles';

const TicketFormScreen = ({ navigation, onTicketCreated }) => {
  const [formData, setFormData] = useState({
    type: 'complaint',
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const ticketTypes = [
    { label: '🐛 Bug/Errore tecnico', value: 'bug' },
    { label: '😞 Reclamo', value: 'complaint' },
    { label: '💡 Richiesta funzione', value: 'feature_request' },
    { label: '🆘 Supporto', value: 'support' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      Alert.alert('Errore', 'Per favore compila tutti i campi');
      return;
    }

    try {
      setLoading(true);
      const response = await makeRequest('/tickets', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      Alert.alert(
        'Successo',
        'Ticket creato con successo!',
        [
          {
            text: 'OK',
            onPress: () => {
              setFormData({ type: 'complaint', title: '', description: '' });
              if (onTicketCreated) onTicketCreated(response);
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Errore', error?.error || error?.message || 'Errore nella creazione del ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={ticketFormScreenStyles.container}>
      <View style={ticketFormScreenStyles.header}>
        <View style={ticketFormScreenStyles.headerContent}>
          <Text style={ticketFormScreenStyles.title}>📝 Crea una Segnalazione</Text>
        </View>
      </View>

      <ScrollView style={ticketFormScreenStyles.formContainer}>
        <View style={ticketFormScreenStyles.formGroup}>
          <Text style={ticketFormScreenStyles.label}>Tipo di Segnalazione *</Text>
          <Picker
            selectedValue={formData.type}
            onValueChange={(value) => handleChange('type', value)}
            style={ticketFormScreenStyles.picker}
          >
            <Picker.Item label="🐛 Bug/Errore tecnico" value="bug" />
            <Picker.Item label="😞 Reclamo" value="complaint" />
            <Picker.Item label="💡 Richiesta funzione" value="feature_request" />
            <Picker.Item label="🆘 Supporto" value="support" />
          </Picker>
        </View>

        <View style={ticketFormScreenStyles.formGroup}>
          <Text style={ticketFormScreenStyles.label}>Titolo *</Text>
          <TextInput
            style={ticketFormScreenStyles.input}
            placeholder="Breve descrizione del problema"
            value={formData.title}
            onChangeText={(value) => handleChange('title', value)}
            placeholderTextColor="#999"
          />
        </View>

        <View style={ticketFormScreenStyles.formGroup}>
          <Text style={ticketFormScreenStyles.label}>Descrizione dettagliata *</Text>
          <TextInput
            style={[ticketFormScreenStyles.input, { height: 120, textAlignVertical: 'top' }]}
            placeholder="Descrivi il problema in dettaglio..."
            value={formData.description}
            onChangeText={(value) => handleChange('description', value)}
            multiline={true}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={[ticketFormScreenStyles.button, loading && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={ticketFormScreenStyles.buttonText}>📤 Invia Segnalazione</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default TicketFormScreen;
