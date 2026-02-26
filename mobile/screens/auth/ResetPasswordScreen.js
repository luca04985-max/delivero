import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { authAPI } from '../../services/api';
import LoginScreenStyles from './styles/LoginScreenStyles';
import { mobileTheme } from '../../theme';

export default function ResetPasswordScreen({ navigation, route }) {
  const [token, setToken] = useState(route?.params?.token || '');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleReset = async () => {
    if (!token) return setMessage('Token mancante');
    if (password.length < 6) return setMessage('Password deve avere almeno 6 caratteri');
    if (password !== confirm) return setMessage('Le password non corrispondono');

    setLoading(true);
    try {
      const resp = await authAPI.resetPassword(token, password);
      setMessage(resp.message || 'Password aggiornata. Effettua il login.');
    } catch (err) {
      setMessage(err.message || 'Errore durante il reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={LoginScreenStyles.container}>
      <Text style={LoginScreenStyles.title}>Imposta nuova password</Text>
      {message && <Text style={{ marginBottom: 12 }}>{message}</Text>}
      <TextInput
        style={LoginScreenStyles.input}
        placeholder="Token (se non disponibile lascia vuoto)"
        value={token}
        onChangeText={setToken}
        autoCapitalize="none"
      />
      <TextInput
        style={LoginScreenStyles.input}
        placeholder="Nuova password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={LoginScreenStyles.input}
        placeholder="Conferma password"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
      />
      <TouchableOpacity style={[LoginScreenStyles.button, loading && LoginScreenStyles.buttonDisabled]} onPress={handleReset} disabled={loading}>
        {loading ? <ActivityIndicator color={mobileTheme.colors.white} /> : <Text style={LoginScreenStyles.buttonText}>Imposta password</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={LoginScreenStyles.linkButton} onPress={() => navigation.navigate('Login')}>
        <Text style={LoginScreenStyles.linkText}>Torna al login</Text>
      </TouchableOpacity>
    </View>
  );
}
