import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';

export const createTicketScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },
  
  // HEADER
  header: {
    backgroundColor: mobileTheme.colors.secondary,
    paddingTop: 60,
    paddingBottom: mobileTheme.spacing[4],
    paddingHorizontal: mobileTheme.spacing[5],
    borderBottomLeftRadius: mobileTheme.borderRadius.xl,
    borderBottomRightRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[3],
  },
  backButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.white,
  },
  title: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.white,
    letterSpacing: -0.5,
    flex: 1,
    textAlign: 'center',
    marginRight: mobileTheme.spacing[8], // Compensa il pulsante indietro
  },

  // CONTENT
  content: {
    flex: 1,
    padding: mobileTheme.spacing[5],
  },

  // FORM
  formGroup: {
    marginBottom: mobileTheme.spacing[6],
  },
  label: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  ticketTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: mobileTheme.spacing[3],
  },
  ticketTypeButton: {
    backgroundColor: mobileTheme.colors.white,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    ...mobileTheme.shadows.sm,
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
    backgroundColor: mobileTheme.colors.white,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[4],
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    ...mobileTheme.shadows.sm,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  // SUBMIT BUTTON
  submitButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
  },
  submitButtonDisabled: {
    backgroundColor: mobileTheme.colors.text.tertiary,
    ...mobileTheme.shadows.none,
  },
  submitButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },
});
