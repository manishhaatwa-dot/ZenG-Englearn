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
// USER COLLECTION
// =========================================================

const USERS_COLLECTION =
  "zeng_englearn_users";


// =========================================================
// CREATE USER DOCUMENT
// =========================================================

async function createUserDocument(
  uid,
  userData = {}
) {

  if (!uid) {

    throw new Error(
      "User UID is required."
    );

  }


  const displayName =
    String(
      userData.displayName || ""
    )
      .trim()
      .replace(
        /\s+/g,
        " "
      );


  if (!displayName) {

    throw new Error(
      "Display name is required."
    );

  }


  const userRef =
    doc(
      db,
      USERS_COLLECTION,
      uid
    );


  const userDocument = {

    // -----------------------------------------------------
    // Firebase UID
    // -----------------------------------------------------

    uid,


    // -----------------------------------------------------
    // Public profile
    // -----------------------------------------------------

    displayName,

    displayNameLower:
      displayName.toLowerCase(),

    email:
      userData.email || "",

    photoURL:
      userData.photoURL || "",


    // -----------------------------------------------------
    // Name change system
    // -----------------------------------------------------

    nameChangeCount:
      0,


    // -----------------------------------------------------
    // Presence
    // -----------------------------------------------------

    isOnline:
      false,

    lastSeen:
      serverTimestamp(),


    // -----------------------------------------------------
    // Account dates
    // -----------------------------------------------------

    createdAt:
      serverTimestamp(),

    updatedAt:
      serverTimestamp(),


    // -----------------------------------------------------
    // Block system
    // -----------------------------------------------------

    blockedUsers:
      [],


    // -----------------------------------------------------
    // English learning progress
    // -----------------------------------------------------

    learningProgress:
      {},


    // -----------------------------------------------------
    // Account status
    // -----------------------------------------------------

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
// GET USER DOCUMENT
// =========================================================

async function getUserDocument(
  uid
) {

  if (!uid) {

    throw new Error(
      "User UID is required."
    );

  }


  const userRef =
    doc(
      db,
      USERS_COLLECTION,
      uid
    );


  const snapshot =
    await getDoc(
      userRef
    );


  if (
    !snapshot.exists()
  ) {

    return null;

  }


  return {

    id:
      snapshot.id,

    ...snapshot.data()

  };

}


// =========================================================
// UPDATE USER DOCUMENT
// =========================================================

async function updateUserDocument(
  uid,
  data
) {

  if (!uid) {

    throw new Error(
      "User UID is required."
    );

  }


  if (
    !data ||
    typeof data !== "object"
  ) {

    throw new Error(
      "User update data is required."
    );

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

      ...data,

      updatedAt:
        serverTimestamp()

    }
  );


  return true;

}


// =========================================================
// CHECK DISPLAY NAME AVAILABILITY
// =========================================================
//
// Names are compared case-insensitively.
//
// Rahul
// rahul
// RAHUL
//
// All are treated as the same display name.
//

async function isDisplayNameAvailable(
  displayName,
  excludeUid = null
) {

  const normalizedName =
    String(
      displayName || ""
    )
      .trim()
      .replace(
        /\s+/g,
        " "
      )
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


  if (
    snapshot.empty
  ) {

    return true;

  }


  // -------------------------------------------------------
  // During a name change, allow the user to keep their
  // existing name.
  // -------------------------------------------------------

  if (
    excludeUid
  ) {

    const conflictingUser =
      snapshot.docs.find(
        (userDoc) =>
          userDoc.id !==
          excludeUid
      );


    return !conflictingUser;

  }


  return false;

}


// =========================================================
// UPDATE ONLINE STATUS
// =========================================================

async function updateOnlineStatus(
  uid,
  isOnline
) {

  if (!uid) {

    throw new Error(
      "User UID is required."
    );

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

      isOnline:
        Boolean(isOnline),

      lastSeen:
        serverTimestamp(),

      updatedAt:
        serverTimestamp()

    }
  );


  return true;

}


// =========================================================
// DELETE USER DOCUMENT
// =========================================================
//
// Complete account deletion will later also remove:
// - chats
// - profile photo
// - notification tokens
// - learning data
// - block data
//
// This function currently removes the main user document.
//

async function deleteUserDocument(
  uid
) {

  if (!uid) {

    throw new Error(
      "User UID is required."
    );

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


  return true;

}


// =========================================================
// EXPORT
// =========================================================

export {

  USERS_COLLECTION,

  createUserDocument,

  getUserDocument,

  updateUserDocument,

  isDisplayNameAvailable,

  updateOnlineStatus,

  deleteUserDocument

};
