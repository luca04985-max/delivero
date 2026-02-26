import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { makeRequest } from '../../services/api';
import { documentPickupStyles } from './styles/DocumentPickupScreenStyles';
import { mobileTheme } from '../../theme';

const DocumentPickupScreen = () => {
  const [formData, setFormData] = useState({
    documentType: 'certificate',
    pickupLocation: '',
    deliveryAddress: '',
    estimatedCost: '5.00',
    description: '',
    signatureRequired: false,
  });

  const [loading, setLoading] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const documentTypes = [
    { value: 'certificate', label: 'Certificato' },
    { value: 'permit', label: 'Permesso' },
    { value: 'contract', label: 'Contratto' },
    { value: 'document', label: 'Documento generico' },
    { value: 'bill', label: 'Bolletta' },
    { value: 'other', label: 'Altro' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.pickupLocation || !formData.deliveryAddress) {
      Alert.alert('Errore', 'Completa tutti i campi obbligatori');
      return;
    }

    setLoading(true);
    try {
      const response = await makeRequest('/document-pickups', {
        method: 'POST',
        data: {
          ...formData,
          estimatedCost: parseFloat(formData.estimatedCost),
          pickupLat: 0,
          pickupLon: 0,
          deliveryLat: 0,
          deliveryLon: 0,
        },
      });

      setTrackingNumber(response.tracking_number);
      Alert.alert('Successo', `Numero Tracking: ${response.tracking_number}`);

      setFormData({
        documentType: 'certificate',
        pickupLocation: '',
        deliveryAddress: '',
        estimatedCost: '5.00',
        description: '',
        signatureRequired: false,
      });
    } catch (error) {
      Alert.alert('Errore', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={documentPickupStyles.container}>
      <Text style={documentPickupStyles.title}>📄 Ritiro Documenti</Text>

      {trackingNumber && (
        <View style={documentPickupStyles.trackingCard}>
          <Text style={documentPickupStyles.trackingSuccessText}>✓ Ritiro Confermato</Text>
          <Text style={documentPickupStyles.trackingLabel}>Numero Tracking:</Text>
          <Text style={documentPickupStyles.trackingNumber}>{trackingNumber}</Text>
          <Text style={documentPickupStyles.trackingHelp}>
            Usa questo numero per tracciare il tuo ritiro
          </Text>
        </View>
      )}

      <View style={documentPickupStyles.formContainer}>
        <Text style={documentPickupStyles.label}>Tipo Documento</Text>
        <View style={documentPickupStyles.documentOptionsWrapper}>
          {documentTypes.map(type => (
            <TouchableOpacity
              key={type.value}
              style={[
                documentPickupStyles.documentOption,
                formData.documentType === type.value && documentPickupStyles.documentOptionSelected,
              ]}
              onPress={() => handleInputChange('documentType', type.value)}
            >
              <Text
                style={[
                  documentPickupStyles.documentOptionText,
                  formData.documentType === type.value && documentPickupStyles.documentOptionTextSelected,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={documentPickupStyles.label}>Luogo Ritiro *</Text>
        <TextInput
          style={documentPickupStyles.input}
          placeholder="Indirizzo dove ritirare i documenti"
          value={formData.pickupLocation}
          onChangeText={value => handleInputChange('pickupLocation', value)}
        />

        <Text style={documentPickupStyles.label}>Indirizzo Consegna *</Text>
        <TextInput
          style={documentPickupStyles.input}
          placeholder="Dove consegnare i documenti"
          value={formData.deliveryAddress}
          onChangeText={value => handleInputChange('deliveryAddress', value)}
        />

        <Text style={documentPickupStyles.label}>Descrizione</Text>
        <TextInput
          style={[documentPickupStyles.input, documentPickupStyles.inputMultiline]}
          placeholder="Es: 3 certificati di residenza"
          value={formData.description}
          onChangeText={value => handleInputChange('description', value)}
          multiline
        />

        <Text style={documentPickupStyles.label}>Costo Stimato (€)</Text>
        <TextInput
          style={documentPickupStyles.input}
          placeholder="5.00"
          value={formData.estimatedCost}
          onChangeText={value => handleInputChange('estimatedCost', value)}
          keyboardType="decimal-pad"
        />

        <View style={documentPickupStyles.switchRow}>
          <Text style={documentPickupStyles.switchLabel}>Firma richiesta alla consegna</Text>
          <Switch
            value={formData.signatureRequired}
            onValueChange={value => handleInputChange('signatureRequired', value)}
          />
        </View>

        <TouchableOpacity
          style={documentPickupStyles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={documentPickupStyles.submitButtonText}>
            {loading ? 'Prenotazione in corso...' : 'Prenota Ritiro'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DocumentPickupScreen;
