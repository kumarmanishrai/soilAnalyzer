/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

const Post = ({post, onLike, onAddComment, onDelete}) => {

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  // console.log(post.comments);

  return (
    <View style={styles.postContainer}>
      <View style={styles.userInfo}>
        <Image source={{uri: post.user.image}} style={styles.profilePic} />
        <Text style={styles.userName}>{post.user.name}</Text>
      </View>
      {post.image && (
        <Image source={{uri: post.image}} style={styles.postImage} />
      )}
      <Text style={styles.heading}>{post.heading}</Text>
      <Text style={styles.text}>{post.text}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onLike(post._id)}>
            <Icon name="thumb-up" size={25} color={post.likedByCurrentUser ? '#ff6600' : '#fff'} />
        </TouchableOpacity>
        <Text style={{color:"#fff"}}>{post.likesCount} Like{post.likesCount !== 1 ? 's' : ''}</Text>
        <TouchableOpacity onPress={() => setShowComments(!showComments)}>
        <Icon name="comment" size={25} color="#fff" />
        </TouchableOpacity>
        <Text>{post.comments.length} Comment{post.comments.length !== 1 ? 's' : ''}</Text>
        <TouchableOpacity onPress={() => onDelete(post._id)}>
        <Icon name="delete" size={25} color="red" />
        </TouchableOpacity>
      </View>
      {showComments && (

        <ScrollView style={styles.commentBlock} nestedScrollEnabled={true}>
          <TextInput
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => {
              onAddComment(post._id, newComment);
              setNewComment('');
            }}>
            <Text style={styles.addCommentButton}>Post</Text>
          </TouchableOpacity>
          {post.comments.map((comment, index) => (
            <View key={index} style={styles.singleComment}>
              <View style={styles.textContainer}>
              <Image
                source={{uri: comment.user.image || post.image}}
                style={styles.profilePic}
              />
              <Text style={styles.commentHeader}>{comment.user.name || "Anonymous"}: </Text>
              </View>
              <Text style={styles.commentText}>
                {comment.comment}
              </Text>
            </View>
          ))}
          
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#333', // Dark background for better contrast
    padding: 15,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  commentBlock: {
    maxHeight: 450,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#f5f5f5',
    // overflow: 'hidden',
  },
  textContainer: {
    justifyContent: 'start',
    alignItems: 'start',
  },
  singleComment: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
  },
  commentHeader: {
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10,
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    color: '#000',
    backgroundColor: '#dbdbd9',
    fontSize: 14,
  },
  addCommentButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});



export default Post;
