// =========================================================
// ZenG English Learn
// Firebase Services
// =========================================================

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  initializeFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
  getStorage
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

import {
  getDatabase
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

import {
  getMessaging,
  isSupported
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";

import {
  firebaseApp
} from "./firebase-config.js";


// =========================================================
// CORE FIREBASE SERVICES
// =========================================================

const auth =
  getAuth(
    firebaseApp
  );


// =========================================================
// FIRESTORE
// =========================================================
//
// Force Firestore to use long-polling.
//
// This helps with older browsers, proxies, antivirus
// software and networks where the normal WebChannel
// connection can incorrectly appear offline.
//

const db =
  initializeFirestore(
    firebaseApp,
    {
      experimentalForceLongPolling: true
    }
  );


const storage =
  getStorage(
    firebaseApp
  );


const realtimeDb =
  getDatabase(
    firebaseApp
  );


// =========================================================
// FIREBASE CLOUD MESSAGING
// =========================================================
//
// Messaging support is checked safely because some browsers
// or environments may not support FCM.
//

let messaging = null;


try {

  const messagingSupported =
    await isSupported();


  if (
    messagingSupported
  ) {

    messaging =
      getMessaging(
        firebaseApp
      );

  }

} catch (error) {

  console.warn(
    "Firebase Cloud Messaging is not available:",
    error
  );

}


// =========================================================
// FIREBASE APP ALIAS
// =========================================================

const app =
  firebaseApp;


// =========================================================
// EXPORT SERVICES
// =========================================================

export {
  app,
  firebaseApp,

  auth,
  db,
  storage,
  realtimeDb,
  messaging
};
