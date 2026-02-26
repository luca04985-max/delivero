import React, { useEffect, useRef, useCallback } from 'react';
import { Text, Animated } from 'react-native';
import { mobileTheme } from '../theme';

/**
 * Componente Toast Notification riutilizzabile
 * @param {Object} props - Props del componente
 * @param {boolean} props.visible - Visibilità del toast
 * @param {string} props.message - Messaggio da mostrare
 * @param {string} props.type - Tipo di toast (success, error, warning, info)
 * @param {Function} props.onHide - Callback quando il toast si nasconde
 * @param {number} props.duration - Durata visibilità in ms (default 3000)
 */
const ToastNotification = ({ visible, message, type = 'info', onHide, duration = 3000 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const hideToast = useCallback(() => {
    // Animazione di uscita
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onHide) onHide();
    });
  }, [onHide, fadeAnim, slideAnim]);

  useEffect(() => {
    if (visible) {
      // Animazione di entrata
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-hide dopo duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, hideToast, fadeAnim, slideAnim]);

  if (!visible) return null;

  // Determina il colore in base al tipo
  const getToastColor = () => {
    switch (type) {
      case 'success':
        return mobileTheme.colors.success;
      case 'error':
        return mobileTheme.colors.error;
      case 'warning':
        return mobileTheme.colors.warning;
      case 'info':
      default:
        return mobileTheme.colors.primary;
    }
  };

  // Determina l'icona in base al tipo
  const getToastIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  const toastStyle = {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: getToastColor(),
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: fadeAnim,
    transform: [{ translateY: slideAnim }],
    ...mobileTheme.shadows.medium,
    zIndex: 1000,
  };

  const iconStyle = {
    fontSize: 20,
    marginRight: mobileTheme.spacing[3],
  };

  const messageStyle = {
    flex: 1,
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.white,
    lineHeight: 20,
  };

  return (
    <Animated.View style={toastStyle}>
      <Text style={iconStyle}>{getToastIcon()}</Text>
      <Text style={messageStyle}>{message}</Text>
    </Animated.View>
  );
};

export default ToastNotification;
