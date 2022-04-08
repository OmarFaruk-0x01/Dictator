import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import CardModalBox from './CardModalBox';
import Icon from 'react-native-vector-icons/AntDesign';

import ExamplesSubCard from './ExamplesSubCard';

const ExamplesCard = ({examples, word, navigation}) => {
  const theme = React.useContext(ThemeContext);
  const [wordModal, setWordModal] = useState(false);
  const renderWordDetailsBtn = () => {
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
          navigation.navigate('ExamplesDetails', {examples, word});
        }}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'relSemiBold',
            color: theme.primaryColor,
          }}>
          More Examples
        </Text>
      </TouchableOpacity>
    );
  };
  const renderSubCard = () => {
    return examples
      .slice(0, 5)
      .map((item) => (
        <ExamplesSubCard text={item} key={Math.random().toString()} />
      ));
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
          wordInfo={examples}
          Key={'examples'}
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
          {renderSubCard()}
          {examples.length > 0 && renderWordDetailsBtn()}
          {examples.length === 0 && (
            <Text
              style={{
                fontFamily: 'relRegular',
                fontSize: 16,
                textAlign: 'center',
              }}>
              Noting Found
            </Text>
          )}
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

export default React.memo(ExamplesCard);
