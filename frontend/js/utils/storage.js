/**
 * Griham Design System - Safe Storage Utilities
 * File: js/utils/storage.js
 */

const GrihamStorage = {
  /**
   * Safely get an item from localStorage
   * @param {string} key
   * @param {string|null} [fallback=null]
   * @returns {string|null}
   */
  get(key, fallback = null) {
    try {
      if (typeof window === "undefined" || !window.localStorage) return fallback;
      const val = window.localStorage.getItem(key);
      return val !== null ? val : fallback;
    } catch {
      return fallback;
    }
  },

  /**
   * Safely set an item in localStorage
   * @param {string} key
   * @param {string} value
   * @returns {boolean}
   */
  set(key, value) {
    try {
      if (typeof window === "undefined" || !window.localStorage) return false;
      window.localStorage.setItem(key, String(value));
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Safely remove an item from localStorage
   * @param {string} key
   * @returns {boolean}
   */
  remove(key) {
    try {
      if (typeof window === "undefined" || !window.localStorage) return false;
      window.localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Safely retrieve and parse a JSON object from localStorage
   * @param {string} key
   * @param {*} [fallback=null]
   * @returns {*}
   */
  getJSON(key, fallback = null) {
    try {
      const raw = this.get(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  },

  /**
   * Safely serialize and store a JSON object in localStorage
   * @param {string} key
   * @param {*} value
   * @returns {boolean}
   */
  setJSON(key, value) {
    try {
      const str = JSON.stringify(value);
      return this.set(key, str);
    } catch {
      return false;
    }
  }
};

window.GrihamStorage = GrihamStorage;
