import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Modal, 
  TextInput,
  Animated
} from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define types for booking and rating
interface Booking {
  id: string;
  movieTitle: string;
  posterUrl: string;
  date: string;
  time: string;
  status: 'ongoing' | 'not_watched' | 'watched';
  canRate: boolean;
}
  // Sample booking data
  const bookings: Booking[] = [
    {
      id: '1',
      movieTitle: 'Inception',
      posterUrl: require('../assets/movies/inception.webp'),
      date: '2024-03-15',
      time: '19:30',
      status: 'watched',
      canRate: true
    },
    {
      id: '2',
      movieTitle: 'Dune Part Two',
      posterUrl: require('../assets/movies/dune.jpeg'),
      date: '2024-03-22',
      time: '20:00',
      status: 'not_watched',
      canRate: false
    },
    {
      id: '3',
      movieTitle: 'Oppenheimer',
      posterUrl: require('../assets/movies/oppenheimer.jpg'),
      date: '2024-03-10',
      time: '18:45',
      status: 'ongoing',
      canRate: false
    }
  ];

  const MyBookingScreen: React.FC = () => {
    const router = useRouter();
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isRatingModalVisible, setRatingModalVisible] = useState(false);
    const [pointsNotification, setPointsNotification] = useState(false);
    const fadeAnim = new Animated.Value(0);


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return '#FFA500'; // Orange
      case 'not_watched': return '#1E90FF'; // Dodger Blue
      case 'watched': return '#2E8B57'; // Sea Green
      default: return '#808080'; // Gray
    }
  };

  const handleOpenRatingModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setRating(0);
    setComment('');
    setRatingModalVisible(true);
  };

  const handleSubmitRating = () => {
    if (!selectedBooking) return;

    setRatingModalVisible(false);
    
    // Show points notification
    setPointsNotification(true);

    // Fade out animation after 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      delay: 3000,
      useNativeDriver: true
    }).start(() => {
      setPointsNotification(false);
    });
  };

  const renderPointsNotification = () => {
    if (!pointsNotification) return null;

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();

    return (
      <Animated.View 
        style={[
          styles.pointsNotification, 
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
        <Text style={styles.pointsNotificationText}>
          +5 Membership Points
        </Text>
      </Animated.View>
    );
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <View style={styles.bookingCard}>
      <Image 
         source={typeof item.posterUrl === 'string' ? { uri: item.posterUrl } : item.posterUrl} 
        style={styles.moviePoster} 
        defaultSource={require('../assets/movies/load.webp')} // Add a placeholder image
      />
      <View style={styles.bookingDetails}>
        <Text style={styles.movieTitle}>{item.movieTitle}</Text>
        <Text style={styles.bookingInfo}>
          {item.date} | {item.time}
        </Text>
        <View 
          style={[
            styles.statusBadge, 
            { backgroundColor: getStatusColor(item.status) }
          ]}
        >
          <Text style={styles.statusText}>
            {item.status === 'ongoing' 
              ? 'Ongoing' 
              : item.status === 'not_watched' 
                ? 'Not Yet Watched' 
                : 'Watched'}
          </Text>
        </View>
        {item.status === 'watched' && item.canRate && (
          <TouchableOpacity 
            style={styles.rateButton}
            onPress={() => handleOpenRatingModal(item)}
          >
            <Text style={styles.rateButtonText}>Rate Movie</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderRatingModal = () => (
    <Modal
      transparent={true}
      visible={isRatingModalVisible}
      animationType="slide"
      onRequestClose={() => setRatingModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Rate {selectedBooking?.movieTitle}</Text>
          
          <View style={styles.starContainer}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => setRating((index + 1) * 1)}
              >
                <FontAwesome
                  name={index < rating ? 'star' : 'star-o'}
                  size={40}
                  color="#FFD700"
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingText}>{rating}/5</Text>

          <TextInput
            style={styles.commentInput}
            placeholder="Write your review (optional)"
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
          />

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmitRating}
            >
              <Text style={styles.submitButtonText}>Submit Rating</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setRatingModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>John Doe's Watchlist</Text>
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      {renderRatingModal()}
      {renderPointsNotification()}
    </SafeAreaView>
  );

 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#0055A5'
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 15,
  },
  moviePoster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
  },
  bookingDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bookingInfo: {
    color: '#666',
    marginTop: 5,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  rateButton: {
    backgroundColor: '#0055A5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  rateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  ratingText: {
    fontSize: 16,
    marginBottom: 15,
  },
  commentInput: {
    width: '100%',
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#0055A5',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0055A5',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#0055A5',
    fontWeight: 'bold',
  },
  halfStarTouch: {
    marginHorizontal: 5,
  },
  halfStarContainer: {
    flexDirection: 'row',
    width: 30,
    overflow: 'hidden',
  },
  pointsNotification: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#0055A5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pointsNotificationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
  },
  starIcon: {
    marginHorizontal: 5,
  },
});

export default MyBookingScreen;