import React, {useContext} from 'react';
import {View, Image, useWindowDimensions, Text} from 'react-native';
import InDevelopement from './SvgIcons/InDevelopment';
import Icon from 'react-native-vector-icons/AntDesign';
import ThemeContext from '../contexts/ThemeContext';

const UnderDev = () => {
  const theme = useContext(ThemeContext);
  const dim = useWindowDimensions();
  return (
    <View
      style={{
        width: dim.width,
        height: dim.height,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
      }}>
      <View style={{height: 300, transform: [{scale: 0.4}]}}>
        <InDevelopement />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          color={theme.primaryColor}
          size={30}
          name={'warning'}
          style={{marginHorizontal: 5}}
        />
        <Text
          style={{
            fontSize: 25,
            color: theme.primaryColor,
            fontFamily: 'relRegular',
          }}>
          Under Developement
        </Text>
        <Icon
          color={theme.primaryColor}
          size={30}
          name={'warning'}
          style={{marginHorizontal: 5}}
        />
      </View>
    </View>
  );
};

export default UnderDev;
