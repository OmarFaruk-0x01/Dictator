import React, {useContext, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

const DefinationInfoList = ({dataList}) => {
  const theme = useContext(ThemeContext);
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'flex-start',
        paddingBottom: 10,
        padding: 2,
      }}>
      {dataList.map((data) => (
        <View
          key={Math.random()}
          style={{
            flexDirection: 'row',
            paddingLeft: 10,
            alignItems: 'center',
            marginBottom: 4,
          }}>
          <View
            style={{
              width: 20,
              height: 5,
              borderRadius: 10,
              backgroundColor: theme.primaryColor,
              marginRight: 4,
              alignSelf: 'flex-start',
              position: 'relative',
              top: 10,
            }}
          />
          <Text
            style={{
              fontFamily: 'relSemiBold',
              fontSize: 18,
              position: 'relative',
              top: -3,
              flex: 1,
              color: '#000'
            }}>
            {String(data).trim()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default DefinationInfoList;
