import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Profile() {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: {
    color: '#000000',
  },
});
