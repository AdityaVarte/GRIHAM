/**
 * Griham Design System - Reusable Search Bar Component
 * File: js/components/searchBar.js
 */

const GrihamSearchBar = {
  /**
   * Render standardized search bar HTML markup
   * @param {Object} options
   */
  render(options = {}) {
    const {
      id = '',
      inputId = 'search-input',
      clearBtnId = 'btn-search-clear',
      placeholder = 'Search...',
      onInput = '',
      onClear = '',
      ariaLabel = 'Search',
      value = '',
      customClass = '',
      inputClass = ''
    } = options;

    const wrapperIdAttr = id ? `id="${id}"` : '';
    const inputAction = onInput ? `oninput="${onInput}"` : '';
    const clearAction = onClear ? `onclick="${onClear}"` : '';
    const clearInitialDisplay = value ? 'display:flex;' : 'display:none;';
    const escapedVal = value ? String(value).replace(/"/g, '&quot;') : '';

    return `
      <div class="input-wrapper ${customClass}" ${wrapperIdAttr}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="input-icon-left" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          id="${inputId}"
          class="form-input ${inputClass}"
          placeholder="${placeholder}"
          value="${escapedVal}"
          ${inputAction}
          aria-label="${ariaLabel}"
        >
        <button
          type="button"
          class="btn-search-clear"
          id="${clearBtnId}"
          ${clearAction}
          style="${clearInitialDisplay}"
          aria-label="Clear search"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `.trim();
  },

  /**
   * Synchronize the clear button display with the input's current value
   * @param {string|HTMLInputElement} input
   * @param {string|HTMLButtonElement} clearBtn
   */
  syncClearButton(input, clearBtn) {
    const inputEl = typeof input === 'string' ? document.getElementById(input) : input;
    const btnEl = typeof clearBtn === 'string' ? document.getElementById(clearBtn) : clearBtn;
    if (!inputEl || !btnEl) return;

    const hasValue = Boolean(inputEl.value && inputEl.value.trim().length > 0);
    btnEl.style.display = hasValue ? 'flex' : 'none';
  },

  /**
   * Clear search input, hide clear button, and return focus to input
   * @param {string|HTMLInputElement} input
   * @param {string|HTMLButtonElement} clearBtn
   * @param {Function} [onClearCallback]
   */
  handleClear(input, clearBtn, onClearCallback) {
    const inputEl = typeof input === 'string' ? document.getElementById(input) : input;
    const btnEl = typeof clearBtn === 'string' ? document.getElementById(clearBtn) : clearBtn;

    if (inputEl) {
      inputEl.value = '';
      inputEl.focus();
    }
    if (btnEl) {
      btnEl.style.display = 'none';
    }

    if (typeof onClearCallback === 'function') {
      onClearCallback();
    }
  }
};

window.GrihamSearchBar = GrihamSearchBar;
