import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Checkbox from 'react-native-modest-checkbox'
import StyledText from './StyledText'
import { amountIsValid } from '../validation'

const ShopForm = ({ color, edit, handleUpdate, item }) => {
  const { key, current, base, title, type, shop } = item
  const [difference, setDifference] = useState(item.difference)
  const textInput = useRef(null)

  function cleanup() {
    setDifference('')
  }

  function handleChangeText(amount, callback) {
    if (amountIsValid(amount)) {
      callback(amount)
    }
  }

  function handleOnBlur() {
    if (difference) {
      const updatedCurrent = Number(current) + Number(difference)
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

  useEffect(() => {
    if (edit.type === 'wait') {
      setTimeout(() => {
        const shop = 'wait'
        handleUpdate({ key, current, base, title, type, difference, shop })
      }, 300)
    }
  }, [edit.type])

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

      <View style={styles.amountContainer}>
        {edit.type !== 'wait' ? (
          <TextInput
            autoFocus={true}
            keyboardType="numeric"
            maxLength={3}
            onBlur={() => handleOnBlur()}
            onChangeText={e => handleChangeText(e, setDifference)}
            placeholder="0"
            ref={textInput}
            returnKeyType="done"
            selectionColor="black"
            style={styles.difference}
            value={difference}
          />
        ) : (
          <StyledText bold style={styles.amount}>
            {difference}
          </StyledText>
        )}
        <StyledText
          demi
          style={edit.type !== 'wait' ? styles.type : styles.amountType}>
          {type}
        </StyledText>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox checked={edit.type === 'wait'} label="" />
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
  amountType: {
    fontSize: 10,
    padding: 5,
    paddingTop: -5,
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

export default ShopForm
