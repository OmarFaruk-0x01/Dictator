import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import CardModalBox from './CardModalBox';
import Icon from 'react-native-vector-icons/AntDesign';

import NymsSubCard from './NymsSubCard';

const NymsCard = ({nyms, word, navigation, routeName}) => {
  const theme = useContext(ThemeContext);
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
          navigation.navigate('NymsDetails', {nyms, word, routeName});
        }}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'relSemiBold',
            color: theme.primaryColor,
          }}>
          More {routeName}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSubCard = () => {
    return nyms
      .slice(0, 1)
      .map((item) => (
        <NymsSubCard
          routeName={routeName}
          {...item}
          limit={10}
          key={Math.random().toString()}
        />
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
          wordInfo={nyms}
          Key={routeName.toLowerCase()}
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
          {nyms.length > 0 && renderWordDetailsBtn()}
          {nyms.length === 0 && (
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

export default React.memo(NymsCard);
