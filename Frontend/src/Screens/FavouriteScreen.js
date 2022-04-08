import React, {useContext} from 'react';
import {FlatList, Text, View} from 'react-native';
import FavouriteListItem from '../Components/FavouriteListItem';
import FavouriteContext from '../contexts/FavouriteContext';
const FavouriteScreen = ({navigation}) => {
  const {
    fvWordState: {fvWords},
  } = useContext(FavouriteContext);

  if (fvWords.length === 0) {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text
          style={{textAlign: 'center', fontSize: 18, fontFamily: 'relRegular', color: '#000'}}>
          No Offline Words
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        data={fvWords}
        renderItem={({item}) => (
          <FavouriteListItem
            navigation={navigation}
            text={item.name.toUpperCase()}
          />
        )}
        keyExtractor={(item) => Math.random().toString()}
      />
    </View>
  );
};
export default FavouriteScreen;
