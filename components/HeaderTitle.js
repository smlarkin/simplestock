import React from 'react'
import { StyleSheet, View } from 'react-native'
import StyledText from './StyledText'

const HeaderTitle = () => (
  <StyledText semi numberOfLines={1} style={styles.title}>
    Simple Stock
  </StyledText>
)

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'black',
  },
})

export default HeaderTitle
