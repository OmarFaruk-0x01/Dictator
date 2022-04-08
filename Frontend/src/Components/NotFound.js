import React from 'react';
import {View, Image, useWindowDimensions, Text} from 'react-native';
import NotFoundImage from './SvgIcons/NoDataImage';
const NotFound = () => {
  const dim = useWindowDimensions();
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{transform: [{scale: 0.6}]}}>
        <NotFoundImage style={{}} />
      </View>
    </View>
  );
};

export default NotFound;
