import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { layout } from '../constants'
import StyledText from './StyledText'

const { width } = layout
const itemWidthTotal = width / 9
const itemWidth = itemWidthTotal / 3
const itemMargin = itemWidth
const flatListEnd = itemWidthTotal * 4
class FooterCategoriesNav extends Component {
  state = { viewableItems: [] }

  viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  }

  indexes = this.props.categories.reduce((object, item, index) => {
    const key = index * itemWidthTotal
    const value = index
    return { ...object, [key]: value }
  }, {})

  getItemLayout = (data, index) => {
    return {
      length: itemWidthTotal,
      offset: itemWidthTotal * index,
      index,
    }
  }

  handleScroll = e => {
    const { categories, setCategoryIndex } = this.props
    const position = e.nativeEvent.contentOffset.x
    const finalIndex = categories.length - 1
    const finalItem = finalIndex * itemWidthTotal
    if (position <= 0) {
      setCategoryIndex(0)
    } else if (position >= finalItem) {
      setCategoryIndex(finalIndex)
    }
    if (this.indexes.hasOwnProperty(position)) {
      const index = this.indexes[position]
      setCategoryIndex(index)
    }
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    this.setState({ viewableItems })
    // console.log('Visible items are', viewableItems)
    // console.log('Changed in this iteration', changed)
  }

  componentWillUnmount() {
    this.setState({ viewableItems: [] })
  }

  render() {
    const { categoryIndex, categories } = this.props
    const { viewableItems } = this.state
    return (
      <FlatList
        contentContainerStyle={styles.container}
        // scrollEventThrottle={16}
        decelerationRate={0.5}
        onScroll={this.handleScroll}
        ListFooterComponent={() => (
          <View
            style={{
              backgroundColor: 'black',
              height: 1,
              width: flatListEnd,
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              backgroundColor: 'black',
              height: 1,
              width: flatListEnd,
            }}
          />
        )}
        initialScrollIndex={categoryIndex}
        disableScrollViewPanResponder={true}
        snapToInterval={itemWidthTotal}
        snapToAlignment="center"
        onViewableItemsChanged={this.onViewableItemsChanged}
        viewabilityConfig={this.viewabilityConfig}
        ref={ref => (this.ref = ref)}
        showsHorizontalScrollIndicator={false}
        getItemLayout={this.getItemLayout}
        data={categories}
        horizontal
        renderItem={({ index, item }) => {
          const backgroundColor = index === categoryIndex ? 'grey' : null

          // const stylePaginationWithArrowBrackets = () => {
          //   const { key } = item
          //   const first = viewableItems[0]
          //   const last = viewableItems[viewableItems.length - 1]
          //   if (categoryIndex > 4 && key === first.key) {
          //     return (
          //       <View
          //         style={{
          //           width: itemWidth,
          //           margin: itemMargin,
          //           alignItems: 'center',
          //         }}>
          //         <StyledText style={{ fontSize: 12 }}>{`<`}</StyledText>
          //       </View>
          //     )
          //   } else if (
          //     categoryIndex < categories.length - 1 - 4 &&
          //     key === last.key
          //   ) {
          //     return (
          //       <View
          //         style={{
          //           width: itemWidth,
          //           margin: itemMargin,
          //           alignItems: 'center',
          //         }}>
          //         <StyledText style={{ fontSize: 12 }}>{`>`}</StyledText>
          //       </View>
          //     )
          //   } else {
          //     return (
          //       <View
          //         style={{
          //           width: itemWidth,
          //           aspectRatio: 1 / 1,
          //           backgroundColor,
          //           borderRadius: 50,
          //           borderWidth: 1,
          //           margin: itemMargin,
          //         }}
          //       />
          //     )
          //   }
          // }

          // const content =
          //   viewableItems.length && categories.length > 9 ? (
          //     stylePaginationWithArrowBrackets()
          //   ) : (
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
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default FooterCategoriesNav
