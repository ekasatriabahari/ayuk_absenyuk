import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

/* Screens */
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import LainnyaScreen from './HomeScreen/lainnya';
import SettingScreen from './SettingScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
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
  );
};

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

const TabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
  return (
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  );
};

export default appNav;
