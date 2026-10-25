/**
 * GRIHAM FRONTEND - GATEKEEPER PROFILE CONTROLLER & VIEW
 * Screen: Gatekeeper Profile (#/gatekeeper/profile)
 * Allows authenticated gatekeeper to view identity, society association,
 * edit permitted personal contact details, and perform canonical logout.
 */

window.HTML_GATEKEEPER_PROFILE = `
<!-- ================================================================= -->
<!-- 1. EDIT GATEKEEPER PROFILE BOTTOM SHEET                           -->
<!-- ================================================================= -->
<div class="sheet-backdrop" id="backdrop-gk-edit-profile" onclick="GrihamGatekeeperProfileUI.closeEditSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="sheet-gk-edit-profile" role="dialog" aria-modal="true" aria-labelledby="title-gk-edit-profile" aria-hidden="true" style="max-height:90vh; overflow-y:auto; padding-bottom:calc(2rem + var(--safe-bottom, 20px));">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" id="btn-close-gk-edit" onclick="GrihamGatekeeperProfileUI.closeEditSheet()" aria-label="Close edit profile sheet" title="Go back">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h2 class="sheet-title" id="title-gk-edit-profile" data-i18n="title_edit_gatekeeper_profile">Edit Gatekeeper Profile</h2>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <form id="form-gk-edit-profile" onsubmit="GrihamGatekeeperProfileUI.saveProfile(event)" class="profile-sheet-form">

    <!-- Form Error Banner -->
    <div id="gk-edit-profile-error" class="form-banner banner-error" style="display:none;" role="alert">
      <span id="gk-edit-profile-error-text"></span>
    </div>

    <!-- Photo Upload Row -->
    <div class="profile-photo-picker-row">
      <div class="photo-picker-preview" id="gk-edit-photo-preview" aria-label="Photo Preview">
        <span id="gk-edit-photo-initials">GK</span>
        <img id="gk-edit-photo-img" src="" alt="Profile Photo Preview" style="display:none; width:100%; height:100%; border-radius:50%; object-fit:cover;">
      </div>
      <div class="photo-picker-actions">
        <label class="btn-photo-upload-label" for="gk-edit-photo-input">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          <span data-i18n="btn_choose_photo">Upload Photo</span>
        </label>
        <input type="file" id="gk-edit-photo-input" accept="image/jpeg,image/png,image/webp" style="display:none;" onchange="GrihamGatekeeperProfileUI.handlePhotoSelect(event)">
        <button type="button" class="btn-photo-remove" id="btn-gk-remove-photo" onclick="GrihamGatekeeperProfileUI.removePhoto()" style="display:none;" data-i18n="btn_remove_photo">Remove photo</button>
      </div>
    </div>
    <span class="field-helper-note" style="margin-top:-0.3rem; margin-bottom:0.75rem;">JPG, PNG, or WebP. Maximum size 5MB.</span>

    <!-- Full Name (Editable) -->
    <div class="form-group" id="group-gk-edit-name">
      <label class="form-label" for="gk-edit-name">
        <span data-i18n="label_fullname">Full Name</span> <span class="required-star">*</span>
      </label>
      <div class="input-wrapper">
        <input type="text" id="gk-edit-name" class="form-input" required placeholder="e.g. Amit Sharma" autocomplete="name" aria-label="Full Name">
      </div>
      <span class="field-error-msg" id="gk-edit-name-err"></span>
    </div>

    <!-- Phone Number (Editable) -->
    <div class="form-group" id="group-gk-edit-phone">
      <label class="form-label" for="gk-edit-phone">
        <span data-i18n="label_phone">Phone Number</span> <span class="required-star">*</span>
      </label>
      <div class="input-wrapper">
        <input type="tel" id="gk-edit-phone" class="form-input" required placeholder="+91 9876543211" autocomplete="tel" aria-label="Phone Number">
      </div>
      <span class="field-error-msg" id="gk-edit-phone-err"></span>
    </div>

    <!-- Email (Optional, Editable) -->
    <div class="form-group" id="group-gk-edit-email">
      <div class="label-row-between">
        <label class="form-label" for="gk-edit-email" data-i18n="label_email">Email</label>
        <span class="badge-optional" data-i18n="badge_optional">Optional</span>
      </div>
      <div class="input-wrapper">
        <input type="email" id="gk-edit-email" class="form-input" placeholder="e.g. amit.sharma@example.com" autocomplete="email" aria-label="Email">
      </div>
      <span class="field-error-msg" id="gk-edit-email-err"></span>
    </div>

    <!-- Read-Only Administrative Fields -->
    <div class="form-group">
      <label class="form-label" for="gk-edit-id" data-i18n="label_gatekeeper_id">Gatekeeper ID</label>
      <div class="input-wrapper readonly-input-wrap">
        <input type="text" id="gk-edit-id" class="form-input form-input-readonly" disabled aria-label="Gatekeeper ID (read only)">
        <span class="input-readonly-lock-icon" aria-hidden="true" title="Gatekeeper ID cannot be modified">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </span>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="gk-edit-society-id" data-i18n="label_society_id">Society ID</label>
      <div class="input-wrapper readonly-input-wrap">
        <input type="text" id="gk-edit-society-id" class="form-input form-input-readonly" disabled aria-label="Society ID (read only)">
        <span class="input-readonly-lock-icon" aria-hidden="true" title="Society ID cannot be modified">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </span>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="gk-edit-station" data-i18n="label_duty_station">Duty Station</label>
      <div class="input-wrapper readonly-input-wrap">
        <input type="text" id="gk-edit-station" class="form-input form-input-readonly" disabled aria-label="Duty Station (read only)">
        <span class="input-readonly-lock-icon" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </span>
      </div>
      <span class="field-helper-note" data-i18n="helper_profile_readonly_fields">Gatekeeper ID, Society ID, and Role are managed by Society Administration and cannot be edited.</span>
    </div>

    <!-- Actions -->
    <div class="logout-btn-row" style="margin-top:0.6rem;">
      <button type="button" class="btn-logout-cancel" id="btn-cancel-gk-edit" onclick="GrihamGatekeeperProfileUI.closeEditSheet()" data-i18n="btn_cancel">Cancel</button>
      <button type="submit" class="btn-primary-action btn-gatekeeper-style" id="btn-save-gk-profile" style="margin-top:0; min-height:46px;">
        <span id="btn-save-gk-profile-text" data-i18n="btn_save_changes">Save Changes</span>
        <span id="btn-save-gk-profile-spinner" class="spinner-ring sm" style="display:none;" aria-hidden="true"></span>
      </button>
    </div>

  </form>
</div>

<!-- ================================================================= -->
<!-- 2. LOGOUT CONFIRMATION BOTTOM SHEET                               -->
<!-- ================================================================= -->
<div class="sheet-backdrop" id="backdrop-gk-profile-logout" onclick="GrihamGatekeeperProfileUI.closeLogoutConfirm()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="sheet-gk-profile-logout" role="dialog" aria-modal="true" aria-labelledby="gk-profile-logout-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom, 20px));">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="logout-confirm-card">
    <div class="logout-shield-icon" aria-hidden="true">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        <circle cx="12" cy="16" r="1"/>
      </svg>
    </div>

    <h2 class="logout-title" id="gk-profile-logout-title" data-i18n="logout_confirm_title">Logout?</h2>
    <p class="logout-message" data-i18n="gatekeeper_logout_confirm_msg">Are you sure you want to log out of the Security Terminal?</p>

    <div class="logout-btn-row">
      <button type="button" class="btn-logout-cancel" onclick="GrihamGatekeeperProfileUI.closeLogoutConfirm()" id="btn-cancel-gk-profile-logout" data-i18n="btn_cancel">
        Cancel
      </button>
      <button type="button" class="btn-logout-confirm" onclick="GrihamGatekeeperProfileUI.confirmLogout()" id="btn-confirm-gk-profile-logout" data-i18n="btn_confirm_logout">
        Logout
      </button>
    </div>
  </div>
</div>

<!-- ================================================================= -->
<!-- 3. MAIN GATEKEEPER PROFILE VIEW                                   -->
<!-- ================================================================= -->
<section id="screen-gatekeeper-profile" class="app-view gatekeeper-terminal-view" aria-labelledby="gk-profile-header-title">

  <!-- Top Navigation Bar -->
  <div class="screen-top-bar gk-visitors-top-bar" style="margin-bottom:0.25rem;">
    <button class="btn-top-back" id="btn-gk-profile-back" onclick="GrihamRouter.navigate('/gatekeeper/home')" aria-label="Back to Terminal">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      <span data-i18n="nav_back">Terminal</span>
    </button>

    <h1 class="top-bar-title" id="gk-profile-header-title" data-i18n="title_gatekeeper_profile">Gatekeeper Profile</h1>

    <div class="gk-topbar-actions">
      <!-- Accessibility Trigger -->
      <button type="button" class="gk-topbar-btn" id="btn-gk-profile-a11y" onclick="GrihamA11y.toggleSheet(true)" aria-label="Accessibility Settings" title="Accessibility Panel">
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

  <!-- Loading State -->
  <div id="gk-profile-loading" class="profile-state-card" style="display:flex;" aria-live="polite">
    <div class="spinner-ring" aria-hidden="true"></div>
    <p class="profile-state-text" data-i18n="gatekeeper_profile_loading">Loading profile...</p>
  </div>

  <!-- Error State -->
  <div id="gk-profile-error" class="profile-state-card profile-error-state" style="display:none;" role="alert" aria-live="assertive">
    <div class="state-icon-wrap icon-error" aria-hidden="true">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </div>
    <h2 class="state-title" data-i18n="gatekeeper_profile_error">Unable to Load Profile</h2>
    <p class="state-desc" id="gk-profile-error-msg" data-i18n="gatekeeper_profile_error_desc">Could not connect to society server. Please check your network.</p>
    <button type="button" class="btn-primary-action btn-gatekeeper-style" onclick="GrihamGatekeeperProfileUI.loadProfile()" style="width:auto; min-height:40px; padding:0 1.5rem; margin-top:0.5rem;">
      <span data-i18n="btn_try_again">Try Again</span>
    </button>
  </div>

  <!-- Loaded Profile Content -->
  <div id="gk-profile-content" class="gk-profile-main" style="display:none; flex-direction:column; gap:1rem;">

    <!-- ============================================================= -->
    <!-- 1. HERO IDENTITY CARD                                         -->
    <!-- ============================================================= -->
    <article class="profile-hero-card gk-profile-hero" aria-labelledby="gk-profile-name">
      <div class="profile-hero-top">
        <div class="profile-avatar-wrap">
          <div class="profile-avatar-circle gk-profile-avatar" id="gk-profile-avatar-display" aria-label="Gatekeeper Avatar">
            <span id="gk-profile-avatar-initials">AS</span>
            <img id="gk-profile-avatar-img" src="" alt="Gatekeeper Profile Photo" style="display:none; width:100%; height:100%; border-radius:50%; object-fit:cover;">
          </div>
        </div>

        <div class="profile-hero-info">
          <div class="profile-role-pill">
            <span class="role-badge-gatekeeper" data-i18n="role_gatekeeper_title">Gatekeeper</span>
            <span class="res-status-chip status-approved" id="gk-profile-status-badge">Active</span>
          </div>

          <h2 class="profile-name" id="gk-profile-name">Amit Sharma</h2>

          <div class="profile-meta-row" style="margin-top:0.25rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span id="gk-profile-station">Main Gate Security Station</span>
          </div>
        </div>
      </div>

      <!-- Action: Edit Profile -->
      <button type="button" class="btn-primary-action btn-gatekeeper-style" id="btn-open-edit-gk-profile" onclick="GrihamGatekeeperProfileUI.openEditSheet()" aria-label="Edit personal profile" style="margin-top:0.75rem;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        <span data-i18n="btn_edit_profile">Edit Profile</span>
      </button>
    </article>

    <!-- ============================================================= -->
    <!-- 2. INFORMATION / METADATA CARD                                -->
    <!-- ============================================================= -->
    <section class="profile-section-card" aria-labelledby="gk-account-info-heading">
      <div class="profile-section-header">
        <h3 class="profile-section-title" id="gk-account-info-heading" data-i18n="sec_account">Account Information</h3>
      </div>

      <div class="visitor-info-grid" style="margin-top:0.5rem;">
        <div class="visitor-info-item">
          <span class="info-label" data-i18n="label_gatekeeper_id">Gatekeeper ID</span>
          <span class="info-val font-mono" id="gk-profile-id">GTK-001</span>
        </div>

        <div class="visitor-info-item">
          <span class="info-label" data-i18n="label_society_id">Society ID</span>
          <span class="info-val font-mono" id="gk-profile-society-id">GRIHAM-PUNE-001</span>
        </div>

        <div class="visitor-info-item">
          <span class="info-label" data-i18n="label_phone">Phone Number</span>
          <span class="info-val" id="gk-profile-phone">+91 9876543211</span>
        </div>

        <div class="visitor-info-item">
          <span class="info-label" data-i18n="label_email">Email</span>
          <span class="info-val" id="gk-profile-email">amit.sharma@example.com</span>
        </div>

        <div class="visitor-info-item">
          <span class="info-label" data-i18n="label_joining_date">Joining Date</span>
          <span class="info-val" id="gk-profile-joining-date">01 Mar 2026</span>
        </div>

        <div class="visitor-info-item">
          <span class="info-label" data-i18n="label_account_status">Account Status</span>
          <span class="info-val" id="gk-profile-status-text">Active</span>
        </div>
      </div>
    </section>

    <!-- ============================================================= -->
    <!-- 3. SESSION & LOGOUT CTA CARD                                  -->
    <!-- ============================================================= -->
    <div style="margin-top:0.5rem; margin-bottom:1rem;">
      <button type="button" class="gk-end-shift-btn" id="btn-gk-profile-logout" onclick="GrihamGatekeeperProfileUI.openLogoutConfirm()" aria-label="End Shift and Logout from Terminal">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
          <line x1="12" y1="2" x2="12" y2="12"></line>
        </svg>
        <span data-i18n="btn_end_shift">End Shift / Logout</span>
      </button>
    </div>

  </div>

</section>
`;

/**
 * Gatekeeper Profile UI Controller
 */
const GrihamGatekeeperProfileUI = {
  currentProfile: null,
  pendingPhotoBlob: null,
  pendingPhotoFile: null,

  init() {
    this.closeEditSheet();
    this.closeLogoutConfirm();
    this.loadProfile();
    this.applyTranslations();
  },

  destroy() {
    this.closeEditSheet();
    this.closeLogoutConfirm();
    if (this.pendingPhotoBlob && this.pendingPhotoBlob.startsWith("blob:")) {
      try { URL.revokeObjectURL(this.pendingPhotoBlob); } catch(e){}
    }
    this.pendingPhotoBlob = null;
    this.pendingPhotoFile = null;
  },

  async loadProfile() {
    const loadingEl = document.getElementById("gk-profile-loading");
    const errorEl = document.getElementById("gk-profile-error");
    const contentEl = document.getElementById("gk-profile-content");

    if (loadingEl) loadingEl.style.display = "flex";
    if (errorEl) errorEl.style.display = "none";
    if (contentEl) contentEl.style.display = "none";

    try {
      let res;
      if (typeof window.GrihamAPI !== "undefined" && typeof window.GrihamAPI.getGatekeeperProfile === "function") {
        res = await window.GrihamAPI.getGatekeeperProfile();
      } else if (typeof window.getGatekeeperProfile === "function") {
        res = await window.getGatekeeperProfile();
      } else {
        throw new Error("Gatekeeper profile API is not available.");
      }

      if (res && res.profile) {
        this.currentProfile = res.profile;
        this.renderProfile(res.profile);

        if (loadingEl) loadingEl.style.display = "none";
        if (contentEl) contentEl.style.display = "flex";
      } else {
        throw new Error((res && res.message) || "Failed to load gatekeeper profile.");
      }
    } catch (err) {
      console.error("[GatekeeperProfileUI] Error loading profile:", err);
      if (loadingEl) loadingEl.style.display = "none";
      if (errorEl) {
        errorEl.style.display = "flex";
        const msgEl = document.getElementById("gk-profile-error-msg");
        if (msgEl) msgEl.textContent = err.message || "Could not connect to society server.";
      }
    }
  },

  renderProfile(p) {
    if (!p) return;

    // 1. Hero Identity Card
    const nameEl = document.getElementById("gk-profile-name");
    if (nameEl) nameEl.textContent = p.name || "Gate Security Staff";

    const stationEl = document.getElementById("gk-profile-station");
    if (stationEl) stationEl.textContent = p.station || "Main Gate Security Station";

    const statusBadge = document.getElementById("gk-profile-status-badge");
    const isActive = (p.status || "Active").toLowerCase() === "active";
    if (statusBadge) {
      statusBadge.textContent = isActive ? "Active" : "Inactive";
      statusBadge.className = isActive ? "res-status-chip status-approved" : "res-status-chip status-rejected";
    }

    // Avatar / Initials
    const initials = (typeof GrihamFormat !== "undefined" && typeof GrihamFormat.initials === "function")
      ? GrihamFormat.initials(p.name, "GK")
      : (p.name || "GK").split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

    const initialsEl = document.getElementById("gk-profile-avatar-initials");
    const imgEl = document.getElementById("gk-profile-avatar-img");

    if (p.profilePhoto) {
      if (imgEl) {
        imgEl.src = p.profilePhoto;
        imgEl.style.display = "block";
      }
      if (initialsEl) initialsEl.style.display = "none";
    } else {
      if (imgEl) {
        imgEl.src = "";
        imgEl.style.display = "none";
      }
      if (initialsEl) {
        initialsEl.textContent = initials;
        initialsEl.style.display = "inline";
      }
    }

    // 2. Account Information Section
    const idEl = document.getElementById("gk-profile-id");
    if (idEl) idEl.textContent = p.id || "GTK-001";

    const socEl = document.getElementById("gk-profile-society-id");
    if (socEl) socEl.textContent = p.societyId || "GRIHAM-PUNE-001";

    const phoneEl = document.getElementById("gk-profile-phone");
    if (phoneEl) phoneEl.textContent = p.phone || "—";

    const emailEl = document.getElementById("gk-profile-email");
    if (emailEl) emailEl.textContent = p.email || "—";

    const joinEl = document.getElementById("gk-profile-joining-date");
    if (joinEl) {
      joinEl.textContent = (typeof GrihamDateTime !== "undefined" && typeof GrihamDateTime.formatDate === "function" && p.joiningDate)
        ? GrihamDateTime.formatDate(p.joiningDate)
        : (p.joiningDate || "01 Mar 2026");
    }

    const statusTextEl = document.getElementById("gk-profile-status-text");
    if (statusTextEl) statusTextEl.textContent = p.status || "Active";
  },

  openEditSheet() {
    const p = this.currentProfile || {};

    // Clear previous errors
    const errBanner = document.getElementById("gk-edit-profile-error");
    if (errBanner) errBanner.style.display = "none";

    const nameErr = document.getElementById("gk-edit-name-err");
    if (nameErr) nameErr.textContent = "";

    const phoneErr = document.getElementById("gk-edit-phone-err");
    if (phoneErr) phoneErr.textContent = "";

    const emailErr = document.getElementById("gk-edit-email-err");
    if (emailErr) emailErr.textContent = "";

    // Populate editable fields
    const nameInp = document.getElementById("gk-edit-name");
    if (nameInp) nameInp.value = p.name || "";

    const phoneInp = document.getElementById("gk-edit-phone");
    if (phoneInp) phoneInp.value = p.phone || "";

    const emailInp = document.getElementById("gk-edit-email");
    if (emailInp) emailInp.value = p.email || "";

    // Populate read-only administrative fields
    const idInp = document.getElementById("gk-edit-id");
    if (idInp) idInp.value = p.id || "GTK-001";

    const socInp = document.getElementById("gk-edit-society-id");
    if (socInp) socInp.value = p.societyId || "GRIHAM-PUNE-001";

    const stationInp = document.getElementById("gk-edit-station");
    if (stationInp) stationInp.value = p.station || "Main Gate Security Station";

    // Setup photo preview
    this.renderEditPhotoPreview(p.profilePhoto, p.name);

    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-gk-edit-profile", "backdrop-gk-edit-profile");
    } else {
      const sheet = document.getElementById("sheet-gk-edit-profile");
      const backdrop = document.getElementById("backdrop-gk-edit-profile");
      if (sheet) sheet.classList.add("active");
      if (backdrop) backdrop.classList.add("active");
    }
  },

  closeEditSheet() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-gk-edit-profile", "backdrop-gk-edit-profile");
    } else {
      const sheet = document.getElementById("sheet-gk-edit-profile");
      const backdrop = document.getElementById("backdrop-gk-edit-profile");
      if (sheet) sheet.classList.remove("active");
      if (backdrop) backdrop.classList.remove("active");
    }

    if (this.pendingPhotoBlob && this.pendingPhotoBlob.startsWith("blob:")) {
      try { URL.revokeObjectURL(this.pendingPhotoBlob); } catch(e){}
    }
    this.pendingPhotoBlob = null;
    this.pendingPhotoFile = null;
  },

  renderEditPhotoPreview(photoUrl, name) {
    const initials = (typeof GrihamFormat !== "undefined" && typeof GrihamFormat.initials === "function")
      ? GrihamFormat.initials(name, "GK")
      : (name || "GK").split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

    const initialsEl = document.getElementById("gk-edit-photo-initials");
    const imgEl = document.getElementById("gk-edit-photo-img");
    const removeBtn = document.getElementById("btn-gk-remove-photo");

    if (photoUrl) {
      if (imgEl) {
        imgEl.src = photoUrl;
        imgEl.style.display = "block";
      }
      if (initialsEl) initialsEl.style.display = "none";
      if (removeBtn) removeBtn.style.display = "inline-block";
    } else {
      if (imgEl) {
        imgEl.src = "";
        imgEl.style.display = "none";
      }
      if (initialsEl) {
        initialsEl.textContent = initials;
        initialsEl.style.display = "inline";
      }
      if (removeBtn) removeBtn.style.display = "none";
    }
  },

  handlePhotoSelect(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (typeof GrihamValidation !== "undefined" && typeof GrihamValidation.validateFile === "function") {
      const check = GrihamValidation.validateFile(file, {
        maxSizeBytes: 5 * 1024 * 1024,
        typePrefix: "image/"
      });
      if (!check.valid) {
        if (typeof GrihamToast !== "undefined") {
          GrihamToast.show(check.error || "Please select a valid image file under 5MB.", "error");
        } else {
          alert(check.error || "Please select a valid image file under 5MB.");
        }
        event.target.value = "";
        return;
      }
    }

    if (this.pendingPhotoBlob && this.pendingPhotoBlob.startsWith("blob:")) {
      try { URL.revokeObjectURL(this.pendingPhotoBlob); } catch(e){}
    }
    this.pendingPhotoBlob = URL.createObjectURL(file);
    this.pendingPhotoFile = file;

    const nameInp = document.getElementById("gk-edit-name");
    this.renderEditPhotoPreview(this.pendingPhotoBlob, (nameInp && nameInp.value) || "GK");
  },

  removePhoto() {
    if (this.pendingPhotoBlob && this.pendingPhotoBlob.startsWith("blob:")) {
      try { URL.revokeObjectURL(this.pendingPhotoBlob); } catch(e){}
    }
    this.pendingPhotoBlob = null;
    this.pendingPhotoFile = null;

    if (this.currentProfile) {
      this.currentProfile.profilePhoto = null;
    }

    const photoInput = document.getElementById("gk-edit-photo-input");
    if (photoInput) photoInput.value = "";

    const nameInp = document.getElementById("gk-edit-name");
    this.renderEditPhotoPreview(null, (nameInp && nameInp.value) || "GK");
  },

  async saveProfile(event) {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }

    const nameInp = document.getElementById("gk-edit-name");
    const phoneInp = document.getElementById("gk-edit-phone");
    const emailInp = document.getElementById("gk-edit-email");
    const errBanner = document.getElementById("gk-edit-profile-error");
    const errBannerText = document.getElementById("gk-edit-profile-error-text");
    const nameErr = document.getElementById("gk-edit-name-err");
    const phoneErr = document.getElementById("gk-edit-phone-err");
    const emailErr = document.getElementById("gk-edit-email-err");

    if (errBanner) errBanner.style.display = "none";
    if (nameErr) nameErr.textContent = "";
    if (phoneErr) phoneErr.textContent = "";
    if (emailErr) emailErr.textContent = "";

    const nameVal = (nameInp && nameInp.value) ? nameInp.value.trim() : "";
    const phoneVal = (phoneInp && phoneInp.value) ? phoneInp.value.trim() : "";
    const emailVal = (emailInp && emailInp.value) ? emailInp.value.trim() : "";

    let hasError = false;

    // 1. Name validation (required)
    if (!nameVal || nameVal.length < 2) {
      const msg = (typeof GrihamI18n !== "undefined" && typeof GrihamI18n.t === "function")
        ? GrihamI18n.t("err_name_required")
        : "Full name is required.";
      if (nameErr) nameErr.textContent = msg;
      hasError = true;
    }

    // 2. Phone validation (required, 10-14 digits)
    if (!phoneVal) {
      const msg = (typeof GrihamI18n !== "undefined" && typeof GrihamI18n.t === "function")
        ? GrihamI18n.t("err_phone_invalid")
        : "Please enter a valid phone number (10 to 14 digits).";
      if (phoneErr) phoneErr.textContent = msg;
      hasError = true;
    } else if (typeof GrihamValidation !== "undefined" && typeof GrihamValidation.isValidPhone === "function") {
      if (!GrihamValidation.isValidPhone(phoneVal)) {
        const msg = (typeof GrihamI18n !== "undefined" && typeof GrihamI18n.t === "function")
          ? GrihamI18n.t("err_phone_invalid")
          : "Please enter a valid phone number (10 to 14 digits).";
        if (phoneErr) phoneErr.textContent = msg;
        hasError = true;
      }
    }

    // 3. Email validation (optional, must be valid if provided)
    if (emailVal && typeof GrihamValidation !== "undefined" && typeof GrihamValidation.isValidEmail === "function") {
      if (!GrihamValidation.isValidEmail(emailVal)) {
        const msg = (typeof GrihamI18n !== "undefined" && typeof GrihamI18n.t === "function")
          ? GrihamI18n.t("err_email_invalid")
          : "Please enter a valid email address.";
        if (emailErr) emailErr.textContent = msg;
        hasError = true;
      }
    }

    if (hasError) return;

    // Button loading state
    const saveBtn = document.getElementById("btn-save-gk-profile");
    const saveText = document.getElementById("btn-save-gk-profile-text");
    const saveSpinner = document.getElementById("btn-save-gk-profile-spinner");

    if (saveBtn) saveBtn.disabled = true;
    if (saveText) saveText.style.display = "none";
    if (saveSpinner) saveSpinner.style.display = "inline-block";

    const payload = {
      name: nameVal,
      phone: phoneVal,
      email: emailVal
    };

    if (this.pendingPhotoBlob) {
      payload.profilePhoto = this.pendingPhotoBlob;
    } else if (this.currentProfile && this.currentProfile.profilePhoto === null) {
      payload.profilePhoto = null;
    }

    try {
      let res;
      if (typeof window.GrihamAPI !== "undefined" && typeof window.GrihamAPI.updateGatekeeperProfile === "function") {
        res = await window.GrihamAPI.updateGatekeeperProfile(payload);
      } else if (typeof window.updateGatekeeperProfile === "function") {
        res = await window.updateGatekeeperProfile(payload);
      } else {
        throw new Error("Update gatekeeper profile API is not available.");
      }

      if (res && res.profile) {
        this.currentProfile = res.profile;
        this.renderProfile(res.profile);
        this.closeEditSheet();

        const successMsg = (typeof GrihamI18n !== "undefined" && typeof GrihamI18n.t === "function")
          ? GrihamI18n.t("toast_profile_updated")
          : "Profile updated successfully.";

        if (typeof GrihamToast !== "undefined" && typeof GrihamToast.show === "function") {
          GrihamToast.show(successMsg, "success");
        }
      } else {
        throw new Error((res && res.message) || "Failed to update profile.");
      }
    } catch (err) {
      console.error("[GatekeeperProfileUI] Error updating profile:", err);
      if (errBanner) {
        errBanner.style.display = "block";
        if (errBannerText) errBannerText.textContent = err.message || "Failed to save changes. Please try again.";
      }
    } finally {
      if (saveBtn) saveBtn.disabled = false;
      if (saveText) saveText.style.display = "inline";
      if (saveSpinner) saveSpinner.style.display = "none";
    }
  },

  openLogoutConfirm() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.open("sheet-gk-profile-logout", "backdrop-gk-profile-logout");
    } else {
      const sheet = document.getElementById("sheet-gk-profile-logout");
      const backdrop = document.getElementById("backdrop-gk-profile-logout");
      if (sheet) sheet.classList.add("active");
      if (backdrop) backdrop.classList.add("active");
    }
  },

  closeLogoutConfirm() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.close("sheet-gk-profile-logout", "backdrop-gk-profile-logout");
    } else {
      const sheet = document.getElementById("sheet-gk-profile-logout");
      const backdrop = document.getElementById("backdrop-gk-profile-logout");
      if (sheet) sheet.classList.remove("active");
      if (backdrop) backdrop.classList.remove("active");
    }
  },

  confirmLogout() {
    this.closeLogoutConfirm();
    if (typeof GrihamAuth !== "undefined" && typeof GrihamAuth.logout === "function") {
      GrihamAuth.logout("/gatekeeper/login");
    } else {
      window.location.hash = "#/gatekeeper/login";
    }
  },

  applyTranslations() {
    if (typeof GrihamI18n !== "undefined" && typeof GrihamI18n.translateElement === "function") {
      const root = document.getElementById("screen-gatekeeper-profile");
      if (root) GrihamI18n.translateElement(root);
      const editSheet = document.getElementById("sheet-gk-edit-profile");
      if (editSheet) GrihamI18n.translateElement(editSheet);
      const logoutSheet = document.getElementById("sheet-gk-profile-logout");
      if (logoutSheet) GrihamI18n.translateElement(logoutSheet);
    }
  }
};

window.GrihamGatekeeperProfileUI = GrihamGatekeeperProfileUI;
