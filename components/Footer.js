import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FooterCategoriesNav from './FooterCategoriesNav'
import FooterViewsNav from './FooterViewsNav'

const Footer = ({
  categories,
  categoryIndex,
  colors,
  // edit,
  resetCategories,
  setCategories,
  setCategoryIndex,
  setEdit,
  setShopping,
  shopping,
}) => {
  // const offsetIndex =
  //   categoryIndex !== 0 ? categoryIndex - 1 : categoryIndex + 1
  return (
    <View
      style={[
        styles.container,
        // {
        //   flex: categoryIndex !== null ? 2 : 1,
        // },
      ]}>
      {/* {categoryIndex !== null && (
        <FooterCategoriesNav
          categories={categories}
          categoryIndex={categoryIndex}
          colors={colors}
          // offsetIndex={offsetIndex}
          setCategoryIndex={setCategoryIndex}
        />
      )} */}
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
