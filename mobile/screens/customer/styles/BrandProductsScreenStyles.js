import { StyleSheet } from 'react-native';

export const brandProductsScreenStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, backgroundColor: '#f6f6f6', borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 20, fontWeight: 'bold' },
  subtitle: { color: '#666', marginTop: 4 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
  filterContainer: { backgroundColor: '#fff', paddingVertical: 10 },
  filterList: { paddingHorizontal: 15 },
  filterChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10
  },
  selectedFilter: { backgroundColor: '#FF6B00' },
  filterText: { fontSize: 14, color: '#666' },
  selectedFilterText: { color: '#fff', fontWeight: '600' },
  productsList: { padding: 15 },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  productHeader: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  productEmoji: { fontSize: 30, marginRight: 15 },
  productInfo: { flex: 1 },
  productName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  productCategory: { fontSize: 12, color: '#666', marginBottom: 2 },
  productUnit: { fontSize: 12, color: '#999' },
  productActions: { alignItems: 'flex-end' },
  discountBadge: {
    backgroundColor: '#F44336',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 4
  },
  discountText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  productPrice: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#f8f8f8'
  },
  stockIndicator: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  stockText: { fontSize: 10, color: '#fff', fontWeight: '600' },
  addButton: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15
  },
  addButtonText: { color: '#fff', fontSize: 12, fontWeight: '600' }
});

export default brandProductsScreenStyles;
