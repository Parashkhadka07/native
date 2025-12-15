import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Import PNGs from assets
import HomeIcon from "../assets/home.png";
import OffersIcon from "../assets/discount.png";
import ActivityIcon from "../assets/activity.png";
import NotificationsIcon from "../assets/notification.png";

export default function BottomNav() {
  const navigation = useNavigation();
  const route = useRoute();

  const tabs = [
    { name: "Home", route: "Home", icon: HomeIcon },
    { name: "Offers", route: "Offers", icon: OffersIcon },
    { name: "Activity", route: "Activity", icon: ActivityIcon },
    { name: "Notifications", route: "Notifications", icon: NotificationsIcon },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = route.name === tab.route;
        const tintColor = isActive ? "#ff0033" : "#555";

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => navigation.navigate(tab.route)}
          >
            <Image
              source={tab.icon}
              style={[styles.icon, { tintColor }]}
              resizeMode="contain"
            />
            <Text style={[styles.tabText, { color: tintColor }]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
