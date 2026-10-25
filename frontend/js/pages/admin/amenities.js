
/* HTML TEMPLATE EXTRACTED FROM index.html */
window.HTML_AMENITIES = `
<section id="screen-admin-amenities" class="app-view" aria-labelledby="admin-amenities-header-title">
        
        <!-- Top Sticky Header -->
        <div class="screen-top-bar screen-top-bar-sticky">
          ${GrihamHeader.renderBackButton({
            target: '/admin/home',
            ariaLabel: 'Back to Admin Dashboard'
          })}
          <div class="top-bar-center-title" id="admin-amenities-header-title">Amenities</div>
          <button type="button" class="btn-top-action-pill" id="btn-add-amenity-top" onclick="GrihamAdminAmenitiesUI.openAddSheet()" aria-label="Add Amenity">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add</span>
          </button>
        </div>

        <!-- Top Overview Summary Cards -->
        <div class="amenities-overview-section">
          <div class="amenity-overview-header">
            <span class="amenity-overview-title">Amenity Overview</span>
            <button type="button" class="btn-amenity-direct-booking-top" onclick="GrihamAdminAmenitiesUI.openDirectBookingSheet()" aria-label="Create direct booking">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Direct Booking</span>
            </button>
          </div>

          <div class="amenities-stats-grid">
            <div class="amenity-stat-pill pill-total">
              <span class="amenity-stat-val" id="stat-amenities-total">6</span>
              <span class="amenity-stat-lbl">Total Amenities</span>
            </div>
            <div class="amenity-stat-pill pill-avail">
              <span class="amenity-stat-val" id="stat-amenities-available">4</span>
              <span class="amenity-stat-lbl">Available Now</span>
            </div>
            <div class="amenity-stat-pill pill-today">
              <span class="amenity-stat-val" id="stat-amenities-today">8</span>
              <span class="amenity-stat-lbl">Today's Bookings</span>
            </div>
            <div class="amenity-stat-pill pill-pending">
              <span class="amenity-stat-val" id="stat-amenities-pending">2</span>
              <span class="amenity-stat-lbl">Pending Approval</span>
            </div>
          </div>
        </div>

        <!-- Main View Switcher: Amenities List vs. Calendar/Bookings -->
        <div class="amenities-tab-switcher" role="tablist" aria-label="Amenity Views">
          <button type="button" class="amenities-tab-btn active" id="tab-btn-amenities" role="tab" aria-selected="true" onclick="GrihamAdminAmenitiesUI.switchMainTab('amenities')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Amenities</span>
          </button>
          <button type="button" class="amenities-tab-btn" id="tab-btn-calendar" role="tab" aria-selected="false" onclick="GrihamAdminAmenitiesUI.switchMainTab('calendar')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Calendar & Bookings</span>
            <span class="pending-bubble-badge" id="tab-calendar-pending-badge" style="display:none;">0</span>
          </button>
        </div>

        <!-- ================= SUB-VIEW 1: AMENITIES LIST ================= -->
        <div id="subview-amenities-list" class="amenities-subview-panel">
          <!-- Search Box -->
          <div class="amenity-search-bar">
            <div class="input-wrapper input-with-leading-icon">
              <svg class="input-leading-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                id="amenity-search-input"
                class="form-input amenity-search-input"
                placeholder="Search amenities..."
                oninput="GrihamAdminAmenitiesUI.handleAmenitySearch(this.value)"
                aria-label="Search amenities by name, location, or type"
              >
              <button type="button" class="btn-search-clear" id="btn-amenity-search-clear" onclick="GrihamAdminAmenitiesUI.clearAmenitySearch()" style="display:none;" aria-label="Clear amenity search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>

          <!-- Status Filter Chips -->
          <div class="amenity-filter-chips-bar" role="group" aria-label="Amenity status filters">
            <button type="button" class="amenity-filter-chip active" data-filter="all" onclick="GrihamAdminAmenitiesUI.setAmenityFilter('all')">All</button>
            <button type="button" class="amenity-filter-chip" data-filter="Available" onclick="GrihamAdminAmenitiesUI.setAmenityFilter('Available')">Available</button>
            <button type="button" class="amenity-filter-chip" data-filter="Booked" onclick="GrihamAdminAmenitiesUI.setAmenityFilter('Booked')">Booked</button>
            <button type="button" class="amenity-filter-chip" data-filter="Maintenance" onclick="GrihamAdminAmenitiesUI.setAmenityFilter('Maintenance')">Maintenance</button>
            <button type="button" class="amenity-filter-chip" data-filter="Disabled" onclick="GrihamAdminAmenitiesUI.setAmenityFilter('Disabled')">Disabled</button>
          </div>

          <!-- Loading State -->
          <div id="amenities-loading-state" class="dash-loading-state" style="display:none;">
            <div class="spinner"></div>
            <p>Loading amenities...</p>
          </div>

          <!-- Error State -->
          <div id="amenities-error-state" class="dash-error-state" style="display:none;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div class="dash-error-title">Unable to load amenities.</div>
            <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminAmenitiesUI.loadAmenities()" style="min-height:38px; margin-top:0.5rem;">
              <span>Retry</span>
            </button>
          </div>

          <!-- Empty State -->
          <div id="amenities-empty-state" class="dash-error-state" style="display:none;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
            </svg>
            <div class="dash-error-title" id="amenities-empty-title">No amenities configured.</div>
            <p style="color:var(--text-muted); font-size:0.82rem; margin-top:0.3rem;" id="amenities-empty-desc">Create your society's first amenity to start accepting bookings.</p>
            <button type="button" class="btn-primary-action btn-admin-style" id="btn-amenity-empty-action" onclick="GrihamAdminAmenitiesUI.openAddSheet()" style="min-height:38px; margin-top:0.6rem;">
              <span>+ Add Amenity</span>
            </button>
          </div>

          <!-- Amenities Cards List -->
          <div id="amenities-cards-container" class="amenities-cards-container">
            <!-- Dynamically populated by JS -->
          </div>
        </div>

        <!-- ================= SUB-VIEW 2: CALENDAR & BOOKINGS ================= -->
        <div id="subview-amenities-calendar" class="amenities-subview-panel" style="display:none;">
          <!-- Calendar Quick Date Bar (Today, Tomorrow, This Week + Date Picker) -->
          <div class="calendar-date-nav-card">
            <div class="calendar-quick-filters" role="group" aria-label="Date selector">
              <button type="button" class="btn-quick-date active" data-date="today" onclick="GrihamAdminAmenitiesUI.selectQuickDate('today')">Today</button>
              <button type="button" class="btn-quick-date" data-date="tomorrow" onclick="GrihamAdminAmenitiesUI.selectQuickDate('tomorrow')">Tomorrow</button>
              <button type="button" class="btn-quick-date" data-date="week" onclick="GrihamAdminAmenitiesUI.selectQuickDate('week')">This Week</button>
            </div>

            <div class="calendar-date-picker-row">
              <div class="date-picker-label">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span id="calendar-selected-date-formatted">17 September 2026</span>
              </div>
              <input type="date" id="calendar-native-date-input" class="calendar-native-input" value="2026-09-17" onchange="GrihamAdminAmenitiesUI.handleCustomDateChange(this.value)" aria-label="Select custom date">
            </div>
          </div>

          <!-- Amenity Filter for Bookings -->
          <div class="booking-amenity-filter-row">
            <label for="booking-filter-amenity-select" class="form-label-inline">Amenity:</label>
            <select id="booking-filter-amenity-select" class="form-input form-select-sm" onchange="GrihamAdminAmenitiesUI.handleBookingAmenityFilter(this.value)" aria-label="Filter bookings by amenity">
              <option value="all">All Amenities</option>
              <!-- Populated dynamically -->
            </select>
          </div>

          <!-- Potential Overlap / Conflict Warning Banner (if any found in list) -->
          <div id="calendar-conflict-alert-banner" class="booking-overlap-warning-banner" style="display:none;">
            <div class="overlap-banner-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div class="overlap-banner-content">
              <strong>Potential Schedule Overlap Detected</strong>
              <p id="calendar-conflict-banner-msg">Two bookings overlap in time for this amenity.</p>
            </div>
          </div>

          <!-- Bookings Loading State -->
          <div id="bookings-loading-state" class="dash-loading-state" style="display:none;">
            <div class="spinner"></div>
            <p>Loading bookings...</p>
          </div>

          <!-- Bookings Error State -->
          <div id="bookings-error-state" class="dash-error-state" style="display:none;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div class="dash-error-title">Unable to load bookings.</div>
            <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminAmenitiesUI.loadBookings()" style="min-height:38px; margin-top:0.5rem;">
              <span>Retry</span>
            </button>
          </div>

          <!-- Bookings Empty State -->
          <div id="bookings-empty-state" class="dash-error-state" style="display:none;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
            </svg>
            <div class="dash-error-title">No bookings for this date.</div>
            <p style="color:var(--text-muted); font-size:0.82rem; margin-top:0.3rem;">There are no resident bookings scheduled on this date.</p>
            <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminAmenitiesUI.openDirectBookingSheet()" style="min-height:38px; margin-top:0.6rem;">
              <span>+ Create Direct Booking</span>
            </button>
          </div>

          <!-- Chronological Bookings Schedule List -->
          <div id="calendar-bookings-list" class="calendar-bookings-list">
            <!-- Dynamically populated with chronological schedule -->
          </div>
        </div>

      </section>
`;
const GrihamAdminAmenitiesUI = {
  state: {
    amenities: [],
    bookings: [],
    residents: [],
    summary: {
      total: 0,
      available_now: 0,
      today_bookings: 0,
      pending_approval: 0
    },
    activeTab: "amenities", // "amenities" | "calendar"
    amenityFilter: "all",
    searchQuery: "",
    selectedDate: "2026-09-17",
    selectedAmenityForBookings: "all",
    currentAmenity: null,
    currentBooking: null,
    isEditMode: false,
    selectedResidentForDirect: null
  },

  async init() {
    this.resetFormState();
    await this.loadAmenities();
    await this.loadBookings();
  },

  resetFormState() {
    this.state.searchQuery = "";
    const searchInput = document.getElementById("amenity-search-input");
    if (searchInput) searchInput.value = "";
    const clearBtn = document.getElementById("btn-amenity-search-clear");
    if (clearBtn) clearBtn.style.display = "none";
  },

  /* ---------------- TAB NAVIGATION ---------------- */
  switchMainTab(tab) {
    this.state.activeTab = tab;
    const tabAmn = document.getElementById("tab-btn-amenities");
    const tabCal = document.getElementById("tab-btn-calendar");
    const viewAmn = document.getElementById("subview-amenities-list");
    const viewCal = document.getElementById("subview-amenities-calendar");

    if (typeof GrihamTabs !== "undefined") {
      GrihamTabs.activate(".amenities-tab-row", `tab-btn-${tab}`);
    } else {
      if (tab === "amenities") {
        if (tabAmn) { tabAmn.classList.add("active"); tabAmn.setAttribute("aria-selected", "true"); }
        if (tabCal) { tabCal.classList.remove("active"); tabCal.setAttribute("aria-selected", "false"); }
      } else {
        if (tabCal) { tabCal.classList.add("active"); tabCal.setAttribute("aria-selected", "true"); }
        if (tabAmn) { tabAmn.classList.remove("active"); tabAmn.setAttribute("aria-selected", "false"); }
      }
    }

    if (tab === "amenities") {
      if (viewAmn) viewAmn.style.display = "block";
      if (viewCal) viewCal.style.display = "none";
    } else {
      if (viewCal) viewCal.style.display = "block";
      if (viewAmn) viewAmn.style.display = "none";
      this.renderBookingsView();
    }
  },

  /* ---------------- DATA LOADING ---------------- */
  async loadAmenities() {
    const loadingEl = document.getElementById("amenities-loading-state");
    const errorEl = document.getElementById("amenities-error-state");
    const emptyEl = document.getElementById("amenities-empty-state");
    const cardsContainer = document.getElementById("amenities-cards-container");

    if (loadingEl) loadingEl.style.display = "flex";
    if (errorEl) errorEl.style.display = "none";
    if (emptyEl) emptyEl.style.display = "none";

    try {
      const res = await getAmenities();
      this.state.amenities = res.amenities || [];
      if (res.summary) {
        this.state.summary = res.summary;
        this.updateOverviewStats();
      }
      this.renderAmenitiesList();
      this.populateAmenityDropdowns();
    } catch (err) {
      console.error("Failed to load amenities:", err);
      if (errorEl) errorEl.style.display = "flex";
      if (cardsContainer) cardsContainer.innerHTML = "";
    } finally {
      if (loadingEl) loadingEl.style.display = "none";
    }
  },

  async loadBookings() {
    const loadingEl = document.getElementById("bookings-loading-state");
    const errorEl = document.getElementById("bookings-error-state");

    if (loadingEl) loadingEl.style.display = "flex";
    if (errorEl) errorEl.style.display = "none";

    try {
      const res = await getAmenityBookings({
        date: this.state.selectedDate,
        amenity_id: this.state.selectedAmenityForBookings
      });
      this.state.bookings = res.bookings || [];
      if (res.residents) {
        this.state.residents = res.residents;
      }
      this.renderBookingsView();
      this.updatePendingBadges();
    } catch (err) {
      console.error("Failed to load bookings:", err);
      if (errorEl) errorEl.style.display = "flex";
    } finally {
      if (loadingEl) loadingEl.style.display = "none";
    }
  },

  updateOverviewStats() {
    const s = this.state.summary;
    const totalEl = document.getElementById("stat-amenities-total");
    const availEl = document.getElementById("stat-amenities-available");
    const todayEl = document.getElementById("stat-amenities-today");
    const pendingEl = document.getElementById("stat-amenities-pending");

    if (totalEl) totalEl.textContent = s.total ?? this.state.amenities.length;
    if (availEl) availEl.textContent = s.available_now ?? this.state.amenities.filter(a => a.status === "Available").length;
    if (todayEl) todayEl.textContent = s.today_bookings ?? 0;
    if (pendingEl) pendingEl.textContent = s.pending_approval ?? 0;
  },

  updatePendingBadges() {
    const pendingCount = this.state.bookings.filter(b => b.status === "Pending").length;
    const badgeEl = document.getElementById("tab-calendar-pending-badge");
    if (badgeEl) {
      if (pendingCount > 0) {
        badgeEl.textContent = pendingCount;
        badgeEl.style.display = "inline-flex";
      } else {
        badgeEl.style.display = "none";
      }
    }
  },

  populateAmenityDropdowns() {
    // 1. Filter dropdown in calendar view
    const filterSelect = document.getElementById("booking-filter-amenity-select");
    if (filterSelect) {
      const currentVal = filterSelect.value || "all";
      filterSelect.innerHTML = `<option value="all">All Amenities</option>` +
        this.state.amenities.map(a => `<option value="${a.id}">${a.name}</option>`).join("");
      filterSelect.value = currentVal;
    }

    // 2. Select dropdown in direct booking sheet
    const dbSelect = document.getElementById("db-select-amenity");
    if (dbSelect) {
      dbSelect.innerHTML = this.state.amenities
        .map(a => `<option value="${a.id}" ${a.status !== "Available" ? "disabled" : ""}>${a.name} (${a.status})</option>`)
        .join("");
    }
  },

  /* ---------------- AMENITY LIST RENDERING & FILTERS ---------------- */
  setAmenityFilter(filter) {
    this.state.amenityFilter = filter;
    document.querySelectorAll(".amenity-filter-chip").forEach(chip => {
      if (chip.getAttribute("data-filter") === filter) {
        chip.classList.add("active");
      } else {
        chip.classList.remove("active");
      }
    });
    this.renderAmenitiesList();
  },

  handleAmenitySearch(query) {
    this.state.searchQuery = (query || "").trim().toLowerCase();
    if (typeof GrihamSearchBar !== "undefined") {
      GrihamSearchBar.syncClearButton("amenity-search-input", "btn-amenity-search-clear");
    } else {
      const clearBtn = document.getElementById("btn-amenity-search-clear");
      if (clearBtn) clearBtn.style.display = this.state.searchQuery ? "inline-flex" : "none";
    }
    this.renderAmenitiesList();
  },

  clearAmenitySearch() {
    this.state.searchQuery = "";
    if (typeof GrihamSearchBar !== "undefined") {
      GrihamSearchBar.handleClear("amenity-search-input", "btn-amenity-search-clear", () => this.renderAmenitiesList());
    } else {
      const searchInput = document.getElementById("amenity-search-input");
      if (searchInput) searchInput.value = "";
      const clearBtn = document.getElementById("btn-amenity-search-clear");
      if (clearBtn) clearBtn.style.display = "none";
      this.renderAmenitiesList();
    }
  },

  getFilteredAmenities() {
    return this.state.amenities.filter(item => {
      // Status filter
      if (this.state.amenityFilter !== "all" && item.status !== this.state.amenityFilter) {
        return false;
      }
      // Search filter (name, description, location)
      if (this.state.searchQuery) {
        const text = `${item.name} ${item.description || ""} ${item.location || ""}`.toLowerCase();
        if (!text.includes(this.state.searchQuery)) return false;
      }
      return true;
    });
  },

  renderAmenitiesList() {
    const container = document.getElementById("amenities-cards-container");
    const emptyEl = document.getElementById("amenities-empty-state");
    const emptyTitle = document.getElementById("amenities-empty-title");
    const emptyDesc = document.getElementById("amenities-empty-desc");
    const emptyActionBtn = document.getElementById("btn-amenity-empty-action");

    if (!container) return;

    const filtered = this.getFilteredAmenities();

    if (filtered.length === 0) {
      container.innerHTML = "";
      if (emptyEl) emptyEl.style.display = "flex";
      if (this.state.searchQuery) {
        if (emptyTitle) emptyTitle.textContent = "No matching amenities found.";
        if (emptyDesc) emptyDesc.textContent = `No amenities match "${this.state.searchQuery}". Try a different keyword or filter.`;
        if (emptyActionBtn) emptyActionBtn.style.display = "none";
      } else if (this.state.amenityFilter !== "all") {
        if (emptyTitle) emptyTitle.textContent = `No amenities with status "${this.state.amenityFilter}".`;
        if (emptyDesc) emptyDesc.textContent = "Try switching the status filter chip to view other amenities.";
        if (emptyActionBtn) emptyActionBtn.style.display = "none";
      } else {
        if (emptyTitle) emptyTitle.textContent = "No amenities configured.";
        if (emptyDesc) emptyDesc.textContent = "Create your society's first amenity to start accepting bookings.";
        if (emptyActionBtn) emptyActionBtn.style.display = "inline-flex";
      }
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";

    container.innerHTML = filtered.map(amn => this.buildAmenityCardHtml(amn)).join("");
  },

  buildAmenityCardHtml(amn) {
    let statusClass = "tag-avail";
    let statusLabel = amn.status || "Available";

    if (amn.status === "Booked") statusClass = "tag-booked";
    else if (amn.status === "Maintenance") statusClass = "tag-maint";
    else if (amn.status === "Disabled") statusClass = "tag-disabled";

    const todayBookingsCount = amn.today_bookings_count !== undefined ? amn.today_bookings_count : 0;

    return `
      <div class="amenity-mobile-card" data-amenity-id="${amn.id}">
        <div class="amenity-card-header">
          <div class="amenity-title-wrap">
            <h3 class="amenity-card-name">${this.escapeHtml(amn.name)}</h3>
            <span class="amenity-status-tag ${statusClass}">${statusLabel}</span>
          </div>
          <button type="button" class="btn-amenity-view-pill" onclick="GrihamAdminAmenitiesUI.openDetailSheet('${amn.id}')" aria-label="View details for ${this.escapeHtml(amn.name)}">
            <span>View</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        ${amn.description ? `<p class="amenity-card-desc">${this.escapeHtml(amn.description)}</p>` : ""}

        <div class="amenity-card-meta-row">
          <div class="amenity-meta-item">
            <span class="meta-label">Capacity:</span>
            <strong class="meta-val">${amn.capacity} people</strong>
          </div>
          <div class="amenity-meta-item">
            <span class="meta-label">Today's Bookings:</span>
            <strong class="meta-val">${todayBookingsCount}</strong>
          </div>
        </div>

        <div class="amenity-card-timing-strip">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>Timing: ${this.formatTime12h(amn.opening_time)} – ${this.formatTime12h(amn.closing_time)} • Max ${amn.booking_duration}h</span>
        </div>
      </div>
    `;
  },

  /* ---------------- CALENDAR & BOOKINGS VIEW ---------------- */
  selectQuickDate(type) {
    document.querySelectorAll(".btn-quick-date").forEach(b => {
      if (b.getAttribute("data-date") === type) b.classList.add("active");
      else b.classList.remove("active");
    });

    const baseDate = new Date(2026, 8, 17); // Fixed mock society date 17 Sep 2026
    if (type === "today") {
      this.state.selectedDate = "2026-09-17";
    } else if (type === "tomorrow") {
      const t = new Date(baseDate);
      t.setDate(t.getDate() + 1);
      this.state.selectedDate = t.toISOString().split("T")[0];
    } else if (type === "week") {
      // Select today for schedule view
      this.state.selectedDate = "2026-09-17";
    }

    const nativeInput = document.getElementById("calendar-native-date-input");
    if (nativeInput) nativeInput.value = this.state.selectedDate;

    this.updateCalendarDateHeader();
    this.loadBookings();
  },

  handleCustomDateChange(val) {
    if (!val) return;
    this.state.selectedDate = val;
    document.querySelectorAll(".btn-quick-date").forEach(b => b.classList.remove("active"));
    this.updateCalendarDateHeader();
    this.loadBookings();
  },

  updateCalendarDateHeader() {
    const headerDate = document.getElementById("calendar-selected-date-formatted");
    if (headerDate && this.state.selectedDate) {
      headerDate.textContent = GrihamDateTime.formatDate(this.state.selectedDate, "long");
    }
  },

  handleBookingAmenityFilter(amenityId) {
    this.state.selectedAmenityForBookings = amenityId;
    this.loadBookings();
  },

  renderBookingsView() {
    const listEl = document.getElementById("calendar-bookings-list");
    const emptyEl = document.getElementById("bookings-empty-state");
    const conflictBanner = document.getElementById("calendar-conflict-alert-banner");
    const conflictBannerMsg = document.getElementById("calendar-conflict-banner-msg");

    if (!listEl) return;

    let bookings = [...this.state.bookings];

    if (this.state.selectedAmenityForBookings && this.state.selectedAmenityForBookings !== "all") {
      bookings = bookings.filter(b => b.amenity_id === this.state.selectedAmenityForBookings);
    }

    if (bookings.length === 0) {
      listEl.innerHTML = "";
      if (emptyEl) emptyEl.style.display = "flex";
      if (conflictBanner) conflictBanner.style.display = "none";
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";

    // Detect Potential Interval Overlaps in currently shown bookings
    // Conflict rule: newStart < existingEnd && newEnd > existingStart
    let overlapsFound = [];
    const activeOnly = bookings.filter(b => b.status === "Approved" || b.status === "Pending");

    for (let i = 0; i < activeOnly.length; i++) {
      for (let j = i + 1; j < activeOnly.length; j++) {
        const b1 = activeOnly[i];
        const b2 = activeOnly[j];
        if (b1.amenity_id === b2.amenity_id && b1.date === b2.date) {
          if (b1.start_time < b2.end_time && b1.end_time > b2.start_time) {
            overlapsFound.push({ b1, b2 });
          }
        }
      }
    }

    if (conflictBanner) {
      if (overlapsFound.length > 0) {
        const overlap = overlapsFound[0];
        conflictBanner.style.display = "flex";
        if (conflictBannerMsg) {
          conflictBannerMsg.textContent = `${overlap.b1.amenity_name}: ${this.formatTime12h(overlap.b1.start_time)}–${this.formatTime12h(overlap.b1.end_time)} (${overlap.b1.resident_name}) overlaps with ${this.formatTime12h(overlap.b2.start_time)}–${this.formatTime12h(overlap.b2.end_time)} (${overlap.b2.resident_name}).`;
        }
      } else {
        conflictBanner.style.display = "none";
      }
    }

    listEl.innerHTML = bookings.map(b => this.buildBookingCardHtml(b, overlapsFound)).join("");
  },

  buildBookingCardHtml(bkg, overlaps) {
    const isOverlapping = overlaps.some(o => o.b1.id === bkg.id || o.b2.id === bkg.id);

    let statusClass = "bkg-approved";
    if (bkg.status === "Pending") statusClass = "bkg-pending";
    else if (bkg.status === "Rejected") statusClass = "bkg-rejected";
    else if (bkg.status === "Cancelled") statusClass = "bkg-cancelled";
    else if (bkg.status === "Completed") statusClass = "bkg-completed";

    return `
      <div class="calendar-booking-card ${isOverlapping ? 'has-overlap-warning' : ''}" onclick="GrihamAdminAmenitiesUI.openBookingDetailSheet('${bkg.id}')" role="button" tabindex="0" aria-label="Booking ${bkg.id} for ${this.escapeHtml(bkg.amenity_name)}">
        <div class="booking-card-time-col">
          <span class="booking-time-start">${this.formatTime12h(bkg.start_time)}</span>
          <span class="booking-time-divider">↓</span>
          <span class="booking-time-end">${this.formatTime12h(bkg.end_time)}</span>
        </div>

        <div class="booking-card-main-col">
          <div class="booking-card-top-row">
            <span class="booking-amenity-badge">${this.escapeHtml(bkg.amenity_name)}</span>
            <span class="booking-status-badge ${statusClass}">${bkg.status}</span>
          </div>

          <div class="booking-resident-line">
            <strong class="booking-res-name">${this.escapeHtml(bkg.resident_name)}</strong>
            <span class="booking-flat-tag">Flat ${bkg.wing}-${bkg.flat}</span>
          </div>

          ${bkg.purpose ? `<p class="booking-purpose-snippet">${this.escapeHtml(bkg.purpose)}</p>` : ""}

          ${isOverlapping ? `
            <div class="overlap-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>Potential Overlap</span>
            </div>
          ` : ""}
        </div>

        <div class="booking-card-arrow" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    `;
  },

  /* ---------------- AMENITY DETAIL SHEET ---------------- */
  openDetailSheet(amenityId) {
    const amn = this.state.amenities.find(a => a.id === amenityId);
    if (!amn) return;

    this.state.currentAmenity = amn;

    const titleEl = document.getElementById("amn-sheet-name");
    const nameEl = document.getElementById("amn-detail-name");
    const statusEl = document.getElementById("amn-detail-status-badge");
    const descEl = document.getElementById("amn-detail-description");
    const locEl = document.getElementById("amn-detail-location");
    const capEl = document.getElementById("amn-detail-capacity");
    const timeEl = document.getElementById("amn-detail-timing");
    const durEl = document.getElementById("amn-detail-duration");
    const advEl = document.getElementById("amn-detail-advance");
    const appEl = document.getElementById("amn-detail-approval");
    const todayBkEl = document.getElementById("amn-detail-today-bookings");
    const rulesEl = document.getElementById("amn-detail-rules");
    const blockedNotice = document.getElementById("amn-detail-blocked-notice");
    const blockedReason = document.getElementById("amn-detail-blocked-reason");
    const blockBtnText = document.getElementById("btn-amenity-block-text");

    if (titleEl) titleEl.textContent = amn.name;
    if (nameEl) nameEl.textContent = amn.name;
    if (descEl) descEl.textContent = amn.description || "No description provided.";
    if (locEl) locEl.textContent = amn.location || "Society Grounds";
    if (capEl) capEl.textContent = `${amn.capacity} people`;
    if (timeEl) timeEl.textContent = `${this.formatTime12h(amn.opening_time)} – ${this.formatTime12h(amn.closing_time)}`;
    if (durEl) durEl.textContent = `${amn.booking_duration} hours max`;
    if (advEl) advEl.textContent = `${amn.advance_booking_days || 14} days`;
    if (appEl) appEl.textContent = amn.requires_approval ? "Yes (Admin approval required)" : "No (Instant approval)";
    if (todayBkEl) todayBkEl.textContent = `${amn.today_bookings_count || 0} bookings today`;
    if (rulesEl) rulesEl.textContent = amn.rules || "Standard society amenity rules and quiet hours apply.";

    if (statusEl) {
      statusEl.className = "amenity-status-tag " + 
        (amn.status === "Available" ? "tag-avail" : 
         amn.status === "Booked" ? "tag-booked" : 
         amn.status === "Maintenance" ? "tag-maint" : "tag-disabled");
      statusEl.textContent = amn.status;
    }

    if (blockedNotice) {
      if (amn.status === "Maintenance" || amn.status === "Disabled") {
        blockedNotice.style.display = "flex";
        if (blockedReason) blockedReason.textContent = amn.blocked_reason || "Maintenance scheduled by society committee.";
      } else {
        blockedNotice.style.display = "none";
      }
    }

    if (blockBtnText) {
      blockBtnText.textContent = (amn.status === "Maintenance" || amn.status === "Disabled") ? "Unblock Amenity" : "Block Amenity";
    }

    this.toggleSheet("amenity-detail-sheet", "amenity-detail-backdrop", true);
  },

  closeDetailSheet() {
    this.toggleSheet("amenity-detail-sheet", "amenity-detail-backdrop", false);
  },

  actionViewCalendarForAmenity() {
    if (!this.state.currentAmenity) return;
    const amenityId = this.state.currentAmenity.id;
    this.closeDetailSheet();
    this.switchMainTab("calendar");
    const filterSelect = document.getElementById("booking-filter-amenity-select");
    if (filterSelect) {
      filterSelect.value = amenityId;
      this.handleBookingAmenityFilter(amenityId);
    }
  },

  actionDirectBookingForAmenity() {
    if (!this.state.currentAmenity) return;
    const amenityId = this.state.currentAmenity.id;
    this.closeDetailSheet();
    this.openDirectBookingSheet(amenityId);
  },

  /* ---------------- ADD / EDIT AMENITY ---------------- */
  openAddSheet() {
    this.state.isEditMode = false;
    const titleEl = document.getElementById("amenity-form-title");
    const submitBtn = document.getElementById("btn-save-amenity-text");
    const errBox = document.getElementById("amn-form-error-msg");
    const form = document.getElementById("form-amenity-save");

    if (titleEl) titleEl.textContent = "Add Amenity";
    if (submitBtn) submitBtn.textContent = "Add Amenity";
    if (errBox) { errBox.style.display = "none"; errBox.textContent = ""; }
    if (form) form.reset();

    // Set sensible defaults
    document.getElementById("amn-form-capacity").value = "20";
    document.getElementById("amn-form-opening").value = "08:00";
    document.getElementById("amn-form-closing").value = "22:00";
    document.getElementById("amn-form-duration").value = "2";
    document.getElementById("amn-form-advance").value = "14";
    document.getElementById("amn-form-approval").value = "false";
    document.getElementById("amn-form-status").value = "Available";

    this.toggleSheet("amenity-form-sheet", "amenity-form-backdrop", true);
  },

  openEditSheet() {
    const amn = this.state.currentAmenity;
    if (!amn) return;

    this.state.isEditMode = true;
    const titleEl = document.getElementById("amenity-form-title");
    const submitBtn = document.getElementById("btn-save-amenity-text");
    const errBox = document.getElementById("amn-form-error-msg");

    if (titleEl) titleEl.textContent = "Edit Amenity";
    if (submitBtn) submitBtn.textContent = "Save Changes";
    if (errBox) { errBox.style.display = "none"; errBox.textContent = ""; }

    document.getElementById("amn-form-name").value = amn.name || "";
    document.getElementById("amn-form-desc").value = amn.description || "";
    document.getElementById("amn-form-location").value = amn.location || "";
    document.getElementById("amn-form-capacity").value = amn.capacity || "10";
    document.getElementById("amn-form-opening").value = amn.opening_time || "08:00";
    document.getElementById("amn-form-closing").value = amn.closing_time || "22:00";
    document.getElementById("amn-form-duration").value = amn.booking_duration || "2";
    document.getElementById("amn-form-advance").value = amn.advance_booking_days || "14";
    document.getElementById("amn-form-approval").value = amn.requires_approval ? "true" : "false";
    document.getElementById("amn-form-status").value = amn.status || "Available";
    document.getElementById("amn-form-rules").value = amn.rules || "";

    this.toggleSheet("amenity-form-sheet", "amenity-form-backdrop", true);
  },

  closeFormSheet() {
    this.toggleSheet("amenity-form-sheet", "amenity-form-backdrop", false);
  },

  async saveAmenityForm(event) {
    if (event) event.preventDefault();

    const name = document.getElementById("amn-form-name").value.trim();
    const desc = document.getElementById("amn-form-desc").value.trim();
    const location = document.getElementById("amn-form-location").value.trim();
    const capacity = parseInt(document.getElementById("amn-form-capacity").value, 10);
    const opening = document.getElementById("amn-form-opening").value;
    const closing = document.getElementById("amn-form-closing").value;
    const duration = parseFloat(document.getElementById("amn-form-duration").value);
    const advance = parseInt(document.getElementById("amn-form-advance").value, 10);
    const requiresApproval = document.getElementById("amn-form-approval").value === "true";
    const status = document.getElementById("amn-form-status").value;
    const rules = document.getElementById("amn-form-rules").value.trim();

    const errBox = document.getElementById("amn-form-error-msg");

    // Validation
    if (!name) {
      this.showFormError("Amenity Name is required.");
      return;
    }
    if (isNaN(capacity) || capacity <= 0) {
      this.showFormError("Capacity must be greater than 0.");
      return;
    }
    if (!opening || !closing) {
      this.showFormError("Opening and closing times are required.");
      return;
    }
    if (opening >= closing) {
      this.showFormError("Closing time must be later than opening time.");
      return;
    }
    if (isNaN(duration) || duration <= 0) {
      this.showFormError("Booking duration must be greater than 0 hours.");
      return;
    }

    const payload = {
      name,
      description: desc,
      location,
      capacity,
      opening_time: opening,
      closing_time: closing,
      booking_duration: duration,
      advance_booking_days: advance || 14,
      requires_approval: requiresApproval,
      status,
      rules
    };

    const submitBtn = document.getElementById("btn-save-amenity-text");
    if (submitBtn) submitBtn.textContent = "Saving...";

    try {
      if (this.state.isEditMode && this.state.currentAmenity) {
        await updateAmenity(this.state.currentAmenity.id, payload);
      } else {
        await createAmenity(payload);
      }
      this.closeFormSheet();
      this.closeDetailSheet();
      await this.loadAmenities();
    } catch (err) {
      console.error("Failed to save amenity:", err);
      this.showFormError(err.message || "Failed to save amenity.");
    } finally {
      if (submitBtn) submitBtn.textContent = this.state.isEditMode ? "Save Changes" : "Add Amenity";
    }
  },

  showFormError(msg) {
    const errBox = document.getElementById("amn-form-error-msg");
    if (errBox) {
      errBox.textContent = msg;
      errBox.style.display = "block";
    }
  },

  /* ---------------- BLOCK / UNBLOCK AMENITY ---------------- */
  toggleBlockStatusForCurrent() {
    const amn = this.state.currentAmenity;
    if (!amn) return;

    if (amn.status === "Maintenance" || amn.status === "Disabled") {
      this.openUnblockSheet();
    } else {
      this.openBlockSheet();
    }
  },

  openBlockSheet() {
    const amn = this.state.currentAmenity;
    if (!amn) return;

    const nameEl = document.getElementById("block-amenity-target-name");
    if (nameEl) nameEl.textContent = amn.name;

    document.getElementById("block-start-date").value = "2026-09-17";
    document.getElementById("block-end-date").value = "2026-09-18";
    document.getElementById("block-optional-note").value = "";

    this.toggleSheet("amenity-block-sheet", "amenity-block-backdrop", true);
  },

  closeBlockSheet() {
    this.toggleSheet("amenity-block-sheet", "amenity-block-backdrop", false);
  },

  async submitBlockAmenity(event) {
    if (event) event.preventDefault();

    const amn = this.state.currentAmenity;
    if (!amn) return;

    const reason = document.getElementById("block-reason-select").value;
    const startDate = document.getElementById("block-start-date").value;
    const endDate = document.getElementById("block-end-date").value;
    const note = document.getElementById("block-optional-note").value.trim();

    const submitBtn = document.getElementById("btn-submit-block-text");
    if (submitBtn) submitBtn.textContent = "Blocking...";

    try {
      await setAmenityStatus(amn.id, {
        status: "Maintenance",
        reason: `${reason}: ${note || 'Scheduled maintenance'}`,
        start_date: startDate,
        end_date: endDate,
        note
      });
      this.closeBlockSheet();
      this.closeDetailSheet();
      await this.loadAmenities();
    } catch (err) {
      console.error("Failed to block amenity:", err);
    } finally {
      if (submitBtn) submitBtn.textContent = "Block Amenity";
    }
  },

  openUnblockSheet() {
    const amn = this.state.currentAmenity;
    if (!amn) return;

    const nameEl = document.getElementById("unblock-target-amenity-name");
    if (nameEl) nameEl.textContent = amn.name;

    this.toggleSheet("amenity-unblock-sheet", "amenity-unblock-backdrop", true);
  },

  closeUnblockSheet() {
    this.toggleSheet("amenity-unblock-sheet", "amenity-unblock-backdrop", false);
  },

  async confirmUnblock() {
    const amn = this.state.currentAmenity;
    if (!amn) return;

    try {
      await setAmenityStatus(amn.id, { status: "Available" });
      this.closeUnblockSheet();
      this.closeDetailSheet();
      await this.loadAmenities();
    } catch (err) {
      console.error("Failed to unblock amenity:", err);
    }
  },

  /* ---------------- BOOKING DETAIL SHEET & ACTIONS ---------------- */
  openBookingDetailSheet(bookingId) {
    const bkg = this.state.bookings.find(b => b.id === bookingId);
    if (!bkg) return;

    this.state.currentBooking = bkg;

    const idEl = document.getElementById("bkg-detail-id");
    const statusEl = document.getElementById("bkg-detail-status");
    const amnEl = document.getElementById("bkg-detail-amenity");
    const resNameEl = document.getElementById("bkg-detail-resident-name");
    const flatEl = document.getElementById("bkg-detail-flat-info");
    const avatarEl = document.getElementById("bkg-detail-avatar");
    const dateEl = document.getElementById("bkg-detail-date");
    const slotEl = document.getElementById("bkg-detail-slot");
    const peopleEl = document.getElementById("bkg-detail-people");
    const phoneEl = document.getElementById("bkg-detail-phone");
    const purposeEl = document.getElementById("bkg-detail-purpose");
    const reasonCallout = document.getElementById("bkg-detail-reason-callout");
    const reasonTitle = document.getElementById("bkg-detail-reason-title");
    const reasonText = document.getElementById("bkg-detail-reason-text");

    if (idEl) idEl.textContent = bkg.id;
    if (amnEl) amnEl.textContent = bkg.amenity_name;
    if (resNameEl) resNameEl.textContent = bkg.resident_name;
    if (flatEl) flatEl.textContent = `Wing ${bkg.wing} • Flat ${bkg.flat}`;
    if (avatarEl) {
      avatarEl.textContent = GrihamFormat.initials(bkg.resident_name, "RE");
    }
    if (dateEl) dateEl.textContent = bkg.date;
    if (slotEl) slotEl.textContent = `${this.formatTime12h(bkg.start_time)} – ${this.formatTime12h(bkg.end_time)}`;
    if (peopleEl) peopleEl.textContent = `${bkg.people_count || 1} guests`;
    if (phoneEl) phoneEl.textContent = bkg.phone || "+91 9876543210";
    if (purposeEl) purposeEl.textContent = bkg.purpose || "General facility booking";

    if (statusEl) {
      statusEl.className = "booking-status-tag " + 
        (bkg.status === "Approved" ? "bkg-approved" : 
         bkg.status === "Pending" ? "bkg-pending" : 
         bkg.status === "Rejected" ? "bkg-rejected" : 
         bkg.status === "Completed" ? "bkg-completed" : "bkg-cancelled");
      statusEl.textContent = bkg.status;
    }

    if (reasonCallout) {
      if (bkg.status === "Rejected" && bkg.rejection_reason) {
        reasonCallout.style.display = "block";
        if (reasonTitle) reasonTitle.textContent = "Rejection Reason:";
        if (reasonText) reasonText.textContent = bkg.rejection_reason;
      } else if (bkg.status === "Cancelled" && bkg.cancel_reason) {
        reasonCallout.style.display = "block";
        if (reasonTitle) reasonTitle.textContent = "Cancellation Reason:";
        if (reasonText) reasonText.textContent = bkg.cancel_reason;
      } else {
        reasonCallout.style.display = "none";
      }
    }

    this.renderBookingActionsRow(bkg);
    this.toggleSheet("booking-detail-sheet", "booking-detail-backdrop", true);
  },

  closeBookingDetailSheet() {
    this.toggleSheet("booking-detail-sheet", "booking-detail-backdrop", false);
  },

  renderBookingActionsRow(bkg) {
    const row = document.getElementById("bkg-actions-dynamic-row");
    if (!row) return;

    if (bkg.status === "Pending") {
      row.innerHTML = `
        <div class="booking-twin-actions">
          <button type="button" class="btn-primary-action btn-success-action" onclick="GrihamAdminAmenitiesUI.actionApproveBooking('${bkg.id}')" style="min-height:44px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Approve</span>
          </button>
          <button type="button" class="btn-primary-action btn-danger-action" onclick="GrihamAdminAmenitiesUI.openRejectSheet('${bkg.id}')" style="min-height:44px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            <span>Reject</span>
          </button>
        </div>
        <button type="button" class="btn-secondary-action" onclick="GrihamAdminAmenitiesUI.openCancelSheet('${bkg.id}')" style="min-height:42px;">
          <span>Cancel Booking</span>
        </button>
      `;
    } else if (bkg.status === "Approved") {
      row.innerHTML = `
        <div class="booking-twin-actions">
          <button type="button" class="btn-secondary-action" onclick="GrihamAdminAmenitiesUI.callResidentForBooking('${bkg.phone}')" style="min-height:44px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>Call Resident</span>
          </button>
          <button type="button" class="btn-primary-action btn-danger-action" onclick="GrihamAdminAmenitiesUI.openCancelSheet('${bkg.id}')" style="min-height:44px;">
            <span>Cancel Booking</span>
          </button>
        </div>
      `;
    } else {
      // Completed, Rejected, or Cancelled
      row.innerHTML = `
        <button type="button" class="btn-secondary-action" onclick="GrihamAdminAmenitiesUI.callResidentForBooking('${bkg.phone}')" style="min-height:44px;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <span>Call Resident</span>
        </button>
      `;
    }
  },

  async actionApproveBooking(bookingId) {
    try {
      await approveAmenityBooking(bookingId);
      this.closeBookingDetailSheet();
      await this.loadBookings();
      await this.loadAmenities();
    } catch (err) {
      console.error("Failed to approve booking:", err);
    }
  },

  callResidentForBooking(phone) {
    if (phone) window.location.href = GrihamFormat.telUrl(phone);
  },

  /* ---------------- REJECT BOOKING ---------------- */
  openRejectSheet(bookingId) {
    const bkg = this.state.bookings.find(b => b.id === bookingId) || this.state.currentBooking;
    if (!bkg) return;

    this.state.currentBooking = bkg;

    const resName = document.getElementById("reject-booking-resident-name");
    const amnName = document.getElementById("reject-booking-amenity-name");
    if (resName) resName.textContent = bkg.resident_name;
    if (amnName) amnName.textContent = bkg.amenity_name;

    document.getElementById("reject-booking-reason").value = "";

    this.toggleSheet("booking-reject-sheet", "booking-reject-backdrop", true);
  },

  closeRejectSheet() {
    this.toggleSheet("booking-reject-sheet", "booking-reject-backdrop", false);
  },

  async submitRejectBooking(event) {
    if (event) event.preventDefault();
    const bkg = this.state.currentBooking;
    if (!bkg) return;

    const reason = document.getElementById("reject-booking-reason").value.trim();
    const submitBtn = document.getElementById("btn-submit-reject-bkg-text");
    if (submitBtn) submitBtn.textContent = "Rejecting...";

    try {
      await rejectAmenityBooking(bkg.id, reason || "Rejected by administrator.");
      this.closeRejectSheet();
      this.closeBookingDetailSheet();
      await this.loadBookings();
      await this.loadAmenities();
    } catch (err) {
      console.error("Failed to reject booking:", err);
    } finally {
      if (submitBtn) submitBtn.textContent = "Reject Booking";
    }
  },

  /* ---------------- CANCEL BOOKING ---------------- */
  openCancelSheet(bookingId) {
    const bkg = this.state.bookings.find(b => b.id === bookingId) || this.state.currentBooking;
    if (!bkg) return;

    this.state.currentBooking = bkg;

    const amnName = document.getElementById("cancel-booking-amenity-name");
    const dateText = document.getElementById("cancel-booking-date-text");
    if (amnName) amnName.textContent = bkg.amenity_name;
    if (dateText) dateText.textContent = `${bkg.date} (${this.formatTime12h(bkg.start_time)} – ${this.formatTime12h(bkg.end_time)})`;

    this.toggleSheet("booking-cancel-sheet", "booking-cancel-backdrop", true);
  },

  closeCancelSheet() {
    this.toggleSheet("booking-cancel-sheet", "booking-cancel-backdrop", false);
  },

  async submitCancelBooking() {
    const bkg = this.state.currentBooking;
    if (!bkg) return;

    const btn = document.getElementById("btn-execute-cancel-bkg-text");
    if (btn) btn.textContent = "Cancelling...";

    try {
      await cancelAmenityBooking(bkg.id, "Cancelled by society administrator.");
      this.closeCancelSheet();
      this.closeBookingDetailSheet();
      await this.loadBookings();
      await this.loadAmenities();
    } catch (err) {
      console.error("Failed to cancel booking:", err);
    } finally {
      if (btn) btn.textContent = "Cancel Booking";
    }
  },

  /* ---------------- DIRECT BOOKING & CONFLICT DETECTION ---------------- */
  openDirectBookingSheet(preselectedAmenityId = null) {
    const form = document.getElementById("form-direct-booking");
    if (form) form.reset();

    this.populateAmenityDropdowns();

    const selectAmn = document.getElementById("db-select-amenity");
    if (selectAmn && preselectedAmenityId) {
      selectAmn.value = preselectedAmenityId;
    }

    document.getElementById("db-booking-date").value = this.state.selectedDate || "2026-09-17";
    document.getElementById("db-start-time").value = "10:00";
    document.getElementById("db-end-time").value = "12:00";
    document.getElementById("db-people-count").value = "10";
    document.getElementById("db-purpose").value = "";

    this.clearSelectedResident();
    this.populateResidentSearchResults(this.state.residents);
    this.checkLiveConflictNotice();

    this.toggleSheet("direct-booking-sheet", "direct-booking-backdrop", true);
  },

  closeDirectBookingSheet() {
    this.toggleSheet("direct-booking-sheet", "direct-booking-backdrop", false);
  },

  handleDirectBookingAmenitySelect(val) {
    this.checkLiveConflictNotice();
  },

  filterResidentList(query) {
    const q = (query || "").trim().toLowerCase();
    const list = this.state.residents || [];
    const filtered = q ? list.filter(r => 
      r.name.toLowerCase().includes(q) || 
      `${r.wing}-${r.flat}`.toLowerCase().includes(q) ||
      r.flat.toLowerCase().includes(q)
    ) : list;

    this.populateResidentSearchResults(filtered);
  },

  populateResidentSearchResults(residents) {
    const box = document.getElementById("db-resident-results-box");
    if (!box) return;

    if (residents.length === 0) {
      box.innerHTML = `<div style="padding:0.5rem; font-size:0.8rem; color:var(--text-muted); text-align:center;">No residents match search</div>`;
      box.style.display = "block";
      return;
    }

    box.innerHTML = residents.map(r => `
      <button type="button" class="resident-chip-btn" onclick="GrihamAdminAmenitiesUI.selectResident('${this.escapeHtml(r.name)}', '${r.wing}', '${r.flat}', '${r.phone}')">
        <div class="res-chip-avatar">${r.name.substring(0, 2).toUpperCase()}</div>
        <div class="res-chip-details">
          <strong class="res-chip-name">${this.escapeHtml(r.name)}</strong>
          <span class="res-chip-flat">Wing ${r.wing} • Flat ${r.flat}</span>
        </div>
        <span class="res-chip-phone">${r.phone}</span>
      </button>
    `).join("");

    box.style.display = "block";
  },

  selectResident(name, wing, flat, phone) {
    document.getElementById("db-selected-resident-name").value = name;
    document.getElementById("db-selected-resident-wing").value = wing;
    document.getElementById("db-selected-resident-flat").value = flat;
    document.getElementById("db-selected-resident-phone").value = phone;

    const banner = document.getElementById("db-selected-resident-banner");
    const nameEl = document.getElementById("db-banner-res-name");
    const flatEl = document.getElementById("db-banner-res-flat");
    const resultsBox = document.getElementById("db-resident-results-box");
    const searchInput = document.getElementById("db-resident-search-input");

    if (nameEl) nameEl.textContent = name;
    if (flatEl) flatEl.textContent = `Wing ${wing} • Flat ${flat}`;
    if (banner) banner.style.display = "flex";
    if (resultsBox) resultsBox.style.display = "none";
    if (searchInput) searchInput.value = "";
  },

  clearSelectedResident() {
    document.getElementById("db-selected-resident-name").value = "";
    document.getElementById("db-selected-resident-wing").value = "";
    document.getElementById("db-selected-resident-flat").value = "";
    document.getElementById("db-selected-resident-phone").value = "";

    const banner = document.getElementById("db-selected-resident-banner");
    const resultsBox = document.getElementById("db-resident-results-box");
    if (banner) banner.style.display = "none";
    if (resultsBox) resultsBox.style.display = "block";
  },

  /**
   * FRONTEND INTERVAL CONFLICT DETECTION:
   * Overlap Rule:
   * newStart < existingEnd AND newEnd > existingStart
   * Back-to-back bookings (e.g. 10:00-12:00 and 12:00-14:00) DO NOT overlap.
   */
  detectIntervalConflict(amenityId, date, startTime, endTime, excludeBookingId = null) {
    if (!amenityId || !date || !startTime || !endTime) return null;

    const activeList = this.state.bookings.filter(b => 
      b.amenity_id === amenityId &&
      b.date === date &&
      (b.status === "Approved" || b.status === "Pending") &&
      (excludeBookingId ? b.id !== excludeBookingId : true)
    );

    for (let b of activeList) {
      const existStart = b.start_time;
      const existEnd = b.end_time;

      // Interval overlap test:
      if (startTime < existEnd && endTime > existStart) {
        return b; // Conflicting booking found
      }
    }
    return null;
  },

  checkLiveConflictNotice() {
    const amenitySelect = document.getElementById("db-select-amenity");
    const dateInput = document.getElementById("db-booking-date");
    const startInput = document.getElementById("db-start-time");
    const endInput = document.getElementById("db-end-time");
    const conflictCard = document.getElementById("db-conflict-card");
    const detailsBox = document.getElementById("db-conflict-details-box");

    if (!amenitySelect || !dateInput || !startInput || !endInput || !conflictCard) return;

    const amenityId = amenitySelect.value;
    const date = dateInput.value;
    const start = startInput.value;
    const end = endInput.value;

    const conflict = this.detectIntervalConflict(amenityId, date, start, end);

    if (conflict) {
      conflictCard.style.display = "flex";
      if (detailsBox) {
        detailsBox.innerHTML = `
          <strong>Existing booking:</strong> ${this.formatTime12h(conflict.start_time)} – ${this.formatTime12h(conflict.end_time)}<br>
          <span>${this.escapeHtml(conflict.resident_name)} (Flat ${conflict.wing}-${conflict.flat})</span>
        `;
      }
    } else {
      conflictCard.style.display = "none";
    }
  },

  async submitDirectBooking(event) {
    if (event) event.preventDefault();

    const amenityId = document.getElementById("db-select-amenity").value;
    const resName = document.getElementById("db-selected-resident-name").value;
    const resWing = document.getElementById("db-selected-resident-wing").value;
    const resFlat = document.getElementById("db-selected-resident-flat").value;
    const resPhone = document.getElementById("db-selected-resident-phone").value;
    const date = document.getElementById("db-booking-date").value;
    const start = document.getElementById("db-start-time").value;
    const end = document.getElementById("db-end-time").value;
    const people = document.getElementById("db-people-count").value;
    const purpose = document.getElementById("db-purpose").value.trim();

    if (!resName) {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Please select a resident for this booking.", "warning");
      } else {
        alert("Please select a resident for this booking.");
      }
      return;
    }
    if (!start || !end || start >= end) {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Please select a valid start and end time range.", "warning");
      } else {
        alert("Please select a valid start and end time range.");
      }
      return;
    }

    // Check conflict before sending
    const conflict = this.detectIntervalConflict(amenityId, date, start, end);
    if (conflict) {
      this.checkLiveConflictNotice();
      const conflictMsg = `Booking Conflict: This amenity is already booked from ${this.formatTime12h(conflict.start_time)} to ${this.formatTime12h(conflict.end_time)} by ${conflict.resident_name}. Please choose another time.`;
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(conflictMsg, "error");
      } else {
        alert(conflictMsg);
      }
      return;
    }

    const submitBtn = document.getElementById("btn-submit-direct-booking-text");
    if (submitBtn) submitBtn.textContent = "Creating...";

    try {
      await createAmenityBooking({
        amenity_id: amenityId,
        resident_name: resName,
        wing: resWing,
        flat: resFlat,
        phone: resPhone,
        date,
        start_time: start,
        end_time: end,
        people_count: parseInt(people, 10) || 1,
        purpose: purpose || "Direct Admin Booking"
      });

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Booking created successfully.", "success");
      }
      this.closeDirectBookingSheet();
      await this.loadBookings();
      await this.loadAmenities();
    } catch (err) {
      console.error("Failed to create direct booking:", err);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(err.message || "Failed to create booking.", "error");
      } else {
        alert(err.message || "Failed to create booking.");
      }
    } finally {
      if (submitBtn) submitBtn.textContent = "Create Booking";
    }
  },

  /* ---------------- CLOSE ALL SHEETS ---------------- */
  closeAllSheets() {
    this.closeDetailSheet();
    this.closeFormSheet();
    this.closeBlockSheet();
    this.closeUnblockSheet();
    this.closeBookingDetailSheet();
    this.closeDirectBookingSheet();
    this.closeRejectSheet();
    this.closeCancelSheet();
  },

  /* ---------------- HELPERS ---------------- */
  toggleSheet(sheetId, backdropId, open) {
    const sheet = document.getElementById(sheetId);
    const backdrop = document.getElementById(backdropId);
    if (!sheet || !backdrop) return;
    if (open) {
      sheet.classList.add("open");
      backdrop.classList.add("open");
      sheet.setAttribute("aria-hidden", "false");
    } else {
      sheet.classList.remove("open");
      backdrop.classList.remove("open");
      sheet.setAttribute("aria-hidden", "true");
    }
  },

  formatTime12h(timeStr) {
    if (!timeStr) return "";
    const parts = timeStr.split(":");
    if (parts.length < 2) return timeStr;
    let hour = parseInt(parts[0], 10);
    const minute = parts[1];
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
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

/* =========================================
   12. ADMIN BULK SERVICE & VENDOR NEGOTIATION UI
   ========================================= */
