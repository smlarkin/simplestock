/* eslint-disable complexity */
import React from 'react'
import { FlatList, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import BodyRenderItem from './BodyRenderItem'

const Body = props => {
  const {
    categories,
    categoryIndex,
    edit,
    setCategories,
    setCategoryIndex,
    setEdit,
    setSubcategories,
    shopping,
  } = props

  // setEdit(null)

  const category = categoryIndex !== null ? categories[categoryIndex] : null

  const data = !category
    ? categories
    : shopping
    ? category.subcategories.filter(subcategory => subcategory.shop === true)
    : category.subcategories

  const renderItem = BodyRenderItem({ ...props, category })

  function onMoveEnd(data) {
    if (category) {
      setSubcategories({ categoryKey: category.key, subcategories: data })
    } else {
      setCategories(data)
    }
  }

  const content =
    category && shopping ? (
      <FlatList data={data} renderItem={renderItem} />
    ) : (
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        scrollPercent={5}
        onMoveEnd={({ data }) => onMoveEnd(data)}
      />
    )

  return (
    <View
      /* behavior="padding" */
      style={styles.container}>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 8,
    width: '100%',
  },
})

export default Body
