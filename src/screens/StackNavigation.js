/* eslint-disable prettier/prettier */
// In App.js in a new project
import React,{useEffect} from 'react';
import { View, Text, SafeAreaView, Button, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './LandingScreen'; // lading & login form
import DrawerNav from './MainMenuDrawerNav/DrawerNav'; // main menu nav


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Home" // requires restart for in order to refrecht changes
      >

        {/* LandingScreen */}
        <Stack.Screen
            name="Home"
            component={ LandingScreen }
            options={{title : 'Landing screen', headerShown:false}}
        />

        {/* Mainmenu drawer navigator */}
        <Stack.Screen
            name="MainMenu"
            component={ DrawerNav }
            options={{title : 'MainMenu screen', headerShown:false}}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;
