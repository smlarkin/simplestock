import React from 'react'
import { StyleSheet, View } from 'react-native'
import StyledText from './StyledText'

const HeaderText = ({ title }) => (
  <View style={styles.container}>
    <StyledText semi numberOfLines={1} style={styles.title}>
      {title}
    </StyledText>
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 4,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
})

export default HeaderText
