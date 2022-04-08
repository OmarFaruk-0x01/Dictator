import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

const WordNotation = ({label, defType, posType, exBtn, openFunc}) => {
  const theme = useContext(ThemeContext);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6
      }}>
      <Text style={{...styles.notation, color: '#000'}}>{defType}</Text>
      {label ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={{...styles.dot, backgroundColor: theme.primaryColor}} />
          <Text
            style={{
              ...styles.notation,
              color: '#fff',
              backgroundColor: theme.primaryColor,
              alignItems: 'center',
              paddingHorizontal: 4,
              paddingVertical: 1,
              borderRadius: 5,
            }}>
            {label}
          </Text>
        </View>
      ) : null}
      {posType ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={{...styles.dot, backgroundColor: theme.primaryColor}} />
          <Text
            style={{
              ...styles.notation,
              color: '#000',
              //   color: '#fff',
              //   padding: 3,
              //   borderRadius: 5,
              //   fontSize: 12,
            }}>
            {String(posType)
              .substring(0, 1)
              .toUpperCase()
              .concat(String(posType).substring(1, posType.length))}
          </Text>
        </View>
      ) : null}
      {exBtn === false ? null : (
        <TouchableOpacity
          style={{...styles.exBtn, backgroundColor: theme.primaryColor}}
          onPress={(e) => openFunc(true)}>
          <Text style={{color: '#fff', fontFamily: 'relBold', fontSize: 12}}>
            Ex
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  notation: {
    fontFamily: 'relSemiBold',
    fontSize: 14,
  },
  dot: {
    marginHorizontal: 5,
    borderRadius: 100,
    width: 5,
    height: 5,
  },
  exBtn: {
    position: 'absolute',
    width: 35,
    height: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    right: 0,
    top: 3,
  },
});

export default WordNotation;
