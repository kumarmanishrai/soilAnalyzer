/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-alert */

import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import Config from 'react-native-config';
import { Avatar } from 'react-native-paper';
import { Alert } from 'react-native';



const SignUpScreen = () => {

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [profileImage, setProfileImage] = useState(null);

    const selectPhoto = () => {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        includeBase64: true,
        cropperCircleOverlay: true,
        avoidEmptySpaceAroundImage: true,
        freeStyleCropEnabled: true,
      }).then(image => {
        console.log(image);
        const data = `data:${image.mime};base64,${image.data}`;
        setProfileImage(data);
      });
    };

  const handleRegister = async () => {
    if(!name || !profileImage || !email || !password || !pin){
      Alert.alert('Please enter all required information');
      return;
    }
    if (pin.length !== 4) {
      Alert.alert('PIN must be a 4-digit number.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Password minimum length must be 8 characters.');
      return;
    }

    try {
      // Send registration data to the server
      console.log('trying register');
      console.log(email, password, pin);

      const response = await axios.post(`${Config.BASE_URL}/user/create`, {
        name,
        email,
        password,
        pin,
        image: profileImage,
      });

      if (response.status === 201) {
        Alert.alert('Registration successful! Please log in.');

        navigation.navigate('Login');
      }
    } catch (error) {
      console.error(
        'Registration failed:',
        error.response?.data || error.message,
      );
      Alert.alert('Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Upper Green Circle Design */}
      <View style={styles.upperCircle1} />
      <View style={styles.upperCircle2} />

      <View style={styles.innerContainer}>
        <Text style={styles.title}>Register</Text>
        <TouchableOpacity onPress={()=>selectPhoto()}>
          <Avatar.Image
          size={140}
          style={styles.avatar}
          source={{
            uri: profileImage === null ?
            'https://thumbs.dreamstime.com/b/profile-icon-add-sign-profile-icon-new-plus-positive-symbol-profile-icon-add-sign-profile-icon-new-plus-positive-111945352.jpg' 
            :
             profileImage,
          }}
        />
      </TouchableOpacity>
      <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#999"
          keyboardType="name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="4-digit PIN"
          placeholderTextColor="#999"
          keyboardType="numeric"
          maxLength={4}
          value={pin}
          onChangeText={setPin}
        />
        <TouchableOpacity style={styles.button1} onPress={handleRegister}>
        <Text style={styles.buttonText1}>Register</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText2}>Already have an account? Log in</Text>
      </TouchableOpacity>
        
      </View>
      {/* Lower Green Circle Design */}
      <View style={styles.lowerCircle1} />
      <View style={styles.lowerCircle2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#e0e0e0'},
  upperCircle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    backgroundColor: '#57cc72',
    borderRadius: 200,
    top: -180,
    right: -80,
    zIndex: -2,
  },
  upperCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: '#a1e89c',
    borderRadius: 150,
    top: -100,
    right: 155,
    zIndex: -1,
  },
  lowerCircle1: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#57cc72',
    borderRadius: 75,
    bottom: 90,
    left: 70,
    zIndex: -1,
  },
  lowerCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: '#57cc72',
    borderRadius: 75,
    bottom: -50,
    left: -50,
    zIndex: -1,
  },
  
  avatar: {
    borderRadius: 80,
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: 'white',
    height: 100,
    width: 100,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // profileImage: {
  //   width: '100%',
  //   height: '100%',
  //   borderRadius: 60,
  // },
  imagePlaceholder: {
    color: '#888',
    fontSize: 14,
  },
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 16,
  //   backgroundColor: '#a1e89c',
  //   borderBottomLeftRadius: 80,
  //   borderBottomRightRadius: 80,
  //   marginTop: 100,
  // },
  innerContainer: {
    // flex: 1,
    justifyContent: 'center',
    borderRadius: 12,
    top: 50,
    height: '90%',
    // opacity: 0.78,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 0, 0.3)',
    zIndex: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ff6600',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    color: '#000000',
  },
  button1: {
    backgroundColor: 'rgba(255, 102, 0, 1)'    , // Orange color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    elevation: 3,
    marginBottom: 16, // For shadow on Android
  },
  button2: {
    backgroundColor: '#ffa472'    , // Orange color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    elevation: 3, // For shadow on Android
  },
  buttonText1: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: 'boold',
    textAlign: 'center',
  },
  buttonText2: {
    color: '#000', // White text
    fontSize: 16,
    fontWeight: 'medium',
    textAlign: 'center',
  },
});

export default SignUpScreen;
