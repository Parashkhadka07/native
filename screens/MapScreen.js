import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { Ionicons } from '@expo/vector-icons';

// Replace with your Google Maps Directions API Key
const GOOGLE_MAPS_APIKEY = 'YOUR_GOOGLE_MAPS_API_KEY';

export default function MapScreen() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState('');
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [distance, setDistance] = useState(null);

  const mapRef = useRef();

  // Get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  // Simple destination geocoding using Expo Location
  const searchDestination = async () => {
    if (!destination) return;

    let geocode = await Location.geocodeAsync(destination);
    if (geocode.length > 0) {
      const coords = {
        latitude: geocode[0].latitude,
        longitude: geocode[0].longitude,
      };
      setDestinationCoords(coords);

      // Fit both origin and destination in map
      mapRef.current.fitToCoordinates([origin, coords], {
        edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
        animated: true,
      });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Destination search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter destination"
          value={destination}
          onChangeText={setDestination}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchDestination}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Map */}
      {origin && (
        <MapView ref={mapRef} style={styles.map} initialRegion={origin}>
          <Marker coordinate={origin} title="Your Location" pinColor="blue" />
          {destinationCoords && <Marker coordinate={destinationCoords} title="Destination" pinColor="red" />}

          {origin && destinationCoords && (
            <MapViewDirections
              origin={origin}
              destination={destinationCoords}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="#ff0033"
              onReady={result => setDistance(result.distance.toFixed(2))}
            />
          )}
        </MapView>
      )}

      {/* Distance */}
      {distance && (
        <View style={styles.distanceContainer}>
          <Text style={styles.distanceText}>Distance: {distance} km</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 15,
    right: 15,
    flexDirection: 'row',
    zIndex: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  searchButton: {
    backgroundColor: '#ff0033',
    marginLeft: 10,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: { flex: 1 },
  distanceContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  distanceText: { fontSize: 16, fontWeight: 'bold', color: '#ff0033' },
});
