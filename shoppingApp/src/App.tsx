import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// navigation 
import{NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

// screens
import Home from './screens/Home'
import Details from './screens/Details'

export type RootStackParamList = {
  Home: undefined,
  Details: {
    product: Product
  }
}

export default function App() {
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
