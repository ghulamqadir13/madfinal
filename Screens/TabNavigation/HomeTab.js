import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../HomeScreen';
import QuranScreen from './Quran/Quran';
import HadithScreen from './Hadith/Hadith';
import IbadatScreen from './IbadatFolder/Ibadat';

const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: 'purple' },
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 16 },
        tabBarActiveTintColor: 'gray',
        tabBarInactiveTintColor: '#fff',
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

export default HomeTabNavigator;
