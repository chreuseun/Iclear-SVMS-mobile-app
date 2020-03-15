import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const CustomButtton = ({text, onPress, buttonValue}) => {
  return (
    <View style={{marginHorizontal: 16,flexWrap:'wrap',marginTop:8}}>
      <TouchableOpacity
        onPress={() => {
          onPress(buttonValue);
        }}>
        <View
          style={{backgroundColor: '#4DABF7', padding: 15, borderRadius: 10}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#ffffff'}}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButtton;
