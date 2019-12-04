import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

export default {
  height: Dimensions.get('window').height,
  isSmallDevice: this.width < 375,
  statusBarHeight: Constants.statusBarHeight,
  width: Dimensions.get('window').width,
};
