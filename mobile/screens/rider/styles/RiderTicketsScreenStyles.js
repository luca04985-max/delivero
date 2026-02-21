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
  content: {
    flex: 1,
  },
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
  emptySubtext: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: mobileTheme.spacing[2],
  },
  loadingText: {
    marginTop: mobileTheme.spacing[3],
    color: mobileTheme.colors.text.secondary,
  },

  // STATUS SEPARATORS
  statusSeparator: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    marginHorizontal: mobileTheme.spacing[4],
    marginVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.lg,
    borderLeftWidth: 4,
    ...mobileTheme.shadows.soft,
  },
  statusSeparatorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusSeparatorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusSeparatorIcon: {
    fontSize: 20,
    marginRight: mobileTheme.spacing[2],
  },
  statusSeparatorTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  statusSeparatorRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusSeparatorCount: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.secondary,
    marginRight: mobileTheme.spacing[2],
  },
  statusSeparatorToggle: {
    fontSize: 16,
  },

  // TICKET CARD
  ticketCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[3],
    marginHorizontal: mobileTheme.spacing[4],
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[3],
  },
  ticketTitle: {
    fontWeight: mobileTheme.typography.fontWeight.bold,
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    flex: 1,
    paddingRight: mobileTheme.spacing[3],
  },
  ticketDescription: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[3],
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.full,
    minWidth: 80,
  },
  statusText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    textAlign: 'center',
  },

  // ORDER INFO
  orderInfo: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginTop: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },
  orderLabel: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[1],
    textTransform: 'uppercase',
  },
  orderId: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  orderDate: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    marginBottom: mobileTheme.spacing[1],
  },
  orderTotal: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  orderAddress: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
  },

  // RESPONSE BOX
  responseBox: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginTop: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.success,
  },
  responseTitle: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.success,
    marginBottom: mobileTheme.spacing[2],
    textTransform: 'uppercase',
  },
  responseText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 18,
  },

  // TICKET FOOTER
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
    paddingTop: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  ticketDate: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
  },
  ticketId: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    fontWeight: mobileTheme.typography.fontWeight.bold,
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
  fabText: {
    color: mobileTheme.colors.white,
    fontSize: 24,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    lineHeight: 24,
  },
});

export default riderTicketsScreenStyles;