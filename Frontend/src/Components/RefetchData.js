import React, {useContext, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ThemeContext from '../contexts/ThemeContext';
import {
  GetAntonyms_FV,
  GetDefinition_FV,
  GetExamples_FV,
  GetSynonyms_FV,
} from '../reducer/actionsCreators';
import FavouriteContext from '../contexts/FavouriteContext';
import ErrorContext from '../contexts/ErrorContext';
import {LOG} from '../helpers/config';

const RefatchData = ({type, word, setUpdate}) => {
  const theme = useContext(ThemeContext);
  const {errorDispatch} = useContext(ErrorContext);
  const [load, setLoad] = useState(false);
  const onPress = () => {
    setLoad(true)
    var GlobFunc = null;
    switch (type) {
      case 'Definition': {
        GlobFunc = GetDefinition_FV;
        break;
      }
      case 'Examples': {
        GlobFunc = GetExamples_FV;
        break;
      }
      case 'Synonyms': {
        GlobFunc = GetSynonyms_FV;
        break;
      }
      case 'Antonyms': {
        GlobFunc = GetAntonyms_FV;
        break;
      }
    }
    GlobFunc(word, errorDispatch)
      .then(({ok}) => {
        if (ok) {
          setUpdate(true);
        } else {
          setLoad(false)
        }
      })
      .catch((e) => {
        setLoad(false)
        LOG.error('Refetch Error: ' + String(e));
      });
  };

  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          width: 70,
          height: 70,
          borderRadius: 70,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.primaryColor,
          elevation: 5,
        }}>
        <View>
          {
            !load ? (<Icon name={'download'} size={35} color={'#fff'} />) : (<ActivityIndicator  color={'#fff'} size={40}/>)
          }
        </View>
      </TouchableOpacity>
      <Text style={{fontSize: 17, fontFamily: 'relRegular', marginTop: 5}}>
        {!load ? "No {type} Found. Try to get from internet" : "Fetching"}
      </Text>
    </View>
  );
};

export default RefatchData;
