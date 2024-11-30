/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getTokens} from './src/utils/tokenStorage';
import HomeScreen from './src/HomeScreen';
import DiseaseScreen from './src/DiseaseScreen';
import DoubtScreen from './src/DoubtScreen';
// import ProfileScreen from './src/ProfileScreen';
import PinLogInScreen from './src/PinLogInScreen';
import SignUpScreen from './src/SignUpScreen';
import PasswordLogInScreen from './src/PasswordLogInScreen';
import CommunityScreen from './src/CommunityScreen';
import FertilizerScreen from './src/FertilizerScreen';
import Config from 'react-native-config';
import FieldDetailsScreen from './src/FieldDetailsScreen';
import ProfileScreen from './src/ProfileScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();



// Authentication Context
export const AuthContext = createContext();

// Authentication Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPinLogin, setIsPinLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateTokens = async () => {
      const { pinToken, passwordToken } = await getTokens();

      if (passwordToken) {
        try {
          const response = await axios.post(`${Config.BASE_URL}/user/validate-token/password`, { token: passwordToken });
          if (response.status === 200) {
            setIsPinLogin(true);
            setIsLoading(false);
            return;
          }
        } catch {
          console.log('Password token invalid.');
        }
      }
      if (pinToken && isPinLogin) {
        try {
          const response = await axios.post(`${Config.BASE_URL}/user/validate-token/pin`, { token: pinToken });
          if (response.status === 200) {
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          }
        } catch {
          console.log('PIN token invalid.');
        }
      }

      setIsLoading(false);
    };

    validateTokens();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isPinLogin, setIsPinLogin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};



function AuthNavigator() {
  return (
    <AuthStack.Navigator  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={PasswordLogInScreen} />
      <Stack.Screen name="Register" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Disease') iconName = 'eco';
            else if (route.name === 'Community') iconName = 'group';
            else if (route.name === 'Fertilizer') iconName = 'grain';
            else if (route.name === 'Doubt') iconName = 'help-outline';
            // else if (route.name === 'Profile') iconName = 'person';

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ff6600', // Color of active icon
          tabBarInactiveTintColor: 'gray', // Color of inactive icons
          tabBarStyle: { backgroundColor: '#fff', bottom: 0, height: 60 },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Disease" component={DiseaseScreen} />
        <Tab.Screen name="Fertilizer" component={FertilizerScreen} />
        <Tab.Screen name="Doubt" component={DoubtScreen} />
      </Tab.Navigator>
  );
}

function RootNavigator() {
  const { isAuthenticated, isPinLogin, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="FieldDetails" component={FieldDetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : isPinLogin ? (
        <Stack.Screen name="PinLogIn" component={PinLogInScreen} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}


export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>

    );
  }
