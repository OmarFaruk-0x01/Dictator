import React, {useContext} from 'react';
import {View, FlatList, Alert} from 'react-native';
import ActivityIndicetorView from '../Components/ActivityIndicetorView';
import ExamplesCard from '../Components/ExamplesCard';
import DataContext from '../contexts/DataContext';
import NotFound from '../Components/NotFound';

const ExamplesTab = ({navigation}) => {
  const {
    state: {examples},
  } = useContext(DataContext);

  if (examples.status === 'fail') {
    Alert.alert(examples.error.title, examples.error.message);
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <NotFound />
      </View>
    );
  }

  if (examples.status === 'loading')
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <ActivityIndicetorView
          maxItem={examples.maxSearched}
          storedItem={examples.downloaded}
        />
        <NotFound />
      </View>
    );
  if (examples.data.length <= 0)
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#fff',
        }}>
        <NotFound />
      </View>
    );

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
      <FlatList
        data={examples.data}
        keyExtractor={(item) => Math.random().toString()}
        renderItem={({item}) => {
          return <ExamplesCard {...item} navigation={navigation} />;
        }}
      />
    </View>
  );
};

export default React.memo(ExamplesTab);
