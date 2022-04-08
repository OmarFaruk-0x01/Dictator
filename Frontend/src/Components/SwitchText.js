import React, {useState, useContext} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

const SwitchText = ({text, checked, setChecked}) => {
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.switchContainer]}>
      <Text style={[styles.switchText]}>{text}</Text>
      <Switch
        value={checked}
        onTouchEnd={(e) => {
          setChecked(!checked);
        }}
        thumbColor={theme.primaryColor}
        trackColor={{
          true: theme.backface,
          false: '#ddd',
        }}
      />
    </View>
  );
};

export default React.memo(SwitchText);

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    marginBottom: 5,
  },
  switchText: {
    fontFamily: 'relSemiBold',
    fontSize: 18,
    color: '#000'
  },
});
