/**
 * GRIHAM FRONTEND - GATEKEEPER NOTIFICATIONS CONTROLLER & VIEW
 * Screen: Gatekeeper Security Terminal Notifications (#/gatekeeper/notifications)
 * Mobile-first operational security console notification center.
 */

window.HTML_GATEKEEPER_NOTIFICATIONS = `
<!-- ================================================================= -->
<!-- 1. NOTIFICATION DETAIL BOTTOM SHEET                               -->
<!-- ================================================================= -->
<div class="sheet-backdrop" id="backdrop-gk-notif-detail" onclick="GrihamGatekeeperNotificationsUI.closeDetail()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="sheet-gk-notif-detail" role="dialog" aria-modal="true" aria-labelledby="gk-detail-notif-title" aria-hidden="true" style="max-height:88vh; overflow-y:auto; padding-bottom:calc(2rem + var(--safe-bottom, 20px));">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <div class="sheet-header-info">
      <span class="sheet-kicker" id="gk-detail-notif-id">NOTIF-001</span>
      <h2 class="sheet-title" id="gk-detail-notif-title" data-i18n="title_notification_detail">Notification Details</h2>
    </div>
    <button type="button" class="btn-sheet-back" onclick="GrihamGatekeeperNotificationsUI.closeDetail()" aria-label="Close Notification Details">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>

  <div class="visitor-detail-body" style="padding:0.25rem 0;">
    <!-- Badges Row -->
    <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
      <div style="display:flex; align-items:center; gap:0.4rem;" id="gk-detail-badges-wrap">
        <span class="gk-notif-cat-badge" id="gk-detail-cat-badge">Security</span>
        <span class="gk-notif-priority-badge" id="gk-detail-priority-badge">Important</span>
      </div>
      <div id="gk-detail-read-badge-wrap"></div>
    </div>

    <!-- Metadata Grid -->
    <div class="visitor-info-grid" style="margin-bottom:0.85rem;">
      <div class="visitor-info-item">
        <span class="info-label" data-i18n="label_notification_sender">Sender / Source</span>
        <span class="info-val" id="gk-detail-sender">Management Office</span>
      </div>

      <div class="visitor-info-item">
        <span class="info-label" data-i18n="label_notification_target">Target Audience</span>
        <span class="info-val" id="gk-detail-target">Gatekeepers &amp; Security</span>
      </div>

      <div class="visitor-info-item" style="grid-column:1 / -1;">
        <span class="info-label">Timestamp</span>
        <span class="info-val" id="gk-detail-timestamp">—</span>
      </div>
    </div>

    <!-- Full Message / Content Box -->
    <div class="visitor-notes-box" style="margin-bottom:1.1rem; padding:0.9rem; background:rgba(255,255,255,0.03); border:1px solid var(--glass-border); border-radius:var(--radius-md, 10px);">
      <h3 style="font-size:0.95rem; font-weight:700; color:var(--text-primary); margin-bottom:0.4rem;" id="gk-detail-content-heading">Notice</h3>
      <p class="visitor-notes-text" id="gk-detail-message" style="font-size:0.88rem; line-height:1.5; color:var(--text-secondary); white-space:pre-wrap;">No message available.</p>
    </div>

    <!-- Action Buttons -->
    <div class="visitor-detail-actions" style="margin-top:0.5rem; display:flex; flex-direction:column; gap:0.6rem;">
      <button type="button" class="btn-primary-action btn-gatekeeper-style" id="btn-toggle-read-status" onclick="GrihamGatekeeperNotificationsUI.handleToggleReadClick()" style="min-height:46px; width:100%;">
        <span id="btn-toggle-read-label" data-i18n="btn_mark_read">Mark as Read</span>
      </button>

      <button type="button" class="btn-sheet-cancel" onclick="GrihamGatekeeperNotificationsUI.closeDetail()" style="width:100%; min-height:42px;" data-i18n="btn_cancel">
        Close
      </button>
    </div>
  </div>
</div>

<!-- ================================================================= -->
<!-- 2. MAIN GATEKEEPER NOTIFICATIONS VIEW                             -->
<!-- ================================================================= -->
<section id="screen-gatekeeper-notifications" class="app-view gatekeeper-terminal-view" aria-labelledby="gk-notif-header-title">

  <!-- Top Navigation Bar -->
  <div class="screen-top-bar gk-visitors-top-bar" style="margin-bottom:0.25rem;">
    <button class="btn-top-back" id="btn-gk-notif-back" onclick="GrihamRouter.navigate('/gatekeeper/home')" aria-label="Back to Terminal">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      <span data-i18n="nav_back">Terminal</span>
    </button>

    <h1 class="top-bar-title" id="gk-notif-header-title" data-i18n="title_gatekeeper_notifications">Notifications</h1>

    <div class="gk-topbar-actions">
      <!-- Accessibility Trigger -->
      <button type="button" class="gk-topbar-btn" id="btn-gk-notif-a11y" onclick="GrihamA11y.toggleSheet(true)" aria-label="Accessibility Settings" title="Accessibility Panel">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
          <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
          <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
          <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
          <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
        </svg>
      </button>
    </div>
  </div>

  <!-- Today's Notifications Summary Counter Strip -->
  <div class="gk-visitor-summary-strip" style="grid-template-columns: repeat(3, 1fr);">
    <button type="button" class="gk-vsum-card" onclick="GrihamGatekeeperNotificationsUI.setFilter('All')" aria-label="Filter All Notifications">
      <span class="gk-vsum-val blue" id="gk-sum-val-total">0</span>
      <span class="gk-vsum-lbl" data-i18n="stat_total_notifs">Total</span>
    </button>

    <button type="button" class="gk-vsum-card" onclick="GrihamGatekeeperNotificationsUI.setFilter('Unread')" aria-label="Filter Unread Notifications">
      <span class="gk-vsum-val amber" id="gk-sum-val-unread">0</span>
      <span class="gk-vsum-lbl" data-i18n="filter_unread">Unread</span>
    </button>

    <button type="button" class="gk-vsum-card" onclick="GrihamGatekeeperNotificationsUI.setFilter('Read')" aria-label="Filter Read Notifications">
      <span class="gk-vsum-val emerald" id="gk-sum-val-read">0</span>
      <span class="gk-vsum-lbl" data-i18n="filter_read">Read</span>
    </button>
  </div>

  <!-- Search & Filter Area -->
  <div class="gk-search-filter-section">
    <!-- Search Bar -->
    <div class="search-input-wrapper">
      <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input type="search" id="input-search-notifications" class="form-input search-input" placeholder="Search notifications by title, message, category..." oninput="GrihamGatekeeperNotificationsUI.handleSearch(this.value)" aria-label="Search notifications">
      <button type="button" class="search-clear-btn" id="btn-clear-notif-search" onclick="GrihamGatekeeperNotificationsUI.clearSearch()" aria-label="Clear search" style="display:none;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Status & Category Filter Pills -->
    <div class="gk-filter-pills-row" role="tablist" aria-label="Filter notifications">
      <button type="button" class="gk-filter-pill active" data-filter="All" onclick="GrihamGatekeeperNotificationsUI.setFilter('All')" role="tab" aria-selected="true" data-i18n="filter_all">All</button>
      <button type="button" class="gk-filter-pill" data-filter="Unread" onclick="GrihamGatekeeperNotificationsUI.setFilter('Unread')" role="tab" aria-selected="false" data-i18n="filter_unread">Unread</button>
      <button type="button" class="gk-filter-pill" data-filter="Read" onclick="GrihamGatekeeperNotificationsUI.setFilter('Read')" role="tab" aria-selected="false" data-i18n="filter_read">Read</button>
      <button type="button" class="gk-filter-pill" data-filter="Security" onclick="GrihamGatekeeperNotificationsUI.setFilter('Security')" role="tab" aria-selected="false" data-i18n="filter_security">Security</button>
      <button type="button" class="gk-filter-pill" data-filter="Operations" onclick="GrihamGatekeeperNotificationsUI.setFilter('Operations')" role="tab" aria-selected="false" data-i18n="filter_operations">Operations</button>
    </div>
  </div>

  <!-- Loading State Indicator -->
  <div id="gk-notif-loader" style="display:none; padding:2rem 0; text-align:center;">
    <div class="griham-spinner" style="margin:0 auto 0.5rem; width:28px; height:28px; border-width:3px;"></div>
    <span style="font-size:0.85rem; color:var(--text-secondary);">Loading notifications...</span>
  </div>

  <!-- Empty State Container -->
  <div id="gk-notif-empty-container" style="display:none;"></div>

  <!-- Notification List Container -->
  <div id="gk-notif-list-container" class="gk-visitor-list" role="region" aria-label="Notifications List">
    <!-- Populated dynamically by Controller -->
  </div>

</section>
`;

/**
 * Gatekeeper Notifications UI Controller
 */
const GrihamGatekeeperNotificationsUI = {
  notifications: [],
  summary: {
    total: 0,
    unread: 0,
    read: 0
  },
  selectedNotification: null,
  currentFilter: "All",
  searchQuery: "",
  searchDebounceTimer: null,

  async init() {
    // Check deep-linking query parameters from hash e.g. #/gatekeeper/notifications?filter=Unread or ?id=notif-7
    const hash = window.location.hash || "";
    if (hash.includes("?")) {
      const qs = hash.split("?")[1] || "";
      const params = new URLSearchParams(qs);
      const filter = params.get("filter");
      const id = params.get("id");

      if (filter && ["Unread", "Read", "Security", "Operations", "All"].includes(filter)) {
        this.currentFilter = filter;
      }

      if (id) {
        setTimeout(() => this.openDetail(id), 200);
      }
    }

    this.updateFilterPillsUI();
    await this.loadSummary();
    await this.loadNotifications();
    this.applyTranslations();
  },

  destroy() {
    this.closeDetail();
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
  },

  updateFilterPillsUI() {
    const pills = document.querySelectorAll("#screen-gatekeeper-notifications .gk-filter-pill");
    pills.forEach(p => {
      const pillFilter = p.getAttribute("data-filter");
      const isActive = pillFilter === this.currentFilter;
      p.classList.toggle("active", isActive);
      p.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  },

  async loadSummary() {
    try {
      const summaryFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.getGatekeeperNotificationSummary === "function")
        ? GrihamAPI.getGatekeeperNotificationSummary
        : window.getGatekeeperNotificationSummary;

      if (!summaryFn) return;

      const res = await summaryFn();
      if (res && res.summary) {
        this.summary = res.summary;
        const totalEl = document.getElementById("gk-sum-val-total");
        const unreadEl = document.getElementById("gk-sum-val-unread");
        const readEl = document.getElementById("gk-sum-val-read");

        if (totalEl) totalEl.textContent = this.summary.total || 0;
        if (unreadEl) unreadEl.textContent = this.summary.unread || 0;
        if (readEl) readEl.textContent = this.summary.read || 0;
      }
    } catch (err) {
      console.warn("[GK Notifications] Failed to load summary counts:", err);
    }
  },

  async loadNotifications() {
    const loader = document.getElementById("gk-notif-loader");
    const container = document.getElementById("gk-notif-list-container");
    const emptyContainer = document.getElementById("gk-notif-empty-container");

    if (loader) loader.style.display = "block";
    if (container) container.style.display = "none";
    if (emptyContainer) emptyContainer.style.display = "none";

    try {
      const getFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.getGatekeeperNotifications === "function")
        ? GrihamAPI.getGatekeeperNotifications
        : window.getGatekeeperNotifications;

      if (!getFn) {
        throw new Error("Notifications API not available.");
      }

      const params = {};
      if (this.currentFilter && this.currentFilter !== "All") {
        params.filter = this.currentFilter;
      }
      if (this.searchQuery) {
        params.search = this.searchQuery;
      }

      const res = await getFn(params);
      const notifs = (res && res.notifications) || [];
      this.notifications = notifs;

      if (loader) loader.style.display = "none";

      if (notifs.length === 0) {
        this.renderEmptyState();
      } else {
        if (container) {
          container.style.display = "flex";
          this.renderList(notifs);
        }
      }
    } catch (err) {
      console.error("[GK Notifications] Failed to load list:", err);
      if (loader) loader.style.display = "none";
      if (container) container.style.display = "none";
      if (emptyContainer) {
        emptyContainer.style.display = "block";
        emptyContainer.innerHTML = `
          <div style="text-align:center; padding:2rem 1rem; color:var(--text-secondary);">
            <p>${err.message || "Failed to load notifications."}</p>
            <button type="button" class="btn-primary-action" onclick="GrihamGatekeeperNotificationsUI.loadNotifications()" style="max-width:200px; margin:0.8rem auto 0;">Retry</button>
          </div>
        `;
      }
    }
  },

  renderList(notifs) {
    const container = document.getElementById("gk-notif-list-container");
    if (!container) return;

    container.innerHTML = notifs.map(n => {
      const isUnread = n.unread;
      const isUrgent = n.priority === "Urgent";
      const isImportant = n.priority === "Important";

      const badgeHtml = (typeof GrihamStatusBadge !== "undefined" && typeof GrihamStatusBadge.render === "function")
        ? GrihamStatusBadge.render({ status: isUnread ? "unread" : "read", variant: "pill" })
        : `<span class="status-pill ${isUnread ? 'badge-progress' : 'badge-approved'}">${isUnread ? 'Unread' : 'Read'}</span>`;

      let priorityTag = "";
      if (isUrgent) {
        priorityTag = `<span style="font-size:0.68rem; font-weight:700; color:#ef4444; background:rgba(239,68,68,0.12); padding:0.12rem 0.4rem; border-radius:4px;">URGENT</span>`;
      } else if (isImportant) {
        priorityTag = `<span style="font-size:0.68rem; font-weight:700; color:var(--color-brand-amber, #f59e0b); background:rgba(245,158,11,0.12); padding:0.12rem 0.4rem; border-radius:4px;">IMPORTANT</span>`;
      }

      return `
        <article class="gk-visitor-card gk-notif-card ${isUnread ? 'unread' : ''}" onclick="GrihamGatekeeperNotificationsUI.openDetail('${n.id}')" role="button" tabindex="0" onkeydown="if(event.key==='Enter') GrihamGatekeeperNotificationsUI.openDetail('${n.id}')" aria-label="Notification: ${n.title}, Status ${isUnread ? 'Unread' : 'Read'}">
          <div class="vcard-header">
            <div class="vcard-user-info" style="gap:0.7rem;">
              <div class="gk-notif-type-icon ${n.category ? n.category.toLowerCase() : 'general'}" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </div>

              <div class="vcard-title-group" style="flex:1; min-width:0;">
                <div class="vcard-name-row" style="align-items:center; gap:0.4rem; flex-wrap:wrap;">
                  <h3 class="vcard-name" style="font-size:0.92rem; font-weight:700; color:var(--text-primary);">${n.title}</h3>
                  ${priorityTag}
                </div>
                <span class="vcard-phone" style="font-size:0.75rem; color:var(--text-secondary);">${n.category} • ${n.created_at}</span>
              </div>
            </div>

            <div class="vcard-status-wrap">
              ${badgeHtml}
            </div>
          </div>

          <div style="padding:0.45rem 0.2rem 0.1rem; font-size:0.82rem; color:var(--text-secondary); line-height:1.45; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">
            ${n.message}
          </div>

          <div class="vcard-divider" aria-hidden="true" style="margin:0.5rem 0;"></div>

          <div class="vcard-footer" style="padding-top:0;">
            <div class="vcard-dest" style="font-size:0.75rem; color:var(--text-muted);">
              <span>Audience: <strong>${n.target}</strong></span>
            </div>

            <div class="vcard-action-box">
              <button type="button" class="vcard-action-btn arrive" onclick="event.stopPropagation(); GrihamGatekeeperNotificationsUI.toggleReadStatus('${n.id}')" aria-label="${isUnread ? 'Mark Read' : 'Mark Unread'}">
                <span>${isUnread ? 'Mark Read' : 'Mark Unread'}</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("\n");

    this.applyTranslations();
  },

  renderEmptyState() {
    const container = document.getElementById("gk-notif-list-container");
    const emptyContainer = document.getElementById("gk-notif-empty-container");
    if (container) container.style.display = "none";
    if (!emptyContainer) return;

    emptyContainer.style.display = "block";
    const title = (typeof GrihamI18n !== "undefined" && GrihamI18n.t("empty_notifications_title")) || "No Notifications";
    const desc = (typeof GrihamI18n !== "undefined" && GrihamI18n.t("empty_notifications_desc")) || "No notifications match the selected filter.";

    if (typeof GrihamEmptyState !== "undefined" && typeof GrihamEmptyState.render === "function") {
      emptyContainer.innerHTML = GrihamEmptyState.render({
        title: title,
        message: desc,
        icon: `<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`
      });
    } else {
      emptyContainer.innerHTML = `
        <div style="text-align:center; padding:2.5rem 1rem; color:var(--text-secondary);">
          <h3 style="font-size:1rem; margin-bottom:0.4rem; color:var(--text-primary);">${title}</h3>
          <p style="font-size:0.85rem;">${desc}</p>
        </div>
      `;
    }
  },

  async openDetail(id) {
    let item = this.notifications.find(n => n.id === id);

    if (!item) {
      try {
        const getByIdFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.getGatekeeperNotificationById === "function")
          ? GrihamAPI.getGatekeeperNotificationById
          : window.getGatekeeperNotificationById;
        if (getByIdFn) {
          const res = await getByIdFn(id);
          if (res && res.notification) item = res.notification;
        }
      } catch (err) {
        console.warn("[GK Notifications] Failed to fetch item detail:", err);
      }
    }

    if (!item) {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Notification not found", "error");
      }
      return;
    }

    this.selectedNotification = item;

    // Populate Detail Bottom Sheet
    const idEl = document.getElementById("gk-detail-notif-id");
    const titleEl = document.getElementById("gk-detail-content-heading");
    const catBadgeEl = document.getElementById("gk-detail-cat-badge");
    const priorityBadgeEl = document.getElementById("gk-detail-priority-badge");
    const readBadgeWrap = document.getElementById("gk-detail-read-badge-wrap");
    const senderEl = document.getElementById("gk-detail-sender");
    const targetEl = document.getElementById("gk-detail-target");
    const timeEl = document.getElementById("gk-detail-timestamp");
    const msgEl = document.getElementById("gk-detail-message");
    const btnToggle = document.getElementById("btn-toggle-read-label");

    if (idEl) idEl.textContent = item.id;
    if (titleEl) titleEl.textContent = item.title;
    if (catBadgeEl) catBadgeEl.textContent = item.category || "General";
    if (priorityBadgeEl) {
      priorityBadgeEl.textContent = item.priority || "Normal";
      priorityBadgeEl.style.display = (item.priority && item.priority !== "Normal") ? "inline-block" : "none";
    }

    if (readBadgeWrap) {
      readBadgeWrap.innerHTML = (typeof GrihamStatusBadge !== "undefined" && typeof GrihamStatusBadge.render === "function")
        ? GrihamStatusBadge.render({ status: item.unread ? "unread" : "read", variant: "pill" })
        : `<span class="status-pill">${item.unread ? 'Unread' : 'Read'}</span>`;
    }

    if (senderEl) senderEl.textContent = item.sender || "Management Office";
    if (targetEl) targetEl.textContent = item.target || "All Residents";
    if (timeEl) timeEl.textContent = item.created_at || "Today";
    if (msgEl) msgEl.textContent = item.message;

    if (btnToggle) {
      const readKey = item.unread ? "btn_mark_read" : "btn_mark_unread";
      btnToggle.textContent = (typeof GrihamI18n !== "undefined" && GrihamI18n.t(readKey))
        || (item.unread ? "Mark as Read" : "Mark as Unread");
    }

    const sheet = document.getElementById("sheet-gk-notif-detail");
    const backdrop = document.getElementById("backdrop-gk-notif-detail");
    if (sheet) sheet.classList.add("active");
    if (backdrop) backdrop.classList.add("active");
  },

  closeDetail() {
    this.selectedNotification = null;
    const sheet = document.getElementById("sheet-gk-notif-detail");
    const backdrop = document.getElementById("backdrop-gk-notif-detail");
    if (sheet) sheet.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
  },

  async handleToggleReadClick() {
    if (!this.selectedNotification) return;
    const notifId = this.selectedNotification.id;
    await this.toggleReadStatus(notifId);
    // Refresh detail sheet content
    const updated = this.notifications.find(n => n.id === notifId);
    if (updated) {
      this.openDetail(notifId);
    } else {
      this.closeDetail();
    }
  },

  async toggleReadStatus(id) {
    const item = this.notifications.find(n => n.id === id);
    const wasUnread = item ? item.unread : true;

    try {
      if (wasUnread) {
        const markFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.markGatekeeperNotificationRead === "function")
          ? GrihamAPI.markGatekeeperNotificationRead
          : window.markGatekeeperNotificationRead;
        await markFn(id);
        if (typeof GrihamToast !== "undefined") {
          const msg = (typeof GrihamI18n !== "undefined" && GrihamI18n.t("toast_notif_read")) || "Notification marked as read.";
          GrihamToast.show(msg, "success");
        }
      } else {
        const unreadFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.markGatekeeperNotificationUnread === "function")
          ? GrihamAPI.markGatekeeperNotificationUnread
          : window.markGatekeeperNotificationUnread;
        await unreadFn(id);
        if (typeof GrihamToast !== "undefined") {
          const msg = (typeof GrihamI18n !== "undefined" && GrihamI18n.t("toast_notif_unread")) || "Notification marked as unread.";
          GrihamToast.show(msg, "info");
        }
      }

      await this.loadSummary();
      await this.loadNotifications();
    } catch (err) {
      console.error("[GK Notifications] Failed to toggle read status:", err);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(err.message || "Failed to update notification.", "error");
      }
    }
  },

  setFilter(filter) {
    this.currentFilter = filter;
    this.updateFilterPillsUI();
    this.loadNotifications();
  },

  handleSearch(query) {
    this.searchQuery = (query || "").trim();
    const clearBtn = document.getElementById("btn-clear-notif-search");
    if (clearBtn) clearBtn.style.display = this.searchQuery ? "flex" : "none";

    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }
    this.searchDebounceTimer = setTimeout(() => {
      this.loadNotifications();
    }, 200);
  },

  clearSearch() {
    const searchInput = document.getElementById("input-search-notifications");
    if (searchInput) searchInput.value = "";
    this.searchQuery = "";
    const clearBtn = document.getElementById("btn-clear-notif-search");
    if (clearBtn) clearBtn.style.display = "none";
    this.loadNotifications();
  },

  applyTranslations() {
    if (typeof GrihamI18n !== "undefined" && typeof GrihamI18n.applyToDOM === "function") {
      GrihamI18n.applyToDOM();
    }
  }
};

window.GrihamGatekeeperNotificationsUI = GrihamGatekeeperNotificationsUI;
