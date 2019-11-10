import React from 'react';
import ScalableText from 'react-native-text';
import { colors } from '../constants';

const StyledText = props => (
  <ScalableText
    {...props}
    style={[
      { color: colors.text },
      props.style,
      {
        fontFamily: props.bold
          ? 'avenir-next-bold'
          : props.demi
          ? 'avenir-next-demi-bold'
          : props.light
          ? 'avenir-next-light'
          : props.medium
          ? 'avenir-next-medium'
          : 'avenir-next-regular',
      },
    ]}>
    {props.children}
  </ScalableText>
);

export default StyledText;
