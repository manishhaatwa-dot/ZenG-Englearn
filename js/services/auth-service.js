// =========================================================
// ZenG English Learn
// Authentication Service
// =========================================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  deleteUser
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  auth
} from "../firebase-services.js";


// =========================================================
// REGISTER
// =========================================================

async function registerUser(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const result =
    await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

  return result.user;
}


// =========================================================
// LOGIN
// =========================================================

async function loginUser(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const result =
    await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

  return result.user;
}


// =========================================================
// LOGOUT
// =========================================================

async function logoutUser() {
  await signOut(auth);
}


// =========================================================
// UPDATE AUTH PROFILE
// =========================================================
//
// This will later be used after the user's unique
// display name/profile system is implemented.
//

async function updateUserProfile(displayName, photoURL = null) {
  if (!auth.currentUser) {
    throw new Error("No authenticated user found.");
  }

  await updateProfile(auth.currentUser, {
    displayName:
      displayName
        ? displayName.trim()
        : auth.currentUser.displayName,

    photoURL:
      photoURL !== null
        ? photoURL
        : auth.currentUser.photoURL
  });

  return auth.currentUser;
}


// =========================================================
// DELETE CURRENT ACCOUNT
// =========================================================
//
// Account deletion will later be combined with deletion
// of the user's Firestore/Storage data.
//

async function deleteCurrentAuthAccount() {
  if (!auth.currentUser) {
    throw new Error("No authenticated user found.");
  }

  await deleteUser(auth.currentUser);
}


// =========================================================
// AUTH STATE LISTENER
// =========================================================

function watchAuthState(callback) {
  if (typeof callback !== "function") {
    throw new Error(
      "Auth state callback must be a function."
    );
  }

  return onAuthStateChanged(
    auth,
    callback
  );
}


// =========================================================
// CURRENT USER
// =========================================================

function getCurrentUser() {
  return auth.currentUser;
}


// =========================================================
// EXPORT
// =========================================================

export {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  deleteCurrentAuthAccount,
  watchAuthState,
  getCurrentUser
};
