// =========================================================
// ZenG English Learn
// Persistent Session Service
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

const SessionState = {
  initialized: false,
  loading: true,
  user: null,
  profile: null
};


// =========================================================
// GET SESSION STATE
// =========================================================

function getSessionState() {
  return {
    ...SessionState
  };
}


// =========================================================
// GET CURRENT AUTH USER
// =========================================================

function getSessionUser() {
  return auth.currentUser;
}


// =========================================================
// LOAD FIRESTORE PROFILE
// =========================================================

async function loadUserProfile(user) {

  if (!user) {
    SessionState.profile = null;
    return null;
  }


  try {

    const profile =
      await getUserDocument(
        user.uid
      );


    SessionState.profile =
      profile;


    return profile;

  } catch (error) {

    console.error(
      "Unable to load user profile:",
      error
    );

    SessionState.profile =
      null;

    return null;
  }
}


// =========================================================
// START SESSION LISTENER
// =========================================================

function startSessionListener(
  callback
) {

  if (
    typeof callback !==
    "function"
  ) {

    throw new Error(
      "Session callback must be a function."
    );

  }


  return onAuthStateChanged(
    auth,
    async (user) => {

      SessionState.loading =
        true;


      SessionState.user =
        user || null;


      if (user) {

        await loadUserProfile(
          user
        );

      } else {

        SessionState.profile =
          null;

      }


      SessionState.loading =
        false;

      SessionState.initialized =
        true;


      callback(
        getSessionState()
      );

    }
  );
}


// =========================================================
// WAIT FOR INITIAL SESSION CHECK
// =========================================================
//
// Useful when app startup must wait until Firebase tells
// us whether a user is already logged in.
//

function waitForInitialSession() {

  return new Promise(
    (resolve) => {

      if (
        SessionState.initialized
      ) {

        resolve(
          getSessionState()
        );

        return;
      }


      const unsubscribe =
        onAuthStateChanged(
          auth,
          async (user) => {

            SessionState.user =
              user || null;


            if (user) {

              await loadUserProfile(
                user
              );

            } else {

              SessionState.profile =
                null;

            }


            SessionState.loading =
              false;

            SessionState.initialized =
              true;


            unsubscribe();


            resolve(
              getSessionState()
            );

          }
        );

    }
  );
}


// =========================================================
// REFRESH PROFILE
// =========================================================

async function refreshSessionProfile() {

  const user =
    auth.currentUser;


  if (!user) {

    SessionState.user =
      null;

    SessionState.profile =
      null;

    return null;
  }


  SessionState.user =
    user;


  return await loadUserProfile(
    user
  );
}


// =========================================================
// SESSION LOGIN CHECK
// =========================================================

function isLoggedIn() {

  return Boolean(
    auth.currentUser
  );
}


// =========================================================
// EXPORT
// =========================================================

export {
  SessionState,

  getSessionState,
  getSessionUser,

  startSessionListener,
  waitForInitialSession,

  refreshSessionProfile,

  isLoggedIn
};
