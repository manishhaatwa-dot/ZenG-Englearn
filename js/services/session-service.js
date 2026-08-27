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
  // Prevent duplicate listeners.
  // -------------------------------------------------------

  if (
    unsubscribeAuth
  ) {

    unsubscribeAuth();

    unsubscribeAuth = null;

  }


  // -------------------------------------------------------
  // Firebase Auth listener
  // -------------------------------------------------------

  unsubscribeAuth =
    onAuthStateChanged(
      auth,
      async (firebaseUser) => {

        // -------------------------------------------------
        // Logged out
        // -------------------------------------------------

        if (!firebaseUser) {

          initialized = true;

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
          // Auth user exists but Firestore profile is
          // missing.
          // -----------------------------------------------

          if (!profile) {

            console.warn(
              "Firebase Auth user exists, but Firestore profile is missing.",
              firebaseUser.uid
            );


            initialized = true;


            callback({

              initialized:
                true,

              loading:
                false,

              user:
                firebaseUser,

              profile:
                null,

              profileMissing:
                true

            });

            return;

          }


          // -----------------------------------------------
          // Account status
          // -----------------------------------------------

          if (
            profile.accountStatus ===
            "deactivated"
          ) {

            initialized = true;


            callback({

              initialized:
                true,

              loading:
                false,

              user:
                firebaseUser,

              profile:
                profile,

              deactivated:
                true

            });

            return;

          }


          // -----------------------------------------------
          // Normal authenticated session
          // -----------------------------------------------

          initialized = true;


          callback({

            initialized:
              true,

            loading:
              false,

            user:
              firebaseUser,

            profile,

            profileMissing:
              false

          });

        } catch (error) {

          console.error(
            "Unable to load user profile:",
            error
          );


          initialized = true;


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


  return unsubscribeAuth;

}


// =========================================================
// CURRENT USER
// =========================================================

function getCurrentUser() {

  return auth.currentUser;

}


// =========================================================
// LOGIN CHECK
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
