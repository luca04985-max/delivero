import { StyleSheet } from 'react-native';
import { mobileTheme, FONT_WEIGHTS } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const brandProductsScreenStyles = StyleSheet.create({
  // shared: base styles from unifiedStyles
  ...unifiedStyles,

  // container: wrapper principale (BrandProductsScreen.js)
  container: unifiedStyles.container,
  // header: header list (BrandProductsScreen.js)
  header: {
    padding: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  // title: titolo header (BrandProductsScreen.js)
  title: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
  },
  // subtitle: sottotitolo header (BrandProductsScreen.js)
  subtitle: {
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[1],
  },
  // loadingContainer: loader stato loading (BrandProductsScreen.js)
  loadingContainer: unifiedStyles.loadingContainer,
  // loadingText: testo loading (BrandProductsScreen.js)
  loadingText: unifiedStyles.loadingText,

  // filterContainer: wrapper filtri (BrandProductsScreen.js)
  filterContainer: {
    backgroundColor: mobileTheme.colors.white,
    paddingVertical: mobileTheme.spacing[3],
  },
  // filterList: padding lista filtri (BrandProductsScreen.js)
  filterList: {
    paddingHorizontal: mobileTheme.spacing[4],
  },
  // filterChip: pill filtro (BrandProductsScreen.js)
  filterChip: {
    backgroundColor: mobileTheme.colors.background,
    paddingHorizontal: mobileTheme.spacing[4],
    paddingVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.full,
    marginRight: mobileTheme.spacing[3],
  },
  // selectedFilter: stato filtro attivo (BrandProductsScreen.js)
  selectedFilter: {
    backgroundColor: mobileTheme.colors.primary,
  },
  // filterText: testo filtro (BrandProductsScreen.js)
  filterText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  // selectedFilterText: testo filtro attivo (BrandProductsScreen.js)
  selectedFilterText: {
    color: mobileTheme.colors.white,
    fontWeight: FONT_WEIGHTS.semibold,
  },

  // productsList: lista prodotti (BrandProductsScreen.js)
  productsList: {
    padding: mobileTheme.spacing[4],
  },
  // productCard: card prodotto (BrandProductsScreen.js)
  productCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // productHeader: header card (BrandProductsScreen.js)
  productHeader: {
    flexDirection: 'row',
    padding: mobileTheme.spacing[4],
    alignItems: 'center',
  },
  // productEmoji: emoji prodotto (BrandProductsScreen.js)
  productEmoji: {
    fontSize: FONT_SIZE_BASE * 1.875,
    marginRight: mobileTheme.spacing[4],
  },
  // productInfo: wrapper info prodotto (BrandProductsScreen.js)
  productInfo: {
    flex: 1,
  },
  // productName: nome prodotto (BrandProductsScreen.js)
  productName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: mobileTheme.spacing[1],
  },
  // productCategory: categoria prodotto (BrandProductsScreen.js)
  productCategory: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
    marginBottom: BASE_SPACE * 0.250,
  },
  // productUnit: unità prodotto (BrandProductsScreen.js)
  productUnit: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.tertiary,
  },
  // productActions: wrapper azioni prezzo (BrandProductsScreen.js)
  productActions: {
    alignItems: 'flex-end',
  },
  // discountBadge: badge sconto (BrandProductsScreen.js)
  discountBadge: {
    backgroundColor: mobileTheme.colors.error,
    paddingHorizontal: BASE_SPACE * 0.750,
    paddingVertical: BASE_SPACE * 0.250,
    borderRadius: BASE_SPACE * 1.250,
    marginBottom: BASE_SPACE * 0.500,
  },
  // discountText: testo badge sconto (BrandProductsScreen.js)
  discountText: {
    color: mobileTheme.colors.white,
    fontSize: FONT_SIZE_BASE * 0.625,
    fontWeight: FONT_WEIGHTS.bold,
  },
  // productPrice: prezzo prodotto (BrandProductsScreen.js)
  productPrice: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
  },
  // productFooter: footer card (BrandProductsScreen.js)
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: mobileTheme.spacing[4],
    paddingBottom: mobileTheme.spacing[4],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  // stockIndicator: pill stock (BrandProductsScreen.js)
  stockIndicator: {
    paddingHorizontal: BASE_SPACE * 1,
    paddingVertical: BASE_SPACE * 0.500,
    borderRadius: mobileTheme.borderRadius.full,
    backgroundColor: mobileTheme.colors.success,
  },
  // stockText: testo pill stock (BrandProductsScreen.js)
  stockText: {
    fontSize: FONT_SIZE_BASE * 0.625,
    color: mobileTheme.colors.white,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  // addButton: bottone aggiungi (BrandProductsScreen.js)
  addButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.full,
  },
  // addButtonText: testo bottone aggiungi (BrandProductsScreen.js)
  addButtonText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: FONT_WEIGHTS.semibold,
  },
});

export default brandProductsScreenStyles;
