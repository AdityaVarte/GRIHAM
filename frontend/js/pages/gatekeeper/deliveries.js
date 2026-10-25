/**
 * GRIHAM FRONTEND - GATEKEEPER DELIVERY / ENTRY HANDLING CONTROLLER
 * Page: Gatekeeper Delivery Management (#/gatekeeper/deliveries)
 * Mobile-first Residential Society Security Terminal
 */

/* HTML TEMPLATE FOR DYNAMIC SCREEN INJECTION */
window.HTML_GATEKEEPER_DELIVERIES = `
<!-- ================================================================= -->
<!-- 1. DELIVERY DETAIL BOTTOM SHEET                                   -->
<!-- ================================================================= -->
<div class="sheet-backdrop" id="delivery-detail-backdrop" onclick="GrihamGatekeeperDeliveriesUI.closeDetail()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="sheet-delivery-detail" role="dialog" aria-modal="true" aria-labelledby="delivery-detail-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamGatekeeperDeliveriesUI.closeDetail()" aria-label="Close details">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <h2 class="sheet-title" id="delivery-detail-title" data-i18n="title_delivery_detail">Delivery Details</h2>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <div class="sheet-body-content" id="delivery-detail-content">
    <!-- Populated dynamically by controller -->
  </div>
</div>

<!-- ================================================================= -->
<!-- 2. INCOMING DELIVERY REGISTRATION BOTTOM SHEET                    -->
<!-- ================================================================= -->
<div class="sheet-backdrop" id="delivery-entry-backdrop" onclick="GrihamGatekeeperDeliveriesUI.closeEntryModal()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="sheet-entry-delivery" role="dialog" aria-modal="true" aria-labelledby="delivery-entry-modal-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamGatekeeperDeliveriesUI.closeEntryModal()" aria-label="Close form">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <h2 class="sheet-title" id="delivery-entry-modal-title" data-i18n="title_delivery_entry">Record Incoming Delivery</h2>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <form id="form-entry-delivery" onsubmit="GrihamGatekeeperDeliveriesUI.handleEntrySubmit(event)" novalidate>
    <div class="sheet-body-content" style="gap:0.85rem; padding-bottom:1rem;">
      <div id="delivery-error-banner" class="gk-login-error" style="display:none;" role="alert"></div>

      <!-- Delivery Type -->
      <div class="form-group">
        <label class="form-label" for="del-select-type">
          <span data-i18n="label_delivery_type">Delivery Type</span> <span style="color:#ef4444;">*</span>
        </label>
        <div class="input-wrapper">
          <select id="del-select-type" class="form-input" required>
            <option value="Courier / Parcel">Courier / Parcel</option>
            <option value="Food Delivery">Food Delivery</option>
            <option value="Grocery">Grocery</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Medicine">Medicine / Pharmacy</option>
            <option value="Other">Other Package</option>
          </select>
        </div>
      </div>

      <!-- Courier / Delivery Person Name -->
      <div class="form-group">
        <label class="form-label" for="del-input-courier">
          <span data-i18n="label_courier_name">Courier / Delivery Person</span> <span style="color:#ef4444;">*</span>
        </label>
        <div class="input-wrapper">
          <input type="text" id="del-input-courier" class="form-input" placeholder="e.g. Swiggy (Ramesh), Amazon, BlueDart" required maxlength="60" autocomplete="off">
        </div>
      </div>

      <!-- Courier Contact Number -->
      <div class="form-group">
        <label class="form-label" for="del-input-phone">
          <span data-i18n="label_courier_phone">Courier Phone</span> <span style="color:#ef4444;">*</span>
        </label>
        <div class="input-wrapper">
          <input type="tel" id="del-input-phone" class="form-input" placeholder="e.g. 9876543210" required maxlength="15" autocomplete="off">
        </div>
      </div>

      <!-- Recipient Resident & Flat -->
      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="del-select-wing">Wing <span style="color:#ef4444;">*</span></label>
          <div class="input-wrapper">
            <select id="del-select-wing" class="form-input">
              <option value="A">Wing A</option>
              <option value="B">Wing B</option>
              <option value="C">Wing C</option>
              <option value="D">Wing D</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="del-input-flat">Flat No. <span style="color:#ef4444;">*</span></label>
          <div class="input-wrapper">
            <input type="text" id="del-input-flat" class="form-input" placeholder="e.g. 102" required maxlength="10">
          </div>
        </div>
      </div>

      <!-- Recipient Resident Name -->
      <div class="form-group">
        <label class="form-label" for="del-input-recipient">
          <span data-i18n="label_recipient_name">Recipient (Resident)</span> <span style="color:#ef4444;">*</span>
        </label>
        <div class="input-wrapper">
          <input type="text" id="del-input-recipient" class="form-input" placeholder="e.g. Amit Sharma" required maxlength="60">
        </div>
      </div>

      <!-- Package Description -->
      <div class="form-group">
        <label class="form-label" for="del-input-desc">
          <span data-i18n="label_package_desc">Package Description</span>
        </label>
        <div class="input-wrapper">
          <input type="text" id="del-input-desc" class="form-input" placeholder="e.g. Cardboard box, envelope, meal bag" maxlength="100">
        </div>
      </div>

      <!-- Operational Notes -->
      <div class="form-group">
        <label class="form-label" for="del-input-notes">
          <span data-i18n="label_notes">Notes</span>
        </label>
        <div class="input-wrapper">
          <textarea id="del-input-notes" class="form-input" rows="2" placeholder="e.g. Leave with security guard if flat locked" maxlength="200" style="resize:none; min-height:56px;"></textarea>
        </div>
      </div>

      <!-- Submit CTA -->
      <div class="sheet-actions-row" style="margin-top:0.4rem;">
        <button type="button" class="btn-sheet-cancel" onclick="GrihamGatekeeperDeliveriesUI.closeEntryModal()">Cancel</button>
        <button type="submit" class="btn-sheet-primary" id="btn-submit-delivery">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span data-i18n="btn_register_delivery">Record Delivery Entry</span>
        </button>
      </div>
    </div>
  </form>
</div>

<!-- ================================================================= -->
<!-- 3. MAIN DELIVERY MANAGEMENT VIEW                                  -->
<!-- ================================================================= -->
<section id="screen-gatekeeper-deliveries" class="app-view gatekeeper-terminal-view" aria-labelledby="gk-deliveries-header-title">

  <!-- Top Navigation Bar -->
  <div class="screen-top-bar gk-deliveries-top-bar" style="margin-bottom:0.25rem;">
    <button class="btn-top-back" id="btn-gk-deliveries-back" onclick="GrihamRouter.navigate('/gatekeeper/home')" aria-label="Back to Security Terminal">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      <span data-i18n="nav_back">Terminal</span>
    </button>

    <h1 class="top-bar-title" id="gk-deliveries-header-title" data-i18n="title_delivery_management">Delivery Management</h1>

    <div class="gk-topbar-actions">
      <!-- Accessibility Trigger -->
      <button type="button" class="gk-topbar-btn" id="btn-gk-deliveries-a11y" onclick="GrihamA11y.toggleSheet(true)" aria-label="Accessibility Settings">
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

  <!-- Primary Security Action: Record Incoming Delivery -->
  <div class="gk-quick-action-strip">
    <button type="button" class="btn-action-walkin" id="btn-open-delivery-entry" onclick="GrihamGatekeeperDeliveriesUI.openEntryModal()" aria-label="Record Incoming Delivery">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
      <span data-i18n="btn_register_delivery">Record Delivery Entry</span>
    </button>
  </div>

  <!-- Today's Delivery Summary Counter Strip -->
  <div class="gk-visitor-summary-strip gk-delivery-summary-strip">
    <button type="button" class="gk-vsum-card" onclick="GrihamGatekeeperDeliveriesUI.setFilter('Arrived')" aria-label="Filter Arrived Deliveries">
      <span class="gk-vsum-val amber" id="sum-del-arrived">0</span>
      <span class="gk-vsum-lbl" data-i18n="status_arrived">Arrived</span>
    </button>

    <button type="button" class="gk-vsum-card" onclick="GrihamGatekeeperDeliveriesUI.setFilter('Entered')" aria-label="Filter Entered Deliveries">
      <span class="gk-vsum-val blue" id="sum-del-entered">0</span>
      <span class="gk-vsum-lbl" data-i18n="status_entered">Entered</span>
    </button>

    <button type="button" class="gk-vsum-card" onclick="GrihamGatekeeperDeliveriesUI.setFilter('Expected')" aria-label="Filter Expected Deliveries">
      <span class="gk-vsum-val purple" id="sum-del-expected" style="color:#a855f7;">0</span>
      <span class="gk-vsum-lbl" data-i18n="status_expected">Expected</span>
    </button>
  </div>

  <!-- Search and Filter Controls -->
  <div class="gk-visitor-controls">
    <div class="search-input-wrapper" style="width:100%;">
      <span class="search-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>
      <input type="search" id="input-search-deliveries" class="form-input search-input" placeholder="Search by courier, recipient, flat..." oninput="GrihamGatekeeperDeliveriesUI.handleSearch(this.value)" aria-label="Search deliveries">
      <button type="button" class="search-clear-btn" id="btn-clear-delivery-search" onclick="GrihamGatekeeperDeliveriesUI.clearSearch()" aria-label="Clear search" style="display:none;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Status Filter Pills Row -->
    <div class="gk-filter-pills-row" role="tablist" aria-label="Delivery status filter">
      <button type="button" class="gk-filter-pill active" data-status="All" onclick="GrihamGatekeeperDeliveriesUI.setFilter('All')" role="tab" aria-selected="true" data-i18n="filter_all">All</button>
      <button type="button" class="gk-filter-pill" data-status="Arrived" onclick="GrihamGatekeeperDeliveriesUI.setFilter('Arrived')" role="tab" aria-selected="false" data-i18n="status_arrived">Arrived</button>
      <button type="button" class="gk-filter-pill" data-status="Entered" onclick="GrihamGatekeeperDeliveriesUI.setFilter('Entered')" role="tab" aria-selected="false" data-i18n="status_entered">Entered</button>
      <button type="button" class="gk-filter-pill" data-status="Expected" onclick="GrihamGatekeeperDeliveriesUI.setFilter('Expected')" role="tab" aria-selected="false" data-i18n="status_expected">Expected</button>
      <button type="button" class="gk-filter-pill" data-status="Handed Over" onclick="GrihamGatekeeperDeliveriesUI.setFilter('Handed Over')" role="tab" aria-selected="false" data-i18n="status_handed_over">Handed Over</button>
      <button type="button" class="gk-filter-pill" data-status="Cancelled" onclick="GrihamGatekeeperDeliveriesUI.setFilter('Cancelled')" role="tab" aria-selected="false" data-i18n="status_cancelled">Cancelled</button>
    </div>
  </div>

  <!-- Loading State Skeleton -->
  <div id="gk-deliveries-loading" style="display:none;" aria-live="polite">
    <div class="skeleton-card" style="height:90px; border-radius:12px; margin-bottom:0.75rem;"></div>
    <div class="skeleton-card" style="height:90px; border-radius:12px; margin-bottom:0.75rem;"></div>
    <div class="skeleton-card" style="height:90px; border-radius:12px;"></div>
  </div>

  <!-- Deliveries List -->
  <div id="gk-deliveries-container" class="gk-visitor-list" role="region" aria-label="Deliveries list" aria-live="polite">
    <!-- Rendered dynamically by Controller -->
  </div>

</section>
`;

/**
 * Gatekeeper Delivery Management UI Controller
 */
const GrihamGatekeeperDeliveriesUI = {
  deliveries: [],
  summary: {
    expected: 0,
    arrived: 0,
    entered: 0,
    handedOver: 0,
    active: 0,
    totalToday: 0
  },
  selectedDelivery: null,
  currentFilter: "All",
  searchQuery: "",
  searchDebounceTimer: null,

  async init() {
    // Check deep-linking query parameters from hash e.g. #/gatekeeper/deliveries?action=entry or ?filter=Arrived
    const hash = window.location.hash || "";
    if (hash.includes("?")) {
      const qs = hash.split("?")[1] || "";
      const params = new URLSearchParams(qs);
      const action = params.get("action");
      const filter = params.get("filter");

      if (filter && ["Arrived", "Entered", "Expected", "Handed Over", "Cancelled"].includes(filter)) {
        this.currentFilter = filter;
      }

      if (action === "entry") {
        setTimeout(() => this.openEntryModal(), 150);
      }
    }

    this.updateFilterPillsUI();
    await this.loadSummary();
    await this.loadDeliveries();
    this.applyTranslations();
  },

  destroy() {
    this.closeDetail();
    this.closeEntryModal();
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
  },

  applyTranslations() {
    if (typeof GrihamI18n !== "undefined" && typeof GrihamI18n.applyTranslations === "function") {
      GrihamI18n.applyTranslations();
    }
  },

  updateFilterPillsUI() {
    const pills = document.querySelectorAll("#screen-gatekeeper-deliveries .gk-filter-pill");
    pills.forEach(pill => {
      const status = pill.getAttribute("data-status");
      const isMatch = status.toLowerCase() === this.currentFilter.toLowerCase();
      pill.classList.toggle("active", isMatch);
      pill.setAttribute("aria-selected", isMatch ? "true" : "false");
    });
  },

  async loadSummary() {
    try {
      const summaryFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.getDeliverySummary === "function")
        ? GrihamAPI.getDeliverySummary
        : window.getGatekeeperDeliverySummary;

      if (summaryFn) {
        const res = await summaryFn();
        if (res && res.summary) {
          this.summary = res.summary;
          const sArrived = document.getElementById("sum-del-arrived");
          const sEntered = document.getElementById("sum-del-entered");
          const sExpected = document.getElementById("sum-del-expected");

          if (sArrived) sArrived.textContent = this.summary.arrived ?? 0;
          if (sEntered) sEntered.textContent = this.summary.entered ?? 0;
          if (sExpected) sExpected.textContent = this.summary.expected ?? 0;
        }
      }
    } catch (e) {
      console.warn("[GK Deliveries] Load summary error:", e);
    }
  },

  async loadDeliveries() {
    const container = document.getElementById("gk-deliveries-container");
    const loading = document.getElementById("gk-deliveries-loading");

    if (loading) loading.style.display = "block";
    if (container) container.innerHTML = "";

    try {
      const getFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.getDeliveries === "function")
        ? GrihamAPI.getDeliveries
        : window.getGatekeeperDeliveries;

      const params = {
        status: this.currentFilter,
        search: this.searchQuery
      };

      const res = await getFn(params);
      this.deliveries = (res && res.deliveries) || [];
      this.renderList(this.deliveries);
    } catch (err) {
      console.error("[GK Deliveries] Failed to load deliveries:", err);
      if (container) {
        container.innerHTML = `
          <div class="empty-state-view" style="padding:2.5rem 1rem;">
            <p style="color:#ef4444; font-weight:700;">Failed to load delivery records.</p>
            <button type="button" class="btn-primary-action" onclick="GrihamGatekeeperDeliveriesUI.loadDeliveries()" style="max-width:200px; margin-top:0.8rem;">Retry</button>
          </div>
        `;
      }
    } finally {
      if (loading) loading.style.display = "none";
    }
  },

  renderList(deliveries) {
    const container = document.getElementById("gk-deliveries-container");
    if (!container) return;

    if (!deliveries || deliveries.length === 0) {
      container.innerHTML = `
        <div class="empty-state-view" style="padding:2.5rem 1rem;">
          <div class="empty-state-icon" style="color:var(--text-muted); margin-bottom:0.75rem;">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <h3 class="empty-state-title" data-i18n="empty_deliveries_title" style="margin:0 0 0.35rem 0; font-size:1.05rem;">No Deliveries Found</h3>
          <p class="empty-state-desc" data-i18n="empty_deliveries_desc" style="color:var(--text-secondary); font-size:0.85rem; margin:0;">No delivery records match the current filter or search criteria.</p>
        </div>
      `;
      this.applyTranslations();
      return;
    }

    container.innerHTML = deliveries.map(d => this.renderDeliveryCard(d)).join("");
    this.applyTranslations();
  },

  renderDeliveryCard(d) {
    const badgeHtml = (typeof GrihamStatusBadge !== "undefined" && typeof GrihamStatusBadge.render === "function")
      ? GrihamStatusBadge.render({ status: d.status, variant: "pill" })
      : `<span class="badge">${d.status}</span>`;

    // Type icon mapping
    let iconSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    `;

    if (d.deliveryType === "Food Delivery") {
      iconSvg = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      `;
    } else if (d.deliveryType === "Grocery") {
      iconSvg = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      `;
    }

    // Time tag
    let timeLabel = "";
    if (d.status === "Arrived" && d.arrivedAt) {
      timeLabel = `Arrived ${this.formatTime(d.arrivedAt)}`;
    } else if (d.status === "Entered" && d.enteredAt) {
      timeLabel = `Entered ${this.formatTime(d.enteredAt)}`;
    } else if (d.status === "Handed Over" && d.handedOverAt) {
      timeLabel = `Handed Over ${this.formatTime(d.handedOverAt)}`;
    } else if (d.status === "Expected") {
      timeLabel = "Expected Today";
    }

    // Contextual Action Buttons
    let actionBtnHtml = "";
    if (d.status === "Expected") {
      actionBtnHtml = `
        <button type="button" class="vcard-action-btn arrive" onclick="event.stopPropagation(); GrihamGatekeeperDeliveriesUI.handleMarkArrived('${d.id}')" aria-label="Mark ${d.id} Arrived">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span data-i18n="btn_mark_arrived">Mark Arrived</span>
        </button>
      `;
    } else if (d.status === "Arrived") {
      actionBtnHtml = `
        <div style="display:flex; gap:0.4rem; align-items:center;">
          <button type="button" class="vcard-action-btn enter" onclick="event.stopPropagation(); GrihamGatekeeperDeliveriesUI.handleMarkEntered('${d.id}')" aria-label="Grant Entry ${d.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            <span data-i18n="btn_mark_entered">Grant Entry</span>
          </button>
          <button type="button" class="vcard-action-btn handover" onclick="event.stopPropagation(); GrihamGatekeeperDeliveriesUI.handleMarkHandedOver('${d.id}')" aria-label="Handover ${d.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span data-i18n="btn_mark_handed_over">Handover</span>
          </button>
        </div>
      `;
    } else if (d.status === "Entered") {
      actionBtnHtml = `
        <button type="button" class="vcard-action-btn handover" onclick="event.stopPropagation(); GrihamGatekeeperDeliveriesUI.handleMarkHandedOver('${d.id}')" aria-label="Mark Handed Over ${d.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span data-i18n="btn_mark_handed_over">Mark Handed Over</span>
        </button>
      `;
    }

    return `
      <div class="gk-visitor-card gk-delivery-card" onclick="GrihamGatekeeperDeliveriesUI.openDetail('${d.id}')" role="button" tabindex="0" onkeydown="if(event.key==='Enter') GrihamGatekeeperDeliveriesUI.openDetail('${d.id}')" aria-label="Delivery record ${d.id}">
        <div class="vcard-header">
          <div class="vcard-user-info">
            <div class="vcard-avatar" aria-hidden="true">
              ${iconSvg}
            </div>
            <div class="vcard-title-group">
              <div class="vcard-name-row">
                <span class="vcard-name">${this.escapeHtml(d.courierName)}</span>
                <span class="vcard-type-tag">${this.escapeHtml(d.deliveryType)}</span>
              </div>
              <span class="vcard-sub-info">
                <strong>${this.escapeHtml(d.recipientName)}</strong> • Flat ${this.escapeHtml(d.wing || "")}-${this.escapeHtml(d.flatNumber || "")}
              </span>
            </div>
          </div>
          <div class="vcard-badge-wrap">
            ${badgeHtml}
          </div>
        </div>

        <div class="vcard-meta-row">
          <span class="vcard-id-pill">${d.id}</span>
          ${timeLabel ? `<span class="vcard-time-pill">${timeLabel}</span>` : ""}
          <div style="flex:1;"></div>
          ${actionBtnHtml}
        </div>
      </div>
    `;
  },

  openDetail(deliveryId) {
    const delivery = this.deliveries.find(d => d.id === deliveryId);
    if (!delivery) return;

    this.selectedDelivery = delivery;
    const sheet = document.getElementById("sheet-delivery-detail");
    const backdrop = document.getElementById("delivery-detail-backdrop");
    const body = document.getElementById("delivery-detail-content");

    const badgeHtml = (typeof GrihamStatusBadge !== "undefined" && typeof GrihamStatusBadge.render === "function")
      ? GrihamStatusBadge.render({ status: delivery.status, variant: "pill" })
      : `<span class="badge">${delivery.status}</span>`;

    // Action CTA in sheet
    let sheetActionHtml = "";
    if (delivery.status === "Expected") {
      sheetActionHtml = `
        <button type="button" class="btn-sheet-primary arrive" onclick="GrihamGatekeeperDeliveriesUI.handleMarkArrived('${delivery.id}')" aria-label="Mark Arrived">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span data-i18n="btn_mark_arrived">Mark Arrived at Gate</span>
        </button>
      `;
    } else if (delivery.status === "Arrived") {
      sheetActionHtml = `
        <div style="display:flex; flex-direction:column; gap:0.55rem; width:100%;">
          <button type="button" class="btn-sheet-primary enter" onclick="GrihamGatekeeperDeliveriesUI.handleMarkEntered('${delivery.id}')" aria-label="Grant Entry to Door">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            <span data-i18n="btn_mark_entered">Grant Entry to Premises</span>
          </button>
          <button type="button" class="btn-sheet-primary handover" onclick="GrihamGatekeeperDeliveriesUI.handleMarkHandedOver('${delivery.id}')" aria-label="Handover at Gate">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span data-i18n="btn_mark_handed_over">Direct Handover at Gate</span>
          </button>
        </div>
      `;
    } else if (delivery.status === "Entered") {
      sheetActionHtml = `
        <button type="button" class="btn-sheet-primary handover" onclick="GrihamGatekeeperDeliveriesUI.handleMarkHandedOver('${delivery.id}')" aria-label="Mark Handed Over">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span data-i18n="btn_mark_handed_over">Mark Handed Over (Complete)</span>
        </button>
      `;
    }

    if (body) {
      body.innerHTML = `
        <div class="vdetail-header-card">
          <div class="vdetail-hero">
            <span class="vdetail-name">${this.escapeHtml(delivery.courierName)}</span>
            <span class="vdetail-id">${delivery.id}</span>
          </div>
          <div class="vdetail-status-pill">
            ${badgeHtml}
          </div>
        </div>

        <div class="vdetail-grid">
          <div class="vdetail-cell">
            <span class="vdetail-lbl" data-i18n="label_delivery_type">Delivery Type</span>
            <span class="vdetail-val">${this.escapeHtml(delivery.deliveryType || "Standard Delivery")}</span>
          </div>

          <div class="vdetail-cell">
            <span class="vdetail-lbl" data-i18n="label_courier_phone">Courier Phone</span>
            <a href="tel:${delivery.courierPhone}" class="vdetail-val-phone">${this.escapeHtml(delivery.courierPhone || "N/A")}</a>
          </div>

          <div class="vdetail-cell">
            <span class="vdetail-lbl" data-i18n="label_recipient_name">Recipient</span>
            <span class="vdetail-val">${this.escapeHtml(delivery.recipientName)}</span>
          </div>

          <div class="vdetail-cell">
            <span class="vdetail-lbl" data-i18n="label_flat_wing">Wing & Flat</span>
            <span class="vdetail-val">${this.escapeHtml(delivery.wing || "A")}-${this.escapeHtml(delivery.flatNumber || "")}</span>
          </div>

          <div class="vdetail-cell" style="grid-column: span 2;">
            <span class="vdetail-lbl" data-i18n="label_package_desc">Package Description</span>
            <span class="vdetail-val">${this.escapeHtml(delivery.description || "N/A")}</span>
          </div>

          <div class="vdetail-cell">
            <span class="vdetail-lbl" data-i18n="label_arrival_time">Arrival Time</span>
            <span class="vdetail-val">${delivery.arrivedAt ? this.formatDateTime(delivery.arrivedAt) : "Pending"}</span>
          </div>

          <div class="vdetail-cell">
            <span class="vdetail-lbl" data-i18n="label_entry_time">Entry Time</span>
            <span class="vdetail-val">${delivery.enteredAt ? this.formatDateTime(delivery.enteredAt) : (delivery.status === "Handed Over" ? "Direct Handover" : "Not Entered")}</span>
          </div>

          <div class="vdetail-cell" style="grid-column: span 2;">
            <span class="vdetail-lbl" data-i18n="label_handover_time">Handover Time</span>
            <span class="vdetail-val">${delivery.handedOverAt ? this.formatDateTime(delivery.handedOverAt) : "In Progress"}</span>
          </div>

          ${delivery.notes ? `
            <div class="vdetail-cell" style="grid-column: span 2;">
              <span class="vdetail-lbl" data-i18n="label_notes">Notes</span>
              <span class="vdetail-val">${this.escapeHtml(delivery.notes)}</span>
            </div>
          ` : ""}
        </div>

        ${sheetActionHtml ? `
          <div class="vdetail-actions-strip" style="margin-top:0.75rem;">
            ${sheetActionHtml}
          </div>
        ` : ""}
      `;
    }

    if (backdrop) backdrop.classList.add("visible");
    if (sheet) {
      sheet.classList.add("visible");
      sheet.setAttribute("aria-hidden", "false");
    }

    this.applyTranslations();
  },

  closeDetail() {
    const sheet = document.getElementById("sheet-delivery-detail");
    const backdrop = document.getElementById("delivery-detail-backdrop");

    if (sheet) {
      sheet.classList.remove("visible");
      sheet.setAttribute("aria-hidden", "true");
    }
    if (backdrop) backdrop.classList.remove("visible");
    this.selectedDelivery = null;
  },

  openEntryModal() {
    const sheet = document.getElementById("sheet-entry-delivery");
    const backdrop = document.getElementById("delivery-entry-backdrop");
    const form = document.getElementById("form-entry-delivery");
    const errBanner = document.getElementById("delivery-error-banner");

    if (form) form.reset();
    if (errBanner) {
      errBanner.style.display = "none";
      errBanner.textContent = "";
    }

    if (backdrop) backdrop.classList.add("visible");
    if (sheet) {
      sheet.classList.add("visible");
      sheet.setAttribute("aria-hidden", "false");
      const firstInput = document.getElementById("del-input-courier");
      if (firstInput) setTimeout(() => firstInput.focus(), 200);
    }
  },

  closeEntryModal() {
    const sheet = document.getElementById("sheet-entry-delivery");
    const backdrop = document.getElementById("delivery-entry-backdrop");

    if (sheet) {
      sheet.classList.remove("visible");
      sheet.setAttribute("aria-hidden", "true");
    }
    if (backdrop) backdrop.classList.remove("visible");
  },

  async handleEntrySubmit(e) {
    if (e && e.preventDefault) e.preventDefault();

    const errBanner = document.getElementById("delivery-error-banner");
    const courierName = document.getElementById("del-input-courier")?.value.trim() || "";
    const courierPhone = document.getElementById("del-input-phone")?.value.trim() || "";
    const wing = document.getElementById("del-select-wing")?.value.trim() || "A";
    const flatNumber = document.getElementById("del-input-flat")?.value.trim() || "";
    const recipientName = document.getElementById("del-input-recipient")?.value.trim() || "";
    const deliveryType = document.getElementById("del-select-type")?.value || "Courier / Parcel";
    const description = document.getElementById("del-input-desc")?.value.trim() || "";
    const notes = document.getElementById("del-input-notes")?.value.trim() || "";

    const showError = (msg) => {
      if (errBanner) {
        errBanner.textContent = msg;
        errBanner.style.display = "block";
      } else if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(msg, "error");
      }
    };

    if (!courierName) {
      showError("Courier or delivery person name is required.");
      return;
    }

    const cleanPhone = courierPhone.replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      showError("Please enter a valid 10-digit courier contact number.");
      return;
    }

    if (!flatNumber) {
      showError("Flat number is required.");
      return;
    }

    if (!recipientName) {
      showError("Recipient resident name is required.");
      return;
    }

    const payload = {
      courierName,
      courierPhone,
      wing,
      flatNumber,
      recipientName,
      deliveryType,
      description: description || `${deliveryType} package`,
      notes
    };

    try {
      const createFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.createDelivery === "function")
        ? GrihamAPI.createDelivery
        : window.createGatekeeperDelivery;

      const res = await createFn(payload);

      this.closeEntryModal();

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(res.message || "Incoming delivery recorded successfully.", "success");
      }

      await this.loadSummary();
      await this.loadDeliveries();
    } catch (err) {
      showError(err.message || "Failed to record incoming delivery.");
    }
  },

  async handleMarkArrived(deliveryId) {
    try {
      const arriveFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.markDeliveryArrived === "function")
        ? GrihamAPI.markDeliveryArrived
        : window.markGatekeeperDeliveryArrived;

      const res = await arriveFn(deliveryId);

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(res.message || "Delivery marked as Arrived at gate.", "success");
      }

      this.closeDetail();
      await this.loadSummary();
      await this.loadDeliveries();
    } catch (err) {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(err.message || "Failed to mark delivery arrived.", "error");
      }
    }
  },

  async handleMarkEntered(deliveryId) {
    try {
      const enterFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.markDeliveryEntered === "function")
        ? GrihamAPI.markDeliveryEntered
        : window.markGatekeeperDeliveryEntered;

      const res = await enterFn(deliveryId);

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(res.message || "Delivery person granted entry to premises.", "success");
      }

      this.closeDetail();
      await this.loadSummary();
      await this.loadDeliveries();
    } catch (err) {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(err.message || "Failed to grant entry to delivery person.", "error");
      }
    }
  },

  async handleMarkHandedOver(deliveryId) {
    try {
      const handoverFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.markDeliveryHandedOver === "function")
        ? GrihamAPI.markDeliveryHandedOver
        : window.markGatekeeperDeliveryHandedOver;

      const res = await handoverFn(deliveryId);

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(res.message || "Delivery package handed over successfully.", "success");
      }

      this.closeDetail();
      await this.loadSummary();
      await this.loadDeliveries();
    } catch (err) {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(err.message || "Failed to complete delivery handover.", "error");
      }
    }
  },

  setFilter(status) {
    this.currentFilter = status;
    this.updateFilterPillsUI();
    this.loadDeliveries();
  },

  handleSearch(val) {
    this.searchQuery = val.trim();
    const clearBtn = document.getElementById("btn-clear-delivery-search");
    if (clearBtn) clearBtn.style.display = this.searchQuery ? "flex" : "none";

    if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
    this.searchDebounceTimer = setTimeout(() => {
      this.loadDeliveries();
    }, 200);
  },

  clearSearch() {
    this.searchQuery = "";
    const input = document.getElementById("input-search-deliveries");
    const clearBtn = document.getElementById("btn-clear-delivery-search");
    if (input) input.value = "";
    if (clearBtn) clearBtn.style.display = "none";
    this.loadDeliveries();
  },

  formatTime(isoString) {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return isoString;
    }
  },

  formatDateTime(isoString) {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      return `${d.toLocaleDateString([], { month: "short", day: "numeric" })}, ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    } catch (e) {
      return isoString;
    }
  },

  escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
};

window.GrihamGatekeeperDeliveriesUI = GrihamGatekeeperDeliveriesUI;
