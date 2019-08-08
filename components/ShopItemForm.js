import React, { useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Checkbox from 'react-native-modest-checkbox'
import StyledText from './StyledText'
import { amountIsValid } from '../validation'

const ShopItemForm = ({ color, edit, handleUpdate, item }) => {
  const { key, current, base, title, type, shop } = item
  const [difference, setDifference] = useState(item.difference)
  const textInput = useRef(null)

  function handleOnChangeText(amount, callback) {
    if (amountIsValid(amount)) {
      callback(amount)
    }
  }

  function handleOnBlur() {
    if (difference) {
      const updatedCurrent = parseInt(current, 10) + parseInt(difference, 10)
      handleUpdate({
        key,
        current: `${updatedCurrent}`,
        base,
        title,
        type,
        difference,
        shop,
      })
    } else {
      textInput.current.focus()
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.titleContainer}>
        <StyledText medium style={styles.title}>
          {title}
        </StyledText>
      </View>

      <View style={styles.amountContainer}>
        <TextInput
          autoFocus={true}
          keyboardType="numeric"
          maxLength={3}
          onBlur={() => handleOnBlur()}
          onChangeText={e => handleOnChangeText(e, setDifference)}
          placeholder="0"
          ref={textInput}
          returnKeyType="done"
          selectionColor="black"
          style={styles.difference}
          value={difference}
        />
        <StyledText demi style={styles.type}>
          {type}
        </StyledText>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox checked={false} label="" />
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
    height: 60,
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
  difference: {
    fontSize: 20,
  },
  type: {
    fontSize: 10,
    marginTop: 3,
  },
  checkboxContainer: {
    alignItems: 'center',
    flex: 1,
    opacity: 0.75,
    padding: 15,
  },
})

export default ShopItemForm
