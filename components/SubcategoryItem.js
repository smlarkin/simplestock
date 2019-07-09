import React from 'react'
import { StyleSheet, View } from 'react-native'
import DoubleClick from 'react-native-double-click'
import StyledText from './StyledText'

const SubcategoryItem = ({ setEdit, item }) => {
  const { title, current, base, type } = item

  function handleDoubleClick(type) {
    setEdit(item, type)
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <StyledText medium style={styles.title}>
          {title}
        </StyledText>
      </View>

      <View style={styles.currentAmountContainer}>
        <DoubleClick onClick={() => handleDoubleClick('current')}>
          <StyledText bold style={styles.currentAmount}>
            {current}
          </StyledText>
        </DoubleClick>
      </View>

      <View style={styles.dividerContainer}>
        <StyledText light style={styles.divider}>
          /
        </StyledText>
      </View>

      <View style={styles.baseAmountContainer}>
        <DoubleClick onClick={() => handleDoubleClick('base')}>
          <StyledText bold style={styles.baseAmount}>
            {base}
          </StyledText>
        </DoubleClick>
      </View>

      <View style={styles.amountTypeContainer}>
        <StyledText demi style={styles.amountType}>
          {type}
        </StyledText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    // height: 60,
    padding: 5,
  },
  titleContainer: {
    alignItems: 'center',
    flex: 4,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'flex-start',
  },
  title: {
    flexWrap: 'wrap',
    fontSize: 18,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
  currentAmount: {
    fontSize: 20,
    padding: 5,
  },
  dividerContainer: {
    marginLeft: 3,
  },
  divider: {
    fontSize: 40,
  },
  baseAmount: {
    fontSize: 20,
    padding: 5,
  },
  amountTypeContainer: {
    alignItems: 'center',
    flex: 1,
  },
  amountType: {
    fontSize: 10,
    padding: 5,
  },
})

export default SubcategoryItem
