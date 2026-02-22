import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const adminDashboardUsersStyles = StyleSheet.create({
  ...unifiedStyles,

  // Users specific styles
  usersContainer: {
    padding: mobileTheme.spacing[4],
  },

  // User role colors
  roleCustomer: {
    borderLeftColor: mobileTheme.colors.primary,
  },
  roleRider: {
    borderLeftColor: mobileTheme.colors.success,
  },
  roleManager: {
    borderLeftColor: mobileTheme.colors.warning,
  },
  roleAdmin: {
    borderLeftColor: mobileTheme.colors.error,
  },

  // User card
  userCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[3],
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: mobileTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: mobileTheme.spacing[3],
  },
  avatarText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  userEmail: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[1],
  },
  userRole: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    backgroundColor: mobileTheme.colors.primaryLight,
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  userStatus: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[1],
  },

  // User stats
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: mobileTheme.spacing[3],
    paddingTop: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  userStat: {
    alignItems: 'center',
  },
  userStatValue: {
    fontSize: mobileTheme.typography.fontSize.md,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  userStatLabel: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
  },

  // User actions
  userActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
    gap: mobileTheme.spacing[2],
  },
  editButton: {
    backgroundColor: mobileTheme.colors.primarySoft,
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: mobileTheme.colors.error,
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: mobileTheme.colors.text.tertiary,
    opacity: 0.5,
  },
  buttonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
  },

  // Role badge
  roleBadge: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  roleBadgeCustomer: {
    backgroundColor: mobileTheme.colors.primaryBg,
  },
  roleBadgeRider: {
    backgroundColor: mobileTheme.colors.successBg,
  },
  roleBadgeManager: {
    backgroundColor: mobileTheme.colors.warningBg,
  },
  roleBadgeAdmin: {
    backgroundColor: mobileTheme.colors.errorBg,
  },
  roleText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    textTransform: 'uppercase',
  },

  // User details
  userDetails: {
    marginTop: mobileTheme.spacing[3],
    paddingTop: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  detailLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  detailValue: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.primary,
  },

  // Activity indicator
  activityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: mobileTheme.spacing[2],
  },
  activityActive: {
    backgroundColor: mobileTheme.colors.success,
  },
  activityInactive: {
    backgroundColor: mobileTheme.colors.text.tertiary,
  },

  // Last seen
  lastSeen: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    marginTop: mobileTheme.spacing[1],
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

  // Search/filter
  searchContainer: {
    padding: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  searchInput: {
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[3],
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
  },
  searchIcon: {
    position: 'absolute',
    right: mobileTheme.spacing[3],
    top: mobileTheme.spacing[3],
    color: mobileTheme.colors.text.tertiary,
  },

  // Filter pills
  filterContainer: {
    flexDirection: 'row',
    padding: mobileTheme.spacing[4],
    gap: mobileTheme.spacing[2],
  },
  filterPill: {
    backgroundColor: mobileTheme.colors.background,
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.full,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  filterPillActive: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  filterText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  filterTextActive: {
    color: mobileTheme.colors.white,
  },

  // User creation date
  createdDate: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    marginTop: mobileTheme.spacing[1],
  },
  createdDateLabel: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
    marginRight: mobileTheme.spacing[1],
  },
});

export default adminDashboardUsersStyles;
