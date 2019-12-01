import React, { useState } from 'react';
import { Share, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import StyledText from './StyledText';
import {
  formatCategoriesToShare,
  formatCategoryToShare,
  formatTitleText,
} from '../util';

const FooterShareForm = ({
  edit,
  categories,
  categoryIndex,
  setSharing,
  shopping,
}) => {
  const category = categoryIndex !== null ? categories[categoryIndex] : null;
  const categoryHasShopping = category.subcategories.some(
    subcategory => subcategory.shop,
  );

  const radioButtons = [
    { label: 'All Inventory', value: 'ALL_INVENTORY' },
    { label: 'All Shopping', value: 'ALL_SHOPPING' },
    {
      label: `${formatTitleText(category.title, 'CAPITALCASE')} Inventory`,
      value: 'CATEGORY_INVENTORY',
    },
    {
      label: `${formatTitleText(category.title, 'CAPITALCASE')} Shopping`,
      value: 'CATEGORY_SHOPPING',
    },
  ].filter((item, index) => {
    if (
      (category && categoryHasShopping) ||
      (category && index < 3) ||
      (!category && index < 2)
    )
      return item;
  });

  const selectedIndex =
    !category && !shopping
      ? 0
      : !category && shopping
      ? 1
      : category && !shopping
      ? 2
      : 3;

  const [index, setIndex] = useState(selectedIndex);

  function handleOnPressShare() {
    if (!edit) {
      const { label: title, value } = radioButtons[index];
      switch (value) {
        case 'ALL_INVENTORY':
          return share({ title, message: formatCategoriesToShare(categories) });
        case 'ALL_SHOPPING':
          return share({
            title,
            message: formatCategoriesToShare(categories, 'shopping'),
          });
        case 'CATEGORY_INVENTORY':
          return share({
            title,
            message: formatCategoryToShare(category),
          });
        case 'CATEGORY_SHOPPING':
          return share({
            title,
            message: formatCategoryToShare(category, 'shopping'),
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
