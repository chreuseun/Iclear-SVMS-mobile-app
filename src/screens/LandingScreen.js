/* eslint-disable prettier/prettier */
// In App.js in a new project
import React,{useEffect, useState} from 'react';
import { Text, SafeAreaView, } from 'react-native';

import Login from './login/Login';

const  LandingScreen = () => {

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        console.log('@landing page Mount');

        setTimeout( () => {
            // props.navigation.navigate('Login');

            setShowForm(true);
        }, 3000); // navigation.navigate to Login page

        //unmount
        return (
            ()=>{
                console.log('@landing page Unmounting');
            }
        );
      },[]);

  return (

    <SafeAreaView style={{flex:1}}>

        {/* // start up titile */}
        { !showForm &&  <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontSize:25, fontWeight:'bold'}} >
                ICLEAR SVMS
            </Text>
        </SafeAreaView>}

        {/* login form */}
        { showForm && <Login />}
    </SafeAreaView>

  );
};

export default LandingScreen;
