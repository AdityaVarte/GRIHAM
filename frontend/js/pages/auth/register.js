
/* HTML TEMPLATE EXTRACTED FROM index.html */
window.HTML_REGISTER = `
<section id="screen-resident-register" class="app-view" aria-labelledby="resident-reg-title">
        
        <!-- Top Navigation Bar with Back Button -->
        ${GrihamHeader.render({
          badge: 'Join Society',
          onBack: 'GrihamRouter.goBack()',
          backId: 'btn-reg-back',
          backAriaLabel: 'Back'
        })}

        <!-- Brand & Registration Header -->
        <header class="brand-hero">
          <div class="brand-logo-pill icon-resident" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <line x1="20" y1="8" x2="20" y2="14"/>
              <line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
          </div>
          <h1 class="brand-hero-title" id="resident-reg-title" data-i18n="reg_title">Resident Registration</h1>
          <p class="brand-hero-tagline" data-i18n="reg_subtitle">Create your Griham society account</p>
        </header>

        <!-- Dynamic Content Area: Form OR Success Card -->
        <div class="auth-glass-card" id="reg-form-card">
          
          <!-- Registration Status Banner -->
          <div id="reg-status-banner" class="auth-status-banner" role="alert" aria-live="assertive">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:1px;">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span id="reg-status-text">Registration could not be completed. Please check your details and try again.</span>
          </div>

          <form id="form-resident-register" onsubmit="GrihamRegistrationUI.handleRegisterSubmit(event)" novalidate>
            
            <!-- SECTION 1: ACCOUNT -->
            <div class="form-section-title">
              <span data-i18n="sec_account">Account Information</span>
            </div>

            <!-- 1. Society ID -->
            <div class="form-group">
              <label class="form-label" for="reg-society-id" data-i18n="label_society_id">Society ID</label>
              <div class="input-wrapper" id="wrap-reg-society-id">
                <input 
                  type="text" 
                  id="reg-society-id" 
                  name="society_id"
                  class="form-input" 
                  placeholder="Enter Society ID" 
                  autocomplete="organization"
                  autocapitalize="characters"
                  spellcheck="false"
                  aria-describedby="reg-society-helper reg-society-error"
                  required
                >
              </div>
              <p class="form-helper" id="reg-society-helper" data-i18n="helper_society_id_reg">Use the Society ID provided by your society.</p>
              <p class="form-error-msg" id="reg-society-id-error">Please enter your Society ID</p>
            </div>

            <!-- 2. Full Name -->
            <div class="form-group">
              <label class="form-label" for="reg-fullname" data-i18n="label_fullname">Full Name</label>
              <div class="input-wrapper" id="wrap-reg-fullname">
                <input 
                  type="text" 
                  id="reg-fullname" 
                  name="fullname"
                  class="form-input" 
                  placeholder="Enter your full name" 
                  autocomplete="name"
                  aria-describedby="reg-fullname-error"
                  required
                >
              </div>
              <p class="form-error-msg" id="reg-fullname-error">Please enter your full name</p>
            </div>

            <!-- 3. Phone Number -->
            <div class="form-group">
              <label class="form-label" for="reg-phone" data-i18n="label_phone">Phone Number</label>
              <div class="input-wrapper" id="wrap-reg-phone">
                <input 
                  type="tel" 
                  id="reg-phone" 
                  name="phone"
                  class="form-input" 
                  placeholder="Enter phone number" 
                  inputmode="numeric"
                  autocomplete="tel"
                  maxlength="15"
                  aria-describedby="reg-phone-error"
                  required
                >
              </div>
              <p class="form-error-msg" id="reg-phone-error">Please enter a valid 10-digit phone number</p>
            </div>

            <!-- 4. Email (Optional) -->
            <div class="form-group">
              <div class="form-label-row">
                <label class="form-label" for="reg-email" data-i18n="label_email">Email</label>
                <span class="badge-optional" data-i18n="badge_optional">Optional</span>
              </div>
              <div class="input-wrapper" id="wrap-reg-email">
                <input 
                  type="email" 
                  id="reg-email" 
                  name="email"
                  class="form-input" 
                  placeholder="Enter email address" 
                  inputmode="email"
                  autocomplete="email"
                  aria-describedby="reg-email-error"
                >
              </div>
              <p class="form-error-msg" id="reg-email-error">Please enter a valid email address</p>
            </div>

            <!-- SECTION 2: SECURITY -->
            <div class="form-section-title">
              <span data-i18n="sec_security">Security</span>
            </div>

            <!-- 5. Password -->
            <div class="form-group">
              <label class="form-label" for="reg-password" data-i18n="label_password">Password</label>
              <div class="input-wrapper" id="wrap-reg-password">
                <input 
                  type="password" 
                  id="reg-password" 
                  name="password"
                  class="form-input" 
                  placeholder="Create a password" 
                  autocomplete="new-password"
                  aria-describedby="reg-password-error"
                  required
                >
                <button 
                  type="button" 
                  class="btn-toggle-password" 
                  onclick="GrihamAuthUI.togglePasswordVisibility('reg-password', 'icon-reg-eye1', 'icon-reg-eyeoff1', this)" 
                  aria-label="Show password"
                  title="Toggle password visibility"
                >
                  <svg id="icon-reg-eye1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg id="icon-reg-eyeoff1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="23" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <p class="form-error-msg" id="reg-password-error">Password must be at least 6 characters</p>
            </div>

            <!-- 6. Confirm Password -->
            <div class="form-group">
              <label class="form-label" for="reg-confirm-password" data-i18n="label_confirm_password">Confirm Password</label>
              <div class="input-wrapper" id="wrap-reg-confirm-password">
                <input 
                  type="password" 
                  id="reg-confirm-password" 
                  name="confirm_password"
                  class="form-input" 
                  placeholder="Re-enter your password" 
                  autocomplete="new-password"
                  aria-describedby="reg-confirm-error"
                  required
                >
                <button 
                  type="button" 
                  class="btn-toggle-password" 
                  onclick="GrihamAuthUI.togglePasswordVisibility('reg-confirm-password', 'icon-reg-eye2', 'icon-reg-eyeoff2', this)" 
                  aria-label="Show password"
                  title="Toggle password visibility"
                >
                  <svg id="icon-reg-eye2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg id="icon-reg-eyeoff2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="23" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <p class="form-error-msg" id="reg-confirm-password-error">Passwords do not match</p>
            </div>

            <!-- SECTION 3: HOME DETAILS -->
            <div class="form-section-title">
              <span data-i18n="sec_home">Home Details</span>
            </div>

            <!-- 7. Wing -->
            <div class="form-group">
              <label class="form-label" for="reg-wing" data-i18n="label_wing">Wing</label>
              <div class="input-wrapper" id="wrap-reg-wing">
                <input 
                  type="text" 
                  id="reg-wing" 
                  name="wing"
                  class="form-input" 
                  placeholder="Select or enter wing (e.g. Wing A)" 
                  autocomplete="off"
                  aria-describedby="reg-wing-error"
                  required
                >
              </div>
              <p class="form-error-msg" id="reg-wing-error">Please specify your wing</p>
            </div>

            <!-- 8 & 9. Flat Number & Floor Number in 2-Col -->
            <div class="form-row-2col">
              <!-- Flat Number -->
              <div class="form-group">
                <label class="form-label" for="reg-flat" data-i18n="label_flat">Flat Number</label>
                <div class="input-wrapper" id="wrap-reg-flat">
                  <input 
                    type="text" 
                    id="reg-flat" 
                    name="flat_number"
                    class="form-input" 
                    placeholder="Enter flat number" 
                    autocomplete="off"
                    aria-describedby="reg-flat-error"
                    required
                  >
                </div>
                <p class="form-error-msg" id="reg-flat-error">Enter flat number</p>
              </div>

              <!-- Floor Number -->
              <div class="form-group">
                <label class="form-label" for="reg-floor" data-i18n="label_floor">Floor Number</label>
                <div class="input-wrapper" id="wrap-reg-floor">
                  <input 
                    type="number" 
                    id="reg-floor" 
                    name="floor_number"
                    class="form-input" 
                    placeholder="Floor number" 
                    inputmode="numeric"
                    min="0"
                    max="100"
                    autocomplete="off"
                    aria-describedby="reg-floor-error"
                    required
                  >
                </div>
                <p class="form-error-msg" id="reg-floor-error">Enter floor number</p>
              </div>
            </div>

            <!-- 10. Occupancy Type -->
            <div class="form-group">
              <label class="form-label" data-i18n="label_occupancy">Occupancy Type</label>
              <div class="segmented-chip-group" role="radiogroup" aria-label="Occupancy Type">
                <button 
                  type="button" 
                  class="btn-occupancy-chip active" 
                  id="opt-occupancy-owner" 
                  data-value="owner" 
                  onclick="GrihamRegistrationUI.setOccupancy('owner')"
                  role="radio"
                  aria-checked="true"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  </svg>
                  <span data-i18n="opt_owner">Owner</span>
                </button>
                <button 
                  type="button" 
                  class="btn-occupancy-chip" 
                  id="opt-occupancy-tenant" 
                  data-value="tenant" 
                  onclick="GrihamRegistrationUI.setOccupancy('tenant')"
                  role="radio"
                  aria-checked="false"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span data-i18n="opt_tenant">Tenant</span>
                </button>
              </div>
            </div>

            <!-- SECTION 4: PROFILE PHOTO (Optional) -->
            <div class="form-section-title">
              <span data-i18n="sec_profile">Profile Photo</span>
            </div>

            <div class="form-group">
              <div class="form-label-row">
                <label class="form-label" data-i18n="label_profile_photo">Profile Photo</label>
                <span class="badge-optional" data-i18n="badge_optional">Optional</span>
              </div>
              <div class="photo-upload-container">
                <div class="photo-preview-avatar" id="photo-preview-box" aria-hidden="true">
                  <svg id="photo-default-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <img id="photo-preview-img" src="" alt="Profile Preview" style="display:none;">
                </div>
                <div class="photo-actions-col">
                  <input type="file" id="reg-photo-file" accept="image/*" style="display:none;" onchange="GrihamRegistrationUI.handlePhotoSelected(event)">
                  <button type="button" class="btn-upload-trigger" onclick="document.getElementById('reg-photo-file').click()" id="btn-photo-upload">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                    </svg>
                    <span id="btn-photo-text" data-i18n="btn_choose_photo">Upload Photo</span>
                  </button>
                  <button type="button" class="btn-photo-remove" id="btn-photo-remove" onclick="GrihamRegistrationUI.removePhoto()">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="6"/></svg>
                    <span data-i18n="btn_remove_photo">Remove photo</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Submit Registration Action Button -->
            <button type="submit" class="btn-primary-action" id="btn-submit-register" aria-label="Submit Registration">
              <span id="btn-reg-spinner" class="spinner-icon" style="display:none;" aria-hidden="true"></span>
              <span id="btn-reg-text" data-i18n="btn_submit_reg">Submit Registration</span>
            </button>

          </form>

        </div>

        <!-- Registration Success Confirmation Card -->
        <div class="auth-glass-card success-status-card" id="reg-success-view" style="display:none;">
          <div class="success-icon-shield" aria-hidden="true">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <h2 class="success-title" data-i18n="success_reg_title">Registration Submitted</h2>
          <p class="success-subtitle" data-i18n="success_reg_msg">Your registration request has been submitted for approval.</p>

          <div class="pending-approval-box">
            <strong data-i18n="pending_status_title">Status: Pending Chairman / Admin Approval</strong>
            <p data-i18n="pending_status_desc">Your account is currently under verification. Once your society committee approves your flat details, you will be able to log in to the Resident Portal.</p>
          </div>

          <button type="button" class="btn-primary-action" onclick="GrihamRouter.navigate('/resident/login')" id="btn-back-login" aria-label="Back to Login">
            <span data-i18n="btn_back_login">Back to Login</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Secondary Login Link at Bottom of Registration -->
        <div class="auth-links-col" id="reg-footer-links">
          <a href="#/resident/login" class="link-register-subtle">
            <span data-i18n="link_already_account">Already registered?</span> <strong data-i18n="link_login_bold">Resident Login</strong>
          </a>
        </div>

      </section>
`;
const GrihamRegistrationUI = {
  isLoading: false,
  occupancyType: "owner",
  profilePhotoData: null,

  setOccupancy(type) {
    this.occupancyType = type;
    const btnOwner = document.getElementById("opt-occupancy-owner");
    const btnTenant = document.getElementById("opt-occupancy-tenant");

    if (btnOwner && btnTenant) {
      btnOwner.classList.toggle("active", type === "owner");
      btnOwner.setAttribute("aria-checked", type === "owner" ? "true" : "false");
      btnTenant.classList.toggle("active", type === "tenant");
      btnTenant.setAttribute("aria-checked", type === "tenant" ? "true" : "false");
    }
  },

  handlePhotoSelected(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.profilePhotoData = e.target.result;
      const img = document.getElementById("photo-preview-img");
      const defaultIcon = document.getElementById("photo-default-icon");
      const btnText = document.getElementById("btn-photo-text");
      const removeBtn = document.getElementById("btn-photo-remove");

      if (img && defaultIcon) {
        img.src = this.profilePhotoData;
        img.style.display = "block";
        defaultIcon.style.display = "none";
      }
      if (btnText) btnText.textContent = "Change Photo";
      if (removeBtn) removeBtn.style.display = "inline-flex";
    };
    reader.readAsDataURL(file);
  },

  removePhoto() {
    this.profilePhotoData = null;
    const fileInput = document.getElementById("reg-photo-file");
    const img = document.getElementById("photo-preview-img");
    const defaultIcon = document.getElementById("photo-default-icon");
    const btnText = document.getElementById("btn-photo-text");
    const removeBtn = document.getElementById("btn-photo-remove");

    if (fileInput) fileInput.value = "";
    if (img) {
      img.src = "";
      img.style.display = "none";
    }
    if (defaultIcon) defaultIcon.style.display = "block";
    if (btnText) btnText.textContent = "Upload Photo";
    if (removeBtn) removeBtn.style.display = "none";
  },

  setFieldState(fieldId, isValid, errorMessage = "") {
    const wrap = document.getElementById(`wrap-${fieldId}`);
    const errEl = document.getElementById(`${fieldId}-error`);

    if (wrap) {
      wrap.classList.toggle("field-error", !isValid);
    }
    if (errEl) {
      errEl.classList.toggle("visible", !isValid);
      if (errorMessage) errEl.textContent = errorMessage;
    }
  },

  showBanner(type, message) {
    const banner = document.getElementById("reg-status-banner");
    const text = document.getElementById("reg-status-text");
    if (!banner || !text) return;

    banner.className = `auth-status-banner ${type}`;
    text.textContent = message;
  },

  hideBanner() {
    const banner = document.getElementById("reg-status-banner");
    if (banner) {
      banner.className = "auth-status-banner";
      banner.style.display = "none";
    }
  },

  resetForm() {
    this.hideBanner();
    const formCard = document.getElementById("reg-form-card");
    const successView = document.getElementById("reg-success-view");
    const footerLinks = document.getElementById("reg-footer-links");

    if (formCard) formCard.style.display = "block";
    if (successView) successView.style.display = "none";
    if (footerLinks) footerLinks.style.display = "flex";

    [
      "reg-society-id",
      "reg-fullname",
      "reg-phone",
      "reg-email",
      "reg-password",
      "reg-confirm-password",
      "reg-wing",
      "reg-flat",
      "reg-floor"
    ].forEach(id => this.setFieldState(id, true));

    const btnText = document.getElementById("btn-reg-text");
    const btnSpinner = document.getElementById("btn-reg-spinner");
    const btn = document.getElementById("btn-submit-register");

    if (btnText) btnText.textContent = "Submit Registration";
    if (btnSpinner) btnSpinner.style.display = "none";
    if (btn) btn.disabled = false;
    this.isLoading = false;
  },

  async handleRegisterSubmit(e) {
    e.preventDefault();
    if (this.isLoading) return;

    this.hideBanner();

    const societyId = (document.getElementById("reg-society-id")?.value || "").trim();
    const fullname = (document.getElementById("reg-fullname")?.value || "").trim();
    const phone = (document.getElementById("reg-phone")?.value || "").trim();
    const email = (document.getElementById("reg-email")?.value || "").trim();
    const password = document.getElementById("reg-password")?.value || "";
    const confirmPassword = document.getElementById("reg-confirm-password")?.value || "";
    const wing = (document.getElementById("reg-wing")?.value || "").trim();
    const flat = (document.getElementById("reg-flat")?.value || "").trim();
    const floor = (document.getElementById("reg-floor")?.value || "").trim();

    let hasErrors = false;
    let firstErrorElement = null;

    // 1. Society ID
    if (!societyId) {
      this.setFieldState("reg-society-id", false, "Please enter your Society ID");
      hasErrors = true;
      if (!firstErrorElement) firstErrorElement = document.getElementById("reg-society-id");
    } else {
      this.setFieldState("reg-society-id", true);
    }

    // 2. Full Name
    if (!fullname) {
      this.setFieldState("reg-fullname", false, "Please enter your full name");
      hasErrors = true;
      if (!firstErrorElement) firstErrorElement = document.getElementById("reg-fullname");
    } else {
      this.setFieldState("reg-fullname", true);
    }

    // 3. Phone Number
    const cleanPhone = GrihamValidation.normalizePhone(phone);
    if (!cleanPhone) {
      this.setFieldState("reg-phone", false, "Please enter your phone number");
      hasErrors = true;
      if (!firstErrorElement) firstErrorElement = document.getElementById("reg-phone");
    } else if (!GrihamValidation.isValidPhone(cleanPhone)) {
      this.setFieldState("reg-phone", false, "Please enter a valid 10-digit phone number");
      hasErrors = true;
      if (!firstErrorElement) firstErrorElement = document.getElementById("reg-phone");
    } else {
      this.setFieldState("reg-phone", true);
    }

    // 4. Email (Optional check)
    if (email) {
      if (!GrihamValidation.isValidEmail(email)) {
        this.setFieldState("reg-email", false, "Please enter a valid email address");
        hasErrors = true;
        if (!firstErrorElement) firstErrorElement = document.getElementById("reg-email");
      } else {
        this.setFieldState("reg-email", true);
      }
    } else {
      this.setFieldState("reg-email", true);
    }

    // 5. Password (min 6 chars)
    if (!password || password.length < 6) {
      this.setFieldState("reg-password", false, "Password must be at least 6 characters");
      hasErrors = true;
      if (!firstErrorElement) firstErrorElement = document.getElementById("reg-password");
    } else {
      this.setFieldState("reg-password", true);
    }

    // 6. Confirm Password
    if (!confirmPassword || confirmPassword !== password) {
      this.setFieldState("reg-confirm-password", false, "Passwords do not match");
      hasErrors = true;
      if (!firstErrorElement) firstErrorElement = document.getElementById("reg-confirm-password");
    } else {
      this.setFieldState("reg-confirm-password", true);
    }

    // 7. Wing
    if (!wing) {
      this.setFieldState("reg-wing", false, "Please enter your wing name or code");
      hasErrors = true;
      if (!firstErrorElement) firstErrorElement = document.getElementById("reg-wing");
    } else {
      this.setFieldState("reg-wing", true);
    }

    // 8. Flat Number
    if (!flat) {
      this.setFieldState("reg-flat", false, "Please enter your flat number");
      hasErrors = true;
      if (!firstErrorElement) firstErrorElement = document.getElementById("reg-flat");
    } else {
      this.setFieldState("reg-flat", true);
    }

    // 9. Floor Number
    if (!floor) {
      this.setFieldState("reg-floor", false, "Please enter your floor number");
      hasErrors = true;
      if (!firstErrorElement) firstErrorElement = document.getElementById("reg-floor");
    } else {
      this.setFieldState("reg-floor", true);
    }

    if (hasErrors) {
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErrorElement.focus();
      }
      return;
    }

    // Trigger loading state
    this.isLoading = true;
    const btn = document.getElementById("btn-submit-register");
    const btnText = document.getElementById("btn-reg-text");
    const btnSpinner = document.getElementById("btn-reg-spinner");

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Submitting...";
    if (btnSpinner) btnSpinner.style.display = "inline-block";

    try {
      await registerResident({
        society_id: societyId,
        name: fullname,
        phone: cleanPhone,
        email: email || null,
        password: password,
        wing_name: wing,
        flat_number: flat,
        floor_number: floor,
        occupancy_type: this.occupancyType,
        profile_photo: this.profilePhotoData ? "photo_data_uploaded" : null
      });

      const formCard = document.getElementById("reg-form-card");
      const successView = document.getElementById("reg-success-view");
      const footerLinks = document.getElementById("reg-footer-links");

      if (formCard) formCard.style.display = "none";
      if (successView) successView.style.display = "flex";
      if (footerLinks) footerLinks.style.display = "none";

      const appEl = document.getElementById("app");
      if (appEl) appEl.scrollTo({ top: 0, behavior: "smooth" });

    } catch (err) {
      this.showBanner("error", "Registration could not be completed. Please check your details and try again.");
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Submit Registration";
      if (btnSpinner) btnSpinner.style.display = "none";
      this.isLoading = false;
    }
  }
};
