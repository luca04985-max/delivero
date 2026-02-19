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
  
  // TABS
  tabsContainer: {
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
  tabText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.secondary,
  },
  tabTextActive: {
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
  
  // ACTION BUTTONS
  trackButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
    shadowColor: mobileTheme.colors.primary,
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
  },
});

export default customerOrdersScreenStyles;
