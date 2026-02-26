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
  // section: wrapper sezioni (cards/list)
  section: {
    marginTop: mobileTheme.spacing[4],
  },
  // actionRow: riga azione con label + controls
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  actionLabel: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
  },
  removeLabel: {
    color: mobileTheme.colors.error,
  },
  // addressInfo: container info indirizzo
  addressInfo: {
    flex: 1,
  },
  coordText: {
    color: mobileTheme.colors.text.secondary,
    fontSize: mobileTheme.typography.fontSize.xs,
  },
  // checkout button
  checkoutButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[2],
  },
  checkoutButtonText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },
  // modal styles
  modalOverlayBottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderTopLeftRadius: mobileTheme.borderRadius.lg,
    borderTopRightRadius: mobileTheme.borderRadius.lg,
  },
  modalTitle: {
    fontWeight: mobileTheme.typography.fontWeight.bold,
    marginBottom: mobileTheme.spacing[3],
    fontSize: mobileTheme.typography.fontSize.base,
  },
  input: {
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: mobileTheme.spacing[3],
  },
  // rowCenter: small helper for horizontal centered row
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default paymentMethodsScreenStyles;
