// =========================================================
// ZenG English Learn
// Authentication Service
// =========================================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  setPersistence,
  browserLocalPersistence,
  sendEmailVerification,
  sendPasswordResetEmail,
  reload
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  auth
} from "../firebase-services.js";


// =========================================================
// AUTH PERSISTENCE
// =========================================================
//
// User remains logged in across browser/app restarts.
// Logout happens only when the user explicitly chooses
// Logout from the application.
//

let persistenceReady = false;


async function ensureAuthPersistence() {

  if (persistenceReady) {

    return;

  }


  await setPersistence(
    auth,
    browserLocalPersistence
  );


  persistenceReady = true;

}


// =========================================================
// REGISTER USER
// =========================================================

async function registerUser(
  email,
  password
) {

  if (!email) {

    throw new Error(
      "Email is required."
    );

  }


  if (!password) {

    throw new Error(
      "Password is required."
    );

  }


  await ensureAuthPersistence();


  const credential =
    await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );


  return credential.user;

}


// =========================================================
// LOGIN USER
// =========================================================

async function loginUser(
  email,
  password
) {

  if (!email) {

    throw new Error(
      "Email is required."
    );

  }


  if (!password) {

    throw new Error(
      "Password is required."
    );

  }


  await ensureAuthPersistence();


  const credential =
    await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );


  return credential.user;

}


// =========================================================
// SEND EMAIL VERIFICATION
// =========================================================
//
// Sends Firebase's verification email to the currently
// authenticated user.
//

async function sendVerificationEmail() {

  const currentUser =
    auth.currentUser;


  if (!currentUser) {

    throw new Error(
      "No authenticated user found."
    );

  }


  if (
    currentUser.emailVerified
  ) {

    return true;

  }


  await sendEmailVerification(
    currentUser
  );


  return true;

}


// =========================================================
// CHECK EMAIL VERIFICATION
// =========================================================

function isEmailVerified() {

  return Boolean(
    auth.currentUser?.emailVerified
  );

}


// =========================================================
// RELOAD CURRENT USER
// =========================================================
//
// Firebase Auth user data can be refreshed after the user
// clicks the verification link.
//

async function reloadCurrentAuthUser() {

  const currentUser =
    auth.currentUser;


  if (!currentUser) {

    throw new Error(
      "No authenticated user found."
    );

  }


  await reload(
    currentUser
  );


  return currentUser;

}


// =========================================================
// SEND PASSWORD RESET EMAIL
// =========================================================
//
// Firebase sends the password-reset link to the email
// address entered by the user.
//

async function sendPasswordReset(
  email
) {

  if (!email) {

    throw new Error(
      "Email is required."
    );

  }


  await ensureAuthPersistence();


  await sendPasswordResetEmail(
    auth,
    email.trim()
  );


  return true;

}


// =========================================================
// LOGOUT USER
// =========================================================
//
// This function is only called when the user manually
// chooses Logout from the application.
//

async function logoutUser() {

  await signOut(
    auth
  );

}


// =========================================================
// DELETE CURRENT AUTH ACCOUNT
// =========================================================
//
// Used later by the complete account deletion flow.
//

async function deleteCurrentAuthAccount() {

  const currentUser =
    auth.currentUser;


  if (!currentUser) {

    throw new Error(
      "No authenticated user found."
    );

  }


  await deleteUser(
    currentUser
  );

}


// =========================================================
// GET CURRENT USER
// =========================================================

function getCurrentAuthUser() {

  return auth.currentUser;

}


// =========================================================
// CHECK LOGIN STATE
// =========================================================

function isAuthenticated() {

  return Boolean(
    auth.currentUser
  );

}


// =========================================================
// EXPORT
// =========================================================

export {

  ensureAuthPersistence,

  registerUser,

  loginUser,

  sendVerificationEmail,

  isEmailVerified,

  reloadCurrentAuthUser,

  sendPasswordReset,

  logoutUser,

  deleteCurrentAuthAccount,

  getCurrentAuthUser,

  isAuthenticated

};
