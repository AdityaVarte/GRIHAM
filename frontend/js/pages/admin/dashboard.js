
/* HTML TEMPLATE EXTRACTED FROM index.html */
window.HTML_DASHBOARD = `
<section id="screen-admin-home" class="app-view admin-dash-view" aria-labelledby="admin-dash-heading">
        
        <!-- Top App Bar -->
        <div class="admin-dash-topbar">
          <div class="admin-brand-cluster">
            <div class="admin-brand-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <div class="admin-brand-text">
              <span class="admin-app-name">Griham</span>
              <span class="admin-portal-tag" id="admin-dash-heading" data-i18n="admin_dash_title">Admin Dashboard</span>
            </div>
          </div>

          <div class="admin-topbar-actions">
            <!-- Notification Icon -->
            ${GrihamHeader.renderNotificationBell({
              id: 'btn-admin-notif',
              onClick: "GrihamRouter.navigate('/admin/notifications')",
              hasBadge: true,
              ariaLabel: 'Notifications',
              title: 'Notifications'
            })}

            <!-- Three-Dot Menu Trigger -->
            ${GrihamHeader.renderThreeDotTrigger({
              id: 'btn-admin-menu-trigger',
              onClick: 'GrihamAdminDashboardUI.toggleAdminMenu(true)',
              ariaLabel: 'Admin Menu',
              title: 'More options'
            })}
          </div>
        </div>

        <!-- Society Identity Context Banner -->
        <div class="admin-society-strip">
          <div class="society-meta-group">
            <span class="society-name-title" id="admin-dash-society-name">Green Valley Residency</span>
            <span class="society-role-subtitle" data-i18n="admin_role_label">Chairman / Committee Administration</span>
          </div>
          <span class="society-code-pill" id="admin-dash-society-code">GRIHAM-PUNE-001</span>
        </div>

        <!-- Loading State Skeleton Container -->
        <div id="admin-dash-loading" style="display:none; flex-direction:column; gap:0.9rem;">
          <div class="dash-card">
            <div class="skeleton-box" style="height:22px; width:40%;"></div>
            <div class="skeleton-box" style="height:48px; width:100%;"></div>
          </div>
          <div class="dash-card">
            <div class="skeleton-box" style="height:22px; width:55%;"></div>
            <div class="skeleton-box" style="height:80px; width:100%;"></div>
          </div>
          <div class="dash-card">
            <div class="skeleton-box" style="height:22px; width:45%;"></div>
            <div class="skeleton-box" style="height:60px; width:100%;"></div>
          </div>
        </div>

        <!-- Error State Container -->
        <div id="admin-dash-error" class="dash-error-state" style="display:none;">
          <svg class="dash-error-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <div class="dash-error-title" data-i18n="dash_error_title">Unable to load dashboard.</div>
          <div class="dash-error-msg">Something went wrong while retrieving society data.</div>
          <button type="button" class="btn-primary-action btn-admin-primary" onclick="GrihamAdminDashboardUI.loadDashboard()" style="min-height:42px; margin-top:0.5rem;" data-i18n="btn_try_again">
            Try Again
          </button>
        </div>

        <!-- Dynamic Content Container -->
        <div id="admin-dash-content" style="display:flex; flex-direction:column; gap:1.15rem;">
          
          <!-- 1. Active SOS Alert Section -->
          <div id="admin-sos-container">
            <!-- Rendered by GrihamAdminDashboardUI -->
          </div>

          <!-- 2. Quick Actions Grid -->
          <div class="quick-actions-section">
            <span class="section-label" data-i18n="quick_actions_title">Quick Actions</span>
            <div class="quick-actions-grid">
              
              <button type="button" class="qa-card-btn" onclick="GrihamRouter.navigate('/admin/notifications')">
                <div class="qa-icon-wrap amber">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
                <div class="qa-label-wrap">
                  <span class="qa-title" data-i18n="qa_send_notif">Send Notice</span>
                  <span class="qa-subtext">Broadcast / Poll</span>
                </div>
              </button>

              <button type="button" class="qa-card-btn" onclick="GrihamRouter.navigate('/admin/maintenance')">
                <div class="qa-icon-wrap blue">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                </div>
                <div class="qa-label-wrap">
                  <span class="qa-title" data-i18n="qa_maint">Maintenance</span>
                  <span class="qa-subtext">Dues & Ledger</span>
                </div>
              </button>

              <button type="button" class="qa-card-btn" onclick="GrihamRouter.navigate('/admin/complaints')">
                <div class="qa-icon-wrap emerald">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </div>
                <div class="qa-label-wrap">
                  <span class="qa-title" data-i18n="qa_complaints">Complaints</span>
                  <span class="qa-subtext">Tickets & Status</span>
                </div>
              </button>

              <button type="button" class="qa-card-btn" onclick="GrihamRouter.navigate('/admin/workers')">
                <div class="qa-icon-wrap purple">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div class="qa-label-wrap">
                  <span class="qa-title" data-i18n="qa_workers">Workers</span>
                  <span class="qa-subtext">Attendance Roster</span>
                </div>
              </button>

              <button type="button" class="qa-card-btn" onclick="GrihamRouter.navigate('/admin/amenities')">
                <div class="qa-icon-wrap blue">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <div class="qa-label-wrap">
                  <span class="qa-title" data-i18n="qa_amenities">Amenities</span>
                  <span class="qa-subtext">Slot Bookings</span>
                </div>
              </button>

              <button type="button" class="qa-card-btn" onclick="GrihamRouter.navigate('/admin/approvals')">
                <div class="qa-icon-wrap amber">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
                </div>
                <div class="qa-label-wrap">
                  <span class="qa-title" data-i18n="qa_approvals">Approvals</span>
                  <span class="qa-subtext">New Residents</span>
                </div>
              </button>

              <button type="button" class="qa-card-btn" onclick="GrihamRouter.navigate('/admin/bulk-service')">
                <div class="qa-icon-wrap emerald">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                </div>
                <div class="qa-label-wrap">
                  <span class="qa-title">Services</span>
                  <span class="qa-subtext">Requests &amp; Bulk</span>
                </div>
              </button>

              <button type="button" class="qa-card-btn" onclick="GrihamRouter.navigate('admin-add-staff')">
                <div class="qa-icon-wrap amber">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                </div>
                <div class="qa-label-wrap">
                  <span class="qa-title">Staff &amp; Vendors</span>
                  <span class="qa-subtext">Directory &amp; Add</span>
                </div>
              </button>

            </div>
          </div>

          <!-- 3. Maintenance Overview Card & Monthly History -->
          <div class="dash-card" id="admin-card-maintenance">
            <div class="dash-card-header">
              <div class="dash-card-heading">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="admin-info-icon"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                <span data-i18n="maint_overview_title">Maintenance Overview</span>
              </div>
              <span class="dash-card-badge" id="maint-period-badge">Current Month</span>
            </div>

            <!-- 3-Metric Stats Row -->
            <div class="maint-metric-row">
              <div class="maint-metric-item">
                <span class="maint-metric-val green" id="maint-val-collected">₹1,84,500</span>
                <span class="maint-metric-label" data-i18n="maint_collected">Collected</span>
              </div>
              <div class="maint-metric-item">
                <span class="maint-metric-val" id="maint-val-expected">₹2,10,000</span>
                <span class="maint-metric-label" data-i18n="maint_expected">Expected</span>
              </div>
              <div class="maint-metric-item">
                <span class="maint-metric-val amber" id="maint-val-remaining">₹25,500</span>
                <span class="maint-metric-label" data-i18n="maint_remaining">Remaining</span>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="maint-progress-wrap">
              <div class="maint-progress-header">
                <span>Collection Progress</span>
                <span id="maint-progress-pct">87.8%</span>
              </div>
              <div class="maint-progress-bar">
                <div class="maint-progress-fill" id="maint-progress-fill" style="width: 87.8%;"></div>
              </div>
            </div>

            <!-- Compact Monthly History Mini-Chart -->
            <div class="monthly-chart-box">
              <span class="monthly-chart-title">Monthly Collection History</span>
              <div class="monthly-chart-bars" id="maint-chart-bars">
                <!-- Injected by JS -->
              </div>
            </div>

            <!-- Action Button -->
            <button type="button" class="btn-card-action" onclick="GrihamRouter.navigate('/admin/maintenance')" id="btn-view-maint-history" aria-label="View Maintenance History">
              <span data-i18n="btn_view_history">View History</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>

          <!-- 4. Pending Approvals Card -->
          <div class="approvals-card-alert" id="admin-card-approvals">
            <div class="approvals-text-col">
              <span class="approvals-title" data-i18n="approvals_title">Pending Approvals</span>
              <span class="approvals-desc" id="approvals-count-desc">4 residents waiting for approval</span>
            </div>
            <button type="button" class="btn-primary-action btn-admin-primary" onclick="GrihamRouter.navigate('/admin/approvals')" style="width:auto; min-height:38px; padding:0 1rem; font-size:0.85rem;" data-i18n="btn_review">
              Review
            </button>
          </div>

          <!-- 5. Recent Complaints Card -->
          <div class="dash-card" id="admin-card-complaints">
            <div class="dash-card-header">
              <div class="dash-card-heading">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="color:var(--resident-accent);"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                <span data-i18n="dashboard_recent_complaints">Recent Complaints</span>
              </div>
            </div>

            <div class="complaint-list" id="complaints-list-container">
              <!-- Rendered by JS -->
            </div>

            <button type="button" class="btn-card-action" onclick="GrihamRouter.navigate('/admin/complaints')" id="btn-view-complaints" aria-label="View All Complaints">
              <span data-i18n="btn_view_all">View All</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>

          <!-- 6. Worker Details Card -->
          <div class="dash-card" id="admin-card-workers">
            <div class="dash-card-header">
              <div class="dash-card-heading">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="color:var(--gatekeeper-accent);"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span data-i18n="workers_title">Worker Details</span>
              </div>
            </div>

            <div class="worker-stats-row" id="worker-stats-container">
              <div class="worker-stat-chip">
                <span class="worker-stat-count" style="color:var(--color-brand-emerald);" id="worker-val-present">8</span>
                <span class="worker-stat-label" data-i18n="present_label">Present</span>
              </div>
              <div class="worker-stat-chip">
                <span class="worker-stat-count" style="color:#ef4444;" id="worker-val-absent">2</span>
                <span class="worker-stat-label" data-i18n="absent_label">Absent</span>
              </div>
              <div class="worker-stat-chip">
                <span class="worker-stat-count" style="color:var(--color-brand-amber);" id="worker-val-halfday">1</span>
                <span class="worker-stat-label" data-i18n="half_day_label">Half-day</span>
              </div>
            </div>

            <button type="button" class="btn-card-action" onclick="GrihamRouter.navigate('/admin/workers')" id="btn-view-workers" aria-label="View Workers">
              <span data-i18n="btn_view_workers">View Workers</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>

          <!-- 7. Amenities Card -->
          <div class="dash-card" id="admin-card-amenities">
            <div class="dash-card-header">
              <div class="dash-card-heading">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="color:var(--resident-accent);"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span data-i18n="amenities_title">Amenities</span>
              </div>
            </div>

            <div class="amenities-summary-strip">
              <div class="amenity-metric-col">
                <span class="amenity-metric-val" id="amenity-val-total">5 Amenities</span>
                <span class="amenity-metric-sub" id="amenity-val-today">2 bookings today</span>
              </div>
              <span class="dash-card-badge" style="color:var(--color-brand-emerald);">Active</span>
            </div>

            <button type="button" class="btn-card-action" onclick="GrihamRouter.navigate('/admin/amenities')" id="btn-open-amenity-cal" aria-label="Open Amenity Calendar">
              <span data-i18n="btn_open_calendar">Open Calendar</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>

        </div>

      </section>
`;
const GrihamAdminDashboardUI = {
  isLoading: false,
  data: null,

  init() {
    this.loadDashboard();
  },

  async loadDashboard() {
    if (this.isLoading) return;
    this.isLoading = true;

    const loadingEl = document.getElementById("admin-dash-loading");
    const contentEl = document.getElementById("admin-dash-content");
    const errorEl = document.getElementById("admin-dash-error");

    if (loadingEl) loadingEl.style.display = "flex";
    if (contentEl) contentEl.style.display = "none";
    if (errorEl) errorEl.style.display = "none";

    try {
      const response = await getAdminDashboardData();
      this.data = response;
      this.renderDashboard(response);

      if (loadingEl) loadingEl.style.display = "none";
      if (contentEl) contentEl.style.display = "flex";
    } catch (err) {
      console.error("[Admin Dashboard] Failed to load dashboard data:", err);
      if (loadingEl) loadingEl.style.display = "none";
      if (errorEl) errorEl.style.display = "flex";
    } finally {
      this.isLoading = false;
    }
  },

  renderDashboard(d) {
    if (!d) return;

    const socCode = document.getElementById("admin-dash-society-code");
    const socName = document.getElementById("admin-dash-society-name");
    if (socCode) socCode.textContent = d.society?.society_code || GrihamAuth.getSocietyId() || "GRIHAM-PUNE-001";
    if (socName) socName.textContent = d.society?.name || "Green Valley Residency";

    this.renderSOS(d.sos);
    this.renderMaintenance(d.maintenance);
    this.renderApprovals(d.pending_approvals);
    this.renderComplaints(d.complaints);
    this.renderWorkers(d.workers);
    this.renderAmenities(d.amenities);
  },

  renderSOS(sos) {
    const container = document.getElementById("admin-sos-container");
    if (!container) return;

    if (sos && sos.active) {
      container.innerHTML = `
        <div class="sos-alert-card" role="alert">
          <div class="sos-card-header">
            <span class="sos-badge-tag">
              <span class="pulse-dot"></span>
              <span>Active SOS Alert</span>
            </span>
            <span class="sos-time">${sos.time || "Just now"}</span>
          </div>
          <div class="sos-alert-body">
            <h3 class="sos-flat-title">Flat ${sos.flat || "B-204"} needs assistance</h3>
            <p class="sos-alert-desc">${sos.note || "Emergency alert triggered from resident unit."} • Status: <strong>${sos.status || "Assistance Requested"}</strong></p>
          </div>
          <button type="button" class="btn-view-sos" onclick="GrihamRouter.navigate('/admin/sos')" aria-label="View SOS Alert Details">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>View Alert</span>
          </button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="sos-safe-card" onclick="GrihamRouter.navigate('/admin/sos')" style="cursor:pointer;" role="button" tabindex="0" aria-label="View SOS Alert History">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
          </svg>
          <span data-i18n="sos_no_alert">No active SOS alerts</span>
          <span style="font-size:0.75rem; color:var(--text-muted); margin-left:auto; text-decoration:underline;">View History</span>
        </div>
      `;
    }
  },

  renderMaintenance(m) {
    if (!m) return;
    const colEl = document.getElementById("maint-val-collected");
    const expEl = document.getElementById("maint-val-expected");
    const remEl = document.getElementById("maint-val-remaining");
    const pctEl = document.getElementById("maint-progress-pct");
    const fillEl = document.getElementById("maint-progress-fill");
    const chartEl = document.getElementById("maint-chart-bars");

    if (colEl) colEl.textContent = GrihamFormat.currency(m.collected);
    if (expEl) expEl.textContent = GrihamFormat.currency(m.expected);
    if (remEl) remEl.textContent = GrihamFormat.currency(m.remaining);

    const pct = m.percentage || (m.expected ? Math.round((m.collected / m.expected) * 1000) / 10 : 0);
    if (pctEl) pctEl.textContent = `${pct}%`;
    if (fillEl) fillEl.style.width = `${Math.min(100, pct)}%`;

    if (chartEl && Array.isArray(m.monthly_history)) {
      chartEl.innerHTML = m.monthly_history.map(item => {
        const h = item.pct || Math.min(100, Math.round((item.collected / (item.expected || 200000)) * 100));
        const formattedVal = (item.collected >= 100000) ? `₹${(item.collected / 100000).toFixed(1)}L` : `₹${Math.round(item.collected / 1000)}k`;
        return `
          <div class="chart-bar-col">
            <span class="chart-bar-amount">${formattedVal}</span>
            <div class="chart-bar-pillar" style="height: ${h}%;" title="${item.month}: ${GrihamFormat.currency(item.collected)}"></div>
            <span class="chart-bar-month">${item.month}</span>
          </div>
        `;
      }).join("");
    }
  },

  renderApprovals(count) {
    const descEl = document.getElementById("approvals-count-desc");
    if (descEl) {
      descEl.textContent = count > 0 
        ? `${count} residents waiting for approval`
        : "No pending approvals";
    }
  },

  renderComplaints(complaints) {
    const listEl = document.getElementById("complaints-list-container");
    if (!listEl) return;

    if (!complaints || complaints.length === 0) {
      listEl.innerHTML = `<div style="text-align:center; padding:0.75rem; color:var(--text-muted); font-size:0.82rem;">No recent complaints</div>`;
      return;
    }

    listEl.innerHTML = complaints.map(c => {
      const isPending = c.status === "Pending";
      const chipClass = isPending ? "pending" : "in-progress";
      return `
        <div class="complaint-item">
          <div class="complaint-info-col">
            <span class="complaint-item-title">${c.title}</span>
            <span class="complaint-item-sub">Flat ${c.flat} • ${c.time}</span>
          </div>
          <span class="complaint-status-chip ${chipClass}">${c.status}</span>
        </div>
      `;
    }).join("");
  },

  renderWorkers(w) {
    if (!w) return;
    const pres = document.getElementById("worker-val-present");
    const abs = document.getElementById("worker-val-absent");
    const half = document.getElementById("worker-val-halfday");
    if (pres) pres.textContent = w.present ?? 0;
    if (abs) abs.textContent = w.absent ?? 0;
    if (half) half.textContent = w.half_day ?? 0;
  },

  renderAmenities(a) {
    if (!a) return;
    const totEl = document.getElementById("amenity-val-total");
    const todayEl = document.getElementById("amenity-val-today");
    if (totEl) totEl.textContent = `${a.total || 0} Amenities`;
    if (todayEl) todayEl.textContent = `${a.today_bookings || 0} bookings today`;
  },

  toggleAdminMenu(open) {
    const sheet = document.getElementById("admin-menu-sheet");
    const backdrop = document.getElementById("admin-menu-backdrop");
    const isOpen = open !== undefined ? open : (sheet && !sheet.classList.contains("open"));

    if (sheet && backdrop) {
      sheet.classList.toggle("open", isOpen);
      backdrop.classList.toggle("open", isOpen);
      sheet.setAttribute("aria-hidden", !isOpen);
    }
  },

  handleMenuNav(path) {
    this.toggleAdminMenu(false);
    GrihamRouter.navigate(path);
  },

  openLogoutConfirm() {
    this.toggleAdminMenu(false);
    if (typeof GrihamConfirmation !== "undefined") {
      GrihamConfirmation.open({
        title: "Logout?",
        message: "Are you sure you want to log out of the Admin Portal?",
        confirmText: "Logout",
        cancelText: "Cancel",
        isDanger: true,
        onConfirm: () => this.confirmLogout()
      });
      return;
    }
    const sheet = document.getElementById("logout-confirm-sheet");
    const backdrop = document.getElementById("logout-confirm-backdrop");
    if (sheet && backdrop) {
      sheet.classList.add("open");
      backdrop.classList.add("open");
      sheet.setAttribute("aria-hidden", "false");
    }
  },

  closeLogoutConfirm() {
    if (typeof GrihamConfirmation !== "undefined") {
      GrihamConfirmation.close(false);
    }
    const sheet = document.getElementById("logout-confirm-sheet");
    const backdrop = document.getElementById("logout-confirm-backdrop");
    if (sheet && backdrop) {
      sheet.classList.remove("open");
      backdrop.classList.remove("open");
      sheet.setAttribute("aria-hidden", "true");
    }
  },

  confirmLogout() {
    this.closeLogoutConfirm();
    if (typeof GrihamAuth !== "undefined") {
      GrihamAuth.logout('/entry');
    } else {
      GrihamRouter.navigate('/entry');
    }
  }
};
