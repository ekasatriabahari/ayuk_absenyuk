import React, {useState, useEffect, useMemo, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

/* Auth Context */
import {AuthContext} from '../contexts/AuthContext';

/* Screens */
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import LainnyaScreen from './HomeScreen/lainnya';
import SettingScreen from './SettingScreen';

/* Loader */
import LoaderScreen from '../components/Loading';

const Stack = createStackNavigator();
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

const Tab = createBottomTabNavigator();
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

const appNav = () => {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
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
          isLoading: false,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (response) => {
        let userToken;
        userToken = response.token;
        try {
          await AsyncStorage.setItem('userToken', response.token);
          await AsyncStorage.setItem('userId', response.id_pegawai);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'SIGN_IN', token: userToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  const getToken = async () => {
    let userToken;
    userToken = null;
    try {
      userToken = await AsyncStorage.getItem('userToken');
    } catch (e) {
      console.log(e);
    }
    dispatch({type: 'RESTORE_TOKEN', token: userToken});
  };

  useEffect(() => {
    setTimeout(() => {
      getToken();
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
