
/* HTML TEMPLATE EXTRACTED FROM index.html */
window.HTML_WORKERS = `
<div class="sheet-backdrop" id="worker-detail-backdrop" onclick="GrihamAdminWorkersUI.closeDetailSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet worker-detail-sheet" id="worker-detail-sheet" role="dialog" aria-modal="true" aria-labelledby="worker-detail-sheet-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminWorkersUI.closeDetailSheet()" aria-label="Close worker details" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="worker-detail-sheet-title">Staff Details</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <!-- Badge & Attendance Row -->
    <div class="worker-detail-status-row">
      <span class="worker-id-badge" id="worker-detail-id-badge">EMP-001</span>
      <span class="worker-attendance-badge" id="worker-detail-attendance">Present</span>
    </div>

    <!-- Check-in Time Display (if Present) -->
    <div id="worker-detail-check-in" class="worker-check-in-pill" style="display:none;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      <span>Checked in today at <strong class="check-in-time">08:00 AM</strong></span>
    </div>

    <!-- Info Sections Grid -->
    <div class="worker-info-table">
      <div class="worker-info-row">
        <span class="info-label">Full Name</span>
        <strong class="info-value" id="worker-detail-name">—</strong>
      </div>
      <div class="worker-info-row">
        <span class="info-label">Employee ID</span>
        <strong class="info-value" id="worker-detail-id">—</strong>
      </div>
      <div class="worker-info-row">
        <span class="info-label">Role</span>
        <strong class="info-value" id="worker-detail-role">—</strong>
      </div>
      <div class="worker-info-row">
        <span class="info-label">Phone</span>
        <strong class="info-value" id="worker-detail-phone">—</strong>
      </div>
      <div class="worker-info-row">
        <span class="info-label">Email</span>
        <strong class="info-value" id="worker-detail-email">—</strong>
      </div>
      <div class="worker-info-row">
        <span class="info-label">Joining Date</span>
        <strong class="info-value" id="worker-detail-joining">—</strong>
      </div>
      <div class="worker-info-row">
        <span class="info-label">Employment</span>
        <strong class="info-value" id="worker-detail-emp-type">—</strong>
      </div>
      <div class="worker-info-row">
        <span class="info-label">Emergency Contact</span>
        <strong class="info-value" id="worker-detail-emergency">—</strong>
      </div>
    </div>

    <!-- Quick Action Hub -->
    <div class="worker-detail-actions-hub">
      <button type="button" class="btn-worker-hub-action btn-hub-call" onclick="GrihamAdminWorkersUI.callCurrentWorkerCategory()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span>Call Worker</span>
      </button>
      <button type="button" class="btn-worker-hub-action" onclick="GrihamAdminWorkersUI.openAttendanceSheet()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
        <span>Mark Attendance</span>
      </button>
      <button type="button" class="btn-worker-hub-action" onclick="GrihamAdminWorkersUI.openHistorySheet()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>View History</span>
      </button>
      <button type="button" class="btn-worker-hub-action" onclick="GrihamAdminWorkersUI.openEditSheet()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        <span>Edit Profile</span>
      </button>
      <button type="button" class="btn-worker-hub-action btn-hub-danger" onclick="GrihamAdminWorkersUI.openDeactivateSheet()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
        <span>Deactivate</span>
      </button>
    </div>
  </div>

<div class="sheet-backdrop" id="worker-attendance-backdrop" onclick="GrihamAdminWorkersUI.closeAttendanceSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="worker-attendance-sheet" role="dialog" aria-modal="true" aria-labelledby="worker-attendance-sheet-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom));">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminWorkersUI.closeAttendanceSheet()" aria-label="Close attendance marking" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="worker-attendance-sheet-title">Mark Attendance</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-worker-attendance" onsubmit="GrihamAdminWorkersUI.saveAttendance(event)" style="display:flex; flex-direction:column; gap:1.1rem; padding:0.25rem 0;">
      <div class="worker-form-subheading">
        Recording for <strong id="attendance-worker-name">—</strong>
      </div>

      <!-- Date selector -->
      <div class="form-group">
        <label class="form-label" for="attendance-date">Date</label>
        <div class="input-wrapper">
          <input type="date" id="attendance-date" class="form-input" required aria-label="Attendance date">
        </div>
      </div>

      <!-- Attendance status radio cards -->
      <div class="form-group">
        <label class="form-label">Status</label>
        <div class="attendance-radio-grid">
          <label class="attendance-radio-pill pill-present" for="attendance-status-present">
            <input type="radio" id="attendance-status-present" name="attendance-status" value="Present" class="sr-only">
            <span class="radio-pill-dot dot-present"></span>
            <span class="radio-pill-label">Present</span>
          </label>
          <label class="attendance-radio-pill pill-absent" for="attendance-status-absent">
            <input type="radio" id="attendance-status-absent" name="attendance-status" value="Absent" class="sr-only">
            <span class="radio-pill-dot dot-absent"></span>
            <span class="radio-pill-label">Absent</span>
          </label>
          <label class="attendance-radio-pill pill-halfday" for="attendance-status-halfday">
            <input type="radio" id="attendance-status-halfday" name="attendance-status" value="Half Day" class="sr-only">
            <span class="radio-pill-dot dot-halfday"></span>
            <span class="radio-pill-label">Half Day</span>
          </label>
          <label class="attendance-radio-pill pill-onleave" for="attendance-status-onleave">
            <input type="radio" id="attendance-status-onleave" name="attendance-status" value="On Leave" class="sr-only">
            <span class="radio-pill-dot dot-onleave"></span>
            <span class="radio-pill-label">On Leave</span>
          </label>
        </div>
        <p class="form-error-msg" id="attendance-error" style="display:none;">Please select an attendance status.</p>
      </div>

      <!-- Note input -->
      <div class="form-group">
        <label class="form-label" for="input-attendance-note">Remarks / Note <span style="color:var(--text-muted); font-weight:400;">(optional)</span></label>
        <div class="input-wrapper">
          <input type="text" id="input-attendance-note" class="form-input" placeholder="e.g. Overtime 2 hrs, Late by 30 mins" aria-label="Attendance note">
        </div>
      </div>

      <div class="logout-btn-row" style="margin-top:0.4rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminWorkersUI.closeAttendanceSheet()">Cancel</button>
        <button type="submit" class="btn-primary-action btn-admin-style" id="btn-save-attendance" style="margin-top:0; min-height:44px;">
          <span id="btn-save-attendance-text">Save Attendance</span>
        </button>
      </div>
    </form>
  </div>

<div class="sheet-backdrop" id="worker-history-backdrop" onclick="GrihamAdminWorkersUI.closeHistorySheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet worker-history-sheet" id="worker-history-sheet" role="dialog" aria-modal="true" aria-labelledby="worker-history-sheet-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminWorkersUI.closeHistorySheet()" aria-label="Close attendance history" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="worker-history-sheet-title">Attendance History</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <div class="history-sub-header">
      <span class="history-name-tag" id="history-worker-name">—</span>
      <span class="history-id-tag" id="history-worker-id">—</span>
    </div>

    <!-- Month Navigator -->
    <div class="history-month-navigator">
      <button type="button" class="btn-month-nav" onclick="GrihamAdminWorkersUI.prevMonth()" aria-label="Previous month">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <span class="history-month-title" id="history-month-label">September 2026</span>
      <button type="button" class="btn-month-nav" onclick="GrihamAdminWorkersUI.nextMonth()" aria-label="Next month">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>

    <!-- History list container -->
    <div class="history-loading" id="history-loading" style="display:none;">
      <div class="worker-card-skeleton" style="height:55px;"></div>
      <div class="worker-card-skeleton" style="height:55px;"></div>
      <div class="worker-card-skeleton" style="height:55px;"></div>
    </div>
    <div class="history-list" id="history-list">
      <!-- Populated dynamically by JS -->
    </div>
  </div>

<div class="sheet-backdrop" id="worker-add-backdrop" onclick="GrihamAdminWorkersUI.closeAddSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet worker-form-sheet" id="worker-add-sheet" role="dialog" aria-modal="true" aria-labelledby="worker-add-sheet-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminWorkersUI.closeAddSheet()" aria-label="Close add worker" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="worker-add-sheet-title">Add Staff Member</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-add-worker" onsubmit="GrihamAdminWorkersUI.saveNewWorker(event)" style="display:flex; flex-direction:column; gap:0.9rem; padding:0.25rem 0;">
      <div class="form-group">
        <label class="form-label" for="input-worker-name">Full Name <span style="color:#ef4444;">*</span></label>
        <div class="input-wrapper">
          <input type="text" id="input-worker-name" class="form-input" placeholder="e.g. Ramesh Kumar" required aria-label="Full name">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="input-worker-phone">Phone Number <span style="color:#ef4444;">*</span></label>
        <div class="input-wrapper">
          <input type="tel" id="input-worker-phone" class="form-input" placeholder="e.g. 9876543210" required aria-label="Phone number">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="input-worker-email">Email <span style="color:var(--text-muted); font-weight:400;">(optional)</span></label>
        <div class="input-wrapper">
          <input type="email" id="input-worker-email" class="form-input" placeholder="e.g. staff@griham.in" aria-label="Email address">
        </div>
      </div>

      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="input-worker-role">Role <span style="color:#ef4444;">*</span></label>
          <div class="input-wrapper">
            <select id="input-worker-role" class="form-input form-select" required aria-label="Role">
              <option value="Security Guard">Security Guard</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Gardener">Gardener</option>
              <option value="Maintenance Worker">Maintenance Worker</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="input-worker-id">Worker ID <span style="color:#ef4444;">*</span></label>
          <div class="input-wrapper">
            <input type="text" id="input-worker-id" class="form-input" placeholder="e.g. EMP-015" required aria-label="Worker ID">
          </div>
        </div>
      </div>

      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="input-worker-joining">Joining Date <span style="color:#ef4444;">*</span></label>
          <div class="input-wrapper">
            <input type="date" id="input-worker-joining" class="form-input" required aria-label="Joining date">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="input-worker-emp-type">Type</label>
          <div class="input-wrapper">
            <select id="input-worker-emp-type" class="form-input form-select" aria-label="Employment type">
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="input-worker-emergency">Emergency Contact <span style="color:var(--text-muted); font-weight:400;">(optional)</span></label>
        <div class="input-wrapper">
          <input type="text" id="input-worker-emergency" class="form-input" placeholder="e.g. 9811223344 (Brother)" aria-label="Emergency contact">
        </div>
      </div>

      <div id="worker-add-error" class="form-error-banner" style="display:none;">
        <span id="worker-add-error-text">Please fill in all required fields.</span>
      </div>

      <div class="logout-btn-row" style="margin-top:0.4rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminWorkersUI.closeAddSheet()">Cancel</button>
        <button type="submit" class="btn-primary-action btn-admin-style" id="btn-add-worker-submit" style="margin-top:0; min-height:44px;">
          <span id="btn-add-worker-text">Add Worker</span>
        </button>
      </div>
    </form>
  </div>

<div class="sheet-backdrop" id="worker-edit-backdrop" onclick="GrihamAdminWorkersUI.closeEditSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet worker-form-sheet" id="worker-edit-sheet" role="dialog" aria-modal="true" aria-labelledby="worker-edit-sheet-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminWorkersUI.closeEditSheet()" aria-label="Close edit worker" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="worker-edit-sheet-title">Edit Staff Member</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-edit-worker" onsubmit="GrihamAdminWorkersUI.saveWorkerEdit(event)" style="display:flex; flex-direction:column; gap:0.9rem; padding:0.25rem 0;">
      <div class="form-group">
        <label class="form-label" for="edit-worker-name">Full Name <span style="color:#ef4444;">*</span></label>
        <div class="input-wrapper">
          <input type="text" id="edit-worker-name" class="form-input" required aria-label="Full name">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="edit-worker-phone">Phone Number <span style="color:#ef4444;">*</span></label>
        <div class="input-wrapper">
          <input type="tel" id="edit-worker-phone" class="form-input" required aria-label="Phone number">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="edit-worker-email">Email</label>
        <div class="input-wrapper">
          <input type="email" id="edit-worker-email" class="form-input" aria-label="Email address">
        </div>
      </div>

      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="edit-worker-role">Role</label>
          <div class="input-wrapper">
            <select id="edit-worker-role" class="form-input form-select" aria-label="Role">
              <option value="Security Guard">Security Guard</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Gardener">Gardener</option>
              <option value="Maintenance Worker">Maintenance Worker</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="edit-worker-id">Worker ID</label>
          <div class="input-wrapper">
            <input type="text" id="edit-worker-id" class="form-input" disabled aria-label="Worker ID">
          </div>
        </div>
      </div>

      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="edit-worker-joining">Joining Date</label>
          <div class="input-wrapper">
            <input type="date" id="edit-worker-joining" class="form-input" disabled aria-label="Joining date">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="edit-worker-emp-type">Type</label>
          <div class="input-wrapper">
            <select id="edit-worker-emp-type" class="form-input form-select" aria-label="Employment type">
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="edit-worker-emergency">Emergency Contact</label>
        <div class="input-wrapper">
          <input type="text" id="edit-worker-emergency" class="form-input" placeholder="e.g. 9811223344" aria-label="Emergency contact">
        </div>
      </div>

      <div id="worker-edit-error" class="form-error-banner" style="display:none;">
        <span>Please check the entered information.</span>
      </div>

      <div class="logout-btn-row" style="margin-top:0.4rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminWorkersUI.closeEditSheet()">Cancel</button>
        <button type="submit" class="btn-primary-action btn-admin-style" id="btn-save-worker-submit" style="margin-top:0; min-height:44px;">
          <span id="btn-save-worker-text">Save Changes</span>
        </button>
      </div>
    </form>
  </div>

<section id="screen-admin-workers" class="app-view" aria-labelledby="workers-header-title">

        <!-- Top Bar: Back, Title, Search Icon, Add Button -->
        <div class="screen-top-bar" style="width:100%;">
          ${GrihamHeader.renderBackButton({
            target: '/admin/home',
            id: 'btn-workers-back',
            ariaLabel: 'Back'
          })}
          <h1 class="top-bar-screen-title" id="workers-header-title" data-i18n="workers_page_title">Worker / Staff</h1>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <button type="button" class="btn-icon-utility circle-only" onclick="GrihamAdminWorkersUI.toggleSearch()" id="btn-workers-search-toggle" aria-label="Search workers" title="Search workers">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <button type="button" class="btn-icon-utility circle-only" onclick="GrihamAdminWorkersUI.openAddSheet()" id="btn-workers-add" aria-label="Add worker" title="Add worker">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </div>

        <!-- Search Bar (collapsible) -->
        <div class="workers-search-bar" id="workers-search-container" style="display:none;">
          <div class="input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="input-icon-left" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="workers-search-input" class="form-input workers-search-input" placeholder="Search workers..." oninput="GrihamAdminWorkersUI.handleSearch(this.value)" aria-label="Search workers by name, phone, role, or ID">
            <button type="button" class="btn-search-clear" id="btn-workers-search-clear" onclick="GrihamAdminWorkersUI.clearSearch()" style="display:none;" aria-label="Clear search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <!-- Staff Overview Summary -->
        <div class="workers-overview-section">
          <div class="overview-title-row">
            <span class="overview-section-title" data-i18n="staff_overview">Staff Overview</span>
          </div>
          <div class="workers-summary-grid">
            <div class="worker-sum-card">
              <span class="sum-card-label" data-i18n="stat_total_staff">Total Staff</span>
              <strong class="sum-card-val" id="stat-workers-total">10</strong>
            </div>
            <div class="worker-sum-card card-present">
              <span class="sum-card-label" data-i18n="stat_present">Present</span>
              <strong class="sum-card-val" id="stat-workers-present">9</strong>
            </div>
            <div class="worker-sum-card card-absent">
              <span class="sum-card-label" data-i18n="stat_absent">Absent</span>
              <strong class="sum-card-val" id="stat-workers-absent">2</strong>
            </div>
            <div class="worker-sum-card card-onleave">
              <span class="sum-card-label" data-i18n="stat_on_leave">On Leave</span>
              <strong class="sum-card-val" id="stat-workers-onleave">1</strong>
            </div>
          </div>
        </div>

        <!-- Filter Chips -->
        <div class="workers-filter-bar">
          <div class="filter-chip-group" role="group" aria-label="Attendance Filters">
            <button type="button" class="filter-chip worker-attendance-filter active" data-filter="all" onclick="GrihamAdminWorkersUI.setAttendanceFilter('all')" data-i18n="filter_all">All</button>
            <button type="button" class="filter-chip worker-attendance-filter" data-filter="Present" onclick="GrihamAdminWorkersUI.setAttendanceFilter('Present')" data-i18n="stat_present">Present</button>
            <button type="button" class="filter-chip worker-attendance-filter" data-filter="Absent" onclick="GrihamAdminWorkersUI.setAttendanceFilter('Absent')" data-i18n="stat_absent">Absent</button>
            <button type="button" class="filter-chip worker-attendance-filter" data-filter="Half Day" onclick="GrihamAdminWorkersUI.setAttendanceFilter('Half Day')" data-i18n="stat_half_day">Half Day</button>
            <button type="button" class="filter-chip worker-attendance-filter" data-filter="On Leave" onclick="GrihamAdminWorkersUI.setAttendanceFilter('On Leave')" data-i18n="stat_on_leave">On Leave</button>
          </div>
          <div class="filter-chip-group" role="group" aria-label="Role Filters">
            <button type="button" class="filter-chip worker-role-filter active" data-role="all" onclick="GrihamAdminWorkersUI.setRoleFilter('all')" data-i18n="filter_role_all">All Roles</button>
            <button type="button" class="filter-chip worker-role-filter" data-role="Security Guard" onclick="GrihamAdminWorkersUI.setRoleFilter('Security Guard')" data-i18n="role_security_guard">Security</button>
            <button type="button" class="filter-chip worker-role-filter" data-role="Cleaner" onclick="GrihamAdminWorkersUI.setRoleFilter('Cleaner')" data-i18n="role_cleaner">Cleaner</button>
            <button type="button" class="filter-chip worker-role-filter" data-role="Electrician" onclick="GrihamAdminWorkersUI.setRoleFilter('Electrician')" data-i18n="role_electrician">Electrician</button>
            <button type="button" class="filter-chip worker-role-filter" data-role="Plumber" onclick="GrihamAdminWorkersUI.setRoleFilter('Plumber')" data-i18n="role_plumber">Plumber</button>
            <button type="button" class="filter-chip worker-role-filter" data-role="Gardener" onclick="GrihamAdminWorkersUI.setRoleFilter('Gardener')" data-i18n="role_gardener">Gardener</button>
            <button type="button" class="filter-chip worker-role-filter" data-role="Other" onclick="GrihamAdminWorkersUI.setRoleFilter('Other')" data-i18n="role_other">Other</button>
          </div>
        </div>

        <!-- Toggle Inactive Workers -->
        <div class="workers-inactive-toggle">
          <button type="button" class="filter-chip worker-role-filter" id="btn-show-inactive" data-role="inactive" onclick="GrihamAdminWorkersUI.toggleInactive()">Show Inactive Workers</button>
        </div>

        <!-- Loading State -->
        <div id="workers-loading-skeleton" style="display:none; flex-direction:column; gap:0.75rem;">
          <div class="worker-card-skeleton" style="height:90px;"></div>
          <div class="worker-card-skeleton" style="height:90px;"></div>
          <div class="worker-card-skeleton" style="height:90px;"></div>
        </div>

        <!-- Error State -->
        <div id="workers-error-state" class="dash-error-state" style="display:none;">
          <svg class="dash-error-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <div class="dash-error-title" data-i18n="error_workers">Unable to load workers.</div>
          <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminWorkersUI.loadData()" style="min-height:40px; margin-top:0.5rem;">
            <span data-i18n="btn_try_again">Try Again</span>
          </button>
        </div>

        <!-- Empty State -->
        <div id="workers-empty-state" class="dash-error-state" style="display:none;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <div class="dash-error-title" data-i18n="empty_workers">No workers found.</div>
          <p style="color:var(--text-muted); font-size:0.82rem; margin-top:0.4rem;" data-i18n="empty_search">No matching workers found.</p>
          <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminWorkersUI.clearAllFilters()" style="min-height:40px; margin-top:0.5rem;">
            <span>Clear Filters</span>
          </button>
        </div>

        <!-- Worker List -->
        <div id="workers-list-container" class="workers-list-container">
          <div id="workers-list" class="workers-list">
            <!-- Populated dynamically by GrihamAdminWorkersUI -->
          </div>
        </div>

      </section>
`;
const GrihamAdminWorkersUI = {
  state: {
    workers: [],
    filtered: [],
    searchQuery: "",
    attendanceFilter: "all",
    roleFilter: "all",
    showInactive: false,
    currentWorker: null,
    currentMonthKey: new Date().toISOString().substring(0, 7),
    historyData: [],
    attendanceHistoryLoaded: false
  },

  init() {
    this.state.searchQuery = "";
    this.state.attendanceFilter = "all";
    this.state.roleFilter = "all";
    this.state.showInactive = false;
    this.state.currentWorker = null;
    const searchEl = document.getElementById("workers-search-input");
    if (searchEl) searchEl.value = '';
    const clearBtn = document.getElementById("btn-workers-search-clear");
    if (clearBtn) clearBtn.style.display = 'none';
    document.querySelectorAll(".worker-attendance-filter").forEach(c => c.classList.remove("active"));
    document.querySelectorAll(".worker-role-filter").forEach(c => c.classList.remove("active"));
    const inactiveToggle = document.getElementById("btn-show-inactive");
    if (inactiveToggle) inactiveToggle.classList.remove("active");
    this.state.currentMonthKey = new Date().toISOString().substring(0, 7);
    this.updateMonthLabel();
    this.loadData();
  },

  async loadData() {
    const loadingEl = document.getElementById("workers-loading-skeleton");
    const listEl = document.getElementById("workers-list-container");
    const errorEl = document.getElementById("workers-error-state");
    const emptyEl = document.getElementById("workers-empty-state");

    if (loadingEl) loadingEl.style.display = "flex";
    if (listEl) listEl.style.display = "none";
    if (errorEl) errorEl.style.display = "none";
    if (emptyEl) emptyEl.style.display = "none";

    try {
      const res = await getWorkers();
      this.state.workers = res.workers || [];
      this.updateStats(res.summary || {});
      this.applyFilterAndSearch();

      if (listEl && this.state.filtered.length > 0) listEl.style.display = "flex";
      if (emptyEl && this.state.filtered.length === 0) emptyEl.style.display = "flex";
    } catch (err) {
      console.error("Workers load error", err);
      if (errorEl) errorEl.style.display = "flex";
    } finally {
      if (loadingEl) loadingEl.style.display = "none";
    }
  },

  updateStats(summary) {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set("stat-workers-total", summary.total ?? this.state.workers.length);
    set("stat-workers-present", summary.present ?? 0);
    set("stat-workers-absent", summary.absent ?? 0);
    set("stat-workers-onleave", summary.on_leave ?? 0);
  },

  handleSearch(query) {
    this.state.searchQuery = query.trim().toLowerCase();
    if (typeof GrihamSearchBar !== "undefined") {
      GrihamSearchBar.syncClearButton("workers-search-input", "btn-workers-search-clear");
    } else {
      const clearBtn = document.getElementById("btn-workers-search-clear");
      if (clearBtn) clearBtn.style.display = query ? "flex" : "none";
    }
    this.applyFilterAndSearch();
  },

  clearSearch() {
    this.state.searchQuery = "";
    if (typeof GrihamSearchBar !== "undefined") {
      GrihamSearchBar.handleClear("workers-search-input", "btn-workers-search-clear", () => this.applyFilterAndSearch());
    } else {
      const input = document.getElementById("workers-search-input");
      if (input) input.value = "";
      const clearBtn = document.getElementById("btn-workers-search-clear");
      if (clearBtn) clearBtn.style.display = "none";
      this.applyFilterAndSearch();
    }
  },

  setAttendanceFilter(filter) {
    this.state.attendanceFilter = filter;
    document.querySelectorAll(".worker-attendance-filter").forEach(c => {
      c.classList.toggle("active", c.dataset.filter === filter);
    });
    this.applyFilterAndSearch();
  },

  setRoleFilter(role) {
    this.state.roleFilter = role;
    document.querySelectorAll(".worker-role-filter").forEach(c => {
      c.classList.toggle("active", c.dataset.role === role);
    });
    this.applyFilterAndSearch();
  },

  toggleInactive() {
    this.state.showInactive = !this.state.showInactive;
    const btn = document.getElementById("btn-show-inactive");
    if (btn) btn.classList.toggle("active", this.state.showInactive);
    this.applyFilterAndSearch();
  },

  applyFilterAndSearch() {
    this.state.filtered = this.state.workers.filter(w => {
      if (!this.state.showInactive && w.status === "Inactive") return false;
      const q = this.state.searchQuery;
      if (q) {
        const digits = q.replace(/\D/g, "");
        const matchName = w.name.toLowerCase().includes(q);
        const matchPhone = digits.length > 0 && w.phone.replace(/\D/g, "").includes(digits);
        const matchId = (w.worker_id || w.id).toLowerCase().includes(q);
        const matchRole = w.role.toLowerCase().includes(q);
        if (!(matchName || matchPhone || matchId || matchRole)) return false;
      }
      if (this.state.attendanceFilter !== "all" && w.attendance !== this.state.attendanceFilter) return false;
      if (this.state.roleFilter !== "all" && w.role !== this.state.roleFilter) return false;
      return true;
    });

    const listEl = document.getElementById("workers-list");
    const emptyEl = document.getElementById("workers-empty-state");
    const errorEl = document.getElementById("workers-error-state");

    if (listEl) {
      if (this.state.filtered.length === 0) {
        listEl.innerHTML = "";
        listEl.style.display = "none";
        if (errorEl) errorEl.style.display = "none";
        if (emptyEl) {
          emptyEl.style.display = "flex";
          const msg = this.state.searchQuery || this.state.attendanceFilter !== "all" || this.state.roleFilter !== "all"
            ? "No matching workers found."
            : "No workers found.";
          const descEl = emptyEl.querySelector("p");
          if (descEl) descEl.textContent = msg;
        }
      } else {
        listEl.style.display = "flex";
        if (emptyEl) emptyEl.style.display = "none";
        listEl.innerHTML = this.renderWorkerList();
      }
    }
  },

  renderWorkerList() {
    const roleIcons = {
      "Security Guard": "shield",
      "Cleaner": "sparkles",
      "Electrician": "zap",
      "Plumber": "droplet",
      "Gardener": "leaf",
      "Maintenance Worker": "wrench",
      "Other": "user"
    };
    const attendanceColor = {
      "Present": "var(--color-brand-emerald)",
      "Absent": "#ef4444",
      "Half Day": "var(--color-brand-amber)",
      "On Leave": "var(--color-brand-blue)"
    };

    return this.state.filtered.map(w => {
      const roleKey = roleIcons[w.role] || "user";
      const iconSvg = this.getRoleIcon(roleKey);
      const attColor = attendanceColor[w.attendance] || "var(--text-muted)";
      const displayName = escapeHtml(w.name || "Unknown");
      const displayId = escapeHtml(w.worker_id || w.id || "");
      const displayRole = escapeHtml(w.role || "");
      const displayPhone = escapeHtml(w.phone || "");
      const displayAtt = escapeHtml(w.attendance || "-");
      const workerId = w.id;

      return `
        <div class="worker-card" data-worker-id="${workerId}">
          <div class="worker-card-body">
            <div class="worker-avatar-wrap">
              ${iconSvg}
            </div>
            <div class="worker-info-col">
              <div class="worker-name">${displayName}</div>
              <div class="worker-id">${displayId} · ${displayRole}</div>
              <div class="worker-phone" aria-label="Phone number">${displayPhone}</div>
              <div class="worker-attendance" style="color:${attColor};">${displayAtt}</div>
            </div>
            <div class="worker-card-actions">
              <button type="button" class="btn-worker-action btn-worker-call" onclick="GrihamCallSelectorUI.openForWorkerRole('${escapeHtml(w.role)}', '${escapeHtml(w.id)}')" aria-label="Call ${escapeHtml(w.name || 'worker')}">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.4 1.94l-3.2-1a2 2 0 0 1-1.36-1.06l-.72-1.44a2 2 0 0 1 .12-2.29l1.28-1.28a1 1 0 0 1 1.37-.06l1 .34a1 1 0 0 1 .44 1.04l-.14.46a1 1 0 0 1-.37.55l-.83.41a.5.5 0 0 0-.2.32l.06 1.12a.5.5 0 0 0 .26.43l.7.32a1 1 0 0 0 1.12-.16l.7-1a1 1 0 0 0 .03-1.06l-1.05-1.39a.5.5 0 0 1 .05-.54l.5-.5a1 1 0 0 1 1.7.83v4.2z"/></svg>
              </button>
            </div>
          </div>
          <div class="worker-card-footer">
            <button type="button" class="btn-worker-action btn-worker-view" onclick="GrihamAdminWorkersUI.openDetail('${workerId}')" aria-label="View ${w.name || 'worker'} details">
              <span data-i18n="btn_view_details">View Details</span>
            </button>
            <button type="button" class="btn-worker-action btn-worker-msg" onclick="GrihamAdminWorkersUI.handleMessage('${workerId}')" aria-label="Message ${w.name || 'worker'}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4v-18a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join("");
  },

  getRoleIcon(variant) {
    const icons = {
      shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
      sparkles: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.3 6.7h6.7l-5.3 4L15.7 22 12 18.3 8.3 22 6.3 12.7 1 8.7h6.7z"/></svg>',
      zap: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2L3 14h8l-1 5 11-13h-8z"/></svg>',
      droplet: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2C8.5 2 6 5 6 9c0 4 6 10 6 10s6-6 6-10c0-4-2.5-7-6-7z"/></svg>',
      leaf: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M2 12c5-8 10-11 15-11 4 0 7 3 7 7-2 4-5 6-9 8C7 18 5 19 3 21c0-6-1-8 0-9z"/></svg>',
      wrench: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14.7 6.3a1 1 0  0 0 0 1.4l.3.3a1 1 0 0 0 1.4 0l3.7-3.7a1 1 0 0 1 1.4 0h.7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-1a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-1a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2a1 1 0 0 1 1 1h1a1 1 0 0 1 1-1v-1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"/></svg>',
      user: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
    };
    return `<div class="worker-avatar-icon" style="color:var(--gatekeeper-accent);">${icons[variant] || icons.user}</div>`;
  },

  handleMessage(workerId) {
    const w = this.state.workers.find(x => x.id === workerId);
    if (!w) return;
    if (w.phone) {
      const encoded = encodeURIComponent(w.phone.replace(/\D/g, ""));
      const smsUrl = `sms:${encoded}`;
      window.location.href = smsUrl;
    }
  },

  /* ---- Detail Sheet ---- */
  async openDetail(workerId) {
    const w = this.state.workers.find(x => x.id === workerId);
    if (!w) return;
    this.state.currentWorker = w;

    const detailEl = document.getElementById("worker-detail-id-badge");
    if (detailEl) detailEl.textContent = w.worker_id || w.id;

    const setRow = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || "—"; };
    setRow("worker-detail-name", w.name);
    setRow("worker-detail-id", w.worker_id || w.id);
    setRow("worker-detail-role", w.role);
    setRow("worker-detail-phone", w.phone || "—");
    setRow("worker-detail-email", w.email || "—");
    setRow("worker-detail-joining", w.joining_date || "—");
    setRow("worker-detail-emp-type", w.employment_type || "—");
    setRow("worker-detail-emergency", w.emergency_contact || "—");

    const attStatus = document.getElementById("worker-detail-attendance");
    if (attStatus) {
      attStatus.textContent = w.attendance || "—";
      attStatus.style.color = this.getAttendanceColor(w.attendance);
    }

    const checkInEl = document.getElementById("worker-detail-check-in");
    if (checkInEl) {
      if (w.attendance === "Present" && w.check_in) {
        checkInEl.style.display = "flex";
        checkInEl.querySelector(".check-in-time").textContent = w.check_in;
      } else {
        checkInEl.style.display = "none";
      }
    }

    this.toggleSheet("worker-detail-sheet", "worker-detail-backdrop", true);
  },

  getAttendanceColor(status) {
    const colors = {
      Present: "var(--color-brand-emerald)",
      Absent: "#ef4444",
      "Half Day": "var(--color-brand-amber)",
      "On Leave": "var(--color-brand-blue)"
    };
    return colors[status] || "var(--text-muted)";
  },

  closeDetailSheet() {
    this.toggleSheet("worker-detail-sheet", "worker-detail-backdrop", false);
  },

  openAttendanceSheet(workerId) {
    const w = this.state.workers.find(x => x.id === workerId) || this.state.currentWorker;
    if (!w) return;
    this.state.currentWorker = w;

    const titleEl = document.getElementById("attendance-worker-name");
    if (titleEl) titleEl.textContent = w.name;

    const dateEl = document.getElementById("attendance-date");
    if (dateEl) dateEl.value = new Date().toISOString().split("T")[0];

    // Reset form
    document.getElementById("attendance-status-present").checked = false;
    document.getElementById("attendance-status-absent").checked = false;
    document.getElementById("attendance-status-halfday").checked = false;
    document.getElementById("attendance-status-onleave").checked = false;
    const noteEl = document.getElementById("input-attendance-note");
    if (noteEl) noteEl.value = "";
    const errEl = document.getElementById("attendance-error");
    if (errEl) errEl.style.display = "none";

    // Pre-select current attendance
    const radioMap = {
      "Present": "attendance-status-present",
      "Absent": "attendance-status-absent",
      "Half Day": "attendance-status-halfday",
      "On Leave": "attendance-status-onleave"
    };
    const currentRadio = radioMap[w.attendance];
    if (currentRadio) {
      const r = document.getElementById(currentRadio);
      if (r) r.checked = true;
    }

    this.toggleSheet("worker-attendance-sheet", "worker-attendance-backdrop", true);
  },

  closeAttendanceSheet() {
    this.toggleSheet("worker-attendance-sheet", "worker-attendance-backdrop", false);
  },

  async saveAttendance(event) {
    event.preventDefault();
    const w = this.state.currentWorker;
    if (!w) return;

    const statusPresent = document.getElementById("attendance-status-present");
    const statusAbsent = document.getElementById("attendance-status-absent");
    const statusHalf = document.getElementById("attendance-status-halfday");
    const statusLeave = document.getElementById("attendance-status-onleave");
    const noteEl = document.getElementById("input-attendance-note");
    const errEl = document.getElementById("attendance-error");

    let newStatus = "";
    if (statusPresent && statusPresent.checked) newStatus = "Present";
    else if (statusAbsent && statusAbsent.checked) newStatus = "Absent";
    else if (statusHalf && statusHalf.checked) newStatus = "Half Day";
    else if (statusLeave && statusLeave.checked) newStatus = "On Leave";

    if (!newStatus) {
      if (errEl) errEl.style.display = "block";
      return;
    }
    if (errEl) errEl.style.display = "none";

    const dateEl = document.getElementById("attendance-date");
    const dateVal = dateEl ? dateEl.value : new Date().toISOString().split("T")[0];
    const note = noteEl ? noteEl.value.trim() : "";

    const saveBtn = document.getElementById("btn-save-attendance-text");
    if (saveBtn) saveBtn.textContent = "Saving...";

    try {
      const res = await updateWorkerAttendance(w.id, {
        status: newStatus,
        date: dateVal,
        check_in: newStatus === "Present" ? (w.check_in || null) : null,
        check_out: null,
        note: note
      });
      if (res.worker) {
        const idx = this.state.workers.findIndex(x => x.id === w.id);
        if (idx !== -1) this.state.workers[idx] = res.worker;
        this.state.currentWorker = res.worker;
      }
      this.closeAttendanceSheet();
      this.loadData();
    } catch (err) {
      console.error("Attendance save error", err);
    } finally {
      if (saveBtn) saveBtn.textContent = "Save Attendance";
    }
  },

  /* ---- Attendance History Sheet ---- */
  async openHistorySheet(workerId) {
    const w = this.state.workers.find(x => x.id === workerId) || this.state.currentWorker;
    if (!w) return;
    this.state.currentWorker = w;
    this.state.attendanceHistoryLoaded = false;

    const titleEl = document.getElementById("history-worker-name");
    if (titleEl) titleEl.textContent = w.name;
    const idEl = document.getElementById("history-worker-id");
    if (idEl) idEl.textContent = w.worker_id || w.id;

    // Reset month to current
    this.state.currentMonthKey = new Date().toISOString().substring(0, 7);
    this.updateMonthLabel();

    // Clear previous history
    const listEl = document.getElementById("history-list");
    if (listEl) listEl.innerHTML = "";

    this.toggleSheet("worker-history-sheet", "worker-history-backdrop", true);
    this.loadHistory();
  },

  updateMonthLabel() {
    const labelEl = document.getElementById("history-month-label");
    if (labelEl) {
      const d = new Date(this.state.currentMonthKey + "-01");
      labelEl.textContent = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    }
  },

  async loadHistory() {
    const w = this.state.currentWorker;
    if (!w) return;

    const listEl = document.getElementById("history-list");
    const loadingEl = document.getElementById("history-loading");
    if (loadingEl) loadingEl.style.display = "flex";
    if (listEl) listEl.style.display = "none";

    try {
      const res = await getWorkerAttendanceHistory(w.id, { month: this.state.currentMonthKey });
      const history = res.attendance || [];

      if (listEl) {
        if (history.length === 0) {
          listEl.innerHTML = `<div style="text-align:center; padding:1rem; color:var(--text-muted); font-size:0.85rem;">No attendance records for this period.</div>`;
        } else {
          listEl.innerHTML = history.map(h => `
            <div class="history-record">
              <div class="history-record-date">
                <span class="history-date">${h.date}</span>
                <span class="history-day">${h.day}</span>
              </div>
              <div class="history-status" style="color:${this.getAttendanceColor(h.status)};">${h.status}</div>
              <div class="history-times">
                ${h.check_in ? `<span>IN: ${h.check_in}</span>` : ""}
                ${h.check_out ? `<span>OUT: ${h.check_out}</span>` : ""}
              </div>
            </div>
          `).join("");
        }
      }
      this.state.attendanceHistoryLoaded = true;
    } catch (err) {
      console.error("Attendance history load error", err);
      if (listEl) listEl.innerHTML = `<div style="padding:1rem; color:#f87171;">Error loading history.</div>`;
    } finally {
      if (loadingEl) loadingEl.style.display = "none";
      if (listEl) listEl.style.display = "block";
    }
  },

  prevMonth() {
    const d = new Date(this.state.currentMonthKey + "-01");
    d.setMonth(d.getMonth() - 1);
    this.state.currentMonthKey = d.toISOString().substring(0, 7);
    this.updateMonthLabel();
    this.loadHistory();
  },

  nextMonth() {
    const d = new Date(this.state.currentMonthKey + "-01");
    d.setMonth(d.getMonth() + 1);
    this.state.currentMonthKey = d.toISOString().substring(0, 7);
    this.updateMonthLabel();
    this.loadHistory();
  },

  closeHistorySheet() {
    this.toggleSheet("worker-history-sheet", "worker-history-backdrop", false);
  },

  /* ---- Add Worker Sheet ---- */
  openAddSheet() {
    this.state.currentWorker = null;
    this.clearAddForm();
    this.toggleSheet("worker-add-sheet", "worker-add-backdrop", true);
  },

  closeAddSheet() {
    this.toggleSheet("worker-add-sheet", "worker-add-backdrop", false);
  },

  clearAddForm() {
    document.getElementById("input-worker-name").value = "";
    document.getElementById("input-worker-phone").value = "";
    document.getElementById("input-worker-email").value = "";
    document.getElementById("input-worker-id").value = "";
    document.getElementById("input-worker-joining").value = new Date().toISOString().split("T")[0];
    document.getElementById("input-worker-role").value = "Security Guard";
    document.getElementById("input-worker-emp-type").value = "Full Time";
    document.getElementById("input-worker-emergency").value = "";
    const errEl = document.getElementById("worker-add-error");
    if (errEl) errEl.style.display = "none";
    const errText = document.getElementById("worker-add-error-text");
    if (errText) errText.textContent = "";
  },

  validateAddForm() {
    const name = document.getElementById("input-worker-name").value.trim();
    const phone = document.getElementById("input-worker-phone").value.trim();
    const role = document.getElementById("input-worker-role").value;
    const workerId = document.getElementById("input-worker-id").value.trim();
    const joining = document.getElementById("input-worker-joining").value;

    const errEl = document.getElementById("worker-add-error");
    const errText = document.getElementById("worker-add-error-text");
    if (!errEl || !errText) return false;

    if (!name || !phone || !role || !workerId || !joining) {
      errText.textContent = "Please fill in all required fields.";
      errEl.style.display = "block";
      return false;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      errText.textContent = "Please enter a valid phone number.";
      errEl.style.display = "block";
      return false;
    }
    errEl.style.display = "none";
    return true;
  },

  async saveNewWorker(event) {
    event.preventDefault();
    if (!this.validateAddForm()) return;

    const submitBtn = document.getElementById("btn-add-worker-text");
    if (submitBtn) submitBtn.textContent = "Adding...";

    try {
      const res = await createWorker({
        name: document.getElementById("input-worker-name").value.trim(),
        phone: document.getElementById("input-worker-phone").value.trim(),
        email: document.getElementById("input-worker-email").value.trim(),
        role: document.getElementById("input-worker-role").value,
        worker_id: document.getElementById("input-worker-id").value.trim(),
        joining_date: document.getElementById("input-worker-joining").value,
        employment_type: document.getElementById("input-worker-emp-type").value,
        emergency_contact: document.getElementById("input-worker-emergency").value.trim() || null,
        attendance: "Present",
        status: "Active"
      });
      if (res.worker) {
        this.state.workers.push(res.worker);
      }
      this.closeAddSheet();
      this.loadData();
    } catch (err) {
      console.error("Add worker error", err);
    } finally {
      if (submitBtn) submitBtn.textContent = "Add Worker";
    }
  },

  /* ---- Edit Worker Sheet ---- */
  openEditSheet(workerId) {
    const w = this.state.workers.find(x => x.id === workerId) || this.state.currentWorker;
    if (!w) return;
    this.state.currentWorker = w;

    document.getElementById("edit-worker-name").value = w.name || "";
    document.getElementById("edit-worker-phone").value = w.phone || "";
    document.getElementById("edit-worker-email").value = w.email || "";
    document.getElementById("edit-worker-id").value = w.worker_id || w.id || "";
    document.getElementById("edit-worker-id").disabled = true;
    document.getElementById("edit-worker-joining").value = w.joining_date || "";
    document.getElementById("edit-worker-role").value = w.role || "Security Guard";
    document.getElementById("edit-worker-emp-type").value = w.employment_type || "Full Time";
    document.getElementById("edit-worker-emergency").value = w.emergency_contact || "";
    const errEl = document.getElementById("worker-edit-error");
    if (errEl) errEl.style.display = "none";

    this.toggleSheet("worker-edit-sheet", "worker-edit-backdrop", true);
  },

  closeEditSheet() {
    this.toggleSheet("worker-edit-sheet", "worker-edit-backdrop", false);
  },

  async saveWorkerEdit(event) {
    event.preventDefault();
    const w = this.state.currentWorker;
    if (!w) return;

    const submitBtn = document.getElementById("btn-save-worker-text");
    if (submitBtn) submitBtn.textContent = "Saving...";

    try {
      const res = await updateWorker(w.id, {
        name: document.getElementById("edit-worker-name").value.trim(),
        phone: document.getElementById("edit-worker-phone").value.trim(),
        email: document.getElementById("edit-worker-email").value.trim(),
        role: document.getElementById("edit-worker-role").value,
        employment_type: document.getElementById("edit-worker-emp-type").value,
        emergency_contact: document.getElementById("edit-worker-emergency").value.trim() || null
      });
      if (res.worker) {
        const idx = this.state.workers.findIndex(x => x.id === w.id);
        if (idx !== -1) this.state.workers[idx] = res.worker;
        this.state.currentWorker = res.worker;
      }
      this.closeEditSheet();
      this.closeDetailSheet();
      this.loadData();
    } catch (err) {
      console.error("Edit worker error", err);
    } finally {
      if (submitBtn) submitBtn.textContent = "Save Changes";
    }
  },

  /* ---- Deactivate Confirmation ---- */
  openDeactivateSheet(workerId) {
    const w = this.state.workers.find(x => x.id === workerId) || this.state.currentWorker;
    if (!w) return;
    this.state.currentWorker = w;

    if (typeof GrihamConfirmation !== "undefined") {
      GrihamConfirmation.open({
        title: "Deactivate Staff Member?",
        message: `Are you sure you want to deactivate ${w.name || "this worker"}? Their access to the society premises and system assignments will be revoked.`,
        confirmText: "Deactivate",
        cancelText: "Cancel",
        isDanger: true,
        onConfirm: () => this.executeDeactivate()
      });
      return;
    }

    const nameEl = document.getElementById("deactivate-worker-name");
    if (nameEl) nameEl.textContent = w.name;

    this.toggleSheet("worker-deactivate-sheet", "worker-deactivate-backdrop", true);
  },

  closeDeactivateSheet() {
    if (typeof GrihamConfirmation !== "undefined") {
      GrihamConfirmation.close(false);
    }
    this.toggleSheet("worker-deactivate-sheet", "worker-deactivate-backdrop", false);
  },

  async executeDeactivate() {
    const w = this.state.currentWorker;
    if (!w) return;

    const btn = document.getElementById("btn-execute-deactivate-text");
    if (btn) btn.textContent = "Deactivating...";

    try {
      const res = await deactivateWorker(w.id);
      if (res.worker) {
        const idx = this.state.workers.findIndex(x => x.id === w.id);
        if (idx !== -1) this.state.workers[idx] = res.worker;
      }
      this.closeDeactivateSheet();
      this.closeDetailSheet();
      this.loadData();
    } catch (err) {
      console.error("Deactivate error", err);
    } finally {
      if (btn) btn.textContent = "Deactivate";
    }
  },

  callCurrentWorkerCategory() {
    const w = this.state.currentWorker;
    if (!w) return;
    GrihamCallSelectorUI.openForWorkerRole(w.role, w.id);
  },

  /* ---- Sheet Helper ---- */
  toggleSheet(sheetId, backdropId, open) {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.toggle(sheetId, backdropId, open);
    }
  },

  closeAllSheets() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.closeAll();
    }
  }
};
