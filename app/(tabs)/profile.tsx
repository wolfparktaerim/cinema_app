import React from 'react';
import { StyleSheet, View, Pressable, Text as RNText, Alert } from 'react-native';
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
  referralCode: 'JOHND2025', // Added referral code
  referralBonus: 500, // Points earned per successful referral
  successfulReferrals: 3, // Number of successful referrals
};

export default function ProfileScreen() {
  const router = useRouter();
  
  // Function to handle copying referral code
  const handleCopyReferral = () => {
    // In a real app, this would use Clipboard.setString(userData.referralCode)
    Alert.alert("Copied!", "Referral code copied to clipboard", [{ text: "OK" }]);
  };
  
  // Function to handle sharing referral code
  const handleShareReferral = () => {
    // In a real app, this would use Share.share()
    Alert.alert("Share", "Sharing referral code via...", [{ text: "OK" }]);
  };
  
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
        
        {/* Enhanced shine effect */}
        <View style={styles.shine} pointerEvents="none" />

        <View style={styles.viewBenefitsContainer}>
          <RNText style={styles.viewBenefitsText}>View My Benefits</RNText>
          <FontAwesome name="chevron-right" size={16} color={Colors.primary} />
        </View>
      </Pressable>

      {/* Referral Program Card */}
      <View style={styles.referralCard}>
        <View style={styles.referralHeader}>
          <FontAwesome name="gift" size={24} color={Colors.primary} />
          <RNText style={styles.referralTitle}>Refer a Friend</RNText>
        </View>
        
        <RNText style={styles.referralDescription}>
          Share your referral code and earn {userData.referralBonus} points for each friend who signs up!
        </RNText>
        
        <View style={styles.referralCodeContainer}>
          <View style={styles.referralCodeBox}>
            <RNText style={styles.referralCode}>{userData.referralCode}</RNText>
          </View>
          <Pressable style={styles.copyButton} onPress={handleCopyReferral}>
            <FontAwesome name="copy" size={18} color={Colors.white} />
          </Pressable>
        </View>
        
        <View style={styles.referralStats}>
          <View style={styles.statItem}>
            <RNText style={styles.statValue}>{userData.successfulReferrals}</RNText>
            <RNText style={styles.statLabel}>Friends Referred</RNText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <RNText style={styles.statValue}>{userData.successfulReferrals * userData.referralBonus}</RNText>
            <RNText style={styles.statLabel}>Points Earned</RNText>
          </View>
        </View>
        
        <Pressable style={styles.shareButton} onPress={handleShareReferral}>
          <FontAwesome name="share-alt" size={16} color={Colors.white} style={styles.shareIcon} />
          <RNText style={styles.shareText}>Share My Code</RNText>
        </Pressable>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {[
          {
            icon: 'history',
            title: 'My Watch List',
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
    paddingVertical: 35,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  profilePicContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  membershipBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  membershipBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  profileName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  membershipId: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
    marginTop: 4,
  },
  
  menuContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 15,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    marginRight: 18,
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
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    margin: 15,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 25,
  },
  logoutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  profilePic: {
    width: 90,  
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
    
  pointsCard: {
    margin: 15,
    padding: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 170, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    backgroundColor: Colors.white,
    position: 'relative',
    overflow: 'hidden',
    marginTop: -20,
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
    color: '#4A5568',
    letterSpacing: 0.5,
  },
  pointsValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2C5E91',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  progressContainer: {
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  progressBar: {
    height: 14,
    backgroundColor: 'rgba(150, 150, 170, 0.15)',
    borderRadius: 7,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 7,
  },
  progressText: {
    fontSize: 13,
    color: '#4A5568',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '500',
  },
  validityText: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
    marginTop: 18,
    fontStyle: 'italic',
  },
  shine: {
    position: 'absolute',
    top: -150,
    left: -100,
    width: 300,
    height: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    transform: [{ rotate: '45deg' }],
    opacity: 0.5,
  },
  viewBenefitsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  viewBenefitsText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginRight: 8,
  },
  // Referral card styles
  referralCard: {
    margin: 15,
    padding: 20,
    borderRadius: 18,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 170, 0.15)',
  },
  referralHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  referralTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 12,
  },
  referralDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 18,
    lineHeight: 20,
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  referralCodeBox: {
    flex: 1,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.2)',
  },
  referralCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    letterSpacing: 1,
  },
  copyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  referralStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(247, 249, 252, 0.8)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  shareButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  shareIcon: {
    marginRight: 10,
  },
  shareText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
});