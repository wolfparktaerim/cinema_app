// Fix the import statements at the top
import React from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Make sure the path is correct for your project structure
import { Text } from '../components/ThemedText'
import { useColorScheme } from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import MovieCarousel from '../components/MovieCarousel';

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
        <Text style={styles.sectionTitle}>Now Showing Movies</Text>
        <MovieCarousel movies={nowShowingMovies} />
      </View>
      
      {/* Coming Soon Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Movies Coming Soon</Text>
        <MovieCarousel movies={upcomingMovies} />
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