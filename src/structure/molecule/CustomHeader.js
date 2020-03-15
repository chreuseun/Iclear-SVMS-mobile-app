import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const DrawerMenuButton = () => {
  const navigation = useNavigation();
  return (
    <View style={{marginLeft:8}}>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <Icon name="bars" size={40} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

// Header for Screen
const Header = ({title}) => {
  return (
    <View style={style.header}>
      <DrawerMenuButton />

      <Text style={style.headerText}>{title || ''}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#303F9F',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#f8f8f8',
  },
});

export default Header;
