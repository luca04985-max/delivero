import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { authAPI } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        setTimeout(() => reject(new Error('Server slow to respond - try again')), 45000)
      );

      const response = await Promise.race([
        authAPI.login(email, password),
        timeoutPromise
      ]);

      // Breve pausa per permettere al listener di AsyncStorage di rilevare il cambio
      setTimeout(() => {
        showToast(`✅ Benvenuto ${response.user.name}!`, 'success');
      }, 100);
    } catch (error) {
      const message = error.message === 'Server slow to respond - try again'
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
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>🚀</Text>
            <Text style={styles.title}>Delivero</Text>
            <Text style={styles.subtitle}>Accedi al tuo account</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>📧 Email</Text>
              <TextInput
                style={styles.input}
                placeholder="tuoemail@example.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>🔒 Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>🚀 Accedi</Text>
              )}
            </TouchableOpacity>

            {/* Toast Custom */}
            {toast.visible && (
              <Animated.View
                style={[
                  styles.toast,
                  toast.type === 'success' && styles.toastSuccess,
                  toast.type === 'warning' && styles.toastWarning,
                  toast.type === 'error' && styles.toastError,
                ]}
              >
                <Text style={styles.toastText}>{toast.message}</Text>
              </Animated.View>
            )}

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate('Register')}
              disabled={loading}
            >
              <Text style={styles.linkText}>
                Non hai un account? <Text style={styles.linkBold}>Registrati</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Info */}
          <View style={styles.info}>
            <Text style={styles.infoTitle}>💡 Demo Account</Text>
            <Text style={styles.infoText}>👤 Customer: demo.customer@delivero.local / 123456</Text>
            <Text style={styles.infoText}>🚗 Rider: demo.rider@delivero.local / 123456</Text>
            <Text style={styles.infoText}>👨‍💼 Manager: demo.manager@delivero.local / 123456</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  button: {
    backgroundColor: '#FF6B00',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginVertical: 20,
  },
  linkButton: {
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#666',
  },
  linkBold: {
    color: '#FF6B00',
    fontWeight: '600',
  },
  info: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B00',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    fontWeight: '500',
  },
  toast: {
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  toastSuccess: {
    backgroundColor: '#4CAF50',
  },
  toastWarning: {
    backgroundColor: '#FF9800',
  },
  toastError: {
    backgroundColor: '#F44336',
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
