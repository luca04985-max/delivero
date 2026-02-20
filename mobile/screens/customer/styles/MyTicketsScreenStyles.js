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
  headerTitle: {
    fontSize: mobileTheme.typography.xl,
    fontWeight: 'bold',
    color: mobileTheme.colors.white,
  },
  newTicketButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.md,
    ...mobileTheme.shadows.small,
  },
  newTicketButtonText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.sm,
    fontWeight: 'bold',
  },

  // TICKET CARD
  ticketCard: {
    backgroundColor: mobileTheme.colors.white,
    marginHorizontal: mobileTheme.spacing[4],
    marginVertical: mobileTheme.spacing[2],
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.small,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  ticketTitle: {
    fontSize: mobileTheme.typography.lg,
    fontWeight: 'bold',
    color: mobileTheme.colors.text,
    flex: 1,
  },
  ticketId: {
    fontSize: mobileTheme.typography.sm,
    color: mobileTheme.colors.textSecondary,
    fontWeight: 'bold',
  },
  ticketDescription: {
    fontSize: mobileTheme.typography.md,
    color: mobileTheme.colors.text,
    marginBottom: mobileTheme.spacing[3],
    lineHeight: mobileTheme.typography.lh,
  },

  // ORDER INFO
  orderInfo: {
    backgroundColor: mobileTheme.colors.primaryLight,
    padding: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.primary,
  },
  orderLabel: {
    fontSize: mobileTheme.typography.sm,
    color: mobileTheme.colors.primary,
    fontWeight: 'bold',
    marginBottom: mobileTheme.spacing[1],
  },
  orderId: {
    fontSize: mobileTheme.typography.md,
    color: mobileTheme.colors.text,
    fontWeight: 'bold',
  },

  // TICKET FOOTER
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketDate: {
    fontSize: mobileTheme.typography.sm,
    color: mobileTheme.colors.textSecondary,
  },
  ticketStatus: {
    fontSize: mobileTheme.typography.sm,
    fontWeight: 'bold',
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
  },
  statusOpen: {
    backgroundColor: mobileTheme.colors.warningLight,
    color: mobileTheme.colors.warning,
  },
  statusInProgress: {
    backgroundColor: mobileTheme.colors.infoLight,
    color: mobileTheme.colors.info,
  },
  statusResolved: {
    backgroundColor: mobileTheme.colors.successLight,
    color: mobileTheme.colors.success,
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: mobileTheme.colors.white,
    margin: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
    padding: mobileTheme.spacing[4],
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  modalTitle: {
    fontSize: mobileTheme.typography.xl,
    fontWeight: 'bold',
    color: mobileTheme.colors.text,
  },
  closeButton: {
    fontSize: mobileTheme.typography.lg,
    color: mobileTheme.colors.textSecondary,
  },
  input: {
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[3],
    fontSize: mobileTheme.typography.md,
    marginBottom: mobileTheme.spacing[3],
    color: mobileTheme.colors.text,
  },
  inputLabel: {
    fontSize: mobileTheme.typography.md,
    fontWeight: 'bold',
    color: mobileTheme.colors.text,
    marginBottom: mobileTheme.spacing[1],
  },
  ticketTypeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: mobileTheme.spacing[3],
  },
  ticketTypeButton: {
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    marginRight: mobileTheme.spacing[2],
    marginBottom: mobileTheme.spacing[2],
  },
  ticketTypeButtonSelected: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  ticketTypeButtonText: {
    fontSize: mobileTheme.typography.sm,
  },
  ticketTypeButtonTextSelected: {
    color: mobileTheme.colors.white,
  },
  submitButton: {
    backgroundColor: mobileTheme.colors.primary,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    ...mobileTheme.shadows.small,
  },
  submitButtonText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.md,
    fontWeight: 'bold',
  },
});
