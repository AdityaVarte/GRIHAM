/**
 * GRIHAM FRONTEND - RESIDENT SERVICE REQUESTS CONTROLLER & TEMPLATE
 * Page: Resident Service Requests (#/resident/services)
 * Mobile-first Residential Society Management App
 */

window.HTML_RESIDENT_SERVICES = `
<!-- ================================================================= -->
<!-- RESIDENT SERVICES BOTTOM SHEETS & MODALS                          -->
<!-- ================================================================= -->

<!-- 1. SERVICE REQUEST DETAIL BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-service-detail-backdrop" onclick="GrihamResidentServicesUI.closeDetail()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-service-detail" role="dialog" aria-modal="true" aria-labelledby="res-service-detail-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentServicesUI.closeDetail()" aria-label="Close service details" title="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <div class="sheet-title-group">
      <h3 class="sheet-title" id="res-service-detail-title">Service Details</h3>
      <span class="sheet-id-badge" id="res-service-detail-id-badge">SR-2026-0019</span>
    </div>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <!-- Scrollable Detail Container -->
  <div id="res-service-detail-body" class="complaint-detail-body" style="padding-bottom:calc(2rem + var(--safe-bottom, 20px));">
    <!-- Populated dynamically by GrihamResidentServicesUI.renderDetailBody -->
  </div>
</div>

<!-- 2. BOOK SERVICE / CREATE REQUEST BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-book-service-backdrop" onclick="GrihamResidentServicesUI.closeBookSheet()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-book-service" role="dialog" aria-modal="true" aria-labelledby="res-book-sheet-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentServicesUI.closeBookSheet()" aria-label="Close booking sheet" title="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="res-book-sheet-title">Book a Society Service</h3>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <form id="form-res-book-service" onsubmit="GrihamResidentServicesUI.submitServiceForm(event)" style="display:flex; flex-direction:column; gap:0.9rem; padding:0.25rem 0.25rem calc(2rem + var(--safe-bottom, 20px));">
    
    <!-- Category Select -->
    <div class="form-group">
      <label class="form-label" for="res-book-category">Service Category <span style="color:#ef4444; font-weight:700;">*</span></label>
      <div class="input-wrapper">
        <select id="res-book-category" class="form-select" onchange="GrihamResidentServicesUI.handleCategoryChange(this.value)" required aria-required="true">
          <option value="" disabled selected>Select category...</option>
          <option value="Plumbing">Plumbing &amp; Sanitary</option>
          <option value="Electrical">Electrical Repairs</option>
          <option value="Appliance Repair">AC &amp; Appliance Service</option>
          <option value="Cleaning">Home &amp; Deep Cleaning</option>
          <option value="Carpentry">Carpentry &amp; Furniture</option>
          <option value="Pest Control">Pest Control Services</option>
          <option value="Other">Other / General Society Service</option>
        </select>
      </div>
      <p class="form-error-msg" id="res-book-category-error" style="display:none;">Please select a service category.</p>
    </div>

    <!-- Quick Service Selection Pills -->
    <div class="form-group" id="res-quick-services-group" style="display:none;">
      <label class="form-label" style="font-size:0.75rem; color:var(--text-muted);">Common requests (tap to autofill):</label>
      <div class="res-quick-pills-row" id="res-quick-pills-container">
        <!-- Dynamically populated by JS -->
      </div>
    </div>

    <!-- Urgent Toggle Card -->
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
          <strong style="font-size:0.86rem; color:var(--text-primary); display:block;">Urgent Priority</strong>
          <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Emergency pipe burst or power shutdown</span>
        </div>
      </div>
      <label class="res-switch-label" for="res-book-is-urgent" aria-label="Mark as Urgent">
        <input type="checkbox" id="res-book-is-urgent" class="res-switch-checkbox">
        <span class="res-switch-slider"></span>
      </label>
    </div>

    <!-- Title Input -->
    <div class="form-group">
      <label class="form-label" for="res-book-title">Service Description / Title <span style="color:#ef4444; font-weight:700;">*</span></label>
      <div class="input-wrapper">
        <input 
          type="text" 
          id="res-book-title" 
          class="form-input" 
          placeholder="e.g. Master bedroom split AC deep coil cleaning" 
          minlength="5" 
          maxlength="80" 
          required 
          aria-required="true"
        >
      </div>
      <p class="form-error-msg" id="res-book-title-error" style="display:none;">Title must be at least 5 characters long.</p>
    </div>

    <!-- Details Textarea -->
    <div class="form-group">
      <label class="form-label" for="res-book-desc">Detailed Instructions <span style="color:#ef4444; font-weight:700;">*</span></label>
      <div class="input-wrapper">
        <textarea 
          id="res-book-desc" 
          class="form-textarea" 
          rows="3" 
          placeholder="Specify exact issue, appliance model/brand, room location, or specific requirements..." 
          minlength="10" 
          maxlength="500" 
          required 
          aria-required="true"
        ></textarea>
      </div>
      <p class="form-error-msg" id="res-book-desc-error" style="display:none;">Description must be at least 10 characters long.</p>
    </div>

    <!-- Preferred Schedule Row -->
    <div class="form-row-2col" style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem;">
      <div class="form-group">
        <label class="form-label" for="res-book-date">Preferred Date <span style="color:#ef4444; font-weight:700;">*</span></label>
        <div class="input-wrapper">
          <input 
            type="date" 
            id="res-book-date" 
            class="form-input" 
            required 
            aria-required="true"
          >
        </div>
        <p class="form-error-msg" id="res-book-date-error" style="display:none;">Please select a date.</p>
      </div>

      <div class="form-group">
        <label class="form-label" for="res-book-slot">Preferred Slot <span style="color:#ef4444; font-weight:700;">*</span></label>
        <div class="input-wrapper">
          <select id="res-book-slot" class="form-select" required aria-required="true">
            <option value="10:00-12:00">Morning (10 AM – 12 PM)</option>
            <option value="12:00-14:00">Afternoon (12 PM – 02 PM)</option>
            <option value="14:00-16:00">Afternoon (02 PM – 04 PM)</option>
            <option value="16:00-18:00">Evening (04 PM – 06 PM)</option>
            <option value="18:00-20:00">Evening (06 PM – 08 PM)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Estimated Rate Hint -->
    <div class="res-rate-hint-box" id="res-book-rate-hint" style="display:none;">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      <span>Estimated Society Rate: <strong id="res-book-rate-text">From ₹250</strong> (Final billing by authorized technician)</span>
    </div>

    <!-- Submit Action Row -->
    <div style="margin-top:0.5rem; display:flex; flex-direction:column; gap:0.5rem;">
      <button type="submit" class="btn-primary-action btn-resident-style" id="btn-submit-service-req" style="min-height:46px;">
        <span id="btn-submit-service-text">Confirm Service Booking</span>
      </button>
      <button type="button" class="btn-logout-cancel" onclick="GrihamResidentServicesUI.closeBookSheet()">Cancel</button>
    </div>
  </form>
</div>

<!-- 3. CANCEL SERVICE REQUEST BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-service-cancel-backdrop" onclick="GrihamResidentServicesUI.closeCancelSheet()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-service-cancel" role="dialog" aria-modal="true" aria-labelledby="res-service-cancel-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom, 20px));">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentServicesUI.closeCancelSheet()" aria-label="Go back" title="Go back">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="res-service-cancel-title">Cancel Service Request</h3>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <div style="display:flex; flex-direction:column; gap:0.9rem; padding:0.25rem 0.25rem;">
    <div style="background:rgba(239, 68, 68, 0.1); border:1px solid rgba(239, 68, 68, 0.25); border-radius:12px; padding:0.85rem; display:flex; gap:0.65rem; align-items:flex-start;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2" style="flex-shrink:0; margin-top:2px;">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>
        <strong style="color:#ef4444; font-size:0.85rem; display:block;">Cancel this service booking?</strong>
        <p style="color:var(--text-secondary); font-size:0.75rem; margin:0.2rem 0 0;">The technician or vendor dispatch will be cancelled. Please let us know the reason.</p>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="res-service-cancel-reason">Reason for cancellation <span style="font-size:0.72rem; color:var(--text-muted); font-weight:400;">(Optional)</span></label>
      <div class="input-wrapper">
        <textarea 
          id="res-service-cancel-reason" 
          class="form-textarea" 
          rows="2" 
          placeholder="e.g. Schedule conflict, fixed independently, duplicate booking..."
        ></textarea>
      </div>
    </div>

    <div class="logout-btn-row" style="margin-top:0.25rem;">
      <button type="button" class="btn-logout-cancel" onclick="GrihamResidentServicesUI.closeCancelSheet()">Keep Request</button>
      <button type="button" class="btn-primary-action btn-danger-action" id="btn-confirm-res-service-cancel" onclick="GrihamResidentServicesUI.executeCancelService()" style="margin-top:0; min-height:44px;">
        <span>Confirm Cancellation</span>
      </button>
    </div>
  </div>
</div>

<!-- ================================================================= -->
<!-- MAIN SCREEN VIEW (#screen-resident-services)                      -->
<!-- ================================================================= -->
<section id="screen-resident-services" class="app-view resident-services-view" aria-labelledby="res-services-header-title">

  <!-- 1. STICKY TOP APP BAR -->
  <div class="screen-top-bar res-services-top-bar">
    ${GrihamHeader.renderBackButton({
      target: '/resident/home',
      id: 'btn-res-services-back',
      ariaLabel: 'Back to Resident Home',
      label: 'Home'
    })}

    <h1 class="top-bar-screen-title" id="res-services-header-title">Services</h1>

    <!-- Top Right Action Pill: + Book -->
    <button type="button" class="btn-res-raise-action" id="btn-res-book-top" onclick="GrihamResidentServicesUI.handleBookClick()" aria-label="Book new service">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      <span>Book</span>
    </button>
  </div>

  <!-- 2. SUMMARY OVERVIEW CARDS (Compact Grid) -->
  <div class="res-comp-overview-section">
    <div class="overview-title-row">
      <span class="overview-section-title">My Service Bookings</span>
      <span class="overview-total-badge" id="stat-res-services-total-badge">0 Total</span>
    </div>

    <div class="complaints-summary-grid res-comp-summary-grid">
      <!-- Total Card -->
      <button type="button" class="complaint-sum-card card-open" onclick="GrihamResidentServicesUI.setFilter('status', 'all')" aria-label="View All Service Requests">
        <div class="sum-card-top">
          <span class="sum-card-label">Total</span>
          <span class="sum-card-dot" style="background:#60a5fa;" aria-hidden="true"></span>
        </div>
        <strong class="sum-card-val" id="stat-res-serv-total">0</strong>
      </button>

      <!-- Active / In Progress Card -->
      <button type="button" class="complaint-sum-card card-pending" onclick="GrihamResidentServicesUI.setFilter('status', 'active')" aria-label="Filter Active Requests">
        <div class="sum-card-top">
          <span class="sum-card-label">Active</span>
          <span class="sum-card-dot dot-pending" aria-hidden="true"></span>
        </div>
        <strong class="sum-card-val" id="stat-res-serv-active">0</strong>
      </button>

      <!-- Completed Card -->
      <button type="button" class="complaint-sum-card card-solved" onclick="GrihamResidentServicesUI.setFilter('status', 'completed')" aria-label="Filter Completed Requests">
        <div class="sum-card-top">
          <span class="sum-card-label">Done</span>
          <span class="sum-card-dot dot-solved" aria-hidden="true"></span>
        </div>
        <strong class="sum-card-val" id="stat-res-serv-completed">0</strong>
      </button>
    </div>
  </div>

  <!-- 3. SERVICE CATALOG / QUICK EXPLORATION -->
  <div class="res-catalog-section">
    <div class="res-catalog-header-row">
      <span class="res-catalog-title">Explore Society Services</span>
      <span class="res-catalog-subtitle">Verified technicians &amp; fixed rates</span>
    </div>
    <div class="res-catalog-scroll-track" id="res-services-catalog-track">
      <!-- Populated dynamically by GrihamResidentServicesUI.renderCatalog -->
    </div>
  </div>

  <!-- 4. SEARCH & SORT CONTROLS -->
  <div class="complaints-controls-bar">
    <div class="input-wrapper complaints-search-wrapper">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="input-icon-left" aria-hidden="true">
        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input 
        type="text" 
        id="res-services-search-input" 
        class="form-input complaints-search-input" 
        placeholder="Search my service requests..." 
        oninput="GrihamResidentServicesUI.handleSearch(this.value)" 
        aria-label="Search services by title, category, technician, or ID"
      >
      <button type="button" class="btn-search-clear" id="btn-res-services-search-clear" onclick="GrihamResidentServicesUI.clearSearch()" style="display:none;" aria-label="Clear search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <div class="complaints-sort-wrapper">
      <select id="res-services-sort-select" class="form-select complaints-sort-select" onchange="GrihamResidentServicesUI.handleSort(this.value)" aria-label="Sort service requests">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="status">Status</option>
        <option value="category">Category</option>
      </select>
    </div>
  </div>

  <!-- 5. STATUS FILTER CHIPS -->
  <div class="complaints-filter-chips-bar" role="group" aria-label="Filter Services by Status">
    <button type="button" class="btn-filter-chip active" data-res-serv-status="all" onclick="GrihamResidentServicesUI.setFilter('status', 'all')">All</button>
    <button type="button" class="btn-filter-chip" data-res-serv-status="requested" onclick="GrihamResidentServicesUI.setFilter('status', 'requested')">Requested</button>
    <button type="button" class="btn-filter-chip" data-res-serv-status="scheduled" onclick="GrihamResidentServicesUI.setFilter('status', 'scheduled')">Scheduled</button>
    <button type="button" class="btn-filter-chip" data-res-serv-status="in progress" onclick="GrihamResidentServicesUI.setFilter('status', 'in progress')">In Progress</button>
    <button type="button" class="btn-filter-chip" data-res-serv-status="completed" onclick="GrihamResidentServicesUI.setFilter('status', 'completed')">Completed</button>
    <button type="button" class="btn-filter-chip" data-res-serv-status="cancelled" onclick="GrihamResidentServicesUI.setFilter('status', 'cancelled')">Cancelled</button>
  </div>

  <!-- 6. SECONDARY CATEGORY FILTER ROW -->
  <div class="complaints-sub-filters-bar" style="padding: 0 1rem 0.5rem;">
    <div class="sub-filter-item">
      <label for="filter-res-serv-category" class="sub-filter-label">Category:</label>
      <select id="filter-res-serv-category" class="form-select sub-filter-select" onchange="GrihamResidentServicesUI.setFilter('category', this.value)" aria-label="Filter by Category">
        <option value="all">All Categories</option>
        <option value="Plumbing">Plumbing</option>
        <option value="Electrical">Electrical</option>
        <option value="Appliance Repair">Appliance Repair &amp; AC</option>
        <option value="Cleaning">Cleaning</option>
        <option value="Carpentry">Carpentry</option>
        <option value="Pest Control">Pest Control</option>
        <option value="Other">Other</option>
      </select>
    </div>
  </div>

  <!-- 7. ACTIVE FILTER TAGS ROW -->
  <div class="complaints-active-tags-row" id="res-serv-active-tags" style="display:none;">
    <span class="active-tags-label">Active:</span>
    <div id="res-serv-active-tags-list" class="active-tags-list"></div>
    <button type="button" class="btn-clear-all-filters" onclick="GrihamResidentServicesUI.resetAllFilters()">Reset</button>
  </div>

  <!-- 8. SKELETON LOADER -->
  <div id="res-serv-loading" style="display:none; flex-direction:column; gap:0.65rem; padding:0 1rem; margin-top:0.75rem;">
    <div class="dash-skeleton-card" style="height: 110px;"></div>
    <div class="dash-skeleton-card" style="height: 110px;"></div>
    <div class="dash-skeleton-card" style="height: 110px;"></div>
  </div>

  <!-- 9. EMPTY STATE -->
  <div class="maint-empty-card" id="res-serv-empty" style="display:none; margin:1.5rem 1rem;">
    <div class="empty-icon-pill" aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    </div>
    <h3 class="empty-title" id="res-serv-empty-title">No service requests found</h3>
    <p class="empty-desc" id="res-serv-empty-desc">You have not booked any services yet, or none match your filters.</p>
    <button type="button" class="btn-primary-action btn-resident-style" id="btn-empty-book" onclick="GrihamResidentServicesUI.handleBookClick()" style="width:auto; padding:0.5rem 1.4rem; font-size:0.82rem; margin-top:0.5rem;">
      + Book a Service
    </button>
  </div>

  <!-- 10. ERROR STATE -->
  <div class="maint-error-card" id="res-serv-error" style="display:none; margin:1.5rem 1rem;">
    <p style="font-weight:600; color:var(--text-primary); margin-bottom:0.5rem;">Unable to load service requests.</p>
    <button type="button" class="btn-primary-action btn-resident-style" onclick="GrihamResidentServicesUI.loadData(true)" style="min-height:38px; font-size:0.82rem; padding:0.4rem 1.2rem;">
      Try Again
    </button>
  </div>

  <!-- 11. SERVICE REQUESTS LIST FEED -->
  <div class="complaints-list-container res-services-list" id="res-services-list">
    <!-- Populated dynamically by GrihamResidentServicesUI.renderList -->
  </div>

  <!-- 12. BOTTOM NAVIGATION BAR -->
  <nav class="res-bottom-nav" aria-label="Resident Navigation">
    <button type="button" class="res-nav-item" onclick="GrihamRouter.navigate('/resident/home')" aria-label="Home" id="res-serv-nav-home">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span>Home</span>
    </button>
    <button type="button" class="res-nav-item active" onclick="GrihamRouter.navigate('/resident/services')" aria-label="Services" aria-current="page" id="res-serv-nav-services">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      <span>Services</span>
    </button>
    <button type="button" class="res-nav-item" onclick="GrihamRouter.navigate('/resident/complaints')" aria-label="Complaints" id="res-serv-nav-complaints">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      <span>Complaints</span>
    </button>
    <button type="button" class="res-nav-item" onclick="GrihamRouter.navigate('/resident/profile')" aria-label="Profile" id="res-serv-nav-profile">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span>Profile</span>
    </button>
  </nav>

</section>
`;

/**
 * Controller Object for Resident Services
 */
window.GrihamResidentServicesUI = {
  state: {
    requests: [],
    catalog: [],
    summary: { total: 0, active: 0, requested: 0, scheduled: 0, in_progress: 0, completed: 0, cancelled: 0 },
    searchQuery: "",
    filters: {
      status: "all",
      category: "all"
    },
    sortBy: "newest",
    selectedRequest: null,
    isSubmitting: false
  },

  /**
   * Screen Initialization Hook called by GrihamRouter
   */
  async init() {
    // Set minimum date picker to today
    const dateInput = document.getElementById("res-book-date");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    await this.loadData();

    // Check for target service id passed from Home teaser or notifications
    try {
      const targetId = sessionStorage.getItem("griham_target_service_id");
      if (targetId) {
        sessionStorage.removeItem("griham_target_service_id");
        setTimeout(() => {
          this.openDetail(targetId);
        }, 200);
      }
    } catch (_) {}

    if (typeof GrihamI18n !== "undefined" && typeof GrihamI18n.translate === "function") {
      GrihamI18n.translate(GrihamState.language);
    }
  },

  /**
   * Fetch resident service requests from canonical API
   */
  async loadData(forceRefresh = false) {
    const listEl = document.getElementById("res-services-list");
    const loadingEl = document.getElementById("res-serv-loading");
    const errorEl = document.getElementById("res-serv-error");
    const emptyEl = document.getElementById("res-serv-empty");

    if (loadingEl) loadingEl.style.display = "flex";
    if (listEl) listEl.style.display = "none";
    if (errorEl) errorEl.style.display = "none";
    if (emptyEl) emptyEl.style.display = "none";

    try {
      const fetchFn = (typeof getResidentServiceRequests === "function") 
        ? getResidentServiceRequests 
        : (window.GrihamAPI && window.GrihamAPI.getResidentServiceRequests);

      if (!fetchFn) {
        throw new Error("getResidentServiceRequests API not found");
      }

      const res = await fetchFn();
      this.state.requests = res.requests || [];
      this.state.catalog = res.catalog || (window.MOCK_SERVICE_CATALOG || []);

      this.computeSummary();
      this.renderSummary();
      this.renderCatalog();
      this.renderList();
    } catch (err) {
      console.error("[Resident Services Load Error]", err);
      if (errorEl) errorEl.style.display = "block";
    } finally {
      if (loadingEl) loadingEl.style.display = "none";
      if (listEl) listEl.style.display = "flex";
    }
  },

  /**
   * Calculate summary metrics from requests list
   */
  computeSummary() {
    const list = this.state.requests;
    const total = list.length;
    let requested = 0;
    let scheduled = 0;
    let inProgress = 0;
    let completed = 0;
    let cancelled = 0;

    list.forEach(r => {
      const s = (r.status || "").toLowerCase();
      if (s === "requested") requested++;
      else if (s === "scheduled" || s === "assigned") scheduled++;
      else if (s === "in progress" || s === "in_progress") inProgress++;
      else if (s === "completed") completed++;
      else if (s === "cancelled") cancelled++;
    });

    this.state.summary = {
      total,
      active: requested + scheduled + inProgress,
      requested,
      scheduled,
      in_progress: inProgress,
      completed,
      cancelled
    };
  },

  /**
   * Render summary counters
   */
  renderSummary() {
    const s = this.state.summary;
    const badgeTotal = document.getElementById("stat-res-services-total-badge");
    const totalVal = document.getElementById("stat-res-serv-total");
    const activeVal = document.getElementById("stat-res-serv-active");
    const completedVal = document.getElementById("stat-res-serv-completed");

    if (badgeTotal) badgeTotal.textContent = `${s.total} Total`;
    if (totalVal) totalVal.textContent = s.total;
    if (activeVal) activeVal.textContent = s.active;
    if (completedVal) completedVal.textContent = s.completed;
  },

  /**
   * Render catalog horizontal cards
   */
  renderCatalog() {
    const track = document.getElementById("res-services-catalog-track");
    if (!track) return;

    const catalog = this.state.catalog || [];
    if (catalog.length === 0) {
      track.innerHTML = "";
      return;
    }

    const html = catalog.map(cat => `
      <div class="res-catalog-card" onclick="GrihamResidentServicesUI.openBookWithCategory('${cat.category}')" role="button" tabindex="0" aria-label="Book ${cat.name}">
        <div class="res-catalog-card-icon" aria-hidden="true">
          ${cat.icon}
        </div>
        <div class="res-catalog-card-info">
          <strong class="res-catalog-card-name">${cat.name}</strong>
          <span class="res-catalog-card-desc">${cat.desc}</span>
        </div>
        <div class="res-catalog-card-footer">
          <span class="res-catalog-card-rate">${cat.estimatedRate}</span>
          <span class="res-catalog-book-action">Book →</span>
        </div>
      </div>
    `).join("");

    track.innerHTML = html;
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
   * Handle user clicking + Book Service
   */
  handleBookClick() {
    const approval = this.checkResidentApproval();
    if (approval.status === "pending") {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Service requests are disabled while your registration is pending approval.", "warning");
      } else {
        alert("Service requests are disabled while your registration is pending approval.");
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

    this.openBookSheet();
  },

  /**
   * Open booking sheet pre-filled with a specific category
   */
  openBookWithCategory(categoryName) {
    const approval = this.checkResidentApproval();
    if (approval.status === "pending") {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Service requests are disabled while your registration is pending approval.", "warning");
      }
      return;
    }

    this.openBookSheet();
    const catSelect = document.getElementById("res-book-category");
    if (catSelect) {
      catSelect.value = categoryName;
      this.handleCategoryChange(categoryName);
    }
  },

  /**
   * Category change handler in booking form to populate popular presets
   */
  handleCategoryChange(categoryName) {
    const groupEl = document.getElementById("res-quick-services-group");
    const pillsContainer = document.getElementById("res-quick-pills-container");
    const rateHint = document.getElementById("res-book-rate-hint");
    const rateText = document.getElementById("res-book-rate-text");

    const catData = (this.state.catalog || []).find(c => c.category === categoryName);

    if (catData && catData.popularItems && catData.popularItems.length > 0) {
      const pillsHtml = catData.popularItems.map(item => `
        <button type="button" class="btn-preset-pill" onclick="GrihamResidentServicesUI.prefillTitle('${item.replace(/'/g, "\\'")}')">
          ${item}
        </button>
      `).join("");

      if (pillsContainer) pillsContainer.innerHTML = pillsHtml;
      if (groupEl) groupEl.style.display = "block";
    } else {
      if (groupEl) groupEl.style.display = "none";
    }

    if (catData && catData.estimatedRate) {
      if (rateText) rateText.textContent = catData.estimatedRate;
      if (rateHint) rateHint.style.display = "flex";
    } else {
      if (rateHint) rateHint.style.display = "none";
    }
  },

  /**
   * Pre-fill title from popular presets
   */
  prefillTitle(titleText) {
    const titleInput = document.getElementById("res-book-title");
    if (titleInput) {
      titleInput.value = titleText;
      titleInput.focus();
    }
  },

  /**
   * Filter & Sort requests list
   */
  getFilteredRequests() {
    let list = [...this.state.requests];
    const { status, category } = this.state.filters;
    const q = this.state.searchQuery.toLowerCase().trim();

    // 1. Search Query Filter
    if (q) {
      list = list.filter(r => {
        const titleMatch = (r.title || "").toLowerCase().includes(q);
        const idMatch = (r.id || "").toLowerCase().includes(q);
        const catMatch = (r.category || "").toLowerCase().includes(q);
        const descMatch = (r.description || "").toLowerCase().includes(q);
        const providerMatch = (r.assignedProviderName || "").toLowerCase().includes(q);
        return titleMatch || idMatch || catMatch || descMatch || providerMatch;
      });
    }

    // 2. Status Filter
    if (status !== "all") {
      list = list.filter(r => {
        const s = (r.status || "").toLowerCase();
        if (status === "active") {
          return s === "requested" || s === "scheduled" || s === "assigned" || s === "in progress";
        }
        if (status === "scheduled") {
          return s === "scheduled" || s === "assigned";
        }
        return s === status;
      });
    }

    // 3. Category Filter
    if (category !== "all") {
      list = list.filter(r => {
        const cCat = (r.category || "").toLowerCase();
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
    } else if (this.state.sortBy === "category") {
      list.sort((a, b) => (a.category || "").localeCompare(b.category || ""));
    }

    return list;
  },

  /**
   * Render Service Requests List
   */
  renderList() {
    const listEl = document.getElementById("res-services-list");
    const emptyEl = document.getElementById("res-serv-empty");
    const emptyDescEl = document.getElementById("res-serv-empty-desc");
    if (!listEl) return;

    const filtered = this.getFilteredRequests();
    this.renderActiveFilterTags();

    if (filtered.length === 0) {
      listEl.innerHTML = "";
      if (emptyEl) {
        emptyEl.style.display = "flex";
        if (this.state.searchQuery || this.state.filters.status !== "all" || this.state.filters.category !== "all") {
          if (emptyDescEl) emptyDescEl.textContent = "No service requests match your current search or filter criteria.";
        } else {
          if (emptyDescEl) emptyDescEl.textContent = "You have not booked any services yet.";
        }
      }
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";

    const cardsHtml = filtered.map(r => {
      const isUrgent = (r.priority || "").toLowerCase() === "urgent";
      const statusHtml = (typeof GrihamStatusBadge !== "undefined")
        ? GrihamStatusBadge.render({ status: r.status, variant: "pill" })
        : `<span class="complaint-status-pill ${r.status}">${r.status}</span>`;

      // Schedule or Preferred Time snippet
      let scheduleSnippet = "";
      if (r.scheduledDate) {
        scheduleSnippet = `
          <div class="res-card-schedule-badge confirmed">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Scheduled: <strong>${r.scheduledDate}</strong> (${r.scheduledStartTime || ''} – ${r.scheduledEndTime || ''})</span>
          </div>
        `;
      } else if (r.preferredDate) {
        scheduleSnippet = `
          <div class="res-card-schedule-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Preferred: ${r.preferredDate} (${r.preferredStartTime || '10:00'} – ${r.preferredEndTime || '12:00'})</span>
          </div>
        `;
      }

      // Provider snippet
      const providerSnippet = r.assignedProviderName
        ? `<div class="res-card-worker-snippet">
             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
             <span>Assigned: <strong>${r.assignedProviderName}</strong> (${r.assignedProviderType || 'Vendor'})</span>
           </div>`
        : `<div class="res-card-worker-snippet unassigned">
             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
             <span>Technician assignment in progress</span>
           </div>`;

      return `
        <article class="complaint-card res-complaint-card" onclick="GrihamResidentServicesUI.openDetail('${r.id}')" role="button" tabindex="0" aria-label="Service ${r.id}: ${r.title}">
          <div class="complaint-card-top">
            <div class="complaint-badges-group">
              <span class="sheet-id-badge" style="font-size:0.72rem; padding:0.18rem 0.5rem;">${r.id}</span>
              <span class="complaint-cat-badge">${r.category || 'General'}</span>
              ${isUrgent ? `<span class="badge-urgent-pill">Urgent</span>` : ''}
            </div>
            ${statusHtml}
          </div>

          <div style="margin-top:0.4rem;">
            <h3 class="complaint-card-title res-card-title">${r.title}</h3>
            <p class="res-card-desc-snippet">${r.description || ''}</p>
          </div>

          ${scheduleSnippet}
          ${providerSnippet}

          <div class="complaint-card-footer" style="margin-top:0.5rem; padding-top:0.4rem; border-top:1px solid rgba(255,255,255,0.05);">
            <div class="complaint-card-meta">
              <span>${r.quotedCost ? `Quoted: <strong style="color:var(--text-primary);">${r.quotedCost}</strong>` : 'Society Verified'}</span>
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
    const clearBtn = document.getElementById("btn-res-services-search-clear");
    if (clearBtn) clearBtn.style.display = this.state.searchQuery ? "flex" : "none";
    this.renderList();
  },

  /**
   * Clear search query
   */
  clearSearch() {
    const input = document.getElementById("res-services-search-input");
    if (input) input.value = "";
    this.handleSearch("");
  },

  /**
   * Sort handler
   */
  handleSort(sortKey) {
    this.state.sortBy = sortKey;
    this.renderList();
  },

  /**
   * Status or Category filter setter
   */
  setFilter(type, value) {
    if (type === "status") {
      this.state.filters.status = value;
      document.querySelectorAll("[data-res-serv-status]").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-res-serv-status") === value);
      });
    } else if (type === "category") {
      this.state.filters.category = value;
      const catSelect = document.getElementById("filter-res-serv-category");
      if (catSelect) catSelect.value = value;
    }
    this.renderList();
  },

  /**
   * Reset all search and filter controls
   */
  resetAllFilters() {
    this.state.searchQuery = "";
    this.state.filters.status = "all";
    this.state.filters.category = "all";
    this.state.sortBy = "newest";

    const searchInput = document.getElementById("res-services-search-input");
    const clearBtn = document.getElementById("btn-res-services-search-clear");
    const sortSelect = document.getElementById("res-services-sort-select");
    const catSelect = document.getElementById("filter-res-serv-category");

    if (searchInput) searchInput.value = "";
    if (clearBtn) clearBtn.style.display = "none";
    if (sortSelect) sortSelect.value = "newest";
    if (catSelect) catSelect.value = "all";

    document.querySelectorAll("[data-res-serv-status]").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-res-serv-status") === "all");
    });

    this.renderList();
  },

  /**
   * Render active filter tags row
   */
  renderActiveFilterTags() {
    const rowEl = document.getElementById("res-serv-active-tags");
    const listEl = document.getElementById("res-serv-active-tags-list");
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
   * Open Service Request Detail Bottom Sheet
   */
  async openDetail(requestId) {
    let req = this.state.requests.find(r => r.id === requestId);

    if (!req) {
      try {
        const fetchDetailFn = (typeof getResidentServiceRequestDetail === "function") 
          ? getResidentServiceRequestDetail 
          : (window.GrihamAPI && window.GrihamAPI.getResidentServiceRequestDetail);
        if (fetchDetailFn) {
          const res = await fetchDetailFn(requestId);
          req = res.request;
        }
      } catch (e) {
        console.error("Detail fetch error", e);
      }
    }

    if (!req) {
      if (typeof GrihamToast !== "undefined") GrihamToast.show("Service request not found", "error");
      return;
    }

    this.state.selectedRequest = req;

    // Set Header Badge
    const idBadge = document.getElementById("res-service-detail-id-badge");
    if (idBadge) idBadge.textContent = req.id;

    // Render Body
    this.renderDetailBody(req);

    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-res-service-detail", "sheet-res-service-detail-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-service-detail");
      const backdrop = document.getElementById("sheet-res-service-detail-backdrop");
      if (sheet) sheet.classList.add("open", "active");
      if (backdrop) backdrop.classList.add("open", "active");
    }
  },

  /**
   * Close Detail Bottom Sheet
   */
  closeDetail() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-res-service-detail", "sheet-res-service-detail-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-service-detail");
      const backdrop = document.getElementById("sheet-res-service-detail-backdrop");
      if (sheet) sheet.classList.remove("open", "active");
      if (backdrop) backdrop.classList.remove("open", "active");
    }
  },

  /**
   * Render Detail Content Body
   */
  renderDetailBody(r) {
    const container = document.getElementById("res-service-detail-body");
    if (!container) return;

    const status = (r.status || "requested").toLowerCase();
    const isUrgent = (r.priority || "").toLowerCase() === "urgent";

    // Stepper logic
    // Steps: 1. Requested -> 2. Scheduled/Assigned -> 3. In Progress -> 4. Completed
    let step = 1;
    if (status === "requested") step = 1;
    else if (status === "scheduled" || status === "assigned") step = 2;
    else if (status === "in progress" || status === "in_progress") step = 3;
    else if (status === "completed") step = 4;
    else if (status === "cancelled") step = -1; // Cancelled

    let stepperHtml = "";
    if (step === -1) {
      stepperHtml = `
        <div class="res-cancelled-banner">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <div>
            <strong style="color:#ef4444; font-size:0.86rem; display:block;">Service Request Cancelled</strong>
            <p style="color:var(--text-secondary); font-size:0.75rem; margin:0.2rem 0 0;">This service request was cancelled and is no longer scheduled.</p>
          </div>
        </div>
      `;
    } else {
      const steps = [
        { num: 1, label: "Requested" },
        { num: 2, label: "Scheduled" },
        { num: 3, label: "In Progress" },
        { num: 4, label: "Completed" }
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
        <div class="complaint-stepper res-stepper" aria-label="Service Progress Stepper">
          ${stepsMarkup}
        </div>
      `;
    }

    // Status Badge
    const statusBadge = (typeof GrihamStatusBadge !== "undefined")
      ? GrihamStatusBadge.render({ status: r.status, variant: "pill" })
      : `<span class="complaint-status-pill ${r.status}">${r.status}</span>`;

    // Assigned Provider Markup
    let providerHtml = "";
    if (r.assignedProviderName) {
      const initials = (r.assignedProviderName || "SP").split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
      providerHtml = `
        <div class="detail-card-section res-assigned-worker-card">
          <div class="res-worker-card-header">
            <div class="res-avatar-box res-worker-avatar" aria-hidden="true">
              <span>${initials}</span>
            </div>
            <div style="flex:1; min-width:0;">
              <span class="res-worker-label">Assigned Service Provider</span>
              <strong class="res-worker-name">${r.assignedProviderName}</strong>
              <span class="res-worker-role">${r.assignedProviderType || 'Society Partner'}</span>
            </div>
            ${r.assignedProviderPhone ? `
              <a href="tel:${r.assignedProviderPhone}" class="btn-call-worker" aria-label="Call ${r.assignedProviderName}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Call</span>
              </a>
            ` : ''}
          </div>
        </div>
      `;
    } else {
      providerHtml = `
        <div class="detail-card-section" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:0.85rem; display:flex; align-items:center; gap:0.6rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <div>
            <strong style="font-size:0.85rem; color:var(--text-primary); display:block;">Provider Assignment Pending</strong>
            <span style="font-size:0.74rem; color:var(--text-muted);">The society maintenance desk will assign an authorized technician.</span>
          </div>
        </div>
      `;
    }

    // Schedule Slot Card
    const scheduleCard = `
      <div class="detail-card-section" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:0.85rem; display:flex; flex-direction:column; gap:0.4rem;">
        <span style="font-size:0.7rem; font-weight:700; text-transform:uppercase; color:var(--resident-accent); letter-spacing:0.04em;">Schedule Details</span>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.78rem; color:var(--text-secondary);">Preferred Slot:</span>
          <strong style="font-size:0.8rem; color:var(--text-primary);">${r.preferredDate || 'N/A'} • ${r.preferredStartTime || '10:00'} – ${r.preferredEndTime || '12:00'}</strong>
        </div>
        ${r.scheduledDate ? `
          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:0.35rem; border-top:1px dashed rgba(255,255,255,0.07);">
            <span style="font-size:0.78rem; color:var(--text-secondary);">Confirmed Slot:</span>
            <strong style="font-size:0.82rem; color:#10b981;">${r.scheduledDate} • ${r.scheduledStartTime || '10:00'} – ${r.scheduledEndTime || '12:00'}</strong>
          </div>
        ` : ''}
        ${r.quotedCost ? `
          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:0.35rem; border-top:1px dashed rgba(255,255,255,0.07);">
            <span style="font-size:0.78rem; color:var(--text-secondary);">Quoted Estimate:</span>
            <strong style="font-size:0.84rem; color:#60a5fa;">${r.quotedCost}</strong>
          </div>
        ` : ''}
      </div>
    `;

    // History Timeline
    let timelineHtml = "";
    if (r.history && r.history.length > 0) {
      const items = r.history.map((item, idx) => `
        <div class="timeline-item">
          <div class="timeline-dot ${idx === 0 ? 'latest' : ''}" aria-hidden="true"></div>
          <div class="timeline-content">
            <span class="timeline-time">${item.timestamp || ''}</span>
            <strong class="timeline-title">${item.title || ''}</strong>
            ${item.note ? `<p class="timeline-note">${item.note}</p>` : ''}
          </div>
        </div>
      `).join("");

      timelineHtml = `
        <div class="detail-card-section">
          <h4 class="detail-section-title">Status &amp; Activity Timeline</h4>
          <div class="detail-timeline-list">
            ${items}
          </div>
        </div>
      `;
    }

    // Cancellation Action (only if requested, scheduled, or assigned)
    let cancelActionHtml = "";
    if (status === "requested" || status === "scheduled" || status === "assigned") {
      cancelActionHtml = `
        <div style="margin-top:1.2rem; padding:0.5rem 0;">
          <button type="button" class="btn-cancel-complaint-action" onclick="GrihamResidentServicesUI.openCancelSheet()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <span>Cancel This Request</span>
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
          <span class="complaint-cat-badge">${r.category || 'General'}</span>
          ${isUrgent ? `<span class="badge-urgent-pill">Urgent</span>` : ''}
        </div>
        <span style="font-size:0.72rem; color:var(--text-muted);">${r.requestedAt ? new Date(r.requestedAt).toLocaleDateString('en-GB', { day:'numeric', month:'short' }) : 'Recently'}</span>
      </div>

      <!-- Service Title & Unit -->
      <div style="margin-bottom:1rem;">
        <h2 style="font-family:var(--font-family-display); font-size:1.15rem; font-weight:800; color:var(--text-primary); margin:0 0 0.35rem; line-height:1.3;">${r.title}</h2>
        <div style="display:flex; align-items:center; gap:0.4rem; font-size:0.75rem; color:var(--text-muted);">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M14 8h4"/><path d="M14 12h4"/><path d="M14 16h4"/></svg>
          <span>Wing ${r.wing || 'A'}, Flat ${r.flatNumber || '204'}</span>
        </div>
      </div>

      <!-- Description Card -->
      <div class="detail-card-section">
        <h4 class="detail-section-title">Job Details</h4>
        <div class="res-detail-desc-box">
          <p style="margin:0; font-size:0.84rem; line-height:1.55; color:var(--text-secondary); white-space:pre-wrap;">${r.description || 'No additional details provided.'}</p>
        </div>
      </div>

      ${scheduleCard}

      ${providerHtml}

      ${timelineHtml}

      ${cancelActionHtml}
    `;
  },

  /**
   * Open Book Service Bottom Sheet
   */
  openBookSheet() {
    this.resetBookForm();
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-res-book-service", "sheet-res-book-service-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-book-service");
      const backdrop = document.getElementById("sheet-res-book-service-backdrop");
      if (sheet) sheet.classList.add("open", "active");
      if (backdrop) backdrop.classList.add("open", "active");
    }
  },

  /**
   * Close Book Service Bottom Sheet
   */
  closeBookSheet() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-res-book-service", "sheet-res-book-service-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-book-service");
      const backdrop = document.getElementById("sheet-res-book-service-backdrop");
      if (sheet) sheet.classList.remove("open", "active");
      if (backdrop) backdrop.classList.remove("open", "active");
    }
    this.resetBookForm();
  },

  /**
   * Reset Booking Form Fields
   */
  resetBookForm() {
    const form = document.getElementById("form-res-book-service");
    if (form) form.reset();

    const titleErr = document.getElementById("res-book-title-error");
    const descErr = document.getElementById("res-book-desc-error");
    const catErr = document.getElementById("res-book-category-error");
    const dateErr = document.getElementById("res-book-date-error");
    const groupEl = document.getElementById("res-quick-services-group");
    const rateHint = document.getElementById("res-book-rate-hint");

    if (titleErr) titleErr.style.display = "none";
    if (descErr) descErr.style.display = "none";
    if (catErr) catErr.style.display = "none";
    if (dateErr) dateErr.style.display = "none";
    if (groupEl) groupEl.style.display = "none";
    if (rateHint) rateHint.style.display = "none";

    const dateInput = document.getElementById("res-book-date");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
      dateInput.value = today;
    }
  },

  /**
   * Form validation and confirmation
   */
  submitServiceForm(event) {
    if (event) event.preventDefault();

    const catEl = document.getElementById("res-book-category");
    const titleEl = document.getElementById("res-book-title");
    const descEl = document.getElementById("res-book-desc");
    const dateEl = document.getElementById("res-book-date");
    const slotEl = document.getElementById("res-book-slot");
    const urgentEl = document.getElementById("res-book-is-urgent");

    const catVal = catEl ? catEl.value.trim() : "";
    const titleVal = titleEl ? titleEl.value.trim() : "";
    const descVal = descEl ? descEl.value.trim() : "";
    const dateVal = dateEl ? dateEl.value.trim() : "";
    const slotVal = slotEl ? slotEl.value : "10:00-12:00";
    const isUrgent = urgentEl ? urgentEl.checked : false;

    let hasError = false;

    const catErr = document.getElementById("res-book-category-error");
    const titleErr = document.getElementById("res-book-title-error");
    const descErr = document.getElementById("res-book-desc-error");
    const dateErr = document.getElementById("res-book-date-error");

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

    if (!dateVal) {
      if (dateErr) dateErr.style.display = "block";
      hasError = true;
    } else {
      if (dateErr) dateErr.style.display = "none";
    }

    if (hasError) return;

    const [startTime, endTime] = slotVal.split("-");
    const catData = (this.state.catalog || []).find(c => c.category === catVal);
    const estimatedRate = catData ? catData.estimatedRate : null;

    // Use GrihamConfirmation dialog
    if (typeof GrihamConfirmation !== "undefined") {
      GrihamConfirmation.open({
        title: "Confirm Service Booking?",
        message: `Book ${catVal} service on ${dateVal} between ${startTime} and ${endTime}? Society facility desk will schedule an authorized technician.`,
        confirmText: "Yes, Book Service",
        cancelText: "Review",
        isDanger: false,
        onConfirm: () => {
          this.executeSubmitService({
            category: catVal,
            title: titleVal,
            description: descVal,
            preferred_date: dateVal,
            preferred_start_time: startTime,
            preferred_end_time: endTime,
            is_urgent: isUrgent,
            estimated_rate: estimatedRate
          });
        }
      });
    } else {
      this.executeSubmitService({
        category: catVal,
        title: titleVal,
        description: descVal,
        preferred_date: dateVal,
        preferred_start_time: startTime,
        preferred_end_time: endTime,
        is_urgent: isUrgent,
        estimated_rate: estimatedRate
      });
    }
  },

  /**
   * Execute service request creation via API
   */
  async executeSubmitService(formData) {
    if (this.state.isSubmitting) return;
    this.state.isSubmitting = true;

    const btn = document.getElementById("btn-submit-service-req");
    const btnText = document.getElementById("btn-submit-service-text");
    if (btn) btn.disabled = true;
    if (btnText) btnText.innerHTML = `Booking...`;

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        preferred_date: formData.preferred_date,
        preferred_start_time: formData.preferred_start_time,
        preferred_end_time: formData.preferred_end_time,
        is_urgent: formData.is_urgent,
        estimated_rate: formData.estimated_rate
      };

      const createFn = (typeof createResidentServiceRequest === "function")
        ? createResidentServiceRequest
        : (window.GrihamAPI && window.GrihamAPI.createResidentServiceRequest);

      if (!createFn) {
        throw new Error("createResidentServiceRequest API not found");
      }

      const res = await createFn(payload);
      const newReq = res.request;

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(`Service request ${newReq.id} booked successfully!`, "success");
      }

      // Close book sheet
      this.closeBookSheet();

      // Refresh list
      await this.loadData(true);

      // Auto-open detail of new request
      setTimeout(() => {
        this.openDetail(newReq.id);
      }, 350);

    } catch (err) {
      console.error("[Service Request Submission Error]", err);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Failed to book service. Please try again.", "error");
      } else {
        alert("Failed to book service.");
      }
    } finally {
      this.state.isSubmitting = false;
      if (btn) btn.disabled = false;
      if (btnText) btnText.innerHTML = `Confirm Service Booking`;
    }
  },

  /**
   * Open Cancel Service Request Bottom Sheet
   */
  openCancelSheet() {
    if (!this.state.selectedRequest) return;
    const reasonInput = document.getElementById("res-service-cancel-reason");
    if (reasonInput) reasonInput.value = "";

    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-res-service-cancel", "sheet-res-service-cancel-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-service-cancel");
      const backdrop = document.getElementById("sheet-res-service-cancel-backdrop");
      if (sheet) sheet.classList.add("open", "active");
      if (backdrop) backdrop.classList.add("open", "active");
    }
  },

  /**
   * Close Cancel Service Request Bottom Sheet
   */
  closeCancelSheet() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-res-service-cancel", "sheet-res-service-cancel-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-service-cancel");
      const backdrop = document.getElementById("sheet-res-service-cancel-backdrop");
      if (sheet) sheet.classList.remove("open", "active");
      if (backdrop) backdrop.classList.remove("open", "active");
    }
  },

  /**
   * Execute Service Request Cancellation via API
   */
  async executeCancelService() {
    if (!this.state.selectedRequest) return;
    const requestId = this.state.selectedRequest.id;
    const reasonInput = document.getElementById("res-service-cancel-reason");
    const reason = reasonInput ? reasonInput.value.trim() : "";

    const btn = document.getElementById("btn-confirm-res-service-cancel");
    if (btn) btn.disabled = true;

    try {
      const cancelFn = (typeof cancelResidentServiceRequest === "function")
        ? cancelResidentServiceRequest
        : (window.GrihamAPI && window.GrihamAPI.cancelResidentServiceRequest);

      if (!cancelFn) {
        throw new Error("cancelResidentServiceRequest API not found");
      }

      await cancelFn(requestId, reason);

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(`Service request ${requestId} has been cancelled.`, "info");
      }

      this.closeCancelSheet();

      // Refresh list and reload detail view
      await this.loadData(true);
      this.openDetail(requestId);

    } catch (err) {
      console.error("[Service Cancellation Error]", err);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Unable to cancel service request. Please try again.", "error");
      }
    } finally {
      if (btn) btn.disabled = false;
    }
  }
};
