import React from 'react';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { Text } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';

// Mock user data, in a real app this would come from API/state
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  membershipNo: 'CC12345678',
  points: 350,
  upcomingBookings: 2,
};

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  
  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={[
        styles.profileHeader, 
        { backgroundColor: Colors[colorScheme ?? 'light'].primary }
      ]}>
        <View style={styles.profilePicContainer}>
          <FontAwesome name="user-circle" size={80} color="white" />
        </View>
        <Text style={styles.profileName}>{userData.name}</Text>
        <Text style={styles.membershipId}>Membership No: {userData.membershipNo}</Text>
      </View>
      
      {/* Points Card */}
      <View style={[
        styles.card, 
        { backgroundColor: Colors[colorScheme ?? 'light'].background }
      ]}>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Cathay Points</Text>
          <Text style={[
            styles.pointsValue, 
            { color: Colors[colorScheme ?? 'light'].accent }
          ]}>{userData.points}</Text>
        </View>
        <Text style={styles.pointsInfo}>Valid until December 31, 2025</Text>
      </View>
      
      {/* Menu Items */}
      <View style={[
        styles.card, 
        { backgroundColor: Colors[colorScheme ?? 'light'].background }
      ]}>
        <MenuOption 
          icon="ticket" 
          title="My Bookings" 
          subtitle={`${userData.upcomingBookings} upcoming bookings`} 
        />
        <MenuOption 
          icon="history" 
          title="Booking History" 
          subtitle="View your past bookings" 
        />
        <MenuOption 
          icon="credit-card" 
          title="Payment Methods" 
          subtitle="Manage your payment options" 
        />
        <MenuOption 
          icon="bell" 
          title="Notifications" 
          subtitle="Manage your preferences" 
        />
        <MenuOption 
          icon="cog" 
          title="Settings" 
          subtitle="App preferences and account settings" 
        />
      </View>
      
      {/* Log Out Button */}
      <Pressable 
        style={[
          styles.logoutButton,
          { backgroundColor: Colors[colorScheme ?? 'light'].secondary }
        ]}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

// Helper component for menu options
function MenuOption({ icon, title, subtitle }) {
  const colorScheme = useColorScheme();
  
  return (
    <Pressable style={styles.menuOption}>
      <FontAwesome 
        name={icon} 
        size={24} 
        color={Colors[colorScheme ?? 'light'].primary} 
        style={styles.menuIcon} 
      />
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
      <FontAwesome name="chevron-right" size={16} color="#999" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    padding: 20,
    alignItems: 'center',
  },
  profilePicContainer: {
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  membershipId: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 5,
  },
  card: {
    margin: 15,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  pointsInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  logoutButton: {
    margin: 15,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});