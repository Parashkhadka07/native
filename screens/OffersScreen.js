import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

// Sample 10 offers data
const offers = [
  { id: '1', title: 'Flat 20% Off on Bike Rides', description: 'Use code BIKE20 on all bike rides', icon: <FontAwesome5 name="motorcycle" size={30} color="#ff0033" /> },
  { id: '2', title: 'Car Ride Discount', description: 'Flat Rs 50 off on your first 3 car rides', icon: <FontAwesome5 name="car" size={30} color="#ff0033" /> },
  { id: '3', title: 'Mini Van Group Ride Offer', description: 'Flat Rs 100 off on group trips', icon: <MaterialCommunityIcons name="van-passenger" size={30} color="#ff0033" /> },
  { id: '4', title: 'Truck Goods Transport Discount', description: 'Flat Rs 200 off on your first transport', icon: <FontAwesome5 name="truck" size={30} color="#ff0033" /> },
  { id: '5', title: 'Weekend Special Bike Offer', description: 'Rs 30 off on bike rides during weekends', icon: <FontAwesome5 name="motorcycle" size={30} color="#ff0033" /> },
  { id: '6', title: 'Car Pool Savings', description: 'Rs 40 off when sharing a car ride', icon: <FontAwesome5 name="car" size={30} color="#ff0033" /> },
  { id: '7', title: 'Mini Van Family Trip', description: 'Rs 150 off for family trips', icon: <MaterialCommunityIcons name="van-passenger" size={30} color="#ff0033" /> },
  { id: '8', title: 'Truck Express Delivery', description: 'Rs 100 discount for express delivery', icon: <FontAwesome5 name="truck" size={30} color="#ff0033" /> },
  { id: '9', title: 'Festival Offer', description: 'Flat Rs 50 off during festival week', icon: <FontAwesome5 name="gift" size={30} color="#ff0033" /> },
  { id: '10', title: 'Refer a Friend', description: 'Get Rs 100 ride credit for each referral', icon: <FontAwesome5 name="user-friends" size={30} color="#ff0033" /> },
];

export default function OffersScreen() {
  const renderOffer = ({ item }) => (
    <View style={styles.offerCard}>
      <View style={styles.iconContainer}>{item.icon}</View>
      <View style={styles.offerInfo}>
        <Text style={styles.offerTitle}>{item.title}</Text>
        <Text style={styles.offerDesc}>{item.description}</Text>
        <TouchableOpacity style={styles.redeemBtn}>
          <Text style={styles.redeemText}>Redeem</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    
    <View style={styles.container}>
      
      <Text style={styles.header}>Current Offers</Text>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={renderOffer}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 30, // More top space
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  offerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    overflow: 'hidden',
  },
  iconContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // White background
  },
  offerInfo: {
    flex: 1,
    padding: 15,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  offerDesc: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  redeemBtn: {
    backgroundColor: '#ff0033',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  redeemText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
