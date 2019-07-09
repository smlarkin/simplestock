import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const CategoryItemForm = ({ handleUpdate, item }) => {
  const { key, subcategories } = item
  const [title, setTitle] = useState(item.title)
  const textInput = useRef(null)

  function cleanup() {
    setTitle('')
  }

  function handleOnBlur() {
    textInput.current.focus()
  }

  function handleOnSubmitEditing() {
    handleUpdate({ key, title, subcategories })
  }

  useEffect(() => {
    return cleanup
  }, [])

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus={true}
        blurOnSubmit={false}
        maxLength={26}
        onBlur={handleOnBlur}
        onChangeText={e => setTitle(e)}
        onSubmitEditing={handleOnSubmitEditing}
        placeholder="Category Title"
        ref={textInput}
        returnKeyType="done"
        selectionColor="black"
        style={styles.title}
        value={title}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    width: '100%',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
  },

  title: {
    fontSize: 19,
  },
})

export default CategoryItemForm
