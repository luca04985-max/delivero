import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const riderTicketsScreenStyles = StyleSheet.create({
  // shared: base styles from unifiedStyles
  ...unifiedStyles,

  // container: wrapper principale (RiderTicketsScreen.js)
  container: unifiedStyles.container,
  // header: header lista ticket (RiderTicketsScreen.js)
  header: {
    ...unifiedStyles.header,
    padding: mobileTheme.spacing[5],
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  // title: titolo header (RiderTicketsScreen.js)
  title: unifiedStyles.title,

  // content: wrapper lista (RiderTicketsScreen.js)
  content: {
    flex: 1,
  },
  // listContent: padding lista (RiderTicketsScreen.js)
  listContent: {
    padding: mobileTheme.spacing[4],
    paddingBottom: 100, // Spazio per non coprire l'ultimo ticket con il FAB
  },
  // emptyContainer: stato vuoto (RiderTicketsScreen.js)
  emptyContainer: unifiedStyles.emptyContainer,
  // emptyText: testo stato vuoto (RiderTicketsScreen.js)
  emptyText: unifiedStyles.emptyText,
  // emptySubtext: sottotesto stato vuoto (RiderTicketsScreen.js)
  emptySubtext: unifiedStyles.emptySubtext,
  // loadingText: testo loading (RiderTicketsScreen.js)
  loadingText: unifiedStyles.loadingText,

  // statusSeparator: separatore stato (RiderTicketsScreen.js)
  statusSeparator: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    marginHorizontal: mobileTheme.spacing[4],
    marginVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.lg,
    borderLeftWidth: 4,
    ...mobileTheme.shadows.soft,
  },
  // statusSeparatorContent: contenuto separatore (RiderTicketsScreen.js)
  statusSeparatorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // statusSeparatorLeft: lato sinistro separatore (RiderTicketsScreen.js)
  statusSeparatorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  // statusSeparatorIcon: icona separatore (RiderTicketsScreen.js)
  statusSeparatorIcon: {
    fontSize: 20,
    marginRight: mobileTheme.spacing[2],
  },
  // statusSeparatorTitle: titolo separatore (RiderTicketsScreen.js)
  statusSeparatorTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  // statusSeparatorRight: lato destro separatore (RiderTicketsScreen.js)
  statusSeparatorRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // statusSeparatorCount: conteggio separatore (RiderTicketsScreen.js)
  statusSeparatorCount: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.secondary,
    marginRight: mobileTheme.spacing[2],
  },
  // statusSeparatorToggle: toggle separatore (RiderTicketsScreen.js)
  statusSeparatorToggle: {
    fontSize: 16,
  },

  // ticketCard: card ticket (RiderTicketsScreen.js)
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
  // headerCard: header card (RiderTicketsScreen.js)
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[3],
  },
  // titleCard: titolo card (RiderTicketsScreen.js)
  titleCard: {
    fontWeight: mobileTheme.typography.fontWeight.bold,
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    flex: 1,
    paddingRight: mobileTheme.spacing[3],
  },
  // ticketDescription: descrizione ticket (RiderTicketsScreen.js)
  ticketDescription: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[3],
    lineHeight: 20,
  },
  // statusBadge: badge stato (RiderTicketsScreen.js)
  statusBadge: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.full,
    minWidth: 80,
  },
  // statusText: testo badge stato (RiderTicketsScreen.js)
  statusText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    textAlign: 'center',
  },

  // orderInfo: box info ordine (RiderTicketsScreen.js)
  orderInfo: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginTop: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },
  // orderLabel: label ordine (RiderTicketsScreen.js)
  orderLabel: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[1],
    textTransform: 'uppercase',
  },
  // orderId: id ordine (RiderTicketsScreen.js)
  orderId: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  // orderDate: data ordine (RiderTicketsScreen.js)
  orderDate: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    marginBottom: mobileTheme.spacing[1],
  },
  // orderTotal: totale ordine (RiderTicketsScreen.js)
  orderTotal: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  // orderAddress: indirizzo ordine (RiderTicketsScreen.js)
  orderAddress: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
  },

  // responseBox: box risposta rider (RiderTicketsScreen.js)
  responseBox: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginTop: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.success,
  },
  // responseTitle: titolo risposta (RiderTicketsScreen.js)
  responseTitle: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.success,
    marginBottom: mobileTheme.spacing[2],
    textTransform: 'uppercase',
  },
  // responseText: testo risposta (RiderTicketsScreen.js)
  responseText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 18,
  },

  // ticketFooter: footer ticket (RiderTicketsScreen.js)
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
    paddingTop: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  // ticketDate: data ticket (RiderTicketsScreen.js)
  ticketDate: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
  },
  // ticketId: id ticket (RiderTicketsScreen.js)
  ticketId: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },

  // fab: floating action button (RiderTicketsScreen.js)
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
  // fabText: testo FAB (RiderTicketsScreen.js)
  fabText: {
    color: mobileTheme.colors.white,
    fontSize: 24,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    lineHeight: 24,
  },
});

export default riderTicketsScreenStyles;
