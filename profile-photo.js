// =========================================================
// ZenG English Learn
// Profile Photo UI
// =========================================================

import {
  auth
} from "./firebase-services.js";

import {
  uploadProfilePhoto,
  removeProfilePhoto
} from "./services/profile-service.js";


// =========================================================
// RENDER PROFILE PHOTO
// =========================================================

function renderProfilePhoto(
  container,
  currentPhotoURL = "",
  displayName = ""
) {

  if (!container) {
    return;
  }


  const safePhotoURL =
    String(
      currentPhotoURL || ""
    );


  const safeName =
    String(
      displayName || "User"
    ).trim();


  const initial =
    safeName
      .charAt(0)
      .toUpperCase() || "U";


  container.innerHTML = `

    <div
      class="zeng-profile-photo-section"
      style="
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:12px;
        padding:16px 0;
      "
    >

      <div
        id="zengProfilePhotoPreview"
        style="
          width:92px;
          height:92px;
          border-radius:50%;
          overflow:hidden;
          display:flex;
          align-items:center;
          justify-content:center;
          background:#f7eaf0;
          border:2px solid #eee;
          font-size:34px;
          font-weight:700;
        "
      >

        ${
          safePhotoURL
          ?
          `<img
            src="${escapeHTML(
              safePhotoURL
            )}"
            alt=""
            style="
              width:100%;
              height:100%;
              object-fit:cover;
            "
          >`
          :
          escapeHTML(initial)
        }

      </div>


      <input
        type="file"
        id="zengProfilePhotoInput"
        accept="image/jpeg,image/png,image/webp"
        style="display:none;"
      >


      <div
        style="
          display:flex;
          gap:8px;
          flex-wrap:wrap;
          justify-content:center;
        "
      >

        <button
          type="button"
          id="zengChooseProfilePhoto"
          style="
            border:0;
            border-radius:10px;
            padding:9px 14px;
            cursor:pointer;
          "
        >
          ${
            safePhotoURL
              ?
              "Change photo"
              :
              "Add photo"
          }
        </button>


        ${
          safePhotoURL
          ?
          `
            <button
              type="button"
              id="zengRemoveProfilePhoto"
              style="
                border:0;
                border-radius:10px;
                padding:9px 14px;
                cursor:pointer;
              "
            >
              Remove
            </button>
          `
          :
          ""
        }

      </div>


      <div
        id="zengProfilePhotoStatus"
        style="
          min-height:20px;
          font-size:13px;
          text-align:center;
        "
      ></div>

    </div>

  `;


  const input =
    container.querySelector(
      "#zengProfilePhotoInput"
    );


  const chooseButton =
    container.querySelector(
      "#zengChooseProfilePhoto"
    );


  const removeButton =
    container.querySelector(
      "#zengRemoveProfilePhoto"
    );


  const status =
    container.querySelector(
      "#zengProfilePhotoStatus"
    );


  chooseButton?.addEventListener(
    "click",
    () => {

      input?.click();

    }
  );


  input?.addEventListener(
    "change",
    async () => {

      const file =
        input.files?.[0];


      if (!file) {

        return;

      }


      const uid =
        auth.currentUser?.uid;


      if (!uid) {

        if (status) {

          status.textContent =
            "Please sign in again.";

        }

        return;

      }


      try {

        if (status) {

          status.textContent =
            "Uploading photo...";

        }


        chooseButton.disabled =
          true;


        if (removeButton) {

          removeButton.disabled =
            true;

        }


        const result =
          await uploadProfilePhoto(
            uid,
            file
          );


        window.dispatchEvent(
          new CustomEvent(
            "zeng:profile-photo-updated",
            {
              detail: {

                photoURL:
                  result.photoURL

              }
            }
          )
        );


        renderProfilePhoto(
          container,
          result.photoURL,
          safeName
        );


      } catch (error) {

        console.error(
          "Profile photo upload error:",
          error
        );


        if (status) {

          status.textContent =
            error?.message ||
            "Unable to upload profile photo.";

        }

      } finally {

        if (input) {

          input.value = "";

        }

      }

    }
  );


  removeButton?.addEventListener(
    "click",
    async () => {

      const uid =
        auth.currentUser?.uid;


      if (!uid) {

        if (status) {

          status.textContent =
            "Please sign in again.";

        }

        return;

      }


      try {

        if (status) {

          status.textContent =
            "Removing photo...";

        }


        chooseButton.disabled =
          true;


        removeButton.disabled =
          true;


        await removeProfilePhoto(
          uid,
          safePhotoURL
        );


        window.dispatchEvent(
          new CustomEvent(
            "zeng:profile-photo-updated",
            {
              detail: {

                photoURL: ""

              }
            }
          )
        );


        renderProfilePhoto(
          container,
          "",
          safeName
        );


      } catch (error) {

        console.error(
          "Profile photo removal error:",
          error
        );


        if (status) {

          status.textContent =
            error?.message ||
            "Unable to remove profile photo.";

        }

      }

    }
  );

}


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHTML(value) {

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
// EXPORT
// =========================================================

export {

  renderProfilePhoto

};
