import React, {useContext, useRef, useEffect} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import ActivityIndicetorView from '../Components/ActivityIndicetorView';
import NymsCard from '../Components/NymsCard';
import DataContext from '../contexts/DataContext';
import NotFound from '../Components/NotFound';

const AntonymsTab = ({navigation, route}) => {
  const {
    state: {antonyms},
  } = useContext(DataContext);

  if (antonyms.status === 'loading')
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <ActivityIndicetorView
          maxItem={antonyms.maxSearched}
          storedItem={antonyms.downloaded}
        />
        <NotFound />
      </View>
    );

  if (antonyms.data.length <= 0)
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
        data={antonyms.data}
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

export default React.memo(AntonymsTab);
