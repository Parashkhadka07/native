import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Sample notifications
const notifications = [
  { id: '1', title: 'Ride Completed', description: 'Your bike ride on 12 Dec 2025 has been completed.', icon: <MaterialIcons name="motorcycle" size={24} color="#ff0033" /> },
  { id: '2', title: 'Offer Activated', description: 'You have successfully activated the BIKE20 offer.', icon: <MaterialIcons name="local-offer" size={24} color="#ff0033" /> },
  { id: '3', title: 'Payment Received', description: 'Rs 400 payment received for your car ride.', icon: <MaterialIcons name="payment" size={24} color="#ff0033" /> },
  { id: '4', title: 'New Feature', description: 'Check out our new mini van booking feature.', icon: <MaterialIcons name="directions-car" size={24} color="#ff0033" /> },
  { id: '5', title: 'Ride Cancelled', description: 'Your truck ride on 09 Dec 2025 was cancelled.', icon: <MaterialIcons name="cancel" size={24} color="#ff0033" /> },
  { id: '6', title: 'Referral Bonus', description: 'You earned Rs 100 for referring a friend.', icon: <MaterialIcons name="card-giftcard" size={24} color="#ff0033" /> },
  { id: '7', title: 'Promo Alert', description: 'Weekend promo: Rs 30 off on bike rides.', icon: <MaterialIcons name="local-offer" size={24} color="#ff0033" /> },
  { id: '8', title: 'Ride Reminder', description: 'Your scheduled car ride is tomorrow at 10:00 AM.', icon: <MaterialIcons name="notifications-active" size={24} color="#ff0033" /> },
  { id: '9', title: 'Update', description: 'We updated our privacy policy.', icon: <MaterialIcons name="update" size={24} color="#ff0033" /> },
  { id: '10', title: 'Feedback Request', description: 'Please rate your recent mini van ride.', icon: <MaterialIcons name="feedback" size={24} color="#ff0033" /> },
];

export default function NotificationsScreen() {
  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <View style={styles.iconContainer}>{item.icon}</View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
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
  notificationCard: {
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
  title: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 3 },
  desc: { fontSize: 14, color: '#555' },
});
