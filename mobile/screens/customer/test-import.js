// Test per verificare import di sharedCategoryStyles
import { sharedCategoryStyles } from './styles/SharedCategoryStyles';

console.log('sharedCategoryStyles importato:', sharedCategoryStyles);
console.log('categoryCard:', sharedCategoryStyles.categoryCard);
console.log('categoryCardActive:', sharedCategoryStyles.categoryCardActive);

export default function TestImport() {
  return (
    <View>
      <Text>Test Import SharedCategoryStyles</Text>
    </View>
  );
}
