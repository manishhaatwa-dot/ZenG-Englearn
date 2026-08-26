// =========================================================
// ZenG English Learn
// Main Application Controller
// =========================================================

import {
  startSessionListener
} from "./services/session-service.js";

import {
  registerCurrentDevice
} from "./services/notification-service.js";


// =========================================================
// APP STATE
// =========================================================

const AppState = {
  initialized: false,
  loading: true,

  user: null,
  profile: null,

  currentPage: null
};


// =========================================================
// DOM
// =========================================================

const appRoot =
  document.getElementById(
    "app"
  );


// =========================================================
// SPLASH
// =========================================================

function hideSplash() {

  const splash =
    document.getElementById(
      "appLoading"
    );


  if (!splash) {
    return;
  }


  splash.style.opacity = "0";
  splash.style.pointerEvents = "none";


  setTimeout(() => {

    if (
      splash &&
      splash.parentNode
    ) {

      splash.remove();

    }

  }, 220);
}


// =========================================================
// SHOW SPLASH
// =========================================================

function showSplash() {

  const splash =
    document.getElementById(
      "appLoading"
    );


  if (!splash) {
    return;
  }


  splash.style.opacity = "1";
  splash.style.pointerEvents = "auto";

}


// =========================================================
// BASIC APP VIEW
// =========================================================

function renderAppMessage(
  title,
  message
) {

  if (!appRoot) {
    return;
  }


  appRoot.innerHTML = `

    <div class="page">

      <div
        class="page-container"
        style="
          min-height:100dvh;
          display:flex;
          align-items:center;
          justify-content:center;
        "
      >

        <div
          class="card"
          style="
            width:min(100%,430px);
            text-align:center;
          "
        >

          <div
            style="
              font-size:38px;
              margin-bottom:12px;
            "
          >
            🌿
          </div>

          <div
            style="
              font-size:20px;
              font-weight:800;
              margin-bottom:8px;
            "
          >
            ${escapeHTML(title)}
          </div>

          <div
            style="
              color:var(--text-secondary);
              font-size:13px;
              line-height:1.5;
            "
          >
            ${escapeHTML(message)}
          </div>

        </div>

      </div>

    </div>

  `;

}


// =========================================================
// HTML ESCAPE
// =========================================================

function escapeHTML(
  value
) {

  return String(
    value ?? ""
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


// =========================================================
// LOGGED-IN USER
// =========================================================

async function handleAuthenticatedUser(
  session
) {

  AppState.user =
    session.user;

  AppState.profile =
    session.profile;


  // -------------------------------------------------------
  // Register this device for FCM.
  //
  // If notification permission/VAPID key is not ready,
  // notification-service safely returns null.
  // -------------------------------------------------------

  try {

    if (
      "serviceWorker" in navigator
    ) {

      const registration =
        await navigator.serviceWorker.ready;


      await registerCurrentDevice(
        registration
      );

    }

  } catch (error) {

    console.warn(
      "FCM device registration skipped:",
      error
    );

  }


  // -------------------------------------------------------
  // Dashboard routing will be connected here.
  // -------------------------------------------------------

  AppState.currentPage =
    "dashboard";


  renderAppMessage(
    "ZenG English Learn",
    "Your dashboard is ready."
  );

}


// =========================================================
// LOGGED-OUT USER
// =========================================================

function handleLoggedOutUser() {

  AppState.user =
    null;

  AppState.profile =
    null;

  AppState.currentPage =
    "login";


  renderAppMessage(
    "Welcome to ZenG English Learn",
    "Login and registration screen will be connected here."
  );

}


// =========================================================
// SESSION HANDLER
// =========================================================

async function handleSessionChange(
  session
) {

  if (!session) {
    return;
  }


  AppState.loading =
    session.loading;


  AppState.initialized =
    session.initialized;


  if (
    session.loading
  ) {

    showSplash();

    return;
  }


  if (
    session.user
  ) {

    await handleAuthenticatedUser(
      session
    );

  } else {

    handleLoggedOutUser();

  }


  hideSplash();

}


// =========================================================
// START APP
// =========================================================

function startApp() {

  showSplash();


  try {

    startSessionListener(
      async (session) => {

        try {

          await handleSessionChange(
            session
          );

        } catch (error) {

          console.error(
            "App session handling error:",
            error
          );


          hideSplash();


          renderAppMessage(
            "Something went wrong",
            "Please refresh the app and try again."
          );

        }

      }
    );

  } catch (error) {

    console.error(
      "Unable to start ZenG:",
      error
    );


    hideSplash();


    renderAppMessage(
      "Unable to start app",
      "Please refresh the page and try again."
    );

  }

}


// =========================================================
// DOM READY
// =========================================================

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    startApp,
    {
      once: true
    }
  );

} else {

  startApp();

}


// =========================================================
// EXPORT APP STATE
// =========================================================

export {
  AppState
};
