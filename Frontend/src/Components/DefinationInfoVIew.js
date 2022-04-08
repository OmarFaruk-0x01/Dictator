import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import WordNotation from './WordNotation';

import Icon from 'react-native-vector-icons/AntDesign';
import DefinationInfoHeader from './DefinationInfoHeader';

const DefinationInfoView = ({defObj, defType, posType, closeFunc}) => {
  const theme = useContext(ThemeContext);
  const renderDefinitionList = (dataList) => {
    const DefinitionList = require('./DefinationInfoList').default;
    return <DefinitionList dataList={dataList} />;
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingVertical: 5,
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingRight: 6,
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
          }}>
          <View
            style={{
              padding: 10,
              paddingVertical: 6,
              backgroundColor: theme.primaryColor,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              marginBottom: 7,
              elevation: 5,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'relSemiBold',
                fontSize: 20,
                textTransform: 'capitalize'
              }}>
              {defObj.word}
            </Text>
          </View>
          
          <WordNotation
            defType={defType}
            posType={posType}
            label={defObj.label}
            exBtn={false}
          />
        </View>

        <TouchableOpacity style={{marginTop: 15, marginRight: 10}} onPress={(e) => closeFunc(false)}>
          <Icon name={'down'} color={theme.primaryColor} size={20} />
        </TouchableOpacity>
      </View>

      <View>
        <DefinationInfoHeader title={defObj.type + ' Defination'} />
        {renderDefinitionList([defObj.defination])}
      </View>
      <View>
        <DefinationInfoHeader title={'Examples'} />
        {defObj.examples.length === 0 ? (
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'relRegular',
              color: '#000',
            }}>
            No Examples Yet
          </Text>
        ) : (
          renderDefinitionList(defObj.examples)
        )}
      </View>
    </View>
  );
};

export default DefinationInfoView;
