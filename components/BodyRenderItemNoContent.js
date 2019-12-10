import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledText from './StyledText';
import { layout } from '../constants';

const BodyRenderItemNoContent = ({ categories, categoryIndex, shopping }) => {
  const currentHeight = layout.height - layout.statusBarHeight;
  const currentCategories = shopping ? shopping.categories : categories;
  const height =
    categoryIndex !== null &&
    currentCategories.length &&
    currentCategories.length > 1
      ? Math.floor(currentHeight * 0.7)
      : Math.floor(currentHeight * 0.8);
  const content =
    !categories.length && !shopping
      ? 'No categories yet!'
      : categoryIndex === null && shopping
      ? 'No shopping to do!'
      : categoryIndex !== null && shopping && shopping.categories.length
      ? 'This category has no shopping!'
      : categoryIndex !== null && !shopping && categories.length
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
