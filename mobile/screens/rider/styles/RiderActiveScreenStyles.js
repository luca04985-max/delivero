import { StyleSheet, Platform } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const riderActiveScreenStyles = StyleSheet.create({
  ...unifiedStyles,
  container: unifiedStyles.container,

  // header: wrapper header (RiderActiveScreen.js)
  header: {
    backgroundColor: mobileTheme.colors.secondary, // Navy profondo come RiderHomeScreen
    padding: mobileTheme.spacing[6],
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    borderBottomLeftRadius: mobileTheme.borderRadius.xl,
    borderBottomRightRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.medium,
  },
  // headerTitle: titolo header (RiderActiveScreen.js)
  headerTitle: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: FONT_WEIGHTS.black,
    letterSpacing: -0.5,
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
  // wazeButton: bottone apertura Waze (RiderActiveScreen.js)
  wazeButton: {
    backgroundColor: mobileTheme.colors.rider,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1,
    marginRight: mobileTheme.spacing[2],
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
  // actionButtonsRow: container for multiple action buttons
  actionButtonsRow: {
    flexDirection: 'row',
    flex: 1,
  },

  // Stili aggiuntivi per coerenza con RiderHomeScreen
  // loadingContainer: container loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mobileTheme.colors.background,
  },
  // activeCard: card ordine attivo con sfondo
  activeCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    marginHorizontal: mobileTheme.spacing[4],
    marginTop: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[2],
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // orderInfo: box info ordine
  orderInfo: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginTop: mobileTheme.spacing[3],
  },
  // contentPadding: padding per contentContainerStyle
  contentPadding: {
    padding: mobileTheme.spacing[4],
  },
  // emptyContainer: container per stato vuoto
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[8],
  },
  // emptyText: testo lista vuota
  emptyText: {
    textAlign: 'center',
    marginTop: mobileTheme.spacing[12],
    color: mobileTheme.colors.text.secondary,
  },
  // emptySubtext: sottotesto lista vuota
  emptySubtext: {
    textAlign: 'center',
    marginTop: mobileTheme.spacing[2],
    color: mobileTheme.colors.text.tertiary,
    fontSize: mobileTheme.typography.fontSize.sm,
  },
});

export default riderActiveScreenStyles;
