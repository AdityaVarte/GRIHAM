/**
 * Griham Design System - Canonical Authentication & Session Module
 * File: js/auth.js
 *
 * Single authoritative manager for:
 * - Session tokens & user state
 * - Authentication & role checking
 * - Session clearing & logout navigation
 * - UI password visibility & auth status banners
 */

const GrihamAuth = {
  TOKEN_KEY: "griham_token",
  USER_KEY: "griham_user",
  SOCIETY_KEY: "griham_society_id",

  /**
   * Retrieve the current authentication token
   * @returns {string|null}
   */
  getToken() {
    if (typeof GrihamStorage !== "undefined") {
      return GrihamStorage.get(this.TOKEN_KEY);
    }
    return localStorage.getItem(this.TOKEN_KEY);
  },

  /**
   * Retrieve the active society identifier
   * @returns {string|null}
   */
  getSocietyId() {
    if (typeof GrihamStorage !== "undefined") {
      return GrihamStorage.get(this.SOCIETY_KEY);
    }
    return localStorage.getItem(this.SOCIETY_KEY);
  },

  /**
   * Retrieve the authenticated user object
   * @returns {Object|null}
   */
  getUser() {
    if (typeof GrihamStorage !== "undefined") {
      return GrihamStorage.getJSON(this.USER_KEY, null);
    }
    try {
      const u = localStorage.getItem(this.USER_KEY);
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  /**
   * Alias for getUser()
   * @returns {Object|null}
   */
  getCurrentUser() {
    return this.getUser();
  },

  /**
   * Store or clear user state in session storage
   * @param {Object|null} user
   */
  setUser(user) {
    if (typeof GrihamStorage !== "undefined") {
      if (user) {
        GrihamStorage.setJSON(this.USER_KEY, user);
      } else {
        GrihamStorage.remove(this.USER_KEY);
      }
    } else {
      if (user) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(this.USER_KEY);
      }
    }
  },

  /**
   * Update existing user object with new properties
   * @param {Object} updates
   * @returns {Object}
   */
  updateUser(updates) {
    const current = this.getUser() || {};
    const updated = { ...current, ...updates };
    this.setUser(updated);
    return updated;
  },

  /**
   * Save complete authenticated session state
   * @param {string} token
   * @param {Object} user
   * @param {string} [societyId]
   */
  setSession(token, user, societyId) {
    if (typeof token === "object" && token !== null) {
      const obj = token;
      token = obj.token || obj.access_token;
      user = obj.user ? { ...obj.user } : (obj.role ? { ...obj } : user);
      if (user && !user.role && obj.role) {
        user.role = obj.role;
      }
      societyId = obj.societyId || obj.society_id || societyId;
    }
    if (typeof GrihamStorage !== "undefined") {
      if (token) GrihamStorage.set(this.TOKEN_KEY, token);
      if (user) GrihamStorage.setJSON(this.USER_KEY, user);
      if (societyId) GrihamStorage.set(this.SOCIETY_KEY, societyId);
    } else {
      if (token) localStorage.setItem(this.TOKEN_KEY, token);
      if (user) localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      if (societyId) localStorage.setItem(this.SOCIETY_KEY, societyId);
    }
  },

  /**
   * Clear all authenticated session data
   */
  clearSession() {
    if (typeof GrihamStorage !== "undefined") {
      GrihamStorage.remove(this.TOKEN_KEY);
      GrihamStorage.remove(this.USER_KEY);
      GrihamStorage.remove(this.SOCIETY_KEY);
    } else {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.SOCIETY_KEY);
    }
  },

  /**
   * Check whether a valid authenticated session exists
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.getToken();
  },

  /**
   * Get the current user's normalized role (lowercase)
   * @returns {string|null}
   */
  getRole() {
    const user = this.getUser();
    return (user && user.role) ? String(user.role).trim().toLowerCase() : null;
  },

  /**
   * Check if current user has the specified role
   * @param {string} role
   * @returns {boolean}
   */
  hasRole(role) {
    if (!this.isAuthenticated() || !role) return false;
    const user = this.getUser();
    if (!user) return false;
    if (typeof GrihamPermissions !== "undefined" && typeof GrihamPermissions.hasRole === "function") {
      return GrihamPermissions.hasRole(user, role);
    }
    const currentRole = this.getRole();
    return currentRole === String(role).trim().toLowerCase();
  },

  /**
   * Check if user is an administrator
   * @returns {boolean}
   */
  isAdmin() {
    return this.hasRole("admin");
  },

  /**
   * Check if user is a resident
   * @returns {boolean}
   */
  isResident() {
    return this.hasRole("resident");
  },

  /**
   * Check if current user is an approved resident
   * @returns {boolean}
   */
  isApprovedResident() {
    if (!this.isAuthenticated() || !this.isResident()) return false;
    const user = this.getUser();
    if (!user) return false;
    const status = (user.approvalStatus || user.approval || "Approved").toLowerCase();
    return status === "approved";
  },

  /**
   * Check if user is a gatekeeper
   * @returns {boolean}
   */
  isGatekeeper() {
    return this.hasRole("gatekeeper");
  },

  /**
   * Log out user: clears session storage and navigates to the target route
   * @param {string} [redirectPath="/entry"]
   */
  logout(redirectPath = "/entry") {
    this.clearSession();
    if (typeof GrihamRouter !== "undefined" && typeof GrihamRouter.navigate === "function") {
      GrihamRouter.navigate(redirectPath);
    } else {
      window.location.hash = redirectPath;
    }
  },

  /**
   * Shared password visibility toggle for inputs across auth screens
   * @param {string} inputId
   * @param {string} eyeIconId
   * @param {string} eyeOffIconId
   * @param {HTMLElement} [btn]
   */
  togglePasswordVisibility(inputId, eyeIconId, eyeOffIconId, btn) {
    const input = document.getElementById(inputId);
    const eyeIcon = document.getElementById(eyeIconId);
    const eyeOffIcon = document.getElementById(eyeOffIconId);

    if (!input) return;

    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";

    if (eyeIcon && eyeOffIcon) {
      eyeIcon.style.display = isPassword ? "none" : "block";
      eyeOffIcon.style.display = isPassword ? "block" : "none";
    }

    if (btn) {
      btn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
    }
  },

  /**
   * Shared status banner renderer for auth screens
   * @param {string} bannerId
   * @param {string} textId
   * @param {string} iconId
   * @param {string} type - "error" | "success" | "info"
   * @param {string} message
   */
  showStatusBanner(bannerId, textId, iconId, type, message) {
    const banner = document.getElementById(bannerId);
    const text = document.getElementById(textId);
    const icon = document.getElementById(iconId);

    if (!banner || !text) return;

    banner.className = `auth-status-banner banner-${type} visible`;
    text.textContent = message;

    if (icon) {
      if (type === "error") {
        icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
      } else if (type === "success") {
        icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
      }
    }
  },

  /**
   * Hide auth status banner
   * @param {string} bannerId
   */
  hideStatusBanner(bannerId) {
    const banner = document.getElementById(bannerId);
    if (banner) {
      banner.className = "auth-status-banner";
    }
  }
};

window.GrihamAuth = GrihamAuth;

// Provide early bridge for GrihamAuthUI password visibility across all auth pages
window.GrihamAuthUI = window.GrihamAuthUI || {};
if (!window.GrihamAuthUI.togglePasswordVisibility) {
  window.GrihamAuthUI.togglePasswordVisibility = GrihamAuth.togglePasswordVisibility.bind(GrihamAuth);
}
