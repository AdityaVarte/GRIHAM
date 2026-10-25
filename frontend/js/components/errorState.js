/**
 * Griham Design System - Reusable Error State Component
 * File: js/components/errorState.js
 */

const GrihamErrorState = {
  /**
   * Render standardized error state HTML markup
   * @param {Object} options
   */
  render(options = {}) {
    const {
      id = '',
      title = 'Unable to load content.',
      message = '',
      retryAction = '',
      retryLabel = 'Try Again',
      retryId = '',
      customClass = 'maint-error-card',
      titleId = '',
      msgId = '',
      isVisible = false
    } = options;

    const idAttr = id ? `id="${id}"` : '';
    const titleIdAttr = titleId ? `id="${titleId}"` : '';
    const msgIdAttr = msgId ? `id="${msgId}"` : '';
    const retryIdAttr = retryId ? `id="${retryId}"` : '';
    const styleAttr = isVisible ? 'display:flex;' : 'display:none;';

    const msgHtml = message ? `<p class="error-desc" ${msgIdAttr} style="font-size:0.8rem; color:var(--text-muted); margin:0.25rem 0 0.5rem;">${message}</p>` : '';

    const retryBtnHtml = retryAction ? `
      <button type="button" class="btn-primary-action btn-admin-style" ${retryIdAttr} onclick="${retryAction}" style="min-height:38px; font-size:0.82rem; padding:0.4rem 1.2rem; margin-top:0.4rem;">
        <span data-i18n="btn_try_again">${retryLabel}</span>
      </button>
    `.trim() : '';

    return `
      <div class="${customClass}" ${idAttr} style="${styleAttr}">
        <p style="font-weight:600; color:var(--text-primary); margin-bottom:0.35rem;" ${titleIdAttr}>${title}</p>
        ${msgHtml}
        ${retryBtnHtml}
      </div>
    `.trim();
  },

  /**
   * Toggle error state visibility
   * @param {string|HTMLElement} el
   * @param {boolean} show
   */
  toggle(el, show) {
    const target = typeof el === 'string' ? document.getElementById(el) : el;
    if (!target) return;
    target.style.display = show ? 'flex' : 'none';
  }
};

window.GrihamErrorState = GrihamErrorState;
