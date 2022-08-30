import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/Login/LoginScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import ListDetailsScreen from './src/screens/ListDetails/ListDetailsScreen';
import FavouritesContextProvider from './src/store/context/favouritesContext';
import FavouritesScreen from './src/screens/Favourites/FavouritesScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <FavouritesContextProvider>
    <NavigationContainer>
      
      <Stack.Navigator 
      screenOptions={{
        headerShown:false
        }}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='ListDetails' component={ListDetailsScreen} />
        <Stack.Screen name='Favourites' component={FavouritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </FavouritesContextProvider>
  );
}

const styles = StyleSheet.create({
  
});
