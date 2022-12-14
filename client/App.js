import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';

import { store } from './app/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}