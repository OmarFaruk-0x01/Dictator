import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

const ToolsSection = ({children, title}) => {
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.section]}>
      <Text style={[styles.sectionTitle]}>{title}</Text>
      <View style={[styles.hr, {backgroundColor: theme.primaryColor}]} />
      <View style={[styles.content]}></View>
      {children}
    </View>
  );
};

export default React.memo(ToolsSection);

const styles = StyleSheet.create({
  content: {
    paddingVertical: 3,
  },
  section: {
    paddingLeft: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'relSemiBold',
    textTransform: 'uppercase',
    color: '#000'
  },
  hr: {
    width: '100%',
    height: 2,
  },
});
