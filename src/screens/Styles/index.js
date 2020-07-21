import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imgLogin: {
    height: 200,
    width: 200,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  font: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000000',
  },
  fontBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#000000',
  },
  formInput: {
    width: width * 0.8,
    height: 40,
    marginBottom: 5,
  },
  button: {
    width: width * 0.8,
    height: 40,
    backgroundColor: '#3867d6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  copyright: {
    marginTop: 20,
  },
  banner: {
    width: width,
    height: height / 4,
    resizeMode: 'cover',
  },
  avatar: {
    height: 100,
    width: 100,
    position: 'absolute',
    left: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    resizeMode: 'cover',
    marginTop: height / 4 - 50,
  },
  name: {
    left: 120,
  },
  lable: {
    paddingHorizontal: 20,
  },
  lableRed: {
    paddingHorizontal: 20,
    color: '#d63031',
  },
  lableGreen: {
    paddingHorizontal: 20,
    color: '#16a085',
  },
  btnAction: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3867d6',
    marginVertical: 10,
    marginHorizontal: 10,
    height: 50,
    borderRadius: 5,
  },
});
export default styles;
