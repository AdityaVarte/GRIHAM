/**
 * GRIHAM FRONTEND - RESIDENT MAINTENANCE HISTORY CONTROLLER
 * Page: Resident Maintenance History (#/resident/maintenance)
 * Mobile-first Residential Society Management App
 */

window.HTML_RESIDENT_MAINTENANCE = `
<!-- ================================================================= -->
<!-- RESIDENT MAINTENANCE BOTTOM SHEETS & RECEIPT VIEWERS              -->
<!-- ================================================================= -->

<!-- 1. RECORD DETAIL BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-maint-detail-backdrop" onclick="GrihamResidentMaintenanceUI.closeDetail()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-maint-detail" role="dialog" aria-modal="true" aria-labelledby="res-maint-detail-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentMaintenanceUI.closeDetail()" aria-label="Close maintenance details" title="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="res-maint-detail-title">Payment Record</h3>
    <div style="width:24px;" aria-hidden="true"></div>
  </div>

  <div id="res-maint-detail-body" style="padding: 0.25rem 0.25rem calc(2rem + var(--safe-bottom, 20px)); display:flex; flex-direction:column; gap:0.9rem;">
    <!-- Populated dynamically by GrihamResidentMaintenanceUI.renderDetailBody -->
  </div>
</div>

<!-- 2. SUBMITTED CASH RECEIPT PHOTO VIEWER SHEET -->
<div class="sheet-backdrop" id="sheet-res-maint-photo-backdrop" onclick="GrihamResidentMaintenanceUI.closeReceiptPhoto()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-maint-photo" role="dialog" aria-modal="true" aria-labelledby="res-maint-photo-title" aria-hidden="true" style="max-height:88vh;">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentMaintenanceUI.closeReceiptPhoto()" aria-label="Close receipt photo" title="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="res-maint-photo-title">Receipt Photo</h3>
    <div style="width:24px;" aria-hidden="true"></div>
  </div>

  <div style="padding: 0.5rem 0.25rem calc(2rem + var(--safe-bottom, 20px)); display:flex; flex-direction:column; align-items:center; gap:0.85rem;">
    <div style="width:100%; max-height:55vh; overflow:auto; border-radius:var(--radius-md); background:#090d16; display:flex; justify-content:center; align-items:center; border:1px solid rgba(255,255,255,0.12); padding:0.5rem;">
      <img id="res-maint-photo-img" src="" alt="Submitted Maintenance Receipt" style="max-width:100%; max-height:50vh; object-fit:contain; border-radius:6px;">
    </div>
    <div id="res-maint-photo-meta" style="width:100%; background:var(--glass-bg-subtle); border:1px solid var(--divider-color); border-radius:var(--radius-md); padding:0.75rem; font-size:0.78rem; display:flex; flex-direction:column; gap:0.35rem;">
      <!-- Populated dynamically -->
    </div>
    <button type="button" class="btn-primary-action btn-resident-style" onclick="GrihamResidentMaintenanceUI.closeReceiptPhoto()" style="width:100%; min-height:44px;">
      <span>Close Preview</span>
    </button>
  </div>
</div>

<!-- 3. OFFICIAL ELECTRONIC SOCIETY RECEIPT SHEET -->
<div class="sheet-backdrop" id="sheet-res-maint-official-backdrop" onclick="GrihamResidentMaintenanceUI.closeOfficialReceipt()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-maint-official" role="dialog" aria-modal="true" aria-labelledby="res-maint-official-title" aria-hidden="true" style="max-height:92vh;">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentMaintenanceUI.closeOfficialReceipt()" aria-label="Close official receipt" title="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="res-maint-official-title">Official Receipt</h3>
    <div style="width:24px;" aria-hidden="true"></div>
  </div>

  <div id="res-maint-official-body" style="padding: 0.5rem 0.25rem calc(2rem + var(--safe-bottom, 20px)); display:flex; flex-direction:column; gap:0.9rem;">
    <!-- Populated dynamically by GrihamResidentMaintenanceUI.renderOfficialReceiptBody -->
  </div>
</div>

<!-- ================================================================= -->
<!-- MAIN SCREEN VIEW: RESIDENT MAINTENANCE HISTORY                     -->
<!-- ================================================================= -->
<section id="screen-resident-maintenance" class="app-view" aria-labelledby="res-maint-header-title">
  <!-- Top Bar / Header -->
  <header class="screen-top-bar" id="res-maint-header">
    <div class="header-left">
      <button type="button" class="btn-icon-back" onclick="GrihamRouter.navigate('/resident/home')" aria-label="Back to Resident Home">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <div>
        <h1 class="screen-title" id="res-maint-header-title">Maintenance History</h1>
        <span class="screen-subtitle" id="res-maint-header-sub">Flat A-204 • Society Dues &amp; Receipts</span>
      </div>
    </div>
    <div class="header-right">
      <button type="button" class="btn-icon-subtle" onclick="GrihamResidentMaintenanceUI.loadData(true)" aria-label="Refresh maintenance history" title="Refresh">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
      </button>
    </div>
  </header>

  <!-- Scrollable Screen Content -->
  <div class="screen-scroll-body" id="res-maint-scroll-container">
    
    <!-- Summary Metrics Section -->
    <div class="res-summary-strip" id="res-maint-summary-strip" style="display:grid; grid-template-columns:repeat(2, 1fr); gap:0.6rem; margin: 0.75rem 0 0.5rem;">
      <!-- Card 1: Outstanding Dues -->
      <div class="res-stat-card" id="res-maint-card-dues" style="background:var(--glass-bg); border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:0.75rem 0.85rem; display:flex; flex-direction:column; gap:0.25rem;">
        <span style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:700; letter-spacing:0.04em;">Outstanding Dues</span>
        <div style="font-family:var(--font-family-display); font-size:1.35rem; font-weight:800; color:var(--text-primary);" id="res-maint-sum-dues">₹3,500</div>
        <div style="display:flex; align-items:center; gap:0.35rem;">
          <span class="status-pill status-pending" id="res-maint-sum-dues-pill" style="font-size:0.68rem; padding:0.15rem 0.45rem;">September Due</span>
        </div>
      </div>

      <!-- Card 2: Total Paid -->
      <div class="res-stat-card" id="res-maint-card-paid" style="background:var(--glass-bg); border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:0.75rem 0.85rem; display:flex; flex-direction:column; gap:0.25rem;">
        <span style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:700; letter-spacing:0.04em;">Total Settled</span>
        <div style="font-family:var(--font-family-display); font-size:1.35rem; font-weight:800; color:#34d399;" id="res-maint-sum-paid">₹14,000</div>
        <span style="font-size:0.7rem; color:var(--text-secondary);" id="res-maint-sum-paid-sub">4 payments settled</span>
      </div>
    </div>

    <!-- Secondary Notice if Cash Payment Pending -->
    <div id="res-maint-pending-notice" style="display:none; background:rgba(245, 158, 11, 0.12); border:1px solid rgba(245, 158, 11, 0.3); border-radius:var(--radius-md); padding:0.65rem 0.8rem; margin-bottom:0.6rem; align-items:center; gap:0.6rem;">
      <div style="width:28px; height:28px; border-radius:50%; background:rgba(245, 158, 11, 0.2); color:#f59e0b; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      </div>
      <div style="flex:1;">
        <div style="font-size:0.78rem; font-weight:700; color:var(--text-primary);" id="res-maint-pending-notice-text">Cash Payment Under Verification</div>
        <div style="font-size:0.72rem; color:var(--text-secondary);">Your receipt is being reviewed by the society manager.</div>
      </div>
    </div>

    <!-- Search & Sort Row -->
    <div style="display:flex; gap:0.5rem; align-items:center; margin:0.35rem 0 0.55rem;">
      <div class="res-search-input-wrap" style="flex:1; position:relative;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="position:absolute; left:0.7rem; top:50%; transform:translateY(-50%); color:var(--text-muted); pointer-events:none;">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="search" 
          id="input-res-maint-search" 
          class="form-input" 
          placeholder="Search by month, mode, ref..." 
          style="padding-left:2.1rem; padding-right:2rem; height:38px; font-size:0.8rem;"
          oninput="GrihamResidentMaintenanceUI.handleSearch(this.value)"
        >
        <button type="button" class="btn-search-clear" id="btn-res-maint-search-clear" onclick="GrihamResidentMaintenanceUI.clearSearch()" style="display:none; position:absolute; right:0.5rem; top:50%; transform:translateY(-50%); background:none; border:none; color:var(--text-muted); cursor:pointer;" aria-label="Clear search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- Sort Toggle -->
      <button type="button" class="res-filter-chip" id="btn-res-maint-sort" onclick="GrihamResidentMaintenanceUI.toggleSort()" style="height:38px; padding:0 0.75rem; display:flex; align-items:center; gap:0.35rem; font-size:0.75rem; white-space:nowrap;" aria-label="Toggle sort order">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <polyline points="7 10 12 15 17 10"></polyline>
        </svg>
        <span id="label-res-maint-sort">Newest</span>
      </button>
    </div>

    <!-- Filter Chips Row -->
    <div class="res-filter-chips-row" style="margin-bottom:0.75rem; overflow-x:auto; padding-bottom:0.2rem;" role="tablist" aria-label="Filter maintenance history">
      <button type="button" class="res-filter-chip active" data-mfilter="all" onclick="GrihamResidentMaintenanceUI.setFilter('all')">
        All Records <span class="tab-count-badge" id="chip-count-all">0</span>
      </button>
      <button type="button" class="res-filter-chip" data-mfilter="paid" onclick="GrihamResidentMaintenanceUI.setFilter('paid')">
        Paid <span class="tab-count-badge" id="chip-count-paid">0</span>
      </button>
      <button type="button" class="res-filter-chip" data-mfilter="pending" onclick="GrihamResidentMaintenanceUI.setFilter('pending')">
        Due <span class="tab-count-badge" id="chip-count-pending">0</span>
      </button>
      <button type="button" class="res-filter-chip" data-mfilter="pending_verification" onclick="GrihamResidentMaintenanceUI.setFilter('pending_verification')">
        Verification <span class="tab-count-badge" id="chip-count-verification">0</span>
      </button>
      <button type="button" class="res-filter-chip" data-mfilter="rejected" onclick="GrihamResidentMaintenanceUI.setFilter('rejected')">
        Rejected <span class="tab-count-badge" id="chip-count-rejected">0</span>
      </button>
    </div>

    <!-- Loading State -->
    <div id="res-maint-loader" style="display:none; padding:2rem 0; text-align:center;">
      <div class="griham-spinner" aria-hidden="true" style="margin:0 auto 0.75rem;"></div>
      <p style="color:var(--text-muted); font-size:0.82rem;">Loading maintenance ledger...</p>
    </div>

    <!-- Records List Container -->
    <div class="complaints-list" id="res-maint-list-container" style="display:flex; flex-direction:column; gap:0.65rem; padding-bottom:calc(3rem + var(--safe-bottom, 20px));">
      <!-- Populated dynamically by GrihamResidentMaintenanceUI.renderRecordsList -->
    </div>

    <!-- Empty State -->
    <div id="res-maint-empty-state" style="display:none; text-align:center; padding:2.5rem 1rem;">
      <div style="width:52px; height:52px; border-radius:50%; background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; margin:0 auto 0.75rem; color:var(--text-muted);">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
      </div>
      <h3 style="font-size:0.95rem; font-weight:700; color:var(--text-primary); margin:0 0 0.25rem;" id="res-maint-empty-title">No Records Found</h3>
      <p style="font-size:0.78rem; color:var(--text-secondary); margin:0 0 0.85rem;" id="res-maint-empty-desc">No maintenance records match your current filter.</p>
      <button type="button" class="btn-primary-action btn-resident-style" onclick="GrihamResidentMaintenanceUI.resetFilters()" style="width:auto; padding:0.45rem 1.25rem; font-size:0.82rem; margin:0 auto;">
        <span>Reset Filters</span>
      </button>
    </div>

    <!-- Error State -->
    <div id="res-maint-error-state" style="display:none; text-align:center; padding:2.5rem 1rem;">
      <div style="width:52px; height:52px; border-radius:50%; background:rgba(239, 68, 68, 0.12); display:flex; align-items:center; justify-content:center; margin:0 auto 0.75rem; color:#ef4444;">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <h3 style="font-size:0.95rem; font-weight:700; color:var(--text-primary); margin:0 0 0.25rem;">Unable to Load History</h3>
      <p style="font-size:0.78rem; color:var(--text-secondary); margin:0 0 0.85rem;" id="res-maint-error-msg">Something went wrong fetching maintenance records.</p>
      <button type="button" class="btn-primary-action btn-resident-style" onclick="GrihamResidentMaintenanceUI.loadData(true)" style="width:auto; padding:0.45rem 1.25rem; font-size:0.82rem; margin:0 auto;">
        <span>Try Again</span>
      </button>
    </div>

  </div>
</section>
`;

window.GrihamResidentMaintenanceUI = {
  state: {
    records: [],
    summary: null,
    activeFilter: 'all',
    searchQuery: '',
    sortOrder: 'newest', // 'newest' | 'oldest'
    selectedRecord: null,
    isLoading: false
  },

  searchTimer: null,

  /**
   * Screen Initialization
   */
  async init() {
    this.state.activeFilter = 'all';
    this.state.searchQuery = '';
    this.state.sortOrder = 'newest';
    this.state.selectedRecord = null;

    // Reset search input
    const searchInput = document.getElementById("input-res-maint-search");
    if (searchInput) searchInput.value = '';
    const clearBtn = document.getElementById("btn-res-maint-search-clear");
    if (clearBtn) clearBtn.style.display = 'none';

    // Update filter chips UI
    this.updateFilterChipsUI();
    this.updateSortBtnUI();

    // Check if target payment requested via deep link
    const targetPaymentId = sessionStorage.getItem("griham_target_maint_payment_id");
    if (targetPaymentId) {
      sessionStorage.removeItem("griham_target_maint_payment_id");
    }

    await this.loadData(false);

    if (targetPaymentId) {
      this.openDetail(targetPaymentId);
    }
  },

  /**
   * Load Data from Canonical API
   */
  async loadData(isRefresh = false) {
    this.state.isLoading = true;
    this.setLoading(true);

    try {
      // 1. Fetch Summary
      let summaryData = null;
      if (typeof getResidentMaintenanceSummary === "function") {
        const res = await getResidentMaintenanceSummary();
        summaryData = res?.data || res;
      } else if (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.getResidentMaintenanceSummary === "function") {
        const res = await GrihamAPI.getResidentMaintenanceSummary();
        summaryData = res?.data || res;
      }

      // 2. Fetch History
      let historyData = [];
      const params = {
        status: this.state.activeFilter,
        search: this.state.searchQuery,
        sort: this.state.sortOrder
      };

      if (typeof getResidentMaintenanceHistory === "function") {
        const res = await getResidentMaintenanceHistory(params);
        historyData = res?.data || [];
      } else if (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.getResidentMaintenanceHistory === "function") {
        const res = await GrihamAPI.getResidentMaintenanceHistory(params);
        historyData = res?.data || [];
      }

      this.state.summary = summaryData;
      this.state.records = Array.isArray(historyData) ? historyData : [];

      this.renderSummary();
      this.renderRecordsList();
      this.updateCounters();

      if (isRefresh && typeof GrihamToast !== "undefined") {
        GrihamToast.show("Maintenance history updated", "success");
      }
    } catch (err) {
      console.error("[Resident Maintenance] Failed to load data:", err);
      this.showError(err.message || "Failed to load maintenance records.");
    } finally {
      this.state.isLoading = false;
      this.setLoading(false);
    }
  },

  /**
   * Set Loading State
   */
  setLoading(isLoading) {
    const loader = document.getElementById("res-maint-loader");
    const container = document.getElementById("res-maint-list-container");
    const emptyState = document.getElementById("res-maint-empty-state");
    const errorState = document.getElementById("res-maint-error-state");

    if (loader) loader.style.display = isLoading ? "block" : "none";
    if (isLoading) {
      if (container) container.style.display = "none";
      if (emptyState) emptyState.style.display = "none";
      if (errorState) errorState.style.display = "none";
    } else {
      if (container) container.style.display = "flex";
    }
  },

  /**
   * Show Error State
   */
  showError(message) {
    const loader = document.getElementById("res-maint-loader");
    const container = document.getElementById("res-maint-list-container");
    const emptyState = document.getElementById("res-maint-empty-state");
    const errorState = document.getElementById("res-maint-error-state");
    const errorMsg = document.getElementById("res-maint-error-msg");

    if (loader) loader.style.display = "none";
    if (container) container.style.display = "none";
    if (emptyState) emptyState.style.display = "none";
    if (errorState) errorState.style.display = "block";
    if (errorMsg) errorMsg.textContent = message;
  },

  /**
   * Render Top Summary Metrics
   */
  renderSummary() {
    const sum = this.state.summary || {};
    const duesEl = document.getElementById("res-maint-sum-dues");
    const duesPill = document.getElementById("res-maint-sum-dues-pill");
    const paidEl = document.getElementById("res-maint-sum-paid");
    const paidSub = document.getElementById("res-maint-sum-paid-sub");
    const pendingNotice = document.getElementById("res-maint-pending-notice");

    const currentDues = Number(sum.current_dues || 0);
    const totalPaid = Number(sum.total_paid || 0);
    const paidCount = Number(sum.paid_count || 0);
    const pendingVerifCount = Number(sum.pending_verification_count || 0);

    if (duesEl) {
      duesEl.textContent = GrihamFormat.currency(currentDues);
    }

    if (duesPill) {
      if (currentDues > 0) {
        duesPill.textContent = `${sum.current_month || "Current"} Due`;
        duesPill.className = "status-pill status-pending";
      } else {
        duesPill.textContent = "All Dues Cleared";
        duesPill.className = "status-pill badge-approved";
      }
    }

    if (paidEl) {
      paidEl.textContent = GrihamFormat.currency(totalPaid);
    }

    if (paidSub) {
      paidSub.textContent = `${paidCount} payment${paidCount === 1 ? '' : 's'} settled`;
    }

    // Secondary pending cash verification notice banner
    if (pendingNotice) {
      if (pendingVerifCount > 0) {
        pendingNotice.style.display = "flex";
      } else {
        pendingNotice.style.display = "none";
      }
    }
  },

  /**
   * Update Filter Chip Count Badges
   */
  updateCounters() {
    const allRecords = this.state.records;
    let paidCount = 0;
    let pendingCount = 0;
    let verifCount = 0;
    let rejectedCount = 0;

    for (const r of allRecords) {
      const s = (r.status || "").toLowerCase();
      if (s.startsWith("paid")) paidCount++;
      else if (s === "pending" || s === "due") pendingCount++;
      else if (s === "pending_verification") verifCount++;
      else if (s === "rejected") rejectedCount++;
    }

    const cAll = document.getElementById("chip-count-all");
    const cPaid = document.getElementById("chip-count-paid");
    const cPending = document.getElementById("chip-count-pending");
    const cVerif = document.getElementById("chip-count-verification");
    const cRej = document.getElementById("chip-count-rejected");

    if (cAll) cAll.textContent = allRecords.length;
    if (cPaid) cPaid.textContent = paidCount;
    if (cPending) cPending.textContent = pendingCount;
    if (cVerif) cVerif.textContent = verifCount;
    if (cRej) cRej.textContent = rejectedCount;
  },

  /**
   * Filter Chips UI
   */
  updateFilterChipsUI() {
    document.querySelectorAll(".res-filter-chips-row button").forEach(btn => {
      const f = btn.getAttribute("data-mfilter");
      if (f === this.state.activeFilter) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  },

  /**
   * Set Active Filter
   */
  setFilter(filter) {
    this.state.activeFilter = filter;
    this.updateFilterChipsUI();
    this.renderRecordsList();
  },

  /**
   * Reset Filters
   */
  resetFilters() {
    this.state.activeFilter = 'all';
    this.state.searchQuery = '';
    const searchInput = document.getElementById("input-res-maint-search");
    if (searchInput) searchInput.value = '';
    const clearBtn = document.getElementById("btn-res-maint-search-clear");
    if (clearBtn) clearBtn.style.display = 'none';

    this.updateFilterChipsUI();
    this.renderRecordsList();
  },

  /**
   * Search Input Handler
   */
  handleSearch(val) {
    this.state.searchQuery = (val || "").trim().toLowerCase();
    const clearBtn = document.getElementById("btn-res-maint-search-clear");
    if (clearBtn) {
      clearBtn.style.display = this.state.searchQuery ? "block" : "none";
    }

    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.renderRecordsList();
    }, 180);
  },

  clearSearch() {
    const searchInput = document.getElementById("input-res-maint-search");
    if (searchInput) searchInput.value = "";
    this.handleSearch("");
  },

  /**
   * Sort Toggle (Newest <-> Oldest)
   */
  toggleSort() {
    this.state.sortOrder = this.state.sortOrder === "newest" ? "oldest" : "newest";
    this.updateSortBtnUI();
    this.renderRecordsList();
  },

  updateSortBtnUI() {
    const lbl = document.getElementById("label-res-maint-sort");
    if (lbl) {
      lbl.textContent = this.state.sortOrder === "newest" ? "Newest" : "Oldest";
    }
  },

  /**
   * Render Filtered & Sorted Maintenance Records
   */
  renderRecordsList() {
    const container = document.getElementById("res-maint-list-container");
    const emptyState = document.getElementById("res-maint-empty-state");
    if (!container) return;

    let items = [...this.state.records];

    // Filter by status
    if (this.state.activeFilter !== "all") {
      items = items.filter(r => {
        const s = (r.status || "").toLowerCase();
        if (this.state.activeFilter === "paid") return s.startsWith("paid");
        if (this.state.activeFilter === "pending") return s === "pending" || s === "due";
        if (this.state.activeFilter === "pending_verification") return s === "pending_verification";
        if (this.state.activeFilter === "rejected") return s === "rejected";
        return true;
      });
    }

    // Filter by search query
    if (this.state.searchQuery) {
      const q = this.state.searchQuery;
      items = items.filter(r => {
        const m = (r.month_name || "").toLowerCase();
        const ref = (r.ref_no || "").toLowerCase();
        const mode = (r.payment_method || "").toLowerCase();
        const notes = (r.notes || "").toLowerCase();
        return m.includes(q) || ref.includes(q) || mode.includes(q) || notes.includes(q);
      });
    }

    // Sort items
    items.sort((a, b) => {
      const keyA = a.month_key || a.due_date || "";
      const keyB = b.month_key || b.due_date || "";
      return this.state.sortOrder === "oldest" ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA);
    });

    if (items.length === 0) {
      container.innerHTML = "";
      container.style.display = "none";
      if (emptyState) {
        emptyState.style.display = "block";
        const emptyTitle = document.getElementById("res-maint-empty-title");
        const emptyDesc = document.getElementById("res-maint-empty-desc");
        if (this.state.searchQuery) {
          if (emptyTitle) emptyTitle.textContent = "No Matching Records";
          if (emptyDesc) emptyDesc.textContent = `No maintenance payments match "${this.state.searchQuery}".`;
        } else {
          if (emptyTitle) emptyTitle.textContent = "No Records in this Filter";
          if (emptyDesc) emptyDesc.textContent = "No payments found for the selected category.";
        }
      }
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    container.style.display = "flex";

    container.innerHTML = items.map(record => this.renderRecordCard(record)).join("");
  },

  /**
   * Render Individual Record Card
   */
  renderRecordCard(record) {
    const isPaid = (record.status || "").toLowerCase().startsWith("paid");
    const isPendingVerification = (record.status || "").toLowerCase() === "pending_verification";
    const isRejected = (record.status || "").toLowerCase() === "rejected";
    const isDue = (record.status || "").toLowerCase() === "pending" || (record.status || "").toLowerCase() === "due";

    // Format badge via GrihamStatusBadge
    let badgeHtml = "";
    if (typeof GrihamStatusBadge !== "undefined" && typeof GrihamStatusBadge.render === "function") {
      let label = record.status_label || record.status;
      if (isDue) label = "Payment Due";
      badgeHtml = GrihamStatusBadge.render({
        status: record.status || "Pending",
        label: label,
        variant: "badge"
      });
    } else {
      badgeHtml = `<span class="res-recent-badge badge-${isPaid ? 'paid' : (isPendingVerification ? 'verification' : (isRejected ? 'rejected' : 'due'))}">${record.status_label || record.status}</span>`;
    }

    // Payment method pill icon & label
    const method = record.payment_method || (isDue ? "Unpaid" : "Online");
    let methodIcon = "";
    if (method.toLowerCase().includes("cash")) {
      methodIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></svg>`;
    } else if (method.toLowerCase().includes("bank") || method.toLowerCase().includes("neft")) {
      methodIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"/></svg>`;
    } else {
      methodIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`;
    }

    const timingText = record.timing_info || (isPaid ? `Paid: ${record.payment_date || 'Settled'}` : `Due: ${record.due_date || '25 Sep 2026'}`);
    const refSnippet = record.ref_no ? `<code style="font-size:0.68rem; opacity:0.85; margin-left:auto;">${escapeHtml(record.ref_no)}</code>` : '';

    return `
      <div class="complaint-card res-service-item-card" onclick="GrihamResidentMaintenanceUI.openDetail('${record.id}')" role="button" tabindex="0" aria-label="Maintenance record for ${escapeHtml(record.month_name || 'Month')}" style="padding:0.9rem; cursor:pointer;">
        <!-- Top Row: Month and Status Badge -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <strong style="font-size:0.95rem; font-weight:800; color:var(--text-primary);">${escapeHtml(record.month_name || 'September 2026')}</strong>
          ${badgeHtml}
        </div>

        <!-- Middle Row: Amount & Payment Method -->
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.45rem;">
          <div style="font-family:var(--font-family-display); font-size:1.3rem; font-weight:800; color:${isPaid ? '#34d399' : 'var(--text-primary)'};">
            ${GrihamFormat.currency(record.amount || 3500)}
          </div>
          <span class="res-quick-pill" style="font-size:0.72rem; padding:0.18rem 0.55rem; background:rgba(255,255,255,0.06); display:flex; align-items:center; gap:0.35rem;">
            ${methodIcon}
            <span>${escapeHtml(method)}</span>
          </span>
        </div>

        <!-- Bottom Row: Timing info & Actions -->
        <div style="display:flex; align-items:center; justify-content:space-between; font-size:0.72rem; color:var(--text-muted); border-top:1px solid rgba(255,255,255,0.05); padding-top:0.45rem; margin-top:0.15rem;">
          <span style="display:flex; align-items:center; gap:0.35rem;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>${escapeHtml(timingText)}</span>
          </span>
          ${refSnippet}
        </div>
      </div>
    `;
  },

  /**
   * Open Record Detail Sheet
   */
  async openDetail(recordId) {
    const record = this.state.records.find(r => r.id === recordId || String(r.id) === String(recordId));
    if (!record) {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Maintenance record not found.", "warning");
      }
      return;
    }

    this.state.selectedRecord = record;
    this.renderDetailBody(record);

    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-res-maint-detail", "sheet-res-maint-detail-backdrop");
    }
  },

  closeDetail() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-res-maint-detail", "sheet-res-maint-detail-backdrop");
    }
  },

  /**
   * Render Detail Body Inside Bottom Sheet
   */
  renderDetailBody(record) {
    const bodyEl = document.getElementById("res-maint-detail-body");
    if (!bodyEl) return;

    const isPaid = (record.status || "").toLowerCase().startsWith("paid");
    const isPendingVerification = (record.status || "").toLowerCase() === "pending_verification";
    const isRejected = (record.status || "").toLowerCase() === "rejected";
    const isDue = (record.status || "").toLowerCase() === "pending" || (record.status || "").toLowerCase() === "due";

    // Status Badge
    let badgeHtml = "";
    if (typeof GrihamStatusBadge !== "undefined" && typeof GrihamStatusBadge.render === "function") {
      badgeHtml = GrihamStatusBadge.render({
        status: record.status || "Pending",
        label: record.status_label || record.status,
        variant: "badge"
      });
    } else {
      badgeHtml = `<span class="res-recent-badge badge-${isPaid ? 'paid' : (isPendingVerification ? 'verification' : (isRejected ? 'rejected' : 'due'))}">${record.status_label || record.status}</span>`;
    }

    // Special status banners
    let bannerHtml = "";
    if (isPendingVerification) {
      bannerHtml = `
        <div style="background:rgba(245, 158, 11, 0.12); border:1px solid rgba(245, 158, 11, 0.3); border-radius:var(--radius-md); padding:0.75rem; display:flex; gap:0.6rem; align-items:flex-start;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.3" style="flex-shrink:0; margin-top:0.1rem;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <div style="font-size:0.76rem; color:var(--text-secondary); line-height:1.4;">
            <strong style="color:var(--text-primary); display:block; margin-bottom:0.15rem;">Cash Receipt Under Review</strong>
            Submitted on ${record.submitted_at ? new Date(record.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'recently'}. Once society administration verifies the receipt, your status will update to <strong>Paid</strong>.
          </div>
        </div>
      `;
    } else if (isRejected) {
      bannerHtml = `
        <div style="background:rgba(239, 68, 68, 0.12); border:1px solid rgba(239, 68, 68, 0.3); border-radius:var(--radius-md); padding:0.75rem; display:flex; gap:0.6rem; align-items:flex-start;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.3" style="flex-shrink:0; margin-top:0.1rem;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <div style="font-size:0.76rem; color:var(--text-secondary); line-height:1.4;">
            <strong style="color:#ef4444; display:block; margin-bottom:0.15rem;">Payment Verification Rejected</strong>
            ${record.rejection_reason ? `<strong>Reason:</strong> ${escapeHtml(record.rejection_reason)}<br>` : ''}
            Please visit the society office or resubmit a valid cash receipt.
          </div>
        </div>
      `;
    } else if (isPaid && record.verified_by) {
      bannerHtml = `
        <div style="background:rgba(16, 185, 129, 0.1); border:1px solid rgba(16, 185, 129, 0.25); border-radius:var(--radius-md); padding:0.7rem; display:flex; gap:0.5rem; align-items:center;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span style="font-size:0.74rem; color:var(--text-secondary);">Verified by <strong>${escapeHtml(record.verified_by)}</strong></span>
        </div>
      `;
    }

    // Action buttons based on record state
    let actionButtonsHtml = "";
    if (isDue || isRejected) {
      actionButtonsHtml = `
        <button type="button" class="btn-primary-action btn-resident-style" onclick="GrihamResidentMaintenanceUI.payFromHome()" style="width:100%; min-height:44px; margin-top:0.25rem;">
          <span>Pay Maintenance Dues</span>
        </button>
      `;
    } else if (isPaid) {
      actionButtonsHtml = `
        <button type="button" class="btn-primary-action btn-resident-style" onclick="GrihamResidentMaintenanceUI.openOfficialReceipt('${record.id}')" style="width:100%; min-height:44px; margin-top:0.25rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="margin-right:0.35rem;"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          <span>View Official Society Receipt</span>
        </button>
      `;
    }

    // If uploaded receipt photo is present
    let receiptPhotoBtn = "";
    if (record.receipt_url || record.payment_method === "Cash") {
      receiptPhotoBtn = `
        <button type="button" class="res-quick-pill" onclick="GrihamResidentMaintenanceUI.openReceiptPhoto('${record.id}')" style="width:100%; justify-content:center; min-height:38px; font-size:0.78rem; background:rgba(255,255,255,0.06); border:1px solid var(--glass-border); cursor:pointer;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          <span>View Submitted Receipt Photo</span>
        </button>
      `;
    }

    bodyEl.innerHTML = `
      <!-- Hero Header -->
      <div style="background:var(--glass-bg-subtle); border:1px solid var(--divider-color); border-radius:var(--radius-md); padding:1rem; text-align:center;">
        <span style="font-size:0.74rem; color:var(--text-muted); text-transform:uppercase; font-weight:700; letter-spacing:0.04em;">${escapeHtml(record.month_name || 'September 2026')}</span>
        <div style="font-family:var(--font-family-display); font-size:1.8rem; font-weight:800; color:${isPaid ? '#34d399' : 'var(--text-primary)'}; margin:0.25rem 0 0.4rem;">
          ${GrihamFormat.currency(record.amount || 3500)}
        </div>
        <div style="display:flex; justify-content:center;">${badgeHtml}</div>
      </div>

      ${bannerHtml}

      <!-- Details List -->
      <div class="sheet-summary-list" style="background:rgba(255,255,255,0.03); border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:0.75rem 0.85rem; display:flex; flex-direction:column; gap:0.5rem; font-size:0.78rem;">
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Resident:</span>
          <strong style="color:var(--text-primary);">${escapeHtml(record.resident_name || 'Rajesh Kumar')}</strong>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Unit:</span>
          <span style="color:var(--text-primary);">Wing ${escapeHtml(record.wing || 'A')} • Flat ${escapeHtml(record.flat || '204')}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Due Date:</span>
          <span style="color:var(--text-primary);">${escapeHtml(record.due_date || '25 Sep 2026')}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Payment Mode:</span>
          <span style="color:var(--text-primary); font-weight:600;">${escapeHtml(record.payment_method || (isDue ? 'Unpaid' : 'Online'))}</span>
        </div>
        ${record.payment_date ? `
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Payment Date:</span>
          <span style="color:var(--text-primary);">${escapeHtml(record.payment_date)}</span>
        </div>` : ''}
        ${record.ref_no ? `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="color:var(--text-muted);">Reference ID:</span>
          <code style="font-size:0.74rem; color:var(--admin-accent); background:rgba(255,255,255,0.06); padding:0.1rem 0.35rem; border-radius:4px;">${escapeHtml(record.ref_no)}</code>
        </div>` : ''}
        ${record.notes ? `
        <div style="display:flex; flex-direction:column; gap:0.15rem; border-top:1px dashed var(--divider-color); padding-top:0.4rem; margin-top:0.2rem;">
          <span style="color:var(--text-muted);">Notes:</span>
          <span style="color:var(--text-secondary);">${escapeHtml(record.notes)}</span>
        </div>` : ''}
      </div>

      ${receiptPhotoBtn}

      ${actionButtonsHtml}
    `;
  },

  /**
   * Open Uploaded Receipt Photo Sheet
   */
  openReceiptPhoto(recordId) {
    const record = this.state.records.find(r => r.id === recordId || String(r.id) === String(recordId)) || this.state.selectedRecord;
    if (!record) return;

    const imgEl = document.getElementById("res-maint-photo-img");
    const metaEl = document.getElementById("res-maint-photo-meta");

    // Use actual receipt URL or high quality svg receipt simulation
    const src = record.receipt_url || this.generateReceiptSvgDataUri(record);
    if (imgEl) imgEl.src = src;

    if (metaEl) {
      metaEl.innerHTML = `
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Month:</span>
          <strong style="color:var(--text-primary);">${escapeHtml(record.month_name || 'September 2026')}</strong>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Amount:</span>
          <span style="color:#34d399; font-weight:700;">${GrihamFormat.currency(record.amount || 3500)}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Method:</span>
          <span>Cash Payment</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Submitted:</span>
          <span>${record.submitted_at ? new Date(record.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : (record.payment_date || 'Recent')}</span>
        </div>
      `;
    }

    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-res-maint-photo", "sheet-res-maint-photo-backdrop");
    }
  },

  closeReceiptPhoto() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-res-maint-photo", "sheet-res-maint-photo-backdrop");
    }
  },

  /**
   * Open Official Electronic Receipt Sheet
   */
  openOfficialReceipt(recordId) {
    const record = this.state.records.find(r => r.id === recordId || String(r.id) === String(recordId)) || this.state.selectedRecord;
    if (!record) return;

    this.renderOfficialReceiptBody(record);

    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-res-maint-official", "sheet-res-maint-official-backdrop");
    }
  },

  closeOfficialReceipt() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-res-maint-official", "sheet-res-maint-official-backdrop");
    }
  },

  /**
   * Render Official Society Receipt inside Sheet
   */
  renderOfficialReceiptBody(record) {
    const bodyEl = document.getElementById("res-maint-official-body");
    if (!bodyEl) return;

    const socName = (typeof GrihamAuth !== "undefined" && GrihamAuth.getSocietyId()) ? "Green Valley Residency" : "Griham Co-op Housing Society";
    const refNumber = record.ref_no || `REC-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const monthStr = record.month_name || "September 2026";

    bodyEl.innerHTML = `
      <div class="receipt-paper" style="margin:0;">
        <div class="receipt-header-row">
          <div class="receipt-soc-name">${escapeHtml(socName)}</div>
          <div class="receipt-type-title">Official Maintenance Receipt</div>
          <div style="font-size:0.7rem; color:var(--text-muted); margin-top:0.2rem;">Receipt No: ${escapeHtml(refNumber)}</div>
        </div>

        <div class="receipt-amount-box">
          <span style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase;">Amount Received</span>
          <div class="receipt-amount-val">${GrihamFormat.currency(record.amount || 3500)}</div>
          <span style="font-size:0.72rem; color:var(--color-brand-emerald); font-weight:700;">✓ Payment Verified &amp; Settled</span>
        </div>

        <div class="receipt-table">
          <div class="receipt-row">
            <span class="receipt-label">Resident:</span>
            <span class="receipt-val">${escapeHtml(record.resident_name || 'Rajesh Kumar')}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Flat / Unit:</span>
            <span class="receipt-val">Wing ${escapeHtml(record.wing || 'A')} • Flat ${escapeHtml(record.flat || '204')}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Maintenance Month:</span>
            <span class="receipt-val">${escapeHtml(monthStr)}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Payment Date:</span>
            <span class="receipt-val">${escapeHtml(record.payment_date || 'Recorded')}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Payment Mode:</span>
            <span class="receipt-val">${escapeHtml(record.payment_method || 'Online (UPI)')}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Reference ID:</span>
            <span class="receipt-val"><code style="font-size:0.75rem;">${escapeHtml(refNumber)}</code></span>
          </div>
        </div>

        <div style="text-align:center; font-size:0.7rem; color:var(--text-muted); margin-top:0.45rem; border-top:1px dashed var(--divider-color); padding-top:0.5rem;">
          This is an electronic society receipt generated by Griham.
        </div>
      </div>

      <button type="button" class="btn-primary-action btn-resident-style" onclick="GrihamResidentMaintenanceUI.closeOfficialReceipt()" style="width:100%; min-height:44px; margin-top:0.25rem;">
        <span>Done</span>
      </button>
    `;
  },

  /**
   * Navigate to Resident Home Pay Maintenance Flow
   */
  payFromHome() {
    this.closeDetail();
    if (typeof GrihamRouter !== "undefined") {
      GrihamRouter.navigate('/resident/home');
      setTimeout(() => {
        if (typeof GrihamResidentHomeUI !== "undefined" && typeof GrihamResidentHomeUI.openMaintenance === "function") {
          GrihamResidentHomeUI.openMaintenance();
        }
      }, 150);
    }
  },

  /**
   * Helper: Generate Clean Inline SVG Receipt for Cash Photo fallback
   */
  generateReceiptSvgDataUri(record) {
    const ref = record.ref_no || "CASH-REC-1049";
    const date = record.payment_date || "05 Jun 2026";
    const amt = record.amount || 3500;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="520" viewBox="0 0 400 520" fill="none">
        <rect width="400" height="520" rx="8" fill="#FDFBF7"/>
        <rect x="15" y="15" width="370" height="490" rx="4" stroke="#D1C7B7" stroke-width="2" stroke-dasharray="6 4" fill="none"/>
        <text x="200" y="55" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#292524">GREEN VALLEY RESIDENCY</text>
        <text x="200" y="75" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#78716C">SOCIETY MAINTENANCE CASH RECEIPT</text>
        <line x1="30" y1="95" x2="370" y2="95" stroke="#E7E5E4" stroke-width="1.5"/>
        <text x="35" y="125" font-family="sans-serif" font-size="12" fill="#78716C">Receipt No:</text>
        <text x="365" y="125" font-family="monospace" font-size="12" font-weight="bold" text-anchor="end" fill="#1C1917">${ref}</text>
        <text x="35" y="155" font-family="sans-serif" font-size="12" fill="#78716C">Date:</text>
        <text x="365" y="155" font-family="sans-serif" font-size="12" text-anchor="end" fill="#1C1917">${date}</text>
        <text x="35" y="185" font-family="sans-serif" font-size="12" fill="#78716C">Resident:</text>
        <text x="365" y="185" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="end" fill="#1C1917">Rajesh Kumar (A-204)</text>
        <text x="35" y="215" font-family="sans-serif" font-size="12" fill="#78716C">Month:</text>
        <text x="365" y="215" font-family="sans-serif" font-size="12" text-anchor="end" fill="#1C1917">${record.month_name || 'June 2026'}</text>
        <line x1="30" y1="240" x2="370" y2="240" stroke="#E7E5E4" stroke-width="1"/>
        <rect x="35" y="260" width="330" height="75" rx="6" fill="#F5F5F4"/>
        <text x="200" y="290" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#78716C">TOTAL AMOUNT RECEIVED (CASH)</text>
        <text x="200" y="322" font-family="sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#059669">₹${amt.toLocaleString('en-IN')}</text>
        <text x="200" y="380" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#A8A29E">Received at society manager office desk</text>
        <circle cx="200" cy="430" r="32" stroke="#10B981" stroke-width="2.5" fill="none" opacity="0.8"/>
        <text x="200" y="426" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle" fill="#10B981" opacity="0.9">PAID IN CASH</text>
        <text x="200" y="440" font-family="sans-serif" font-size="9" text-anchor="middle" fill="#10B981" opacity="0.9">SOCIETY DESK</text>
        <text x="200" y="485" font-family="sans-serif" font-size="10" text-anchor="middle" fill="#78716C">Authorized Signatory • Manager</text>
      </svg>
    `.trim();
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
};
