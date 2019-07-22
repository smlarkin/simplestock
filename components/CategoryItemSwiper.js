/* eslint-disable complexity */
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Swipeout from 'rc-swipeout'
import StyledText from './StyledText'
import { deleteCategory, setEdit, setCategoryIndex } from '../redux/actions'

const CategoryItemSwiper = ({
  deleteCategory,
  index,
  isActive,
  item,
  move,
  moveEnd,
  setCategoryIndex,
  setEdit,
}) => {
  const { color, title } = item
  const backgroundColor = isActive ? 'white' : color.primary

  return (
    <Swipeout
      autoClose={true}
      left={[
        {
          text: 'edit',
          onPress: () => {
            setTimeout(() => setEdit(item), 300)
          },
          style: styles.left,
        },
      ]}
      right={[
        {
          text: 'delete',
          onPress: () => {
            setTimeout(() => deleteCategory(item.key), 300)
          },
          style: styles.right,
        },
      ]}
      style={styles.swipeout}>
      <TouchableOpacity
        style={[styles.touchableOpacity, { backgroundColor }]}
        onPress={() => setCategoryIndex(index)}
        onLongPress={move}
        onPressOut={moveEnd}>
        <StyledText bold style={styles.text}>
          {title}
        </StyledText>
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
    marginBottom: '0.25%',
    marginTop: '0.25%',
    width: '100%',
  },
  touchableOpacity: {
    alignItems: 'center',
    aspectRatio: 7 / 1,
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: 19,
  },
})

const mapDispatchToState = dispatch => ({
  deleteCategory: categoryKey => dispatch(deleteCategory(categoryKey)),
  setCategoryIndex: categoryIndex => dispatch(setCategoryIndex(categoryIndex)),
  setEdit: category => dispatch(setEdit(category)),
})

export default connect(
  null,
  mapDispatchToState
)(CategoryItemSwiper)
