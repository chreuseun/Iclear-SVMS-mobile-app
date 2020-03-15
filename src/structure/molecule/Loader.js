/* eslint-disable prettier/prettier */
// In App.js in a new project
import React from 'react';
import { View, Text, ActivityIndicator} from 'react-native';



const Loading = ({message}) => (
  <View style={{flexDirection:'column', alignItems:'center'}}>

    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={{color:'#363636', fontWeight:'bold', fontSize:18}}>
        {message}
    </Text>

  </View>
);

export default Loading;
