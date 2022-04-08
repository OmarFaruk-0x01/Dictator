import React, {useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import DetailedPageHeader from '../Components/DetailedPageHeader';
import NymsSubCard from '../Components/NymsSubCard';
import ThemeContext from '../contexts/ThemeContext';
import ErrorContext from '../contexts/ErrorContext';
import ErrorCard from '../Components/ErrorCard';
const ErrorDisplay = ({route, navigation}) => {
  const theme = useContext(ThemeContext);
  const {errorState, errorDispatch} = useContext(ErrorContext);

  return (
    <SafeAreaView style={{flex: 1}}>
      <DetailedPageHeader
        navigation={navigation}
        title={'Errors'}
        errorDispatch={errorDispatch}
      />

      <FlatList
        contentContainerStyle={{paddingVertical: 10}}
        style={{flex: 1, backgroundColor: '#fff'}}
        data={errorState.errorList}
        keyExtractor={(item) => Math.random().toString()}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginVertical: 40}}>
            Looking Good, No Errors
          </Text>
        }
        renderItem={({item}) => (
          <View
            style={{
              borderLeftWidth: 4,
              borderColor: theme.errorBg,
              backgroundColor: '#fff',
              elevation: 4,
              marginBottom: 15,
            }}>
            <ErrorCard {...item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ErrorDisplay;
