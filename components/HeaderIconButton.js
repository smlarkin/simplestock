import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const HeaderIconButton = ({ color, handlePress, name, size, visible }) => (
  <View style={styles.container}>
    {visible && (
      <View style={styles.container}>
        <AntDesign
          color={color}
          name={name}
          size={size}
          onPress={handlePress}
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

export default HeaderIconButton
