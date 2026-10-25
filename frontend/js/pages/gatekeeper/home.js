/**
 * GRIHAM FRONTEND - GATEKEEPER HOME / SECURITY TERMINAL CONTROLLER
 * Page: Gatekeeper Terminal Dashboard (#/gatekeeper/home)
 * Mobile-first Residential Society Management Platform
 */

/* HTML TEMPLATE FOR DYNAMIC SCREEN INJECTION */
window.HTML_GATEKEEPER_HOME = `
<!-- ================================================================= -->
<!-- 1. TERMINAL OPTIONS BOTTOM SHEET                                  -->
<!-- ================================================================= -->
<div class="sheet-backdrop" id="gk-menu-backdrop" onclick="GrihamGatekeeperHomeUI.toggleMenu(false)" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="sheet-gk-menu" role="dialog" aria-modal="true" aria-labelledby="gk-menu-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <h2 class="sheet-title" id="gk-menu-title" data-i18n="menu_terminal_options">Terminal Options</h2>
    <button type="button" class="btn-sheet-back" onclick="GrihamGatekeeperHomeUI.toggleMenu(false)" aria-label="Close Terminal Options">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>

  <div class="gk-menu-list">
    <div class="gk-menu-info-box">
      <span class="gk-menu-info-title">Station Info</span>
      <span class="gk-menu-info-val" id="gk-menu-station-val">Main Gate Security Station</span>
    </div>

    <!-- Accessibility Panel Trigger -->
    <button type="button" class="gk-menu-item" onclick="GrihamGatekeeperHomeUI.toggleMenu(false); GrihamA11y.toggleSheet(true);" aria-label="Open Accessibility Settings">
      <div class="gk-menu-item-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
          <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
          <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
          <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
          <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
        </svg>
      </div>
      <span data-i18n="btn_a11y">Accessibility Settings</span>
    </button>

    <!-- Notifications Menu Option -->
    <button type="button" class="gk-menu-item" id="btn-gk-menu-notifs" onclick="GrihamGatekeeperHomeUI.toggleMenu(false); GrihamRouter.navigate('/gatekeeper/notifications');" aria-label="Open Notifications">
      <div class="gk-menu-item-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      </div>
      <span data-i18n="title_gatekeeper_notifications">Notifications</span>
      <span id="gk-menu-notif-count" style="margin-left:auto; font-size:0.75rem; color:var(--color-brand-amber, #f59e0b); font-weight:700;"></span>
    </button>

    <!-- Gatekeeper Profile Menu Option -->
    <button type="button" class="gk-menu-item" id="btn-gk-menu-profile" onclick="GrihamGatekeeperHomeUI.toggleMenu(false); GrihamRouter.navigate('/gatekeeper/profile');" aria-label="Open Gatekeeper Profile">
      <div class="gk-menu-item-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <span data-i18n="title_gatekeeper_profile">Gatekeeper Profile</span>
    </button>

    <!-- Logout Action -->
    <button type="button" class="gk-menu-item danger" onclick="GrihamGatekeeperHomeUI.toggleMenu(false); GrihamGatekeeperHomeUI.openLogoutConfirm();" id="btn-gk-menu-logout" aria-label="End Shift and Logout">
      <div class="gk-menu-item-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </div>
      <span data-i18n="btn_end_shift">End Shift / Logout</span>
    </button>
  </div>
</div>

<!-- ================================================================= -->
<!-- 2. LOGOUT CONFIRMATION BOTTOM SHEET                               -->
<!-- ================================================================= -->
<div class="sheet-backdrop" id="gk-logout-backdrop" onclick="GrihamGatekeeperHomeUI.closeLogoutConfirm()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="sheet-gk-logout" role="dialog" aria-modal="true" aria-labelledby="gk-logout-dialog-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom, 20px));">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="logout-confirm-card">
    <div class="logout-shield-icon" aria-hidden="true">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        <circle cx="12" cy="16" r="1"/>
      </svg>
    </div>

    <h2 class="logout-title" id="gk-logout-dialog-title" data-i18n="logout_confirm_title">Logout?</h2>
    <p class="logout-message" data-i18n="gatekeeper_logout_confirm_msg">Are you sure you want to log out of the Security Terminal?</p>

    <div class="logout-btn-row">
      <button type="button" class="btn-logout-cancel" onclick="GrihamGatekeeperHomeUI.closeLogoutConfirm()" id="btn-cancel-gk-logout" data-i18n="btn_cancel">
        Cancel
      </button>
      <button type="button" class="btn-logout-confirm" onclick="GrihamGatekeeperHomeUI.confirmLogout()" id="btn-confirm-gk-logout" data-i18n="btn_confirm_logout">
        Logout
      </button>
    </div>
  </div>
</div>

<!-- ================================================================= -->
<!-- 3. MAIN TERMINAL DASHBOARD VIEW                                   -->
<!-- ================================================================= -->
<section id="screen-gatekeeper-home" class="app-view gatekeeper-terminal-view" aria-labelledby="gk-terminal-title">

  <!-- Top Navigation Bar -->
  <div class="gk-terminal-topbar">
    <div class="gk-brand-cluster">
      <div class="gk-brand-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          <circle cx="12" cy="16" r="1"/>
        </svg>
      </div>
      <div class="gk-brand-text">
        <span class="gk-app-name">Griham</span>
        <h1 class="gk-portal-tag" id="gk-terminal-title" data-i18n="gatekeeper_home_title">Security Terminal</h1>
      </div>
    </div>

    <div class="gk-topbar-actions">
      <!-- Notifications Trigger -->
      <button type="button" class="gk-topbar-btn" id="btn-gk-notifications" onclick="GrihamRouter.navigate('/gatekeeper/notifications')" aria-label="Notifications" title="Notifications" style="position:relative;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span class="gk-notif-unread-badge" id="gk-home-notif-badge" style="display:none;" aria-label="Unread notifications">0</span>
      </button>

      <!-- Accessibility Trigger -->
      <button type="button" class="gk-topbar-btn" id="btn-gk-a11y" onclick="GrihamA11y.toggleSheet(true)" aria-label="Accessibility Settings" title="Accessibility Panel">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
          <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
          <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
          <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
          <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
        </svg>
      </button>

      <!-- Three-Dot Menu Trigger -->
      <button type="button" class="gk-topbar-btn" id="btn-gk-menu-trigger" onclick="GrihamGatekeeperHomeUI.toggleMenu(true)" aria-label="Terminal Options Menu" title="More Options">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="1.2"/>
          <circle cx="12" cy="5" r="1.2"/>
          <circle cx="12" cy="19" r="1.2"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Society Context Banner -->
  <div class="gk-context-strip">
    <div class="gk-context-info">
      <span class="gk-context-society" id="gk-society-name">Green Valley Residency</span>
      <span class="gk-context-station" id="gk-station-subtitle">Main Gate Security Station</span>
    </div>
    <span class="gk-context-pill" id="gk-society-code">GRIHAM-PUNE-001</span>
  </div>

  <!-- Terminal Hero Status Card -->
  <div class="gk-terminal-card" id="card-terminal-status">
    <div class="gk-terminal-status-header">
      <div class="gk-live-indicator" aria-live="polite">
        <span class="gk-pulse-dot" aria-hidden="true"></span>
        <span id="gk-status-label" data-i18n="terminal_status_active">Terminal Active</span>
      </div>

      <div class="gk-clock-box">
        <span class="gk-clock-time" id="gk-clock-time">--:--</span>
        <span class="gk-clock-date" id="gk-clock-date">--</span>
      </div>
    </div>

    <!-- Active Guard On Duty Row -->
    <div class="gk-duty-guard-row">
      <div class="gk-guard-avatar" id="gk-guard-initials" aria-hidden="true">AS</div>
      <div class="gk-guard-meta">
        <div class="gk-guard-name" id="gk-guard-name">Amit Sharma</div>
        <div class="gk-guard-sub">
          <span data-i18n="label_duty_guard">Guard on Duty</span>
          <span aria-hidden="true">•</span>
          <span class="gk-guard-sub-badge" id="gk-guard-id">GTK-001</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Actions Grid -->
  <div class="gk-summary-section">
    <div class="gk-section-header">
      <h2 class="gk-section-title" data-i18n="quick_actions_title">Quick Actions</h2>
    </div>

    <div class="gk-qa-grid">
      <!-- 1. Visitor Entry -->
      <button type="button" class="gk-qa-card" onclick="GrihamRouter.navigate('/gatekeeper/visitors?action=entry')" aria-label="Visitor Entry">
        <div class="gk-qa-top-row">
          <div class="gk-qa-icon emerald" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <line x1="20" y1="8" x2="20" y2="14"/>
              <line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
          </div>
          <span class="gk-action-live-pill" style="font-size:0.68rem; padding:0.15rem 0.45rem; border-radius:999px; background:var(--gatekeeper-tint); color:var(--gatekeeper-accent); font-weight:700;">Open</span>
        </div>
        <div class="gk-qa-label">
          <span class="gk-qa-title" data-i18n="action_visitor_entry">Visitor Entry</span>
          <span class="gk-qa-desc">Guest / Vendor Inward</span>
        </div>
      </button>

      <!-- 2. Visitor Exit -->
      <button type="button" class="gk-qa-card" onclick="GrihamRouter.navigate('/gatekeeper/visitors?filter=Checked In')" aria-label="Visitor Exit">
        <div class="gk-qa-top-row">
          <div class="gk-qa-icon amber" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </div>
          <span class="gk-action-live-pill" style="font-size:0.68rem; padding:0.15rem 0.45rem; border-radius:999px; background:var(--gatekeeper-tint); color:var(--gatekeeper-accent); font-weight:700;">Open</span>
        </div>
        <div class="gk-qa-label">
          <span class="gk-qa-title" data-i18n="action_visitor_exit">Visitor Exit</span>
          <span class="gk-qa-desc">Checkout &amp; Gate Pass</span>
        </div>
      </button>

      <!-- 3. Delivery Entry -->
      <button type="button" class="gk-qa-card" onclick="GrihamRouter.navigate('/gatekeeper/deliveries?action=entry')" aria-label="Delivery Entry">
        <div class="gk-qa-top-row">
          <div class="gk-qa-icon blue" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <span class="gk-action-live-pill" style="font-size:0.68rem; padding:0.15rem 0.45rem; border-radius:999px; background:var(--gatekeeper-tint); color:var(--gatekeeper-accent); font-weight:700;">Open</span>
        </div>
        <div class="gk-qa-label">
          <span class="gk-qa-title" data-i18n="action_delivery_entry">Delivery Entry</span>
          <span class="gk-qa-desc">Courier &amp; Parcels</span>
        </div>
      </button>

      <!-- 4. Expected Visitor -->
      <button type="button" class="gk-qa-card" onclick="GrihamRouter.navigate('/gatekeeper/visitors?filter=Expected')" aria-label="Expected Visitor">
        <div class="gk-qa-top-row">
          <div class="gk-qa-icon purple" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
              <path d="m9 16 2 2 4-4"/>
            </svg>
          </div>
          <span class="gk-action-live-pill" style="font-size:0.68rem; padding:0.15rem 0.45rem; border-radius:999px; background:var(--gatekeeper-tint); color:var(--gatekeeper-accent); font-weight:700;">Open</span>
        </div>
        <div class="gk-qa-label">
          <span class="gk-qa-title" data-i18n="action_expected_visitor">Expected Visitor</span>
          <span class="gk-qa-desc">Pre-approved Passes</span>
        </div>
      </button>
    </div>
  </div>

  <!-- Today's Gate Activity Summary -->
  <div class="gk-summary-section">
    <div class="gk-section-header">
      <h2 class="gk-section-title" data-i18n="label_todays_summary">Today's Gate Summary</h2>
    </div>

    <div class="gk-summary-grid">
      <div class="gk-summary-box">
        <span class="gk-summary-value" id="gk-val-visitors">0</span>
        <span class="gk-summary-label" data-i18n="metric_visitors">Visitors</span>
      </div>

      <div class="gk-summary-box">
        <span class="gk-summary-value" id="gk-val-deliveries">0</span>
        <span class="gk-summary-label" data-i18n="metric_deliveries">Deliveries</span>
      </div>

      <div class="gk-summary-box">
        <span class="gk-summary-value" id="gk-val-vehicles">0</span>
        <span class="gk-summary-label" data-i18n="metric_vehicles">Vehicles</span>
      </div>
    </div>
  </div>

  <!-- Recent Activity Section -->
  <div class="gk-summary-section">
    <div class="gk-section-header">
      <h2 class="gk-section-title" data-i18n="label_recent_activity">Recent Gate Activity</h2>
    </div>

    <div id="gk-activity-container">
      <!-- Injected by Controller via GrihamEmptyState -->
    </div>
  </div>

  <!-- Direct Shift Termination Action -->
  <button type="button" class="gk-end-shift-btn" id="btn-gk-end-shift" onclick="GrihamGatekeeperHomeUI.openLogoutConfirm()" aria-label="End Shift and Logout from Terminal">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
      <line x1="12" y1="2" x2="12" y2="12"></line>
    </svg>
    <span data-i18n="btn_end_shift">End Shift / Logout</span>
  </button>

</section>
`;

/**
 * Gatekeeper Terminal UI Controller
 */
const GrihamGatekeeperHomeUI = {
  clockTimer: null,
  activeGuard: null,

  init() {
    this.loadSessionData();
    this.startClock();
    this.renderActivityState();
    this.applyTranslations();
  },

  destroy() {
    if (this.clockTimer) {
      clearInterval(this.clockTimer);
      this.clockTimer = null;
    }
    this.toggleMenu(false);
    this.closeLogoutConfirm();
  },

  loadSessionData() {
    const user = (typeof GrihamAuth !== "undefined" && typeof GrihamAuth.getUser === "function")
      ? GrihamAuth.getUser()
      : null;

    this.activeGuard = user;

    const societyCode = (typeof GrihamAuth !== "undefined" && typeof GrihamAuth.getSocietyId === "function" && GrihamAuth.getSocietyId())
      || (user && user.society_id)
      || "GRIHAM-PUNE-001";

    const societyName = (user && user.societyName) || "Green Valley Residency";
    const guardName = (user && user.name) || "Gate Security Staff";
    const guardId = (user && user.id) || "GTK-001";
    const station = (user && user.station) || "Main Gate Security Station";

    // Compute guard initials
    const initials = guardName
      .split(" ")
      .map(part => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "GK";

    // Bind values to DOM
    const nameEl = document.getElementById("gk-guard-name");
    const idEl = document.getElementById("gk-guard-id");
    const initialsEl = document.getElementById("gk-guard-initials");
    const socNameEl = document.getElementById("gk-society-name");
    const socCodeEl = document.getElementById("gk-society-code");
    const stationSubEl = document.getElementById("gk-station-subtitle");
    const menuStationEl = document.getElementById("gk-menu-station-val");

    if (nameEl) nameEl.textContent = guardName;
    if (idEl) idEl.textContent = guardId;
    if (initialsEl) initialsEl.textContent = initials;
    if (socNameEl) socNameEl.textContent = societyName;
    if (socCodeEl) socCodeEl.textContent = societyCode;
    if (stationSubEl) stationSubEl.textContent = station;
    if (menuStationEl) menuStationEl.textContent = `${station} (${societyCode})`;

    this.loadVisitorMetrics();
    this.loadDeliveryMetrics();
    this.loadNotificationBadge();
  },

  async loadNotificationBadge() {
    try {
      const summaryFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.getGatekeeperNotificationSummary === "function")
        ? GrihamAPI.getGatekeeperNotificationSummary
        : window.getGatekeeperNotificationSummary;

      if (summaryFn) {
        const res = await summaryFn();
        if (res && res.summary) {
          const badgeEl = document.getElementById("gk-home-notif-badge");
          const menuBadgeEl = document.getElementById("gk-menu-notif-count");
          const unreadCount = res.summary.unread || 0;
          if (badgeEl) {
            badgeEl.textContent = unreadCount;
            badgeEl.style.display = unreadCount > 0 ? "flex" : "none";
          }
          if (menuBadgeEl) {
            menuBadgeEl.textContent = unreadCount > 0 ? `(${unreadCount} unread)` : "";
          }
        }
      }
    } catch (e) {
      console.warn("[GK Home] Notification badge error:", e);
    }
  },

  async loadVisitorMetrics() {
    try {
      const summaryFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.getVisitorSummary === "function")
        ? GrihamAPI.getVisitorSummary
        : window.getGatekeeperVisitorSummary;

      if (summaryFn) {
        const res = await summaryFn();
        if (res && res.summary) {
          const vEl = document.getElementById("gk-val-visitors");
          if (vEl) vEl.textContent = res.summary.totalToday ?? 0;
        }
      }
    } catch (e) {
      console.warn("[GK Home] Visitor metrics error:", e);
    }
  },

  async loadDeliveryMetrics() {
    try {
      const summaryFn = (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.getDeliverySummary === "function")
        ? GrihamAPI.getDeliverySummary
        : window.getGatekeeperDeliverySummary;

      if (summaryFn) {
        const res = await summaryFn();
        if (res && res.summary) {
          const dEl = document.getElementById("gk-val-deliveries");
          if (dEl) dEl.textContent = res.summary.active ?? res.summary.totalToday ?? 0;
        }
      }
    } catch (e) {
      console.warn("[GK Home] Delivery metrics error:", e);
    }
  },

  startClock() {
    this.updateClockDisplay();
    if (this.clockTimer) {
      clearInterval(this.clockTimer);
    }
    this.clockTimer = setInterval(() => {
      this.updateClockDisplay();
    }, 10000);
  },

  updateClockDisplay() {
    const now = new Date();

    // 24-hr time e.g. 17:45
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const timeStr = `${hours}:${minutes}`;

    // Date e.g. Saturday, 26 Sep 2026
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    const timeEl = document.getElementById("gk-clock-time");
    const dateEl = document.getElementById("gk-clock-date");

    if (timeEl) timeEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = dateStr;
  },

  renderActivityState() {
    const container = document.getElementById("gk-activity-container");
    if (!container) return;

    const lang = (typeof GrihamState !== "undefined" && GrihamState.language) || "en";
    const dict = (typeof I18N_DICTIONARY !== "undefined" && I18N_DICTIONARY[lang]) || {};

    const emptyTitle = dict.empty_gate_activity_title || "No Gate Activity Recorded";
    const emptyDesc = dict.empty_gate_activity_desc || "Visitor and delivery entries will appear here once security logging begins.";

    // Render using shared GrihamEmptyState component
    if (typeof GrihamEmptyState !== "undefined" && typeof GrihamEmptyState.render === "function") {
      container.innerHTML = GrihamEmptyState.render({
        id: "gk-empty-activity-card",
        title: emptyTitle,
        description: emptyDesc,
        isVisible: true,
        customClass: "gk-activity-card",
        icon: `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--gatekeeper-accent);">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
        `
      });
    } else {
      container.innerHTML = `
        <div class="gk-activity-card" id="gk-empty-activity-card">
          <h3 class="empty-title">${emptyTitle}</h3>
          <p class="empty-desc">${emptyDesc}</p>
        </div>
      `;
    }
  },

  applyTranslations() {
    if (typeof GrihamI18n !== "undefined" && typeof GrihamI18n.translatePage === "function") {
      GrihamI18n.translatePage();
    }
  },

  handleUpcomingFeature(featureName) {
    const lang = (typeof GrihamState !== "undefined" && GrihamState.language) || "en";
    const dict = (typeof I18N_DICTIONARY !== "undefined" && I18N_DICTIONARY[lang]) || {};
    const baseMsg = dict.toast_feature_coming_soon || "This security feature will be available in the upcoming release.";
    const message = `${featureName}: ${baseMsg}`;

    if (typeof GrihamToast !== "undefined" && typeof GrihamToast.show === "function") {
      GrihamToast.show(message, "info", 3200);
    }
  },

  toggleMenu(open) {
    const sheet = document.getElementById("sheet-gk-menu");
    const backdrop = document.getElementById("gk-menu-backdrop");

    if (sheet && backdrop) {
      if (open) {
        backdrop.classList.add("visible");
        sheet.classList.add("visible");
        sheet.setAttribute("aria-hidden", "false");
      } else {
        backdrop.classList.remove("visible");
        sheet.classList.remove("visible");
        sheet.setAttribute("aria-hidden", "true");
      }
    }
  },

  openLogoutConfirm() {
    const sheet = document.getElementById("sheet-gk-logout");
    const backdrop = document.getElementById("gk-logout-backdrop");

    if (sheet && backdrop) {
      backdrop.classList.add("visible");
      sheet.classList.add("visible");
      sheet.setAttribute("aria-hidden", "false");
    }
  },

  closeLogoutConfirm() {
    const sheet = document.getElementById("sheet-gk-logout");
    const backdrop = document.getElementById("gk-logout-backdrop");

    if (sheet && backdrop) {
      backdrop.classList.remove("visible");
      sheet.classList.remove("visible");
      sheet.setAttribute("aria-hidden", "true");
    }
  },

  confirmLogout() {
    this.closeLogoutConfirm();
    this.destroy();

    if (typeof GrihamAuth !== "undefined" && typeof GrihamAuth.logout === "function") {
      GrihamAuth.logout("/gatekeeper/login");
    } else {
      window.location.hash = "/gatekeeper/login";
    }
  }
};

window.GrihamGatekeeperHomeUI = GrihamGatekeeperHomeUI;
