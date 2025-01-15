import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import type {PropsWithChildren} from 'react';

type CurrencyButtonProps = PropsWithChildren<{name: string; flag: string}>;

export default function CurrencyButton(
  props: CurrencyButtonProps,
): React.JSX.Element {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.flag}>{props.flag}</Text>
      <Text style={styles.country}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  flag: {fontSize: 28, color: '#ffffff', marginBottom: 4},
  country: {
    fontSize: 28,
    color: '#2d3436',
  },
});
