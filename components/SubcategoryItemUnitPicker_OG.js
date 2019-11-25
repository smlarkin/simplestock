import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Picker, { Item } from 'react-native-wheel-picker';
import StyledText from './StyledText';
import { units } from '../constants';

const SubcategoryItemUnitPicker = ({ handleOnPress, setType, type }) => {
  return (
    <View style={styles.container}>
      <Picker
        itemStyle={styles.itemStyle}
        onValueChange={value => setType(value)}
        selectedValue={type}
        style={styles.picker}>
        {units.map(unit => (
          <Item key={unit.key} label={unit.label} value={unit.value} />
        ))}
      </Picker>
      <TouchableOpacity
        onPress={handleOnPress}
        style={styles.submitButtonContainer}>
        <StyledText bold style={styles.submitButton}>
          Submit
        </StyledText>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '50%',
    justifyContent: 'space-between',
    padding: '2.5%',
    width: '100%',
  },
  picker: {
    height: '50%',
    width: '80%',
  },
  itemStyle: {
    fontFamily: 'avenir-next-medium',
    fontSize: 26,
  },
  submitButtonContainer: {
    padding: '5%',
  },
  submitButton: {
    color: 'black',
    fontSize: 19,
  },
});

export default SubcategoryItemUnitPicker;
