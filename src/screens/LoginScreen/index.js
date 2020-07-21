import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Styles from '../Styles';
import LOGO from '../../assets/images/pic3.png';

const index = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <Image source={LOGO} style={Styles.imgLogin} />
      <Text style={[Styles.fontBold, {fontSize: 22, marginBottom: 30}]}>
        Absen Yuk!
      </Text>

      <View>
        <TextInput
          placeholder="Username or NIP"
          style={[Styles.font, Styles.formInput]}
          underlineColorAndroid="#D3D3D3"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={[Styles.font, Styles.formInput]}
          underlineColorAndroid="#D3D3D3"
        />
        <TouchableOpacity style={[Styles.font, Styles.button]}>
          <Text style={[Styles.font, {color: '#fff'}]}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={Styles.copyright}>
        <Text style={[Styles.font, {fontSize: 10, color: 'gray'}]}>
          Made with ❤ by Eka Satria Bahari 2020
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
