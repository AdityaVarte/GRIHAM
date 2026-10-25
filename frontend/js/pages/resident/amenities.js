/**
 * GRIHAM FRONTEND - RESIDENT AMENITIES CONTROLLER & TEMPLATE
 * Page: Resident Amenities & Facility Bookings (#/resident/amenities)
 * Mobile-first Residential Society Management App
 */

window.HTML_RESIDENT_AMENITIES = `
<!-- ================================================================= -->
<!-- RESIDENT AMENITIES BOTTOM SHEETS & MODALS                         -->
<!-- ================================================================= -->

<!-- 1. AMENITY DETAIL BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-amenity-detail-backdrop" onclick="GrihamResidentAmenitiesUI.closeAmenityDetail()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-amenity-detail" role="dialog" aria-modal="true" aria-labelledby="res-amn-detail-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentAmenitiesUI.closeAmenityDetail()" aria-label="Close amenity details" title="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <div class="sheet-title-group">
      <h3 class="sheet-title" id="res-amn-detail-title">Amenity Details</h3>
      <span class="sheet-id-badge" id="res-amn-detail-id-badge">AMN-001</span>
    </div>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <div id="res-amenity-detail-body" class="complaint-detail-body" style="padding-bottom:calc(2rem + var(--safe-bottom, 20px));">
    <!-- Populated dynamically by GrihamResidentAmenitiesUI.renderAmenityDetailBody -->
  </div>
</div>

<!-- 2. BOOK AMENITY BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-book-amenity-backdrop" onclick="GrihamResidentAmenitiesUI.closeBookSheet()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-book-amenity" role="dialog" aria-modal="true" aria-labelledby="res-book-amenity-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentAmenitiesUI.closeBookSheet()" aria-label="Close booking sheet" title="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="res-book-amenity-title">Book an Amenity</h3>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <form id="form-res-book-amenity" onsubmit="GrihamResidentAmenitiesUI.handleBookFormReview(event)" style="display:flex; flex-direction:column; gap:0.9rem; padding:0.25rem 0.25rem calc(2rem + var(--safe-bottom, 20px));">
    
    <!-- Amenity Selection -->
    <div class="form-group">
      <label class="form-label" for="res-book-amenity-id">Select Facility / Amenity <span style="color:#ef4444; font-weight:700;">*</span></label>
      <div class="input-wrapper">
        <select id="res-book-amenity-id" class="form-select" onchange="GrihamResidentAmenitiesUI.onAmenitySelectChanged(this.value)" required aria-required="true">
          <option value="" disabled selected>Select an amenity...</option>
        </select>
      </div>
      <p class="form-error-msg" id="err-res-book-amenity" style="display:none;">Please select an amenity.</p>
    </div>

    <!-- Operating Hours & Limits Banner -->
    <div id="res-book-limits-banner" class="res-rate-hint-box" style="display:none;">
      <!-- Populated dynamically -->
    </div>

    <!-- Booking Date -->
    <div class="form-group">
      <label class="form-label" for="res-book-date">Booking Date <span style="color:#ef4444; font-weight:700;">*</span></label>
      <div class="input-wrapper">
        <input 
          type="date" 
          id="res-book-date" 
          class="form-input" 
          required 
          onchange="GrihamResidentAmenitiesUI.onBookingDateChanged(this.value)"
        >
      </div>
      <p class="form-error-msg" id="err-res-book-date" style="display:none;">Please select a valid booking date.</p>
    </div>

    <!-- Timing Slots: Start & End Time -->
    <div class="form-row-2col" style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
      <div class="form-group">
        <label class="form-label" for="res-book-start-time">Start Time <span style="color:#ef4444; font-weight:700;">*</span></label>
        <div class="input-wrapper">
          <input 
            type="time" 
            id="res-book-start-time" 
            class="form-input" 
            required 
            onchange="GrihamResidentAmenitiesUI.checkSlotConflict()"
          >
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="res-book-end-time">End Time <span style="color:#ef4444; font-weight:700;">*</span></label>
        <div class="input-wrapper">
          <input 
            type="time" 
            id="res-book-end-time" 
            class="form-input" 
            required 
            onchange="GrihamResidentAmenitiesUI.checkSlotConflict()"
          >
        </div>
      </div>
    </div>

    <!-- Real-time Slot Conflict & Availability Indicator -->
    <div id="res-book-conflict-status" style="margin-top:-0.3rem;">
      <!-- Populated dynamically: green free / red conflict -->
    </div>

    <!-- Attendees / Guest Count -->
    <div class="form-group">
      <label class="form-label" for="res-book-attendees">Number of Guests / Attendees <span style="color:#ef4444; font-weight:700;">*</span></label>
      <div class="input-wrapper">
        <input 
          type="number" 
          id="res-book-attendees" 
          class="form-input" 
          min="1" 
          max="100" 
          value="1" 
          required 
          onchange="GrihamResidentAmenitiesUI.checkSlotConflict()"
        >
      </div>
      <span style="font-size:0.72rem; color:var(--text-muted);" id="res-book-capacity-hint">Capacity: up to 10 people</span>
    </div>

    <!-- Event Purpose / Description -->
    <div class="form-group">
      <label class="form-label" for="res-book-purpose">Purpose / Event Details <span style="color:#ef4444; font-weight:700;">*</span></label>
      <div class="input-wrapper">
        <textarea 
          id="res-book-purpose" 
          class="form-textarea" 
          rows="2" 
          placeholder="e.g. Birthday pooja, family get-together, badminton friendly match..." 
          required 
          aria-required="true"
        ></textarea>
      </div>
      <p class="form-error-msg" id="err-res-book-purpose" style="display:none;">Please enter a brief purpose for the booking.</p>
    </div>

    <!-- Purpose Quick Pills -->
    <div class="form-group" style="margin-top:-0.4rem;">
      <div class="res-quick-pills-row">
        <button type="button" class="res-quick-pill" onclick="GrihamResidentAmenitiesUI.applyPurposePreset('Family Get-Together')">Family Get-Together</button>
        <button type="button" class="res-quick-pill" onclick="GrihamResidentAmenitiesUI.applyPurposePreset('Birthday Celebration')">Birthday</button>
        <button type="button" class="res-quick-pill" onclick="GrihamResidentAmenitiesUI.applyPurposePreset('Friendly Sports Match')">Sports Match</button>
        <button type="button" class="res-quick-pill" onclick="GrihamResidentAmenitiesUI.applyPurposePreset('Pooja & Prayer')">Pooja / Prayer</button>
        <button type="button" class="res-quick-pill" onclick="GrihamResidentAmenitiesUI.applyPurposePreset('Fitness Workout')">Fitness</button>
      </div>
    </div>

    <!-- Approval notice card -->
    <div class="res-card-schedule-badge" id="res-book-approval-policy-card" style="width:100%; border-radius:10px; padding:0.6rem 0.8rem; display:none;">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="flex-shrink:0;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span id="res-book-approval-policy-text" style="font-size:0.75rem; line-height:1.35;"></span>
    </div>

    <!-- Submit CTA Button -->
    <button type="submit" class="btn-primary-action btn-resident-style" id="btn-submit-res-book" style="margin-top:0.4rem; min-height:46px;">
      <span id="btn-submit-res-book-text">Review Booking Details →</span>
    </button>
  </form>
</div>

<!-- 3. BOOKING REVIEW & CONFIRMATION BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-booking-confirm-backdrop" onclick="GrihamResidentAmenitiesUI.closeConfirmSheet()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-booking-confirm" role="dialog" aria-modal="true" aria-labelledby="res-booking-confirm-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentAmenitiesUI.closeConfirmSheet()" aria-label="Go back" title="Go back">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="res-booking-confirm-title">Confirm Booking</h3>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <div style="display:flex; flex-direction:column; gap:0.9rem; padding:0.25rem 0.25rem calc(2rem + var(--safe-bottom, 20px));">
    <div class="res-confirmation-preview-card" id="res-booking-confirm-card">
      <!-- Populated dynamically by GrihamResidentAmenitiesUI.renderConfirmPreview -->
    </div>

    <div style="background:rgba(255, 255, 255, 0.04); border:1px solid var(--glass-border); border-radius:12px; padding:0.75rem 0.85rem; font-size:0.75rem; color:var(--text-secondary); line-height:1.4;">
      <strong style="color:var(--text-primary); display:block; margin-bottom:0.2rem;">Booking Guidelines:</strong>
      • Please keep the facility tidy and adhere to operating hours.<br>
      • In case of cancellation, please cancel at least 2 hours in advance.
    </div>

    <div class="logout-btn-row" style="margin-top:0.4rem;">
      <button type="button" class="btn-logout-cancel" onclick="GrihamResidentAmenitiesUI.closeConfirmSheet()">Modify</button>
      <button type="button" class="btn-primary-action btn-resident-style" id="btn-final-confirm-booking" onclick="GrihamResidentAmenitiesUI.executeBookingSubmission()" style="margin-top:0; min-height:46px;">
        <span id="btn-final-confirm-booking-text">Confirm Booking</span>
      </button>
    </div>
  </div>
</div>

<!-- 4. BOOKING DETAIL BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-booking-detail-backdrop" onclick="GrihamResidentAmenitiesUI.closeBookingDetail()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-booking-detail" role="dialog" aria-modal="true" aria-labelledby="res-booking-detail-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentAmenitiesUI.closeBookingDetail()" aria-label="Close booking details" title="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <div class="sheet-title-group">
      <h3 class="sheet-title" id="res-booking-detail-title">Booking Details</h3>
      <span class="sheet-id-badge" id="res-booking-detail-id-badge">BK-2026-0089</span>
    </div>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <div id="res-booking-detail-body" class="complaint-detail-body" style="padding-bottom:calc(2rem + var(--safe-bottom, 20px));">
    <!-- Populated dynamically by GrihamResidentAmenitiesUI.renderBookingDetailBody -->
  </div>
</div>

<!-- 5. CANCEL BOOKING BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-booking-cancel-backdrop" onclick="GrihamResidentAmenitiesUI.closeCancelSheet()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-booking-cancel" role="dialog" aria-modal="true" aria-labelledby="res-booking-cancel-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentAmenitiesUI.closeCancelSheet()" aria-label="Go back" title="Go back">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="res-booking-cancel-title">Cancel Amenity Booking</h3>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <div style="display:flex; flex-direction:column; gap:0.9rem; padding:0.25rem 0.25rem;">
    <div style="background:rgba(239, 68, 68, 0.1); border:1px solid rgba(239, 68, 68, 0.25); border-radius:12px; padding:0.85rem; display:flex; gap:0.65rem; align-items:flex-start;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2" style="flex-shrink:0; margin-top:2px;">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>
        <strong style="color:#ef4444; font-size:0.85rem; display:block;">Cancel this reservation?</strong>
        <p style="color:var(--text-secondary); font-size:0.75rem; margin:0.2rem 0 0;">The reserved slot will be released for other society residents.</p>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="res-booking-cancel-reason">Reason for cancellation <span style="font-size:0.72rem; color:var(--text-muted); font-weight:400;">(Optional)</span></label>
      <div class="input-wrapper">
        <textarea 
          id="res-booking-cancel-reason" 
          class="form-textarea" 
          rows="2" 
          placeholder="e.g. Change of plans, guest unavailable, rescheduled..."
        ></textarea>
      </div>
    </div>

    <div class="logout-btn-row" style="margin-top:0.25rem;">
      <button type="button" class="btn-logout-cancel" onclick="GrihamResidentAmenitiesUI.closeCancelSheet()">Keep Slot</button>
      <button type="button" class="btn-primary-action btn-danger-action" id="btn-confirm-res-booking-cancel" onclick="GrihamResidentAmenitiesUI.executeCancelBooking()" style="margin-top:0; min-height:44px;">
        <span>Confirm Cancellation</span>
      </button>
    </div>
  </div>
</div>

<!-- ================================================================= -->
<!-- MAIN SCREEN VIEW (#screen-resident-amenities)                     -->
<!-- ================================================================= -->
<section id="screen-resident-amenities" class="app-view resident-services-view" aria-labelledby="res-amenities-header-title">

  <!-- 1. STICKY TOP APP BAR -->
  <div class="screen-top-bar res-services-top-bar">
    ${GrihamHeader.renderBackButton({
      target: '/resident/home',
      id: 'btn-res-amenities-back',
      ariaLabel: 'Back to Resident Home',
      label: 'Home'
    })}

    <h1 class="top-bar-screen-title" id="res-amenities-header-title">Amenities</h1>

    <!-- Top Right Action Pill: + Book Slot -->
    <button type="button" class="btn-res-raise-action" id="btn-res-book-amenity-top" onclick="GrihamResidentAmenitiesUI.handleBookClick()" aria-label="Book amenity slot">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      <span>Book Slot</span>
    </button>
  </div>

  <!-- 2. SUBVIEW SWITCHER TABS: Browse vs My Bookings -->
  <div class="complaints-tab-row" style="margin: 0.65rem 1rem 0.25rem;">
    <button type="button" class="complaints-tab-btn active" id="tab-btn-browse-amenities" onclick="GrihamResidentAmenitiesUI.switchMainTab('browse')">
      <span>Browse Facilities</span>
    </button>
    <button type="button" class="complaints-tab-btn" id="tab-btn-my-bookings" onclick="GrihamResidentAmenitiesUI.switchMainTab('bookings')">
      <span>My Bookings</span>
      <span class="tab-count-badge" id="tab-my-bookings-count-badge" style="display:none;">0</span>
    </button>
  </div>

  <!-- ================= SUBVIEW 1: BROWSE AMENITIES ================= -->
  <div id="subview-browse-amenities" style="display:block;">
    
    <!-- Summary Metrics Grid -->
    <div class="res-services-summary-section" style="padding-top:0.4rem;">
      <div class="res-services-stats-grid">
        <div class="res-serv-stat-card">
          <span class="res-serv-stat-val" id="stat-amn-total">6</span>
          <span class="res-serv-stat-lbl">Facilities</span>
        </div>
        <div class="res-serv-stat-card">
          <span class="res-serv-stat-val" style="color:#10b981;" id="stat-amn-avail">4</span>
          <span class="res-serv-stat-lbl">Available</span>
        </div>
        <div class="res-serv-stat-card">
          <span class="res-serv-stat-val" style="color:var(--resident-accent);" id="stat-amn-my-active">1</span>
          <span class="res-serv-stat-lbl">My Bookings</span>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="res-services-search-section">
      <div class="input-wrapper input-with-leading-icon">
        <svg class="input-leading-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          id="res-amn-search-input" 
          class="form-input res-services-search-input" 
          placeholder="Search facilities, pool, hall, court..." 
          oninput="GrihamResidentAmenitiesUI.handleSearch(this.value)"
          aria-label="Search amenities"
        >
        <button type="button" class="btn-search-clear" id="btn-res-amn-search-clear" onclick="GrihamResidentAmenitiesUI.clearSearch()" style="display:none;" aria-label="Clear search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Filter Chips -->
    <div class="res-filter-chips-container" id="res-amn-filter-chips">
      <button type="button" class="res-filter-chip active" data-filter="all" onclick="GrihamResidentAmenitiesUI.setAmenityFilter('all')">All</button>
      <button type="button" class="res-filter-chip" data-filter="Available" onclick="GrihamResidentAmenitiesUI.setAmenityFilter('Available')">Available</button>
      <button type="button" class="res-filter-chip" data-filter="Sports" onclick="GrihamResidentAmenitiesUI.setAmenityFilter('Sports')">Sports</button>
      <button type="button" class="res-filter-chip" data-filter="Clubhouse" onclick="GrihamResidentAmenitiesUI.setAmenityFilter('Clubhouse')">Clubhouse</button>
      <button type="button" class="res-filter-chip" data-filter="Maintenance" onclick="GrihamResidentAmenitiesUI.setAmenityFilter('Maintenance')">Maintenance</button>
    </div>

    <!-- Facilities List Feed -->
    <div class="complaints-list-container" id="res-amenities-list">
      <!-- Populated dynamically by GrihamResidentAmenitiesUI.renderAmenitiesList -->
    </div>
  </div>

  <!-- ================= SUBVIEW 2: MY BOOKINGS ================= -->
  <div id="subview-my-bookings" style="display:none;">
    
    <!-- Bookings Filter Chips -->
    <div class="res-filter-chips-container" id="res-booking-filter-chips" style="padding-top:0.4rem;">
      <button type="button" class="res-filter-chip active" data-bfilter="all" onclick="GrihamResidentAmenitiesUI.setBookingFilter('all')">All Bookings</button>
      <button type="button" class="res-filter-chip" data-bfilter="active" onclick="GrihamResidentAmenitiesUI.setBookingFilter('active')">Upcoming &amp; Active</button>
      <button type="button" class="res-filter-chip" data-bfilter="pending" onclick="GrihamResidentAmenitiesUI.setBookingFilter('pending')">Pending Approval</button>
      <button type="button" class="res-filter-chip" data-bfilter="completed" onclick="GrihamResidentAmenitiesUI.setBookingFilter('completed')">Completed</button>
      <button type="button" class="res-filter-chip" data-bfilter="cancelled" onclick="GrihamResidentAmenitiesUI.setBookingFilter('cancelled')">Cancelled</button>
    </div>

    <!-- Bookings List Feed -->
    <div class="complaints-list-container" id="res-my-bookings-list">
      <!-- Populated dynamically by GrihamResidentAmenitiesUI.renderBookingsList -->
    </div>
  </div>

  <!-- LOADING SKELETON STATE -->
  <div class="complaint-loading-skeleton" id="res-amn-loading" style="display:none;">
    <div class="complaint-card skeleton-card" style="height:120px;"></div>
    <div class="complaint-card skeleton-card" style="height:120px;"></div>
    <div class="complaint-card skeleton-card" style="height:120px;"></div>
  </div>

  <!-- EMPTY STATE -->
  <div class="complaints-empty-state" id="res-amn-empty" style="display:none;">
    <div class="empty-icon-wrap" aria-hidden="true">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    </div>
    <h3 class="empty-title" id="res-amn-empty-title">No amenities found</h3>
    <p class="empty-desc" id="res-amn-empty-desc">No society facilities match your search query or filter.</p>
    <button type="button" class="btn-primary-action btn-resident-style" id="btn-amn-empty-book" onclick="GrihamResidentAmenitiesUI.handleBookClick()" style="width:auto; padding:0.5rem 1.4rem; font-size:0.82rem; margin-top:0.5rem;">
      + Book an Amenity
    </button>
  </div>

  <!-- ERROR STATE -->
  <div class="maint-error-card" id="res-amn-error" style="display:none; margin:1.5rem 1rem;">
    <p style="font-weight:600; color:var(--text-primary); margin-bottom:0.5rem;">Unable to load amenities.</p>
    <button type="button" class="btn-primary-action btn-resident-style" onclick="GrihamResidentAmenitiesUI.loadData(true)" style="min-height:38px; font-size:0.82rem; padding:0.4rem 1.2rem;">
      Try Again
    </button>
  </div>

  <!-- 12. BOTTOM NAVIGATION BAR -->
  <nav class="res-bottom-nav" aria-label="Resident Navigation">
    <button type="button" class="res-nav-item" onclick="GrihamRouter.navigate('/resident/home')" aria-label="Home" id="res-amn-nav-home">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span>Home</span>
    </button>
    <button type="button" class="res-nav-item" onclick="GrihamRouter.navigate('/resident/services')" aria-label="Services" id="res-amn-nav-services">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      <span>Services</span>
    </button>
    <button type="button" class="res-nav-item" onclick="GrihamRouter.navigate('/resident/complaints')" aria-label="Complaints" id="res-amn-nav-complaints">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      <span>Complaints</span>
    </button>
    <button type="button" class="res-nav-item" onclick="GrihamRouter.navigate('/resident/profile')" aria-label="Profile" id="res-amn-nav-profile">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span>Profile</span>
    </button>
  </nav>

</section>
`;

/**
 * Controller Object for Resident Amenities
 */
window.GrihamResidentAmenitiesUI = {
  state: {
    amenities: [],
    bookings: [],
    activeTab: "browse", // "browse" | "bookings"
    searchQuery: "",
    amenityFilter: "all",
    bookingFilter: "all",
    selectedAmenity: null,
    selectedBooking: null,
    pendingBookingForm: null,
    availabilityDate: new Date().toISOString().split("T")[0],
    isSubmitting: false
  },

  /**
   * Screen Initialization Hook called by GrihamRouter
   */
  async init() {
    // Set date pickers default to today and minimum to today
    const today = new Date().toISOString().split("T")[0];
    const dateInput = document.getElementById("res-book-date");
    if (dateInput) {
      dateInput.min = today;
      dateInput.value = today;
    }

    await this.loadData();

    // Check for target booking id passed from Home teaser or notifications
    try {
      const targetBookingId = sessionStorage.getItem("griham_target_amenity_booking_id");
      if (targetBookingId) {
        sessionStorage.removeItem("griham_target_amenity_booking_id");
        this.switchMainTab("bookings");
        setTimeout(() => {
          this.openBookingDetail(targetBookingId);
        }, 250);
      }
    } catch (_) {}

    if (typeof GrihamI18n !== "undefined" && typeof GrihamI18n.translate === "function") {
      GrihamI18n.translate(GrihamState.language);
    }
  },

  /**
   * Fetch amenities and bookings from canonical API
   */
  async loadData(forceRefresh = false) {
    const loadingEl = document.getElementById("res-amn-loading");
    const errorEl = document.getElementById("res-amn-error");
    const emptyEl = document.getElementById("res-amn-empty");

    if (loadingEl) loadingEl.style.display = "flex";
    if (errorEl) errorEl.style.display = "none";
    if (emptyEl) emptyEl.style.display = "none";

    try {
      const getAmenitiesFn = (typeof getResidentAmenities === "function")
        ? getResidentAmenities
        : (window.GrihamAPI && window.GrihamAPI.getResidentAmenities);

      const getBookingsFn = (typeof getResidentBookings === "function")
        ? getResidentBookings
        : (window.GrihamAPI && window.GrihamAPI.getResidentBookings);

      const [amnRes, bkgRes] = await Promise.all([
        getAmenitiesFn ? getAmenitiesFn() : Promise.resolve({ amenities: [] }),
        getBookingsFn ? getBookingsFn() : Promise.resolve({ bookings: [] })
      ]);

      this.state.amenities = amnRes.amenities || [];
      this.state.bookings = bkgRes.bookings || [];

      this.renderSummary();
      this.populateAmenityDropdown();
      this.renderAmenitiesList();
      this.renderBookingsList();
    } catch (err) {
      console.error("[Resident Amenities Load Error]", err);
      if (errorEl) errorEl.style.display = "block";
    } finally {
      if (loadingEl) loadingEl.style.display = "none";
    }
  },

  /**
   * Switch between "Browse Amenities" and "My Bookings"
   */
  switchMainTab(tab) {
    this.state.activeTab = tab;

    const browseTabBtn = document.getElementById("tab-btn-browse-amenities");
    const myBookingsTabBtn = document.getElementById("tab-btn-my-bookings");
    const subviewBrowse = document.getElementById("subview-browse-amenities");
    const subviewBookings = document.getElementById("subview-my-bookings");
    const emptyEl = document.getElementById("res-amn-empty");

    if (emptyEl) emptyEl.style.display = "none";

    if (tab === "browse") {
      if (browseTabBtn) browseTabBtn.classList.add("active");
      if (myBookingsTabBtn) myBookingsTabBtn.classList.remove("active");
      if (subviewBrowse) subviewBrowse.style.display = "block";
      if (subviewBookings) subviewBookings.style.display = "none";
      this.renderAmenitiesList();
    } else {
      if (browseTabBtn) browseTabBtn.classList.remove("active");
      if (myBookingsTabBtn) myBookingsTabBtn.classList.add("active");
      if (subviewBrowse) subviewBrowse.style.display = "none";
      if (subviewBookings) subviewBookings.style.display = "block";
      this.renderBookingsList();
    }
  },

  /**
   * Render summary counters
   */
  renderSummary() {
    const list = this.state.amenities;
    const total = list.length;
    const avail = list.filter(a => a.status === "Available").length;
    const myActive = this.state.bookings.filter(b => b.status === "Approved" || b.status === "Pending").length;

    const statTotal = document.getElementById("stat-amn-total");
    const statAvail = document.getElementById("stat-amn-avail");
    const statMyActive = document.getElementById("stat-amn-my-active");
    const tabBadge = document.getElementById("tab-my-bookings-count-badge");

    if (statTotal) statTotal.textContent = total;
    if (statAvail) statAvail.textContent = avail;
    if (statMyActive) statMyActive.textContent = myActive;

    if (tabBadge) {
      if (myActive > 0) {
        tabBadge.textContent = myActive;
        tabBadge.style.display = "inline-flex";
      } else {
        tabBadge.style.display = "none";
      }
    }
  },

  /**
   * Populate Amenity select dropdown in Booking Sheet
   */
  populateAmenityDropdown() {
    const select = document.getElementById("res-book-amenity-id");
    if (!select) return;

    const currentVal = select.value;
    select.innerHTML = `<option value="" disabled ${!currentVal ? 'selected' : ''}>Select an amenity...</option>` +
      this.state.amenities.map(a => {
        const isMaint = a.status === "Maintenance" || a.status === "Disabled";
        const label = `${a.name}${isMaint ? ' (' + a.status + ')' : ''}`;
        return `<option value="${a.id}" ${isMaint ? 'disabled' : ''} ${currentVal === a.id ? 'selected' : ''}>${label}</option>`;
      }).join("");
  },

  /**
   * Filter handling for amenities
   */
  setAmenityFilter(filter) {
    this.state.amenityFilter = filter;
    document.querySelectorAll("#res-amn-filter-chips .res-filter-chip").forEach(c => {
      c.classList.toggle("active", c.getAttribute("data-filter") === filter);
    });
    this.renderAmenitiesList();
  },

  /**
   * Filter handling for resident bookings
   */
  setBookingFilter(filter) {
    this.state.bookingFilter = filter;
    document.querySelectorAll("#res-booking-filter-chips .res-filter-chip").forEach(c => {
      c.classList.toggle("active", c.getAttribute("data-bfilter") === filter);
    });
    this.renderBookingsList();
  },

  /**
   * Search input handler
   */
  handleSearch(val) {
    this.state.searchQuery = (val || "").trim().toLowerCase();
    const clearBtn = document.getElementById("btn-res-amn-search-clear");
    if (clearBtn) clearBtn.style.display = this.state.searchQuery ? "flex" : "none";
    this.renderAmenitiesList();
  },

  clearSearch() {
    const input = document.getElementById("res-amn-search-input");
    if (input) input.value = "";
    this.handleSearch("");
  },

  /**
   * Render Amenities List
   */
  renderAmenitiesList() {
    const listEl = document.getElementById("res-amenities-list");
    const emptyEl = document.getElementById("res-amn-empty");
    if (!listEl) return;

    let items = [...this.state.amenities];

    // Filter by category / status
    if (this.state.amenityFilter !== "all") {
      const f = this.state.amenityFilter;
      if (f === "Available") {
        items = items.filter(a => a.status === "Available");
      } else if (f === "Maintenance") {
        items = items.filter(a => a.status === "Maintenance" || a.status === "Disabled");
      } else if (f === "Sports") {
        items = items.filter(a => a.icon === "pool" || a.icon === "gym" || a.icon === "court");
      } else if (f === "Clubhouse") {
        items = items.filter(a => a.icon === "hall" || a.icon === "gazebo" || a.icon === "theatre");
      }
    }

    // Search query
    if (this.state.searchQuery) {
      const q = this.state.searchQuery;
      items = items.filter(a =>
        (a.name && a.name.toLowerCase().includes(q)) ||
        (a.description && a.description.toLowerCase().includes(q)) ||
        (a.location && a.location.toLowerCase().includes(q))
      );
    }

    if (items.length === 0) {
      listEl.innerHTML = "";
      if (emptyEl) {
        const titleEl = document.getElementById("res-amn-empty-title");
        const descEl = document.getElementById("res-amn-empty-desc");
        if (titleEl) titleEl.textContent = "No facilities match your search";
        if (descEl) descEl.textContent = "Try changing your search keywords or filter category.";
        emptyEl.style.display = "flex";
      }
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";

    const html = items.map(a => {
      const isMaint = a.status === "Maintenance" || a.status === "Disabled";
      const statusClass = (typeof GrihamStatusBadge !== "undefined")
        ? GrihamStatusBadge.getStatusClass(a.status)
        : (isMaint ? 'badge-rejected' : 'badge-approved');

      return `
        <div class="complaint-card res-service-item-card" onclick="GrihamResidentAmenitiesUI.openAmenityDetail('${a.id}')" role="button" tabindex="0" aria-label="${a.name}">
          
          <div class="complaint-card-header">
            <div style="display:flex; align-items:center; gap:0.65rem;">
              <div class="res-catalog-card-icon" style="width:36px; height:36px; margin:0;" aria-hidden="true">
                ${this.getAmenityIconSvg(a.icon)}
              </div>
              <div>
                <strong class="complaint-card-title" style="font-size:0.9rem;">${a.name}</strong>
                <span class="complaint-card-id" style="display:block; font-size:0.7rem; color:var(--text-muted);">${a.location}</span>
              </div>
            </div>
            <span class="status-badge ${statusClass}">${a.status}</span>
          </div>

          <p class="complaint-card-desc" style="margin:0.4rem 0 0.5rem; -webkit-line-clamp:2; display:-webkit-box; -webkit-box-orient:vertical; overflow:hidden;">
            ${a.description || ''}
          </p>

          <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.55rem;">
            <div class="res-card-schedule-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${this.formatTime12h(a.opening_time)} – ${this.formatTime12h(a.closing_time)}</span>
            </div>
            <div class="res-card-schedule-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              <span>Max ${a.capacity} guests</span>
            </div>
            <div class="res-card-schedule-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 10"/></svg>
              <span>Slot up to ${a.booking_duration}h</span>
            </div>
          </div>

          <div class="complaint-card-footer" style="padding-top:0.45rem; border-top:1px solid var(--glass-border); display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.72rem; color:var(--text-muted);">
              ${a.requires_approval ? 'Requires committee approval' : 'Instant confirmation'}
            </span>
            <div style="display:flex; gap:0.45rem;" onclick="event.stopPropagation();">
              <button type="button" class="btn-amenity-view-pill" onclick="GrihamResidentAmenitiesUI.openAmenityDetail('${a.id}')" aria-label="View details of ${a.name}">
                <span>Details</span>
              </button>
              ${!isMaint ? `
                <button type="button" class="btn-res-raise-action" onclick="GrihamResidentAmenitiesUI.openBookingFlow('${a.id}')" style="padding:0.25rem 0.65rem; font-size:0.75rem;" aria-label="Book slot for ${a.name}">
                  <span>Book</span>
                </button>
              ` : `
                <span class="status-badge badge-rejected" style="font-size:0.68rem; padding:0.2rem 0.5rem;">Blocked</span>
              `}
            </div>
          </div>

        </div>
      `;
    }).join("");

    listEl.innerHTML = html;
  },

  /**
   * Render My Bookings List
   */
  renderBookingsList() {
    const listEl = document.getElementById("res-my-bookings-list");
    const emptyEl = document.getElementById("res-amn-empty");
    if (!listEl) return;

    let items = [...this.state.bookings];

    if (this.state.bookingFilter !== "all") {
      const f = this.state.bookingFilter;
      if (f === "active") {
        items = items.filter(b => b.status === "Approved" || b.status === "Pending");
      } else if (f === "pending") {
        items = items.filter(b => b.status === "Pending");
      } else if (f === "completed") {
        items = items.filter(b => b.status === "Completed");
      } else if (f === "cancelled") {
        items = items.filter(b => b.status === "Cancelled" || b.status === "Rejected");
      }
    }

    if (items.length === 0) {
      listEl.innerHTML = "";
      if (emptyEl) {
        const titleEl = document.getElementById("res-amn-empty-title");
        const descEl = document.getElementById("res-amn-empty-desc");
        if (titleEl) titleEl.textContent = "No amenity bookings found";
        if (descEl) descEl.textContent = "You have not reserved any society facilities under this filter.";
        emptyEl.style.display = "flex";
      }
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";

    const html = items.map(b => {
      const statusClass = (typeof GrihamStatusBadge !== "undefined")
        ? GrihamStatusBadge.getStatusClass(b.status)
        : (b.status === 'Approved' ? 'badge-approved' : 'badge-pending');

      return `
        <div class="complaint-card res-service-item-card" onclick="GrihamResidentAmenitiesUI.openBookingDetail('${b.id}')" role="button" tabindex="0" aria-label="Booking ${b.id}">
          
          <div class="complaint-card-header">
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <div class="res-catalog-card-icon" style="width:34px; height:34px; margin:0;" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div>
                <strong class="complaint-card-title" style="font-size:0.88rem;">${b.amenity_name}</strong>
                <span class="complaint-card-id" style="display:block; font-size:0.7rem; color:var(--text-muted);">${b.id}</span>
              </div>
            </div>
            <span class="status-badge ${statusClass}">${b.status}</span>
          </div>

          <div class="res-card-schedule-badge confirmed" style="margin-top:0.45rem; width:100%; justify-content:flex-start;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <strong>${this.formatDateReadable(b.date)} • ${this.formatTime12h(b.start_time)} – ${this.formatTime12h(b.end_time)}</strong>
          </div>

          <p class="complaint-card-desc" style="margin:0.45rem 0 0.2rem; font-size:0.78rem;">
            ${b.purpose || 'Amenity Reservation'}
          </p>

          <div class="complaint-card-footer" style="padding-top:0.45rem; border-top:1px solid var(--glass-border); display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.72rem; color:var(--text-muted);">
              ${b.people_count || 1} Guests • Wing ${b.wing || 'A'}-${b.flat || '204'}
            </span>
            <span class="res-catalog-book-action">View Details →</span>
          </div>

        </div>
      `;
    }).join("");

    listEl.innerHTML = html;
  },

  /**
   * Open Amenity Detail Bottom Sheet
   */
  async openAmenityDetail(amenityId) {
    const amn = this.state.amenities.find(a => a.id === amenityId);
    if (!amn) return;
    this.state.selectedAmenity = amn;

    const idBadge = document.getElementById("res-amn-detail-id-badge");
    const titleEl = document.getElementById("res-amn-detail-title");
    const bodyEl = document.getElementById("res-amenity-detail-body");

    if (idBadge) idBadge.textContent = amn.id;
    if (titleEl) titleEl.textContent = amn.name;

    this.renderAmenityDetailBody(amn);

    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-res-amenity-detail", "sheet-res-amenity-detail-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-amenity-detail");
      const backdrop = document.getElementById("sheet-res-amenity-detail-backdrop");
      if (sheet) sheet.classList.add("open", "active");
      if (backdrop) backdrop.classList.add("open", "active");
    }

    // Load availability for the default date
    await this.loadAmenityAvailability(amn.id, this.state.availabilityDate);
  },

  closeAmenityDetail() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-res-amenity-detail", "sheet-res-amenity-detail-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-amenity-detail");
      const backdrop = document.getElementById("sheet-res-amenity-detail-backdrop");
      if (sheet) sheet.classList.remove("open", "active");
      if (backdrop) backdrop.classList.remove("open", "active");
    }
  },

  /**
   * Render Amenity Detail Body with Availability Slot Checker
   */
  renderAmenityDetailBody(amn) {
    const bodyEl = document.getElementById("res-amenity-detail-body");
    if (!bodyEl) return;

    const isMaint = amn.status === "Maintenance" || amn.status === "Disabled";
    const statusClass = (typeof GrihamStatusBadge !== "undefined")
      ? GrihamStatusBadge.getStatusClass(amn.status)
      : (isMaint ? 'badge-rejected' : 'badge-approved');

    bodyEl.innerHTML = `
      <div class="complaint-detail-header-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.4rem;">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <div class="res-catalog-card-icon" style="width:40px; height:40px; margin:0;" aria-hidden="true">
              ${this.getAmenityIconSvg(amn.icon)}
            </div>
            <div>
              <h2 style="font-size:1.05rem; font-weight:700; color:var(--text-primary); margin:0;">${amn.name}</h2>
              <span style="font-size:0.75rem; color:var(--text-muted);">${amn.location}</span>
            </div>
          </div>
          <span class="status-badge ${statusClass}">${amn.status}</span>
        </div>
        <p style="font-size:0.8rem; color:var(--text-secondary); margin:0.35rem 0 0; line-height:1.4;">
          ${amn.description || ''}
        </p>
      </div>

      ${isMaint ? `
        <div style="background:rgba(239, 68, 68, 0.1); border:1px solid rgba(239, 68, 68, 0.25); border-radius:12px; padding:0.75rem; display:flex; gap:0.55rem; align-items:flex-start;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <div style="font-size:0.76rem; color:#ef4444; line-height:1.35;">
            <strong>Under Maintenance:</strong> ${amn.blocked_reason || 'This facility is temporarily closed for repairs.'}
          </div>
        </div>
      ` : ''}

      <!-- Key Specifications -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.55rem;">
        <div class="complaint-detail-card" style="margin:0; padding:0.65rem 0.75rem;">
          <span style="font-size:0.7rem; color:var(--text-muted); display:block;">Operating Hours</span>
          <strong style="font-size:0.84rem; color:var(--text-primary);">${this.formatTime12h(amn.opening_time)} – ${this.formatTime12h(amn.closing_time)}</strong>
        </div>
        <div class="complaint-detail-card" style="margin:0; padding:0.65rem 0.75rem;">
          <span style="font-size:0.7rem; color:var(--text-muted); display:block;">Max Capacity</span>
          <strong style="font-size:0.84rem; color:var(--text-primary);">${amn.capacity} Guests</strong>
        </div>
        <div class="complaint-detail-card" style="margin:0; padding:0.65rem 0.75rem;">
          <span style="font-size:0.7rem; color:var(--text-muted); display:block;">Max Duration</span>
          <strong style="font-size:0.84rem; color:var(--text-primary);">${amn.booking_duration} Hours / Booking</strong>
        </div>
        <div class="complaint-detail-card" style="margin:0; padding:0.65rem 0.75rem;">
          <span style="font-size:0.7rem; color:var(--text-muted); display:block;">Approval Policy</span>
          <strong style="font-size:0.84rem; color:var(--text-primary);">${amn.requires_approval ? 'Committee Approval' : 'Instant Auto-Approve'}</strong>
        </div>
      </div>

      <!-- Rules & Guidelines -->
      <div class="complaint-detail-card">
        <h4 style="font-size:0.82rem; font-weight:700; color:var(--text-primary); margin:0 0 0.35rem;">Rules &amp; Guidelines</h4>
        <p style="font-size:0.76rem; color:var(--text-secondary); margin:0; line-height:1.4;">
          ${amn.rules || 'Please adhere to society community guidelines. Maintain cleanliness and vacate on time.'}
        </p>
      </div>

      <!-- Interactive Date Availability Checker -->
      <div class="complaint-detail-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
          <h4 style="font-size:0.82rem; font-weight:700; color:var(--text-primary); margin:0;">Check Slot Availability</h4>
          <input 
            type="date" 
            id="detail-avail-date-input" 
            class="form-input" 
            style="width:auto; padding:0.25rem 0.5rem; font-size:0.75rem;" 
            value="${this.state.availabilityDate}"
            min="${new Date().toISOString().split('T')[0]}"
            onchange="GrihamResidentAmenitiesUI.onDetailAvailabilityDateChanged(this.value)"
          >
        </div>
        <div id="detail-avail-slots-container">
          <div style="font-size:0.76rem; color:var(--text-muted); text-align:center; padding:0.5rem;">Loading availability...</div>
        </div>
      </div>

      <!-- Book Action Button -->
      ${!isMaint ? `
        <button type="button" class="btn-primary-action btn-resident-style" onclick="GrihamResidentAmenitiesUI.openBookingFlow('${amn.id}')" style="min-height:46px; margin-top:0.25rem;">
          <span>Book ${amn.name} →</span>
        </button>
      ` : `
        <button type="button" class="btn-primary-action" disabled style="min-height:46px; margin-top:0.25rem; opacity:0.5;">
          <span>Facility Currently Blocked</span>
        </button>
      `}
    `;
  },

  /**
   * Load availability slots for an amenity on a given date
   */
  async loadAmenityAvailability(amenityId, date) {
    const container = document.getElementById("detail-avail-slots-container");
    if (!container) return;

    try {
      const availFn = (typeof getResidentAmenityAvailability === "function")
        ? getResidentAmenityAvailability
        : (window.GrihamAPI && window.GrihamAPI.getResidentAmenityAvailability);

      if (!availFn) return;

      const res = await availFn(amenityId, date);
      const booked = res.booked_slots || [];

      if (booked.length === 0) {
        container.innerHTML = `
          <div style="background:rgba(16, 185, 129, 0.08); border:1px solid rgba(16, 185, 129, 0.2); border-radius:10px; padding:0.6rem 0.75rem; display:flex; align-items:center; gap:0.45rem;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg>
            <span style="font-size:0.75rem; color:#10b981; font-weight:600;">All slots are available on this date (${this.formatTime12h(res.opening_time)} – ${this.formatTime12h(res.closing_time)})</span>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:0.35rem;">
            <span style="font-size:0.72rem; color:var(--text-muted);">Existing Booked Slots:</span>
            <div style="display:flex; flex-wrap:wrap; gap:0.35rem;">
              ${booked.map(s => `
                <div class="res-card-schedule-badge" style="background:rgba(239, 68, 68, 0.12); border:1px solid rgba(239, 68, 68, 0.25); color:#ef4444; font-size:0.72rem;">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>
                  <span>${this.formatTime12h(s.start_time)} – ${this.formatTime12h(s.end_time)} (${s.status})</span>
                </div>
              `).join("")}
            </div>
            <span style="font-size:0.72rem; color:var(--text-secondary); margin-top:0.25rem;">
              Remaining slots between ${this.formatTime12h(res.opening_time)} and ${this.formatTime12h(res.closing_time)} are free to book.
            </span>
          </div>
        `;
      }
    } catch (err) {
      console.error("[Availability check error]", err);
      container.innerHTML = `<span style="font-size:0.75rem; color:var(--text-muted);">Unable to load live availability.</span>`;
    }
  },

  onDetailAvailabilityDateChanged(val) {
    if (!val || !this.state.selectedAmenity) return;
    this.state.availabilityDate = val;
    this.loadAmenityAvailability(this.state.selectedAmenity.id, val);
  },

  /**
   * Open Booking Flow (Sheet)
   */
  openBookingFlow(amenityId = null) {
    // Resident approval guard
    const user = (typeof GrihamAuth !== "undefined" && GrihamAuth.getUser()) ||
                 (typeof GrihamState !== "undefined" && GrihamState.currentUser) || {};
    const approval = (user.approvalStatus || user.approval || "Approved").toLowerCase();

    if (approval === "pending") {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Amenity booking is disabled while your registration is pending approval.", "warning");
      } else {
        alert("Amenity booking is disabled while your registration is pending approval.");
      }
      return;
    }

    if (approval === "rejected") {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Registration not approved. Please contact society administration.", "error");
      } else {
        alert("Registration not approved.");
      }
      return;
    }

    // Close detail sheet if open
    this.closeAmenityDetail();

    const select = document.getElementById("res-book-amenity-id");
    if (select) {
      this.populateAmenityDropdown();
      if (amenityId) select.value = amenityId;
    }

    if (amenityId) {
      this.onAmenitySelectChanged(amenityId);
    }

    // Reset date to today or tomorrow
    const today = new Date().toISOString().split("T")[0];
    const dateInput = document.getElementById("res-book-date");
    if (dateInput) {
      dateInput.min = today;
      if (!dateInput.value) dateInput.value = today;
    }

    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-res-book-amenity", "sheet-res-book-amenity-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-book-amenity");
      const backdrop = document.getElementById("sheet-res-book-amenity-backdrop");
      if (sheet) sheet.classList.add("open", "active");
      if (backdrop) backdrop.classList.add("open", "active");
    }
  },

  closeBookSheet() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-res-book-amenity", "sheet-res-book-amenity-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-book-amenity");
      const backdrop = document.getElementById("sheet-res-book-amenity-backdrop");
      if (sheet) sheet.classList.remove("open", "active");
      if (backdrop) backdrop.classList.remove("open", "active");
    }
  },

  handleBookClick() {
    this.openBookingFlow();
  },

  /**
   * Handle amenity select dropdown change in booking sheet
   */
  onAmenitySelectChanged(amenityId) {
    const amn = this.state.amenities.find(a => a.id === amenityId);
    const banner = document.getElementById("res-book-limits-banner");
    const capHint = document.getElementById("res-book-capacity-hint");
    const attendeesInput = document.getElementById("res-book-attendees");
    const startTimeInput = document.getElementById("res-book-start-time");
    const endTimeInput = document.getElementById("res-book-end-time");
    const approvalCard = document.getElementById("res-book-approval-policy-card");
    const approvalText = document.getElementById("res-book-approval-policy-text");

    if (!amn) {
      if (banner) banner.style.display = "none";
      if (approvalCard) approvalCard.style.display = "none";
      return;
    }

    if (banner) {
      banner.style.display = "flex";
      banner.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>Hours: <strong>${this.formatTime12h(amn.opening_time)} – ${this.formatTime12h(amn.closing_time)}</strong> • Max Duration: <strong>${amn.booking_duration} hrs</strong></span>
      `;
    }

    if (capHint) capHint.textContent = `Capacity: up to ${amn.capacity} people (max)`;
    if (attendeesInput) {
      attendeesInput.max = amn.capacity;
      if (parseInt(attendeesInput.value, 10) > amn.capacity) {
        attendeesInput.value = amn.capacity;
      }
    }

    // Set default reasonable slot within operating hours
    if (startTimeInput && (!startTimeInput.value || startTimeInput.value < amn.opening_time)) {
      startTimeInput.value = amn.opening_time;
    }
    if (endTimeInput && startTimeInput && startTimeInput.value) {
      const [h, m] = startTimeInput.value.split(":").map(Number);
      const endH = Math.min(h + amn.booking_duration, parseInt(amn.closing_time.split(":")[0], 10));
      endTimeInput.value = `${String(endH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }

    if (approvalCard && approvalText) {
      approvalCard.style.display = "flex";
      if (amn.requires_approval) {
        approvalCard.className = "res-card-schedule-badge";
        approvalText.innerHTML = `<strong>Committee Approval Required:</strong> Request will be submitted as <em>Pending</em> and confirmed by society office within 24h.`;
      } else {
        approvalCard.className = "res-card-schedule-badge confirmed";
        approvalText.innerHTML = `<strong>Instant Confirmation:</strong> Booking will be automatically approved upon submission.`;
      }
    }

    this.checkSlotConflict();
  },

  onBookingDateChanged(val) {
    this.checkSlotConflict();
  },

  applyPurposePreset(text) {
    const textarea = document.getElementById("res-book-purpose");
    if (textarea) textarea.value = text;
  },

  /**
   * Real-time Slot Conflict Check on UI
   */
  checkSlotConflict() {
    const amenityId = document.getElementById("res-book-amenity-id")?.value;
    const date = document.getElementById("res-book-date")?.value;
    const startTime = document.getElementById("res-book-start-time")?.value;
    const endTime = document.getElementById("res-book-end-time")?.value;
    const statusContainer = document.getElementById("res-book-conflict-status");

    if (!statusContainer || !amenityId || !date || !startTime || !endTime) {
      if (statusContainer) statusContainer.innerHTML = "";
      return;
    }

    const amn = this.state.amenities.find(a => a.id === amenityId);
    if (!amn) return;

    // Check operating hours
    if (startTime < amn.opening_time || endTime > amn.closing_time || startTime >= endTime) {
      statusContainer.innerHTML = `
        <div style="background:rgba(239, 68, 68, 0.1); border:1px solid rgba(239, 68, 68, 0.25); border-radius:8px; padding:0.4rem 0.6rem; font-size:0.74rem; color:#ef4444; display:flex; align-items:center; gap:0.4rem;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>
          <span>Slot must be within ${this.formatTime12h(amn.opening_time)} to ${this.formatTime12h(amn.closing_time)}</span>
        </div>
      `;
      return;
    }

    // Interval conflict rule: newStart < existingEnd AND newEnd > existingStart
    const conflict = this.state.bookings.find(b =>
      b.amenity_id === amenityId &&
      b.date === date &&
      (b.status === "Approved" || b.status === "Pending") &&
      (startTime < b.end_time && endTime > b.start_time)
    );

    if (conflict) {
      statusContainer.innerHTML = `
        <div style="background:rgba(239, 68, 68, 0.12); border:1px solid rgba(239, 68, 68, 0.3); border-radius:8px; padding:0.4rem 0.6rem; font-size:0.74rem; color:#ef4444; display:flex; align-items:center; gap:0.4rem;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>
          <span><strong>Conflict:</strong> Booked (${conflict.start_time} – ${conflict.end_time}). Please pick a different slot.</span>
        </div>
      `;
    } else {
      statusContainer.innerHTML = `
        <div style="background:rgba(16, 185, 129, 0.08); border:1px solid rgba(16, 185, 129, 0.25); border-radius:8px; padding:0.4rem 0.6rem; font-size:0.74rem; color:#10b981; display:flex; align-items:center; gap:0.4rem;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Slot is free and available!</span>
        </div>
      `;
    }
  },

  /**
   * Validate Form and Open Review/Confirmation Step
   */
  handleBookFormReview(event) {
    if (event) event.preventDefault();

    const amenityId = document.getElementById("res-book-amenity-id")?.value;
    const date = document.getElementById("res-book-date")?.value;
    const startTime = document.getElementById("res-book-start-time")?.value;
    const endTime = document.getElementById("res-book-end-time")?.value;
    const attendees = parseInt(document.getElementById("res-book-attendees")?.value, 10) || 1;
    const purpose = document.getElementById("res-book-purpose")?.value.trim();

    const amn = this.state.amenities.find(a => a.id === amenityId);
    if (!amn) {
      if (typeof GrihamToast !== "undefined") GrihamToast.show("Please select an amenity.", "error");
      return;
    }

    if (!date) {
      if (typeof GrihamToast !== "undefined") GrihamToast.show("Please select a booking date.", "error");
      return;
    }

    if (!startTime || !endTime || startTime >= endTime) {
      if (typeof GrihamToast !== "undefined") GrihamToast.show("Please enter a valid start and end time.", "error");
      return;
    }

    if (!purpose) {
      if (typeof GrihamToast !== "undefined") GrihamToast.show("Please provide a purpose for the booking.", "error");
      return;
    }

    // Interval conflict check
    const conflict = this.state.bookings.find(b =>
      b.amenity_id === amenityId &&
      b.date === date &&
      (b.status === "Approved" || b.status === "Pending") &&
      (startTime < b.end_time && endTime > b.start_time)
    );

    if (conflict) {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(`Slot conflict with booking ${conflict.id} (${conflict.start_time} - ${conflict.end_time}).`, "error");
      } else {
        alert("Selected time slot is already booked.");
      }
      return;
    }

    this.state.pendingBookingForm = {
      amenity_id: amenityId,
      amenity_name: amn.name,
      date,
      start_time: startTime,
      end_time: endTime,
      people_count: attendees,
      purpose,
      requires_approval: amn.requires_approval
    };

    this.renderConfirmPreview(this.state.pendingBookingForm, amn);

    // Open confirm sheet
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-res-booking-confirm", "sheet-res-booking-confirm-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-booking-confirm");
      const backdrop = document.getElementById("sheet-res-booking-confirm-backdrop");
      if (sheet) sheet.classList.add("open", "active");
      if (backdrop) backdrop.classList.add("open", "active");
    }
  },

  closeConfirmSheet() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-res-booking-confirm", "sheet-res-booking-confirm-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-booking-confirm");
      const backdrop = document.getElementById("sheet-res-booking-confirm-backdrop");
      if (sheet) sheet.classList.remove("open", "active");
      if (backdrop) backdrop.classList.remove("open", "active");
    }
  },

  /**
   * Render Review Confirmation Preview Card
   */
  renderConfirmPreview(form, amn) {
    const cardEl = document.getElementById("res-booking-confirm-card");
    if (!cardEl) return;

    cardEl.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.65rem; margin-bottom:0.75rem;">
        <div class="res-catalog-card-icon" style="width:38px; height:38px; margin:0;" aria-hidden="true">
          ${this.getAmenityIconSvg(amn.icon)}
        </div>
        <div>
          <h4 style="font-size:0.95rem; font-weight:700; color:var(--text-primary); margin:0;">${form.amenity_name}</h4>
          <span style="font-size:0.72rem; color:var(--text-muted);">${amn.location}</span>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:0.45rem; background:rgba(255,255,255,0.04); border-radius:10px; padding:0.75rem; font-size:0.78rem;">
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Date:</span>
          <strong style="color:var(--text-primary);">${this.formatDateReadable(form.date)}</strong>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Reserved Slot:</span>
          <strong style="color:var(--text-primary);">${this.formatTime12h(form.start_time)} – ${this.formatTime12h(form.end_time)}</strong>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Guests:</span>
          <strong style="color:var(--text-primary);">${form.people_count} Attendees</strong>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Purpose:</span>
          <strong style="color:var(--text-primary); text-align:right; max-width:60%;">${form.purpose}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; border-top:1px solid var(--glass-border); padding-top:0.35rem; margin-top:0.15rem;">
          <span style="color:var(--text-muted);">Initial Status:</span>
          <strong style="color:${form.requires_approval ? '#f59e0b' : '#10b981'};">${form.requires_approval ? 'Pending Committee Approval' : 'Instant Auto-Approved'}</strong>
        </div>
      </div>
    `;
  },

  /**
   * Execute Booking Submission to API
   */
  async executeBookingSubmission() {
    if (!this.state.pendingBookingForm || this.state.isSubmitting) return;

    const btn = document.getElementById("btn-final-confirm-booking");
    const btnText = document.getElementById("btn-final-confirm-booking-text");

    this.state.isSubmitting = true;
    if (btn) btn.disabled = true;
    if (btnText) btnText.innerHTML = `<span class="res-spinner" aria-hidden="true"></span> Submitting...`;

    try {
      const createFn = (typeof createResidentBooking === "function")
        ? createResidentBooking
        : (window.GrihamAPI && window.GrihamAPI.createResidentBooking);

      if (!createFn) throw new Error("createResidentBooking API function not found");

      const res = await createFn(this.state.pendingBookingForm);
      const newBooking = res.booking;

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(`Amenity booking ${newBooking.id} created successfully!`, "success");
      }

      // Close sheets
      this.closeConfirmSheet();
      this.closeBookSheet();

      // Refresh data
      await this.loadData(true);

      // Switch to bookings tab and auto-open new booking detail
      this.switchMainTab("bookings");
      setTimeout(() => {
        this.openBookingDetail(newBooking.id);
      }, 300);

    } catch (err) {
      console.error("[Booking Submission Error]", err);
      const msg = err.message || "Failed to create booking. Please try again.";
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(msg, "error");
      } else {
        alert(msg);
      }
    } finally {
      this.state.isSubmitting = false;
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Confirm Booking";
    }
  },

  /**
   * Open Booking Detail Bottom Sheet
   */
  openBookingDetail(bookingId) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (!booking) return;
    this.state.selectedBooking = booking;

    const idBadge = document.getElementById("res-booking-detail-id-badge");
    const titleEl = document.getElementById("res-booking-detail-title");

    if (idBadge) idBadge.textContent = booking.id;
    if (titleEl) titleEl.textContent = booking.amenity_name;

    this.renderBookingDetailBody(booking);

    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-res-booking-detail", "sheet-res-booking-detail-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-booking-detail");
      const backdrop = document.getElementById("sheet-res-booking-detail-backdrop");
      if (sheet) sheet.classList.add("open", "active");
      if (backdrop) backdrop.classList.add("open", "active");
    }
  },

  closeBookingDetail() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-res-booking-detail", "sheet-res-booking-detail-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-booking-detail");
      const backdrop = document.getElementById("sheet-res-booking-detail-backdrop");
      if (sheet) sheet.classList.remove("open", "active");
      if (backdrop) backdrop.classList.remove("open", "active");
    }
  },

  /**
   * Render Booking Detail Body with Status Stepper
   */
  renderBookingDetailBody(b) {
    const bodyEl = document.getElementById("res-booking-detail-body");
    if (!bodyEl) return;

    const statusClass = (typeof GrihamStatusBadge !== "undefined")
      ? GrihamStatusBadge.getStatusClass(b.status)
      : (b.status === 'Approved' ? 'badge-approved' : 'badge-pending');

    const isCancelable = b.status === "Approved" || b.status === "Pending";

    bodyEl.innerHTML = `
      <div class="complaint-detail-header-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.4rem;">
          <div>
            <h2 style="font-size:1.05rem; font-weight:700; color:var(--text-primary); margin:0;">${b.amenity_name}</h2>
            <span style="font-size:0.75rem; color:var(--text-muted);">Booking #${b.id}</span>
          </div>
          <span class="status-badge ${statusClass}">${b.status}</span>
        </div>

        <div class="res-card-schedule-badge confirmed" style="width:100%; margin-top:0.4rem;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <strong>${this.formatDateReadable(b.date)} • ${this.formatTime12h(b.start_time)} – ${this.formatTime12h(b.end_time)}</strong>
        </div>
      </div>

      <!-- Booking Info Table -->
      <div class="complaint-detail-card">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; font-size:0.78rem;">
          <div>
            <span style="color:var(--text-muted); font-size:0.7rem; display:block;">Resident</span>
            <strong style="color:var(--text-primary);">${b.resident_name || 'Rajesh Kumar'} (Wing ${b.wing}-${b.flat})</strong>
          </div>
          <div>
            <span style="color:var(--text-muted); font-size:0.7rem; display:block;">Attendees</span>
            <strong style="color:var(--text-primary);">${b.people_count || 1} Guests</strong>
          </div>
        </div>
        <div style="margin-top:0.55rem; padding-top:0.55rem; border-top:1px solid var(--glass-border);">
          <span style="color:var(--text-muted); font-size:0.7rem; display:block;">Purpose</span>
          <p style="margin:0.2rem 0 0; font-size:0.8rem; color:var(--text-secondary); line-height:1.4;">
            ${b.purpose || 'Amenity booking'}
          </p>
        </div>
      </div>

      <!-- Status Progress Stepper -->
      <div class="complaint-detail-card">
        <h4 style="font-size:0.82rem; font-weight:700; color:var(--text-primary); margin:0 0 0.75rem;">Booking Progress</h4>
        ${this.renderBookingStepperHtml(b)}
      </div>

      ${b.cancel_reason ? `
        <div style="background:rgba(239, 68, 68, 0.1); border:1px solid rgba(239, 68, 68, 0.25); border-radius:10px; padding:0.65rem 0.8rem;">
          <strong style="font-size:0.75rem; color:#ef4444; display:block;">Cancellation Reason:</strong>
          <span style="font-size:0.74rem; color:var(--text-secondary);">${b.cancel_reason}</span>
        </div>
      ` : ''}

      ${b.rejection_reason ? `
        <div style="background:rgba(239, 68, 68, 0.1); border:1px solid rgba(239, 68, 68, 0.25); border-radius:10px; padding:0.65rem 0.8rem;">
          <strong style="font-size:0.75rem; color:#ef4444; display:block;">Rejection Notice:</strong>
          <span style="font-size:0.74rem; color:var(--text-secondary);">${b.rejection_reason}</span>
        </div>
      ` : ''}

      <!-- Cancel CTA if allowed -->
      ${isCancelable ? `
        <button type="button" class="btn-cancel-complaint-action" onclick="GrihamResidentAmenitiesUI.openCancelSheet()" style="min-height:44px; margin-top:0.4rem;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <span>Cancel This Booking</span>
        </button>
      ` : ''}
    `;
  },

  /**
   * Render Booking Progress Stepper
   */
  renderBookingStepperHtml(b) {
    const status = (b.status || "").toLowerCase();

    if (status === "cancelled") {
      return `
        <div class="res-stepper-row">
          <div class="res-step-item done">
            <div class="res-step-circle">✓</div>
            <span class="res-step-label">Submitted</span>
          </div>
          <div class="res-step-line done"></div>
          <div class="res-step-item cancelled">
            <div class="res-step-circle" style="background:#ef4444; border-color:#ef4444; color:#fff;">✕</div>
            <span class="res-step-label" style="color:#ef4444;">Cancelled</span>
          </div>
        </div>
      `;
    }

    if (status === "rejected") {
      return `
        <div class="res-stepper-row">
          <div class="res-step-item done">
            <div class="res-step-circle">✓</div>
            <span class="res-step-label">Submitted</span>
          </div>
          <div class="res-step-line done"></div>
          <div class="res-step-item cancelled">
            <div class="res-step-circle" style="background:#ef4444; border-color:#ef4444; color:#fff;">✕</div>
            <span class="res-step-label" style="color:#ef4444;">Rejected</span>
          </div>
        </div>
      `;
    }

    const isPending = status === "pending";
    const isApproved = status === "approved" || status === "confirmed";
    const isCompleted = status === "completed";

    return `
      <div class="res-stepper-row">
        <div class="res-step-item done">
          <div class="res-step-circle">✓</div>
          <span class="res-step-label">Requested</span>
        </div>
        <div class="res-step-line ${isApproved || isCompleted ? 'done' : (isPending ? 'active' : '')}"></div>
        <div class="res-step-item ${isApproved || isCompleted ? 'done' : (isPending ? 'active' : '')}">
          <div class="res-step-circle">${isApproved || isCompleted ? '✓' : '2'}</div>
          <span class="res-step-label">${isPending ? 'Awaiting Approval' : 'Confirmed'}</span>
        </div>
        <div class="res-step-line ${isCompleted ? 'done' : ''}"></div>
        <div class="res-step-item ${isCompleted ? 'done' : ''}">
          <div class="res-step-circle">${isCompleted ? '✓' : '3'}</div>
          <span class="res-step-label">Completed</span>
        </div>
      </div>
    `;
  },

  /**
   * Open Cancel Booking Sheet
   */
  openCancelSheet() {
    if (!this.state.selectedBooking) return;
    const reasonInput = document.getElementById("res-booking-cancel-reason");
    if (reasonInput) reasonInput.value = "";

    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-res-booking-cancel", "sheet-res-booking-cancel-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-booking-cancel");
      const backdrop = document.getElementById("sheet-res-booking-cancel-backdrop");
      if (sheet) sheet.classList.add("open", "active");
      if (backdrop) backdrop.classList.add("open", "active");
    }
  },

  closeCancelSheet() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-res-booking-cancel", "sheet-res-booking-cancel-backdrop");
    } else {
      const sheet = document.getElementById("sheet-res-booking-cancel");
      const backdrop = document.getElementById("sheet-res-booking-cancel-backdrop");
      if (sheet) sheet.classList.remove("open", "active");
      if (backdrop) backdrop.classList.remove("open", "active");
    }
  },

  /**
   * Execute Cancel Booking via API
   */
  async executeCancelBooking() {
    if (!this.state.selectedBooking) return;
    const bookingId = this.state.selectedBooking.id;
    const reasonInput = document.getElementById("res-booking-cancel-reason");
    const reason = reasonInput ? reasonInput.value.trim() : "";

    const btn = document.getElementById("btn-confirm-res-booking-cancel");
    if (btn) btn.disabled = true;

    try {
      const cancelFn = (typeof cancelResidentBooking === "function")
        ? cancelResidentBooking
        : (window.GrihamAPI && window.GrihamAPI.cancelResidentBooking);

      if (!cancelFn) throw new Error("cancelResidentBooking API function not found");

      await cancelFn(bookingId, reason);

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(`Booking ${bookingId} has been cancelled.`, "info");
      }

      this.closeCancelSheet();

      // Reload data and refresh detail sheet
      await this.loadData(true);
      this.openBookingDetail(bookingId);

    } catch (err) {
      console.error("[Booking Cancellation Error]", err);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Unable to cancel booking. Please try again.", "error");
      }
    } finally {
      if (btn) btn.disabled = false;
    }
  },

  /**
   * Utility: Format 24h string "08:00" to "8:00 AM"
   */
  formatTime12h(timeStr) {
    if (!timeStr) return "";
    const [hStr, mStr] = timeStr.split(":");
    let h = parseInt(hStr, 10);
    const m = mStr || "00";
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  },

  /**
   * Utility: Format Date string "2026-09-22" to "22 Sep 2026"
   */
  formatDateReadable(dateStr) {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    } catch (_) {
      return dateStr;
    }
  },

  /**
   * SVG Icon Resolver
   */
  getAmenityIconSvg(icon) {
    switch (icon) {
      case "hall":
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
      case "pool":
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20M2 16h20M2 20h20"/><circle cx="12" cy="5" r="3"/></svg>`;
      case "gym":
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 5v14M18 5v14M2 9h4M2 15h4M18 9h4M18 15h4M6 12h12"/></svg>`;
      case "court":
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="21"/></svg>`;
      case "gazebo":
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 9h20L12 2z"/><line x1="4" y1="9" x2="4" y2="22"/><line x1="20" y1="9" x2="20" y2="22"/><line x1="12" y1="9" x2="12" y2="22"/></svg>`;
      case "theatre":
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`;
      default:
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    }
  }
};
