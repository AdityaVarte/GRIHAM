
/* HTML TEMPLATE EXTRACTED FROM index.html */
window.HTML_COMPLAINTS = `
<div class="sheet-backdrop" id="complaint-detail-backdrop" onclick="GrihamAdminComplaintsUI.closeDetail()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="complaint-detail-sheet" role="dialog" aria-modal="true" aria-labelledby="complaint-detail-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminComplaintsUI.closeDetail()" aria-label="Close complaint details" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <div class="sheet-title-group">
        <h3 class="sheet-title" id="complaint-detail-title">Complaint Details</h3>
        <span class="sheet-id-badge" id="complaint-detail-id-badge">CMP-2026-0042</span>
      </div>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <!-- Scrollable Detail Container -->
    <div id="complaint-detail-body" class="complaint-detail-body">
      <!-- Dynamically populated by GrihamAdminComplaintsUI -->
    </div>
  </div>

<div class="sheet-backdrop" id="complaint-status-backdrop" onclick="GrihamAdminComplaintsUI.closeStatusSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="complaint-status-sheet" role="dialog" aria-modal="true" aria-labelledby="complaint-status-sheet-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom));">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminComplaintsUI.closeStatusSheet()" aria-label="Close status selector" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="complaint-status-sheet-title" data-i18n="complaints_update_status">Update Status</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <div id="complaint-status-step1" style="display:flex; flex-direction:column; gap:0.75rem; padding:0.25rem 0;">
      <p class="status-sheet-instruction" id="status-sheet-instruction">Select the next status for this complaint:</p>
      
      <div class="status-options-list" id="status-options-container">
        <!-- Dynamically rendered according to current status -->
      </div>
    </div>

    <div id="complaint-status-step2" style="display:none; flex-direction:column; gap:0.9rem; padding:0.25rem 0; text-align:center;">
      <div class="logout-shield-icon" style="margin:0 auto;" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>

      <h3 class="logout-title" style="margin-bottom:0.25rem;">Update complaint status?</h3>
      <p class="logout-message" id="status-confirm-message" style="margin-bottom:0.5rem;">Are you sure you want to update status to Working?</p>

      <div class="logout-btn-row">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminComplaintsUI.backToStatusSelection()" data-i18n="btn_cancel">Cancel</button>
        <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminComplaintsUI.executeStatusUpdate()" id="btn-confirm-status-update" style="margin-top:0; min-height:44px;">
          <span id="btn-confirm-status-text">Update</span>
        </button>
      </div>
    </div>
  </div>

<div class="sheet-backdrop" id="complaint-assign-backdrop" onclick="GrihamAdminComplaintsUI.closeAssignSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="complaint-assign-sheet" role="dialog" aria-modal="true" aria-labelledby="complaint-assign-sheet-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminComplaintsUI.closeAssignSheet()" aria-label="Close assignee selection" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="complaint-assign-sheet-title" data-i18n="complaints_assign_title">Assign Worker / Vendor</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <div class="assign-search-bar" style="margin: 0.25rem 0 0.75rem 0;">
      <div class="input-wrapper">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="input-icon-left" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="assign-search-input" class="form-input" placeholder="Search staff or vendor..." oninput="GrihamAdminComplaintsUI.handleAssigneeSearch(this.value)" aria-label="Search available staff and vendors">
      </div>
    </div>

    <div id="assign-vendors-list" class="assign-vendors-list" style="display:flex; flex-direction:column; gap:0.65rem; max-height: 52vh; overflow-y:auto; padding-bottom:1rem;">
      <!-- Populated dynamically by JS -->
    </div>
  </div>

<div class="sheet-backdrop" id="complaint-cancel-backdrop" onclick="GrihamAdminComplaintsUI.closeCancelSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="complaint-cancel-sheet" role="dialog" aria-modal="true" aria-labelledby="complaint-cancel-sheet-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom));">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminComplaintsUI.closeCancelSheet()" aria-label="Go back" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="complaint-cancel-sheet-title" data-i18n="complaints_cancel_title">Cancel Complaint</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-complaint-cancel" onsubmit="GrihamAdminComplaintsUI.submitCancellation(event)" style="display:flex; flex-direction:column; gap:0.9rem; padding:0.25rem 0;">
      <p class="cancel-intro-text">Please provide a reason for cancelling this complaint. The resident will be informed of this reason.</p>

      <div class="form-group">
        <label class="form-label" for="input-complaint-cancel-reason">Cancellation Reason <span style="color:var(--color-brand-amber); font-weight:700;">*</span></label>
        <div class="input-wrapper">
          <textarea 
            id="input-complaint-cancel-reason" 
            class="form-textarea" 
            rows="3" 
            placeholder="e.g. Duplicate complaint logged, invalid issue, resolved directly by resident, out of society purview..." 
            required 
            aria-required="true"
          ></textarea>
        </div>
        <p class="form-error-msg" id="cancel-reason-error" style="display:none;">Please enter a cancellation reason.</p>
      </div>

      <div class="logout-btn-row" style="margin-top:0.35rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminComplaintsUI.closeCancelSheet()" data-i18n="btn_cancel">Cancel</button>
        <button type="submit" class="btn-primary-action btn-danger-action" id="btn-confirm-cancel-complaint" style="margin-top:0; min-height:44px;">
          <span id="btn-cancel-complaint-text">Confirm Cancellation</span>
        </button>
      </div>
    </form>
  </div>

<section id="screen-admin-complaints" class="app-view" aria-labelledby="complaints-header-title">
        
        <!-- Standard Griham Mobile Header (Left: Back, Title: Complaints, Right: Filter) -->
        <div class="screen-top-bar">
          ${GrihamHeader.renderBackButton({
            target: '/admin/home',
            id: 'btn-complaints-back',
            ariaLabel: 'Back'
          })}
          
          <h1 class="top-bar-screen-title" id="complaints-header-title" data-i18n="complaints_title">Complaints</h1>
          
          <button type="button" class="btn-top-filter" onclick="GrihamAdminComplaintsUI.toggleFiltersMenu()" id="btn-complaints-filter-toggle" aria-label="Filter complaints" title="Filter complaints">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
          </button>
        </div>

        <!-- COMPLAINT OVERVIEW SUMMARY (Compact Cards) -->
        <div class="complaints-overview-section">
          <div class="overview-title-row">
            <span class="overview-section-title" data-i18n="complaints_overview">Complaint Overview</span>
            <span class="overview-total-badge" id="stat-complaints-total-badge">24 Total</span>
          </div>

          <div class="complaints-summary-grid">
            <!-- Open Card -->
            <button type="button" class="complaint-sum-card card-open" onclick="GrihamAdminComplaintsUI.setFilter('status', 'all')" aria-label="View Open Complaints">
              <div class="sum-card-top">
                <span class="sum-card-label" data-i18n="complaints_open">Open</span>
                <span class="sum-card-dot dot-open" aria-hidden="true"></span>
              </div>
              <strong class="sum-card-val" id="stat-complaints-open">12</strong>
            </button>

            <!-- Pending Card -->
            <button type="button" class="complaint-sum-card card-pending" onclick="GrihamAdminComplaintsUI.setFilter('status', 'pending')" aria-label="Filter Pending Complaints">
              <div class="sum-card-top">
                <span class="sum-card-label" data-i18n="complaints_pending">Pending</span>
                <span class="sum-card-dot dot-pending" aria-hidden="true"></span>
              </div>
              <strong class="sum-card-val" id="stat-complaints-pending">5</strong>
            </button>

            <!-- Solved Card -->
            <button type="button" class="complaint-sum-card card-solved" onclick="GrihamAdminComplaintsUI.setFilter('status', 'solved')" aria-label="Filter Solved Complaints">
              <div class="sum-card-top">
                <span class="sum-card-label" data-i18n="complaints_solved">Solved</span>
                <span class="sum-card-dot dot-solved" aria-hidden="true"></span>
              </div>
              <strong class="sum-card-val" id="stat-complaints-solved">3</strong>
            </button>
          </div>
        </div>

        <!-- SEARCH AND SORT CONTROLS -->
        <div class="complaints-controls-bar">
          <div class="input-wrapper complaints-search-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="input-icon-left" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              id="complaints-search-input" 
              class="form-input complaints-search-input" 
              placeholder="Search complaints..." 
              oninput="GrihamAdminComplaintsUI.handleSearch(this.value)" 
              aria-label="Search complaints by title, resident, wing, or flat"
            >
            <button type="button" class="btn-search-clear" id="btn-complaints-search-clear" onclick="GrihamAdminComplaintsUI.clearSearch()" style="display:none;" aria-label="Clear search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div class="complaints-sort-wrapper">
            <select id="complaints-sort-select" class="form-select complaints-sort-select" onchange="GrihamAdminComplaintsUI.handleSort(this.value)" aria-label="Sort complaints">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="status">Status</option>
              <option value="flat">Flat Number</option>
            </select>
          </div>
        </div>

        <!-- PRIMARY STATUS FILTER CHIPS -->
        <div class="complaints-filter-chips-bar" role="group" aria-label="Filter Complaints by Status">
          <button type="button" class="btn-filter-chip active" data-complaint-status="all" onclick="GrihamAdminComplaintsUI.setFilter('status', 'all')">All</button>
          <button type="button" class="btn-filter-chip" data-complaint-status="pending" onclick="GrihamAdminComplaintsUI.setFilter('status', 'pending')">Pending</button>
          <button type="button" class="btn-filter-chip" data-complaint-status="solved" onclick="GrihamAdminComplaintsUI.setFilter('status', 'solved')">Solved</button>
          <button type="button" class="btn-filter-chip" data-complaint-status="cancelled" onclick="GrihamAdminComplaintsUI.setFilter('status', 'cancelled')">Cancelled</button>
        </div>

        <!-- SECONDARY EXPANDABLE FILTER ROW (Category only) -->
        <div class="complaints-sub-filters-bar" id="complaints-sub-filters-bar">
          <!-- Category Filter Select -->
          <div class="sub-filter-item">
            <label for="filter-complaint-category" class="sub-filter-label" data-i18n="filter_category">Category:</label>
            <select id="filter-complaint-category" class="form-select sub-filter-select" onchange="GrihamAdminComplaintsUI.setFilter('category', this.value)" aria-label="Filter by Category">
              <option value="all">All Categories</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Water">Water</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Security">Security</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <!-- ACTIVE FILTER TAGS ROW -->
        <div class="complaints-active-tags-row" id="complaints-active-tags" style="display:none;">
          <span class="active-tags-label">Active:</span>
          <div id="complaints-active-tags-list" class="active-tags-list"></div>
          <button type="button" class="btn-clear-all-filters" onclick="GrihamAdminComplaintsUI.resetAllFilters()">Reset</button>
        </div>

        <!-- SKELETONS LOADER -->
        <div id="complaints-skeleton" style="display:none; flex-direction:column; gap:0.65rem; margin-top:0.75rem;">
          <div class="dash-skeleton-card" style="height: 104px;"></div>
          <div class="dash-skeleton-card" style="height: 104px;"></div>
          <div class="dash-skeleton-card" style="height: 104px;"></div>
          <div class="dash-skeleton-card" style="height: 104px;"></div>
        </div>

        <!-- COMPLAINT CARDS LIST -->
        <div class="complaints-list-container" id="complaints-list">
          <!-- Dynamically populated by JS -->
        </div>

        <!-- EMPTY STATE -->
        <div class="maint-empty-card" id="complaints-empty-state" style="display:none;">
          <div class="empty-icon-pill" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h3 class="empty-title" id="complaints-empty-title">No complaints found</h3>
          <p class="empty-desc" id="complaints-empty-desc">No complaints match your current search and filter criteria.</p>
          <button type="button" class="btn-filter-reset-action" onclick="GrihamAdminComplaintsUI.resetAllFilters()">Clear Filters</button>
        </div>

        <!-- ERROR STATE -->
        <div class="maint-error-card" id="complaints-error-state" style="display:none;">
          <p style="font-weight:600; color:var(--text-primary); margin-bottom:0.5rem;" id="complaints-error-msg">Unable to load complaints.</p>
          <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminComplaintsUI.loadData(true)" style="min-height:38px; font-size:0.82rem; padding:0.4rem 1.2rem;">
            <span data-i18n="btn_try_again">Try Again</span>
          </button>
        </div>

       </section>
`;
const GrihamAdminComplaintsUI = {
  state: {
    complaints: [],
    summary: { total: 0, open: 0, pending: 0, solved: 0, cancelled: 0 },
    staff_vendors: [],
    searchQuery: "",
    filters: {
      status: "all",
      category: "all"
    },
    sortBy: "newest",
    currentComplaint: null,
    pendingStatusUpdate: null,
    audioPlayback: {
      isPlaying: false,
      progress: 0,
      intervalId: null
    },
    showSubFilters: false
  },

  async init() {
    await this.loadData();
    // Re-apply I18n translations if needed
    if (typeof GrihamI18n !== "undefined" && typeof GrihamI18n.translate === "function") {
      GrihamI18n.translate(GrihamState.language);
    }
  },

  async loadData(forceRefresh = false) {
    const listEl = document.getElementById("complaints-list");
    const skeletonEl = document.getElementById("complaints-skeleton");
    const errorEl = document.getElementById("complaints-error-state");
    const emptyEl = document.getElementById("complaints-empty-state");

    if (skeletonEl) skeletonEl.style.display = "flex";
    if (listEl) listEl.style.display = "none";
    if (errorEl) errorEl.style.display = "none";
    if (emptyEl) emptyEl.style.display = "none";

    try {
      const [resComplaints, resStaff] = await Promise.all([
        getAdminComplaints(),
        getAvailableStaffAndVendors()
      ]);

      this.state.complaints = resComplaints.complaints || [];
      this.state.summary = resComplaints.summary || {
        total: this.state.complaints.length,
        open: this.state.complaints.filter(c => c.status === "pending").length,
        pending: this.state.complaints.filter(c => c.status === "pending").length,
        solved: this.state.complaints.filter(c => c.status === "solved").length,
        cancelled: this.state.complaints.filter(c => c.status === "cancelled").length
      };
      this.state.staff_vendors = resStaff.staff_vendors || [];

      this.renderSummary();
      this.renderComplaintsList();
    } catch (err) {
      console.error("[Complaints Error]", err);
      if (errorEl) errorEl.style.display = "block";
    } finally {
      if (skeletonEl) skeletonEl.style.display = "none";
      if (listEl) listEl.style.display = "flex";
    }
  },

  renderSummary() {
    const s = this.state.summary;
    const badgeTotal = document.getElementById("stat-complaints-total-badge");
    const openVal = document.getElementById("stat-complaints-open");
    const pendingVal = document.getElementById("stat-complaints-pending");
    const solvedVal = document.getElementById("stat-complaints-solved");

    if (badgeTotal) badgeTotal.textContent = `${s.total || this.state.complaints.length} Total`;
    if (openVal) openVal.textContent = s.open || 0;
    if (pendingVal) pendingVal.textContent = s.pending || 0;
    if (solvedVal) solvedVal.textContent = s.solved || 0;
  },

  handleSearch(query) {
    this.state.searchQuery = (query || "").trim();
    if (typeof GrihamSearchBar !== "undefined") {
      GrihamSearchBar.syncClearButton("complaints-search-input", "btn-complaints-search-clear");
    } else {
      const clearBtn = document.getElementById("btn-complaints-search-clear");
      if (clearBtn) clearBtn.style.display = this.state.searchQuery ? "flex" : "none";
    }
    this.renderComplaintsList();
  },

  clearSearch() {
    if (typeof GrihamSearchBar !== "undefined") {
      GrihamSearchBar.handleClear("complaints-search-input", "btn-complaints-search-clear", () => this.handleSearch(""));
    } else {
      const searchInput = document.getElementById("complaints-search-input");
      if (searchInput) searchInput.value = "";
      this.handleSearch("");
    }
  },

  handleSort(sortKey) {
    this.state.sortBy = sortKey;
    this.renderComplaintsList();
  },

  setFilter(filterType, filterVal) {
    if (filterType === "status") {
      this.state.filters.status = filterVal;
      // Update chip styling
      document.querySelectorAll("[data-complaint-status]").forEach(btn => {
        if (btn.getAttribute("data-complaint-status") === filterVal) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    } else if (filterType === "category") {
      this.state.filters.category = filterVal;
      const catSelect = document.getElementById("filter-complaint-category");
      if (catSelect && catSelect.value !== filterVal) catSelect.value = filterVal;
    }

    this.renderActiveFilterTags();
    this.renderComplaintsList();
  },

  toggleFiltersMenu() {
    const bar = document.getElementById("complaints-sub-filters-bar");
    const toggleBtn = document.getElementById("btn-complaints-filter-toggle");
    this.state.showSubFilters = !this.state.showSubFilters;
    if (bar) {
      bar.style.display = this.state.showSubFilters ? "flex" : "none";
    }
    if (toggleBtn) {
      if (this.state.showSubFilters) {
        toggleBtn.classList.add("active");
      } else {
        toggleBtn.classList.remove("active");
      }
    }
  },

  resetAllFilters() {
    this.state.filters = { status: "all", category: "all" };
    this.state.searchQuery = "";
    const searchInput = document.getElementById("complaints-search-input");
    if (searchInput) searchInput.value = "";
    const clearBtn = document.getElementById("btn-complaints-search-clear");
    if (clearBtn) clearBtn.style.display = "none";

    const catSelect = document.getElementById("filter-complaint-category");
    if (catSelect) catSelect.value = "all";

    document.querySelectorAll("[data-complaint-status]").forEach(btn => {
      if (btn.getAttribute("data-complaint-status") === "all") {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    this.renderActiveFilterTags();
    this.renderComplaintsList();
  },

  renderActiveFilterTags() {
    const container = document.getElementById("complaints-active-tags");
    const list = document.getElementById("complaints-active-tags-list");
    if (!container || !list) return;

    const tags = [];
    if (this.state.filters.status !== "all") {
      tags.push({ type: "status", label: `Status: ${this.state.filters.status}` });
    }
    if (this.state.filters.category !== "all") {
      tags.push({ type: "category", label: `Category: ${this.state.filters.category}` });
    }

    if (tags.length === 0) {
      container.style.display = "none";
      list.innerHTML = "";
    } else {
      container.style.display = "flex";
      list.innerHTML = tags.map(t => `
        <span class="active-tag-pill">
          ${escapeHtml(t.label)}
          <button type="button" class="active-tag-remove" onclick="GrihamAdminComplaintsUI.setFilter('${t.type}', 'all')" aria-label="Remove ${t.label} filter">&times;</button>
        </span>
      `).join("");
    }
  },

  getFilteredAndSortedComplaints() {
    let list = [...this.state.complaints];

    // 1. Search Query (Complaint title, resident name, wing, flat)
    if (this.state.searchQuery) {
      const q = this.state.searchQuery.toLowerCase();
      list = list.filter(item => {
        const title = (item.title || "").toLowerCase();
        const resident = (item.resident_name || "").toLowerCase();
        const wing = (item.wing || "").toLowerCase();
        const flat = (item.flat || "").toLowerCase();
        const combo = `${wing}-${flat}`.toLowerCase();
        const id = (item.id || "").toLowerCase();
        return title.includes(q) || resident.includes(q) || wing.includes(q) || flat.includes(q) || combo.includes(q) || id.includes(q);
      });
    }

    // 2. Status Filter
    if (this.state.filters.status !== "all") {
      list = list.filter(item => item.status === this.state.filters.status);
    }

    // 3. Category Filter
    if (this.state.filters.category !== "all") {
      list = list.filter(item => item.category === this.state.filters.category);
    }

    // 4. Sorting
    const statusWeights = { "pending": 2, "solved": 1, "cancelled": 0 };

    if (this.state.sortBy === "newest") {
      list.sort((a, b) => b.id.localeCompare(a.id));
    } else if (this.state.sortBy === "oldest") {
      list.sort((a, b) => a.id.localeCompare(b.id));
    } else if (this.state.sortBy === "status") {
      list.sort((a, b) => (statusWeights[b.status] || 0) - (statusWeights[a.status] || 0));
    } else if (this.state.sortBy === "flat") {
      list.sort((a, b) => {
        const wingCmp = (a.wing || "").localeCompare(b.wing || "");
        if (wingCmp !== 0) return wingCmp;
        return parseInt(a.flat || "0", 10) - parseInt(b.flat || "0", 10);
      });
    }

    return list;
  },

  renderComplaintsList() {
    const listEl = document.getElementById("complaints-list");
    const emptyEl = document.getElementById("complaints-empty-state");
    if (!listEl) return;

    const items = this.getFilteredAndSortedComplaints();

    if (items.length === 0) {
      listEl.innerHTML = "";
      if (emptyEl) emptyEl.style.display = "flex";
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";

    listEl.innerHTML = items.map(c => {
      const statusClass = (c.status || "pending").toLowerCase();
      const newBadge = c.is_new ? `<span class="badge-new-complaint">New</span>` : "";

      return `
        <div class="complaint-card" onclick="GrihamAdminComplaintsUI.openDetail('${c.id}')" role="button" tabindex="0" aria-label="Complaint: ${escapeHtml(c.title)}">
          <div class="complaint-card-top">
            <div class="complaint-badges-group">
              <span class="complaint-cat-badge">${escapeHtml(c.category)}</span>
              ${newBadge}
            </div>
            <span style="font-family:monospace; font-size:calc(0.68rem * var(--font-scale)); color:var(--text-muted);">${escapeHtml(c.id)}</span>
          </div>

          <h3 class="complaint-card-title">${escapeHtml(c.title)}</h3>

          <div class="complaint-card-meta">
            <span>${escapeHtml(c.resident_name)}</span>
            <span style="opacity:0.5;">•</span>
            <span class="complaint-unit-badge">Wing ${escapeHtml(c.wing)} • Flat ${escapeHtml(c.flat)}</span>
          </div>

          <div class="complaint-card-footer">
            <span>${escapeHtml(c.created_at)}</span>
            <span class="complaint-status-pill ${statusClass}">
              <span class="sum-card-dot dot-${statusClass}" aria-hidden="true"></span>
              ${escapeHtml(c.status)}
            </span>
          </div>
        </div>
      `;
    }).join("");
  },

  async openDetail(complaintId) {
    let complaint = this.state.complaints.find(c => c.id === complaintId);
    if (!complaint) {
      try {
        const res = await getAdminComplaintDetail(complaintId);
        complaint = res.complaint;
      } catch (err) {
        console.error("Complaint detail error", err);
        return;
      }
    }

    this.state.currentComplaint = complaint;
    const bodyEl = document.getElementById("complaint-detail-body");
    const idBadge = document.getElementById("complaint-detail-id-badge");
    if (idBadge) idBadge.textContent = complaint.id;

    if (!bodyEl) return;

    // Render Status Stepper HTML
    let stepperHtml = "";
    if (complaint.status === "cancelled") {
      stepperHtml = `
        <div class="complaint-stepper">
          <div class="stepper-track-line" style="background:#ef4444;"></div>
          <div class="stepper-item completed">
            <div class="stepper-node">✓</div>
            <span class="stepper-label">Sent</span>
          </div>
          <div class="stepper-item cancelled">
            <div class="stepper-node">✕</div>
            <span class="stepper-label">Cancelled</span>
          </div>
        </div>
      `;
    } else {
      const steps = [
        { key: "sent", label: "Sent" },
        { key: "pending", label: "Pending" },
        { key: "solved", label: "Solved" }
      ];

      const currentIdx = complaint.status === "pending" ? 1 : complaint.status === "solved" ? 2 : 0;

      stepperHtml = `
        <div class="complaint-stepper">
          <div class="stepper-track-line"></div>
          ${steps.map((step, idx) => {
            let stateClass = "";
            let nodeContent = idx + 1;
            if (idx < currentIdx) {
              stateClass = "completed";
              nodeContent = "✓";
            } else if (idx === currentIdx) {
              stateClass = "active";
            }
            if (complaint.status === "solved" && idx === 3) {
              stateClass = "completed";
              nodeContent = "✓";
            }
            return `
              <div class="stepper-item ${stateClass}">
                <div class="stepper-node">${nodeContent}</div>
                <span class="stepper-label">${step.label}</span>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    // Render Attachments HTML
    const att = complaint.attachments || {};
    let attachmentsContentHtml = "";
    const hasImages = att.images && att.images.length > 0;
    const hasAudio = !!att.audio;
    const hasVideo = !!att.video;

    if (!hasImages && !hasAudio && !hasVideo) {
      attachmentsContentHtml = `<p style="font-size:0.78rem; color:var(--text-muted); font-style:italic;">No attachments.</p>`;
    } else {
      let photosHtml = "";
      if (hasImages) {
        photosHtml = `
          <div class="photo-preview-grid">
            ${att.images.map(img => `
              <div class="photo-thumb-card">
                <div class="photo-thumb-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <div class="photo-thumb-info">
                  <span class="photo-thumb-name">${escapeHtml(img.name)}</span>
                  <span class="photo-thumb-size">${escapeHtml(img.size)}</span>
                </div>
              </div>
            `).join("")}
          </div>
        `;
      }

      let audioHtml = "";
      if (hasAudio) {
        audioHtml = `
          <div class="audio-player-card">
            <button type="button" class="btn-audio-play" id="btn-audio-play-toggle" onclick="GrihamAdminComplaintsUI.toggleAudioPlayback()" aria-label="Play audio message">
              <svg id="audio-play-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </button>
            <div class="audio-track-info">
              <div class="audio-track-meta">
                <span>Voice Message</span>
                <span id="audio-duration-display">${escapeHtml(att.audio.duration || "0:18")}</span>
              </div>
              <div class="audio-waveform-bar">
                <div class="audio-waveform-fill" id="audio-waveform-fill" style="width:0%;"></div>
              </div>
            </div>
          </div>
        `;
      }

      let videoHtml = "";
      if (hasVideo) {
        videoHtml = `
          <div class="video-player-card">
            <div class="video-card-left">
              <div class="video-thumb-pill">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
              </div>
              <div>
                <strong style="display:block; font-size:0.78rem; color:var(--text-primary);">${escapeHtml(att.video.name)}</strong>
                <span style="font-size:0.7rem; color:var(--text-muted);">${escapeHtml(att.video.duration || "0:12")} • ${escapeHtml(att.video.size || "3.8 MB")}</span>
              </div>
            </div>
            <span class="video-constraint-tag">Under 5 MB</span>
          </div>
        `;
      }

      attachmentsContentHtml = `
        <div class="attachments-wrapper">
          ${photosHtml}
          ${audioHtml}
          ${videoHtml}
        </div>
      `;
    }

    // Render Assignee HTML
    const assignee = complaint.assigned_to || { name: "Unassigned", role: "No vendor/worker assigned", phone: "" };
    const assigneeHtml = `
      <div class="assignee-info-card">
        <div class="assignee-details">
          <span class="assignee-name">${escapeHtml(assignee.name)}</span>
          <span class="assignee-role">${escapeHtml(assignee.role)}</span>
          ${assignee.phone ? `<span class="assignee-phone">${escapeHtml(assignee.phone)}</span>` : ""}
        </div>
        <div class="assignee-contact-actions">
          <button type="button" class="btn-contact-action btn-contact-call" onclick="GrihamCallSelectorUI.openForComplaint(GrihamAdminComplaintsUI.state.currentComplaint)" title="Call vendor or worker for this complaint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            ${assignee.phone ? "Call" : "Call Vendor"}
          </button>
          ${assignee.phone ? `
            <button type="button" class="btn-contact-action btn-contact-msg" onclick="GrihamAdminComplaintsUI.handleDirectMessage('${escapeHtml(assignee.name)}')" title="Send direct SMS/notice">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Message
            </button>
          ` : ""}
        </div>
      </div>
      <button type="button" class="btn-secondary-outline" onclick="GrihamAdminComplaintsUI.openAssignSheet()" style="min-height:38px; font-size:0.8rem; margin-top:0.35rem;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
        Change Assignment
      </button>
    `;

    // Render Timeline HTML
    const timeline = complaint.timeline || [];
    const timelineHtml = `
      <div class="activity-timeline">
        ${timeline.map(item => `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <span class="timeline-time">${escapeHtml(item.time)}</span>
            <strong class="timeline-title">${escapeHtml(item.title)}</strong>
            ${item.note ? `<span class="timeline-note">${escapeHtml(item.note)}</span>` : ""}
          </div>
        `).join("")}
      </div>
    `;

    // Action Buttons
    let actionsHtml = "";
    if (complaint.status === "pending") {
      actionsHtml = `
        <div class="complaint-actions-stack">
          <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminComplaintsUI.markSolvedQuick()" style="min-height:46px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Mark as Solved
          </button>
          <button type="button" class="btn-secondary-outline" onclick="GrihamAdminComplaintsUI.openCancelSheet()" style="color:#ef4444; border-color:rgba(239, 68, 68, 0.3);">
            Cancel Complaint
          </button>
        </div>
      `;
    } else if (complaint.status === "solved") {
      actionsHtml = `
        <div style="background:rgba(16, 185, 129, 0.1); border:1px solid rgba(16, 185, 129, 0.3); border-radius:var(--radius-sm); padding:0.75rem; text-align:center; color:var(--color-brand-emerald); font-weight:700; font-size:0.85rem;">
          ✓ This complaint has been successfully resolved and solved.
        </div>
      `;
    } else if (complaint.status === "cancelled") {
      actionsHtml = `
        <div style="background:rgba(239, 68, 68, 0.1); border:1px solid rgba(239, 68, 68, 0.3); border-radius:var(--radius-sm); padding:0.75rem; text-align:center; color:#ef4444; font-weight:700; font-size:0.85rem;">
          ✕ This complaint has been cancelled.
        </div>
      `;
    }

    bodyEl.innerHTML = `
      <!-- Status Stepper Section -->
      <div class="detail-glass-section">
        <div class="detail-section-heading">
          <span>Complaint Progress</span>
          <span class="complaint-status-pill ${complaint.status}">${escapeHtml(complaint.status)}</span>
        </div>
        ${stepperHtml}
      </div>

      <!-- Complaint Info & Description -->
      <div class="detail-glass-section">
        <h2 style="font-family:var(--font-family-display); font-size:calc(1.1rem * var(--font-scale)); font-weight:800; color:var(--text-primary); line-height:1.35; margin:0 0 0.4rem 0;">
          ${escapeHtml(complaint.title)}
        </h2>

        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.4rem; padding-bottom:0.5rem; border-bottom:1px solid var(--divider-color);">
          <div style="display:flex; align-items:center; gap:0.4rem; font-size:calc(0.8rem * var(--font-scale)); color:var(--text-secondary);">
            <strong style="color:var(--text-primary);">${escapeHtml(complaint.resident_name)}</strong>
            <span style="opacity:0.5;">•</span>
            <span style="color:var(--admin-accent); font-weight:700;">Wing ${escapeHtml(complaint.wing)} • Flat ${escapeHtml(complaint.flat)}</span>
          </div>

          <div style="display:flex; align-items:center; gap:0.35rem;">
            <span class="complaint-cat-badge">${escapeHtml(complaint.category)}</span>
          </div>
        </div>

        <div style="margin-top:0.35rem;">
          <span style="display:block; font-size:calc(0.72rem * var(--font-scale)); font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:0.25rem;">Description</span>
          <p style="font-size:calc(0.85rem * var(--font-scale)); color:var(--text-primary); line-height:1.5; white-space:pre-wrap; margin:0;">${escapeHtml(complaint.description)}</p>
        </div>
      </div>

      <!-- Attachments Section -->
      <div class="detail-glass-section">
        <div class="detail-section-heading">
          <span>Attachments</span>
        </div>
        ${attachmentsContentHtml}
      </div>

      <!-- Assigned Personnel Section -->
      <div class="detail-glass-section">
        <div class="detail-section-heading">
          <span>Assigned To</span>
        </div>
        ${assigneeHtml}
      </div>

      <!-- Timeline Section -->
      <div class="detail-glass-section">
        <div class="detail-section-heading">
          <span>Activity History</span>
        </div>
        ${timelineHtml}
      </div>

      <!-- Action Buttons Stack -->
      ${actionsHtml}
    `;

    GrihamBottomSheet.open("complaint-detail-sheet", "complaint-detail-backdrop");
  },

  closeDetail() {
    GrihamBottomSheet.close("complaint-detail-sheet", "complaint-detail-backdrop");
    // Stop audio
    if (this.state.audioPlayback.intervalId) {
      clearInterval(this.state.audioPlayback.intervalId);
      this.state.audioPlayback.isPlaying = false;
    }
  },

  handleDirectMessage(name) {
    if (typeof GrihamToast !== "undefined") {
      GrihamToast.show(`Direct communication alert sent to ${name}.`, "info");
    }
  },

  openStatusSheet() {
    const c = this.state.currentComplaint;
    if (!c) return;

    const container = document.getElementById("status-options-container");
    const step1 = document.getElementById("complaint-status-step1");
    const step2 = document.getElementById("complaint-status-step2");

    if (step1) step1.style.display = "flex";
    if (step2) step2.style.display = "none";

    let options = [];
    if (c.status === "pending") {
      options = [
        { status: "solved", title: "Mark as Solved", desc: "Issue resolved and verified by resident/committee" },
        { status: "cancelled", title: "Cancel Complaint", desc: "Cancel if duplicate or out of society purview" }
      ];
    }

    if (container) {
      container.innerHTML = options.map(opt => `
        <button type="button" class="status-option-item" onclick="GrihamAdminComplaintsUI.selectStatus('${opt.status}')">
          <div class="status-option-info">
            <span class="status-option-title">${escapeHtml(opt.title)}</span>
            <span class="status-option-desc">${escapeHtml(opt.desc)}</span>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" style="color:var(--admin-accent);">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      `).join("");
    }

    GrihamBottomSheet.open("complaint-status-sheet", "complaint-status-backdrop");
  },

  closeStatusSheet() {
    GrihamBottomSheet.close("complaint-status-sheet", "complaint-status-backdrop");
  },

  selectStatus(status) {
    if (status === "cancelled") {
      this.closeStatusSheet();
      this.openCancelSheet();
      return;
    }

    this.state.pendingStatusUpdate = status;
    const step1 = document.getElementById("complaint-status-step1");
    const step2 = document.getElementById("complaint-status-step2");
    const msg = document.getElementById("status-confirm-message");

    if (step1) step1.style.display = "none";
    if (step2) step2.style.display = "flex";
    if (msg) msg.textContent = `Are you sure you want to update status to ${status.toUpperCase()}?`;
  },

  backToStatusSelection() {
    const step1 = document.getElementById("complaint-status-step1");
    const step2 = document.getElementById("complaint-status-step2");
    if (step1) step1.style.display = "flex";
    if (step2) step2.style.display = "none";
  },

  async executeStatusUpdate() {
    const c = this.state.currentComplaint;
    const newStatus = this.state.pendingStatusUpdate;
    if (!c || !newStatus) return;

    try {
      const res = await updateAdminComplaintStatus(c.id, newStatus);

      if (res.complaint) {
        // Update item in list
        const idx = this.state.complaints.findIndex(item => item.id === c.id);
        if (idx !== -1) {
          this.state.complaints[idx] = res.complaint;
        }
        this.state.currentComplaint = res.complaint;
      }

      this.closeStatusSheet();
      await this.loadData();
      this.openDetail(c.id);
    } catch (err) {
      console.error("Status update error", err);
    }
  },

  markSolvedQuick() {
    this.state.pendingStatusUpdate = "solved";
    this.openStatusSheet();
    this.selectStatus("solved");
  },

  openAssignSheet() {
    this.renderAssigneeList(this.state.staff_vendors);
    GrihamBottomSheet.open("complaint-assign-sheet", "complaint-assign-backdrop");
  },

  closeAssignSheet() {
    GrihamBottomSheet.close("complaint-assign-sheet", "complaint-assign-backdrop");
  },

  handleAssigneeSearch(query) {
    const q = (query || "").toLowerCase();
    const filtered = this.state.staff_vendors.filter(s => {
      return (s.name || "").toLowerCase().includes(q) ||
             (s.role || "").toLowerCase().includes(q) ||
             (s.category || "").toLowerCase().includes(q);
    });
    this.renderAssigneeList(filtered);
  },

  renderAssigneeList(items) {
    const listEl = document.getElementById("assign-vendors-list");
    const current = this.state.currentComplaint ? this.state.currentComplaint.assigned_to : null;
    if (!listEl) return;

    if (!items || items.length === 0) {
      listEl.innerHTML = `<p style="font-size:0.8rem; color:var(--text-muted); text-align:center; padding:1rem 0;">No personnel found.</p>`;
      return;
    }

    listEl.innerHTML = items.map(person => {
      const isSelected = current && current.id === person.id;
      return `
        <button type="button" class="assignee-item-card ${isSelected ? 'current' : ''}" onclick="GrihamAdminComplaintsUI.selectAssignee('${person.id}')">
          <div style="display:flex; flex-direction:column; gap:0.15rem;">
            <div style="display:flex; align-items:center; gap:0.35rem;">
              <strong style="color:var(--text-primary); font-size:0.88rem;">${escapeHtml(person.name)}</strong>
              <span class="complaint-cat-badge" style="font-size:0.65rem;">${escapeHtml(person.type || 'Staff')}</span>
            </div>
            <span style="font-size:0.75rem; color:var(--admin-accent);">${escapeHtml(person.role)}</span>
            <span style="font-size:0.7rem; color:var(--text-muted);">${escapeHtml(person.category)} • ${escapeHtml(person.phone)}</span>
          </div>

          <div>
            ${isSelected ? `<span style="color:var(--admin-accent); font-weight:700; font-size:0.8rem;">Current</span>` : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="color:var(--text-muted);"><polyline points="9 18 15 12 9 6"/></svg>`}
          </div>
        </button>
      `;
    }).join("");
  },

  async selectAssignee(personId) {
    const person = this.state.staff_vendors.find(p => p.id === personId);
    const c = this.state.currentComplaint;
    if (!person || !c) return;

    try {
      const res = await updateAdminComplaintAssignment(c.id, {
        id: person.id,
        name: person.name,
        role: person.role,
        phone: person.phone
      });

      if (res.complaint) {
        const idx = this.state.complaints.findIndex(item => item.id === c.id);
        if (idx !== -1) {
          this.state.complaints[idx] = res.complaint;
        }
        this.state.currentComplaint = res.complaint;
      }

      this.closeAssignSheet();
      this.openDetail(c.id);
      this.renderComplaintsList();
    } catch (err) {
      console.error("Assign error", err);
    }
  },

  openCancelSheet() {
    const reasonInput = document.getElementById("input-complaint-cancel-reason");
    const errText = document.getElementById("cancel-reason-error");
    if (reasonInput) reasonInput.value = "";
    if (errText) errText.style.display = "none";

    GrihamBottomSheet.open("complaint-cancel-sheet", "complaint-cancel-backdrop");
  },

  closeCancelSheet() {
    GrihamBottomSheet.close("complaint-cancel-sheet", "complaint-cancel-backdrop");
  },

  async submitCancellation(e) {
    if (e) e.preventDefault();
    const c = this.state.currentComplaint;
    const reasonInput = document.getElementById("input-complaint-cancel-reason");
    const errText = document.getElementById("cancel-reason-error");
    const reason = (reasonInput ? reasonInput.value : "").trim();

    if (!reason) {
      if (errText) errText.style.display = "block";
      return;
    }

    try {
      const res = await updateAdminComplaintStatus(c.id, "cancelled", reason);

      if (res.complaint) {
        const idx = this.state.complaints.findIndex(item => item.id === c.id);
        if (idx !== -1) {
          this.state.complaints[idx] = res.complaint;
        }
        this.state.currentComplaint = res.complaint;
      }

      this.closeCancelSheet();
      await this.loadData();
      this.openDetail(c.id);
    } catch (err) {
      console.error("Cancel complaint error", err);
    }
  },

  toggleAudioPlayback() {
    const fillEl = document.getElementById("audio-waveform-fill");
    const iconEl = document.getElementById("audio-play-icon");

    if (this.state.audioPlayback.isPlaying) {
      // Pause
      clearInterval(this.state.audioPlayback.intervalId);
      this.state.audioPlayback.isPlaying = false;
      if (iconEl) {
        iconEl.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
      }
    } else {
      // Play
      this.state.audioPlayback.isPlaying = true;
      if (iconEl) {
        iconEl.innerHTML = `<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`;
      }

      this.state.audioPlayback.intervalId = setInterval(() => {
        this.state.audioPlayback.progress += 5;
        if (this.state.audioPlayback.progress > 100) {
          this.state.audioPlayback.progress = 0;
          this.toggleAudioPlayback();
        }
        if (fillEl) {
          fillEl.style.width = `${this.state.audioPlayback.progress}%`;
        }
      }, 200);
    }
  }
};
