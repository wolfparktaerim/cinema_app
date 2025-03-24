import React from 'react';
import { StyleSheet, View, Pressable, Text as RNText } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';

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
  points: 350,
  nextTierPoints: 1000,
  upcomingBookings: 2,
};

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profilePicContainer}>
          <Image
            source={require('../assets/images/profile-placeholder.png')}
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
      <View style={styles.pointsCard}>
        <View style={styles.pointsHeader}>
          <RNText style={styles.pointsTitle}>Cathay Points</RNText>
        </View>

        <RNText style={styles.pointsValue}>{userData.points}</RNText>

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
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {[
          {
            icon: 'ticket',
            title: 'My Bookings',
            subtitle: `${userData.upcomingBookings} upcoming bookings`
          },
          {
            icon: 'history',
            title: 'Booking History',
            subtitle: 'View your past bookings'
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
function MenuOption({ icon, title, subtitle, isLast }) {
  return (
    <Pressable style={[
      styles.menuOption,
      isLast ? styles.lastMenuItem : {}
    ]}>
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
  pointsCard: {
    backgroundColor: Colors.white,
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  pointsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 15,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  progressText: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 5,
  },
  validityText: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 15,
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
});