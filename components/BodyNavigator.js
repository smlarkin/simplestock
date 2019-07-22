import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import StyledText from './StyledText'
import { setCategoryIndex } from '../redux/actions'
import { layout } from '../constants'
const { width } = layout
import BodyPaginator from './BodyPaginator'

const BodyNavigator = ({ categories, categoryIndex, setCategoryIndex }) => {
  const previousIndex = categoryIndex - 1
  const previousIndexIsValid = previousIndex >= 0
  const nextIndex = categoryIndex + 1
  const nextIndexIsValid = nextIndex <= categories.length - 1

  function handleOnPress(direction) {
    if (direction === 'previous' && previousIndexIsValid) {
      setCategoryIndex(previousIndex)
    } else if (direction === 'next' && nextIndexIsValid) {
      setCategoryIndex(nextIndex)
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleOnPress('previous')}
        style={styles.leftArrow}>
        <StyledText
          style={{
            fontSize: 30,
            color: !previousIndexIsValid ? 'lightgrey' : 'black',
          }}>
          {'<'}
        </StyledText>
      </TouchableOpacity>
      {/* <View style={styles.spacer} /> */}
      <BodyPaginator />
      <TouchableOpacity
        onPress={() => handleOnPress('next')}
        style={styles.rightArrow}>
        <StyledText
          style={{
            fontSize: 30,
            color: !nextIndexIsValid ? 'lightgrey' : 'black',
          }}>
          {'>'}
        </StyledText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width,
  },
  spacer: {
    flex: 2,
  },
  leftArrow: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    // paddingRight: '2%',
  },
  rightArrow: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    // paddingLeft: '2%',
  },
})

const mapStateToProps = state => ({
  categories: state.categories,
  categoryIndex: state.categoryIndex,
})

const mapDispatchToProps = dispatch => ({
  setCategoryIndex: index => dispatch(setCategoryIndex(index)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BodyNavigator)
