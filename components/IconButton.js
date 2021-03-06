import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const IconButton = ({
  active,
  activeOpacity,
  color,
  handleOnLongPress,
  handleOnPress,
  name,
  size,
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      activeOpacity={activeOpacity ? activeOpacity : active ? 0.2 : 1}
      onLongPress={active && handleOnLongPress ? handleOnLongPress : null}
      onPress={active ? handleOnPress : null}
      style={[
        styles.touchableOpacity,
        {
          width: size * 2,
        },
      ]}>
      <AntDesign color={active ? color : 'silver'} name={name} size={size} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  touchableOpacity: {
    alignItems: 'center',
    aspectRatio: 1 / 1,
    justifyContent: 'center',
  },
});

export default IconButton;
