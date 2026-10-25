/**
 * GRIHAM FRONTEND - ADMIN EMERGENCY SOS ALERT MANAGEMENT CONTROLLER
 * Page: SOS Alerts (#admin-sos or #/admin/sos)
 */

window.HTML_ADMIN_SOS = `
<!-- DETAIL BOTTOM SHEET BACKDROP -->
<div class="sheet-backdrop" id="sheet-sos-detail-backdrop" onclick="GrihamAdminSosUI.closeDetail()" aria-hidden="true"></div>

<!-- DETAIL BOTTOM SHEET -->
<div class="mobile-bottom-sheet" id="sheet-sos-detail" role="dialog" aria-modal="true" aria-labelledby="sos-detail-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamAdminSosUI.closeDetail()" aria-label="Close emergency alert details">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="sos-detail-title">Emergency Alert Details</h3>
    <div style="width:24px;" aria-hidden="true"></div>
  </div>

  <div class="sos-detail-body" id="sos-detail-body-content">
    <!-- Populated dynamically by GrihamAdminSosUI.openDetail() -->
  </div>
</div>

<!-- RESOLVE CONFIRMATION MODAL -->
<div class="modal-backdrop" id="modal-sos-resolve-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-resolve-title" aria-hidden="true">
  <div class="sos-modal-card">
    <div class="sos-modal-header">
      <div class="sos-modal-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <div>
        <h4 class="sos-modal-title" id="modal-resolve-title">Mark SOS as Resolved?</h4>
        <span style="font-size:0.75rem; color:var(--text-muted);" id="modal-resolve-subtext">SOS-2026-0018</span>
      </div>
    </div>

    <p class="sos-modal-desc" id="modal-resolve-desc">
      Confirm that this resident emergency has been fully addressed and assistance was provided.
    </p>

    <div>
      <label for="input-sos-resolve-notes" class="sos-field-label" style="display:block; margin-bottom:0.25rem;">Resolution Remarks (Optional)</label>
      <textarea id="input-sos-resolve-notes" class="sos-modal-notes-input" placeholder="e.g. Medical team attended; resident is stable..."></textarea>
    </div>

    <div class="sos-modal-btn-row">
      <button type="button" class="btn-modal-cancel" onclick="GrihamAdminSosUI.closeResolveModal()">Cancel</button>
      <button type="button" class="btn-modal-confirm-resolve" id="btn-modal-confirm-action" onclick="GrihamAdminSosUI.confirmResolve()">Mark Resolved</button>
    </div>
  </div>
</div>

<!-- ================================================================= -->
<!-- MAIN SCREEN VIEW: Admin SOS Alerts (#admin-sos)                  -->
<!-- ================================================================= -->
<section id="screen-admin-sos" class="app-view" aria-labelledby="sos-header-title">

  <!-- TOP BAR -->
  <div class="screen-top-bar">
    ${GrihamHeader.renderBackButton({
      target: '/admin/home',
      id: 'btn-admin-sos-back',
      ariaLabel: 'Back to Admin Dashboard'
    })}

    <h1 class="top-bar-screen-title" id="sos-header-title">SOS Alerts</h1>

    <div style="display:flex; align-items:center; gap:0.35rem;">
      <button type="button" class="btn-top-filter" onclick="GrihamA11y.toggleSheet(true)" id="btn-admin-sos-a11y" aria-label="Accessibility Settings" title="Accessibility">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
          <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
          <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
          <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
          <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
        </svg>
      </button>
    </div>
  </div>

  <!-- 1. COMPACT SUMMARY OVERVIEW -->
  <div class="sos-summary-section">
    <div class="sos-summary-grid">
      <div class="sos-sum-card card-active-sos" onclick="GrihamAdminSosUI.setStatusFilter('active')" role="button" tabindex="0" aria-label="Filter Active Alerts">
        <span class="sos-sum-val" id="sos-stat-active">0</span>
        <span class="sos-sum-lbl">Active</span>
      </div>
      <div class="sos-sum-card card-resolved-today" onclick="GrihamAdminSosUI.setDateFilter('today')" role="button" tabindex="0" aria-label="Filter Resolved Today">
        <span class="sos-sum-val" id="sos-stat-resolved-today">0</span>
        <span class="sos-sum-lbl">Resolved Today</span>
      </div>
      <div class="sos-sum-card" onclick="GrihamAdminSosUI.clearAllFilters()" role="button" tabindex="0" aria-label="View Total Alerts">
        <span class="sos-sum-val" id="sos-stat-total">0</span>
        <span class="sos-sum-lbl">Total</span>
      </div>
    </div>
  </div>

  <!-- 2. ACTIVE SOS EMERGENCY SECTION -->
  <div class="sos-section-header">
    <h2 class="sos-section-title">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      <span>Active Emergency Alerts</span>
    </h2>
    <span class="sos-badge-active-count" id="sos-active-header-badge">
      <span class="sos-pulse-indicator" style="background:#ef4444;"></span>
      <span id="sos-active-count-text">0 Active</span>
    </span>
  </div>

  <!-- Active List Container / Calm Empty State -->
  <div class="sos-active-container" id="sos-active-container" role="region" aria-label="Active emergency alerts">
    <!-- Populated by JS -->
  </div>

  <!-- Calm Empty State for Active (Shown when 0 active) -->
  <div class="sos-active-container" id="sos-active-empty" style="display:none;">
    <div class="sos-calm-empty-card">
      <div class="sos-calm-icon-box" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      </div>
      <strong class="sos-calm-title">No active SOS alerts</strong>
      <p class="sos-calm-desc">All current emergency alerts have been handled.</p>
    </div>
  </div>

  <!-- 3. SOS HISTORY SECTION -->
  <div class="sos-history-section">
    <div class="sos-section-header" style="padding-left:0; padding-right:0;">
      <h2 class="sos-section-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <span>Alert History</span>
      </h2>
      <button type="button" class="btn-sos-sort" id="btn-sos-sort-toggle" onclick="GrihamAdminSosUI.toggleSort()" aria-label="Toggle sort order">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>
        <span id="sos-sort-label">Newest First</span>
      </button>
    </div>

    <!-- Search Bar -->
    <div class="sos-search-bar">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="sos-search-icon" aria-hidden="true">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        id="sos-search-input"
        class="sos-search-input"
        placeholder="Search by ID, resident, wing, flat, phone..."
        oninput="GrihamAdminSosUI.handleSearch(this.value)"
        aria-label="Search SOS alerts"
      >
      <button type="button" class="sos-search-clear-btn" id="btn-sos-search-clear" onclick="GrihamAdminSosUI.clearSearch()" aria-label="Clear search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <!-- Filter Controls Toolbar -->
    <div class="sos-filter-toolbar">
      <!-- Status Tabs: All, Active, Resolved -->
      <div class="sos-tabs-row" role="tablist" aria-label="Filter alerts by status">
        <button type="button" class="sos-filter-chip active" data-status-filter="all" onclick="GrihamAdminSosUI.setStatusFilter('all')" role="tab" aria-selected="true">All Status</button>
        <button type="button" class="sos-filter-chip" data-status-filter="active" onclick="GrihamAdminSosUI.setStatusFilter('active')" role="tab" aria-selected="false">Active</button>
        <button type="button" class="sos-filter-chip" data-status-filter="resolved" onclick="GrihamAdminSosUI.setStatusFilter('resolved')" role="tab" aria-selected="false">Resolved</button>
      </div>

      <!-- Date Sub-filters: All, Today, Last 7 Days, Last 30 Days, Custom -->
      <div class="sos-subfilter-row">
        <div class="sos-date-chips-wrap" role="group" aria-label="Filter alerts by date">
          <button type="button" class="sos-date-chip active" data-date-filter="all" onclick="GrihamAdminSosUI.setDateFilter('all')">All Dates</button>
          <button type="button" class="sos-date-chip" data-date-filter="today" onclick="GrihamAdminSosUI.setDateFilter('today')">Today</button>
          <button type="button" class="sos-date-chip" data-date-filter="7days" onclick="GrihamAdminSosUI.setDateFilter('7days')">Last 7 Days</button>
          <button type="button" class="sos-date-chip" data-date-filter="30days" onclick="GrihamAdminSosUI.setDateFilter('30days')">Last 30 Days</button>
          <button type="button" class="sos-date-chip" data-date-filter="custom" onclick="GrihamAdminSosUI.setDateFilter('custom')">Custom</button>
        </div>
      </div>

      <!-- Custom Date Input Row (Toggled when Custom is selected) -->
      <div class="sos-custom-date-box" id="sos-custom-date-box">
        <div class="sos-date-field-group">
          <label class="sos-date-field-label" for="sos-input-start-date">From</label>
          <input type="date" id="sos-input-start-date" class="sos-date-input" onchange="GrihamAdminSosUI.applyCustomDate()">
        </div>
        <div class="sos-date-field-group">
          <label class="sos-date-field-label" for="sos-input-end-date">To</label>
          <input type="date" id="sos-input-end-date" class="sos-date-input" onchange="GrihamAdminSosUI.applyCustomDate()">
        </div>
      </div>
    </div>

    <!-- SKELETON LOADING PLACEHOLDER -->
    <div class="sos-skeleton-wrap" id="sos-history-loading" style="display:none;" aria-hidden="true">
      <div class="sos-skeleton-card"></div>
      <div class="sos-skeleton-card"></div>
      <div class="sos-skeleton-card"></div>
    </div>

    <!-- ERROR STATE -->
    <div class="sos-error-state" id="sos-history-error" style="display:none;" role="alert">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.8">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <strong class="sos-error-title">Unable to load SOS alerts.</strong>
      <p style="font-size:0.78rem; color:var(--text-muted); margin:0;">Please verify your connection and try again.</p>
      <button type="button" class="btn-sos-retry" onclick="GrihamAdminSosUI.loadData()">Retry</button>
    </div>

    <!-- EMPTY HISTORY STATE -->
    <div class="sos-error-state" id="sos-history-empty" style="display:none;">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" style="opacity:0.35;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <strong style="font-size:0.95rem; color:var(--text-primary);">No SOS history found</strong>
      <p style="font-size:0.78rem; color:var(--text-muted); margin:0;">No records match your selected search or filter criteria.</p>
      <button type="button" class="btn-sos-retry" onclick="GrihamAdminSosUI.clearAllFilters()" style="margin-top:0.3rem;">Clear Filters</button>
    </div>

    <!-- History List Items -->
    <div class="sos-history-list" id="sos-history-list" role="list" aria-label="SOS Alert History">
      <!-- Populated dynamically by JS -->
    </div>
  </div>

</section>
`;

/**
 * Controller Object for Admin SOS Alerts Management
 */
const GrihamAdminSosUI = {
  state: {
    alerts: [],
    summary: { active: 0, resolvedToday: 0, total: 0 },
    searchQuery: "",
    statusFilter: "all", // "all", "active", "resolved"
    dateFilter: "all", // "all", "today", "7days", "30days", "custom"
    startDate: "",
    endDate: "",
    sortBy: "newest", // "newest", "oldest"
    currentDetailAlert: null,
    resolvingAlertId: null,
    isLoading: false,
    isInitialized: false
  },

  /* ---- Lifecycle ---- */
  init() {
    if (typeof GrihamAuth !== "undefined" && !GrihamAuth.hasRole("admin")) {
      return;
    }

    this.bindEventsOnce();
    this.loadData();
  },

  bindEventsOnce() {
    if (this.state.isInitialized) return;
    this.state.isInitialized = true;
  },

  /* ---- Data Fetching ---- */
  async loadData() {
    if (this.state.isLoading) return;
    this.state.isLoading = true;

    this.showSkeleton(true);
    this.showError(false);

    try {
      const params = {
        status: this.state.statusFilter,
        dateRange: this.state.dateFilter,
        search: this.state.searchQuery,
        sort: this.state.sortBy
      };
      if (this.state.dateFilter === "custom") {
        if (this.state.startDate) params.startDate = this.state.startDate;
        if (this.state.endDate) params.endDate = this.state.endDate;
      }

      // Fetch all alerts with current query params
      const res = await getAdminSOS(params);
      const alerts = res.alerts || [];
      const summary = res.summary || { active: 0, resolvedToday: 0, total: alerts.length };

      this.state.alerts = alerts;
      this.state.summary = summary;

      this.renderSummary();
      this.renderActiveAlerts();
      this.renderHistoryList();

    } catch (err) {
      console.error("[Admin SOS] Failed to fetch alerts:", err);
      this.showError(true);
    } finally {
      this.showSkeleton(false);
      this.state.isLoading = false;
    }
  },

  /* ---- Rendering ---- */
  renderSummary() {
    const s = this.state.summary;
    const activeEl = document.getElementById("sos-stat-active");
    const resolvedTodayEl = document.getElementById("sos-stat-resolved-today");
    const totalEl = document.getElementById("sos-stat-total");
    const badgeTextEl = document.getElementById("sos-active-count-text");

    if (activeEl) activeEl.textContent = s.active || 0;
    if (resolvedTodayEl) resolvedTodayEl.textContent = s.resolvedToday || 0;
    if (totalEl) totalEl.textContent = s.total || 0;
    if (badgeTextEl) badgeTextEl.textContent = `${s.active || 0} Active`;
  },

  renderActiveAlerts() {
    const container = document.getElementById("sos-active-container");
    const emptyEl = document.getElementById("sos-active-empty");
    if (!container || !emptyEl) return;

    // Filter active alerts from total loaded alerts (or query DB directly if filtered)
    let activeAlerts = this.state.alerts.filter(a => a.status === "Active");
    if (this.state.statusFilter === "resolved") {
      // If status filter is resolved, active section still reflects active count
      if (window.MOCK_SOS_DB && Array.isArray(window.MOCK_SOS_DB.alerts)) {
        activeAlerts = window.MOCK_SOS_DB.alerts.filter(a => a.status === "Active");
      }
    }

    if (activeAlerts.length === 0) {
      container.style.display = "none";
      emptyEl.style.display = "flex";
      return;
    }

    container.style.display = "flex";
    emptyEl.style.display = "none";

    container.innerHTML = activeAlerts.map(alert => {
      const timeStr = this.formatTime(alert.createdAt);
      const phoneDigits = (alert.phone || "").replace(/\D/g, "");
      const emergencyIcon = this.getEmergencyIcon(alert.emergencyType);

      return `
        <article class="sos-active-card" id="sos-card-${alert.id}" role="alert">
          <div class="sos-card-top-row">
            <div class="sos-id-badge-wrap">
              <span class="sos-id-tag">${alert.id}</span>
              <span class="sos-time-received">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>${timeStr}</span>
              </span>
            </div>
            <span class="sos-status-pill status-active">
              <span class="sos-pulse-indicator"></span>
              <span>ACTIVE</span>
            </span>
          </div>

          <div class="sos-card-resident-row">
            <h3 class="sos-resident-name">${this.escapeHtml(alert.residentName || "Resident")}</h3>
            <div class="sos-flat-wing">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span>Wing ${this.escapeHtml(alert.wing || "A")} • Flat ${this.escapeHtml(alert.flatNumber || "")}</span>
            </div>
          </div>

          <div class="sos-emergency-tag-row">
            <span class="sos-emergency-chip">
              ${emergencyIcon}
              <span>${this.escapeHtml(alert.emergencyType || "Emergency")}</span>
            </span>
          </div>

          ${alert.message ? `
            <p class="sos-message-text">
              <strong>Emergency:</strong> ${this.escapeHtml(alert.message)}
            </p>
          ` : ""}

          ${alert.location ? `
            <div class="sos-location-text">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Location: ${this.escapeHtml(alert.location)}</span>
            </div>
          ` : ""}

          <div class="sos-actions-row">
            <a href="tel:${phoneDigits}" class="btn-sos-call" aria-label="Call resident ${alert.residentName}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Call</span>
            </a>
            <button type="button" class="btn-sos-details" onclick="GrihamAdminSosUI.openDetail('${alert.id}')" aria-label="View details for ${alert.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span>Details</span>
            </button>
            <button type="button" class="btn-sos-resolve" onclick="GrihamAdminSosUI.openResolveModal('${alert.id}')" aria-label="Mark ${alert.id} resolved">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Resolve</span>
            </button>
          </div>
        </article>
      `;
    }).join("");
  },

  renderHistoryList() {
    const listContainer = document.getElementById("sos-history-list");
    const emptyContainer = document.getElementById("sos-history-empty");
    if (!listContainer || !emptyContainer) return;

    const list = this.state.alerts;

    if (list.length === 0) {
      listContainer.innerHTML = "";
      emptyContainer.style.display = "flex";
      return;
    }

    emptyContainer.style.display = "none";

    listContainer.innerHTML = list.map(alert => {
      const isResolved = alert.status === "Resolved";
      const timeStr = this.formatDateAndTime(alert.createdAt);
      const emergencyIcon = this.getEmergencyIcon(alert.emergencyType);

      return `
        <article class="sos-history-card" onclick="GrihamAdminSosUI.openDetail('${alert.id}')" role="listitem" tabindex="0" aria-label="${alert.id} - ${alert.residentName} - ${alert.status}">
          <div class="sos-history-top">
            <div style="display:flex; align-items:center; gap:0.45rem;">
              <span class="sos-id-tag" style="font-size:0.72rem;">${alert.id}</span>
              <span class="sos-history-flat-badge">Wing ${this.escapeHtml(alert.wing || "A")} • Flat ${this.escapeHtml(alert.flatNumber || "")}</span>
            </div>
            <span class="sos-status-pill ${isResolved ? "status-resolved" : "status-active"}">
              ${!isResolved ? '<span class="sos-pulse-indicator"></span>' : '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>'}
              <span>${isResolved ? "RESOLVED" : "ACTIVE"}</span>
            </span>
          </div>

          <div style="display:flex; align-items:baseline; justify-content:space-between; gap:0.5rem;">
            <h4 class="sos-history-resident">${this.escapeHtml(alert.residentName || "Resident")}</h4>
            <div class="sos-history-type">
              ${emergencyIcon}
              <span>${this.escapeHtml(alert.emergencyType || "Emergency")}</span>
            </div>
          </div>

          <div class="sos-history-meta">
            <span>Received: ${timeStr}</span>
            ${isResolved && alert.resolvedAt ? `
              <span style="color:#10b981;">Resolved: ${this.formatTime(alert.resolvedAt)}</span>
            ` : ""}
          </div>
        </article>
      `;
    }).join("");
  },

  /* ---- Details Bottom Sheet ---- */
  openDetail(alertId) {
    const alert = this.state.alerts.find(a => a.id === alertId) ||
                  (window.MOCK_SOS_DB?.alerts || []).find(a => a.id === alertId);

    if (!alert) return;
    this.state.currentDetailAlert = alert;

    const contentEl = document.getElementById("sos-detail-body-content");
    const isResolved = alert.status === "Resolved";
    const phoneDigits = (alert.phone || "").replace(/\D/g, "");
    const emergencyIcon = this.getEmergencyIcon(alert.emergencyType);

    if (contentEl) {
      contentEl.innerHTML = `
        <div class="sos-detail-header-card">
          <div>
            <div class="sos-detail-id-label">Emergency SOS ID</div>
            <div class="sos-detail-id-val">${alert.id}</div>
          </div>
          <span class="sos-status-pill ${isResolved ? "status-resolved" : "status-active"}">
            ${!isResolved ? '<span class="sos-pulse-indicator"></span>' : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>'}
            <span>${isResolved ? "RESOLVED" : "ACTIVE"}</span>
          </span>
        </div>

        <div class="sos-detail-grid">
          <div class="sos-detail-field">
            <span class="sos-field-label">Resident Name</span>
            <span class="sos-field-value">${this.escapeHtml(alert.residentName || "Resident")}</span>
          </div>
          <div class="sos-detail-field">
            <span class="sos-field-label">Wing &amp; Flat</span>
            <span class="sos-field-value">Wing ${this.escapeHtml(alert.wing || "A")} - ${this.escapeHtml(alert.flatNumber || "")}</span>
          </div>

          <div class="sos-detail-field">
            <span class="sos-field-label">Phone Number</span>
            <span class="sos-field-value">${this.escapeHtml(alert.phone || "Not provided")}</span>
          </div>
          <div class="sos-detail-field">
            <span class="sos-field-label">Emergency Type</span>
            <span class="sos-field-value" style="display:flex; align-items:center; gap:0.25rem;">
              ${emergencyIcon}
              <span>${this.escapeHtml(alert.emergencyType || "Emergency")}</span>
            </span>
          </div>

          <div class="sos-detail-field full-span">
            <span class="sos-field-label">Reported Issue / Message</span>
            <span class="sos-field-value" style="font-weight:400; line-height:1.4;">${this.escapeHtml(alert.message || "Assistance requested from resident unit.")}</span>
          </div>

          ${alert.location ? `
            <div class="sos-detail-field full-span">
              <span class="sos-field-label">Specific Location</span>
              <span class="sos-field-value" style="color:var(--admin-accent);">${this.escapeHtml(alert.location)}</span>
            </div>
          ` : ""}

          <div class="sos-detail-field">
            <span class="sos-field-label">Received Date &amp; Time</span>
            <span class="sos-field-value" style="font-size:0.78rem;">${this.formatDateAndTime(alert.createdAt)}</span>
          </div>
          <div class="sos-detail-field">
            <span class="sos-field-label">Society ID</span>
            <span class="sos-field-value" style="font-size:0.78rem;">${this.escapeHtml(alert.societyId || "GRIHAM-PUNE-001")}</span>
          </div>
        </div>

        ${isResolved ? `
          <div class="sos-resolution-banner">
            <div class="sos-resolution-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Resolution Information</span>
            </div>
            <div style="font-size:0.78rem; color:var(--text-secondary);">
              <div><strong>Resolved At:</strong> ${this.formatDateAndTime(alert.resolvedAt)}</div>
              <div><strong>Resolved By:</strong> ${this.escapeHtml(alert.resolvedBy || "Society Administrator")}</div>
              ${alert.resolutionNote ? `
                <div style="margin-top:0.25rem; background:rgba(0,0,0,0.2); padding:0.4rem 0.5rem; border-radius:6px;">
                  <strong>Note:</strong> ${this.escapeHtml(alert.resolutionNote)}
                </div>
              ` : ""}
            </div>
          </div>
        ` : ""}

        <div class="sos-detail-actions">
          <a href="tel:${phoneDigits}" class="btn-sos-call" style="width:100%; min-height:42px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>Call Resident (${alert.phone})</span>
          </a>

          ${!isResolved ? `
            <button type="button" class="btn-sos-resolve" style="width:100%; min-height:42px;" onclick="GrihamAdminSosUI.openResolveModal('${alert.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Mark this SOS as Resolved</span>
            </button>
          ` : ""}

          <button type="button" class="btn-sos-details" style="width:100%; min-height:40px;" onclick="GrihamAdminSosUI.closeDetail()">
            Close
          </button>
        </div>
      `;
    }

    GrihamBottomSheet.open("sheet-sos-detail", "sheet-sos-detail-backdrop");
  },

  closeDetail() {
    GrihamBottomSheet.close("sheet-sos-detail", "sheet-sos-detail-backdrop");
    this.state.currentDetailAlert = null;
  },

  closeAllSheets() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.closeAll();
    }
    this.closeResolveModal();
  },

  /* ---- Resolution Confirmation Modal ---- */
  openResolveModal(alertId) {
    this.state.resolvingAlertId = alertId;
    const alert = this.state.alerts.find(a => a.id === alertId) ||
                  (window.MOCK_SOS_DB?.alerts || []).find(a => a.id === alertId);

    const subtextEl = document.getElementById("modal-resolve-subtext");
    const descEl = document.getElementById("modal-resolve-desc");
    const notesInput = document.getElementById("input-sos-resolve-notes");

    if (subtextEl) subtextEl.textContent = alert ? `${alert.id} • ${alert.residentName} (${alert.wing}-${alert.flatNumber})` : alertId;
    if (descEl && alert) {
      descEl.textContent = `Mark ${alert.emergencyType} alert for Flat ${alert.wing}-${alert.flatNumber} as resolved? This will record your resolution timestamp.`;
    }
    if (notesInput) notesInput.value = "";

    const modalBackdrop = document.getElementById("modal-sos-resolve-backdrop");
    if (modalBackdrop) {
      modalBackdrop.classList.add("open");
      modalBackdrop.setAttribute("aria-hidden", "false");
    }
  },

  closeResolveModal() {
    const modalBackdrop = document.getElementById("modal-sos-resolve-backdrop");
    if (modalBackdrop) {
      modalBackdrop.classList.remove("open");
      modalBackdrop.setAttribute("aria-hidden", "true");
    }
    this.state.resolvingAlertId = null;
  },

  async confirmResolve() {
    const sosId = this.state.resolvingAlertId;
    if (!sosId) return;

    const notesInput = document.getElementById("input-sos-resolve-notes");
    const note = notesInput ? notesInput.value.trim() : "";

    const currentUser = typeof GrihamAuth !== "undefined" ? GrihamAuth.getUser() : null;
    const adminName = (currentUser && currentUser.name) || "Society Administrator";

    const btn = document.getElementById("btn-modal-confirm-action");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Resolving...";
    }

    try {
      const res = await resolveAdminSOS(sosId, {
        resolvedBy: adminName,
        resolutionNote: note || "Handled and resolved by administration."
      });

      this.showToast(`SOS alert ${sosId} marked as resolved.`);
      this.closeResolveModal();
      this.closeDetail();

      // Reload list to update counters & view
      await this.loadData();

    } catch (err) {
      console.error("[Admin SOS] Failed to resolve alert:", err);
      this.showToast(err.message || "Failed to resolve SOS alert.");
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Mark Resolved";
      }
    }
  },

  /* ---- Search & Filter Handlers ---- */
  handleSearch(val) {
    this.state.searchQuery = val.trim();
    const clearBtn = document.getElementById("btn-sos-search-clear");
    if (clearBtn) {
      clearBtn.style.display = this.state.searchQuery ? "block" : "none";
    }
    this.loadData();
  },

  clearSearch() {
    const input = document.getElementById("sos-search-input");
    if (input) input.value = "";
    this.handleSearch("");
  },

  setStatusFilter(status) {
    this.state.statusFilter = status;
    if (typeof GrihamTabs !== "undefined") {
      GrihamTabs.activate(".sos-status-chips-scroll", `[data-status-filter="${status}"]`);
    } else {
      document.querySelectorAll(".sos-filter-chip").forEach(chip => {
        const isMatch = chip.dataset.statusFilter === status;
        chip.classList.toggle("active", isMatch);
        chip.setAttribute("aria-selected", isMatch ? "true" : "false");
      });
    }
    this.loadData();
  },

  setDateFilter(range) {
    this.state.dateFilter = range;
    document.querySelectorAll(".sos-date-chip").forEach(chip => {
      chip.classList.toggle("active", chip.dataset.dateFilter === range);
    });

    const customBox = document.getElementById("sos-custom-date-box");
    if (customBox) {
      customBox.style.display = range === "custom" ? "flex" : "none";
    }

    if (range !== "custom") {
      this.loadData();
    }
  },

  applyCustomDate() {
    const startInput = document.getElementById("sos-input-start-date");
    const endInput = document.getElementById("sos-input-end-date");
    this.state.startDate = startInput ? startInput.value : "";
    this.state.endDate = endInput ? endInput.value : "";
    this.loadData();
  },

  toggleSort() {
    this.state.sortBy = this.state.sortBy === "newest" ? "oldest" : "newest";
    const labelEl = document.getElementById("sos-sort-label");
    if (labelEl) {
      labelEl.textContent = this.state.sortBy === "newest" ? "Newest First" : "Oldest First";
    }
    this.loadData();
  },

  clearAllFilters() {
    this.state.statusFilter = "all";
    this.state.dateFilter = "all";
    this.state.searchQuery = "";
    this.state.startDate = "";
    this.state.endDate = "";
    this.state.sortBy = "newest";

    const searchInput = document.getElementById("sos-search-input");
    if (searchInput) searchInput.value = "";
    const clearBtn = document.getElementById("btn-sos-search-clear");
    if (clearBtn) clearBtn.style.display = "none";

    document.querySelectorAll(".sos-filter-chip").forEach(c => {
      c.classList.toggle("active", c.dataset.statusFilter === "all");
    });
    document.querySelectorAll(".sos-date-chip").forEach(c => {
      c.classList.toggle("active", c.dataset.dateFilter === "all");
    });

    const customBox = document.getElementById("sos-custom-date-box");
    if (customBox) customBox.style.display = "none";

    const labelEl = document.getElementById("sos-sort-label");
    if (labelEl) labelEl.textContent = "Newest First";

    this.loadData();
  },

  /* ---- UI Helpers ---- */
  showSkeleton(show) {
    const skeleton = document.getElementById("sos-history-loading");
    const list = document.getElementById("sos-history-list");
    if (skeleton) skeleton.style.display = show ? "flex" : "none";
    if (list && show) list.style.display = "none";
    if (list && !show) list.style.display = "flex";
  },

  showError(show) {
    const err = document.getElementById("sos-history-error");
    const list = document.getElementById("sos-history-list");
    if (err) err.style.display = show ? "flex" : "none";
    if (list && show) list.style.display = "none";
  },

  getEmergencyIcon(type) {
    const t = (type || "").toLowerCase();
    if (t.includes("fire") || t.includes("smoke")) {
      return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;
    }
    if (t.includes("medical")) {
      return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
    }
    if (t.includes("lift")) {
      return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="8 10 12 6 16 10"/><polyline points="8 14 12 18 16 14"/></svg>`;
    }
    if (t.includes("water") || t.includes("pipe")) {
      return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`;
    }
    // Default security shield
    return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
  },

  formatTime(isoStr) {
    if (!isoStr) return "Just now";
    return GrihamDateTime.formatTime(isoStr) || "Just now";
  },

  formatDateAndTime(isoStr) {
    if (!isoStr) return "-";
    return GrihamDateTime.formatDateTime(isoStr, ", ") || isoStr;
  },

  escapeHtml(str) {
    return window.escapeHtml(str);
  },

  showToast(msg, type = "info") {
    if (typeof GrihamToast !== "undefined") {
      GrihamToast.show(msg, type);
    }
  }
};
