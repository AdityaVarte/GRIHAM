/**
 * GRIHAM FRONTEND - RESIDENT COMPLAINTS CONTROLLER & TEMPLATE
 * Page: Resident Complaints & Helpdesk (#/resident/complaints)
 * Mobile-first Residential Society Management App
 */

window.HTML_RESIDENT_COMPLAINTS = `
<!-- ================================================================= -->
<!-- RESIDENT COMPLAINTS BOTTOM SHEETS & MODALS                        -->
<!-- ================================================================= -->

<!-- 1. COMPLAINT DETAIL BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-complaint-detail-backdrop" onclick="GrihamResidentComplaintsUI.closeDetail()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-complaint-detail" role="dialog" aria-modal="true" aria-labelledby="res-comp-detail-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentComplaintsUI.closeDetail()" aria-label="Close complaint details" title="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <div class="sheet-title-group">
      <h3 class="sheet-title" id="res-comp-detail-title">Complaint Details</h3>
      <span class="sheet-id-badge" id="res-comp-detail-id-badge">CMP-2026-0043</span>
    </div>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <!-- Scrollable Detail Container -->
  <div id="res-complaint-detail-body" class="complaint-detail-body" style="padding-bottom:calc(2rem + var(--safe-bottom, 20px));">
    <!-- Dynamically populated by GrihamResidentComplaintsUI.renderDetailBody -->
  </div>
</div>

<!-- 2. RAISE COMPLAINT BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-raise-backdrop" onclick="GrihamResidentComplaintsUI.closeRaiseSheet()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-raise-complaint" role="dialog" aria-modal="true" aria-labelledby="res-raise-sheet-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentComplaintsUI.closeRaiseSheet()" aria-label="Close raise complaint sheet" title="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="res-raise-sheet-title">Raise New Complaint</h3>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <form id="form-res-raise-complaint" onsubmit="GrihamResidentComplaintsUI.submitComplaintForm(event)" style="display:flex; flex-direction:column; gap:0.9rem; padding:0.25rem 0.25rem calc(2rem + var(--safe-bottom, 20px));">
    
    <!-- Category Select -->
    <div class="form-group">
      <label class="form-label" for="res-raise-category">Category <span style="color:#ef4444; font-weight:700;">*</span></label>
      <div class="input-wrapper">
        <select id="res-raise-category" class="form-select" required aria-required="true">
          <option value="" disabled selected>Select category...</option>
          <option value="Plumbing">Plumbing (Leaks, Taps, Drainage)</option>
          <option value="Electrical">Electrical (Power, Switches, Lights)</option>
          <option value="Water">Water Supply & Pressure</option>
          <option value="Maintenance">Maintenance & Civil Repairs</option>
          <option value="Security">Security & Access Control</option>
          <option value="Cleaning">Cleaning & Waste Disposal</option>
          <option value="Elevators">Elevator / Lift Issues</option>
          <option value="Other">Other / General Society Issue</option>
        </select>
      </div>
      <p class="form-error-msg" id="res-raise-category-error" style="display:none;">Please select a category.</p>
    </div>

    <!-- Urgent / Priority Toggle Card -->
    <div class="res-urgent-toggle-card">
      <div style="display:flex; align-items:center; gap:0.6rem;">
        <div class="res-urgent-icon-wrap" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div>
          <strong style="font-size:0.86rem; color:var(--text-primary); display:block;">Mark as Urgent Issue</strong>
          <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Escalates priority for active leaks or safety hazards</span>
        </div>
      </div>
      <label class="res-switch-label" for="res-raise-is-urgent" aria-label="Mark as Urgent">
        <input type="checkbox" id="res-raise-is-urgent" class="res-switch-checkbox">
        <span class="res-switch-slider"></span>
      </label>
    </div>

    <!-- Complaint Title Input -->
    <div class="form-group">
      <label class="form-label" for="res-raise-title">Title / Summary <span style="color:#ef4444; font-weight:700;">*</span></label>
      <div class="input-wrapper">
        <input 
          type="text" 
          id="res-raise-title" 
          class="form-input" 
          placeholder="e.g. Water pressure low in kitchen tap" 
          minlength="5" 
          maxlength="80" 
          required 
          aria-required="true"
        >
      </div>
      <p class="form-error-msg" id="res-raise-title-error" style="display:none;">Title must be at least 5 characters long.</p>
    </div>

    <!-- Description Textarea -->
    <div class="form-group">
      <label class="form-label" for="res-raise-desc">Detailed Description <span style="color:#ef4444; font-weight:700;">*</span></label>
      <div class="input-wrapper">
        <textarea 
          id="res-raise-desc" 
          class="form-textarea" 
          rows="3" 
          placeholder="Describe where the issue is, when it started, and any symptoms..." 
          minlength="10" 
          maxlength="500" 
          required 
          aria-required="true"
        ></textarea>
      </div>
      <p class="form-error-msg" id="res-raise-desc-error" style="display:none;">Description must be at least 10 characters long.</p>
    </div>

    <!-- Photo Attachment Section -->
    <div class="form-group">
      <label class="form-label">Attach Photo <span style="font-size:0.72rem; color:var(--text-muted); font-weight:400;">(Optional)</span></label>
      
      <!-- Hidden file input -->
      <input type="file" id="res-raise-photo-input" accept="image/*" style="display:none;" onchange="GrihamResidentComplaintsUI.handlePhotoFileChange(event)">
      
      <!-- Dropzone -->
      <div class="res-photo-upload-dropzone" id="res-raise-photo-dropzone" onclick="document.getElementById('res-raise-photo-input').click()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="res-upload-icon" aria-hidden="true">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
        <span style="font-size:0.82rem; font-weight:600; color:var(--text-primary);">Tap to upload or take a photo</span>
        <span style="font-size:0.72rem; color:var(--text-muted);">PNG, JPG up to 5MB</span>
      </div>

      <!-- Quick sample presets for instant demonstration -->
      <div class="res-photo-presets-row" id="res-raise-photo-presets">
        <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600;">Sample presets:</span>
        <button type="button" class="btn-preset-pill" onclick="GrihamResidentComplaintsUI.selectPhotoPreset('leak')">💧 Tap Leak</button>
        <button type="button" class="btn-preset-pill" onclick="GrihamResidentComplaintsUI.selectPhotoPreset('bulb')">💡 Hallway Bulb</button>
        <button type="button" class="btn-preset-pill" onclick="GrihamResidentComplaintsUI.selectPhotoPreset('latch')">🚪 Door Lock</button>
      </div>

      <!-- Preview card (hidden initially) -->
      <div class="res-photo-preview-card" id="res-raise-photo-preview" style="display:none;">
        <img id="res-raise-preview-img" src="" alt="Complaint photo preview" class="res-photo-preview-thumb">
        <div style="flex:1; min-width:0;">
          <strong style="font-size:0.8rem; color:var(--text-primary); display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" id="res-raise-preview-name">photo.jpg</strong>
          <span style="font-size:0.7rem; color:var(--text-muted);" id="res-raise-preview-size">1.2 MB</span>
        </div>
        <button type="button" class="btn-remove-photo" onclick="GrihamResidentComplaintsUI.removePhoto()" aria-label="Remove photo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Submit Action Row -->
    <div style="margin-top:0.5rem; display:flex; flex-direction:column; gap:0.5rem;">
      <button type="submit" class="btn-primary-action btn-resident-style" id="btn-submit-complaint" style="min-height:46px;">
        <span id="btn-submit-complaint-text">Submit Complaint</span>
      </button>
      <button type="button" class="btn-logout-cancel" onclick="GrihamResidentComplaintsUI.closeRaiseSheet()">Cancel</button>
    </div>
  </form>
</div>

<!-- 3. CANCEL COMPLAINT BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-cancel-backdrop" onclick="GrihamResidentComplaintsUI.closeCancelSheet()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-cancel" role="dialog" aria-modal="true" aria-labelledby="res-cancel-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom, 20px));">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentComplaintsUI.closeCancelSheet()" aria-label="Go back" title="Go back">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="res-cancel-title">Cancel Complaint</h3>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <div style="display:flex; flex-direction:column; gap:0.9rem; padding:0.25rem 0.25rem;">
    <div style="background:rgba(239, 68, 68, 0.1); border:1px solid rgba(239, 68, 68, 0.25); border-radius:12px; padding:0.85rem; display:flex; gap:0.65rem; align-items:flex-start;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2" style="flex-shrink:0; margin-top:2px;">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>
        <strong style="color:#ef4444; font-size:0.85rem; display:block;">Cancel this complaint?</strong>
        <p style="color:var(--text-secondary); font-size:0.75rem; margin:0.2rem 0 0;">This will withdraw the ticket from society maintenance. If resolved on your own, please let us know.</p>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="res-cancel-reason">Reason for cancellation <span style="font-size:0.72rem; color:var(--text-muted); font-weight:400;">(Optional)</span></label>
      <div class="input-wrapper">
        <textarea 
          id="res-cancel-reason" 
          class="form-textarea" 
          rows="2" 
          placeholder="e.g. Resolved on my own, registered by mistake..."
        ></textarea>
      </div>
    </div>

    <div class="logout-btn-row" style="margin-top:0.25rem;">
      <button type="button" class="btn-logout-cancel" onclick="GrihamResidentComplaintsUI.closeCancelSheet()">Keep Complaint</button>
      <button type="button" class="btn-primary-action btn-danger-action" id="btn-confirm-res-cancel" onclick="GrihamResidentComplaintsUI.executeCancelComplaint()" style="margin-top:0; min-height:44px;">
        <span>Confirm Cancellation</span>
      </button>
    </div>
  </div>
</div>

<!-- 4. LIGHTBOX PHOTO VIEWER MODAL -->
<div class="sheet-backdrop" id="res-photo-lightbox-backdrop" onclick="GrihamResidentComplaintsUI.closePhotoViewer()" aria-hidden="true" style="z-index:999;"></div>
<div id="res-photo-lightbox" style="display:none; position:fixed; inset:0; z-index:1000; align-items:center; justify-content:center; padding:1.5rem; pointer-events:auto;" onclick="GrihamResidentComplaintsUI.closePhotoViewer()">
  <div style="position:relative; max-width:90vw; max-height:85vh; display:flex; flex-direction:column; align-items:center;" onclick="event.stopPropagation()">
    <button type="button" onclick="GrihamResidentComplaintsUI.closePhotoViewer()" style="position:absolute; top:-40px; right:0; background:rgba(0,0,0,0.6); border:1px solid rgba(255,255,255,0.2); color:#fff; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;" aria-label="Close photo">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <img id="res-lightbox-img" src="" alt="Enlarged complaint attachment" style="max-width:100%; max-height:80vh; border-radius:14px; box-shadow:0 20px 40px rgba(0,0,0,0.8); object-fit:contain; border:1px solid rgba(255,255,255,0.15);">
    <span id="res-lightbox-caption" style="color:#e2e8f0; font-size:0.75rem; margin-top:0.6rem; text-align:center;">Complaint Attachment</span>
  </div>
</div>

<!-- ================================================================= -->
<!-- MAIN SCREEN VIEW (#screen-resident-complaints)                   -->
<!-- ================================================================= -->
<section id="screen-resident-complaints" class="app-view resident-complaints-view" aria-labelledby="res-complaints-header-title">

  <!-- 1. STICKY TOP APP BAR -->
  <div class="screen-top-bar res-comp-top-bar">
    ${GrihamHeader.renderBackButton({
      target: '/resident/home',
      id: 'btn-res-comp-back',
      ariaLabel: 'Back to Resident Home',
      label: 'Home'
    })}

    <h1 class="top-bar-screen-title" id="res-complaints-header-title">Complaints</h1>

    <!-- Top Right Action Pill: + Raise -->
    <button type="button" class="btn-res-raise-action" id="btn-res-raise-top" onclick="GrihamResidentComplaintsUI.handleRaiseClick()" aria-label="Raise new complaint">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      <span>Raise</span>
    </button>
  </div>

  <!-- 2. SUMMARY OVERVIEW CARDS (Compact Grid) -->
  <div class="res-comp-overview-section">
    <div class="overview-title-row">
      <span class="overview-section-title">My Complaints Overview</span>
      <span class="overview-total-badge" id="stat-res-complaints-total-badge">0 Total</span>
    </div>

    <div class="complaints-summary-grid res-comp-summary-grid">
      <!-- Total / All Card -->
      <button type="button" class="complaint-sum-card card-open" onclick="GrihamResidentComplaintsUI.setFilter('status', 'all')" aria-label="View All Complaints">
        <div class="sum-card-top">
          <span class="sum-card-label">Total</span>
          <span class="sum-card-dot" style="background:#60a5fa;" aria-hidden="true"></span>
        </div>
        <strong class="sum-card-val" id="stat-res-comp-total">0</strong>
      </button>

      <!-- Active / In Progress Card -->
      <button type="button" class="complaint-sum-card card-pending" onclick="GrihamResidentComplaintsUI.setFilter('status', 'working')" aria-label="Filter Active Complaints">
        <div class="sum-card-top">
          <span class="sum-card-label">Active</span>
          <span class="sum-card-dot dot-pending" aria-hidden="true"></span>
        </div>
        <strong class="sum-card-val" id="stat-res-comp-active">0</strong>
      </button>

      <!-- Solved Card -->
      <button type="button" class="complaint-sum-card card-solved" onclick="GrihamResidentComplaintsUI.setFilter('status', 'solved')" aria-label="Filter Solved Complaints">
        <div class="sum-card-top">
          <span class="sum-card-label">Solved</span>
          <span class="sum-card-dot dot-solved" aria-hidden="true"></span>
        </div>
        <strong class="sum-card-val" id="stat-res-comp-solved">0</strong>
      </button>
    </div>
  </div>

  <!-- 3. SEARCH & SORT CONTROLS -->
  <div class="complaints-controls-bar">
    <div class="input-wrapper complaints-search-wrapper">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="input-icon-left" aria-hidden="true">
        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input 
        type="text" 
        id="res-complaints-search-input" 
        class="form-input complaints-search-input" 
        placeholder="Search my complaints..." 
        oninput="GrihamResidentComplaintsUI.handleSearch(this.value)" 
        aria-label="Search complaints by title, category, or ID"
      >
      <button type="button" class="btn-search-clear" id="btn-res-comp-search-clear" onclick="GrihamResidentComplaintsUI.clearSearch()" style="display:none;" aria-label="Clear search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <div class="complaints-sort-wrapper">
      <select id="res-complaints-sort-select" class="form-select complaints-sort-select" onchange="GrihamResidentComplaintsUI.handleSort(this.value)" aria-label="Sort complaints">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="status">Status</option>
      </select>
    </div>
  </div>

  <!-- 4. STATUS FILTER CHIPS -->
  <div class="complaints-filter-chips-bar" role="group" aria-label="Filter Complaints by Status">
    <button type="button" class="btn-filter-chip active" data-res-status="all" onclick="GrihamResidentComplaintsUI.setFilter('status', 'all')">All</button>
    <button type="button" class="btn-filter-chip" data-res-status="pending" onclick="GrihamResidentComplaintsUI.setFilter('status', 'pending')">Pending</button>
    <button type="button" class="btn-filter-chip" data-res-status="working" onclick="GrihamResidentComplaintsUI.setFilter('status', 'working')">In Progress</button>
    <button type="button" class="btn-filter-chip" data-res-status="solved" onclick="GrihamResidentComplaintsUI.setFilter('status', 'solved')">Solved</button>
    <button type="button" class="btn-filter-chip" data-res-status="cancelled" onclick="GrihamResidentComplaintsUI.setFilter('status', 'cancelled')">Cancelled</button>
  </div>

  <!-- 5. SECONDARY CATEGORY FILTER ROW -->
  <div class="complaints-sub-filters-bar" style="padding: 0 1rem 0.5rem;">
    <div class="sub-filter-item">
      <label for="filter-res-category" class="sub-filter-label">Category:</label>
      <select id="filter-res-category" class="form-select sub-filter-select" onchange="GrihamResidentComplaintsUI.setFilter('category', this.value)" aria-label="Filter by Category">
        <option value="all">All Categories</option>
        <option value="Plumbing">Plumbing</option>
        <option value="Electrical">Electrical</option>
        <option value="Water">Water Supply</option>
        <option value="Maintenance">Maintenance & Civil</option>
        <option value="Security">Security</option>
        <option value="Cleaning">Cleaning</option>
        <option value="Elevators">Elevators</option>
        <option value="Other">Other</option>
      </select>
    </div>
  </div>

  <!-- 6. ACTIVE FILTER TAGS ROW -->
  <div class="complaints-active-tags-row" id="res-comp-active-tags" style="display:none;">
    <span class="active-tags-label">Active:</span>
    <div id="res-comp-active-tags-list" class="active-tags-list"></div>
    <button type="button" class="btn-clear-all-filters" onclick="GrihamResidentComplaintsUI.resetAllFilters()">Reset</button>
  </div>

  <!-- 7. SKELETON LOADER -->
  <div id="res-comp-loading" style="display:none; flex-direction:column; gap:0.65rem; padding:0 1rem; margin-top:0.75rem;">
    <div class="dash-skeleton-card" style="height: 104px;"></div>
    <div class="dash-skeleton-card" style="height: 104px;"></div>
    <div class="dash-skeleton-card" style="height: 104px;"></div>
  </div>

  <!-- 8. EMPTY STATE -->
  <div class="maint-empty-card" id="res-comp-empty" style="display:none; margin:1.5rem 1rem;">
    <div class="empty-icon-pill" aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    </div>
    <h3 class="empty-title" id="res-comp-empty-title">No complaints found</h3>
    <p class="empty-desc" id="res-comp-empty-desc">You have not raised any complaints yet, or none match your filters.</p>
    <button type="button" class="btn-primary-action btn-resident-style" id="btn-empty-raise" onclick="GrihamResidentComplaintsUI.handleRaiseClick()" style="width:auto; padding:0.5rem 1.4rem; font-size:0.82rem; margin-top:0.5rem;">
      + Raise a Complaint
    </button>
  </div>

  <!-- 9. ERROR STATE -->
  <div class="maint-error-card" id="res-comp-error" style="display:none; margin:1.5rem 1rem;">
    <p style="font-weight:600; color:var(--text-primary); margin-bottom:0.5rem;">Unable to load complaints.</p>
    <button type="button" class="btn-primary-action btn-resident-style" onclick="GrihamResidentComplaintsUI.loadData(true)" style="min-height:38px; font-size:0.82rem; padding:0.4rem 1.2rem;">
      Try Again
    </button>
  </div>

  <!-- 10. COMPLAINTS LIST FEED -->
  <div class="complaints-list-container res-complaints-list" id="res-complaints-list">
    <!-- Populated dynamically by GrihamResidentComplaintsUI.renderComplaintsList -->
  </div>

  <!-- 11. BOTTOM NAVIGATION BAR -->
  <nav class="res-bottom-nav" aria-label="Resident Navigation">
    <button type="button" class="res-nav-item" onclick="GrihamRouter.navigate('/resident/home')" aria-label="Home" id="res-comp-nav-home">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span>Home</span>
    </button>
    <button type="button" class="res-nav-item" onclick="GrihamResidentComplaintsUI.handleNavServices()" aria-label="Services" id="res-comp-nav-services">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      <span>Services</span>
    </button>
    <button type="button" class="res-nav-item active" onclick="GrihamRouter.navigate('/resident/complaints')" aria-label="Complaints" aria-current="page" id="res-comp-nav-complaints">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      <span>Complaints</span>
    </button>
    <button type="button" class="res-nav-item" onclick="GrihamRouter.navigate('/resident/profile')" aria-label="Profile" id="res-comp-nav-profile">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span>Profile</span>
    </button>
  </nav>

</section>
`;

/**
 * Controller Object for Resident Complaints
 */
window.GrihamResidentComplaintsUI = {
  state: {
    complaints: [],
    summary: { total: 0, active: 0, pending: 0, working: 0, solved: 0, cancelled: 0 },
    searchQuery: "",
    filters: {
      status: "all",
      category: "all"
    },
    sortBy: "newest",
    selectedComplaint: null,
    attachedPhoto: null, // { name, size, url }
    isSubmitting: false
  },

  /**
   * Screen Initialization Hook called by GrihamRouter
   */
  async init() {
    await this.loadData();
    if (typeof GrihamI18n !== "undefined" && typeof GrihamI18n.translate === "function") {
      GrihamI18n.translate(GrihamState.language);
    }
  },

  /**
   * Fetch resident complaints from canonical API
   */
  async loadData(forceRefresh = false) {
    const listEl = document.getElementById("res-complaints-list");
    const loadingEl = document.getElementById("res-comp-loading");
    const errorEl = document.getElementById("res-comp-error");
    const emptyEl = document.getElementById("res-comp-empty");

    if (loadingEl) loadingEl.style.display = "flex";
    if (listEl) listEl.style.display = "none";
    if (errorEl) errorEl.style.display = "none";
    if (emptyEl) emptyEl.style.display = "none";

    try {
      const fetchFn = (typeof getResidentComplaints === "function") 
        ? getResidentComplaints 
        : (window.GrihamAPI && window.GrihamAPI.getResidentComplaints);

      if (!fetchFn) {
        throw new Error("getResidentComplaints API not found");
      }

      const res = await fetchFn();
      this.state.complaints = res.complaints || [];

      this.computeSummary();
      this.renderSummary();
      this.renderComplaintsList();
    } catch (err) {
      console.error("[Resident Complaints Load Error]", err);
      if (errorEl) errorEl.style.display = "block";
    } finally {
      if (loadingEl) loadingEl.style.display = "none";
      if (listEl) listEl.style.display = "flex";
    }
  },

  /**
   * Calculate summary metrics from complaints list
   */
  computeSummary() {
    const list = this.state.complaints;
    const total = list.length;
    let pending = 0;
    let working = 0;
    let solved = 0;
    let cancelled = 0;

    list.forEach(c => {
      const s = (c.status || "").toLowerCase();
      if (s === "pending") pending++;
      else if (s === "working" || s === "in progress" || s === "in_progress") working++;
      else if (s === "solved" || s === "resolved") solved++;
      else if (s === "cancelled") cancelled++;
    });

    this.state.summary = {
      total,
      active: pending + working,
      pending,
      working,
      solved,
      cancelled
    };
  },

  /**
   * Render summary counters
   */
  renderSummary() {
    const s = this.state.summary;
    const badgeTotal = document.getElementById("stat-res-complaints-total-badge");
    const totalVal = document.getElementById("stat-res-comp-total");
    const activeVal = document.getElementById("stat-res-comp-active");
    const solvedVal = document.getElementById("stat-res-comp-solved");

    if (badgeTotal) badgeTotal.textContent = `${s.total} Total`;
    if (totalVal) totalVal.textContent = s.total;
    if (activeVal) activeVal.textContent = s.active;
    if (solvedVal) solvedVal.textContent = s.solved;
  },

  /**
   * Check resident approval status for action gating
   */
  checkResidentApproval() {
    const user = (typeof GrihamAuth !== "undefined" && GrihamAuth.getUser()) ||
                 (typeof GrihamState !== "undefined" && GrihamState.currentUser) || {};
    const status = (user.approvalStatus || user.approval || "Approved").toLowerCase();
    return {
      isApproved: status === "approved",
      status: status
    };
  },

  /**
   * Handle user clicking + Raise Complaint
   */
  handleRaiseClick() {
    const approval = this.checkResidentApproval();
    if (approval.status === "pending") {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Complaint creation is disabled while your registration is pending approval.", "warning");
      } else {
        alert("Complaint creation is disabled while your registration is pending approval.");
      }
      return;
    }
    if (approval.status === "rejected") {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Registration not approved. Please contact society administration.", "error");
      } else {
        alert("Registration not approved.");
      }
      return;
    }

    this.openRaiseSheet();
  },

  /**
   * Handle navigation to /resident/services with approval guard
   */
  handleNavServices() {
    const approval = this.checkResidentApproval();
    if (approval.status === "pending") {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Service requests are disabled while your registration is pending approval.", "warning");
      }
      return;
    }
    GrihamRouter.navigate("/resident/services");
  },

  /**
   * Filter & Sort complaints list
   */
  getFilteredComplaints() {
    let list = [...this.state.complaints];
    const { status, category } = this.state.filters;
    const q = this.state.searchQuery.toLowerCase().trim();

    // 1. Search Query Filter
    if (q) {
      list = list.filter(c => {
        const titleMatch = (c.title || "").toLowerCase().includes(q);
        const idMatch = (c.id || "").toLowerCase().includes(q);
        const catMatch = (c.category || "").toLowerCase().includes(q);
        const descMatch = (c.description || "").toLowerCase().includes(q);
        const workerMatch = c.assigned_to && ((c.assigned_to.name || "").toLowerCase().includes(q) || (c.assigned_to.role || "").toLowerCase().includes(q));
        return titleMatch || idMatch || catMatch || descMatch || workerMatch;
      });
    }

    // 2. Status Filter
    if (status !== "all") {
      list = list.filter(c => {
        const s = (c.status || "").toLowerCase();
        if (status === "working") {
          return s === "working" || s === "in progress" || s === "in_progress";
        }
        if (status === "solved") {
          return s === "solved" || s === "resolved";
        }
        return s === status;
      });
    }

    // 3. Category Filter
    if (category !== "all") {
      list = list.filter(c => {
        const cCat = (c.category || "").toLowerCase();
        return cCat === category.toLowerCase();
      });
    }

    // 4. Sorting
    if (this.state.sortBy === "newest") {
      list.sort((a, b) => (b.id || "").localeCompare(a.id || ""));
    } else if (this.state.sortBy === "oldest") {
      list.sort((a, b) => (a.id || "").localeCompare(b.id || ""));
    } else if (this.state.sortBy === "status") {
      list.sort((a, b) => (a.status || "").localeCompare(b.status || ""));
    }

    return list;
  },

  /**
   * Render Complaints Feed
   */
  renderComplaintsList() {
    const listEl = document.getElementById("res-complaints-list");
    const emptyEl = document.getElementById("res-comp-empty");
    const emptyDescEl = document.getElementById("res-comp-empty-desc");
    if (!listEl) return;

    const filtered = this.getFilteredComplaints();
    this.renderActiveFilterTags();

    if (filtered.length === 0) {
      listEl.innerHTML = "";
      if (emptyEl) {
        emptyEl.style.display = "flex";
        if (this.state.searchQuery || this.state.filters.status !== "all" || this.state.filters.category !== "all") {
          if (emptyDescEl) emptyDescEl.textContent = "No complaints match your current search or filter criteria.";
        } else {
          if (emptyDescEl) emptyDescEl.textContent = "You have not raised any complaints yet.";
        }
      }
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";

    const cardsHtml = filtered.map(c => {
      const isUrgent = (c.priority || "").toLowerCase() === "urgent";
      const statusHtml = (typeof GrihamStatusBadge !== "undefined")
        ? GrihamStatusBadge.render({ status: c.status, variant: "pill" })
        : `<span class="complaint-status-pill ${c.status}">${c.status}</span>`;

      const hasPhoto = c.attachments && c.attachments.images && c.attachments.images.length > 0;
      const photoThumb = hasPhoto ? c.attachments.images[0].url : null;

      const assignedSnippet = c.assigned_to 
        ? `<div class="res-card-worker-snippet">
             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
             <span>Assigned: <strong>${c.assigned_to.name}</strong> (${c.assigned_to.role || 'Staff'})</span>
           </div>`
        : '';

      return `
        <article class="complaint-card res-complaint-card" onclick="GrihamResidentComplaintsUI.openDetail('${c.id}')" role="button" tabindex="0" aria-label="Complaint ${c.id}: ${c.title}">
          <div class="complaint-card-top">
            <div class="complaint-badges-group">
              <span class="sheet-id-badge" style="font-size:0.72rem; padding:0.18rem 0.5rem;">${c.id}</span>
              <span class="complaint-cat-badge">${c.category || 'General'}</span>
              ${isUrgent ? `<span class="badge-urgent-pill">Urgent</span>` : ''}
            </div>
            ${statusHtml}
          </div>

          <div style="display:flex; gap:0.65rem; align-items:flex-start; margin-top:0.4rem;">
            <div style="flex:1; min-width:0;">
              <h3 class="complaint-card-title res-card-title">${c.title}</h3>
              <p class="res-card-desc-snippet">${c.description || ''}</p>
            </div>
            ${photoThumb ? `
              <div class="res-card-thumb-wrap" aria-hidden="true">
                <img src="${photoThumb}" alt="Attachment" class="res-card-thumb">
              </div>
            ` : ''}
          </div>

          ${assignedSnippet}

          <div class="complaint-card-footer" style="margin-top:0.5rem; padding-top:0.4rem; border-top:1px solid rgba(255,255,255,0.05);">
            <div class="complaint-card-meta">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${c.created_at || 'Recently'}</span>
            </div>
            <span class="res-card-chevron">
              View Details →
            </span>
          </div>
        </article>
      `;
    }).join("");

    listEl.innerHTML = cardsHtml;
  },

  /**
   * Search input handler
   */
  handleSearch(query) {
    this.state.searchQuery = (query || "").trim();
    const clearBtn = document.getElementById("btn-res-comp-search-clear");
    if (clearBtn) clearBtn.style.display = this.state.searchQuery ? "flex" : "none";
    this.renderComplaintsList();
  },

  /**
   * Clear search query
   */
  clearSearch() {
    const input = document.getElementById("res-complaints-search-input");
    if (input) input.value = "";
    this.handleSearch("");
  },

  /**
   * Sort handler
   */
  handleSort(sortKey) {
    this.state.sortBy = sortKey;
    this.renderComplaintsList();
  },

  /**
   * Status or Category filter setter
   */
  setFilter(type, value) {
    if (type === "status") {
      this.state.filters.status = value;
      document.querySelectorAll("[data-res-status]").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-res-status") === value);
      });
    } else if (type === "category") {
      this.state.filters.category = value;
      const catSelect = document.getElementById("filter-res-category");
      if (catSelect) catSelect.value = value;
    }
    this.renderComplaintsList();
  },

  /**
   * Reset all search and filter controls
   */
  resetAllFilters() {
    this.state.searchQuery = "";
    this.state.filters.status = "all";
    this.state.filters.category = "all";
    this.state.sortBy = "newest";

    const searchInput = document.getElementById("res-complaints-search-input");
    const clearBtn = document.getElementById("btn-res-comp-search-clear");
    const sortSelect = document.getElementById("res-complaints-sort-select");
    const catSelect = document.getElementById("filter-res-category");

    if (searchInput) searchInput.value = "";
    if (clearBtn) clearBtn.style.display = "none";
    if (sortSelect) sortSelect.value = "newest";
    if (catSelect) catSelect.value = "all";

    document.querySelectorAll("[data-res-status]").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-res-status") === "all");
    });

    this.renderComplaintsList();
  },

  /**
   * Render active filter tags row
   */
  renderActiveFilterTags() {
    const rowEl = document.getElementById("res-comp-active-tags");
    const listEl = document.getElementById("res-comp-active-tags-list");
    if (!rowEl || !listEl) return;

    const tags = [];
    if (this.state.searchQuery) {
      tags.push(`<span>Search: "${this.state.searchQuery}"</span>`);
    }
    if (this.state.filters.status !== "all") {
      tags.push(`<span>Status: ${this.state.filters.status}</span>`);
    }
    if (this.state.filters.category !== "all") {
      tags.push(`<span>Category: ${this.state.filters.category}</span>`);
    }

    if (tags.length > 0) {
      listEl.innerHTML = tags.join("");
      rowEl.style.display = "flex";
    } else {
      rowEl.style.display = "none";
    }
  },

  /**
   * Open Complaint Detail Bottom Sheet
   */
  async openDetail(complaintId) {
    let complaint = this.state.complaints.find(c => c.id === complaintId);

    // If detail requires full fetch
    if (!complaint) {
      try {
        const fetchDetailFn = (typeof getResidentComplaintDetail === "function") 
          ? getResidentComplaintDetail 
          : (window.GrihamAPI && window.GrihamAPI.getResidentComplaintDetail);
        if (fetchDetailFn) {
          const res = await fetchDetailFn(complaintId);
          complaint = res.complaint;
        }
      } catch (e) {
        console.error("Detail fetch error", e);
      }
    }

    if (!complaint) {
      if (typeof GrihamToast !== "undefined") GrihamToast.show("Complaint not found", "error");
      return;
    }

    this.state.selectedComplaint = complaint;

    // Set Header Badge
    const idBadge = document.getElementById("res-comp-detail-id-badge");
    if (idBadge) idBadge.textContent = complaint.id;

    // Render Body
    this.renderDetailBody(complaint);

    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-res-complaint-detail", "sheet-res-complaint-detail-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-complaint-detail");
      const backdrop = document.getElementById("sheet-res-complaint-detail-backdrop");
      if (sheet) sheet.classList.add("open", "active");
      if (backdrop) backdrop.classList.add("open", "active");
    }
  },

  /**
   * Close Detail Bottom Sheet
   */
  closeDetail() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-res-complaint-detail", "sheet-res-complaint-detail-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-complaint-detail");
      const backdrop = document.getElementById("sheet-res-complaint-detail-backdrop");
      if (sheet) sheet.classList.remove("open", "active");
      if (backdrop) backdrop.classList.remove("open", "active");
    }
  },

  /**
   * Render Detail Content Body
   */
  renderDetailBody(c) {
    const container = document.getElementById("res-complaint-detail-body");
    if (!container) return;

    const status = (c.status || "pending").toLowerCase();
    const isUrgent = (c.priority || "").toLowerCase() === "urgent";

    // Stepper logic
    // Steps: 1. Submitted -> 2. In Review (Pending) -> 3. In Progress (Working) -> 4. Solved
    let step = 1;
    if (status === "pending") step = 2;
    else if (status === "working" || status === "in progress" || status === "in_progress") step = 3;
    else if (status === "solved" || status === "resolved") step = 4;
    else if (status === "cancelled") step = -1; // Cancelled

    let stepperHtml = "";
    if (step === -1) {
      stepperHtml = `
        <div class="res-cancelled-banner">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <div>
            <strong style="color:#ef4444; font-size:0.86rem; display:block;">Complaint Cancelled</strong>
            <p style="color:var(--text-secondary); font-size:0.75rem; margin:0.2rem 0 0;">This complaint was cancelled and is no longer being actively serviced.</p>
          </div>
        </div>
      `;
    } else {
      const steps = [
        { num: 1, label: "Submitted" },
        { num: 2, label: "In Review" },
        { num: 3, label: "In Progress" },
        { num: 4, label: "Solved" }
      ];

      const stepsMarkup = steps.map(s => {
        let cls = "stepper-step";
        if (s.num < step) cls += " completed";
        else if (s.num === step) cls += " active";

        const iconHtml = s.num < step
          ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`
          : `<span>${s.num}</span>`;

        return `
          <div class="${cls}">
            <div class="stepper-node" aria-hidden="true">${iconHtml}</div>
            <span class="stepper-label">${s.label}</span>
          </div>
        `;
      }).join(`
        <div class="stepper-line ${step > 1 ? 'completed' : ''}" aria-hidden="true"></div>
      `);

      stepperHtml = `
        <div class="complaint-stepper res-stepper" aria-label="Complaint Progress Stepper">
          ${stepsMarkup}
        </div>
      `;
    }

    // Status Badge
    const statusBadge = (typeof GrihamStatusBadge !== "undefined")
      ? GrihamStatusBadge.render({ status: c.status, variant: "pill" })
      : `<span class="complaint-status-pill ${c.status}">${c.status}</span>`;

    // Photos markup
    let photosHtml = "";
    if (c.attachments && c.attachments.images && c.attachments.images.length > 0) {
      const photos = c.attachments.images.map(img => `
        <div class="res-detail-photo-card" onclick="GrihamResidentComplaintsUI.openPhotoViewer('${img.url}')" role="button" tabindex="0" aria-label="View photo: ${img.name}">
          <img src="${img.url}" alt="${img.name}" class="res-detail-photo-img">
          <div class="res-detail-photo-overlay">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            <span>Tap to enlarge</span>
          </div>
        </div>
      `).join("");

      photosHtml = `
        <div class="detail-card-section">
          <h4 class="detail-section-title">Photo Attachments (${c.attachments.images.length})</h4>
          <div class="res-detail-photos-grid">
            ${photos}
          </div>
        </div>
      `;
    }

    // Assigned worker markup
    let workerHtml = "";
    if (c.assigned_to) {
      const w = c.assigned_to;
      const initials = (w.name || "ST").split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
      workerHtml = `
        <div class="detail-card-section res-assigned-worker-card">
          <div class="res-worker-card-header">
            <div class="res-avatar-box res-worker-avatar" aria-hidden="true">
              <span>${initials}</span>
            </div>
            <div style="flex:1; min-width:0;">
              <span class="res-worker-label">Assigned Service Staff</span>
              <strong class="res-worker-name">${w.name}</strong>
              <span class="res-worker-role">${w.role || 'Society Technician'}</span>
            </div>
            ${w.phone ? `
              <a href="tel:${w.phone}" class="btn-call-worker" aria-label="Call ${w.name}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Call</span>
              </a>
            ` : ''}
          </div>
        </div>
      `;
    }

    // Timeline markup
    let timelineHtml = "";
    if (c.timeline && c.timeline.length > 0) {
      const items = c.timeline.map((item, idx) => `
        <div class="timeline-item">
          <div class="timeline-dot ${idx === c.timeline.length - 1 ? 'latest' : ''}" aria-hidden="true"></div>
          <div class="timeline-content">
            <span class="timeline-time">${item.time || ''}</span>
            <strong class="timeline-title">${item.title || ''}</strong>
            ${item.note ? `<p class="timeline-note">${item.note}</p>` : ''}
          </div>
        </div>
      `).join("");

      timelineHtml = `
        <div class="detail-card-section">
          <h4 class="detail-section-title">Status & Activity Timeline</h4>
          <div class="detail-timeline-list">
            ${items}
          </div>
        </div>
      `;
    }

    // Cancellation Action (only if pending or working)
    let cancelActionHtml = "";
    if (status === "pending" || status === "working" || status === "in progress" || status === "in_progress") {
      cancelActionHtml = `
        <div style="margin-top:1.2rem; padding:0.5rem 0;">
          <button type="button" class="btn-cancel-complaint-action" onclick="GrihamResidentComplaintsUI.openCancelSheet()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <span>Cancel This Complaint</span>
          </button>
        </div>
      `;
    }

    container.innerHTML = `
      ${stepperHtml}

      <!-- Header Pills -->
      <div class="detail-meta-pill-row" style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.75rem;">
        <div style="display:flex; align-items:center; gap:0.4rem;">
          ${statusBadge}
          <span class="complaint-cat-badge">${c.category || 'General'}</span>
          ${isUrgent ? `<span class="badge-urgent-pill">Urgent</span>` : ''}
        </div>
        <span style="font-size:0.72rem; color:var(--text-muted);">${c.created_at || 'Recently'}</span>
      </div>

      <!-- Complaint Title & Unit -->
      <div style="margin-bottom:1rem;">
        <h2 style="font-family:var(--font-family-display); font-size:1.15rem; font-weight:800; color:var(--text-primary); margin:0 0 0.35rem; line-height:1.3;">${c.title}</h2>
        <div style="display:flex; align-items:center; gap:0.4rem; font-size:0.75rem; color:var(--text-muted);">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M14 8h4"/><path d="M14 12h4"/><path d="M14 16h4"/></svg>
          <span>Wing ${c.wing || 'A'}, Flat ${c.flat || '204'}</span>
        </div>
      </div>

      <!-- Description Card -->
      <div class="detail-card-section">
        <h4 class="detail-section-title">Issue Description</h4>
        <div class="res-detail-desc-box">
          <p style="margin:0; font-size:0.84rem; line-height:1.55; color:var(--text-secondary); white-space:pre-wrap;">${c.description || 'No additional details provided.'}</p>
        </div>
      </div>

      ${photosHtml}

      ${workerHtml}

      ${timelineHtml}

      ${cancelActionHtml}
    `;
  },

  /**
   * Open Raise Complaint Bottom Sheet
   */
  openRaiseSheet() {
    this.resetRaiseForm();
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-res-raise-complaint", "sheet-res-raise-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-raise-complaint");
      const backdrop = document.getElementById("sheet-res-raise-backdrop");
      if (sheet) sheet.classList.add("open", "active");
      if (backdrop) backdrop.classList.add("open", "active");
    }
  },

  /**
   * Close Raise Complaint Bottom Sheet
   */
  closeRaiseSheet() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-res-raise-complaint", "sheet-res-raise-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-raise-complaint");
      const backdrop = document.getElementById("sheet-res-raise-backdrop");
      if (sheet) sheet.classList.remove("open", "active");
      if (backdrop) backdrop.classList.remove("open", "active");
    }
    this.resetRaiseForm();
  },

  /**
   * Reset Raise Complaint Form Fields
   */
  resetRaiseForm() {
    const form = document.getElementById("form-res-raise-complaint");
    if (form) form.reset();

    const titleErr = document.getElementById("res-raise-title-error");
    const descErr = document.getElementById("res-raise-desc-error");
    const catErr = document.getElementById("res-raise-category-error");
    if (titleErr) titleErr.style.display = "none";
    if (descErr) descErr.style.display = "none";
    if (catErr) catErr.style.display = "none";

    this.removePhoto();
  },

  /**
   * Handle Photo Upload from local file input
   */
  handlePhotoFileChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      if (typeof GrihamToast !== "undefined") GrihamToast.show("Image size must be under 5MB", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.setPhotoState({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        url: e.target.result
      });
    };
    reader.readAsDataURL(file);
  },

  /**
   * Select a demo preset photo for instant demonstration
   */
  selectPhotoPreset(type) {
    if (type === "leak") {
      this.setPhotoState({
        name: "kitchen_tap_leak.jpg",
        size: "1.4 MB",
        url: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='100%25' height='100%25' fill='%231e293b'/%3E%3Cpath d='M200 60 C200 60 140 160 140 210 A60 60 0 0 0 260 210 C260 160 200 60 200 60 Z' fill='%2338bdf8'/%3E%3Ctext x='200' y='270' font-family='sans-serif' font-size='18' fill='%2394a3b8' text-anchor='middle'%3EWater Tap Leak%3C/text%3E%3C/svg%3E"
      });
    } else if (type === "bulb") {
      this.setPhotoState({
        name: "hallway_fused_bulb.jpg",
        size: "950 KB",
        url: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3Ccircle cx='200' cy='130' r='50' fill='%23e2e8f0' opacity='0.7'/%3E%3Crect x='185' y='180' width='30' height='35' fill='%2364748b' rx='4'/%3E%3Ctext x='200' y='260' font-family='sans-serif' font-size='18' fill='%2394a3b8' text-anchor='middle'%3EFused Corridor Bulb%3C/text%3E%3C/svg%3E"
      });
    } else if (type === "latch") {
      this.setPhotoState({
        name: "balcony_broken_latch.jpg",
        size: "1.1 MB",
        url: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='100%25' height='100%25' fill='%231e293b'/%3E%3Crect x='130' y='110' width='140' height='80' rx='8' fill='%23475569'/%3E%3Ccircle cx='180' cy='150' r='14' fill='%23f59e0b'/%3E%3Ctext x='200' y='250' font-family='sans-serif' font-size='18' fill='%2394a3b8' text-anchor='middle'%3EBroken Balcony Lock%3C/text%3E%3C/svg%3E"
      });
    }
  },

  /**
   * Set photo preview state
   */
  setPhotoState(photo) {
    this.state.attachedPhoto = photo;
    const dropzone = document.getElementById("res-raise-photo-dropzone");
    const previewCard = document.getElementById("res-raise-photo-preview");
    const previewImg = document.getElementById("res-raise-preview-img");
    const previewName = document.getElementById("res-raise-preview-name");
    const previewSize = document.getElementById("res-raise-preview-size");

    if (dropzone) dropzone.style.display = "none";
    if (previewCard) previewCard.style.display = "flex";
    if (previewImg) previewImg.src = photo.url;
    if (previewName) previewName.textContent = photo.name;
    if (previewSize) previewSize.textContent = photo.size;
  },

  /**
   * Remove attached photo
   */
  removePhoto() {
    this.state.attachedPhoto = null;
    const dropzone = document.getElementById("res-raise-photo-dropzone");
    const previewCard = document.getElementById("res-raise-photo-preview");
    const previewImg = document.getElementById("res-raise-preview-img");
    const fileInput = document.getElementById("res-raise-photo-input");

    if (dropzone) dropzone.style.display = "flex";
    if (previewCard) previewCard.style.display = "none";
    if (previewImg) previewImg.src = "";
    if (fileInput) fileInput.value = "";
  },

  /**
   * Form validation and confirmation
   */
  submitComplaintForm(event) {
    if (event) event.preventDefault();

    const catEl = document.getElementById("res-raise-category");
    const titleEl = document.getElementById("res-raise-title");
    const descEl = document.getElementById("res-raise-desc");
    const urgentEl = document.getElementById("res-raise-is-urgent");

    const catVal = catEl ? catEl.value.trim() : "";
    const titleVal = titleEl ? titleEl.value.trim() : "";
    const descVal = descEl ? descEl.value.trim() : "";
    const isUrgent = urgentEl ? urgentEl.checked : false;

    let hasError = false;

    const catErr = document.getElementById("res-raise-category-error");
    const titleErr = document.getElementById("res-raise-title-error");
    const descErr = document.getElementById("res-raise-desc-error");

    if (!catVal) {
      if (catErr) catErr.style.display = "block";
      hasError = true;
    } else {
      if (catErr) catErr.style.display = "none";
    }

    if (!titleVal || titleVal.length < 5) {
      if (titleErr) titleErr.style.display = "block";
      hasError = true;
    } else {
      if (titleErr) titleErr.style.display = "none";
    }

    if (!descVal || descVal.length < 10) {
      if (descErr) descErr.style.display = "block";
      hasError = true;
    } else {
      if (descErr) descErr.style.display = "none";
    }

    if (hasError) return;

    // Use GrihamConfirmation dialog
    if (typeof GrihamConfirmation !== "undefined") {
      GrihamConfirmation.open({
        title: "Submit Complaint?",
        message: `Are you sure you want to register this ${catVal} complaint? Society administration and facilities team will be alerted immediately.`,
        confirmText: "Yes, Submit",
        cancelText: "Review",
        isDanger: false,
        onConfirm: () => {
          this.executeSubmitComplaint({
            category: catVal,
            title: titleVal,
            description: descVal,
            is_urgent: isUrgent
          });
        }
      });
    } else {
      this.executeSubmitComplaint({
        category: catVal,
        title: titleVal,
        description: descVal,
        is_urgent: isUrgent
      });
    }
  },

  /**
   * Execute complaint creation via API
   */
  async executeSubmitComplaint(formData) {
    if (this.state.isSubmitting) return;
    this.state.isSubmitting = true;

    const btn = document.getElementById("btn-submit-complaint");
    const btnText = document.getElementById("btn-submit-complaint-text");
    if (btn) btn.disabled = true;
    if (btnText) btnText.innerHTML = `Submitting...`;

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        is_urgent: formData.is_urgent,
        photo_url: this.state.attachedPhoto ? this.state.attachedPhoto.url : null,
        photo_name: this.state.attachedPhoto ? this.state.attachedPhoto.name : null,
        photo_size: this.state.attachedPhoto ? this.state.attachedPhoto.size : null
      };

      const createFn = (typeof createResidentComplaint === "function")
        ? createResidentComplaint
        : (window.GrihamAPI && window.GrihamAPI.createResidentComplaint);

      if (!createFn) {
        throw new Error("createResidentComplaint API not found");
      }

      const res = await createFn(payload);
      const newComplaint = res.complaint;

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(`Complaint ${newComplaint.id} submitted successfully!`, "success");
      }

      // Close raise sheet
      this.closeRaiseSheet();

      // Refresh list
      await this.loadData(true);

      // Automatically open detail for user feedback
      setTimeout(() => {
        this.openDetail(newComplaint.id);
      }, 350);

    } catch (err) {
      console.error("[Complaint Submission Error]", err);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Failed to submit complaint. Please try again.", "error");
      } else {
        alert("Failed to submit complaint.");
      }
    } finally {
      this.state.isSubmitting = false;
      if (btn) btn.disabled = false;
      if (btnText) btnText.innerHTML = `Submit Complaint`;
    }
  },

  /**
   * Open Cancel Complaint Bottom Sheet
   */
  openCancelSheet() {
    if (!this.state.selectedComplaint) return;
    const reasonInput = document.getElementById("res-cancel-reason");
    if (reasonInput) reasonInput.value = "";

    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-res-cancel", "sheet-res-cancel-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-cancel");
      const backdrop = document.getElementById("sheet-res-cancel-backdrop");
      if (sheet) sheet.classList.add("open", "active");
      if (backdrop) backdrop.classList.add("open", "active");
    }
  },

  /**
   * Close Cancel Complaint Bottom Sheet
   */
  closeCancelSheet() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-res-cancel", "sheet-res-cancel-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-cancel");
      const backdrop = document.getElementById("sheet-res-cancel-backdrop");
      if (sheet) sheet.classList.remove("open", "active");
      if (backdrop) backdrop.classList.remove("open", "active");
    }
  },

  /**
   * Execute Complaint Cancellation via API
   */
  async executeCancelComplaint() {
    if (!this.state.selectedComplaint) return;
    const complaintId = this.state.selectedComplaint.id;
    const reasonInput = document.getElementById("res-cancel-reason");
    const reason = reasonInput ? reasonInput.value.trim() : "";

    const btn = document.getElementById("btn-confirm-res-cancel");
    if (btn) btn.disabled = true;

    try {
      const cancelFn = (typeof cancelResidentComplaint === "function")
        ? cancelResidentComplaint
        : (window.GrihamAPI && window.GrihamAPI.cancelResidentComplaint);

      if (!cancelFn) {
        throw new Error("cancelResidentComplaint API not found");
      }

      await cancelFn(complaintId, reason);

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(`Complaint ${complaintId} has been cancelled.`, "info");
      }

      this.closeCancelSheet();

      // Refresh list and reload detail view
      await this.loadData(true);
      this.openDetail(complaintId);

    } catch (err) {
      console.error("[Complaint Cancellation Error]", err);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Unable to cancel complaint. Please try again.", "error");
      }
    } finally {
      if (btn) btn.disabled = false;
    }
  },

  /**
   * Open Photo Lightbox Viewer
   */
  openPhotoViewer(imgUrl) {
    const lightbox = document.getElementById("res-photo-lightbox");
    const backdrop = document.getElementById("res-photo-lightbox-backdrop");
    const img = document.getElementById("res-lightbox-img");

    if (img) img.src = imgUrl;
    if (lightbox) lightbox.style.display = "flex";
    if (backdrop) {
      backdrop.classList.add("open", "active");
      backdrop.style.display = "block";
    }
  },

  /**
   * Close Photo Lightbox Viewer
   */
  closePhotoViewer() {
    const lightbox = document.getElementById("res-photo-lightbox");
    const backdrop = document.getElementById("res-photo-lightbox-backdrop");
    const img = document.getElementById("res-lightbox-img");

    if (lightbox) lightbox.style.display = "none";
    if (backdrop) {
      backdrop.classList.remove("open", "active");
      backdrop.style.display = "none";
    }
    if (img) img.src = "";
  }
};
