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
  const editTypeIsNew = edit.type === 'new'
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
    if (editTypeIsNew) {
      if (
        !inputs.title.isFocused() &&
        !inputs.current.isFocused() &&
        !inputs.base.isFocused() &&
        !inputs.type.isFocused()
      ) {
        validateAndUpdate()
      }
    } else {
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
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderWidth: editTypeIsNew ? 1 : null,
          paddingTop: !editTypeIsNew ? '1%' : null,
        },
      ]}>
      <View
        style={[
          styles.titleContainer,
          { paddingBottom: edit.type === 'title' ? '1%' : null },
        ]}>
        {editTypeIsNew || edit.type === 'title' ? (
          <TextInput
            autoFocus={editTypeIsNew || edit.type === 'title'}
            maxLength={42}
            onBlur={handleOnBlur}
            onChangeText={e => setTitle(e)}
            onFocus={() => setModalIsVisible(false)}
            onSubmitEditing={() => {
              editTypeIsNew ? focusInput('current') : Keyboard.dismiss()
            }}
            placeholder="Title & Description"
            ref={ref => setRef(ref, 'title')}
            returnKeyType="done"
            selectionColor="black"
            style={styles.title}
            value={title}
          />
        ) : (
          <StyledText medium style={styles.title}>
            {title}
          </StyledText>
        )}
      </View>

      <View
        style={[
          styles.currentContainer,
          { paddingBottom: edit.type === 'current' ? '1.5%' : null },
        ]}>
        {editTypeIsNew || edit.type === 'current' ? (
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
        ) : (
          <StyledText bold style={styles.current}>
            {current}
          </StyledText>
        )}
      </View>

      <View style={styles.dividerContainer}>
        <StyledText light style={styles.divider}>
          /
        </StyledText>
      </View>

      <View
        style={[
          styles.baseContainer,
          {
            paddingBottom: edit.type === 'base' ? '1.5%' : null,
            marginLeft: edit.type === 'base' ? '1%' : null,
          },
        ]}>
        {editTypeIsNew || edit.type === 'base' ? (
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
        ) : (
          <StyledText bold style={styles.base}>
            {base}
          </StyledText>
        )}
      </View>

      <View
        style={[
          styles.typeContainer,
          { paddingBottom: edit.type === 'type' ? '.5%' : null },
        ]}>
        {editTypeIsNew || edit.type === 'type' ? (
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
        ) : (
          <StyledText demi style={styles.type}>
            {type}
          </StyledText>
        )}

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
    aspectRatio: 7 / 1,
    flexDirection: 'row',
    justifyContent: 'center',
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
