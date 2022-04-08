import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
const ToolsBtn = ({text, onPress, setChecked, underDev}) => {
  const theme = useContext(ThemeContext);
  return (
    <View>
      <TouchableOpacity
        disabled={underDev && true}
        onPress={onPress}
        style={[
          styles.brnContainer,
          {
            backgroundColor: !underDev ? theme.primaryColor : theme.errorBg,
          },
        ]}>
        <Icon name={underDev ? 'warning' : 'upload'} size={19} color={'#fff'} />
        <Text style={[styles.btnText]}>
          {underDev ? 'Under Development' : 'Export'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(ToolsBtn);

const styles = StyleSheet.create({
  brnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    zIndex: 0,
    marginTop: 7
  },
  btnText: {
    fontFamily: 'relSemiBold',
    fontSize: 18,
    color: '#fff',
    marginHorizontal: 6,
    top: -2,
  },
});
