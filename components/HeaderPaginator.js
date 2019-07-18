import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { layout } from '../constants'
import StyledText from './StyledText'

const { width } = layout
const itemWidthTotal = width / 9
const itemWidth = itemWidthTotal / 5
const itemMargin = itemWidth * 2
const viewOffset = itemWidthTotal * 4
const listHeaderOrFooterWidth = viewOffset

class BodyPaginator extends Component {
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

  // componentDidMount() {
  //   this.ref.scrollToIndex({
  //     index: this.props.categoryIndex,
  //     viewPosition: 0,
  //     viewOffset: viewOffset,
  //   })
  // }

  componentDidUpdate() {
    // VERSION 1
    if (this.props.categories.length > 0) {
      this.ref.scrollToIndex({
        animated: false,
        index: this.props.categoryIndex,
        viewPosition: 0,
        viewOffset: 0,
      })
    } else {
      // VERSION 2
      this.ref.scrollToIndex({
        animated: false,
        index: this.props.categoryIndex,
        viewPosition: 0,
        viewOffset: viewOffset,
      })
    }
  }

  componentWillUnmount() {
    this.setState({ viewableItems: [] })
  }

  render() {
    const { categoryIndex, categories } = this.props
    const { viewableItems } = this.state
    return (
      <View style={styles.container}>
        <FlatList
          initialScrollIndex={categoryIndex}
          snapToInterval={itemWidthTotal}
          snapToAlignment="start"
          disableScrollViewPanResponder={true}
          decelerationRate="fast"
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          ref={ref => (this.ref = ref)}
          contentContainerStyle={styles.contentContainerStyle}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          getItemLayout={this.getItemLayout}
          data={categories}
          horizontal
          ListFooterComponent={
            categories.length > 9
              ? () => (
                  <View
                    style={{
                      backgroundColor: 'black',
                      height: 1,
                      width: listHeaderOrFooterWidth,
                    }}
                  />
                )
              : null
          }
          ListHeaderComponent={
            categories.length > 9
              ? () => (
                  <View
                    style={{
                      backgroundColor: 'black',
                      height: 1,
                      width: listHeaderOrFooterWidth,
                    }}
                  />
                )
              : null
          }
          renderItem={({ index, item }) => {
            const backgroundColor = index === categoryIndex ? 'grey' : null

            const stylePaginationWithArrowBrackets = () => {
              const { key } = item
              const first = viewableItems[0]
              const last = viewableItems[viewableItems.length - 1]
              if (
                categories.length > 9 &&
                categoryIndex > 4 &&
                index < categoryIndex - 3
              ) {
                /* if (categoryIndex > 4 && key === first.key) */ return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: itemMargin,
                      width: itemWidth,
                    }}>
                    <StyledText demi style={{ fontSize: 13 }}>{`<`}</StyledText>
                  </View>
                )
              } else if (
                categories.length > 9 &&
                categoryIndex < categories.length - 1 &&
                index > categoryIndex + 3 &&
                index !== categories.length - 1
              ) {
                /* else if (
              categoryIndex < categories.length - 1 - 4 &&
              key === last.key
            ) */ return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: itemMargin,
                      width: itemWidth,
                    }}>
                    <StyledText demi style={{ fontSize: 13 }}>{`>`}</StyledText>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginTop: -itemMargin,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
})

export default BodyPaginator
