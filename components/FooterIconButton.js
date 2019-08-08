import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

const FooterIconButton = ({ color, handleOnPress, name, size, visible }) => (
  <View style={styles.container}>
    {visible && (
      <View style={styles.container}>
        <Feather
          color={color}
          name={name}
          size={size}
          onPress={handleOnPress}
        />
      </View>
    )}
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export default FooterIconButton
