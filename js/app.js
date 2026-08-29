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
  renderAuthView,
  renderVerificationView
} from "./services/auth-ui-service.js";


// =========================================================
// PROFILE / ACCOUNT SERVICES
// =========================================================

import {
  updateDisplayName,
  removeProfilePhoto
} from "./services/profile-service.js";

import {
  deleteUserDocument
} from "./services/user-service.js";

import {
  deleteUser
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  auth
} from "./firebase-services.js";


// =========================================================
// PAGE MODULES
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
// PAGE LOADING
// =========================================================

function showPageLoading() {

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
    ).slice(1);


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
            Powered by opnora.com
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

async function openPage(
  page
) {

  if (!appRoot) {
    return;
  }


  const allowedPages = [

    "grammar",

    "vocabulary",

    "stories",

    "chat"

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


  if (
    !AppState.user
  ) {

    return;

  }


  AppState.currentPage =
    page;


  showPageLoading();


  try {

    // =====================================================
    // GRAMMAR
    // =====================================================

    if (
      page === "grammar"
    ) {

      await renderGrammarPage(
        appRoot,
        {

          user:
            AppState.user,

          profile:
            AppState.profile,

          displayName:
            AppState.profile?.displayName ||
            AppState.user?.displayName ||
            "Learner"

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

      await renderVocabularyPage(
        appRoot,
        {

          user:
            AppState.user,

          profile:
            AppState.profile,

          displayName:
            AppState.profile?.displayName ||
            AppState.user?.displayName ||
            "Learner"

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

      await renderStoriesPage(
        appRoot,
        {

          user:
            AppState.user,

          profile:
            AppState.profile,

          displayName:
            AppState.profile?.displayName ||
            AppState.user?.displayName ||
            "Learner"

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

      await renderChatPage(
        appRoot,
        {

          user:
            AppState.user,

          profile:
            AppState.profile,

          displayName:
            AppState.profile?.displayName ||
            AppState.user?.displayName ||
            "Learner"

        }
      );


      return;

    }


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

async function navigateTo(
  page
) {

  // -------------------------------------------------------
  // Dashboard
  // -------------------------------------------------------

  if (
    page === "dashboard"
  ) {

    AppState.currentPage =
      "dashboard";


    if (
      AppState.user
    ) {

      renderDashboard({

        user:
          AppState.user,

        profile:
          AppState.profile || {}

      });

    }

    return;

  }


  // -------------------------------------------------------
  // Learning pages
  // -------------------------------------------------------

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
              align-items:flex-start;
              justify-content:space-between;
              gap:12px;
              margin-bottom:20px;
            "
          >

            <!-- =========================================
                 TITLE + NAME
                 ========================================= -->

            <div
              style="
                min-width:0;
              "
            >

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


            <!-- =========================================
                 DASHBOARD MENU
                 ========================================= -->

            <div
              style="
                position:relative;
                flex-shrink:0;
              "
            >

              <button
                type="button"
                id="dashboardMenuButton"
                aria-label="Menu"
                style="
                  width:42px;
                  height:42px;
                  border:none;
                  border-radius:12px;
                  background:var(--surface-soft);
                  color:var(--text);
                  font-size:22px;
                  cursor:pointer;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                "
              >
                ☰
              </button>


              <!-- =====================================
                   MENU PANEL
                   ===================================== -->

              <div
                id="dashboardMenuPanel"
                style="
                  display:none;
                  position:absolute;
                  top:48px;
                  right:0;
                  z-index:1000;
                  width:220px;
                  padding:8px;
                  background:var(--surface);
                  border:1px solid var(--border);
                  border-radius:14px;
                  box-shadow:0 8px 24px rgba(0,0,0,0.12);
                "
              >

                <button
                  type="button"
                  id="dashboardMenuEditName"
                  style="
                    width:100%;
                    border:none;
                    background:transparent;
                    text-align:left;
                    padding:12px;
                    border-radius:10px;
                    font-size:14px;
                    cursor:pointer;
                  "
                >
                  ✏️ Edit Name
                </button>


                <button
                  type="button"
                  id="dashboardMenuDeleteAccount"
                  style="
                    width:100%;
                    border:none;
                    background:transparent;
                    text-align:left;
                    padding:12px;
                    border-radius:10px;
                    font-size:14px;
                    cursor:pointer;
                  "
                >
                  🗑️ Delete Account
                </button>


                <button
                  type="button"
                  id="dashboardMenuPrivacy"
                  style="
                    width:100%;
                    border:none;
                    background:transparent;
                    text-align:left;
                    padding:12px;
                    border-radius:10px;
                    font-size:14px;
                    cursor:pointer;
                  "
                >
                  🔒 Privacy
                </button>


                <button
                  type="button"
                  id="dashboardMenuHelp"
                  style="
                    width:100%;
                    border:none;
                    background:transparent;
                    text-align:left;
                    padding:12px;
                    border-radius:10px;
                    font-size:14px;
                    cursor:pointer;
                  "
                >
                  ❓ Help
                </button>

              </div>

            </div>

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
            Powered by opnora.com
          </div>

        </div>

      </div>

    </div>

  `;


  // =======================================================
  // DASHBOARD MENU
  // =======================================================

  const dashboardMenuButton =
    document.getElementById(
      "dashboardMenuButton"
    );


  const dashboardMenuPanel =
    document.getElementById(
      "dashboardMenuPanel"
    );


  function closeDashboardMenu() {

    if (dashboardMenuPanel) {

      dashboardMenuPanel.style.display =
        "none";

    }

  }


  // -------------------------------------------------------
  // OPEN / CLOSE MENU
  // -------------------------------------------------------

  dashboardMenuButton?.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();


      if (!dashboardMenuPanel) {
        return;
      }


      dashboardMenuPanel.style.display =
        dashboardMenuPanel.style.display ===
        "block"
          ? "none"
          : "block";

    }
  );


  // -------------------------------------------------------
  // CLOSE WHEN CLICKING OUTSIDE
  // -------------------------------------------------------

  document.addEventListener(
    "click",
    (event) => {

      if (
        !dashboardMenuPanel ||
        !dashboardMenuButton
      ) {

        return;

      }


      if (
        !dashboardMenuPanel.contains(
          event.target
        ) &&
        !dashboardMenuButton.contains(
          event.target
        )
      ) {

        closeDashboardMenu();

      }

    }
  );


  // =======================================================
  // EDIT NAME
  // =======================================================

  document
    .getElementById(
      "dashboardMenuEditName"
    )
    ?.addEventListener(
      "click",
      async () => {

        closeDashboardMenu();


        const currentName =
          AppState.profile?.displayName ||
          AppState.user?.displayName ||
          "";


        const newName =
          prompt(
            "Enter your new display name:",
            currentName
          );


        if (newName === null) {
          return;
        }


        const trimmedName =
          newName
            .trim()
            .replace(
              /\s+/g,
              " "
            );


        if (!trimmedName) {

          alert(
            "Display name cannot be empty."
          );

          return;

        }


        if (
          trimmedName.length >
          30
        ) {

          alert(
            "Name must be 30 characters or less."
          );

          return;

        }


        if (
          trimmedName ===
          currentName
        ) {

          return;

        }


        const uid =
          AppState.user?.uid;


        if (!uid) {

          alert(
            "Unable to identify your account."
          );

          return;

        }


        try {

          await updateDisplayName(
            uid,
            trimmedName
          );


          AppState.profile =
            AppState.profile || {};


          AppState.profile.displayName =
            trimmedName;


          AppState.profile.displayNameLower =
            trimmedName.toLowerCase();


          if (AppState.user) {

            AppState.user.displayName =
              trimmedName;

          }


          renderDashboard({

            user:
              AppState.user,

            profile:
              AppState.profile

          });


        } catch (error) {

          console.error(
            "Display name update error:",
            error
          );


          alert(
            error?.message ||
            "Unable to update your display name."
          );

        }

      }
    );


  // =======================================================
  // DELETE ACCOUNT
  // =======================================================

  document
    .getElementById(
      "dashboardMenuDeleteAccount"
    )
    ?.addEventListener(
      "click",
      async () => {

        closeDashboardMenu();


        // -------------------------------------------------
        // REQUIRED CONFIRMATION
        // -------------------------------------------------

        const confirmed =
          confirm(
            "Delete Account?\n\n" +
            "Are you sure you want to permanently delete your account?\n\n" +
            "This action cannot be undone."
          );


        // -------------------------------------------------
        // CANCEL = NOTHING HAPPENS
        // -------------------------------------------------

        if (!confirmed) {

          return;

        }


        const currentUser =
          auth.currentUser;


        const uid =
          currentUser?.uid;


        if (
          !currentUser ||
          !uid
        ) {

          alert(
            "Unable to identify your account."
          );

          return;

        }


        try {

          // ------------------------------------------------
          // Disable menu button during deletion
          // ------------------------------------------------

          dashboardMenuButton.disabled =
            true;

          dashboardMenuButton.textContent =
            "…";


          // ------------------------------------------------
          // Remove profile photo
          // ------------------------------------------------

          try {

            await removeProfilePhoto(
              uid
            );

          } catch (photoError) {

            console.warn(
              "Profile photo cleanup warning:",
              photoError
            );

          }


          // ------------------------------------------------
          // Remove Firestore user document
          // ------------------------------------------------

          try {

            await deleteUserDocument(
              uid
            );

          } catch (firestoreError) {

            console.warn(
              "User document cleanup warning:",
              firestoreError
            );

          }


          // ------------------------------------------------
          // Remove Firebase Authentication account
          // ------------------------------------------------

          await deleteUser(
            currentUser
          );


          // ------------------------------------------------
          // Clear local application state
          // ------------------------------------------------

          AppState.user =
            null;

          AppState.profile =
            null;

          AppState.currentPage =
            "login";


          // ------------------------------------------------
          // Return to Login
          // ------------------------------------------------

          renderAuthView(
            appRoot
          );


        } catch (error) {

          console.error(
            "Account deletion error:",
            error
          );


          dashboardMenuButton.disabled =
            false;

          dashboardMenuButton.textContent =
            "☰";


          let message =
            "Unable to delete your account. Please try again.";


          if (
            error?.code ===
            "auth/requires-recent-login"
          ) {

            message =
              "For security, please log in again before deleting your account.";

          }


          alert(
            message
          );

        }

      }
    );


  // =======================================================
  // PRIVACY
  // =======================================================

  document
    .getElementById(
      "dashboardMenuPrivacy"
    )
    ?.addEventListener(
      "click",
      () => {

        closeDashboardMenu();


        alert(
          "Privacy\n\n" +

          "ZenG English Learn uses account information " +
          "such as your email address and display name " +
          "to provide account and learning features.\n\n" +

          "Your display name may be shown to other learners " +
          "when you use English Chat.\n\n" +

          "Messages and chat-related information are used " +
          "to provide the conversation features of the app.\n\n" +

          "If you use a profile photo, it is stored so the " +
          "app can provide the profile photo feature.\n\n" +

          "Notification information may be used to deliver " +
          "notifications from the app.\n\n" +

          "ZenG uses Firebase services for authentication, " +
          "database, storage and notification functionality. " +
          "These services process information as needed to " +
          "provide the corresponding app features.\n\n" +

          "You can change your display name from " +
          "Menu → Edit Name.\n\n" +

          "You can permanently delete your account from " +
          "Menu → Delete Account."
        );

      }
    );


  // =======================================================
  // HELP
  // =======================================================

  document
    .getElementById(
      "dashboardMenuHelp"
    )
    ?.addEventListener(
      "click",
      () => {

        closeDashboardMenu();


        alert(
          "Help\n\n" +

          "Forgot Password\n" +
          "On the Login screen, use the password reset " +
          "option and enter your registered email address.\n\n" +

          "Email Verification\n" +
          "After creating an account, check your email and " +
          "open the verification email to verify your account.\n\n" +

          "Edit Name\n" +
          "Open ☰ Menu → Edit Name. You can change your " +
          "display name whenever you want.\n\n" +

          "Delete Account\n" +
          "Open ☰ Menu → Delete Account. A confirmation " +
          "will appear before anything is deleted.\n\n" +

          "Need Help?\n" +
          "Website: Opnora.com\n" +
          "Email: opnoraweb@gmail.com"
        );

      }
    );


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

  const user =
    session?.user;


  if (!user) {

    return;

  }


  // -------------------------------------------------------
  // DEMO USER BYPASS
  // -------------------------------------------------------
  //
  // Existing demo users can be marked with:
  //
  // profile.isDemo === true
  //
  // or
  //
  // user.isDemo === true
  //
  // Real users must verify their email.
  //

  const isDemoUser =
    user.isDemo === true ||
    session?.profile?.isDemo === true;


  // -------------------------------------------------------
  // EMAIL VERIFICATION
  // -------------------------------------------------------

  if (
    !isDemoUser &&
    !user.emailVerified
  ) {

    AppState.user =
      user;


    AppState.profile =
      session?.profile || {};


    AppState.currentPage =
      "verification";


    renderVerificationView(
      appRoot,
      user.email || ""
    );


    return;

  }


  // -------------------------------------------------------
  // VERIFIED / DEMO USER
  // -------------------------------------------------------

  AppState.user =
    user;


  AppState.profile =
    session?.profile || {};


  AppState.currentPage =
    "dashboard";


  // -------------------------------------------------------
  // FCM DEVICE REGISTRATION
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
  // DASHBOARD
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
  // Firebase is checking saved session.
  // -------------------------------------------------------

  if (
    session.loading
  ) {

    showSplash();

    return;

  }


  // -------------------------------------------------------
  // LOGGED IN
  // -------------------------------------------------------

  if (
    session.user
  ) {

    await handleAuthenticatedUser(
      session
    );

  }

  // -------------------------------------------------------
  // LOGGED OUT
  // -------------------------------------------------------

  else {

    handleLoggedOutUser();

  }


  hideSplash();

}


// =========================================================
// EMAIL VERIFICATION COMPLETED
// =========================================================

window.addEventListener(
  "zeng:auth-verified",
  async () => {

    try {

      const {
        getCurrentAuthUser
      } = await import(
        "./services/auth-service.js"
      );


      const user =
        getCurrentAuthUser();


      if (!user) {

        return;

      }


      await handleAuthenticatedUser({

        user,

        profile:
          AppState.profile || {}

      });


    } catch (error) {

      console.error(
        "Unable to continue after email verification:",
        error
      );

    }

  }
);


// =========================================================
// INTERNAL NAVIGATION EVENTS
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
                      Powered by opnora.com
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
                Powered by opnora.com
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
