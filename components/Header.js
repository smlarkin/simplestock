import React from 'react'
import { StyleSheet, View } from 'react-native'
import HeaderIconButton from './HeaderIconButton'
import HeaderTitle from './HeaderTitle'
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

  function handlePressHome() {
    if (edit) setEdit(null)
    setCategoryIndex(null)
  }

  function handlePressPlus() {
    if (!edit) {
      if (category) {
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
        handlePress={handlePressHome}
        size={24}
        visible={category}
        // visible={false}
      />

      <HeaderTitle title={title} />

      <HeaderIconButton
        color={null}
        name="plus"
        handlePress={handlePressPlus}
        size={24}
        visible={!category || !shopping}
        // visible={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
})

export default Header
