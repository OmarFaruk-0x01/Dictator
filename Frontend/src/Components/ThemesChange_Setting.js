import React, {useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Colors from '../helpers/colors';
import ThemeContext from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ThemeSetting = () => {
  const currentTheme = useContext(ThemeContext);
  const renderColorChip = () => {
    return Object.entries(Colors).map(([themeName, theme]) => {
      return (
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.setItem('theme', themeName);
            currentTheme.setTheme(theme);
          }}
          key={Math.random().toString()}
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
            backgroundColor: theme.primaryColor,
            marginHorizontal: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 15,
              height: 15,
              backgroundColor:
                currentTheme.primaryColor === theme.primaryColor
                  ? '#fff'
                  : 'rgba(0,0,0,0)',
              borderRadius: 40,
            }}
          />
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={{flexDirection: 'row', marginVertical: 10}}>
      {renderColorChip()}
    </View>
  );
};

export default ThemeSetting;
