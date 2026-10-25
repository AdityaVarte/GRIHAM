/**
 * Griham Design System - Role & Permission Utilities
 * File: js/utils/permissions.js
 */

const GrihamPermissions = {
  /**
   * Check if a user object matches a specific role
   * @param {Object} user
   * @param {string} role
   * @returns {boolean}
   */
  hasRole(user, role) {
    if (!user || !user.role || !role) return false;
    return String(user.role).trim().toLowerCase() === String(role).trim().toLowerCase();
  },

  /**
   * Check if a user is an administrator
   * @param {Object} user
   * @returns {boolean}
   */
  isAdmin(user) {
    return this.hasRole(user, "admin");
  },

  /**
   * Check if a user is a resident
   * @param {Object} user
   * @returns {boolean}
   */
  isResident(user) {
    return this.hasRole(user, "resident");
  },

  /**
   * Check if a user is a gatekeeper
   * @param {Object} user
   * @returns {boolean}
   */
  isGatekeeper(user) {
    return this.hasRole(user, "gatekeeper");
  }
};

window.GrihamPermissions = GrihamPermissions;
