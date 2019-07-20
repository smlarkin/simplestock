/* eslint-disable complexity */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import DraggableFlatList from 'react-native-draggable-flatlist'
import BodyRenderItem from './BodyRenderItem'
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
    <View style={styles.container}>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        scrollPercent={5}
        onMoveEnd={({ data }) => onMoveEnd(data)}
      />
    </View>
  )

  return content
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 8,
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
