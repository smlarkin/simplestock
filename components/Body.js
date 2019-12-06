/* eslint-disable complexity */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';
import BodyRenderItem from './BodyRenderItem';
import BodyRenderItemNoContent from './BodyRenderItemNoContent';
import BodyNavigator from './BodyNavigator';
import { filterCategories, filterSubcategories, selectCategory } from '../util';
import {
  setCategories,
  setCategoriesFiltered,
  setCategoryIndex,
  setEdit,
  setSubcategories,
} from '../redux/actions';

const Body = ({
  categories,
  categoriesFiltered,
  categoryIndex,
  edit,
  setCategories,
  setCategoriesFiltered,
  setCategoryIndex,
  setEdit,
  setSubcategories,
  shopping,
}) => {
  // NOTE: DEV RESETS (keep for future degugging)
  // setCategories([]);
  // setCategoryIndex(null);
  // setEdit(null);
  // setfilteredCategories([]);

  const category = selectCategory(categoryIndex, categoriesFiltered);

  const filteredData = category
    ? filterSubcategories(categoriesFiltered, categoryIndex, shopping)
    : categoriesFiltered;

  const renderItem = BodyRenderItem({
    categoryIndex,
    edit,
    shopping,
  });

  function onMoveEnd(data) {
    if (categoryIndex !== null) {
      setSubcategories({
        categoryKey: category.key,
        subcategories: data,
      });
    } else {
      setCategories(data);
    }
  }

  useEffect(() => {
    setCategoriesFiltered(filterCategories(categories, shopping));
  }, [categories, shopping]);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            flex:
              categoryIndex !== null && categoriesFiltered.length > 1 ? 7 : 8,
          },
        ]}>
        <DraggableFlatList
          data={filteredData}
          ListEmptyComponent={
            <BodyRenderItemNoContent
              {...{
                categories,
                categoriesFiltered,
                categoryIndex,
                shopping,
              }}
            />
          }
          onMoveEnd={({ data }) => onMoveEnd(data)}
          renderItem={renderItem}
          scrollPercent={5}
        />
      </View>
      {categoryIndex !== null && categoriesFiltered.length > 1 && (
        <BodyNavigator
          {...{ categoriesFiltered, categoryIndex, setCategoryIndex }}
        />
      )}
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
  categoriesFiltered: state.categoriesFiltered,
  categoryIndex: state.categoryIndex,
  edit: state.edit,
  shopping: state.shopping,
});

const mapDispatchToProps = dispatch => ({
  setCategories: categories => dispatch(setCategories(categories)),
  setCategoriesFiltered: categoriesFiltered =>
    dispatch(setCategoriesFiltered(categoriesFiltered)),
  setCategoryIndex: categoryIndex => dispatch(setCategoryIndex(categoryIndex)),
  setSubcategories: ({ categoryKey, subcategories }) =>
    dispatch(setSubcategories({ categoryKey, subcategories })),
  setEdit: category => dispatch(setEdit(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);
