// =========================================================
// ZenG English Learn
// Display Name Service
// =========================================================

import {
  getUserDocument,
  updateUserDocument,
  isDisplayNameAvailable
} from "./user-service.js";

import {
  validateDisplayName,
  MAX_NAME_CHANGES,
  normalizeDisplayName
} from "./identity-service.js";


// =========================================================
// GET NAME CHANGE STATUS
// =========================================================

async function getNameChangeStatus(
  uid
) {

  if (!uid) {

    throw new Error(
      "User UID is required."
    );

  }


  const user =
    await getUserDocument(
      uid
    );


  if (!user) {

    throw new Error(
      "User profile not found."
    );

  }


  const count =
    Number(
      user.nameChangeCount || 0
    );


  return {

    currentName:
      user.displayName || "",

    nameChangeCount:
      count,

    maxNameChanges:
      MAX_NAME_CHANGES,

    remainingChanges:
      Math.max(
        0,
        MAX_NAME_CHANGES - count
      ),

    canChange:
      count < MAX_NAME_CHANGES

  };

}


// =========================================================
// CHANGE DISPLAY NAME
// =========================================================

async function changeDisplayName(
  uid,
  newDisplayName
) {

  if (!uid) {

    throw new Error(
      "User UID is required."
    );

  }


  // -------------------------------------------------------
  // Validate new name
  // -------------------------------------------------------

  const validation =
    validateDisplayName(
      newDisplayName
    );


  if (
    !validation.valid
  ) {

    throw new Error(
      validation.message
    );

  }


  const normalizedName =
    normalizeDisplayName(
      validation.value
    );


  // -------------------------------------------------------
  // Get current user
  // -------------------------------------------------------

  const user =
    await getUserDocument(
      uid
    );


  if (!user) {

    throw new Error(
      "User profile not found."
    );

  }


  const currentCount =
    Number(
      user.nameChangeCount || 0
    );


  // -------------------------------------------------------
  // Check limit
  // -------------------------------------------------------

  if (
    currentCount >=
    MAX_NAME_CHANGES
  ) {

    throw new Error(
      "You have reached the maximum number of display name changes."
    );

  }


  // -------------------------------------------------------
  // Check whether the name is actually different
  // -------------------------------------------------------

  const currentName =
    normalizeDisplayName(
      user.displayName || ""
    );


  if (
    currentName.toLowerCase() ===
    normalizedName.toLowerCase()
  ) {

    return {

      success:
        true,

      changed:
        false,

      displayName:
        currentName,

      nameChangeCount:
        currentCount,

      remainingChanges:
        MAX_NAME_CHANGES -
        currentCount

    };

  }


  // -------------------------------------------------------
  // Check uniqueness
  // -------------------------------------------------------

  const available =
    await isDisplayNameAvailable(
      normalizedName,
      uid
    );


  if (!available) {

    throw new Error(
      "This display name is already being used by another user."
    );

  }


  // -------------------------------------------------------
  // Update profile
  // -------------------------------------------------------

  const newCount =
    currentCount + 1;


  await updateUserDocument(
    uid,
    {

      displayName:
        normalizedName,

      displayNameLower:
        normalizedName.toLowerCase(),

      nameChangeCount:
        newCount

    }
  );


  // -------------------------------------------------------
  // Return result
  // -------------------------------------------------------

  return {

    success:
      true,

    changed:
      true,

    displayName:
      normalizedName,

    nameChangeCount:
      newCount,

    remainingChanges:
      Math.max(
        0,
        MAX_NAME_CHANGES - newCount
      )

  };

}


// =========================================================
// EXPORT
// =========================================================

export {

  getNameChangeStatus,

  changeDisplayName

};
