import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddChatScreen from './src/screens/AddChatScreen';
import ChatScreen from './src/screens/ChatScreen';

export default function App() {
  const Stack = createStackNavigator();

  const GlobalScreenOptions = {
    headerStyle: { backgroundColor: '#2c6bed' },
    headerTitleStyle: { color: '#fff' },
    headerTintColor: '#fff'
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={GlobalScreenOptions}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='AddChat' component={AddChatScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}