import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Pathao Demo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: '#ff0033', padding: 20, alignItems: 'center' },
  headerText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
});
