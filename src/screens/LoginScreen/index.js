import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
/* Auth Context */
import {AuthContext} from '../context';

import Styles from '../Styles';
import LOGO from '../../assets/images/pic3.png';

const index = ({navigation}) => {
  const [userNip, setUserNip] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const {signIn} = useContext(AuthContext);

  const loginHandle = (userNip, userPassword) => {
    const checkLogin = signIn(userNip, userPassword);
  };

  return (
    <ScrollView style={[Styles.body]}>
      <SafeAreaView style={Styles.container}>
        <Image source={LOGO} style={Styles.imgLogin} />
        <Text style={[Styles.fontBold, {fontSize: 22, marginBottom: 30}]}>
          Absen Yuk!
        </Text>

        <View>
          <TextInput
            onChangeText={setUserNip}
            placeholder="NIP"
            style={[Styles.font, Styles.formInput]}
            underlineColorAndroid="#D3D3D3"
          />
          <TextInput
            onChangeText={setUserPassword}
            placeholder="Password"
            secureTextEntry={true}
            style={[Styles.font, Styles.formInput]}
            underlineColorAndroid="#D3D3D3"
          />
        </View>
        <View>
          <TouchableOpacity
            style={[Styles.font, Styles.button]}
            onPress={() => loginHandle(userNip, userPassword)}>
            <Text style={[Styles.font, {color: '#fff'}]}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.copyright}>
          <Text style={[Styles.font, {fontSize: 10, color: 'gray'}]}>
            Made with ❤ by Eka Satria Bahari 2020
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default index;
