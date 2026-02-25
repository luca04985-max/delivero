import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { mobileTheme } from '../theme';
import { loadingSpinnerStyles } from './styles/LoadingSpinnerStyles';

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
  style = {},
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

  const spinnerStyle = [loadingSpinnerStyles.container, style];

  return (
    <View style={spinnerStyle}>
      <ActivityIndicator size={getSize()} color={color} style={loadingSpinnerStyles.spinner} />
      {message && <Text style={loadingSpinnerStyles.message}>{message}</Text>}
    </View>
  );
};

export default LoadingSpinner;
