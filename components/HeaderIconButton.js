import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const HeaderIconButton = ({ color, handlePress, name, size, visible }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={visible ? handlePress : null}>
    {visible && <AntDesign color={color} name={name} size={size} />}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
    aspectRatio: 1 / 1,
  },
})

export default HeaderIconButton
