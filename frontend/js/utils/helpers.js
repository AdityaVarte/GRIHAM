/**
 * Griham Design System - Core Helpers
 * File: js/utils/helpers.js
 */

window.escapeHtml = function(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

window.delay = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

window.debounce = function(fn, delay = 300) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

window.getErrorMessage = function(error, fallback = "An unexpected error occurred") {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  if (error.message && typeof error.message === "string") return error.message;
  return fallback;
};

const GrihamHelpers = {
  escapeHtml: window.escapeHtml,
  delay: window.delay,
  debounce: window.debounce,
  getErrorMessage: window.getErrorMessage
};

window.GrihamHelpers = GrihamHelpers;
