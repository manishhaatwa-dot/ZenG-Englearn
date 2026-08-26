// =========================================================
// ZenG English Learn
// User Service
// =========================================================

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
  db
} from "../firebase-services.js";


// =========================================================
// COLLECTION
// =========================================================
//
// All user documents for this app live inside this
// dedicated collection.
// =========================================================

const USERS_COLLECTION = "zeng_englearn_users";


// =========================================================
// CREATE USER DOCUMENT
// =========================================================

async function createUserDocument(uid, userData = {}) {

  if (!uid) {
    throw new Error("User UID is required.");
  }

  const userRef = doc(
    db,
    USERS_COLLECTION,
    uid
  );

  const userDocument = {

    uid,

    loginId:
      userData.loginId || "",

    displayName:
      userData.displayName || "",

    displayNameLower:
      userData.displayName
        ? userData.displayName.trim().toLowerCase()
        : "",

    email:
      userData.email || "",

    photoURL:
      userData.photoURL || "",

    nameChangeCount:
      Number(userData.nameChangeCount || 0),

    isOnline:
      false,

    lastSeen:
      serverTimestamp(),

    createdAt:
      serverTimestamp(),

    updatedAt:
      serverTimestamp(),

    blockedUsers:
      [],

    learningProgress:
      {},

    accountStatus:
      "active"
  };


  await setDoc(
    userRef,
    userDocument
  );


  return userDocument;
}


// =========================================================
// GET USER
// =========================================================

async function getUserDocument(uid) {

  if (!uid) {
    throw new Error("User UID is required.");
  }

  const userRef = doc(
    db,
    USERS_COLLECTION,
    uid
  );

  const snapshot =
    await getDoc(userRef);


  if (!snapshot.exists()) {
    return null;
  }


  return {
    id: snapshot.id,
    ...snapshot.data()
  };
}


// =========================================================
// UPDATE USER
// =========================================================

async function updateUserDocument(uid, data) {

  if (!uid) {
    throw new Error("User UID is required.");
  }

  if (!data || typeof data !== "object") {
    throw new Error(
      "User update data is required."
    );
  }


  const userRef = doc(
    db,
    USERS_COLLECTION,
    uid
  );


  await updateDoc(
    userRef,
    {
      ...data,
      updatedAt: serverTimestamp()
    }
  );
}


// =========================================================
// CHECK LOGIN ID
// =========================================================
//
// Login ID is permanent and must be unique.
// This function is used before account creation.
//

async function isLoginIdAvailable(loginId) {

  const normalizedLoginId =
    String(loginId || "")
      .trim()
      .toLowerCase();


  if (!normalizedLoginId) {
    return false;
  }


  const usersRef =
    collection(
      db,
      USERS_COLLECTION
    );


  const loginIdQuery =
    query(
      usersRef,
      where(
        "loginId",
        "==",
        normalizedLoginId
      )
    );


  const snapshot =
    await getDocs(
      loginIdQuery
    );


  return snapshot.empty;
}


// =========================================================
// CHECK DISPLAY NAME
// =========================================================
//
// Display names are globally unique.
// "Rahul" and "rahul" are treated as the same name.
//

async function isDisplayNameAvailable(
  displayName,
  excludeUid = null
) {

  const normalizedName =
    String(displayName || "")
      .trim()
      .toLowerCase();


  if (!normalizedName) {
    return false;
  }


  const usersRef =
    collection(
      db,
      USERS_COLLECTION
    );


  const nameQuery =
    query(
      usersRef,
      where(
        "displayNameLower",
        "==",
        normalizedName
      )
    );


  const snapshot =
    await getDocs(
      nameQuery
    );


  if (snapshot.empty) {
    return true;
  }


  if (!excludeUid) {
    return false;
  }


  const conflictingUser =
    snapshot.docs.find(
      (item) =>
        item.id !== excludeUid
    );


  return !conflictingUser;
}


// =========================================================
// UPDATE ONLINE STATUS
// =========================================================

async function updateOnlineStatus(
  uid,
  isOnline
) {

  if (!uid) {
    throw new Error("User UID is required.");
  }


  const userRef =
    doc(
      db,
      USERS_COLLECTION,
      uid
    );


  await updateDoc(
    userRef,
    {
      isOnline: Boolean(isOnline),

      lastSeen:
        serverTimestamp(),

      updatedAt:
        serverTimestamp()
    }
  );
}


// =========================================================
// DELETE USER DOCUMENT
// =========================================================
//
// Actual complete account deletion will later also remove
// chats, profile photo/storage data, blocks and learning
// data before/alongside Firebase Auth deletion.
//

async function deleteUserDocument(uid) {

  if (!uid) {
    throw new Error("User UID is required.");
  }


  const userRef =
    doc(
      db,
      USERS_COLLECTION,
      uid
    );


  await deleteDoc(
    userRef
  );
}


// =========================================================
// EXPORT
// =========================================================

export {
  USERS_COLLECTION,

  createUserDocument,
  getUserDocument,
  updateUserDocument,

  isLoginIdAvailable,
  isDisplayNameAvailable,

  updateOnlineStatus,

  deleteUserDocument
};
