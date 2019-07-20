/* eslint-disable complexity */
import React, { useEffect, useState } from 'react'
import { Keyboard, StyleSheet, TextInput, View } from 'react-native'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import StyledText from './StyledText'
import SubcategoryItemUnitPicker from './SubcategoryItemUnitPicker'
import { layout } from '../constants'
import { amountIsValid, validateAndUpdateSubcategory } from '../validation'
import { deleteSubcategory, setEdit, updateSubcategory } from '../redux/actions'

const SubcategoryItemForm = ({
  categories,
  categoryIndex,
  deleteSubcategory,
  edit,
  index,
  item,
  setEdit,
  updateSubcategory,
}) => {
  const category = categories[categoryIndex]
  const { color } = category
  const backgroundColor = index % 2 === 0 ? color.primary : color.secondary
  const [title, setTitle] = useState(item.title)
  const [current, setCurrent] = useState(item.current)
  const [base, setBase] = useState(item.base)
  const [type, setType] = useState(item.type)
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const { difference, key, shop } = item
  let inputs = {}

  function cleanup() {
    setTitle('')
    setCurrent('')
    setBase('')
    setType('')
    setModalIsVisible(false)
    inputs = {}
  }

  function focusInput(name) {
    inputs[name].focus()
  }

  function handleChangeText(amount, callback) {
    if (amountIsValid(amount)) {
      callback(amount)
    }
  }

  function handleOnBlur() {
    if (
      !inputs.title.isFocused() &&
      !inputs.current.isFocused() &&
      !inputs.base.isFocused() &&
      !inputs.type.isFocused()
    ) {
      validateAndUpdate()
    }
  }

  function handleSubmit() {
    setModalIsVisible(false)
    validateAndUpdate()
  }

  function setRef(ref, name) {
    inputs[name] = ref
  }

  function validateAndUpdate() {
    validateAndUpdateSubcategory({
      category,
      base,
      edit,
      current,
      difference,
      deleteSubcategory,
      key,
      setEdit,
      shop,
      title,
      type,
      updateSubcategory,
    })
  }

  useEffect(() => {
    return cleanup
  }, [])

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.titleContainer}>
        <TextInput
          autoFocus={edit.type === 'new' || edit.type === 'title'}
          maxLength={42}
          onBlur={handleOnBlur}
          onChangeText={e => setTitle(e)}
          onFocus={() => setModalIsVisible(false)}
          onSubmitEditing={() => {
            edit.type === 'new' ? focusInput('current') : Keyboard.dismiss()
          }}
          placeholder="Title & Description"
          ref={ref => setRef(ref, 'title')}
          returnKeyType="done"
          selectionColor="black"
          style={styles.title}
          value={title}
        />
      </View>

      <TextInput
        autoFocus={edit.type === 'current'}
        keyboardType="numeric"
        maxLength={3}
        onBlur={handleOnBlur}
        onChangeText={e => handleChangeText(e, setCurrent)}
        onSubmitEditing={() => {
          edit.type === 'new' ? focusInput('base') : Keyboard.dismiss()
        }}
        placeholder="0"
        ref={ref => setRef(ref, 'current')}
        returnKeyType="done"
        selectionColor="black"
        style={styles.current}
        value={current}
      />

      <View style={styles.dividerContainer}>
        <StyledText light style={styles.divider}>
          /
        </StyledText>
      </View>

      <TextInput
        autoFocus={edit.type === 'base'}
        keyboardType="numeric"
        maxLength={3}
        onBlur={handleOnBlur}
        onChangeText={e => handleChangeText(e, setBase)}
        onSubmitEditing={() => {
          edit.type === 'new' ? focusInput('type') : Keyboard.dismiss()
        }}
        placeholder="0"
        ref={ref => setRef(ref, 'base')}
        returnKeyType="done"
        selectionColor="black"
        style={styles.base}
        value={base}
      />

      <View style={styles.typeContainer}>
        <TextInput
          autoFocus={edit.type === 'type'}
          maxLength={10}
          onBlur={() => edit.type !== 'new' && handleOnBlur()}
          onChangeText={e => setType(e)}
          onFocus={() => {
            if (edit.type === 'new') {
              Keyboard.dismiss()
              setModalIsVisible(true)
            }
          }}
          onSubmitEditing={validateAndUpdate}
          placeholder=" UNIT-TYPE"
          ref={ref => setRef(ref, 'type')}
          returnKeyType="done"
          selectionColor={edit.type === 'new' ? backgroundColor : 'black'}
          style={styles.type}
          value={type}
        />

        <Modal
          hasBackdrop={true}
          isVisible={modalIsVisible}
          onBackButtonPress={() => setModalIsVisible(false)}
          onBackdropPress={() => setModalIsVisible(false)}
          style={{
            alignItems: 'center',
            deviceHeight: layout.height,
            deviceWidth: layout.width,
            justifyContent: 'flex-end',
            margin: 0,
          }}>
          <SubcategoryItemUnitPicker
            handleSubmit={handleSubmit}
            setType={setType}
            type={type}
          />
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
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
  deleteSubcategory: ({ categoryKey, subcategoryKey }) =>
    dispatch(deleteSubcategory({ categoryKey, subcategoryKey })),
  setEdit: (subcategory, option) => dispatch(setEdit(subcategory, option)),
  updateSubcategory: ({ categoryKey, subcategoryKey, subcategory }) =>
    dispatch(updateSubcategory({ categoryKey, subcategoryKey, subcategory })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubcategoryItemForm)
