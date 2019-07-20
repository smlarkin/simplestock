/* eslint-disable complexity */
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { deleteCategory, setEdit, setCategoryIndex } from '../redux/actions'
import Swipeout from 'rc-swipeout'
import StyledText from './StyledText'

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
  return (
    <Swipeout
      autoClose={true}
      left={[
        {
          text: 'edit',
          onPress: () => setEdit(item),
          style: styles.left,
        },
      ]}
      right={[
        {
          text: 'delete',
          onPress: () => deleteCategory(item.key),
          style: styles.right,
        },
      ]}
      style={styles.swipeout}>
      <TouchableOpacity
        style={[
          styles.touchableOpacity,
          {
            backgroundColor: isActive ? 'white' : color.primary,
          },
        ]}
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
