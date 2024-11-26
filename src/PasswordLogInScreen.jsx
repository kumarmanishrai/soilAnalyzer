/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {View, Text, StyleSheet, ScrollView, Button, TextInput} from 'react-native';
import axios from 'axios';
import { saveTokens } from './utils/tokenStorage';


const BASE_URL = 'https://soilanalyzerserver.onrender.com';

const PasswordLogInScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

        try {
          console.log(`${email} ${password}`)
          const response = await axios.post(`${BASE_URL}/user/login`, { email, password });
          const passwordToken = response.data.jwtTokenPassword;
          await saveTokens(null, passwordToken);
          console.log(navigation.getState());
          navigation.replace('PinLogIn');
        } catch (error) {
          console.error('Login failed:', error.message);
        }
      };



  return (
    <View style={styles.container}>
      <View style={styles.upperCircle1} />
       <View style={styles.upperCircle2} />



       <View style={styles.innerContainer}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999" 
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
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
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
    right:-80,
    zIndex: 999,
  },
  upperCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: '#a1e89c',
    borderRadius: 150,
    top: -100,
    right: 155,
    zIndex : 999,
  },
  lowerCircle1: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#57cc72',
    borderRadius: 75,
    bottom: 90,
    left: 70,
    zIndex : 999,

  },
  lowerCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: '#57cc72',
    borderRadius: 75,
    bottom: -50,
    left: -50,
    zIndex : -11,},
  scrollContent: {paddingBottom: 40},
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#a1e89c',
//     borderBottomLeftRadius: 80,
//     borderBottomRightRadius: 80,
//     marginTop: 100,
//   },
//   headerText: {fontSize: 24, fontWeight: 'bold', color: '#000'},

title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"#ff6600"
  },
  innerContainer: {
    // flex: 1,
    justifyContent: 'center',
    borderRadius: 12,
    top: '10%',
    height: '70%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    zIndex: -1,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    color: '#000',
  },
  button: {
    color: '#ff6600'
  }
});

export default PasswordLogInScreen;
