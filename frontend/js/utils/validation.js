/**
 * Griham Design System - Input & File Validation Utilities
 * File: js/utils/validation.js
 */

const GrihamValidation = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[0-9]{10,14}$/,

  /**
   * Validate email address format
   * @param {string} email
   * @returns {boolean}
   */
  isValidEmail(email) {
    if (!email || typeof email !== "string") return false;
    return this.EMAIL_REGEX.test(email.trim());
  },

  /**
   * Normalize phone number string by removing whitespace, hyphens, and parenthesis
   * @param {string} phone
   * @returns {string}
   */
  normalizePhone(phone) {
    if (!phone) return "";
    return String(phone).replace(/[\s-]/g, "");
  },

  /**
   * Validate phone number (10 to 14 digits, optional leading +)
   * @param {string} phone
   * @returns {boolean}
   */
  isValidPhone(phone) {
    const clean = this.normalizePhone(phone);
    if (!clean) return false;
    return this.PHONE_REGEX.test(clean);
  },

  /**
   * Check if password satisfies minimum length
   * @param {string} password
   * @param {number} [minLength=6]
   * @returns {boolean}
   */
  isValidPassword(password, minLength = 6) {
    if (!password || typeof password !== "string") return false;
    return password.length >= minLength;
  },

  /**
   * Check if Society ID satisfies length requirements
   * @param {string} societyId
   * @param {number} [minLength=3]
   * @returns {boolean}
   */
  isValidSocietyId(societyId, minLength = 3) {
    if (!societyId || typeof societyId !== "string") return false;
    return societyId.trim().length >= minLength;
  },

  /**
   * Validate an uploaded file for image type and size limit (default 5MB)
   * @param {File} file
   * @param {Object} [options={}]
   * @param {number} [options.maxSizeBytes=5242880] 5MB in bytes
   * @param {string[]} [options.allowedTypes]
   * @param {string} [options.typePrefix='image/']
   * @returns {{ valid: boolean, error?: string }}
   */
  validateFile(file, options = {}) {
    if (!file) {
      return { valid: false, error: "Please select a file." };
    }

    const maxBytes = options.maxSizeBytes || 5 * 1024 * 1024;
    const allowedTypes = options.allowedTypes || ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const typePrefix = options.typePrefix || "image/";

    const fileType = (file.type || "").toLowerCase();

    // Check type prefix or allowed types list
    const hasValidPrefix = typePrefix ? fileType.startsWith(typePrefix) : false;
    const isExplicitlyAllowed = allowedTypes.includes(fileType);

    if (!hasValidPrefix && !isExplicitlyAllowed) {
      return {
        valid: false,
        error: "Invalid file type. Please upload a JPG, PNG, or WEBP image."
      };
    }

    if (file.size > maxBytes) {
      const maxMb = Math.round(maxBytes / (1024 * 1024));
      return {
        valid: false,
        error: `File exceeds ${maxMb}MB. Please choose a smaller file.`
      };
    }

    return { valid: true };
  },

  /**
   * Format byte count into megabyte string (e.g. "3.5 MB")
   * @param {number} bytes
   * @returns {string}
   */
  formatFileSize(bytes) {
    if (!bytes || isNaN(bytes)) return "0 MB";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  }
};

window.GrihamValidation = GrihamValidation;
