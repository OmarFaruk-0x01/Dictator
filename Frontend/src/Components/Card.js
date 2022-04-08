import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import SubCard from './SubCard';
import CardModalBox from './CardModalBox';

const Card = ({wordInfo, navigation}) => {
  const theme = React.useContext(ThemeContext);
  const [wordModal, setWordModal] = useState(false);
  const {word, engType, translation: bn} = wordInfo;

  const renderWordDetailsBtn = () => {
    if (!engType || engType.length === 0) return null;

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: theme.backface,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 7,
          marginHorizontal: 10,
          borderRadius: 20,
        }}
        onPress={(e) => {
          navigation.navigate('WordDetails', {wordInfo});
        }}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'relSemiBold',
            color: theme.primaryColor,
          }}>
          More Details
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSubCard = () => {
    if (!engType || engType.length === 0) return null;
    let customEngType = engType[0];
    let isHasEmpty = customEngType.part_of_speech.filter(
      (pos) => Object.entries(pos.info).length === 0,
    );
    if (isHasEmpty.length > 0) {
      if (engType.length >= 2) {
        customEngType = engType[1];
        isHasEmpty = customEngType.part_of_speech.filter(
          (pos) => Object.entries(pos.info).length === 0,
        );
      } else {
        return null;
      }
    }
    if (isHasEmpty.length > 0) {
      return null;
    }
    return (
      <SubCard
        lang={'en'}
        key={Math.random()}
        info={{...customEngType, word: word}}
        limit={2}
      />
    );
  };

  return (
    <>
      <Modal
        visible={wordModal}
        transparent={true}
        onRequestClose={(e) => setWordModal(false)}
        animationType={'fade'}>
        <CardModalBox
          showModal={setWordModal}
          word={word}
          wordInfo={wordInfo}
          Key={'definition'}
        />
      </Modal>
      <View style={styles.card}>
        <View
          style={{
            ...styles.mainWord,
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: theme.primaryColor,
            borderBottomWidth: 2,
          }}>
          <Text style={{...styles.wordText, color: '#000'}}>{word}</Text>
          <TouchableOpacity onPress={(e) => setWordModal(true)}>
            <Icon name={'down'} size={20} color={theme.textPlaceHolder} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            ...styles.mainBody,
            backgroundColor: '#fff',
          }}>
          <SubCard info={{bn}} />
          {renderSubCard()}

          {renderWordDetailsBtn()}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,

    elevation: 40,
    marginBottom: 10,
  },
  mainWord: {
    flex: 1,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    alignSelf: 'flex-start',
    borderTopRightRadius: 5,
    paddingHorizontal: 10,
  },
  extraBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'relBold',
    fontWeight: '900',
  },
  mainBody: {
    display: 'flex',
    borderRadius: 5,
    elevation: 5,
    paddingVertical: 10,
    zIndex: 1,
  },
  btnIcon: {
    fontSize: 14,
    color: '#fff',
  },
});

export default React.memo(Card);
