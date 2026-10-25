/**
 * GRIHAM FRONTEND - RESIDENT PROFILE PAGE
 * Route: resident-profile (#/resident/profile)
 * Allows authenticated residents to view & manage personal info, society allocation,
 * security credentials, preferences, and account deactivation.
 */

window.HTML_RESIDENT_PROFILE = `
<!-- ================================================================= -->
<!-- 1. EDIT RESIDENT PROFILE BOTTOM SHEET                             -->
<!-- ================================================================= -->
<div class="sheet-backdrop" id="res-edit-profile-backdrop" onclick="GrihamResidentProfileUI.closeEditProfileSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="res-edit-profile-sheet" role="dialog" aria-modal="true" aria-labelledby="res-edit-profile-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentProfileUI.closeEditProfileSheet()" aria-label="Close edit profile sheet" title="Go back">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h2 class="sheet-title" id="res-edit-profile-title">Edit Profile</h2>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <form id="form-res-edit-profile" onsubmit="GrihamResidentProfileUI.submitEditProfile(event)" class="profile-sheet-form">

    <!-- Form Error Banner -->
    <div id="res-edit-profile-error" class="form-banner banner-error" style="display:none;" role="alert">
      <span id="res-edit-profile-error-text">Unable to update profile.</span>
      <button type="button" class="btn-banner-retry" onclick="GrihamResidentProfileUI.retryEditProfile()" style="display:inline-block; margin-left:8px; text-decoration:underline; font-weight:700; background:none; border:none; color:inherit; cursor:pointer;">Retry</button>
    </div>

    <!-- Photo Upload Row -->
    <div class="profile-photo-picker-row">
      <div class="photo-picker-preview res-photo-preview" id="res-edit-photo-preview" aria-label="Photo Preview">
        <span id="res-edit-photo-initials">RK</span>
        <img id="res-edit-photo-img" src="" alt="Profile Photo Preview" style="display:none; width:100%; height:100%; border-radius:50%; object-fit:cover;">
      </div>
      <div class="photo-picker-actions">
        <label class="btn-photo-upload-label res-photo-upload-btn" for="res-edit-photo-input">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          <span>Upload Photo</span>
        </label>
        <input type="file" id="res-edit-photo-input" accept="image/*" capture="user" style="display:none;" onchange="GrihamResidentProfileUI.handlePhotoSelect(event)">
        <button type="button" class="btn-photo-remove" id="btn-res-remove-photo" onclick="GrihamResidentProfileUI.removePhoto()" style="display:none;">Remove photo</button>
      </div>
    </div>
    <span class="field-helper-note" style="margin-top:-0.4rem; margin-bottom:0.75rem;">JPG or PNG, maximum size 5MB.</span>

    <!-- Full Name (Editable) -->
    <div class="form-group" id="group-res-edit-name">
      <label class="form-label" for="res-edit-name">
        <span>Full Name</span> <span class="required-star">*</span>
      </label>
      <div class="input-wrapper">
        <input type="text" id="res-edit-name" class="form-input" required placeholder="e.g. Rajesh Kumar" autocomplete="name" aria-label="Full Name">
      </div>
      <span class="field-error-msg" id="res-edit-name-err"></span>
    </div>

    <!-- Email (Editable) -->
    <div class="form-group" id="group-res-edit-email">
      <div class="label-row-between">
        <label class="form-label" for="res-edit-email">Email</label>
        <span class="badge-optional">Optional</span>
      </div>
      <div class="input-wrapper">
        <input type="email" id="res-edit-email" class="form-input" placeholder="e.g. rajesh@example.com" autocomplete="email" aria-label="Email Address">
      </div>
      <span class="field-error-msg" id="res-edit-email-err"></span>
    </div>

    <!-- Phone Number (READ-ONLY) -->
    <div class="form-group">
      <label class="form-label" for="res-edit-phone">Phone Number (Authentication ID)</label>
      <div class="input-wrapper readonly-input-wrap">
        <input type="tel" id="res-edit-phone" class="form-input form-input-readonly" disabled aria-label="Phone Number (read only)">
        <span class="input-readonly-lock-icon" aria-hidden="true" title="Authentication identifier cannot be changed">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </span>
      </div>
      <span class="field-helper-note">Phone number is your primary login identifier and is managed by society administration.</span>
    </div>

    <!-- Society ID (READ-ONLY) -->
    <div class="form-group">
      <label class="form-label" for="res-edit-society-id">Society ID</label>
      <div class="input-wrapper readonly-input-wrap">
        <input type="text" id="res-edit-society-id" class="form-input form-input-readonly" disabled aria-label="Society ID (read only)">
        <span class="input-readonly-lock-icon" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </span>
      </div>
    </div>

    <!-- Wing & Flat & Floor Allocation (READ-ONLY) -->
    <div class="form-row-2col">
      <div class="form-group">
        <label class="form-label" for="res-edit-wing">Wing</label>
        <div class="input-wrapper readonly-input-wrap">
          <input type="text" id="res-edit-wing" class="form-input form-input-readonly" disabled aria-label="Wing (read only)">
          <span class="input-readonly-lock-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="res-edit-flat">Flat Number</label>
        <div class="input-wrapper readonly-input-wrap">
          <input type="text" id="res-edit-flat" class="form-input form-input-readonly" disabled aria-label="Flat Number (read only)">
          <span class="input-readonly-lock-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
        </div>
      </div>
    </div>

    <div class="form-row-2col">
      <div class="form-group">
        <label class="form-label" for="res-edit-floor">Floor Number</label>
        <div class="input-wrapper readonly-input-wrap">
          <input type="text" id="res-edit-floor" class="form-input form-input-readonly" disabled aria-label="Floor Number (read only)">
          <span class="input-readonly-lock-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="res-edit-occupancy">Occupancy Type</label>
        <div class="input-wrapper readonly-input-wrap">
          <input type="text" id="res-edit-occupancy" class="form-input form-input-readonly" disabled aria-label="Occupancy Type (read only)">
          <span class="input-readonly-lock-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
        </div>
      </div>
    </div>

    <span class="field-helper-note" style="margin-top:-0.2rem; margin-bottom:0.85rem;">
      Society unit allocation is linked to resident records. Contact committee admin for allocation changes.
    </span>

    <!-- Actions -->
    <div class="logout-btn-row" style="margin-top:0.4rem;">
      <button type="button" class="btn-logout-cancel" onclick="GrihamResidentProfileUI.closeEditProfileSheet()">Cancel</button>
      <button type="submit" class="btn-primary-action btn-resident-style" id="btn-res-save-profile" style="margin-top:0; min-height:46px;">
        <span id="btn-res-save-profile-text">Save Changes</span>
        <span id="btn-res-save-profile-spinner" class="spinner-ring sm" style="display:none;" aria-hidden="true"></span>
      </button>
    </div>

  </form>
</div>

<!-- ================================================================= -->
<!-- 2. CHANGE PASSWORD BOTTOM SHEET                                   -->
<!-- ================================================================= -->
<div class="sheet-backdrop" id="res-change-pwd-backdrop" onclick="GrihamResidentProfileUI.closeChangePasswordSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="res-change-pwd-sheet" role="dialog" aria-modal="true" aria-labelledby="res-change-pwd-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentProfileUI.closeChangePasswordSheet()" aria-label="Close change password sheet" title="Go back">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h2 class="sheet-title" id="res-change-pwd-title">Change Password</h2>
    <div class="sheet-header-spacer" aria-hidden="true"></div>
  </div>

  <form id="form-res-change-pwd" onsubmit="GrihamResidentProfileUI.submitChangePassword(event)" class="profile-sheet-form">

    <!-- Form Error Banner -->
    <div id="res-change-pwd-error" class="form-banner banner-error" style="display:none;" role="alert">
      <span id="res-change-pwd-error-text"></span>
    </div>

    <!-- Current Password -->
    <div class="form-group" id="group-res-pwd-current">
      <label class="form-label" for="input-res-pwd-current">
        <span>Current Password</span> <span class="required-star">*</span>
      </label>
      <div class="input-wrapper">
        <input type="password" id="input-res-pwd-current" class="form-input" required autocomplete="current-password" placeholder="Enter current password" aria-label="Current Password">
        <button type="button" class="btn-input-toggle-pwd" onclick="GrihamResidentProfileUI.togglePwdVisibility('input-res-pwd-current', this)" aria-label="Show password">
          <svg class="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          <svg class="eye-off-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
        </button>
      </div>
      <span class="field-error-msg" id="res-pwd-current-err"></span>
    </div>

    <!-- New Password -->
    <div class="form-group" id="group-res-pwd-new">
      <label class="form-label" for="input-res-pwd-new">
        <span>New Password</span> <span class="required-star">*</span>
      </label>
      <div class="input-wrapper">
        <input type="password" id="input-res-pwd-new" class="form-input" required minlength="8" autocomplete="new-password" placeholder="At least 8 characters" aria-label="New Password">
        <button type="button" class="btn-input-toggle-pwd" onclick="GrihamResidentProfileUI.togglePwdVisibility('input-res-pwd-new', this)" aria-label="Show password">
          <svg class="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          <svg class="eye-off-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
        </button>
      </div>
      <span class="field-helper-note">Must contain at least 8 characters.</span>
      <span class="field-error-msg" id="res-pwd-new-err"></span>
    </div>

    <!-- Confirm New Password -->
    <div class="form-group" id="group-res-pwd-confirm">
      <label class="form-label" for="input-res-pwd-confirm">
        <span>Confirm New Password</span> <span class="required-star">*</span>
      </label>
      <div class="input-wrapper">
        <input type="password" id="input-res-pwd-confirm" class="form-input" required minlength="8" autocomplete="new-password" placeholder="Re-enter new password" aria-label="Confirm New Password">
        <button type="button" class="btn-input-toggle-pwd" onclick="GrihamResidentProfileUI.togglePwdVisibility('input-res-pwd-confirm', this)" aria-label="Show password">
          <svg class="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          <svg class="eye-off-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
        </button>
      </div>
      <span class="field-error-msg" id="res-pwd-confirm-err"></span>
    </div>

    <!-- Actions -->
    <div class="logout-btn-row" style="margin-top:0.4rem;">
      <button type="button" class="btn-logout-cancel" onclick="GrihamResidentProfileUI.closeChangePasswordSheet()">Cancel</button>
      <button type="submit" class="btn-primary-action btn-resident-style" id="btn-res-save-pwd" style="margin-top:0; min-height:46px;">
        <span id="btn-res-save-pwd-text">Update Password</span>
        <span id="btn-res-save-pwd-spinner" class="spinner-ring sm" style="display:none;" aria-hidden="true"></span>
      </button>
    </div>

  </form>
</div>

<!-- ================================================================= -->
<!-- 3. LOGOUT CONFIRMATION MODAL                                      -->
<!-- ================================================================= -->
<div class="sheet-backdrop" id="res-logout-backdrop" onclick="GrihamResidentProfileUI.closeLogoutConfirm()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet modal-dialog-sheet" id="res-logout-sheet" role="dialog" aria-modal="true" aria-labelledby="res-logout-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="logout-sheet-content">
    <div class="logout-icon-wrap" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
    </div>
    <h2 class="logout-title" id="res-logout-title">Logout from Griham?</h2>
    <p class="logout-message">Are you sure you want to logout? You will need your phone number and password to log back in.</p>
    <div class="logout-btn-row">
      <button type="button" class="btn-logout-cancel" onclick="GrihamResidentProfileUI.closeLogoutConfirm()">Cancel</button>
      <button type="button" class="btn-logout-confirm" id="btn-res-confirm-logout" onclick="GrihamResidentProfileUI.executeLogout()">Logout</button>
    </div>
  </div>
</div>

<!-- ================================================================= -->
<!-- 4. DANGER ZONE: 2-STEP ACCOUNT DELETION SHEET                     -->
<!-- ================================================================= -->
<div class="sheet-backdrop" id="res-delete-account-backdrop" onclick="GrihamResidentProfileUI.closeDeleteAccountSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="res-delete-account-sheet" role="dialog" aria-modal="true" aria-labelledby="res-delete-sheet-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>

  <!-- STEP 1: Initial Warning & Explanation -->
  <div id="res-delete-step-1" class="delete-account-step-box">
    <div class="delete-icon-pulse" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    </div>

    <h2 class="logout-title" id="res-delete-sheet-title">Delete your account?</h2>
    <p class="logout-message">
      This action will permanently deactivate your Griham account and you may lose access to your society data, payment history, and community services.
    </p>

    <div class="delete-account-notice-pill">
      <span>Step 1 of 2: Security Verification</span>
    </div>

    <div class="logout-btn-row" style="margin-top:0.8rem;">
      <button type="button" class="btn-logout-cancel" onclick="GrihamResidentProfileUI.closeDeleteAccountSheet()">Cancel</button>
      <button type="button" class="btn-primary-action btn-danger-action" id="btn-res-delete-step-1" onclick="GrihamResidentProfileUI.goToDeleteStep2()" style="margin-top:0; min-height:44px;">
        <span>Continue</span>
      </button>
    </div>
  </div>

  <!-- STEP 2: Explicit Final Confirmation -->
  <div id="res-delete-step-2" class="delete-account-step-box" style="display:none;">
    <div class="delete-icon-pulse danger-step2" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.4">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    </div>

    <h2 class="logout-title">Are you sure? This cannot be undone.</h2>
    <p class="logout-message">
      Please confirm that you want to permanently deactivate your resident account. Your society access will be deactivated immediately.
    </p>

    <div class="delete-account-notice-pill danger">
      <span>Final Step: Irreversible Action</span>
    </div>

    <div class="logout-btn-row" style="margin-top:0.8rem;">
      <button type="button" class="btn-logout-cancel" onclick="GrihamResidentProfileUI.goToDeleteStep1()">Cancel</button>
      <button type="button" class="btn-primary-action btn-danger-action" id="btn-res-confirm-delete" onclick="GrihamResidentProfileUI.executeDeleteAccount()" style="margin-top:0; min-height:44px;">
        <span id="btn-res-delete-text">Delete Account</span>
        <span id="btn-res-delete-spinner" class="spinner-ring sm" style="display:none;" aria-hidden="true"></span>
      </button>
    </div>
  </div>

</div>

<!-- ================================================================= -->
<!-- 5. MAIN RESIDENT PROFILE VIEWPORT (#screen-resident-profile)      -->
<!-- ================================================================= -->
<section id="screen-resident-profile" class="app-view resident-profile-view" aria-labelledby="resident-profile-header-title">

  <!-- TOP HEADER: Left: ← (Arrow back to Resident Home), Center: Profile, Right: Accessibility -->
  <header class="screen-top-bar screen-top-bar-sticky">
    ${GrihamHeader.renderBackButton({
      target: '/resident/home',
      id: 'btn-resident-profile-back',
      ariaLabel: 'Back to Resident Home'
    })}

    <h1 class="top-bar-screen-title" id="resident-profile-header-title">Profile</h1>

    <button type="button" class="btn-top-filter" onclick="GrihamA11y.toggleSheet(true)" id="btn-resident-profile-a11y" aria-label="Accessibility" title="Accessibility">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="4" r="2"/>
        <path d="M12 6v6"/>
        <path d="m8 10 4-1 4 1"/>
        <path d="m9 20 3-8 3 8"/>
        <path d="M6 13h12"/>
      </svg>
    </button>
  </header>

  <!-- Scrollable Profile Content -->
  <div class="resident-profile-scroll">

    <!-- Loading State -->
    <div id="res-profile-loading" class="profile-state-card" style="display:flex;" aria-live="polite">
      <div class="spinner-ring" aria-hidden="true"></div>
      <p class="profile-state-text">Loading profile information...</p>
    </div>

    <!-- Error State -->
    <div id="res-profile-error" class="profile-state-card profile-error-state" style="display:none;" role="alert" aria-live="assertive">
      <div class="state-icon-wrap icon-error" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h2 class="state-title">Unable to Load Profile</h2>
      <p class="state-desc" id="res-profile-error-msg">Could not connect to society server. Please check your connection.</p>
      <button type="button" class="btn-primary-action btn-resident-style" onclick="GrihamResidentProfileUI.loadData()" style="width:auto; min-height:40px; padding:0 1.5rem; margin-top:0.5rem;">
        <span>Try Again</span>
      </button>
    </div>

    <!-- Loaded Profile Content -->
    <div id="res-profile-content" class="resident-profile-main" style="display:none;">

      <!-- Status Warning Banner if Pending or Rejected -->
      <div id="res-profile-status-banner" style="display:none; margin: 0.8rem 1rem 0;">
        <!-- Dynamic content injected -->
      </div>

      <!-- ============================================================= -->
      <!-- SECTION 1: PROFILE HEADER (HERO CARD)                         -->
      <!-- ============================================================= -->
      <article class="profile-hero-card res-profile-hero" aria-labelledby="res-hero-name">
        <div class="profile-hero-top">
          <div class="profile-avatar-wrap">
            <div class="profile-avatar-circle res-avatar-circle" id="res-avatar-display" aria-label="Resident Avatar">
              <span id="res-avatar-initials">RK</span>
              <img id="res-avatar-img" src="" alt="Resident Profile Photo" style="display:none; width:100%; height:100%; border-radius:50%; object-fit:cover;">
            </div>
          </div>

          <div class="profile-hero-info">
            <div class="profile-role-pill">
              <span class="role-badge-resident">Resident</span>
              <span class="occupancy-badge" id="res-hero-occupancy-badge">Owner</span>
            </div>

            <h2 class="profile-name" id="res-hero-name">Rajesh Kumar</h2>

            <div class="res-hero-allocation-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span id="res-hero-flat-info">Wing A • Flat 204</span>
            </div>

            <div class="profile-meta-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span id="res-hero-phone">+91 9876543210</span>
            </div>
          </div>
        </div>

        <!-- Account Status Row -->
        <div class="profile-society-pill-row res-account-status-pill-row">
          <span class="profile-society-label">Account Status</span>
          <span class="res-status-chip status-approved" id="res-hero-status-badge">Approved</span>
        </div>

        <!-- Action: Edit Profile -->
        <button type="button" class="btn-primary-action btn-resident-style" id="btn-open-res-edit-profile" onclick="GrihamResidentProfileUI.openEditProfileSheet()" aria-label="Edit personal profile">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          <span>Edit Profile</span>
        </button>
      </article>

      <!-- ============================================================= -->
      <!-- SECTION 2: PERSONAL INFORMATION                               -->
      <!-- ============================================================= -->
      <section class="profile-section-card" aria-labelledby="personal-info-heading">
        <div class="profile-section-header">
          <div>
            <h2 class="profile-section-title" id="personal-info-heading">Personal Information</h2>
            <p class="profile-section-sub">Resident identity and society allocation details</p>
          </div>
          <button type="button" class="btn-section-header-action" onclick="GrihamResidentProfileUI.openEditProfileSheet()" aria-label="Edit personal information">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            <span>Edit</span>
          </button>
        </div>

        <div class="society-info-list">
          <div class="society-info-row">
            <span class="info-row-label">Full Name</span>
            <strong class="info-row-value" id="res-info-name">Rajesh Kumar</strong>
          </div>

          <div class="society-info-row">
            <span class="info-row-label">Phone Number</span>
            <div class="readonly-badge-wrap">
              <span class="info-row-value readonly-code" id="res-info-phone">+91 9876543210</span>
              <span class="readonly-tag" title="Authentication identifier cannot be modified">Read-only</span>
            </div>
          </div>

          <div class="society-info-row">
            <span class="info-row-label">Email</span>
            <span class="info-row-value" id="res-info-email">rajesh.kumar@example.com</span>
          </div>

          <div class="society-info-row">
            <span class="info-row-label">Wing</span>
            <div class="readonly-badge-wrap">
              <span class="info-row-value" id="res-info-wing">Wing A</span>
              <span class="readonly-tag">Read-only</span>
            </div>
          </div>

          <div class="society-info-row">
            <span class="info-row-label">Flat Number</span>
            <div class="readonly-badge-wrap">
              <span class="info-row-value" id="res-info-flat">204</span>
              <span class="readonly-tag">Read-only</span>
            </div>
          </div>

          <div class="society-info-row">
            <span class="info-row-label">Floor Number</span>
            <div class="readonly-badge-wrap">
              <span class="info-row-value" id="res-info-floor">2nd Floor</span>
              <span class="readonly-tag">Read-only</span>
            </div>
          </div>

          <div class="society-info-row">
            <span class="info-row-label">Occupancy Type</span>
            <div class="readonly-badge-wrap">
              <span class="info-row-value" id="res-info-occupancy">Owner</span>
              <span class="readonly-tag">Read-only</span>
            </div>
          </div>

          <div class="society-info-row">
            <span class="info-row-label">Society ID</span>
            <div class="readonly-badge-wrap">
              <strong class="info-row-value readonly-code" id="res-info-society-id">GRIHAM-PUNE-001</strong>
              <span class="readonly-tag">Read-only</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 3: SOCIETY INFORMATION (READ-ONLY)                    -->
      <!-- ============================================================= -->
      <section class="profile-section-card" aria-labelledby="society-info-heading">
        <div class="profile-section-header">
          <div>
            <h2 class="profile-section-title" id="society-info-heading">Society Information</h2>
            <p class="profile-section-sub">Allocated residential community premises</p>
          </div>
        </div>

        <div class="society-info-list">
          <div class="society-info-row">
            <span class="info-row-label">Society Name</span>
            <strong class="info-row-value" id="res-society-name">Green Valley Residency</strong>
          </div>

          <div class="society-info-row">
            <span class="info-row-label">Society ID</span>
            <div class="readonly-badge-wrap">
              <strong class="info-row-value readonly-code" id="res-society-id">GRIHAM-PUNE-001</strong>
              <span class="readonly-tag">Read-only</span>
            </div>
          </div>

          <div class="society-info-row">
            <span class="info-row-label">Wing</span>
            <span class="info-row-value" id="res-society-wing">Wing A</span>
          </div>

          <div class="society-info-row">
            <span class="info-row-label">Flat Number</span>
            <span class="info-row-value" id="res-society-flat">Flat 204</span>
          </div>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 4: SECURITY                                           -->
      <!-- ============================================================= -->
      <section class="profile-section-card" aria-labelledby="res-security-heading">
        <div class="profile-section-header">
          <div>
            <h2 class="profile-section-title" id="res-security-heading">Security</h2>
            <p class="profile-section-sub">Password and credential protection</p>
          </div>
        </div>

        <div class="settings-action-list">
          <button type="button" class="settings-action-item" id="btn-open-res-change-pwd" onclick="GrihamResidentProfileUI.openChangePasswordSheet()" aria-label="Change portal password">
            <div class="action-item-icon-wrap" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div class="action-item-text">
              <strong class="action-item-title">Change Password</strong>
              <span class="action-item-desc">Update your login password securely</span>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="action-item-chevron" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 5: PREFERENCES (LANGUAGE & ACCESSIBILITY)             -->
      <!-- ============================================================= -->
      <section class="profile-section-card" aria-labelledby="res-preferences-heading">
        <div class="profile-section-header">
          <div>
            <h2 class="profile-section-title" id="res-preferences-heading">Preferences</h2>
            <p class="profile-section-sub">Display language and accessibility controls</p>
          </div>
        </div>

        <div class="settings-action-list">
          <!-- Language Selector -->
          <div class="settings-action-item static-item">
            <div class="action-item-icon-wrap icon-lang" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div class="action-item-text">
              <label for="res-lang-select" class="action-item-title">Language</label>
              <span class="action-item-desc">Choose interface language</span>
            </div>
            <div class="action-item-ctrl">
              <select id="res-lang-select" class="form-input profile-lang-dropdown" onchange="GrihamResidentProfileUI.handleLanguageChange(this.value)" aria-label="Select language">
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>
          </div>

          <!-- Accessibility Trigger -->
          <button type="button" class="settings-action-item" onclick="GrihamA11y.toggleSheet(true)" id="btn-res-open-a11y" aria-label="Open accessibility settings">
            <div class="action-item-icon-wrap icon-a11y" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="12" cy="4" r="2"/>
                <path d="M12 6v6"/>
                <path d="m8 10 4-1 4 1"/>
                <path d="m9 20 3-8 3 8"/>
                <path d="M6 13h12"/>
              </svg>
            </div>
            <div class="action-item-text">
              <strong class="action-item-title">Accessibility Settings</strong>
              <span class="action-item-desc">Text scale, contrast, line height &amp; motion</span>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="action-item-chevron" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 6: LOGOUT                                             -->
      <!-- ============================================================= -->
      <section class="profile-section-card" aria-labelledby="res-account-actions-heading">
        <h2 class="sr-only" id="res-account-actions-heading">Account Actions</h2>
        <button type="button" class="btn-profile-action-logout" id="btn-res-logout" onclick="GrihamResidentProfileUI.openLogoutConfirm()" aria-label="Log out from Griham Resident Portal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Logout</span>
        </button>
      </section>

      <!-- ============================================================= -->
      <!-- SECTION 7: DANGER ZONE (DELETE ACCOUNT)                       -->
      <!-- ============================================================= -->
      <section class="profile-danger-zone-card" aria-labelledby="res-danger-zone-heading">
        <div class="danger-zone-header">
          <div class="danger-icon-wrap" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <h2 class="danger-zone-title" id="res-danger-zone-heading">Danger Zone</h2>
            <p class="danger-zone-desc">Permanent deactivation of your Griham resident account.</p>
          </div>
        </div>

        <p class="danger-zone-body-text">
          Once your account is deactivated, all personal allocations and community preferences will be locked. This action cannot be reversed.
        </p>

        <button type="button" class="btn-danger-outline" id="btn-res-open-delete-account" onclick="GrihamResidentProfileUI.openDeleteAccountSheet()" aria-label="Delete Resident Account">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          <span>Delete Account</span>
        </button>
      </section>

    </div><!-- /res-profile-content -->

  </div><!-- /resident-profile-scroll -->

</section>
`;

/**
 * Controller for Resident Profile UI
 */
window.GrihamResidentProfileUI = {
  currentProfile: null,
  pendingPhotoBlob: null,
  pendingPhotoFile: null,

  init() {
    this.closeAllSheets();
    this.loadData();
    this.syncLanguageDropdown();
  },

  syncLanguageDropdown() {
    const langSelect = document.getElementById("res-lang-select");
    if (langSelect && typeof GrihamState !== "undefined") {
      langSelect.value = GrihamState.language || "en";
    }
  },

  async loadData() {
    const loadingEl = document.getElementById("res-profile-loading");
    const errorEl = document.getElementById("res-profile-error");
    const contentEl = document.getElementById("res-profile-content");

    if (loadingEl) loadingEl.style.display = "flex";
    if (errorEl) errorEl.style.display = "none";
    if (contentEl) contentEl.style.display = "none";

    try {
      let res;
      if (typeof window.getResidentProfile === "function") {
        res = await window.getResidentProfile();
      } else if (typeof GrihamAPI !== "undefined" && GrihamAPI.getResidentProfile) {
        res = await GrihamAPI.getResidentProfile();
      } else {
        throw new Error("API not available");
      }

      const profile = res?.profile || res?.data || {};
      this.currentProfile = profile;
      this.renderProfile(profile);

      if (loadingEl) loadingEl.style.display = "none";
      if (contentEl) contentEl.style.display = "block";
    } catch (err) {
      console.error("[Resident Profile] Load error:", err);
      if (loadingEl) loadingEl.style.display = "none";
      if (errorEl) {
        errorEl.style.display = "flex";
        const msgEl = document.getElementById("res-profile-error-msg");
        if (msgEl) msgEl.textContent = err.message || "Could not connect to society server. Please try again.";
      }
    }
  },

  renderProfile(p) {
    if (!p) return;

    // Helper: compute initials
    const name = p.name || "Resident";
    const initials = GrihamFormat.initials(name, "R");

    // 1. Hero Card
    const heroName = document.getElementById("res-hero-name");
    if (heroName) heroName.textContent = name;

    const heroFlat = document.getElementById("res-hero-flat-info");
    if (heroFlat) heroFlat.textContent = `Wing ${p.wing || "A"} • Flat ${p.flatNumber || p.flat || "204"}`;

    const heroPhone = document.getElementById("res-hero-phone");
    if (heroPhone) heroPhone.textContent = p.phone || "+91 9876543210";

    const heroOccupancy = document.getElementById("res-hero-occupancy-badge");
    if (heroOccupancy) heroOccupancy.textContent = p.occupancyType || p.resident_type || "Owner";

    // Avatar
    const avatarInitials = document.getElementById("res-avatar-initials");
    const avatarImg = document.getElementById("res-avatar-img");
    if (p.profilePhoto) {
      if (avatarImg) {
        avatarImg.src = p.profilePhoto;
        avatarImg.style.display = "block";
      }
      if (avatarInitials) avatarInitials.style.display = "none";
    } else {
      if (avatarImg) avatarImg.style.display = "none";
      if (avatarInitials) {
        avatarInitials.textContent = initials;
        avatarInitials.style.display = "inline";
      }
    }

    // Account Status
    const status = p.approvalStatus || "Approved";
    const statusChip = document.getElementById("res-hero-status-badge");
    const statusBanner = document.getElementById("res-profile-status-banner");

    if (statusChip) {
      statusChip.textContent = status === "Approved" ? "Approved" : status === "Pending" ? "Pending Approval" : "Rejected";
      statusChip.className = "res-status-chip " + (status === "Approved" ? "status-approved" : status === "Pending" ? "status-pending" : "status-rejected");
    }

    if (statusBanner) {
      if (status === "Pending") {
        statusBanner.style.display = "block";
        statusBanner.innerHTML = `
          <div class="res-verification-banner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.2" style="flex-shrink:0; margin-top:2px;">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <div>
              <strong style="color:#f59e0b; font-size:0.85rem; display:block;">Account Pending Approval</strong>
              <p style="font-size:0.75rem; color:var(--text-secondary, #cbd5e1); margin:0.15rem 0 0;">
                Your resident registration is awaiting verification by the society chairman or secretary.
              </p>
            </div>
          </div>
        `;
      } else if (status === "Rejected") {
        statusBanner.style.display = "block";
        const reason = p.rejectionReason || "Flat details could not be verified with society records.";
        statusBanner.innerHTML = `
          <div class="res-rejection-banner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2" style="flex-shrink:0; margin-top:2px;">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <div>
              <strong style="color:#ef4444; font-size:0.85rem; display:block;">Account Rejected</strong>
              <p style="font-size:0.75rem; color:var(--text-secondary, #cbd5e1); margin:0.15rem 0 0;">
                Reason: ${reason}
              </p>
            </div>
          </div>
        `;
      } else {
        statusBanner.style.display = "none";
        statusBanner.innerHTML = "";
      }
    }

    // 2. Personal Information Section
    const infoName = document.getElementById("res-info-name");
    if (infoName) infoName.textContent = name;

    const infoPhone = document.getElementById("res-info-phone");
    if (infoPhone) infoPhone.textContent = p.phone || "+91 9876543210";

    const infoEmail = document.getElementById("res-info-email");
    if (infoEmail) infoEmail.textContent = p.email || "Not specified";

    const infoWing = document.getElementById("res-info-wing");
    if (infoWing) infoWing.textContent = `Wing ${p.wing || "A"}`;

    const infoFlat = document.getElementById("res-info-flat");
    if (infoFlat) infoFlat.textContent = String(p.flatNumber || p.flat || "204");

    const infoFloor = document.getElementById("res-info-floor");
    if (infoFloor) {
      const fl = p.floorNumber || 2;
      const suffix = fl === 1 ? "st" : fl === 2 ? "nd" : fl === 3 ? "rd" : "th";
      infoFloor.textContent = `${fl}${suffix} Floor`;
    }

    const infoOccupancy = document.getElementById("res-info-occupancy");
    if (infoOccupancy) infoOccupancy.textContent = p.occupancyType || p.resident_type || "Owner";

    const infoSocId = document.getElementById("res-info-society-id");
    if (infoSocId) infoSocId.textContent = p.societyId || "GRIHAM-PUNE-001";

    // 3. Society Information Section
    const socName = document.getElementById("res-society-name");
    if (socName) socName.textContent = p.societyName || "Green Valley Residency";

    const socId = document.getElementById("res-society-id");
    if (socId) socId.textContent = p.societyId || "GRIHAM-PUNE-001";

    const socWing = document.getElementById("res-society-wing");
    if (socWing) socWing.textContent = `Wing ${p.wing || "A"}`;

    const socFlat = document.getElementById("res-society-flat");
    if (socFlat) socFlat.textContent = `Flat ${p.flatNumber || p.flat || "204"}`;
  },

  // ===================================================================
  // EDIT PROFILE SHEET
  // ===================================================================
  openEditProfileSheet() {
    const p = this.currentProfile || {};
    this.pendingPhotoBlob = null;
    this.pendingPhotoFile = null;

    // Reset error banner
    const errBanner = document.getElementById("res-edit-profile-error");
    if (errBanner) errBanner.style.display = "none";

    // Populate fields
    const nameInp = document.getElementById("res-edit-name");
    if (nameInp) nameInp.value = p.name || "";

    const emailInp = document.getElementById("res-edit-email");
    if (emailInp) emailInp.value = p.email || "";

    // Read only fields
    const phoneInp = document.getElementById("res-edit-phone");
    if (phoneInp) phoneInp.value = p.phone || "";

    const socInp = document.getElementById("res-edit-society-id");
    if (socInp) socInp.value = p.societyId || "GRIHAM-PUNE-001";

    const wingInp = document.getElementById("res-edit-wing");
    if (wingInp) wingInp.value = p.wing || "A";

    const flatInp = document.getElementById("res-edit-flat");
    if (flatInp) flatInp.value = p.flatNumber || p.flat || "204";

    const floorInp = document.getElementById("res-edit-floor");
    if (floorInp) floorInp.value = String(p.floorNumber || 2);

    const occInp = document.getElementById("res-edit-occupancy");
    if (occInp) occInp.value = p.occupancyType || p.resident_type || "Owner";

    // Photo preview
    this.renderEditPhotoPreview(p.profilePhoto, p.name);

    // Open sheet
    GrihamBottomSheet.open("res-edit-profile-sheet", "res-edit-profile-backdrop");
  },

  closeEditProfileSheet() {
    GrihamBottomSheet.close("res-edit-profile-sheet", "res-edit-profile-backdrop");
    // Clean up temporary photo object URL if created
    if (this.pendingPhotoBlob && this.pendingPhotoBlob.startsWith("blob:")) {
      try { URL.revokeObjectURL(this.pendingPhotoBlob); } catch(e){}
    }
    this.pendingPhotoBlob = null;
    this.pendingPhotoFile = null;
  },

  renderEditPhotoPreview(photoUrl, name) {
    const initials = GrihamFormat.initials(name, "R");
    const initialsEl = document.getElementById("res-edit-photo-initials");
    const imgEl = document.getElementById("res-edit-photo-img");
    const removeBtn = document.getElementById("btn-res-remove-photo");

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
    const file = event.target.files?.[0];
    if (!file) return;

    // Validation: Image type and Max 5MB
    const check = GrihamValidation.validateFile(file, {
      maxSizeBytes: 5 * 1024 * 1024,
      typePrefix: "image/"
    });
    if (!check.valid) {
      const errMsg = check.error.includes("Invalid file type") ? "Please select a valid image file (JPG, PNG, WebP)." : "Image is too large. Maximum file size is 5MB.";
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(errMsg, "error");
      } else {
        alert(errMsg);
      }
      event.target.value = "";
      return;
    }

    // Create memory object URL (prevents large base64 strings in localStorage)
    if (this.pendingPhotoBlob && this.pendingPhotoBlob.startsWith("blob:")) {
      try { URL.revokeObjectURL(this.pendingPhotoBlob); } catch(e){}
    }
    this.pendingPhotoBlob = URL.createObjectURL(file);
    this.pendingPhotoFile = file;

    this.renderEditPhotoPreview(this.pendingPhotoBlob, this.currentProfile?.name);
    event.target.value = "";
  },

  removePhoto() {
    if (this.pendingPhotoBlob && this.pendingPhotoBlob.startsWith("blob:")) {
      try { URL.revokeObjectURL(this.pendingPhotoBlob); } catch(e){}
    }
    this.pendingPhotoBlob = null;
    this.pendingPhotoFile = null;
    // Mark photo as explicitly removed
    this.photoRemoved = true;
    this.renderEditPhotoPreview(null, this.currentProfile?.name);
  },

  async submitEditProfile(event) {
    if (event) event.preventDefault();

    const nameInp = document.getElementById("res-edit-name");
    const emailInp = document.getElementById("res-edit-email");
    const nameErr = document.getElementById("res-edit-name-err");
    const emailErr = document.getElementById("res-edit-email-err");
    const errBanner = document.getElementById("res-edit-profile-error");
    const errText = document.getElementById("res-edit-profile-error-text");

    if (nameErr) nameErr.textContent = "";
    if (emailErr) emailErr.textContent = "";
    if (errBanner) errBanner.style.display = "none";

    const name = (nameInp?.value || "").trim();
    const email = (emailInp?.value || "").trim();

    // Validation
    let hasErr = false;
    if (!name) {
      if (nameErr) nameErr.textContent = "Full name is required.";
      hasErr = true;
    }

    if (email && !GrihamValidation.isValidEmail(email)) {
      if (emailErr) emailErr.textContent = "Please enter a valid email address.";
      hasErr = true;
    }

    if (hasErr) return;

    // Loading State
    const btn = document.getElementById("btn-res-save-profile");
    const btnText = document.getElementById("btn-res-save-profile-text");
    const btnSpinner = document.getElementById("btn-res-save-profile-spinner");

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Saving...";
    if (btnSpinner) btnSpinner.style.display = "inline-block";

    try {
      const payload = {
        name,
        email
      };

      if (this.pendingPhotoBlob) {
        payload.profilePhoto = this.pendingPhotoBlob;
      } else if (this.photoRemoved) {
        payload.profilePhoto = null;
      }

      let res;
      if (typeof window.updateResidentProfile === "function") {
        res = await window.updateResidentProfile(payload);
      } else if (typeof GrihamAPI !== "undefined" && GrihamAPI.updateResidentProfile) {
        res = await GrihamAPI.updateResidentProfile(payload);
      } else {
        throw new Error("Update API unavailable");
      }

      // Success
      this.photoRemoved = false;
      this.closeEditProfileSheet();

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Profile updated successfully.", "success");
      } else {
        alert("Profile updated successfully.");
      }

      // Refresh displayed profile
      await this.loadData();
    } catch (err) {
      console.error("[Resident Profile] Save error:", err);
      if (errBanner) {
        errBanner.style.display = "flex";
        if (errText) errText.textContent = err.message || "Unable to update profile.";
      }
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Save Changes";
      if (btnSpinner) btnSpinner.style.display = "none";
    }
  },

  retryEditProfile() {
    this.submitEditProfile();
  },

  // ===================================================================
  // CHANGE PASSWORD SHEET
  // ===================================================================
  openChangePasswordSheet() {
    // Reset form
    const form = document.getElementById("form-res-change-pwd");
    if (form) form.reset();

    const errBanner = document.getElementById("res-change-pwd-error");
    if (errBanner) errBanner.style.display = "none";

    ["res-pwd-current-err", "res-pwd-new-err", "res-pwd-confirm-err"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = "";
    });

    GrihamBottomSheet.open("res-change-pwd-sheet", "res-change-pwd-backdrop");
  },

  closeChangePasswordSheet() {
    GrihamBottomSheet.close("res-change-pwd-sheet", "res-change-pwd-backdrop");
  },

  togglePwdVisibility(inputId, btnEl) {
    const inp = document.getElementById(inputId);
    if (!inp) return;
    const isPwd = inp.type === "password";
    inp.type = isPwd ? "text" : "password";

    const eyeIcon = btnEl.querySelector(".eye-icon");
    const eyeOffIcon = btnEl.querySelector(".eye-off-icon");
    if (eyeIcon) eyeIcon.style.display = isPwd ? "none" : "inline";
    if (eyeOffIcon) eyeOffIcon.style.display = isPwd ? "inline" : "none";
    btnEl.setAttribute("aria-label", isPwd ? "Hide password" : "Show password");
  },

  async submitChangePassword(event) {
    if (event) event.preventDefault();

    const currInp = document.getElementById("input-res-pwd-current");
    const newInp = document.getElementById("input-res-pwd-new");
    const confInp = document.getElementById("input-res-pwd-confirm");

    const currErr = document.getElementById("res-pwd-current-err");
    const newErr = document.getElementById("res-pwd-new-err");
    const confErr = document.getElementById("res-pwd-confirm-err");
    const errBanner = document.getElementById("res-change-pwd-error");
    const errText = document.getElementById("res-change-pwd-error-text");

    if (currErr) currErr.textContent = "";
    if (newErr) newErr.textContent = "";
    if (confErr) confErr.textContent = "";
    if (errBanner) errBanner.style.display = "none";

    const current_password = currInp?.value || "";
    const new_password = newInp?.value || "";
    const confirm_password = confInp?.value || "";

    let hasErr = false;
    if (!current_password) {
      if (currErr) currErr.textContent = "Current password is required.";
      hasErr = true;
    }

    if (!new_password) {
      if (newErr) newErr.textContent = "New password is required.";
      hasErr = true;
    } else if (new_password.length < 8) {
      if (newErr) newErr.textContent = "New password must be at least 8 characters.";
      hasErr = true;
    }

    if (!confirm_password) {
      if (confErr) confErr.textContent = "Please confirm your new password.";
      hasErr = true;
    } else if (new_password !== confirm_password) {
      if (confErr) confErr.textContent = "New password and confirmation do not match.";
      hasErr = true;
    }

    if (hasErr) return;

    // Loading State
    const btn = document.getElementById("btn-res-save-pwd");
    const btnText = document.getElementById("btn-res-save-pwd-text");
    const btnSpinner = document.getElementById("btn-res-save-pwd-spinner");

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Updating...";
    if (btnSpinner) btnSpinner.style.display = "inline-block";

    try {
      let res;
      if (typeof window.changeResidentPassword === "function") {
        res = await window.changeResidentPassword({
          current_password,
          new_password,
          confirm_password
        });
      } else if (typeof GrihamAPI !== "undefined" && GrihamAPI.changeResidentPassword) {
        res = await GrihamAPI.changeResidentPassword({
          current_password,
          new_password,
          confirm_password
        });
      } else {
        throw new Error("Password API unavailable");
      }

      this.closeChangePasswordSheet();

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Password updated successfully.", "success");
      } else {
        alert("Password updated successfully.");
      }
    } catch (err) {
      console.error("[Resident Profile] Password error:", err);
      if (errBanner) {
        errBanner.style.display = "flex";
        if (errText) errText.textContent = err.message || "Unable to update password.";
      }
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Update Password";
      if (btnSpinner) btnSpinner.style.display = "none";
    }
  },

  // ===================================================================
  // LOGOUT CONFIRMATION
  // ===================================================================
  openLogoutConfirm() {
    if (typeof GrihamConfirmation !== "undefined") {
      GrihamConfirmation.open({
        title: "Logout?",
        message: "Are you sure you want to log out of your resident account?",
        confirmText: "Logout",
        cancelText: "Cancel",
        isDanger: true,
        onConfirm: () => this.executeLogout()
      });
      return;
    }
    GrihamBottomSheet.open("res-logout-sheet", "res-logout-backdrop");
  },

  closeLogoutConfirm() {
    if (typeof GrihamConfirmation !== "undefined") {
      GrihamConfirmation.close(false);
    }
    GrihamBottomSheet.close("res-logout-sheet", "res-logout-backdrop");
  },

  executeLogout() {
    this.closeLogoutConfirm();
    if (typeof GrihamAuth !== "undefined") {
      GrihamAuth.logout("/resident/login");
    } else {
      GrihamRouter.navigate("/resident/login");
    }
  },

  // ===================================================================
  // DANGER ZONE: 2-STEP ACCOUNT DELETION
  // ===================================================================
  openDeleteAccountSheet() {
    this.goToDeleteStep1();
    GrihamBottomSheet.open("res-delete-account-sheet", "res-delete-account-backdrop");
  },

  closeDeleteAccountSheet() {
    GrihamBottomSheet.close("res-delete-account-sheet", "res-delete-account-backdrop");
  },

  goToDeleteStep1() {
    const s1 = document.getElementById("res-delete-step-1");
    const s2 = document.getElementById("res-delete-step-2");
    if (s1) s1.style.display = "block";
    if (s2) s2.style.display = "none";
  },

  goToDeleteStep2() {
    const s1 = document.getElementById("res-delete-step-1");
    const s2 = document.getElementById("res-delete-step-2");
    if (s1) s1.style.display = "none";
    if (s2) s2.style.display = "block";
  },

  async executeDeleteAccount() {
    const btn = document.getElementById("btn-res-confirm-delete");
    const btnText = document.getElementById("btn-res-delete-text");
    const btnSpinner = document.getElementById("btn-res-delete-spinner");

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Deactivating...";
    if (btnSpinner) btnSpinner.style.display = "inline-block";

    try {
      if (typeof window.deleteResidentAccount === "function") {
        await window.deleteResidentAccount();
      } else if (typeof GrihamAPI !== "undefined" && GrihamAPI.deleteResidentAccount) {
        await GrihamAPI.deleteResidentAccount();
      }

      this.closeDeleteAccountSheet();

      // Clear session
      if (typeof GrihamAuth !== "undefined") {
        GrihamAuth.logout("/resident/login");
      } else {
        GrihamRouter.navigate("/resident/login");
      }

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Your account has been deactivated.", "info");
      }
    } catch (err) {
      console.error("[Resident Profile] Delete account error:", err);
      const errMsg = err.message || "Unable to deactivate account. Please try again or contact society administrator.";
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(errMsg, "error");
      } else {
        alert(errMsg);
      }
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Delete Account";
      if (btnSpinner) btnSpinner.style.display = "none";
    }
  },

  // ===================================================================
  // PREFERENCES: LANGUAGE
  // ===================================================================
  handleLanguageChange(lang) {
    if (typeof GrihamI18n !== "undefined") {
      GrihamI18n.setLanguage(lang);
    }
  },

  // ===================================================================
  // SHEET CLEANUP
  // ===================================================================
  closeAllSheets() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.closeAll();
    }
  }
};
