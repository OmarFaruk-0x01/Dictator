import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {CheckValidEmail} from '../helpers/config';

const FeedBackInput = ({
  theme,
  row,
  inpTitle,
  inpPlaceHolder,
  email,
  multiline,
  value,
  onChangeEvent,
  isValidEmail,
  setIsValidEmail,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={{
        paddingHorizontal: 10,
        flexDirection: row ? 'row' : 'column',
        width: '100%',
        marginVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: row ? 10 : 0,
        }}>
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: theme.primaryColor,
            borderRadius: 30,
            marginRight: 6,
            top: 2,
          }}
        />
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'relSemiBold',
            textTransform: 'uppercase',
            color: '#000',

          }}>
          {inpTitle}
        </Text>
      </View>
      <View style={{flex: row && 1, height: row && 40}}>
        <TextInput
          placeholder={inpPlaceHolder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (email) {
              if (CheckValidEmail(value)) {
                setIsValidEmail(true);
              } else {
                setIsValidEmail(false);
              }
            }
            setIsFocused(false);
          }}
          value={value}
          keyboardType={email ? 'email-address' : 'default'}
          multiline={multiline}
          keyboardAppearance={'dark'}
          numberOfLines={multiline && 8}
          onChangeText={(e) => {
            onChangeEvent(e);
          }}
          placeholderTextColor={'#efefef'}
          style={[
            styles.textField,
            {
              borderColor: theme.primaryColor,
              textAlignVertical: 'top',
              textAlign: 'left',
              flex: row ? 1 : 0,
              marginTop: multiline && 5,
              borderBottomColor: email
                ? isValidEmail
                  ? theme.primaryColor
                  : theme.errorBg
                : theme.primaryColor,
              borderBottomWidth: isFocused ? 2 : 1,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default React.memo(FeedBackInput);

const styles = StyleSheet.create({
  textField: {
    fontSize: 17,
    fontFamily: 'relRegular',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderBottomWidth: 1,
    color: '#000',

  },
});
