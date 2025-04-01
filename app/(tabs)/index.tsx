import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View, 
  Image, 
  TouchableOpacity, 
  TextInput,
  Modal,
  FlatList,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text } from '../../components/ThemedText';
import { useColorScheme } from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import MovieCarousel from '../../components/MovieCarousel';
import EventCarousel from '../../components/EventCarousel';

// Import icons - you might need to install expo vector icons if not already
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

import cinemaLogo from '../../assets/favicon.png';

// import movie posters
const marioPoster = require('../../assets/movies/mario.webp');
const missionImpossiblePoster = require('../../assets/movies/mission_impossible.webp');
const moanaPoster = require('../../assets/movies/moana_2.webp');
const spidermanPoster = require('../../assets/movies/spiderman.webp');
const alienPoster = require('../../assets/movies/alien.jpg');
const kongPoster = require('../../assets/movies/kong.webp');
const borderlandsPoster = require('../../assets/movies/borderlands.webp');
const gladiatorPoster = require('../../assets/movies/gladiator.jpg');

// import event posters
const swiftPoster = require('../../assets/events/taylor.jpg');
const f1Poster = require('../../assets/events/f1.jpg');
const jjPoster = require('../../assets/events/jjlin.png');
const lolPoster = require('../../assets/events/lol.jpg');

// Sample data for now
const nowShowingMovies = [
  { id: '1', title: 'Mission Impossible: Dead Reckoning', rating: 4.2, poster: missionImpossiblePoster },
  { id: '2', title: 'Spiderman: Across the Spider-Verse', rating: 4.9, poster: spidermanPoster },
  { id: '3', title: 'The Super Mario Bros Movie', rating: 4.6, poster: marioPoster },
  { id: '4', title: 'Moana 2', rating: 5.0, poster: moanaPoster },
];

const upcomingMovies = [
  { id: '5', title: 'Alien: Romulus', rating: 3.8, poster: alienPoster },
  { id: '6', title: 'Giadiator II', rating: 3.7, poster: gladiatorPoster },
  { id: '7', title: 'Borderlands', rating: 3.5, poster: borderlandsPoster },
  { id: '8', title: 'Godzilla x Kong: The New Empire', rating: 4.1, poster: kongPoster },
];

const ongoingEvents = [
  { id: '9', title: 'Taylor Swift Concert Livestream', type: 'Concert', poster: swiftPoster },
  { id: '10', title: 'Singapore Grand Prix Livestream', type: 'Sports', poster: f1Poster },
];

const upcomingEvents = [
  { id: '12', title: 'JJ Lin Concert Livestream', type: 'Concert', poster: jjPoster },
  { id: '11', title: 'League of Legends World Championship Livestream', type: 'eSports', poster: lolPoster },
];

// Movie details data
const missionImpossibleDetails = {
  id: '1',
  title: 'Mission Impossible: Dead Reckoning',
  rating: 4.2,
  poster: missionImpossiblePoster,
  description: 'Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the fate of the world at stake, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan is forced to consider that nothing can matter more than his mission – not even the lives of those he cares about most.',
  director: 'Christopher McQuarrie',
  cast: ['Tom Cruise', 'Hayley Atwell', 'Simon Pegg', 'Rebecca Ferguson'],
  genre: 'Action, Thriller, Adventure',
  duration: '163 min',
  releaseDate: 'July 12, 2023',
  trailerUrl: 'https://youtu.be/example',
  sessions: [
    { id: 's1', time: '10:30 AM', date: 'Today', hall: 'Hall 1', seatsAvailable: 45 },
    { id: 's2', time: '1:45 PM', date: 'Today', hall: 'Hall 3', seatsAvailable: 32 },
    { id: 's3', time: '4:20 PM', date: 'Today', hall: 'Hall 2', seatsAvailable: 56 },
    { id: 's4', time: '7:00 PM', date: 'Today', hall: 'IMAX', seatsAvailable: 28 },
    { id: 's5', time: '9:45 PM', date: 'Today', hall: 'Hall 1', seatsAvailable: 64 },
    { id: 's6', time: '11:00 AM', date: 'Tomorrow', hall: 'Hall 2', seatsAvailable: 72 },
    { id: 's7', time: '2:15 PM', date: 'Tomorrow', hall: 'IMAX', seatsAvailable: 35 },
  ],
  userReviews: [
    { 
      id: 'r1', 
      user: 'ActionMovieFan', 
      rating: 5, 
      comment: 'Absolutely incredible! Tom Cruise outdid himself once again. The stunts were breathtaking and the plot kept me on the edge of my seat the entire time.',
      date: '1 week ago' 
    },
    { 
      id: 'r2', 
      user: 'FilmCritic22', 
      rating: 4, 
      comment: 'Great addition to the franchise. The action sequences were phenomenal, though the plot got a bit convoluted at times.',
      date: '2 weeks ago' 
    },
    { 
      id: 'r3', 
      user: 'MovieBuff2023', 
      rating: 5, 
      comment: "One of the best action movies I've seen in years! The practical stunts are a breath of fresh air in today's CGI-heavy cinema.",
      date: '3 weeks ago' 
    },
  ]
};

export default function HomeScreen() { 
  const colorScheme = useColorScheme();
  const [movieModalVisible, setMovieModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [reviewText, setReviewText] = useState('');
  const [userRating, setUserRating] = useState(0);
  
  // Filter sessions by selected date
  const filteredSessions = missionImpossibleDetails.sessions.filter(
    session => session.date === selectedDate
  );
  
  // Available dates from sessions (unique)
  const availableDates = [...new Set(missionImpossibleDetails.sessions.map(session => session.date))];
  
  const renderStar = (position) => {
    return (
      <TouchableOpacity onPress={() => setUserRating(position)}>
        <AntDesign 
          name={position <= userRating ? "star" : "staro"} 
          size={24} 
          color={position <= userRating ? "#FFD700" : "#888"} 
          style={{ marginRight: 5 }}
        />
      </TouchableOpacity>
    );
  };
  
  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUser}>{item.user}</Text>
        <Text style={styles.reviewDate}>{item.date}</Text>
      </View>
      <View style={styles.reviewRating}>
        {[1, 2, 3, 4, 5].map(star => (
          <AntDesign 
            key={star}
            name={star <= item.rating ? "star" : "staro"} 
            size={16} 
            color="#FFD700" 
            style={{ marginRight: 3 }}
          />
        ))}
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );
  
  const renderSessionItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.sessionItem, 
        { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
      ]}
    >
      <View style={styles.sessionInfo}>
        <Text style={styles.sessionTime}>{item.time}</Text>
        <Text style={styles.sessionHall}>{item.hall}</Text>
        <Text style={styles.sessionSeats}>{item.seatsAvailable} seats left</Text>
      </View>
      <TouchableOpacity 
        style={[
          styles.bookButton, 
          { backgroundColor: Colors[colorScheme ?? 'light'].primary }
        ]}
      >
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header banner */}
      <View style={[
        styles.header, 
        { backgroundColor: Colors[colorScheme ?? 'light'].primary }
      ]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image 
            source={cinemaLogo} 
            style={{ width: 35, height: 35, marginRight: 8 }} 
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Cathay Cineplexes</Text>
        </View>
        <Text style={styles.headerSubtitle}>Experience the Magic of Movies</Text>
      </View>
      
      {/* Now Showing Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ongoing Movies</Text>
        <View style={{ position: 'relative' }}>
          <MovieCarousel movies={nowShowingMovies} />
          
          {/* Invisible panel over Mission Impossible poster */}
          <TouchableOpacity 
            style={styles.invisiblePanel} 
            onPress={() => setMovieModalVisible(true)}
            activeOpacity={0.9}
          />
        </View>
      </View>
      
      {/* Coming Soon Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Movies</Text>
        <MovieCarousel movies={upcomingMovies} />
      </View>
      
      {/* Ongoing Events Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ongoing Events</Text>
        <EventCarousel events={ongoingEvents} />
      </View>
      
      {/* Upcoming Events Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <EventCarousel events={upcomingEvents} />
      </View>

      {/* Movie Details Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={movieModalVisible}
        onRequestClose={() => setMovieModalVisible(false)}
      >
        <ScrollView style={[
          styles.modalContainer,
          { backgroundColor: Colors[colorScheme ?? 'light'].background }
        ]}>
          {/* Hero Section with Poster and Back Button */}
          <View style={styles.heroContainer}>
            <Image 
              source={missionImpossibleDetails.poster} 
              style={styles.heroPoster}
              resizeMode="cover"
            />
            <View style={styles.gradient} />
            
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setMovieModalVisible(false)}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            
            <View style={styles.heroContent}>
              <Text style={styles.movieTitle}>{missionImpossibleDetails.title}</Text>
              <View style={styles.movieMeta}>
                <View style={styles.ratingContainer}>
                  <AntDesign name="star" size={18} color="#FFD700" />
                  <Text style={styles.rating}>{missionImpossibleDetails.rating}/5</Text>
                </View>
                <Text style={styles.duration}>{missionImpossibleDetails.duration}</Text>
                <Text style={styles.genre}>{missionImpossibleDetails.genre.split(',')[0]}</Text>
              </View>
              
              <TouchableOpacity style={styles.trailerButton}>
                <MaterialIcons name="play-circle-outline" size={20} color="white" />
                <Text style={styles.trailerButtonText}>Watch Trailer</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Book Now Section */}
          <View style={styles.bookingSection}>
            <Text style={styles.sectionTitle}>Select Show Time</Text>
            
            {/* Date Selection */}
            <View style={styles.dateSelection}>
              {availableDates.map(date => (
                <TouchableOpacity
                  key={date}
                  style={[
                    styles.dateButton,
                    selectedDate === date && { 
                      backgroundColor: Colors[colorScheme ?? 'light'].primary 
                    }
                  ]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text 
                    style={[
                      styles.dateButtonText,
                      selectedDate === date && { color: 'white' }
                    ]}
                  >
                    {date}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Sessions List */}
            <FlatList
              data={filteredSessions}
              renderItem={renderSessionItem}
              keyExtractor={item => item.id}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sessionsList}
              scrollEnabled={false}
            />
          </View>
          
          {/* Movie Info Section */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>About the Movie</Text>
            <Text style={styles.description}>{missionImpossibleDetails.description}</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Director:</Text>
              <Text style={styles.infoValue}>{missionImpossibleDetails.director}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Cast:</Text>
              <Text style={styles.infoValue}>{missionImpossibleDetails.cast.join(', ')}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Release Date:</Text>
              <Text style={styles.infoValue}>{missionImpossibleDetails.releaseDate}</Text>
            </View>
          </View>
          
          {/* User Reviews Section */}
          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>User Reviews</Text>
            
            {/* Existing Reviews */}
            {missionImpossibleDetails.userReviews.map(review => renderReviewItem({ item: review }))}
            
            {/* Add Review Form */}
            <View style={styles.addReviewContainer}>
              <Text style={styles.addReviewTitle}>Add Your Review</Text>
              
              {/* Rating Stars */}
              <View style={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map(position => renderStar(position))}
              </View>
              
              {/* Review Text Input */}
              <TextInput
                style={[
                  styles.reviewInput,
                  { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
                ]}
                placeholder="Share your thoughts about the movie..."
                placeholderTextColor="#888"
                multiline={true}
                numberOfLines={4}
                value={reviewText}
                onChangeText={setReviewText}
              />
              
              {/* Submit Button */}
              <TouchableOpacity 
                style={[
                  styles.submitButton,
                  { backgroundColor: Colors[colorScheme ?? 'light'].primary }
                ]}
                onPress={() => {
                  // Submit review logic would go here
                  setReviewText('');
                  setUserRating(0);
                }}
              >
                <Text style={styles.submitButtonText}>Submit Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
    paddingTop: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 5,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  promotionBanner: {
    margin: 15,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  promotionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Invisible panel styles
  invisiblePanel: {
    position: 'absolute',
    left: 15, // Adjust these values based on your layout
    top: 0,
    width: 160, // Adjust width based on your carousel item width
    height: 240, // Adjust height based on your carousel item height
    zIndex: 10,
  },
  
  // Modal styles
  modalContainer: {
    flex: 1,
  },
  heroContainer: {
    height: 280,
    position: 'relative',
  },
  heroPoster: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  movieMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  rating: {
    color: 'white',
    marginLeft: 5,
  },
  duration: {
    color: 'white',
    marginRight: 15,
  },
  genre: {
    color: 'white',
  },
  trailerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  trailerButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  bookingSection: {
    padding: 15,
  },
  dateSelection: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  dateButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  dateButtonText: {
    fontWeight: '500',
  },
  sessionsList: {
    paddingBottom: 10,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sessionHall: {
    fontSize: 14,
    marginBottom: 3,
  },
  sessionSeats: {
    fontSize: 12,
    opacity: 0.7,
  },
  bookButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoSection: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  description: {
    lineHeight: 22,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 100,
    fontWeight: 'bold',
  },
  infoValue: {
    flex: 1,
  },
  reviewsSection: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  reviewItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewUser: {
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  reviewRating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewComment: {
    lineHeight: 20,
  },
  addReviewContainer: {
    marginTop: 20,
  },
  addReviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingStars: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  reviewInput: {
    borderRadius: 8,
    padding: 15,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});