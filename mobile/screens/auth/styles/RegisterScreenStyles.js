import { StyleSheet } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const RegisterScreenStyles = StyleSheet.create({
  ...unifiedStyles,

  // container: wrapper register (RegisterScreen.js)
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[5],
    justifyContent: 'center',
  },

  // keyboard: wrapper for KeyboardAvoidingView
  keyboard: {
    flex: 1,
  },

  // header: header logo/titoli (RegisterScreen.js)
  header: {
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[6],
  },

  // logo: icona/testo logo (RegisterScreen.js)
  logo: {
    fontSize: mobileTheme.typography.fontSize['4xl'],
    marginBottom: mobileTheme.spacing[3],
    color: mobileTheme.colors.primary,
    fontWeight: FONT_WEIGHTS.black,
  },

  // title: titolo register (RegisterScreen.js)
  title: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
    textAlign: 'center',
  },

  // subtitle: sottotitolo register (RegisterScreen.js)
  subtitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: mobileTheme.spacing[6],
  },

  // form: wrapper form registrazione (RegisterScreen.js)
  form: {
    width: '100%',
    maxWidth: 320,
  },

  // inputGroup: gruppo input (RegisterScreen.js)
  inputGroup: {
    marginBottom: mobileTheme.spacing[4],
  },

  // label: label input (RegisterScreen.js)
  label: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },

  // inputContainer: wrapper input (RegisterScreen.js)
  inputContainer: {
    marginBottom: mobileTheme.spacing[4],
  },

  // input: campo input (RegisterScreen.js)
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

  // inputFocused: stato focus input (RegisterScreen.js)
  inputFocused: {
    borderColor: mobileTheme.colors.primary,
    ...mobileTheme.shadows.md,
  },

  // pickerContainer: wrapper picker ruolo (RegisterScreen.js)
  pickerContainer: {
    backgroundColor: mobileTheme.colors.white,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    ...mobileTheme.shadows.sm,
  },

  // picker: componente picker ruolo (RegisterScreen.js)
  picker: {
    height: 50,
    color: mobileTheme.colors.text.primary,
  },

  // roleSelector: wrapper selezione ruolo (RegisterScreen.js)
  roleSelector: {
    marginBottom: mobileTheme.spacing[4],
  },

  // roleButton: bottone ruolo (RegisterScreen.js)
  roleButton: {
    backgroundColor: mobileTheme.colors.white,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[2],
    flexDirection: 'row',
    alignItems: 'center',
    ...mobileTheme.shadows.sm,
  },

  // roleButtonSelected: bottone ruolo attivo (RegisterScreen.js)
  roleButtonSelected: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },

  // roleButtonText: testo bottone ruolo (RegisterScreen.js)
  roleButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    fontWeight: FONT_WEIGHTS.medium,
    flex: 1,
  },

  // roleButtonSelectedText: testo ruolo attivo (RegisterScreen.js)
  roleButtonSelectedText: {
    color: mobileTheme.colors.white,
    fontWeight: FONT_WEIGHTS.bold,
  },

  // button: bottone registrazione (RegisterScreen.js)
  button: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[4],
    paddingHorizontal: mobileTheme.spacing[6],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
  },

  // buttonDisabled: stato disabilitato bottone (RegisterScreen.js)
  buttonDisabled: {
    backgroundColor: mobileTheme.colors.text.tertiary,
    ...mobileTheme.shadows.none,
  },

  // buttonText: testo bottone (RegisterScreen.js)
  buttonText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // divider: separatore (RegisterScreen.js)
  divider: {
    height: 1,
    backgroundColor: mobileTheme.colors.border,
    marginVertical: mobileTheme.spacing[4],
  },

  // linkButton: wrapper link login (RegisterScreen.js)
  linkButton: {
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
  },

  // linkText: testo link (RegisterScreen.js)
  linkText: {
    color: mobileTheme.colors.text.secondary,
    fontSize: mobileTheme.typography.fontSize.sm,
  },

  // linkBold: testo link evidenziato (RegisterScreen.js)
  linkBold: {
    color: mobileTheme.colors.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },

  // info: box info (RegisterScreen.js)
  info: {
    backgroundColor: mobileTheme.colors.primarySoft,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    marginTop: mobileTheme.spacing[4],
  },

  // infoText: testo info (RegisterScreen.js)
  infoText: {
    color: mobileTheme.colors.text.secondary,
    fontSize: mobileTheme.typography.fontSize.sm,
    marginBottom: mobileTheme.spacing[1],
  },

  // toast: container toast (RegisterScreen.js)
  toast: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    ...mobileTheme.shadows.lg,
  },

  // toastSuccess: stato toast success (RegisterScreen.js)
  toastSuccess: {
    backgroundColor: mobileTheme.colors.success,
  },

  // toastWarning: stato toast warning (RegisterScreen.js)
  toastWarning: {
    backgroundColor: mobileTheme.colors.warning,
  },

  // toastError: stato toast error (RegisterScreen.js)
  toastError: {
    backgroundColor: mobileTheme.colors.error,
  },

  // toastText: testo toast (RegisterScreen.js)
  toastText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.medium,
    textAlign: 'center',
  },

  // login: wrapper link login (RegisterScreen.js)
  login: {
    alignItems: 'center',
    marginTop: mobileTheme.spacing[6],
  },

  // loginText: testo link login (RegisterScreen.js)
  loginText: {
    color: mobileTheme.colors.text.secondary,
    fontSize: mobileTheme.typography.fontSize.sm,
  },

  // loginLink: link login evidenziato (RegisterScreen.js)
  loginLink: {
    color: mobileTheme.colors.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },
});

export default RegisterScreenStyles;
