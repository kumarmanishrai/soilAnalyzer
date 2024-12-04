import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserDetails } from './utils/userDetails';

const { width } = Dimensions.get('window');

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

  const ProfileStatCard = ({ icon, title, value }) => (
    <View style={styles.statCard}>
      <Icon name={icon} size={24} color="#007bff" />
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerBackground}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {profileImage ? (
              <Image 
                source={{ uri: profileImage }} 
                style={styles.profileImage} 
              />
            ) : (
              <Icon 
                name="account-circle" 
                size={120} 
                color="rgba(255,255,255,0.7)" 
              />
            )}
            <TouchableOpacity style={styles.editProfileButton}>
              <Icon name="edit" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>{userEmail}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <ProfileStatCard 
          icon="group" 
          title="Followers" 
          value="1.2K" 
        />
        <ProfileStatCard 
          icon="star" 
          title="Following" 
          value="456" 
        />
        <ProfileStatCard 
          icon="photo-library" 
          title="Posts" 
          value="87" 
        />
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.aboutText}>
          Passionate developer creating innovative solutions 
          and exploring new technologies. Always learning 
          and growing in the world of software development.
        </Text>
      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="settings" size={20} color="#007bff" />
          <Text style={styles.actionButtonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share" size={20} color="#007bff" />
          <Text style={styles.actionButtonText}>Share Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafc', // Softer background color
  },
  headerBackground: {
    backgroundColor: '#a2d5ab', // Soothing pastel green
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 40,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editProfileButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#7b68ee', // Muted purple
    borderRadius: 20,
    padding: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d2d2d', // Dark gray for text
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: 'rgba(45, 45, 45, 0.7)', // Softer gray for email
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 5,
    paddingVertical: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  statCard: {
    alignItems: 'center',
    width: width / 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#888', // Subtle gray
    marginTop: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2', // Softer blue
  },
  contentSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7b68ee', // Muted purple for headings
    marginBottom: 10,
  },
  aboutText: {
    color: '#555', // Neutral gray
    lineHeight: 22,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef1f6', // Very light gray-blue
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  actionButtonText: {
    marginLeft: 5,
    color: '#7b68ee', // Muted purple for action text
    fontWeight: '600',
  },
});


export default ProfileScreen;