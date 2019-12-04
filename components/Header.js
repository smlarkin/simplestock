import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import IconButton from './IconButton';
import HeaderTitle from './HeaderTitle';
import { createCategory, createSubcategory, setEdit } from '../redux/actions';
import { colors } from '../constants';

const Header = ({
  categories,
  categoryIndex,
  createCategory,
  createSubcategory,
  edit,
  shopping,
  setEdit,
}) => {
  const category = categoryIndex !== null ? categories[categoryIndex] : null;
  const title = category ? category.title : 'Simple Stock';

  function handleOnPressPlus() {
    if (!edit && !shopping) {
      if (category) {
        const subcategory = {
          key: String(Math.random()),
          title: '',
          current: '',
          base: '',
          difference: '',
          shop: false,
        };
        const categoryKey = category.key;
        createSubcategory({ categoryKey, subcategory });
        setEdit(subcategory, 'new');
      } else {
        const category = {
          color: colors.backgrounds[0],
          key: String(Math.random()),
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
      <View style={styles.placeholder} />

      <HeaderTitle title={title} />

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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  placeholder: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  categories: state.categories,
  categoryIndex: state.categoryIndex,
  edit: state.edit,
  shopping: state.shopping,
});

const mapDispatchToProps = dispatch => ({
  createCategory: category => dispatch(createCategory(category)),
  createSubcategory: ({ categoryKey, subcategory }) =>
    dispatch(createSubcategory({ categoryKey, subcategory })),
  setEdit: (item, type) => dispatch(setEdit(item, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
