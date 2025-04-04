import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from '@/components/ThemedText';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Define the event type
interface Event {
  id: string;
  title: string;
  type: string;
  poster: string;
}

// Props for the component
interface EventCarouselProps {
  events: Event[];
  onEventPress?: (eventId: string) => void;
  onBookPress?: (eventId: string) => void;
}

// Get screen dimensions for better scaling
const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.42; // Reduced width further from 0.45
const ITEM_HEIGHT = ITEM_WIDTH * 1.2; 

export default function EventCarousel({ 
  events, 
  onEventPress, 
  onBookPress 
}: EventCarouselProps) {
  const colorScheme = useColorScheme();
  // Track favorites state
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (eventId: string, event: any) => {
    // Stop event propagation to prevent triggering the event poster touch
    event.stopPropagation();
    
    setFavorites(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
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
      {events.map(event => (
        <View key={event.id} style={styles.eventCard}>
          <TouchableOpacity
            style={styles.posterTouchable}
            onPress={() => onEventPress?.(event.id)}
            activeOpacity={0.8}
          >
            <View style={styles.posterContainer}>
              <Image
                source={typeof event.poster === 'string' ? { uri: event.poster } : event.poster}
                style={styles.poster}
                resizeMode="cover"
              />
              {/* Heart toggle button */}
              <TouchableOpacity
                style={styles.heartButton}
                onPress={(e) => toggleFavorite(event.id, e)}
                activeOpacity={0.7}
              >
                <FontAwesome
                  name={favorites[event.id] ? "heart" : "heart-o"}
                  size={20}
                  color={favorites[event.id] ? "#ff4081" : "white"}
                />
              </TouchableOpacity>
              
              {/* Event type badge */}
              <View style={styles.eventTypeBadge}>
                <Text style={styles.eventTypeBadgeText}>{event.type}</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
              <Text style={styles.eventType}>{event.type}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.bookButton,
              { backgroundColor: Colors[colorScheme ?? 'light'].primary }
            ]}
            onPress={() => onBookPress?.(event.id)}
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
  eventCard: {
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
  eventTypeBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventTypeBadgeText: {
    color: 'white',
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
  eventType: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
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