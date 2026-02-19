import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const riderTicketsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },
  header: {
    backgroundColor: mobileTheme.colors.secondary, // Navy
    padding: mobileTheme.spacing[5],
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    borderBottomLeftRadius: mobileTheme.borderRadius.xl,
    borderBottomRightRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.medium,
  },
  title: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    letterSpacing: -0.5,
  },

  // LISTA & EMPTY STATE
  listContent: {
    padding: mobileTheme.spacing[4],
    paddingBottom: 100, // Spazio per non coprire l'ultimo ticket con il FAB
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'center',
  },

  // TICKET CARD
  ticketCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[3],
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  ticketTitle: {
    fontWeight: mobileTheme.typography.fontWeight.bold,
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    paddingRight: 80, // Spazio per lo status badge
  },
  ticketStatus: {
    position: 'absolute',
    top: mobileTheme.spacing[4],
    right: mobileTheme.spacing[4],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: mobileTheme.borderRadius.full,
    overflow: 'hidden',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  statusOpen: {
    backgroundColor: mobileTheme.colors.warningBg || '#FFFBEB',
    color: mobileTheme.colors.warning || '#D97706',
  },
  statusResolved: {
    backgroundColor: mobileTheme.colors.successBg || '#F0FDF4',
    color: mobileTheme.colors.success || '#16A34A',
  },

  // RESPONSE BOX (Il feedback dell'Admin)
  responseBox: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginTop: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.success,
  },
  responseTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: mobileTheme.colors.success,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  responseText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 18,
  },

  // FAB (Action Button)
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: mobileTheme.colors.primary, // Usiamo l'Arancione per farlo risaltare sul Navy
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    ...mobileTheme.shadows.xl,
    elevation: 8,
  },

  // MODAL FORM
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end', // Il modal sale dal basso come un "action sheet"
  },
  modalContent: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[6],
    borderTopLeftRadius: mobileTheme.borderRadius.xxl,
    borderTopRightRadius: mobileTheme.borderRadius.xxl,
    width: '100%',
  },
  input: {
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[3],
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  }
});

export default riderTicketsScreenStyles;