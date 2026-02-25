import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../theme';

export const loadingSpinnerStyles = StyleSheet.create({
  // container: wrapper spinner (LoadingSpinner.js)
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: mobileTheme.spacing[4],
  },
  // spinner: area spinner (LoadingSpinner.js)
  spinner: {
    marginBottom: mobileTheme.spacing[3],
  },
  // message: testo messaggio (LoadingSpinner.js)
  message: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    marginTop: mobileTheme.spacing[2],
  },
});

export default loadingSpinnerStyles;
