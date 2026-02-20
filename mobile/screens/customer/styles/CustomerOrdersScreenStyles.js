import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const customerOrdersScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },

  // HEADER
  header: {
    backgroundColor: mobileTheme.colors.secondary,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: mobileTheme.spacing[4],
    borderBottomLeftRadius: mobileTheme.borderRadius.xl,
    borderBottomRightRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.medium,
  },
  headerContent: {
    paddingHorizontal: mobileTheme.spacing[5],
  },
  title: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.white,
    letterSpacing: -0.5,
  },

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
  orderCard: {
    flexDirection: 'row',
    backgroundColor: mobileTheme.colors.white,
    marginHorizontal: mobileTheme.spacing[5],
    marginTop: -20,
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: mobileTheme.spacing[3],
    alignItems: 'center',
    borderRadius: mobileTheme.borderRadius.lg,
  },
  tabButtonActive: {
    backgroundColor: mobileTheme.colors.primary,
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
  tabText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.secondary,
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

  statusSeparator: {
    backgroundColor: mobileTheme.colors.white,
    marginHorizontal: mobileTheme.spacing[4],
    marginVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: mobileTheme.colors.primary,
    ...mobileTheme.shadows.soft,
  },

  statusSeparatorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: mobileTheme.spacing[4],
  },

  statusSeparatorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  statusSeparatorIcon: {
    fontSize: mobileTheme.typography.fontSize.lg,
    marginRight: mobileTheme.spacing[3],
  },

  statusSeparatorTitle: {
    fontSize: mobileTheme.typography.fontSize.md,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
  },

  statusSeparatorRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusSeparatorCount: {
    fontSize: mobileTheme.typography.fontSize.md,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginRight: mobileTheme.spacing[2],
    backgroundColor: mobileTheme.colors.background,
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
    minWidth: 24,
    textAlign: 'center',
  },

  statusSeparatorToggle: {
    fontSize: mobileTheme.typography.fontSize.md,
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },

  // ORDERS LIST
  ordersList: {
    flex: 1,
    padding: mobileTheme.spacing[5],
  },
  orderCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[3],
  },
  orderId: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.secondary,
  },
  orderStatus: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: 4,
    borderRadius: mobileTheme.borderRadius.full,
    backgroundColor: mobileTheme.colors.successBg,
  },
  orderStatusText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.success,
    textTransform: 'uppercase',
  },
  orderInfo: {
    flex: 1,
  },
  orderDate: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[2],
  },
  orderTotal: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
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

  // ACTION BUTTONS
  trackButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
    ...mobileTheme.shadows.medium,
  },

  createTicketButton: {
    backgroundColor: mobileTheme.colors.warning,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: mobileTheme.spacing[2],
  },
  trackButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // EMPTY STATES
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[4],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mobileTheme.spacing[5],
  },
  emptyText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 22,
  }
});

export default customerOrdersScreenStyles;
