import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';
import { sharedHeaderStyles } from './SharedHeaderStyles';
import { sharedCategoryStyles } from './SharedCategoryStyles';

export const restaurantsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },

  // HEADER
  header: sharedHeaderStyles.header,
  headerContent: sharedHeaderStyles.headerContent,
  title: sharedHeaderStyles.title,
  subtitle: sharedHeaderStyles.subtitle,

  // SEARCH BAR
  searchContainer: {
    paddingHorizontal: mobileTheme.spacing[5],
    marginTop: -30,
    marginBottom: mobileTheme.spacing[4],
  },
  searchInput: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    ...mobileTheme.shadows.medium,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },

  // FILTERS
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: mobileTheme.spacing[5],
    marginBottom: mobileTheme.spacing[4],
    gap: mobileTheme.spacing[2],
  },
  filterButton: {
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.full,
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  filterButtonActive: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  filterText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  filterTextActive: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },

  // RESTAURANT LIST
  restaurantsList: {
    paddingHorizontal: mobileTheme.spacing[5],
  },
  restaurantCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[4],
    overflow: 'hidden',
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  restaurantImage: {
    width: '100%',
    height: 140,
    backgroundColor: mobileTheme.colors.border,
  },
  restaurantContent: {
    padding: mobileTheme.spacing[4],
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[2],
  },
  restaurantName: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    flex: 1,
  },
  favoriteButton: {
    padding: mobileTheme.spacing[2],
  },
  restaurantInfo: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[3],
    lineHeight: 18,
  },
  restaurantFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginLeft: 4,
  },
  deliveryInfo: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  deliveryBadge: {
    backgroundColor: mobileTheme.colors.successBg,
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: 4,
    borderRadius: mobileTheme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  deliveryText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: mobileTheme.colors.success,
  },

  // LOADING STATES
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[4],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mobileTheme.spacing[5],
  },
  emptyText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 22,
  },

  // CATEGORY PILLS
  categoriesList: {
    paddingLeft: mobileTheme.spacing[5],
    marginBottom: mobileTheme.spacing[4],
  },
  categoryCard: sharedCategoryStyles.categoryCard,
  categoryCardActive: sharedCategoryStyles.categoryCardActive,
  categoryEmoji: sharedCategoryStyles.categoryEmoji,
  categoryName: sharedCategoryStyles.categoryName,
  categoryButton: sharedCategoryStyles.categoryButton,
  categoryButtonActive: sharedCategoryStyles.categoryButtonActive,
  categoryButtonText: sharedCategoryStyles.categoryButtonText,
  categoryButtonTextActive: sharedCategoryStyles.categoryButtonTextActive,

  // CATEGORIES CONTAINER
  categoriesContainer: {
    paddingHorizontal: mobileTheme.spacing[5],
    paddingVertical: mobileTheme.spacing[3], // Ridotto da 4 a 3
    backgroundColor: mobileTheme.colors.white,
    marginBottom: mobileTheme.spacing[3], // Ridotto da 4 a 3
    marginTop: mobileTheme.spacing[2],
  },
  categoriesList: {
    paddingHorizontal: mobileTheme.spacing[2],
  },
  categoryButton: {
    backgroundColor: mobileTheme.colors.background,
    paddingHorizontal: mobileTheme.spacing[3], // Ridotto da 4 a 3
    paddingVertical: mobileTheme.spacing[2], // Ridotto da 3 a 2
    borderRadius: mobileTheme.borderRadius.full,
    marginRight: mobileTheme.spacing[3],
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  categoryButtonActive: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  categoryButtonText: {
    fontSize: mobileTheme.typography.fontSize.xs, // Ridotto da sm a xs
    fontWeight: mobileTheme.typography.fontWeight.medium,
    color: mobileTheme.colors.text.secondary,
  },
  categoryButtonTextActive: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },
});

export default restaurantsScreenStyles;
