import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const adminDashboardTicketsStyles = StyleSheet.create({
  ...unifiedStyles,

  // Tickets specific styles
  ticketsContainer: {
    padding: mobileTheme.spacing[4],
  },

  // Ticket status colors
  statusOpen: {
    backgroundColor: mobileTheme.colors.successBg,
    color: mobileTheme.colors.success,
  },
  statusInProgress: {
    backgroundColor: mobileTheme.colors.warningBg,
    color: mobileTheme.colors.warning,
  },
  statusClosed: {
    backgroundColor: mobileTheme.colors.text.tertiary,
    color: mobileTheme.colors.text.secondary,
  },
  statusResolved: {
    backgroundColor: mobileTheme.colors.primaryBg,
    color: mobileTheme.colors.primary,
  },

  // Priority colors
  priorityHigh: {
    backgroundColor: mobileTheme.colors.errorBg,
    color: mobileTheme.colors.error,
  },
  priorityMedium: {
    backgroundColor: mobileTheme.colors.warningBg,
    color: mobileTheme.colors.warning,
  },
  priorityLow: {
    backgroundColor: mobileTheme.colors.infoBg,
    color: mobileTheme.colors.info,
  },

  // Ticket details
  ticketMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[2],
  },
  ticketType: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  ticketDate: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
  },

  // Order info in ticket
  orderInfo: {
    backgroundColor: mobileTheme.colors.primaryLight,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },
  orderLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    marginBottom: mobileTheme.spacing[1],
  },
  orderId: {
    fontSize: mobileTheme.typography.fontSize.md,
    color: mobileTheme.colors.text,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },

  // User info
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
    padding: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
  },
  userName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  userEmail: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // Priority badge
  priorityBadge: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: mobileTheme.spacing[2],
  },
  priorityText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
  },

  // Description
  descriptionContainer: {
    marginBottom: mobileTheme.spacing[3],
  },
  descriptionText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    lineHeight: 22,
  },

  // Actions
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
  },
  actionButton: {
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[3],
    alignItems: 'center',
    minWidth: 80,
  },
  actionButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
  },

  // Status indicators
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[2],
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: mobileTheme.spacing[2],
  },
  statusDotOpen: {
    backgroundColor: mobileTheme.colors.success,
  },
  statusDotInProgress: {
    backgroundColor: mobileTheme.colors.warning,
  },
  statusDotClosed: {
    backgroundColor: mobileTheme.colors.text.tertiary,
  },
  statusDotResolved: {
    backgroundColor: mobileTheme.colors.primary,
  },

  // Timestamps
  timestampContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[2],
    paddingTop: mobileTheme.spacing[2],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  timestamp: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
  },
  createdTimestamp: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
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

  // Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[8],
  },
  loadingText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[4],
  },
});

export default adminDashboardTicketsStyles;
