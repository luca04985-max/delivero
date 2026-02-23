import { StyleSheet, Platform } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const customerOrdersScreenStyles = StyleSheet.create({
  ...unifiedStyles,

  // CONTAINER
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },

  // LOADING
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mobileTheme.colors.background,
  },
  loadingText: {
    marginTop: mobileTheme.spacing[4],
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
  },

  // EMPTY STATE
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mobileTheme.spacing[5],
    marginTop: mobileTheme.spacing[8],
  },
  emptyText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  emptySubtext: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'center',
  },

  // HEADER
  header: {
    backgroundColor: mobileTheme.colors.primary,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: mobileTheme.spacing[4],
    paddingHorizontal: mobileTheme.spacing[4],
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.white,
  },

  // STATUS TABS
  statusTabsContainer: {
    backgroundColor: mobileTheme.colors.background,
  },

  // ORDER CARD (from admin)
  card: {
    backgroundColor: mobileTheme.colors.white,
    marginHorizontal: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    elevation: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.primary,
  },
  orderId: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.white,
  },
  orderStatus: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
  },
  orderStatusText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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

  // ORDER TOTAL & DATE
  orderTotal: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.primary,
    textAlign: 'right',
    marginTop: mobileTheme.spacing[2],
  },
  orderDate: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[2],
  },

  // TRACK BUTTON (from admin)
  trackButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
    ...mobileTheme.shadows.medium,
  },
  trackButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
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
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginVertical: mobileTheme.spacing[2],
  },
  restaurantName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  restaurantAddress: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
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

  // DELIVERED STATE (from admin)
  deliveredCard: {
    opacity: 0.7,
    backgroundColor: mobileTheme.colors.background,
  },
  deliveredStatus: {
    color: mobileTheme.colors.success,
  },

  // STATUS SEPARATORS
  statusSeparator: {
    backgroundColor: mobileTheme.colors.background,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  statusSeparatorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Override specifici per CustomerOrders
  orderInfo: {
    paddingHorizontal: mobileTheme.spacing[4],
    paddingVertical: mobileTheme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
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
