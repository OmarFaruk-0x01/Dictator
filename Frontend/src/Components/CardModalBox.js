import React, {useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {WriteWord} from '../helpers/config';
import {GetFavAllWords} from '../reducer/actionsCreators';
import FavouriteContext from '../contexts/FavouriteContext';
import {MARK_AS_EXPORT} from '../reducer/actions'
import ExportContext from '../contexts/ExportContext';
const CardModalBox = ({showModal, word, wordInfo, Key}) => {
  const OpacityAnim = useRef(new Animated.Value(0)).current;
  const {fvDispatch, fvState} = useContext(FavouriteContext);
  const {exportDispatch, exportState} = useContext(ExportContext);
  console.log(fvState);

  
  useEffect(() => {
    Animated.timing(OpacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, []);
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          opacity: OpacityAnim,
        },
      ]}>
      <View
        onTouchEnd={(e) => {
          showModal(false);
        }}
        style={{
          backgroundColor: 'rgba(0,0,0,.5)',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '90%',
            backgroundColor: '#fff',
          }}>
          <TouchableOpacity
            onPress={(e) => {
              exportDispatch({
                payload:{word, data: wordInfo, Key}, 
                type: MARK_AS_EXPORT,
              })
            }}
            activeOpacity={0.4}
            style={styles.optionCon}>
            <Icon name={'export'} size={20} color={'#000'} />
            <Text style={styles.optionText}>Mark as Export</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(e) => {
              WriteWord(word, wordInfo, Key).then((e) => {
                GetFavAllWords(fvDispatch);
              });
            }}
            activeOpacity={0.4}
            style={styles.optionCon}>
            <Icon name={'hearto'} size={20} color={'#000'} />
            <Text style={styles.optionText}>Add To Offline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};
export default CardModalBox;
const styles = StyleSheet.create({
  optionCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    padding: 10,
  },
  optionText: {
    fontSize: 20,
    fontFamily: 'relRegular',
    top: -2,
    marginLeft: 5,
    color: '#000'
  },
});
