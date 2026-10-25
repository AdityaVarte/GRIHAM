
/* HTML TEMPLATE EXTRACTED FROM index.html */
window.HTML_PROFILE = `
<div class="sheet-backdrop" id="admin-edit-profile-backdrop" onclick="GrihamAdminProfileUI.closeEditProfileSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="admin-edit-profile-sheet" role="dialog" aria-modal="true" aria-labelledby="edit-profile-sheet-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button type="button" class="btn-sheet-back" onclick="GrihamAdminProfileUI.closeEditProfileSheet()" aria-label="Close edit profile sheet" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h2 class="sheet-title" id="edit-profile-sheet-title" data-i18n="edit_profile_title">Edit Profile</h2>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-admin-edit-profile" onsubmit="GrihamAdminProfileUI.submitEditProfile(event)" class="profile-sheet-form">

      <!-- Form Error Banner -->
      <div id="edit-profile-error" class="form-banner banner-error" style="display:none;" role="alert">
        <span id="edit-profile-error-text"></span>
      </div>

      <!-- Photo Upload Row -->
      <div class="profile-photo-picker-row">
        <div class="photo-picker-preview" id="edit-profile-photo-preview" aria-label="Photo Preview">
          <span id="edit-profile-photo-initials">RK</span>
        </div>
        <div class="photo-picker-actions">
          <label class="btn-photo-upload-label" for="edit-profile-photo-input">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            <span data-i18n="btn_choose_photo">Upload Photo</span>
          </label>
          <input type="file" id="edit-profile-photo-input" accept="image/*" style="display:none;" onchange="GrihamAdminProfileUI.handlePhotoSelect(event)">
          <button type="button" class="btn-photo-remove" id="btn-remove-profile-photo" onclick="GrihamAdminProfileUI.removePhoto()" style="display:none;" data-i18n="btn_remove_photo">Remove photo</button>
        </div>
      </div>

      <!-- Full Name -->
      <div class="form-group" id="group-edit-profile-name">
        <label class="form-label" for="edit-profile-name">
          <span data-i18n="label_fullname">Full Name</span> <span class="required-star">*</span>
        </label>
        <div class="input-wrapper">
          <input type="text" id="edit-profile-name" class="form-input" required placeholder="e.g. Rajesh Kumar" autocomplete="name" aria-label="Full Name">
        </div>
        <span class="field-error-msg" id="edit-profile-name-err"></span>
      </div>

      <!-- Phone Number -->
      <div class="form-group" id="group-edit-profile-phone">
        <label class="form-label" for="edit-profile-phone">
          <span data-i18n="label_phone">Phone Number</span> <span class="required-star">*</span>
        </label>
        <div class="input-wrapper">
          <input type="tel" id="edit-profile-phone" class="form-input" required placeholder="+91 9876543210" autocomplete="tel" aria-label="Phone Number">
        </div>
        <span class="field-error-msg" id="edit-profile-phone-err"></span>
      </div>

      <!-- Email -->
      <div class="form-group" id="group-edit-profile-email">
        <div class="label-row-between">
          <label class="form-label" for="edit-profile-email" data-i18n="label_email">Email</label>
          <span class="badge-optional" data-i18n="badge_optional">Optional</span>
        </div>
        <div class="input-wrapper">
          <input type="email" id="edit-profile-email" class="form-input" placeholder="admin@example.com" autocomplete="email" aria-label="Email">
        </div>
        <span class="field-error-msg" id="edit-profile-email-err"></span>
      </div>

      <!-- Society ID (Read Only) -->
      <div class="form-group">
        <label class="form-label" for="edit-profile-society-id" data-i18n="label_society_id">Society ID</label>
        <div class="input-wrapper readonly-input-wrap">
          <input type="text" id="edit-profile-society-id" class="form-input form-input-readonly" disabled aria-label="Society ID (read only)">
          <span class="input-readonly-lock-icon" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
        </div>
        <span class="field-helper-note" data-i18n="helper_society_id_readonly">Society ID is locked and cannot be changed from the personal profile form.</span>
      </div>

      <!-- Actions -->
      <div class="logout-btn-row" style="margin-top:0.4rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminProfileUI.closeEditProfileSheet()" data-i18n="btn_cancel">Cancel</button>
        <button type="submit" class="btn-primary-action btn-admin-style" id="btn-save-profile" style="margin-top:0; min-height:46px;">
          <span id="btn-save-profile-text" data-i18n="btn_save_changes">Save Changes</span>
          <span id="btn-save-profile-spinner" class="spinner-ring sm" style="display:none;" aria-hidden="true"></span>
        </button>
      </div>

    </form>
  </div>

<div class="sheet-backdrop" id="admin-edit-society-backdrop" onclick="GrihamAdminProfileUI.closeEditSocietySheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="admin-edit-society-sheet" role="dialog" aria-modal="true" aria-labelledby="edit-society-sheet-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button type="button" class="btn-sheet-back" onclick="GrihamAdminProfileUI.closeEditSocietySheet()" aria-label="Close edit society sheet" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h2 class="sheet-title" id="edit-society-sheet-title" data-i18n="edit_society_title">Edit Society Details</h2>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-admin-edit-society" onsubmit="GrihamAdminProfileUI.submitEditSociety(event)" class="profile-sheet-form">

      <!-- Form Error Banner -->
      <div id="edit-society-error" class="form-banner banner-error" style="display:none;" role="alert">
        <span id="edit-society-error-text"></span>
      </div>

      <!-- Society ID (Strictly Read-Only) -->
      <div class="form-group">
        <label class="form-label" for="edit-society-id" data-i18n="label_society_id">Society ID</label>
        <div class="input-wrapper readonly-input-wrap">
          <input type="text" id="edit-society-id" class="form-input form-input-readonly" disabled aria-label="Society ID (strictly read only)">
          <span class="input-readonly-lock-icon" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
        </div>
        <span class="field-helper-note" data-i18n="helper_society_id_lock">Society ID is the primary application identifier and cannot be modified.</span>
      </div>

      <!-- Society Name -->
      <div class="form-group" id="group-edit-society-name">
        <label class="form-label" for="edit-society-name">
          <span data-i18n="label_society_name">Society Name</span> <span class="required-star">*</span>
        </label>
        <div class="input-wrapper">
          <input type="text" id="edit-society-name" class="form-input" required placeholder="e.g. Griham Residency" aria-label="Society Name">
        </div>
        <span class="field-error-msg" id="edit-society-name-err"></span>
      </div>

      <!-- Address -->
      <div class="form-group" id="group-edit-society-address">
        <label class="form-label" for="edit-society-address">
          <span data-i18n="label_address">Address</span> <span class="required-star">*</span>
        </label>
        <div class="input-wrapper">
          <input type="text" id="edit-society-address" class="form-input" required placeholder="e.g. Baner" aria-label="Address">
        </div>
        <span class="field-error-msg" id="edit-society-address-err"></span>
      </div>

      <!-- City & State -->
      <div class="form-row-2col">
        <div class="form-group" id="group-edit-society-city">
          <label class="form-label" for="edit-society-city">
            <span data-i18n="label_city">City</span> <span class="required-star">*</span>
          </label>
          <div class="input-wrapper">
            <input type="text" id="edit-society-city" class="form-input" required placeholder="e.g. Pune" aria-label="City">
          </div>
          <span class="field-error-msg" id="edit-society-city-err"></span>
        </div>

        <div class="form-group" id="group-edit-society-state">
          <label class="form-label" for="edit-society-state">
            <span data-i18n="label_state">State</span> <span class="required-star">*</span>
          </label>
          <div class="input-wrapper">
            <input type="text" id="edit-society-state" class="form-input" required placeholder="e.g. Maharashtra" aria-label="State">
          </div>
          <span class="field-error-msg" id="edit-society-state-err"></span>
        </div>
      </div>

      <!-- Pincode -->
      <div class="form-group" id="group-edit-society-pincode">
        <label class="form-label" for="edit-society-pincode">
          <span data-i18n="label_pincode">Pincode</span> <span class="required-star">*</span>
        </label>
        <div class="input-wrapper">
          <input type="text" id="edit-society-pincode" class="form-input" required maxlength="6" pattern="[0-9]{6}" placeholder="e.g. 411045" aria-label="Pincode">
        </div>
        <span class="field-error-msg" id="edit-society-pincode-err"></span>
      </div>

      <!-- Context Info Display (Wings & Flats) -->
      <div class="society-form-meta-box">
        <div class="meta-box-item">
          <span class="meta-box-label" data-i18n="label_total_wings">Total Wings</span>
          <strong class="meta-box-val" id="edit-society-meta-wings">4</strong>
        </div>
        <div class="meta-box-item">
          <span class="meta-box-label" data-i18n="label_total_flats">Total Flats</span>
          <strong class="meta-box-val" id="edit-society-meta-flats">240</strong>
        </div>
      </div>

      <!-- Actions -->
      <div class="logout-btn-row" style="margin-top:0.4rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminProfileUI.closeEditSocietySheet()" data-i18n="btn_cancel">Cancel</button>
        <button type="submit" class="btn-primary-action btn-admin-style" id="btn-save-society" style="margin-top:0; min-height:46px;">
          <span id="btn-save-society-text" data-i18n="btn_save_society">Save Society Details</span>
          <span id="btn-save-society-spinner" class="spinner-ring sm" style="display:none;" aria-hidden="true"></span>
        </button>
      </div>

    </form>
  </div>

<div class="sheet-backdrop" id="admin-change-password-backdrop" onclick="GrihamAdminProfileUI.closeChangePasswordSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="admin-change-password-sheet" role="dialog" aria-modal="true" aria-labelledby="change-password-sheet-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button type="button" class="btn-sheet-back" onclick="GrihamAdminProfileUI.closeChangePasswordSheet()" aria-label="Close change password sheet" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h2 class="sheet-title" id="change-password-sheet-title" data-i18n="btn_change_password">Change Password</h2>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-admin-change-password" onsubmit="GrihamAdminProfileUI.submitChangePassword(event)" class="profile-sheet-form">

      <!-- Form Error Banner -->
      <div id="change-password-error" class="form-banner banner-error" style="display:none;" role="alert">
        <span id="change-password-error-text"></span>
      </div>

      <!-- Current Password -->
      <div class="form-group" id="group-pwd-current">
        <label class="form-label" for="input-pwd-current">
          <span data-i18n="label_current_password">Current Password</span> <span class="required-star">*</span>
        </label>
        <div class="input-wrapper">
          <input type="password" id="input-pwd-current" class="form-input" required autocomplete="current-password" placeholder="Enter current password" aria-label="Current Password">
          <button type="button" class="btn-input-toggle-pwd" onclick="GrihamAdminProfileUI.togglePwdVisibility('input-pwd-current', this)" aria-label="Show password">
            <svg class="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg class="eye-off-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          </button>
        </div>
        <span class="field-error-msg" id="pwd-current-err"></span>
      </div>

      <!-- New Password -->
      <div class="form-group" id="group-pwd-new">
        <label class="form-label" for="input-pwd-new">
          <span data-i18n="label_new_password">New Password</span> <span class="required-star">*</span>
        </label>
        <div class="input-wrapper">
          <input type="password" id="input-pwd-new" class="form-input" required minlength="8" autocomplete="new-password" placeholder="At least 8 characters" aria-label="New Password">
          <button type="button" class="btn-input-toggle-pwd" onclick="GrihamAdminProfileUI.togglePwdVisibility('input-pwd-new', this)" aria-label="Show password">
            <svg class="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg class="eye-off-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          </button>
        </div>
        <span class="field-helper-note" data-i18n="helper_pwd_req">Use at least 8 characters.</span>
        <span class="field-error-msg" id="pwd-new-err"></span>
      </div>

      <!-- Confirm New Password -->
      <div class="form-group" id="group-pwd-confirm">
        <label class="form-label" for="input-pwd-confirm">
          <span data-i18n="label_confirm_password">Confirm Password</span> <span class="required-star">*</span>
        </label>
        <div class="input-wrapper">
          <input type="password" id="input-pwd-confirm" class="form-input" required minlength="8" autocomplete="new-password" placeholder="Re-enter new password" aria-label="Confirm New Password">
          <button type="button" class="btn-input-toggle-pwd" onclick="GrihamAdminProfileUI.togglePwdVisibility('input-pwd-confirm', this)" aria-label="Show password">
            <svg class="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg class="eye-off-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          </button>
        </div>
        <span class="field-error-msg" id="pwd-confirm-err"></span>
      </div>

      <!-- Actions -->
      <div class="logout-btn-row" style="margin-top:0.4rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminProfileUI.closeChangePasswordSheet()" data-i18n="btn_cancel">Cancel</button>
        <button type="submit" class="btn-primary-action btn-admin-style" id="btn-save-password" style="margin-top:0; min-height:46px;">
          <span id="btn-save-password-text" data-i18n="btn_change_password">Change Password</span>
          <span id="btn-save-password-spinner" class="spinner-ring sm" style="display:none;" aria-hidden="true"></span>
        </button>
      </div>

    </form>
  </div>

<div class="sheet-backdrop" id="admin-delete-account-backdrop" onclick="GrihamAdminProfileUI.closeDeleteAccountSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="admin-delete-account-sheet" role="dialog" aria-modal="true" aria-labelledby="delete-account-sheet-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <!-- STEP 1: Initial Warning -->
    <div id="delete-account-step-1" class="delete-account-step-box">
      <div class="delete-icon-pulse" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>

      <h2 class="logout-title" id="delete-account-sheet-title" data-i18n="delete_step1_title">Delete Admin Account?</h2>
      <p class="logout-message" data-i18n="delete_step1_msg">
        Deleting your account is permanent and cannot be undone. All administrator rights, permissions, and management privileges will be revoked.
      </p>

      <div class="delete-account-notice-pill">
        <span data-i18n="delete_notice_step1">Step 1 of 2: Security Verification</span>
      </div>

      <div class="logout-btn-row" style="margin-top:0.6rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminProfileUI.closeDeleteAccountSheet()" data-i18n="btn_cancel">Cancel</button>
        <button type="button" class="btn-primary-action btn-danger-action" id="btn-delete-step-1" onclick="GrihamAdminProfileUI.goToDeleteStep2()" style="margin-top:0; min-height:44px;">
          <span data-i18n="btn_continue">Continue</span>
        </button>
      </div>
    </div>

    <!-- STEP 2: Explicit Final Confirmation -->
    <div id="delete-account-step-2" class="delete-account-step-box" style="display:none;">
      <div class="delete-icon-pulse danger-step2" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.4">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>

      <h2 class="logout-title" data-i18n="delete_step2_title">This action is permanent. Continue?</h2>
      <p class="logout-message" data-i18n="delete_step2_msg">
        Please confirm that you want to delete your administrator account. This will request permanent deactivation from the Griham society database.
      </p>

      <div class="delete-account-notice-pill danger">
        <span data-i18n="delete_notice_step2">Final Step: Irreversible Action</span>
      </div>

      <div class="logout-btn-row" style="margin-top:0.6rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminProfileUI.goToDeleteStep1()" data-i18n="btn_back">Back</button>
        <button type="button" class="btn-primary-action btn-danger-action" id="btn-confirm-delete-account" onclick="GrihamAdminProfileUI.executeDeleteAccount()" style="margin-top:0; min-height:44px;">
          <span id="btn-delete-account-text" data-i18n="btn_confirm_delete">Confirm &amp; Delete Account</span>
          <span id="btn-delete-account-spinner" class="spinner-ring sm" style="display:none;" aria-hidden="true"></span>
        </button>
      </div>
    </div>

  </div>

<section id="screen-admin-profile" class="app-view admin-profile-view" aria-labelledby="admin-profile-header-title">

        <!-- Top Header -->
        <div class="screen-top-bar screen-top-bar-sticky">
          ${GrihamHeader.renderBackButton({
            target: '/admin/home',
            id: 'btn-admin-profile-back',
            ariaLabel: 'Back to Admin Dashboard'
          })}

          <h1 class="top-bar-screen-title" id="admin-profile-header-title" data-i18n="admin_profile_title">Admin Profile</h1>

          <button type="button" class="btn-top-filter" onclick="GrihamA11y.toggleSheet(true)" id="btn-admin-profile-a11y" aria-label="Accessibility" title="Accessibility">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="4" r="2"/>
              <path d="M12 6v6"/>
              <path d="m8 10 4-1 4 1"/>
              <path d="m9 20 3-8 3 8"/>
              <path d="M6 13h12"/>
            </svg>
          </button>
        </div>

        <!-- Scrollable Profile Content Wrapper -->
        <div class="admin-profile-scroll">

          <!-- Loading State -->
          <div id="admin-profile-loading" class="profile-state-card" style="display:flex;" aria-live="polite">
            <div class="spinner-ring" aria-hidden="true"></div>
            <p class="profile-state-text" data-i18n="admin_profile_loading">Loading profile and society settings...</p>
          </div>

          <!-- Error State -->
          <div id="admin-profile-error" class="profile-state-card profile-error-state" style="display:none;" role="alert" aria-live="assertive">
            <div class="state-icon-wrap icon-error" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h2 class="state-title" data-i18n="admin_profile_error_title">Unable to Load Profile</h2>
            <p class="state-desc" id="admin-profile-error-msg" data-i18n="admin_profile_error_desc">Could not connect to society server. Please check your network.</p>
            <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminProfileUI.loadData()" style="width:auto; min-height:40px; padding:0 1.5rem; margin-top:0.5rem;">
              <span data-i18n="btn_try_again">Try Again</span>
            </button>
          </div>

          <!-- Loaded Content -->
          <div id="admin-profile-content" class="admin-profile-main" style="display:none;">

            <!-- ========================================================= -->
            <!-- 1. ADMIN PROFILE CARD                                     -->
            <!-- ========================================================= -->
            <article class="profile-hero-card" aria-labelledby="profile-display-name">
              <div class="profile-hero-top">
                <div class="profile-avatar-wrap">
                  <div class="profile-avatar-circle" id="profile-avatar-display" aria-label="Admin Profile Avatar">
                    <span id="profile-avatar-initials">RK</span>
                  </div>
                </div>
                <div class="profile-hero-info">
                  <div class="profile-role-pill">
                    <span class="role-badge-admin" data-i18n="role_admin_title">Admin</span>
                    <span class="verified-dot" title="Verified Administrator"></span>
                  </div>
                  <h2 class="profile-name" id="profile-display-name">Rajesh Kumar</h2>
                  <div class="profile-meta-row">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span id="profile-display-phone">+91 9876543210</span>
                  </div>
                  <div class="profile-meta-row">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <span id="profile-display-email">admin@example.com</span>
                  </div>
                </div>
              </div>

              <!-- Society Identifier Chip -->
              <div class="profile-society-pill-row">
                <span class="profile-society-label" data-i18n="label_society_id">Society ID</span>
                <span class="profile-society-code" id="profile-display-society-id">GRIHAM-PUNE-001</span>
              </div>

              <!-- Action: Edit Profile -->
              <button type="button" class="btn-primary-action btn-admin-style" id="btn-open-edit-profile" onclick="GrihamAdminProfileUI.openEditProfileSheet()" aria-label="Edit personal profile">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                <span data-i18n="btn_edit_profile">Edit Profile</span>
              </button>
            </article>

            <!-- ========================================================= -->
            <!-- 2. SOCIETY INFORMATION SECTION                            -->
            <!-- ========================================================= -->
            <section class="profile-section-card" aria-labelledby="society-section-heading">
              <div class="profile-section-header">
                <div>
                  <h2 class="profile-section-title" id="society-section-heading" data-i18n="sec_society_info">Society Information</h2>
                  <p class="profile-section-sub" data-i18n="sec_society_info_sub">Authorized residential society premises</p>
                </div>
                <button type="button" class="btn-section-header-action" id="btn-open-edit-society" onclick="GrihamAdminProfileUI.openEditSocietySheet()" aria-label="Edit society details">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  <span data-i18n="btn_edit_society">Edit Details</span>
                </button>
              </div>

              <!-- Society Key-Value Rows -->
              <div class="society-info-list">
                <div class="society-info-row">
                  <span class="info-row-label" data-i18n="label_society_name">Society Name</span>
                  <strong class="info-row-value" id="society-display-name">Griham Residency</strong>
                </div>

                <div class="society-info-row">
                  <span class="info-row-label" data-i18n="label_society_id">Society ID</span>
                  <div class="readonly-badge-wrap">
                    <strong class="info-row-value readonly-code" id="society-display-id">GRIHAM-PUNE-001</strong>
                    <span class="readonly-tag" title="System identifier cannot be modified">Read-only</span>
                  </div>
                </div>

                <div class="society-info-row">
                  <span class="info-row-label" data-i18n="label_address">Address</span>
                  <span class="info-row-value" id="society-display-address">Baner</span>
                </div>

                <div class="society-info-row">
                  <span class="info-row-label" data-i18n="label_city">City</span>
                  <span class="info-row-value" id="society-display-city">Pune</span>
                </div>

                <div class="society-info-row">
                  <span class="info-row-label" data-i18n="label_state">State</span>
                  <span class="info-row-value" id="society-display-state">Maharashtra</span>
                </div>

                <div class="society-info-row">
                  <span class="info-row-label" data-i18n="label_pincode">Pincode</span>
                  <span class="info-row-value" id="society-display-pincode">411045</span>
                </div>

                <div class="society-info-metrics-grid">
                  <div class="society-metric-box">
                    <span class="metric-box-label" data-i18n="label_total_wings">Total Wings</span>
                    <strong class="metric-box-val" id="society-display-wings">4</strong>
                  </div>
                  <div class="society-metric-box">
                    <span class="metric-box-label" data-i18n="label_total_flats">Total Flats</span>
                    <strong class="metric-box-val" id="society-display-flats">240</strong>
                  </div>
                </div>

                <div class="society-info-row">
                  <span class="info-row-label" data-i18n="label_admin_name">Admin Name</span>
                  <span class="info-row-value" id="society-display-admin-name">Rajesh Kumar</span>
                </div>
              </div>
            </section>

            <!-- ========================================================= -->
            <!-- 3. SECURITY SECTION                                       -->
            <!-- ========================================================= -->
            <section class="profile-section-card" aria-labelledby="security-section-heading">
              <div class="profile-section-header">
                <div>
                  <h2 class="profile-section-title" id="security-section-heading" data-i18n="sec_security">Security</h2>
                  <p class="profile-section-sub" data-i18n="sec_security_sub">Password and credential protection</p>
                </div>
              </div>

              <div class="settings-action-list">
                <button type="button" class="settings-action-item" id="btn-open-change-password" onclick="GrihamAdminProfileUI.openChangePasswordSheet()" aria-label="Change administrator password">
                  <div class="action-item-icon-wrap" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <div class="action-item-text">
                    <strong class="action-item-title" data-i18n="btn_change_password">Change Password</strong>
                    <span class="action-item-desc" data-i18n="desc_change_password">Update your portal login password securely</span>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="action-item-chevron" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            </section>

            <!-- ========================================================= -->
            <!-- 4. PREFERENCES (LANGUAGE & ACCESSIBILITY)                 -->
            <!-- ========================================================= -->
            <section class="profile-section-card" aria-labelledby="preferences-section-heading">
              <div class="profile-section-header">
                <div>
                  <h2 class="profile-section-title" id="preferences-section-heading" data-i18n="sec_preferences">Preferences</h2>
                  <p class="profile-section-sub" data-i18n="sec_preferences_sub">Language and visual display controls</p>
                </div>
              </div>

              <div class="settings-action-list">
                <!-- Language Selector Item -->
                <div class="settings-action-item static-item">
                  <div class="action-item-icon-wrap icon-lang" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </div>
                  <div class="action-item-text">
                    <label for="profile-lang-select" class="action-item-title" data-i18n="label_language">Language</label>
                    <span class="action-item-desc" data-i18n="desc_language">Choose interface display language</span>
                  </div>
                  <div class="action-item-ctrl">
                    <select id="profile-lang-select" class="form-input profile-lang-dropdown" onchange="GrihamAdminProfileUI.handleLanguageChange(this.value)" aria-label="Select language">
                      <option value="en">English</option>
                      <option value="hi">हिंदी (Hindi)</option>
                      <option value="mr">मराठी (Marathi)</option>
                    </select>
                  </div>
                </div>

                <!-- Accessibility Panel Trigger -->
                <button type="button" class="settings-action-item" onclick="GrihamA11y.toggleSheet(true)" id="btn-profile-open-a11y" aria-label="Open accessibility settings sheet">
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
                    <strong class="action-item-title" data-i18n="btn_a11y_settings">Accessibility Settings</strong>
                    <span class="action-item-desc" data-i18n="desc_a11y_settings">Text scaling, spacing, high contrast &amp; motion</span>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="action-item-chevron" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            </section>

            <!-- ========================================================= -->
            <!-- 5. ACCOUNT ACTIONS (LOGOUT)                               -->
            <!-- ========================================================= -->
            <section class="profile-section-card" aria-labelledby="account-actions-heading">
              <h2 class="sr-only" id="account-actions-heading">Account Actions</h2>
              <button type="button" class="btn-profile-action-logout" id="btn-profile-logout" onclick="GrihamAdminProfileUI.openLogoutConfirm()" aria-label="Log out from Griham Admin Portal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span data-i18n="menu_logout">Logout</span>
              </button>
            </section>

            <!-- ========================================================= -->
            <!-- 6. DANGER ZONE (DELETE ACCOUNT)                           -->
            <!-- ========================================================= -->
            <section class="profile-danger-zone-card" aria-labelledby="danger-zone-heading">
              <div class="danger-zone-header">
                <div class="danger-icon-wrap" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div>
                  <h2 class="danger-zone-title" id="danger-zone-heading" data-i18n="sec_danger_zone">Danger Zone</h2>
                  <p class="danger-zone-desc" data-i18n="desc_danger_zone">Deleting your account is permanent and cannot be undone.</p>
                </div>
              </div>

              <button type="button" class="btn-danger-outline" id="btn-open-delete-account" onclick="GrihamAdminProfileUI.openDeleteAccountSheet()" aria-label="Delete admin account">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                <span data-i18n="btn_delete_account">Delete Account</span>
              </button>
            </section>

          </div>
        </div>

      </section>
`;
const GrihamAdminProfileUI = {
  data: {
    profile: null,
    society: null
  },
  isLoading: false,
  isSavingProfile: false,
  isSavingSociety: false,
  isSavingPassword: false,
  isDeleting: false,
  photoDraft: null,

  init() {
    this.syncLanguageControl();
    this.loadData();
  },

  syncLanguageControl() {
    const langSelect = document.getElementById("profile-lang-select");
    if (langSelect) {
      langSelect.value = GrihamState.language || "en";
    }
  },

  async loadData() {
    if (this.isLoading) return;
    this.isLoading = true;

    const loadingEl = document.getElementById("admin-profile-loading");
    const errorEl = document.getElementById("admin-profile-error");
    const contentEl = document.getElementById("admin-profile-content");

    if (loadingEl) loadingEl.style.display = "flex";
    if (errorEl) errorEl.style.display = "none";
    if (contentEl) contentEl.style.display = "none";

    try {
      // Concurrently fetch profile and society
      const [profileRes, societyRes] = await Promise.all([
        getAdminProfile(),
        getAdminSociety()
      ]);

      this.data.profile = (profileRes && profileRes.data) ? profileRes.data : profileRes;
      this.data.society = (societyRes && societyRes.data) ? societyRes.data : societyRes;

      this.renderProfile(this.data.profile);
      this.renderSociety(this.data.society);

      if (loadingEl) loadingEl.style.display = "none";
      if (contentEl) contentEl.style.display = "flex";
    } catch (err) {
      console.error("[Admin Profile] Failed to load data:", err);
      const errMsgEl = document.getElementById("admin-profile-error-msg");
      if (errMsgEl && err && err.message) {
        errMsgEl.textContent = err.message;
      }
      if (loadingEl) loadingEl.style.display = "none";
      if (errorEl) errorEl.style.display = "flex";
    } finally {
      this.isLoading = false;
    }
  },

  renderProfile(p) {
    if (!p) return;

    const nameEl = document.getElementById("profile-display-name");
    const phoneEl = document.getElementById("profile-display-phone");
    const emailEl = document.getElementById("profile-display-email");
    const socIdEl = document.getElementById("profile-display-society-id");
    const avatarEl = document.getElementById("profile-avatar-display");

    if (nameEl) nameEl.textContent = p.name || "Administrator";
    if (phoneEl) phoneEl.textContent = p.phone || "—";
    if (emailEl) emailEl.textContent = p.email || "No email registered";
    if (socIdEl) socIdEl.textContent = p.societyId || "GRIHAM-PUNE-001";

    const initials = GrihamFormat.initials(p.name, "AD");

    if (p.profilePhoto) {
      if (avatarEl) avatarEl.innerHTML = `<img src="${p.profilePhoto}" alt="${escapeHtml(p.name)}" />`;
    } else {
      if (avatarEl) avatarEl.innerHTML = `<span id="profile-avatar-initials">${initials}</span>`;
    }
  },

  renderSociety(s) {
    if (!s) return;

    const nameEl = document.getElementById("society-display-name");
    const idEl = document.getElementById("society-display-id");
    const addrEl = document.getElementById("society-display-address");
    const cityEl = document.getElementById("society-display-city");
    const stateEl = document.getElementById("society-display-state");
    const pinEl = document.getElementById("society-display-pincode");
    const wingsEl = document.getElementById("society-display-wings");
    const flatsEl = document.getElementById("society-display-flats");
    const adminEl = document.getElementById("society-display-admin-name");

    if (nameEl) nameEl.textContent = s.name || "—";
    if (idEl) idEl.textContent = s.societyId || "GRIHAM-PUNE-001";
    if (addrEl) addrEl.textContent = s.address || "—";
    if (cityEl) cityEl.textContent = s.city || "—";
    if (stateEl) stateEl.textContent = s.state || "—";
    if (pinEl) pinEl.textContent = s.pincode || "—";
    if (wingsEl) wingsEl.textContent = s.totalWings || "—";
    if (flatsEl) flatsEl.textContent = s.totalFlats || "—";
    if (adminEl) adminEl.textContent = s.adminName || (this.data.profile && this.data.profile.name) || "—";
  },

  // Edit Profile Sheet
  openEditProfileSheet() {
    const sheet = document.getElementById("admin-edit-profile-sheet");
    const backdrop = document.getElementById("admin-edit-profile-backdrop");
    const errorBanner = document.getElementById("edit-profile-error");

    if (errorBanner) errorBanner.style.display = "none";
    this.clearFieldErrors("edit-profile");

    const p = this.data.profile || {};
    const nameInput = document.getElementById("edit-profile-name");
    const phoneInput = document.getElementById("edit-profile-phone");
    const emailInput = document.getElementById("edit-profile-email");
    const socInput = document.getElementById("edit-profile-society-id");
    const previewEl = document.getElementById("edit-profile-photo-preview");
    const removeBtn = document.getElementById("btn-remove-profile-photo");

    if (nameInput) nameInput.value = p.name || "";
    if (phoneInput) phoneInput.value = p.phone || "";
    if (emailInput) emailInput.value = p.email || "";
    if (socInput) socInput.value = p.societyId || "GRIHAM-PUNE-001";

    this.photoDraft = null;
    const initials = GrihamFormat.initials(p.name, "AD");

    if (p.profilePhoto) {
      if (previewEl) previewEl.innerHTML = `<img src="${p.profilePhoto}" alt="Avatar preview" />`;
      if (removeBtn) removeBtn.style.display = "inline-block";
    } else {
      if (previewEl) previewEl.innerHTML = `<span id="edit-profile-photo-initials">${initials}</span>`;
      if (removeBtn) removeBtn.style.display = "none";
    }

    GrihamBottomSheet.open("admin-edit-profile-sheet", "admin-edit-profile-backdrop");
  },

  closeEditProfileSheet() {
    GrihamBottomSheet.close("admin-edit-profile-sheet", "admin-edit-profile-backdrop");
  },

  handlePhotoSelect(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      this.showToast("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      this.photoDraft = loadEvent.target.result;
      const previewEl = document.getElementById("edit-profile-photo-preview");
      const removeBtn = document.getElementById("btn-remove-profile-photo");
      if (previewEl) {
        previewEl.innerHTML = `<img src="${this.photoDraft}" alt="Preview" />`;
      }
      if (removeBtn) removeBtn.style.display = "inline-block";
    };
    reader.readAsDataURL(file);
  },

  removePhoto() {
    this.photoDraft = "";
    const fileInput = document.getElementById("edit-profile-photo-input");
    if (fileInput) fileInput.value = "";
    const previewEl = document.getElementById("edit-profile-photo-preview");
    const removeBtn = document.getElementById("btn-remove-profile-photo");
    const name = (document.getElementById("edit-profile-name")?.value || "Admin");
    const initials = GrihamFormat.initials(name, "AD");

    if (previewEl) previewEl.innerHTML = `<span id="edit-profile-photo-initials">${initials}</span>`;
    if (removeBtn) removeBtn.style.display = "none";
  },

  async submitEditProfile(e) {
    e.preventDefault();
    if (this.isSavingProfile) return;

    this.clearFieldErrors("edit-profile");
    const errorBanner = document.getElementById("edit-profile-error");
    const errorText = document.getElementById("edit-profile-error-text");
    if (errorBanner) errorBanner.style.display = "none";

    const name = (document.getElementById("edit-profile-name")?.value || "").trim();
    const phone = (document.getElementById("edit-profile-phone")?.value || "").trim();
    const email = (document.getElementById("edit-profile-email")?.value || "").trim();

    let hasErrors = false;

    if (!name) {
      this.setFieldError("edit-profile-name", "Full name is required");
      hasErrors = true;
    }

    const cleanPhone = GrihamValidation.normalizePhone(phone);
    if (!cleanPhone) {
      this.setFieldError("edit-profile-phone", "Phone number is required");
      hasErrors = true;
    } else if (!GrihamValidation.isValidPhone(cleanPhone)) {
      this.setFieldError("edit-profile-phone", "Please enter a valid 10-digit phone number");
      hasErrors = true;
    }

    if (email && !GrihamValidation.isValidEmail(email)) {
      this.setFieldError("edit-profile-email", "Please enter a valid email address");
      hasErrors = true;
    }

    if (hasErrors) return;

    this.isSavingProfile = true;
    const btn = document.getElementById("btn-save-profile");
    const btnText = document.getElementById("btn-save-profile-text");
    const btnSpinner = document.getElementById("btn-save-profile-spinner");

    if (btn) btn.disabled = true;
    if (btnSpinner) btnSpinner.style.display = "inline-block";
    if (btnText) btnText.style.opacity = "0.7";

    try {
      const payload = {
        name,
        phone: cleanPhone,
        email
      };
      if (this.photoDraft !== null) {
        payload.profilePhoto = this.photoDraft || null;
      }

      const res = await updateAdminProfile(payload);
      if (res && res.data) {
        this.data.profile = res.data;
      } else {
        this.data.profile = { ...this.data.profile, ...payload };
      }

      // Update society admin name display
      if (this.data.society) {
        this.data.society.adminName = this.data.profile.name;
        this.renderSociety(this.data.society);
      }

      this.renderProfile(this.data.profile);
      this.closeEditProfileSheet();
      this.showToast("Profile updated successfully");
    } catch (err) {
      console.error("[Admin Profile] Save failed:", err);
      if (errorBanner && errorText) {
        errorText.textContent = err.message || "Failed to update profile. Please try again.";
        errorBanner.style.display = "flex";
      }
    } finally {
      this.isSavingProfile = false;
      if (btn) btn.disabled = false;
      if (btnSpinner) btnSpinner.style.display = "none";
      if (btnText) btnText.style.opacity = "1";
    }
  },

  // Edit Society Sheet
  openEditSocietySheet() {
    const sheet = document.getElementById("admin-edit-society-sheet");
    const backdrop = document.getElementById("admin-edit-society-backdrop");
    const errorBanner = document.getElementById("edit-society-error");

    if (errorBanner) errorBanner.style.display = "none";
    this.clearFieldErrors("edit-society");

    const s = this.data.society || {};
    const idInput = document.getElementById("edit-society-id");
    const nameInput = document.getElementById("edit-society-name");
    const addrInput = document.getElementById("edit-society-address");
    const cityInput = document.getElementById("edit-society-city");
    const stateInput = document.getElementById("edit-society-state");
    const pinInput = document.getElementById("edit-society-pincode");
    const metaWings = document.getElementById("edit-society-meta-wings");
    const metaFlats = document.getElementById("edit-society-meta-flats");

    if (idInput) idInput.value = s.societyId || "GRIHAM-PUNE-001";
    if (nameInput) nameInput.value = s.name || "";
    if (addrInput) addrInput.value = s.address || "";
    if (cityInput) cityInput.value = s.city || "";
    if (stateInput) stateInput.value = s.state || "";
    if (pinInput) pinInput.value = s.pincode || "";
    if (metaWings) metaWings.textContent = s.totalWings || "4";
    if (metaFlats) metaFlats.textContent = s.totalFlats || "240";

    GrihamBottomSheet.open("admin-edit-society-sheet", "admin-edit-society-backdrop");
  },

  closeEditSocietySheet() {
    GrihamBottomSheet.close("admin-edit-society-sheet", "admin-edit-society-backdrop");
  },

  async submitEditSociety(e) {
    e.preventDefault();
    if (this.isSavingSociety) return;

    this.clearFieldErrors("edit-society");
    const errorBanner = document.getElementById("edit-society-error");
    const errorText = document.getElementById("edit-society-error-text");
    if (errorBanner) errorBanner.style.display = "none";

    const name = (document.getElementById("edit-society-name")?.value || "").trim();
    const address = (document.getElementById("edit-society-address")?.value || "").trim();
    const city = (document.getElementById("edit-society-city")?.value || "").trim();
    const state = (document.getElementById("edit-society-state")?.value || "").trim();
    const pincode = (document.getElementById("edit-society-pincode")?.value || "").trim();

    let hasErrors = false;

    if (!name) {
      this.setFieldError("edit-society-name", "Society name is required");
      hasErrors = true;
    }
    if (!address) {
      this.setFieldError("edit-society-address", "Address is required");
      hasErrors = true;
    }
    if (!city) {
      this.setFieldError("edit-society-city", "City is required");
      hasErrors = true;
    }
    if (!state) {
      this.setFieldError("edit-society-state", "State is required");
      hasErrors = true;
    }
    if (!pincode || !/^[0-9]{6}$/.test(pincode)) {
      this.setFieldError("edit-society-pincode", "Please enter a valid 6-digit pincode");
      hasErrors = true;
    }

    if (hasErrors) return;

    this.isSavingSociety = true;
    const btn = document.getElementById("btn-save-society");
    const btnText = document.getElementById("btn-save-society-text");
    const btnSpinner = document.getElementById("btn-save-society-spinner");

    if (btn) btn.disabled = true;
    if (btnSpinner) btnSpinner.style.display = "inline-block";
    if (btnText) btnText.style.opacity = "0.7";

    try {
      const payload = {
        name,
        address,
        city,
        state,
        pincode
      };

      const res = await updateAdminSociety(payload);
      if (res && res.data) {
        this.data.society = res.data;
      } else {
        this.data.society = { ...this.data.society, ...payload };
      }

      this.renderSociety(this.data.society);
      this.closeEditSocietySheet();
      this.showToast("Society details updated successfully");
    } catch (err) {
      console.error("[Admin Society] Save failed:", err);
      if (errorBanner && errorText) {
        errorText.textContent = err.message || "Failed to update society details. Please try again.";
        errorBanner.style.display = "flex";
      }
    } finally {
      this.isSavingSociety = false;
      if (btn) btn.disabled = false;
      if (btnSpinner) btnSpinner.style.display = "none";
      if (btnText) btnText.style.opacity = "1";
    }
  },

  // Change Password Sheet
  openChangePasswordSheet() {
    const sheet = document.getElementById("admin-change-password-sheet");
    const backdrop = document.getElementById("admin-change-password-backdrop");
    const errorBanner = document.getElementById("change-password-error");

    if (errorBanner) errorBanner.style.display = "none";
    this.clearFieldErrors("pwd");

    const cur = document.getElementById("input-pwd-current");
    const np = document.getElementById("input-pwd-new");
    const cp = document.getElementById("input-pwd-confirm");
    if (cur) cur.value = "";
    if (np) np.value = "";
    if (cp) cp.value = "";

    GrihamBottomSheet.open("admin-change-password-sheet", "admin-change-password-backdrop");
  },

  closeChangePasswordSheet() {
    GrihamBottomSheet.close("admin-change-password-sheet", "admin-change-password-backdrop");
    const cur = document.getElementById("input-pwd-current");
    const np = document.getElementById("input-pwd-new");
    const cp = document.getElementById("input-pwd-confirm");
    if (cur) cur.value = "";
    if (np) np.value = "";
    if (cp) cp.value = "";
  },

  togglePwdVisibility(inputId, btnEl) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPwd = input.type === "password";
    input.type = isPwd ? "text" : "password";

    const eye = btnEl.querySelector(".eye-icon");
    const eyeOff = btnEl.querySelector(".eye-off-icon");
    if (eye) eye.style.display = isPwd ? "none" : "block";
    if (eyeOff) eyeOff.style.display = isPwd ? "block" : "none";
  },

  async submitChangePassword(e) {
    e.preventDefault();
    if (this.isSavingPassword) return;

    this.clearFieldErrors("pwd");
    const errorBanner = document.getElementById("change-password-error");
    const errorText = document.getElementById("change-password-error-text");
    if (errorBanner) errorBanner.style.display = "none";

    const current_password = document.getElementById("input-pwd-current")?.value || "";
    const new_password = document.getElementById("input-pwd-new")?.value || "";
    const confirm_password = document.getElementById("input-pwd-confirm")?.value || "";

    let hasErrors = false;

    if (!current_password) {
      this.setFieldError("pwd-current", "Current password is required");
      hasErrors = true;
    }

    if (!new_password || new_password.length < 8) {
      this.setFieldError("pwd-new", "New password must be at least 8 characters");
      hasErrors = true;
    }

    if (!confirm_password) {
      this.setFieldError("pwd-confirm", "Please confirm your new password");
      hasErrors = true;
    } else if (new_password !== confirm_password) {
      this.setFieldError("pwd-confirm", "New password and confirmation do not match");
      hasErrors = true;
    }

    if (hasErrors) return;

    this.isSavingPassword = true;
    const btn = document.getElementById("btn-save-password");
    const btnText = document.getElementById("btn-save-password-text");
    const btnSpinner = document.getElementById("btn-save-password-spinner");

    if (btn) btn.disabled = true;
    if (btnSpinner) btnSpinner.style.display = "inline-block";
    if (btnText) btnText.style.opacity = "0.7";

    try {
      await changeAdminPassword({
        current_password,
        new_password,
        confirm_password
      });

      // Clear password fields immediately (never store in memory or storage)
      const cur = document.getElementById("input-pwd-current");
      const np = document.getElementById("input-pwd-new");
      const cp = document.getElementById("input-pwd-confirm");
      if (cur) cur.value = "";
      if (np) np.value = "";
      if (cp) cp.value = "";

      this.closeChangePasswordSheet();
      this.showToast("Password changed successfully");
    } catch (err) {
      console.error("[Admin Password] Change failed:", err);
      if (errorBanner && errorText) {
        errorText.textContent = err.message || "Failed to update password. Please check your credentials.";
        errorBanner.style.display = "flex";
      }
    } finally {
      this.isSavingPassword = false;
      if (btn) btn.disabled = false;
      if (btnSpinner) btnSpinner.style.display = "none";
      if (btnText) btnText.style.opacity = "1";
    }
  },

  // Language change
  handleLanguageChange(lang) {
    if (typeof GrihamI18n !== "undefined") {
      GrihamI18n.setLanguage(lang);
      const globalSelect = document.getElementById("lang-select");
      if (globalSelect) globalSelect.value = lang;
      this.showToast(lang === "hi" ? "भाषा बदल दी गई" : lang === "mr" ? "भाषा अद्यतन केली" : "Language updated");
    }
  },

  // Logout
  openLogoutConfirm() {
    if (typeof GrihamAdminDashboardUI !== "undefined" && typeof GrihamAdminDashboardUI.openLogoutConfirm === "function") {
      GrihamAdminDashboardUI.openLogoutConfirm();
    } else {
      GrihamBottomSheet.open("logout-confirm-sheet", "logout-confirm-backdrop");
    }
  },

  // Delete Account (2-Step)
  openDeleteAccountSheet() {
    const sheet = document.getElementById("admin-delete-account-sheet");
    const backdrop = document.getElementById("admin-delete-account-backdrop");
    this.goToDeleteStep1();

    GrihamBottomSheet.open("admin-delete-account-sheet", "admin-delete-account-backdrop");
  },

  closeDeleteAccountSheet() {
    GrihamBottomSheet.close("admin-delete-account-sheet", "admin-delete-account-backdrop");
    this.goToDeleteStep1();
  },

  goToDeleteStep1() {
    const s1 = document.getElementById("delete-account-step-1");
    const s2 = document.getElementById("delete-account-step-2");
    if (s1) s1.style.display = "flex";
    if (s2) s2.style.display = "none";
  },

  goToDeleteStep2() {
    const s1 = document.getElementById("delete-account-step-1");
    const s2 = document.getElementById("delete-account-step-2");
    if (s1) s1.style.display = "none";
    if (s2) s2.style.display = "flex";
  },

  async executeDeleteAccount() {
    if (this.isDeleting) return;
    this.isDeleting = true;

    const btn = document.getElementById("btn-confirm-delete-account");
    const btnText = document.getElementById("btn-delete-account-text");
    const btnSpinner = document.getElementById("btn-delete-account-spinner");

    if (btn) btn.disabled = true;
    if (btnSpinner) btnSpinner.style.display = "inline-block";
    if (btnText) btnText.style.opacity = "0.7";

    try {
      await deleteAdminAccount();
      this.closeDeleteAccountSheet();
      this.showToast("Account scheduled for deactivation.");

      // Clear authentication state and sensitive data via canonical auth module
      if (typeof GrihamAuth !== "undefined") {
        GrihamAuth.clearSession();
      }

      // Redirect to entry login
      setTimeout(() => {
        if (typeof GrihamAuth !== "undefined" && typeof GrihamAuth.logout === "function") {
          GrihamAuth.logout('/entry');
        } else {
          GrihamRouter.navigate('/entry');
        }
      }, 750);
    } catch (err) {
      console.error("[Admin Account Delete] Failed:", err);
      this.showToast(err.message || "Failed to submit deletion request.");
    } finally {
      this.isDeleting = false;
      if (btn) btn.disabled = false;
      if (btnSpinner) btnSpinner.style.display = "none";
      if (btnText) btnText.style.opacity = "1";
    }
  },

  // Field error helpers
  setFieldError(fieldId, msg) {
    const errEl = document.getElementById(`${fieldId}-err`);
    if (errEl) {
      errEl.textContent = msg;
      errEl.style.display = "block";
    }
  },

  clearFieldErrors(prefix) {
    document.querySelectorAll(`[id^="${prefix}"][id$="-err"]`).forEach(el => {
      el.textContent = "";
      el.style.display = "none";
    });
  },

  // Close all sheets
  closeAllSheets() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.closeAll();
    }
  },

  showToast(msg, type = "info") {
    if (typeof GrihamToast !== "undefined") {
      GrihamToast.show(msg, type);
    }
  }
};
