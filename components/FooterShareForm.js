import React, { useState } from 'react';
import { Share, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import StyledText from './StyledText';
import {
  filterCategories,
  formatCategoriesToShare,
  formatCategoryToShare,
  formatTitleText,
} from '../util';

const FooterShareForm = ({
  edit,
  categories,
  categoriesFiltered,
  category,
  categoryIndex,
  setSharing,
  shopping,
}) => {
  const globalShopping = shopping
    ? categoriesFiltered.length
    : filterCategories(categories, true).length;

  const categoryHasShopping = category
    ? category.subcategories.some(subcategory => subcategory.shop)
    : null;

  const radioButtons = [
    { label: 'All Inventory', value: 'ALL_INVENTORY' },
    { label: 'All Shopping', value: 'ALL_SHOPPING' },
    {
      label: `${
        category ? formatTitleText(category.title, 'CAPITALCASE') : null
      } Inventory`,
      value: 'CATEGORY_INVENTORY',
    },
    {
      label: `${
        category ? formatTitleText(category.title, 'CAPITALCASE') : null
      } Shopping`,
      value: 'CATEGORY_SHOPPING',
    },
  ].filter((item, index) => {
    if (
      index === 0 ||
      (globalShopping && index === 1) ||
      (category && index === 2) ||
      (category && categoryHasShopping & (index === 3))
    )
      return item;
  });

  const selectedIndex =
    !category && !shopping
      ? 0
      : !category && shopping && globalShopping
      ? 1
      : category && !shopping && globalShopping
      ? 2
      : category && shopping && categoryHasShopping
      ? 3
      : 2;

  const [index, setIndex] = useState(selectedIndex);

  function handleOnPressShare() {
    if (!edit) {
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
            message: `*** ${title} ***\n\n${formatCategoryToShare(category)}`,
          });
        case 'CATEGORY_SHOPPING':
          return share({
            title,
            message: `*** ${title} ***\n\n${formatCategoryToShare(
              category,
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

export default FooterShareForm;
