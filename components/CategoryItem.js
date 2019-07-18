/* eslint-disable complexity */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { deleteCategory, setEdit, setCategoryIndex } from '../redux/actions'
import StyledText from './StyledText'

const CategoryItem = ({ item }) => {
  const { color, title } = item
  return (
    <View style={[styles.container, { backgroundColor: color.primary }]}>
      <StyledText bold style={styles.text}>
        {title}
      </StyledText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    aspectRatio: 7 / 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '0.25%',
    marginTop: '0.25%',
    width: '100%',
  },
  text: {
    fontSize: 19,
  },
})

export default CategoryItem
