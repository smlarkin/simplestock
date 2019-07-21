/* eslint-disable complexity */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import DraggableFlatList from 'react-native-draggable-flatlist'
import BodyRenderItem from './BodyRenderItem'
import Paginator from './Paginator'
import { setCategories, setSubcategories } from '../redux/actions'

const Body = ({
  categories,
  categoryIndex,
  edit,
  setCategories,
  setSubcategories,
  shopping,
}) => {
  const category = categoryIndex !== null ? categories[categoryIndex] : null

  const data = !category
    ? categories
    : shopping
    ? category.subcategories.filter(subcategory => subcategory.shop === true)
    : category.subcategories

  const renderItem = BodyRenderItem({ categoryIndex, edit, shopping })

  function onMoveEnd(data) {
    if (category) {
      setSubcategories({ categoryKey: category.key, subcategories: data })
    } else {
      setCategories(data)
    }
  }

  const content = (
    <>
      <View
        style={[
          styles.container,
          { flex: !category ? 8 : categories.length > 1 ? 7 : 8 },
        ]}>
        <DraggableFlatList
          data={data}
          onMoveEnd={({ data }) => onMoveEnd(data)}
          renderItem={renderItem}
          scrollPercent={5}
        />
      </View>
      {category && categories.length > 1 && <Paginator />}
    </>
  )

  return content
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
  setSubcategories: ({ categoryKey, subcategories }) =>
    dispatch(setSubcategories({ categoryKey, subcategories })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body)
