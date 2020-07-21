import React, {Component} from 'react';
import {Text, View} from 'react-native';
import 'react-native-gesture-handler';
import AppNav from './src/screens/appNav';

export class App extends Component {
  render() {
    return <AppNav />;
  }
}

export default App;
