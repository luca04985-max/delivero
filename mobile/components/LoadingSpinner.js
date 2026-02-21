import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { mobileTheme } from '../theme';

/**
 * Componente Loading Spinner riutilizzabile
 * @param {Object} props - Props del componente
 * @param {boolean} props.loading - Stato di caricamento
 * @param {string} props.size - Dimensione dello spinner ('small', 'large')
 * @param {string} props.color - Colore dello spinner
 * @param {string} props.message - Messaggio opzionale da mostrare
 * @param {Object} props.style - Stile aggiuntivo per il container
 */
const LoadingSpinner = ({ 
  loading = true, 
  size = 'large', 
  color = mobileTheme.colors.primary,
  message = '',
  style = {}
}) => {
  if (!loading) return null;

  const getSize = () => {
    switch (size) {
      case 'small':
        return 'small';
      case 'large':
      default:
        return 'large';
    }
  };

  const spinnerStyle = [
    styles.container,
    style
  ];

  return (
    <View style={spinnerStyle}>
      <ActivityIndicator 
        size={getSize()} 
        color={color}
        style={styles.spinner}
      />
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: mobileTheme.spacing[4],
  },
  spinner: {
    marginBottom: mobileTheme.spacing[3],
  },
  message: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    marginTop: mobileTheme.spacing[2],
  },
});

export default LoadingSpinner;
