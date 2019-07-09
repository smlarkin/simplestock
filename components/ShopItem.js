import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import DoubleClick from 'react-native-double-click'
import Checkbox from 'react-native-modest-checkbox'
import StyledText from './StyledText'

const ShopItem = ({ color, setEdit, item }) => {
  const { key, title, current, base, type, difference } = item
  const [isChecked, setIsChecked] = useState(false)

  function cleanup() {
    setIsChecked(false)
  }

  function handleDoubleClick() {
    setEdit(item)
  }

  function handleCheckbox() {
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    if (isChecked) {
      setEdit({ key, title, current, base, type, difference }, 'wait')
    }
  }, [isChecked])

  useEffect(() => {
    return cleanup
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.titleContainer}>
        <StyledText medium style={styles.title}>
          {title}
        </StyledText>
      </View>

      <DoubleClick onClick={handleDoubleClick} style={styles.amountContainer}>
        <StyledText bold style={styles.amount}>
          {difference}
        </StyledText>
        <StyledText demi style={styles.amountType}>
          {type}
        </StyledText>
      </DoubleClick>

      <View style={styles.checkboxContainer}>
        <Checkbox checked={isChecked} label="" onChange={handleCheckbox} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    aspectRatio: 7 / 1,
    padding: 5,
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
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
  amountContainer: {
    alignItems: 'center',
    flex: 1,
  },
  amount: {
    fontSize: 20,
    padding: 5,
    paddingBottom: -5,
  },
  amountType: {
    fontSize: 10,
    padding: 5,
    paddingTop: -5,
  },
  checkboxContainer: {
    alignItems: 'center',
    flex: 1,
    opacity: 0.75,
    padding: 15,
  },
})

export default ShopItem
