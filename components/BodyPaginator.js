import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { layout } from '../constants';

const { width } = layout;
const itemWidthTotal = width / 2 / 7;
const itemWidth = itemWidthTotal / 3;
const itemMargin = itemWidth;
const viewOffset = itemWidthTotal * 3;
const listHeaderOrFooterWidth = viewOffset;
const viewabilityConfig = {
  itemVisiblePercentThreshold: 50,
};
const getItemLayout = (_, index) => ({
  length: itemWidthTotal,
  offset: itemWidthTotal * index,
  index,
});

class BodyPaginator extends Component {
  componentDidUpdate() {
    this.ref.scrollToIndex({
      animated: false,
      index: this.props.categoryIndex,
      viewPosition: 0,
      viewOffset: 0,
    });
  }

  render() {
    const { categoryIndex, categoriesFiltered } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          initialScrollIndex={categoryIndex}
          snapToInterval={itemWidthTotal}
          snapToAlignment="start"
          disableScrollViewPanResponder={true}
          decelerationRate="fast"
          viewabilityConfig={viewabilityConfig}
          ref={ref => (this.ref = ref)}
          contentContainerStyle={styles.contentContainerStyle}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          getItemLayout={getItemLayout}
          data={categoriesFiltered}
          horizontal
          ListFooterComponent={
            categoriesFiltered.length > 7
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
            categoriesFiltered.length > 7
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
                  backgroundColor: color,
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

// const mapStateToProps = state => ({
//   categoryIndex: state.categoryIndex,
//   categories: state.categories,
//   shopping: state.shopping,
// });

// export default connect(mapStateToProps)(BodyPaginator);
export default BodyPaginator;
