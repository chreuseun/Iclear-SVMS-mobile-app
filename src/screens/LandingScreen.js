// In App.js in a new project
import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView} from 'react-native';

import Login from './login/Login';

const LandingScreen = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowForm(true);
    }, 300);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {!showForm && (
        <SafeAreaView
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>ICLEAR SVMS</Text>
        </SafeAreaView>
      )}
      {showForm && <Login />}
    </SafeAreaView>
  );
};

export default LandingScreen;
