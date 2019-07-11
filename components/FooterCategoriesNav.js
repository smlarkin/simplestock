import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import SideSwipe from 'react-native-sideswipe'
import StyledText from './StyledText'
import FooterCategoriesNavContent from './FooterCategoriesNavContent'
import { layout, colors } from '../constants'
import { mapIndexToColors } from '../util'
const { backgrounds } = colors

const FooterCategoriesNav = ({
  categories,
  categoryIndex,
  colors,
  setCategoryIndex,
}) => {
  const { width } = layout
  const snapInterval = width
  const margin = (width - snapInterval) / 2

  return (
    <View style={[styles.container]}>
      <SideSwipe
        useVelocityForIndex={true}
        index={categoryIndex}
        itemWidth={snapInterval}
        style={{ width, height: '100%' }}
        data={categories}
        contentOffset={margin}
        onIndexChange={index => {
          // setUseIndexOffset(false)
          setCategoryIndex(index)
        }}
        renderItem={({ itemIndex, currentIndex, item, animatedValue }) => {
          const color = mapIndexToColors(itemIndex, backgrounds).primary
          return (
            <View
              style={{
                backgroundColor: color,
                height: '100%',
                justifyContent: 'center',
                marginLeft: 5,
                marginRight: 5,
                borderWidth: 1,
                width: snapInterval - 10,
                alignItems: 'center',
              }}>
              <StyledText style={{ fontSize: 20 }}>{item.title}</StyledText>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default FooterCategoriesNav
