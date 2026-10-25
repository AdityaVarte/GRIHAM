/**
 * GRIHAM FRONTEND - GATEKEEPER VISITOR MANAGEMENT CONTROLLER & VIEW
 * Screen: Gatekeeper Visitor Management (#/gatekeeper/visitors)
 * Mobile-first Security Console & Visitor Check-in / Check-out
 */

window.HTML_GATEKEEPER_VISITORS = `
<!-- ================================================================= -->
<!-- 1. VISITOR DETAIL BOTTOM SHEET                                    -->
<!-- ================================================================= -->
<div class="sheet-backdrop" id="backdrop-visitor-detail" onclick="GrihamGatekeeperVisitorsUI.closeDetail()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="sheet-visitor-detail" role="dialog" aria-modal="true" aria-labelledby="detail-visitor-name" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <div class="sheet-header-info">
      <span class="sheet-kicker" id="detail-visitor-id">VIS-2026-0001</span>
      <h2 class="sheet-title" id="detail-visitor-name">Visitor Details</h2>
    </div>
    <button type="button" class="btn-sheet-back" onclick="GrihamGatekeeperVisitorsUI.closeDetail()" aria-label="Close Details">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>

  <div class="visitor-detail-body">
    <!-- Status & Type Banner -->
    <div class="visitor-detail-banner">
      <div id="detail-status-badge-wrap"></div>
      <span class="visitor-type-tag" id="detail-visitor-type">Expected Visitor</span>
    </div>

    <!-- Key Information Grid -->
    <div class="visitor-info-grid">
      <div class="visitor-info-item">
        <span class="info-label" data-i18n="label_visitor_phone">Phone Number</span>
        <a href="#" class="info-val phone-link" id="detail-visitor-phone">+919876543210</a>
      </div>

      <div class="visitor-info-item">
        <span class="info-label" data-i18n="label_flat_wing">Wing &amp; Flat</span>
        <span class="info-val" id="detail-flat-info">Wing A - Flat 102</span>
      </div>

      <div class="visitor-info-item">
        <span class="info-label" data-i18n="label_visiting_resident">Visiting Resident</span>
        <span class="info-val" id="detail-resident-name">Amit Sharma</span>
      </div>

      <div class="visitor-info-item">
        <span class="info-label" data-i18n="label_purpose">Purpose of Visit</span>
        <span class="info-val" id="detail-purpose">Personal Visit</span>
      </div>

      <div class="visitor-info-item">
        <span class="info-label" data-i18n="label_expected_time">Expected Time</span>
        <span class="info-val" id="detail-expected-time">10:30 AM</span>
      </div>

      <div class="visitor-info-item">
        <span class="info-label" data-i18n="label_checkin_time">Check-in Time</span>
        <span class="info-val" id="detail-checkin-time">—</span>
      </div>

      <div class="visitor-info-item" id="detail-checkout-item">
        <span class="info-label" data-i18n="label_checkout_time">Check-out Time</span>
        <span class="info-val" id="detail-checkout-time">—</span>
      </div>
    </div>

    <!-- Notes Box -->
    <div class="visitor-notes-box" id="detail-notes-box">
      <span class="info-label" data-i18n="label_notes">Notes</span>
      <p class="visitor-notes-text" id="detail-notes-text">No notes recorded.</p>
    </div>

    <!-- Bottom Sheet Action CTA -->
    <div class="visitor-detail-actions" id="detail-actions-wrap">
      <button type="button" class="btn-visitor-action checkin" id="btn-detail-checkin" onclick="GrihamGatekeeperVisitorsUI.handleDetailAction('checkin')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <polyline points="17 11 19 13 23 9"></polyline>
        </svg>
        <span data-i18n="btn_check_in">Check In Visitor</span>
      </button>

      <button type="button" class="btn-visitor-action checkout" id="btn-detail-checkout" onclick="GrihamGatekeeperVisitorsUI.handleDetailAction('checkout')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span data-i18n="btn_check_out">Check Out Visitor</span>
      </button>
    </div>
  </div>
</div>

<!-- ================================================================= -->
<!-- 2. REGISTER WALK-IN VISITOR BOTTOM SHEET                         -->
<!-- ================================================================= -->
<div class="sheet-backdrop" id="backdrop-walkin-visitor" onclick="GrihamGatekeeperVisitorsUI.closeWalkInModal()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="sheet-walkin-visitor" role="dialog" aria-modal="true" aria-labelledby="walkin-sheet-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <div class="sheet-header-info">
      <span class="sheet-kicker">Security Inward</span>
      <h2 class="sheet-title" id="walkin-sheet-title" data-i18n="title_walkin_registration">Register Walk-in Visitor</h2>
    </div>
    <button type="button" class="btn-sheet-back" onclick="GrihamGatekeeperVisitorsUI.closeWalkInModal()" aria-label="Close Registration">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>

  <div class="visitor-walkin-body">
    <!-- Validation Error Banner -->
    <div id="walkin-error-banner" class="auth-status-banner" role="alert" aria-live="assertive" style="display:none; margin-bottom: 0.85rem;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span id="walkin-error-text">Please correct the highlighted fields.</span>
    </div>

    <form id="form-walkin-visitor" onsubmit="GrihamGatekeeperVisitorsUI.handleWalkInSubmit(event)" novalidate>
      <!-- Visitor Name -->
      <div class="form-group">
        <label class="form-label" for="walkin-input-name" data-i18n="label_visitor_name">Visitor Name *</label>
        <div class="input-wrapper" id="wrap-walkin-name">
          <input type="text" id="walkin-input-name" class="form-input" placeholder="e.g. Ramesh Kulkarni" required autocomplete="name">
        </div>
        <span class="field-error-msg" id="err-walkin-name" style="display:none;"></span>
      </div>

      <!-- Visitor Phone -->
      <div class="form-group">
        <label class="form-label" for="walkin-input-phone" data-i18n="label_visitor_phone">Phone Number *</label>
        <div class="input-wrapper" id="wrap-walkin-phone">
          <input type="tel" id="walkin-input-phone" class="form-input" placeholder="e.g. 9876543210" required autocomplete="tel">
        </div>
        <span class="field-error-msg" id="err-walkin-phone" style="display:none;"></span>
      </div>

      <!-- Wing & Flat Row -->
      <div class="form-row-two-col">
        <div class="form-group">
          <label class="form-label" for="walkin-select-wing">Wing *</label>
          <div class="input-wrapper">
            <select id="walkin-select-wing" class="form-input form-select" onchange="GrihamGatekeeperVisitorsUI.handleWingChange()">
              <option value="A">Wing A</option>
              <option value="B">Wing B</option>
              <option value="C">Wing C</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="walkin-input-flat">Flat Number *</label>
          <div class="input-wrapper" id="wrap-walkin-flat">
            <input type="text" id="walkin-input-flat" class="form-input" placeholder="e.g. 102" required>
          </div>
          <span class="field-error-msg" id="err-walkin-flat" style="display:none;"></span>
        </div>
      </div>

      <!-- Resident Name (Auto-fill or manual) -->
      <div class="form-group">
        <label class="form-label" for="walkin-input-resident" data-i18n="label_visiting_resident">Visiting Resident</label>
        <div class="input-wrapper">
          <input type="text" id="walkin-input-resident" class="form-input" placeholder="Resident Name (optional)">
        </div>
      </div>

      <!-- Purpose of Visit -->
      <div class="form-group">
        <label class="form-label" for="walkin-select-purpose" data-i18n="label_purpose">Purpose of Visit *</label>
        <div class="input-wrapper">
          <select id="walkin-select-purpose" class="form-input form-select">
            <option value="Personal Visit">Personal Visit / Guest</option>
            <option value="Service / Repair">Service / Repair Technician</option>
            <option value="Delivery / Courier">Delivery / Courier Handover</option>
            <option value="Business / Meeting">Business / Official Meeting</option>
            <option value="Other">Other Purpose</option>
          </select>
        </div>
      </div>

      <!-- Notes / Details -->
      <div class="form-group">
        <label class="form-label" for="walkin-input-notes" data-i18n="label_notes">Notes / Observations</label>
        <div class="input-wrapper">
          <input type="text" id="walkin-input-notes" class="form-input" placeholder="e.g. Carrying toolkit, Visitor ID shown">
        </div>
      </div>

      <div class="walkin-submit-row">
        <button type="button" class="btn-walkin-cancel" onclick="GrihamGatekeeperVisitorsUI.closeWalkInModal()" data-i18n="btn_cancel">
          Cancel
        </button>
        <button type="submit" class="btn-walkin-submit" id="btn-submit-walkin">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span id="btn-walkin-text">Check In Directly</span>
        </button>
      </div>
    </form>
  </div>
</div>

<!-- ================================================================= -->
<!-- 3. MAIN VISITOR MANAGEMENT VIEW                                   -->
<!-- ================================================================= -->
<section id="screen-gatekeeper-visitors" class="app-view gatekeeper-terminal-view" aria-labelledby="gk-visitors-header-title">

  <!-- Top Navigation Bar -->
  <div class="screen-top-bar gk-visitors-top-bar" style="margin-bottom:0.25rem;">
    <button class="btn-top-back" id="btn-gk-visitors-back" onclick="GrihamRouter.navigate('/gatekeeper/home')" aria-label="Back to Security Terminal">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      <span data-i18n="nav_back">Terminal</span>
    </button>

    <h1 class="top-bar-title" id="gk-visitors-header-title" data-i18n="title_visitor_management">Visitor Management</h1>

    <div class="gk-topbar-actions">
      <!-- Accessibility Trigger -->
      <button type="button" class="gk-topbar-btn" id="btn-gk-visitors-a11y" onclick="GrihamA11y.toggleSheet(true)" aria-label="Accessibility Settings">
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

  <!-- Primary Security Action: Register Walk-in -->
  <div class="gk-quick-action-strip">
    <button type="button" class="btn-action-walkin" id="btn-open-walkin" onclick="GrihamGatekeeperVisitorsUI.openWalkInModal()" aria-label="Register Walk-in Visitor">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      <span data-i18n="btn_register_walkin">Register Walk-in Visitor</span>
    </button>
  </div>

  <!-- Today's Visitor Summary Counter Strip -->
  <div class="gk-visitor-summary-strip">
    <button type="button" class="gk-vsum-card" onclick="GrihamGatekeeperVisitorsUI.setFilter('Expected')" aria-label="Filter Expected Visitors">
      <span class="gk-vsum-val amber" id="sum-val-expected">0</span>
      <span class="gk-vsum-lbl" data-i18n="status_expected">Expected</span>
    </button>

    <button type="button" class="gk-vsum-card" onclick="GrihamGatekeeperVisitorsUI.setFilter('Checked In')" aria-label="Filter Checked In Visitors">
      <span class="gk-vsum-val emerald" id="sum-val-checkedin">0</span>
      <span class="gk-vsum-lbl" data-i18n="status_checked_in">Checked In</span>
    </button>

    <button type="button" class="gk-vsum-card" onclick="GrihamGatekeeperVisitorsUI.setFilter('Checked Out')" aria-label="Filter Checked Out Visitors">
      <span class="gk-vsum-val blue" id="sum-val-checkedout">0</span>
      <span class="gk-vsum-lbl" data-i18n="status_checked_out">Checked Out</span>
    </button>
  </div>

  <!-- Search & Filter Controls -->
  <div class="gk-visitor-controls">
    <!-- Search Bar -->
    <div class="search-input-wrapper">
      <svg class="search-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input 
        type="search" 
        id="input-visitor-search" 
        class="search-field" 
        placeholder="Search by name, phone, flat..." 
        aria-label="Search visitors by name, phone number, or flat"
        oninput="GrihamGatekeeperVisitorsUI.handleSearch(event)"
      >
      <button type="button" class="search-clear-btn" id="btn-clear-search" onclick="GrihamGatekeeperVisitorsUI.clearSearch()" aria-label="Clear Search" style="display:none;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Status Filter Pills -->
    <div class="gk-filter-pills-row" role="tablist" aria-label="Filter visitors by status">
      <button type="button" class="gk-filter-pill active" id="pill-filter-all" onclick="GrihamGatekeeperVisitorsUI.setFilter('All')" role="tab" aria-selected="true" data-i18n="filter_all">All</button>
      <button type="button" class="gk-filter-pill" id="pill-filter-expected" onclick="GrihamGatekeeperVisitorsUI.setFilter('Expected')" role="tab" aria-selected="false" data-i18n="status_expected">Expected</button>
      <button type="button" class="gk-filter-pill" id="pill-filter-checked-in" onclick="GrihamGatekeeperVisitorsUI.setFilter('Checked In')" role="tab" aria-selected="false" data-i18n="status_checked_in">Checked In</button>
      <button type="button" class="gk-filter-pill" id="pill-filter-checked-out" onclick="GrihamGatekeeperVisitorsUI.setFilter('Checked Out')" role="tab" aria-selected="false" data-i18n="status_checked_out">Checked Out</button>
    </div>
  </div>

  <!-- Loading State Indicator -->
  <div id="visitor-loader" style="display:none; padding:2rem 0; text-align:center;">
    <div class="griham-spinner" style="margin:0 auto 0.5rem; width:28px; height:28px; border-width:3px;"></div>
    <span style="font-size:0.85rem; color:var(--text-secondary);">Loading visitor logs...</span>
  </div>

  <!-- Visitor List Container -->
  <div id="visitor-list-container" class="gk-visitor-list" role="region" aria-label="Visitor Records List">
    <!-- Dynamically Populated by GrihamGatekeeperVisitorsUI -->
  </div>

  <!-- Empty State Container -->
  <div id="visitor-empty-container" style="display:none;"></div>

</section>
`;

/**
 * Canonical Gatekeeper Visitor Management Controller
 */
const GrihamGatekeeperVisitorsUI = {
  currentFilter: "All",
  searchQuery: "",
  selectedVisitorId: null,
  isLoading: false,
  searchTimer: null,
  cachedVisitors: [],

  /**
   * Router lifecycle initialization
   */
  async init() {
    // Check if query params were passed via URL
    const hash = window.location.hash || "";
    if (hash.includes("filter=")) {
      const match = hash.match(/filter=([^&]+)/);
      if (match && match[1]) {
        this.currentFilter = decodeURIComponent(match[1]);
      }
    } else {
      this.currentFilter = "All";
    }

    this.searchQuery = "";
    const searchInput = document.getElementById("input-visitor-search");
    if (searchInput) searchInput.value = "";

    this.updateFilterUI();
    await this.loadSummary();
    await this.loadVisitors();
    this.applyTranslations();

    // Auto-open walk-in if deep linked
    if (hash.includes("action=entry") || hash.includes("action=walkin")) {
      setTimeout(() => this.openWalkInModal(), 150);
    }
  },

  /**
   * Lifecycle cleanup when leaving route
   */
  destroy() {
    this.closeDetail();
    this.closeWalkInModal();
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
      this.searchTimer = null;
    }
  },

  /**
   * Fetch and render today's visitor summary counts
   */
  async loadSummary() {
    try {
      const summaryFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.getVisitorSummary === "function")
        ? GrihamAPI.getVisitorSummary
        : window.getGatekeeperVisitorSummary;

      if (!summaryFn) return;

      const res = await summaryFn();
      if (res && res.summary) {
        const s = res.summary;
        const expEl = document.getElementById("sum-val-expected");
        const inEl = document.getElementById("sum-val-checkedin");
        const outEl = document.getElementById("sum-val-checkedout");

        if (expEl) expEl.textContent = s.expected || 0;
        if (inEl) inEl.textContent = s.checkedIn || 0;
        if (outEl) outEl.textContent = s.checkedOut || 0;
      }
    } catch (err) {
      console.warn("[VisitorUI] Failed to load summary counts:", err);
    }
  },

  /**
   * Fetch visitor records from canonical API
   */
  async loadVisitors() {
    this.isLoading = true;
    const loader = document.getElementById("visitor-loader");
    const container = document.getElementById("visitor-list-container");
    const emptyContainer = document.getElementById("visitor-empty-container");

    if (loader) loader.style.display = "block";
    if (container) container.style.display = "none";
    if (emptyContainer) emptyContainer.style.display = "none";

    try {
      const getFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.getVisitors === "function")
        ? GrihamAPI.getVisitors
        : window.getGatekeeperVisitors;

      if (!getFn) {
        throw new Error("Visitor API service unavailable.");
      }

      const params = {};
      if (this.currentFilter && this.currentFilter !== "All") {
        params.status = this.currentFilter;
      }
      if (this.searchQuery) {
        params.search = this.searchQuery;
      }

      const res = await getFn(params);
      const visitors = (res && res.visitors) || [];
      this.cachedVisitors = visitors;

      if (loader) loader.style.display = "none";

      if (visitors.length === 0) {
        if (container) container.style.display = "none";
        this.renderEmptyState();
      } else {
        if (emptyContainer) emptyContainer.style.display = "none";
        if (container) {
          container.style.display = "flex";
          this.renderList(visitors);
        }
      }
    } catch (err) {
      console.error("[VisitorUI] Failed to load visitors:", err);
      if (loader) loader.style.display = "none";
      if (container) {
        container.style.display = "none";
      }
      this.renderEmptyState(err.message || "Failed to load visitors.");
    } finally {
      this.isLoading = false;
    }
  },

  /**
   * Render visitor card list
   */
  renderList(visitors) {
    const container = document.getElementById("visitor-list-container");
    if (!container) return;

    const cardsHtml = visitors.map(v => {
      const initials = (v.visitorName || "V")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map(n => n[0])
        .join("")
        .toUpperCase();

      const badgeHtml = (typeof GrihamStatusBadge !== "undefined" && typeof GrihamStatusBadge.render === "function")
        ? GrihamStatusBadge.render({ status: v.status, variant: "pill" })
        : `<span class="status-pill">${v.status}</span>`;

      // Quick CTA Button depending on status
      let actionBtnHtml = "";
      if (v.status === "Expected") {
        actionBtnHtml = `
          <button type="button" class="btn-card-action in" onclick="GrihamGatekeeperVisitorsUI.handleCheckIn(event, '${v.id}')" aria-label="Check in ${v.visitorName}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span data-i18n="btn_check_in">Check In</span>
          </button>
        `;
      } else if (v.status === "Checked In") {
        actionBtnHtml = `
          <button type="button" class="btn-card-action out" onclick="GrihamGatekeeperVisitorsUI.handleCheckOut(event, '${v.id}')" aria-label="Check out ${v.visitorName}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span data-i18n="btn_check_out">Check Out</span>
          </button>
        `;
      }

      // Timing string
      let timeSnippet = "";
      if (v.status === "Checked In" && v.checkInAt) {
        const d = new Date(v.checkInAt);
        const tStr = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
        timeSnippet = `<span class="vcard-time-tag in">In: ${tStr}</span>`;
      } else if (v.status === "Checked Out" && v.checkOutAt) {
        const d = new Date(v.checkOutAt);
        const tStr = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
        timeSnippet = `<span class="vcard-time-tag out">Out: ${tStr}</span>`;
      } else if (v.expectedTime) {
        timeSnippet = `<span class="vcard-time-tag exp">Exp: ${v.expectedTime}</span>`;
      }

      return `
        <article class="gk-visitor-card" onclick="GrihamGatekeeperVisitorsUI.openDetail('${v.id}')" role="button" tabindex="0" aria-label="${v.visitorName}, visiting Flat ${v.wing}-${v.flatNumber}, status ${v.status}">
          <div class="vcard-header">
            <div class="vcard-user-info">
              <div class="vcard-avatar" aria-hidden="true">${initials}</div>
              <div class="vcard-title-group">
                <div class="vcard-name-row">
                  <h3 class="vcard-name">${v.visitorName}</h3>
                  ${timeSnippet}
                </div>
                <span class="vcard-phone">${v.visitorPhone}</span>
              </div>
            </div>
            <div class="vcard-status-wrap">
              ${badgeHtml}
            </div>
          </div>

          <div class="vcard-divider" aria-hidden="true"></div>

          <div class="vcard-footer">
            <div class="vcard-dest">
              <div class="vcard-flat-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span>${v.wing ? v.wing + '-' : ''}${v.flatNumber}</span>
              </div>
              <span class="vcard-resident">${v.residentName || 'Resident'}</span>
            </div>

            <div class="vcard-action-box">
              ${actionBtnHtml}
            </div>
          </div>
        </article>
      `;
    }).join("\n");

    container.innerHTML = cardsHtml;
    this.applyTranslations();
  },

  /**
   * Render canonical empty state
   */
  renderEmptyState(customMsg) {
    const emptyContainer = document.getElementById("visitor-empty-container");
    if (!emptyContainer) return;

    const lang = (typeof GrihamState !== "undefined" && GrihamState.language) || "en";
    const dict = (typeof I18N_DICTIONARY !== "undefined" && I18N_DICTIONARY[lang]) || {};

    const title = dict.empty_visitors_title || "No Visitors Found";
    const desc = customMsg || (dict.empty_visitors_desc || "No visitor records match the current filter or search criteria.");

    if (typeof GrihamEmptyState !== "undefined" && typeof GrihamEmptyState.render === "function") {
      emptyContainer.innerHTML = GrihamEmptyState.render({
        id: "empty-visitors-card",
        title,
        description: desc,
        isVisible: true,
        customClass: "gk-activity-card",
        icon: `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--gatekeeper-accent);">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        `
      });
    } else {
      emptyContainer.innerHTML = `
        <div class="gk-activity-card">
          <h3>${title}</h3>
          <p>${desc}</p>
        </div>
      `;
    }
    emptyContainer.style.display = "block";
  },

  /**
   * Open visitor detail sheet
   */
  async openDetail(id) {
    this.selectedVisitorId = id;
    let visitor = this.cachedVisitors.find(v => v.id === id);

    if (!visitor) {
      try {
        const getByIdFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.getVisitorById === "function")
          ? GrihamAPI.getVisitorById
          : window.getGatekeeperVisitorById;
        const res = await getByIdFn(id);
        visitor = res && res.visitor;
      } catch (e) {
        console.warn("[VisitorUI] Could not fetch detail by id:", e);
      }
    }

    if (!visitor) {
      if (typeof GrihamToast !== "undefined") GrihamToast.show("Visitor record not found", "error");
      return;
    }

    // Populate detail elements
    const idEl = document.getElementById("detail-visitor-id");
    const nameEl = document.getElementById("detail-visitor-name");
    const typeEl = document.getElementById("detail-visitor-type");
    const badgeWrap = document.getElementById("detail-status-badge-wrap");
    const phoneEl = document.getElementById("detail-visitor-phone");
    const flatEl = document.getElementById("detail-flat-info");
    const resEl = document.getElementById("detail-resident-name");
    const purposeEl = document.getElementById("detail-purpose");
    const expTimeEl = document.getElementById("detail-expected-time");
    const inTimeEl = document.getElementById("detail-checkin-time");
    const outTimeEl = document.getElementById("detail-checkout-time");
    const notesText = document.getElementById("detail-notes-text");
    const btnIn = document.getElementById("btn-detail-checkin");
    const btnOut = document.getElementById("btn-detail-checkout");

    if (idEl) idEl.textContent = visitor.id;
    if (nameEl) nameEl.textContent = visitor.visitorName;
    if (typeEl) typeEl.textContent = visitor.visitorType ? `${visitor.visitorType} Visitor` : "Visitor";

    if (badgeWrap) {
      badgeWrap.innerHTML = (typeof GrihamStatusBadge !== "undefined" && typeof GrihamStatusBadge.render === "function")
        ? GrihamStatusBadge.render({ status: visitor.status, variant: "pill" })
        : `<span class="status-pill">${visitor.status}</span>`;
    }

    if (phoneEl) {
      phoneEl.textContent = visitor.visitorPhone || "—";
      phoneEl.href = `tel:${visitor.visitorPhone || ""}`;
    }

    if (flatEl) flatEl.textContent = `Wing ${visitor.wing || 'A'} - Flat ${visitor.flatNumber || '—'}`;
    if (resEl) resEl.textContent = visitor.residentName || "Resident";
    if (purposeEl) purposeEl.textContent = visitor.purpose || "General Visit";
    if (expTimeEl) expTimeEl.textContent = visitor.expectedTime || "—";

    if (inTimeEl) {
      if (visitor.checkInAt) {
        const d = new Date(visitor.checkInAt);
        inTimeEl.textContent = `${d.toLocaleDateString()} at ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      } else {
        inTimeEl.textContent = "Not Checked In";
      }
    }

    if (outTimeEl) {
      if (visitor.checkOutAt) {
        const d = new Date(visitor.checkOutAt);
        outTimeEl.textContent = `${d.toLocaleDateString()} at ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      } else {
        outTimeEl.textContent = "—";
      }
    }

    if (notesText) notesText.textContent = visitor.notes || "No notes recorded.";

    // Action buttons in detail sheet
    if (btnIn) btnIn.style.display = visitor.status === "Expected" ? "flex" : "none";
    if (btnOut) btnOut.style.display = visitor.status === "Checked In" ? "flex" : "none";

    // Open bottom sheet
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-visitor-detail", "backdrop-visitor-detail");
    } else {
      const sheet = document.getElementById("sheet-visitor-detail");
      const backdrop = document.getElementById("backdrop-visitor-detail");
      if (sheet) sheet.classList.add("open");
      if (backdrop) backdrop.classList.add("open");
    }
  },

  /**
   * Close visitor detail sheet
   */
  closeDetail() {
    this.selectedVisitorId = null;
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-visitor-detail", "backdrop-visitor-detail");
    } else {
      const sheet = document.getElementById("sheet-visitor-detail");
      const backdrop = document.getElementById("backdrop-visitor-detail");
      if (sheet) sheet.classList.remove("open");
      if (backdrop) backdrop.classList.remove("open");
    }
  },

  /**
   * Handle detail action CTA button
   */
  handleDetailAction(action) {
    if (!this.selectedVisitorId) return;
    const id = this.selectedVisitorId;
    if (action === "checkin") {
      this.handleCheckIn(null, id);
    } else if (action === "checkout") {
      this.handleCheckOut(null, id);
    }
  },

  /**
   * Execute visitor check-in with confirmation dialog
   */
  handleCheckIn(event, id) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const visitor = this.cachedVisitors.find(v => v.id === id);
    const vName = visitor ? visitor.visitorName : "Visitor";

    const lang = (typeof GrihamState !== "undefined" && GrihamState.language) || "en";
    const dict = (typeof I18N_DICTIONARY !== "undefined" && I18N_DICTIONARY[lang]) || {};
    const title = dict.confirm_checkin_title || "Confirm Check-In";
    const message = `${dict.confirm_checkin_msg || "Are you sure you want to check in this visitor?"} (${vName})`;

    if (typeof GrihamConfirmation !== "undefined") {
      GrihamConfirmation.open({
        title,
        message,
        confirmText: dict.btn_check_in || "Check In",
        cancelText: dict.btn_cancel || "Cancel",
        isDanger: false,
        onConfirm: async () => {
          await this._executeCheckIn(id);
        }
      });
    } else {
      if (confirm(message)) {
        this._executeCheckIn(id);
      }
    }
  },

  async _executeCheckIn(id) {
    try {
      const checkInFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.checkInVisitor === "function")
        ? GrihamAPI.checkInVisitor
        : window.checkInGatekeeperVisitor;

      const res = await checkInFn(id);
      const lang = (typeof GrihamState !== "undefined" && GrihamState.language) || "en";
      const dict = (typeof I18N_DICTIONARY !== "undefined" && I18N_DICTIONARY[lang]) || {};
      const successMsg = dict.toast_checkin_success || "Visitor checked in successfully.";

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(successMsg, "success");
      }

      this.closeDetail();
      await this.loadSummary();
      await this.loadVisitors();
    } catch (err) {
      console.error("[VisitorUI] Check-in error:", err);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(err.message || "Failed to check in visitor.", "error");
      }
    }
  },

  /**
   * Execute visitor check-out with confirmation dialog
   */
  handleCheckOut(event, id) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const visitor = this.cachedVisitors.find(v => v.id === id);
    const vName = visitor ? visitor.visitorName : "Visitor";

    const lang = (typeof GrihamState !== "undefined" && GrihamState.language) || "en";
    const dict = (typeof I18N_DICTIONARY !== "undefined" && I18N_DICTIONARY[lang]) || {};
    const title = dict.confirm_checkout_title || "Confirm Check-Out";
    const message = `${dict.confirm_checkout_msg || "Are you sure you want to check out this visitor?"} (${vName})`;

    if (typeof GrihamConfirmation !== "undefined") {
      GrihamConfirmation.open({
        title,
        message,
        confirmText: dict.btn_check_out || "Check Out",
        cancelText: dict.btn_cancel || "Cancel",
        isDanger: true,
        onConfirm: async () => {
          await this._executeCheckOut(id);
        }
      });
    } else {
      if (confirm(message)) {
        this._executeCheckOut(id);
      }
    }
  },

  async _executeCheckOut(id) {
    try {
      const checkOutFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.checkOutVisitor === "function")
        ? GrihamAPI.checkOutVisitor
        : window.checkOutGatekeeperVisitor;

      const res = await checkOutFn(id);
      const lang = (typeof GrihamState !== "undefined" && GrihamState.language) || "en";
      const dict = (typeof I18N_DICTIONARY !== "undefined" && I18N_DICTIONARY[lang]) || {};
      const successMsg = dict.toast_checkout_success || "Visitor checked out successfully.";

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(successMsg, "success");
      }

      this.closeDetail();
      await this.loadSummary();
      await this.loadVisitors();
    } catch (err) {
      console.error("[VisitorUI] Check-out error:", err);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(err.message || "Failed to check out visitor.", "error");
      }
    }
  },

  /**
   * Open Walk-in Visitor Registration Sheet
   */
  openWalkInModal() {
    const errBanner = document.getElementById("walkin-error-banner");
    if (errBanner) errBanner.style.display = "none";

    const nameInput = document.getElementById("walkin-input-name");
    const phoneInput = document.getElementById("walkin-input-phone");
    const flatInput = document.getElementById("walkin-input-flat");
    const resInput = document.getElementById("walkin-input-resident");
    const notesInput = document.getElementById("walkin-input-notes");

    if (nameInput) nameInput.value = "";
    if (phoneInput) phoneInput.value = "";
    if (flatInput) flatInput.value = "";
    if (resInput) resInput.value = "";
    if (notesInput) notesInput.value = "";

    this.clearFieldErrors();

    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-walkin-visitor", "backdrop-walkin-visitor");
    } else {
      const sheet = document.getElementById("sheet-walkin-visitor");
      const backdrop = document.getElementById("backdrop-walkin-visitor");
      if (sheet) sheet.classList.add("open");
      if (backdrop) backdrop.classList.add("open");
    }
  },

  /**
   * Close Walk-in Visitor Sheet
   */
  closeWalkInModal() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-walkin-visitor", "backdrop-walkin-visitor");
    } else {
      const sheet = document.getElementById("sheet-walkin-visitor");
      const backdrop = document.getElementById("backdrop-walkin-visitor");
      if (sheet) sheet.classList.remove("open");
      if (backdrop) backdrop.classList.remove("open");
    }
  },

  handleWingChange() {
    // Optionally autofill resident name if flat is already typed
    this.lookupResident();
  },

  lookupResident() {
    const wing = document.getElementById("walkin-select-wing")?.value || "A";
    const flat = document.getElementById("walkin-input-flat")?.value.trim() || "";
    const resInput = document.getElementById("walkin-input-resident");

    if (wing && flat && resInput && !resInput.value) {
      if (wing === "A" && flat === "102") resInput.value = "Amit Sharma";
      else if (wing === "A" && flat === "204") resInput.value = "Rajesh Kumar";
      else if (wing === "B" && flat === "302") resInput.value = "Priya Nair";
      else if (wing === "A" && flat === "401") resInput.value = "Sunita Krishnan";
      else if (wing === "B" && flat === "504") resInput.value = "Vikram Malhotra";
    }
  },

  clearFieldErrors() {
    ["name", "phone", "flat"].forEach(f => {
      const wrap = document.getElementById(`wrap-walkin-${f}`);
      const err = document.getElementById(`err-walkin-${f}`);
      if (wrap) wrap.classList.remove("error");
      if (err) {
        err.style.display = "none";
        err.textContent = "";
      }
    });
  },

  setFieldError(field, msg) {
    const wrap = document.getElementById(`wrap-walkin-${field}`);
    const err = document.getElementById(`err-walkin-${field}`);
    if (wrap) wrap.classList.add("error");
    if (err) {
      err.style.display = "block";
      err.textContent = msg;
    }
  },

  /**
   * Handle Walk-in Registration Submission
   */
  async handleWalkInSubmit(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.clearFieldErrors();
    const errBanner = document.getElementById("walkin-error-banner");
    const errText = document.getElementById("walkin-error-text");
    if (errBanner) errBanner.style.display = "none";

    const name = document.getElementById("walkin-input-name")?.value.trim() || "";
    const phone = document.getElementById("walkin-input-phone")?.value.trim() || "";
    const wing = document.getElementById("walkin-select-wing")?.value || "A";
    const flat = document.getElementById("walkin-input-flat")?.value.trim() || "";
    const resident = document.getElementById("walkin-input-resident")?.value.trim() || "";
    const purpose = document.getElementById("walkin-select-purpose")?.value || "Personal Visit";
    const notes = document.getElementById("walkin-input-notes")?.value.trim() || "";

    let hasErrors = false;

    // 1. Name validation
    if (!name) {
      this.setFieldError("name", "Visitor name is required.");
      hasErrors = true;
    }

    // 2. Phone validation
    if (!phone) {
      this.setFieldError("phone", "Phone number is required.");
      hasErrors = true;
    } else if (typeof GrihamValidation !== "undefined" && !GrihamValidation.isValidPhone(phone)) {
      this.setFieldError("phone", "Please enter a valid 10-to-14 digit phone number.");
      hasErrors = true;
    }

    // 3. Flat validation
    if (!flat) {
      this.setFieldError("flat", "Flat number is required.");
      hasErrors = true;
    }

    if (hasErrors) {
      if (errBanner) {
        errText.textContent = "Please fill in all required fields accurately.";
        errBanner.style.display = "flex";
      }
      return;
    }

    const btn = document.getElementById("btn-submit-walkin");
    const btnText = document.getElementById("btn-walkin-text");
    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Checking In...";

    try {
      const createFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.createVisitor === "function")
        ? GrihamAPI.createVisitor
        : window.createGatekeeperVisitor;

      const payload = {
        visitorName: name,
        visitorPhone: phone,
        wing,
        flatNumber: flat,
        residentName: resident || `Resident (${wing}-${flat})`,
        purpose,
        notes,
        visitorType: "Walk-in"
      };

      const res = await createFn(payload);
      const lang = (typeof GrihamState !== "undefined" && GrihamState.language) || "en";
      const dict = (typeof I18N_DICTIONARY !== "undefined" && I18N_DICTIONARY[lang]) || {};
      const successMsg = dict.toast_walkin_success || "Walk-in visitor registered and checked in.";

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(successMsg, "success");
      }

      this.closeWalkInModal();
      await this.loadSummary();
      await this.loadVisitors();
    } catch (err) {
      console.error("[VisitorUI] Walk-in creation error:", err);
      if (errBanner) {
        errText.textContent = err.message || "Failed to create visitor record.";
        errBanner.style.display = "flex";
      }
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Check In Directly";
    }
  },

  /**
   * Set Status Filter
   */
  setFilter(status) {
    this.currentFilter = status;
    this.updateFilterUI();
    this.loadVisitors();
  },

  updateFilterUI() {
    const pills = [
      { id: "pill-filter-all", status: "All" },
      { id: "pill-filter-expected", status: "Expected" },
      { id: "pill-filter-checked-in", status: "Checked In" },
      { id: "pill-filter-checked-out", status: "Checked Out" }
    ];

    pills.forEach(p => {
      const el = document.getElementById(p.id);
      if (el) {
        const isActive = this.currentFilter.toLowerCase() === p.status.toLowerCase();
        el.classList.toggle("active", isActive);
        el.setAttribute("aria-selected", isActive ? "true" : "false");
      }
    });
  },

  /**
   * Search handler with debounce
   */
  handleSearch(event) {
    const query = (event?.target?.value || "").trim();
    this.searchQuery = query;

    const clearBtn = document.getElementById("btn-clear-search");
    if (clearBtn) {
      clearBtn.style.display = query ? "block" : "none";
    }

    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }

    this.searchTimer = setTimeout(() => {
      this.loadVisitors();
    }, 280);
  },

  clearSearch() {
    this.searchQuery = "";
    const searchInput = document.getElementById("input-visitor-search");
    const clearBtn = document.getElementById("btn-clear-search");
    if (searchInput) searchInput.value = "";
    if (clearBtn) clearBtn.style.display = "none";
    this.loadVisitors();
  },

  applyTranslations() {
    if (typeof GrihamI18n !== "undefined" && typeof GrihamI18n.translatePage === "function") {
      GrihamI18n.translatePage();
    }
  }
};

window.GrihamGatekeeperVisitorsUI = GrihamGatekeeperVisitorsUI;
