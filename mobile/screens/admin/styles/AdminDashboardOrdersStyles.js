import { StyleSheet } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const adminDashboardOrderStyles = StyleSheet.create({
  ...unifiedStyles,

  // ordersContainer: wrapper lista ordini
  ordersContainer: {
    padding: mobileTheme.spacing[4],
  },

  // tabBar: filtro ordini
  tabBar: {
    flexDirection: 'row',
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.sm,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // tabButton: pill tab filtro
  tabButton: {
    flex: 1,
    paddingVertical: mobileTheme.spacing[3],
    alignItems: 'center',
    borderRadius: mobileTheme.borderRadius.lg,
    marginHorizontal: BASE_SPACE * 0.125,
  },
  // tabButtonActive: tab attivo
  tabButtonActive: {
    backgroundColor: mobileTheme.colors.secondary,
  },
  // tabText: testo tab
  tabText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.secondary,
  },
  // tabTextActive: testo tab attivo
  tabTextActive: {
    color: mobileTheme.colors.white,
    fontWeight: FONT_WEIGHTS.bold,
  },

  // statusPending: stato in attesa
  statusPending: {
    backgroundColor: mobileTheme.colors.warningBg,
    color: mobileTheme.colors.warning,
  },
  // statusConfirmed: stato confermato
  statusConfirmed: {
    backgroundColor: mobileTheme.colors.secondarySoft,
    color: mobileTheme.colors.secondary,
  },
  // statusPreparing: stato in preparazione
  statusPreparing: {
    backgroundColor: mobileTheme.colors.secondarySoft,
    color: mobileTheme.colors.secondary,
  },
  // statusReady: stato pronto
  statusReady: {
    backgroundColor: mobileTheme.colors.successBg,
    color: mobileTheme.colors.success,
  },
  // statusPickup: stato ritiro
  statusPickup: {
    backgroundColor: mobileTheme.colors.background,
    color: mobileTheme.colors.secondary,
  },
  // statusInTransit: stato in transito
  statusInTransit: {
    backgroundColor: mobileTheme.colors.secondarySoft,
    color: mobileTheme.colors.secondary,
  },
  // statusDelivered: stato consegnato
  statusDelivered: {
    backgroundColor: mobileTheme.colors.successBg,
    color: mobileTheme.colors.success,
  },
  // statusCancelled: stato annullato
  statusCancelled: {
    backgroundColor: mobileTheme.colors.errorBg,
    color: mobileTheme.colors.error,
  },

  // orderDetails: dettaglio ordine
  orderDetails: {
    marginTop: mobileTheme.spacing[3],
    paddingTop: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  // orderDetailRow: riga dettaglio
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  // orderDetailLabel: label dettaglio
  orderDetailLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  // orderDetailValue: valore dettaglio
  orderDetailValue: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
  },

  // restaurantInfo: box info ristorante
  restaurantInfo: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginVertical: mobileTheme.spacing[2],
  },
  // restaurantName: nome ristorante
  restaurantName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  // restaurantAddress: indirizzo ristorante
  restaurantAddress: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // orderItems: lista prodotti ordine
  orderItems: {
    marginTop: mobileTheme.spacing[3],
  },
  // orderItem: riga prodotto ordine
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
    padding: mobileTheme.spacing[2],
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.sm,
  },
  // itemQuantity: quantità prodotto
  itemQuantity: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginRight: mobileTheme.spacing[2],
    minWidth: 20,
    textAlign: 'center',
  },
  // itemName: nome prodotto
  itemName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
    flex: 1,
  },
  // itemPrice: prezzo prodotto
  itemPrice: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.secondary,
  },

  // specialNotes: note speciali
  specialNotes: {
    backgroundColor: mobileTheme.colors.warningBg,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginVertical: mobileTheme.spacing[2],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.warning,
  },
  // specialNotesTitle: titolo note speciali
  specialNotesTitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.warning,
    marginBottom: mobileTheme.spacing[1],
  },
  // specialNotesText: testo note speciali
  specialNotesText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // deliveryInfo: box info consegna
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
    padding: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
  },
  // deliveryTime: tempo consegna
  deliveryTime: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  // deliveryAddress: indirizzo consegna
  deliveryAddress: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    flex: 1,
    marginLeft: mobileTheme.spacing[2],
  },

  // trackButton: CTA tracking ordine
  trackButton: {
    ...unifiedStyles.trackButton,
    marginTop: mobileTheme.spacing[3],
  },
  // trackButtonText: testo CTA tracking
  trackButtonText: unifiedStyles.trackButtonText,

  // deliveredCard: card ordine consegnato
  deliveredCard: {
    opacity: 0.7,
    backgroundColor: mobileTheme.colors.background,
  },
  // deliveredStatus: testo stato consegnato
  deliveredStatus: {
    color: mobileTheme.colors.success,
  },

  // emptyContainer: stato vuoto ordini
  emptyContainer: unifiedStyles.emptyContainer,
  // emptyText: testo stato vuoto
  emptyText: unifiedStyles.emptyText,
  // emptySubtext: sottotesto stato vuoto
  emptySubtext: unifiedStyles.emptySubtext,
});

export default adminDashboardOrderStyles;
