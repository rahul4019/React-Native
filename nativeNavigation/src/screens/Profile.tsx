import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../App'; // Make sure the path is correct
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function Profile({route}: ProfileProps) {
  const {productId} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.smallText}>Product Id: {productId}</Text>
      <Button
        title="Go to Home"
        // onPress={() => navigation.navigate('Home')}
        onPress={() => navigation.goBack()}
      />
      <Button
        title="Go back to previous screen"
        // onPress={() => navigation.pop(2)}
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  smallText: {
    color: '#000000',
  },
});
