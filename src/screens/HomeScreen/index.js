import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Styles from '../Styles';
import BANNER from '../../assets/images/banner.png';
import MALE from '../../assets/images/male.png';
import FEMALE from '../../assets/images/female.png';
import Icon from 'react-native-vector-icons/Ionicons';

/* Fetch API */
import FETCH from '../../functionHelper/APILists';

const index = ({navigation}) => {
  const [location, setLocation] = useState(false);
  const [nama, setNama] = useState(null);
  const [nip, setNip] = useState(null);
  const [foto, setFoto] = useState('');
  const [gender, setGender] = useState('L');

  const getData = async () => {
    let token = null;
    let userId = null;
    try {
      token = await AsyncStorage.getItem('userToken');
      userId = await AsyncStorage.getItem('userId');
    } catch (e) {
      console.log(e);
    }
    let res = await FETCH.getHome(userId, token);
    await setNama(res.nama);
    await setNip(res.nip);
    await setFoto(res.foto_profil);
  };

  const cekInHandle = async () => {
    let token = null;
    let userId = null;
    try {
      token = await AsyncStorage.getItem('userToken');
      userId = await AsyncStorage.getItem('userId');
    } catch (e) {
      console.log(e);
    }

    let res = await FETCH.cekIn(userId, token);
    if (res.status === 200) {
      console.log(res);
      Alert.alert('Berhasil!', res.result);
    } else {
      console.log(res);
      Alert.alert('Gagal!', res.result);
    }
  };

  const cekOutHandle = async () => {
    let token = null;
    let userId = null;
    try {
      token = await AsyncStorage.getItem('userToken');
      userId = await AsyncStorage.getItem('userId');
    } catch (e) {
      console.log(e);
    }

    let res = await FETCH.cekOut(userId, token);
    if (res.status === 200) {
      console.log(res);
      Alert.alert('Berhasil!', res.result);
    } else {
      console.log(res);
      Alert.alert('Gagal!', res.result);
    }
  };

  const absenDatang = (navigation) => {
    return Alert.alert(
      'Absen Datang',
      'Anda Akan Melakukan Absensi Datang',
      [
        {
          text: 'Lainnya',
          onPress: () => {
            navigation.navigate('Lainnya');
          },
        },
        {
          text: 'Batal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Hadir',
          onPress: () =>
            location
              ? cekInHandle()
              : Alert.alert('Gagal!', 'Anda di luar jangkauan Absen!'),
        },
      ],
      {cancelable: false},
    );
  };

  const absenPulang = (navigation) => {
    return Alert.alert(
      'Absen Pulang',
      'Anda Akan Melakukan Absensi Pulang',
      [
        {
          text: 'Lainnya',
          onPress: () => navigation.navigate('Lainnya'),
        },
        {
          text: 'Batal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Hadir',
          onPress: () =>
            location
              ? cekOutHandle()
              : Alert.alert('Gagal!', 'Anda di luar jangkauan Absen!'),
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        getData();
      }, 1000);
    }
    return () => (mounted = false);
  }, []);

  return (
    <SafeAreaView style={Styles.body}>
      <View>
        <Image source={BANNER} style={Styles.banner} />
        {foto === '' ? (
          gender == 'L' ? (
            <Image source={MALE} style={Styles.avatar} />
          ) : (
            <Image source={FEMALE} style={Styles.avatar} />
          )
        ) : (
          <Image source={{uri: foto}} style={Styles.avatar} />
        )}
      </View>
      <View>
        <Text style={[Styles.fontBold, Styles.name, {fontSize: 18}]}>
          {nama}
        </Text>
        <Text style={[Styles.font, Styles.name, {fontSize: 12}]}>
          NIP. {nip}
        </Text>
      </View>
      <View style={{alignContent: 'flex-start'}}>
        <Text
          style={[
            Styles.fontBold,
            Styles.lable,
            {fontSize: 16, marginTop: 20},
          ]}>
          Sudahkah Anda Absen Hari Ini?
        </Text>
        <Text style={[Styles.font, Styles.lable]}>Jumat, 31 July 2020</Text>
        {location ? (
          <Text style={[Styles.font, Styles.lableGreen]}>
            ✅ Anda dalam jangkauan Lokasi Kantor!
          </Text>
        ) : (
          <Text style={[Styles.font, Styles.lableRed]}>
            ⛔ Anda diluar jangkauan Lokasi Kantor!!!
          </Text>
        )}
      </View>
      <View>
        <TouchableOpacity
          style={[Styles.lable, {marginBottom: 30}]}
          onPress={() => setLocation(!location)}>
          <Text style={[Styles.font, {color: '#0984e3'}]}>
            <Icon name="ios-refresh" color="#0984e3" size={16} /> Refresh Lokasi
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[Styles.btnAction]}
          onPress={() => absenDatang(navigation)}>
          <Text style={[Styles.fontBold, {fontSize: 16, color: '#fff'}]}>
            <Icon name="ios-log-in" size={22} color="#fff" /> Absen Datang
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.btnAction]}
          onPress={() => absenPulang(navigation)}>
          <Text style={[Styles.fontBold, {fontSize: 16, color: '#fff'}]}>
            <Icon name="ios-log-out" size={22} color="#fff" /> Absen Pulang
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default index;
