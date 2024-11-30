/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {getTokens, saveTokens} from './utils/tokenStorage';
// import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import { AuthContext } from '../App';


const PinLogInScreen = () => {
  const { setIsAuthenticated, setIsPinLogin } = useContext(AuthContext);
  // const navigation = useNavigation();
  const [pin, setPin] = useState('');

  const handlePinLogin = async () => {
    const {passwordToken} = await getTokens();
    console.log(passwordToken);

    if(!pin){
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
      <View style={styles.upperCircle1} />
      <View style={styles.upperCircle2} />
      {/* Add any other content here */}

      <View style={styles.innerContainer}>
        <Text style={styles.title}>Pin LogIn</Text>
        <TextInput
          style={styles.input}
          placeholder="4-digit PIN"
          keyboardType="numeric"
          placeholderTextColor="#999"
          maxLength={4}
          value={pin}
          onChangeText={setPin}
        />
        {/* <Button title="Login with PIN" onPress={handlePinLogin} /> */}
        <TouchableOpacity style={styles.button1} onPress={handlePinLogin}>
          <Text style={styles.buttonText1}>Login with PIN</Text>
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
  // scrollContent: {paddingBottom: 40},
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 16,
  //   backgroundColor: '#a1e89c',
  //   borderBottomLeftRadius: 80,
  //   borderBottomRightRadius: 80,
  //   marginTop: 100,
  // },
  // headerText: {fontSize: 24, fontWeight: 'bold', color: '#000'},
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
    backgroundColor: 'rgba(255, 102, 0, 1)', // Orange color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    elevation: 3,
    marginBottom: 16, // For shadow on Android
  },
  buttonText1: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: 'boold',
    textAlign: 'center',
  },
});

export default PinLogInScreen;
