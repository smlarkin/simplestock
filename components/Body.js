/* eslint-disable complexity */
import React from 'react'
import { FlatList, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import BodyRenderItem from './BodyRenderItem'
import BodyCategoriesNav from './BodyCategoriesNav'
import BodyPaginator from './BodyPaginator'
import { layout } from '../constants'

const Body = props => {
  const {
    categories,
    categoryIndex,
    edit,
    setCategories,
    setCategoryIndex,
    setSubcategories,
    shopping,
  } = props

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
      style={[styles.container /* , { flex: category ? 7 : 8 } */]}>
      {category && (
        <View
          style={[
            styles.bodyItem,
            {
              marginTop: -layout.width / 18,
            },
          ]}>
          <BodyPaginator
            categories={categories}
            categoryIndex={categoryIndex}
          />
        </View>
      )}
      <View style={{ flex: category ? 7 : null }}>{content}</View>
      {category && (
        <View style={styles.bodyItem}>
          <BodyCategoriesNav
            categories={categories}
            categoryIndex={categoryIndex}
            setCategoryIndex={setCategoryIndex}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 8,
    width: '100%',
  },
  bodyItem: {
    flex: 1,
    // borderWidth: 1,
  },
})

export default Body
