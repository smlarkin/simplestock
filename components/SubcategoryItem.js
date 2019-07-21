/* eslint-disable complexity */
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
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
  const [lastTap, setLastTap] = useState(null)

  function handleOnPress(type) {
    const DELAY = 300
    const now = Date.now()
    if (lastTap && now - lastTap < DELAY) {
      setEdit(item, type)
    } else {
      setLastTap(now)
    }
  }

  useEffect(() => setLastTap(null), [])

  return (
    <TouchableOpacity
      activeOpacity={1}
      onLongPress={edit ? null : move}
      onPressOut={edit ? null : isActive ? moveEnd : null}
      style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleOnPress('title')}
        onLongPress={edit ? null : move}
        onPressOut={edit ? null : isActive ? moveEnd : null}
        style={styles.titleContainer}>
        <StyledText medium style={styles.title}>
          {title}
        </StyledText>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleOnPress('current')}
        onLongPress={edit ? null : move}
        onPressOut={edit ? null : isActive ? moveEnd : null}
        style={styles.currentContainer}>
        <StyledText bold style={styles.current}>
          {current}
        </StyledText>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <StyledText light style={styles.divider}>
          /
        </StyledText>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleOnPress('base')}
        onLongPress={edit ? null : move}
        onPressOut={edit ? null : isActive ? moveEnd : null}
        style={styles.baseContainer}>
        <StyledText bold style={styles.base}>
          {base}
        </StyledText>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleOnPress('type')}
        onLongPress={edit ? null : move}
        onPressOut={edit ? null : isActive ? moveEnd : null}
        style={styles.typeContainer}>
        <StyledText demi style={styles.type}>
          {type}
        </StyledText>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    aspectRatio: 7 / 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '1%',
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: '4%',
    paddingRight: '1%',
  },
  title: {
    flexWrap: 'wrap',
    fontSize: 18,
  },
  currentContainer: {
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  current: {
    fontSize: 20,
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
  baseContainer: {
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  base: {
    fontSize: 20,
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
