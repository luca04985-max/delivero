import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const customerTicketsScreenStyles = StyleSheet.create({
  ...unifiedStyles,

  // fab: floating action button (CustomerTicketsScreen.js)
  fab: {
    position: 'absolute',
    bottom: mobileTheme.spacing[6],
    right: mobileTheme.spacing[5],
    width: 56,
    height: 56,
    borderRadius: BASE_SPACE * 3.500,
    backgroundColor: mobileTheme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...mobileTheme.shadows.xl,
    elevation: 8,
  },

  // fabText: testo FAB (CustomerTicketsScreen.js)
  fabText: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    lineHeight: FONT_SIZE_BASE * 1.750,
  },

  // orderInfo: box info ordine (CustomerTicketsScreen.js)
  orderInfo: {
    backgroundColor: mobileTheme.colors.secondarySoft,
    padding: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.secondary,
  },
  // orderLabel: label info ordine (CustomerTicketsScreen.js)
  orderLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.secondary,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    marginBottom: mobileTheme.spacing[1],
  },
});

export default customerTicketsScreenStyles;
