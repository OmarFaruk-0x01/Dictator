import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

const DefinationInfoHeader = ({title}) => {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginVertical: 10,
      }}>
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 120,
          backgroundColor: theme.primaryColor,
        }}
      />
      <View style={{paddingHorizontal: 5}}>
        <Text
          style={{
            fontFamily: 'relMedium',
            fontSize: 20,
            position: 'relative',
            top: -3,
            color: '#000',
            textTransform: 'capitalize'
          }}>
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          height: 3,
          backgroundColor: theme.primaryColor,
        }}
      />
    </View>
  );
};

export default DefinationInfoHeader;
