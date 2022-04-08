import React, {useContext, useReducer, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ThemeContext from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import {TopBarTabs_WithInput} from './TopBarTabs';
import Header from '../Components/Header';
import FavouriteScreen from '../Screens/FavouriteScreen';
import {
  dataReducer,
  favouriteReducer,
  initialFavouriteState,
  initialState,
} from '../reducer';
import DataContext from '../contexts/DataContext';
import {DiscoverScreenRoutes} from '../helpers/RoutesConf';
import {ReadAllWords} from '../helpers/config';
import FavouriteContext from '../contexts/FavouriteContext';
import {GetFavAllWords} from '../reducer/actionsCreators';

const Tab = createBottomTabNavigator();

const CustomBottomBar = ({state, descriptors, navigation, position}) => {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 0,
        margin: 0,
        elevation: 4,
        shadowColor: '#red',
        backgroundColor: '#fff',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <TouchableOpacity
            accessibilityRole={'button'}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={route.key}
            style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: isFocused ? theme.wordBodyColor : '#fff',
                paddingHorizontal: 15,
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 4,
                borderBottomColor: isFocused ? theme.primaryColor : '#fff',
              }}>
              <Icon
                name={options.iconName}
                style={{
                  fontSize: 20,
                  marginRight: 5,
                  color: isFocused
                    ? theme.primaryColor
                    : theme.secondryTextColor,
                }}
              />
              <Text
                style={{
                  fontSize: 17,
                  top: -3,
                  fontFamily: 'relSemiBold',
                  color: isFocused
                    ? theme.primaryColor
                    : theme.secondryTextColor,
                }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabBar = ({navigation}) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const [fvWordState, fvDispatch] = useReducer(
    favouriteReducer,
    initialFavouriteState,
  );
  return (
    <DataContext.Provider value={{state, dispatch}}>
      <FavouriteContext.Provider value={{fvDispatch, fvWordState}}>
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <Header navigation={navigation} />
          <Tab.Navigator tabBar={(props) => <CustomBottomBar {...props} />}>
            <Tab.Screen name="Discover" options={{iconName: 'earth'}}>
              {(props) => (
                <TopBarTabs_WithInput
                  {...props}
                  routes={DiscoverScreenRoutes}
                />
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Offline"
              options={{iconName: 'API'}}
              listeners={{
                tabPress: () => {
                  GetFavAllWords(fvDispatch);
                },
              }}>
              {(props) => <FavouriteScreen {...props} />}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      </FavouriteContext.Provider>
    </DataContext.Provider>
  );
};

export {BottomTabBar};
