// =========================================================
// ZenG English Learn
// Firebase Configuration
// =========================================================

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


// ---------------------------------------------------------
// Firebase project configuration
// ---------------------------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyCes4Ir1Q_QHpLlhCqAPWKLMpA9Zez6cyY",
  authDomain: "zeng-chatt.firebaseapp.com",
  databaseURL: "https://zeng-chatt-default-rtdb.firebaseio.com",
  projectId: "zeng-chatt",
  storageBucket: "zeng-chatt.firebasestorage.app",
  messagingSenderId: "1042057290439",
  appId: "1:1042057290439:web:b3c41daf4b59564bdd94e2"
};


// ---------------------------------------------------------
// Initialize Firebase
// ---------------------------------------------------------

const firebaseApp = initializeApp(firebaseConfig);


// ---------------------------------------------------------
// Export Firebase app
// ---------------------------------------------------------

export { firebaseApp };
