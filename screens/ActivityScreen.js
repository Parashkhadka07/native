import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Sample past activity data
const activities = [
  { id: '1', type: 'Bike', date: '12 Dec 2025', fare: 'Rs 150', icon: <FontAwesome5 name="motorcycle" size={24} color="#ff0033" /> },
  { id: '2', type: 'Car', date: '11 Dec 2025', fare: 'Rs 400', icon: <FontAwesome5 name="car" size={24} color="#ff0033" /> },
  { id: '3', type: 'Mini Van', date: '10 Dec 2025', fare: 'Rs 600', icon: <FontAwesome5 name="car-side" size={24} color="#ff0033" /> },
  { id: '4', type: 'Truck', date: '09 Dec 2025', fare: 'Rs 800', icon: <FontAwesome5 name="truck" size={24} color="#ff0033" /> },
  { id: '5', type: 'Bike', date: '08 Dec 2025', fare: 'Rs 120', icon: <FontAwesome5 name="motorcycle" size={24} color="#ff0033" /> },
  { id: '6', type: 'Car', date: '07 Dec 2025', fare: 'Rs 350', icon: <FontAwesome5 name="car" size={24} color="#ff0033" /> },
  { id: '7', type: 'Mini Van', date: '06 Dec 2025', fare: 'Rs 500', icon: <FontAwesome5 name="car-side" size={24} color="#ff0033" /> },
  { id: '8', type: 'Truck', date: '05 Dec 2025', fare: 'Rs 750', icon: <FontAwesome5 name="truck" size={24} color="#ff0033" /> },
  { id: '9', type: 'Bike', date: '04 Dec 2025', fare: 'Rs 100', icon: <FontAwesome5 name="motorcycle" size={24} color="#ff0033" /> },
  { id: '10', type: 'Car', date: '03 Dec 2025', fare: 'Rs 300', icon: <FontAwesome5 name="car" size={24} color="#ff0033" /> },
];

export default function ActivityScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.activityCard}>
      <View style={styles.iconContainer}>{item.icon}</View>
      <View style={styles.infoContainer}>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.fare}>{item.fare}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Past Rides & Trips</Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
    paddingTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 15,
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffe6e6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoContainer: { flex: 1 },
  type: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  date: { fontSize: 14, color: '#555', marginTop: 3 },
  fare: { fontSize: 16, fontWeight: 'bold', color: '#ff0033' },
});
