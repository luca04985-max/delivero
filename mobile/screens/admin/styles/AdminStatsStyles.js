import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const adminStatsStyles = StyleSheet.create({
  ...unifiedStyles,

  // Stats specific styles
  statsContainer: {
    padding: mobileTheme.spacing[4],
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: mobileTheme.spacing[4],
  },
  statCard: {
    backgroundColor: mobileTheme.colors.white,
    width: '48%',
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
    ...mobileTheme.shadows.medium,
    borderTopWidth: 4,
  },
  statIcon: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    marginBottom: mobileTheme.spacing[2],
  },
  statValue: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  statLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  statSubtext: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: mobileTheme.spacing[1],
  },

  // Color variants for different stat types
  usersCard: {
    borderTopColor: mobileTheme.colors.primary,
  },
  ordersCard: {
    borderTopColor: mobileTheme.colors.success,
  },
  revenueCard: {
    borderTopColor: mobileTheme.colors.warning,
  },
  servicesCard: {
    borderTopColor: mobileTheme.colors.info,
  },
  ticketsCard: {
    borderTopColor: mobileTheme.colors.error,
  },
  performanceCard: {
    borderTopColor: mobileTheme.colors.secondary,
  },

  // Detailed stats sections
  detailedSection: {
    backgroundColor: mobileTheme.colors.white,
    margin: mobileTheme.spacing[4],
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
  },
  detailedTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
  },
  detailedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  detailedLabel: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
  },
  detailedValue: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
  },

  // Progress indicators
  progressBar: {
    height: 8,
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.sm,
    overflow: 'hidden',
    marginTop: mobileTheme.spacing[2],
  },
  progressFill: {
    height: '100%',
    backgroundColor: mobileTheme.colors.primary,
  },

  // Trend indicators
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[2],
  },
  trendIcon: {
    fontSize: mobileTheme.typography.fontSize.sm,
    marginRight: mobileTheme.spacing[1],
  },
  trendText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  trendUp: {
    color: mobileTheme.colors.success,
  },
  trendDown: {
    color: mobileTheme.colors.error,
  },
  trendNeutral: {
    color: mobileTheme.colors.text.secondary,
  },
});

export default adminStatsStyles;
