// =========================================================
// ZenG English Learn
// Firebase Cloud Messaging Service
// =========================================================

import {
  getToken,
  onMessage
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";

import {
  auth,
  db,
  messaging
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
// Firebase Console se actual PUBLIC VAPID key baad me
// yahan add karenge.
//

const FCM_VAPID_KEY =
  "YOUR_FIREBASE_PUBLIC_VAPID_KEY";


// =========================================================
// COLLECTION
// =========================================================

const DEVICE_TOKENS_COLLECTION =
  "zeng_englearn_device_tokens";


// =========================================================
// CHECK FCM SUPPORT
// =========================================================

function isMessagingAvailable() {

  return Boolean(
    messaging
  );

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


  return await Notification.requestPermission();

}


// =========================================================
// GET FCM TOKEN
// =========================================================

async function getDeviceToken(
  serviceWorkerRegistration
) {

  if (!messaging) {

    console.warn(
      "Firebase Messaging is not available."
    );

    return null;

  }


  if (
    FCM_VAPID_KEY ===
    "BPJ0z3Scf3gMG30pwgODae6j3vwxGXIlWmATXKQoWM2kOIxkMnWn-XPsx2Uyxrz1zfVEleVQdQVXJMAElUcC9dw"
  ) {

    console.warn(
      "FCM VAPID key is not configured yet."
    );

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
    permission !==
    "granted"
  ) {

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
      "Cannot register notification device without login."
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

function listenForForegroundMessages(
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


  if (!messaging) {

    console.warn(
      "Firebase Messaging is not available."
    );

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

  isMessagingAvailable,

  requestNotificationPermission,

  getDeviceToken,

  saveDeviceToken,

  registerCurrentDevice,

  listenForForegroundMessages,

  getNotificationPermission

};
