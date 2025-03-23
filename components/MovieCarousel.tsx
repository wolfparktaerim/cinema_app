import React from 'react';
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
}

// Get screen dimensions for better scaling
const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.6; // Reduced from 0.7 to 0.6
const ITEM_HEIGHT = ITEM_WIDTH * 1.3; // Reduced from 1.5 to 1.3

export default function MovieCarousel({ movies, onMoviePress }: MovieCarouselProps) {
  const colorScheme = useColorScheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      snapToInterval={ITEM_WIDTH + 20} // Snap to each card
      decelerationRate="fast"
    >
      {movies.map(movie => (
        <TouchableOpacity
          key={movie.id}
          style={styles.movieCard}
          onPress={() => onMoviePress?.(movie.id)}
          activeOpacity={0.8}
        >
          <View style={styles.posterContainer}>
            <Image
              source={typeof movie.poster === 'string' ? { uri: movie.poster } : movie.poster}
              style={styles.poster}
              resizeMode="cover"
            />
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
            <TouchableOpacity
              style={[
                styles.bookButton,
                { backgroundColor: Colors[colorScheme ?? 'light'].primary }
              ]}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    height: 40, // Fixed height for consistency
  },
  bookButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});