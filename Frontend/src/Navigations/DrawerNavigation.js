import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Share} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import SettingScreen from '../Screens/SettingScreen';
import FeedBackScreen from '../Screens/FeedBackScreen';
import AppHeaderIcon from '../Components/SvgIcons/AppHeaderIcon';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {BottomTabBar} from './BottomTabBar';
import ThemeContext from '../contexts/ThemeContext';
import {AboutApp} from '../Screens/AboutApp';
import {ShareMessage} from '../helpers/config';

const Drawer = createDrawerNavigator();
const CustomNavDrawer = (props) => {
  const {state, navigation, descriptors} = props;
  const theme = useContext(ThemeContext);
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',

          flexDirection: 'column',

          // padding: 40,
          marginBottom: 15,
        }}>
        <AppHeaderIcon
          width={200}
          height={100}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            left: 8,
          }}
        />
        <Text style={{fontFamily: 'relRegular', top: -20}}>
          Dictionary & Translator
        </Text>
        <View
          style={{
            width: '100%',
            height: 4,
            backgroundColor: theme.primaryColor,
          }}
        />
      </View>

      <View>
        {state.routes.map((route, index) => {
          const label = route.name;
          const isActive = index === state.index;
          const options = descriptors[route.key].options;
          const onPress = () => {
            navigation.navigate(label);
          };
          return (
            <TouchableOpacity
              accessibilityRole={'button'}
              accessibilityState={isActive ? {selected: true} : {}}
              accessibilityLabel={label}
              key={route.key}
              onPress={onPress}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 5,
                alignItems: 'flex-end',
                backgroundColor: isActive ? theme.backface : '#fff',
                paddingVertical: 5,
                margin: 5,
                borderRadius: 3,
              }}>
              <Icon
                color={isActive ? theme.primaryColor : '#525054'}
                size={20}
                name={options.IconName}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'relSemiBlod',
                  color: isActive ? theme.primaryColor : '#525054',
                  marginLeft: 5,
                  // top: -2,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', width: '100%', marginBottom: 10}}
          onPress={async () => {
            const res = await Share.share({
              title: 'Share',
              message: ShareMessage,
            });
          }}>
          <Icon name={'sharealt'} size={20} color={'#525054'} />
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'relSemiBlod',
              color: '#525054',
              marginLeft: 5,
              // top: -2,
            }}>
            Share
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'relRegular',
            color: theme.secondryTextColor,
          }}>
          Copyright &copy; 2021
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      drawerContent={(props) => <CustomNavDrawer {...props} />}>
      <Drawer.Screen
        name={'Home'}
        component={BottomTabBar}
        options={{IconName: 'home'}}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{IconName: 'setting'}}
      />
      <Drawer.Screen
        name="FeedBack"
        component={FeedBackScreen}
        options={{IconName: 'form'}}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutApp}
        options={{IconName: 'info'}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
