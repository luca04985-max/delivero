import { StyleSheet, Platform } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const customerOrdersScreenStyles = StyleSheet.create({
  ...unifiedStyles,

  // STATUS TABS
  statusTabsContainer: {
    backgroundColor: mobileTheme.colors.background,
  },

  // ORDER DETAILS (from admin)
  orderDetails: {
    marginTop: mobileTheme.spacing[3],
    paddingTop: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  orderDetailLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  orderDetailValue: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
  },

  // STATUS COLORS (from admin)
  statusPending: {
    backgroundColor: mobileTheme.colors.warningBg,
    color: mobileTheme.colors.warning,
  },
  statusConfirmed: {
    backgroundColor: mobileTheme.colors.infoBg,
    color: mobileTheme.colors.info,
  },
  statusPreparing: {
    backgroundColor: mobileTheme.colors.primaryBg,
    color: mobileTheme.colors.primary,
  },
  statusReady: {
    backgroundColor: mobileTheme.colors.successBg,
    color: mobileTheme.colors.success,
  },
  statusPickup: {
    backgroundColor: mobileTheme.colors.secondaryBg,
    color: mobileTheme.colors.secondary,
  },
  statusInTransit: {
    backgroundColor: mobileTheme.colors.infoBg,
    color: mobileTheme.colors.info,
  },
  statusDelivered: {
    backgroundColor: mobileTheme.colors.successBg,
    color: mobileTheme.colors.success,
  },
  statusCancelled: {
    backgroundColor: mobileTheme.colors.errorBg,
    color: mobileTheme.colors.error,
  },

  // RESTAURANT INFO (from admin)
  restaurantInfo: {
    backgroundColor: mobileTheme.colors.primaryLight,
    padding: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },
  restaurantLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    marginBottom: mobileTheme.spacing[1],
  },
  restaurantName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[1],
  },

  // ORDER ITEMS (from admin)
  orderItems: {
    marginTop: mobileTheme.spacing[3],
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
    padding: mobileTheme.spacing[2],
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.sm,
  },
  itemQuantity: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginRight: mobileTheme.spacing[2],
    minWidth: 20,
    textAlign: 'center',
  },
  itemName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
    flex: 1,
  },
  itemPrice: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.secondary,
  },
  itemsTitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  moreItems: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
    fontStyle: 'italic',
    marginTop: mobileTheme.spacing[1],
  },

  // SPECIAL NOTES (from admin)
  specialNotes: {
    backgroundColor: mobileTheme.colors.warningBg,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginVertical: mobileTheme.spacing[2],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.warning,
  },
  specialNotesTitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.warning,
    marginBottom: mobileTheme.spacing[1],
  },
  specialNotesText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // DELIVERY INFO (from admin)
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
    padding: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
  },
  deliveryTime: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  deliveryAddress: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    flex: 1,
    marginLeft: mobileTheme.spacing[2],
  },
  deliveryFee: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.success,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },

  deliveredStatus: {
    color: mobileTheme.colors.success,
  },

  // Override specifici per CustomerOrders
  orderInfo: {
    backgroundColor: mobileTheme.colors.primaryLight,
    padding: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },

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

  separatorTitle: {
    fontSize: mobileTheme.typography.fontSize.md,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    marginRight: mobileTheme.spacing[2],
  },

  separatorSubtitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.white,
    opacity: 0.9,
    flex: 1,
    paddingHorizontal: mobileTheme.spacing[4],
  },

  ordersList: {
    flex: 1,
    padding: mobileTheme.spacing[5],
  },

  notesSection: {
    marginTop: mobileTheme.spacing[3],
    padding: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },

  notesTitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[1],
  },

  notesText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 18,
  },

  cancelSelectButton: {
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.sm,
    backgroundColor: mobileTheme.colors.error,
  },

  cancelSelectText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },

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

  createTicketButton: {
    backgroundColor: mobileTheme.colors.warning,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: mobileTheme.spacing[2],
  },
});

export default customerOrdersScreenStyles;
