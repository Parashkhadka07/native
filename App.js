import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './screens/HomeScreen';
import OffersScreen from './screens/OffersScreen';
import ActivityScreen from './screens/ActivityScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tabs component
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          let icon;

          if (route.name === 'Home') icon = require('./assets/home.png');
          else if (route.name === 'Offers') icon = require('./assets/discount.png');
          else if (route.name === 'Activity') icon = require('./assets/activity.png');
          else if (route.name === 'Notifications') icon = require('./assets/notification.png');

          return (
            <Image
              source={icon}
              style={{ width: 24, height: 24, tintColor: color }}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: '#ff0033',
        tabBarInactiveTintColor: '#555',
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold', marginBottom: 4 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Offers" component={OffersScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}

// Root App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Authentication screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        {/* Main bottom tabs */}
        <Stack.Screen name="MainTabs" component={BottomTabs} />

        {/* Screens accessible from anywhere */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Offers" component={OffersScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
