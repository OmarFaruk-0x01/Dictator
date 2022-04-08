import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import ThemeContext from '../contexts/ThemeContext';

const CheckBoxText = ({text, textStyle, checked, setChecked}) => {
  const theme = useContext(ThemeContext);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <CheckBox
        tintColors={{
          true: theme.primaryColor,
          false: theme.textPlaceHolder,
        }}
        onTouchEnd={(e) => {
          setChecked(!checked);
        }}
        value={checked}
      />
      <Text
        style={{
          fontSize: 16,
          top: -2,
          fontFamily: 'relSemiBold',
          ...textStyle,
          color: '#000'
        }}>
        {text}
      </Text>
    </View>
  );
};

export default React.memo(CheckBoxText);
