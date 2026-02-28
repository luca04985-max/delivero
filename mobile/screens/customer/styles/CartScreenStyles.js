import { StyleSheet } from 'react-native';
import { mobileTheme } from '../../../theme';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const cartScreenStyles = StyleSheet.create({
  // shared: base styles from unifiedStyles
  ...unifiedStyles,

  // header: header standard (CartScreen.js)
  header: unifiedStyles.header,
  // headerContent: contenuto header (CartScreen.js)
  headerContent: unifiedStyles.headerContent,
  // title: titolo header (CartScreen.js)
  title: unifiedStyles.title,

  // cartContent: wrapper lista items (CartScreen.js)
  cartContent: {
    flex: 1,
    padding: mobileTheme.spacing[5],
  },
  // cartItem: card item carrello (CartScreen.js)
  cartItem: {
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
  // itemImage: immagine prodotto (CartScreen.js)
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: mobileTheme.borderRadius.md,
    backgroundColor: mobileTheme.colors.background,
    marginRight: mobileTheme.spacing[4],
  },
  // itemInfo: wrapper info prodotto (CartScreen.js)
  itemInfo: {
    flex: 1,
  },
  // itemName: nome prodotto (CartScreen.js)
  itemName: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
    marginBottom: BASE_SPACE * 0.250,
  },
  // itemPrice: prezzo prodotto (CartScreen.js)
  itemPrice: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.secondary,
  },
  // quantityContainer: wrapper quantità (CartScreen.js)
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mobileTheme.spacing[2],
  },
  // quantityButton: bottone quantità (CartScreen.js)
  quantityButton: {
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // quantityText: testo quantità (CartScreen.js)
  quantityText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
  },
  // removeButton: bottone rimozione (CartScreen.js)
  removeButton: {
    backgroundColor: mobileTheme.colors.errorBg,
    paddingHorizontal: mobileTheme.spacing[3],
    paddingVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    marginLeft: mobileTheme.spacing[3],
  },
  // removeButtonText: testo rimozione (CartScreen.js)
  removeButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.error,
  },

  // summaryCard: card riepilogo (CartScreen.js)
  summaryCard: {
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.xl,
    padding: mobileTheme.spacing[5],
    marginTop: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  // summaryTitle: titolo riepilogo (CartScreen.js)
  summaryTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
  },
  // summaryRow: riga riepilogo (CartScreen.js)
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
  },
  // summaryLabel: label riepilogo (CartScreen.js)
  summaryLabel: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
  },
  // summaryValue: valore riepilogo (CartScreen.js)
  summaryValue: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
  },
  // totalRow: riga totale (CartScreen.js)
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: mobileTheme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: mobileTheme.colors.border,
  },
  // totalLabel: label totale (CartScreen.js)
  totalLabel: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  // totalValue: valore totale (CartScreen.js)
  totalValue: {
    fontSize: mobileTheme.typography.fontSize.xl,
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.secondary,
  },

  // actionsContainer: wrapper bottoni (CartScreen.js)
  actionsContainer: {
    padding: mobileTheme.spacing[5],
    paddingBottom: mobileTheme.spacing[8],
  },
  // checkoutButton: bottone checkout (CartScreen.js)
  checkoutButton: {
    backgroundColor: mobileTheme.colors.secondary,
    paddingVertical: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
    alignItems: 'center',
    ...mobileTheme.shadows.medium,
    shadowColor: mobileTheme.colors.secondary,
  },
  // checkoutButtonText: testo checkout (CartScreen.js)
  checkoutButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  // clearButton: bottone svuota (CartScreen.js)
  clearButton: {
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    paddingVertical: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.xl,
    alignItems: 'center',
  },
  // clearButtonText: testo svuota (CartScreen.js)
  clearButtonText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.secondary,
  },

  // emptyContainer: stato vuoto (CartScreen.js)
  emptyContainer: unifiedStyles.emptyContainer,
  // emptyText: testo stato vuoto (CartScreen.js)
  emptyText: unifiedStyles.emptyText,
  // emptySubtext: sottotesto stato vuoto (CartScreen.js)
  emptySubtext: unifiedStyles.emptySubtext,
  // emptyEmoji: grande emoji per stato vuoto
  emptyEmoji: {
    fontSize: 64,
  },
  // emptyTitle: titolo nello stato vuoto (override small margin)
  emptyTitle: {
    ...unifiedStyles.title,
    color: mobileTheme.colors.text.primary,
    marginTop: mobileTheme.spacing[5],
  },
  // quantitySpacing: spazio fra pulsanti quantità
  quantitySpacing: {
    marginHorizontal: mobileTheme.spacing[4],
  },
  // bottomSpacer: spacer finale
  bottomSpacer: {
    height: 40,
  },
  // modalOverlay: usa unified overlay
  modalOverlay: unifiedStyles.modalOverlay,
  // modalScrollContainer: wrapper scroll per modal checkout
  modalScrollContainer: {
    flex: 1,
  },
  // modalCard: card interna del modal checkout
  modalCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  // mapContainer: wrapper mappa nel modal
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: mobileTheme.spacing[5],
    backgroundColor: mobileTheme.colors.background,
  },
  // mapLoadingText: testo sotto loader mappa
  mapLoadingText: {
    marginTop: mobileTheme.spacing[2],
    color: mobileTheme.colors.text.secondary,
  },
  // savedList: wrapper saved addresses/cards
  savedList: {
    marginBottom: mobileTheme.spacing[3],
  },
  // expandableSection: sezione espandibile
  expandableSection: {
    marginBottom: mobileTheme.spacing[3],
  },
  // expandableHeader: header della sezione espandibile
  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    backgroundColor: mobileTheme.colors.background,
    borderRadius: mobileTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    marginBottom: mobileTheme.spacing[2],
  },
  // expandableHeaderText: testo header espandibile
  expandableHeaderText: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
  },
  // expandableIcon: icona espansione
  expandableIcon: {
    fontSize: 16,
    color: mobileTheme.colors.text.secondary,
    transition: 'transform 0.2s',
  },
  // expandableContent: contenuto espanso
  expandableContent: {
    overflow: 'hidden',
  },
  // shoppingSection: wrapper for shopping grouped items
  shoppingSection: {
    marginTop: mobileTheme.spacing[3],
  },
  // shoppingCategory: single category wrapper
  shoppingCategory: {
    marginBottom: mobileTheme.spacing[3],
  },
  // savedText: primary text for saved rows
  savedText: {
    color: mobileTheme.colors.text.primary,
    flex: 1,
    fontSize: mobileTheme.typography.fontSize.base,
  },
  // savedTextSecondary: secondary text for saved rows
  savedTextSecondary: {
    color: mobileTheme.colors.text.secondary,
    fontSize: mobileTheme.typography.fontSize.sm,
  },
  // checkbox: checkbox per selezione indirizzo/carta
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: mobileTheme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: mobileTheme.spacing[3],
  },
  checkboxSelected: {
    backgroundColor: mobileTheme.colors.secondary,
    borderColor: mobileTheme.colors.secondary,
  },
  checkboxInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: mobileTheme.colors.white,
  },
  // centerAligned: helper to center children horizontally
  centerAligned: {
    alignItems: 'center',
  },
  // webViewFlex: helper style for WebView full size
  webViewFlex: {
    flex: 1,
  },
  // sectionHeaderNoMargin: header with no horizontal margin
  sectionHeaderNoMargin: {
    marginHorizontal: 0,
    marginBottom: 10,
  },
  // clearButtonMarginTop: helper for cancel/clear spacing
  clearButtonMarginTop: {
    marginTop: mobileTheme.spacing[4],
  },
  // paymentRow: layout for payment options row
  paymentRow: {
    flexDirection: 'row',
    marginBottom: mobileTheme.spacing[5],
  },
  // savedCardsContainer: wrapper for saved cards list
  savedCardsContainer: {
    marginBottom: mobileTheme.spacing[4],
  },
  // savedAddressRow: row for saved addresses/cards
  savedAddressRow: {
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: mobileTheme.colors.white,
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[2],
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },
  savedAddressRowSelected: {
    borderColor: mobileTheme.colors.secondary,
    backgroundColor: mobileTheme.colors.secondary + '10',
  },
  // addressInput: input indirizzo nel modal
  addressInput: {
    backgroundColor: mobileTheme.colors.background,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1,
    marginRight: mobileTheme.spacing[3],
  },
  // locationButton: pulsante usa posizione
  locationButton: {
    backgroundColor: mobileTheme.colors.secondary,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
  },
  locationButtonIcon: {
    color: mobileTheme.colors.white,
    fontSize: 16,
  },
  // paymentOption: card option per metodo di pagamento
  paymentOption: {
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    flex: 1,
    marginRight: mobileTheme.spacing[3],
    borderWidth: 2,
    borderColor: mobileTheme.colors.border,
    alignItems: 'center',
  },
  paymentOptionLast: {
    marginRight: 0,
  },
  paymentOptionSelected: {
    backgroundColor: mobileTheme.colors.secondary,
    borderColor: mobileTheme.colors.secondary,
  },
  paymentEmoji: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    marginBottom: mobileTheme.spacing[2],
  },
  paymentOptionText: {
    color: mobileTheme.colors.text.primary,
  },
  paymentOptionTextSelected: {
    color: mobileTheme.colors.white,
    fontWeight: mobileTheme.typography.fontWeight.bold,
  },
  // smallNote: piccolo testo informativo
  smallNote: {
    fontSize: 11,
    color: mobileTheme.colors.text.tertiary,
    marginBottom: mobileTheme.spacing[5],
  },
  // cancelText: testo annulla modal
  cancelText: {
    textAlign: 'center',
    color: mobileTheme.colors.text.tertiary,
  },
});

export default cartScreenStyles;
