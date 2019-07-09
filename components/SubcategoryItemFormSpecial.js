import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import StyledText from './StyledText'
import { amountIsValid } from '../validation'

const SubcategoryItemFormSpecial = ({ edit, handleUpdate, item, setEdit }) => {
  const [current, setCurrent] = useState(item.current)
  const [base, setBase] = useState(item.base)
  const { key, title, type } = item
  const textInput = useRef(null)

  function cleanup() {
    setCurrent('')
    setBase('')
  }

  // WORK ON THIS
  // function handleDoubleClick(type) {
  //   setEdit(edit, type)
  // }

  function handleOnBlur(amountName) {
    if (amountName) {
      handleUpdate({ key, title, current, base, type })
    } else {
      textInput.current.focus()
    }
  }

  function handleChangeText(amount, callback) {
    if (amountIsValid(amount)) {
      callback(amount)
    }
  }

  useEffect(() => {
    return cleanup
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <StyledText medium style={styles.title}>
          {title}
        </StyledText>
      </View>

      <View style={styles.currentAmountContainer}>
        {edit.type === 'current' ? (
          <TextInput
            autoFocus={true}
            keyboardType="numeric"
            maxLength={3}
            onBlur={() => handleOnBlur(current)}
            onChangeText={e => handleChangeText(e, setCurrent)}
            placeholder="0"
            ref={textInput}
            returnKeyType="done"
            selectionColor="black"
            style={styles.currentAmount}
            value={current}
          />
        ) : (
          <StyledText bold style={styles.currentAmount}>
            {current}
          </StyledText>
        )}
      </View>

      <View style={styles.dividerContainer}>
        <StyledText light style={styles.divider}>
          /
        </StyledText>
      </View>

      <View style={styles.baseAmountContainer}>
        {edit.type === 'base' ? (
          <TextInput
            autoFocus={true}
            keyboardType="numeric"
            maxLength={3}
            onBlur={() => handleOnBlur(base)}
            onChangeText={e => handleChangeText(e, setBase)}
            placeholder="0"
            ref={textInput}
            returnKeyType="done"
            selectionColor="black"
            style={styles.baseAmount}
            value={base}
          />
        ) : (
          <StyledText bold style={styles.baseAmount}>
            {base}
          </StyledText>
        )}
      </View>

      <View style={styles.amountTypeContainer}>
        <StyledText demi style={styles.amountType}>
          {type}
        </StyledText>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
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
  currentAmount: {
    fontSize: 20,
    padding: 5,
  },
  dividerContainer: {
    marginLeft: 3,
  },
  divider: {
    fontSize: 40,
  },
  baseAmount: {
    fontSize: 20,
    padding: 5,
  },
  amountTypeContainer: {
    alignItems: 'center',
    flex: 1,
  },
  amountType: {
    fontSize: 10,
    padding: 5,
  },
})

export default SubcategoryItemFormSpecial
