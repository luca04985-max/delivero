import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const myTicketsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },

  // HEADER
  header: {
    backgroundColor: mobileTheme.colors.secondary, // Navy profondo
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: mobileTheme.spacing[4],
    paddingHorizontal: mobileTheme.spacing[5],
    borderBottomLeftRadius: mobileTheme.borderRadius.xl,
    borderBottomRightRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.medium,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.white,
    letterSpacing: -0.5,
  },
  newTicketButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
  },
  newTicketText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },

  // TICKET CARDS
  ticketsList: {
    padding: mobileTheme.spacing[5],
  },
  ticketCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[5],
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[3],
  },
  ticketTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    flex: 1,
    marginRight: mobileTheme.spacing[3],
  },
  ticketDate: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  ticketDescription: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 20,
    marginBottom: mobileTheme.spacing[3],
  },

  // STATUS BADGES
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  statusBadge: {
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.full,
    marginRight: mobileTheme.spacing[2],
  },
  statusOpen: {
    backgroundColor: mobileTheme.colors.success,
  },
  statusClosed: {
    backgroundColor: mobileTheme.colors.text.tertiary,
  },
  statusText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },

  // ACTIONS
  actionButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[3],
  },
  actionButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },

  // LOADING STATES
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

  // EMPTY STATE
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mobileTheme.spacing[5],
  },
  emptyText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: mobileTheme.spacing[4],
  },
  emptySubtext: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'center',
  },
});

export default myTicketsScreenStyles;
