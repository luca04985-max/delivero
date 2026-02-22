import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const adminMetricsStyles = StyleSheet.create({
  ...unifiedStyles,

  // Metrics specific styles
  metricsContainer: {
    padding: mobileTheme.spacing[4],
  },

  // Service cards
  serviceCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
    marginBottom: mobileTheme.spacing[4],
    borderLeftWidth: 5,
  },
  pharmacyCard: {
    borderLeftColor: mobileTheme.colors.primary,
  },
  transportCard: {
    borderLeftColor: mobileTheme.colors.success,
  },
  documentCard: {
    borderLeftColor: mobileTheme.colors.warning,
  },
  billsCard: {
    borderLeftColor: mobileTheme.colors.info,
  },
  foodCard: {
    borderLeftColor: mobileTheme.colors.error,
  },
  packageCard: {
    borderLeftColor: mobileTheme.colors.secondary,
  },

  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  serviceIcon: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    marginRight: mobileTheme.spacing[3],
  },
  serviceTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  serviceValue: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  serviceSubtext: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[1],
  },
  serviceRevenue: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.success,
  },

  // Performance metrics
  performanceSection: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
    marginBottom: mobileTheme.spacing[4],
  },
  performanceTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
  },
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: mobileTheme.spacing[4],
  },
  performanceItem: {
    flex: 1,
    alignItems: 'center',
    padding: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
    marginHorizontal: mobileTheme.spacing[1],
  },
  performanceValue: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  performanceLabel: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
  },

  // User activity
  userSection: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
    marginBottom: mobileTheme.spacing[4],
  },
  userTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: mobileTheme.spacing[4],
  },
  userStatItem: {
    alignItems: 'center',
  },
  userStatValue: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  userStatLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
  },

  // Progress bars
  progressContainer: {
    marginBottom: mobileTheme.spacing[3],
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  progressLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  progressValue: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: mobileTheme.colors.primary,
  },
  progressFillSuccess: {
    backgroundColor: mobileTheme.colors.success,
  },
  progressFillWarning: {
    backgroundColor: mobileTheme.colors.warning,
  },
  progressFillError: {
    backgroundColor: mobileTheme.colors.error,
  },

  // Status indicators
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: mobileTheme.spacing[2],
    marginTop: mobileTheme.spacing[3],
  },
  statusBadge: {
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.full,
    backgroundColor: mobileTheme.colors.background,
  },
  statusBadgeActive: {
    backgroundColor: mobileTheme.colors.successBg,
  },
  statusBadgeInactive: {
    backgroundColor: mobileTheme.colors.errorBg,
  },
  statusBadgePending: {
    backgroundColor: mobileTheme.colors.warningBg,
  },
  statusText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.secondary,
  },
  statusTextActive: {
    color: mobileTheme.colors.success,
  },
  statusTextInactive: {
    color: mobileTheme.colors.error,
  },
  statusTextPending: {
    color: mobileTheme.colors.warning,
  },

  // Charts placeholder
  chartSection: {
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
});

export default adminMetricsStyles;
