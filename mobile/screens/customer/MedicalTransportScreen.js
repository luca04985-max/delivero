import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import { makeRequest } from '../../services/api';
import { medicalTransportScreenStyles } from './styles/MedicalTransportScreenStyles';
import { mobileTheme } from '../../theme';

export default function MedicalTransportScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clinicName: '',
    pickupAddress: '',
    returnTrip: true,
    specialRequirements: '',
  });

  const handleSubmit = async () => {
    if (!formData.clinicName || !formData.pickupAddress) {
      return Alert.alert('Errore', 'Inserisci clinica e indirizzo di ritiro');
    }
    setLoading(true);
    try {
      await makeRequest('/services/medical-transport', { method: 'POST', data: formData });
      Alert.alert('Prenotato', "Il corriere ti contatterà per confermare l'orario.");
      navigation.goBack();
    } catch (e) {
      Alert.alert('Errore', 'Riprova più tardi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={medicalTransportScreenStyles.container}>
      <Text style={medicalTransportScreenStyles.title}>Prenota Trasporto Medico</Text>
      <TextInput
        placeholder="Nome Clinica / Dottore"
        style={medicalTransportScreenStyles.input}
        onChangeText={v => setFormData({ ...formData, clinicName: v })}
      />
      <TextInput
        placeholder="Indirizzo di Ritiro"
        style={medicalTransportScreenStyles.input}
        onChangeText={v => setFormData({ ...formData, pickupAddress: v })}
      />
      <View style={medicalTransportScreenStyles.switchRow}>
        <Text>Viaggio di ritorno incluso</Text>
        <Switch
          value={formData.returnTrip}
          onValueChange={v => setFormData({ ...formData, returnTrip: v })}
        />
      </View>
      <TouchableOpacity style={medicalTransportScreenStyles.btn} onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator color={mobileTheme.colors.white} />
        ) : (
          <Text style={medicalTransportScreenStyles.btnText}>Conferma Prenotazione</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
