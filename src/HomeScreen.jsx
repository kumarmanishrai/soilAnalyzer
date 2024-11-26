/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { clearTokens } from './utils/tokenStorage';

const HomeScreen = ({navigation}) => {

    const handleLogout = async () => {
      await clearTokens();
      navigation.replace('Auth', {
        screen: 'Login',
      });
    };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

       {/* Upper Green Circle Design */}
       <View style={styles.upperCircle1} />
       <View style={styles.upperCircle2} />

       <View>
      {/* Header with back button and profile image */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Button title="Logout" onPress={handleLogout} />
        <Image
          style={styles.profileImage}
          source={{
            uri: 'https://lh3.googleusercontent.com/a/ACg8ocLPYnfvUEcoeogYnJMFtNsOsIMm8xr3bZvzIIhJyWpLTq9mJomF=s360-c-no',
          }} // Replace with actual image source
        />
      </View>

      {/* Fields */}
      <ScrollView style={styles.fieldsContainer} contentContainerStyle={{paddingBottom: 20}}>
        {['Field1', 'Field2', 'Field3', 'Field4', 'Field2', 'Field3', 'Field4', 'Field2', 'Field3', 'Field4', 'Field2', 'Field3', 'Field4', 'Field2', 'Field3', 'Field4'].map((field, index) => (
          <TouchableOpacity key={index} style={styles.fieldRow}>
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

      <View>
        
      </View>

      {/* Lower Green Circle Design */}
      <View style={styles.lowerCircle1} />
      <View style={styles.lowerCircle2} />

    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  upperCircle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    backgroundColor: '#57cc72',
    borderRadius: 200,
    top: -180,
    right:-80,
    zIndex: -10,
  },
  upperCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: '#a1e89c',
    borderRadius: 150,
    top: -100,
    right: 155,
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
    marginTop: 58,
    paddingTop: 0,
    marginBottom: 40,
    paddingBottom: 240,
    zIndex: 9999,
    height: '70%',
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
  icons : {
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
    zIndex : -11,

  },
  lowerCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: '#57cc72',
    borderRadius: 75,
    bottom: -50,
    left: -50,
    zIndex : -11,

  },
});

export default HomeScreen;
