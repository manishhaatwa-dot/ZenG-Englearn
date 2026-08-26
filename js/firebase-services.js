// =========================================================
// ZenG English Learn
// Firebase Services
// =========================================================

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore
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


const db =
  getFirestore(
    firebaseApp
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
//
// notification-service.js expects the Firebase app to be
// exported as "app".
//
// Keep "firebaseApp" too, because other files may already
// use that name.
//

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
