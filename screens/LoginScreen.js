// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) return Alert.alert('Error', 'Enter email and password');

    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigation.replace('MainTabs'))
      .catch(err => Alert.alert('Login Error', err.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={{ marginTop: 15, textAlign:'center' }}>Don't have an account? Sign Up</Text>
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
