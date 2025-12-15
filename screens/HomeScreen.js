import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Keyboard,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

// Vehicle icons
import BikeIcon from '../assets/bike.png';
import CarIcon from '../assets/car.png';
import VanIcon from '../assets/van.png';
import TruckIcon from '../assets/truck.png';
import ProfileIcon from '../assets/profile.png';

// Hardcoded popular locations
const LOCATIONS = {
  Thamel: { latitude: 27.7149, longitude: 85.3080 },
  'Patan Durbar Square': { latitude: 27.6720, longitude: 85.3240 },
  'Bhaktapur Durbar Square': { latitude: 27.6718, longitude: 85.4291 },
  Pashupatinath: { latitude: 27.7105, longitude: 85.3489 },
  Boudhanath: { latitude: 27.7215, longitude: 85.3620 },
  Swayambhunath: { latitude: 27.7149, longitude: 85.2900 },
  Gausala: { latitude: 27.7055, longitude: 85.3239 },
  Koteshwor: { latitude: 27.6956, longitude: 85.3311 },
  Maitighar: { latitude: 27.7011, longitude: 85.3152 },
  Lagankhel: { latitude: 27.6670, longitude: 85.3230 },
};

// Vehicle fares per km
const FARES = {
  Bike: 50,
  Car: 100,
  'Mini Van': 150,
  Truck: 200,
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const mapRef = useRef();
  const slideAnim = useRef(new Animated.Value(-250)).current;

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);
  const [destInput, setDestInput] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [adjustedFare, setAdjustedFare] = useState(null);
  const [realFare, setRealFare] = useState(null);
  const [fareFloor, setFareFloor] = useState(null);
  const [fareCeiling, setFareCeiling] = useState(null);

  const vehicles = [
    { name: 'Bike', icon: BikeIcon },
    { name: 'Car', icon: CarIcon },
    { name: 'Mini Van', icon: VanIcon },
    { name: 'Truck', icon: TruckIcon },
  ];

  // Get current location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  // Handle vehicle selection
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setAdjustedFare(null);
    setRealFare(null);
    setRouteCoords([]);
    setDestination(null);
    setDistance(null);
    setDestInput('');
    slideAnim.setValue(-250);
  };

  // Handle destination input and route
  const fetchDestination = () => {
    if (!selectedVehicle) {
      alert('Please select a vehicle first!');
      return;
    }

    Keyboard.dismiss();
    const input = destInput.trim().toLowerCase();
    const destKey = Object.keys(LOCATIONS).find(
      (key) => key.toLowerCase() === input
    );

    if (!destKey) {
      alert('Destination not found.');
      return;
    }

    const destCoords = LOCATIONS[destKey];
    setDestination(destCoords);

    if (origin) {
      const line = [
        { latitude: origin.latitude, longitude: origin.longitude },
        { latitude: destCoords.latitude, longitude: destCoords.longitude },
      ];
      setRouteCoords(line);

      // Distance in km
      const R = 6371;
      const dLat = ((destCoords.latitude - origin.latitude) * Math.PI) / 180;
      const dLon = ((destCoords.longitude - origin.longitude) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((origin.latitude * Math.PI) / 180) *
          Math.cos((destCoords.latitude * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      setDistance(d.toFixed(2));

      // Set fares
      const baseFare = d * FARES[selectedVehicle];
      setRealFare(baseFare.toFixed(0));
      setAdjustedFare(baseFare.toFixed(0));
      setFareFloor((baseFare * 0.8).toFixed(0));
      setFareCeiling((baseFare * 1.2).toFixed(0));

      // Fit map
      if (mapRef.current) {
        mapRef.current.fitToCoordinates([origin, destCoords], {
          edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
          animated: true,
        });
      }

      // Show slide-up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  // Adjust fare by +10/-10 with limits
  const adjustFare = (type) => {
    let newFare = Number(adjustedFare);
    if (type === '+') {
      newFare = Math.min(fareCeiling, newFare + 10);
    } else {
      newFare = Math.max(fareFloor, newFare - 10);
    }
    setAdjustedFare(newFare);
  };

  const applyFare = () => {
    setRealFare(adjustedFare);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top row */}
      <View style={styles.topRow}>
        <View style={{ width: 35 }} />
        <Text style={styles.appName}>Hamro Guruji</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={ProfileIcon} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Choose Vehicle</Text>

      {/* Vehicle selection */}
      <View style={styles.vehicleContainer}>
        {vehicles.map((v) => {
          const isSelected = selectedVehicle === v.name;
          return (
            <TouchableOpacity
              key={v.name}
              style={[
                styles.vehicleButton,
                isSelected && {
                  borderColor: '#ff0033',
                  borderWidth: 2,
                  shadowColor: '#ff0033',
                  shadowOpacity: 0.7,
                  shadowRadius: 5,
                },
              ]}
              onPress={() => handleVehicleSelect(v.name)}
            >
              <Image source={v.icon} style={styles.vehicleIcon} />
              <Text style={styles.vehicleText}>{v.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Destination input */}
      <View style={styles.destContainer}>
        <TextInput
          style={styles.destInput}
          placeholder="Enter destination (e.g., Thamel)"
          value={destInput}
          onChangeText={setDestInput}
        />
        <TouchableOpacity style={styles.destButton} onPress={fetchDestination}>
          <Text style={styles.destButtonText}>Go</Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
      {origin && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={origin}
          showsUserLocation
        >
          <Marker coordinate={origin} title="Pickup" pinColor="blue" />
          {destination && (
            <Marker coordinate={destination} title="Destination" pinColor="red" />
          )}
          {routeCoords.length > 0 && (
            <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="#ff0033" />
          )}
        </MapView>
      )}

      {/* Slide-up panel */}
      <Animated.View style={[styles.slideUp, { bottom: slideAnim }]}>
        {destination && selectedVehicle && (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Pickup:</Text>
              <Text style={styles.value}>Current Location</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Destination:</Text>
              <Text style={styles.value}>{destInput}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Vehicle:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={vehicles.find((v) => v.name === selectedVehicle).icon}
                  style={{ width: 30, height: 30, marginRight: 5 }}
                />
                <Text style={styles.value}>{selectedVehicle}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Fare:</Text>
              <Text style={styles.value}>Rs {realFare}</Text>
            </View>

            {/* Bottom controls */}
            <View style={styles.bottomControls}>
              <TouchableOpacity style={styles.requestBtn} onPress={() => alert('Rider requested!')}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Request Rider</Text>
              </TouchableOpacity>

              <View style={styles.priceAdjustContainer}>
                <TouchableOpacity style={styles.adjustBtn} onPress={() => adjustFare('-')}>
                  <Text style={styles.adjustText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.adjustedFare}>Rs {adjustedFare}</Text>
                <TouchableOpacity style={styles.adjustBtn} onPress={() => adjustFare('+')}>
                  <Text style={styles.adjustText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyBtn} onPress={applyFare}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  appName: { color: '#ff0033', fontSize: 28, fontWeight: 'bold' },
  profileIcon: { width: 35, height: 35 },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 20, textAlign: 'center' },
  vehicleContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  vehicleButton: {
    alignItems: 'center',
    width: '40%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  vehicleIcon: { width: 60, height: 60, marginBottom: 5 },
  vehicleText: { fontSize: 14, fontWeight: 'bold' },
  destContainer: { flexDirection: 'row', marginVertical: 10 },
  destInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 16,
  },
  destButton: {
    backgroundColor: '#ff0033',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 8,
  },
  destButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  map: { width: '100%', height: Dimensions.get('window').height * 0.35, borderRadius: 10, marginTop: 10 },
  slideUp: {
    position: 'absolute',
    left: 15,
    right: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { fontWeight: 'bold', fontSize: 16, color: '#555' },
  value: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  bottomControls: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' },
  requestBtn: { backgroundColor: '#ff0033', padding: 12, borderRadius: 10 },
  priceAdjustContainer: { flexDirection: 'row', alignItems: 'center' },
  adjustBtn: { backgroundColor: '#ccc', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 5, marginHorizontal: 5 },
  adjustText: { fontSize: 18, fontWeight: 'bold' },
  adjustedFare: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 5 },
  applyBtn: { backgroundColor: '#ff0033', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 5, marginLeft: 10 },
});
