import React, {useState, useEffect, useMemo, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

/* Auth Context */
import {AuthContext} from './context';

/* Screens */
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import LainnyaScreen from './HomeScreen/lainnya';
import SettingScreen from './SettingScreen';
import {Alert} from 'react-native';

/* Loader */
import LoaderScreen from '../components/Loading';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
          headerTitle: null,
        }}
      />
      <Stack.Screen name="Lainnya" component={LainnyaScreen} />
    </Stack.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#3867d6',
        inactiveTintColor: '#2d3436',
        activeBackgroundColor: '#b2bec3',
        showLabel: false,
        keyboardHidesTabBar: true,
        style: {
          backgroundColor: '#dfe6e9',
          position: 'absolute',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-home-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-cog" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const appNav = ({navigation}) => {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userName: null,
    userNip: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
          userName: action.nama,
          userNip: action.nip,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          userName: null,
          userNip: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (userNip, password) => {
        let userToken;
        userToken = null;
        if (userNip == '123' && password == '123') {
          userToken = 'true';
          try {
            await AsyncStorage.setItem('userToken', userToken);
            await AsyncStorage.setItem('userNip', userNip);
          } catch (e) {
            console.log(e);
          }
        } else if (userNip == null || password == null) {
          Alert.alert('Warning!', 'Lengkapi Data!');
        } else {
          Alert.alert('Warning!', 'NIP atau Password Salah!');
        }
        dispatch({type: 'SIGN_IN', nip: userNip, token: userToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('userNip');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return <LoaderScreen />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <HomeTabs />
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                headerTransparent: true,
                headerTitle: null,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default appNav;
