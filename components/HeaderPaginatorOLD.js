import React, { useEffect, useRef } from 'react'
import { FlatList, View } from 'react-native'
import { layout } from '../constants'
import StyledText from './StyledText'

const HeaderPaginator = ({ categories, categoryIndex }) => {
  const ref = useRef(null)
  const { width } = layout
  const withExtra = width / 30
  const flatListWidth = (width * 5) / 7
  const viewOffset = flatListWidth / 2 - withExtra
  const itemWidthTotal = flatListWidth / 9
  const itemWidth = itemWidthTotal / 5
  const itemMargin = itemWidth * 2

  const getItemLayout = (data, index) => {
    return {
      length: itemWidthTotal,
      offset: itemWidthTotal * index,
      index,
    }
  }

  // const viewabilityConfig  = {
  //   itemVisiblePercentThreshold: 50,
  //   // waitForInteraction: true,
  //   // viewAreaCoveragePercentThreshold: 95,
  // }

  const onViewableItemsChanged = ({ viewableItems, changed }) => {
    console.log('Visible items are', viewableItems)
    console.log('Changed in this iteration', changed)
  }

  useEffect(() => {
    ref.current.scrollToIndex({
      index: categoryIndex,
      viewPosition: 0,
      viewOffset: viewOffset,
    })
  }, [categoryIndex])

  return (
    <FlatList
      // onViewableItemsChanged={onViewableItemsChanged}
      // viewabilityConfig={this.viewabilityConfig}
      ref={ref}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      getItemLayout={getItemLayout}
      data={categories}
      horizontal
      renderItem={({ index }) => {
        const backgroundColor = index === categoryIndex ? 'grey' : null

        // const other =
        //   categoryIndex < categories.length > 9 &&
        //   categories.length - 1 - categoryIndex

        // const content =
        //   categories.length > 9 &&
        //   categoryIndex > 4 &&
        //   index < categoryIndex + 4 - 8 ? (
        //     <StyledText style={{ width: itemWidth, margin: itemMargin }}>
        //       {`<`}
        //     </StyledText>
        //   ) : categories.length > 9 &&
        //     categoryIndex < categories.length - 1 - 4 &&
        //     index > categoryIndex - 4 + 8 ? (
        //     <StyledText style={{ width: itemWidth, margin: itemMargin }}>
        //       {`>`}
        //     </StyledText>
        //   ) : (
        //     <View
        //       style={{
        //         // height: '15%',
        //         width: itemWidth,
        //         aspectRatio: 1 / 1,
        //         backgroundColor,
        //         borderRadius: 50,
        //         borderWidth: 1,
        //         margin: itemMargin,
        //       }}
        //     />
        //   )

        // return content

        return (
          <View
            style={{
              // height: '15%',
              width: itemWidth,
              aspectRatio: 1 / 1,
              backgroundColor,
              borderRadius: 50,
              borderWidth: 1,
              margin: itemMargin,
            }}
          />
        )
      }}
    />
  )
}
HeaderPaginator.viewabilityConfig = {
  itemVisiblePercentThreshold: 50,
  // waitForInteraction: true,
  // viewAreaCoveragePercentThreshold: 95,
}

export default HeaderPaginator
