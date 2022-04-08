import React, {useContext, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, StyleSheet, TouchableOpacity, Animated, View} from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import {RemoveFvWord, GetFavAllWords} from '../reducer/actionsCreators';
import FavouriteContext from '../contexts/FavouriteContext';

const FavouriteItemCard = ({text, navigation}) => {
  const scaleX = useRef(new Animated.Value(-50)).current;
  const [isFocused, setIsFocused] = useState(false);
  const [longPressed, setLogPressed] = useState(false);
  const theme = useContext(ThemeContext);
  const { fvDispatch} = useContext(FavouriteContext);

  // if (removed) return null;
  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        transform: [{translateX: scaleX}],
      }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={(e) => {
            RemoveFvWord(fvDispatch, text);
            GetFavAllWords(fvDispatch);
            // setRemoved(true);
          }}
          style={{
            width: 50, //longPressed ? 50 : 0,
            height: '99%',
            backgroundColor: theme.errorBg,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name={'delete'} size={25} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.itemContainer,
            {
              width: '100%',
              backgroundColor: theme.wordBodyColor,
              borderColor: theme.primaryColor,
              borderLeftWidth: longPressed ? 0 : isFocused ? 5 : 3,
            },
          ]}
          onLongPress={(e) => {
            if (longPressed) {
              Animated.timing(scaleX, {
                toValue: -50,
                duration: 500,
                useNativeDriver: true,
              }).start(() => setLogPressed(false));
            } else {
              Animated.timing(scaleX, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }).start(() => setLogPressed(true));
            }
          }}
          activeOpacity={0.7}
          onPressIn={(e) => setIsFocused(true)}
          onPress={(e) => {
            navigation.navigate('FavouriteItemScreen', {
              headerTitle: text,
            });
          }}
          onPressOut={(e) => {
            setIsFocused(false);
          }}>
          <Text style={[styles.itemText]}>{text}</Text>
          <Icon size={19} color={theme.secondryTextColor} name={'right'} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
export default React.memo(FavouriteItemCard);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    opacity: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 2,
    borderLeftWidth: 40,
  },
  itemText: {
    fontSize: 18,
    fontFamily: 'relSemiBold',
    top: -2,
    color: '#000'
  },
});
