import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  Modal,
  TextInput,
  Animated,
  Pressable
} from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample data for suggested entertainment
const SAMPLE_ENTERTAINMENT = [
  {
    id: '1',
    type: 'movie',
    title: 'Dune: Part Three',
    description: 'The epic conclusion to the Dune saga, following Paul Atreides as he leads the Fremen in their final battle.',
    suggestedMonth: 'December',
    suggestedYear: '2025',
    votes: 128,
    comments: 24,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BNGY4NDkyNTEtNTE4Ny00NjI0LTgzYTEtN2UyZDRlODFlNTVlXkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: '2',
    type: 'concert',
    title: 'Coldplay World Tour',
    description: 'The award-winning band returns with their spectacular new show featuring hits from their latest album.',
    suggestedMonth: 'July',
    suggestedYear: '2025',
    votes: 87,
    comments: 15,
    imageUrl: 'https://res.klook.com/image/upload/v1728983293/blnmqz5fi2wmewrib46w.jpg',
  },
  {
    id: '3',
    type: 'sports',
    title: 'NBA Finals Viewing Party',
    description: 'Watch the NBA Finals on our big screen with fellow basketball fans! Food and drinks available.',
    suggestedMonth: 'June',
    suggestedYear: '2025',
    votes: 53,
    comments: 8,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/NBA_Finals_logo_%282022%29.svg/1200px-NBA_Finals_logo_%282022%29.svg.png',
  }
];

const EntertainmentSuggestionsScreen = () => {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState(SAMPLE_ENTERTAINMENT);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const fadeAnim = new Animated.Value(0);

  // Simulate loading comments for a selected item
  useEffect(() => {
    if (selectedItem) {
      const sampleComments = [
        { id: '1', user: 'MovieFan22', text: 'Can\'t wait for this! The last one was amazing!', timestamp: '2 days ago' },
        { id: '2', user: 'CinemaLover', text: 'I would definitely attend this event!', timestamp: '1 day ago' },
        { id: '3', user: 'FilmBuff442', text: 'Hope they can get this! It would be awesome to see on the big screen.', timestamp: '5 hours ago' },
      ];
      setComments(sampleComments);
    }
  }, [selectedItem]);

  const handleVote = (id) => {
    setSuggestions(prevSuggestions => 
      prevSuggestions.map(item => 
        item.id === id ? { ...item, votes: item.votes + 1 } : item
      )
    );
    
    showNotification('Vote recorded! Thanks for your interest');
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() === '') return;
    
    const newComment = {
      id: Date.now().toString(),
      user: 'You',
      text: commentText,
      timestamp: 'Just now'
    };
    
    setComments(prevComments => [newComment, ...prevComments]);
    setCommentText('');
    
    showNotification('Comment added successfully!');
  };

  const showNotification = (message) => {
    setNotificationMessage(message);
    setShowSuccessNotification(true);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
    
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        setShowSuccessNotification(false);
      });
    }, 2000);
  };

  const openCommentsModal = (item) => {
    setSelectedItem(item);
    setShowCommentsModal(true);
  };

  const closeCommentsModal = () => {
    setShowCommentsModal(false);
    setSelectedItem(null);
  };

  const renderNotification = () => {
    if (!showSuccessNotification) return null;

    return (
      <Animated.View 
        style={[
          styles.notification, 
          { 
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0]
              })
            }]
          }
        ]}
      >
        <Text style={styles.notificationText}>{notificationMessage}</Text>
      </Animated.View>
    );
  };

  const renderEntertainmentCard = (item) => {
    return (
      <View key={item.id} style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
        
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.typeTag}>
              <Text style={styles.typeText}>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </Text>
            </View>
          </View>
          
          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          <Text style={styles.dateInfo}>
            Suggested for: {item.suggestedMonth} {item.suggestedYear}
          </Text>
          
          <View style={styles.cardActions}>
            <TouchableOpacity 
              style={styles.voteButton}
              onPress={() => handleVote(item.id)}
            >
              <FontAwesome name="thumbs-up" size={18} color="#0055A5" />
              <Text style={styles.voteCount}>{item.votes}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.commentButton}
              onPress={() => openCommentsModal(item)}
            >
              <FontAwesome name="comment" size={18} color="#555" />
              <Text style={styles.commentCount}>{item.comments}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderCommentsModal = () => {
    if (!selectedItem) return null;
    
    return (
      <Modal
        transparent={true}
        visible={showCommentsModal}
        animationType="slide"
        onRequestClose={closeCommentsModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedItem.title}</Text>
              <TouchableOpacity onPress={closeCommentsModal}>
                <FontAwesome name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalDescription}>{selectedItem.description}</Text>
            
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add your comment..."
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              <TouchableOpacity 
                style={styles.commentSubmitButton}
                onPress={handleCommentSubmit}
              >
                <FontAwesome name="send" size={18} color="white" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.commentsTitle}>Comments ({comments.length})</Text>
            
            <ScrollView style={styles.commentsContainer}>
              {comments.map(comment => (
                <View key={comment.id} style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUser}>{comment.user}</Text>
                    <Text style={styles.commentTime}>{comment.timestamp}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Entertainment Picks</Text>
        <Text style={styles.screenSubtitle}>
          Vote or comment on what you'd like to see at our venue
        </Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {suggestions.map(renderEntertainmentCard)}
        
        <Pressable
          style={styles.suggestionLink}
          onPress={() => router.push('/entertainment-request')}
        >
          <Text style={styles.suggestionLinkText}>
            Don't like what you see? Drop us a suggestion!
          </Text>
          <FontAwesome name="arrow-right" size={16} color="#0055A5" />
        </Pressable>
      </ScrollView>
      
      {renderCommentsModal()}
      {renderNotification()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    backgroundColor: 'white',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0055A5',
    marginBottom: 5,
  },
  screenSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  scrollContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  typeTag: {
    backgroundColor: '#E1EFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  typeText: {
    color: '#0055A5',
    fontSize: 12,
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  dateInfo: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    paddingTop: 12,
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  voteCount: {
    marginLeft: 6,
    fontSize: 14,
    color: '#0055A5',
    fontWeight: '500',
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentCount: {
    marginLeft: 6,
    fontSize: 14,
    color: '#555',
  },
  suggestionLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#0055A5',
    borderStyle: 'dashed',
  },
  suggestionLinkText: {
    fontSize: 16,
    color: '#0055A5',
    fontWeight: '500',
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
  },
  commentSubmitButton: {
    backgroundColor: '#0055A5',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  commentsContainer: {
    maxHeight: 300,
  },
  commentItem: {
    backgroundColor: '#F5F7FA',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  commentUser: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },
  commentTime: {
    fontSize: 12,
    color: '#888',
  },
  commentText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  notification: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#2E8B57',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EntertainmentSuggestionsScreen;