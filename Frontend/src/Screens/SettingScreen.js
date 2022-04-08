import React from 'react';
import {View} from 'react-native';
import HeaderWithOutState from '../Components/HeaderWithOutState';
import SettingCard from '../Components/SettingCard';
import ThemeSetting from '../Components/ThemesChange_Setting';

const SettingScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderWithOutState headerTitle={'Setting'} navigation={navigation} />
      <SettingCard settingTitle={'Themes'} Component={ThemeSetting} />
    </View>
  );
};
export default SettingScreen;
