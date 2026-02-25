import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const pharmacyScreenStyles = StyleSheet.create({
  // shared: base styles from unifiedStyles
  ...unifiedStyles,

  // backBtn: margin per bottone indietro (PharmacyScreen.js)
  backBtn: {
    marginBottom: mobileTheme.spacing[4],
  },
  // productRow: riga prodotto nella lista prodotti (PharmacyScreen.js)
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.white,
    marginBottom: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    ...mobileTheme.shadows.sm,
  },
  // addBtn: bottone aggiunta prodotto (PharmacyScreen.js)
  addBtn: {
    backgroundColor: '#34C759',
    width: 30,
    height: 30,
    borderRadius: BASE_SPACE * 1.875,
    justifyContent: 'center',
    alignItems: 'center',
    ...mobileTheme.shadows.sm,
  },
  // footer: area totale e checkout (PharmacyScreen.js)
  footer: {
    padding: mobileTheme.spacing[5],
    backgroundColor: mobileTheme.colors.white,
    borderTopWidth: 1,
    borderColor: mobileTheme.colors.border,
    ...mobileTheme.shadows.sm,
  },
  // totalText: totale carrello farmacia (PharmacyScreen.js)
  totalText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  // orderBtn: bottone conferma ordine farmacia (PharmacyScreen.js)
  orderBtn: {
    backgroundColor: '#007AFF',
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    alignItems: 'center',
    ...mobileTheme.shadows.medium,
  },
  // orderBtnText: label bottone conferma (PharmacyScreen.js)
  orderBtnText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },
});

export default pharmacyScreenStyles;
