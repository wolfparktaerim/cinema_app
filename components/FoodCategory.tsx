import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import { Text } from '@/components/ThemedText';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Define the food item type
interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

// Define the category type
interface FoodCategoryType {
  id: string;
  name: string;
  items: FoodItem[];
}

// Props for the component
interface FoodCategoryProps {
  category: FoodCategoryType;
}

export default function FoodCategory({ category }: FoodCategoryProps) {
  const colorScheme = useColorScheme();
  
  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{category.name}</Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {category.items.map(item => (
          <View key={item.id} style={[
            styles.itemCard,
            { backgroundColor: Colors[colorScheme ?? 'light'].background }
          ]}>
            <Image
               source={typeof item.image === 'string' ? { uri: item.image} : item.image}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={[
                styles.itemPrice,
                { color: Colors[colorScheme ?? 'light'].primary }
              ]}>
                ${item.price.toFixed(2)}
              </Text>
              <TouchableOpacity style={[
                styles.addButton,
                { backgroundColor: Colors[colorScheme ?? 'light'].primary }
              ]}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  itemCard: {
    width: 160,
    marginHorizontal: 5,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: 120,
  },
  itemInfo: {
    padding: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});