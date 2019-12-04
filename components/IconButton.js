import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const IconButton = ({
  active,
  activeOpacity,
  color,
  handleOnPress,
  name,
  size,
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      activeOpacity={activeOpacity ? activeOpacity : active ? 0.2 : 1}
      style={{ width: size }}
      onPress={active ? handleOnPress : null}>
      <AntDesign color={active ? color : 'silver'} name={name} size={size} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    aspectRatio: 1 / 1,
  },
});

export default IconButton;
