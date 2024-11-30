/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import ImagePicker from 'react-native-image-crop-picker';
import Post from './component/Post';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getTokens} from './utils/tokenStorage';
import { Avatar } from 'react-native-paper';

const CommunityScreen = () => {
  // const {passwordToken} = await getTokens();
  // console.log(passwordToken);

  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [newPost, setNewPost] = useState({
    passwordToken: '',
    heading: '',
    text: '',
    image: postImage || '',
  });

  // Fetch all posts on page load
  useEffect(() => {
    const fetchPosts = async () => {
      const {passwordToken} = await getTokens(); // Get token here
      if (!passwordToken) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.post(`${Config.BASE_URL}/post/allpost`, {
          passwordToken,
        });
        // console.log(response.data);
        const fetchedPosts = response.data.map(post => ({
          _id: post._id,
          user: post.user,
          heading: post.heading,
          text: post.text,
          image: post.image,
          likesCount: post.likesCount,
          uploadTime: post.uploadTime,
          comments: post.comments,
          likedByCurrentUser: post.likedByCurrentUser,
        }));

        setPosts(fetchedPosts.reverse());
      } catch (error) {
        console.error(
          'Error fetching posts:',
          error.response ? error.response.data : error.message,
        );
        Alert.alert("something went wrong");
      }
    };

    fetchPosts();
  },[newPost]);

  const selectPhoto = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 350,
        height: 300,
        cropping: true,
        includeBase64: true,
        avoidEmptySpaceAroundImage: true,
        freeStyleCropEnabled: true,
      });
      if (image && image.data) {
        const data = `data:${image.mime};base64,${image.data}`;
        setPostImage(data);
        setNewPost(prevPost => ({ ...prevPost, image: data })); // Update the new post with the image
      } else {
        console.error('Image data is not available');
      }
    } catch (error) {
      console.error('Error selecting photo:', error.message);
    }
  };

  const createPost = async () => {
    if(!newPost.heading || !newPost.text || !newPost.image){
      Alert.alert('Please enter all parameters');
      return;
    }
    try {
      const {passwordToken} = await getTokens(); // Get token here
      const updatedPost = { ...newPost, passwordToken };
      const response = await axios.post(
        `${Config.BASE_URL}/post/create`,
        updatedPost,
      );
      setPosts([response.data.post, ...posts]); // Add new post to the top
      setModalVisible(false);
      setNewPost({heading: '', text: '', image: null});
      setPostImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
 
  const handleLike = async postId => {
    try {
      const {passwordToken} = await getTokens(); // Get token here

      const response = await axios.post(
        `${Config.BASE_URL}/post/update/${postId}`,
        {passwordToken, like: true},
      );
      const updatedPosts = posts.map(post =>
        post._id === postId
        ? {
            ...post,
            likesCount: response.data.updatedPost.likesCount, 
            likedByCurrentUser: response.data.updatedPost.likedByCurrentUser
          }
        : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId, comment) => {
    try {
      const {passwordToken} = await getTokens(); // Get token here
      const response = await axios.post(
        `${Config.BASE_URL}/post/update/${postId}`,
        {passwordToken, comment},
      );
      const updatedPosts = posts.map(post =>
        post._id === postId
          ? {...post, comments: response.data.updatedPost.comments}
          : post,
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeletePost = async postId => {
    try {
      const {passwordToken} = await getTokens(); // Get token here
      await axios.post(`${Config.BASE_URL}/post/delete/${postId}`, {
        passwordToken,
      });
      const updatedPosts = posts.filter(post => post._id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <Post
            post={item}
            onLike={handleLike}
            onAddComment={handleAddComment}
            onDelete={handleDeletePost}
          />
        )}
      />
      <TouchableOpacity
        style={styles.addPostButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addPostButtonText}>Create Post</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalHeading}>Add Post</Text>
          <TextInput
            placeholder="Heading"
            placeholderTextColor="#999"
            value={newPost.heading}
            onChangeText={text => setNewPost({...newPost, heading: text})}
            style={styles.input}
          />
          <TextInput
            placeholder="Text"
            placeholderTextColor="#999"
            value={newPost.text}
            onChangeText={text => setNewPost({...newPost, text: text})}
            style={styles.input}
          />
          {/* For Image Upload: Implement Image Picker */}
          <TouchableOpacity onPress={()=>selectPhoto()}>
          <Image
          size={140}
          style={styles.avatar}
          source={{
            uri: postImage === null ?
            'https://thumbs.dreamstime.com/b/profile-icon-add-sign-profile-icon-new-plus-positive-symbol-profile-icon-add-sign-profile-icon-new-plus-positive-111945352.jpg'
            :
             postImage,
          }}
        />
      </TouchableOpacity>
          <TouchableOpacity style={styles.button} title="Create Post" onPress={createPost}>
          <Text>Create Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} title="Cancel" onPress={() => setModalVisible(false)}>
          <Icon name="arrow-back" size={20} color="blue" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: '#999'},
  addPostButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 30,
  },
  modalHeading: {
    fontWeight: 'medium',
    marginVertical:10,
    color: 'black',
    fontSize: 32,

  },
  modal: {
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '#fcf7eb',
    elevation: 5,
    height: 600,
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'orange',
    marginTop: 80,
    marginHorizontal: 'auto',
  },
  addPostButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    width: '90%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    color: '#000',
  },
  button: {
    backgroundColor: '#ff6600',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginBottom: 10,
  },
  avatar: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: 'white',
    height: 150,
    width: 150,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    backgroundColor: '#ff6600',
    borderRadius: 50,
  },
});

export default CommunityScreen;
