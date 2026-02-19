import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { sharedCategoryStyles } from './styles/SharedCategoryStyles';

export default function CategoryProductsScreen({ route }) {
  const { category } = route.params || {};
  
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
          {category.name}
        </Text>
        <Text style={{ fontSize: 16, color: '#666' }}>
          Prodotti per {category.name}
        </Text>
      </View>
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 16, color: '#666' }}>
          Categoria in sviluppo - prodotti disponibili a breve
        </Text>
      </View>
    </View>
  );
}
