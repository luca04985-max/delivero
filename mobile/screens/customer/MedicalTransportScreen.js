import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { makeRequest } from '../../services/api';
import { medicalTransportScreenStyles } from './styles/MedicalTransportScreenStyles';

export default function MedicalTransportScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clinicName: '',
    pickupAddress: '',
    returnTrip: true,
    specialRequirements: ''
  });

  const handleSubmit = async () => {
    if (!formData.clinicName || !formData.pickupAddress) {
      return Alert.alert("Errore", "Inserisci clinica e indirizzo di ritiro");
    }
    setLoading(true);
    try {
      await makeRequest('/services/medical-transport', { method: 'POST', data: formData });
      Alert.alert("Prenotato", "Il corriere ti contatterà per confermare l'orario.");
      navigation.goBack();
    } catch (e) { Alert.alert("Errore", "Riprova più tardi"); }
    finally { setLoading(false); }
  };

  return (
    <ScrollView style={medicalTransportScreenStyles.content}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Prenota Trasporto Medico</Text>
      <TextInput
        placeholder="Nome Clinica / Dottore"
        style={medicalTransportScreenStyles.input}
        onChangeText={(v) => setFormData({ ...formData, clinicName: v })}
      />
      <TextInput
        placeholder="Indirizzo di Ritiro"
        style={medicalTransportScreenStyles.input}
        onChangeText={(v) => setFormData({ ...formData, pickupAddress: v })}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 }}>
        <Text>Viaggio di ritorno incluso</Text>
        <Switch value={formData.returnTrip} onValueChange={(v) => setFormData({ ...formData, returnTrip: v })} />
      </View>
      <TouchableOpacity style={medicalTransportScreenStyles.btn} onPress={handleSubmit}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={medicalTransportScreenStyles.btnText}>Conferma Prenotazione</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}