import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

import FETCH from '../../functionHelper/APILists';

import Styles from '../Styles';

const lainnya = () => {
  const [jenisIzin, setJenisIzin] = useState('izin');
  const [imageSource, setImageSource] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [keterangan, setKeterangan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const takePicture = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        setImageSource(source.uri);
        setImageFile(response);
      }
    });
  };

  const submitHandler = async () => {
    let token = null;
    let userId = null;
    try {
      token = await AsyncStorage.getItem('userToken');
      userId = await AsyncStorage.getItem('userId');
    } catch (e) {
      console.log(e);
    }

    let body = {
      others: jenisIzin,
      lampiran: {
        uri: imageFile.uri,
        type: imageFile.type,
        name: imageFile.fileName,
      },
      keterangan: keterangan,
    };

    let res = await FETCH.others(userId, token, body);
    // await setIsLoading(true);
    // res.status === 200 ? setIsLoading(false) : Alert.alert('Error', 'Error');
    console.log(res);
  };

  return (
    <ScrollView style={[Styles.body]}>
      <View>
        <Text style={[Styles.fontBold, Styles.lable, {marginTop: 20}]}>
          Jenis Izin
        </Text>
        <Picker
          selectedValue={jenisIzin}
          style={[Styles.lable, {width: 200, left: 10}]}
          mode="dropdown"
          itemStyle={{left: 40}}
          itemTextStyle={Styles.font}
          onValueChange={(val, index) => setJenisIzin(val)}>
          <Picker.Item label="Izin" value="izin" />
          <Picker.Item label="Sakit" value="sakit" />
          <Picker.Item label="Lainnya" value="lainnya" />
        </Picker>
      </View>
      <View>
        <Text style={[Styles.fontBold, Styles.lable, {marginTop: 20}]}>
          Keterangan
        </Text>
        <TextInput
          onChangeText={setKeterangan}
          underlineColorAndroid="#D3D3D3"
          style={[Styles.font, Styles.formInput, {left: 10}]}
        />
      </View>
      <View>
        <Text style={[Styles.fontBold, Styles.lable, {marginTop: 20}]}>
          Upload Bukti
        </Text>
        <TouchableOpacity onPress={takePicture}>
          {imageSource === null ? (
            // <Icon name="ios-add-circle-outline" size={72} color="#3867d6" />
            <View style={[Styles.btnAction]}>
              <Text style={[Styles.fontBold, {fontSize: 16, color: '#fff'}]}>
                <Icon name="ios-cloud-upload-outline" size={22} color="#fff" />{' '}
                Upload Photo
              </Text>
            </View>
          ) : (
            <Image
              source={{uri: imageSource}}
              resizeMode={'cover'}
              style={{width: 120, height: 120, left: 10}}
            />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[Styles.btnAction]}
          onPress={() => submitHandler()}>
          <Text style={[Styles.fontBold, {fontSize: 16, color: '#fff'}]}>
            <Icon
              name="ios-chevron-forward-circle-outline"
              size={22}
              color="#fff"
            />{' '}
            Kirim
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default lainnya;
