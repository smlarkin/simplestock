/* eslint-disable complexity */
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Swipeout from 'rc-swipeout'

const Swiper = ({
  category,
  color,
  edit,
  handleDelete,
  handleEdit,
  handleSelect,
  isActive,
  move,
  moveEnd,
  children,
}) => {
  const backgroundColor = children.props.item.color
    ? children.props.item.color.primary
    : color
  // const isEditItem = edit && children.props.item.key === edit.item.key
  // const isNotEditItem = edit && children.props.item.key !== edit.item.key
  return (
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
          {
            aspectRatio: 7 / 1,
          },
          {
            backgroundColor: isActive ? 'white' : backgroundColor,
          },
        ]}
        onPress={handleSelect}
        onLongPress={move}
        onPressOut={moveEnd}>
        {children}
      </TouchableOpacity>
    </Swipeout>
  )
}

const styles = StyleSheet.create({
  left: { backgroundColor: 'white', color: 'black', fontSize: 19 },
  right: { backgroundColor: 'white', color: 'black', fontSize: 19 },
  swipeout: {
    aspectRatio: 7 / 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginBottom: '0.25%',
    marginTop: '0.25%',
    width: '100%',
  },
  // FOR CATEGORY MARGINS
  // swipeoutWithoutCategory: {
  //   marginBottom: '0.5%',
  //   marginTop: '0.5%',
  //   marginLeft: '1%',
  //   marginRight: '1%',
  // },
  touchableOpacity: {
    // alignItems: 'center',
    // backgroundColor: 'white',
    // justifyContent: 'center',
    // marginBottom: '0.5%',
    // marginTop: '0.5%',
    // width: '100%',
  },
})

export default Swiper
