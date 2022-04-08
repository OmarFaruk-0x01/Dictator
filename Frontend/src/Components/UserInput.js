import React, {useContext, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import ThemeContext from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  GetDefinitions,
  GetExamples,
  GetAntonyms,
  GetSynonyms,
} from '../reducer/actionsCreators';
import DataContext from '../contexts/DataContext';
import ErrorContext from '../contexts/ErrorContext';

const UserInput = ({isProgress, placeHolder}) => {
  const theme = useContext(ThemeContext);
  const {dispatch: dataDispatch} = useContext(DataContext);
  const {errorDispatch} = useContext(ErrorContext);
  const [words, setWords] = useState('');
  const [isFocused, setIsfocus] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const Limit = 5;

  const shouldSetWord = (text) => {
    if (Limit < text.split(',').filter((t) => t !== '').length) {
      return false;
    }
    setWordCount(text.split(',').filter((t) => t !== '').length);
    return true;
  };

  const btnClick = () => {
    if (words === '') return null;
    // switch (placeHolder) {
    //   case 'Definition': {
    //     GetDefinitions(dataDispatch, words, errorDispatch);
    //     break;
    //   }
    //   case 'Examples': {
    //     GetExamples(dataDispatch, words, errorDispatch);
    //     break;
    //   }
    //   case 'Synonyms': {
    //     GetSynonyms(dataDispatch, words, errorDispatch);
    //     break;
    //   }
    //   case 'Antonyms': {
    //     GetAntonyms(dataDispatch, words, errorDispatch);
    //     break;
    //   }
    // }
    GetDefinitions(dataDispatch, words, errorDispatch);
    GetExamples(dataDispatch, words, errorDispatch);
    GetSynonyms(dataDispatch, words, errorDispatch);
    GetAntonyms(dataDispatch, words, errorDispatch);
  };
  return (
    <View style={styles.userCon}>
      {/* <CheckBox
        value={isMultiline}
        onValueChange={(e) => setIsMultiline(!isMultiline)}
        tintColors={{[isMultiline]: theme.primaryColor}}
        style={{
          height: 38,
          alignSelf: isMultiline ? 'flex-start' : 'flex-start',
        }}
      /> */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          elevation: 4,
          backgroundColor: '#fff',
          borderRadius: 5,
        }}>
        <TextInput
          style={{
            ...styles.wordInput,
            backgroundColor: '#fff',
            borderWidth: 0,
            borderColor: theme.primaryColor,
            zIndex: -12,
            paddingRight: 65,
            paddingTop: 5,
            color: '#000',
            // elevation: 0,
            borderRadius: 0,
            borderBottomWidth: isFocused ? 2 : 1,
          }}
          placeholderTextColor={theme.textPlaceHolder}
          placeholder={'Search ' + placeHolder.toLowerCase()}
          onChangeText={(e) => {
            
            if (shouldSetWord(e)) {
              setWords(e);
            } 
            
          }}
          onFocus={() => {
            setIsfocus(true);
          }}
          onBlur={() => {
            setIsfocus(false);
          }}
          value={words}
          onSubmitEditing={(e) => btnClick()}
        />
        {words != '' ? (
          <TouchableOpacity
            onPress={(e) => {
              setWords('');
              setWordCount(0);
            }}
            style={{
              position: 'absolute',
              top: 11,
              right: 8,
              zIndex: 5,
            }}>
            <Icon
              style={{
                fontSize: 20,
                zIndex: 5,
              }}
              color={theme.primaryColor}
              name={'close'}
            />
          </TouchableOpacity>
        ) : null}

        <Text
          style={{
            position: 'absolute',
            top: 9,
            color: theme.secondryTextColor,
            right: 8 * 4,
            zIndex: 5,
            fontFamily: 'relRegular',
          }}>
          {wordCount}/{Limit}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          ...styles.btn,
          backgroundColor: theme.primaryColor,
          elevation: 3,
          borderColor: theme.primaryColor,
          borderWidth: 1,
        }}
        disabled={words === ''}
        onPress={btnClick}>
        <Icon
          name={'search1'}
          style={{
            ...styles.btnIcon,
            fontWeight: 700,
            color: '#fff',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userCon: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    zIndex: -1,
  },
  wordInput: {
    flex: 1,
    borderWidth: 1.5,
    fontSize: 17,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingVertical: 5,
    fontFamily: 'relMedium',
    fontWeight: '400',
    // elevation: 4,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    padding: 5,
    marginLeft: 10,
    borderRadius: 50,
    elevation: 5,
  },
  btnIcon: {
    fontSize: 22,
    color: 'white',
  },
});

export default UserInput;
