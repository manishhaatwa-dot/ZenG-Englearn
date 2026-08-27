// =========================================================
// ZenG English Learn
// Session Service
// =========================================================

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  auth
} from "../firebase-services.js";

import {
  getUserDocument
} from "./user-service.js";


// =========================================================
// SESSION STATE
// =========================================================

let initialized = false;

let unsubscribeAuth = null;


// =========================================================
// START SESSION LISTENER
// =========================================================

function startSessionListener(
  callback
) {

  if (
    typeof callback !== "function"
  ) {

    throw new Error(
      "Session callback is required."
    );

  }


  // -------------------------------------------------------
  // Prevent duplicate Firebase listeners.
  // -------------------------------------------------------

  if (
    unsubscribeAuth
  ) {

    unsubscribeAuth();

    unsubscribeAuth = null;

  }


  // -------------------------------------------------------
  // Firebase Auth state listener
  // -------------------------------------------------------

  unsubscribeAuth =
    onAuthStateChanged(
      auth,
      async (firebaseUser) => {

        // -------------------------------------------------
        // First Firebase auth check is still initializing.
        // -------------------------------------------------

        if (!initialized) {

          initialized = true;

        }


        // -------------------------------------------------
        // No authenticated user
        // -------------------------------------------------

        if (!firebaseUser) {

          callback({

            initialized:
              true,

            loading:
              false,

            user:
              null,

            profile:
              null

          });

          return;

        }


        // -------------------------------------------------
        // Authenticated user
        // -------------------------------------------------

        try {

          const profile =
            await getUserDocument(
              firebaseUser.uid
            );


          // -----------------------------------------------
          // Auth account exists but profile does not.
          // -----------------------------------------------

          if (!profile) {

            console.warn(
              "Firebase user exists but Firestore profile was not found."
            );


            callback({

              initialized:
                true,

              loading:
                false,

              user:
                firebaseUser,

              profile:
                null

            });

            return;

          }


          // -----------------------------------------------
          // Account status check
          // -----------------------------------------------

          if (
            profile.accountStatus ===
            "deactivated"
          ) {

            callback({

              initialized:
                true,

              loading:
                false,

              user:
                null,

              profile:
                null,

              deactivated:
                true

            });

            return;

          }


          // -----------------------------------------------
          // Normal authenticated session
          // -----------------------------------------------

          callback({

            initialized:
              true,

            loading:
              false,

            user:
              firebaseUser,

            profile

          });

        } catch (error) {

          console.error(
            "Unable to load user profile:",
            error
          );


          callback({

            initialized:
              true,

            loading:
              false,

            user:
              firebaseUser,

            profile:
              null,

            profileError:
              true,

            error

          });

        }

      }
    );


  // -------------------------------------------------------
  // Return unsubscribe function.
  // -------------------------------------------------------

  return unsubscribeAuth;

}


// =========================================================
// GET CURRENT FIREBASE USER
// =========================================================

function getCurrentUser() {

  return auth.currentUser;

}


// =========================================================
// CHECK AUTHENTICATION
// =========================================================

function isUserLoggedIn() {

  return Boolean(
    auth.currentUser
  );

}


// =========================================================
// STOP SESSION LISTENER
// =========================================================

function stopSessionListener() {

  if (
    unsubscribeAuth
  ) {

    unsubscribeAuth();

    unsubscribeAuth =
      null;

  }

}


// =========================================================
// EXPORT
// =========================================================

export {

  startSessionListener,

  getCurrentUser,

  isUserLoggedIn,

  stopSessionListener

};
