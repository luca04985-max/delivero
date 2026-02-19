import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const customerTicketsScreenStyles = StyleSheet.create({
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

  // TICKETS LIST
  ticketsList: {
    flex: 1,
    padding: mobileTheme.spacing[5],
  },
  ticketCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[4],
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
  ticketId: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.secondary,
  },
  ticketStatus: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: 4,
    borderRadius: mobileTheme.borderRadius.full,
    backgroundColor: mobileTheme.colors.warningBg,
  },
  ticketStatusText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.warning,
    textTransform: 'uppercase',
  },
  ticketStatusResolved: {
    backgroundColor: mobileTheme.colors.successBg,
  },
  ticketStatusResolvedText: {
    color: mobileTheme.colors.success,
  },
  ticketTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  ticketType: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[2],
  },
  ticketDescription: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 20,
    marginBottom: mobileTheme.spacing[3],
  },

  // RESPONSE BOX
  responseBox: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.success,
  },
  responseTitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.success,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  responseText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 18,
  },

  // ACTION BUTTONS
  actionButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    ...mobileTheme.shadows.medium,
    shadowColor: mobileTheme.colors.primary,
  },
  actionButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // FAB BUTTON
  fab: {
    position: 'absolute',
    bottom: mobileTheme.spacing[6],
    right: mobileTheme.spacing[5],
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: mobileTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...mobileTheme.shadows.xl,
    elevation: 8,
  },
  fabText: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    lineHeight: 28,
  },

  // NEW TICKET FORM
  newTicketForm: {
    backgroundColor: mobileTheme.colors.white,
    margin: mobileTheme.spacing[4],
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.medium,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  formTitle: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
  },
  label: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  ticketTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: mobileTheme.spacing[2],
    marginBottom: mobileTheme.spacing[4],
  },
  ticketTypeButton: {
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[3],
  },
  ticketTypeButtonActive: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  ticketTypeText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.primary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  ticketTypeTextActive: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
  },
  input: {
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[3],
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    gap: mobileTheme.spacing[3],
    marginTop: mobileTheme.spacing[4],
  },
  button: {
    flex: 1,
    paddingVertical: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  cancelButtonText: {
    color: mobileTheme.colors.text.secondary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  createButton: {
    backgroundColor: mobileTheme.colors.primary,
    ...mobileTheme.shadows.medium,
  },
  createButtonText: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.bold,
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
  emptySubtext: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: mobileTheme.spacing[2],
  },
});

export default customerTicketsScreenStyles;
