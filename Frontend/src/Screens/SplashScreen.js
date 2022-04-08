import React, {useContext, useRef, useEffect} from 'react';
import {View, Text, Animated, Easing} from 'react-native';
import AppHeaderIcon from '../Components/SvgIcons/AppHeaderIcon';
import SubIcon from '../Components/SvgIcons/SubIcon';
import ThemeContext from '../contexts/ThemeContext';
const WIDTH = 430;
const SplashScreen = () => {
  const theme = useContext(ThemeContext);
  const mode = useRef('inc');
  const animWidth = new Animated.Value(0);
  const incWidth = Animated.timing(animWidth, {
    toValue: WIDTH,
    duration: 1500,
    useNativeDriver: true,
    easing: Easing.linear,
  });
  const decWidth = Animated.timing(animWidth, {
    toValue: -WIDTH,
    duration: 1500,
    useNativeDriver: true,
    easing: Easing.linear,
  });
  const anim = () => {
    if (mode.current === 'inc') {
      mode.current = 'dec';
      decWidth.start(anim);
    } else {
      mode.current = 'inc';
      incWidth.start(anim);
    }
  };
  useEffect(() => {
    incWidth.start(anim);

    return () => {
      incWidth.stop();
      decWidth.stop();
    };
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          marginBottom: 100,
          width: WIDTH,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AppHeaderIcon style={{transform: [{scale: 1.2}, {translateX: 7}]}} />
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'relRegular',
            color: 'gray',
            left: -5,
            top: -15,
          }}>
          Dictionary & Translator
        </Text>
      </View>
      <View style={{top: -80, transform: [{translateX: 5}]}}>
        <SubIcon />
      </View>
      <View
        style={{
          width: WIDTH,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: (WIDTH * 60) / 100,
            height: 4,
            backgroundColor: theme.backface,
            overflow: 'hidden',
          }}>
          <Animated.View
            style={{
              height: 4,
              backgroundColor: theme.primaryColor,
              transform: [{scaleX: 0.3}, {translateX: animWidth}],
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
