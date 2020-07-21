import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

import Styles from '../Styles';

const lainnya = () => {
  const [selectedValue, setSelectedValue] = useState('izin');
  const [imageSource, setImageSource] = useState(null);

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
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log(source.uri);
        setImageSource(source.uri);
      }
    });
  };

  return (
    <View style={[Styles.body]}>
      <View>
        <Text style={[Styles.fontBold, Styles.lable, {marginTop: 20}]}>
          Jenis Izin
        </Text>
        <Picker
          selectedValue={selectedValue}
          style={[Styles.lable, {width: 200, left: 10}]}
          mode="dropdown"
          itemStyle={{left: 40}}
          itemTextStyle={Styles.font}
          onValueChange={(val, index) => setSelectedValue(val)}>
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
          underlineColorAndroid="#D3D3D3"
          style={[Styles.formInput, {left: 10}]}
        />
      </View>
      <View>
        <Text style={[Styles.fontBold, Styles.lable, {marginTop: 20}]}>
          Upload Bukti
        </Text>
        <TouchableOpacity onPress={takePicture} style={{left: 20}}>
          {imageSource === null ? (
            <Icon name="ios-add-circle-outline" size={72} color="#3867d6" />
          ) : (
            <Image
              source={{uri: imageSource}}
              resizeMode={'cover'}
              style={{width: 86, height: 86}}
            />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={[Styles.btnAction]}>
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
    </View>
  );
};

export default lainnya;
