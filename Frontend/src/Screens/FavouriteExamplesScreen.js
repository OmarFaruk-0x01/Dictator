import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import ExamplesSubCard from '../Components/ExamplesSubCard';
import RefatchData from '../Components/RefetchData';
import {ReadWord} from '../helpers/config';
const FavouriteExamplesScreen = ({word}) => {
  const [update, setUpdate] = useState(false);
  const [examples, setExamples] = useState([]);
  useEffect(() => {
    ReadWord(word, 'examples').then((data) => {
      setExamples(data);
    });
  }, [update]);
  if (examples.length === 0) {
    return <RefatchData setUpdate={setUpdate} word={word} type={'Examples'} />;
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        contentContainerStyle={{paddingVertical: 10}}
        style={{flex: 1, backgroundColor: '#fff'}}
        data={examples}
        keyExtractor={(item) => Math.random().toString()}
        renderItem={({item}) => <ExamplesSubCard isFav text={item} />}
      />
    </SafeAreaView>
  );
};

export default FavouriteExamplesScreen;
