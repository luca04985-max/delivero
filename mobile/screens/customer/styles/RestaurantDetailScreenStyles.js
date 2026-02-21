import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const restaurantDetailScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },

  // INLINE STYLES FROM RestaurantDetailScreen.js
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  header: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  restaurantInfo: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  categoriesList: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    maxHeight: 44,
  },
  categoriesContent: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    alignItems: 'center',
  },
  categoryTab: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 2,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryTabActive: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  categoryTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  categoryTabTextActive: {
    color: '#fff',
  },
  productsList: {
    flex: 1,
  },
  productsContent: {
    padding: 8,
    paddingBottom: 12,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#eee',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  productName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  allergens: {
    fontSize: 10,
    color: '#d32f2f',
    marginTop: 6,
  },
  customizationHint: {
    fontSize: 11,
    color: '#2196f3',
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    fontSize: 24,
    color: '#999',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  modalBody: {
    flex: 1,
    padding: 16,
  },
  modalDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  modalPrice: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  allergenBlock: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  allergenLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#d32f2f',
  },
  allergenText: {
    fontSize: 11,
    color: '#d32f2f',
    marginTop: 4,
  },
  customizationsSection: {
    marginBottom: 16,
  },
  customizationsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  customizationBlock: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  customizationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  customizationOptions: {
    flexDirection: 'column',
    gap: 6,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  optionButtonSelected: {
    borderColor: '#FF6B00',
    backgroundColor: '#fff3e0',
  },
  optionText: {
    fontSize: 12,
    color: '#666',
  },
  optionTextSelected: {
    color: '#FF6B00',
    fontWeight: '600',
  },
  checkboxButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  checkboxButtonSelected: {
    borderColor: '#FF6B00',
    backgroundColor: '#fff3e0',
  },
  checkboxText: {
    fontSize: 12,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    backgroundColor: '#f8f8f8',
  },
  notesSection: {
    marginBottom: 16,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 12,
    backgroundColor: '#f8f8f8',
    textAlignVertical: 'top',
  },
  quantitySection: {
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    width: 120,
  },
  quantityButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  quantityValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 40,
    textAlign: 'center',
  },
  modalFooter: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addToCartButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },

  // EXISTING STYLES FROM ORIGINAL FILE
  headerImage: {
    width: '100%',
    height: 200,
    backgroundColor: mobileTheme.colors.border,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backButtonOverlay: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: mobileTheme.spacing[4],
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: mobileTheme.spacing[4],
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...mobileTheme.shadows.soft,
  },

  // RESTAURANT INFO
  restaurantInfo: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    marginTop: -20,
    borderTopLeftRadius: mobileTheme.borderRadius.xl,
    borderTopRightRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.medium,
  },
  restaurantName: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  restaurantCategory: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[3],
  },
  restaurantMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginLeft: 4,
  },
  deliveryInfo: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // MENU SECTION
  menuSection: {
    marginTop: mobileTheme.spacing[4],
  },
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    paddingHorizontal: mobileTheme.spacing[5],
    marginBottom: mobileTheme.spacing[4],
    letterSpacing: -0.2,
  },
  menuList: {
    paddingHorizontal: mobileTheme.spacing[5],
  },
  menuItem: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: mobileTheme.borderRadius.md,
    backgroundColor: mobileTheme.colors.background,
    marginRight: mobileTheme.spacing[4],
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 16,
  },
  itemPrice: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
  },
  addButton: {
    backgroundColor: mobileTheme.colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: mobileTheme.spacing[3],
  },
  addButtonText: {
    color: mobileTheme.colors.white,
    fontSize: 18,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },

  // CART SUMMARY
  cartSummary: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  summaryLabel: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
  },
  summaryValue: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  totalLabel: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  totalValue: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.primary,
  },
  checkoutButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
    shadowColor: mobileTheme.colors.primary,
  },
  checkoutButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // LOADING STATES
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default restaurantDetailScreenStyles;
