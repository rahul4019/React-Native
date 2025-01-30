import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Separator() {
  return <View style={styles.separtor} />;
}

const styles = StyleSheet.create({
  separtor: {height: 0.8, backgroundColor: '#cad5e2'},
});
