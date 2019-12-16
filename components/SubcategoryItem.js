import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'rc-swipeout';
import StyledText from './StyledText';
import { deleteSubcategory, setEditing } from '../redux/actions';

const SubcategoryItem = ({
  categories,
  categoryIndex,
  deleteSubcategory,
  editing,
  index,
  isActive,
  item,
  move,
  moveEnd,
  setEditing,
  shopping,
}) => {
  const currentCategories = shopping ? shopping.categories : categories;
  const currentCategory =
    categoryIndex !== null ? currentCategories[categoryIndex] : null;
  const { color, key } = currentCategory;
  const categoryKey = key;
  const subcategoryKey = item.key;
  const backgroundColor = isActive
    ? 'white'
    : index % 2 === 0
    ? color.primary
    : color.secondary;
  const { title, current, base, type } = item;
  const [lastTap, setLastTap] = useState(null);
  const delay = 300;

  function handleOnPress(type) {
    const now = Date.now();
    if (lastTap && now - lastTap < delay) {
      setEditing(item, type);
    } else {
      setLastTap(now);
    }
  }

  return (
    <Swipeout
      autoClose={true}
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
        editing
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
        {/* TODO: Make tap area larger here */}
        <TouchableOpacity
          activeOpacity={1}
          /* TODO: swap () => with handleOnPress.bind(null, 'title') */
          onPress={() => handleOnPress('title')}
          onLongPress={move}
          onPressOut={moveEnd}
          style={styles.titleContainer}>
          <StyledText medium style={styles.title}>
            {title ? title : ''}
          </StyledText>
        </TouchableOpacity>
        {/* TODO: Make tap area larger here */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => handleOnPress('current')}
          onLongPress={move}
          onPressOut={moveEnd}
          style={styles.currentContainer}>
          <StyledText bold style={styles.current}>
            {current ? current : ''}
          </StyledText>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <StyledText light style={styles.divider}>
            /
          </StyledText>
        </View>
        {/* TODO: Make tap area larger here */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => handleOnPress('base')}
          onLongPress={move}
          onPressOut={moveEnd}
          style={styles.baseContainer}>
          <StyledText bold style={styles.base}>
            {base ? base : ''}
          </StyledText>
        </TouchableOpacity>
        {/* TODO: Make tap area larger here */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => handleOnPress('type')}
          onLongPress={move}
          onPressOut={moveEnd}
          style={styles.typeContainer}>
          <StyledText demi style={styles.type}>
            {type ? type : ''}
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
  categories: state.categories,
  categoryIndex: state.categoryIndex,
  editing: state.editing,
  shopping: state.shopping,
});

const mapDispatchToProps = dispatch => ({
  deleteSubcategory: ({ categoryKey, subcategoryKey }) =>
    dispatch(deleteSubcategory({ categoryKey, subcategoryKey })),
  setEditing: (subcategory, option) =>
    dispatch(setEditing(subcategory, option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubcategoryItem);
