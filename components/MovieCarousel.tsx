import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Text } from '@/components/ThemedText';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


// Define the movie type
interface Movie {
  id: string;
  title: string;
  rating: number;
  poster: string;
}

// Props for the component
interface MovieCarouselProps {
  movies: Movie[];
  onMoviePress?: (movieId: string) => void;
  onBookPress?: (movieId: string) => void;
}

// Get screen dimensions for better scaling
const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.45; // Reduced width
const ITEM_HEIGHT = ITEM_WIDTH * 1.2; // Adjusted height


export default function MovieCarousel({ 
  movies, 
  onMoviePress, 
  onBookPress 
}: MovieCarouselProps) {
  const colorScheme = useColorScheme();
  // Track favorites state
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (movieId: string, event: any) => {
    // Stop event propagation to prevent triggering the poster touch
    event.stopPropagation();
    
    setFavorites(prev => ({
      ...prev,
      [movieId]: !prev[movieId]
    }));
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      snapToInterval={ITEM_WIDTH + 20}
      decelerationRate="fast"
    >
      {movies.map(movie => (
        <View key={movie.id} style={styles.movieCard}>
          <TouchableOpacity
            style={styles.posterTouchable}
            onPress={() => onMoviePress?.(movie.id)}
            activeOpacity={0.8}
          >
            <View style={styles.posterContainer}>
              <Image
                source={typeof movie.poster === 'string' ? { uri: movie.poster } : movie.poster}
                style={styles.poster}
                resizeMode="cover"
              />
              {/* Heart toggle button */}
              <TouchableOpacity
                style={styles.heartButton}
                onPress={(e) => toggleFavorite(movie.id, e)}
                activeOpacity={0.7}
              >
                <FontAwesome
                  name={favorites[movie.id] ? "heart" : "heart-o"}
                  size={20}
                  color={favorites[movie.id] ? "#ff4081" : "white"}
                />
              </TouchableOpacity>
              <View style={styles.ratingBadge}>
                <FontAwesome
                  name="star"
                  size={12}
                  color="#FFD700"
                />
                <Text style={styles.ratingText}>{movie.rating.toFixed(1)}</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.bookButton,
              { backgroundColor: Colors[colorScheme ?? 'light'].primary }
            ]}
            onPress={() => onBookPress?.(movie.id)}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  movieCard: {
    width: ITEM_WIDTH,
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  posterTouchable: {
    flex: 1,
  },
  posterContainer: {
    position: 'relative',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: ITEM_HEIGHT,
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: 'white',
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 12,
    paddingBottom: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    minHeight: 40,
    maxHeight: 48,
  },
  bookButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});