import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { saveTokens } from './utils/tokenStorage';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import { AuthContext } from '../App';

const PasswordLogInScreen = () => {
  const { setIsPinLogin } = useContext(AuthContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if(!email || !password){
      Alert.alert('Please enter all required information');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Password minimum length must be 8 characters.');
      return;
    }

      try {
        console.log(`${email} ${password}`)
        const response = await axios.post(`${Config.BASE_URL}/user/login`, { email, password });
        const passwordToken = response.data.jwtTokenPassword;
        await saveTokens(null, passwordToken);
        // console.log(navigation.getState());
        setIsPinLogin(true);
        // navigation.replace('PinLogIn');
      } catch (error) {
        console.error('Login failed:', error.message);
        Alert.alert('Login failed');
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperCircle1} />
      <View style={styles.upperCircle2} />

      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Your Soil Analyzer</Text>
        <Text style={styles.subWelcomeText}>
          Analyze your soil and unlock its secrets for better growth.
        </Text>
      </View>

      {/* Quote Section */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>
          "Unlock the secrets of your soil—empower your growth with precision and insight."
        </Text>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#6c757d"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#6c757d"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lowerCircle1} />
      <View style={styles.lowerCircle2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  welcomeContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  welcomeText: {
    fontStyle: 'italic',
    fontSize: 34,
    color: 'black',
    textAlign: 'center',
    marginBottom: 4,
  },
  subWelcomeText: {
    fontFamily: 'Inconsolata-Regular',
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  quoteContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  quoteText: {
    fontFamily: 'Inconsolata-Regular',
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 16,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 10,
    borderRadius: 8,
  },
  upperCircle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    backgroundColor: '#57cc72',
    borderRadius: 200,
    top: -180,
    right: -80,
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
    zIndex: 999,
  },
  lowerCircle1: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#57cc72',
    borderRadius: 75,
    bottom: 90,
    left: 70,
    zIndex: 999,
  },
  lowerCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: '#57cc72',
    borderRadius: 75,
    bottom: -50,
    left: -50,
    zIndex: -11,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 28,
    color: '#ff6600',
    fontStyle: 'italic',
  },
  innerContainer: {
    justifyContent: 'center',
    borderRadius: 12,
    top: '20%',
    width: '90%',
    alignSelf: 'center',
    height: '60%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: -1,
  },
  input: {
    fontFamily: 'Inconsolata-Regular',
    width: '100%',
    borderWidth: 1,
    borderColor: '#57cc72',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    color: '#000',
    backgroundColor: '#f8f9fa',
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#ff6600',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#57cc72',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#57cc72',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PasswordLogInScreen;
