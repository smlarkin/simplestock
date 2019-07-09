import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Picker from 'react-native-picker-select'
import StyledText from './StyledText'
import { units } from '../constants'
import { amountIsValid } from '../validation'

const SubcategoryItemForm = ({ edit, handleUpdate, item }) => {
  const [title, setTitle] = useState(item.title)
  const [current, setCurrent] = useState(item.current)
  const [base, setBase] = useState(item.base)
  const [type, setType] = useState(item.type)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { key } = item
  let inputs = {}

  function cleanup() {
    setTitle('')
    setCurrent('')
    setBase('')
    setType('')
    // KEEP THIS EXACTLY AS IS :)
    // if (key === '_') {
    //   handleUpdate({ title, current, base, type })
    // }
    setModalVisible(false)
    setModalIsOpen(false)
    inputs = {}
  }

  function focusInput(name) {
    inputs[name].focus()
  }

  function handleOnBlur() {
    if (
      ((!inputs.type && !modalIsOpen) ||
        (inputs.type && !inputs.type.isFocused())) &&
      !inputs.title.isFocused() &&
      !inputs.current.isFocused() &&
      !inputs.base.isFocused()
    ) {
      handleUpdate({ key, title, current, base, type })
    }
  }

  function handleToggleModal() {
    if (!modalIsOpen) {
      setModalVisible(true)
      setModalIsOpen(true)
    } else {
      setModalVisible(false)
      setModalIsOpen(false)
    }
  }

  function handleChangeText(amount, callback) {
    if (amountIsValid(amount)) {
      callback(amount)
    }
  }

  function setRef(ref, name) {
    inputs[name] = ref
  }

  useEffect(() => {
    return cleanup
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TextInput
          autoFocus={true}
          maxLength={42}
          onBlur={() => handleOnBlur('title')}
          onChangeText={e => setTitle(e)}
          onFocus={() => setModalVisible(false)}
          onSubmitEditing={() => focusInput('current')}
          placeholder="Title & Description"
          ref={ref => setRef(ref, 'title')}
          returnKeyType="done"
          selectionColor="black"
          style={styles.title}
          value={title}
        />
      </View>

      <View style={styles.currentAmountContainer}>
        <TextInput
          keyboardType="numeric"
          maxLength={3}
          onBlur={() => handleOnBlur('current')}
          onChangeText={e => handleChangeText(e, setCurrent)}
          onSubmitEditing={() => focusInput('base')}
          placeholder="0"
          ref={ref => setRef(ref, 'current')}
          returnKeyType="done"
          selectionColor="black"
          style={styles.currentAmount}
          value={current}
        />
      </View>

      <View style={styles.dividerContainer}>
        <StyledText light style={styles.divider}>
          /
        </StyledText>
      </View>

      <View style={styles.baseAmountContainer}>
        <TextInput
          keyboardType="numeric"
          maxLength={3}
          onBlur={() => handleOnBlur('base')}
          onChangeText={e => handleChangeText(e, setBase)}
          onSubmitEditing={() => {
            if (!inputs.amountType) {
              handleToggleModal()
            } else {
              focusInput('type')
            }
          }}
          placeholder="0"
          ref={ref => setRef(ref, 'base')}
          returnKeyType="done"
          selectionColor="black"
          style={styles.baseAmount}
          value={base}
        />
      </View>

      <View style={styles.amountTypeContainer}>
        {edit.type === 'new' ? (
          <TouchableOpacity onPress={handleToggleModal}>
            <StyledText
              demi
              style={[
                styles.amountType,
                {
                  color:
                    type === 'UNIT-TYPE' || !type
                      ? 'rgba(0,0,0,0.2)'
                      : '#4A4A4A',
                },
              ]}>
              {type ? type : 'UNIT-TYPE'}
            </StyledText>
            <Picker
              items={units}
              doneText="Submit"
              onDonePress={() => {
                setModalIsOpen(false)
                handleUpdate({ title, current, base, type })
              }}
              onOpen={() => setModalVisible(false)}
              onValueChange={e => setType(e)}
              placeholder={{}}
              style={amountTypeStyles}
              useNativeAndroidPickerStyle={false}
              value={type}
              modalProps={{ visible: modalVisible }}
            />
          </TouchableOpacity>
        ) : (
          <TextInput
            maxLength={10}
            onBlur={() => handleOnBlur('type')}
            onChangeText={e => setType(e)}
            onSubmitEditing={() => {
              handleUpdate({ key, title, current, base, type })
            }}
            placeholder="UNIT-TYPE"
            ref={ref => setRef(ref, 'type')}
            returnKeyType="done"
            selectionColor="black"
            style={styles.amountType}
            value={type}
          />
        )}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    width: '100%',
    aspectRatio: 7 / 1,
    // height: 60,
    padding: 5,
  },
  titleContainer: {
    alignItems: 'center',
    flex: 4,
    flexDirection: 'row',
    // height: 60,
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

const amountTypeStyles = StyleSheet.create({
  inputIOS: {
    display: 'none',
  },
  inputAndroid: {
    display: 'none',
  },
})

export default SubcategoryItemForm
