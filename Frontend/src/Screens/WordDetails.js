import React, {useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import SubCard from '../Components/SubCard';
import ThemeContext from '../contexts/ThemeContext';
import DetailedPageHeader from '../Components/DetailedPageHeader';
const WordDetails = ({route, navigation}) => {
  const theme = useContext(ThemeContext);
  const {wordInfo} = route.params;
  const renderSubCard = () => {
    return wordInfo.engType.map((_type) => (
      <SubCard
        lang={'en'}
        key={Math.random()}
        info={{..._type, word: wordInfo.word}}
      />
    ));
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <DetailedPageHeader
        navigation={navigation}
        title={wordInfo.word}
        subtitle={'More Definition'}
      />
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
          <SubCard info={{bn: wordInfo.translation}} />
          {renderSubCard()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WordDetails;
