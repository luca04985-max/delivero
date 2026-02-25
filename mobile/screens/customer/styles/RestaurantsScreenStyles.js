import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { sharedCategoryStyles } from './SharedCategoryStyles';

export const restaurantsScreenStyles = StyleSheet.create({
  // shared: base styles from unifiedStyles
  ...unifiedStyles,

  // header: header standard (RestaurantsScreen.js)
  header: unifiedStyles.header,
  // headerContent: contenuto header (RestaurantsScreen.js)
  headerContent: unifiedStyles.headerContent,
  // title: titolo header (RestaurantsScreen.js)
  title: unifiedStyles.title,
  // subtitle: sottotitolo header (RestaurantsScreen.js)
  subtitle: unifiedStyles.subtitle,

  // searchContainer: wrapper ricerca con offset (RestaurantsScreen.js)
  searchContainer: {
    ...unifiedStyles.searchContainer,
    paddingHorizontal: mobileTheme.spacing[5],
    marginTop: -30,
    marginBottom: mobileTheme.spacing[4],
  },
  // searchInput: input ricerca con radius xl (RestaurantsScreen.js)
  searchInput: {
    ...unifiedStyles.searchInput,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.medium,
    borderColor: 'rgba(0,0,0,0.05)',
  },

  // categoriesContainer: wrapper filtri/categorie (RestaurantsScreen.js)
  categoriesContainer: {
    paddingHorizontal: mobileTheme.spacing[5],
    paddingVertical: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.white,
    marginBottom: mobileTheme.spacing[3],
    marginTop: mobileTheme.spacing[2],
  },
  // categoriesList: lista pills categorie (RestaurantsScreen.js)
  categoriesList: {
    paddingLeft: mobileTheme.spacing[5],
    marginBottom: mobileTheme.spacing[4],
  },
  // categoryCard: pill base (sharedCategoryStyles)
  categoryCard: sharedCategoryStyles.categoryCard,
  // categoryCardActive: pill attiva (sharedCategoryStyles)
  categoryCardActive: sharedCategoryStyles.categoryCardActive,
  // categoryEmoji: emoji categoria (sharedCategoryStyles)
  categoryEmoji: sharedCategoryStyles.categoryEmoji,
  // categoryName: testo categoria (sharedCategoryStyles)
  categoryName: sharedCategoryStyles.categoryName,
  // categoryButton: bottone categoria (sharedCategoryStyles)
  categoryButton: sharedCategoryStyles.categoryButton,
  // categoryButtonText: testo bottone categoria (sharedCategoryStyles)
  categoryButtonText: sharedCategoryStyles.categoryButtonText,

  // restaurantsList: lista ristoranti (RestaurantsScreen.js)
  restaurantsList: {
    paddingHorizontal: mobileTheme.spacing[5],
  },
  // restaurantCard: card ristorante (RestaurantsScreen.js)
  restaurantCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[4],
    overflow: 'hidden',
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // restaurantImage: hero immagine card (RestaurantsScreen.js)
  restaurantImage: {
    width: '100%',
    height: 140,
    backgroundColor: mobileTheme.colors.border,
  },
  // restaurantContent: contenuto card (RestaurantsScreen.js)
  restaurantContent: {
    padding: mobileTheme.spacing[4],
  },
  // restaurantHeader: header card con nome e azioni (RestaurantsScreen.js)
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[2],
  },
  // restaurantName: nome ristorante (RestaurantsScreen.js)
  restaurantName: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    flex: 1,
  },
  // favoriteButton: bottone preferito (RestaurantsScreen.js)
  favoriteButton: {
    padding: mobileTheme.spacing[2],
  },
  // restaurantInfo: categoria/descrizione breve (RestaurantsScreen.js)
  restaurantInfo: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[3],
    lineHeight: 18,
  },
  // restaurantFooter: footer card con rating e badge (RestaurantsScreen.js)
  restaurantFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // ratingContainer: wrapper rating (RestaurantsScreen.js)
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // rating: testo rating (RestaurantsScreen.js)
  rating: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  // deliveryInfo: info consegna (RestaurantsScreen.js)
  deliveryInfo: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  // deliveryBadge: pill costo consegna (RestaurantsScreen.js)
  deliveryBadge: {
    backgroundColor: mobileTheme.colors.primarySoft,
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: 2,
    borderRadius: mobileTheme.borderRadius.full,
  },
  // deliveryText: testo badge consegna (RestaurantsScreen.js)
  deliveryText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },

  // emptyContainer: stato vuoto lista (RestaurantsScreen.js)
  emptyContainer: unifiedStyles.emptyContainer,
  // emptyText: testo stato vuoto (RestaurantsScreen.js)
  emptyText: unifiedStyles.emptyText,
});

export default restaurantsScreenStyles;
