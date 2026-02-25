import { StyleSheet } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';

export const shoppingScreenStyles = StyleSheet.create({
  ...unifiedStyles,
  // container: wrapper principale (ShoppingScreen.js)
  container: unifiedStyles.container,

  // header: header standard (ShoppingScreen.js)
  header: unifiedStyles.header,
  // headerContent: contenuto header (ShoppingScreen.js)
  headerContent: unifiedStyles.headerContent,
  // title: titolo header (ShoppingScreen.js)
  title: unifiedStyles.title,
  // subtitle: sottotitolo header (ShoppingScreen.js)
  subtitle: unifiedStyles.subtitle,

  // searchContainer: wrapper search floating (ShoppingScreen.js)
  searchContainer: {
    paddingHorizontal: mobileTheme.spacing[4],
    marginTop: -25, // Fa salire la ricerca sopra l'header
    marginBottom: mobileTheme.spacing[4],
  },
  // searchInput: input ricerca (ShoppingScreen.js)
  searchInput: {
    ...unifiedStyles.searchInput,
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.medium,
    borderColor: 'rgba(0,0,0,0.05)',
  },

  // section: wrapper sezione (ShoppingScreen.js)
  section: {
    marginBottom: mobileTheme.spacing[6],
  },
  // sectionTitle: titolo sezione (ShoppingScreen.js)
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    paddingHorizontal: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[4],
    letterSpacing: -0.2,
  },

  // categoriesList: lista categorie (ShoppingScreen.js)
  categoriesList: {
    paddingLeft: mobileTheme.spacing[4],
  },
  // categoryCard: card categoria (ShoppingScreen.js)
  categoryCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 100,
    borderRadius: mobileTheme.borderRadius.lg,
    marginRight: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.white,
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // categoryEmoji: emoji categoria (ShoppingScreen.js)
  categoryEmoji: {
    fontSize: 32,
    marginBottom: mobileTheme.spacing[2],
  },
  // categoryName: testo categoria (ShoppingScreen.js)
  categoryName: {
    color: mobileTheme.colors.text.primary,
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: FONT_WEIGHTS.semibold,
    textAlign: 'center',
  },

  // brandsList: lista brand/ristoranti (ShoppingScreen.js)
  brandsList: {
    paddingHorizontal: mobileTheme.spacing[4],
  },
  // brandCard: card brand (ShoppingScreen.js)
  brandCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // brandEmoji: emoji brand (ShoppingScreen.js)
  brandEmoji: {
    fontSize: 40,
    marginRight: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.background, // Cerchio di sfondo per l'emoji
    padding: 10,
    borderRadius: 50,
    overflow: 'hidden',
  },
  // brandInfo: wrapper info brand (ShoppingScreen.js)
  brandInfo: {
    flex: 1,
  },
  // brandName: nome brand (ShoppingScreen.js)
  brandName: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: 2,
  },
  // brandDetails: dettagli brand (ShoppingScreen.js)
  brandDetails: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 18,
  },

  // deliveryBadge: badge consegna (ShoppingScreen.js)
  deliveryBadge: {
    backgroundColor: mobileTheme.colors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  // deliveryText: testo badge consegna (ShoppingScreen.js)
  deliveryText: {
    color: mobileTheme.colors.primary,
    fontSize: 10,
    fontWeight: FONT_WEIGHTS.bold,
  },
});

export default shoppingScreenStyles;
