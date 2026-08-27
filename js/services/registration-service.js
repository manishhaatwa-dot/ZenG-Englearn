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
  // Create Firebase Authentication account FIRST
  // -------------------------------------------------------
  //
  // This is important because the display-name uniqueness
  // check requires an authenticated Firebase user.
  //

  let firebaseUser = null;


  try {

    firebaseUser =
      await registerUser(
        String(email).trim(),
        password
      );


    // -----------------------------------------------------
    // Validate Display Name + uniqueness
    // -----------------------------------------------------
    //
    // Firebase Auth user now exists, so Firestore reads
    // are allowed by our security rules.
    //

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


    // -----------------------------------------------------
    // Create Firestore user profile
    // -----------------------------------------------------

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


    // -------------------------------------------------------
    // ROLLBACK
    // -------------------------------------------------------
    //
    // If Firebase Auth account was created but any later
    // step failed, remove the newly-created Auth account.
    //
    // This prevents incomplete accounts.
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
