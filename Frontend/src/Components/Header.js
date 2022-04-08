import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import ErrorContext from '../contexts/ErrorContext';
import * as actions from '../reducer/actions';

const Header = ({navigation, headerTitle}) => {
  const theme = useContext(ThemeContext);
  const {errorState, errorDispatch} = useContext(ErrorContext);

  return (
    <>
      <View
        style={{
          ...styles.header,
          paddingVertical: 12,
          elevation: 6,
        }}>
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
          {headerTitle ? (
            <Text
              style={{
                fontFamily: 'relSemiBold',
                fontSize: 18,
                color: '#000',
                top: -2,
              }}>
              {headerTitle}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: 'EdoSZ',
                fontSize: 28,
                color: theme.primaryColor,
                top: -2,
              }}>
              D
              <Text style={{fontFamily: 'EdoSZ', fontSize: 17, color: '#000'}}>
                ictator
              </Text>
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {headerTitle !== 'Failures' ? (
            <TouchableOpacity
              style={{marginHorizontal: 8}}
              onPress={(e) => {
                if (errorState.newError > 0) {
                  errorDispatch({type: actions.RESET_NEW_ERROR_COUNT});
                }
                navigation.navigate('ErrorDisplayScreen');
              }}>
              <Icon name={'warning'} size={20} color={theme.primaryColor} />
              {errorState.newError > 0 ? (
                <Text
                  style={{
                    position: 'absolute',
                    backgroundColor: 'red',
                    color: '#fff',
                    padding: 3,
                    fontSize: 10,
                    top: -5,
                    right: -2,
                    borderRadius: 50,
                  }}>
                  {errorState.newError}
                </Text>
              ) : null}
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={{marginHorizontal: 8}}
            onPress={(e) => {
              navigation.navigate('ToolsScreen');
            }}>
            <Icon name={'tool'} size={22} color={theme.primaryColor} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 0,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
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

export default Header;
