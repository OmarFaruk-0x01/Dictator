import React, {useContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

const ActivityIndicetorView = ({maxItem, storedItem}) => {
  const theme = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: '80%',
          //   height: 70,
          paddingHorizontal: 5,
          paddingVertical: 5,
          borderRadius: 7,
          elevation: 10,
          backgroundColor: '#fff',
          flexDirection: 'row',
          borderColor: theme.primaryColor,
          borderWidth: 1,
        }}>
        <View
          style={{
            // width: 50,
            alignItems: 'center',
            // height: '100%',
            justifyContent: 'center',
            paddingRight: 5,
            marginLeft: 5,
            marginRight: 5,
          }}>
          <ActivityIndicator size={30} color={theme.primaryColor} />
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{fontSize: 20, fontFamily: 'relMedium', marginBottom: 5, color: '#000'}}>
            Progress...
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flex: 1,
                marginRight: 5,
                backgroundColor: theme.backface,
              }}>
              <View
                style={{
                  backgroundColor: theme.primaryColor,
                  width: `${parseInt((100 * storedItem) / maxItem)}%`,
                  height: 4,
                }}
              />
            </View>
            <Text
              style={{fontSize: 15, color: '#000', fontFamily: 'relMedium', marginBottom: 5}}>
              {storedItem}/{maxItem}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActivityIndicetorView;
