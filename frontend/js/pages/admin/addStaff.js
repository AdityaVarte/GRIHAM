/**
 * GRIHAM FRONTEND - ADMIN STAFF, VENDOR & GATEKEEPER MANAGEMENT
 * Page: Staff & Vendors (#admin-add-staff)
 */

window.HTML_ADMIN_ADD_STAFF = `
<div class="sheet-backdrop" id="staff-choose-backdrop" onclick="GrihamAdminAddStaffUI.closeAllSheets()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-staff-choose-type" role="dialog" aria-modal="true" aria-labelledby="staff-choose-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamAdminAddStaffUI.closeAllSheets()" aria-label="Close add type selection">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="staff-choose-title">Add Staff / Service Provider</h3>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>
  <div class="staff-type-selection-grid">
    <button type="button" class="staff-type-opt-card opt-worker" onclick="GrihamAdminAddStaffUI.openWorkerForm(false)">
      <div class="staff-type-icon-box">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </div>
      <div class="staff-type-opt-info">
        <strong class="staff-type-opt-title">Add Worker</strong>
        <span class="staff-type-opt-desc">Security guards, plumbers, electricians, housekeepers</span>
      </div>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
    </button>

    <button type="button" class="staff-type-opt-card opt-vendor" onclick="GrihamAdminAddStaffUI.openVendorForm(false)">
      <div class="staff-type-icon-box">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
      </div>
      <div class="staff-type-opt-info">
        <strong class="staff-type-opt-title">Add Vendor</strong>
        <span class="staff-type-opt-desc">Maintenance agencies, pest control, lift & equipment AMC</span>
      </div>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
    </button>

    <button type="button" class="staff-type-opt-card opt-gatekeeper" onclick="GrihamAdminAddStaffUI.openGatekeeperForm(false)">
      <div class="staff-type-icon-box">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>
      </div>
      <div class="staff-type-opt-info">
        <strong class="staff-type-opt-title">Add Gatekeeper</strong>
        <span class="staff-type-opt-desc">Security checkpoint and visitor management personnel</span>
      </div>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  </div>
</div>

<!-- WORKER FORM SHEET -->
<div class="sheet-backdrop" id="worker-form-backdrop" onclick="GrihamAdminAddStaffUI.closeAllSheets()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-worker-form" role="dialog" aria-modal="true" aria-labelledby="worker-form-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamAdminAddStaffUI.closeAllSheets()" aria-label="Close Worker Form">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="worker-form-title">Add Worker</h3>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>
  <form id="form-worker" class="staff-form" onsubmit="GrihamAdminAddStaffUI.submitWorkerForm(event)">
    <input type="hidden" id="worker-edit-id" value="">
    <div class="form-group">
      <label class="form-label" for="worker-input-name">Full Name <span class="req-star">*</span></label>
      <input type="text" id="worker-input-name" class="form-input" required placeholder="e.g. Rajesh Kumar" aria-label="Full Name">
    </div>
    <div class="form-group">
      <label class="form-label" for="worker-input-phone">Phone Number <span class="req-star">*</span></label>
      <input type="tel" id="worker-input-phone" class="form-input" required placeholder="e.g. +91 98765 43210" aria-label="Phone Number">
    </div>
    <div class="form-group">
      <label class="form-label" for="worker-input-email">Email <span style="font-weight:400; opacity:0.7;">(Optional)</span></label>
      <input type="email" id="worker-input-email" class="form-input" placeholder="e.g. rajesh@example.com" aria-label="Email Address">
    </div>
    <div class="form-row-2col">
      <div class="form-group">
        <label class="form-label" for="worker-input-role">Role <span class="req-star">*</span></label>
        <input type="text" id="worker-input-role" class="form-input" required placeholder="e.g. Security Guard" list="worker-role-suggestions" aria-label="Role">
        <datalist id="worker-role-suggestions">
          <option value="Security Guard"></option>
          <option value="Plumber"></option>
          <option value="Electrician"></option>
          <option value="Cleaner"></option>
          <option value="Gardener"></option>
          <option value="Maintenance Worker"></option>
          <option value="Carpenter"></option>
          <option value="Other"></option>
        </datalist>
      </div>
      <div class="form-group">
        <label class="form-label" for="worker-select-category">Category <span class="req-star">*</span></label>
        <select id="worker-select-category" class="form-select" required aria-label="Category">
          <option value="Security">Security</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Gardening">Gardening</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
    <div class="form-row-2col">
      <div class="form-group">
        <label class="form-label" for="worker-input-society">Society ID <span class="req-star">*</span></label>
        <input type="text" id="worker-input-society" class="form-input" required value="GRIHAM-PUNE-001" aria-label="Society ID">
      </div>
      <div class="form-group">
        <label class="form-label" for="worker-input-joining">Joining Date <span class="req-star">*</span></label>
        <input type="date" id="worker-input-joining" class="form-input" required aria-label="Joining Date">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label" for="worker-select-status">Status</label>
      <select id="worker-select-status" class="form-select" aria-label="Status">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
    <div class="staff-form-actions">
      <button type="button" class="btn-form-cancel" onclick="GrihamAdminAddStaffUI.closeAllSheets()">Cancel</button>
      <button type="submit" class="btn-form-submit" id="btn-worker-submit">Save Worker</button>
    </div>
  </form>
</div>

<!-- VENDOR FORM SHEET -->
<div class="sheet-backdrop" id="vendor-form-backdrop" onclick="GrihamAdminAddStaffUI.closeAllSheets()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-vendor-form" role="dialog" aria-modal="true" aria-labelledby="vendor-form-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamAdminAddStaffUI.closeAllSheets()" aria-label="Close Vendor Form">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="vendor-form-title">Add Vendor</h3>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>
  <form id="form-vendor" class="staff-form" onsubmit="GrihamAdminAddStaffUI.submitVendorForm(event)">
    <input type="hidden" id="vendor-edit-id" value="">
    <div class="form-group">
      <label class="form-label" for="vendor-input-name">Business Name <span class="req-star">*</span></label>
      <input type="text" id="vendor-input-name" class="form-input" required placeholder="e.g. Ramesh Plumbing Services" aria-label="Business Name">
    </div>
    <div class="form-row-2col">
      <div class="form-group">
        <label class="form-label" for="vendor-input-contact">Contact Person <span class="req-star">*</span></label>
        <input type="text" id="vendor-input-contact" class="form-input" required placeholder="e.g. Ramesh Kumar" aria-label="Contact Person">
      </div>
      <div class="form-group">
        <label class="form-label" for="vendor-input-phone">Phone Number <span class="req-star">*</span></label>
        <input type="tel" id="vendor-input-phone" class="form-input" required placeholder="e.g. +91 98123 45678" aria-label="Phone Number">
      </div>
    </div>
    <div class="form-row-2col">
      <div class="form-group">
        <label class="form-label" for="vendor-select-category">Category <span class="req-star">*</span></label>
        <select id="vendor-select-category" class="form-select" required aria-label="Category">
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Security">Security</option>
          <option value="Gardening">Gardening</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="vendor-input-email">Email <span style="font-weight:400; opacity:0.7;">(Optional)</span></label>
        <input type="email" id="vendor-input-email" class="form-input" placeholder="e.g. vendor@example.com" aria-label="Email">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label" for="vendor-input-address">Address <span style="font-weight:400; opacity:0.7;">(Optional)</span></label>
      <input type="text" id="vendor-input-address" class="form-input" placeholder="e.g. Shop 12, Market Yard, Pune" aria-label="Address">
    </div>
    <div class="form-group">
      <label class="form-label" for="vendor-input-desc">Service Description <span style="font-weight:400; opacity:0.7;">(Optional)</span></label>
      <textarea id="vendor-input-desc" class="form-textarea" rows="2" placeholder="e.g. Pipeline repairs, leakage fixes, annual maintenance" aria-label="Service Description"></textarea>
    </div>
    <div class="form-row-2col">
      <div class="form-group">
        <label class="form-label" for="vendor-input-society">Society ID <span class="req-star">*</span></label>
        <input type="text" id="vendor-input-society" class="form-input" required value="GRIHAM-PUNE-001" aria-label="Society ID">
      </div>
      <div class="form-group">
        <label class="form-label" for="vendor-input-added">Added Date</label>
        <input type="date" id="vendor-input-added" class="form-input" aria-label="Added Date">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label" for="vendor-select-status">Status</label>
      <select id="vendor-select-status" class="form-select" aria-label="Status">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
    <div class="staff-form-actions">
      <button type="button" class="btn-form-cancel" onclick="GrihamAdminAddStaffUI.closeAllSheets()">Cancel</button>
      <button type="submit" class="btn-form-submit" id="btn-vendor-submit">Save Vendor</button>
    </div>
  </form>
</div>

<!-- GATEKEEPER FORM SHEET -->
<div class="sheet-backdrop" id="gatekeeper-form-backdrop" onclick="GrihamAdminAddStaffUI.closeAllSheets()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-gatekeeper-form" role="dialog" aria-modal="true" aria-labelledby="gatekeeper-form-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamAdminAddStaffUI.closeAllSheets()" aria-label="Close Gatekeeper Form">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="gatekeeper-form-title">Add Gatekeeper</h3>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>
  <form id="form-gatekeeper" class="staff-form" onsubmit="GrihamAdminAddStaffUI.submitGatekeeperForm(event)">
    <input type="hidden" id="gatekeeper-edit-id" value="">
    <div class="form-group">
      <label class="form-label" for="gatekeeper-input-name">Full Name <span class="req-star">*</span></label>
      <input type="text" id="gatekeeper-input-name" class="form-input" required placeholder="e.g. Amit Sharma" aria-label="Full Name">
    </div>
    <div class="form-group">
      <label class="form-label" for="gatekeeper-input-phone">Phone Number <span class="req-star">*</span></label>
      <input type="tel" id="gatekeeper-input-phone" class="form-input" required placeholder="e.g. +91 98765 43211" aria-label="Phone Number">
    </div>
    <div class="form-group">
      <label class="form-label" for="gatekeeper-input-email">Email <span style="font-weight:400; opacity:0.7;">(Optional)</span></label>
      <input type="email" id="gatekeeper-input-email" class="form-input" placeholder="e.g. amit@example.com" aria-label="Email">
    </div>
    <div class="form-row-2col">
      <div class="form-group">
        <label class="form-label" for="gatekeeper-input-society">Society ID <span class="req-star">*</span></label>
        <input type="text" id="gatekeeper-input-society" class="form-input" required value="GRIHAM-PUNE-001" aria-label="Society ID">
      </div>
      <div class="form-group">
        <label class="form-label" for="gatekeeper-input-joining">Joining Date <span class="req-star">*</span></label>
        <input type="date" id="gatekeeper-input-joining" class="form-input" required aria-label="Joining Date">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label" for="gatekeeper-select-status">Status</label>
      <select id="gatekeeper-select-status" class="form-select" aria-label="Status">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
    <div class="staff-form-actions">
      <button type="button" class="btn-form-cancel" onclick="GrihamAdminAddStaffUI.closeAllSheets()">Cancel</button>
      <button type="submit" class="btn-form-submit" id="btn-gatekeeper-submit">Save Gatekeeper</button>
    </div>
  </form>
</div>

<!-- DETAILS SHEET -->
<div class="sheet-backdrop" id="staff-details-backdrop" onclick="GrihamAdminAddStaffUI.closeAllSheets()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-staff-details" role="dialog" aria-modal="true" aria-labelledby="staff-details-title-el" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamAdminAddStaffUI.closeAllSheets()" aria-label="Close Details">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="staff-details-title-el">Details</h3>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>
  <div class="staff-details-sheet-body">
    <div class="staff-details-hero">
      <div class="staff-avatar-badge" id="staff-detail-avatar">W</div>
      <div class="staff-details-hero-info">
        <strong class="staff-details-title" id="staff-detail-name">—</strong>
        <span class="staff-details-subtitle" id="staff-detail-subtitle">—</span>
      </div>
      <span class="staff-status-pill status-active" id="staff-detail-status-pill">
        <span class="staff-status-dot"></span>
        <span id="staff-detail-status-text">Active</span>
      </span>
    </div>

    <div class="staff-details-table" id="staff-detail-fields-table">
      <!-- Injected dynamically based on Worker / Vendor / Gatekeeper -->
    </div>

    <div class="staff-details-actions">
      <button type="button" class="btn-details-action action-call" id="btn-detail-action-call" onclick="GrihamAdminAddStaffUI.handleCallCurrentRecord()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span>Call</span>
      </button>

      <button type="button" class="btn-details-action action-edit" id="btn-detail-action-edit" onclick="GrihamAdminAddStaffUI.handleEditCurrentRecord()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        <span>Edit</span>
      </button>

      <button type="button" class="btn-details-action action-deactivate" id="btn-detail-action-deactivate" onclick="GrihamAdminAddStaffUI.openDeactivateModal()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
        <span>Deactivate</span>
      </button>
    </div>
  </div>
</div>

<!-- DEACTIVATE CONFIRMATION MODAL -->
<div class="sheet-backdrop" id="staff-deactivate-backdrop" onclick="GrihamAdminAddStaffUI.closeDeactivateModal()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-staff-deactivate-confirm" role="dialog" aria-modal="true" aria-labelledby="deactivate-confirm-title" aria-hidden="true" style="padding-bottom:calc(1.5rem + var(--safe-bottom));">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div style="display:flex; flex-direction:column; align-items:center; text-align:center; gap:0.8rem; padding:0.75rem 0 0.5rem;">
    <div style="width:54px; height:54px; border-radius:50%; background:rgba(239,68,68,0.12); color:#ef4444; border:2px solid rgba(239,68,68,0.3); display:flex; align-items:center; justify-content:center;">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
    </div>
    <h3 class="sheet-title" id="deactivate-confirm-title">Deactivate this record?</h3>
    <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.45; max-width:320px;">
      The record will remain in the system but will no longer be active.
    </p>
  </div>
  <div class="staff-form-actions" style="margin-top:0.6rem;">
    <button type="button" class="btn-form-cancel" onclick="GrihamAdminAddStaffUI.closeDeactivateModal()">Cancel</button>
    <button type="button" class="btn-form-submit" style="background:#ef4444;" onclick="GrihamAdminAddStaffUI.confirmDeactivate()">Deactivate</button>
  </div>
</div>

<!-- DUPLICATE PHONE WARNING SHEET -->
<div class="sheet-backdrop" id="staff-dup-backdrop" onclick="GrihamAdminAddStaffUI.closeDuplicateWarning()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-staff-dup-warning" role="dialog" aria-modal="true" aria-labelledby="dup-warning-title-text" aria-hidden="true" style="padding-bottom:calc(1.5rem + var(--safe-bottom));">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="duplicate-warning-sheet">
    <div class="dup-warning-icon">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    </div>
    <h3 class="dup-warning-title" id="dup-warning-title-text">Duplicate Phone Number</h3>
    <p class="dup-warning-msg">This phone number is already registered in this society.</p>
    
    <div class="dup-existing-card" id="dup-existing-card-body">
      <!-- Existing record preview injected dynamically -->
    </div>

    <div class="staff-form-actions" style="width:100%; margin-top:0.4rem;">
      <button type="button" class="btn-form-cancel" style="flex:1;" onclick="GrihamAdminAddStaffUI.closeDuplicateWarning()">Cancel</button>
    </div>
  </div>
</div>

<!-- FILTER BOTTOM SHEET -->
<div class="sheet-backdrop" id="staff-filter-backdrop" onclick="GrihamAdminAddStaffUI.closeFilterSheet()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-staff-filter" role="dialog" aria-modal="true" aria-labelledby="staff-filter-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamAdminAddStaffUI.closeFilterSheet()" aria-label="Close Filters">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="staff-filter-title">Filter Directory</h3>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>
  <div class="staff-form" style="gap:1rem;">
    <div class="form-group">
      <label class="form-label">Record Type</label>
      <select id="staff-filter-select-type" class="form-select" aria-label="Filter Type">
        <option value="all">All Types</option>
        <option value="worker">Worker</option>
        <option value="vendor">Vendor</option>
        <option value="gatekeeper">Gatekeeper</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Category</label>
      <select id="staff-filter-select-cat" class="form-select" aria-label="Filter Category">
        <option value="all">All Categories</option>
        <option value="Plumbing">Plumbing</option>
        <option value="Electrical">Electrical</option>
        <option value="Cleaning">Cleaning</option>
        <option value="Security">Security</option>
        <option value="Gardening">Gardening</option>
        <option value="Maintenance">Maintenance</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Status</label>
      <select id="staff-filter-select-status" class="form-select" aria-label="Filter Status">
        <option value="all">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>

    <div class="staff-form-actions" style="margin-top:0.4rem;">
      <button type="button" class="btn-form-cancel" onclick="GrihamAdminAddStaffUI.clearFilters()">Clear Filters</button>
      <button type="button" class="btn-form-submit" onclick="GrihamAdminAddStaffUI.applyFilters()">Apply Filters</button>
    </div>
  </div>
</div>

<!-- SORT BOTTOM SHEET -->
<div class="sheet-backdrop" id="staff-sort-backdrop" onclick="GrihamAdminAddStaffUI.closeSortSheet()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-staff-sort" role="dialog" aria-modal="true" aria-labelledby="staff-sort-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamAdminAddStaffUI.closeSortSheet()" aria-label="Close Sort">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="staff-sort-title">Sort Directory</h3>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>
  <div class="staff-type-selection-grid" style="gap:0.5rem;">
    <button type="button" class="staff-type-opt-card" onclick="GrihamAdminAddStaffUI.selectSort('name-asc')">
      <div class="staff-type-opt-info">
        <strong class="staff-type-opt-title">Name A-Z</strong>
        <span class="staff-type-opt-desc">Alphabetical ascending order</span>
      </div>
      <span id="sort-check-name-asc" style="display:none; color:var(--admin-accent);">✓</span>
    </button>
    <button type="button" class="staff-type-opt-card" onclick="GrihamAdminAddStaffUI.selectSort('name-desc')">
      <div class="staff-type-opt-info">
        <strong class="staff-type-opt-title">Name Z-A</strong>
        <span class="staff-type-opt-desc">Alphabetical descending order</span>
      </div>
      <span id="sort-check-name-desc" style="display:none; color:var(--admin-accent);">✓</span>
    </button>
    <button type="button" class="staff-type-opt-card" onclick="GrihamAdminAddStaffUI.selectSort('newest')">
      <div class="staff-type-opt-info">
        <strong class="staff-type-opt-title">Newest Added</strong>
        <span class="staff-type-opt-desc">Recently added staff & vendors first</span>
      </div>
      <span id="sort-check-newest" style="display:none; color:var(--admin-accent);">✓</span>
    </button>
    <button type="button" class="staff-type-opt-card" onclick="GrihamAdminAddStaffUI.selectSort('oldest')">
      <div class="staff-type-opt-info">
        <strong class="staff-type-opt-title">Oldest Added</strong>
        <span class="staff-type-opt-desc">First registered records first</span>
      </div>
      <span id="sort-check-oldest" style="display:none; color:var(--admin-accent);">✓</span>
    </button>
  </div>
</div>

<!-- ================================================================= -->
<!-- MAIN SCREEN VIEW: Staff & Vendors (#admin-add-staff)               -->
<!-- ================================================================= -->
<section id="screen-admin-add-staff" class="app-view" aria-labelledby="staff-header-title">

  <!-- Sticky Top Header -->
  <div class="screen-top-bar screen-top-bar-sticky">
    ${GrihamHeader.renderBackButton({
      onClick: 'GrihamRouter.goBack()',
      id: 'btn-staff-top-back',
      ariaLabel: 'Back'
    })}

    <h1 class="top-bar-screen-title" id="staff-header-title" data-i18n="staff_vendors_title">Staff &amp; Vendors</h1>

    <button type="button" class="btn-top-filter" onclick="GrihamA11y.toggleSheet(true)" id="btn-staff-a11y" aria-label="Accessibility" title="Accessibility">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="4" r="2"/>
        <path d="M12 6v6"/>
        <path d="m8 10 4-1 4 1"/>
        <path d="m9 20 3-8 3 8"/>
        <path d="M6 13h12"/>
      </svg>
    </button>
  </div>

  <!-- Summary Metrics Cards -->
  <div class="staff-summary-section">
    <div class="staff-summary-grid">
      <div class="staff-sum-card card-workers" onclick="GrihamAdminAddStaffUI.setTab('worker')" role="button" tabindex="0" aria-label="Filter Workers">
        <span class="staff-sum-label">Workers</span>
        <strong class="staff-sum-val" id="staff-stat-workers">0</strong>
      </div>
      <div class="staff-sum-card card-vendors" onclick="GrihamAdminAddStaffUI.setTab('vendor')" role="button" tabindex="0" aria-label="Filter Vendors">
        <span class="staff-sum-label">Vendors</span>
        <strong class="staff-sum-val" id="staff-stat-vendors">0</strong>
      </div>
      <div class="staff-sum-card card-gatekeepers" onclick="GrihamAdminAddStaffUI.setTab('gatekeeper')" role="button" tabindex="0" aria-label="Filter Gatekeepers">
        <span class="staff-sum-label">Gatekeepers</span>
        <strong class="staff-sum-val" id="staff-stat-gatekeepers">0</strong>
      </div>
      <div class="staff-sum-card card-active" onclick="GrihamAdminAddStaffUI.setTab('all')" role="button" tabindex="0" aria-label="Filter Active">
        <span class="staff-sum-label">Active</span>
        <strong class="staff-sum-val" id="staff-stat-active">0</strong>
      </div>
    </div>
  </div>

  <!-- Segmented Tabs -->
  <div class="staff-tabs-container" role="tablist" aria-label="Directory Categories">
    <button type="button" class="staff-tab-btn active" data-tab="all" role="tab" aria-selected="true" onclick="GrihamAdminAddStaffUI.setTab('all')">All</button>
    <button type="button" class="staff-tab-btn" data-tab="worker" role="tab" aria-selected="false" onclick="GrihamAdminAddStaffUI.setTab('worker')">Workers</button>
    <button type="button" class="staff-tab-btn" data-tab="vendor" role="tab" aria-selected="false" onclick="GrihamAdminAddStaffUI.setTab('vendor')">Vendors</button>
    <button type="button" class="staff-tab-btn" data-tab="gatekeeper" role="tab" aria-selected="false" onclick="GrihamAdminAddStaffUI.setTab('gatekeeper')">Gatekeepers</button>
  </div>

  <!-- Search & Controls Bar -->
  <div class="staff-controls-bar">
    <div class="staff-search-wrapper">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="input-icon-left" aria-hidden="true">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        id="staff-search-input"
        class="form-input staff-search-input"
        placeholder="Search by name, phone, role or category"
        oninput="GrihamAdminAddStaffUI.handleSearchInput(this.value)"
        aria-label="Search directory"
      >
      <button type="button" class="btn-search-clear" id="btn-staff-search-clear" onclick="GrihamAdminAddStaffUI.clearSearch()" style="display:none;" aria-label="Clear search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <button type="button" class="staff-ctrl-btn" id="btn-staff-filter-trigger" onclick="GrihamAdminAddStaffUI.openFilterSheet()" aria-label="Filter records">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
      <span>Filter</span>
      <span class="staff-filter-count-badge" id="staff-filter-badge" style="display:none;">0</span>
    </button>

    <button type="button" class="staff-ctrl-btn" onclick="GrihamAdminAddStaffUI.openSortSheet()" aria-label="Sort records">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>
      <span>Sort</span>
    </button>
  </div>

  <!-- Loading Skeleton -->
  <div id="staff-loading-skeleton" class="staff-directory-container" style="display:none;">
    <div class="staff-skeleton-card"></div>
    <div class="staff-skeleton-card"></div>
    <div class="staff-skeleton-card"></div>
    <div class="staff-skeleton-card"></div>
  </div>

  <!-- Error State -->
  <div id="staff-error-state" class="staff-state-card" style="display:none;">
    <div class="staff-state-icon" style="color:#ef4444;">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    </div>
    <strong class="staff-state-title">Unable to load staff records.</strong>
    <p class="staff-state-desc">Could not connect to directory services. Please check your connection and retry.</p>
    <button type="button" class="staff-btn-retry" onclick="GrihamAdminAddStaffUI.loadData()">Retry</button>
  </div>

  <!-- Empty State -->
  <div id="staff-empty-state" class="staff-state-card" style="display:none;">
    <div class="staff-state-icon">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
    </div>
    <strong class="staff-state-title">No staff or service providers found.</strong>
    <p class="staff-state-desc">There are no records in the directory for this society yet.</p>
    <button type="button" class="btn-form-submit" style="width:auto; padding:0.55rem 1.4rem; min-height:38px; margin-top:0.4rem;" onclick="GrihamAdminAddStaffUI.openAddSheet()">+ Add</button>
  </div>

  <!-- Search Empty State -->
  <div id="staff-search-empty-state" class="staff-state-card" style="display:none;">
    <div class="staff-state-icon">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </div>
    <strong class="staff-state-title">No matching records</strong>
    <p class="staff-state-desc" id="staff-search-empty-desc">No records match your selected search or filter criteria.</p>
    <button type="button" class="staff-btn-clear-search" onclick="GrihamAdminAddStaffUI.clearAllFilters()">Clear Search / Clear Filters</button>
  </div>

  <!-- Staff Directory List -->
  <div class="staff-directory-container" id="staff-cards-container">
    <!-- Populated dynamically by GrihamAdminAddStaffUI -->
  </div>

  <!-- Floating / Fixed Add Button -->
  <button type="button" class="staff-fixed-add-btn" id="btn-staff-floating-add" onclick="GrihamAdminAddStaffUI.openAddSheet()" aria-label="Add Staff, Vendor or Gatekeeper">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
    <span>Add</span>
  </button>

</section>
`;

/**
 * Controller Object for Staff, Vendor & Gatekeeper Management
 */
const GrihamAdminAddStaffUI = {
  state: {
    records: [],
    summary: { total: 0, workers: 0, vendors: 0, gatekeepers: 0, active: 0 },
    activeTab: "all", // "all", "worker", "vendor", "gatekeeper"
    searchQuery: "",
    filterType: "all",
    filterCategory: "all",
    filterStatus: "all",
    sortBy: "newest", // "name-asc", "name-desc", "newest", "oldest"
    currentRecord: null,
    isEditing: false,
    isInitialized: false,
    currentSocietyId: "GRIHAM-PUNE-001"
  },

  init() {
    if (typeof GrihamAuth !== "undefined") {
      if (!GrihamAuth.hasRole("admin")) {
        return;
      }
      const user = GrihamAuth.getUser();
      const socId = (user && (user.society_id || user.societyId)) || GrihamAuth.getSocietyId();
      if (socId) {
        this.state.currentSocietyId = socId;
      }
    }

    this.bindEventsOnce();
    this.loadData();
  },

  bindEventsOnce() {
    if (this.state.isInitialized) return;
    this.state.isInitialized = true;
    this.updateSortUI();
  },

  async loadData() {
    const skeleton = document.getElementById("staff-loading-skeleton");
    const container = document.getElementById("staff-cards-container");
    const emptyState = document.getElementById("staff-empty-state");
    const searchEmptyState = document.getElementById("staff-search-empty-state");
    const errorState = document.getElementById("staff-error-state");

    if (skeleton) skeleton.style.display = "flex";
    if (container) container.style.display = "none";
    if (emptyState) emptyState.style.display = "none";
    if (searchEmptyState) searchEmptyState.style.display = "none";
    if (errorState) errorState.style.display = "none";

    try {
      const res = await GrihamAPI.getStaff();
      this.state.records = res.staff || [];
      this.state.summary = res.summary || {
        total: this.state.records.length,
        workers: this.state.records.filter(r => r.type === "worker").length,
        vendors: this.state.records.filter(r => r.type === "vendor").length,
        gatekeepers: this.state.records.filter(r => r.type === "gatekeeper").length,
        active: this.state.records.filter(r => r.status === "Active").length
      };

      this.renderSummary();
      this.renderDirectory();
    } catch (err) {
      console.error("[Staff UI] Error loading directory:", err);
      if (errorState) errorState.style.display = "flex";
    } finally {
      if (skeleton) skeleton.style.display = "none";
    }
  },

  renderSummary() {
    const s = this.state.summary;
    const wEl = document.getElementById("staff-stat-workers");
    const vEl = document.getElementById("staff-stat-vendors");
    const gEl = document.getElementById("staff-stat-gatekeepers");
    const aEl = document.getElementById("staff-stat-active");

    if (wEl) wEl.textContent = s.workers ?? 0;
    if (vEl) vEl.textContent = s.vendors ?? 0;
    if (gEl) gEl.textContent = s.gatekeepers ?? 0;
    if (aEl) aEl.textContent = s.active ?? 0;
  },

  setTab(tab) {
    this.state.activeTab = tab;
    if (typeof GrihamTabs !== "undefined") {
      GrihamTabs.activate(".staff-tabs-row", `[data-tab="${tab}"]`);
    } else {
      document.querySelectorAll(".staff-tab-btn").forEach(btn => {
        const isMatch = btn.getAttribute("data-tab") === tab;
        btn.classList.toggle("active", isMatch);
        btn.setAttribute("aria-selected", isMatch ? "true" : "false");
      });
    }
    this.renderDirectory();
  },

  handleSearchInput(val) {
    this.state.searchQuery = (val || "").trim().toLowerCase();
    if (typeof GrihamSearchBar !== "undefined") {
      GrihamSearchBar.syncClearButton("staff-search-input", "btn-staff-search-clear");
    } else {
      const clearBtn = document.getElementById("btn-staff-search-clear");
      if (clearBtn) {
        clearBtn.style.display = this.state.searchQuery ? "flex" : "none";
      }
    }
    this.renderDirectory();
  },

  clearSearch() {
    if (typeof GrihamSearchBar !== "undefined") {
      GrihamSearchBar.handleClear("staff-search-input", "btn-staff-search-clear", () => this.handleSearchInput(""));
    } else {
      const input = document.getElementById("staff-search-input");
      if (input) input.value = "";
      this.handleSearchInput("");
    }
  },

  renderDirectory() {
    const container = document.getElementById("staff-cards-container");
    const emptyState = document.getElementById("staff-empty-state");
    const searchEmptyState = document.getElementById("staff-search-empty-state");
    const searchDesc = document.getElementById("staff-search-empty-desc");

    if (!container) return;

    let list = [...this.state.records];

    // 1. Tab Filtering (All, Workers, Vendors, Gatekeepers)
    if (this.state.activeTab !== "all") {
      list = list.filter(r => r.type === this.state.activeTab);
    }

    // 2. Additional Filter: Type
    if (this.state.filterType !== "all") {
      list = list.filter(r => r.type === this.state.filterType);
    }

    // 3. Additional Filter: Category
    if (this.state.filterCategory !== "all") {
      list = list.filter(r => (r.category || "").toLowerCase() === this.state.filterCategory.toLowerCase());
    }

    // 4. Additional Filter: Status
    if (this.state.filterStatus !== "all") {
      list = list.filter(r => (r.status || "").toLowerCase() === this.state.filterStatus.toLowerCase());
    }

    // 5. Search Filtering
    if (this.state.searchQuery) {
      const q = this.state.searchQuery;
      list = list.filter(r => {
        const nameMatch = (r.name || "").toLowerCase().includes(q);
        const phoneMatch = (r.phone || "").toLowerCase().includes(q);
        const roleMatch = (r.role || "").toLowerCase().includes(q);
        const catMatch = (r.category || "").toLowerCase().includes(q);
        const contactMatch = (r.contactPerson || "").toLowerCase().includes(q);
        return nameMatch || phoneMatch || roleMatch || catMatch || contactMatch;
      });
    }

    // 6. Sorting
    list.sort((a, b) => {
      if (this.state.sortBy === "name-asc") {
        return (a.name || "").localeCompare(b.name || "");
      } else if (this.state.sortBy === "name-desc") {
        return (b.name || "").localeCompare(a.name || "");
      } else if (this.state.sortBy === "oldest") {
        const dateA = new Date(a.joiningDate || a.addedDate || 0);
        const dateB = new Date(b.joiningDate || b.addedDate || 0);
        return dateA - dateB;
      } else {
        // "newest"
        const dateA = new Date(a.joiningDate || a.addedDate || 0);
        const dateB = new Date(b.joiningDate || b.addedDate || 0);
        return dateB - dateA;
      }
    });

    // Check states
    if (list.length === 0) {
      container.style.display = "none";
      const hasFiltersApplied = this.state.searchQuery || this.state.filterCategory !== "all" || this.state.filterStatus !== "all" || this.state.filterType !== "all";
      if (hasFiltersApplied) {
        if (emptyState) emptyState.style.display = "none";
        if (searchEmptyState) {
          searchEmptyState.style.display = "flex";
          if (searchDesc) {
            searchDesc.textContent = this.state.searchQuery
              ? `No matching records found for "${this.state.searchQuery}".`
              : "No records match the active filter criteria.";
          }
        }
      } else {
        if (searchEmptyState) searchEmptyState.style.display = "none";
        if (emptyState) emptyState.style.display = "flex";
      }
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (searchEmptyState) searchEmptyState.style.display = "none";
    container.style.display = "flex";

    container.innerHTML = list.map(r => this.buildCardHtml(r)).join("");
  },

  buildCardHtml(record) {
    const isWorker = record.type === "worker";
    const isVendor = record.type === "vendor";
    const isGtk = record.type === "gatekeeper";

    const typeTagClass = isWorker ? "type-worker" : isVendor ? "type-vendor" : "type-gatekeeper";
    const avatarClass = isWorker ? "avatar-worker" : isVendor ? "avatar-vendor" : "avatar-gatekeeper";
    const initial = (record.name || "S").charAt(0).toUpperCase();

    const isActive = record.status === "Active";
    const statusPillClass = isActive ? "status-active" : "status-inactive";

    let roleSubtitle = "";
    if (isWorker) {
      roleSubtitle = `<span class="staff-type-tag ${typeTagClass}">Worker</span><span>•</span><span>${this.escapeHtml(record.role || record.category || "Staff")}</span>`;
    } else if (isVendor) {
      roleSubtitle = `<span class="staff-type-tag ${typeTagClass}">Vendor</span><span>•</span><span>${this.escapeHtml(record.contactPerson || "Contact")}</span>`;
    } else {
      roleSubtitle = `<span class="staff-type-tag ${typeTagClass}">Gatekeeper</span>`;
    }

    const categoryChip = record.category ? `<span class="staff-cat-badge">${this.escapeHtml(record.category)}</span>` : "";

    return `
      <div class="staff-record-card" onclick="GrihamAdminAddStaffUI.openDetails('${record.id}')" role="button" tabindex="0" aria-label="View details for ${this.escapeHtml(record.name)}">
        <div class="staff-card-top">
          <div class="staff-card-main-info">
            <div class="staff-avatar-badge ${avatarClass}">${initial}</div>
            <div class="staff-text-group">
              <h3 class="staff-card-name">${this.escapeHtml(record.name)}</h3>
              <div class="staff-card-role-line">${roleSubtitle}</div>
            </div>
          </div>
          <span class="staff-status-pill ${statusPillClass}">
            <span class="staff-status-dot"></span>
            <span>${this.escapeHtml(record.status || "Active")}</span>
          </span>
        </div>

        <div class="staff-card-bottom">
          <div class="staff-card-contact-row">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>${this.escapeHtml(record.phone || "—")}</span>
          </div>
          
          <div class="staff-card-actions-quick">
            ${categoryChip}
            <button type="button" class="btn-card-quick-call" onclick="event.stopPropagation(); GrihamAdminAddStaffUI.handleCallRecord('${record.id}')" aria-label="Call ${this.escapeHtml(record.name)}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Call</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // -----------------------------------------------------------------
  // DETAILS BOTTOM SHEET
  // -----------------------------------------------------------------
  openDetails(id) {
    const record = this.state.records.find(r => r.id === id);
    if (!record) return;

    this.state.currentRecord = record;

    const sheet = document.getElementById("sheet-staff-details");
    const backdrop = document.getElementById("staff-details-backdrop");

    // Header info
    const nameEl = document.getElementById("staff-detail-name");
    const subEl = document.getElementById("staff-detail-subtitle");
    const avatarEl = document.getElementById("staff-detail-avatar");
    const statusPill = document.getElementById("staff-detail-status-pill");
    const statusText = document.getElementById("staff-detail-status-text");

    if (nameEl) nameEl.textContent = record.name;
    if (subEl) {
      subEl.textContent = record.type === "worker"
        ? `Worker • ${record.role || record.category}`
        : record.type === "vendor"
        ? `Vendor • ${record.category || "Service Provider"}`
        : "Gatekeeper • Security Personnel";
    }

    if (avatarEl) {
      avatarEl.textContent = (record.name || "S").charAt(0).toUpperCase();
      avatarEl.className = `staff-avatar-badge avatar-${record.type}`;
    }

    const isActive = record.status === "Active";
    if (statusPill && statusText) {
      statusPill.className = `staff-status-pill ${isActive ? "status-active" : "status-inactive"}`;
      statusText.textContent = record.status || "Active";
    }

    // Build fields table
    const tableEl = document.getElementById("staff-detail-fields-table");
    if (tableEl) {
      let rows = "";
      if (record.type === "worker") {
        rows = `
          <div class="staff-details-row"><span class="staff-details-label">Full Name</span><strong class="staff-details-value">${this.escapeHtml(record.name)}</strong></div>
          <div class="staff-details-row"><span class="staff-details-label">Phone</span><strong class="staff-details-value">${this.escapeHtml(record.phone)}</strong></div>
          <div class="staff-details-row"><span class="staff-details-label">Email</span><span class="staff-details-value">${this.escapeHtml(record.email || "—")}</span></div>
          <div class="staff-details-row"><span class="staff-details-label">Role</span><strong class="staff-details-value">${this.escapeHtml(record.role || "—")}</strong></div>
          <div class="staff-details-row"><span class="staff-details-label">Category</span><span class="staff-details-value">${this.escapeHtml(record.category || "—")}</span></div>
          <div class="staff-details-row"><span class="staff-details-label">Society ID</span><span class="staff-details-value">${this.escapeHtml(record.societyId || "—")}</span></div>
          <div class="staff-details-row"><span class="staff-details-label">Joining Date</span><span class="staff-details-value">${this.escapeHtml(record.joiningDate || "—")}</span></div>
          <div class="staff-details-row"><span class="staff-details-label">Status</span><strong class="staff-details-value">${this.escapeHtml(record.status || "Active")}</strong></div>
        `;
      } else if (record.type === "vendor") {
        rows = `
          <div class="staff-details-row"><span class="staff-details-label">Business Name</span><strong class="staff-details-value">${this.escapeHtml(record.name)}</strong></div>
          <div class="staff-details-row"><span class="staff-details-label">Contact Person</span><strong class="staff-details-value">${this.escapeHtml(record.contactPerson || "—")}</strong></div>
          <div class="staff-details-row"><span class="staff-details-label">Phone</span><strong class="staff-details-value">${this.escapeHtml(record.phone)}</strong></div>
          <div class="staff-details-row"><span class="staff-details-label">Email</span><span class="staff-details-value">${this.escapeHtml(record.email || "—")}</span></div>
          <div class="staff-details-row"><span class="staff-details-label">Category</span><span class="staff-details-value">${this.escapeHtml(record.category || "—")}</span></div>
          <div class="staff-details-row"><span class="staff-details-label">Address</span><span class="staff-details-value">${this.escapeHtml(record.address || "—")}</span></div>
          <div class="staff-details-row"><span class="staff-details-label">Service Desc</span><span class="staff-details-value">${this.escapeHtml(record.serviceDescription || "—")}</span></div>
          <div class="staff-details-row"><span class="staff-details-label">Society ID</span><span class="staff-details-value">${this.escapeHtml(record.societyId || "—")}</span></div>
          <div class="staff-details-row"><span class="staff-details-label">Added Date</span><span class="staff-details-value">${this.escapeHtml(record.addedDate || "—")}</span></div>
          <div class="staff-details-row"><span class="staff-details-label">Status</span><strong class="staff-details-value">${this.escapeHtml(record.status || "Active")}</strong></div>
        `;
      } else {
        // gatekeeper
        rows = `
          <div class="staff-details-row"><span class="staff-details-label">Full Name</span><strong class="staff-details-value">${this.escapeHtml(record.name)}</strong></div>
          <div class="staff-details-row"><span class="staff-details-label">Phone</span><strong class="staff-details-value">${this.escapeHtml(record.phone)}</strong></div>
          <div class="staff-details-row"><span class="staff-details-label">Email</span><span class="staff-details-value">${this.escapeHtml(record.email || "—")}</span></div>
          <div class="staff-details-row"><span class="staff-details-label">Society ID</span><span class="staff-details-value">${this.escapeHtml(record.societyId || "—")}</span></div>
          <div class="staff-details-row"><span class="staff-details-label">Joining Date</span><span class="staff-details-value">${this.escapeHtml(record.joiningDate || "—")}</span></div>
          <div class="staff-details-row"><span class="staff-details-label">Status</span><strong class="staff-details-value">${this.escapeHtml(record.status || "Active")}</strong></div>
        `;
      }
      tableEl.innerHTML = rows;
    }

    // Disable deactivate if already inactive
    const deactBtn = document.getElementById("btn-detail-action-deactivate");
    if (deactBtn) {
      deactBtn.classList.toggle("disabled", !isActive);
    }

    GrihamBottomSheet.open(sheet, backdrop);
  },

  handleCallCurrentRecord() {
    if (!this.state.currentRecord) return;
    this.handleCallRecord(this.state.currentRecord.id);
  },

  handleCallRecord(id) {
    const record = this.state.records.find(r => r.id === id);
    if (!record) return;

    // Use existing GrihamCallSelectorUI
    if (typeof GrihamCallSelectorUI !== "undefined" && typeof GrihamCallSelectorUI.open === "function") {
      const cat = record.category || "General";
      const assigned = {
        id: record.id,
        name: record.name,
        role: record.role || (record.type === "vendor" ? record.contactPerson : "Staff"),
        phone: record.phone,
        type: record.type === "worker" ? "Worker" : record.type === "vendor" ? "Vendor" : "Gatekeeper"
      };

      GrihamCallSelectorUI.open({
        category: cat,
        contactType: record.type === "worker" ? "worker" : record.type === "vendor" ? "vendor" : "all",
        assignedContact: assigned,
        title: `Call ${cat}`
      });
    } else {
      window.location.href = `tel:${record.phone}`;
    }
  },

  handleEditCurrentRecord() {
    const r = this.state.currentRecord;
    if (!r) return;
    this.closeAllSheets();

    if (r.type === "worker") {
      this.openWorkerForm(true, r);
    } else if (r.type === "vendor") {
      this.openVendorForm(true, r);
    } else if (r.type === "gatekeeper") {
      this.openGatekeeperForm(true, r);
    }
  },

  // -----------------------------------------------------------------
  // ADD / EDIT FORMS
  // -----------------------------------------------------------------
  openAddSheet() {
    this.closeAllSheets();
    const sheet = document.getElementById("sheet-staff-choose-type");
    const backdrop = document.getElementById("staff-choose-backdrop");
    GrihamBottomSheet.open(sheet, backdrop);
  },

  openWorkerForm(isEdit = false, record = null) {
    this.closeAllSheets();
    this.state.isEditing = isEdit;

    const titleEl = document.getElementById("worker-form-title");
    const idEl = document.getElementById("worker-edit-id");
    const nameEl = document.getElementById("worker-input-name");
    const phoneEl = document.getElementById("worker-input-phone");
    const emailEl = document.getElementById("worker-input-email");
    const roleEl = document.getElementById("worker-input-role");
    const catEl = document.getElementById("worker-select-category");
    const socEl = document.getElementById("worker-input-society");
    const joinEl = document.getElementById("worker-input-joining");
    const statEl = document.getElementById("worker-select-status");

    if (titleEl) titleEl.textContent = isEdit ? "Edit Worker" : "Add Worker";
    if (idEl) idEl.value = isEdit && record ? record.id : "";

    if (isEdit && record) {
      if (nameEl) nameEl.value = record.name || "";
      if (phoneEl) phoneEl.value = record.phone || "";
      if (emailEl) emailEl.value = record.email || "";
      if (roleEl) roleEl.value = record.role || "";
      if (catEl) catEl.value = record.category || "Security";
      if (socEl) {
        socEl.value = record.societyId || this.state.currentSocietyId;
        socEl.setAttribute("readonly", "true");
      }
      if (joinEl) joinEl.value = record.joiningDate || new Date().toISOString().split("T")[0];
      if (statEl) statEl.value = record.status || "Active";
    } else {
      if (nameEl) nameEl.value = "";
      if (phoneEl) phoneEl.value = "";
      if (emailEl) emailEl.value = "";
      if (roleEl) roleEl.value = "Security Guard";
      if (catEl) catEl.value = "Security";
      if (socEl) {
        socEl.value = this.state.currentSocietyId;
        socEl.removeAttribute("readonly");
      }
      if (joinEl) joinEl.value = new Date().toISOString().split("T")[0];
      if (statEl) statEl.value = "Active";
    }

    const sheet = document.getElementById("sheet-worker-form");
    const backdrop = document.getElementById("worker-form-backdrop");
    GrihamBottomSheet.open(sheet, backdrop);
  },

  async submitWorkerForm(e) {
    e.preventDefault();
    const id = document.getElementById("worker-edit-id")?.value;
    const name = document.getElementById("worker-input-name")?.value;
    const phone = document.getElementById("worker-input-phone")?.value;
    const email = document.getElementById("worker-input-email")?.value;
    const role = document.getElementById("worker-input-role")?.value;
    const category = document.getElementById("worker-select-category")?.value;
    const societyId = document.getElementById("worker-input-society")?.value;
    const joiningDate = document.getElementById("worker-input-joining")?.value;
    const status = document.getElementById("worker-select-status")?.value;

    const data = { name, phone, email, role, category, societyId, joiningDate, status };

    try {
      if (id) {
        await GrihamAPI.updateWorker(id, data);
        this.showToast(`Worker "${name}" updated successfully.`);
      } else {
        await GrihamAPI.createWorker(data);
        this.showToast(`Worker "${name}" added successfully.`);
      }
      this.closeAllSheets();
      await this.loadData();
    } catch (err) {
      console.warn("[Worker Form Error]", err);
      if (err.duplicateRecord) {
        this.showDuplicateWarning(err.duplicateRecord);
      } else {
        this.showToast(err.message || "Failed to save worker record.");
      }
    }
  },

  openVendorForm(isEdit = false, record = null) {
    this.closeAllSheets();
    this.state.isEditing = isEdit;

    const titleEl = document.getElementById("vendor-form-title");
    const idEl = document.getElementById("vendor-edit-id");
    const nameEl = document.getElementById("vendor-input-name");
    const contactEl = document.getElementById("vendor-input-contact");
    const phoneEl = document.getElementById("vendor-input-phone");
    const emailEl = document.getElementById("vendor-input-email");
    const catEl = document.getElementById("vendor-select-category");
    const addrEl = document.getElementById("vendor-input-address");
    const descEl = document.getElementById("vendor-input-desc");
    const socEl = document.getElementById("vendor-input-society");
    const addEl = document.getElementById("vendor-input-added");
    const statEl = document.getElementById("vendor-select-status");

    if (titleEl) titleEl.textContent = isEdit ? "Edit Vendor" : "Add Vendor";
    if (idEl) idEl.value = isEdit && record ? record.id : "";

    const todayStr = new Date().toISOString().split("T")[0];

    if (isEdit && record) {
      if (nameEl) nameEl.value = record.name || "";
      if (contactEl) contactEl.value = record.contactPerson || "";
      if (phoneEl) phoneEl.value = record.phone || "";
      if (emailEl) emailEl.value = record.email || "";
      if (catEl) catEl.value = record.category || "Plumbing";
      if (addrEl) addrEl.value = record.address || "";
      if (descEl) descEl.value = record.serviceDescription || "";
      if (socEl) {
        socEl.value = record.societyId || this.state.currentSocietyId;
        socEl.setAttribute("readonly", "true");
      }
      if (addEl) addEl.value = record.addedDate || todayStr;
      if (statEl) statEl.value = record.status || "Active";
    } else {
      if (nameEl) nameEl.value = "";
      if (contactEl) contactEl.value = "";
      if (phoneEl) phoneEl.value = "";
      if (emailEl) emailEl.value = "";
      if (catEl) catEl.value = "Plumbing";
      if (addrEl) addrEl.value = "";
      if (descEl) descEl.value = "";
      if (socEl) {
        socEl.value = this.state.currentSocietyId;
        socEl.removeAttribute("readonly");
      }
      if (addEl) addEl.value = todayStr;
      if (statEl) statEl.value = "Active";
    }

    const sheet = document.getElementById("sheet-vendor-form");
    const backdrop = document.getElementById("vendor-form-backdrop");
    GrihamBottomSheet.open(sheet, backdrop);
  },

  async submitVendorForm(e) {
    e.preventDefault();
    const id = document.getElementById("vendor-edit-id")?.value;
    const name = document.getElementById("vendor-input-name")?.value;
    const contactPerson = document.getElementById("vendor-input-contact")?.value;
    const phone = document.getElementById("vendor-input-phone")?.value;
    const email = document.getElementById("vendor-input-email")?.value;
    const category = document.getElementById("vendor-select-category")?.value;
    const address = document.getElementById("vendor-input-address")?.value;
    const serviceDescription = document.getElementById("vendor-input-desc")?.value;
    const societyId = document.getElementById("vendor-input-society")?.value;
    const addedDate = document.getElementById("vendor-input-added")?.value;
    const status = document.getElementById("vendor-select-status")?.value;

    const data = { name, contactPerson, phone, email, category, address, serviceDescription, societyId, addedDate, status };

    try {
      if (id) {
        await GrihamAPI.updateVendor(id, data);
        this.showToast(`Vendor "${name}" updated successfully.`);
      } else {
        await GrihamAPI.createVendor(data);
        this.showToast(`Vendor "${name}" added successfully.`);
      }
      this.closeAllSheets();
      await this.loadData();
    } catch (err) {
      console.warn("[Vendor Form Error]", err);
      if (err.duplicateRecord) {
        this.showDuplicateWarning(err.duplicateRecord);
      } else {
        this.showToast(err.message || "Failed to save vendor record.");
      }
    }
  },

  openGatekeeperForm(isEdit = false, record = null) {
    this.closeAllSheets();
    this.state.isEditing = isEdit;

    const titleEl = document.getElementById("gatekeeper-form-title");
    const idEl = document.getElementById("gatekeeper-edit-id");
    const nameEl = document.getElementById("gatekeeper-input-name");
    const phoneEl = document.getElementById("gatekeeper-input-phone");
    const emailEl = document.getElementById("gatekeeper-input-email");
    const socEl = document.getElementById("gatekeeper-input-society");
    const joinEl = document.getElementById("gatekeeper-input-joining");
    const statEl = document.getElementById("gatekeeper-select-status");

    if (titleEl) titleEl.textContent = isEdit ? "Edit Gatekeeper" : "Add Gatekeeper";
    if (idEl) idEl.value = isEdit && record ? record.id : "";

    const todayStr = new Date().toISOString().split("T")[0];

    if (isEdit && record) {
      if (nameEl) nameEl.value = record.name || "";
      if (phoneEl) phoneEl.value = record.phone || "";
      if (emailEl) emailEl.value = record.email || "";
      if (socEl) {
        socEl.value = record.societyId || this.state.currentSocietyId;
        socEl.setAttribute("readonly", "true");
      }
      if (joinEl) joinEl.value = record.joiningDate || todayStr;
      if (statEl) statEl.value = record.status || "Active";
    } else {
      if (nameEl) nameEl.value = "";
      if (phoneEl) phoneEl.value = "";
      if (emailEl) emailEl.value = "";
      if (socEl) {
        socEl.value = this.state.currentSocietyId;
        socEl.removeAttribute("readonly");
      }
      if (joinEl) joinEl.value = todayStr;
      if (statEl) statEl.value = "Active";
    }

    const sheet = document.getElementById("sheet-gatekeeper-form");
    const backdrop = document.getElementById("gatekeeper-form-backdrop");
    GrihamBottomSheet.open(sheet, backdrop);
  },

  async submitGatekeeperForm(e) {
    e.preventDefault();
    const id = document.getElementById("gatekeeper-edit-id")?.value;
    const name = document.getElementById("gatekeeper-input-name")?.value;
    const phone = document.getElementById("gatekeeper-input-phone")?.value;
    const email = document.getElementById("gatekeeper-input-email")?.value;
    const societyId = document.getElementById("gatekeeper-input-society")?.value;
    const joiningDate = document.getElementById("gatekeeper-input-joining")?.value;
    const status = document.getElementById("gatekeeper-select-status")?.value;

    const data = { name, phone, email, societyId, joiningDate, status };

    try {
      if (id) {
        await GrihamAPI.updateGatekeeper(id, data);
        this.showToast(`Gatekeeper "${name}" updated successfully.`);
      } else {
        await GrihamAPI.createGatekeeper(data);
        this.showToast(`Gatekeeper "${name}" added successfully.`);
      }
      this.closeAllSheets();
      await this.loadData();
    } catch (err) {
      console.warn("[Gatekeeper Form Error]", err);
      if (err.duplicateRecord) {
        this.showDuplicateWarning(err.duplicateRecord);
      } else {
        this.showToast(err.message || "Failed to save gatekeeper record.");
      }
    }
  },

  // -----------------------------------------------------------------
  // DUPLICATE PHONE WARNING
  // -----------------------------------------------------------------
  showDuplicateWarning(existingRecord) {
    const cardBody = document.getElementById("dup-existing-card-body");
    if (cardBody && existingRecord) {
      cardBody.innerHTML = `
        <div style="font-size:0.75rem; color:var(--text-secondary); text-transform:uppercase; font-weight:700; letter-spacing:0.04em;">Existing Match in Society:</div>
        <div><strong>${this.escapeHtml(existingRecord.name)}</strong> (${this.escapeHtml(existingRecord.type)} • ${this.escapeHtml(existingRecord.role || existingRecord.category || "Staff")})</div>
        <div style="color:var(--text-secondary); font-family:monospace;">Phone: ${this.escapeHtml(existingRecord.phone)}</div>
        <div style="color:var(--text-muted); font-size:0.75rem;">Society ID: ${this.escapeHtml(existingRecord.societyId)} • Status: ${this.escapeHtml(existingRecord.status)}</div>
      `;
    }

    const sheet = document.getElementById("sheet-staff-dup-warning");
    const backdrop = document.getElementById("staff-dup-backdrop");
    GrihamBottomSheet.open(sheet, backdrop);
  },

  closeDuplicateWarning() {
    GrihamBottomSheet.close("sheet-staff-dup-warning", "staff-dup-backdrop");
  },

  // -----------------------------------------------------------------
  // DEACTIVATION FLOW
  // -----------------------------------------------------------------
  openDeactivateModal() {
    const sheet = document.getElementById("sheet-staff-deactivate-confirm");
    const backdrop = document.getElementById("staff-deactivate-backdrop");
    GrihamBottomSheet.open(sheet, backdrop);
  },

  closeDeactivateModal() {
    GrihamBottomSheet.close("sheet-staff-deactivate-confirm", "staff-deactivate-backdrop");
    this.state.deactivateTargetId = null;
  },

  async confirmDeactivate() {
    if (!this.state.currentRecord) return;
    const rec = this.state.currentRecord;

    try {
      await GrihamAPI.deactivateStaff(rec.id);
      this.showToast(`Record "${rec.name}" deactivated successfully.`);
      this.closeDeactivateModal();
      this.closeAllSheets();
      await this.loadData();
    } catch (err) {
      this.showToast(err.message || "Failed to deactivate record.");
    }
  },

  // -----------------------------------------------------------------
  // FILTER & SORT SHEETS
  // -----------------------------------------------------------------
  openFilterSheet() {
    const typeSelect = document.getElementById("staff-filter-select-type");
    const catSelect = document.getElementById("staff-filter-select-cat");
    const statSelect = document.getElementById("staff-filter-select-status");

    if (typeSelect) typeSelect.value = this.state.filterType;
    if (catSelect) catSelect.value = this.state.filterCategory;
    if (statSelect) statSelect.value = this.state.filterStatus;

    const sheet = document.getElementById("sheet-staff-filter");
    const backdrop = document.getElementById("staff-filter-backdrop");
    GrihamBottomSheet.open(sheet, backdrop);
  },

  closeFilterSheet() {
    GrihamBottomSheet.close("sheet-staff-filter", "staff-filter-backdrop");
  },

  applyFilters() {
    const typeSelect = document.getElementById("staff-filter-select-type");
    const catSelect = document.getElementById("staff-filter-select-cat");
    const statSelect = document.getElementById("staff-filter-select-status");

    this.state.filterType = typeSelect ? typeSelect.value : "all";
    this.state.filterCategory = catSelect ? catSelect.value : "all";
    this.state.filterStatus = statSelect ? statSelect.value : "all";

    this.updateFilterBadge();
    this.closeFilterSheet();
    this.renderDirectory();
  },

  clearFilters() {
    this.state.filterType = "all";
    this.state.filterCategory = "all";
    this.state.filterStatus = "all";

    const typeSelect = document.getElementById("staff-filter-select-type");
    const catSelect = document.getElementById("staff-filter-select-cat");
    const statSelect = document.getElementById("staff-filter-select-status");
    if (typeSelect) typeSelect.value = "all";
    if (catSelect) catSelect.value = "all";
    if (statSelect) statSelect.value = "all";

    this.updateFilterBadge();
    this.closeFilterSheet();
    this.renderDirectory();
  },

  clearAllFilters() {
    this.clearSearch();
    this.clearFilters();
    this.setTab("all");
  },

  updateFilterBadge() {
    let count = 0;
    if (this.state.filterType !== "all") count++;
    if (this.state.filterCategory !== "all") count++;
    if (this.state.filterStatus !== "all") count++;

    const badge = document.getElementById("staff-filter-badge");
    const trigger = document.getElementById("btn-staff-filter-trigger");

    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "none";
    }
    if (trigger) {
      trigger.classList.toggle("active-filter", count > 0);
    }
  },

  openSortSheet() {
    this.updateSortUI();
    const sheet = document.getElementById("sheet-staff-sort");
    const backdrop = document.getElementById("staff-sort-backdrop");
    GrihamBottomSheet.open(sheet, backdrop);
  },

  closeSortSheet() {
    GrihamBottomSheet.close("sheet-staff-sort", "staff-sort-backdrop");
  },

  selectSort(sortKey) {
    this.state.sortBy = sortKey;
    this.updateSortUI();
    this.closeSortSheet();
    this.renderDirectory();
  },

  updateSortUI() {
    const checks = ["name-asc", "name-desc", "newest", "oldest"];
    checks.forEach(k => {
      const el = document.getElementById(`sort-check-${k}`);
      if (el) el.style.display = (this.state.sortBy === k) ? "inline-block" : "none";
    });
  },

  // -----------------------------------------------------------------
  // UTILITIES & SHEET CLOSE
  // -----------------------------------------------------------------
  closeAllSheets() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.closeAll();
    }
  },

  showToast(msg, type = "info") {
    if (typeof GrihamToast !== "undefined") {
      GrihamToast.show(msg, type);
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

window.GrihamAdminAddStaffUI = GrihamAdminAddStaffUI;
