import React from 'react';
import { View } from 'react-native';
import { layout } from '../constants';

const StatusBarSpacer = () => (
  <View style={{ height: layout.statusBarHeight }} />
);

export default StatusBarSpacer;
