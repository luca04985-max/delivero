import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const customerOrdersScreenStyles = StyleSheet.create({
  ...unifiedStyles,

  // Override specifici per CustomerOrders
  orderInfo: {
    paddingHorizontal: mobileTheme.spacing[4],
    paddingVertical: mobileTheme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },

  restaurantInfo: {
    marginTop: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[4],
  },

  restaurantName: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[2],
  },
  restaurantAddress: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[1],
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

  deliveryFee: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.success,
    fontWeight: mobileTheme.typography.fontWeight.medium,
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

  orderItems: {
    marginTop: mobileTheme.spacing[3],
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  itemQuantity: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginRight: mobileTheme.spacing[2],
    minWidth: 20,
  },
  itemName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
    flex: 1,
  },
  itemPrice: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.secondary,
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
