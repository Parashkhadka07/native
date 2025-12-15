// screens/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!email || !password) return Alert.alert('Error', 'Enter email and password');

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigation.replace('MainTabs'))
      .catch(err => Alert.alert('Signup Error', err.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ marginTop: 15, textAlign:'center' }}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  title: { fontSize:28, fontWeight:'bold', marginBottom:30, textAlign:'center' },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:8, padding:12, marginBottom:15 },
  button: { backgroundColor:'#ff0033', padding:15, borderRadius:8, alignItems:'center' },
  buttonText: { color:'#fff', fontWeight:'bold', fontSize:16 }
});
