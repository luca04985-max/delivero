import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';

export const createTicketScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },

  // TOAST NOTIFICATIONS
  toast: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    zIndex: 1000,
    ...mobileTheme.shadows.medium,
  },
  toastText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    textAlign: 'center',
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
  },
  contentContainer: {
    padding: mobileTheme.spacing[5],
  },

  // ORDER INFO
  orderInfo: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.sm,
  },
  orderInfoTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  orderInfoText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.primary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    marginBottom: mobileTheme.spacing[1],
  },
  orderInfoSubtext: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
  },

  // SECTIONS
  section: {
    marginBottom: mobileTheme.spacing[6],
  },
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },

  // TICKET TYPES
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
  ticketTypeButtonSelected: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  ticketTypeButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.primary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  ticketTypeButtonTextSelected: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
  },

  // INPUTS
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
  charCount: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'right',
    marginTop: mobileTheme.spacing[2],
    fontStyle: 'italic',
  },

  // ORDER SELECTION (Legacy - mantenuto per compatibilità)
  orderSummary: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  orderTitle: {
    fontSize: mobileTheme.typography.fontSize.md,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  orderStatus: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  removeOrderButton: {
    alignSelf: 'flex-start',
    paddingVertical: mobileTheme.spacing[2],
    paddingHorizontal: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.error,
    borderRadius: mobileTheme.borderRadius.sm,
  },
  removeOrderText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  selectOrderButton: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    borderWidth: 2,
    borderColor: mobileTheme.colors.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  selectOrderText: {
    fontSize: mobileTheme.typography.fontSize.md,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  helperText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
    fontStyle: 'italic',
  },

  // FORM GROUPS (Legacy)
  formGroup: {
    marginBottom: mobileTheme.spacing[6],
  },
  label: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
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

export default createTicketScreenStyles;
