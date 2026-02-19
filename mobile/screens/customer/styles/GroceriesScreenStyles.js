import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const groceriesScreenStyles = StyleSheet.create({
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
  
  // CATEGORIES
  categoriesContainer: {
    paddingHorizontal: mobileTheme.spacing[5],
    marginBottom: mobileTheme.spacing[4],
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '30%',
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[3],
    alignItems: 'center',
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  categoryEmoji: {
    fontSize: 28,
    marginBottom: mobileTheme.spacing[2],
  },
  categoryName: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    textAlign: 'center',
  },
  
  // PRODUCTS LIST
  productsList: {
    flex: 1,
    paddingHorizontal: mobileTheme.spacing[5],
  },
  productCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: mobileTheme.borderRadius.md,
    backgroundColor: mobileTheme.colors.background,
    marginRight: mobileTheme.spacing[4],
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: 2,
  },
  productDescription: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 16,
  },
  productPrice: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
  },
  addButton: {
    backgroundColor: mobileTheme.colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: mobileTheme.spacing[3],
  },
  addButtonText: {
    color: mobileTheme.colors.white,
    fontSize: 18,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },
  
  // CART SUMMARY
  cartSummary: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.xl,
    padding: mobileTheme.spacing[5],
    marginTop: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  summaryTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  summaryLabel: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
  },
  summaryValue: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  totalLabel: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  totalValue: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.primary,
  },
  checkoutButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
    shadowColor: mobileTheme.colors.primary,
  },
  checkoutButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.black,
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

export default groceriesScreenStyles;
