/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-alert */

import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'https://soilanalyzerserver.onrender.com';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');

  const handleRegister = async () => {
    if (pin.length !== 4) {
      alert('PIN must be a 4-digit number.');
      return;
    }

    try {
      // Send registration data to the server
      console.log('trying register');
      console.log(email, password, pin);

      const response = await axios.post(`${BASE_URL}/user/create`, {
        email,
        password,
        pin,
      });

      if (response.status === 201) {
        alert('Registration successful! Please log in.');

        // Redirect to Login Screen
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error(
        'Registration failed:',
        error.response?.data || error.message,
      );
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Upper Green Circle Design */}
      <View style={styles.upperCircle1} />
      <View style={styles.upperCircle2} />

      <View style={styles.innerContainer}>
        <Text style={styles.title}>Register</Text>
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
    top: 100,
    height: 500,
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
