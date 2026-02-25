import React from 'react';
import { View, Text } from 'react-native';
import { paymentMethodsScreenStyles } from './styles/PaymentMethodsScreenStyles';

export default function PaymentMethodsScreen() {
  return (
    <View style={paymentMethodsScreenStyles.container}>
      <View style={paymentMethodsScreenStyles.card}>
        <Text style={paymentMethodsScreenStyles.title}>💳 Metodi di pagamento</Text>
        <Text style={paymentMethodsScreenStyles.subtitle}>
          Al momento non hai metodi salvati.
        </Text>
      </View>
    </View>
  );
}
