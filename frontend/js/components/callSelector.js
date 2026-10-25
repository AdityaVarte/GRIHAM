
/* HTML TEMPLATE EXTRACTED FROM index.html */
window.HTML_CALLSELECTOR = `
<div class="mobile-bottom-sheet call-selector-sheet" id="call-selector-sheet" role="dialog" aria-modal="true" aria-labelledby="call-selector-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamCallSelectorUI.close()" aria-label="Close call selector" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="call-selector-title">Call Contact</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <!-- Subtitle / Context tag -->
    <div class="call-selector-meta-row" id="call-selector-meta" style="display:none;">
      <span class="call-category-badge" id="call-selector-badge">General</span>
    </div>

    <!-- Search contacts input -->
    <div class="call-search-wrap">
      <div class="input-wrapper">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="input-icon-left" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          id="call-selector-search-input"
          class="form-input call-search-input"
          placeholder="Search contacts..."
          oninput="GrihamCallSelectorUI.handleSearch(this.value)"
          aria-label="Search contacts by name, role, or phone"
        >
        <button type="button" class="btn-search-clear" id="btn-call-search-clear" onclick="GrihamCallSelectorUI.clearSearch()" style="display:none;" aria-label="Clear contact search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div class="call-selector-loading" id="call-selector-loading" style="display:none;">
      <div class="worker-card-skeleton" style="height:62px;"></div>
      <div class="worker-card-skeleton" style="height:62px;"></div>
      <div class="worker-card-skeleton" style="height:62px;"></div>
    </div>

    <!-- Error State -->
    <div class="call-selector-error" id="call-selector-error" style="display:none;">
      <p style="color:#ef4444; font-size:0.85rem; margin-bottom:0.4rem;">Unable to load contacts.</p>
      <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamCallSelectorUI.reload()" style="min-height:36px; padding:0 1rem; font-size:0.8rem;">
        Retry
      </button>
    </div>

    <!-- Contact List Container -->
    <div class="call-contacts-list" id="call-contacts-list">
      <!-- Populated dynamically by JS -->
    </div>

    <!-- Call New Option (Always at bottom) -->
    <div class="call-new-divider"></div>
    <div class="call-new-container">
      <button type="button" class="btn-call-new-dialer" onclick="GrihamCallSelectorUI.callNew()" aria-label="Call a new number in phone dialer">
        <div class="call-new-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        <div class="call-new-texts">
          <strong class="call-new-title">+ Call New</strong>
          <span class="call-new-sub">Open empty phone dialer</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="call-new-arrow" aria-hidden="true">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  </div>
`;
const GrihamCallSelectorUI = {
  state: {
    isOpen: false,
    category: "",
    contactType: "all", // "worker", "vendor", or "all"
    assignedContact: null,
    contacts: [],
    filtered: [],
    searchQuery: ""
  },

  /**
   * Open call selector for a specific complaint
   */
  async openForComplaint(complaint) {
    if (!complaint) return;
    const category = complaint.category || "General";
    const assigned = complaint.assigned_to && complaint.assigned_to.name && complaint.assigned_to.name !== "Unassigned"
      ? complaint.assigned_to
      : null;

    await this.open({
      category: category,
      contactType: "all",
      assignedContact: assigned,
      title: `Call ${category}`
    });
  },

  /**
   * Open call selector for a specific service request
   */
  async openForServiceRequest(request) {
    if (!request) return;
    const category = request.category || "General";
    let assigned = null;
    if (request.assignedProviderId && request.assignedProviderName) {
      assigned = {
        id: request.assignedProviderId,
        name: request.assignedProviderName,
        role: request.category || "Vendor",
        phone: request.assignedProviderPhone || "",
        type: request.assignedProviderType || "Vendor"
      };
    }

    await this.open({
      category: category,
      contactType: "all",
      assignedContact: assigned,
      title: `Call ${category}`
    });
  },

  /**
   * Open call selector for a worker role (e.g., Security Guard, Plumber)
   */
  async openForWorkerRole(role, currentWorkerId = null) {
    const roleClean = role || "Worker";
    let assigned = null;

    if (currentWorkerId && typeof GrihamAdminWorkersUI !== "undefined") {
      const found = GrihamAdminWorkersUI.state.workers.find(w => w.id === currentWorkerId);
      if (found) {
        assigned = {
          id: found.id,
          name: found.name,
          role: found.role,
          phone: found.phone,
          type: "Worker"
        };
      }
    }

    await this.open({
      category: roleClean,
      contactType: "worker",
      assignedContact: assigned,
      title: `Call ${roleClean}`
    });
  },

  /**
   * Main open method
   */
  async open(options = {}) {
    this.state.isOpen = true;
    this.state.category = options.category || "General";
    this.state.contactType = options.contactType || "all";
    this.state.assignedContact = options.assignedContact || null;
    this.state.searchQuery = "";
    this.state.contacts = [];
    this.state.filtered = [];

    const titleEl = document.getElementById("call-selector-title");
    if (titleEl) {
      titleEl.textContent = options.title || `Call ${this.state.category}`;
    }

    const badgeEl = document.getElementById("call-selector-badge");
    const metaRow = document.getElementById("call-selector-meta");
    if (badgeEl && metaRow) {
      badgeEl.textContent = this.state.category;
      metaRow.style.display = "flex";
    }

    const searchInput = document.getElementById("call-selector-search-input");
    if (searchInput) searchInput.value = "";
    const clearBtn = document.getElementById("btn-call-search-clear");
    if (clearBtn) clearBtn.style.display = "none";

    this.toggleSheet(true);
    await this.loadContacts();
  },

  async loadContacts() {
    const loadingEl = document.getElementById("call-selector-loading");
    const errorEl = document.getElementById("call-selector-error");
    const listEl = document.getElementById("call-contacts-list");

    if (loadingEl) loadingEl.style.display = "flex";
    if (errorEl) errorEl.style.display = "none";
    if (listEl) listEl.innerHTML = "";

    try {
      const res = await getContactsByCategory(this.state.category, {
        contact_type: this.state.contactType
      });

      let rawContacts = res.contacts || [];

      // Sort: if assignedContact provided, place it first
      if (this.state.assignedContact) {
        const assignedId = this.state.assignedContact.id || this.state.assignedContact.name;
        const assignedPhone = (this.state.assignedContact.phone || "").replace(/\D/g, "");

        const existingIdx = rawContacts.findIndex(c => 
          (c.id && c.id === assignedId) || 
          (c.name && c.name.toLowerCase() === (this.state.assignedContact.name || "").toLowerCase()) ||
          (assignedPhone && c.phone && c.phone.replace(/\D/g, "") === assignedPhone)
        );

        if (existingIdx >= 0) {
          const matched = rawContacts.splice(existingIdx, 1)[0];
          matched.is_assigned = true;
          rawContacts.unshift(matched);
        } else if (this.state.assignedContact.phone) {
          // Add assigned contact synthesized if not already in returned list
          rawContacts.unshift({
            id: this.state.assignedContact.id || "assigned-contact",
            name: this.state.assignedContact.name,
            role: this.state.assignedContact.role || this.state.category,
            phone: this.state.assignedContact.phone,
            type: (this.state.assignedContact.type || "contact").toLowerCase(),
            is_assigned: true
          });
        }
      }

      this.state.contacts = rawContacts;
      this.applyFilter();
    } catch (err) {
      console.error("Error loading contacts for call selector", err);
      if (errorEl) errorEl.style.display = "block";
    } finally {
      if (loadingEl) loadingEl.style.display = "none";
    }
  },

  reload() {
    this.loadContacts();
  },

  handleSearch(query) {
    this.state.searchQuery = (query || "").trim().toLowerCase();
    const clearBtn = document.getElementById("btn-call-search-clear");
    if (clearBtn) clearBtn.style.display = this.state.searchQuery ? "flex" : "none";
    this.applyFilter();
  },

  clearSearch() {
    this.state.searchQuery = "";
    const input = document.getElementById("call-selector-search-input");
    if (input) input.value = "";
    const clearBtn = document.getElementById("btn-call-search-clear");
    if (clearBtn) clearBtn.style.display = "none";
    this.applyFilter();
  },

  applyFilter() {
    const q = this.state.searchQuery;
    const phoneDigits = q ? q.replace(/\D/g, "") : "";

    if (!q) {
      this.state.filtered = [...this.state.contacts];
    } else {
      this.state.filtered = this.state.contacts.filter(c => {
        const nameMatch = (c.name || "").toLowerCase().includes(q);
        const roleMatch = (c.role || "").toLowerCase().includes(q);
        const phoneMatch = phoneDigits.length > 0 && (c.phone || "").replace(/\D/g, "").includes(phoneDigits);
        return nameMatch || roleMatch || phoneMatch;
      });
    }

    this.renderList();
  },

  renderList() {
    const listEl = document.getElementById("call-contacts-list");
    if (!listEl) return;

    if (this.state.filtered.length === 0) {
      const msg = this.state.searchQuery
        ? "No matching contacts found."
        : "No contacts available for this category.";
      listEl.innerHTML = `
        <div class="call-selector-empty">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="opacity:0.45;">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <p class="call-empty-text">${escapeHtml(msg)}</p>
        </div>
      `;
      return;
    }

    const assigned = this.state.filtered.filter(c => c.is_assigned);
    const others = this.state.filtered.filter(c => !c.is_assigned);

    let html = "";

    if (assigned.length > 0) {
      html += `
        <div class="call-section-tag">
          <span>Assigned Contact</span>
        </div>
        ${assigned.map(c => this.renderContactCard(c, true)).join("")}
      `;
      if (others.length > 0) {
        html += `
          <div class="call-section-tag" style="margin-top:0.4rem;">
            <span>Other Available Contacts</span>
          </div>
        `;
      }
    }

    html += others.map(c => this.renderContactCard(c, false)).join("");
    listEl.innerHTML = html;
  },

  renderContactCard(c, isAssigned = false) {
    const isVendor = (c.type || "").toLowerCase() === "vendor";
    const typeLabel = isVendor ? "Vendor" : "Staff Worker";
    const typeClass = isVendor ? "type-vendor" : "type-worker";
    const name = escapeHtml(c.name || "Unknown");
    const role = escapeHtml(c.role || "Contact");
    const phone = escapeHtml(c.phone || "");

    return `
      <div class="call-contact-card ${isAssigned ? "card-assigned" : ""}" onclick="GrihamCallSelectorUI.dial('${encodeURIComponent(c.phone || "")}')" role="button" tabindex="0" aria-label="Call ${name}, ${role}, phone ${phone}">
        <div class="call-card-left">
          <div class="call-contact-avatar ${typeClass}" aria-hidden="true">
            ${isVendor 
              ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`
              : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
            }
          </div>
          <div class="call-contact-info">
            <div class="call-name-row">
              <strong class="call-contact-name">${name}</strong>
              <span class="call-contact-type-tag ${typeClass}">${typeLabel}</span>
              ${isAssigned ? `<span class="call-assigned-badge">Assigned</span>` : ""}
            </div>
            <span class="call-contact-role">${role}</span>
            <span class="call-contact-phone">${phone}</span>
          </div>
        </div>
        <button type="button" class="btn-dial-action" onclick="event.stopPropagation(); GrihamCallSelectorUI.dial('${encodeURIComponent(c.phone || "")}')" aria-label="Call ${name}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span>Call</span>
        </button>
      </div>
    `;
  },

  /**
   * Dial a specific phone number
   */
  dial(encodedPhone) {
    if (!encodedPhone) return;
    const cleanNumber = decodeURIComponent(encodedPhone).replace(/[^\d+]/g, "");
    if (!cleanNumber) return;

    // Trigger standard device dialer action
    window.location.href = `tel:${cleanNumber}`;
  },

  /**
   * Call New: trigger empty dialer
   */
  callNew() {
    // Open empty phone dialer on device / mobile OS
    window.location.href = "tel:";
  },

  close() {
    this.toggleSheet(false);
    this.state.isOpen = false;
  },

  toggleSheet(open) {
    const sheet = document.getElementById("call-selector-sheet");
    const backdrop = document.getElementById("call-selector-backdrop");
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
  }
};
