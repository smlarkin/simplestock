import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import HeaderIconButton from './HeaderIconButton'
import HeaderTitle from './HeaderTitle'
import {
  createCategory,
  createSubcategory,
  setCategoryIndex,
  setEdit,
} from '../redux/actions'
import { colors } from '../constants'

const Header = ({
  categories,
  categoryIndex,
  createCategory,
  createSubcategory,
  edit,
  shopping,
  setCategoryIndex,
  setEdit,
}) => {
  const category = categoryIndex !== null ? categories[categoryIndex] : null
  const title = category ? category.title : 'Simple Stock'

  function handleOnPressHome() {
    if (edit) setEdit(null)
    setCategoryIndex(null)
  }

  function handleOnPressPlus() {
    if (!edit) {
      if (category && !shopping) {
        const subcategory = {
          key: String(Math.random()),
          title: '',
          current: '',
          base: '',
          difference: '',
          shop: false,
        }
        const categoryKey = category.key
        createSubcategory({ categoryKey, subcategory })
        setEdit(subcategory, 'new')
      } else {
        const category = {
          color: colors.backgrounds[0],
          key: String(Math.random()),
          title: '',
          subcategories: [],
        }
        createCategory(category)
        setEdit(category)
      }
    }
  }

  return (
    <View style={styles.container}>
      <HeaderIconButton
        color={null}
        name="home"
        handleOnPress={handleOnPressHome}
        size={24}
        visible={category}
      />

      <HeaderTitle title={title} />

      <HeaderIconButton
        color={null}
        name="plus"
        handleOnPress={handleOnPressPlus}
        size={24}
        visible={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
  setCategoryIndex: categoryIndex => dispatch(setCategoryIndex(categoryIndex)),
  setEdit: (item, type) => dispatch(setEdit(item, type)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
