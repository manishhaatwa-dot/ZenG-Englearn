// =========================================================
// ZenG English Learn
// Main Application Entry
// =========================================================

import {
  auth,
  db,
  storage,
  realtimeDb,
  messaging
} from "./firebase-services.js";


// =========================================================
// APP STATE
// =========================================================

const AppState = {
  initialized: false,
  currentUser: null,
  currentPage: "home",
  darkMode: false
};


// =========================================================
// DOM HELPERS
// =========================================================

const getApp = () => {
  return document.getElementById("app");
};


const getLoadingScreen = () => {
  return document.getElementById("appLoading");
};


// =========================================================
// THEME
// =========================================================

function loadSavedTheme() {
  try {
    const savedTheme = localStorage.getItem(
      "zeng_englearn_theme"
    );

    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      AppState.darkMode = true;
      return;
    }

    if (savedTheme === "light") {
      document.body.classList.remove("dark-mode");
      AppState.darkMode = false;
      return;
    }

    // Automatic system theme
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    document.body.classList.toggle(
      "dark-mode",
      prefersDark
    );

    AppState.darkMode = prefersDark;

  } catch (error) {
    console.warn(
      "Theme preference could not be loaded:",
      error
    );
  }
}


// =========================================================
// SAVE THEME
// =========================================================

function saveTheme(theme) {
  try {
    localStorage.setItem(
      "zeng_englearn_theme",
      theme
    );
  } catch (error) {
    console.warn(
      "Theme preference could not be saved:",
      error
    );
  }
}


// =========================================================
// THEME CONTROL
// =========================================================

function setDarkMode(enabled) {

  AppState.darkMode = Boolean(enabled);

  document.body.classList.toggle(
    "dark-mode",
    AppState.darkMode
  );

  saveTheme(
    AppState.darkMode
      ? "dark"
      : "light"
  );
}


// =========================================================
// AUTH STATE LISTENER
// =========================================================

function initializeAuthListener() {

  auth.onAuthStateChanged((user) => {

    AppState.currentUser = user || null;

    if (user) {

      console.log(
        "ZenG user is logged in:",
        user.uid
      );

    } else {

      console.log(
        "No ZenG user is currently logged in."
      );
    }

  });
}


// =========================================================
// BASIC APP INITIALIZATION
// =========================================================

async function initializeApp() {

  if (AppState.initialized) {
    return;
  }

  try {

    loadSavedTheme();

    initializeAuthListener();

    // Confirm Firebase services are available.
    // Actual feature modules will use these services.
    void db;
    void storage;
    void realtimeDb;
    void messaging;

    AppState.initialized = true;

    console.log(
      "ZenG English Learn initialized successfully."
    );

  } catch (error) {

    console.error(
      "ZenG initialization failed:",
      error
    );

  } finally {

    hideLoadingScreen();

  }
}


// =========================================================
// HIDE LOADING SCREEN
// =========================================================

function hideLoadingScreen() {

  const loadingScreen = getLoadingScreen();

  if (!loadingScreen) {
    return;
  }

  loadingScreen.style.opacity = "0";

  loadingScreen.style.transition =
    "opacity 180ms ease";

  setTimeout(() => {

    if (loadingScreen) {
      loadingScreen.remove();
    }

  }, 180);
}


// =========================================================
// GLOBAL APP OBJECT
// =========================================================
//
// Future modules can use this central object without
// creating duplicate global variables.
//

window.ZenGApp = {

  state: AppState,

  firebase: {
    auth,
    db,
    storage,
    realtimeDb,
    messaging
  },

  theme: {
    setDarkMode
  }

};


// =========================================================
// START APPLICATION
// =========================================================

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeApp,
    { once: true }
  );

} else {

  initializeApp();

}
