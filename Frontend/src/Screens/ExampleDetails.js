import React from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import DetailedPageHeader from '../Components/DetailedPageHeader';
import ExamplesSubCard from '../Components/ExamplesSubCard';
const ExampleDetails = ({route, navigation}) => {
  const {examples, word} = route.params;
  return (
    <SafeAreaView style={{flex: 1}}>
      <DetailedPageHeader
        navigation={navigation}
        title={word}
        subtitle={'More Examples'}
      />

      <FlatList
        contentContainerStyle={{paddingVertical: 10}}
        style={{flex: 1, backgroundColor: '#fff'}}
        data={examples}
        keyExtractor={(item) => Math.random().toString()}
        renderItem={({item}) => <ExamplesSubCard text={item} />}
      />
    </SafeAreaView>
  );
};

export default ExampleDetails;
