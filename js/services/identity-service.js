// =========================================================
// ZenG English Learn
// Identity Validation Service
// =========================================================

import {
  isLoginIdAvailable,
  isDisplayNameAvailable
} from "./user-service.js";


// =========================================================
// SETTINGS
// =========================================================

const MAX_NAME_CHANGES = 3;

const MIN_LOGIN_ID_LENGTH = 4;
const MAX_LOGIN_ID_LENGTH = 24;

const MIN_DISPLAY_NAME_LENGTH = 2;
const MAX_DISPLAY_NAME_LENGTH = 30;


// =========================================================
// LOGIN ID FORMAT
// =========================================================
//
// Login ID is permanent.
// It can contain:
// - English letters
// - numbers
// - underscore
// - hyphen
//
// Spaces and special characters are not allowed.
//

const LOGIN_ID_PATTERN =
  /^[A-Za-z0-9_-]+$/;


// =========================================================
// DISPLAY NAME FORMAT
// =========================================================
//
// Display name can contain normal letters, numbers and
// spaces. We keep it simple and readable.
//

const DISPLAY_NAME_PATTERN =
  /^[A-Za-z0-9 ]+$/;


// =========================================================
// NORMALIZE LOGIN ID
// =========================================================

function normalizeLoginId(loginId) {

  return String(loginId || "")
    .trim()
    .toLowerCase();

}


// =========================================================
// NORMALIZE DISPLAY NAME
// =========================================================

function normalizeDisplayName(displayName) {

  return String(displayName || "")
    .trim();

}


// =========================================================
// VALIDATE LOGIN ID
// =========================================================

function validateLoginId(loginId) {

  const normalized =
    normalizeLoginId(loginId);


  if (!normalized) {
    return {
      valid: false,
      message: "Login ID is required."
    };
  }


  if (
    normalized.length <
    MIN_LOGIN_ID_LENGTH
  ) {
    return {
      valid: false,
      message:
        `Login ID must contain at least ${MIN_LOGIN_ID_LENGTH} characters.`
    };
  }


  if (
    normalized.length >
    MAX_LOGIN_ID_LENGTH
  ) {
    return {
      valid: false,
      message:
        `Login ID cannot contain more than ${MAX_LOGIN_ID_LENGTH} characters.`
    };
  }


  if (
    !LOGIN_ID_PATTERN.test(
      normalized
    )
  ) {
    return {
      valid: false,
      message:
        "Login ID can use only letters, numbers, underscore and hyphen."
    };
  }


  return {
    valid: true,
    value: normalized
  };
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
      message: "Name is required."
    };
  }


  if (
    normalized.length <
    MIN_DISPLAY_NAME_LENGTH
  ) {
    return {
      valid: false,
      message:
        `Name must contain at least ${MIN_DISPLAY_NAME_LENGTH} characters.`
    };
  }


  if (
    normalized.length >
    MAX_DISPLAY_NAME_LENGTH
  ) {
    return {
      valid: false,
      message:
        `Name cannot contain more than ${MAX_DISPLAY_NAME_LENGTH} characters.`
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
        "Name can contain only letters, numbers and spaces."
    };
  }


  return {
    valid: true,
    value: normalized
  };
}


// =========================================================
// CHECK LOGIN ID
// =========================================================

async function validateUniqueLoginId(
  loginId
) {

  const validation =
    validateLoginId(
      loginId
    );


  if (!validation.valid) {
    return validation;
  }


  const available =
    await isLoginIdAvailable(
      validation.value
    );


  if (!available) {
    return {
      valid: false,
      message:
        "This Login ID is already taken."
    };
  }


  return {
    valid: true,
    value: validation.value
  };
}


// =========================================================
// CHECK DISPLAY NAME
// =========================================================

async function validateUniqueDisplayName(
  displayName,
  excludeUid = null
) {

  const validation =
    validateDisplayName(
      displayName
    );


  if (!validation.valid) {
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
    value: validation.value
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


  return count <
    MAX_NAME_CHANGES;
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

  MIN_LOGIN_ID_LENGTH,
  MAX_LOGIN_ID_LENGTH,

  MIN_DISPLAY_NAME_LENGTH,
  MAX_DISPLAY_NAME_LENGTH,

  normalizeLoginId,
  normalizeDisplayName,

  validateLoginId,
  validateDisplayName,

  validateUniqueLoginId,
  validateUniqueDisplayName,

  canChangeDisplayName,
  getRemainingNameChanges
};
