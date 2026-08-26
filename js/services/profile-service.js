// =========================================================
// ZenG English Learn
// Profile Service
// =========================================================

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

import {
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  storage,
  auth
} from "../firebase-services.js";

import {
  updateUserDocument
} from "./user-service.js";


// =========================================================
// STORAGE PATH
// =========================================================

const PROFILE_PHOTO_FOLDER =
  "zeng_englearn/profile_photos";


// =========================================================
// VALIDATION
// =========================================================

const MAX_PHOTO_SIZE =
  5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp"
];


// =========================================================
// VALIDATE PHOTO
// =========================================================

function validateProfilePhoto(file) {

  if (!file) {
    throw new Error(
      "Please select a profile photo."
    );
  }

  if (
    !ALLOWED_IMAGE_TYPES.includes(
      file.type
    )
  ) {
    throw new Error(
      "Only JPG, PNG or WEBP images are allowed."
    );
  }

  if (
    file.size > MAX_PHOTO_SIZE
  ) {
    throw new Error(
      "Profile photo must be smaller than 5 MB."
    );
  }

  return true;
}


// =========================================================
// UPLOAD PROFILE PHOTO
// =========================================================

async function uploadProfilePhoto(
  uid,
  file
) {

  if (!uid) {
    throw new Error(
      "User UID is required."
    );
  }

  validateProfilePhoto(file);


  const extension =
    file.name
      .split(".")
      .pop()
      .toLowerCase();


  const storagePath =
    `${PROFILE_PHOTO_FOLDER}/${uid}.${extension}`;


  const photoRef =
    ref(
      storage,
      storagePath
    );


  await uploadBytes(
    photoRef,
    file,
    {
      contentType: file.type
    }
  );


  const photoURL =
    await getDownloadURL(
      photoRef
    );


  // Update Firebase Authentication profile
  if (
    auth.currentUser &&
    auth.currentUser.uid === uid
  ) {

    await updateProfile(
      auth.currentUser,
      {
        photoURL
      }
    );

  }


  // Update Firestore user profile
  await updateUserDocument(
    uid,
    {
      photoURL
    }
  );


  return {
    photoURL,
    storagePath
  };
}


// =========================================================
// REMOVE PROFILE PHOTO
// =========================================================

async function removeProfilePhoto(
  uid,
  currentPhotoURL = ""
) {

  if (!uid) {
    throw new Error(
      "User UID is required."
    );
  }


  /*
    We know the user's profile photo is stored inside
    the dedicated profile_photos folder.

    Since the extension can vary, we try the supported
    image extensions safely.
  */

  const extensions = [
    "jpg",
    "jpeg",
    "png",
    "webp"
  ];


  for (
    const extension of extensions
  ) {

    try {

      const photoRef =
        ref(
          storage,
          `${PROFILE_PHOTO_FOLDER}/${uid}.${extension}`
        );

      await deleteObject(
        photoRef
      );

    } catch (error) {

      /*
        ObjectNotFound is expected when the user does
        not have that particular extension.
      */

      if (
        error.code !==
        "storage/object-not-found"
      ) {

        console.warn(
          "Profile photo removal warning:",
          error
        );

      }

    }

  }


  // Remove photo from Firebase Auth profile
  if (
    auth.currentUser &&
    auth.currentUser.uid === uid
  ) {

    await updateProfile(
      auth.currentUser,
      {
        photoURL: null
      }
    );

  }


  // Remove photo from Firestore
  await updateUserDocument(
    uid,
    {
      photoURL: ""
    }
  );


  return true;
}


// =========================================================
// GET DEFAULT AVATAR
// =========================================================
//
// UI can use this whenever photoURL is empty.
//

function getDefaultAvatar(displayName = "") {

  const firstCharacter =
    String(displayName || "U")
      .trim()
      .charAt(0)
      .toUpperCase();


  return firstCharacter || "U";
}


// =========================================================
// EXPORT
// =========================================================

export {
  PROFILE_PHOTO_FOLDER,

  MAX_PHOTO_SIZE,
  ALLOWED_IMAGE_TYPES,

  validateProfilePhoto,

  uploadProfilePhoto,
  removeProfilePhoto,

  getDefaultAvatar
};
