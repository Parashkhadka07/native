import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen({ navigation }) {
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth);
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>

      {/* USER CARD */}
      <View style={styles.userBox}>
        <Ionicons name="person-circle-outline" size={85} color="#ff0033" />
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.uid}>User ID: {user?.uid?.slice(0, 12)}...</Text>
      </View>

      {/* MENU ITEMS */}
      <View style={styles.menuBox}>

        {/* OFFERS */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Offers")}
        >
          <Ionicons name="pricetag-outline" size={26} color="#ff0033" />
          <Text style={styles.menuText}>Offers</Text>
          <Ionicons name="chevron-forward" size={22} color="#aaa" />
        </TouchableOpacity>

        {/* NOTIFICATIONS */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Ionicons name="notifications-outline" size={26} color="#ff0033" />
          <Text style={styles.menuText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={22} color="#aaa" />
        </TouchableOpacity>

      </View>

      {/* LOGOUT BUTTON */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },

  userBox: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
    marginTop: 50,        // ⬅⬅ PROFILE BOX MOVED DOWN FROM TOP
    marginBottom: 35,
  },

  email: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
    color: "#333",
  },

  uid: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },

  menuBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 2,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 17,
    color: "#222",
  },

  logoutBtn: {
    flexDirection: "row",
    backgroundColor: "#ff0033",
    padding: 15,
    borderRadius: 12,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
