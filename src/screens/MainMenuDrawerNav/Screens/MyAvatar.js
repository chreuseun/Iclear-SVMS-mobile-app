import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import CustomHeader from './../../../structure/molecule/CustomHeader';

const MyAvatar = () => {
  return (
    <SafeAreaView style={style.container}>
      <CustomHeader title={'My Avatar'}/>


      <Text>My Avatar Screen</Text>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#303F9F',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 50,
    color: '#f8f8f8',
  },
});

export default MyAvatar;
