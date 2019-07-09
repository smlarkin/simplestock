import React from 'react'
import { StyleSheet, View } from 'react-native'
import FooterIconButton from './FooterIconButton'
import { updateDifferenceAndShopping } from '../util'
// import { setEdit } from '../redux/actions'

const FooterViewsNav = ({
  categories,
  categoryIndex,
  resetCategories,
  setCategories,
  setShopping,
  setEdit,
  shopping,
}) => {
  function handlePressShopping(toShop) {
    if (toShop) {
      setShopping(true)
    } else {
      updateDifferenceAndShopping(categories, setCategories)
      setShopping(false)
    }
  }

  function handlePressShare() {
    /* WARNING */
    // setEdit(null)
    // setShopping(false)
    // resetCategories()
    /* WARNING */
    if (categoryIndex !== null && shopping) {
      console.log('share category shopping list')
    } else if (categoryIndex !== null) {
      console.log('share category inventory list')
    } else if (shopping) {
      console.log('share entire shopping list')
    } else {
      console.log('share entire inventory list')
    }
  }
  return (
    <View style={styles.container}>
      <FooterIconButton
        color={null}
        name="list"
        handlePress={() => handlePressShopping(false)}
        size={24}
        visible={true}
      />
      <FooterIconButton
        color={null}
        name="check-square"
        handlePress={() => handlePressShopping(true)}
        size={24}
        visible={true}
      />
      <FooterIconButton
        color={null}
        name="send"
        handlePress={handlePressShare}
        size={24}
        visible={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export default FooterViewsNav
