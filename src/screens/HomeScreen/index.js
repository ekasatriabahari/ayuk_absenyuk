import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Styles from '../Styles';
import BANNER from '../../assets/images/banner.png';
import MALE from '../../assets/images/male.png';
import FEMALE from '../../assets/images/female.png';
import Icon from 'react-native-vector-icons/Ionicons';

const index = ({navigation}) => {
  const [location, setLocation] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={Styles.body}>
      <View>
        <Image source={BANNER} style={Styles.banner} />
        <Image source={MALE} style={Styles.avatar} />
      </View>
      <View>
        <Text style={[Styles.fontBold, Styles.name, {fontSize: 20}]}>
          Eka Satria Bahari
        </Text>
        <Text style={[Styles.font, Styles.name, {fontSize: 12}]}>
          NIP. 199306062019031001
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
            ✅ Anda dalam jangkauan Absen Online!
          </Text>
        ) : (
          <Text style={[Styles.font, Styles.lableRed]}>
            ⛔ Anda diluar jangkauan Absen Online!!!
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
            <Icon name="ios-log-in" size={20} color="#fff" /> Absen Datang
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.btnAction]}
          onPress={() => absenPulang(navigation)}>
          <Text style={[Styles.fontBold, {fontSize: 16, color: '#fff'}]}>
            <Icon name="ios-log-out" size={20} color="#fff" /> Absen Pulang
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
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
      {text: 'Hadir', onPress: () => console.log('OK Pressed')},
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
      {text: 'Hadir', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
};

export default index;
