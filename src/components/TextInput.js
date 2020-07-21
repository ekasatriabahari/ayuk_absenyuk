import React, {Component} from 'react';
import {Text, View} from 'react-native';

const BLUE = '#428AF8';
const GRAY = '#D3D3D3';

export class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
    };
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default TextInput;
