import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import DoubleClick from 'react-native-double-click'
import { connect } from 'react-redux'
import StyledText from './StyledText'
import { setEdit } from '../redux/actions'

const SubcategoryItem = ({
  categoryIndex,
  categories,
  edit,
  index,
  isActive,
  item,
  move,
  moveEnd,
  setEdit,
}) => {
  const { color } = categories[categoryIndex]
  const backgroundColor = isActive
    ? 'white'
    : index % 2 === 0
    ? color.primary
    : color.secondary
  const { title, current, base, type } = item

  function handleOnClick(type) {
    setEdit(item, type)
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onLongPress={edit ? null : move}
      onPressOut={edit ? null : moveEnd}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onMagicTap={() => handleOnClick('title')}
          onLongPress={edit ? null : move}
          onPressOut={edit ? null : moveEnd}>
          <StyledText medium style={styles.title}>
            {title}
          </StyledText>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.currentContainer}> */}
      <DoubleClick onClick={() => handleOnClick('current')}>
        <StyledText bold style={styles.current}>
          {current}
        </StyledText>
      </DoubleClick>
      {/* </View> */}

      <View style={styles.dividerContainer}>
        <StyledText light style={styles.divider}>
          /
        </StyledText>
      </View>

      {/* <View style={styles.baseContainer}> */}
      <DoubleClick onClick={() => handleOnClick('base')}>
        <StyledText bold style={styles.base}>
          {base}
        </StyledText>
      </DoubleClick>
      {/* </View> */}

      <View style={styles.typeContainer}>
        <DoubleClick onClick={() => handleOnClick('type')}>
          <StyledText demi style={styles.type}>
            {type}
          </StyledText>
        </DoubleClick>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    aspectRatio: 7 / 1,
  },
  titleContainer: {
    alignItems: 'center',
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  title: {
    flexWrap: 'wrap',
    fontSize: 18,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  current: {
    fontSize: 20,
    padding: '1%',
  },
  dividerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '0.5%',
    marginTop: '2%',
  },
  divider: {
    fontSize: 40,
  },
  base: {
    fontSize: 20,
    padding: '1%',
  },
  typeContainer: {
    alignItems: 'center',
    flex: 1,
  },
  type: {
    fontSize: 10,
  },
})

const mapStateToProps = state => ({
  categoryIndex: state.categoryIndex,
  categories: state.categories,
  edit: state.edit,
})

const mapDispatchToProps = dispatch => ({
  setEdit: (subcategory, option) => dispatch(setEdit(subcategory, option)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubcategoryItem)
