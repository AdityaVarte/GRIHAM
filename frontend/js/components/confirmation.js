/**
 * Griham Design System - Reusable Confirmation Dialog / Sheet Component
 * File: js/components/confirmation.js
 */

const GrihamConfirmation = {
  _isOpen: false,
  _onConfirm: null,
  _onCancel: null,

  _ensureDOM() {
    let backdrop = document.getElementById('griham-confirm-backdrop');
    let sheet = document.getElementById('griham-confirm-sheet');

    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'griham-confirm-backdrop';
      backdrop.className = 'sheet-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      backdrop.onclick = () => this.close(false);
      document.body.appendChild(backdrop);
    }

    if (!sheet) {
      sheet = document.createElement('div');
      sheet.id = 'griham-confirm-sheet';
      sheet.className = 'mobile-bottom-sheet';
      sheet.setAttribute('role', 'dialog');
      sheet.setAttribute('aria-modal', 'true');
      sheet.setAttribute('aria-labelledby', 'griham-confirm-title');
      sheet.setAttribute('aria-hidden', 'true');
      sheet.style.paddingBottom = 'calc(2rem + var(--safe-bottom, 0px))';
      sheet.innerHTML = `
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="logout-confirm-card" id="griham-confirm-card">
          <div class="logout-shield-icon" id="griham-confirm-icon-wrap" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h2 class="logout-title" id="griham-confirm-title">Confirm Action</h2>
          <p class="logout-message" id="griham-confirm-message">Are you sure you want to proceed?</p>
          <div class="logout-btn-row">
            <button type="button" class="btn-logout-cancel" id="griham-confirm-btn-cancel">Cancel</button>
            <button type="button" class="btn-logout-confirm" id="griham-confirm-btn-action">Confirm</button>
          </div>
        </div>
      `;
      document.body.appendChild(sheet);

      document.getElementById('griham-confirm-btn-cancel').onclick = () => this.close(false);
      document.getElementById('griham-confirm-btn-action').onclick = () => {
        const cb = this._onConfirm;
        this.close(true);
        if (typeof cb === 'function') cb();
      };

      // Escape listener
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this._isOpen) {
          this.close(false);
        }
      });
    }

    return { backdrop, sheet };
  },

  /**
   * Open a confirmation bottom sheet
   * @param {Object} options
   * @param {string} options.title - Dialog heading
   * @param {string} options.message - Descriptive prompt text
   * @param {string} [options.confirmText='Confirm'] - Action button text
   * @param {string} [options.cancelText='Cancel'] - Cancel button text
   * @param {boolean} [options.isDanger=true] - True for destructive (red/danger) actions
   * @param {string} [options.icon] - Optional custom SVG string
   * @param {Function} [options.onConfirm] - Callback executed upon confirmation
   * @param {Function} [options.onCancel] - Callback executed upon cancellation
   */
  open(options = {}) {
    const { backdrop, sheet } = this._ensureDOM();

    this._onConfirm = options.onConfirm || null;
    this._onCancel = options.onCancel || null;
    this._isOpen = true;

    const titleEl = document.getElementById('griham-confirm-title');
    const msgEl = document.getElementById('griham-confirm-message');
    const actionBtn = document.getElementById('griham-confirm-btn-action');
    const cancelBtn = document.getElementById('griham-confirm-btn-cancel');
    const iconWrap = document.getElementById('griham-confirm-icon-wrap');

    if (titleEl) titleEl.textContent = options.title || 'Confirm Action';
    if (msgEl) msgEl.textContent = options.message || 'Are you sure you want to proceed?';
    if (actionBtn) {
      actionBtn.textContent = options.confirmText || 'Confirm';
      if (options.isDanger === false) {
        actionBtn.style.background = 'var(--color-brand-blue, #3b82f6)';
        actionBtn.style.borderColor = 'var(--color-brand-blue, #3b82f6)';
      } else {
        actionBtn.style.background = '';
        actionBtn.style.borderColor = '';
      }
    }
    if (cancelBtn) cancelBtn.textContent = options.cancelText || 'Cancel';

    if (options.icon && iconWrap) {
      iconWrap.innerHTML = options.icon;
    }

    backdrop.classList.add('open');
    sheet.classList.add('open');
    sheet.setAttribute('aria-hidden', 'false');

    if (cancelBtn) cancelBtn.focus();
  },

  /**
   * Close confirmation dialog
   * @param {boolean} [confirmed=false]
   */
  close(confirmed = false) {
    if (!this._isOpen) return;
    this._isOpen = false;

    const backdrop = document.getElementById('griham-confirm-backdrop');
    const sheet = document.getElementById('griham-confirm-sheet');

    if (backdrop) backdrop.classList.remove('open');
    if (sheet) {
      sheet.classList.remove('open');
      sheet.setAttribute('aria-hidden', 'true');
    }

    if (!confirmed && typeof this._onCancel === 'function') {
      this._onCancel();
    }
  }
};

window.GrihamConfirmation = GrihamConfirmation;
