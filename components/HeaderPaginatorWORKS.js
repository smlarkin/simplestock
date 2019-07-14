import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { layout } from '../constants'
import StyledText from './StyledText'

const { width } = layout
const withExtra = width / 30
const flatListWidth = (width * 5) / 7
const viewOffset = flatListWidth / 2 - withExtra
const itemWidthTotal = flatListWidth / 9
const itemWidth = itemWidthTotal / 5
const itemMargin = itemWidth * 2

class HeaderPaginatorClass extends Component {
  state = { viewableItems: [] }

  viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  }

  getItemLayout = (data, index) => {
    return {
      length: itemWidthTotal,
      offset: itemWidthTotal * index,
      index,
    }
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    this.setState({ viewableItems })
    // console.log('Visible items are', viewableItems)
    // console.log('Changed in this iteration', changed)
  }

  componentDidMount() {
    this.ref.scrollToIndex({
      index: this.props.categoryIndex,
      viewPosition: 0,
      viewOffset: viewOffset,
    })
  }

  componentDidUpdate() {
    this.ref.scrollToIndex({
      index: this.props.categoryIndex,
      viewPosition: 0,
      viewOffset: viewOffset,
    })
  }

  componentWillUnmount() {
    this.setState({ viewableItems: [] })
  }

  render() {
    const { categoryIndex, categories } = this.props
    const { viewableItems } = this.state
    return (
      <FlatList
        // disableScrollViewPanResponder={true}
        // decelerationRate="fast"
        // pagingEnabled={true}
        onViewableItemsChanged={this.onViewableItemsChanged}
        viewabilityConfig={this.viewabilityConfig}
        ref={ref => (this.ref = ref)}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        getItemLayout={this.getItemLayout}
        data={categories}
        horizontal
        renderItem={({ index, item }) => {
          const backgroundColor = index === categoryIndex ? 'grey' : null

          const stylePaginationWithArrowBrackets = () => {
            const { key } = item
            const first = viewableItems[0]
            const last = viewableItems[viewableItems.length - 1]
            if (categoryIndex > 4 && key === first.key) {
              return (
                <View
                  style={{
                    width: itemWidth,
                    margin: itemMargin,
                    alignItems: 'center',
                  }}>
                  <StyledText style={{ fontSize: 12 }}>{`<`}</StyledText>
                </View>
              )
            } else if (
              categoryIndex < categories.length - 1 - 4 &&
              key === last.key
            ) {
              return (
                <View
                  style={{
                    width: itemWidth,
                    margin: itemMargin,
                    alignItems: 'center',
                  }}>
                  <StyledText style={{ fontSize: 12 }}>{`>`}</StyledText>
                </View>
              )
            } else {
              return (
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
            }
          }

          const content =
            viewableItems.length && categories.length > 9 ? (
              stylePaginationWithArrowBrackets()
            ) : (
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
