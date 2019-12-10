import React from 'react';
import { StyleSheet, View } from 'react-native';
import BodyPaginator from './BodyPaginator';
import IconButton from './IconButton';
import { layout } from '../constants';

const BodyNavigator = ({
  categoryIndex,
  currentCategories,
  setCategoryIndex,
}) => {
  const previousIndex = categoryIndex - 1;
  const previousIndexIsValid = previousIndex >= 0;
  const nextIndex = categoryIndex + 1;
  const nextIndexIsValid = nextIndex <= currentCategories.length - 1;
  const { width } = layout;

  function handleOnPress(direction) {
    if (direction === 'previous' && previousIndexIsValid) {
      setCategoryIndex(previousIndex);
    } else if (direction === 'next' && nextIndexIsValid) {
      setCategoryIndex(nextIndex);
    }
  }
  return (
    <View style={[styles.container, { width }]}>
      <IconButton
        active={previousIndexIsValid}
        color="black"
        name="left"
        handleOnPress={() => handleOnPress('previous')}
        size={30}
      />
      <BodyPaginator {...{ categoryIndex, currentCategories }} />
      <IconButton
        active={nextIndexIsValid}
        color="black"
        name="right"
        handleOnPress={() => handleOnPress('next')}
        size={30}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  spacer: {
    flex: 2,
  },
  leftArrow: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  rightArrow: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default BodyNavigator;
