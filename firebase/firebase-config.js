// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

// Your Firebase Configuration

const firebaseConfig = {
  apiKey: "AIzaSyB1gRwZo8hFRmKl4jNXlyngLWZrCWvQAh0",
  authDomain: "prince-jewelries-plug.firebaseapp.com",
  databaseURL: "https://prince-jewelries-plug-default-rtdb.firebaseio.com",
  projectId: "prince-jewelries-plug",
  storageBucket: "prince-jewelries-plug.firebasestorage.app",
  messagingSenderId: "412766918362",
  appId: "1:412766918362:web:c7413e8c1c6664c06db7e3"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const storage = getStorage(app);
