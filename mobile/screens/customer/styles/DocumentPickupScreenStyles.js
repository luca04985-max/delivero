import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';

export const documentPickupScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },
  
  // INLINE STYLES FROM DocumentPickupScreen.js
  header: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    padding: mobileTheme.spacing[4],
    color: mobileTheme.colors.text.primary,
  },
  
  // FORM SECTIONS
  formSection: {
    backgroundColor: mobileTheme.colors.white,
    margin: mobileTheme.spacing[4],
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[3],
    ...mobileTheme.shadows.sm,
  },
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  
  // DOCUMENT TYPE SELECTOR
  documentTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: mobileTheme.spacing[2],
    marginBottom: mobileTheme.spacing[4],
  },
  documentTypeButton: {
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.background,
  },
  documentTypeButtonSelected: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  documentTypeButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  documentTypeButtonTextSelected: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  
  // INPUTS
  input: {
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[3],
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    backgroundColor: mobileTheme.colors.white,
    marginBottom: mobileTheme.spacing[3],
  },
  textArea: {
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[3],
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    backgroundColor: mobileTheme.colors.white,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: mobileTheme.spacing[3],
  },
  
  // SWITCH
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  switchLabel: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
  },
  
  // TRACKING INFO
  trackingInfo: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
  },
  trackingNumber: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  trackingLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  
  // SUBMIT BUTTON
  submitButton: {
    padding: mobileTheme.spacing[4],
    backgroundColor: '#007AFF',
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[5],
    ...mobileTheme.shadows.medium,
  },
  submitButtonText: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    fontSize: mobileTheme.typography.base,
  },
  submitButtonDisabled: {
    backgroundColor: mobileTheme.colors.text.tertiary,
    ...mobileTheme.shadows.none,
  },
  
  // LOADING
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: mobileTheme.spacing[5],
  },
  loadingText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[2],
  },
});

export default documentPickupScreenStyles;
