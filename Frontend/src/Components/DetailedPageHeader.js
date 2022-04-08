import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import {DELETE_ERROR_LIST} from '../reducer/actions';
const DetailedPageHeader = ({navigation, title, subtitle, errorDispatch}) => {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 7,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={(e) => {
          navigation.goBack();
        }}>
        <Icon
          name="arrowleft"
          color={title === 'Errors' ? theme.errorBg : theme.primaryColor}
          size={20}
        />
      </TouchableOpacity>
      <View style={{flex: 2}}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 20,
            top: -2,
            fontFamily: 'relBold',
            textAlign: 'center',
            color: '#000'
          }}>
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 10,
              top: -2,
              fontFamily: 'relBold',
              textAlign: 'center',
              color: theme.primaryColor,
            }}>
            {subtitle}
          </Text>
        )}
      </View>
      {title !== 'Errors' ? (
        <View style={{flex: 1}}></View>
      ) : (
        <TouchableOpacity
          style={{flex: 1, alignItems: 'flex-end'}}
          onPress={(e) => {
            errorDispatch({type: DELETE_ERROR_LIST});
          }}>
          <Icon
            name="delete"
            color={title === 'Errors' ? theme.errorBg : theme.primaryColor}
            size={20}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DetailedPageHeader;
