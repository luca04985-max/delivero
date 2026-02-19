import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { makeRequest } from '../../services/api';
import { ticketFormScreenStyles } from './styles/TicketFormScreenStyles';

const TicketFormScreen = ({ navigation, route }) => {
  const onTicketCreated = route.params?.onTicketCreated;

  const [formData, setFormData] = useState({
    type: 'complaint',
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  // Definiamo le opzioni per i bottoni
  const ticketTypes = [
    { label: 'Bug', value: 'bug', emoji: '🐛' },
    { label: 'Reclamo', value: 'complaint', emoji: '😞' },
    { label: 'Suggerimento', value: 'feature_request', emoji: '💡' },
    { label: 'Supporto', value: 'support', emoji: '🆘' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      Alert.alert('Errore', 'Compila tutti i campi obbligatori');
      return;
    }

    try {
      setLoading(true);
      const response = await makeRequest('/tickets', {
        method: 'POST',
        data: formData
      });

      Alert.alert('Successo', 'Segnalazione inviata!', [
        {
          text: 'OK', onPress: () => {
            if (onTicketCreated) onTicketCreated(response);
            navigation.goBack();
          }
        }
      ]);
    } catch (error) {
      Alert.alert('Errore', error?.message || 'Errore durante l\'invio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <View style={ticketFormScreenStyles.container}>
        <View style={ticketFormScreenStyles.header}>
          <Text style={ticketFormScreenStyles.title}>📝 Nuova Segnalazione</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20 }}>

          {/* SELETTORE A PILLOLE (Sostituisce il Picker) */}
          <Text style={ticketFormScreenStyles.label}>Tipo di Segnalazione *</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, marginTop: 10 }}>
            {ticketTypes.map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => handleChange('type', item.value)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: formData.type === item.value ? '#007AFF' : '#ddd',
                  backgroundColor: formData.type === item.value ? '#E3F2FD' : '#fff',
                  marginRight: 8,
                  marginBottom: 8,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Text style={{ marginRight: 4 }}>{item.emoji}</Text>
                <Text style={{
                  color: formData.type === item.value ? '#007AFF' : '#444',
                  fontWeight: formData.type === item.value ? '600' : '400'
                }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={ticketFormScreenStyles.formGroup}>
            <Text style={ticketFormScreenStyles.label}>Titolo *</Text>
            <TextInput
              style={ticketFormScreenStyles.input}
              placeholder="Di cosa si tratta?"
              value={formData.title}
              onChangeText={(v) => handleChange('title', v)}
            />
          </View>

          <View style={ticketFormScreenStyles.formGroup}>
            <Text style={ticketFormScreenStyles.label}>Descrizione Dettagliata *</Text>
            <TextInput
              style={[ticketFormScreenStyles.input, { height: 120, textAlignVertical: 'top' }]}
              placeholder="Scrivi qui i dettagli..."
              value={formData.description}
              onChangeText={(v) => handleChange('description', v)}
              multiline
            />
          </View>

          <TouchableOpacity
            style={[ticketFormScreenStyles.button, loading && { backgroundColor: '#ccc' }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={ticketFormScreenStyles.buttonText}>Invia</Text>}
          </TouchableOpacity>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TicketFormScreen;