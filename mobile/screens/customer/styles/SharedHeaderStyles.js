import { StyleSheet } from 'react-native';
import { unifiedStyles } from '../../../theme/UnifiedStyles';
import { BASE_SPACE, FONT_FAMILY, FONT_SIZE_BASE } from '../../../theme/StyleConstants.js';


export const sharedHeaderStyles = StyleSheet.create({
  // header: header globale per schermate customer
  header: unifiedStyles.header,
  // headerContent: contenuto header (titolo + sottotitolo)
  headerContent: unifiedStyles.headerContent,
  // title: titolo principale header
  title: unifiedStyles.title,
  // subtitle: sottotitolo header
  subtitle: unifiedStyles.subtitle,
});

export default sharedHeaderStyles;
