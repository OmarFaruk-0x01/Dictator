import React from 'react';

import {View, Text} from 'react-native';

const SettingCard = ({settingTitle, Component, children}) => {
  return (
    <View style={{paddingHorizontal: 10}}>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'relSemiBold',
            textTransform: 'uppercase',
            color: "#000"
          }}>
          {settingTitle}
        </Text>
      </View>
      {Component && <Component />}
      {children && !Component ? children : null}
    </View>
  );
};

export default SettingCard;
