import { StyleSheet, Platform } from 'react-native';
import { mobileTheme } from '../theme';

// STILI UNIFICATI PER TUTTI GLI SCHERMI
// Basati su: CustomerOrdersScreen, CustomerHomeScreen, TicketDetailScreen, RiderActiveScreen

// Mapping diretto per evitare problemi con React Native
const FONT_WEIGHTS = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '900',
};

export const unifiedStyles = StyleSheet.create({
  // container: wrapper principale per ogni screen
  container: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background,
  },

  // header: header globale (Home/Admin/Lists)
  header: {
    backgroundColor: mobileTheme.colors.secondary,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: mobileTheme.spacing[4],
    paddingHorizontal: mobileTheme.spacing[5],
    borderBottomLeftRadius: mobileTheme.borderRadius.xl,
    borderBottomRightRadius: mobileTheme.borderRadius.xl,
    ...mobileTheme.shadows.medium,
  },
  // headerContent: layout header con titolo e azioni
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // title: titolo principale header
  title: {
    fontSize: mobileTheme.typography.fontSize['2xl'],
    fontWeight: mobileTheme.typography.fontWeight.black,
    color: mobileTheme.colors.white,
    marginBottom: mobileTheme.spacing[2],
    letterSpacing: -0.5,
  },
  // subtitle: sottotitolo header
  subtitle: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.tertiary,
    opacity: 0.9,
  },

  // searchContainer: wrapper barra di ricerca (list screens)
  searchContainer: {
    paddingHorizontal: mobileTheme.spacing[4],
    paddingTop: mobileTheme.spacing[3],
  },
  // searchInput: input ricerca standard
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

  // tabBar: tabbar globale (Admin/Manager)
  tabBar: {
    backgroundColor: mobileTheme.colors.secondary,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: mobileTheme.spacing[2],
    ...mobileTheme.shadows.medium,
  },
  // tabBarContent: padding interno tabbar
  tabBarContent: {
    paddingHorizontal: mobileTheme.spacing[4],
  },
  // tab: pill tab standard
  tab: {
    alignItems: 'center',
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    marginHorizontal: 4,
    borderRadius: mobileTheme.borderRadius.md,
  },
  // activeTab: pill attiva
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  // tabText: label tab
  tabText: {
    color: mobileTheme.colors.text.tertiary,
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
  },
  // activeTabText: label tab attiva
  activeTabText: {
    color: mobileTheme.colors.secondary,
    fontWeight: FONT_WEIGHTS.bold,
  },

  // content: padding standard area contenuto
  content: {
    flex: 1,
    padding: mobileTheme.spacing[4],
  },
  // scrollView: container scrollabile base
  scrollView: {
    flex: 1,
  },

  // card: card standard per liste (usa primarySoft per background)
  card: {
    backgroundColor: mobileTheme.colors.secondarySoft,
    padding: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.md,
    marginBottom: mobileTheme.spacing[3],
    borderLeftWidth: 3,
    borderLeftColor: mobileTheme.colors.secondary,
  },
  // activeCard: card evidenziata/attiva
  activeCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    marginBottom: mobileTheme.spacing[4],
    borderLeftWidth: 5,
    borderLeftColor: mobileTheme.colors.secondary,
    ...mobileTheme.shadows.sm,
  },
  // cardTitle: titolo card standard
  cardTitle: {
    fontSize: mobileTheme.typography.fontSize.base,
    fontWeight: mobileTheme.typography.fontWeight.bold,
    color: mobileTheme.colors.text.primary,
  },
  // cardSub: sottotitolo card standard
  cardSub: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // orderHeader: header per ordini/ticket
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[3],
  },
  // headerCard: header card generica
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: mobileTheme.spacing[3],
  },
  // orderId: label id ordine
  orderId: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.secondary,
  },
  // ticketId: label id ticket
  ticketId: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
  },

  // statusBadge: badge stato generico
  statusBadge: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: 4,
    borderRadius: mobileTheme.borderRadius.full,
    backgroundColor: mobileTheme.colors.warningBg,
  },
  // orderStatus: badge stato ordine
  orderStatus: {
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: 4,
    borderRadius: mobileTheme.borderRadius.full,
    backgroundColor: mobileTheme.colors.successBg,
  },
  // statusText: testo badge generico
  statusText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.warning,
    textTransform: 'uppercase',
  },
  // orderStatusText: testo badge ordine
  orderStatusText: {
    fontSize: mobileTheme.typography.fontSize.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.success,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // orderInfo: wrapper info ordine/ticket
  orderInfo: {
    flex: 1,
  },
  // orderDate: data ordine
  orderDate: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[2],
  },
  // orderTotal: totale ordine
  orderTotal: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.secondary,
    textAlign: 'right',
    marginTop: mobileTheme.spacing[2],
  },
  // titleCard: titolo sezione card
  titleCard: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[2],
    flex: 1,
  },
  // ticketDescription: testo descrittivo ticket
  ticketDescription: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    lineHeight: 20,
    marginBottom: mobileTheme.spacing[3],
  },
  // ticketFooter: footer ticket
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // ticketDate: data ticket
  ticketDate: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
  },

  // statusSeparator: separatore stato con badge
  statusSeparator: {
    backgroundColor: mobileTheme.colors.white,
    marginHorizontal: mobileTheme.spacing[4],
    marginVertical: mobileTheme.spacing[2],
    borderRadius: mobileTheme.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: mobileTheme.colors.secondary,
    ...mobileTheme.shadows.soft,
  },
  // statusSeparatorContent: contenuto separatore
  statusSeparatorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: mobileTheme.spacing[4],
  },
  // statusSeparatorLeft: parte sinistra separatore
  statusSeparatorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  // statusSeparatorIcon: icona separatore
  statusSeparatorIcon: {
    fontSize: mobileTheme.typography.fontSize.lg,
    marginRight: mobileTheme.spacing[3],
  },
  // statusSeparatorTitle: titolo separatore
  statusSeparatorTitle: {
    fontSize: mobileTheme.typography.fontSize.md,
    fontWeight: mobileTheme.typography.fontWeight.semibold,
    color: mobileTheme.colors.text.primary,
  },
  // statusSeparatorRight: parte destra separatore
  statusSeparatorRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // statusSeparatorCount: counter separatore
  statusSeparatorCount: {
    fontSize: mobileTheme.typography.fontSize.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.secondary,
    marginRight: mobileTheme.spacing[2],
    backgroundColor: mobileTheme.colors.background,
    paddingHorizontal: mobileTheme.spacing[2],
    paddingVertical: mobileTheme.spacing[1],
    borderRadius: mobileTheme.borderRadius.sm,
    minWidth: 24,
    textAlign: 'center',
  },
  // statusSeparatorToggle: icon/text toggle separatore
  statusSeparatorToggle: {
    fontSize: mobileTheme.typography.fontSize.md,
    color: mobileTheme.colors.white,
    fontWeight: FONT_WEIGHTS.bold,
  },

  // button: bottone primario standard
  button: {
    backgroundColor: mobileTheme.colors.secondary,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    ...mobileTheme.shadows.medium,
  },
  // buttonText: label bottone primario
  buttonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  // trackButton: bottone tracking
  trackButton: {
    backgroundColor: mobileTheme.colors.secondary,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[3],
    ...mobileTheme.shadows.medium,
  },
  // trackButtonText: label bottone tracking
  trackButtonText: {
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  // editButton: bottone azione modifica
  editButton: {
    backgroundColor: mobileTheme.colors.secondarySoft,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
    marginRight: mobileTheme.spacing[3],
  },
  // deleteButton: bottone azione elimina
  deleteButton: {
    backgroundColor: mobileTheme.colors.error,
    paddingVertical: mobileTheme.spacing[3],
    paddingHorizontal: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.md,
  },
  // disabledButton: stato disabilitato bottone
  disabledButton: {
    backgroundColor: mobileTheme.colors.text.tertiary,
    opacity: 0.5,
  },

  // buttonRow: contenitore bottoni in riga
  buttonRow: {
    flexDirection: 'row',
    marginTop: mobileTheme.spacing[4],
    justifyContent: 'space-between',
    gap: mobileTheme.spacing[2],
  },
  // row: row generica allineata
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // input: input base
  input: {
    backgroundColor: mobileTheme.colors.background,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    borderRadius: mobileTheme.borderRadius.md,
    padding: mobileTheme.spacing[3],
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
  },
  // textInput: input testo elevato
  textInput: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[4],
    borderRadius: mobileTheme.borderRadius.lg,
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.primary,
    ...mobileTheme.shadows.soft,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
  },

  // modalOverlay: overlay modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // modalCard: card modal
  modalCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    margin: mobileTheme.spacing[4],
    maxHeight: '80%',
    ...mobileTheme.shadows.xl,
  },
  // modalTitle: titolo modal
  modalTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[4],
    textAlign: 'center',
  },

  // section: contenitore sezione
  section: {
    backgroundColor: mobileTheme.colors.white,
    margin: mobileTheme.spacing[4],
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    ...mobileTheme.shadows.sm,
  },
  // sectionTitle: titolo sezione
  sectionTitle: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[3],
  },

  // statCard: card statistica
  statCard: {
    backgroundColor: mobileTheme.colors.white,
    padding: mobileTheme.spacing[5],
    borderRadius: mobileTheme.borderRadius.lg,
    alignItems: 'center',
    marginBottom: mobileTheme.spacing[4],
    ...mobileTheme.shadows.medium,
    borderTopWidth: 4,
    borderTopColor: mobileTheme.colors.secondary,
  },
  // statValue: valore statistica
  statValue: {
    fontSize: 28,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.secondary,
  },
  // statLabel: label statistica
  statLabel: {
    color: mobileTheme.colors.text.secondary,
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 4,
  },

  // userName: nome utente
  userName: {
    fontSize: mobileTheme.typography.fontSize.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: mobileTheme.colors.text.primary,
    marginBottom: mobileTheme.spacing[1],
  },
  // userEmail: email utente
  userEmail: {
    fontSize: mobileTheme.typography.fontSize.sm,
    color: mobileTheme.colors.text.secondary,
    marginBottom: mobileTheme.spacing[2],
  },

  // emptyContainer: stato vuoto wrapper
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mobileTheme.spacing[5],
    marginTop: mobileTheme.spacing[8],
  },
  // emptyText: testo stato vuoto
  emptyText: {
    fontSize: mobileTheme.typography.fontSize.lg,
    color: mobileTheme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: mobileTheme.spacing[2],
  },
  // emptySubtext: sotto-testo stato vuoto
  emptySubtext: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: mobileTheme.spacing[2],
    fontStyle: 'italic',
  },
  // loadingContainer: wrapper loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // loadingText: testo loading
  loadingText: {
    fontSize: mobileTheme.typography.fontSize.base,
    color: mobileTheme.colors.text.secondary,
    marginTop: mobileTheme.spacing[4],
  },

  // errorBanner: banner errore
  errorBanner: {
    backgroundColor: mobileTheme.colors.error,
    color: mobileTheme.colors.white,
    padding: mobileTheme.spacing[3],
    textAlign: 'center',
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },
  // successBanner: banner successo
  successBanner: {
    backgroundColor: mobileTheme.colors.success,
    color: mobileTheme.colors.white,
    padding: mobileTheme.spacing[3],
    textAlign: 'center',
    fontWeight: mobileTheme.typography.fontWeight.medium,
  },

  // toast: container toast
  toast: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: mobileTheme.spacing[3],
    borderRadius: mobileTheme.borderRadius.md,
    zIndex: 1000,
    ...mobileTheme.shadows.medium,
  },
  // toastText: testo toast
  toastText: {
    color: mobileTheme.colors.white,
    fontSize: mobileTheme.typography.fontSize.sm,
    fontWeight: mobileTheme.typography.fontWeight.medium,
    textAlign: 'center',
  },
});

export default unifiedStyles;
