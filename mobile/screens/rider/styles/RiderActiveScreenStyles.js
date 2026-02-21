import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const riderActiveScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
  },
  header: {
    marginBottom: mobileTheme.spacing[4],
  },
  headerTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },

  // ACTIVE ORDER CARD
  activeCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[4],
    borderLeftWidth: 5,
    borderLeftColor: mobileTheme.colors.primary,
    ...mobileTheme.shadows.sm,
  },
  statusBadge: {
    backgroundColor: mobileTheme.colors.background,
    alignSelf: 'flex-start',
    padding: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
    fontSize: mobileTheme.typography.fontSize.xs,
    marginBottom: mobileTheme.spacing[3],
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.secondary,
  },
  customerName: {
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  address: {
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[3],
  },

  // BUTTONS ROW
  row: {
    flexDirection: 'row',
    marginTop: mobileTheme.spacing[4],
    justifyContent: 'space-between',
    gap: mobileTheme.spacing[2],
  },
  btnPickup: {
    backgroundColor: '#FFA500',
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1,
    ...mobileTheme.shadows.sm,
  },
  btnTransit: {
    backgroundColor: '#0066FF',
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1,
    ...mobileTheme.shadows.sm,
  },
  btnComplete: {
    backgroundColor: '#28A745',
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1.5,
    ...mobileTheme.shadows.sm,
  },
  btnText: {
    color: mobileTheme.colors.white,
    textAlign: 'center',
    fontWeight: mobileTheme.typography.fontWeight.bold,
    fontSize: mobileTheme.typography.fontSize.xs,
  },

  // EMPTY STATE
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[16],
  },
  emptyText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: mobileTheme.spacing[2],
    fontStyle: 'italic',
  },

  // REFRESH CONTROL
  refreshContainer: {
    flex: 1,
  },
});

export default riderActiveScreenStyles;