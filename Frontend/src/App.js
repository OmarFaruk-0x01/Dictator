import React, {useState, useReducer, useRef, useEffect} from 'react';
import {ToastAndroid, Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from './contexts/ThemeContext';
import Colors from './helpers/colors';
import WordDetails from './Screens/WordDetails';
import ExampleDetails from './Screens/ExampleDetails';
import NymsDetails from './Screens/NymsDetails';
import {
  errorReducer,
  exportReducer,
  initialErrorState,
  initialExportState,
} from './reducer';
import ErrorContext from './contexts/ErrorContext';
import ErrorDisplay from './Screens/ErrorDisplayScreen';
import DrawerNavigation from './Navigations/DrawerNavigation';
import SplashScreen from './Screens/SplashScreen';
import axios from 'axios';
import {env} from './helpers/environment';
import ExportContext from './contexts/ExportContext';
import ExportScreen from './Screens/ToolsScreen';
import FavouriteItemScreen from './Screens/FavouriteItemScreen';
import {NEW_ERROR_ADDING} from './reducer/actions';
import {isPermitted} from './helpers/config';
const BaseURL = __DEV__ ? env.d.BaseURL : env.p.BaseURL;
const Stack = createStackNavigator();

const MainStack = () => {
  const [exportState, exportDispatch] = useReducer(
    exportReducer,
    initialExportState,
  );

  return (
    <ExportContext.Provider value={{exportState, exportDispatch}}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'main'}>
        <Stack.Screen name="main" component={DrawerNavigation} />
        <Stack.Screen name="WordDetails" component={WordDetails} />
        <Stack.Screen name="ExamplesDetails" component={ExampleDetails} />
        <Stack.Screen name="NymsDetails" component={NymsDetails} />
        <Stack.Screen 
        name="ToolsScreen" 
        component={ExportScreen} 
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
        />
        <Stack.Screen
          name="FavouriteItemScreen"
          component={FavouriteItemScreen}
        />
        <Stack.Screen name="ErrorDisplayScreen" component={ErrorDisplay} />
      </Stack.Navigator>
    </ExportContext.Provider>
  );
};

const App = () => {
  const [theme, setTheme] = useState(Colors.theme_1);
  const [showSpalshScreen, setShowSplash] = useState(true);
  const [state, dispatch] = useReducer(errorReducer, initialErrorState);
  const TryReconnect = async () => {
    try {
      const themeName = await AsyncStorage.getItem('theme');
      if (themeName) {
        setTheme(Colors[themeName]);
      } else {
        setTheme(Colors['theme_1']);
      }

      const haveExternalPermmision = await isPermitted();
      if (!haveExternalPermmision) {
        ToastAndroid.showWithGravityAndOffset(
          'No Storage Permissions0',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          100,
        );
      }
      setShowSplash(false);
      const isInternet = await axios({
        method: 'get',
        url: BaseURL,
      });
      if (isInternet.status !== 200) {
        dispatch({
          type: NEW_ERROR_ADDING,
          payload: {
            fieldName: 'Home',
            title: 'No Network',
            message: 'Check Your Internet Connection',
            args: '',
            status: 400,
          },
        });
      }
    } catch (e) {
      dispatch({
        type: NEW_ERROR_ADDING,
        payload: {
          fieldName: 'Home',
          title: 'No Network',
          message: 'Check Your Internet Connection',
          args: '',
          status: 400,
        },
      });
      setShowSplash(false);
    }
  };

  React.useEffect(() => {
    if (showSpalshScreen) {
      TryReconnect();
    }
  }, []);

  if (showSpalshScreen) {
    return <SplashScreen />;
  }

  return (
    <ErrorContext.Provider value={{errorState: state, errorDispatch: dispatch}}>
      <ThemeContext.Provider value={{...theme, setTheme}}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </ThemeContext.Provider>
    </ErrorContext.Provider>
  );
};

export default App;
