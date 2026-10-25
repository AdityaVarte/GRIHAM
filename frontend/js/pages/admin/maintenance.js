
/* HTML TEMPLATE EXTRACTED FROM index.html */
window.HTML_MAINTENANCE = `
<div class="sheet-backdrop" id="maint-receipt-backdrop" onclick="GrihamAdminMaintenanceUI.closeReceipt()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="maint-receipt-sheet" role="dialog" aria-modal="true" aria-labelledby="maint-receipt-modal-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminMaintenanceUI.closeReceipt()" aria-label="Close receipt" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="maint-receipt-modal-title" data-i18n="maint_receipt_title">Maintenance Receipt</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <div id="maint-receipt-body" style="display:flex; flex-direction:column; gap:0.9rem; padding: 0.25rem 0;">
      <!-- Dynamically filled by JS -->
    </div>
  </div>

  <!-- Cash Receipt Image Preview Modal -->
  <div class="sheet-backdrop" id="modal-admin-receipt-preview-backdrop" onclick="GrihamAdminMaintenanceUI.closeReceiptPreview()" aria-hidden="true"></div>
  <div class="mobile-bottom-sheet" id="modal-admin-receipt-preview" role="dialog" aria-modal="true" aria-labelledby="admin-receipt-preview-title" aria-hidden="true" style="max-height:88vh;">
    <div class="sheet-handle" aria-hidden="true"></div>
    <div class="sheet-header-row">
      <button type="button" class="btn-sheet-back" onclick="GrihamAdminMaintenanceUI.closeReceiptPreview()" aria-label="Close receipt preview">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="admin-receipt-preview-title">Receipt Photo</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>
    <div style="padding:0.5rem 0 1rem; display:flex; flex-direction:column; align-items:center; gap:0.75rem;">
      <div style="width:100%; max-height:60vh; overflow:auto; border-radius:var(--radius-md); background:#0f172a; display:flex; justify-content:center; align-items:center; border:1px solid rgba(255,255,255,0.1);">
        <img id="admin-receipt-full-img" src="" alt="Payment Receipt" style="max-width:100%; max-height:55vh; object-fit:contain;">
      </div>
      <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminMaintenanceUI.closeReceiptPreview()" style="width:100%; min-height:44px;">
        <span>Close</span>
      </button>
    </div>
  </div>

  <!-- Approve Cash Payment Confirmation Modal -->
  <div class="sheet-backdrop" id="modal-admin-approve-payment-backdrop" onclick="GrihamAdminMaintenanceUI.closeApproveModal()" aria-hidden="true"></div>
  <div class="mobile-bottom-sheet" id="modal-admin-approve-payment" role="dialog" aria-modal="true" aria-labelledby="admin-approve-modal-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>
    <div class="sheet-header-row">
      <button type="button" class="btn-sheet-back" onclick="GrihamAdminMaintenanceUI.closeApproveModal()" aria-label="Cancel approval">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="admin-approve-modal-title">Approve Cash Payment</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>
    <div style="padding:0.5rem 0 1rem; display:flex; flex-direction:column; gap:0.9rem;">
      <div style="display:flex; align-items:center; gap:0.75rem; background:rgba(16, 185, 129, 0.1); border:1px solid rgba(16, 185, 129, 0.25); border-radius:var(--radius-md); padding:0.85rem;">
        <div style="width:40px; height:40px; border-radius:50%; background:rgba(16, 185, 129, 0.2); color:#10b981; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div>
          <div style="font-weight:700; color:var(--text-primary); font-size:0.92rem;" id="admin-approve-summary-unit">Wing A - Flat 204</div>
          <div style="font-size:0.78rem; color:var(--text-secondary);" id="admin-approve-summary-amount">Amount: ₹2,500 • September 2026</div>
        </div>
      </div>
      <p style="font-size:calc(0.82rem * var(--font-scale)); color:var(--text-secondary); margin:0; line-height:1.45;">
        You are approving this cash maintenance payment. This will verify the submitted receipt and mark the resident's status as <strong>Paid</strong>.
      </p>
      <div style="display:flex; gap:0.6rem; margin-top:0.4rem;">
        <button type="button" class="btn-filter-chip" onclick="GrihamAdminMaintenanceUI.closeApproveModal()" style="flex:1; min-height:44px; justify-content:center;">Cancel</button>
        <button type="button" id="btn-admin-confirm-approve" class="btn-primary-action" onclick="GrihamAdminMaintenanceUI.confirmApprovePayment()" style="flex:1; min-height:44px; background:linear-gradient(135deg, #059669 0%, #10b981 100%); color:#fff; border:none; font-weight:700;">
          <span id="btn-admin-confirm-approve-text">Approve Payment</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Reject Cash Payment Modal -->
  <div class="sheet-backdrop" id="modal-admin-reject-payment-backdrop" onclick="GrihamAdminMaintenanceUI.closeRejectModal()" aria-hidden="true"></div>
  <div class="mobile-bottom-sheet" id="modal-admin-reject-payment" role="dialog" aria-modal="true" aria-labelledby="admin-reject-modal-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>
    <div class="sheet-header-row">
      <button type="button" class="btn-sheet-back" onclick="GrihamAdminMaintenanceUI.closeRejectModal()" aria-label="Cancel rejection">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="admin-reject-modal-title" style="color:#ef4444;">Reject Cash Payment</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>
    <div style="padding:0.5rem 0 1rem; display:flex; flex-direction:column; gap:0.75rem;">
      <p style="font-size:calc(0.82rem * var(--font-scale)); color:var(--text-secondary); margin:0; line-height:1.45;">
        A rejection reason is required so the resident knows why their receipt was rejected and can submit a corrected receipt.
      </p>
      <div class="form-group">
        <label class="form-label" for="input-admin-reject-reason" style="font-size:0.8rem; font-weight:700;">Rejection Reason <span style="color:#ef4444;">*</span></label>
        <textarea id="input-admin-reject-reason" class="form-input" rows="3" placeholder="e.g. Receipt photo is unclear or amount does not match ₹2,500." style="width:100%; resize:none; font-family:inherit; padding:0.6rem;"></textarea>
        <div id="admin-reject-error" style="color:#ef4444; font-size:0.75rem; display:none; margin-top:0.35rem; font-weight:600;">Rejection reason is required.</div>
      </div>
      <div style="display:flex; gap:0.6rem; margin-top:0.25rem;">
        <button type="button" class="btn-filter-chip" onclick="GrihamAdminMaintenanceUI.closeRejectModal()" style="flex:1; min-height:44px; justify-content:center;">Cancel</button>
        <button type="button" id="btn-admin-confirm-reject" class="btn-primary-action" onclick="GrihamAdminMaintenanceUI.confirmRejectPayment()" style="flex:1; min-height:44px; background:linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color:#fff; border:none; font-weight:700;">
          <span id="btn-admin-confirm-reject-text">Reject Payment</span>
        </button>
      </div>
    </div>
  </div>

<section id="screen-admin-maintenance" class="app-view" aria-labelledby="maintenance-header-title">
        
        <!-- Screen Top Bar -->
        <div class="screen-top-bar" style="width:100%;">
          ${GrihamHeader.renderBackButton({
            target: '/admin/home',
            id: 'btn-maint-back',
            ariaLabel: 'Back to Admin Dashboard'
          })}
          
          <h1 class="top-bar-title" id="maintenance-header-title" data-i18n="maint_page_title">Maintenance</h1>

          <button type="button" class="btn-top-action" onclick="GrihamAdminMaintenanceUI.openMyMaintenance()" title="My Maintenance" aria-label="View My Maintenance">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </button>
        </div>

        <!-- Month Navigation Selector -->
        <div class="maint-month-selector" role="region" aria-label="Select month">
          <button type="button" class="btn-month-nav" id="btn-maint-prev-month" onclick="GrihamAdminMaintenanceUI.prevMonth()" aria-label="Previous Month">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div class="maint-month-display">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="month-cal-icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span id="maint-current-month-display" style="font-weight:700;">September 2026</span>
          </div>
          <button type="button" class="btn-month-nav" id="btn-maint-next-month" onclick="GrihamAdminMaintenanceUI.nextMonth()" aria-label="Next Month">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        <!-- Maintenance Overview Glass Card -->
        <div class="maint-overview-card" id="maint-overview-card">
          <div class="maint-card-header">
            <div>
              <span class="maint-badge-tag" data-i18n="maint_overview_title">Maintenance Overview</span>
              <div class="maint-due-note" id="maint-due-date-label">Due Date: 6th of the month</div>
            </div>
            <div class="maint-pct-pill" id="maint-progress-pct-badge">
              <span id="maint-page-progress-pct">87.9%</span> Collected
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="maint-progress-wrap" aria-label="Collection Progress">
            <div class="maint-progress-track">
              <div class="maint-progress-bar" id="maint-page-progress-fill" style="width: 87.9%;"></div>
            </div>
          </div>

          <!-- 3-Column Financial Metrics -->
          <div class="maint-stats-grid">
            <div class="maint-stat-item">
              <span class="maint-stat-label" data-i18n="maint_expected">Expected</span>
              <span class="maint-stat-val text-muted" id="maint-stat-expected">₹2,10,000</span>
            </div>
            <div class="maint-stat-item">
              <span class="maint-stat-label" data-i18n="maint_collected">Collected</span>
              <span class="maint-stat-val text-success" id="maint-stat-collected">₹1,84,500</span>
            </div>
            <div class="maint-stat-item">
              <span class="maint-stat-label" data-i18n="maint_pending">Pending</span>
              <span class="maint-stat-val text-danger" id="maint-stat-pending">₹25,500</span>
            </div>
          </div>
        </div>

        <!-- Payment Status Summary Chips Grid -->
        <div class="maint-status-summary-grid" role="region" aria-label="Payment Status Breakdown">
          <!-- Paid Early -->
          <button type="button" class="maint-status-card early" onclick="GrihamAdminMaintenanceUI.setFilter('paid_early')">
            <div class="status-card-top">
              <div class="status-icon-pill early">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <span class="status-count-val" id="maint-count-early">12</span>
            </div>
            <span class="status-name" data-i18n="maint_paid_early">Paid Early</span>
          </button>

          <!-- Paid On Time -->
          <button type="button" class="maint-status-card ontime" onclick="GrihamAdminMaintenanceUI.setFilter('paid_ontime')">
            <div class="status-card-top">
              <div class="status-icon-pill ontime">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span class="status-count-val" id="maint-count-ontime">31</span>
            </div>
            <span class="status-name" data-i18n="maint_paid_ontime">Paid On Time</span>
          </button>

          <!-- Paid Late -->
          <button type="button" class="maint-status-card late" onclick="GrihamAdminMaintenanceUI.setFilter('paid_late')">
            <div class="status-card-top">
              <div class="status-icon-pill late">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <span class="status-count-val" id="maint-count-late">8</span>
            </div>
            <span class="status-name" data-i18n="maint_paid_late">Paid Late</span>
          </button>

          <!-- Pending -->
          <button type="button" class="maint-status-card pending" onclick="GrihamAdminMaintenanceUI.setFilter('pending')">
            <div class="status-card-top">
              <div class="status-icon-pill pending">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <span class="status-count-val" id="maint-count-pending">4</span>
            </div>
            <span class="status-name" data-i18n="maint_pending">Pending</span>
          </button>

          <!-- Pending Verification -->
          <button type="button" class="maint-status-card verification" onclick="GrihamAdminMaintenanceUI.setFilter('pending_verification')">
            <div class="status-card-top">
              <div class="status-icon-pill verification">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
              </div>
              <span class="status-count-val" id="maint-count-verification">0</span>
            </div>
            <span class="status-name">Review</span>
          </button>
        </div>

        <!-- Segmented Navigation Tabs -->
        <div class="maint-nav-tabs" role="tablist" aria-label="Maintenance Views">
          <button type="button" class="maint-tab-btn active" id="tab-maint-residents" onclick="GrihamAdminMaintenanceUI.switchTab('residents')" role="tab" aria-selected="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span data-i18n="maint_tab_payments">Resident Payments</span>
          </button>
          <button type="button" class="maint-tab-btn" id="tab-maint-history" onclick="GrihamAdminMaintenanceUI.switchTab('history')" role="tab" aria-selected="false">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span data-i18n="maint_tab_history">Monthly History</span>
          </button>
          <button type="button" class="maint-tab-btn" id="tab-maint-my" onclick="GrihamAdminMaintenanceUI.switchTab('my')" role="tab" aria-selected="false">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <span data-i18n="maint_tab_my">My Unit</span>
          </button>
        </div>

        <!-- TAB 1: RESIDENT PAYMENTS PANEL -->
        <div class="maint-panel-view" id="panel-maint-residents">
          
          <!-- Search & Sort Row -->
          <div class="maint-controls-bar">
            <div class="input-wrapper maint-search-wrapper">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="input-icon-left" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="maint-search-input" class="form-input maint-search-input" placeholder="Search resident or flat..." oninput="GrihamAdminMaintenanceUI.handleSearch(this.value)" aria-label="Search resident or flat">
            </div>

            <div class="maint-sort-wrapper">
              <select id="maint-sort-select" class="form-select maint-sort-select" onchange="GrihamAdminMaintenanceUI.handleSort(this.value)" aria-label="Sort resident payments">
                <option value="flat">Flat No.</option>
                <option value="name">Name A–Z</option>
                <option value="amount_desc">Highest ₹</option>
                <option value="amount_asc">Lowest ₹</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>

          <!-- Filter Chips Scrollable Bar -->
          <div class="maint-filter-chips-bar" role="group" aria-label="Filter Resident Payments">
            <button type="button" class="btn-filter-chip active" data-maint-filter="all" onclick="GrihamAdminMaintenanceUI.setFilter('all')">All</button>
            <button type="button" class="btn-filter-chip" data-maint-filter="paid" onclick="GrihamAdminMaintenanceUI.setFilter('paid')">Paid</button>
            <button type="button" class="btn-filter-chip" data-maint-filter="pending" onclick="GrihamAdminMaintenanceUI.setFilter('pending')">Pending</button>
            <button type="button" class="btn-filter-chip" data-maint-filter="pending_verification" onclick="GrihamAdminMaintenanceUI.setFilter('pending_verification')">Needs Review</button>
            <button type="button" class="btn-filter-chip" data-maint-filter="rejected" onclick="GrihamAdminMaintenanceUI.setFilter('rejected')">Rejected</button>
            <button type="button" class="btn-filter-chip" data-maint-filter="paid_early" onclick="GrihamAdminMaintenanceUI.setFilter('paid_early')">Paid Early</button>
            <button type="button" class="btn-filter-chip" data-maint-filter="paid_ontime" onclick="GrihamAdminMaintenanceUI.setFilter('paid_ontime')">Paid On Time</button>
            <button type="button" class="btn-filter-chip" data-maint-filter="paid_late" onclick="GrihamAdminMaintenanceUI.setFilter('paid_late')">Paid Late</button>
          </div>

          <!-- Skeletons Loader -->
          <div id="maint-residents-skeleton" style="display:none; flex-direction:column; gap:0.65rem; margin-top:0.75rem;">
            <div class="dash-skeleton-card" style="height: 74px;"></div>
            <div class="dash-skeleton-card" style="height: 74px;"></div>
            <div class="dash-skeleton-card" style="height: 74px;"></div>
            <div class="dash-skeleton-card" style="height: 74px;"></div>
          </div>

          <!-- Resident Payments List -->
          <div class="maint-residents-list" id="maint-residents-list">
            <!-- Dynamically populated by JS -->
          </div>

          <!-- Empty State Container -->
          <div class="maint-empty-card" id="maint-residents-empty" style="display:none;">
            <div class="empty-icon-pill" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <h3 class="empty-title" id="maint-empty-heading">No residents found</h3>
            <p class="empty-desc" id="maint-empty-desc">No payments match your current search and filter criteria.</p>
          </div>

          <!-- Error State Container -->
          <div class="maint-error-card" id="maint-error-state" style="display:none;">
            <p style="font-weight:600; color:var(--text-primary); margin-bottom:0.5rem;">Unable to load maintenance data.</p>
            <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminMaintenanceUI.loadData(true)" style="min-height:38px; font-size:0.82rem; padding:0.4rem 1.2rem;">
              <span data-i18n="btn_try_again">Try Again</span>
            </button>
          </div>

        </div>

        <!-- TAB 2: MONTHLY HISTORY PANEL -->
        <div class="maint-panel-view" id="panel-maint-history" style="display:none;">
          <div class="maint-history-list" id="maint-history-list">
            <!-- Dynamically populated by JS -->
          </div>
        </div>

        <!-- TAB 3: MY UNIT MAINTENANCE PANEL -->
        <div class="maint-panel-view" id="panel-maint-my" style="display:none;">
          <div class="maint-my-content" id="maint-my-content">
            <!-- Dynamically populated by JS -->
          </div>
        </div>

      </section>
`;
const GrihamAdminMaintenanceUI = {
  availableMonths: ["2026-09", "2026-08", "2026-07", "2026-06", "2026-05"],
  currentMonthIndex: 0,
  activeTab: "residents", // 'residents' | 'history' | 'my'
  searchQuery: "",
  activeFilter: "all", // 'all' | 'paid' | 'pending' | 'paid_early' | 'paid_ontime' | 'paid_late'
  currentSort: "flat", // 'flat' | 'name' | 'amount_desc' | 'amount_asc' | 'status'
  selectedPayment: null,
  summaryData: null,
  paymentsList: [],
  historyList: [],
  myMaintenanceData: null,
  isLoading: false,

  init() {
    this.searchQuery = "";
    this.activeFilter = "all";
    this.currentSort = "flat";
    this.activeTab = "residents";
    this.switchTab("residents");
    this.loadData();
  },

  async loadData(forceRefresh = false) {
    if (this.isLoading && !forceRefresh) return;
    this.isLoading = true;

    const monthKey = this.availableMonths[this.currentMonthIndex] || "2026-09";
    const skeletonEl = document.getElementById("maint-residents-skeleton");
    const listEl = document.getElementById("maint-residents-list");
    const emptyEl = document.getElementById("maint-residents-empty");
    const errorEl = document.getElementById("maint-error-state");

    if (skeletonEl) skeletonEl.style.display = "flex";
    if (listEl) listEl.style.display = "none";
    if (emptyEl) emptyEl.style.display = "none";
    if (errorEl) errorEl.style.display = "none";

    try {
      const [summaryRes, paymentsRes] = await Promise.all([
        getMaintenanceSummary(monthKey),
        getMaintenancePayments(monthKey)
      ]);

      this.summaryData = summaryRes.data;
      this.paymentsList = paymentsRes.payments || [];

      this.renderSummary(this.summaryData);
      this.renderResidents();

      if (skeletonEl) skeletonEl.style.display = "none";
      if (listEl) listEl.style.display = "flex";
    } catch (err) {
      console.error("[Maintenance UI] Load data error:", err);
      if (skeletonEl) skeletonEl.style.display = "none";
      if (errorEl) errorEl.style.display = "flex";
    } finally {
      this.isLoading = false;
    }
  },

  prevMonth() {
    if (this.currentMonthIndex < this.availableMonths.length - 1) {
      this.currentMonthIndex++;
      this.loadData(true);
    }
  },

  nextMonth() {
    if (this.currentMonthIndex > 0) {
      this.currentMonthIndex--;
      this.loadData(true);
    }
  },

  selectMonth(monthKey) {
    const idx = this.availableMonths.indexOf(monthKey);
    if (idx !== -1) {
      this.currentMonthIndex = idx;
      this.switchTab("residents");
      this.loadData(true);
    }
  },

  renderSummary(d) {
    if (!d) return;

    const monthDisplay = document.getElementById("maint-current-month-display");
    if (monthDisplay) monthDisplay.textContent = d.month_name;

    const dueLabel = document.getElementById("maint-due-date-label");
    if (dueLabel) dueLabel.textContent = `Due Date: ${d.due_date || '6th of the month'}`;

    const prevBtn = document.getElementById("btn-maint-prev-month");
    const nextBtn = document.getElementById("btn-maint-next-month");
    if (prevBtn) prevBtn.disabled = this.currentMonthIndex >= this.availableMonths.length - 1;
    if (nextBtn) nextBtn.disabled = this.currentMonthIndex <= 0;

    const expEl = document.getElementById("maint-stat-expected");
    const colEl = document.getElementById("maint-stat-collected");
    const penEl = document.getElementById("maint-stat-pending");
    const fillEl = document.getElementById("maint-page-progress-fill");
    const pctEl = document.getElementById("maint-page-progress-pct");

    if (expEl) expEl.textContent = GrihamFormat.currency(d.expected);
    if (colEl) colEl.textContent = GrihamFormat.currency(d.collected);
    if (penEl) penEl.textContent = GrihamFormat.currency(d.pending);
    if (fillEl) fillEl.style.width = `${Math.min(100, d.percentage || 0)}%`;
    if (pctEl) pctEl.textContent = `${d.percentage || 0}%`;

    const counts = d.status_counts || {};
    const countEarly = document.getElementById("maint-count-early");
    const countOntime = document.getElementById("maint-count-ontime");
    const countLate = document.getElementById("maint-count-late");
    const countPending = document.getElementById("maint-count-pending");
    const countVerification = document.getElementById("maint-count-verification");

    if (countEarly) countEarly.textContent = counts.paid_early ?? 0;
    if (countOntime) countOntime.textContent = counts.paid_ontime ?? 0;
    if (countLate) countLate.textContent = counts.paid_late ?? 0;
    if (countPending) countPending.textContent = counts.pending ?? 0;
    if (countVerification) countVerification.textContent = counts.pending_verification ?? 0;
  },

  switchTab(tab) {
    this.activeTab = tab;
    if (typeof GrihamTabs !== "undefined") {
      GrihamTabs.activate(".maint-tab-row", `tab-maint-${tab}`);
    } else {
      document.querySelectorAll(".maint-tab-btn").forEach(btn => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });
      const activeBtn = document.getElementById(`tab-maint-${tab}`);
      if (activeBtn) {
        activeBtn.classList.add("active");
        activeBtn.setAttribute("aria-selected", "true");
      }
    }

    const panelResidents = document.getElementById("panel-maint-residents");
    const panelHistory = document.getElementById("panel-maint-history");
    const panelMy = document.getElementById("panel-maint-my");

    if (panelResidents) panelResidents.style.display = tab === "residents" ? "block" : "none";
    if (panelHistory) panelHistory.style.display = tab === "history" ? "block" : "none";
    if (panelMy) panelMy.style.display = tab === "my" ? "block" : "none";

    if (tab === "history") {
      this.loadHistory();
    } else if (tab === "my") {
      this.loadMyMaintenance();
    }
  },

  handleSearch(query) {
    this.searchQuery = (query || "").trim().toLowerCase();
    this.renderResidents();
  },

  setFilter(filterName) {
    this.activeFilter = filterName;
    document.querySelectorAll(".maint-filter-chips-bar .btn-filter-chip").forEach(chip => {
      chip.classList.toggle("active", chip.dataset.maintFilter === filterName);
    });
    this.renderResidents();
  },

  handleSort(sortKey) {
    this.currentSort = sortKey;
    this.renderResidents();
  },

  renderResidents() {
    const listEl = document.getElementById("maint-residents-list");
    const emptyEl = document.getElementById("maint-residents-empty");
    if (!listEl) return;

    let filtered = [...this.paymentsList];

    // Search filter
    if (this.searchQuery) {
      filtered = filtered.filter(p => 
        (p.resident_name && p.resident_name.toLowerCase().includes(this.searchQuery)) ||
        (p.flat && String(p.flat).toLowerCase().includes(this.searchQuery)) ||
        (p.wing && p.wing.toLowerCase().includes(this.searchQuery)) ||
        (`${p.wing}-${p.flat}`.toLowerCase().includes(this.searchQuery))
      );
    }

    // Status filter
    if (this.activeFilter === "paid") {
      filtered = filtered.filter(p => p.status && p.status.startsWith("paid_"));
    } else if (this.activeFilter === "pending") {
      filtered = filtered.filter(p => p.status === "pending");
    } else if (this.activeFilter === "pending_verification") {
      filtered = filtered.filter(p => p.status === "pending_verification");
    } else if (this.activeFilter === "rejected") {
      filtered = filtered.filter(p => p.status === "rejected");
    } else if (this.activeFilter === "paid_early") {
      filtered = filtered.filter(p => p.status === "paid_early");
    } else if (this.activeFilter === "paid_ontime") {
      filtered = filtered.filter(p => p.status === "paid_ontime");
    } else if (this.activeFilter === "paid_late") {
      filtered = filtered.filter(p => p.status === "paid_late");
    }

    // Sorting
    filtered.sort((a, b) => {
      if (this.currentSort === "flat") {
        return (a.wing + a.flat).localeCompare(b.wing + b.flat);
      } else if (this.currentSort === "name") {
        return (a.resident_name || "").localeCompare(b.resident_name || "");
      } else if (this.currentSort === "amount_desc") {
        return (b.amount || 0) - (a.amount || 0);
      } else if (this.currentSort === "amount_asc") {
        return (a.amount || 0) - (b.amount || 0);
      } else if (this.currentSort === "status") {
        return (a.status || "").localeCompare(b.status || "");
      }
      return 0;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = "";
      listEl.style.display = "none";
      if (emptyEl) emptyEl.style.display = "flex";
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";
    listEl.style.display = "flex";

    listEl.innerHTML = filtered.map(p => {
      const isPending = p.status === "pending";
      const isPendingVerification = p.status === "pending_verification";
      const isRejected = p.status === "rejected";
      const statusClass = p.status || "pending";
      let statusLabel = isPending ? "Pending" : (p.status_label || (p.status === "paid_early" ? "Paid Early" : p.status === "paid_late" ? "Paid Late" : "Paid On Time"));
      if (isPendingVerification) statusLabel = "Pending Verification";
      if (isRejected) statusLabel = "Rejected";
      
      let timingSubtitle = "";
      if (isPendingVerification) {
        timingSubtitle = `<span style="color:#f59e0b; font-weight:600;">Cash receipt submitted • Needs Review</span>`;
      } else if (isRejected) {
        timingSubtitle = `<span style="color:#ef4444; font-weight:600;">Rejected: ${escapeHtml(p.rejection_reason || 'Invalid receipt')}</span>`;
      } else if (isPending) {
        timingSubtitle = `<span style="color:#f87171;">Due: ${escapeHtml(p.due_date || '6th of month')}</span>`;
      } else {
        timingSubtitle = `<span>Paid: ${escapeHtml(p.payment_date || 'Yes')} • ${escapeHtml(p.timing_info || 'On time')}</span>`;
      }

      const methodBadge = p.payment_method ? `<span class="maint-meta-pill"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> ${escapeHtml(p.payment_method)}</span>` : "";

      return `
        <article class="maint-resident-card" onclick="GrihamAdminMaintenanceUI.openPaymentDetail('${p.id}')" tabindex="0" role="button" aria-label="View payment details for ${escapeHtml(p.resident_name)} flat ${p.wing}-${p.flat}">
          <div class="maint-resident-top">
            <div class="maint-res-info">
              <h3 class="maint-res-name">${escapeHtml(p.resident_name)}</h3>
              <span class="maint-res-unit">${escapeHtml(p.wing)} Wing • Flat ${escapeHtml(p.flat)}</span>
            </div>
            <div class="maint-res-amount-col">
              <span class="maint-res-amount">${GrihamFormat.currency(p.amount || 3500)}</span>
              <span class="maint-status-chip ${statusClass}">${statusLabel}</span>
            </div>
          </div>
          <div class="maint-resident-bottom">
            <div>${timingSubtitle}</div>
            <div>${methodBadge}</div>
          </div>
        </article>
      `;
    }).join("");
  },

  openPaymentDetail(paymentId) {
    const payment = this.paymentsList.find(p => p.id === paymentId) || (this.myMaintenanceData && this.myMaintenanceData.history && this.myMaintenanceData.history.find(p => p.id === paymentId));
    if (!payment) return;
    this.selectedPayment = payment;

    const bodyEl = document.getElementById("maint-detail-body");
    if (!bodyEl) return;

    const isPending = payment.status === "pending";
    const isPendingVerification = payment.status === "pending_verification";
    const isRejected = payment.status === "rejected";
    const statusClass = payment.status || "pending";
    let statusLabel = isPending ? "Pending" : (payment.status_label || (payment.status === "paid_early" ? "Paid Early" : payment.status === "paid_late" ? "Paid Late" : "Paid On Time"));
    if (isPendingVerification) statusLabel = "Pending Verification";
    if (isRejected) statusLabel = "Rejected";

    const submittedDateStr = payment.submitted_at ? new Date(payment.submitted_at).toLocaleString('en-IN', { day:'numeric', month:'short', year:'numeric', hour:'numeric', minute:'numeric' }) : "";

    bodyEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em;">Unit</span>
          <h2 style="font-family:var(--font-family-display); font-size:calc(1.15rem * var(--font-scale)); font-weight:800; color:var(--text-primary); margin:0;">
            ${escapeHtml(payment.wing)} Wing • Flat ${escapeHtml(payment.flat)}
          </h2>
        </div>
        <span class="maint-status-chip ${statusClass}" style="font-size:0.75rem; padding:0.3rem 0.75rem;">${statusLabel}</span>
      </div>

      <div style="background:var(--btn-secondary-bg); border:1px solid var(--btn-secondary-border); border-radius:var(--radius-md); padding:0.85rem; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted);">Resident Name</span>
          <div style="font-weight:700; color:var(--text-primary); font-size:calc(0.95rem * var(--font-scale));">${escapeHtml(payment.resident_name)}</div>
        </div>
        <div style="text-align:right;">
          <span style="font-size:0.75rem; color:var(--text-muted);">Amount</span>
          <div style="font-family:var(--font-family-display); font-size:calc(1.2rem * var(--font-scale)); font-weight:800; color:var(--text-primary);">${GrihamFormat.currency(payment.amount || 3500)}</div>
        </div>
      </div>

      ${isRejected ? `
        <div style="background:rgba(239, 68, 68, 0.12); border:1px solid rgba(239,68,68,0.3); border-radius:var(--radius-sm); padding:0.75rem; margin:0.2rem 0;">
          <div style="font-weight:700; color:#ef4444; font-size:0.82rem; margin-bottom:0.25rem;">Payment Rejected by Admin</div>
          <div style="font-size:0.78rem; color:var(--text-secondary); line-height:1.4;">Reason: <strong>"${escapeHtml(payment.rejection_reason || 'Receipt invalid')}"</strong></div>
        </div>
      ` : ''}

      ${isPendingVerification ? `
        <div style="background:rgba(245, 158, 11, 0.12); border:1px solid rgba(245,158,11,0.3); border-radius:var(--radius-sm); padding:0.75rem; margin:0.2rem 0;">
          <div style="font-weight:700; color:#f59e0b; font-size:0.82rem; margin-bottom:0.25rem;">Cash Payment Submitted</div>
          <div style="font-size:0.78rem; color:var(--text-secondary);">Resident reported cash payment with receipt. Please review and verify.</div>
        </div>
      ` : ''}

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; font-size:calc(0.8rem * var(--font-scale)); background:var(--glass-bg-subtle); border:1px solid var(--divider-color); border-radius:var(--radius-sm); padding:0.75rem 0.85rem;">
        <div><span style="color:var(--text-muted);">Month:</span> <strong>${escapeHtml(this.summaryData?.month_name || 'September 2026')}</strong></div>
        <div><span style="color:var(--text-muted);">Due Date:</span> <strong>${escapeHtml(payment.due_date || '6 Sep 2026')}</strong></div>
        <div><span style="color:var(--text-muted);">Payment Date:</span> <strong>${escapeHtml(payment.payment_date || 'Not Paid')}</strong></div>
        <div><span style="color:var(--text-muted);">Method:</span> <strong>${escapeHtml(payment.payment_method || (isPendingVerification ? 'Cash' : 'N/A'))}</strong></div>
        <div style="grid-column:1 / -1;"><span style="color:var(--text-muted);">Timing / Status:</span> <strong>${escapeHtml(payment.timing_info || (isPendingVerification ? 'Pending Admin Verification' : (isRejected ? 'Rejected' : 'Payment Pending')))}</strong></div>
        ${submittedDateStr ? `<div style="grid-column:1 / -1;"><span style="color:var(--text-muted);">Submitted:</span> <span>${escapeHtml(submittedDateStr)}</span></div>` : ''}
        ${payment.verified_at ? `<div style="grid-column:1 / -1;"><span style="color:var(--text-muted);">Verified At:</span> <span>${escapeHtml(new Date(payment.verified_at).toLocaleString('en-IN'))}</span></div>` : ''}
        ${payment.verified_by ? `<div style="grid-column:1 / -1;"><span style="color:var(--text-muted);">Verified By:</span> <span>${escapeHtml(payment.verified_by)}</span></div>` : ''}
        ${payment.ref_no ? `<div style="grid-column:1 / -1;"><span style="color:var(--text-muted);">Ref / Cheque:</span> <code style="font-size:0.78rem; background:rgba(0,0,0,0.2); padding:0.15rem 0.4rem; border-radius:4px;">${escapeHtml(payment.ref_no)}</code></div>` : ''}
        ${(payment.notes || payment.note) ? `<div style="grid-column:1 / -1;"><span style="color:var(--text-muted);">Notes:</span> <span>${escapeHtml(payment.notes || payment.note)}</span></div>` : ''}
      </div>

      ${payment.receipt_url ? `
        <div style="margin:0.25rem 0; background:var(--glass-bg-subtle); border:1px solid var(--divider-color); border-radius:var(--radius-sm); padding:0.75rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-primary); display:flex; align-items:center; gap:0.35rem;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              Payment Receipt Photo
            </span>
            <button type="button" class="btn-filter-chip" onclick="GrihamAdminMaintenanceUI.openReceiptPreview('${payment.id}')" style="padding:0.2rem 0.6rem; font-size:0.75rem;">View Full</button>
          </div>
          <div style="width:100%; height:130px; border-radius:var(--radius-sm); overflow:hidden; border:1px solid rgba(255,255,255,0.1); cursor:pointer; background:#0f172a; display:flex; align-items:center; justify-content:center;" onclick="GrihamAdminMaintenanceUI.openReceiptPreview('${payment.id}')">
            <img src="${payment.receipt_url}" alt="Receipt Photo" style="max-width:100%; max-height:100%; object-fit:contain;">
          </div>
        </div>
      ` : ''}

      <div style="margin-top:0.4rem;">
        ${isPendingVerification ? `
          <div style="display:flex; gap:0.6rem;">
            <button type="button" class="btn-primary-action" onclick="GrihamAdminMaintenanceUI.openApproveModal('${payment.id}')" style="flex:1; min-height:46px; background:linear-gradient(135deg, #059669 0%, #10b981 100%); color:#fff; border:none; font-weight:700; border-radius:var(--radius-md); box-shadow:0 4px 12px rgba(16, 185, 129, 0.25); display:flex; align-items:center; justify-content:center; gap:0.4rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Approve Payment</span>
            </button>
            <button type="button" class="btn-filter-chip" onclick="GrihamAdminMaintenanceUI.openRejectModal('${payment.id}')" style="flex:1; min-height:46px; background:rgba(239, 68, 68, 0.15); color:#ef4444; border:1px solid rgba(239, 68, 68, 0.35); font-weight:700; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; gap:0.4rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              <span>Reject Payment</span>
            </button>
          </div>
        ` : (isPending ? `
          <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminMaintenanceUI.openRecordPayment('${payment.id}')" style="width:100%; min-height:46px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>
            <span data-i18n="maint_record_payment">Record Payment</span>
          </button>
        ` : (isRejected ? `
          <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminMaintenanceUI.openRecordPayment('${payment.id}')" style="width:100%; min-height:46px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>
            <span>Record Manual Payment</span>
          </button>
        ` : `
          <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminMaintenanceUI.openReceipt('${payment.id}')" style="width:100%; min-height:46px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span data-i18n="maint_view_receipt">View Receipt</span>
          </button>
        `))}
      </div>
    `;

    GrihamBottomSheet.open("maint-detail-sheet", "maint-detail-backdrop");
  },

  closePaymentDetail() {
    GrihamBottomSheet.close("maint-detail-sheet", "maint-detail-backdrop");
  },

  openRecordPayment(paymentId) {
    const payment = this.paymentsList.find(p => p.id === paymentId) || this.selectedPayment;
    if (!payment) return;
    this.selectedPayment = payment;

    this.closePaymentDetail();

    const bannerEl = document.getElementById("maint-record-target-unit");
    if (bannerEl) {
      bannerEl.innerHTML = `
        <strong>${escapeHtml(payment.resident_name)}</strong> • Flat ${escapeHtml(payment.wing)}-${escapeHtml(payment.flat)}<br>
        <span style="font-size:0.75rem; opacity:0.85;">Month: ${escapeHtml(this.summaryData?.month_name || 'September 2026')}</span>
      `;
    }

    const amountInput = document.getElementById("input-maint-amount");
    const dateInput = document.getElementById("input-maint-date");
    const methodSelect = document.getElementById("select-maint-method");
    const refInput = document.getElementById("input-maint-ref");
    const notesInput = document.getElementById("input-maint-notes");

    if (amountInput) amountInput.value = payment.amount || 3500;
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.value = today;
    }
    if (methodSelect) methodSelect.value = "UPI";
    if (refInput) refInput.value = "";
    if (notesInput) notesInput.value = "";

    GrihamBottomSheet.open("maint-record-sheet", "maint-record-backdrop");
  },

  closeRecordPayment() {
    GrihamBottomSheet.close("maint-record-sheet", "maint-record-backdrop");
  },

  async submitPaymentRecord(e) {
    e.preventDefault();
    if (!this.selectedPayment) return;

    const btn = document.getElementById("btn-save-payment-submit");
    const btnText = document.getElementById("btn-save-payment-text");
    const btnSpinner = document.getElementById("btn-save-payment-spinner");

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Saving...";
    if (btnSpinner) btnSpinner.style.display = "inline-block";

    const amount = Number(document.getElementById("input-maint-amount")?.value) || 3500;
    const paymentDate = document.getElementById("input-maint-date")?.value || new Date().toISOString().split("T")[0];
    const paymentMethod = document.getElementById("select-maint-method")?.value || "UPI";
    const refNo = document.getElementById("input-maint-ref")?.value || "";
    const notes = document.getElementById("input-maint-notes")?.value || "";

    try {
      const monthKey = this.availableMonths[this.currentMonthIndex] || "2026-09";
      const res = await recordMaintenancePayment({
        payment_id: this.selectedPayment.id,
        month: monthKey,
        resident_name: this.selectedPayment.resident_name,
        wing: this.selectedPayment.wing,
        flat: this.selectedPayment.flat,
        amount,
        payment_date: paymentDate,
        payment_method: paymentMethod,
        ref_no: refNo,
        notes
      });

      this.closeRecordPayment();
      await this.loadData(true);

      // Open receipt of newly recorded payment
      if (res && res.payment) {
        this.openReceipt(res.payment.id);
      }

    } catch (err) {
      console.error("[Maintenance UI] Record payment error:", err);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Unable to record payment. Please try again.", "error");
      } else {
        alert("Unable to record payment. Please try again.");
      }
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = I18N_DICTIONARY[GrihamState.language]?.maint_save_payment || "Save Payment";
      if (btnSpinner) btnSpinner.style.display = "none";
    }
  },

  openReceipt(paymentId) {
    const payment = this.paymentsList.find(p => p.id === paymentId) || this.selectedPayment;
    if (!payment) return;

    this.closePaymentDetail();

    const bodyEl = document.getElementById("maint-receipt-body");
    if (!bodyEl) return;

    const socName = (typeof GrihamAuth !== "undefined" && GrihamAuth.getSocietyId()) ? "Green Valley Residency" : "Griham Co-op Housing Society";
    const refNumber = payment.ref_no || `REC-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const monthStr = this.summaryData?.month_name || "September 2026";

    bodyEl.innerHTML = `
      <div class="receipt-paper">
        <div class="receipt-header-row">
          <div class="receipt-soc-name">${escapeHtml(socName)}</div>
          <div class="receipt-type-title">Official Maintenance Receipt</div>
          <div style="font-size:0.7rem; color:var(--text-muted); margin-top:0.2rem;">Receipt No: ${escapeHtml(refNumber)}</div>
        </div>

        <div class="receipt-amount-box">
          <span style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase;">Amount Received</span>
          <div class="receipt-amount-val">${GrihamFormat.currency(payment.amount || 3500)}</div>
          <span style="font-size:0.72rem; color:var(--color-brand-emerald); font-weight:700;">✓ Payment Verified & Settled</span>
        </div>

        <div class="receipt-table">
          <div class="receipt-row">
            <span class="receipt-label">Resident:</span>
            <span class="receipt-val">${escapeHtml(payment.resident_name)}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Flat / Unit:</span>
            <span class="receipt-val">Wing ${escapeHtml(payment.wing)} • Flat ${escapeHtml(payment.flat)}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Maintenance Month:</span>
            <span class="receipt-val">${escapeHtml(monthStr)}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Payment Date:</span>
            <span class="receipt-val">${escapeHtml(payment.payment_date || 'Recorded')}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Payment Mode:</span>
            <span class="receipt-val">${escapeHtml(payment.payment_method || 'UPI')}</span>
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

      <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminMaintenanceUI.closeReceipt()" style="width:100%; min-height:44px; margin-top:0.25rem;">
        <span data-i18n="btn_done">Done</span>
      </button>
    `;

    GrihamBottomSheet.open("maint-receipt-sheet", "maint-receipt-backdrop");
  },

  closeReceipt() {
    GrihamBottomSheet.close("maint-receipt-sheet", "maint-receipt-backdrop");
  },

  async loadHistory() {
    const container = document.getElementById("maint-history-list");
    if (!container) return;

    if (typeof GrihamLoader !== "undefined") {
      container.innerHTML = GrihamLoader.renderSkeletonCards({ count: 2, height: "70px" });
    } else {
      container.innerHTML = `<div class="dash-skeleton-card" style="height:70px;"></div><div class="dash-skeleton-card" style="height:70px;"></div>`;
    }

    try {
      const res = await getMaintenanceHistory();
      const history = res.history || [];
      if (history.length === 0) {
        if (typeof GrihamEmptyState !== "undefined") {
          container.innerHTML = GrihamEmptyState.render({ title: "No maintenance history available.", isVisible: true });
        } else {
          container.innerHTML = `<div class="maint-empty-card"><p class="empty-title">No maintenance history available.</p></div>`;
        }
        return;
      }

      container.innerHTML = history.map(h => `
        <div class="maint-hist-card" onclick="GrihamAdminMaintenanceUI.selectMonth('${h.month}')" role="button" tabindex="0" aria-label="Load maintenance for ${h.month_name}">
          <div class="maint-hist-top">
            <span class="maint-hist-month">${escapeHtml(h.month_name)}</span>
            <span class="maint-hist-pct">${h.percentage}% Collected</span>
          </div>
          <div class="maint-hist-numbers">
            <div><span style="color:var(--text-muted);">Expected:</span> <strong>${GrihamFormat.currency(h.expected)}</strong></div>
            <div><span style="color:var(--text-muted);">Collected:</span> <strong style="color:#34d399;">${GrihamFormat.currency(h.collected)}</strong></div>
            <div><span style="color:var(--text-muted);">Pending:</span> <strong style="color:#f87171;">${GrihamFormat.currency(h.pending)}</strong></div>
          </div>
        </div>
      `).join("");
    } catch (err) {
      if (typeof GrihamErrorState !== "undefined") {
        container.innerHTML = GrihamErrorState.render({ title: "Unable to load history.", isVisible: true });
      } else {
        container.innerHTML = `<div class="maint-error-card"><p>Unable to load history.</p></div>`;
      }
    }
  },

  async loadMyMaintenance() {
    const container = document.getElementById("maint-my-content");
    if (!container) return;

    if (typeof GrihamLoader !== "undefined") {
      container.innerHTML = GrihamLoader.renderSkeletonCards({ count: 1, height: "120px" });
    } else {
      container.innerHTML = `<div class="dash-skeleton-card" style="height:120px;"></div>`;
    }

    try {
      const res = await getMyMaintenance();
      const admin = res.admin_resident;
      this.myMaintenanceData = admin;

      container.innerHTML = `
        <div class="maint-my-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <span class="maint-badge-tag">${escapeHtml(admin.name)}</span>
              <span style="font-size:0.75rem; color:var(--text-secondary);">${escapeHtml(admin.role)} • Wing ${escapeHtml(admin.wing)} Flat ${escapeHtml(admin.flat)}</span>
            </div>
            <span class="maint-status-chip paid_early">${escapeHtml(admin.current_status)}</span>
          </div>

          <div style="background:var(--btn-secondary-bg); border-radius:var(--radius-md); padding:0.85rem; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted);">Current Month Dues</span>
              <div style="font-family:var(--font-family-display); font-size:1.3rem; font-weight:800; color:var(--text-primary);">${GrihamFormat.currency(admin.monthly_dues)}</div>
            </div>
            <div style="text-align:right;">
              <span style="font-size:0.72rem; color:var(--text-muted);">Outstanding Balance</span>
              <div style="font-family:var(--font-family-display); font-size:1.3rem; font-weight:800; color:#34d399;">₹0</div>
            </div>
          </div>

          <div style="font-size:0.78rem; color:var(--text-secondary);">
            Paid on <strong>${escapeHtml(admin.paid_date)}</strong> via <strong>${escapeHtml(admin.payment_method)}</strong> (${escapeHtml(admin.ref_no)})
          </div>
        </div>

        <h3 style="font-family:var(--font-family-display); font-size:calc(0.95rem * var(--font-scale)); font-weight:700; color:var(--text-primary); margin:0.35rem 0 0.15rem 0;">
          My Unit Payment History
        </h3>

        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          ${admin.history.map(item => `
            <div style="background:var(--glass-bg); border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:0.75rem 0.85rem; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="color:var(--text-primary); font-size:0.85rem;">${escapeHtml(item.month)}</strong>
                <div style="font-size:0.72rem; color:var(--text-muted);">${escapeHtml(item.date)} • ${escapeHtml(item.method)}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-weight:700; color:var(--text-primary); font-size:0.9rem;">${GrihamFormat.currency(item.amount)}</div>
                <span class="maint-status-chip paid_early" style="font-size:0.65rem; padding:0.15rem 0.45rem;">${escapeHtml(item.status)}</span>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    } catch (err) {
      container.innerHTML = `<div class="maint-error-card"><p>Unable to load unit details.</p></div>`;
    }
  },

  openMyMaintenance() {
    this.switchTab("my");
  },

  openReceiptPreview(paymentId) {
    const payment = this.paymentsList.find(p => p.id === paymentId) || this.selectedPayment;
    if (!payment || !payment.receipt_url) return;

    const img = document.getElementById("admin-receipt-full-img");
    if (img) img.src = payment.receipt_url;

    GrihamBottomSheet.open("modal-admin-receipt-preview", "modal-admin-receipt-preview-backdrop");
  },

  closeReceiptPreview() {
    GrihamBottomSheet.close("modal-admin-receipt-preview", "modal-admin-receipt-preview-backdrop");
  },

  openApproveModal(paymentId) {
    const payment = this.paymentsList.find(p => p.id === paymentId) || this.selectedPayment;
    if (!payment) return;
    this.selectedPayment = payment;

    const unitEl = document.getElementById("admin-approve-summary-unit");
    const amountEl = document.getElementById("admin-approve-summary-amount");
    if (unitEl) unitEl.textContent = `${payment.wing} Wing - Flat ${payment.flat} (${payment.resident_name})`;
    if (amountEl) amountEl.textContent = `Amount: ${GrihamFormat.currency(payment.amount || 2500)} • ${this.summaryData?.month_name || 'September 2026'}`;

    GrihamBottomSheet.open("modal-admin-approve-payment", "modal-admin-approve-payment-backdrop");
  },

  closeApproveModal() {
    GrihamBottomSheet.close("modal-admin-approve-payment", "modal-admin-approve-payment-backdrop");
  },

  async confirmApprovePayment() {
    if (!this.selectedPayment) return;
    const btn = document.getElementById("btn-admin-confirm-approve");
    const btnText = document.getElementById("btn-admin-confirm-approve-text");
    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Approving...";

    try {
      if (typeof approveCashPayment === "function") {
        await approveCashPayment(this.selectedPayment.id);
      } else if (typeof GrihamAPI !== "undefined" && GrihamAPI.approveCashPayment) {
        await GrihamAPI.approveCashPayment(this.selectedPayment.id);
      }
      this.closeApproveModal();
      this.closePaymentDetail();
      await this.loadData(true);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Cash payment verified and marked as Paid", "success");
      }
    } catch (err) {
      console.error("[Maintenance UI] Approve payment error:", err);
      const msg = "Failed to approve payment: " + (err.message || "Unknown error");
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(msg, "error");
      } else {
        alert(msg);
      }
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Approve Payment";
    }
  },

  openRejectModal(paymentId) {
    const payment = this.paymentsList.find(p => p.id === paymentId) || this.selectedPayment;
    if (!payment) return;
    this.selectedPayment = payment;

    const input = document.getElementById("input-admin-reject-reason");
    const err = document.getElementById("admin-reject-error");
    if (input) input.value = "";
    if (err) err.style.display = "none";

    GrihamBottomSheet.open("modal-admin-reject-payment", "modal-admin-reject-payment-backdrop");
  },

  closeRejectModal() {
    GrihamBottomSheet.close("modal-admin-reject-payment", "modal-admin-reject-payment-backdrop");
  },

  async confirmRejectPayment() {
    if (!this.selectedPayment) return;
    const input = document.getElementById("input-admin-reject-reason");
    const err = document.getElementById("admin-reject-error");
    const reason = (input?.value || "").trim();

    if (!reason) {
      if (err) {
        err.textContent = "Rejection reason is required.";
        err.style.display = "block";
      }
      input?.focus();
      return;
    }

    const btn = document.getElementById("btn-admin-confirm-reject");
    const btnText = document.getElementById("btn-admin-confirm-reject-text");
    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Rejecting...";

    try {
      if (typeof rejectCashPayment === "function") {
        await rejectCashPayment(this.selectedPayment.id, reason);
      } else if (typeof GrihamAPI !== "undefined" && GrihamAPI.rejectCashPayment) {
        await GrihamAPI.rejectCashPayment(this.selectedPayment.id, reason);
      }
      this.closeRejectModal();
      this.closePaymentDetail();
      await this.loadData(true);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Cash payment rejected", "info");
      }
    } catch (err) {
      console.error("[Maintenance UI] Reject payment error:", err);
      const msg = "Failed to reject payment: " + (err.message || "Unknown error");
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(msg, "error");
      } else {
        alert(msg);
      }
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Reject Payment";
    }
  },

  closeAllSheets() {
    GrihamBottomSheet.closeAll();
  }
};
