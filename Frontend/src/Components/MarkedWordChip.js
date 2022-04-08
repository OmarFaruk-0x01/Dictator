import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import ToolsSection from './ToolsSection';
import ToolsOptionsCard from './ToolsOptions';

const ExportedWordChip = ({word, isExsits}) => {
  const theme = useContext(ThemeContext);
  
  return (
    <View
      style={[styles.markedWordContiner, {borderColor: theme.primaryColor}]}>
      <View 
      style={{ paddingVertical: 5, paddingHorizontal: 3}}
      >
        <Text 
          style={{
            fontSize: 20,
            fontFamily: 'relBold',
            color: theme.primaryColor
          }}
        >{word}</Text>
      </View>
      <View style={{
        marginVertical: 5,
        flexDirection: 'row'
      }}>
          <ToolsOptionsCard optionTitle={'Definition'} checked={isExsits.defination}/>
          <ToolsOptionsCard optionTitle={'Examples'} checked={isExsits.examples} />
          <ToolsOptionsCard optionTitle={'Synonyms'} checked={isExsits.synonyms}/>
          <ToolsOptionsCard optionTitle={'Antonyms'} checked={isExsits.antonyms}/>
      </View>
      
    </View>
  );
};

export default React.memo(ExportedWordChip);

const styles = StyleSheet.create({
  markedWordContiner: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingRight: 8,
    paddingVertical: 5,
    marginHorizontal: 5,
    elevation:3,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000'
  },
  markedWord: {
    top: -2,
    fontSize: 15,
    fontFamily: 'relSemiBold',
    marginRight: 4,
    
  },
});
