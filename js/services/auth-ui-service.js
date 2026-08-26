// =========================================================
// ZenG English Learn
// Authentication UI Service
// =========================================================

import {
  loginUser
} from "./auth-service.js";

import {
  registerAccount
} from "./registration-service.js";


// =========================================================
// AUTH UI STATE
// =========================================================

let currentMode = "login";


// =========================================================
// AUTH VIEW
// =========================================================

function renderAuthView(
  container
) {

  if (!container) {
    return;
  }


  renderLoginView(
    container
  );

}


// =========================================================
// LOGIN VIEW
// =========================================================

function renderLoginView(
  container
) {

  currentMode =
    "login";


  container.innerHTML = `

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
          "
        >

          <div
            style="
              text-align:center;
              margin-bottom:24px;
            "
          >

            <div
              style="
                font-size:42px;
                margin-bottom:8px;
              "
            >
              🌿
            </div>

            <div
              style="
                font-size:23px;
                font-weight:800;
                color:var(--primary);
              "
            >
              ZenG English Learn
            </div>

            <div
              style="
                margin-top:6px;
                color:var(--text-secondary);
                font-size:13px;
              "
            >
              Learn English. Practice. Chat.
            </div>

          </div>


          <form
            id="loginForm"
            novalidate
          >

            <div class="form-group">

              <label
                class="form-label"
                for="loginEmail"
              >
                Email
              </label>

              <input
                class="form-input"
                id="loginEmail"
                type="email"
                autocomplete="email"
                placeholder="Enter your email"
                required
              >

            </div>


            <div class="form-group">

              <label
                class="form-label"
                for="loginPassword"
              >
                Password
              </label>

              <input
                class="form-input"
                id="loginPassword"
                type="password"
                autocomplete="current-password"
                placeholder="Enter your password"
                required
              >

            </div>


            <div
              id="loginError"
              class="text-danger"
              style="
                min-height:18px;
                margin-bottom:10px;
                font-size:12px;
              "
            ></div>


            <button
              class="primary-button w-full"
              id="loginSubmit"
              type="submit"
            >
              Login
            </button>

          </form>


          <div
            style="
              margin-top:18px;
              text-align:center;
              color:var(--text-secondary);
              font-size:13px;
            "
          >

            Don't have an account?

            <button
              type="button"
              id="showRegisterButton"
              style="
                margin-left:4px;
                background:transparent;
                color:var(--primary);
                font-weight:750;
                cursor:pointer;
              "
            >
              Create Account
            </button>

          </div>


          <div
            style="
              margin-top:22px;
              text-align:center;
              color:var(--text-muted);
              font-size:11px;
            "
          >
            Powered by oprenora.com
          </div>

        </div>

      </div>

    </div>

  `;


  attachLoginEvents(
    container
  );

}


// =========================================================
// REGISTER VIEW
// =========================================================

function renderRegisterView(
  container
) {

  currentMode =
    "register";


  container.innerHTML = `

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
          "
        >

          <div
            style="
              text-align:center;
              margin-bottom:20px;
            "
          >

            <div
              style="
                font-size:38px;
                margin-bottom:7px;
              "
            >
              🌿
            </div>

            <div
              style="
                font-size:22px;
                font-weight:800;
                color:var(--primary);
              "
            >
              Create Account
            </div>

            <div
              style="
                margin-top:5px;
                color:var(--text-secondary);
                font-size:12px;
              "
            >
              Start your English learning journey
            </div>

          </div>


          <form
            id="registerForm"
            novalidate
          >

            <div class="form-group">

              <label
                class="form-label"
                for="registerLoginId"
              >
                Login ID
              </label>

              <input
                class="form-input"
                id="registerLoginId"
                type="text"
                autocomplete="username"
                placeholder="Choose your permanent Login ID"
                maxlength="24"
                required
              >

              <div
                style="
                  margin-top:5px;
                  color:var(--text-muted);
                  font-size:10px;
                "
              >
                Login ID cannot be changed later.
              </div>

            </div>


            <div class="form-group">

              <label
                class="form-label"
                for="registerDisplayName"
              >
                Display Name
              </label>

              <input
                class="form-input"
                id="registerDisplayName"
                type="text"
                autocomplete="name"
                placeholder="Enter your unique name"
                maxlength="30"
                required
              >

            </div>


            <div class="form-group">

              <label
                class="form-label"
                for="registerEmail"
              >
                Email
              </label>

              <input
                class="form-input"
                id="registerEmail"
                type="email"
                autocomplete="email"
                placeholder="Enter your email"
                required
              >

            </div>


            <div class="form-group">

              <label
                class="form-label"
                for="registerPassword"
              >
                Password
              </label>

              <input
                class="form-input"
                id="registerPassword"
                type="password"
                autocomplete="new-password"
                placeholder="Create a password"
                required
              >

            </div>


            <div class="form-group">

              <label
                class="form-label"
                for="registerConfirmPassword"
              >
                Confirm Password
              </label>

              <input
                class="form-input"
                id="registerConfirmPassword"
                type="password"
                autocomplete="new-password"
                placeholder="Enter password again"
                required
              >

            </div>


            <div
              id="registerError"
              class="text-danger"
              style="
                min-height:18px;
                margin-bottom:10px;
                font-size:12px;
              "
            ></div>


            <button
              class="primary-button w-full"
              id="registerSubmit"
              type="submit"
            >
              Create Account
            </button>

          </form>


          <div
            style="
              margin-top:18px;
              text-align:center;
              color:var(--text-secondary);
              font-size:13px;
            "
          >

            Already have an account?

            <button
              type="button"
              id="showLoginButton"
              style="
                margin-left:4px;
                background:transparent;
                color:var(--primary);
                font-weight:750;
                cursor:pointer;
              "
            >
              Login
            </button>

          </div>


          <div
            style="
              margin-top:20px;
              text-align:center;
              color:var(--text-muted);
              font-size:11px;
            "
          >
            Powered by oprenora.com
          </div>

        </div>

      </div>

    </div>

  `;


  attachRegisterEvents(
    container
  );

}


// =========================================================
// LOGIN EVENTS
// =========================================================

function attachLoginEvents(
  container
) {

  const form =
    container.querySelector(
      "#loginForm"
    );


  const errorBox =
    container.querySelector(
      "#loginError"
    );


  const submitButton =
    container.querySelector(
      "#loginSubmit"
    );


  const registerButton =
    container.querySelector(
      "#showRegisterButton"
    );


  registerButton?.addEventListener(
    "click",
    () => {

      renderRegisterView(
        container
      );

    }
  );


  form?.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      errorBox.textContent =
        "";


      const email =
        container
          .querySelector(
            "#loginEmail"
          )
          ?.value
          .trim();


      const password =
        container
          .querySelector(
            "#loginPassword"
          )
          ?.value;


      if (!email) {

        errorBox.textContent =
          "Please enter your email.";

        return;
      }


      if (!password) {

        errorBox.textContent =
          "Please enter your password.";

        return;
      }


      submitButton.disabled =
        true;

      submitButton.textContent =
        "Logging in...";


      try {

        await loginUser(
          email,
          password
        );


        /*
          Firebase Auth state listener in app.js will
          automatically detect the successful login and
          route the application to the authenticated state.
        */

      } catch (error) {

        console.error(
          "Login error:",
          error
        );


        errorBox.textContent =
          getAuthErrorMessage(
            error
          );


        submitButton.disabled =
          false;

        submitButton.textContent =
          "Login";

      }

    }
  );

}


// =========================================================
// REGISTER EVENTS
// =========================================================

function attachRegisterEvents(
  container
) {

  const form =
    container.querySelector(
      "#registerForm"
    );


  const errorBox =
    container.querySelector(
      "#registerError"
    );


  const submitButton =
    container.querySelector(
      "#registerSubmit"
    );


  const loginButton =
    container.querySelector(
      "#showLoginButton"
    );


  loginButton?.addEventListener(
    "click",
    () => {

      renderLoginView(
        container
      );

    }
  );


  form?.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      errorBox.textContent =
        "";


      const loginId =
        container
          .querySelector(
            "#registerLoginId"
          )
          ?.value
          .trim();


      const displayName =
        container
          .querySelector(
            "#registerDisplayName"
          )
          ?.value
          .trim();


      const email =
        container
          .querySelector(
            "#registerEmail"
          )
          ?.value
          .trim();


      const password =
        container
          .querySelector(
            "#registerPassword"
          )
          ?.value;


      const confirmPassword =
        container
          .querySelector(
            "#registerConfirmPassword"
          )
          ?.value;


      if (!loginId) {

        errorBox.textContent =
          "Please choose a Login ID.";

        return;
      }


      if (!displayName) {

        errorBox.textContent =
          "Please enter your display name.";

        return;
      }


      if (!email) {

        errorBox.textContent =
          "Please enter your email.";

        return;
      }


      if (!password) {

        errorBox.textContent =
          "Please create a password.";

        return;
      }


      if (
        password !==
        confirmPassword
      ) {

        errorBox.textContent =
          "Passwords do not match.";

        return;
      }


      submitButton.disabled =
        true;

      submitButton.textContent =
        "Creating account...";


      try {

        await registerAccount({

          email,

          password,

          loginId,

          displayName

        });


        /*
          Firebase Auth state listener will detect the new
          authenticated user and app.js will continue the
          startup/authenticated flow.
        */

      } catch (error) {

        console.error(
          "Registration error:",
          error
        );


        errorBox.textContent =
          getAuthErrorMessage(
            error
          );


        submitButton.disabled =
          false;

        submitButton.textContent =
          "Create Account";

      }

    }
  );

}


// =========================================================
// FIREBASE ERROR MESSAGE
// =========================================================

function getAuthErrorMessage(
  error
) {

  const code =
    error?.code || "";


  switch (code) {

    case "auth/email-already-in-use":
      return "This email is already registered.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Password is too weak. Please choose a stronger password.";

    case "auth/user-not-found":
      return "No account was found with these login details.";

    case "auth/wrong-password":
      return "Incorrect password.";

    case "auth/invalid-credential":
      return "Incorrect email or password.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    default:
      return error?.message ||
        "Something went wrong. Please try again.";

  }

}


// =========================================================
// EXPORT
// =========================================================

export {
  renderAuthView,
  renderLoginView,
  renderRegisterView
};
