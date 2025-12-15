// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBNDPGrIrRKZMfj_AntATyUXMqwh37r6X4",
  authDomain: "hamro-guruji.firebaseapp.com",
  projectId: "hamro-guruji",
  storageBucket: "hamro-guruji.firebasestorage.app",
  messagingSenderId: "204170877094",
  appId: "1:204170877094:web:69008fd291f7b0bb00fc67",
  measurementId: "G-W1ZY70DVNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
