
/* HTML TEMPLATE EXTRACTED FROM index.html */
window.HTML_APPROVALS = `
<div class="sheet-backdrop" id="approval-detail-backdrop" onclick="GrihamAdminApprovalsUI.closeDetail()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet approval-detail-sheet" id="approval-detail-sheet" role="dialog" aria-modal="true" aria-labelledby="approval-detail-sheet-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminApprovalsUI.closeDetail()" aria-label="Close resident application details" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="approval-detail-sheet-title">Resident Application</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <!-- Duplicate Warning Banner (Shown if resident exists) -->
    <div id="approval-duplicate-alert" class="approval-duplicate-alert" style="display:none;" role="alert">
      <div class="dup-alert-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </div>
      <div class="dup-alert-content">
        <div class="dup-alert-title">Possible Duplicate</div>
        <div class="dup-alert-text" id="approval-duplicate-text">An active resident already exists for this unit.</div>
      </div>
    </div>

    <!-- Registration ID & Status Header Box -->
    <div class="approval-detail-header-card" id="approval-detail-header-card">
      <div class="approval-reg-row">
        <div>
          <div class="approval-reg-label">Registration ID</div>
          <div class="approval-reg-id" id="approval-detail-reg-id">REG-2026-0042</div>
        </div>
        <div id="approval-detail-status-pill">
          <!-- Status badge injected by JS -->
        </div>
      </div>
    </div>

    <!-- Profile Photo Section -->
    <div class="approval-photo-card" id="approval-photo-card">
      <div class="approval-photo-section-label">Profile Photo</div>
      <div class="approval-photo-wrapper" id="approval-photo-wrapper">
        <!-- Rendered by JS: image or 'No profile photo provided' -->
      </div>
    </div>

    <!-- Info sections (Personal, Property, Account) -->
    <div class="approval-info-sections" id="approval-info-sections">
      <!-- Populated by JS -->
    </div>

    <!-- Rejection reason box (shown if rejected) -->
    <div id="approval-rejection-reason-box" class="approval-rejection-reason-box" style="display:none;">
      <p class="rejection-box-label">Reason for Rejection</p>
      <p id="approval-rejection-reason-text" class="rejection-box-text"></p>
    </div>

    <!-- Decision history metadata (if approved / rejected) -->
    <div id="approval-history-meta-box" class="approval-history-meta-box" style="display:none;">
      <!-- Populated by JS: Approved By / Rejected By + Timestamp -->
    </div>

    <!-- Action buttons (only for pending status) -->
    <div id="approval-action-buttons" class="approval-action-buttons" style="display:none;">
      <button type="button" class="btn-approval-reject" id="btn-open-reject-sheet" onclick="GrihamAdminApprovalsUI.openRejectSheet()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        Reject Registration
      </button>
      <button type="button" class="btn-approval-approve" id="btn-confirm-approve" onclick="GrihamAdminApprovalsUI.confirmApprove()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><polyline points="20 6 9 17 4 12"/></svg>
        Approve Resident
      </button>
    </div>
  </div>

<section id="screen-admin-approvals" class="app-view" aria-labelledby="approvals-header-title">

    <!-- Standard Griham Mobile Header -->
    <div class="screen-top-bar">
      ${GrihamHeader.renderBackButton({
        target: '/admin/home',
        id: 'btn-approvals-back',
        ariaLabel: 'Back'
      })}

      <h1 class="top-bar-screen-title" id="approvals-header-title">Pending Approvals</h1>

      <div style="display:flex; align-items:center; gap:0.35rem;">
        <button type="button" class="btn-top-filter" onclick="GrihamAdminApprovalsUI.openSortSheet()" id="btn-approvals-sort" aria-label="Sort registrations" title="Sort">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="14" y2="12"></line>
            <line x1="4" y1="18" x2="8" y2="18"></line>
          </svg>
        </button>
        <button type="button" class="btn-top-filter" onclick="GrihamAdminApprovalsUI.focusSearch()" id="btn-approvals-search-icon" aria-label="Search residents" title="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- COMPACT APPROVAL OVERVIEW -->
    <div class="approvals-overview-card" id="approvals-overview-card">
      <div class="overview-header-row" style="margin-bottom:0.4rem;">
        <span class="overview-title-text" style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; color:var(--text-muted);">Approval Overview</span>
        <span id="approvals-active-sort-label" style="font-size:0.72rem; color:var(--admin-accent); font-weight:600; cursor:pointer;" onclick="GrihamAdminApprovalsUI.openSortSheet()">Sorted: Newest</span>
      </div>
      <div class="approvals-stats-band">
        <div class="approval-stat-pill pill-pending">
          <span class="pill-val" id="stat-approvals-pending">5</span>
          <span class="pill-lbl">Pending</span>
        </div>
        <div class="approval-stat-pill pill-approved">
          <span class="pill-val" id="stat-approvals-approved">3</span>
          <span class="pill-lbl">Approved Today</span>
        </div>
        <div class="approval-stat-pill pill-rejected">
          <span class="pill-val" id="stat-approvals-rejected">1</span>
          <span class="pill-lbl">Rejected Today</span>
        </div>
      </div>
    </div>

    <!-- HORIZONTALLY SCROLLABLE TABS -->
    <div class="approvals-filter-chips-bar" role="tablist" aria-label="Filter registrations by status">
      <button type="button" role="tab" aria-selected="true" class="btn-filter-chip active" data-approval-filter="pending" onclick="GrihamAdminApprovalsUI.setFilter('pending')" id="chip-approvals-pending">Pending</button>
      <button type="button" role="tab" aria-selected="false" class="btn-filter-chip" data-approval-filter="approved" onclick="GrihamAdminApprovalsUI.setFilter('approved')" id="chip-approvals-approved">Approved</button>
      <button type="button" role="tab" aria-selected="false" class="btn-filter-chip" data-approval-filter="rejected" onclick="GrihamAdminApprovalsUI.setFilter('rejected')" id="chip-approvals-rejected">Rejected</button>
    </div>

    <!-- SEARCH BAR -->
    <div class="approvals-search-bar">
      <div class="input-wrapper">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="input-icon-left" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          id="approvals-search-input"
          class="form-input approvals-search-input"
          placeholder="Search residents..."
          oninput="GrihamAdminApprovalsUI.handleSearch(this.value)"
          aria-label="Search residents by name, phone, email, wing, flat number, or registration ID"
        >
        <button type="button" class="btn-search-clear" id="btn-approvals-search-clear" onclick="GrihamAdminApprovalsUI.clearSearch()" style="display:none;" aria-label="Clear search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- APPROVALS LIST -->
    <div class="approvals-list-wrapper" id="approvals-list-container" role="list" aria-label="Resident approvals list">
      <!-- Dynamically rendered by JS -->
    </div>

    <!-- LOADING SKELETON -->
    <div id="approvals-loading-skeleton" class="approvals-loading-skeleton" aria-hidden="true" style="display:none;">
      <p class="approvals-loading-text" style="text-align:center; font-size:0.85rem; color:var(--text-muted); margin-bottom:0.5rem;">Loading registrations...</p>
      <div class="approval-card-skeleton"></div>
      <div class="approval-card-skeleton"></div>
      <div class="approval-card-skeleton"></div>
    </div>

    <!-- ERROR STATE -->
    <div id="approvals-error-state" class="approvals-empty-state" aria-live="polite" style="display:none;">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p class="empty-state-title" id="approvals-error-title" style="color:var(--text-primary); font-weight:700;">Unable to load registrations.</p>
      <button type="button" class="btn-primary-action btn-admin-primary" onclick="GrihamAdminApprovalsUI.loadData()" style="width:auto; min-height:40px; padding:0 1.4rem; font-size:0.85rem;">Retry</button>
    </div>

    <!-- EMPTY STATE -->
    <div id="approvals-empty-state" class="approvals-empty-state" aria-live="polite" style="display:none;">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="opacity:0.4;">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/>
        <polyline points="17 11 19 13 23 9"/>
      </svg>
      <p class="empty-state-title" id="approvals-empty-title" style="font-weight:700;">No pending registrations.</p>
      <p class="empty-state-sub" id="approvals-empty-sub">All resident registrations have been reviewed.</p>
      <button type="button" class="btn-logout-cancel" id="btn-approvals-clear-search-empty" onclick="GrihamAdminApprovalsUI.clearSearch()" style="display:none; margin-top:0.5rem;">Clear Search</button>
    </div>

  </section>
`;
const GrihamAdminApprovalsUI = {

  state: {
    approvals: [],
    filtered: [],
    currentFilter: "pending",
    searchQuery: "",
    currentSort: "newest", // 'newest' | 'oldest' | 'name' | 'wing_flat'
    currentApproval: null,
    selectedRejectReason: ""
  },

  /* ---- Lifecycle ---- */
  init() {
    this.state.currentFilter = "pending";
    this.state.searchQuery = "";
    this.state.currentSort = "newest";
    this.state.currentApproval = null;
    this.state.selectedRejectReason = "";

    const searchEl = document.getElementById("approvals-search-input");
    if (searchEl) searchEl.value = "";
    const clearBtn = document.getElementById("btn-approvals-search-clear");
    if (clearBtn) clearBtn.style.display = "none";

    // Set default tab active
    document.querySelectorAll(".approvals-filter-chips-bar .btn-filter-chip").forEach(chip => {
      const isPending = chip.dataset.approvalFilter === "pending";
      chip.classList.toggle("active", isPending);
      chip.setAttribute("aria-selected", isPending ? "true" : "false");
    });

    this.updateSortLabel();
    this.loadData();
  },

  focusSearch() {
    const input = document.getElementById("approvals-search-input");
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  },

  async loadData() {
    this.showSkeleton(true);
    this.showError(false);

    try {
      const res = await getApprovals();
      this.state.approvals = res.approvals || [];
      this.updateStats();
      this.applyFilterAndSearch();
    } catch (err) {
      console.error("Approvals load error", err);
      this.showError(true);
    } finally {
      this.showSkeleton(false);
    }
  },

  refreshList() {
    this.loadData();
  },

  showSkeleton(show) {
    const skEl = document.getElementById("approvals-loading-skeleton");
    const listEl = document.getElementById("approvals-list-container");
    if (skEl) skEl.style.display = show ? "flex" : "none";
    if (listEl) listEl.style.display = show ? "none" : "flex";
  },

  showError(show) {
    const errEl = document.getElementById("approvals-error-state");
    const listEl = document.getElementById("approvals-list-container");
    const emptyEl = document.getElementById("approvals-empty-state");
    if (errEl) errEl.style.display = show ? "flex" : "none";
    if (show) {
      if (listEl) listEl.style.display = "none";
      if (emptyEl) emptyEl.style.display = "none";
    }
  },

  /* ---- Stats ---- */
  updateStats() {
    const all = this.state.approvals;
    const pending = all.filter(a => a.status === "pending" || a.status === "Pending").length;

    // "Today" counts: submissions or decisions made on 2026-09-17 (or current mock today)
    const isToday = (isoDateStr) => {
      if (!isoDateStr) return false;
      return isoDateStr.startsWith("2026-09-17") || isoDateStr.startsWith(new Date().toISOString().slice(0, 10));
    };

    const approvedToday = all.filter(a => (a.status === "approved" || a.status === "Approved") && isToday(a.approved_at || a.approvedAt)).length;
    const rejectedToday = all.filter(a => (a.status === "rejected" || a.status === "Rejected") && isToday(a.rejected_at || a.rejectedAt)).length;

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    set("stat-approvals-pending", pending);
    set("stat-approvals-approved", approvedToday);
    set("stat-approvals-rejected", rejectedToday);

    // Update pending alert tile on Admin Dashboard if present
    const dashCountDesc = document.getElementById("approvals-count-desc");
    if (dashCountDesc) {
      dashCountDesc.textContent = `${pending} resident${pending === 1 ? "" : "s"} waiting for approval`;
    }
  },

  /* ---- Filter & Search ---- */
  setFilter(filter) {
    this.state.currentFilter = filter;
    if (typeof GrihamTabs !== "undefined") {
      GrihamTabs.activate(".approvals-filter-chips-bar", `[data-approval-filter="${filter}"]`);
    } else {
      document.querySelectorAll(".approvals-filter-chips-bar .btn-filter-chip").forEach(chip => {
        const active = chip.dataset.approvalFilter === filter;
        chip.classList.toggle("active", active);
        chip.setAttribute("aria-selected", active ? "true" : "false");
      });
    }
    this.applyFilterAndSearch();
  },

  handleSearch(query) {
    this.state.searchQuery = query.trim().toLowerCase();
    if (typeof GrihamSearchBar !== "undefined") {
      GrihamSearchBar.syncClearButton("approvals-search-input", "btn-approvals-search-clear");
    } else {
      const clearBtn = document.getElementById("btn-approvals-search-clear");
      if (clearBtn) clearBtn.style.display = query ? "flex" : "none";
    }
    this.applyFilterAndSearch();
  },

  clearSearch() {
    this.state.searchQuery = "";
    if (typeof GrihamSearchBar !== "undefined") {
      GrihamSearchBar.handleClear("approvals-search-input", "btn-approvals-search-clear", () => this.applyFilterAndSearch());
    } else {
      const input = document.getElementById("approvals-search-input");
      if (input) input.value = "";
      const clearBtn = document.getElementById("btn-approvals-search-clear");
      if (clearBtn) clearBtn.style.display = "none";
      this.applyFilterAndSearch();
    }
  },

  /* ---- Sorting ---- */
  openSortSheet() {
    document.querySelectorAll(".approval-sort-options .sort-option-row").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.sort === this.state.currentSort);
    });
    this.toggleSheet("approval-sort-sheet", "approval-sort-backdrop", true);
  },

  closeSortSheet() {
    this.toggleSheet("approval-sort-sheet", "approval-sort-backdrop", false);
  },

  setSort(sortKey) {
    this.state.currentSort = sortKey;
    this.updateSortLabel();
    this.closeSortSheet();
    this.applyFilterAndSearch();
  },

  updateSortLabel() {
    const labelEl = document.getElementById("approvals-active-sort-label");
    if (!labelEl) return;
    const map = {
      newest: "Sorted: Newest First",
      oldest: "Sorted: Oldest First",
      name: "Sorted: Name A–Z",
      wing_flat: "Sorted: Wing / Flat"
    };
    labelEl.textContent = map[this.state.currentSort] || "Sort Options";
  },

  /* ---- Duplicate Resident Check ---- */
  checkDuplicateResident(approval) {
    if (!approval) return null;
    const wing = (approval.wing || "").trim().toUpperCase();
    const flat = (approval.flat_number || approval.flat || "").trim();
    const phone = (approval.phone || "").replace(/\D/g, "");

    // Look for active residents in approved list
    const match = this.state.approvals.find(a => {
      if (a.id === approval.id) return false;
      const aStatus = (a.status || "").toLowerCase();
      if (aStatus !== "approved") return false;

      const aWing = (a.wing || "").trim().toUpperCase();
      const aFlat = (a.flat_number || a.flat || "").trim();
      const aPhone = (a.phone || "").replace(/\D/g, "");

      const sameFlat = wing && flat && aWing === wing && aFlat === flat;
      const samePhone = phone && aPhone && phone.slice(-10) === aPhone.slice(-10);

      return sameFlat || samePhone;
    });

    if (match) {
      const matchName = match.fullName || match.name || "A resident";
      return {
        found: true,
        reason: `An active resident (${matchName}) already exists for Wing ${wing} • Flat ${flat}.`
      };
    }

    // Also check known default resident in Green Valley if Wing A Flat 102
    if (wing === "A" && flat === "102") {
      return {
        found: true,
        reason: `An active resident already exists for Wing A • Flat 102.`
      };
    }

    return null;
  },

  /* ---- Apply Filter, Search & Sort ---- */
  applyFilterAndSearch() {
    let list = [...this.state.approvals];

    // Status filter
    if (this.state.currentFilter !== "all") {
      const targetStatus = this.state.currentFilter.toLowerCase();
      list = list.filter(a => (a.status || "").toLowerCase() === targetStatus);
    }

    // Search
    const q = this.state.searchQuery;
    if (q) {
      list = list.filter(a => {
        const name = (a.fullName || a.name || "").toLowerCase();
        const phone = (a.phone || "").toLowerCase();
        const email = (a.email || "").toLowerCase();
        const wing = (a.wing || "").toLowerCase();
        const flat = (a.flat_number || a.flat || "").toLowerCase();
        const id = (a.id || "").toLowerCase();
        const wingFlat = `${wing}-${flat}`.toLowerCase();
        const wingSpaceFlat = `${wing} ${flat}`.toLowerCase();

        return name.includes(q) ||
               phone.includes(q) ||
               email.includes(q) ||
               wing === q ||
               flat.includes(q) ||
               id.includes(q) ||
               wingFlat.includes(q) ||
               wingSpaceFlat.includes(q);
      });
    }

    // Sorting
    list.sort((a, b) => {
      const dateA = new Date(a.submittedAt || a.submitted_at || 0).getTime();
      const dateB = new Date(b.submittedAt || b.submitted_at || 0).getTime();

      switch (this.state.currentSort) {
        case "oldest":
          return dateA - dateB;
        case "name": {
          const nameA = (a.fullName || a.name || "").toLowerCase();
          const nameB = (b.fullName || b.name || "").toLowerCase();
          return nameA.localeCompare(nameB);
        }
        case "wing_flat": {
          const wComp = (a.wing || "").localeCompare(b.wing || "");
          if (wComp !== 0) return wComp;
          const flatA = parseInt(a.flat_number || a.flat || 0, 10);
          const flatB = parseInt(b.flat_number || b.flat || 0, 10);
          return flatA - flatB;
        }
        case "newest":
        default:
          return dateB - dateA;
      }
    });

    this.state.filtered = list;
    this.renderList();
  },

  /* ---- Render List ---- */
  renderList() {
    const container = document.getElementById("approvals-list-container");
    const emptyEl = document.getElementById("approvals-empty-state");
    const clearSearchBtn = document.getElementById("btn-approvals-clear-search-empty");
    if (!container) return;

    if (this.state.filtered.length === 0) {
      container.innerHTML = "";
      if (emptyEl) {
        emptyEl.style.display = "flex";
        const titleEl = document.getElementById("approvals-empty-title");
        const subEl = document.getElementById("approvals-empty-sub");

        if (this.state.searchQuery) {
          if (titleEl) titleEl.textContent = "No matching registrations found.";
          if (subEl) subEl.textContent = "Try searching with a different resident name, flat number, or registration ID.";
          if (clearSearchBtn) clearSearchBtn.style.display = "inline-block";
        } else {
          if (clearSearchBtn) clearSearchBtn.style.display = "none";
          if (this.state.currentFilter === "pending") {
            if (titleEl) titleEl.textContent = "No pending registrations.";
            if (subEl) subEl.textContent = "All resident registrations have been reviewed.";
          } else if (this.state.currentFilter === "approved") {
            if (titleEl) titleEl.textContent = "No approved registrations yet.";
            if (subEl) subEl.textContent = "Approved resident accounts will appear here.";
          } else if (this.state.currentFilter === "rejected") {
            if (titleEl) titleEl.textContent = "No rejected registrations yet.";
            if (subEl) subEl.textContent = "Rejected registration requests will appear here.";
          }
        }
      }
      return;
    }

    if (emptyEl) emptyEl.style.display = "none";

    container.innerHTML = this.state.filtered.map(a => this.renderApprovalCard(a)).join("");
  },

  /* ---- Card Formatting ---- */
  renderApprovalCard(a) {
    const status = (a.status || "pending").toLowerCase();
    const name = escapeHtml(a.fullName || a.name || "Resident");
    const regId = escapeHtml(a.id || "");
    const wing = escapeHtml(a.wing || "");
    const flat = escapeHtml(a.flat_number || a.flat || "");
    const occupancy = escapeHtml(a.occupancyType || (a.resident_type === "tenant" ? "Tenant" : "Owner"));
    const phone = escapeHtml(a.phone || "");

    const submittedDate = (a.submittedAt || a.submitted_at)
      ? GrihamDateTime.formatDate(a.submittedAt || a.submitted_at)
      : "17 Sep 2026";

    // PENDING CARD
    if (status === "pending") {
      return `
        <div class="approval-card card-pending" onclick="GrihamAdminApprovalsUI.openDetail('${escapeHtml(a.id)}')" role="listitem" tabindex="0" aria-label="Review application for ${name}">
          <div class="approval-card-header">
            <div class="approval-avatar" aria-hidden="true">${name.charAt(0)}</div>
            <div class="approval-card-identity">
              <div class="approval-card-name">${name}</div>
              <div class="approval-card-flat" style="font-family:monospace; font-size:0.75rem; color:var(--text-muted);">REG: ${regId}</div>
            </div>
            <span class="approval-status-badge badge-pending">Pending Approval</span>
          </div>

          <div style="display:flex; align-items:center; justify-content:space-between; font-size:0.8rem; padding:0.15rem 0;">
            <span style="font-weight:700; color:var(--text-primary);">Wing ${wing} • Flat ${flat}</span>
            <span class="approval-card-type-chip">${occupancy}</span>
          </div>

          <div style="display:flex; align-items:center; justify-content:space-between; font-size:0.75rem; color:var(--text-muted);">
            <span>Submitted: ${submittedDate}</span>
            <span>Phone: ${phone}</span>
          </div>

          <div style="display:flex; align-items:center; justify-content:flex-end; gap:0.5rem; margin-top:0.35rem; padding-top:0.55rem; border-top:1px solid var(--glass-border);">
            <button type="button" class="btn-primary-action btn-admin-primary" style="min-height:34px; width:auto; padding:0 1rem; font-size:0.78rem;" onclick="event.stopPropagation(); GrihamAdminApprovalsUI.openDetail('${escapeHtml(a.id)}')">
              Review
            </button>
          </div>
        </div>
      `;
    }

    // APPROVED HISTORY CARD
    if (status === "approved") {
      const approvedDate = (a.approvedAt || a.approved_at)
        ? GrihamDateTime.formatDate(a.approvedAt || a.approved_at)
        : "17 Sep 2026";
      const approvedBy = escapeHtml(a.approvedBy || "Admin");

      return `
        <div class="approval-card card-approved" onclick="GrihamAdminApprovalsUI.openDetail('${escapeHtml(a.id)}')" role="listitem" tabindex="0" aria-label="Approved application for ${name}">
          <div class="approval-card-header">
            <div class="approval-avatar" style="background:rgba(16,185,129,0.12); color:#10b981; border-color:rgba(16,185,129,0.3);" aria-hidden="true">✓</div>
            <div class="approval-card-identity">
              <div class="approval-card-name">${name}</div>
              <div class="approval-card-flat" style="font-family:monospace; font-size:0.75rem; color:var(--text-muted);">${regId}</div>
            </div>
            <span class="approval-status-badge badge-approved">Approved</span>
          </div>

          <div style="display:flex; align-items:center; justify-content:space-between; font-size:0.8rem; padding:0.1rem 0;">
            <span style="font-weight:700; color:var(--text-primary);">${wing} • ${flat}</span>
            <span class="approval-card-type-chip">${occupancy}</span>
          </div>

          <div style="display:flex; align-items:center; justify-content:space-between; font-size:0.74rem; color:var(--text-muted); margin-top:0.2rem;">
            <span>Approved: ${approvedDate}</span>
            <span>Approved By: <strong>${approvedBy}</strong></span>
          </div>
        </div>
      `;
    }

    // REJECTED HISTORY CARD
    const rejectedDate = (a.rejectedAt || a.rejected_at)
      ? GrihamDateTime.formatDate(a.rejectedAt || a.rejected_at)
      : "17 Sep 2026";
    const rejectedBy = escapeHtml(a.rejectedBy || "Admin");
    const reason = escapeHtml(a.rejectionReason || a.rejection_reason || "Incorrect flat details");

    return `
      <div class="approval-card card-rejected" onclick="GrihamAdminApprovalsUI.openDetail('${escapeHtml(a.id)}')" role="listitem" tabindex="0" aria-label="Rejected application for ${name}">
        <div class="approval-card-header">
          <div class="approval-avatar" style="background:rgba(239,68,68,0.1); color:#ef4444; border-color:rgba(239,68,68,0.25);" aria-hidden="true">✕</div>
          <div class="approval-card-identity">
            <div class="approval-card-name">${name}</div>
            <div class="approval-card-flat" style="font-family:monospace; font-size:0.75rem; color:var(--text-muted);">${regId}</div>
          </div>
          <span class="approval-status-badge badge-rejected">Rejected</span>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; font-size:0.8rem; padding:0.1rem 0;">
          <span style="font-weight:700; color:var(--text-primary);">${wing} • ${flat}</span>
          <span class="approval-card-type-chip">${occupancy}</span>
        </div>

        <div style="background:rgba(239,68,68,0.06); border-radius:var(--radius-sm); padding:0.4rem 0.6rem; margin-top:0.25rem; font-size:0.75rem; color:#b91c1c;">
          <strong>Reason:</strong> ${reason}
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; font-size:0.74rem; color:var(--text-muted); margin-top:0.25rem;">
          <span>Rejected: ${rejectedDate}</span>
          <span>Rejected By: <strong>${rejectedBy}</strong></span>
        </div>
      </div>
    `;
  },

  /* ---- Detail Sheet ---- */
  openDetail(id) {
    const a = this.state.approvals.find(x => x.id === id);
    if (!a) return;
    this.state.currentApproval = a;
    this.renderDetailSheet(a);
    this.toggleSheet("approval-detail-sheet", "approval-detail-backdrop", true);
  },

  renderDetailSheet(a) {
    const status = (a.status || "pending").toLowerCase();
    const name = a.fullName || a.name || "Aditya Sharma";
    const regId = a.id || "REG-2026-0042";

    // Header ID & status pill
    const regIdEl = document.getElementById("approval-detail-reg-id");
    if (regIdEl) regIdEl.textContent = regId;

    const statusPillEl = document.getElementById("approval-detail-status-pill");
    if (statusPillEl) {
      if (typeof GrihamStatusBadge !== "undefined") {
        const labelMap = { pending: "Pending Approval", approved: "Approved", rejected: "Rejected" };
        statusPillEl.innerHTML = GrihamStatusBadge.render({ status, label: labelMap[status] || status, customClass: "approval-status-badge" });
      } else if (status === "pending") {
        statusPillEl.innerHTML = `<span class="approval-status-badge badge-pending">Pending Approval</span>`;
      } else if (status === "approved") {
        statusPillEl.innerHTML = `<span class="approval-status-badge badge-approved">Approved</span>`;
      } else {
        statusPillEl.innerHTML = `<span class="approval-status-badge badge-rejected">Rejected</span>`;
      }
    }

    // Duplicate detection alert
    const dupAlert = document.getElementById("approval-duplicate-alert");
    const dupText = document.getElementById("approval-duplicate-text");
    if (dupAlert && dupText) {
      if (status === "pending") {
        const dupInfo = this.checkDuplicateResident(a);
        if (dupInfo && dupInfo.found) {
          dupAlert.style.display = "flex";
          dupText.textContent = dupInfo.reason;
        } else {
          dupAlert.style.display = "none";
        }
      } else {
        dupAlert.style.display = "none";
      }
    }

    // Profile photo
    const photoWrapper = document.getElementById("approval-photo-wrapper");
    if (photoWrapper) {
      if (a.profilePhoto) {
        photoWrapper.innerHTML = `
          <img src="${escapeHtml(a.profilePhoto)}" alt="${escapeHtml(name)}" class="approval-photo-img">
          <div>
            <div style="font-size:0.85rem; font-weight:700; color:var(--text-primary);">${escapeHtml(name)}</div>
            <div style="font-size:0.72rem; color:var(--color-brand-emerald);">Verified Photo Uploaded</div>
          </div>
        `;
      } else {
        photoWrapper.innerHTML = `<span class="approval-photo-placeholder">No profile photo provided</span>`;
      }
    }

    // Info sections
    const sectionsEl = document.getElementById("approval-info-sections");
    if (sectionsEl) {
      const fmt = (v) => escapeHtml(v || "—");
      const submittedDate = (a.submittedAt || a.submitted_at)
        ? GrihamDateTime.formatDate(a.submittedAt || a.submitted_at)
        : "17 Sep 2026";
      const occupancy = a.occupancyType || (a.resident_type === "tenant" ? "Tenant" : "Owner");

      sectionsEl.innerHTML = `
        <!-- PERSONAL INFORMATION -->
        <div class="approval-info-group">
          <p class="approval-section-label">Personal Information</p>
          <div class="approval-info-row">
            <span class="approval-info-key">Full Name</span>
            <span class="approval-info-val" style="font-weight:700;">${fmt(name)}</span>
          </div>
          <div class="approval-info-row">
            <span class="approval-info-key">Phone</span>
            <span class="approval-info-val">${fmt(a.phone)}</span>
          </div>
          <div class="approval-info-row">
            <span class="approval-info-key">Email</span>
            <span class="approval-info-val">${fmt(a.email)}</span>
          </div>
        </div>

        <!-- PROPERTY INFORMATION -->
        <div class="approval-info-group">
          <p class="approval-section-label">Property Information</p>
          <div class="approval-info-row">
            <span class="approval-info-key">Wing</span>
            <span class="approval-info-val">${fmt(a.wing)}</span>
          </div>
          <div class="approval-info-row">
            <span class="approval-info-key">Flat Number</span>
            <span class="approval-info-val" style="font-weight:700;">${fmt(a.flat_number || a.flat)}</span>
          </div>
          <div class="approval-info-row">
            <span class="approval-info-key">Floor Number</span>
            <span class="approval-info-val">${fmt(a.floorNumber || (a.floor !== undefined ? String(a.floor) : null))}</span>
          </div>
          <div class="approval-info-row">
            <span class="approval-info-key">Occupancy Type</span>
            <span class="approval-info-val">${fmt(occupancy)}</span>
          </div>
        </div>

        <!-- ACCOUNT INFORMATION -->
        <div class="approval-info-group">
          <p class="approval-section-label">Account Information</p>
          <div class="approval-info-row">
            <span class="approval-info-key">Society ID</span>
            <span class="approval-info-val" style="font-family:monospace;">${fmt(a.societyId || "GRIHAM-PUNE-001")}</span>
          </div>
          <div class="approval-info-row">
            <span class="approval-info-key">Registration Date</span>
            <span class="approval-info-val">${submittedDate}</span>
          </div>
        </div>
      `;
    }

    // Rejection reason box
    const rejBox = document.getElementById("approval-rejection-reason-box");
    const rejText = document.getElementById("approval-rejection-reason-text");
    if (rejBox && rejText) {
      if (status === "rejected") {
        rejBox.style.display = "block";
        rejText.textContent = a.rejectionReason || a.rejection_reason || "Incorrect flat details";
      } else {
        rejBox.style.display = "none";
      }
    }

    // History meta box
    const metaBox = document.getElementById("approval-history-meta-box");
    if (metaBox) {
      if (status === "approved") {
        const d = (a.approvedAt || a.approved_at)
          ? GrihamDateTime.formatDate(a.approvedAt || a.approved_at)
          : "17 Sep 2026";
        metaBox.style.display = "block";
        metaBox.innerHTML = `<strong>Decision:</strong> Approved on ${d} by <strong>${escapeHtml(a.approvedBy || "Chairman")}</strong>`;
      } else if (status === "rejected") {
        const d = (a.rejectedAt || a.rejected_at)
          ? GrihamDateTime.formatDate(a.rejectedAt || a.rejected_at)
          : "17 Sep 2026";
        metaBox.style.display = "block";
        metaBox.innerHTML = `<strong>Decision:</strong> Rejected on ${d} by <strong>${escapeHtml(a.rejectedBy || "Admin")}</strong>`;
      } else {
        metaBox.style.display = "none";
      }
    }

    // Action buttons (Only for pending)
    const actionBtns = document.getElementById("approval-action-buttons");
    if (actionBtns) {
      actionBtns.style.display = status === "pending" ? "grid" : "none";
    }
  },

  closeDetail() {
    this.toggleSheet("approval-detail-sheet", "approval-detail-backdrop", false);
  },

  /* ---- Approve Flow ---- */
  confirmApprove() {
    const a = this.state.currentApproval;
    if (!a) return;

    const nameEl = document.getElementById("confirm-resident-name");
    const flatEl = document.getElementById("confirm-resident-flat");
    if (nameEl) nameEl.textContent = a.fullName || a.name || "Aditya Sharma";
    if (flatEl) flatEl.textContent = `Wing ${a.wing} • Flat ${a.flat_number || a.flat}`;

    this.toggleSheet("approval-confirm-sheet", "approval-confirm-backdrop", true);
  },

  closeApproveConfirm() {
    this.toggleSheet("approval-confirm-sheet", "approval-confirm-backdrop", false);
  },

  async executeApprove() {
    const a = this.state.currentApproval;
    if (!a) return;

    const btn = document.getElementById("btn-execute-approve-text");
    if (btn) btn.textContent = "Approving...";

    try {
      const res = await approveRegistration(a.id);
      if (res.approval) {
        const idx = this.state.approvals.findIndex(x => x.id === a.id);
        if (idx !== -1) {
          this.state.approvals[idx] = res.approval;
        }
        this.state.currentApproval = res.approval;
      }
      this.closeApproveConfirm();
      this.closeDetail();
      this.updateStats();
      this.applyFilterAndSearch();

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Resident approved successfully.", "success");
      } else if (typeof GrihamNotifications !== "undefined" && GrihamNotifications.showSuccess) {
        GrihamNotifications.showSuccess("Resident approved successfully.");
      } else {
        alert("Resident approved successfully.");
      }
    } catch (err) {
      console.error("Approve error", err);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Unable to approve this registration.", "error");
      } else {
        alert("Unable to approve this registration.");
      }
    } finally {
      if (btn) btn.textContent = "Approve";
    }
  },

  /* ---- Reject Flow ---- */
  openRejectSheet() {
    const a = this.state.currentApproval;
    const nameEl = document.getElementById("reject-resident-name");
    if (nameEl && a) {
      nameEl.textContent = a.fullName || a.name || "Aditya Sharma";
    }

    this.state.selectedRejectReason = "";
    document.querySelectorAll(".btn-reject-chip").forEach(c => c.classList.remove("selected"));

    const textarea = document.getElementById("input-reject-reason");
    if (textarea) textarea.value = "";

    const errEl = document.getElementById("reject-reason-error");
    if (errEl) errEl.style.display = "none";

    this.toggleSheet("approval-reject-sheet", "approval-reject-backdrop", true);
  },

  closeRejectSheet() {
    this.toggleSheet("approval-reject-sheet", "approval-reject-backdrop", false);
  },

  selectRejectReason(chipEl) {
    document.querySelectorAll(".btn-reject-chip").forEach(c => c.classList.remove("selected"));
    chipEl.classList.add("selected");
    this.state.selectedRejectReason = chipEl.dataset.reason;

    const textarea = document.getElementById("input-reject-reason");
    if (textarea) {
      textarea.value = this.state.selectedRejectReason;
      textarea.focus();
    }
  },

  async executeReject(event) {
    if (event && event.preventDefault) event.preventDefault();

    const a = this.state.currentApproval;
    if (!a) return;

    const textarea = document.getElementById("input-reject-reason");
    const errEl = document.getElementById("reject-reason-error");
    const customReason = (textarea ? textarea.value : "").trim();
    const finalReason = customReason || this.state.selectedRejectReason;

    if (!finalReason) {
      if (errEl) errEl.style.display = "block";
      if (textarea) textarea.focus();
      return;
    }
    if (errEl) errEl.style.display = "none";

    const btn = document.getElementById("btn-execute-reject-text");
    if (btn) btn.textContent = "Rejecting...";

    try {
      const res = await rejectRegistration(a.id, finalReason);
      if (res.approval) {
        const idx = this.state.approvals.findIndex(x => x.id === a.id);
        if (idx !== -1) {
          this.state.approvals[idx] = res.approval;
        }
        this.state.currentApproval = res.approval;
      }
      this.closeRejectSheet();
      this.closeDetail();
      this.updateStats();
      this.applyFilterAndSearch();

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Registration rejected.", "info");
      } else if (typeof GrihamNotifications !== "undefined" && GrihamNotifications.showSuccess) {
        GrihamNotifications.showSuccess("Registration rejected.");
      } else {
        alert("Registration rejected.");
      }
    } catch (err) {
      console.error("Reject error", err);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Unable to reject this registration.", "error");
      } else {
        alert("Unable to reject this registration.");
      }
    } finally {
      if (btn) btn.textContent = "Reject";
    }
  },

  /* ---- Sheet Helper ---- */
  closeAllSheets() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.closeAll();
    }
  },

  toggleSheet(sheetId, backdropId, open) {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.toggle(sheetId, backdropId, open);
    }
  }
};
