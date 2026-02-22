import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../theme';

export const loadingSpinnerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: mobileTheme.spacing[4],
  },
  spinner: {
    marginBottom: mobileTheme.spacing[3],
  },
  message: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    marginTop: mobileTheme.spacing[2],
  },
});

export default loadingSpinnerStyles;
