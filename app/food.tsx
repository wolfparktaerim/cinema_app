import React from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';

import { Text } from '@/components/ThemedText';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FoodCategory from '@/components/FoodCategory';

const popcorn_m = require('../assets/food/popcorn_m.jpg');
const popcorn_l = require('../assets/food/popcorn_l.jpg');
const popcorn_c = require('../assets/food/popcorn_c.png');
const cola_m = require('../assets/food/cocacola_m.webp');
const sprite_m = require('../assets/food/sprite_m.jpeg');
const nacho = require('../assets/food/nacho.webp');
const hotdog = require('../assets/food/hotdog.jpg');
const nuggets = require('../assets/food/nuggets.png');
const combo_1 = require('../assets/food/combo_1.jpeg');
const combo_2 = require('../assets/food/combo_2.jpeg');



// Sample data for now
const foodCategories = [
  {
    id: '1',
    name: 'Popcorn',
    items: [
      { id: '101', name: 'Regular Popcorn', price: 5.50, image: popcorn_m  },
      { id: '102', name: 'Large Popcorn', price: 7.50, image: popcorn_l  },
      { id: '103', name: 'Caramel Popcorn', price: 6.50, image:  popcorn_c },
    ]
  },
  {
    id: '2',
    name: 'Drinks',
    items: [
      { id: '201', name: 'Coca-Cola (M)', price: 4.00, image: cola_m },
      { id: '202', name: 'Coca-Cola (L)', price: 5.00, image: cola_m },
      { id: '203', name: 'Sprite (M)', price: 4.00, image: sprite_m },
      { id: '204', name: 'Sprite (L)', price: 5.00, image: sprite_m },
    ]
  },
  {
    id: '3',
    name: 'Snacks',
    items: [
      { id: '301', name: 'Nachos', price: 8.50, image: nacho },
      { id: '302', name: 'Hot Dog', price: 6.00, image: hotdog },
      { id: '303', name: 'Chicken Nuggets', price: 7.50, image:nuggets },
    ]
  },
  {
    id: '4',
    name: 'Combos',
    items: [
      { id: '401', name: 'Regular Popcorn + Drink', price: 10.00, image: combo_1 },
      { id: '402', name: 'Ultimate Movie Feast (Popcorn, Drink, Nachos)', price: 15.00, image: combo_2 },
    ]
  },
];

export default function FoodScreen() {
  const colorScheme = useColorScheme();
  
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={[
        styles.header, 
        { backgroundColor: Colors[colorScheme ?? 'light'].primary }
      ]}>
        <Text style={styles.headerTitle}>Food & Drinks</Text>
        <Text style={styles.headerSubtitle}>Enhance Your Movie Experience</Text>
      </View>
      
      {/* Food Categories */}
      {foodCategories.map(category => (
        <FoodCategory key={category.id} category={category} />
      ))}
      
      {/* Notice */}
      <View style={[
        styles.notice, 
        { backgroundColor: Colors[colorScheme ?? 'light'].lightGray }
      ]}>
        <Text style={styles.noticeText}>
          Pre-order your food and drinks on the app to avoid queues!
        </Text>
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
  notice: {
    margin: 15,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  noticeText: {
    textAlign: 'center',
    fontSize: 16,
  },
});