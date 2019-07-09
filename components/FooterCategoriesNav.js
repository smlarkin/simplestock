import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
// import SmoothPicker from 'react-native-smooth-picker'
import SideSwipe from 'react-native-sideswipe'
// import SwiperFlatList from 'react-native-swiper-flatlist'
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

  // const renderItem = FooterCategoriesNavContent({
  //   categoryIndex,
  //   colors,
  //   snapInterval,
  // })

  const [useIndexOffset, setUseIndexOffset] = useState(true)

  const index = !useIndexOffset
    ? categoryIndex
    : categoryIndex === categories.length - 1
    ? categoryIndex - 1
    : categoryIndex + 1

  // useEffect(() => {
  //   if (categoryIndex !== categories.length - 1) {
  //     setCategoryIndex(categoryIndex + 1)
  //     setUseIndexOffset(false)
  //   } else if (categoryIndex !== 0) {
  //     setCategoryIndex(categoryIndex - 1)
  //     setUseIndexOffset(false)
  //   }
  //   return setUseIndexOffset(true)
  // }, [])

  return (
    <View style={[styles.container]}>
      {
        // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        //   {newColors.map(color => (
        //     <View
        //       key={color.primary}
        //       style={{
        //         backgroundColor: color.primary,
        //         height: '100%',
        //         width: width / 3 - 10,
        //         margin: 5,
        //         // borderWidth: color.borderWidth ? color.borderWidth : null,
        //         // aspectRatio: 1 / 1,
        //         // borderRadius: 5,
        //         // width: snapInterval - 10,
        //       }}
        //     />
        //   ))}
        // </ScrollView>
        // <FlatList
        //   initialNumToRender={100}
        //   ref={ref => (flatList.ref = ref)}
        //   horizontal
        //   scrollTo
        //   showsHorizontalScrollIndicator={false}
        //   data={categories}
        //   getItemLayout={(data, index) => ({
        //     length: snapInterval,
        //     offset: margin * index,
        //     index,
        //   })}
        //   // pagingEnabled={true}
        //   renderItem={renderItem}
        //   // viewabilityConfig={viewabilityConfig}
        //   // onViewableItemsChanged={handleStuff}
        // />
      }
      {
        <SideSwipe
          // data={categories}
          // horizontal={true}
          // initialScrollIndex={categoryIndex}
          // onSelected={({ _, index }) => setCategoryIndex(index)}
          // renderItem={renderItem}
          // snapInterval={snapInterval}
          // startMargin={margin}
          // endMargin={margin}

          // SIDESWIPE
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
              // <View
              //   style={{
              //     backgroundColor:
              //       itemIndex === currentIndex
              //         ? 'grey'
              //         : colors[itemIndex].primary,
              //     height: '100%',
              //     margin: 5,
              //     width: snapInterval - 10,
              //   }}
              // />
              <View
                style={{
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

          // SWIPER FLAT LIST
          // data={categories}
          // renderAll={true}
          // index={categoryIndex}
          // renderItem={renderItem}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // height: '100%',
    // paddingLeft: 5,
    // paddingRight: 5,
  },
})

export default FooterCategoriesNav
