/**
 * Griham Design System - Reusable Tabs Controller & Component
 * File: js/components/tabs.js
 */

const GrihamTabs = {
  /**
   * Render standardized tab bar HTML markup
   * @param {Object} options
   */
  render(options = {}) {
    const {
      id = '',
      items = [],
      containerClass = 'griham-tab-bar',
      tabClass = 'tab-btn',
      activeTabClass = 'active',
      onClick = '',
      ariaLabel = 'Navigation Tabs'
    } = options;

    const idAttr = id ? `id="${id}"` : '';

    const tabsHtml = items.map((item, idx) => {
      const isActive = Boolean(item.active || idx === 0);
      const activeClass = isActive ? activeTabClass : '';
      const selected = isActive ? 'true' : 'false';
      const itemAction = onClick ? onClick.replace(/\{\{value\}\}/g, item.value || '') : (item.onClick || '');
      const clickAttr = itemAction ? `onclick="${itemAction}"` : '';
      const idStr = item.id ? `id="${item.id}"` : '';
      const dataTab = item.value !== undefined ? `data-tab="${item.value}"` : '';
      const badge = item.badge !== undefined ? `<span class="tab-badge">${item.badge}</span>` : '';

      return `
        <button
          type="button"
          class="${tabClass} ${activeClass}"
          ${idStr}
          ${dataTab}
          role="tab"
          aria-selected="${selected}"
          ${clickAttr}
        >
          <span>${item.label || item.value}</span>
          ${badge}
        </button>
      `.trim();
    }).join('\n');

    return `
      <div class="${containerClass}" ${idAttr} role="tablist" aria-label="${ariaLabel}">
        ${tabsHtml}
      </div>
    `.trim();
  },

  /**
   * Activate a specific tab within a container
   * @param {string|HTMLElement} container
   * @param {string|HTMLElement} targetTab - Button element, tab ID, or data-tab attribute value
   * @param {Object} [options]
   */
  activate(container, targetTab, options = {}) {
    const containerEl = typeof container === 'string' ? document.querySelector(container) : container;
    if (!containerEl) return null;

    const tabs = Array.from(containerEl.querySelectorAll('[role="tab"], button'));
    if (!tabs.length) return null;

    let activeEl = null;

    if (typeof targetTab === 'string') {
      activeEl = containerEl.querySelector(`#${targetTab}`) ||
                 containerEl.querySelector(`[data-tab="${targetTab}"]`) ||
                 containerEl.querySelector(`[data-status-filter="${targetTab}"]`) ||
                 containerEl.querySelector(`[data-approval-filter="${targetTab}"]`);
    } else if (targetTab && targetTab.nodeType === 1) {
      activeEl = targetTab;
    }

    if (!activeEl) return null;

    const activeClass = options.activeClass || 'active';

    tabs.forEach(tab => {
      const isMatch = tab === activeEl;
      if (isMatch) {
        tab.classList.add(activeClass);
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove(activeClass);
        tab.setAttribute('aria-selected', 'false');
      }
    });

    const val = activeEl.getAttribute('data-tab') ||
                activeEl.getAttribute('data-status-filter') ||
                activeEl.getAttribute('data-approval-filter') ||
                activeEl.id;

    if (typeof options.onChange === 'function') {
      options.onChange(val, activeEl);
    }

    return val;
  }
};

window.GrihamTabs = GrihamTabs;
