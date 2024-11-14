/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />

       {/* Upper Green Circle Design */}
       <View style={styles.upperCircle1} />
       <View style={styles.upperCircle2} />


      {/* Header with back button and profile image */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Image
          style={styles.profileImage}
          source={{
            uri: 'https://lh3.googleusercontent.com/a/ACg8ocLPYnfvUEcoeogYnJMFtNsOsIMm8xr3bZvzIIhJyWpLTq9mJomF=s360-c-no',
          }} // Replace with actual image source
        />
      </View>

      {/* Fields */}
      <ScrollView style={styles.fieldsContainer}>
        {['Field1', 'Field2', 'Field3', 'Field4'].map((field, index) => (
          <View key={index} style={styles.fieldRow}>
            <Text style={styles.fieldText}>{field}</Text>
            <TouchableOpacity>
              <Icon name="edit" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        ))}

            {/* Add Field Button */}
        <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Field</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Lower Green Circle Design */}
      <View style={styles.lowerCircle1} />
      <View style={styles.lowerCircle2} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  upperCircle2: {
    position: 'absolute',
    width: 400,
    height: 400,
    backgroundColor: '#57cc72',
    borderRadius: 200,
    top: -140,
    right:-60,
    zIndex: -10,
  },
  upperCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    backgroundColor: '#a1e89c',
    borderRadius: 150,
    top: -140,
    right: 305,
    zIndex : -11,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: 'blue',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    backgroundColor: '#ff6600',
    borderRadius: 50,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    right: 16,
    top: 0,
    borderColor: '#fff',
    borderWidth: 2,
  },
  fieldsContainer: {
    marginTop: 80,
    paddingTop: 20,
    mrginBottom: 40,
    zIndex: 9999,
    paddingHorizontal: 16,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  fieldText: {
    fontSize: 16,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#ff6600',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginTop: 20,
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
  },
  lowerCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: '#57cc72',
    borderRadius: 75,
    bottom: -50,
    left: -50,
  },
});

export default Home;
