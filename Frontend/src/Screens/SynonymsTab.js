import React, {useContext} from 'react';
import {View, FlatList, Alert} from 'react-native';
import ActivityIndicetorView from '../Components/ActivityIndicetorView';
import NymsCard from '../Components/NymsCard';
import DataContext from '../contexts/DataContext';
import NotFound from '../Components/NotFound';

const SynonymsTab = ({navigation, route}) => {
  const {
    state: {synonyms},
  } = useContext(DataContext);
  if (synonyms.status === 'fail') {
    Alert.alert(synonyms.error.title, synonyms.error.message);
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
  }
  if (synonyms.status === 'loading')
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <ActivityIndicetorView
          maxItem={synonyms.maxSearched}
          storedItem={synonyms.downloaded}
        />
        <NotFound />
      </View>
    );
  if (synonyms.data.length === 0)
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <NotFound />
      </View>
    );

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
      <FlatList
        data={synonyms.data}
        keyExtractor={(item) => Math.random().toString()}
        renderItem={({item}) => {
          return (
            <NymsCard
              routeName={route.name}
              navigation={navigation}
              {...item}
            />
          );
        }}
      />
    </View>
  );
};

export default React.memo(SynonymsTab);
