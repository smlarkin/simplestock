import React from 'react';
import { View } from 'react-native';
import Constants from 'expo-constants';

const StatusBarSpacer = () => (
  <View style={{ height: Constants.statusBarHeight }} />
);

export default StatusBarSpacer;
