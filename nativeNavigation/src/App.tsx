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

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Trending Products'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Product Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
