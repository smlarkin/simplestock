import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Checkbox from 'react-native-modest-checkbox';
import { connect } from 'react-redux';
import StyledText from './StyledText';
import { setEdit, updateShopping, updateSubcategory } from '../redux/actions';
import { formatIntegersForNumericKeypad } from '../util';

const ShopItemForm = ({
  /* categoriesFiltered, */
  categories,
  categoryIndex,
  index,
  item,
  setEdit,
  shopping,
  updateShopping,
  updateSubcategory,
}) => {
  const currentCategories = shopping ? shopping.categories : categories;
  const currentCategory =
    categoryIndex !== null ? currentCategories[categoryIndex] : null;
  const { color } = currentCategory;
  const backgroundColor = index % 2 === 0 ? color.primary : color.secondary;
  const { title, type } = item;
  const [difference, setDifference] = useState(item.difference);
  const textInput = useRef(null);

  function handleOnBlur() {
    if (difference !== null) {
      const subcategory =
        difference === '0'
          ? { ...item, difference, shop: false }
          : { ...item, difference };

      updateSubcategory({
        categoryKey: currentCategory.key,
        subcategoryKey: item.key,
        subcategory,
      });

      updateShopping({
        categoryKey: currentCategory.key,
        subcategoryKey: item.key,
        subcategory,
      });

      setEdit(null);
    } else {
      textInput.current.focus();
    }
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.titleContainer}>
        <StyledText medium style={styles.title}>
          {title}
        </StyledText>
      </View>

      <View style={styles.amountContainer}>
        <TextInput
          autoFocus={true}
          keyboardType="numeric"
          maxLength={3}
          onBlur={() => handleOnBlur()}
          onChangeText={e => formatIntegersForNumericKeypad(e, setDifference)}
          placeholder="0"
          ref={textInput}
          returnKeyType="done"
          selectionColor="black"
          style={styles.amount}
          value={difference}
        />
        <StyledText demi style={styles.amountType}>
          {type}
        </StyledText>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox checked={false} label="" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    aspectRatio: 7 / 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '1%',
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: '4%',
    paddingRight: '1%',
  },
  title: {
    flexWrap: 'wrap',
    fontSize: 18,
  },
  amountContainer: {
    alignItems: 'center',
    flex: 1,
  },
  amount: {
    fontSize: 20,
  },
  amountType: {
    fontSize: 10,
  },
  checkboxContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: '-1%',
    opacity: 0.75,
  },
});

const mapStateToProps = state => ({
  categories: state.categories,
  categoryIndex: state.categoryIndex,
  // categoriesFiltered: state.categoriesFiltered,
  shopping: state.shopping,
});

const mapDisptachToProps = dispatch => ({
  setEdit: (subcategory, option) => dispatch(setEdit(subcategory, option)),
  updateShopping: ({ categoryKey, subcategoryKey, subcategory }) =>
    dispatch(updateShopping({ categoryKey, subcategoryKey, subcategory })),
  updateSubcategory: ({ categoryKey, subcategoryKey, subcategory }) =>
    dispatch(updateSubcategory({ categoryKey, subcategoryKey, subcategory })),
});

export default connect(mapStateToProps, mapDisptachToProps)(ShopItemForm);
