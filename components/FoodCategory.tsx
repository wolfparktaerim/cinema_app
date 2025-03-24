import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Text } from '@/components/ThemedText';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Define the food item type
interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  calories?: number;
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
  onAddToCart?: (item: FoodItem) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4; // 40% of screen width

export default function FoodCategory({ category, onAddToCart }: FoodCategoryProps) {
  const colorScheme = useColorScheme();
  const [selectedItems, setSelectedItems] = useState<{[key: string]: number}>({});

  const handleAddToCart = (item: FoodItem) => {
    const currentCount = selectedItems[item.id] || 0;
    const newSelectedItems = {
      ...selectedItems,
      [item.id]: currentCount + 1
    };
    setSelectedItems(newSelectedItems);
    onAddToCart?.(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{category.name}</Text>
        <TouchableOpacity>
          <Text style={[styles.seeAllText, { color: Colors[colorScheme ?? 'light'].primary }]}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {category.items.map(item => (
          <View 
            key={item.id} 
            style={[
              styles.itemCard,
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].background,
                shadowColor: Colors[colorScheme ?? 'light'].text
              }
            ]}
          >
            <View style={styles.imageContainer}>
              <Image
                source={typeof item.image === 'string' ? { uri: item.image} : item.image}
                style={styles.itemImage}
                resizeMode="cover"
              />
              {item.calories && (
                <View style={styles.caloriesBadge}>
                  <Text style={styles.caloriesText}>{item.calories} Cal</Text>
                </View>
              )}
            </View>
            
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              
              <View style={styles.priceAndCartContainer}>
                <Text style={[
                  styles.itemPrice,
                  { color: Colors[colorScheme ?? 'light'].primary }
                ]}>
                  ${item.price.toFixed(2)}
                </Text>
                
                <View style={styles.quantityControl}>
                  {selectedItems[item.id] ? (
                    <>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => {
                          const currentCount = selectedItems[item.id];
                          if (currentCount > 1) {
                            setSelectedItems({
                              ...selectedItems,
                              [item.id]: currentCount - 1
                            });
                          } else {
                            const { [item.id]: removed, ...rest } = selectedItems;
                            setSelectedItems(rest);
                          }
                        }}
                      >
                        <FontAwesome name="minus" size={12} color="#666" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>
                        {selectedItems[item.id]}
                      </Text>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => handleAddToCart(item)}
                      >
                        <FontAwesome name="plus" size={12} color="#666" />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity 
                      style={[
                        styles.addButton,
                        { backgroundColor: Colors[colorScheme ?? 'light'].primary }
                      ]}
                      onPress={() => handleAddToCart(item)}
                    >
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  itemCard: {
    width: CARD_WIDTH,
    marginHorizontal: 5,
    borderRadius: 12,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: CARD_WIDTH * 1.1, // Slightly taller image
  },
  caloriesBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  caloriesText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  itemInfo: {
    padding: 12,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    height: 40, // Fixed height to prevent layout shifts
  },
  priceAndCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});