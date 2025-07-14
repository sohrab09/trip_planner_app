import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import TripsScreen from '../screens/TripsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Image
    source={require('../assets/home.png')}
    style={{ width: size, height: size, tintColor: color }}
  />
);

const TripsIcon = ({ color, size }: { color: string; size: number }) => (
  <Image
    source={require('../assets/trip.png')}
    style={{ width: size, height: size, tintColor: color }}
  />
);

const SettingsIcon = ({ color, size }: { color: string; size: number }) => (
  <Image
    source={require('../assets/settings.png')}
    style={{ width: size, height: size, tintColor: color }}
  />
);

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
          tabBarActiveTintColor: '#876363',
        }}
      />
      <Tab.Screen
        name="Trips"
        component={TripsScreen}
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: TripsIcon,
          tabBarActiveTintColor: '#876363',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: SettingsIcon,
          tabBarActiveTintColor: '#876363',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
