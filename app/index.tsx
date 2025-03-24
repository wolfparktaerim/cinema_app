// Fix the import statements at the top
import React from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Make sure the path is correct for your project structure
import { Text } from '../components/ThemedText'
import { useColorScheme } from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import MovieCarousel from '../components/MovieCarousel';
import EventCarousel from '../components/EventCarousel';

import cinemaLogo from '../assets/favicon.png';



// import movie posters
const marioPoster = require('../assets/movies/mario.webp');
const missionImpossiblePoster = require('../assets/movies/mission_impossible.webp');
const moanaPoster = require('../assets/movies/moana_2.webp');
const spidermanPoster = require('../assets/movies/spiderman.webp');
const alienPoster = require('../assets/movies/alien.jpg');
const kongPoster = require('../assets/movies/kong.webp');
const borderlandsPoster = require('../assets/movies/borderlands.webp');
const gladiatorPoster = require('../assets/movies/gladiator.jpg')

// Sample data for now
const nowShowingMovies = [
  { id: '1', title: 'Mission Impossible: Dead Reckoning', rating: 9.2, poster: missionImpossiblePoster },
  { id: '2', title: 'Spiderman: Across the Spider-Verse', rating: 8.9, poster: spidermanPoster },
  { id: '3', title: 'The Super Mario Bros Movie', rating: 8.6, poster: marioPoster },
  { id: '4', title: 'Moana 2', rating: 9.4, poster: moanaPoster },
];

const upcomingMovies = [
  { id: '5', title: 'Alien: Romulus', rating: 8.5, poster: alienPoster },
  { id: '6', title: 'Giadiator II', rating: 8.7, poster:  gladiatorPoster  },
  { id: '7', title: 'Borderlands', rating: 7.8, poster: borderlandsPoster },
  { id: '8', title: 'Godzilla x Kong: The New Empire', rating: 9.0, poster: kongPoster },
];


// import event posters
const swiftPoster = require('../assets/events/taylor.jpg')
const f1Poster = require('../assets/events/f1.jpg')
const jjPoster = require('../assets/events/jjlin.png')
const lolPoster = require('../assets/events/lol.jpg')

const ongoingEvents = [
  { id: '9', title: 'Taylor Swift Concert Livestream', type: 'Concert', poster: swiftPoster },
  { id: '10', title: 'Singapore Grand Prix Livestream', type: 'Sports', poster: f1Poster },
];

const upcomingEvents = [
  { id: '12', title: 'JJ Lin Concert Livestream', type: 'Concert', poster: jjPoster },
  { id: '11', title: 'League of Legends World Championship Livestream', type: 'eSports', poster: lolPoster },
];


export default function HomeScreen() {
  const colorScheme = useColorScheme();
  
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
        <MovieCarousel movies={nowShowingMovies} />
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


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
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
});