/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {clearToken, getTokens} from './utils/tokenStorage';
import { getUserDetails, saveUserDetails } from './utils/userDetails';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../App';
import { Config } from 'react-native-config';
import axios from 'axios';

const HomeScreen = () => {
  const {setIsAuthenticated, setIsPinLogin} = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const userDetails = async () => {
      console.log('highlight');
      const { passwordToken } = await getTokens();

      if(passwordToken) {
      console.log('highlight2');

        const response = await axios.post(`${Config.BASE_URL}/user/about`, {passwordToken});
        if(response.status === 200) {
          console.log('highlight3');
          console.log(response.data.name);
          console.log(response.data.email);
          // console.log(response.data.image);
          saveUserDetails(response.data);
        }
      }

      const {image} = await getUserDetails();
      setProfileImage(image);
    };
    userDetails();

    return () => {
      userDetails(); // Properly clean up listener
    };

  }, []);

  const navigation = useNavigation();

  const handleLogout = async () => {
    await clearToken();
    setIsPinLogin(true);
    setIsAuthenticated(false);
  };

  const handleFieldClick = fieldId => {
    // Navigate to the new screen and pass the fieldId or field data
    navigation.navigate('FieldDetails');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Upper Green Circle Design */}
        <View style={styles.upperCircle1} />
        <View style={styles.upperCircle2} />

        <View>
          {/* Header with back button and profile image */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: profileImage ? profileImage : 'https://lh3.googleusercontent.com/a/ACg8ocLPYnfvUEcoeogYnJMFtNsOsIMm8xr3bZvzIIhJyWpLTq9mJomF=s360-c-no',
                }} // Replace with actual image source
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={handleLogout}>
              <Icon name="logout" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Fields */}
          <ScrollView
            style={styles.fieldsContainer}
            contentContainerStyle={{paddingBottom: 20}}>
            {[
              'Field1',
              'Field2',
              'Field3',
              'Field4',
              'Field2',
              'Field3',
              'Field4',
              'Field2',
              'Field3',
              'Field4',
              'Field2',
              'Field3',
              'Field4',
              'Field2',
              'Field3',
              'Field4',
            ].map((field, index) => (
              <TouchableOpacity
                key={index}
                style={styles.fieldRow}
                onPress={handleFieldClick}>
                <Text style={styles.fieldText}>{field}</Text>
                <View style={styles.icons}>
                  <TouchableOpacity>
                    <Icon name="edit" size={20} color="#ff6600" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="delete" size={20} color="#ff6600" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* Add Field Button */}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Field</Text>
          </TouchableOpacity>
        </View>

        <View></View>

        {/* Lower Green Circle Design */}
        <View style={styles.lowerCircle1} />
        <View style={styles.lowerCircle2} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: '100%',
  },
  upperCircle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    backgroundColor: '#57cc72',
    borderRadius: 200,
    top: -180,
    right: -80,
    zIndex: -10,
    opacity: 0.5,

  },
  upperCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: '#a1e89c',
    borderRadius: 150,
    top: -100,
    right: 155,
    zIndex: -11,
    opacity: 0.5,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    // backgroundColor: 'gray',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    // position: 'absolute',
    left: 2,
    top: 2,
    borderColor: '#fff',
    borderWidth: 2,
  },
  backButton: {
    right: 0,
    padding: 8,
    backgroundColor: '#ff6600',
    borderRadius: 50,
  },
  fieldsContainer: {
    marginTop: 58,
    paddingTop: 0,
    marginBottom: 40,
    paddingBottom: 240,
    zIndex: 9999,
    marginHorizontal: 'auto',
    width: '92%',
    height: '66%',
    borderRadius: 4,
    backgroundColor: '#a5c4ad',
    paddingHorizontal: 16,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightgray',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 9.5,
  },
  fieldText: {
    fontSize: 16,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#ff6600',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'center',
    bottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lowerCircle1: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#57cc72',
    borderRadius: 75,
    bottom: 90,
    left: 70,
    opacity: 0.5,
    zIndex: -11,
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
    opacity: 0.5,

  },
});

export default HomeScreen;
