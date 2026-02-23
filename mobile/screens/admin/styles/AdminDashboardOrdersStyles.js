import { StyleSheet } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const adminDashboardOrderStyles = StyleSheet.create({
  ...unifiedStyles,

  // Orders specific styles
  ordersContainer: {
    padding: mobileTheme.spacing[4],
  },

  // Tab bar for order filtering
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
  tabButton: {
    flex: 1,
    paddingVertical: mobileTheme.spacing[3],
    alignItems: 'center',
    borderRadius: mobileTheme.borderRadius.lg,
    marginHorizontal: 1,
  },
  tabButtonActive: {
    backgroundColor: mobileTheme.colors.primary,
  },
  tabText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.secondary,
  },
  tabTextActive: {
    color: mobileTheme.colors.white,
    fontWeight: FONT_WEIGHTS.bold,
  },

  // Order status colors
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

  // Order details
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

  // Restaurant info
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

  // Order items
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

  // Special notes
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

  // Delivery info
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

  // Track button
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

  // Delivered state
  deliveredCard: {
    opacity: 0.7,
    backgroundColor: mobileTheme.colors.background,
  },
  deliveredStatus: {
    color: mobileTheme.colors.success,
  },

  // Empty state
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
});

export default adminDashboardOrderStyles;
