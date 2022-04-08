import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign'

const ToolsOptionsCard = ({checked, optionTitle}) => {
  const theme = useContext(ThemeContext);
  
  return (
    <View style={[styles.exportOptionView, {backgroundColor: checked ? theme.backface : theme.secondryTextColor}]}>
      <Icon name={'checkcircle'} size={25} color={checked ? theme.primaryColor : '#d6d6d6'}/>
      <Text style={[styles.text, {color: checked ? '#000' : '#eeeeee'}]}>{optionTitle}</Text>
    </View>
  );
};

export default React.memo(ToolsOptionsCard);
const styles = StyleSheet.create({
  exportOptionView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    paddingHorizontal: 8,
    paddingVertical: 6, 
    borderRadius: 10
  },
  text: {
    fontFamily: 'relSemiBold',
    fontSize: 15,
    marginLeft: 5
  }
});
