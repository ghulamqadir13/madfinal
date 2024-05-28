import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import HomeDrawer from '../DrawerNavigation/HomeDrawer';
import AyahsScreen from '../TabNavigation/Quran/AyahsScreen';
import LanguagesScreen from '../TabNavigation/Hadith/Languages';
import SectionsScreen from '../TabNavigation/Hadith/SectionsScreen';
import HajjScreen from './Hajj';
import UmrahScreen from './Umra';
import PrayersScreen from '../TabNavigation/IbadatFolder/Prayers';
import FastingScreen from '../TabNavigation/IbadatFolder/Fasting';
import HajjDuaScreen from '../TabNavigation/IbadatFolder/HajjDua';
import NamazJanazaDuaScreen from '../TabNavigation/IbadatFolder/NamazaJanaza';
import UmrahDuaScreen from '../TabNavigation/IbadatFolder/UmrahDuas';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeDrawer} />
      <Stack.Screen name="AyahsScreen" component={AyahsScreen} />
      <Stack.Screen name="LanguagesScreen" component={LanguagesScreen} />
      <Stack.Screen name="SectionsScreen" component={SectionsScreen} />
      <Stack.Screen name="HajjScreen" component={HajjScreen} />
      <Stack.Screen name="UmrahScreen" component={UmrahScreen} />
      <Stack.Screen name="PrayersScreen" component={PrayersScreen} />
      <Stack.Screen name="FastingScreen" component={FastingScreen} />
      <Stack.Screen name="HajjDuaScreen" component={HajjDuaScreen} />
      <Stack.Screen name="NamazJanazaDuaScreen" component={NamazJanazaDuaScreen} />
      <Stack.Screen name="UmrahDuaScreen" component={UmrahDuaScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
