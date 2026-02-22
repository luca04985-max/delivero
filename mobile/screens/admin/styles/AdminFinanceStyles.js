import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const adminFinanceStyles = StyleSheet.create({
  ...unifiedStyles,

  // Finance specific styles
  financeContainer: {
    padding: mobileTheme.spacing[4],
  },

  // Revenue cards
  revenueCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.medium,
    marginBottom: mobileTheme.spacing[4],
    borderLeftWidth: 5,
    borderLeftColor: mobileTheme.colors.success,
  },
  revenueTitle: {
    fontSize: mobileTheme.typography.fontSize.md,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[2],
  },
  revenueAmount: {
    fontSize: mobileTheme.typography.fontSize['3xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.success,
    marginBottom: mobileTheme.spacing[2],
  },
  revenuePeriod: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
  },

  // Payment breakdown
  paymentSection: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
    marginBottom: mobileTheme.spacing[4],
  },
  paymentTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  paymentMethod: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
  },
  paymentAmount: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.primary,
  },
  paymentCount: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // Monthly trends
  monthlySection: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
    marginBottom: mobileTheme.spacing[4],
  },
  monthlyTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
  },
  monthCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[2],
  },
  monthName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
  },
  monthRevenue: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.success,
  },
  monthOrders: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // Charts container
  chartContainer: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
    marginBottom: mobileTheme.spacing[4],
  },
  chartTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholderText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
  },

  // Summary cards
  summaryCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 4,
  },
  summaryCardOrders: {
    borderLeftColor: mobileTheme.colors.primary,
  },
  summaryCardServices: {
    borderLeftColor: mobileTheme.colors.warning,
  },
  summaryCardOther: {
    borderLeftColor: mobileTheme.colors.info,
  },
  summaryTitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[1],
  },
  summaryValue: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  summarySubtext: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    marginTop: mobileTheme.spacing[1],
  },

  // Currency formatting
  currency: {
    color: mobileTheme.colors.success,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },
  negativeCurrency: {
    color: mobileTheme.colors.error,
  },
});

export default adminFinanceStyles;
