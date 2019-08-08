import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const HeaderIconButton = ({ color, handleOnPress, name, size, visible }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={visible ? handleOnPress : null}>
    {visible && <AntDesign color={color} name={name} size={size} />}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    aspectRatio: 1 / 1,
  },
})

export default HeaderIconButton
