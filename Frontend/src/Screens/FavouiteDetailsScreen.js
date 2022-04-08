import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, ScrollView, StyleSheet} from 'react-native';
import SubCard from '../Components/SubCard';
import {ReadWord} from '../helpers/config';
const FevouriteDetailsScreen = ({word}) => {
  const [definition, setDefinition] = useState({});
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    ReadWord(word, 'definition').then((data) => {
      setDefinition(data);
    });
  }, [update]);

  if (Object.keys(definition).length === 0) {
    const RefetchData = require('../Components/RefetchData').default;
    return (
      <RefetchData type={'Definition'} word={word} setUpdate={setUpdate} />
    );
  }
  const renderSubCard = () => {
    return definition.engType.map((_type) => (
      <SubCard
        lang={'en'}
        key={Math.random()}
        info={{..._type, word: definition.word}}
      />
    ));
  };
  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, {backgroundColor: '#fff'}]}>
      <ScrollView
        horizontal={false}
        contentContainerStyle={{flexDirection: 'column'}}
        style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            display: 'flex',
            borderRadius: 5,
            elevation: 5,
            paddingVertical: 10,
            zIndex: 1,
            backgroundColor: '#fff',
          }}>
          <SubCard info={{bn: {bn: definition.translation.bn}}} lang="bn" />
          {renderSubCard()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FevouriteDetailsScreen;
