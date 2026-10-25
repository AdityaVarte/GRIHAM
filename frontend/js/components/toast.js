/**
 * Griham Design System - Reusable Toast Notification Component
 * File: js/components/toast.js
 */

const GrihamToast = {
  _activeToast: null,
  _timeoutId: null,

  /**
   * Display a toast notification
   * @param {string} message - Text message to display
   * @param {'info'|'success'|'error'|'warning'} [type='info'] - Notification type
   * @param {number} [duration=3000] - Duration in milliseconds
   */
  show(message, type = 'info', duration = 3000) {
    if (!message) return;

    // Dismiss existing active toast if any
    this.dismiss();

    const toast = document.createElement('div');
    toast.className = `griham-toast toast-${type}`;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    // Type accents
    let borderColor = 'var(--glass-border, rgba(255, 255, 255, 0.15))';
    let iconSvg = '';

    if (type === 'success') {
      borderColor = 'rgba(16, 185, 129, 0.45)';
      iconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === 'error') {
      borderColor = 'rgba(239, 68, 68, 0.45)';
      iconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    } else if (type === 'warning') {
      borderColor = 'rgba(245, 158, 11, 0.45)';
      iconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
    } else {
      iconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-blue, #3b82f6)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.style.cssText = `
      position: fixed;
      bottom: calc(24px + var(--safe-bottom, 0px));
      left: 50%;
      transform: translateX(-50%);
      background: var(--sheet-bg, #0f172a);
      border: 1.5px solid ${borderColor};
      color: var(--text-primary, #f8fafc);
      padding: 0.65rem 1.25rem;
      border-radius: var(--radius-full, 9999px);
      font-size: calc(0.84rem * var(--font-scale, 1));
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 0.55rem;
      max-width: 90vw;
      text-align: left;
      opacity: 0;
      transition: opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      pointer-events: auto;
    `;

    toast.innerHTML = `${iconSvg}<span>${this._escape(message)}</span>`;
    document.body.appendChild(toast);
    this._activeToast = toast;

    // Trigger enter transition
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    this._timeoutId = setTimeout(() => {
      this.dismiss();
    }, duration);
  },

  /**
   * Dismiss the currently active toast
   */
  dismiss() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
    if (this._activeToast) {
      const toast = this._activeToast;
      this._activeToast = null;
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(6px)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 240);
    }
  },

  _escape(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
};

window.GrihamToast = GrihamToast;
