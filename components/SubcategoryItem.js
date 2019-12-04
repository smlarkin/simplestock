/* eslint-disable complexity */
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'rc-swipeout';
import StyledText from './StyledText';
import { deleteSubcategory, setEdit } from '../redux/actions';

const SubcategoryItem = ({
  categoryIndex,
  categories,
  deleteSubcategory,
  edit,
  index,
  isActive,
  item,
  move,
  moveEnd,
  setEdit,
}) => {
  const { color, key } = categories[categoryIndex];
  const categoryKey = key;
  const subcategoryKey = item.key;
  const backgroundColor = isActive
    ? 'white'
    : index % 2 === 0
    ? color.primary
    : color.secondary;
  const { title, current, base, type } = item;
  const [lastTap, setLastTap] = useState(null);

  function handleOnPress(type) {
    const DELAY = 300;
    const now = Date.now();
    if (lastTap && now - lastTap < DELAY) {
      setEdit(item, type);
    } else {
      setLastTap(now);
    }
  }

  return (
    <Swipeout
      autoClose={true}
      // TODO: THIS IS PROBLEMATIC IF USED ... SO REDESIGN TO NOT USE IT AT ALL
      // left={[
      //   {
      //     text: 'edit',
      //     onPress: () => {
      //       setTimeout(() => setEdit(item, 'new'), 300)
      //     },
      //     style: styles.left,
      //   },
      // ]}
      right={
        edit
          ? null
          : [
              {
                text: 'delete',
                onPress: () => {
                  setTimeout(
                    () => deleteSubcategory({ categoryKey, subcategoryKey }),
                    300,
                  );
                },
                style: styles.right,
              },
            ]
      }
      style={styles.swipeout}>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={move}
        onPressOut={moveEnd}
        style={[styles.contentContainer, { backgroundColor }]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => handleOnPress('title')}
          onLongPress={move}
          onPressOut={moveEnd}
          style={styles.titleContainer}>
          <StyledText medium style={styles.title}>
            {title}
          </StyledText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => handleOnPress('current')}
          onLongPress={move}
          onPressOut={moveEnd}
          style={styles.currentContainer}>
          <StyledText bold style={styles.current}>
            {current}
          </StyledText>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <StyledText light style={styles.divider}>
            /
          </StyledText>
        </View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => handleOnPress('base')}
          onLongPress={move}
          onPressOut={moveEnd}
          style={styles.baseContainer}>
          <StyledText bold style={styles.base}>
            {base}
          </StyledText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => handleOnPress('type')}
          onLongPress={move}
          onPressOut={moveEnd}
          style={styles.typeContainer}>
          <StyledText demi style={styles.type}>
            {type}
          </StyledText>
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  left: { backgroundColor: 'white', color: 'black', fontSize: 19 },
  right: { backgroundColor: 'white', color: 'black', fontSize: 19 },
  swipeout: {
    aspectRatio: 7 / 1,
    backgroundColor: 'white',
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    aspectRatio: 7 / 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '1%',
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: '4%',
    paddingRight: '1%',
  },
  title: {
    flexWrap: 'wrap',
    fontSize: 18,
  },
  currentContainer: {
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  current: {
    fontSize: 20,
  },
  dividerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '0.5%',
    marginTop: '2%',
  },
  divider: {
    fontSize: 30,
  },
  baseContainer: {
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  base: {
    fontSize: 20,
  },
  typeContainer: {
    alignItems: 'center',
    flex: 1,
  },
  type: {
    fontSize: 10,
  },
});

const mapStateToProps = state => ({
  categoryIndex: state.categoryIndex,
  categories: state.categories,
  edit: state.edit,
});

const mapDispatchToProps = dispatch => ({
  deleteSubcategory: ({ categoryKey, subcategoryKey }) =>
    dispatch(deleteSubcategory({ categoryKey, subcategoryKey })),
  setEdit: (subcategory, option) => dispatch(setEdit(subcategory, option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubcategoryItem);
