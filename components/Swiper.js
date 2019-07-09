import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Swipeout from 'rc-swipeout'

const BodyRenderItem = ({
  category,
  color,
  handleDelete,
  handleEdit,
  handleSelect,
  isActive,
  move,
  moveEnd,
  children,
}) => (
  <Swipeout
    autoClose={true}
    left={[
      {
        text: 'edit',
        onPress: handleEdit,
        style: styles.left,
      },
    ]}
    right={[
      {
        text: 'delete',
        onPress: handleDelete,
        style: styles.right,
      },
    ]}
    style={[
      styles.swipeout,
      !category ? styles.swipeoutWithoutCategory : null,
    ]}>
    <TouchableOpacity
      style={[
        styles.touchableOpacity,
        { aspectRatio: !category ? 8 / 1 : 7 / 1 },
        { backgroundColor: isActive ? 'white' : color },
      ]}
      onPress={handleSelect}
      onLongPress={move}
      onPressOut={moveEnd}>
      {children}
    </TouchableOpacity>
  </Swipeout>
)

const styles = StyleSheet.create({
  left: { backgroundColor: 'white', color: 'black', fontSize: 19 },
  right: { backgroundColor: 'white', color: 'black', fontSize: 19 },
  swipeout: {
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  // FOR CATEGORY MARGINS
  swipeoutWithoutCategory: {
    marginBottom: 5,
    marginTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
})

export default BodyRenderItem
