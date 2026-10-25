/**
 * Griham Design System - Reusable Empty State Component
 * File: js/components/emptyState.js
 */

const GrihamEmptyState = {
  /**
   * Render standardized empty state HTML markup
   * @param {Object} options
   */
  render(options = {}) {
    const {
      id = '',
      title = 'No items found',
      description = '',
      icon = '',
      actionText = '',
      onAction = '',
      actionId = '',
      customClass = 'maint-empty-card',
      titleId = '',
      descId = '',
      isVisible = false
    } = options;

    const idAttr = id ? `id="${id}"` : '';
    const titleIdAttr = titleId ? `id="${titleId}"` : '';
    const descIdAttr = descId ? `id="${descId}"` : '';
    const actionIdAttr = actionId ? `id="${actionId}"` : '';
    const styleAttr = isVisible ? 'display:flex;' : 'display:none;';

    const defaultIcon = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    `;

    const iconHtml = icon || defaultIcon;

    const actionHtml = actionText ? `
      <button type="button" class="btn-filter-reset-action" ${actionIdAttr} onclick="${onAction}">
        ${actionText}
      </button>
    `.trim() : '';

    const descHtml = description ? `<p class="empty-desc" ${descIdAttr}>${description}</p>` : '';

    return `
      <div class="${customClass}" ${idAttr} style="${styleAttr}">
        <div class="empty-icon-pill" aria-hidden="true">
          ${iconHtml}
        </div>
        <h3 class="empty-title" ${titleIdAttr}>${title}</h3>
        ${descHtml}
        ${actionHtml}
      </div>
    `.trim();
  },

  /**
   * Toggle empty state visibility
   * @param {string|HTMLElement} el
   * @param {boolean} show
   */
  toggle(el, show) {
    const target = typeof el === 'string' ? document.getElementById(el) : el;
    if (!target) return;
    target.style.display = show ? 'flex' : 'none';
  }
};

window.GrihamEmptyState = GrihamEmptyState;
