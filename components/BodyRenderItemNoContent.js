import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledText from './StyledText';
import { layout } from '../constants';

const BodyRenderItemNoContent = ({
  categoriesLength,
  categoryTitle,
  shopping,
}) => {
  const adjustedHeight = layout.height - layout.statusBarHeight;

  const height =
    categoryTitle && categoriesLength && categoriesLength > 1
      ? Math.floor(adjustedHeight * 0.7)
      : Math.floor(adjustedHeight * 0.8);

  const content = !categoryTitle
    ? 'You have no categories!'
    : !shopping
    ? `You have no subcategories for:\n\n${categoryTitle}`
    : `You have no shopping to do for:\n\n${categoryTitle}`;

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
