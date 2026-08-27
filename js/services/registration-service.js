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
  displayName
}) {

  if (
    !email ||
    !String(email).trim()
  ) {

    throw new Error(
      "Email is required."
    );

  }


  if (!password) {

    throw new Error(
      "Password is required."
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
  displayName
}) {

  // -------------------------------------------------------
  // Validate required fields
  // -------------------------------------------------------

  validateRegistrationInput({

    email,

    password,

    displayName

  });


  // -------------------------------------------------------
  // Validate Display Name + uniqueness
  // -------------------------------------------------------

  const displayNameResult =
    await validateUniqueDisplayName(
      displayName
    );


  if (
    !displayNameResult.valid
  ) {

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
    //
    // The profile is created immediately after Firebase
    // Authentication succeeds.
    //

    await createUserDocument(

      firebaseUser.uid,

      {

        uid:
          firebaseUser.uid,

        displayName:
          finalDisplayName,

        displayNameLower:
          finalDisplayName.toLowerCase(),

        email:
          firebaseUser.email ||
          String(email).trim(),

        photoURL:
          "",

        nameChangeCount:
          0,

        accountStatus:
          "active"

      }

    );


    // -----------------------------------------------------
    // Successful registration
    // -----------------------------------------------------

    return {

      success:
        true,

      uid:
        firebaseUser.uid,

      displayName:
        finalDisplayName,

      email:
        firebaseUser.email ||
        String(email).trim()

    };


  } catch (error) {


    // -----------------------------------------------------
    // Rollback
    // -----------------------------------------------------
    //
    // If Authentication succeeded but profile creation
    // failed, remove the newly-created Auth account.
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
