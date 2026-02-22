import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const customerTicketsScreenStyles = StyleSheet.create({
  ...unifiedStyles,

  // Override specifici per CustomerTickets
  // FAB BUTTON
  fab: {
    position: 'absolute',
    bottom: mobileTheme.spacing[6],
    right: mobileTheme.spacing[5],
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: mobileTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...mobileTheme.shadows.xl,
    elevation: 8,
  },

  fabText: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    lineHeight: 28,
  },

  // ORDER INFO SPECIFIC
  orderInfo: {
    backgroundColor: mobileTheme.colors.primaryLight,
    padding: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },
  orderLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    marginBottom: mobileTheme.spacing[1],
  },
});

export default customerTicketsScreenStyles;
