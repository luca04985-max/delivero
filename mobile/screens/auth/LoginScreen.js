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
import { authAPI } from '../../services/api';
// AsyncStorage imported previously but not used in this screen
import LoginScreenStyles from './styles/LoginScreenStyles.js';
import { mobileTheme } from '../../theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: '' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: '' });
    }, 10000); // Aumentato da 3000 a 5000ms
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('⚠️ Compila tutti i campi', 'warning');
      return;
    }

    setLoading(true);
    try {
      // Add timeout for Render cold start handling
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Server slow to respond - try again')), 45000),
      );

      const response = await Promise.race([authAPI.login(email, password), timeoutPromise]);

      // Breve pausa per permettere al listener di AsyncStorage di rilevare il cambio
      setTimeout(() => {
        showToast(`✅ Benvenuto ${response.user.name}!`, 'success');
      }, 100);
    } catch (error) {
      const message =
        error.message === 'Server slow to respond - try again'
          ? 'Server in avvio, riprova tra 30 secondi (Render cold start)'
          : error.message || 'Credenziali non valide';
      showToast(`❌ ${message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={LoginScreenStyles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={LoginScreenStyles.container}>
          {/* Header */}
          <View style={LoginScreenStyles.header}>
            <Text style={LoginScreenStyles.logo}>🚀</Text>
            <Text style={LoginScreenStyles.title}>Delivero</Text>
            <Text style={LoginScreenStyles.subtitle}>Accedi al tuo account</Text>
          </View>

          {/* Form */}
          <View style={LoginScreenStyles.form}>
            <View style={LoginScreenStyles.inputGroup}>
              <Text style={LoginScreenStyles.label}>📧 Email</Text>
              <TextInput
                style={LoginScreenStyles.input}
                placeholder="tuoemail@example.com"
                placeholderTextColor={mobileTheme.colors.text.tertiary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
            </View>

            <View style={LoginScreenStyles.inputGroup}>
              <Text style={LoginScreenStyles.label}>🔒 Password</Text>
              <TextInput
                style={LoginScreenStyles.input}
                placeholder="•••••••"
                placeholderTextColor={mobileTheme.colors.text.tertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
              />
            </View>

            <TouchableOpacity
              style={[LoginScreenStyles.button, loading && LoginScreenStyles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={mobileTheme.colors.white} />
              ) : (
                <Text style={LoginScreenStyles.buttonText}>🚀 Accedi</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 8 }} onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={LoginScreenStyles.linkText}>Password dimenticata?</Text>
            </TouchableOpacity>

            {/* Toast Custom */}
            {toast.visible && (
              <Animated.View
                style={[
                  LoginScreenStyles.toast,
                  toast.type === 'success' && LoginScreenStyles.toastSuccess,
                  toast.type === 'warning' && LoginScreenStyles.toastWarning,
                  toast.type === 'error' && LoginScreenStyles.toastError,
                ]}
              >
                <Text style={LoginScreenStyles.toastText}>{toast.message}</Text>
              </Animated.View>
            )}

            <View style={LoginScreenStyles.divider} />

            <TouchableOpacity
              style={LoginScreenStyles.linkButton}
              onPress={() => navigation.navigate('Register')}
              disabled={loading}
            >
              <Text style={LoginScreenStyles.linkText}>
                Non hai un account? <Text style={LoginScreenStyles.linkBold}>Registrati</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Info */}
          <View style={LoginScreenStyles.info}>
            <Text style={LoginScreenStyles.infoTitle}>💡 Demo Account</Text>
            <Text style={LoginScreenStyles.infoText}>
              👤 Customer: demo.customer@delivero.local / 123456
            </Text>
            <Text style={LoginScreenStyles.infoText}>
              🚗 Rider: demo.rider@delivero.local / 123456
            </Text>
            <Text style={LoginScreenStyles.infoText}>
              👨‍💼 Manager: demo.manager@delivero.local / 123456
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
