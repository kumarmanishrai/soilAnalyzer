import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { clearToken, getTokens } from './utils/tokenStorage';
import { getUserDetails, saveUserDetails } from './utils/userDetails';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../App';
import { Config } from 'react-native-config';
import axios from 'axios';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { setIsAuthenticated, setIsPinLogin } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);
  const [fields, setFields] = useState(['Field1', 'Field2', 'Field3', 'Field4']);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { passwordToken } = await getTokens();

        if (passwordToken) {
          const response = await axios.post(`${Config.BASE_URL}/user/about`, { passwordToken });
          if (response.status === 200) {
            saveUserDetails(response.data);
          }
        }

        const { image } = await getUserDetails();
        setProfileImage(image || 'https://lh3.googleusercontent.com/a/default-profile-image.jpg');
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearToken();
              setIsPinLogin(true);
              setIsAuthenticated(false);
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ]
    );
  };

  const handleFieldClick = (field) => navigation.navigate('FieldDetails', { field });

  const handleAddField = () => navigation.navigate('AddField');

  const handleEditField = (field) => navigation.navigate('EditField', { field });

  const handleDeleteField = (fieldToDelete) => {
    Alert.alert(
      'Delete Field',
      `Are you sure you want to delete ${fieldToDelete}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setFields((currentFields) => 
            currentFields.filter((field) => field !== fieldToDelete)
          ),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />

        {/* Background Circles */}
        <View style={styles.backgroundOverlay}>
          <View style={styles.backgroundCircleTop} />
          <View style={styles.backgroundCircleBottom} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.profileContainer}
            accessibilityLabel="Go to Profile"
          >
            <Image
              style={styles.profileImage}
              source={{ uri: profileImage }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            accessibilityLabel="Logout"
          >
            <Icon name="logout" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Page Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>My Fields</Text>
          <Text style={styles.pageSubtitle}>Manage your agricultural lands</Text>
        </View>

        {/* Fields List */}
        <ScrollView 
          style={styles.fieldsContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.fieldsScrollContent}
        >
          {fields.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="landscape" size={64} color="#A5C4AD" />
              <Text style={styles.emptyStateText}>No fields added yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Start by adding your first agricultural field
              </Text>
            </View>
          ) : (
            fields.map((field, index) => (
              <TouchableOpacity
                key={index}
                style={styles.fieldCard}
                onPress={() => handleFieldClick(field)}
              >
                <View style={styles.fieldCardContent}>
                  <View style={styles.fieldCardLeft}>
                    <Icon name="terrain" size={24} color="#57CC72" />
                    <Text style={styles.fieldText}>{field}</Text>
                  </View>
                  <View style={styles.fieldActions}>
                    <TouchableOpacity
                      style={styles.actionIcon}
                      onPress={() => handleEditField(field)}
                      accessibilityLabel={`Edit ${field}`}
                    >
                      <Icon name="edit" size={20} color="#4A90E2" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionIcon}
                      onPress={() => handleDeleteField(field)}
                      accessibilityLabel={`Delete ${field}`}
                    >
                      <Icon name="delete" size={20} color="#E94B35" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {/* Add Field Button */}
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddField}
        >
          <Icon name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add New Field</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  backgroundCircleTop: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(87, 204, 114, 0.2)',
    top: -width * 0.4,
    right: -width * 0.2,
  },
  backgroundCircleBottom: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(87, 204, 114, 0.1)',
    bottom: -width * 0.3,
    left: -width * 0.2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  profileContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  logoutButton: {
    backgroundColor: '#ff6600',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  fieldsContainer: {
    backgroundColor: 'rgba(165, 196, 173, 0.3)',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  fieldsScrollContent: {
    paddingVertical: 16,
  },
  fieldCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fieldCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  fieldCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginLeft: 12,
  },
  fieldActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#ff6600',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 32,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default HomeScreen;