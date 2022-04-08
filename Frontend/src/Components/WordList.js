import React, {useContext, useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView, Text, FlatList} from 'react-native';
import Card from './Card';
import NotFound from './NotFound';

const WordList = ({words, navigation}) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        style={styles.listCon}
        data={words}
        contentContainerStyle={styles.contentStyle}
        keyExtractor={(item) => {
          return Math.random().toString();
        }}
        renderItem={({item}) => (
          <Card navigation={navigation} wordInfo={item} />
        )}
        ListEmptyComponent={<NotFound />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listCon: {},
  contentStyle: {
    paddingBottom: 30,
  },
});

export default React.memo(WordList);
