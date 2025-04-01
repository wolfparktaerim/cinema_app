import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  ScrollView, 
  Pressable,
  ImageBackground
} from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const CARD_SPACING = 15;

const Colors = {
  bronze: '#CD7F32',
  bronzeDark: '#8B4513',
  silver: '#E0E0E0',
  silverDark: '#A0A0A0',
  gold: '#FFD700',
  goldDark: '#DAA520',
  platinum: '#E5E4E2',
  platinumDark: '#AAAAAA',
  primary: '#0055A5', // Changed to Cathay blue
  secondary: '#0078D7', // Lighter blue for secondary elements
  background: '#F5F5F5',
  white: '#FFFFFF',
  dark: '#2C3E50',
  accent: '#FF9500', // Changed to a more complementary accent color
  lightGrey: '#F0F0F0',
  textLight: '#333333', // For better text visibility
};

const membershipTiers = [
  {
    name: 'Bronze',
    color: Colors.bronze,
    colorDark: Colors.bronzeDark,
    icon: 'ticket',
    points: 0,
    benefits: [
      'Standard ticket booking',
      'Small popcorn discount (10%)',
      'Earn 1 point per $1 spent',
      'Birthday free ticket'
    ],
    minPoints: 0,
    maxPoints: 500
  },
  {
    name: 'Silver',
    color: Colors.silver,
    colorDark: Colors.silverDark,
    icon: 'film',
    points: 750,
    benefits: [
      'Priority ticket booking',
      'Free small popcorn once a month',
      'Earn 1.5 points per $1 spent',
      'Birthday free ticket + snack combo',
      '2 free premium screenings per year'
    ],
    minPoints: 500,
    maxPoints: 1500
  },
  {
    name: 'Gold',
    color: Colors.gold,
    colorDark: Colors.goldDark,
    icon: 'star',
    points: 2000,
    benefits: [
      'Advanced ticket booking (3 days)',
      'Free medium popcorn & drink combo monthly',
      'Earn 2 points per $1 spent',
      'Access to exclusive premieres',
      'Free upgrades to premium seating',
      '4 free premium screenings per year'
    ],
    minPoints: 1500,
    maxPoints: 3000
  },
  {
    name: 'Platinum',
    color: Colors.platinum,
    colorDark: Colors.platinumDark,
    icon: 'trophy',
    points: 3500,
    benefits: [
      'Advanced ticket booking (7 days)',
      'Free large combo monthly',
      'Earn 3 points per $1 spent',
      'VIP lounge access at flagship locations',
      'Complimentary ticket for a friend (monthly)',
      'Unlimited premium screenings',
      'Invitation to director Q&As and events'
    ],
    minPoints: 3000,
    maxPoints: 5000
  }
];

const userVouchers = [
  {
    id: 'v1',
    title: 'Free Large Popcorn',
    expiry: '15 Apr 2025',
    used: false,
    icon: 'cutlery'
  },
  {
    id: 'v2',
    title: 'Buy 1 Get 1 Free Ticket',
    expiry: '30 Apr 2025',
    used: false,
    icon: 'ticket'
  },
  {
    id: 'v3',
    title: '50% Off Premium Screening',
    expiry: '10 May 2025',
    used: false,
    icon: 'film'
  },
  {
    id: 'v4',
    title: 'Free Nachos',
    expiry: '25 Apr 2025',
    used: true,
    icon: 'cutlery'
  }
];

export default function MembershipTiersScreen() {
  const router = useRouter();

  const renderTierCard = (tier, index) => {
    return (
      <View key={tier.name} style={[styles.tierCardContainer, { marginRight: index === membershipTiers.length - 1 ? 0 : CARD_SPACING }]}>
        <View style={[styles.tierCard, { backgroundColor: tier.color }]}>
          {/* Card header with tier name and shine effect */}
          <View style={styles.cardShineEffect} />
          
          <View style={styles.tierCardHeader}>
            <View>
              <Text style={styles.tierName}>{tier.name}</Text>
              <Text style={styles.tierSubtitle}>Membership</Text>
            </View>
            <View style={styles.iconContainer}>
              <FontAwesome name={tier.icon} size={24} color={Colors.dark} />
            </View>
          </View>

          <View style={styles.benefitsContainer}>
            {tier.benefits.map((benefit, idx) => (
              <View key={idx} style={styles.benefitRow}>
                <FontAwesome name="check-circle" size={16} color={Colors.dark} style={styles.benefitIcon} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>

          <View style={styles.tierPointsContainer}>
            <Text style={styles.tierPointsLabel}>Points Required</Text>
            <Text style={styles.tierPointsText}>
              {tier.minPoints} - {tier.maxPoints === 5000 ? tier.maxPoints + '+' : tier.maxPoints}
            </Text>
          </View>
          
          {/* Decorative pattern */}
          <View style={styles.cardPattern}>
            {[...Array(4)].map((_, i) => (
              <View key={i} style={[styles.patternCircle, { opacity: 0.1 - (i * 0.02) }]} />
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderVoucher = (voucher) => {
    return (
      <Pressable 
        key={voucher.id} 
        style={[styles.voucherCard, voucher.used && styles.usedVoucher]}
        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
      >
        <View style={[styles.voucherIconContainer, { backgroundColor: voucher.used ? Colors.lightGrey : 'rgba(0,85,165,0.1)' }]}>
          <FontAwesome name={voucher.icon} size={24} color={voucher.used ? Colors.dark : Colors.primary} />
        </View>
        <View style={styles.voucherContent}>
          <Text style={[styles.voucherTitle, voucher.used && styles.usedVoucherText]}>{voucher.title}</Text>
          <Text style={[styles.voucherExpiry, voucher.used && styles.usedVoucherText]}>
            {voucher.used ? 'USED' : `Expires: ${voucher.expiry}`}
          </Text>
        </View>
        <FontAwesome 
          name={voucher.used ? 'check-circle' : 'chevron-right'} 
          size={18} 
          color={voucher.used ? '#888' : Colors.primary} 
        />
      </Pressable>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cinema Elite</Text>
        <Text style={styles.headerSubtitle}>Membership Tiers</Text>
        <View style={styles.headerDecoration} />
      </View>

      {/* Tier Progress Section */}
      <View style={styles.progressSection}>
        <Text style={styles.currentTierText}>Your Current Tier: Silver</Text>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressIndicator, { width: '50%' }]} />
          </View>
          <View style={styles.progressMarkers}>
            {membershipTiers.map((tier, index) => (
              <View key={index} style={styles.markerContainer}>
                <View style={[
                  styles.marker, 
                  { backgroundColor: tier.minPoints <= 750 ? Colors.primary : Colors.dark }
                ]} />
                <Text style={[
                  styles.markerLabel,
                  { color: tier.minPoints <= 750 ? Colors.primary : Colors.dark }
                ]}>
                  {tier.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.progressText}>
          750 / 1500 points to Gold Tier
        </Text>
      </View>

      {/* Membership Tiers */}
      <View style={styles.tiersSection}>
        <View style={styles.sectionTitleContainer}>
          <FontAwesome name="star" size={18} color={Colors.primary} style={styles.sectionTitleIcon} />
          <Text style={styles.sectionTitle}>Membership Tiers</Text>
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + CARD_SPACING}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContainer}
        >
          {membershipTiers.map(renderTierCard)}
        </ScrollView>
      </View>

      {/* Your Vouchers */}
      <View style={styles.vouchersSection}>
        <View style={styles.sectionTitleContainer}>
          <FontAwesome name="ticket" size={18} color={Colors.primary} style={styles.sectionTitleIcon} />
          <Text style={styles.sectionTitle}>Your Vouchers</Text>
        </View>
        <View style={styles.vouchersContainer}>
          {userVouchers.map(renderVoucher)}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <Pressable style={[styles.actionButton, styles.primaryActionButton]} android_ripple={{ color: 'rgba(255,255,255,0.2)' }}>
          <FontAwesome name="exchange" size={18} color={Colors.white} style={styles.actionButtonIcon} />
          <Text style={styles.actionButtonText}>Redeem Points</Text>
        </Pressable>
        
        <Pressable style={[styles.actionButton, styles.secondaryActionButton]} android_ripple={{ color: 'rgba(0,85,165,0.1)' }}>
          <FontAwesome name="history" size={18} color={Colors.primary} style={styles.actionButtonIcon} />
          <Text style={[styles.actionButtonText, { color: Colors.primary }]}>View History</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  headerDecoration: {
    position: 'absolute',
    width: SCREEN_WIDTH * 1.5,
    height: SCREEN_WIDTH * 1.5,
    borderRadius: SCREEN_WIDTH * 0.75,
    backgroundColor: 'rgba(255,255,255,0.1)',
    bottom: -SCREEN_WIDTH,
    alignSelf: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: Colors.white,
    fontSize: 16,
    opacity: 0.9,
    marginTop: 5,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitleIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  tiersSection: {
    marginBottom: 15,
  },
  carouselContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tierCardContainer: {
    width: CARD_WIDTH,
    height: 420, // Increase from 380 to give more space
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  tierCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
  },
  cardShineEffect: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 100,
    transform: [{ rotate: '45deg' }],
  },
  cardPattern: {
    position: 'absolute',
    bottom: -20,
    right: -20,
  },
  patternCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 15,
    borderColor: Colors.dark,
    bottom: 0,
    right: 0,
  },
  tierCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tierName: {
    color: Colors.textLight,
    fontSize: 26,
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tierSubtitle: {
    color: Colors.textLight,
    fontSize: 14,
    fontWeight: '600',
  },
  benefitsContainer: {
    marginVertical: 15,
    zIndex: 2,
    maxHeight: 180, // Set a maximum height
    overflow: 'scroll', // Make it scrollable
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, // Reduce from 12 to 8
  },
  benefitIcon: {
    marginRight: 10,
  },
  benefitText: {
    color: Colors.textLight,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  tierPointsContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15,
    zIndex: 2,  // Already there, but make sure it's set to 2 or higher
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  tierPointsLabel: {
    color: Colors.dark,  // Change to darker color
    fontSize: 12,
    fontWeight: '600',
  },
  tierPointsText: {
    color: Colors.dark,  // Change to darker color
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressSection: {
    backgroundColor: Colors.white,
    padding: 20,
    margin: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  currentTierText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 15,
  },
  progressBarContainer: {
    marginVertical: 10,
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
  progressMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  markerLabel: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 14,
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  vouchersContainer: {
    paddingHorizontal: 15,
  },
  voucherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  usedVoucher: {
    backgroundColor: '#F8F8F8',
    opacity: 0.7,
  },
  voucherIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  voucherContent: {
    flex: 1,
  },
  voucherTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  voucherExpiry: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 4,
  },
  usedVoucherText: {
    color: '#888',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 30,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryActionButton: {
    backgroundColor: Colors.primary,
    marginRight: 8,
  },
  secondaryActionButton: {
    backgroundColor: Colors.white,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  actionButtonIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});