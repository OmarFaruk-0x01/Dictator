import React, {useContext} from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import DetailedPageHeader from '../Components/DetailedPageHeader';
import NymsSubCard from '../Components/NymsSubCard';
import ThemeContext from '../contexts/ThemeContext';
const NymsDetails = ({route, navigation}) => {
  const theme = useContext(ThemeContext);
  const {nyms, word, routeName} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <DetailedPageHeader
        navigation={navigation}
        title={word}
        subtitle={'More ' + routeName}
      />
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

export default NymsDetails;
