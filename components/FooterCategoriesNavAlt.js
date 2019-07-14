import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { layout } from '../constants'
import StyledText from './StyledText'

const { width } = layout
const withExtra = width / 30
const flatListWidth = (width * 5) / 7
// const viewOffset = flatListWidth / 2 - withExtra
const itemWidthTotal = flatListWidth / 7
const itemWidthTotalRounded = Math.round(itemWidthTotal)
const itemWidth = itemWidthTotal / 3
const itemMargin = itemWidth /* * 2 */
const ends = flatListWidth / 2 - itemMargin

class HeaderPaginatorClass extends Component {
  state = { viewableItems: [] }

  viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  }

  indexes = this.props.categories.reduce((object, item, index) => {
    const key = index * itemWidthTotalRounded
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
    // console.log(e.nativeEvent.contentOffset.x)
    if (this.indexes.hasOwnProperty(e.nativeEvent.contentOffset.x)) {
      const index = this.indexes[e.nativeEvent.contentOffset.x]
      this.props.setCategoryIndex(index)
    }
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    this.setState({ viewableItems })
    // console.log('Visible items are', viewableItems)
    // console.log('Changed in this iteration', changed)
  }

  componentDidMount() {
    // this.ref.scrollToIndex({
    //   index: this.props.categoryIndex,
    //   viewPosition: 0,
    //   viewOffset: viewOffset,
    // })
  }

  componentDidUpdate() {
    // this.ref.scrollToIndex({
    //   index: this.props.categoryIndex,
    //   viewPosition: 0,
    //   viewOffset: viewOffset,
    // })
  }

  componentWillUnmount() {
    this.setState({ viewableItems: [] })
  }

  render() {
    const { categoryIndex, categories } = this.props
    const { viewableItems } = this.state
    return (
      <FlatList
        scrollEventThrottle={16}
        decelerationRate={0.5}
        onScroll={this.handleScroll}
        ListFooterComponent={() => (
          <View style={{ borderWidth: 1, width: ends }} />
        )}
        ListHeaderComponent={() => (
          <View style={{ borderWidth: 1, width: ends }} />
        )}
        initialScrollIndex={categoryIndex}
        // disableScrollViewPanResponder={true}
        // decelerationRate="fast"
        snapToInterval={itemWidthTotal}
        // scrollEnabled={false}
        onViewableItemsChanged={this.onViewableItemsChanged}
        viewabilityConfig={this.viewabilityConfig}
        ref={ref => (this.ref = ref)}
        contentContainerStyle={{
          alignItems: 'center',
        }}
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

          const content = (
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

          return content
        }}
      />
    )
  }
}

export default HeaderPaginatorClass
