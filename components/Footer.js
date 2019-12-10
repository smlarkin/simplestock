import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import IconButton from './IconButton';
import { colors } from '../constants';
import { filterCategoriesToShop, updateDifferenceAndShop } from '../util';
import {
  createCategory,
  createSubcategory,
  setEdit,
  setCategories,
  setCategoryIndex,
  setShopping,
} from '../redux/actions';

const Footer = ({
  categories,
  categoryIndex,
  createCategory,
  createSubcategory,
  edit,
  setEdit,
  setCategories,
  setCategoryIndex,
  setShopping,
  shopping,
}) => {
  const currentCategories = shopping ? shopping.categories : categories;
  const currentCategory =
    categoryIndex !== null ? currentCategories[categoryIndex] : null;

  function handleOnPressHome() {
    if (!edit) {
      setCategoryIndex(null);
    }
  }

  function handleOnPressToggleShopping() {
    if (!edit) {
      if (shopping) {
        const index = currentCategory
          ? categories.findIndex(
              category => category.key === currentCategory.key,
            )
          : null;
        setShopping(null);
        setCategoryIndex(index);
        updateDifferenceAndShop(categories, setCategories);
      }

      if (!shopping) {
        const shoppingCategories = currentCategory
          ? categories
          : filterCategoriesToShop(categories);
        updateDifferenceAndShop(categories, setCategories);
        setShopping({ categories: shoppingCategories });
      }
    }
  }

  function handleOnPressUpload() {
    if (!edit) {
      setSharing(true);
    }
  }

  function handleOnPressPlus() {
    if (!edit && !shopping) {
      if (currentCategory) {
        const subcategory = {
          key: uuid(),
          title: '',
          current: '',
          base: '',
          difference: 0,
          shop: false,
        };
        const categoryKey = currentCategory.key;
        createSubcategory({ categoryKey, subcategory });
        setEdit(subcategory, 'new');
      } else {
        const category = {
          color: colors.backgrounds[0],
          key: uuid(),
          title: '',
          subcategories: [],
        };
        createCategory(category);
        setEdit(category);
      }
    }
  }

  return (
    <View style={styles.container}>
      <IconButton
        active={categoryIndex !== null}
        color="black"
        name="home"
        handleOnPress={handleOnPressHome}
        size={24}
      />
      <IconButton
        active={categories.length}
        activeOpacity={1}
        color="black"
        name={shopping ? 'checksquareo' : 'bars'}
        handleOnPress={handleOnPressToggleShopping}
        size={24}
      />
      <IconButton
        active={!shopping}
        color="black"
        name="plus"
        handleOnPress={handleOnPressPlus}
        size={24}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  edit: state.edit,
  categories: state.categories,
  categoryIndex: state.categoryIndex,
  shopping: state.shopping,
});

const mapDispatchToProps = dispatch => ({
  createCategory: category => dispatch(createCategory(category)),
  createSubcategory: ({ categoryKey, subcategory }) =>
    dispatch(createSubcategory({ categoryKey, subcategory })),
  setCategories: categories => dispatch(setCategories(categories)),
  setCategoryIndex: index => dispatch(setCategoryIndex(index)),
  setEdit: (item, type) => dispatch(setEdit(item, type)),
  setShopping: shoppingObject => dispatch(setShopping(shoppingObject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
