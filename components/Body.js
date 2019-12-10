/* eslint-disable complexity */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';
import BodyRenderItem from './BodyRenderItem';
import BodyRenderItemNoContent from './BodyRenderItemNoContent';
import BodyNavigator from './BodyNavigator';
import { filterSubcategoriesToShop } from '../util';
import {
  setCategories,
  setCategoryIndex,
  setEdit,
  setShopping,
  setSubcategories,
} from '../redux/actions';

const Body = ({
  categories,
  categoryIndex,
  edit,
  setCategories,
  setCategoryIndex,
  setEdit,
  setShopping,
  setSubcategories,
  shopping,
}) => {
  // NOTE: DEV RESETS (keep for future degugging)
  // setCategories([]);
  // setCategoryIndex(null);
  // setEdit(null);
  // setShopping(null);

  const currentCategories = shopping ? shopping.categories : categories;
  const currentCategory =
    categoryIndex !== null ? currentCategories[categoryIndex] : null;
  const currentData = !currentCategory
    ? currentCategories
    : !shopping
    ? currentCategory.subcategories
    : filterSubcategoriesToShop(currentCategory);
  const renderItem = BodyRenderItem({
    categoryIndex,
    edit,
    shopping,
  });

  function onMoveEnd(data) {
    if (categoryIndex !== null) {
      setSubcategories({
        categoryKey: currentCategory.key,
        subcategories: data,
      });
    } else {
      setCategories(data);
    }
  }

  return (
    <>
      <View
        style={[
          styles.container,
          {
            flex:
              categoryIndex !== null && currentCategories.length > 1 ? 7 : 8,
          },
        ]}>
        <DraggableFlatList
          data={currentData}
          ListEmptyComponent={
            <BodyRenderItemNoContent
              {...{
                categories,
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
      {categoryIndex !== null && currentCategories.length > 1 && (
        <BodyNavigator
          {...{ currentCategories, categoryIndex, setCategoryIndex }}
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
  setShopping: shoppingObject => dispatch(setShopping(shoppingObject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);
