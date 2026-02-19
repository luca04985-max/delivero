import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';

export const sharedCategoryStyles = StyleSheet.create({
  // CATEGORY CARD - Stile base per le carte categoria
  categoryCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 40,
    borderRadius: mobileTheme.borderRadius.lg,
    marginRight: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.white,
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  
  // CATEGORY CARD ACTIVE - Stile per categoria selezionata
  categoryCardActive: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  
  // CATEGORY EMOJI - Stile per l'emoji della categoria
  categoryEmoji: {
    fontSize: 32,
    marginBottom: mobileTheme.spacing[2],
  },
  
  // CATEGORY NAME - Stile per il nome della categoria
  categoryName: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    textAlign: 'center',
  },
  
  // CATEGORY BUTTON - Stile per pulsante categoria (alternativo)
  categoryButton: {
    backgroundColor: mobileTheme.colors.background,
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.full,
    marginRight: mobileTheme.spacing[3],
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  
  // CATEGORY BUTTON ACTIVE - Stile per pulsante categoria attivo
  categoryButtonActive: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  
  // CATEGORY BUTTON TEXT - Testo pulsante categoria
  categoryButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.secondary,
  },
  
  // CATEGORY BUTTON TEXT ACTIVE - Testo pulsante categoria attivo
  categoryButtonTextActive: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },
});

export default sharedCategoryStyles;
