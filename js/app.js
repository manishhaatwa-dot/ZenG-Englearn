// =========================================================
// ZenG English Learn
// Main Application Controller
// =========================================================


// =========================================================
// CORE SERVICES
// =========================================================

import {
  startSessionListener
} from "./services/session-service.js";

import {
  registerCurrentDevice
} from "./services/notification-service.js";

import {
  renderAuthView
} from "./services/auth-ui-service.js";


// =========================================================
// LEARNING PAGES
// =========================================================

import {
  renderGrammarPage
} from "./pages/grammar-page.js";

import {
  renderVocabularyPage
} from "./pages/vocabulary-page.js";

import {
  renderStoriesPage
} from "./pages/stories-page.js";

import {
  renderChatPage
} from "./pages/chat-page.js";


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


  splash.style.opacity =
    "0";

  splash.style.pointerEvents =
    "none";


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


  splash.style.opacity =
    "1";

  splash.style.pointerEvents =
    "auto";

}


// =========================================================
// ESCAPE HTML
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
// PAGE ERROR
// =========================================================

function renderPageError(
  page
) {

  if (!appRoot) {
    return;
  }


  const pageName =
    String(
      page || "page"
    )
      .charAt(0)
      .toUpperCase() +
    String(
      page || "page"
    )
      .slice(1);


  appRoot.innerHTML = `

    <div class="page">

      <div
        class="page-container"
        style="
          min-height:100dvh;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:20px;
        "
      >

        <div
          class="card"
          style="
            width:min(100%,430px);
            text-align:center;
            padding:24px;
          "
        >

          <div
            style="
              font-size:38px;
            "
          >
            🌿
          </div>


          <div
            style="
              margin-top:10px;
              font-size:19px;
              font-weight:800;
            "
          >
            Unable to open
            ${escapeHTML(pageName)}
          </div>


          <div
            style="
              margin-top:7px;
              color:var(--text-secondary);
              font-size:12px;
              line-height:1.5;
            "
          >
            Please try again.
          </div>


          <button
            id="pageErrorBackButton"
            class="primary-button w-full"
            type="button"
            style="
              margin-top:18px;
            "
          >
            Back to Dashboard
          </button>


          <div
            style="
              margin-top:16px;
              color:var(--text-muted);
              font-size:11px;
            "
          >
            Powered by Opnora.com
          </div>

        </div>

      </div>

    </div>

  `;


  document
    .getElementById(
      "pageErrorBackButton"
    )
    ?.addEventListener(
      "click",
      () => {

        navigateTo(
          "dashboard"
        );

      }
    );

}


// =========================================================
// OPEN PAGE
// =========================================================
//
// All dashboard sections are connected here.
//
// IMPORTANT:
// Page-specific UI and Firebase logic stay inside their
// own page files. app.js only controls navigation.
//
// Current pages:
//
// grammar-page.js
// vocabulary-page.js
// stories-page.js
// chat-page.js
//
// This keeps the main application controller stable.
// =========================================================

async function openPage(
  page
) {

  if (!appRoot) {
    return;
  }


  // -------------------------------------------------------
  // Allowed pages
  // -------------------------------------------------------

  const allowedPages = [

    "grammar",

    "vocabulary",

    "stories",

    "chat",

    "profile"

  ];


  if (
    !allowedPages.includes(
      page
    )
  ) {

    console.warn(
      "Unknown ZenG page:",
      page
    );

    return;

  }


  // -------------------------------------------------------
  // Authentication check
  // -------------------------------------------------------

  if (
    !AppState.user ||
    !AppState.profile
  ) {

    console.warn(
      "ZenG navigation blocked: user/profile unavailable."
    );

    return;

  }


  AppState.currentPage =
    page;


  try {

    // -----------------------------------------------------
    // Lightweight loading screen
    // -----------------------------------------------------

    appRoot.innerHTML = `

      <div class="page">

        <div
          class="page-container"
          style="
            min-height:100dvh;
            display:flex;
            align-items:center;
            justify-content:center;
            padding:20px;
          "
        >

          <div
            class="card"
            style="
              width:min(100%,430px);
              text-align:center;
              padding:28px;
            "
          >

            <div
              style="
                font-size:34px;
              "
            >
              🌿
            </div>


            <div
              style="
                margin-top:10px;
                font-size:15px;
                font-weight:800;
              "
            >
              Loading...
            </div>

          </div>

        </div>

      </div>

    `;


    // =====================================================
    // GRAMMAR
    // =====================================================

    if (
      page === "grammar"
    ) {

      if (
        typeof renderGrammarPage !==
        "function"
      ) {

        throw new Error(
          "renderGrammarPage() is not available."
        );

      }


      await renderGrammarPage(
        appRoot,
        {

          displayName:
            AppState.profile?.displayName ||
            "Learner",

          user:
            AppState.user,

          profile:
            AppState.profile

        }
      );


      return;

    }


    // =====================================================
    // VOCABULARY
    // =====================================================

    if (
      page === "vocabulary"
    ) {

      if (
        typeof renderVocabularyPage !==
        "function"
      ) {

        throw new Error(
          "renderVocabularyPage() is not available."
        );

      }


      await renderVocabularyPage(
        appRoot,
        {

          displayName:
            AppState.profile?.displayName ||
            "Learner",

          user:
            AppState.user,

          profile:
            AppState.profile

        }
      );


      return;

    }


    // =====================================================
    // STORIES
    // =====================================================

    if (
      page === "stories"
    ) {

      if (
        typeof renderStoriesPage !==
        "function"
      ) {

        throw new Error(
          "renderStoriesPage() is not available."
        );

      }


      await renderStoriesPage(
        appRoot,
        {

          displayName:
            AppState.profile?.displayName ||
            "Learner",

          user:
            AppState.user,

          profile:
            AppState.profile

        }
      );


      return;

    }


    // =====================================================
    // CHAT
    // =====================================================

    if (
      page === "chat"
    ) {

      if (
        typeof renderChatPage !==
        "function"
      ) {

        throw new Error(
          "renderChatPage() is not available."
        );

      }


      await renderChatPage(
        appRoot,
        {

          user:
            AppState.user,

          profile:
            AppState.profile,

          displayName:
            AppState.profile?.displayName ||
            "Learner"

        }
      );


      return;

    }


    // =====================================================
    // PROFILE
    // =====================================================
    //
    // Profile page is loaded dynamically so app.js does not
    // break if its implementation is changed independently.
    // =====================================================

    if (
      page === "profile"
    ) {

      const profileModule =
        await import(
          "./pages/profile-page.js"
        );


      if (
        typeof profileModule.renderProfilePage ===
        "function"
      ) {

        await profileModule.renderProfilePage(
          appRoot,
          {

            user:
              AppState.user,

            profile:
              AppState.profile,

            displayName:
              AppState.profile?.displayName ||
              "Learner"

          }
        );


        return;

      }


      if (
        typeof profileModule.renderPage ===
        "function"
      ) {

        await profileModule.renderPage(
          appRoot,
          {

            user:
              AppState.user,

            profile:
              AppState.profile

          }
        );


        return;

      }


      throw new Error(
        "profile-page.js does not export renderProfilePage() or renderPage()."
      );

    }


    throw new Error(
      `No renderer found for "${page}".`
    );


  } catch (error) {

    console.error(
      `Unable to open ${page} page:`,
      error
    );


    renderPageError(
      page
    );

  }

}


// =========================================================
// NAVIGATION
// =========================================================
//
// Central navigation function.
//
// Dashboard:
//
// data-dashboard-page="grammar"
// data-dashboard-page="vocabulary"
// data-dashboard-page="stories"
// data-dashboard-page="chat"
// data-dashboard-page="profile"
//
// Pages can return to Dashboard by dispatching:
//
// zeng:navigate
//
// =========================================================

async function navigateTo(
  page
) {

  if (
    page === "dashboard"
  ) {

    if (
      !AppState.user ||
      !AppState.profile
    ) {

      return;

    }


    AppState.currentPage =
      "dashboard";


    renderDashboard({

      user:
        AppState.user,

      profile:
        AppState.profile

    });


    return;

  }


  await openPage(
    page
  );

}


// =========================================================
// REAL DASHBOARD
// =========================================================

function renderDashboard(
  session
) {

  if (!appRoot) {
    return;
  }


  const profile =
    session.profile || {};


  const displayName =
    profile.displayName ||
    session.user?.displayName ||
    "Learner";


  const email =
    profile.email ||
    session.user?.email ||
    "";


  appRoot.innerHTML = `

    <div class="page">

      <div
        class="page-container"
        style="
          min-height:100dvh;
          padding:20px 16px 32px;
        "
      >

        <div
          style="
            width:min(100%,700px);
            margin:0 auto;
          "
        >

          <!-- ===========================================
               HEADER
               =========================================== -->

          <div
            style="
              display:flex;
              align-items:center;
              justify-content:space-between;
              gap:12px;
              margin-bottom:20px;
            "
          >

            <div>

              <div
                style="
                  font-size:13px;
                  color:var(--text-secondary);
                "
              >
                ZenG English Learn
              </div>


              <div
                style="
                  margin-top:3px;
                  font-size:24px;
                  font-weight:800;
                  color:var(--primary);
                "
              >
                Hello,
                ${escapeHTML(displayName)}
                👋
              </div>

            </div>


            <button
              type="button"
              class="dashboard-profile-button"
              data-dashboard-page="profile"
              aria-label="Open profile"
              style="
                width:48px;
                height:48px;
                border:none;
                border-radius:50%;
                background:var(--surface-soft);
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:24px;
                flex-shrink:0;
                cursor:pointer;
              "
            >
              👤
            </button>

          </div>


          <!-- ===========================================
               WELCOME CARD
               =========================================== -->

          <div
            class="card"
            style="
              padding:22px;
              margin-bottom:18px;
            "
          >

            <div
              style="
                font-size:36px;
                margin-bottom:8px;
              "
            >
              🌿
            </div>


            <div
              style="
                font-size:20px;
                font-weight:800;
              "
            >
              Start Learning English
            </div>


            <div
              style="
                margin-top:7px;
                color:var(--text-secondary);
                font-size:13px;
                line-height:1.5;
              "
            >
              Learn English, practice grammar,
              build vocabulary and chat with confidence.
            </div>


            <div
              style="
                margin-top:16px;
                padding:12px 14px;
                border-radius:12px;
                background:var(--surface-soft);
                font-size:12px;
                color:var(--text-secondary);
              "
            >
              Account:

              <strong
                style="color:var(--text);"
              >
                ${escapeHTML(email)}
              </strong>

            </div>

          </div>


          <!-- ===========================================
               LEARNING SECTION
               =========================================== -->

          <div
            style="
              font-size:18px;
              font-weight:800;
              margin-bottom:12px;
            "
          >
            Learn English
          </div>


          <div
            style="
              display:grid;
              grid-template-columns:
                repeat(2, minmax(0, 1fr));
              gap:12px;
            "
          >

            <!-- =========================================
                 GRAMMAR
                 ========================================= -->

            <button
              type="button"
              class="card dashboard-card"
              data-dashboard-page="grammar"
              style="
                border:none;
                text-align:left;
                cursor:pointer;
                padding:18px;
              "
            >

              <div
                style="
                  font-size:30px;
                "
              >
                📝
              </div>


              <div
                style="
                  margin-top:10px;
                  font-weight:800;
                  font-size:15px;
                "
              >
                Grammar
              </div>


              <div
                style="
                  margin-top:4px;
                  font-size:11px;
                  color:var(--text-secondary);
                "
              >
                Improve your grammar
              </div>

            </button>


            <!-- =========================================
                 VOCABULARY
                 ========================================= -->

            <button
              type="button"
              class="card dashboard-card"
              data-dashboard-page="vocabulary"
              style="
                border:none;
                text-align:left;
                cursor:pointer;
                padding:18px;
              "
            >

              <div
                style="
                  font-size:30px;
                "
              >
                🧠
              </div>


              <div
                style="
                  margin-top:10px;
                  font-weight:800;
                  font-size:15px;
                "
              >
                Vocabulary
              </div>


              <div
                style="
                  margin-top:4px;
                  font-size:11px;
                  color:var(--text-secondary);
                "
              >
                Learn new words
              </div>

            </button>


            <!-- =========================================
                 STORIES
                 ========================================= -->

            <button
              type="button"
              class="card dashboard-card"
              data-dashboard-page="stories"
              style="
                border:none;
                text-align:left;
                cursor:pointer;
                padding:18px;
              "
            >

              <div
                style="
                  font-size:30px;
                "
              >
                📖
              </div>


              <div
                style="
                  margin-top:10px;
                  font-weight:800;
                  font-size:15px;
                "
              >
                Stories
              </div>


              <div
                style="
                  margin-top:4px;
                  font-size:11px;
                  color:var(--text-secondary);
                "
              >
                Read and understand
              </div>

            </button>


            <!-- =========================================
                 ENGLISH CHAT
                 ========================================= -->

            <button
              type="button"
              class="card dashboard-card"
              data-dashboard-page="chat"
              style="
                border:none;
                text-align:left;
                cursor:pointer;
                padding:18px;
              "
            >

              <div
                style="
                  font-size:30px;
                "
              >
                💬
              </div>


              <div
                style="
                  margin-top:10px;
                  font-weight:800;
                  font-size:15px;
                "
              >
                English Chat
              </div>


              <div
                style="
                  margin-top:4px;
                  font-size:11px;
                  color:var(--text-secondary);
                "
              >
                Practice conversation
              </div>

            </button>

          </div>


          <!-- ===========================================
               PROGRESS
               =========================================== -->

          <div
            class="card"
            style="
              margin-top:18px;
              padding:18px;
            "
          >

            <div
              style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:10px;
              "
            >

              <div
                style="
                  font-weight:800;
                  font-size:16px;
                "
              >
                📈 Your Progress
              </div>


              <div
                style="
                  font-size:12px;
                  color:var(--text-secondary);
                "
              >
                Coming soon
              </div>

            </div>


            <div
              style="
                margin-top:14px;
                height:8px;
                border-radius:20px;
                background:var(--surface-soft);
                overflow:hidden;
              "
            >

              <div
                style="
                  width:0%;
                  height:100%;
                  border-radius:20px;
                  background:var(--primary);
                "
              ></div>

            </div>


            <div
              style="
                margin-top:8px;
                font-size:11px;
                color:var(--text-secondary);
              "
            >
              Your learning progress will appear here.
            </div>

          </div>


          <!-- ===========================================
               PROFILE
               =========================================== -->

          <button
            type="button"
            class="card dashboard-card"
            data-dashboard-page="profile"
            style="
              width:100%;
              margin-top:12px;
              border:none;
              text-align:left;
              cursor:pointer;
              padding:16px;
              display:flex;
              align-items:center;
              gap:12px;
            "
          >

            <div
              style="
                font-size:26px;
              "
            >
              👤
            </div>


            <div>

              <div
                style="
                  font-weight:800;
                  font-size:14px;
                "
              >
                Profile
              </div>


              <div
                style="
                  margin-top:3px;
                  font-size:11px;
                  color:var(--text-secondary);
                "
              >
                Manage your account
              </div>

            </div>

          </button>


          <!-- ===========================================
               LOGOUT
               =========================================== -->

          <button
            id="dashboardLogoutButton"
            class="primary-button w-full"
            type="button"
            style="
              margin-top:18px;
            "
          >
            Logout
          </button>


          <div
            style="
              margin-top:16px;
              text-align:center;
              color:var(--text-muted);
              font-size:11px;
            "
          >
            Powered by Opnora.com
          </div>

        </div>

      </div>

    </div>

  `;


  // =======================================================
  // DASHBOARD NAVIGATION
  // =======================================================

  const dashboardCards =
    document.querySelectorAll(
      "[data-dashboard-page]"
    );


  dashboardCards.forEach(
    (card) => {

      card.addEventListener(
        "click",
        async () => {

          const page =
            card.dataset.dashboardPage;


          if (!page) {
            return;
          }


          console.log(
            "ZenG navigation:",
            page
          );


          await navigateTo(
            page
          );

        }
      );

    }
  );


  // =======================================================
  // LOGOUT
  // =======================================================

  const logoutButton =
    document.getElementById(
      "dashboardLogoutButton"
    );


  logoutButton?.addEventListener(
    "click",
    async () => {

      try {

        logoutButton.disabled =
          true;

        logoutButton.textContent =
          "Logging out...";


        const {
          logoutUser
        } = await import(
          "./services/auth-service.js"
        );


        await logoutUser();


      } catch (error) {

        console.error(
          "Logout error:",
          error
        );


        logoutButton.disabled =
          false;

        logoutButton.textContent =
          "Logout";

      }

    }
  );

}


// =========================================================
// AUTHENTICATED USER
// =========================================================

async function handleAuthenticatedUser(
  session
) {

  AppState.user =
    session.user;


  AppState.profile =
    session.profile;


  AppState.currentPage =
    "dashboard";


  // -------------------------------------------------------
  // FCM device registration
  // -------------------------------------------------------

  try {

    if (
      "serviceWorker" in
      navigator
    ) {

      const registration =
        await navigator
          .serviceWorker
          .ready;


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
  // Dashboard
  // -------------------------------------------------------

  renderDashboard(
    session
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


  renderAuthView(
    appRoot
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


  // -------------------------------------------------------
  // Firebase is still checking saved session
  // -------------------------------------------------------

  if (
    session.loading
  ) {

    showSplash();

    return;

  }


  // -------------------------------------------------------
  // Logged in
  // -------------------------------------------------------

  if (
    session.user
  ) {

    await handleAuthenticatedUser(
      session
    );

  }

  // -------------------------------------------------------
  // Logged out
  // -------------------------------------------------------

  else {

    handleLoggedOutUser();

  }


  hideSplash();

}


// =========================================================
// INTERNAL NAVIGATION EVENTS
// =========================================================
//
// Any page can return to Dashboard:
//
// window.dispatchEvent(
//   new CustomEvent(
//     "zeng:navigate",
//     {
//       detail:{
//         page:"dashboard"
//       }
//     }
//   )
// );
//
// =========================================================

window.addEventListener(
  "zeng:navigate",
  async (event) => {

    const page =
      event.detail?.page;


    if (!page) {
      return;
    }


    await navigateTo(
      page
    );

  }
);


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


          if (appRoot) {

            appRoot.innerHTML = `

              <div class="page">

                <div
                  class="page-container"
                  style="
                    min-height:100dvh;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    padding:20px;
                  "
                >

                  <div
                    class="card"
                    style="
                      width:min(100%,430px);
                      text-align:center;
                      padding:24px;
                    "
                  >

                    <div
                      style="
                        font-size:40px;
                        margin-bottom:10px;
                      "
                    >
                      🌿
                    </div>


                    <div
                      style="
                        font-size:20px;
                        font-weight:800;
                      "
                    >
                      Something went wrong
                    </div>


                    <div
                      style="
                        margin-top:8px;
                        color:var(--text-secondary);
                        font-size:12px;
                        line-height:1.5;
                      "
                    >
                      Please refresh the app and try again.
                    </div>


                    <div
                      style="
                        margin-top:16px;
                        color:var(--text-muted);
                        font-size:11px;
                      "
                    >
                      Powered by Opnora.com
                    </div>

                  </div>

                </div>

              </div>

            `;

          }

        }

      }
    );

  } catch (error) {

    console.error(
      "Unable to start ZenG:",
      error
    );


    hideSplash();


    if (appRoot) {

      appRoot.innerHTML = `

        <div class="page">

          <div
            class="page-container"
            style="
              min-height:100dvh;
              display:flex;
              align-items:center;
              justify-content:center;
              padding:20px;
            "
          >

            <div
              class="card"
              style="
                width:min(100%,430px);
                text-align:center;
                padding:24px;
              "
            >

              <div
                style="
                  font-size:40px;
                "
              >
                🌿
              </div>


              <div
                style="
                  margin-top:10px;
                  font-weight:800;
                  font-size:20px;
                "
              >
                Unable to start app
              </div>


              <div
                style="
                  margin-top:8px;
                  color:var(--text-secondary);
                  font-size:12px;
                  line-height:1.5;
                "
              >
                Please refresh the page and try again.
              </div>


              <div
                style="
                  margin-top:16px;
                  color:var(--text-muted);
                  font-size:11px;
                "
              >
                Powered by Opnora.com
              </div>

            </div>

          </div>

        </div>

      `;

    }

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
// EXPORT
// =========================================================

export {

  AppState,

  navigateTo,

  renderDashboard

};
