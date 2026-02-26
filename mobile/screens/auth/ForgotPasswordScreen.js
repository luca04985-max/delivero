import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { authAPI } from '../../services/api';
import LoginScreenStyles from './styles/LoginScreenStyles';
import { mobileTheme } from '../../theme';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSend = async () => {
    if (!email) {
      setMessage('Inserisci la email');
      return;
    }
    setLoading(true);
    try {
      const resp = await authAPI.forgotPassword(email);
      setMessage(resp.message || 'Se l\'account esiste, riceverai una email.');
    } catch (err) {
      setMessage(err.message || 'Errore durante l\'invio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={LoginScreenStyles.container}>
      <Text style={LoginScreenStyles.title}>Recupera password</Text>
      {message && <Text style={{ marginBottom: 12 }}>{message}</Text>}
      <TextInput
        style={LoginScreenStyles.input}
        placeholder="tuoemail@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={[LoginScreenStyles.button, loading && LoginScreenStyles.buttonDisabled]}
        onPress={handleSend}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color={mobileTheme.colors.white} /> : <Text style={LoginScreenStyles.buttonText}>Invia email</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={LoginScreenStyles.linkButton} onPress={() => navigation.goBack()}>
        <Text style={LoginScreenStyles.linkText}>Torna al login</Text>
      </TouchableOpacity>
    </View>
  );
}
