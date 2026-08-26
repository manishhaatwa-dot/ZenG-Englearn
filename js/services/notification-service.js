// =========================================================
// ZenG English Learn
// Firebase Cloud Messaging Service
// =========================================================

import {
  getMessaging,
  getToken,
  onMessage,
  isSupported
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";

import {
  app,
  auth,
  db
} from "../firebase-services.js";

import {
  doc,
  setDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// =========================================================
// FCM CONFIGURATION
// =========================================================
//
// IMPORTANT:
// Replace this with the PUBLIC VAPID KEY from Firebase
// Console.
//
// Do NOT use a private server key here.
// Do NOT put Firebase Admin SDK credentials here.
//

const FCM_VAPID_KEY =
  "YOUR_FIREBASE_PUBLIC_VAPID_KEY";


// =========================================================
// COLLECTION
// =========================================================

const DEVICE_TOKENS_COLLECTION =
  "zeng_englearn_device_tokens";


// =========================================================
// INTERNAL STATE
// =========================================================

let messagingInstance = null;


// =========================================================
// CHECK FCM SUPPORT
// =========================================================

async function isMessagingSupported() {

  try {

    return await isSupported();

  } catch (error) {

    console.warn(
      "Firebase Messaging is not supported:",
      error
    );

    return false;
  }
}


// =========================================================
// INITIALIZE MESSAGING
// =========================================================

async function initializeMessaging() {

  const supported =
    await isMessagingSupported();


  if (!supported) {

    console.warn(
      "FCM is not supported on this browser."
    );

    return null;
  }


  if (!FCM_VAPID_KEY ||
      FCM_VAPID_KEY ===
        "YOUR_FIREBASE_PUBLIC_VAPID_KEY") {

    console.warn(
      "FCM VAPID key has not been configured yet."
    );

    return null;
  }


  if (!messagingInstance) {

    messagingInstance =
      getMessaging(app);

  }


  return messagingInstance;
}


// =========================================================
// REQUEST NOTIFICATION PERMISSION
// =========================================================

async function requestNotificationPermission() {

  if (
    typeof Notification ===
    "undefined"
  ) {

    return "unsupported";
  }


  if (
    Notification.permission ===
    "granted"
  ) {

    return "granted";
  }


  if (
    Notification.permission ===
    "denied"
  ) {

    return "denied";
  }


  const permission =
    await Notification.requestPermission();


  return permission;
}


// =========================================================
// GET FCM TOKEN
// =========================================================

async function getDeviceToken(
  serviceWorkerRegistration
) {

  const messaging =
    await initializeMessaging();


  if (!messaging) {
    return null;
  }


  if (
    !serviceWorkerRegistration
  ) {

    throw new Error(
      "Service Worker registration is required for FCM."
    );

  }


  const permission =
    await requestNotificationPermission();


  if (
    permission !== "granted"
  ) {

    console.warn(
      "Notification permission was not granted."
    );

    return null;
  }


  const token =
    await getToken(
      messaging,
      {
        vapidKey:
          FCM_VAPID_KEY,

        serviceWorkerRegistration
      }
    );


  if (!token) {

    console.warn(
      "Firebase did not return an FCM token."
    );

    return null;
  }


  return token;
}


// =========================================================
// SAVE DEVICE TOKEN
// =========================================================
//
// Each authenticated user can have multiple devices.
// Therefore tokens are stored as an array.
//

async function saveDeviceToken(
  uid,
  token
) {

  if (!uid) {
    throw new Error(
      "User UID is required."
    );
  }


  if (!token) {
    throw new Error(
      "FCM token is required."
    );
  }


  const tokenRef =
    doc(
      db,
      DEVICE_TOKENS_COLLECTION,
      uid
    );


  await setDoc(
    tokenRef,
    {
      uid,

      tokens:
        arrayUnion(token),

      updatedAt:
        new Date()
    },
    {
      merge: true
    }
  );


  return true;
}


// =========================================================
// REGISTER CURRENT DEVICE
// =========================================================

async function registerCurrentDevice(
  serviceWorkerRegistration
) {

  const currentUser =
    auth.currentUser;


  if (!currentUser) {

    console.warn(
      "Cannot register FCM device without login."
    );

    return null;
  }


  const token =
    await getDeviceToken(
      serviceWorkerRegistration
    );


  if (!token) {
    return null;
  }


  await saveDeviceToken(
    currentUser.uid,
    token
  );


  return token;
}


// =========================================================
// FOREGROUND MESSAGE LISTENER
// =========================================================

async function listenForForegroundMessages(
  callback
) {

  if (
    typeof callback !==
    "function"
  ) {

    throw new Error(
      "Foreground message callback is required."
    );

  }


  const messaging =
    await initializeMessaging();


  if (!messaging) {
    return null;
  }


  return onMessage(
    messaging,
    (payload) => {

      callback(
        payload
      );

    }
  );
}


// =========================================================
// GET NOTIFICATION PERMISSION
// =========================================================

function getNotificationPermission() {

  if (
    typeof Notification ===
    "undefined"
  ) {

    return "unsupported";
  }


  return Notification.permission;
}


// =========================================================
// EXPORT
// =========================================================

export {

  FCM_VAPID_KEY,

  DEVICE_TOKENS_COLLECTION,

  isMessagingSupported,

  initializeMessaging,

  requestNotificationPermission,

  getDeviceToken,

  saveDeviceToken,

  registerCurrentDevice,

  listenForForegroundMessages,

  getNotificationPermission

};
