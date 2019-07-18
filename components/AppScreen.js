import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import StatusBarSpacer from './StatusBarSpacer'
import Header from './Header'
import HeaderPaginator from './HeaderPaginator'
import Body from './Body'
import Footer from './Footer'
import { mapCategoriesToColors } from '../util'
import { colors } from '../constants'
import {
  createCategory,
  createSubcategory,
  deleteCategory,
  deleteSubcategory,
  resetCategories,
  setCategories,
  setCategoryIndex,
  setEdit,
  setShopping,
  setSubcategories,
  updateCategory,
  updateSubcategory,
} from '../redux/actions'

const { backgrounds } = colors

const AppScreen = props => {
  // console.log(props)
  const { categories } = props
  const [colors, setColors] = useState(
    mapCategoriesToColors(categories, backgrounds)
  )

  useEffect(() => {
    const newColors = mapCategoriesToColors(categories, backgrounds)
    setColors(newColors)
  }, [categories])

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      {Platform.OS === 'ios' && <StatusBarSpacer />}
      <Header {...props} />
      {props.categoryIndex !== null && <HeaderPaginator {...props} />}
      <Body {...props} colors={colors} />
      <Footer {...props} colors={colors} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = state => ({
  categories: state.categories,
  categoryIndex: state.categoryIndex,
  edit: state.edit,
  shopping: state.shopping,
})

const mapDispatchToProps = dispatch => ({
  createCategory: category => dispatch(createCategory(category)),
  createSubcategory: ({ categoryKey, subcategory }) =>
    dispatch(createSubcategory({ categoryKey, subcategory })),
  deleteCategory: categoryKey => dispatch(deleteCategory(categoryKey)),
  deleteSubcategory: ({ categoryKey, subcategoryKey }) =>
    dispatch(deleteSubcategory({ categoryKey, subcategoryKey })),
  resetCategories: () => dispatch(resetCategories()),
  setCategories: categories => dispatch(setCategories(categories)),
  setCategoryIndex: categoryIndex => dispatch(setCategoryIndex(categoryIndex)),
  setEdit: (item, type) => dispatch(setEdit(item, type)),
  setShopping: boolean => dispatch(setShopping(boolean)),
  setSubcategories: ({ categoryKey, subcategories }) =>
    dispatch(setSubcategories({ categoryKey, subcategories })),
  updateCategory: ({ categoryKey, category }) =>
    dispatch(updateCategory({ categoryKey, category })),
  updateSubcategory: ({ categoryKey, subcategoryKey, subcategory }) =>
    dispatch(updateSubcategory({ categoryKey, subcategoryKey, subcategory })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppScreen)
