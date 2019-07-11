import React from 'react'
import { StyleSheet, View } from 'react-native'
import HeaderPaginator from './HeaderPaginator'
// import HeaderPaginatorOLD from './HeaderPaginatorClassOLD'
import HeaderTitle from './HeaderTitle'

const HeaderContent = ({ categories, categoryIndex }) => (
  <View style={styles.container}>
    {categoryIndex === null ? (
      <HeaderTitle />
    ) : (
      <HeaderPaginator categories={categories} categoryIndex={categoryIndex} />
    )}
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 5,
  },
})

export default HeaderContent
