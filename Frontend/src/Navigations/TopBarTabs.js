import React, {useContext, useRef} from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ThemeContext from '../contexts/ThemeContext';
import UserInput from '../Components/UserInput';

const Tab = createMaterialTopTabNavigator();

const CustomTopTabBar = ({placeholderRef, state, descriptors, navigation}) => {
  const theme = useContext(ThemeContext);

  return (
    <View style={{backgroundColor: '#fff'}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}
        style={{
          backgroundColor: '#00000000',
          maxHeight: 40,
          marginVertical: 10,
        }}
        scrollEventThrottle={16}
        snapToAlignment={'center'}
        data={state.routes}
        keyExtractor={(item) => item.key}
        renderItem={({item: route, index}) => {
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
            if (placeholderRef) {
              placeholderRef.current = label;
            }
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, {placeHolderRef: placeholderRef});
            }
          };
          return (
            <TouchableOpacity
              accessibilityRole={'button'}
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              key={route.key}>
              <View
                style={{
                  backgroundColor: isFocused
                    ? theme.primaryColor
                    : theme.backface,
                  paddingHorizontal: 15,
                  paddingVertical: 4,
                  borderRadius: 15,
                  marginHorizontal: 5,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    color: !isFocused ? theme.primaryColor : '#fff',
                  }}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const TopBarTabs = (Component) => {
  const NewComponent = ({routes}) => {
    const placeHolder = useRef('Definition');

    return (
      <>
        <UserInput placeHolder={placeHolder.current} />
        <Component
          swipeEnabled={false}
          placeHolder={placeHolder}
          routes={routes}
        />
      </>
    );
  };
  return NewComponent;
};

const TopBarTabs_lessInput = ({placeHolder, routes, title, swipeEnabled}) => {
  return (
    <>
      <View style={[{flex: 1, backgroundColor: '#fff'}]}>
        <Tab.Navigator
          sceneContainerStyle={{flex: 1, backgroundColor: '#fff'}}
          initialRouteName={'Definition'}
          lazy={false}
          keyboardDismissMode={'on-drag'}
          tabBar={(props) => (
            <CustomTopTabBar placeholderRef={placeHolder} {...props} />
          )}
          swipeEnabled={swipeEnabled}
          tabBarOptions={{bounces: true}}
          tabBarPosition={'top'}>
          {routes.map((Screen) => (
            <Tab.Screen key={Screen.name} name={Screen.name}>
              {(props) => <Screen.component word={title} {...props} />}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
      </View>
    </>
  );
};

const TopBarTabs_WithInput = TopBarTabs(TopBarTabs_lessInput);

export {TopBarTabs_WithInput, TopBarTabs_lessInput};
