import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const Loading = ({message}) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: '#363636',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Loading;
