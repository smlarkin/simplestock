import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Checkbox from 'react-native-modest-checkbox';
import { connect } from 'react-redux';
import StyledText from './StyledText';
import { setEdit, updateSubcategory } from '../redux/actions';

const ShopItem = ({
  categories,
  categoryIndex,
  index,
  item,
  setEdit,
  updateSubcategory,
}) => {
  const category = categories[categoryIndex];
  const { color } = category;
  const backgroundColor = index % 2 === 0 ? color.primary : color.secondary;
  const { title, current, type, difference } = item;
  const [isChecked, setIsChecked] = useState(false);
  const [lastTap, setLastTap] = useState(null);

  function handleOnPress() {
    const DELAY = 300;
    const now = Date.now();
    if (lastTap && now - lastTap < DELAY) {
      setEdit(item);
    } else {
      setLastTap(now);
    }
  }

  function handleOnChange() {
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    if (isChecked) {
      setTimeout(() => {
        const updatedCurrent = parseInt(current, 10) + parseInt(difference, 10);
        const shop = false;
        setIsChecked(false);
        updateSubcategory({
          categoryKey: category.key,
          subcategoryKey: item.key,
          subcategory: { ...item, current: `${updatedCurrent}`, shop },
        });
      }, 300);
    }
  }, [isChecked]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.titleContainer}>
        <StyledText medium style={styles.title}>
          {title}
        </StyledText>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        onPress={handleOnPress}
        style={styles.amountContainer}>
        <StyledText bold style={styles.amount}>
          {difference}
        </StyledText>
        <StyledText demi style={styles.amountType}>
          {type}
        </StyledText>
      </TouchableOpacity>

      <View style={styles.checkboxContainer}>
        <Checkbox checked={isChecked} label="" onChange={handleOnChange} />
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
  categories: state.categories,
});

const mapDisptachToProps = dispatch => ({
  setEdit: (subcategory, option) => dispatch(setEdit(subcategory, option)),
  updateSubcategory: ({ categoryKey, subcategoryKey, subcategory }) =>
    dispatch(updateSubcategory({ categoryKey, subcategoryKey, subcategory })),
});

export default connect(
  mapStateToProps,
  mapDisptachToProps,
)(ShopItem);
