import React from 'react'
import { StyleSheet, View } from 'react-native'
import StyledText from './StyledText'

const BlankScreen = () => (
  <View style={styles.container}>
    <StyledText>BLANK</StyledText>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default BlankScreen
