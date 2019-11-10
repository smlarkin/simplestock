import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import StatusBarHeight from '@expo/status-bar-height';
import Constants from 'expo-constants';

const StatusBarSpacer = () => {
  const [height, setHeight] = useState(Constants.statusBarHeight);
  const handleHeightUpdate = value => setHeight(value);

  useEffect(() => {
    StatusBarHeight.addEventListener(handleHeightUpdate);
    return StatusBarHeight.removeEventListener(handleHeightUpdate);
  }, []);

  return <View style={{ height }} />;
};

export default StatusBarSpacer;
