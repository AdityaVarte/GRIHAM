
window.HTML_EXTRA_ACCESSIBILITYPANEL = `
<!-- ACCESSIBILITY BOTTOM SHEET (10 FEATURES FINAL)                -->
    <!-- ============================================================= -->
    <div class="sheet-backdrop" id="a11y-backdrop" onclick="GrihamA11y.toggleSheet(false)"></div>
    <div class="mobile-bottom-sheet" id="a11y-sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-heading">
      
      <div class="sheet-handle" aria-hidden="true"></div>

      <!-- Header with Left Arrow Back Button -->
      <div class="sheet-header-row">
        <button class="btn-sheet-back" onclick="GrihamA11y.toggleSheet(false)" aria-label="Go back" title="Go back">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h3 class="sheet-title" id="sheet-heading">Accessibility</h3>
        <div class="sheet-header-spacer" aria-hidden="true"></div>
      </div>

      <!-- 10 Core Accessibility Features List -->
      <div class="a11y-feature-list">
        
        <!-- 1 & 2. Bigger Text & Smaller Text -->
        <div class="a11y-feature-row">
          <div class="a11y-feature-info">
            <span class="a11y-feature-name">Text Size</span>
            <span class="a11y-feature-desc">1. Bigger Text / 2. Smaller Text</span>
          </div>
          <div class="text-scale-stepper" role="group" aria-label="Text size controls">
            <button type="button" class="btn-scale-step" onclick="GrihamA11y.stepTextSize(-1)" aria-label="Smaller Text" title="Smaller Text">A-</button>
            <span class="scale-value-display" id="a11y-scale-display">100%</span>
            <button type="button" class="btn-scale-step" onclick="GrihamA11y.stepTextSize(1)" aria-label="Bigger Text" title="Bigger Text">A+</button>
          </div>
        </div>

        <!-- 3. Text Spacing -->
        <div class="a11y-feature-row">
          <div class="a11y-feature-info">
            <span class="a11y-feature-name">3. Text Spacing</span>
            <span class="a11y-feature-desc">Increase character & word spacing</span>
          </div>
          <label class="touch-switch">
            <input type="checkbox" id="a11y-toggle-spacing" onchange="GrihamA11y.setTextSpacing(this.checked)" aria-label="Toggle Text Spacing">
            <span class="switch-track"></span>
          </label>
        </div>

        <!-- 4. Line Height -->
        <div class="a11y-feature-row">
          <div class="a11y-feature-info">
            <span class="a11y-feature-name">4. Line Height</span>
            <span class="a11y-feature-desc">Expand line spacing for readability</span>
          </div>
          <label class="touch-switch">
            <input type="checkbox" id="a11y-toggle-lineheight" onchange="GrihamA11y.setLineHeight(this.checked)" aria-label="Toggle Line Height">
            <span class="switch-track"></span>
          </label>
        </div>

        <!-- 5. Saturation -->
        <div class="a11y-feature-row">
          <div class="a11y-feature-info">
            <span class="a11y-feature-name">5. Saturation</span>
            <span class="a11y-feature-desc">Adjust UI color intensity</span>
          </div>
          <div class="saturation-chip-group" role="group" aria-label="Saturation presets">
            <button type="button" class="btn-sat-chip" data-sat="low" onclick="GrihamA11y.setSaturation('low')">Mono</button>
            <button type="button" class="btn-sat-chip active" data-sat="normal" onclick="GrihamA11y.setSaturation('normal')">100%</button>
            <button type="button" class="btn-sat-chip" data-sat="high" onclick="GrihamA11y.setSaturation('high')">Vibrant</button>
          </div>
        </div>

        <!-- 6. Invert Colors -->
        <div class="a11y-feature-row">
          <div class="a11y-feature-info">
            <span class="a11y-feature-name">6. Invert Colors</span>
            <span class="a11y-feature-desc">Invert application color spectrum</span>
          </div>
          <label class="touch-switch">
            <input type="checkbox" id="a11y-toggle-invert" onchange="GrihamA11y.setInvertColors(this.checked)" aria-label="Toggle Invert Colors">
            <span class="switch-track"></span>
          </label>
        </div>

        <!-- 7. Cursor -->
        <div class="a11y-feature-row">
          <div class="a11y-feature-info">
            <span class="a11y-feature-name">7. Cursor</span>
            <span class="a11y-feature-desc">Large high-contrast pointer mode</span>
          </div>
          <label class="touch-switch">
            <input type="checkbox" id="a11y-toggle-cursor" onchange="GrihamA11y.setLargeCursor(this.checked)" aria-label="Toggle Large Cursor">
            <span class="switch-track"></span>
          </label>
        </div>

        <!-- 8. Pause Animation -->
        <div class="a11y-feature-row">
          <div class="a11y-feature-info">
            <span class="a11y-feature-name">8. Pause Animation</span>
            <span class="a11y-feature-desc">Disable motion & transitions</span>
          </div>
          <label class="touch-switch">
            <input type="checkbox" id="a11y-toggle-motion" onchange="GrihamA11y.setPauseAnimation(this.checked)" aria-label="Toggle Pause Animation">
            <span class="switch-track"></span>
          </label>
        </div>

        <!-- 9. Hide Images -->
        <div class="a11y-feature-row">
          <div class="a11y-feature-info">
            <span class="a11y-feature-name">9. Hide Images</span>
            <span class="a11y-feature-desc">Hide decorative graphics & media</span>
          </div>
          <label class="touch-switch">
            <input type="checkbox" id="a11y-toggle-images" onchange="GrihamA11y.setHideImages(this.checked)" aria-label="Toggle Hide Images">
            <span class="switch-track"></span>
          </label>
        </div>

      </div>

      <!-- 10. Reset All Settings Button -->
      <button type="button" class="btn-reset-a11y" onclick="GrihamA11y.resetAllSettings()" id="btn-a11y-reset" aria-label="Reset All Settings">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
        <span>10. Reset All Settings</span>
      </button>

    </div>

  </div>

  <!-- ================================================================= -->
  <!-- ADMIN THREE-DOT OPTIONS MENU BOTTOM SHEET                         -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="admin-menu-backdrop" onclick="GrihamAdminDashboardUI.toggleAdminMenu(false)" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet" id="admin-menu-sheet" role="dialog" aria-modal="true" aria-labelledby="admin-menu-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <h2 class="sheet-title" id="admin-menu-title">Admin Options</h2>
      <button type="button" class="btn-sheet-back" onclick="GrihamAdminDashboardUI.toggleAdminMenu(false)" aria-label="Close Admin Options">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <div class="admin-menu-list">
      <button type="button" class="admin-menu-btn" onclick="GrihamAdminDashboardUI.handleMenuNav('/admin/profile')">
        <svg class="admin-menu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span data-i18n="menu_profile">Profile</span>
      </button>

      <button type="button" class="admin-menu-btn" onclick="GrihamAdminDashboardUI.handleMenuNav('/admin/maintenance')">
        <svg class="admin-menu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
        <span data-i18n="menu_maint_hist">Maintenance History</span>
      </button>

      <button type="button" class="admin-menu-btn" onclick="GrihamAdminDashboardUI.handleMenuNav('/admin/workers')">
        <svg class="admin-menu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span data-i18n="menu_worker_details">Worker Details</span>
      </button>

      <button type="button" class="admin-menu-btn" onclick="GrihamAdminDashboardUI.handleMenuNav('/admin/amenities')">
        <svg class="admin-menu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span data-i18n="menu_amenity_cal">Amenities Calendar</span>
      </button>

      <button type="button" class="admin-menu-btn" onclick="GrihamAdminDashboardUI.handleMenuNav('/admin/bulk-service')">
        <svg class="admin-menu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
        <span data-i18n="menu_bulk_service">Bulk Service</span>
      </button>

      <button type="button" class="admin-menu-btn" onclick="GrihamAdminDashboardUI.handleMenuNav('/admin/add-staff')">
        <svg class="admin-menu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
        <span data-i18n="menu_add_staff">Add Vendor / Worker / Gatekeeper</span>
      </button>

      <button type="button" class="admin-menu-btn" onclick="GrihamAdminDashboardUI.handleMenuNav('/admin/approvals')">
        <svg class="admin-menu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
        <span data-i18n="menu_approvals">Pending Approvals</span>
      </button>

      <button type="button" class="admin-menu-btn danger" onclick="GrihamAdminDashboardUI.openLogoutConfirm()" id="btn-menu-logout">
        <svg class="admin-menu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        <span data-i18n="menu_logout">Logout</span>
      </button>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- LOGOUT CONFIRMATION MODAL / BOTTOM SHEET                          -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="logout-confirm-backdrop" onclick="GrihamAdminDashboardUI.closeLogoutConfirm()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet" id="logout-confirm-sheet" role="dialog" aria-modal="true" aria-labelledby="logout-dialog-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom));">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="logout-confirm-card">
      <div class="logout-shield-icon" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </div>

      <h2 class="logout-title" id="logout-dialog-title" data-i18n="logout_confirm_title">Logout?</h2>
      <p class="logout-message" data-i18n="logout_confirm_msg">Are you sure you want to log out of the Admin Portal?</p>

      <div class="logout-btn-row">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminDashboardUI.closeLogoutConfirm()" id="btn-cancel-logout" data-i18n="btn_cancel">
          Cancel
        </button>
        <button type="button" class="btn-logout-confirm" onclick="GrihamAdminDashboardUI.confirmLogout()" id="btn-confirm-logout" data-i18n="btn_confirm_logout">
          Logout
        </button>
      </div>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- NOTIFICATION CONFIRMATION BOTTOM SHEET                            -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- NOTIFICATION SUCCESS IN-APP BOTTOM SHEET                          -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- NOTIFICATION DETAIL MODAL / BOTTOM SHEET                          -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- MAINTENANCE PAYMENT DETAILS BOTTOM SHEET                          -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="maint-detail-backdrop" onclick="GrihamAdminMaintenanceUI.closePaymentDetail()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet" id="maint-detail-sheet" role="dialog" aria-modal="true" aria-labelledby="maint-detail-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminMaintenanceUI.closePaymentDetail()" aria-label="Close details" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="maint-detail-title">Payment Details</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <div id="maint-detail-body" style="display:flex; flex-direction:column; gap:0.9rem; padding: 0.25rem 0;">
      <!-- Dynamically filled by JS -->
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- RECORD PAYMENT BOTTOM SHEET                                       -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="maint-record-backdrop" onclick="GrihamAdminMaintenanceUI.closeRecordPayment()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet" id="maint-record-sheet" role="dialog" aria-modal="true" aria-labelledby="maint-record-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminMaintenanceUI.closeRecordPayment()" aria-label="Cancel" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="maint-record-title" data-i18n="maint_record_payment">Record Payment</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-maint-record" onsubmit="GrihamAdminMaintenanceUI.submitPaymentRecord(event)" style="display:flex; flex-direction:column; gap:0.9rem; padding: 0.25rem 0;">
      <!-- Target Unit Preview Banner -->
      <div id="maint-record-target-unit" class="maint-record-unit-banner">
        <!-- Injected by JS -->
      </div>

      <div class="form-group">
        <label class="form-label" for="input-maint-amount">Amount (₹)</label>
        <div class="input-wrapper">
          <input type="number" id="input-maint-amount" class="form-input" required min="1" step="1">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="input-maint-date" data-i18n="maint_payment_date">Payment Date</label>
        <div class="input-wrapper">
          <input type="date" id="input-maint-date" class="form-input" required>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="select-maint-method" data-i18n="maint_payment_method">Payment Method</label>
        <div class="input-wrapper">
          <select id="select-maint-method" class="form-select">
            <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer (NEFT / IMPS / RTGS)</option>
            <option value="Cheque">Cheque</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="input-maint-ref">Reference Number / Cheque No. (Optional)</label>
        <div class="input-wrapper">
          <input type="text" id="input-maint-ref" class="form-input" placeholder="e.g. UPI-98213490 or CHQ-482019">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="input-maint-notes">Notes (Optional)</label>
        <div class="input-wrapper">
          <textarea id="input-maint-notes" class="form-textarea" rows="2" placeholder="Add any receipt or transaction notes..."></textarea>
        </div>
      </div>

      <button type="submit" class="btn-primary-action btn-admin-style" id="btn-save-payment-submit" style="width:100%; min-height:46px; margin-top:0.35rem;">
        <span id="btn-save-payment-spinner" class="spinner-icon" style="display:none;" aria-hidden="true"></span>
        <span id="btn-save-payment-text" data-i18n="maint_save_payment">Save Payment</span>
      </button>
    </form>
  </div>

  <!-- ================================================================= -->
  <!-- VIEW RECEIPT BOTTOM SHEET                                         -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- COMPLAINT DETAIL BOTTOM SHEET                                     -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- COMPLAINT UPDATE STATUS BOTTOM SHEET                              -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- ASSIGN WORKER / VENDOR BOTTOM SHEET                               -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- CANCEL COMPLAINT (WITH REASON) BOTTOM SHEET                       -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- PAGE 10 — ADMIN RESIDENT APPROVALS                               -->
  <!-- ================================================================= -->
  

  <!-- ================================================================= -->
  <!-- APPROVALS: SORTING BOTTOM SHEET                                  -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="approval-sort-backdrop" onclick="GrihamAdminApprovalsUI.closeSortSheet()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet" id="approval-sort-sheet" role="dialog" aria-modal="true" aria-labelledby="approval-sort-title" aria-hidden="true" style="padding-bottom:calc(1.8rem + var(--safe-bottom));">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row" style="margin-bottom:0.75rem;">
      <button class="btn-sheet-back" onclick="GrihamAdminApprovalsUI.closeSortSheet()" aria-label="Close sort" title="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <h3 class="sheet-title" id="approval-sort-title">Sort Registrations</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <div class="approval-sort-options" role="radiogroup" aria-label="Sort options">
      <button type="button" class="sort-option-row active" data-sort="newest" onclick="GrihamAdminApprovalsUI.setSort('newest')">
        <div class="sort-option-text">
          <span class="sort-option-name">Newest First</span>
          <span class="sort-option-desc">Most recently submitted registrations</span>
        </div>
        <div class="sort-radio-indicator"></div>
      </button>

      <button type="button" class="sort-option-row" data-sort="oldest" onclick="GrihamAdminApprovalsUI.setSort('oldest')">
        <div class="sort-option-text">
          <span class="sort-option-name">Oldest First</span>
          <span class="sort-option-desc">Earliest submitted registrations</span>
        </div>
        <div class="sort-radio-indicator"></div>
      </button>

      <button type="button" class="sort-option-row" data-sort="name" onclick="GrihamAdminApprovalsUI.setSort('name')">
        <div class="sort-option-text">
          <span class="sort-option-name">Name A–Z</span>
          <span class="sort-option-desc">Alphabetical by resident's full name</span>
        </div>
        <div class="sort-radio-indicator"></div>
      </button>

      <button type="button" class="sort-option-row" data-sort="wing_flat" onclick="GrihamAdminApprovalsUI.setSort('wing_flat')">
        <div class="sort-option-text">
          <span class="sort-option-name">Wing / Flat</span>
          <span class="sort-option-desc">Organized by wing and apartment number</span>
        </div>
        <div class="sort-radio-indicator"></div>
      </button>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- APPROVALS: RESIDENT APPLICATION DETAILS BOTTOM SHEET             -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- APPROVALS: APPROVE CONFIRMATION SHEET                            -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="approval-confirm-backdrop" onclick="GrihamAdminApprovalsUI.closeApproveConfirm()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet" id="approval-confirm-sheet" role="dialog" aria-modal="true" aria-labelledby="approval-confirm-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom));">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div style="display:flex; flex-direction:column; align-items:center; gap:0.85rem; text-align:center; padding: 0.5rem 0 0.25rem;">
      <div class="logout-shield-icon approval-approve-icon" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      </div>
      <h3 class="logout-title" id="approval-confirm-title" style="font-size:1.15rem; font-weight:800;">Approve Resident?</h3>
      
      <div class="confirm-resident-card" id="confirm-resident-card" style="width:100%; background:var(--glass-bg); border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:0.75rem 1rem; text-align:left;">
        <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Resident</div>
        <div id="confirm-resident-name" style="font-size:0.95rem; font-weight:700; color:var(--text-primary); margin-top:0.1rem;">Aditya Sharma</div>
        <div id="confirm-resident-flat" style="font-size:0.82rem; color:var(--text-secondary); margin-top:0.1rem;">Wing A • Flat 102</div>
      </div>

      <p class="logout-message" id="approval-confirm-msg" style="font-size:0.85rem; color:var(--text-secondary); line-height:1.45;">This resident will be allowed to access the Griham resident application.</p>
    </div>

    <div class="logout-btn-row" style="margin-top:0.75rem;">
      <button type="button" class="btn-logout-cancel" onclick="GrihamAdminApprovalsUI.closeApproveConfirm()">Cancel</button>
      <button type="button" class="btn-approval-approve" id="btn-execute-approve" onclick="GrihamAdminApprovalsUI.executeApprove()" style="margin-top:0; min-height:44px; flex:1;">
        <span id="btn-execute-approve-text">Approve</span>
      </button>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- APPROVALS: REJECT WITH REASON SHEET                              -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="approval-reject-backdrop" onclick="GrihamAdminApprovalsUI.closeRejectSheet()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet" id="approval-reject-sheet" role="dialog" aria-modal="true" aria-labelledby="approval-reject-sheet-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom));">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminApprovalsUI.closeRejectSheet()" aria-label="Go back" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="approval-reject-sheet-title">Reject Registration</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-reject-resident" onsubmit="GrihamAdminApprovalsUI.executeReject(event)" style="display:flex; flex-direction:column; gap:0.9rem; padding:0.25rem 0;">
      
      <div class="confirm-resident-card" style="background:var(--glass-bg); border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:0.65rem 0.9rem;">
        <div style="font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Resident</div>
        <div id="reject-resident-name" style="font-size:0.95rem; font-weight:700; color:var(--text-primary);">Aditya Sharma</div>
      </div>

      <div>
        <label class="form-label" style="font-weight:700; margin-bottom:0.4rem; display:block;">Reason for rejection <span style="color:#ef4444;">*</span></label>
        <p class="cancel-intro-text" style="margin-bottom:0.6rem; font-size:0.8rem; color:var(--text-muted);">Select a standard reason or enter a custom reason below.</p>

        <!-- Quick Reason Chips -->
        <div class="reject-reason-chips" id="reject-reason-chips" role="group" aria-label="Select rejection reason">
          <button type="button" class="btn-reject-chip" data-reason="Incorrect flat details" onclick="GrihamAdminApprovalsUI.selectRejectReason(this)">Incorrect flat details</button>
          <button type="button" class="btn-reject-chip" data-reason="Invalid information" onclick="GrihamAdminApprovalsUI.selectRejectReason(this)">Invalid information</button>
          <button type="button" class="btn-reject-chip" data-reason="Duplicate registration" onclick="GrihamAdminApprovalsUI.selectRejectReason(this)">Duplicate registration</button>
          <button type="button" class="btn-reject-chip" data-reason="Not a resident of this society" onclick="GrihamAdminApprovalsUI.selectRejectReason(this)">Not a resident of this society</button>
          <button type="button" class="btn-reject-chip" data-reason="Other" onclick="GrihamAdminApprovalsUI.selectRejectReason(this)">Other</button>
        </div>
      </div>

      <div class="form-group" style="margin-top:0.2rem;">
        <label class="form-label" for="input-reject-reason" style="font-size:0.8rem;">Custom Reason <span style="color:var(--text-muted); font-weight:400;">(or edit selected)</span></label>
        <div class="input-wrapper">
          <textarea
            id="input-reject-reason"
            class="form-textarea"
            rows="3"
            placeholder="Enter reason for rejection..."
            aria-label="Rejection reason"
            required
          ></textarea>
        </div>
        <p class="form-error-msg" id="reject-reason-error" style="display:none;">Please provide a reason before rejection.</p>
      </div>

      <div class="logout-btn-row" style="margin-top:0.2rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminApprovalsUI.closeRejectSheet()">Cancel</button>
        <button type="submit" class="btn-primary-action btn-danger-action" id="btn-execute-reject" style="margin-top:0; min-height:44px; flex:1;">
          <span id="btn-execute-reject-text">Reject</span>
        </button>
      </div>
    </form>
  </div>

  <!-- ================================================================= -->
  <!-- WORKERS: 1. WORKER DETAIL BOTTOM SHEET                           -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- WORKERS: 2. ATTENDANCE MARKING BOTTOM SHEET                      -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- WORKERS: 3. ATTENDANCE HISTORY BOTTOM SHEET                      -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- WORKERS: 4. ADD WORKER BOTTOM SHEET                              -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- WORKERS: 5. EDIT WORKER BOTTOM SHEET                             -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- WORKERS: 6. DEACTIVATE CONFIRMATION BOTTOM SHEET                 -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="worker-deactivate-backdrop" onclick="GrihamAdminWorkersUI.closeDeactivateSheet()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet" id="worker-deactivate-sheet" role="dialog" aria-modal="true" aria-labelledby="worker-deactivate-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom));">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div style="display:flex; flex-direction:column; align-items:center; gap:1rem; text-align:center; padding: 0.5rem 0 0.25rem;">
      <div class="logout-shield-icon" style="background:rgba(239,68,68,0.12); color:#ef4444; border:2px solid rgba(239,68,68,0.3);" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
        </svg>
      </div>
      <h3 class="logout-title" id="worker-deactivate-title">Deactivate Staff Member?</h3>
      <p class="logout-message">Are you sure you want to deactivate <strong id="deactivate-worker-name">this worker</strong>? Their access to the society premises and system assignments will be revoked.</p>
    </div>

    <div class="logout-btn-row" style="margin-top:0.6rem;">
      <button type="button" class="btn-logout-cancel" onclick="GrihamAdminWorkersUI.closeDeactivateSheet()">Cancel</button>
      <button type="button" class="btn-primary-action btn-danger-action" id="btn-execute-deactivate" onclick="GrihamAdminWorkersUI.executeDeactivate()" style="margin-top:0; min-height:44px;">
        <span id="btn-execute-deactivate-text">Deactivate</span>
      </button>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- REUSABLE: CALL WORKER / VENDOR SELECTION BOTTOM SHEET            -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="call-selector-backdrop" onclick="GrihamCallSelectorUI.close()" aria-hidden="true"></div>

  

  <!-- ================================================================= -->
  <!-- AMENITIES: 1. AMENITY DETAILS BOTTOM SHEET                        -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="amenity-detail-backdrop" onclick="GrihamAdminAmenitiesUI.closeDetailSheet()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet amenity-detail-sheet" id="amenity-detail-sheet" role="dialog" aria-modal="true" aria-labelledby="amn-sheet-name" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminAmenitiesUI.closeDetailSheet()" aria-label="Close amenity details" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="amn-sheet-name">Amenity Details</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <!-- Status & Badges -->
    <div class="amenity-sheet-top-card">
      <div class="amenity-sheet-title-row">
        <h2 class="amenity-modal-title" id="amn-detail-name">Community Hall</h2>
        <span class="amenity-status-tag tag-avail" id="amn-detail-status-badge">Available</span>
      </div>
      <p class="amenity-modal-desc" id="amn-detail-description">Main society community banquet hall.</p>
      <div class="amenity-modal-location" id="amn-detail-location-wrap">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        <span id="amn-detail-location">Ground Floor, Clubhouse Block</span>
      </div>
    </div>

    <!-- Blocked Reason Callout (if blocked) -->
    <div class="amenity-blocked-notice" id="amn-detail-blocked-notice" style="display:none;">
      <div class="blocked-notice-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
      </div>
      <div class="blocked-notice-body">
        <strong>Currently Blocked / Maintenance</strong>
        <p id="amn-detail-blocked-reason">Scheduled maintenance</p>
      </div>
    </div>

    <!-- Amenity Settings & Rules (No separate page) -->
    <div class="amenity-spec-section">
      <h4 class="amenity-section-subtitle">Amenity Settings & Capacity</h4>
      <div class="amenity-specs-grid">
        <div class="amenity-spec-item">
          <span class="spec-label">Capacity</span>
          <strong class="spec-value" id="amn-detail-capacity">80 people</strong>
        </div>
        <div class="amenity-spec-item">
          <span class="spec-label">Operating Hours</span>
          <strong class="spec-value" id="amn-detail-timing">08:00 AM – 10:00 PM</strong>
        </div>
        <div class="amenity-spec-item">
          <span class="spec-label">Booking Duration</span>
          <strong class="spec-value" id="amn-detail-duration">4 hours max</strong>
        </div>
        <div class="amenity-spec-item">
          <span class="spec-label">Advance Booking</span>
          <strong class="spec-value" id="amn-detail-advance">30 days</strong>
        </div>
        <div class="amenity-spec-item">
          <span class="spec-label">Requires Approval</span>
          <strong class="spec-value" id="amn-detail-approval">Yes</strong>
        </div>
        <div class="amenity-spec-item">
          <span class="spec-label">Today's Bookings</span>
          <strong class="spec-value" id="amn-detail-today-bookings">2 bookings</strong>
        </div>
      </div>
      <div class="amenity-rules-box" id="amn-detail-rules-box">
        <span class="spec-label">Usage Rules:</span>
        <p id="amn-detail-rules" class="amenity-rules-text">No loud DJ music after 10 PM. Cleaning fee applies if left untidy.</p>
      </div>
    </div>

    <!-- Actions Row -->
    <div class="amenity-detail-actions-col">
      <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminAmenitiesUI.actionViewCalendarForAmenity()" style="min-height:44px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        <span>View Calendar</span>
      </button>

      <button type="button" class="btn-secondary-action" onclick="GrihamAdminAmenitiesUI.actionDirectBookingForAmenity()" style="min-height:44px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        <span>Direct Booking</span>
      </button>

      <div class="amenity-actions-twin-row">
        <button type="button" class="btn-secondary-action" onclick="GrihamAdminAmenitiesUI.openEditSheet()" style="min-height:42px;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          <span>Edit Amenity</span>
        </button>

        <button type="button" class="btn-secondary-action" id="btn-amenity-block-toggle" onclick="GrihamAdminAmenitiesUI.toggleBlockStatusForCurrent()" style="min-height:42px;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
          <span id="btn-amenity-block-text">Block Amenity</span>
        </button>
      </div>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- AMENITIES: 2. ADD / EDIT AMENITY BOTTOM SHEET                     -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="amenity-form-backdrop" onclick="GrihamAdminAmenitiesUI.closeFormSheet()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet amenity-form-sheet" id="amenity-form-sheet" role="dialog" aria-modal="true" aria-labelledby="amenity-form-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminAmenitiesUI.closeFormSheet()" aria-label="Close form" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="amenity-form-title">Add Amenity</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-amenity-save" onsubmit="GrihamAdminAmenitiesUI.saveAmenityForm(event)" style="display:flex; flex-direction:column; gap:0.85rem; padding:0.25rem 0;">
      <div class="form-group">
        <label class="form-label" for="amn-form-name">Amenity Name <span style="color:#ef4444;">*</span></label>
        <div class="input-wrapper">
          <input type="text" id="amn-form-name" class="form-input" required placeholder="e.g. Community Hall, Swimming Pool" aria-label="Amenity name">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="amn-form-desc">Short Description</label>
        <div class="input-wrapper">
          <textarea id="amn-form-desc" class="form-input form-textarea" rows="2" placeholder="Describe the amenity..." aria-label="Amenity description"></textarea>
        </div>
      </div>

      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="amn-form-location">Location</label>
          <div class="input-wrapper">
            <input type="text" id="amn-form-location" class="form-input" placeholder="e.g. Clubhouse Ground Fl" aria-label="Location">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="amn-form-capacity">Capacity <span style="color:#ef4444;">*</span></label>
          <div class="input-wrapper">
            <input type="number" id="amn-form-capacity" class="form-input" min="1" max="1000" required placeholder="80" aria-label="Maximum capacity">
          </div>
        </div>
      </div>

      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="amn-form-opening">Opening Time <span style="color:#ef4444;">*</span></label>
          <div class="input-wrapper">
            <input type="time" id="amn-form-opening" class="form-input" required value="08:00" aria-label="Opening time">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="amn-form-closing">Closing Time <span style="color:#ef4444;">*</span></label>
          <div class="input-wrapper">
            <input type="time" id="amn-form-closing" class="form-input" required value="22:00" aria-label="Closing time">
          </div>
        </div>
      </div>

      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="amn-form-duration">Booking Duration (Hours) <span style="color:#ef4444;">*</span></label>
          <div class="input-wrapper">
            <input type="number" id="amn-form-duration" class="form-input" min="0.5" max="24" step="0.5" required value="4" aria-label="Booking duration in hours">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="amn-form-advance">Advance Limit (Days)</label>
          <div class="input-wrapper">
            <input type="number" id="amn-form-advance" class="form-input" min="1" max="365" value="30" aria-label="Advance booking limit in days">
          </div>
        </div>
      </div>

      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="amn-form-approval">Requires Approval?</label>
          <div class="input-wrapper">
            <select id="amn-form-approval" class="form-input form-select" aria-label="Requires approval">
              <option value="true">Yes (Admin must approve)</option>
              <option value="false">No (Instant confirmation)</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="amn-form-status">Initial Status</label>
          <div class="input-wrapper">
            <select id="amn-form-status" class="form-input form-select" aria-label="Amenity status">
              <option value="Available">Available</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="amn-form-rules">Society Rules & Guidelines</label>
        <div class="input-wrapper">
          <textarea id="amn-form-rules" class="form-input form-textarea" rows="2" placeholder="e.g. Proper dress code, no loud music after 10 PM..." aria-label="Usage rules"></textarea>
        </div>
      </div>

      <div id="amn-form-error-msg" class="form-error-banner" style="display:none;"></div>

      <div class="logout-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminAmenitiesUI.closeFormSheet()">Cancel</button>
        <button type="submit" class="btn-primary-action btn-admin-style" id="btn-save-amenity-submit" style="margin-top:0; min-height:44px;">
          <span id="btn-save-amenity-text">Save Amenity</span>
        </button>
      </div>
    </form>
  </div>

  <!-- ================================================================= -->
  <!-- AMENITIES: 3. BLOCK AMENITY BOTTOM SHEET                          -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="amenity-block-backdrop" onclick="GrihamAdminAmenitiesUI.closeBlockSheet()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet" id="amenity-block-sheet" role="dialog" aria-modal="true" aria-labelledby="amn-block-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminAmenitiesUI.closeBlockSheet()" aria-label="Close block sheet" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="amn-block-title">Block Amenity</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-amenity-block" onsubmit="GrihamAdminAmenitiesUI.submitBlockAmenity(event)" style="display:flex; flex-direction:column; gap:0.85rem; padding:0.25rem 0;">
      <p style="font-size:0.84rem; color:var(--text-secondary); line-height:1.4;">
        Temporarily block <strong id="block-amenity-target-name">this amenity</strong> from resident bookings for maintenance or private society events.
      </p>

      <div class="form-group">
        <label class="form-label" for="block-reason-select">Reason <span style="color:#ef4444;">*</span></label>
        <div class="input-wrapper">
          <select id="block-reason-select" class="form-input form-select" required aria-label="Blocking reason">
            <option value="Maintenance">Maintenance</option>
            <option value="Private Event">Private Event / Society AGM</option>
            <option value="Emergency">Emergency Repair</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="block-start-date">Start Date</label>
          <div class="input-wrapper">
            <input type="date" id="block-start-date" class="form-input" value="2026-09-17" aria-label="Start date">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="block-end-date">End Date</label>
          <div class="input-wrapper">
            <input type="date" id="block-end-date" class="form-input" value="2026-09-18" aria-label="End date">
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="block-optional-note">Optional Note / Notice to Residents</label>
        <div class="input-wrapper">
          <textarea id="block-optional-note" class="form-input form-textarea" rows="2" placeholder="Notice visible on resident booking page..." aria-label="Optional note"></textarea>
        </div>
      </div>

      <div class="logout-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminAmenitiesUI.closeBlockSheet()">Cancel</button>
        <button type="submit" class="btn-primary-action btn-danger-action" id="btn-submit-block-action" style="margin-top:0; min-height:44px;">
          <span id="btn-submit-block-text">Block Amenity</span>
        </button>
      </div>
    </form>
  </div>

  <!-- ================================================================= -->
  <!-- AMENITIES: 4. UNBLOCK CONFIRMATION BOTTOM SHEET                   -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="amenity-unblock-backdrop" onclick="GrihamAdminAmenitiesUI.closeUnblockSheet()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet" id="amenity-unblock-sheet" role="dialog" aria-modal="true" aria-labelledby="amn-unblock-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div style="display:flex; flex-direction:column; align-items:center; gap:1rem; text-align:center; padding: 0.5rem 0 0.25rem;">
      <div class="logout-shield-icon" style="background:rgba(16,185,129,0.12); color:#10b981; border:2px solid rgba(16,185,129,0.3);" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h3 class="logout-title" id="amn-unblock-title">Unblock Amenity</h3>
      <p class="logout-message">Make <strong id="unblock-target-amenity-name">this amenity</strong> available again? Residents will be able to book slots normally.</p>
    </div>

    <div class="logout-btn-row" style="margin-top:0.6rem;">
      <button type="button" class="btn-logout-cancel" onclick="GrihamAdminAmenitiesUI.closeUnblockSheet()">Cancel</button>
      <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminAmenitiesUI.confirmUnblock()" style="margin-top:0; min-height:44px;">
        <span>Unblock</span>
      </button>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- AMENITIES: 5. BOOKING DETAILS BOTTOM SHEET                        -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="booking-detail-backdrop" onclick="GrihamAdminAmenitiesUI.closeBookingDetailSheet()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet booking-detail-sheet" id="booking-detail-sheet" role="dialog" aria-modal="true" aria-labelledby="bkg-detail-id-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminAmenitiesUI.closeBookingDetailSheet()" aria-label="Close booking details" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="bkg-detail-id-title">Booking Details</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <!-- Booking Header Card -->
    <div class="booking-sheet-header-card">
      <div class="booking-meta-line">
        <span class="booking-ref-badge" id="bkg-detail-id">BK-2026-0042</span>
        <span class="booking-status-tag" id="bkg-detail-status">Pending</span>
      </div>
      <h2 class="booking-amenity-heading" id="bkg-detail-amenity">Community Hall</h2>
      <div class="booking-resident-row">
        <div class="booking-resident-avatar" id="bkg-detail-avatar">RK</div>
        <div class="booking-resident-info">
          <strong id="bkg-detail-resident-name">Rajesh Kumar</strong>
          <span id="bkg-detail-flat-info">Wing A • Flat 102</span>
        </div>
      </div>
    </div>

    <!-- Booking Timing & Details Grid -->
    <div class="booking-details-grid">
      <div class="bkg-grid-cell">
        <span class="bkg-cell-lbl">Date</span>
        <strong class="bkg-cell-val" id="bkg-detail-date">17 Sep 2026</strong>
      </div>
      <div class="bkg-grid-cell">
        <span class="bkg-cell-lbl">Time Slot</span>
        <strong class="bkg-cell-val" id="bkg-detail-slot">06:00 PM – 08:00 PM</strong>
      </div>
      <div class="bkg-grid-cell">
        <span class="bkg-cell-lbl">Expected Guests</span>
        <strong class="bkg-cell-val" id="bkg-detail-people">25 people</strong>
      </div>
      <div class="bkg-grid-cell">
        <span class="bkg-cell-lbl">Contact Phone</span>
        <strong class="bkg-cell-val" id="bkg-detail-phone">+91 9876543210</strong>
      </div>
    </div>

    <!-- Purpose Box -->
    <div class="booking-purpose-card">
      <span class="bkg-cell-lbl">Booking Purpose:</span>
      <p id="bkg-detail-purpose" class="bkg-purpose-text">Daughter's 5th Birthday Pooja & Breakfast</p>
    </div>

    <!-- Rejection/Cancellation info if present -->
    <div class="booking-reason-callout" id="bkg-detail-reason-callout" style="display:none;">
      <strong id="bkg-detail-reason-title">Rejection Reason:</strong>
      <p id="bkg-detail-reason-text"></p>
    </div>

    <!-- Dynamic Actions Row based on Status -->
    <div class="booking-actions-container" id="bkg-actions-dynamic-row">
      <!-- Populated dynamically: Approve/Reject/Cancel/Call Resident -->
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- AMENITIES: 6. DIRECT ADMIN BOOKING BOTTOM SHEET                   -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="direct-booking-backdrop" onclick="GrihamAdminAmenitiesUI.closeDirectBookingSheet()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet direct-booking-sheet" id="direct-booking-sheet" role="dialog" aria-modal="true" aria-labelledby="direct-booking-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminAmenitiesUI.closeDirectBookingSheet()" aria-label="Close direct booking" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="direct-booking-title">Create Amenity Booking</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-direct-booking" onsubmit="GrihamAdminAmenitiesUI.submitDirectBooking(event)" style="display:flex; flex-direction:column; gap:0.85rem; padding:0.25rem 0;">
      <!-- Select Amenity -->
      <div class="form-group">
        <label class="form-label" for="db-select-amenity">Select Amenity <span style="color:#ef4444;">*</span></label>
        <div class="input-wrapper">
          <select id="db-select-amenity" class="form-input form-select" required onchange="GrihamAdminAmenitiesUI.handleDirectBookingAmenitySelect(this.value)" aria-label="Select Amenity">
            <!-- Populated dynamically -->
          </select>
        </div>
      </div>

      <!-- Resident Search & Select -->
      <div class="form-group">
        <label class="form-label" for="db-resident-search-input">Select Resident <span style="color:#ef4444;">*</span></label>
        <div class="input-wrapper input-with-leading-icon">
          <svg class="input-leading-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            id="db-resident-search-input"
            class="form-input"
            placeholder="Search resident by name or flat..."
            oninput="GrihamAdminAmenitiesUI.filterResidentList(this.value)"
            aria-label="Search resident"
            autocomplete="off"
          >
        </div>
        <!-- Searchable Resident Dropdown Selection List -->
        <div class="resident-selection-scroll-box" id="db-resident-results-box">
          <!-- Populated dynamically with resident chips -->
        </div>
        <input type="hidden" id="db-selected-resident-name" required>
        <input type="hidden" id="db-selected-resident-wing">
        <input type="hidden" id="db-selected-resident-flat">
        <input type="hidden" id="db-selected-resident-phone">
      </div>

      <!-- Selected Resident Banner -->
      <div class="selected-resident-badge-card" id="db-selected-resident-banner" style="display:none;">
        <div class="sel-res-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </div>
        <div class="sel-res-info">
          <strong id="db-banner-res-name">Rajesh Kumar</strong>
          <span id="db-banner-res-flat">Wing A • Flat 102</span>
        </div>
        <button type="button" class="btn-clear-selected-res" onclick="GrihamAdminAmenitiesUI.clearSelectedResident()" aria-label="Change resident">Change</button>
      </div>

      <!-- Date & Times -->
      <div class="form-group">
        <label class="form-label" for="db-booking-date">Date <span style="color:#ef4444;">*</span></label>
        <div class="input-wrapper">
          <input type="date" id="db-booking-date" class="form-input" required value="2026-09-17" onchange="GrihamAdminAmenitiesUI.checkLiveConflictNotice()" aria-label="Booking date">
        </div>
      </div>

      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="db-start-time">Start Time <span style="color:#ef4444;">*</span></label>
          <div class="input-wrapper">
            <input type="time" id="db-start-time" class="form-input" required value="10:00" onchange="GrihamAdminAmenitiesUI.checkLiveConflictNotice()" aria-label="Start time">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="db-end-time">End Time <span style="color:#ef4444;">*</span></label>
          <div class="input-wrapper">
            <input type="time" id="db-end-time" class="form-input" required value="12:00" onchange="GrihamAdminAmenitiesUI.checkLiveConflictNotice()" aria-label="End time">
          </div>
        </div>
      </div>

      <!-- Live Booking Conflict Warning Container -->
      <div class="conflict-alert-card" id="db-conflict-card" style="display:none;">
        <div class="conflict-alert-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div class="conflict-alert-body">
          <h4 class="conflict-alert-title">Booking Conflict</h4>
          <p class="conflict-alert-desc">This amenity is already booked during part of the selected time.</p>
          <div class="conflict-existing-box" id="db-conflict-details-box">
            <!-- e.g. Existing booking: 10:00 AM – 12:00 PM (Rajesh Kumar, A-102) -->
          </div>
          <span class="conflict-tip">Please choose another time slot.</span>
        </div>
      </div>

      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="db-people-count">Number of People</label>
          <div class="input-wrapper">
            <input type="number" id="db-people-count" class="form-input" min="1" max="500" value="10" aria-label="Number of people">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="db-purpose">Purpose</label>
          <div class="input-wrapper">
            <input type="text" id="db-purpose" class="form-input" placeholder="e.g. Birthday, Family event" aria-label="Purpose">
          </div>
        </div>
      </div>

      <div class="logout-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminAmenitiesUI.closeDirectBookingSheet()">Cancel</button>
        <button type="submit" class="btn-primary-action btn-admin-style" id="btn-submit-direct-booking" style="margin-top:0; min-height:44px;">
          <span id="btn-submit-direct-booking-text">Create Booking</span>
        </button>
      </div>
    </form>
  </div>

  <!-- ================================================================= -->
  <!-- AMENITIES: 7. REJECT BOOKING BOTTOM SHEET                         -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="booking-reject-backdrop" onclick="GrihamAdminAmenitiesUI.closeRejectSheet()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet" id="booking-reject-sheet" role="dialog" aria-modal="true" aria-labelledby="bkg-reject-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminAmenitiesUI.closeRejectSheet()" aria-label="Close reject sheet" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="bkg-reject-title">Reject Booking</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-booking-reject" onsubmit="GrihamAdminAmenitiesUI.submitRejectBooking(event)" style="display:flex; flex-direction:column; gap:0.85rem; padding:0.25rem 0;">
      <p style="font-size:0.84rem; color:var(--text-secondary); line-height:1.4;">
        Reject booking request from <strong id="reject-booking-resident-name">Resident</strong> for <span id="reject-booking-amenity-name">Amenity</span>.
      </p>

      <div class="form-group">
        <label class="form-label" for="reject-booking-reason">Reason for Rejection (Optional)</label>
        <div class="input-wrapper">
          <textarea id="reject-booking-reason" class="form-input form-textarea" rows="3" placeholder="Provide a reason for the resident..." aria-label="Rejection reason"></textarea>
        </div>
      </div>

      <div class="logout-btn-row" style="margin-top:0.5rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminAmenitiesUI.closeRejectSheet()">Cancel</button>
        <button type="submit" class="btn-primary-action btn-danger-action" id="btn-submit-reject-bkg" style="margin-top:0; min-height:44px;">
          <span id="btn-submit-reject-bkg-text">Reject Booking</span>
        </button>
      </div>
    </form>
  </div>

  <!-- ================================================================= -->
  <!-- AMENITIES: 8. CANCEL BOOKING CONFIRMATION BOTTOM SHEET            -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="booking-cancel-backdrop" onclick="GrihamAdminAmenitiesUI.closeCancelSheet()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet" id="booking-cancel-sheet" role="dialog" aria-modal="true" aria-labelledby="bkg-cancel-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div style="display:flex; flex-direction:column; align-items:center; gap:1rem; text-align:center; padding: 0.5rem 0 0.25rem;">
      <div class="logout-shield-icon" style="background:rgba(239,68,68,0.12); color:#ef4444; border:2px solid rgba(239,68,68,0.3);" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>
      <h3 class="logout-title" id="bkg-cancel-title">Cancel this booking?</h3>
      <p class="logout-message">Are you sure you want to cancel the booking for <strong id="cancel-booking-amenity-name">Amenity</strong> on <span id="cancel-booking-date-text">17 Sep 2026</span>?</p>
    </div>

    <div class="logout-btn-row" style="margin-top:0.6rem;">
      <button type="button" class="btn-logout-cancel" onclick="GrihamAdminAmenitiesUI.closeCancelSheet()">Keep Booking</button>
      <button type="button" class="btn-primary-action btn-danger-action" id="btn-execute-cancel-bkg" onclick="GrihamAdminAmenitiesUI.submitCancelBooking()" style="margin-top:0; min-height:44px;">
        <span id="btn-execute-cancel-bkg-text">Cancel Booking</span>
      </button>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- BULK SERVICE: 1. BULK SERVICE DETAILS BOTTOM SHEET                 -->
  <!-- ================================================================= -->
  <div class="sheet-backdrop" id="bs-detail-backdrop" onclick="GrihamAdminBulkServiceUI.closeDetailSheet()" aria-hidden="true"></div>

  <div class="mobile-bottom-sheet bs-detail-sheet" id="bs-detail-sheet" role="dialog" aria-modal="true" aria-labelledby="bs-detail-sheet-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminBulkServiceUI.closeDetailSheet()" aria-label="Close bulk service details" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h2 class="sheet-title" id="bs-detail-sheet-title">Bulk Service Opportunity</h2>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <div class="bs-detail-content" id="bs-detail-body">
      <!-- Injected dynamically by GrihamAdminBulkServiceUI.openDetail -->
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- BULK SERVICE: 2. CREATE BULK SERVICE BOTTOM SHEET                  -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- BULK SERVICE: 3. ADD APPLICANTS BOTTOM SHEET                       -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- BULK SERVICE: 4. REMOVE APPLICANT CONFIRMATION SHEET               -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- BULK SERVICE: 5. RECORD VENDOR NEGOTIATION BOTTOM SHEET            -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- BULK SERVICE: 6. UPDATE STATUS BOTTOM SHEET                        -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- BULK SERVICE: 7. CANCEL CAMPAIGN CONFIRMATION SHEET               -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- 1. ADMIN: EDIT PROFILE BOTTOM SHEET                                -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- 2. ADMIN: EDIT SOCIETY DETAILS BOTTOM SHEET                       -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- 3. ADMIN: CHANGE PASSWORD BOTTOM SHEET                            -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- 4. ADMIN: DELETE ACCOUNT 2-STEP CONFIRMATION SHEET                -->
  <!-- ================================================================= -->
  

  

  <!-- ================================================================= -->
  <!-- JAVASCRIPT DEPENDENCIES (api.js -> app.js)                        -->
  <!-- ================================================================= -->
    <script src="js/api/api.js"></script>
  <script src="js/api/auth.api.js"></script>
  <script src="js/api/resident.api.js"></script>
  <script src="js/api/admin.api.js"></script>
  <script src="js/api/gatekeeper.api.js"></script>
  <script src="js/api/maintenance.api.js"></script>
  <script src="js/api/complaints.api.js"></script>
  <script src="js/api/amenities.api.js"></script>
  <script src="js/api/serviceRequests.api.js"></script>
  <script src="js/api/bulkServices.api.js"></script>
  <script src="js/api/staff.api.js"></script>
  <script src="js/mock/auth.mock.js"></script>
  <script src="js/mock/residents.mock.js"></script>
  <script src="js/mock/admin.mock.js"></script>
  <script src="js/mock/workers.mock.js"></script>
  <script src="js/mock/vendors.mock.js"></script>
  <script src="js/mock/complaints.mock.js"></script>
  <script src="js/mock/maintenance.mock.js"></script>
  <script src="js/mock/amenities.mock.js"></script>
  <script src="js/mock/serviceRequests.mock.js"></script>
  <script src="js/mock/bulkServices.mock.js"></script>
  <script src="js/constants.js"></script>
  <script src="js/state.js"></script>
  <script src="js/router.js"></script>
  <script src="js/auth.js"></script>
  <script src="js/utils/validation.js"></script>
  <script src="js/utils/formatting.js"></script>
  <script src="js/utils/dateTime.js"></script>
  <script src="js/utils/storage.js"></script>
  <script src="js/utils/permissions.js"></script>
  <script src="js/utils/helpers.js"></script>
  <script src="js/components/header.js"></script>
  <script src="js/components/bottomNav.js"></script>
  <script src="js/components/bottomSheet.js"></script>
  <script src="js/components/modal.js"></script>
  <script src="js/components/toast.js"></script>
  <script src="js/components/loader.js"></script>
  <script src="js/components/emptyState.js"></script>
  <script src="js/components/errorState.js"></script>
  <script src="js/components/searchBar.js"></script>
  <script src="js/components/filterSheet.js"></script>
  <script src="js/components/sortSheet.js"></script>
  <script src="js/components/statusBadge.js"></script>
  <script src="js/components/confirmation.js"></script>
  <script src="js/components/callSelector.js"></script>
  <script src="js/components/accessibilityPanel.js"></script>
  <script src="js/components/languageSelector.js"></script>
  <script src="js/pages/auth/login.js"></script>
  <script src="js/pages/auth/register.js"></script>
  <script src="js/pages/auth/forgotPassword.js"></script>
  <script src="js/pages/auth/adminLogin.js"></script>
  <script src="js/pages/admin/dashboard.js"></script>
  <script src="js/pages/admin/notifications.js"></script>
  <script src="js/pages/admin/maintenance.js"></script>
  <script src="js/pages/admin/complaints.js"></script>
  <script src="js/pages/admin/approvals.js"></script>
  <script src="js/pages/admin/workers.js"></script>
  <script src="js/pages/admin/amenities.js"></script>
  <script src="js/pages/admin/bulkServices.js"></script>
  <script src="js/pages/admin/profile.js"></script>
  <script src="js/app.js"></script>
</body>
</html>

`;
// accessibilityPanel.js component placeholder
