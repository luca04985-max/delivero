import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';

export const pharmacyScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
  },

  // INLINE STYLES FROM PharmacyScreen.js
  card: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[3],
    ...mobileTheme.shadows.sm,
    marginTop: mobileTheme.spacing[2],
  },
  cardTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  cardSub: {
    color: mobileTheme.colors.text.secondary,
    fontSize: mobileTheme.typography.fontSize.sm,
  },
  backBtn: {
    marginBottom: mobileTheme.spacing[4],
  },
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: mobileTheme.spacing[3],
    backgroundColor: mobileTheme.colors.white,
    marginBottom: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    ...mobileTheme.shadows.sm,
  },
  addBtn: {
    backgroundColor: '#34C759',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    ...mobileTheme.shadows.sm,
  },
  footer: {
    padding: mobileTheme.spacing[5],
    backgroundColor: mobileTheme.colors.white,
    borderTopWidth: 1,
    borderColor: mobileTheme.colors.border,
    ...mobileTheme.shadows.sm,
  },
  totalText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  orderBtn: {
    backgroundColor: '#007AFF',
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    alignItems: 'center',
    ...mobileTheme.shadows.medium,
  },
  orderBtnText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },

  // EXISTING STYLES FROM ORIGINAL FILE
  header: {
    backgroundColor: mobileTheme.colors.secondary,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: mobileTheme.spacing[4],
    borderBottomLeftRadius: mobileTheme.borderRadius.xl,
    borderBottomRightRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.medium,
  },
  headerContent: {
    paddingHorizontal: mobileTheme.spacing[5],
  },
  title: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.white,
    letterSpacing: -0.5,
  },
  searchContainer: {
    paddingHorizontal: mobileTheme.spacing[4],
    paddingTop: mobileTheme.spacing[3],
  },
  searchInput: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[4],
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    ...mobileTheme.shadows.sm,
  },
  pharmacyList: {
    flex: 1,
    paddingHorizontal: mobileTheme.spacing[4],
  },
  pharmacyCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[3],
    ...mobileTheme.shadows.sm,
  },
  pharmacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  pharmacyName: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  pharmacyRating: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },
  pharmacyInfo: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[2],
  },
  productsSection: {
    marginTop: mobileTheme.spacing[4],
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  productsTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
  },
  viewAllButton: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.primary,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[2],
  },
  productName: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.primary,
    flex: 1,
  },
  productPrice: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[16],
  },
  emptyText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: mobileTheme.spacing[2],
    fontStyle: 'italic',
  },

  // PHARMACY LIST
  pharmacyList: {
    flex: 1,
    padding: mobileTheme.spacing[5],
  },
  pharmacyCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  pharmacyInfo: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: 2,
  },
  pharmacyAddress: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: 2,
  },
  pharmacyHours: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // SERVICES GRID
  servicesContainer: {
    marginTop: mobileTheme.spacing[4],
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.lg,
    padding: mobileTheme.spacing[4],
    marginBottom: mobileTheme.spacing[3],
    alignItems: 'center',
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: mobileTheme.spacing[2],
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  deliveryInfo: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 20,
  },
  orderButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
    shadowColor: mobileTheme.colors.primary,
  },
  orderButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // EMPTY STATES
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
});

export default pharmacyScreenStyles;
