import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Checkbox from 'react-native-modest-checkbox';
import { connect } from 'react-redux';
import StyledText from './StyledText';
import { setEdit, updateSubcategory } from '../redux/actions';
import { formatIntegersForNumericKeypad } from '../util';

const ShopItemForm = ({
  categoriesFiltered,
  categoryIndex,
  index,
  item,
  setEdit,
  updateSubcategory,
}) => {
  const category = categoriesFiltered[categoryIndex];
  const { color } = category;
  const backgroundColor = index % 2 === 0 ? color.primary : color.secondary;
  const { title, type } = item;
  const [difference, setDifference] = useState(item.difference);
  const textInput = useRef(null);

  function handleOnBlur() {
    if (difference) {
      updateSubcategory({
        categoryKey: category.key,
        subcategoryKey: item.key,
        subcategory: { ...item, difference },
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
  categoryIndex: state.categoryIndex,
  categoriesFiltered: state.categoriesFiltered,
});

const mapDisptachToProps = dispatch => ({
  setEdit: (subcategory, option) => dispatch(setEdit(subcategory, option)),
  updateSubcategory: ({ categoryKey, subcategoryKey, subcategory }) =>
    dispatch(updateSubcategory({ categoryKey, subcategoryKey, subcategory })),
});

export default connect(mapStateToProps, mapDisptachToProps)(ShopItemForm);
