import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const riderActiveScreenStyles = StyleSheet.create({
  ...unifiedStyles,

  // Override specifici per RiderActive
  // HEADER
  header: {
    marginBottom: mobileTheme.spacing[4],
  },
  headerTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },

  // RIDER SPECIFIC BUTTONS
  btnPickup: {
    backgroundColor: '#FFA500',
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1,
    ...mobileTheme.shadows.sm,
  },
  btnTransit: {
    backgroundColor: '#0066FF',
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1,
    ...mobileTheme.shadows.sm,
  },
  btnComplete: {
    backgroundColor: '#28A745',
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1.5,
    ...mobileTheme.shadows.sm,
  },
  btnText: {
    color: mobileTheme.colors.white,
    textAlign: 'center',
    fontWeight: mobileTheme.typography.fontWeight.bold,
    fontSize: mobileTheme.typography.fontSize.xs,
  },

  // CUSTOMER INFO
  customerName: {
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  address: {
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[3],
  },

  // REFRESH CONTROL
  refreshContainer: {
    flex: 1,
  },
});

export default riderActiveScreenStyles;