import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native';

// navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import Home from './screens/Home';
import Profile from './screens/Profile';

export type RootStackParamList = {
  Home: undefined;
  Profile: {productId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): React.JSX.Element {
  return <SafeAreaView></SafeAreaView>;
}

export default App;
