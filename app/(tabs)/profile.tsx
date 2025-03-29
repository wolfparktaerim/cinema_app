import React from 'react';
import { StyleSheet, View, Pressable, Text as RNText } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';

import { useRouter } from 'expo-router';


const Colors = {
  primary: '#2C5E91',
  secondary: '#4A90E2',
  background: '#F7F9FC',
  white: '#FFFFFF',
  text: '#333333',
  gray: '#666666',
};

// Mock user data, in a real app this would come from API/state
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  membershipNo: 'CC12345678',
  membershipTier: 'Silver',
  points: 750,
  nextTierPoints: 1500,
  upcomingBookings: 2,
};

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profilePicContainer}>
          <Image
            source={require('../../assets/images/profile-placeholder.png')}
            style={styles.profilePic}
          />
          <View style={styles.membershipBadge}>
            <RNText style={styles.membershipBadgeText}>
              {userData.membershipTier}
            </RNText>
          </View>
        </View>
        <RNText style={styles.profileName}>{userData.name}</RNText>
        <RNText style={styles.membershipId}>
          Membership No: {userData.membershipNo}
        </RNText>
      </View>

      {/* Points Card */}
      <Pressable 
        style={styles.pointsCard}
        onPress={() => router.push('/membership')}
      >
        <View style={styles.pointsHeader}>
          <RNText style={styles.pointsTitle}>Cathay Points</RNText>
        </View>

        <RNText style={styles.pointsValue}>Silver Tier</RNText>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressIndicator,
                {
                  width: `${(userData.points / userData.nextTierPoints) * 100}%`
                }
              ]}
            />
          </View>
          <RNText style={styles.progressText}>
            {userData.points} / {userData.nextTierPoints} points to next tier
          </RNText>
        </View>

        <RNText style={styles.validityText}>
          Valid until December 31, 2025
        </RNText>
        
        {/* Subtle shine effect */}
        <View style={styles.shine} pointerEvents="none" />

      <View style={styles.viewBenefitsContainer}>
          <RNText style={styles.viewBenefitsText}>View My Benefits</RNText>
          <FontAwesome name="chevron-right" size={16} color={Colors.primary} />
        </View>
      </Pressable>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {[
          {
            icon: 'history',
            title: 'Booking History',
            subtitle: `View your past bookings`,
            route: '/my_booking' // Add route for navigation
          },
          {
            icon: 'credit-card',
            title: 'Payment Methods',
            subtitle: 'Manage your payment options'
          },
          {
            icon: 'bell',
            title: 'Notifications',
            subtitle: 'Manage your preferences'
          },
          {
            icon: 'cog',
            title: 'Settings',
            subtitle: 'App preferences and account settings'
          }
        ].map((item, index) => (
          <MenuOption
            key={item.title}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            route={item.route}
            isLast={index === 4}
          />
        ))}
      </View>

      {/* Log Out Button */}
      <Pressable style={styles.logoutButton}>
        <RNText style={styles.logoutText}>Log Out</RNText>
      </Pressable>
    </ScrollView>
  );
}

// Helper component for menu options
function MenuOption({ icon, title, subtitle, route, isLast }) {
  const router = useRouter();

  const handlePress = () => {
    if (route) {
      router.push(route);
    }
  };
  return (
    <Pressable style={[
      styles.menuOption,
      isLast ? styles.lastMenuItem : {}
      
    ]}
    onPress={handlePress}>
      
      <FontAwesome
        name={icon}
        size={24}
        color={Colors.primary}
        style={styles.menuIcon}
      />
      <View style={styles.menuTextContainer}>
        <RNText style={styles.menuTitle}>{title}</RNText>
        <RNText style={styles.menuSubtitle}>{subtitle}</RNText>
      </View>
      <FontAwesome name="chevron-right" size={16} color="#999" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileHeader: {
    backgroundColor: Colors.primary,
    paddingVertical: 30,
    alignItems: 'center',
  },
  profilePicContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  membershipBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  membershipBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 10,
  },
  membershipId: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
  },
  
 
  menuContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
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
    color: Colors.text,
  },
  menuSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 3,
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    margin: 15,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  profilePic: {
    width: 80,  
    height: 80,
    borderRadius: 40, 
  },
    
  pointsCard: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 170, 0.2)', // Subtle silver border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    // Add a metallic gradient effect
    backgroundColor: 'linear-gradient(145deg, #E6EAF0, #F9FBFF)',
  },
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A5568', // Deeper silver-gray
    letterSpacing: 0.5,
  },
  pointsValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2C5E91', // Keeping the original primary color
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: -1,
  },
  progressContainer: {
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.7)', // Slight white overlay
    borderRadius: 10,
    padding: 10,
  },
  progressBar: {
    height: 12,
    backgroundColor: 'rgba(150, 150, 170, 0.2)', // Silver-gray base
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: '#2C5E91', // Original primary color as progress fill
    borderRadius: 6,
  },
  progressText: {
    fontSize: 13,
    color: '#4A5568', // Silver-gray text
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  validityText: {
    fontSize: 12,
    color: '#718096', // Softer silver-gray
    textAlign: 'center',
    marginTop: 15,
    fontStyle: 'italic',
  },
  // Optional: Add a subtle shine effect (note: this is a simplified approximation)
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
    transform: [{ rotate: '45deg' }],
    opacity: 0.3,
  }
});