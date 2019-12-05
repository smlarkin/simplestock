import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import StyledText from './StyledText';
import BodyPaginator from './BodyPaginator';
import { layout } from '../constants';

const BodyNavigator = ({
  categoriesFiltered,
  categoryIndex,
  setCategoryIndex,
}) => {
  const previousIndex = categoryIndex - 1;
  const previousIndexIsValid = previousIndex >= 0;
  const nextIndex = categoryIndex + 1;
  const nextIndexIsValid = nextIndex <= categoriesFiltered.length - 1;
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
      <TouchableOpacity
        onPress={() => handleOnPress('previous')}
        style={styles.leftArrow}>
        <StyledText
          style={{
            fontSize: 30,
            color: !previousIndexIsValid ? 'lightgrey' : 'black',
          }}>
          {'<'}
        </StyledText>
      </TouchableOpacity>
      <BodyPaginator {...{ categoryIndex, categoriesFiltered }} />
      <TouchableOpacity
        onPress={() => handleOnPress('next')}
        style={styles.rightArrow}>
        <StyledText
          style={{
            fontSize: 30,
            color: !nextIndexIsValid ? 'lightgrey' : 'black',
          }}>
          {'>'}
        </StyledText>
      </TouchableOpacity>
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
