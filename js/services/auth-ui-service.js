// =========================================================
// ZenG English Learn
// Authentication UI Service
// =========================================================

import {
  loginUser,
  sendVerificationEmail,
  reloadCurrentAuthUser,
  sendPasswordReset,
  getCurrentAuthUser
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


            <button
              type="button"
              id="forgotPasswordButton"
              style="
                display:block;
                margin:-2px 0 14px auto;
                background:transparent;
                border:none;
                color:var(--primary);
                font-size:12px;
                font-weight:700;
                cursor:pointer;
                padding:0;
              "
            >
              Forgot Password?
            </button>


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
            Powered by opnora.com
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

              <div
                style="
                  margin-top:5px;
                  color:var(--text-muted);
                  font-size:10px;
                "
              >
                Your name must be unique.
              </div>

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
            Powered by opnora.com
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
// EMAIL VERIFICATION VIEW
// =========================================================

function renderVerificationView(
  container,
  email = ""
) {

  currentMode =
    "verification";


  container.innerHTML = `

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
            padding:28px 22px;
          "
        >

          <div
            style="
              font-size:44px;
            "
          >
            📧
          </div>


          <div
            style="
              margin-top:12px;
              font-size:21px;
              font-weight:800;
            "
          >
            Verify Your Email
          </div>


          <div
            style="
              margin-top:9px;
              color:var(--text-secondary);
              font-size:13px;
              line-height:1.5;
            "
          >
            We sent a verification link to
          </div>


          <div
            style="
              margin-top:7px;
              font-size:13px;
              font-weight:800;
              word-break:break-word;
            "
          >
            ${escapeHTML(email)}
          </div>


          <div
            id="verificationMessage"
            style="
              min-height:20px;
              margin-top:14px;
              font-size:12px;
              color:var(--text-secondary);
            "
          >
          </div>


          <button
            type="button"
            id="checkVerificationButton"
            class="primary-button w-full"
            style="
              margin-top:10px;
            "
          >
            I Verified My Email
          </button>


          <button
            type="button"
            id="resendVerificationButton"
            style="
              width:100%;
              margin-top:10px;
              padding:11px;
              border:none;
              background:var(--surface-soft);
              color:var(--primary);
              border-radius:10px;
              font-weight:750;
              cursor:pointer;
            "
          >
            Resend Verification Email
          </button>


          <button
            type="button"
            id="verificationLogoutButton"
            style="
              margin-top:16px;
              border:none;
              background:transparent;
              color:var(--text-secondary);
              cursor:pointer;
              font-size:12px;
            "
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  `;


  attachVerificationEvents(
    container
  );

}


// =========================================================
// FORGOT PASSWORD VIEW
// =========================================================

function renderForgotPasswordView(
  container
) {

  currentMode =
    "forgot-password";


  container.innerHTML = `

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
          "
        >

          <div
            style="
              text-align:center;
              margin-bottom:22px;
            "
          >

            <div
              style="
                font-size:42px;
              "
            >
              🔐
            </div>


            <div
              style="
                margin-top:8px;
                font-size:22px;
                font-weight:800;
              "
            >
              Reset Password
            </div>


            <div
              style="
                margin-top:6px;
                color:var(--text-secondary);
                font-size:12px;
                line-height:1.5;
              "
            >
              Enter your email and we'll send you a
              password reset link.
            </div>

          </div>


          <form
            id="forgotPasswordForm"
            novalidate
          >

            <div class="form-group">

              <label
                class="form-label"
                for="forgotPasswordEmail"
              >
                Email
              </label>

              <input
                class="form-input"
                id="forgotPasswordEmail"
                type="email"
                autocomplete="email"
                placeholder="Enter your email"
                required
              >

            </div>


            <div
              id="forgotPasswordError"
              style="
                min-height:18px;
                margin-bottom:10px;
                font-size:12px;
                color:var(--text-danger,#d62839);
              "
            ></div>


            <div
              id="forgotPasswordSuccess"
              style="
                min-height:18px;
                margin-bottom:10px;
                font-size:12px;
                color:var(--primary);
              "
            ></div>


            <button
              type="submit"
              id="forgotPasswordSubmit"
              class="primary-button w-full"
            >
              Send Reset Link
            </button>

          </form>


          <button
            type="button"
            id="backToLoginButton"
            style="
              display:block;
              margin:18px auto 0;
              border:none;
              background:transparent;
              color:var(--primary);
              font-weight:750;
              cursor:pointer;
              font-size:13px;
            "
          >
            ← Back to Login
          </button>


          <div
            style="
              margin-top:22px;
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


  attachForgotPasswordEvents(
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


  const forgotPasswordButton =
    container.querySelector(
      "#forgotPasswordButton"
    );


  registerButton?.addEventListener(
    "click",
    () => {

      renderRegisterView(
        container
      );

    }
  );


  forgotPasswordButton?.addEventListener(
    "click",
    () => {

      renderForgotPasswordView(
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

        const user =
          await loginUser(
            email,
            password
          );


        /*
          Unverified users are kept authenticated
          temporarily so they can receive/resend the
          verification email and check again.
        */

        if (
          !user.emailVerified
        ) {

          renderVerificationView(
            container,
            user.email || email
          );

          return;

        }


        // Verified user:
        // Firebase Auth state listener in app.js
        // handles the authenticated state.

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

          displayName

        });


        /*
          registration-service.js creates the account.
          The current authenticated user is then used to
          send the verification email.
        */

        const user =
          getCurrentAuthUser();


        if (
          user &&
          !user.emailVerified
        ) {

          await sendVerificationEmail();


          renderVerificationView(
            container,
            user.email || email
          );

          return;

        }


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
// VERIFICATION EVENTS
// =========================================================

function attachVerificationEvents(
  container
) {

  const checkButton =
    container.querySelector(
      "#checkVerificationButton"
    );


  const resendButton =
    container.querySelector(
      "#resendVerificationButton"
    );


  const logoutButton =
    container.querySelector(
      "#verificationLogoutButton"
    );


  const messageBox =
    container.querySelector(
      "#verificationMessage"
    );


  checkButton?.addEventListener(
    "click",
    async () => {

      messageBox.textContent =
        "Checking verification...";


      checkButton.disabled =
        true;


      try {

        await reloadCurrentAuthUser();


        const user =
          getCurrentAuthUser();


        if (
          user?.emailVerified
        ) {

          messageBox.textContent =
            "Email verified successfully. Opening your account...";


          /*
            Reloading the Auth user updates the Firebase
            Auth state. The app session listener can then
            continue with the authenticated state.
          */

          window.dispatchEvent(
            new CustomEvent(
              "zeng:auth-verified"
            )
          );


          return;

        }


        messageBox.textContent =
          "Email is not verified yet. Please click the link in your email.";

        checkButton.disabled =
          false;

      } catch (error) {

        console.error(
          "Email verification check error:",
          error
        );


        messageBox.textContent =
          getAuthErrorMessage(
            error
          );


        checkButton.disabled =
          false;

      }

    }
  );


  resendButton?.addEventListener(
    "click",
    async () => {

      resendButton.disabled =
        true;

      resendButton.textContent =
        "Sending...";


      messageBox.textContent =
        "";


      try {

        await sendVerificationEmail();


        messageBox.textContent =
          "Verification email sent. Please check your inbox.";

      } catch (error) {

        console.error(
          "Resend verification error:",
          error
        );


        messageBox.textContent =
          getAuthErrorMessage(
            error
          );

      }


      resendButton.disabled =
        false;

      resendButton.textContent =
        "Resend Verification Email";

    }
  );


  logoutButton?.addEventListener(
    "click",
    async () => {

      try {

        const {
          logoutUser
        } = await import(
          "./auth-service.js"
        );


        await logoutUser();


        renderLoginView(
          container
        );

      } catch (error) {

        console.error(
          "Verification logout error:",
          error
        );

      }

    }
  );

}


// =========================================================
// FORGOT PASSWORD EVENTS
// =========================================================

function attachForgotPasswordEvents(
  container
) {

  const form =
    container.querySelector(
      "#forgotPasswordForm"
    );


  const emailInput =
    container.querySelector(
      "#forgotPasswordEmail"
    );


  const errorBox =
    container.querySelector(
      "#forgotPasswordError"
    );


  const successBox =
    container.querySelector(
      "#forgotPasswordSuccess"
    );


  const submitButton =
    container.querySelector(
      "#forgotPasswordSubmit"
    );


  const backButton =
    container.querySelector(
      "#backToLoginButton"
    );


  backButton?.addEventListener(
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

      successBox.textContent =
        "";


      const email =
        emailInput
          ?.value
          .trim();


      if (!email) {

        errorBox.textContent =
          "Please enter your email.";

        return;

      }


      submitButton.disabled =
        true;

      submitButton.textContent =
        "Sending...";


      try {

        await sendPasswordReset(
          email
        );


        successBox.textContent =
          "Password reset link sent. Please check your email.";

      } catch (error) {

        console.error(
          "Password reset error:",
          error
        );


        errorBox.textContent =
          getAuthErrorMessage(
            error
          );

      }


      submitButton.disabled =
        false;

      submitButton.textContent =
        "Send Reset Link";

    }
  );

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
      return "No account was found with this email.";

    case "auth/wrong-password":
      return "Incorrect password.";

    case "auth/invalid-credential":
      return "Incorrect email or password.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled.";

    case "auth/requires-recent-login":
      return "Please log in again and try this action.";

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
  renderRegisterView,
  renderVerificationView,
  renderForgotPasswordView
};
