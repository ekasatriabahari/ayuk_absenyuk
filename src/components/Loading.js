import React from 'react';
import {View, Text, Image} from 'react-native';
import LOADER from '../assets/images/loader.png';
import Styles from '../screens/Styles';

const Loading = () => {
  return (
    <View style={[Styles.containerCenter]}>
      <Image source={LOADER} style={[Styles.imgLogin]} />
      <Text style={[Styles.font, {fontSize: 20}]}>Loading ...</Text>
    </View>
  );
};

export default Loading;
