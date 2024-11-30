/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserDetails } from './utils/userDetails';

const ProfileScreen = ({user}) => {
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {

    const userData = async() => {
      const {name, image, email} = await getUserDetails();
      setProfileImage(image);
      setUserName(name);
      setUserEmail(email);
    };
    userData();

  }, []);



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Icon name="grain" size={80} color="gray" style={styles.defaultIcon} />
        )}
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.email}>{userEmail}</Text>
      </View>
      <View style={styles.content}>
        <Text>Here is all data</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'pink',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  defaultIcon: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  content: {
    marginTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  noDataText: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
});

export default ProfileScreen;
