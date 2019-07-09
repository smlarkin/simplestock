import React from 'react'
import { StyleSheet, View } from 'react-native'
import StyledText from './StyledText'

const CategoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <StyledText bold style={styles.title}>
        {item.title}
      </StyledText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    aspectRatio: 8 / 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 19,
  },
})

export default CategoryItem
