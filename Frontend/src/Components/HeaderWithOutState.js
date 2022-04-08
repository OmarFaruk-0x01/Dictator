import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
const HeaderWithOutState = ({navigation, headerTitle}) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <View style={{...styles.header, paddingVertical: 12}}>
        <TouchableOpacity
          style={{}}
          onPress={(e) => {
            navigation.toggleDrawer();
          }}>
          <Icon name={'menu-fold'} size={22} color={theme.primaryColor} />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            flex: 2,
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'relSemiBold',
              fontSize: 18,
              color: '#000',
              top: -2,
              color: '#000'
            }}>
            {headerTitle}
          </Text>
        </View>
        <Icon name={'info'} size={22} color={theme.primaryColor} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 6,
    marginBottom: 10,
  },
  iconContiner: {
    transform: [{scaleX: 1.25}, {scaleY: 1.25}],
    marginRight: 10,
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    paddingRight: 4,
    alignItems: 'center',
    color: '#000'
  },
});

export default React.memo(HeaderWithOutState);
