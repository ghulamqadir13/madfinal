import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WelcomeScreen from './Screens/WelcomeScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import HomeScreen from './Screens/HomeScreen';
import ContactScreen from './Screens/ContactScreen';
import AboutScreen from './Screens/AboutScreen';
import IbadatScreen from './Screens/Ibadat';
import HadithScreen from './Screens/Hadith';
import QuranScreen from './Screens/Quran';
import PrayerTimingsScreen from './Screens/PrayerTiming';
import AyahsScreen from './Screens/AyahsScreen';
import LanguagesScreen from './Screens/Languages';
//import HadithDataScreen from './Screens/HadithData';
//import NextScreen from './Screens/SectionsScreen';
import SectionsScreen from './Screens/SectionsScreen';
import HajjScreen from './Screens/Hajj';
import UmrahScreen from './Screens/Umra';
import PrayersScreen from './Screens/Prayers';
import FastingScreen from './Screens/Fasting';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeDrawer} />
        <Stack.Screen name="PrayersTiming" component={PrayerTimingsScreen} />
        <Stack.Screen name="AyahsScreen" component={AyahsScreen} />
        <Stack.Screen name="LanguagesScreen" component={LanguagesScreen} />
        <Stack.Screen name="SectionsScreen" component={SectionsScreen} />
        <Stack.Screen name="HajjScreen" component={HajjScreen} />
        <Stack.Screen name="UmrahScreen" component={UmrahScreen} />
        <Stack.Screen name="PrayersScreen" component={PrayersScreen} />
        <Stack.Screen name="FastingScreen" component={FastingScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeDrawer({ navigation }) {
  const logout = () => {
    navigation.navigate('Login');
  }

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props} style={{ backgroundColor: '#B0B0B0' }} contentContainerStyle={{ backgroundColor: '#DDDDDD' }}>
        <DrawerItemList {...props} />
        {/* Custom drawer items */}
        <DrawerItem
          label="Logout"
          onPress={logout}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent  {...props} /> }>
      <Drawer.Screen name="Home" component={HomeContent} options={{ headerShown: false }}/>
      <Drawer.Screen name="Contact" component={ContactScreen} options={{ headerShown: false }}/>
      <Drawer.Screen name="About" component={AboutScreen} options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
}

function HomeContent() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: 'pink' },
        tabBarLabelStyle: { fontWeight: 'bold',fontSize: 16 },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Quran"
        component={QuranScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Hadith"
        component={HadithScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Ibadat"
        component={IbadatScreen}
        options={{
    tabBarLabel: 'Ibadat',
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="mosque" color={color} size={size} />
    ),
  }}
      />
    </Tab.Navigator>
  );
}

export default App;