/* eslint-disable complexity */
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { layout } from '../constants'
import StyledText from './StyledText'

const BodyCategoriesNavContent = ({
  categoriesLength,
  categoryIndex,
  firstCategory,
  firstViewableItem,
  itemMargin,
  itemWidth,
  lastCategory,
  lastViewableItem,
  viewableItemsLength,
}) => ({ index, item }) => {
  const backgroundColor = index === categoryIndex ? 'grey' : null
  const { key } = item

  // if (key === firstViewableItem.key && key !== firstCategory.key) {
  //   return (
  //     <View
  //       style={{
  //         width: itemWidth,
  //         aspectRatio: 1 / 1,
  //         backgroundColor,
  //         borderWidth: 1,
  //         margin: itemMargin,
  //       }}>
  //       <StyledText>!</StyledText>
  //     </View>
  //   )
  // }

  // if (
  //   viewableItemsLength &&
  //   ((key === firstViewableItem.key && key !== firstCategory.key) ||
  //     (key === lastViewableItem.key && key !== lastCategory.key))
  // ) {
  //   return (
  //     <View
  //       style={{
  //         width: itemWidth,
  //         aspectRatio: 1 / 1,
  //         backgroundColor,
  //         borderWidth: 1,
  //         margin: itemMargin,
  //       }}>
  //       <StyledText>!</StyledText>
  //     </View>
  //   )
  // } else if (
  //   categoriesLength > 9 &&
  //   categoryIndex > 4 &&
  //   index < categoryIndex - 3
  // ) {
  //   return (
  //     <View
  //       style={{
  //         width: itemWidth,
  //         aspectRatio: 1 / 1,
  //         backgroundColor,
  //         borderWidth: 1,
  //         margin: itemMargin,
  //       }}>
  //       <StyledText>{'<'}</StyledText>
  //     </View>
  //   )
  // } else {
  //   return (
  //     <View
  //       style={{
  //         width: itemWidth,
  //         aspectRatio: 1 / 1,
  //         backgroundColor,
  //         borderRadius: 50,
  //         borderWidth: 1,
  //         margin: itemMargin,
  //       }}
  //     />
  //   )
  // }

  const content = (
    <View
      style={{
        width: itemWidth,
        aspectRatio: 1 / 1,
        backgroundColor,
        borderRadius: 50,
        borderWidth: 1,
        margin: itemMargin,
      }}
    />
  )

  return content
}

const styles = StyleSheet.create({
  //
})

export default BodyCategoriesNavContent
