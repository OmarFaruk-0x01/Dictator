import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import NymsSubCard from '../Components/NymsSubCard';
import RefatchData from '../Components/RefetchData';
import ThemeContext from '../contexts/ThemeContext';
import {ReadWord} from '../helpers/config';
const FavouriteNymsScreen = ({word, routeName}) => {
  const theme = useContext(ThemeContext);
  const [nyms, setNyms] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    ReadWord(word, routeName.toLowerCase()).then((data) => {
      setNyms(data);
    });
  }, [update]);

  if (nyms.length === 0)
    return <RefatchData setUpdate={setUpdate} word={word} type={routeName} />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        contentContainerStyle={{paddingVertical: 10}}
        style={{flex: 1, backgroundColor: '#fff'}}
        data={nyms}
        keyExtractor={(item) => Math.random().toString()}
        renderItem={({item}) => (
          <View
            style={{
              borderLeftWidth: 4,
              borderColor: theme.primaryColor,
              backgroundColor: '#fff',
              elevation: 4,
              marginBottom: 15,
            }}>
            <NymsSubCard routeName={routeName} {...item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default FavouriteNymsScreen;
