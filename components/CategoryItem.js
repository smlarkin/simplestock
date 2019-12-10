/* eslint-disable complexity */
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'rc-swipeout';
import StyledText from './StyledText';
import { deleteCategory, setEditing, setCategoryIndex } from '../redux/actions';

const CategoryItem = ({
  deleteCategory,
  editing,
  index,
  isActive,
  item,
  move,
  moveEnd,
  setCategoryIndex,
  setEditing,
  shopping,
}) => {
  const { color, title } = item;
  const backgroundColor = isActive ? 'white' : color.primary;
  const [firstTap, setFirstTap] = useState(true);
  const [lastTap, setLastTap] = useState(null);
  const [timer, setTimer] = useState(null);
  const delay = 200;

  function handleOnPress() {
    if (shopping) {
      timer && clearTimeout(timer);
      setTimer(null);
      setFirstTap(true);
      setCategoryIndex(index);
    } else {
      const now = Date.now();
      if (firstTap) {
        setFirstTap(false);
        setTimer(
          setTimeout(() => {
            setTimer(null);
            setFirstTap(true);
            setCategoryIndex(index);
          }, delay),
        );
        setLastTap(now);
      } else {
        if (now - lastTap < delay) {
          clearTimeout(timer);
          setTimer(null);
          setFirstTap(true);
          setEditing(item);
        }
      }
    }
  }

  const content = (
    <StyledText bold style={styles.text}>
      {title}
    </StyledText>
  );

  return (
    <Swipeout
      autoClose={true}
      // left={
      //   editing || shopping
      //     ? null
      //     : [
      //         {
      //           text: 'edit',
      //           onPress: () => {
      //             setTimeout(() => setEditing(item), 300);
      //           },
      //           style: styles.left,
      //         },
      //       ]
      // }
      right={
        editing || shopping
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
      {editing ? (
        <View style={[styles.touchableOpacity, { backgroundColor }]}>
          {content}
        </View>
      ) : (
        <TouchableOpacity
          // onPress={() => setCategoryIndex(index)}
          onPress={handleOnPress}
          onLongPress={!shopping ? move : null}
          onPressOut={!shopping ? moveEnd : null}
          style={[styles.touchableOpacity, { backgroundColor }]}>
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
  setEditing: category => dispatch(setEditing(category)),
});

export default connect(mapStateToProps, mapDispatchToState)(CategoryItem);
