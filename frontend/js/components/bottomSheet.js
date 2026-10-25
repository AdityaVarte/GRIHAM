/**
 * Griham Design System - Reusable Bottom Sheet Lifecycle Controller
 * File: js/components/bottomSheet.js
 */

const GrihamBottomSheet = {
  _activeSheets: new Set(),

  _resolveEl(idOrEl) {
    if (!idOrEl) return null;
    return typeof idOrEl === 'string' ? document.getElementById(idOrEl) : idOrEl;
  },

  /**
   * Open a bottom sheet and its backdrop
   * @param {string|HTMLElement} sheet
   * @param {string|HTMLElement} [backdrop]
   * @param {Object} [options]
   */
  open(sheet, backdrop, options = {}) {
    const sheetEl = this._resolveEl(sheet);
    const backdropEl = this._resolveEl(backdrop);

    if (!sheetEl) return;

    sheetEl.classList.add('open', 'active');
    sheetEl.setAttribute('aria-hidden', 'false');

    if (backdropEl) {
      backdropEl.classList.add('open', 'active');
      backdropEl.setAttribute('aria-hidden', 'false');

      // Auto-bind close on backdrop click if requested or not yet bound
      if (!backdropEl._hasCloseBound) {
        backdropEl.addEventListener('click', () => {
          this.close(sheetEl, backdropEl, options);
        });
        backdropEl._hasCloseBound = true;
      }
    }

    this._activeSheets.add(sheetEl);

    // Prevent body bounce / scroll under sheet if configured
    if (options.lockScroll !== false) {
      document.body.style.overflow = 'hidden';
    }

    if (options.trigger) {
      const triggerEl = this._resolveEl(options.trigger);
      if (triggerEl) triggerEl.setAttribute('aria-expanded', 'true');
    }

    if (typeof options.onOpen === 'function') {
      options.onOpen(sheetEl);
    }
  },

  /**
   * Close a bottom sheet and its backdrop
   * @param {string|HTMLElement} sheet
   * @param {string|HTMLElement} [backdrop]
   * @param {Object} [options]
   */
  close(sheet, backdrop, options = {}) {
    const sheetEl = this._resolveEl(sheet);
    const backdropEl = this._resolveEl(backdrop);

    if (sheetEl) {
      sheetEl.classList.remove('open', 'active');
      sheetEl.setAttribute('aria-hidden', 'true');
      this._activeSheets.delete(sheetEl);
    }

    if (backdropEl) {
      backdropEl.classList.remove('open', 'active');
      backdropEl.setAttribute('aria-hidden', 'true');
    }

    // Restore body scroll when no more sheets are open
    if (this._activeSheets.size === 0) {
      document.body.style.overflow = '';
    }

    if (options && options.trigger) {
      const triggerEl = this._resolveEl(options.trigger);
      if (triggerEl) triggerEl.setAttribute('aria-expanded', 'false');
    }

    if (options && typeof options.onClose === 'function') {
      options.onClose(sheetEl);
    }
  },

  /**
   * Toggle sheet open/closed state
   */
  toggle(sheet, backdrop, shouldOpen, options = {}) {
    const sheetEl = this._resolveEl(sheet);
    if (!sheetEl) return;
    const isCurrentlyOpen = sheetEl.classList.contains('open') || sheetEl.classList.contains('active');
    const targetState = shouldOpen !== undefined ? shouldOpen : !isCurrentlyOpen;

    if (targetState) {
      this.open(sheet, backdrop, options);
    } else {
      this.close(sheet, backdrop, options);
    }
  },

  /**
   * Close all active bottom sheets and backdrops across the screen
   */
  closeAll() {
    document.querySelectorAll('.mobile-bottom-sheet.open, .mobile-bottom-sheet.active').forEach(sheet => {
      sheet.classList.remove('open', 'active');
      sheet.setAttribute('aria-hidden', 'true');
    });
    document.querySelectorAll('.sheet-backdrop.open, .sheet-backdrop.active').forEach(bd => {
      bd.classList.remove('open', 'active');
      bd.setAttribute('aria-hidden', 'true');
    });
    this._activeSheets.clear();
    document.body.style.overflow = '';
  }
};

// Global escape key listener to close top-most active bottom sheet
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && GrihamBottomSheet._activeSheets.size > 0) {
    GrihamBottomSheet.closeAll();
  }
});

window.GrihamBottomSheet = GrihamBottomSheet;
