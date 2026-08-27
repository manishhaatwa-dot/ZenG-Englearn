// =========================================================
// ZenG English Learn
// Identity Validation Service
// =========================================================

import {
  isDisplayNameAvailable
} from "./user-service.js";


// =========================================================
// SETTINGS
// =========================================================

const MAX_NAME_CHANGES = 3;

const MIN_DISPLAY_NAME_LENGTH = 2;

const MAX_DISPLAY_NAME_LENGTH = 30;


// =========================================================
// DISPLAY NAME FORMAT
// =========================================================
//
// Display name can contain:
// - English letters
// - numbers
// - spaces
//
// Leading/trailing spaces are removed during normalization.
//

const DISPLAY_NAME_PATTERN =
  /^[A-Za-z0-9 ]+$/;


// =========================================================
// NORMALIZE DISPLAY NAME
// =========================================================

function normalizeDisplayName(
  displayName
) {

  return String(
    displayName || ""
  )
    .trim()
    .replace(
      /\s+/g,
      " "
    );

}


// =========================================================
// VALIDATE DISPLAY NAME
// =========================================================

function validateDisplayName(
  displayName
) {

  const normalized =
    normalizeDisplayName(
      displayName
    );


  if (!normalized) {

    return {

      valid: false,

      message:
        "Display name is required."

    };

  }


  if (
    normalized.length <
    MIN_DISPLAY_NAME_LENGTH
  ) {

    return {

      valid: false,

      message:
        `Display name must contain at least ${MIN_DISPLAY_NAME_LENGTH} characters.`

    };

  }


  if (
    normalized.length >
    MAX_DISPLAY_NAME_LENGTH
  ) {

    return {

      valid: false,

      message:
        `Display name cannot contain more than ${MAX_DISPLAY_NAME_LENGTH} characters.`

    };

  }


  if (
    !DISPLAY_NAME_PATTERN.test(
      normalized
    )
  ) {

    return {

      valid: false,

      message:
        "Display name can contain only letters, numbers and spaces."

    };

  }


  return {

    valid: true,

    value:
      normalized

  };

}


// =========================================================
// CHECK UNIQUE DISPLAY NAME
// =========================================================
//
// excludeUid is useful when an existing user changes their
// own name. Their current name should not count as a duplicate.
//

async function validateUniqueDisplayName(
  displayName,
  excludeUid = null
) {

  const validation =
    validateDisplayName(
      displayName
    );


  if (
    !validation.valid
  ) {

    return validation;

  }


  const available =
    await isDisplayNameAvailable(
      validation.value,
      excludeUid
    );


  if (!available) {

    return {

      valid: false,

      message:
        "This name is already being used by another user."

    };

  }


  return {

    valid: true,

    value:
      validation.value

  };

}


// =========================================================
// NAME CHANGE LIMIT
// =========================================================

function canChangeDisplayName(
  nameChangeCount
) {

  const count =
    Number(
      nameChangeCount || 0
    );


  return (
    count <
    MAX_NAME_CHANGES
  );

}


// =========================================================
// REMAINING NAME CHANGES
// =========================================================

function getRemainingNameChanges(
  nameChangeCount
) {

  const count =
    Number(
      nameChangeCount || 0
    );


  return Math.max(
    0,
    MAX_NAME_CHANGES - count
  );

}


// =========================================================
// EXPORT
// =========================================================

export {

  MAX_NAME_CHANGES,

  MIN_DISPLAY_NAME_LENGTH,

  MAX_DISPLAY_NAME_LENGTH,

  normalizeDisplayName,

  validateDisplayName,

  validateUniqueDisplayName,

  canChangeDisplayName,

  getRemainingNameChanges

};
