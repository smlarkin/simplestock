import React, { useState } from 'react';
import { Share, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import StyledText from './StyledText';
import {
  filterCategoriesToShop,
  formatCategoriesToShare,
  formatCategoryToShare,
  formatTitleText,
} from '../util';

const HeaderShareForm = ({
  editing,
  categories,
  categoryIndex,
  setSharing,
  shopping,
}) => {
  const allShopping = filterCategoriesToShop(categories);

  const currentCategories = shopping ? shopping.categories : categories;

  const currentCategory =
    categoryIndex !== null ? currentCategories[categoryIndex] : null;

  const currentCategoryShopping = currentCategory
    ? currentCategory.subcategories.filter(subcategory => subcategory.shop)
    : null;

  const radioButtons = [
    { label: 'All Inventory', value: 'ALL_INVENTORY' },
    { label: 'All Shopping', value: 'ALL_SHOPPING' },
    {
      label: `${
        currentCategory
          ? formatTitleText(currentCategory.title, 'CAPITALCASE')
          : null
      } Inventory`,
      value: 'CATEGORY_INVENTORY',
    },
    {
      label: `${
        currentCategory
          ? formatTitleText(currentCategory.title, 'CAPITALCASE')
          : null
      } Shopping`,
      value: 'CATEGORY_SHOPPING',
    },
  ].filter((item, index) => {
    if (
      index === 0 ||
      (allShopping.length && index === 1) ||
      (currentCategory &&
        currentCategory.subcategories.length &&
        index === 2) ||
      (currentCategory && currentCategoryShopping.length && index === 3)
    )
      return item;
  });

  const selectedIndex = 0;

  const [index, setIndex] = useState(selectedIndex);

  function handleOnPressShare() {
    if (!editing) {
      const { label: title, value } = radioButtons[index];
      switch (value) {
        case 'ALL_INVENTORY':
          return share({
            title,
            message: `*** ${title} ***\n\n${formatCategoriesToShare(
              categories,
            )}`,
          });
        case 'ALL_SHOPPING':
          return share({
            title,
            message: `*** ${title} ***\n\n${formatCategoriesToShare(
              categories,
              'shopping',
            )}`,
          });
        case 'CATEGORY_INVENTORY':
          return share({
            title,
            message: `*** ${title} ***\n\n${formatCategoryToShare(
              currentCategory,
            )}`,
          });
        case 'CATEGORY_SHOPPING':
          return share({
            title,
            message: `*** ${title} ***\n\n${formatCategoryToShare(
              currentCategory,
              'shopping',
            )}`,
          });
        default:
          return;
      }
    }
  }

  async function share({ title, message }) {
    try {
      const result = await Share.share({ title, message });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`The iOS device successfull shared ${title}`);
          setSharing(false);
        } else {
          console.log(`The Android device successfull shared ${title}`);
          setSharing(false);
        }
      } else if (result.action === Share.dismissedAction) {
        console.log(`The device dismissed sharing ${title}`);
      }
    } catch (error) {
      alert('error ', error);
    }
  }
  return (
    <View style={styles.container}>
      <RadioGroup
        activeColor="black"
        color="grey"
        onSelect={index => setIndex(index)}
        selectedIndex={selectedIndex}
        size={26}
        style={styles.radioGroup}
        thickness={4}>
        {radioButtons.map(item => (
          <RadioButton
            color="black"
            key={item.value}
            value={item.value}
            style={styles.radioButton}>
            <StyledText demi style={styles.radioButtonText}>
              {item.label}
            </StyledText>
          </RadioButton>
        ))}
      </RadioGroup>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleOnPressShare}
          style={styles.submitButtonContainer}>
          <StyledText bold style={styles.submitButton}>
            Share
          </StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSharing(false)}
          style={styles.submitButtonContainer}>
          <StyledText bold style={styles.cancelButton}>
            Cancel
          </StyledText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '50%',
    justifyContent: 'space-around',
    padding: '2.5%',
    width: '100%',
  },
  radioGroup: {
    borderWidth: 1,
    borderRadius: 20,
    padding: '5%',
    width: '90%',
  },
  radioButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: '5%',
  },
  radioButtonText: {
    fontSize: 15,
    marginLeft: '10%',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  submitButton: {
    color: 'black',
    fontSize: 19,
  },
  cancelButton: {
    color: 'grey',
    fontSize: 19,
  },
});

export default HeaderShareForm;
