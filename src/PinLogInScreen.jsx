/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { getTokens, saveTokens } from './utils/tokenStorage';
import Config from 'react-native-config';
import { AuthContext } from '../App';

const PinLogInScreen = () => {
  const { setIsAuthenticated, setIsPinLogin } = useContext(AuthContext);
  const [pin, setPin] = useState('');

  const handlePinLogin = async () => {
    const { passwordToken } = await getTokens();
    console.log(passwordToken);

    if (!pin) {
      Alert.alert('Please enter required information');
      return;
    }
    if (pin.length !== 4) {
      Alert.alert('PIN must be a 4-digit number.');
      return;
    }

    if (!passwordToken) {
      Alert.alert('Session expired. Please log in with email and password.');
      setIsAuthenticated(false);
      setIsPinLogin(true);
      return;
    }

    try {
      const response = await axios.post(`${Config.BASE_URL}/user/login/pin`, {
        pin,
        passwordToken,
      });
      if (response.status === 200) {
        const pinToken = response.data.jwtTokenPin;
        await saveTokens(pinToken, passwordToken);
        setIsPinLogin(false);
        setIsAuthenticated(true);
      }
    } catch (error) {
      Alert.alert('Invalid PIN. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Decorative Circles */}
      <View style={styles.upperCircleLarge} />
      <View style={styles.upperCircleSmall} />
      <View style={styles.lowerCircleLarge} />
      <View style={styles.lowerCircleSmall} />

      {/* Main Content */}
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Secure PIN Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter 4-digit PIN"
          keyboardType="numeric"
          placeholderTextColor="#bbb"
          maxLength={4}
          value={pin}
          onChangeText={setPin}
        />
        <TouchableOpacity style={styles.button} onPress={handlePinLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', position: 'relative' },
  upperCircleLarge: {
    position: 'absolute',
    width: 250,
    height: 250,
    backgroundColor: '#d0f1db',
    borderRadius: 125,
    top: -80,
    right: -60,
    zIndex: -2,
  },
  upperCircleSmall: {
    position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: '#9edba5',
    borderRadius: 60,
    top: -20,
    right: 30,
    zIndex: -1,
  },
  lowerCircleLarge: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: '#d0f1db',
    borderRadius: 100,
    bottom: -100,
    left: -50,
    zIndex: -2,
  },
  lowerCircleSmall: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: '#9edba5',
    borderRadius: 40,
    bottom: 20,
    left: 40,
    zIndex: -1,
  },
  innerContainer: {
    marginTop: 180,
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    color: '#333',
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#57cc72',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PinLogInScreen;
