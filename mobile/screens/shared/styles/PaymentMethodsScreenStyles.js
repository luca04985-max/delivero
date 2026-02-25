import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const paymentMethodsScreenStyles = StyleSheet.create({
  // container: wrapper principale
  container: unifiedStyles.container,

  // card: contenitore informazioni
  card: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    margin: mobileTheme.spacing[5],
    ...mobileTheme.shadows.sm,
  },
  // title: titolo sezione
  title: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // subtitle: testo descrittivo
  subtitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
  },
});

export default paymentMethodsScreenStyles;
