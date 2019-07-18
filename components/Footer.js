import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FooterViewsNav from './FooterViewsNav'

const Footer = ({
  categories,
  categoryIndex,
  colors,
  edit,
  resetCategories,
  setCategories,
  setCategoryIndex,
  setEdit,
  setShopping,
  shopping,
}) => {
  return (
    <View style={styles.container}>
      <FooterViewsNav
        /* WARNING */ resetCategories={resetCategories} /* <-- */
        /* WARNING */ setEdit={setEdit} /* <-- */
        categories={categories}
        categoryIndex={categoryIndex}
        setCategories={setCategories}
        setShopping={setShopping}
        shopping={shopping}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
})

export default Footer
