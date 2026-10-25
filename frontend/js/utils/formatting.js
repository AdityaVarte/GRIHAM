/**
 * Griham Design System - Text, Currency & Formatting Utilities
 * File: js/utils/formatting.js
 */

const GrihamFormat = {
  /**
   * Format currency in Indian Rupees with Indian numbering comma grouping (e.g. ₹3,500, ₹2,10,000)
   * @param {number|string} amount
   * @returns {string}
   */
  currency(amount) {
    if (amount === null || amount === undefined || amount === "") {
      return "₹0";
    }
    if (typeof amount === "string" && amount.trim().startsWith("₹")) {
      return amount.trim();
    }
    const num = Number(amount);
    const safeNum = isNaN(num) ? 0 : num;
    return `₹${safeNum.toLocaleString('en-IN')}`;
  },

  /**
   * Generate 1-2 letter uppercase initials from person or entity name
   * @param {string} name
   * @param {string} [fallback='U']
   * @returns {string}
   */
  initials(name, fallback = 'U') {
    if (!name || typeof name !== "string") return fallback;
    const clean = name.trim();
    if (!clean) return fallback;

    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return fallback;
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  },

  /**
   * Safely truncate text with an ellipsis
   * @param {string} text
   * @param {number} [maxLen=50]
   * @param {string} [ellipsis='...']
   * @returns {string}
   */
  truncate(text, maxLen = 50, ellipsis = '...') {
    if (!text || typeof text !== "string") return "";
    if (text.length <= maxLen) return text;
    const cutLen = Math.max(0, maxLen - ellipsis.length);
    return text.substring(0, cutLen).trimEnd() + ellipsis;
  },

  /**
   * Capitalize first character of text
   * @param {string} text
   * @returns {string}
   */
  capitalize(text) {
    if (!text || typeof text !== "string") return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  },

  /**
   * Normalize repeated whitespace and trim
   * @param {string} text
   * @returns {string}
   */
  normalizeWhitespace(text) {
    if (!text || typeof text !== "string") return "";
    return text.trim().replace(/\s+/g, ' ');
  },

  /**
   * Mask phone number for display (e.g. "******5678")
   * @param {string} phone
   * @returns {string}
   */
  maskPhone(phone) {
    if (!phone) return "******";
    const clean = String(phone).replace(/[\s-]/g, "");
    if (clean.length > 4) {
      return "*".repeat(Math.max(2, clean.length - 4)) + clean.slice(-4);
    }
    return "******" + clean;
  },

  /**
   * Generate clean tel: URL for dialing
   * @param {string} phone
   * @returns {string}
   */
  telUrl(phone) {
    if (!phone) return "tel:";
    const clean = String(phone).replace(/\s+/g, "");
    return `tel:${clean}`;
  }
};

window.GrihamFormat = GrihamFormat;
window.formatCurrency = function(amount) { return GrihamFormat.currency(amount); };
window.formatInitials = function(name, fallback) { return GrihamFormat.initials(name, fallback); };
