/* eslint-disable prettier/prettier */
// In App.js in a new project
import React,{useEffect, useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

import axios from 'axios';
import baseuri from './../../res/baseuri';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);

    useEffect(() => {
        console.log('@login page MOUNT');
        return (
            () => {
                console.log('@login page UNMOUNTING');
            }
        );

    },[]);

    const LoginForm = () => {

      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      const onLoginButtonClicked = async() => {

        if (username === '' || password === ''){

          Alert.alert('Username/Password field required');

          return;
        }

        try {

            setLoad(true);

            const body = {
                username,
                password,
            };

            const responseLoginApi = await axios.post(`${baseuri}/api/mobile/student/login`, body,{});

            const token = responseLoginApi.data.data.token;
            const userDetails = delete responseLoginApi.data.data;

            // storeToken
            try {
                await AsyncStorage.setItem('token', `Bearer ${token}`);
            } catch (error) {
                console.log('Error in storing data: ', error);
            }

            let value = null;

            // get Token
            try {
                value = await AsyncStorage.getItem('token');
                setLoad(false);
                if (value !== null) {
                   console.log('Move to mainmenu')
                   navigation.navigate('MainMenu',{userDetails});
                }
            } catch (error) {
              setLoad(false);
                console.log('getToken: ', error);
            }

        } catch (err){
            setLoad(false);
            console.log('Login.js: ', err);
            Alert.alert('Incorrect Username/Password');
        }

    };

      return (
        <View style={{ justifyContent:'center',backgroundColor:"#E4e4e4", margin:30, borderRadius:10, padding: 20}}>

            {/* Title */}
            <Text style={{fontWeight:'bold',fontSize:30,alignSelf:'center'}}>
              IClear SVMS
            </Text>

            {/* input username */}
            <TextInput style={{fontSize:15, borderColor:'gray',borderWidth:1,borderRadius:5,padding:10, margin:10, backgroundColor:'#f8f8f8'}}
              placeholder="Username"
              onChangeText={text => {setUsername(text)}}
              value={username}
            />

            {/* input passowrd */}
            <TextInput  style={{fontSize:15, borderColor:'gray',borderWidth:1,borderRadius:5,padding:10, margin:10, backgroundColor:'#f8f8f8'}}
              placeholder="Password"
              value={password}
              onChangeText={text => {setPassword(text)}}
              secureTextEntry={true}
            />

            {/* login button */}
            <TouchableOpacity
                  style={styles.button}
                  onPress={() => {onLoginButtonClicked()}}
              >
                  <Text style={{fontSize:20, fontWeight:'bold',color:'#f8f8f8'}}>
                      Login
                  </Text>
              </TouchableOpacity>
          </View>
      );
    };

    return (
      <SafeAreaView style={{ flex: 1, justifyContent:'center',alignItems:'stretch' }}>

        { !load &&  <LoginForm/>}

        { load &&  <Loading message={`Logging In, please wait...`}/>}

      </SafeAreaView>
    );
};

const Loading = ({message}) => (
  <View style={{flexDirection:'column', alignItems:'center'}}>

    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={{color:'#363636', fontWeight:'bold', fontSize:18}}>
        {message}
    </Text>

  </View>
);

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      padding: 10,
      margin: 10,
      borderRadius: 5,
      borderColor: 'gray',
      borderWidth: 1,
      backgroundColor: "#4caf50",
    },
});

export default LoginScreen;
