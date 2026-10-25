/**
 * Griham Design System - Reusable Loader & Skeleton Component
 * File: js/components/loader.js
 */

const GrihamLoader = {
  /**
   * Render standardized skeleton card HTML placeholders
   * @param {Object} options
   */
  renderSkeletonCards(options = {}) {
    const {
      count = 3,
      height = '80px',
      cardClass = 'dash-skeleton-card',
      containerClass = '',
      id = ''
    } = options;

    const cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(`<div class="${cardClass}" style="height:${height};" aria-hidden="true"></div>`);
    }

    const idAttr = id ? `id="${id}"` : '';
    const styleAttr = 'display:flex; flex-direction:column; gap:0.75rem;';

    if (containerClass || id) {
      return `<div ${idAttr} class="${containerClass}" style="${styleAttr}">${cards.join('\n')}</div>`.trim();
    }
    return cards.join('\n');
  },

  /**
   * Render inline spinner icon HTML markup
   * @param {Object} options
   */
  renderSpinner(options = {}) {
    const {
      size = 18,
      color = 'currentColor',
      customClass = 'spinner-icon',
      id = ''
    } = options;

    const idAttr = id ? `id="${id}"` : '';

    return `
      <svg class="${customClass}" ${idAttr} width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
    `.trim();
  },

  /**
   * Toggle visibility of a loading container
   * @param {string|HTMLElement} container
   * @param {boolean} show
   * @param {string} [displayType='flex']
   */
  toggle(container, show, displayType = 'flex') {
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;
    el.style.display = show ? displayType : 'none';
  }
};

window.GrihamLoader = GrihamLoader;
