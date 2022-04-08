import React, {useState, useContext} from 'react';
import {View, ToastAndroid, Alert, StyleSheet} from 'react-native';

import WordList from '../Components/WordList';
import ThemeContext from '../contexts/ThemeContext';

import Icon from 'react-native-vector-icons/AntDesign';
import {CreatePDF} from '../helpers/CreatPDF';
import DataContext from '../contexts/DataContext';
import ActivityIndicetorView from '../Components/ActivityIndicetorView';
import NotFound from '../Components/NotFound';

const WordScreen = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const {
    state: {definations},
  } = useContext(DataContext);
  if (definations.status === 'loading')
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <ActivityIndicetorView
          maxItem={definations.maxSearched}
          storedItem={definations.downloaded}
        />
        <NotFound />
      </View>
    );
  if (definations.data.length === 0)
    return (
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {flexDirection: 'column', backgroundColor: '#fff'},
        ]}>
        <NotFound />
      </View>
    );

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
      <WordList navigation={navigation} words={definations.data} />
    </View>
  );
};

export default WordScreen;
