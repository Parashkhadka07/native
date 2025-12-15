import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ServiceCard({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#f2f2f2', padding: 20, margin: 10, borderRadius: 10, width: '40%', alignItems: 'center' },
  text: { fontSize: 18, fontWeight: 'bold' },
});
