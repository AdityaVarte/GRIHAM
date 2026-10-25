/**
 * Griham Design System - Date & Time Utilities
 * File: js/utils/dateTime.js
 */

const GrihamDateTime = {
  MONTHS_SHORT: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  MONTHS_LONG: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],

  /**
   * Parse input into a Date object without accidental UTC timezone shift for date-only strings (YYYY-MM-DD)
   * @param {string|number|Date} dateInput
   * @returns {Date|null}
   */
  parseDate(dateInput) {
    if (!dateInput) return null;
    if (dateInput instanceof Date) {
      return isNaN(dateInput.getTime()) ? null : dateInput;
    }
    if (typeof dateInput === "number") {
      const d = new Date(dateInput);
      return isNaN(d.getTime()) ? null : d;
    }
    if (typeof dateInput === "string") {
      const str = dateInput.trim();
      if (!str) return null;
      // Handle date-only YYYY-MM-DD format to prevent UTC midnight timezone rollback
      const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str);
      if (dateOnlyMatch) {
        const year = parseInt(dateOnlyMatch[1], 10);
        const month = parseInt(dateOnlyMatch[2], 10) - 1;
        const day = parseInt(dateOnlyMatch[3], 10);
        return new Date(year, month, day);
      }
      const d = new Date(str);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  },

  /**
   * Format a date into standard display formats
   * @param {string|number|Date} dateInput
   * @param {'standard'|'short'|'long'|'monthYear'|'isoDate'} [format='standard']
   * @returns {string}
   */
  formatDate(dateInput, format = 'standard') {
    const d = this.parseDate(dateInput);
    if (!d) return typeof dateInput === "string" ? dateInput : "";

    const day = String(d.getDate()).padStart(2, "0");
    const dayNumeric = String(d.getDate());
    const monthShort = this.MONTHS_SHORT[d.getMonth()];
    const monthLong = this.MONTHS_LONG[d.getMonth()];
    const year = d.getFullYear();

    switch (format) {
      case 'short':
        return `${dayNumeric} ${monthShort}`;
      case 'long':
        return `${dayNumeric} ${monthLong} ${year}`;
      case 'monthYear':
        return `${monthLong} ${year}`;
      case 'isoDate': {
        const m = String(d.getMonth() + 1).padStart(2, "0");
        return `${year}-${m}-${day}`;
      }
      case 'standard':
      default:
        return `${day} ${monthShort} ${year}`;
    }
  },

  /**
   * Format time into 12-hour AM/PM string (e.g. 09:30 AM)
   * @param {string|number|Date} dateInput
   * @returns {string}
   */
  formatTime(dateInput) {
    const d = this.parseDate(dateInput);
    if (!d) return "";
    try {
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      let hours = d.getHours();
      const minutes = String(d.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
    }
  },

  /**
   * Format date and time together (e.g. "23 Sep 2026 • 09:30 AM" or "23 Sep, 09:30 AM")
   * @param {string|number|Date} dateInput
   * @param {string} [separator=' • ']
   * @param {'standard'|'short'|'long'} [dateFormat='standard']
   * @returns {string}
   */
  formatDateTime(dateInput, separator = ' • ', dateFormat = 'standard') {
    const d = this.parseDate(dateInput);
    if (!d) return typeof dateInput === "string" ? dateInput : "-";
    const dateStr = this.formatDate(d, dateFormat);
    const timeStr = this.formatTime(d);
    if (!timeStr) return dateStr;
    return `${dateStr}${separator}${timeStr}`;
  },

  /**
   * Check if two dates fall on the exact same calendar day
   * @param {string|number|Date} d1
   * @param {string|number|Date} d2
   * @returns {boolean}
   */
  isSameDay(d1, d2) {
    const date1 = this.parseDate(d1);
    const date2 = this.parseDate(d2);
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
};

window.GrihamDateTime = GrihamDateTime;
window.formatDate = function(d, f) { return GrihamDateTime.formatDate(d, f); };
window.formatTime = function(d) { return GrihamDateTime.formatTime(d); };
window.formatDateTime = function(d, s, f) { return GrihamDateTime.formatDateTime(d, s, f); };
