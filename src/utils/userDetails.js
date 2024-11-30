/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveUserDetails = async (userDetails) => {
  try {
    const image = userDetails.image;
    const name = userDetails.name;
    const email = userDetails.email;
    if (image){ 
        await AsyncStorage.setItem('image', image);
    }
    if (name){ 
        await AsyncStorage.setItem('name', name);
    }
    if (email){ 
        await AsyncStorage.setItem('email', email);
    }

  } catch (error) {
    console.error('Error saving tokens:', error);
  }
};

// Retrieve tokens
export const getUserDetails = async () => {
  try {
    const image = await AsyncStorage.getItem('image');
    const name = await AsyncStorage.getItem('name');
    const email = await AsyncStorage.getItem('email');
    return { image, name, email };
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    return { image: null, name: null, email: null };
  }
};

// Clear tokens
export const clearUserDetails = async () => {
  try {
    await AsyncStorage.removeItem('image');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('email');
    // await AsyncStorage.removeItem('passwordToken');
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
};
