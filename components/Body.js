/* eslint-disable complexity */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import DraggableFlatList from 'react-native-draggable-flatlist'
import BodyRenderItem from './BodyRenderItem'
import BlankScreen from './BlankScreen'
import BodyNavigator from './BodyNavigator'
import {
  setCategories,
  setCategoryIndex,
  setEdit,
  setSubcategories,
} from '../redux/actions'

const Body = ({
  categories,
  categoryIndex,
  edit,
  setCategories,
  setCategoryIndex,
  setEdit,
  setSubcategories,
  shopping,
}) => {
  // RESETS
  // setEdit(null)
  // setCategories([])
  // setCategoryIndex(null)
  const category = categoryIndex !== null ? categories[categoryIndex] : null

  const data = !category
    ? categories
    : shopping
    ? category.subcategories.filter(subcategory => subcategory.shop === true)
    : category.subcategories

  // change to flatlist defaults for empty items
  // use variables for shopping, category, subcategory
  const renderItem = !categories.length ? (
    <BlankScreen />
  ) : (
    BodyRenderItem({
      categoryIndex,
      edit,
      shopping,
    })
  )

  function onMoveEnd(data) {
    if (category) {
      setSubcategories({ categoryKey: category.key, subcategories: data })
    } else {
      setCategories(data)
    }
  }

  // const content = !categories.length ? (
  //   renderItem
  // ) : (
  //   <DraggableFlatList
  //     data={data}
  //     onMoveEnd={({ data }) => onMoveEnd(data)}
  //     renderItem={renderItem}
  //     scrollPercent={5}
  //   />
  // )

  return (
    <>
      <View
        style={[
          styles.container,
          { flex: categoryIndex !== null && categories.length > 1 ? 7 : 8 },
        ]}>
        <DraggableFlatList
          data={data}
          onMoveEnd={({ data }) => onMoveEnd(data)}
          renderItem={renderItem}
          scrollPercent={5}
        />
      </View>
      {categoryIndex !== null && categories.length > 1 && <BodyNavigator />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
})

const mapStateToProps = state => ({
  categories: state.categories,
  categoryIndex: state.categoryIndex,
  edit: state.edit,
  shopping: state.shopping,
})

const mapDispatchToProps = dispatch => ({
  setCategories: categories => dispatch(setCategories(categories)),
  setCategoryIndex: categoryIndex => dispatch(setCategoryIndex(categoryIndex)),
  setSubcategories: ({ categoryKey, subcategories }) =>
    dispatch(setSubcategories({ categoryKey, subcategories })),
  setEdit: category => dispatch(setEdit(category)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body)
