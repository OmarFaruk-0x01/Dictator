import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

import Icon from 'react-native-vector-icons/AntDesign';
import DefinationInfoHeader from './DefinationInfoHeader';
import DefinationInfoList from './DefinationInfoList';
import axios from 'axios';
import {env} from '../../src/helpers/environment';
import {CreateExamplePDF} from '../helpers/CreatPDF';
const EXAMPLEURL = env.mode == 'prod' ? env.p.ExampleURL : env.d.ExampleURL;

const ExtraExampleView = ({word, exmpList, fucns}) => {
  const theme = useContext(ThemeContext);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    if (exmpList.length === 0) {
      setProgress(true);
      axios({
        method: 'post',
        url: EXAMPLEURL,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({word: word}),
      })
        .then((e) => {
          if (e.data.status == 200 && !isCancelled) {
            fucns.updateExamples(e.data.data);
          }
          if (e.data.status != 200 && !isCancelled) {
            Alert.alert('Failed', e.data.message);
          }
          setProgress(false);
        })
        .catch((e) => {
          if (!isCancelled) {
            Alert.alert(e.name, e.message);
          }
          setProgress(false);
        });
    }
    return () => {
      isCancelled = true;
    };
  }, []);

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
          alignItems: 'center',
          paddingRight: 6,
        }}>
        <View
          style={{
            flexDirection: 'row',
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
              marginRight: 7,
              elevation: 5,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'relSemiBold',
                fontSize: 20,
              }}>
              {word}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={(e) => CreateExamplePDF(exmpList, word)}>
            <Icon name={'export'} color={theme.primaryColor} size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={(e) => fucns.closeFunc(false)}>
            <Icon name={'down'} color={theme.primaryColor} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <DefinationInfoHeader title={'Extra Examples'} />
      {progress ? (
        <ActivityIndicator
          size={35}
          color={theme.primaryColor}
          animating={true}
        />
      ) : exmpList.length == 0 ? (
        <Text style={{textAlign: 'center', fontFamily: 'relRegular'}}>
          No Examples Found
        </Text>
      ) : (
        <DefinationInfoList dataList={exmpList} />
      )}
    </View>
  );
};

export default ExtraExampleView;
