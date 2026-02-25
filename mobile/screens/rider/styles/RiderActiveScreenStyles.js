import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const riderActiveScreenStyles = StyleSheet.create({
  ...unifiedStyles,

  // header: wrapper header (RiderActiveScreen.js)
  header: {
    marginBottom: mobileTheme.spacing[4],
  },
  // headerTitle: titolo header (RiderActiveScreen.js)
  headerTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },

  // btnPickup: bottone ritiro (RiderActiveScreen.js)
  btnPickup: {
    backgroundColor: mobileTheme.colors.warning,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1,
    ...mobileTheme.shadows.sm,
  },
  // btnTransit: bottone in transito (RiderActiveScreen.js)
  btnTransit: {
    backgroundColor: mobileTheme.colors.accent,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1,
    ...mobileTheme.shadows.sm,
  },
  // btnComplete: bottone completato (RiderActiveScreen.js)
  btnComplete: {
    backgroundColor: mobileTheme.colors.success,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1.5,
    ...mobileTheme.shadows.sm,
  },
  // btnText: testo bottoni (RiderActiveScreen.js)
  btnText: {
    color: mobileTheme.colors.white,
    textAlign: 'center',
    fontWeight: mobileTheme.typography.fontWeight.bold,
    fontSize: mobileTheme.typography.fontSize.xs,
  },

  // customerName: nome cliente (RiderActiveScreen.js)
  customerName: {
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // address: indirizzo cliente (RiderActiveScreen.js)
  address: {
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[3],
  },

  // refreshContainer: wrapper refresh (RiderActiveScreen.js)
  refreshContainer: {
    flex: 1,
  },
});

export default riderActiveScreenStyles;
