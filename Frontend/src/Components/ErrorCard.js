import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
const ErrorCard = ({message, title, fieldName, status}) => {
  const theme = useContext(ThemeContext);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
        }}>
        <View
          style={{
            paddingHorizontal: 10,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            marginRight: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            name={status == 400 ? 'wifi' : 'database'}
            size={20}
            color={theme.errorBg}
            style={{
              marginRight: 5,
            }}
          />
          <Text
            style={{
              alignSelf: 'center',
              color: '#000',
              fontSize: 17,
              top: -2,
              fontFamily: 'relSemiBold',
            }}>
            {title}
          </Text>
        </View>
        {fieldName !== '' ? (
          <Text
            style={{
              alignSelf: 'center',
              color: theme.textPlaceHolder,
              fontFamily: 'relRegular',
              backgroundColor: theme.errorBg,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 40,
              color: '#fff',
            }}>
            {fieldName}
          </Text>
        ) : null}
      </View>

      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 5,
        }}>
        <View
          style={{
            paddingLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 10,
              marginRight: 7,
              height: 1,
              backgroundColor: theme.errorBg,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontFamily: 'relSemiBold',
              top: -2,
            }}>
            {message}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(ErrorCard);
