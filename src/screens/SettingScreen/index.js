import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

/* FETCH API */
import FETCH from '../../functionHelper/APILists';

/* Auth Context */
import {AuthContext} from '../../contexts/AuthContext';

import BANNER from '../../assets/images/setting.png';
import Styles from '../Styles';

const index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState(null);

  const handleRePassword = (val) => {
    if (password !== val) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const {signOut} = useContext(AuthContext);

  const logoutHandle = async () => {
    let token = null;
    let userId = null;
    try {
      token = await AsyncStorage.getItem('userToken');
      userId = await AsyncStorage.getItem('userId');
    } catch (e) {
      console.log(e);
    }
    let res = await FETCH.logout(userId, token);
    // if (res.status === 200) {
    //   //   setIsLoading(true);
    //   signOut();
    // } else {
    //   Alert.alert('Error!', 'Error!');
    // }
    console.log({userID: userId, token: token});
  };

  return (
    <SafeAreaView style={[Styles.body, {marginBottom: 40}]}>
      <ScrollView>
        <View>
          <Image
            source={BANNER}
            style={[Styles.banner, {resizeMode: 'contain'}]}
          />
        </View>
        <View>
          <Text
            style={[
              Styles.lable,
              Styles.fontBold,
              {marginTop: 20, fontSize: 20},
            ]}>
            Pastikan Anda Mengingat Password Anda, Jika Lupa Silahkan Hubungi
            Admin Bagian Umum dan Kepegawaian
          </Text>
        </View>
        <View>
          <Text style={[Styles.lable, Styles.fontBold, {marginTop: 20}]}>
            Ganti Password
          </Text>
          <TextInput
            style={[Styles.lable, Styles.font, {marginHorizontal: 20}]}
            underlineColorAndroid={'gray'}
            placeholder="Minimum 6 Karakter"
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <View>
          <Text style={[Styles.lable, Styles.fontBold, {marginTop: 20}]}>
            Ulangi Password
          </Text>
          <TextInput
            style={[Styles.lable, Styles.font, {marginHorizontal: 20}]}
            underlineColorAndroid={'gray'}
            secureTextEntry
            onChangeText={(val) => handleRePassword(val)}
          />
          {error ? (
            <Text style={[Styles.lableRed]}>❌ Password tidak cocok!</Text>
          ) : (
            <Text></Text>
          )}
        </View>
        <View>
          <TouchableOpacity style={[Styles.btnAction]}>
            <Text style={[Styles.fontBold, {fontSize: 16, color: '#fff'}]}>
              <Icon name="ios-checkmark-done-outline" size={22} color="#fff" />{' '}
              {isLoading ? <ActivityIndicator /> : 'Simpan'}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[Styles.btnAction]}
            onPress={() => logoutHandle()}>
            <Text style={[Styles.fontBold, {fontSize: 16, color: '#fff'}]}>
              <Icon name="ios-exit-outline" size={22} color="#fff" /> Keluar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
