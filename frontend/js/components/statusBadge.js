/**
 * Griham Design System - Reusable Status Badge Component
 * File: js/components/statusBadge.js
 */

const GrihamStatusBadge = {
  /**
   * Get semantic CSS class name for a given status
   * Preserves distinct states: 'pending' vs 'pending_verification' etc.
   * @param {string} status
   * @returns {string}
   */
  getStatusClass(status) {
    if (!status) return 'status-default';
    const s = String(status).trim().toLowerCase();

    switch (s) {
      // Pending variants
      case 'pending':
      case 'requested':
      case 'expected':
        return 'badge-pending';
      case 'pending verification':
      case 'pending_verification':
      case 'checked out':
      case 'checked_out':
        return 'badge-verification';
      case 'pending approval':
      case 'pending_approval':
        return 'badge-pending';

      // Positive / Approval states
      case 'approved':
      case 'active':
      case 'checked in':
      case 'checked_in':
      case 'handed over':
      case 'handed_over':
      case 'resolved':
      case 'solved':
      case 'confirmed':
      case 'completed':
      case 'paid':
      case 'paid_early':
      case 'paid_ontime':
      case 'paid_late':
      case 'paid on time':
      case 'paid early':
      case 'paid late':
      case 'available':
      case 'normal':
      case 'normal supply':
      case 'read':
        return 'badge-approved';

      // Destructive / Rejected states
      case 'rejected':
      case 'cancelled':
      case 'inactive':
      case 'disabled':
      case 'deactivated':
      case 'emergency':
      case 'overdue':
      case 'urgent':
        return 'badge-rejected';

      // Progress / Attention states
      case 'working':
      case 'in progress':
      case 'in_progress':
      case 'arrived':
      case 'entered':
      case 'assigned':
      case 'scheduled':
      case 'partially paid':
      case 'partial':
      case 'maintenance':
      case 'under maintenance':
      case 'booked':
      case 'negotiated':
      case 'vendor contacted':
      case 'unread':
      case 'important':
        return 'badge-progress';

      default:
        return `status-${s.replace(/[^a-z0-9]/g, '-')}`;
    }
  },

  /**
   * Render standardized status badge HTML markup
   * @param {Object} options
   */
  render(options = {}) {
    const {
      status = '',
      variant = 'pill', // 'pill' | 'chip' | 'badge'
      label = '',
      id = '',
      customClass = '',
      showDot = false
    } = options;

    if (!status && !label) return '';

    const text = label || status;
    const sClass = this.getStatusClass(status || label);
    const idAttr = id ? `id="${id}"` : '';

    let baseClass = 'status-pill';
    if (variant === 'chip') baseClass = 'res-status-chip';
    else if (variant === 'badge') baseClass = 'res-recent-badge';

    const dotHtml = showDot ? `<span class="sum-card-dot dot-${sClass}" aria-hidden="true"></span>` : '';

    return `<span class="${baseClass} ${sClass} ${customClass}" ${idAttr}>${dotHtml}${text}</span>`.trim();
  }
};

window.GrihamStatusBadge = GrihamStatusBadge;
