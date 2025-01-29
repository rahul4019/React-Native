import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App'; // Make sure the path is correct

// No need for NativeStackScreenProps or HomeProps type anymore

export default function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  // Example of how to navigate (if you want to add a button or something):
  const goToDetails = () => {
    navigation.navigate('Profile', {productId: '123'}); // Example parameters
  };

  return (
    <View style={styles.container}>
      <Text style={styles.smallText}>Home Screen</Text>
      <Button
        title="Go to Profiles"
        // onPress={goToDetails}
        onPress={() =>
          navigation.push('Profile', {
            productId: '123',
          })
        }
      />
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
