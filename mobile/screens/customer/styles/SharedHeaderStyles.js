import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const sharedHeaderStyles = StyleSheet.create({
  // HEADER PRINCIPALE - Uguale per tutti gli screen customer
  header: {
    backgroundColor: mobileTheme.colors.secondary, // Navy profondo
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: mobileTheme.spacing[4],
    borderBottomLeftRadius: mobileTheme.borderRadius.xl,
    borderBottomRightRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.medium,
  },
  
  // HEADER CONTENT - Container interno per title e subtitle
  headerContent: {
    paddingHorizontal: mobileTheme.spacing[5],
    paddingBottom: mobileTheme.spacing[8], // Spazio consistente per tutti
  },
  
  // TITLE - Stile del titolo principale
  title: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.white,
    letterSpacing: -0.5,
  },
  
  // SUBTITLE - Stile del sottotitolo
  subtitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
    marginTop: 0, // Sempre 0 per consistenza
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
});

export default sharedHeaderStyles;
