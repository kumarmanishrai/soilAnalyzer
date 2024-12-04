/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-alert */

import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
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
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Upper Green Circle Design */}
      <View style={styles.upperCircle1} />
      <View style={styles.upperCircle2} />

      {/* New Welcome Container */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Your Soil Analyzer</Text>
        <Text style={styles.subWelcomeText}>
          Analyze your soil and unlock its secrets for better growth.
        </Text>
      </View>

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
        <TouchableOpacity 
          style={styles.button2} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText2}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lower Green Circle Design */}
      <View style={styles.lowerCircle1} />
      <View style={styles.lowerCircle2} />
      {/* Quote Section */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>
          "Unlock the secrets of your soil—empower your growth with precision and insight."
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    backgroundColor: '#f0f4f0',
  },
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
  
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  subWelcomeText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
    marginHorizontal: 20,
  },
  
  quoteContainer: {
    backgroundColor: 'rgba(87, 204, 114, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'black',
    textAlign: 'center',
  },
  
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#ff6600',
  },
  
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#a1e89c',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    color: '#000000',
  },
  
  button1: {
    backgroundColor: 'rgba(255, 102, 0, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 16,
    width: '100%',
  },
  
  button2: {
    backgroundColor: '#57cc72',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    width: '100%',
  },
  
  buttonText1: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  buttonText2: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'medium',
    textAlign: 'center',
  },
});

export default SignUpScreen;