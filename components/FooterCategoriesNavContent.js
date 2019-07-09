import React from 'react'
import { View } from 'react-native'
import { colors } from '../constants'
import { mapIndexToColors } from '../util'
const { selected } = colors

const FooterCategoriesNavContent = ({ categoryIndex, colors, snapInterval }) =>
  // eslint-disable-next-line react/display-name
  ({ index }) => {
    const unselected = mapIndexToColors(index, colors)
    const backgroundColor =
      index === categoryIndex ? selected : unselected.primary
    return (
      <View
        style={{
          backgroundColor,
          height: '100%',
          width: snapInterval - 10,
          margin: 5,
        }}
      />
    )
  }

export default FooterCategoriesNavContent
