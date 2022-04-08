import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

const FeedbackBtn = ({disabled, onPress, isProgress}) => {
  const theme = useContext(ThemeContext);
  return (
    <View style={{width: '100%'}}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={{
          height: 50,

          backgroundColor: disabled
            ? theme.secondryTextColor
            : theme.primaryColor,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isProgress ? (
          <ActivityIndicator size={20} color={'#fff'} />
        ) : (
          <Icon name="upload" size={20} color={'#fff'} />
        )}
        <Text
          style={{
            fontSize: 19,
            fontFamily: 'relSemiBold',
            color: '#fff',
            marginLeft: 7,
          }}>
          Send
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(FeedbackBtn);
