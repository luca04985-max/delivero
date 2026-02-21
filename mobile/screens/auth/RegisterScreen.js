import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  Animated,
} from 'react-native';
// 1. IMPORTA IL PICKER DA QUI
import { Picker } from '@react-native-picker/picker';
import { authAPI } from '../../services/api';
import RegisterScreenStyles from './styles/RegisterScreenStyles.js';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer');

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: '' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: '' });
    }, 4000);
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      showToast('⚠️ Compila tutti i campi', 'warning');
      return;
    }

    if (password !== confirmPassword) {
      showToast('⚠️ Le password non coincidono', 'warning');
      return;
    }

    if (password.length < 6) {
      showToast('⚠️ La password deve avere almeno 6 caratteri', 'warning');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.register(email, password, name, role);
      showToast('✅ Account creato con successo!', 'success');
      navigation.navigate('Login');
    } catch (error) {
      showToast(`❌ ${error.message || 'Errore sconosciuto'}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={RegisterScreenStyles.container}>
          {/* Header */}
          <View style={RegisterScreenStyles.header}>
            <Text style={RegisterScreenStyles.logo}>✍️</Text>
            <Text style={RegisterScreenStyles.title}>Registrati</Text>
            <Text style={RegisterScreenStyles.subtitle}>Crea il tuo account Delivero</Text>
          </View>

          {/* Form */}
          <View style={RegisterScreenStyles.form}>
            <View style={RegisterScreenStyles.inputGroup}>
              <Text style={RegisterScreenStyles.label}>👤 Nome Completo</Text>
              <TextInput
                style={RegisterScreenStyles.input}
                placeholder="Luca Rossi"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                editable={!loading}
              />
            </View>

            <View style={RegisterScreenStyles.inputGroup}>
              <Text style={RegisterScreenStyles.label}>📧 Email</Text>
              <TextInput
                style={RegisterScreenStyles.input}
                placeholder="tuoemail@example.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
            </View>

            <View style={RegisterScreenStyles.inputGroup}>
              <Text style={RegisterScreenStyles.label}>👥 Tipo di Account</Text>
              <View style={RegisterScreenStyles.pickerContainer}>
                {/* 2. IL COMPONENTE ORA USA LA LIBRERIA ESTERNA */}
                <Picker
                  selectedValue={role}
                  onValueChange={(itemValue) => setRole(itemValue)}
                  style={RegisterScreenStyles.picker}
                  enabled={!loading} // Su Android funziona correttamente qui
                >
                  <Picker.Item label="👤 Consumatore" value="customer" />
                  <Picker.Item label="🚗 Rider" value="rider" />
                </Picker>
              </View>
            </View>

            <View style={RegisterScreenStyles.inputGroup}>
              <Text style={RegisterScreenStyles.label}>🔒 Password</Text>
              <TextInput
                style={RegisterScreenStyles.input}
                placeholder="••••••"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
              />
            </View>

            <View style={RegisterScreenStyles.inputGroup}>
              <Text style={RegisterScreenStyles.label}>🔒 Conferma Password</Text>
              <TextInput
                style={RegisterScreenStyles.input}
                placeholder="••••••"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!loading}
              />
            </View>

            <TouchableOpacity
              style={[RegisterScreenStyles.button, loading && RegisterScreenStyles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={RegisterScreenStyles.buttonText}>🚀 Registrati</Text>
              )}
            </TouchableOpacity>

            <View style={RegisterScreenStyles.divider} />

            <TouchableOpacity
              style={RegisterScreenStyles.linkButton}
              onPress={() => navigation.navigate('Login')}
              disabled={loading}
            >
              <Text style={RegisterScreenStyles.linkText}>
                Hai già un account? <Text style={RegisterScreenStyles.linkBold}>Accedi</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Info */}
          <View style={RegisterScreenStyles.info}>
            <Text style={RegisterScreenStyles.infoText}>
              ✅ Registrazione standard: creerai un account cliente (o rider se abilitato)
            </Text>
            <Text style={RegisterScreenStyles.infoText}>
              ✅ I consumatori ordineranno da app mobile
            </Text>
            <Text style={RegisterScreenStyles.infoText}>
              ✅ I rider consegneranno ordini da app mobile
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Toast Custom */}
      {toast.visible && (
        <Animated.View
          style={[
            RegisterScreenStyles.toast,
            toast.type === 'success' && RegisterScreenStyles.toastSuccess,
            toast.type === 'warning' && RegisterScreenStyles.toastWarning,
            toast.type === 'error' && RegisterScreenStyles.toastError,
          ]}
        >
          <Text style={RegisterScreenStyles.toastText}>{toast.message}</Text>
        </Animated.View>
      )}
    </>
  );
}