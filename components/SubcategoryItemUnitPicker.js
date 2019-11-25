import React, { useState } from 'react';
import { Picker, StyleSheet, TouchableOpacity, View } from 'react-native';
import StyledText from './StyledText';
import { units } from '../constants';

const SubcategoryItemUnitPicker = ({ handleOnPress, setType, type }) => {
  const initialIndex = type ? units.indexOf(type) : 0;
  const [index, setIndex] = useState(initialIndex);
  function onValueChange(value, index) {
    if (index === 0) {
      setType('');
    } else {
      setType(value);
    }
    setIndex(index);
  }

  return (
    <View style={styles.container}>
      <Picker
        onValueChange={onValueChange}
        selectedValue={units[index]}
        style={styles.picker}>
        {units.map(unit => (
          <Picker.Item key={unit} label={unit} value={unit} />
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
