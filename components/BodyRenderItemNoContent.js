import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledText from './StyledText';
import { layout } from '../constants';

const BodyRenderItemNoContent = ({
  categories,
  categoriesFiltered,
  categoryIndex,
  shopping,
}) => {
  const adjustedHeight = layout.height - layout.statusBarHeight;

  const height =
    categoryIndex !== null &&
    categoriesFiltered.length &&
    categoriesFiltered.length > 1
      ? Math.floor(adjustedHeight * 0.7)
      : Math.floor(adjustedHeight * 0.8);

  const content =
    !categories.length && !shopping
      ? 'No categories yet!'
      : categoryIndex === null && shopping
      ? 'No shopping to do!'
      : categoryIndex !== null && categoriesFiltered.length && shopping
      ? 'This category has no shopping!'
      : categoryIndex !== null && categoriesFiltered.length && !shopping
      ? 'This category has no subcategories!'
      : '';

  return (
    <View style={[styles.container, { height }]}>
      <StyledText semi style={styles.title}>
        {content}
      </StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
});

export default BodyRenderItemNoContent;
