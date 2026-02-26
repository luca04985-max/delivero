import { StyleSheet } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const LoginScreenStyles = StyleSheet.create({
  ...unifiedStyles,

  // container: wrapper login (LoginScreen.js)
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

  // header: header logo/titoli (LoginScreen.js)
  header: {
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[8],
  },

  // logo: icona/testo logo (LoginScreen.js)
  logo: {
    fontSize: mobileTheme.typography.fontSize['4xl'],
    marginBottom: mobileTheme.spacing[3],
    color: mobileTheme.colors.primary,
    fontWeight: FONT_WEIGHTS.black,
  },

  // title: titolo login (LoginScreen.js)
  title: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
    textAlign: 'center',
  },

  // subtitle: sottotitolo login (LoginScreen.js)
  subtitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: mobileTheme.spacing[6],
  },

  // form: wrapper form login (LoginScreen.js)
  form: {
    width: '100%',
    maxWidth: 320,
  },

  // inputGroup: gruppo input (LoginScreen.js)
  inputGroup: {
    marginBottom: mobileTheme.spacing[4],
  },

  // label: label input (LoginScreen.js)
  label: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },

  // input: campo input (LoginScreen.js)
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

  // inputFocused: stato focus input (LoginScreen.js)
  inputFocused: {
    borderColor: mobileTheme.colors.primary,
    ...mobileTheme.shadows.md,
  },

  // button: bottone login (LoginScreen.js)
  button: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[4],
    paddingHorizontal: mobileTheme.spacing[6],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
  },

  // buttonDisabled: stato disabilitato bottone (LoginScreen.js)
  buttonDisabled: {
    backgroundColor: mobileTheme.colors.text.tertiary,
    ...mobileTheme.shadows.none,
  },

  // buttonText: testo bottone (LoginScreen.js)
  buttonText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // divider: separatore (LoginScreen.js)
  divider: {
    height: 1,
    backgroundColor: mobileTheme.colors.border,
    marginVertical: mobileTheme.spacing[4],
  },

  // linkButton: wrapper link registrazione (LoginScreen.js)
  linkButton: {
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
  },

  // linkText: testo link (LoginScreen.js)
  linkText: {
    color: mobileTheme.colors.text.secondary,
    fontSize: mobileTheme.typography.fontSize.sm,
  },

  // linkBold: testo link evidenziato (LoginScreen.js)
  linkBold: {
    color: mobileTheme.colors.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },

  // info: box info (LoginScreen.js)
  info: {
    backgroundColor: mobileTheme.colors.primarySoft,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    marginTop: mobileTheme.spacing[4],
  },

  // infoTitle: titolo info (LoginScreen.js)
  infoTitle: {
    color: mobileTheme.colors.text.primary,
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: mobileTheme.spacing[2],
  },

  // infoText: testo info (LoginScreen.js)
  infoText: {
    color: mobileTheme.colors.text.secondary,
    fontSize: mobileTheme.typography.fontSize.sm,
    marginBottom: mobileTheme.spacing[1],
  },

  // toast: container toast (LoginScreen.js)
  toast: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    ...mobileTheme.shadows.lg,
  },

  // toastSuccess: stato toast success (LoginScreen.js)
  toastSuccess: {
    backgroundColor: mobileTheme.colors.success,
  },

  // toastWarning: stato toast warning (LoginScreen.js)
  toastWarning: {
    backgroundColor: mobileTheme.colors.warning,
  },

  // toastError: stato toast error (LoginScreen.js)
  toastError: {
    backgroundColor: mobileTheme.colors.error,
  },

  // toastText: testo toast (LoginScreen.js)
  toastText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.medium,
    textAlign: 'center',
  },

  // forgotPassword: wrapper link password (LoginScreen.js)
  forgotPassword: {
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
  },

  // forgotPasswordText: testo link password (LoginScreen.js)
  forgotPasswordText: {
    color: mobileTheme.colors.primary,
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.medium,
  },

  // signup: wrapper link signup (LoginScreen.js)
  signup: {
    alignItems: 'center',
    marginTop: mobileTheme.spacing[6],
  },

  // signupText: testo signup (LoginScreen.js)
  signupText: {
    color: mobileTheme.colors.text.secondary,
    fontSize: mobileTheme.typography.fontSize.sm,
  },

  // signupLink: link signup evidenziato (LoginScreen.js)
  signupLink: {
    color: mobileTheme.colors.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },
});

export default LoginScreenStyles;
