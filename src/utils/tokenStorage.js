/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Save tokens
export const saveTokens = async (pinToken, passwordToken) => {
  try {
    if (pinToken){ 
        await AsyncStorage.setItem('pinToken', pinToken);
    }
    if (passwordToken){ 
        await AsyncStorage.setItem('passwordToken', passwordToken);
    }
  } catch (error) {
    console.error('Error saving tokens:', error);
  }
};

// Retrieve tokens
export const getTokens = async () => {
  try {
    const pinToken = await AsyncStorage.getItem('pinToken');
    const passwordToken = await AsyncStorage.getItem('passwordToken');
    return { pinToken, passwordToken };
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    return { pinToken: null, passwordToken: null };
  }
};

// Clear tokens
export const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem('pinToken');
    await AsyncStorage.removeItem('passwordToken');
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
};
