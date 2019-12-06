/* eslint-disable complexity */
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'rc-swipeout';
import StyledText from './StyledText';
import { deleteCategory, setEdit, setCategoryIndex } from '../redux/actions';

const CategoryItem = ({
  deleteCategory,
  edit,
  index,
  isActive,
  item,
  move,
  moveEnd,
  setCategoryIndex,
  setEdit,
  shopping,
}) => {
  const { color, title } = item;
  const backgroundColor = isActive ? 'white' : color.primary;
  const content = (
    <StyledText bold style={styles.text}>
      {title}
    </StyledText>
  );

  return (
    <Swipeout
      autoClose={true}
      // TODO: Remove left editing capability and implement double-tap to edit categories.
      left={
        edit || shopping
          ? null
          : [
              {
                text: 'edit',
                onPress: () => {
                  setTimeout(() => setEdit(item), 300);
                },
                style: styles.left,
              },
            ]
      }
      right={
        edit || shopping
          ? null
          : [
              {
                text: 'delete',
                onPress: () => {
                  setTimeout(() => deleteCategory(item.key), 300);
                },
                style: styles.right,
              },
            ]
      }
      style={styles.swipeout}>
      {edit ? (
        <View style={[styles.touchableOpacity, { backgroundColor }]}>
          {content}
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.touchableOpacity, { backgroundColor }]}
          onPress={() => setCategoryIndex(index)}
          onLongPress={!shopping ? move : null}
          onPressOut={!shopping ? moveEnd : null}>
          {content}
        </TouchableOpacity>
      )}
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  left: { backgroundColor: 'white', color: 'black', fontSize: 19 },
  right: { backgroundColor: 'white', color: 'black', fontSize: 19 },
  swipeout: {
    aspectRatio: 7 / 1,
    backgroundColor: 'white',
    marginBottom: '0.25%',
    marginTop: '0.25%',
    width: '100%',
  },
  touchableOpacity: {
    alignItems: 'center',
    aspectRatio: 7 / 1,
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: 19,
  },
});

const mapStateToProps = state => ({
  shopping: state.shopping,
});

const mapDispatchToState = dispatch => ({
  deleteCategory: categoryKey => dispatch(deleteCategory(categoryKey)),
  setCategoryIndex: categoryIndex => dispatch(setCategoryIndex(categoryIndex)),
  setEdit: category => dispatch(setEdit(category)),
});

export default connect(mapStateToProps, mapDispatchToState)(CategoryItem);
