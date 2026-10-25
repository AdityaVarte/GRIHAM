/**
 * Griham Design System - Reusable Header & Top Navigation Component
 * File: js/components/header.js
 */

const GrihamHeader = {
  /**
   * Render standardized back button HTML string
   * @param {Object} options
   */
  renderBackButton(options = {}) {
    const {
      target = '',
      onClick = '',
      label = 'Back',
      id = '',
      customClass = '',
      ariaLabel = 'Back'
    } = options;

    const action = onClick || (target ? `GrihamRouter.navigate('${target}')` : 'GrihamRouter.goBack()');
    const idAttr = id ? `id="${id}"` : '';

    return `
      <button class="btn-top-back ${customClass}" ${idAttr} onclick="${action}" aria-label="${ariaLabel}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span data-i18n="nav_back">${label}</span>
      </button>
    `.trim();
  },

  /**
   * Render complete top navigation bar HTML string
   * @param {Object} options
   */
  render(options = {}) {
    const {
      title = '',
      backTarget = '',
      onBack = '',
      rightAction = '',
      badge = '',
      id = '',
      titleId = '',
      customClass = '',
      backId = '',
      backAriaLabel = 'Back',
      backLabel = 'Back'
    } = options;

    const idAttr = id ? `id="${id}"` : '';
    const backBtn = (backTarget || onBack !== false) 
      ? this.renderBackButton({ target: backTarget, onClick: onBack, id: backId, ariaLabel: backAriaLabel, label: backLabel })
      : '<div style="width:38px;" aria-hidden="true"></div>';

    let centerContent = '';
    if (title) {
      const tIdAttr = titleId ? `id="${titleId}"` : '';
      centerContent = `<h1 class="top-bar-title" ${tIdAttr}>${title}</h1>`;
    } else if (badge) {
      centerContent = `<span class="top-bar-brand-badge">${badge}</span>`;
    }

    const rightContent = rightAction || '<div style="width:38px;" aria-hidden="true"></div>';

    return `
      <div class="screen-top-bar ${customClass}" ${idAttr}>
        ${backBtn}
        ${centerContent}
        ${rightContent}
      </div>
    `.trim();
  },

  /**
   * Render notification bell button HTML string
   * @param {Object} options
   */
  renderNotificationBell(options = {}) {
    const {
      id = '',
      onClick = '',
      badgeId = '',
      hasBadge = false,
      customClass = 'btn-topbar-icon',
      ariaLabel = 'Notifications',
      title = 'Notifications'
    } = options;

    const idAttr = id ? `id="${id}"` : '';
    const actionAttr = onClick ? `onclick="${onClick}"` : '';
    const badgeIdAttr = badgeId ? `id="${badgeId}"` : '';
    const badgeDisplay = hasBadge ? '' : 'style="display:none;"';

    return `
      <button type="button" class="${customClass}" ${idAttr} ${actionAttr} aria-label="${ariaLabel}" title="${title}">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span class="icon-badge-dot" ${badgeIdAttr} ${badgeDisplay} aria-hidden="true"></span>
      </button>
    `.trim();
  },

  /**
   * Render vertical three-dot menu trigger button HTML string
   * @param {Object} options
   */
  renderThreeDotTrigger(options = {}) {
    const {
      id = '',
      onClick = '',
      customClass = 'btn-topbar-icon',
      ariaLabel = 'Menu',
      title = 'More options'
    } = options;

    const idAttr = id ? `id="${id}"` : '';
    const actionAttr = onClick ? `onclick="${onClick}"` : '';

    return `
      <button type="button" class="${customClass}" ${idAttr} ${actionAttr} aria-label="${ariaLabel}" aria-haspopup="true" title="${title}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="1.2"/>
          <circle cx="12" cy="5" r="1.2"/>
          <circle cx="12" cy="19" r="1.2"/>
        </svg>
      </button>
    `.trim();
  }
};

window.GrihamHeader = GrihamHeader;
