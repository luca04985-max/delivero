import { StyleSheet, Platform } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const customerOrdersScreenStyles = StyleSheet.create({
  ...unifiedStyles,

  // statusTabsContainer: wrapper tabs di stato (CustomerOrdersScreen.js)
  statusTabsContainer: {
    backgroundColor: mobileTheme.colors.background,
  },

  // orderDetails: box dettagli ordine (CustomerOrdersScreen.js)
  orderDetails: {
    marginTop: mobileTheme.spacing[3],
    paddingTop: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  // orderDetailRow: riga label/valore (CustomerOrdersScreen.js)
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  // orderDetailLabel: label dettaglio (CustomerOrdersScreen.js)
  orderDetailLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  // orderDetailValue: valore dettaglio (CustomerOrdersScreen.js)
  orderDetailValue: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
  },

  // statusPending: stato pending (CustomerOrdersScreen.js)
  statusPending: {
    backgroundColor: mobileTheme.colors.warningBg,
    color: mobileTheme.colors.warning,
  },
  // statusConfirmed: stato confirmed (CustomerOrdersScreen.js)
  statusConfirmed: {
    backgroundColor: mobileTheme.colors.primarySoft,
    color: mobileTheme.colors.primary,
  },
  // statusPreparing: stato preparing (CustomerOrdersScreen.js)
  statusPreparing: {
    backgroundColor: mobileTheme.colors.primarySoft,
    color: mobileTheme.colors.primary,
  },
  // statusReady: stato ready (CustomerOrdersScreen.js)
  statusReady: {
    backgroundColor: mobileTheme.colors.successBg,
    color: mobileTheme.colors.success,
  },
  // statusPickup: stato pickup (CustomerOrdersScreen.js)
  statusPickup: {
    backgroundColor: mobileTheme.colors.background,
    color: mobileTheme.colors.secondary,
  },
  // statusInTransit: stato in transit (CustomerOrdersScreen.js)
  statusInTransit: {
    backgroundColor: mobileTheme.colors.primarySoft,
    color: mobileTheme.colors.primary,
  },
  // statusDelivered: stato delivered (CustomerOrdersScreen.js)
  statusDelivered: {
    backgroundColor: mobileTheme.colors.successBg,
    color: mobileTheme.colors.success,
  },
  // statusCancelled: stato cancelled (CustomerOrdersScreen.js)
  statusCancelled: {
    backgroundColor: mobileTheme.colors.errorBg,
    color: mobileTheme.colors.error,
  },

  // restaurantInfo: box info ristorante (CustomerOrdersScreen.js)
  restaurantInfo: {
    backgroundColor: mobileTheme.colors.primarySoft,
    padding: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },
  // restaurantLabel: label ristorante (CustomerOrdersScreen.js)
  restaurantLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    marginBottom: mobileTheme.spacing[1],
  },
  // restaurantName: nome ristorante (CustomerOrdersScreen.js)
  restaurantName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[1],
  },

  // orderItems: wrapper lista items (CustomerOrdersScreen.js)
  orderItems: {
    marginTop: mobileTheme.spacing[3],
  },
  // orderItem: riga item ordine (CustomerOrdersScreen.js)
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
    padding: mobileTheme.spacing[2],
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.sm,
  },
  // itemQuantity: quantità item (CustomerOrdersScreen.js)
  itemQuantity: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginRight: mobileTheme.spacing[2],
    minWidth: 20,
    textAlign: 'center',
  },
  // itemName: nome item (CustomerOrdersScreen.js)
  itemName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
    flex: 1,
  },
  // itemPrice: prezzo item (CustomerOrdersScreen.js)
  itemPrice: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.secondary,
  },
  // itemsTitle: titolo sezione items (CustomerOrdersScreen.js)
  itemsTitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // moreItems: testo "altri items" (CustomerOrdersScreen.js)
  moreItems: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
    fontStyle: 'italic',
    marginTop: mobileTheme.spacing[1],
  },

  // specialNotes: box note speciali (CustomerOrdersScreen.js)
  specialNotes: {
    backgroundColor: mobileTheme.colors.warningBg,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginVertical: mobileTheme.spacing[2],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.warning,
  },
  // specialNotesTitle: titolo note (CustomerOrdersScreen.js)
  specialNotesTitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.warning,
    marginBottom: mobileTheme.spacing[1],
  },
  // specialNotesText: testo note (CustomerOrdersScreen.js)
  specialNotesText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // deliveryInfo: box info consegna (CustomerOrdersScreen.js)
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
    padding: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
  },
  // deliveryTime: tempo consegna (CustomerOrdersScreen.js)
  deliveryTime: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  // deliveryAddress: indirizzo consegna (CustomerOrdersScreen.js)
  deliveryAddress: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    flex: 1,
    marginLeft: mobileTheme.spacing[2],
  },
  // deliveryFee: costo consegna (CustomerOrdersScreen.js)
  deliveryFee: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.success,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },

  // deliveredStatus: colore testo delivered (CustomerOrdersScreen.js)
  deliveredStatus: {
    color: mobileTheme.colors.success,
  },

  // orderInfo: override info ordine (CustomerOrdersScreen.js)
  orderInfo: {
    backgroundColor: mobileTheme.colors.primarySoft,
    padding: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },

  // separatorBadge: badge separatore (CustomerOrdersScreen.js)
  separatorBadge: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    backgroundColor: mobileTheme.colors.white,
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
    marginLeft: mobileTheme.spacing[2],
  },

  // separatorHeader: header separatore gruppo (CustomerOrdersScreen.js)
  separatorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: mobileTheme.spacing[4],
    paddingVertical: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.primary,
    borderBottomLeftRadius: mobileTheme.borderRadius.lg,
    borderBottomRightRadius: mobileTheme.borderRadius.lg,
  },

  // separatorTitle: titolo separatore (CustomerOrdersScreen.js)
  separatorTitle: {
    fontSize: mobileTheme.typography.fontSize.md,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    marginRight: mobileTheme.spacing[2],
  },

  // separatorSubtitle: sottotitolo separatore (CustomerOrdersScreen.js)
  separatorSubtitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.white,
    opacity: 0.9,
    flex: 1,
    paddingHorizontal: mobileTheme.spacing[4],
  },

  // ordersList: padding lista ordini (CustomerOrdersScreen.js)
  ordersList: {
    flex: 1,
    padding: mobileTheme.spacing[5],
  },

  // notesSection: box note ordine (CustomerOrdersScreen.js)
  notesSection: {
    marginTop: mobileTheme.spacing[3],
    padding: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },

  // notesTitle: titolo note (CustomerOrdersScreen.js)
  notesTitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[1],
  },

  // notesText: testo note (CustomerOrdersScreen.js)
  notesText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 18,
  },

  // cancelSelectButton: bottone annulla selezione (CustomerOrdersScreen.js)
  cancelSelectButton: {
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.sm,
    backgroundColor: mobileTheme.colors.error,
  },

  // cancelSelectText: testo bottone annulla (CustomerOrdersScreen.js)
  cancelSelectText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },

  // selectOrderOverlay: overlay selezione ordine (CustomerOrdersScreen.js)
  selectOrderOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // selectOrderText: badge selezione (CustomerOrdersScreen.js)
  selectOrderText: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    backgroundColor: mobileTheme.colors.success,
    width: 30,
    height: 30,
    borderRadius: 15,
    textAlign: 'center',
    lineHeight: 30,
  },

  // createTicketButton: bottone crea ticket (CustomerOrdersScreen.js)
  createTicketButton: {
    backgroundColor: mobileTheme.colors.warning,
  },

  // buttonRow: riga bottoni (CustomerOrdersScreen.js)
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: mobileTheme.spacing[2],
  },
});

export default customerOrdersScreenStyles;
