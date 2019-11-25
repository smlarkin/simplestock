import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { layout } from '../constants';

const { width } = layout;
const itemWidthTotal = width / 2 / 7;
const itemWidth = itemWidthTotal / 3;
const itemMargin = itemWidth;
const viewOffset = itemWidthTotal * 3;
const listHeaderOrFooterWidth = viewOffset;

class Paginator extends Component {
  viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  getItemLayout = (_, index) => {
    return {
      length: itemWidthTotal,
      offset: itemWidthTotal * index,
      index,
    };
  };

  componentDidUpdate() {
    if (this.props.categories.length > 0) {
      this.ref.scrollToIndex({
        animated: false,
        index: this.props.categoryIndex,
        viewPosition: 0,
        viewOffset: 0,
      });
    } else {
      this.ref.scrollToIndex({
        animated: false,
        index: this.props.categoryIndex,
        viewPosition: 0,
        viewOffset: viewOffset,
      });
    }
  }

  render() {
    const { categoryIndex, categories } = this.props;
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
            categories.length > 7
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
            categories.length > 7
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
            const color = index === categoryIndex ? 'grey' : item.color.primary;

            return (
              <View
                style={{
                  width: itemWidth,
                  aspectRatio: 1 / 1,
                  qbackgroundColor: color,
                  borderRadius: 50,
                  borderWidth: 1,
                  margin: itemMargin,
                }}
              />
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  categoryIndex: state.categoryIndex,
  categories: state.categories,
});

export default connect(mapStateToProps)(Paginator);
