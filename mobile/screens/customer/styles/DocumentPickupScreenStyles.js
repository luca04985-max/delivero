import { StyleSheet } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const documentPickupStyles = StyleSheet.create({
  ...unifiedStyles,
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.white,
    paddingBottom: mobileTheme.spacing[6],
  },
  title: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    padding: mobileTheme.spacing[4],
  },
  trackingCard: {
    marginHorizontal: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[4],
    padding: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.success + '20',
    borderRadius: mobileTheme.borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: mobileTheme.colors.success,
  },
  trackingSuccessText: {
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: mobileTheme.spacing[2],
  },
  trackingLabel: {
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[2],
  },
  trackingNumber: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.success,
  },
  trackingHelp: {
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[2],
    fontSize: mobileTheme.typography.fontSize.xs,
  },
  formContainer: {
    paddingHorizontal: mobileTheme.spacing[4],
  },
  label: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    marginBottom: mobileTheme.spacing[2],
  },
  documentOptionsWrapper: {
    marginBottom: mobileTheme.spacing[4],
  },
  documentOption: {
    padding: mobileTheme.spacing[3],
    marginBottom: mobileTheme.spacing[2],
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    backgroundColor: mobileTheme.colors.white,
  },
  documentOptionSelected: {
    borderColor: mobileTheme.colors.primary,
    backgroundColor: mobileTheme.colors.primarySoft,
  },
  documentOptionText: {
    color: mobileTheme.colors.text.primary,
    fontWeight: FONT_WEIGHTS.normal,
  },
  documentOptionTextSelected: {
    color: mobileTheme.colors.primary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  input: {
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[3],
    marginBottom: mobileTheme.spacing[4],
  },
  inputMultiline: {
    height: 80,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[5],
  },
  switchLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    marginRight: mobileTheme.spacing[2],
    flex: 1,
  },
  submitButton: {
    padding: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.primary,
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[5],
  },
  submitButtonText: {
    color: mobileTheme.colors.white,
    fontWeight: FONT_WEIGHTS.bold,
    fontSize: mobileTheme.typography.fontSize.md,
  },
});

export default documentPickupStyles;
import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const documentPickupScreenStyles = StyleSheet.create({
  // shared: base styles from unifiedStyles
  ...unifiedStyles,

  // header: titolo pagina (DocumentPickupScreen.js)
  header: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    padding: mobileTheme.spacing[4],
    color: mobileTheme.colors.text.primary,
  },

  // formSection: box sezione form (DocumentPickupScreen.js)
  formSection: {
    backgroundColor: mobileTheme.colors.white,
    margin: mobileTheme.spacing[4],
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[3],
    ...mobileTheme.shadows.sm,
  },
  // sectionTitle: titolo sezione form (DocumentPickupScreen.js)
  sectionTitle: unifiedStyles.sectionTitle,

  // documentTypeContainer: wrapper tipo documento (DocumentPickupScreen.js)
  documentTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: mobileTheme.spacing[2],
    marginBottom: mobileTheme.spacing[4],
  },
  // documentTypeButton: bottone tipo documento (DocumentPickupScreen.js)
  documentTypeButton: {
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.background,
  },
  // documentTypeButtonSelected: bottone tipo selezionato (DocumentPickupScreen.js)
  documentTypeButtonSelected: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  // documentTypeButtonText: testo tipo documento (DocumentPickupScreen.js)
  documentTypeButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  // documentTypeButtonTextSelected: testo tipo selezionato (DocumentPickupScreen.js)
  documentTypeButtonTextSelected: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },

  // input: campo input (DocumentPickupScreen.js)
  input: {
    ...unifiedStyles.input,
    backgroundColor: mobileTheme.colors.white,
    marginBottom: mobileTheme.spacing[3],
  },
  // textArea: textarea descrizione (DocumentPickupScreen.js)
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

  // switchContainer: wrapper switch (DocumentPickupScreen.js)
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  // switchLabel: label switch (DocumentPickupScreen.js)
  switchLabel: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
  },

  // trackingInfo: box tracking (DocumentPickupScreen.js)
  trackingInfo: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
  },
  // trackingNumber: numero tracking (DocumentPickupScreen.js)
  trackingNumber: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // trackingLabel: label tracking (DocumentPickupScreen.js)
  trackingLabel: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // submitButton: bottone submit (DocumentPickupScreen.js)
  submitButton: {
    padding: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.primary,
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[5],
    ...mobileTheme.shadows.medium,
  },
  // submitButtonText: testo bottone submit (DocumentPickupScreen.js)
  submitButtonText: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    fontSize: mobileTheme.typography.fontSize.base,
  },
  // submitButtonDisabled: stato disabilitato (DocumentPickupScreen.js)
  submitButtonDisabled: {
    backgroundColor: mobileTheme.colors.text.tertiary,
    ...mobileTheme.shadows.none,
  },

  // loadingContainer: wrapper loading (DocumentPickupScreen.js)
  loadingContainer: unifiedStyles.loadingContainer,
  // loadingText: testo loading (DocumentPickupScreen.js)
  loadingText: unifiedStyles.loadingText,
});

export default documentPickupScreenStyles;
