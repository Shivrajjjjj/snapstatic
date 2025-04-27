
﻿// public/firebase-config.js

// ──────────────────────────────────────────────────────────────────────────────
// ⚠️ This file contains your Firebase keys. In a real production build you
// would inject these via a build‐time environment variable or use a backend.
// For this static demo we keep them here—but do NOT commit this file to Git.
// ──────────────────────────────────────────────────────────────────────────────

const firebaseConfig = {
    apiKey: "AIzaSyAWSfUtJ-jb8DKC15vBeDID-b-i9XqMQTY",
    authDomain: "my-cool-app-2025.firebaseapp.com",
    projectId: "my-cool-app-2025",
    storageBucket: "my-cool-app-2025.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456",
    measurementId: "G-XYZABC1234"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
