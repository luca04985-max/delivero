import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const restaurantDetailScreenStyles = StyleSheet.create({
  // shared: base styles from unifiedStyles
  ...unifiedStyles,

  // header: barra superiore dettaglio ristorante
  header: {
    backgroundColor: mobileTheme.colors.primary,
    paddingHorizontal: mobileTheme.spacing[4],
    paddingVertical: mobileTheme.spacing[3],
    paddingTop: mobileTheme.spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
  },
  // backButton: testo pulsante back in header
  backButton: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.white,
  },
  // restaurantName: nome ristorante in header
  restaurantName: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },
  // restaurantInfo: info ristorante (tempo, distanza)
  restaurantInfo: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.white,
    opacity: 0.9,
    marginTop: mobileTheme.spacing[1],
  },
  // categoriesList: contenitore tabs categorie
  categoriesList: {
    backgroundColor: mobileTheme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
    maxHeight: 44,
  },
  // categoriesContent: padding list categorie
  categoriesContent: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    alignItems: 'center',
  },
  // categoryTab: pill categoria
  categoryTab: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    marginHorizontal: BASE_SPACE * 0.250,
    borderRadius: mobileTheme.borderRadius.md,
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // categoryTabActive: pill categoria attiva
  categoryTabActive: {
    backgroundColor: mobileTheme.colors.primary,
    borderColor: mobileTheme.colors.primary,
  },
  // categoryTabText: testo categoria
  categoryTabText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.secondary,
  },
  // categoryTabTextActive: testo categoria attiva
  categoryTabTextActive: {
    color: mobileTheme.colors.white,
  },
  // productsList: lista prodotti
  productsList: {
    flex: 1,
  },
  // productsContent: padding interno lista prodotti
  productsContent: {
    padding: mobileTheme.spacing[2],
    paddingBottom: mobileTheme.spacing[3],
  },
  // productCard: card prodotto
  productCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.sm,
    padding: mobileTheme.spacing[2],
    marginBottom: mobileTheme.spacing[2],
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // productHeader: header card prodotto
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[1],
  },
  // productName: nome prodotto
  productName: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  // productDescription: descrizione prodotto
  productDescription: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[1],
  },
  // productPrice: prezzo prodotto
  productPrice: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
  },
  // allergens: avviso allergeni
  allergens: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.error,
    marginTop: mobileTheme.spacing[2],
  },
  // customizationHint: hint personalizzazione
  customizationHint: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.accent,
    marginTop: mobileTheme.spacing[1],
  },
  // emptyContainer: stato vuoto prodotti
  emptyContainer: {
    ...unifiedStyles.emptyContainer,
    paddingVertical: mobileTheme.spacing[8],
    marginTop: BASE_SPACE * 0,
  },
  // emptyText: testo stato vuoto
  emptyText: unifiedStyles.emptyText,
  // modalContainer: overlay modale prodotto
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  // modalContent: card modale dettagli prodotto
  modalContent: {
    flex: 1,
    backgroundColor: mobileTheme.colors.white,
    marginTop: BASE_SPACE * 12.500,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  // modalHeader: header modale
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: mobileTheme.spacing[4],
    paddingVertical: mobileTheme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  // closeButton: X di chiusura
  closeButton: {
    fontSize: FONT_SIZE_BASE * 1.500,
    color: mobileTheme.colors.text.tertiary,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },
  // modalTitle: titolo modale
  modalTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  // modalBody: contenuto modale
  modalBody: {
    flex: 1,
    padding: mobileTheme.spacing[4],
  },
  // modalDescription: descrizione prodotto
  modalDescription: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[3],
  },
  // modalPrice: prezzo base prodotto
  modalPrice: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[3],
  },
  // priceValue: valore prezzo evidenziato
  priceValue: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
  },
  // allergenBlock: box allergeni
  allergenBlock: {
    backgroundColor: mobileTheme.colors.errorBg,
    borderRadius: mobileTheme.borderRadius.sm,
    padding: mobileTheme.spacing[3],
    marginBottom: mobileTheme.spacing[3],
  },
  // allergenLabel: label allergeni
  allergenLabel: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.error,
  },
  // allergenText: testo allergeni
  allergenText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.error,
    marginTop: mobileTheme.spacing[1],
  },
  // customizationsSection: sezione personalizzazioni
  customizationsSection: {
    marginBottom: mobileTheme.spacing[4],
  },
  // customizationsTitle: titolo personalizzazioni
  customizationsTitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },
  // customizationBlock: blocco singola personalizzazione
  customizationBlock: {
    marginBottom: mobileTheme.spacing[3],
    paddingBottom: mobileTheme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: mobileTheme.colors.border,
  },
  // customizationLabel: label personalizzazione
  customizationLabel: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // customizationOptions: lista opzioni
  customizationOptions: {
    flexDirection: 'column',
    gap: mobileTheme.spacing[2],
  },
  // optionButton: pill opzione
  optionButton: {
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.sm,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.background,
  },
  // optionButtonSelected: pill opzione selezionata
  optionButtonSelected: {
    borderColor: mobileTheme.colors.primary,
    backgroundColor: mobileTheme.colors.primarySoft,
  },
  // optionText: testo opzione
  optionText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.secondary,
  },
  // optionTextSelected: testo opzione selezionata
  optionTextSelected: {
    color: mobileTheme.colors.primary,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
  },
  // checkboxButton: checkbox opzione
  checkboxButton: {
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.sm,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.background,
  },
  // checkboxButtonSelected: checkbox selezionato
  checkboxButtonSelected: {
    borderColor: mobileTheme.colors.primary,
    backgroundColor: mobileTheme.colors.primarySoft,
  },
  // checkboxText: testo checkbox
  checkboxText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    color: mobileTheme.colors.text.primary,
  },
  // textInput: input note breve
  textInput: {
    ...unifiedStyles.input,
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[2],
    fontSize: mobileTheme.typography.fontSize.xs,
    backgroundColor: mobileTheme.colors.background,
  },
  // notesSection: sezione note aggiuntive
  notesSection: {
    marginBottom: mobileTheme.spacing[4],
  },
  // notesLabel: label note
  notesLabel: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // notesInput: textarea note
  notesInput: {
    ...unifiedStyles.input,
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[3],
    fontSize: mobileTheme.typography.fontSize.xs,
    backgroundColor: mobileTheme.colors.background,
    textAlignVertical: 'top',
  },
  // quantitySection: sezione quantità
  quantitySection: {
    marginBottom: mobileTheme.spacing[4],
  },
  // quantityLabel: label quantità
  quantityLabel: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
  },
  // quantityControls: barra controlli quantità
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.sm,
    width: 120,
  },
  // quantityButton: pulsante +/-
  quantityButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: mobileTheme.spacing[2],
  },
  // quantityButtonText: testo +/-
  quantityButtonText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
  },
  // quantityValue: valore quantità
  quantityValue: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    minWidth: 40,
    textAlign: 'center',
  },
  // modalFooter: footer modale con CTA
  modalFooter: {
    paddingHorizontal: mobileTheme.spacing[4],
    paddingVertical: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  // addToCartButton: CTA aggiungi al carrello
  addToCartButton: {
    backgroundColor: mobileTheme.colors.primary,
    borderRadius: mobileTheme.borderRadius.md,
    paddingVertical: mobileTheme.spacing[4],
    alignItems: 'center',
  },
  // addToCartText: testo CTA aggiungi al carrello
  addToCartText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.white,
  },

  // headerImage: immagine hero ristorante
  headerImage: {
    width: '100%',
    height: 200,
    backgroundColor: mobileTheme.colors.border,
  },
  // headerOverlay: overlay scuro su immagine
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  // backButtonOverlay: bottone back sopra immagine
  backButtonOverlay: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: mobileTheme.spacing[4],
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 40,
    height: 40,
    borderRadius: BASE_SPACE * 2.500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // favoriteButton: bottone preferiti sopra immagine
  favoriteButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: mobileTheme.spacing[4],
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 40,
    height: 40,
    borderRadius: BASE_SPACE * 2.500,
    justifyContent: 'center',
    alignItems: 'center',
    ...mobileTheme.shadows.soft,
  },

  // restaurantCategory: categoria ristorante
  restaurantCategory: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[3],
  },
  // restaurantMeta: riga meta info (rating/tempo)
  restaurantMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // ratingContainer: wrapper rating stelle
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // rating: valore rating
  rating: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
    marginLeft: BASE_SPACE * 0.500,
  },
  // deliveryInfo: info consegna
  deliveryInfo: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // menuSection: sezione menu
  menuSection: {
    marginTop: mobileTheme.spacing[4],
  },
  // sectionTitle: titolo sezione menu
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    paddingHorizontal: mobileTheme.spacing[5],
    marginBottom: mobileTheme.spacing[4],
    letterSpacing: -0.2,
  },
  // menuList: lista menu
  menuList: {
    paddingHorizontal: mobileTheme.spacing[5],
  },
  // menuItem: card item menu
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
  // itemImage: immagine prodotto
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: mobileTheme.borderRadius.md,
    backgroundColor: mobileTheme.colors.background,
    marginRight: mobileTheme.spacing[4],
  },
  // itemInfo: contenitore testi prodotto
  itemInfo: {
    flex: 1,
  },
  // itemName: nome prodotto
  itemName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: BASE_SPACE * 0.250,
  },
  // itemDescription: descrizione prodotto
  itemDescription: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    lineHeight: FONT_SIZE_BASE * 1,
  },
  // itemPrice: prezzo prodotto
  itemPrice: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.primary,
  },
  // addButton: bottone aggiungi item
  addButton: {
    backgroundColor: mobileTheme.colors.primary,
    width: 30,
    height: 30,
    borderRadius: BASE_SPACE * 1.875,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: mobileTheme.spacing[3],
  },
  // addButtonText: testo bottone aggiungi
  addButtonText: {
    color: mobileTheme.colors.white,
    fontSize: FONT_SIZE_BASE * 1.125,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },

  // cartSummary: riepilogo carrello
  cartSummary: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  // summaryRow: riga riepilogo
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  // summaryLabel: label riepilogo
  summaryLabel: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
  },
  // summaryValue: valore riepilogo
  summaryValue: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
  },
  // totalRow: riga totale
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  // totalLabel: label totale
  totalLabel: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  // totalValue: valore totale
  totalValue: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.primary,
  },
  // checkoutButton: CTA checkout
  checkoutButton: {
    backgroundColor: mobileTheme.colors.primary,
    paddingVertical: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
    alignItems: 'center',
    marginTop: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
    shadowColor: mobileTheme.colors.primary,
  },
  // checkoutButtonText: testo CTA checkout
  checkoutButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

});

export default restaurantDetailScreenStyles;
