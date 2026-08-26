// =========================================================
// ZenG English Learn
// Registration Service
// =========================================================

import {
  registerUser,
  deleteCurrentAuthAccount
} from "./auth-service.js";

import {
  createUserDocument
} from "./user-service.js";

import {
  validateUniqueLoginId,
  validateUniqueDisplayName
} from "./identity-service.js";

import {
  auth
} from "../firebase-services.js";


// =========================================================
// BASIC VALIDATION
// =========================================================

function validateRegistrationInput({
  email,
  password,
  loginId,
  displayName
}) {

  if (!email || !String(email).trim()) {
    throw new Error(
      "Email is required."
    );
  }

  if (!password) {
    throw new Error(
      "Password is required."
    );
  }

  if (!loginId || !String(loginId).trim()) {
    throw new Error(
      "Login ID is required."
    );
  }

  if (
    !displayName ||
    !String(displayName).trim()
  ) {
    throw new Error(
      "Display name is required."
    );
  }

}


// =========================================================
// REGISTER ACCOUNT
// =========================================================

async function registerAccount({
  email,
  password,
  loginId,
  displayName
}) {

  // -------------------------------------------------------
  // Validate required fields
  // -------------------------------------------------------

  validateRegistrationInput({
    email,
    password,
    loginId,
    displayName
  });


  // -------------------------------------------------------
  // Validate Login ID + uniqueness
  // -------------------------------------------------------

  const loginIdResult =
    await validateUniqueLoginId(
      loginId
    );


  if (!loginIdResult.valid) {
    throw new Error(
      loginIdResult.message
    );
  }


  const finalLoginId =
    loginIdResult.value;


  // -------------------------------------------------------
  // Validate Display Name + uniqueness
  // -------------------------------------------------------

  const displayNameResult =
    await validateUniqueDisplayName(
      displayName
    );


  if (!displayNameResult.valid) {
    throw new Error(
      displayNameResult.message
    );
  }


  const finalDisplayName =
    displayNameResult.value;


  // -------------------------------------------------------
  // Create Firebase Authentication account
  // -------------------------------------------------------

  let firebaseUser = null;

  try {

    firebaseUser =
      await registerUser(
        email,
        password
      );


    // -----------------------------------------------------
    // Create Firestore user profile
    // -----------------------------------------------------

    await createUserDocument(
      firebaseUser.uid,
      {
        loginId:
          finalLoginId,

        displayName:
          finalDisplayName,

        email:
          firebaseUser.email || email,

        photoURL:
          "",

        nameChangeCount:
          0
      }
    );


    // -----------------------------------------------------
    // Successful registration
    // -----------------------------------------------------

    return {

      success: true,

      uid:
        firebaseUser.uid,

      loginId:
        finalLoginId,

      displayName:
        finalDisplayName,

      email:
        firebaseUser.email || email

    };

  } catch (error) {

    // -----------------------------------------------------
    // Rollback
    // -----------------------------------------------------
    //
    // If Firebase Auth account was created but Firestore
    // profile creation failed, remove the newly-created
    // Auth account so we don't leave an incomplete account.
    //

    if (
      firebaseUser &&
      auth.currentUser &&
      auth.currentUser.uid ===
        firebaseUser.uid
    ) {

      try {

        await deleteCurrentAuthAccount();

      } catch (rollbackError) {

        console.error(
          "Registration rollback failed:",
          rollbackError
        );

      }

    }


    throw error;
  }
}


// =========================================================
// EXPORT
// =========================================================

export {
  registerAccount
};
