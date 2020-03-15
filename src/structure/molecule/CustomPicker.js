import React, {useEffect, useState} from 'react';
import {View, Text, Picker} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './../../structure/molecule/Loader';
import baseuri from './../../res/baseuri';
import axios from 'axios';

const CustomPicker = ({updateFromComponent, dataValue, uri, label = ''}) => {
  const [items, setItems] = useState([]); // array of school years
  const [loading, setLoading] = useState(true); //

  useEffect(() => {
    let updateState = true;

    console.log('@CustomPicker +1');

    InitialApiFetch(updateState);

    // Unmounting
    return () => {
      updateState = false;
      console.log('@CustomPicker -1');
    };
  }, []);

  const InitialApiFetch = async updateState => {
    try {
      const header = {
        headers: {
          authorization: await AsyncStorage.getItem('token'),
        },
      };

      const resultGetFromApi = await axios.get(`${baseuri}${uri}`, header);

      if (updateState) {
        setItems(resultGetFromApi.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log('FETCH API: ', err);
    }
  };

  const onValueChange = (value, index) => {
    updateFromComponent(value);
  };

  if (loading) {
    return <Loader message={'Please wait fetching data'} />;
  }

  return (
    <View style={{marginHorizontal: 16}}>
      {/* Label */}
      <Text style={{fontWeight: 'bold', alignItems: 'center', fontSize: 16}}>
        {label}:
      </Text>

      {/* Dropdown */}
      <View style={{borderColor: '#272727', borderWidth: 2, borderRadius: 10}}>
        <Picker selectedValue={dataValue} onValueChange={onValueChange}>
          {items.map((it, ix) => {
            console.log(it.name);

            return <Picker.Item key={it.id} label={it.name} value={it.id} />;
          })}
        </Picker>
      </View>
    </View>
  );
};

export default CustomPicker;
