/* eslint-disable complexity */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';
import BodyRenderItem from './BodyRenderItem';
import BodyRenderItemNoContent from './BodyRenderItemNoContent';
import BodyNavigator from './BodyNavigator';
import { getCategory } from '../util';
import {
  setCategories,
  setCategoryIndex,
  setEdit,
  setSubcategories,
} from '../redux/actions';

const Body = ({
  categories,
  categoryIndex,
  edit,
  setCategories,
  setSubcategories,
  shopping,
}) => {
  const category = getCategory(categoryIndex, categories);
  const categoryTitle = category ? category.title : null;
  const categoriesLength = categories.length ? categories.length : null;

  const data = !category
    ? categories
    : shopping
    ? category.subcategories.filter(subcategory => subcategory.shop === true)
    : category.subcategories;

  const renderItem = BodyRenderItem({
    categoryIndex,
    edit,
    shopping,
  });

  const listEmptyComponent = (
    <BodyRenderItemNoContent
      {...{ categoriesLength, categoryTitle, shopping }}
    />
  );

  function onMoveEnd(data) {
    if (category) {
      setSubcategories({ categoryKey: category.key, subcategories: data });
    } else {
      setCategories(data);
    }
  }

  return (
    <>
      <View
        style={[
          styles.container,
          { flex: categoryIndex !== null && categories.length > 1 ? 7 : 8 },
        ]}>
        <DraggableFlatList
          data={data}
          ListEmptyComponent={listEmptyComponent}
          onMoveEnd={({ data }) => onMoveEnd(data)}
          renderItem={renderItem}
          scrollPercent={5}
        />
      </View>
      {categoryIndex !== null && categories.length > 1 && <BodyNavigator />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

const mapStateToProps = state => ({
  categories: state.categories,
  categoryIndex: state.categoryIndex,
  edit: state.edit,
  shopping: state.shopping,
});

const mapDispatchToProps = dispatch => ({
  setCategories: categories => dispatch(setCategories(categories)),
  setCategoryIndex: categoryIndex => dispatch(setCategoryIndex(categoryIndex)),
  setSubcategories: ({ categoryKey, subcategories }) =>
    dispatch(setSubcategories({ categoryKey, subcategories })),
  setEdit: category => dispatch(setEdit(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);
