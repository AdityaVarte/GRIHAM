
/* HTML TEMPLATE EXTRACTED FROM index.html */
window.HTML_ADMINLOGIN = `
<section id="screen-admin-login" class="app-view" aria-labelledby="admin-login-title">
        
        <!-- Top Navigation Bar with Back Button -->
        <div class="screen-top-bar">
          ${GrihamHeader.renderBackButton({
            onClick: 'GrihamRouter.goBack()',
            id: 'btn-admin-login-back',
            ariaLabel: 'Back'
          })}
          <span class="top-bar-brand-badge" style="border-color:var(--admin-border); color:var(--admin-accent);">Admin Portal</span>
        </div>

        <!-- Brand & Login Title Header -->
        <header class="brand-hero">
          <div class="brand-logo-pill icon-admin" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <h1 class="brand-hero-title" id="admin-login-title" data-i18n="admin_login_title">Admin Login</h1>
          <p class="brand-hero-tagline" data-i18n="admin_login_subtitle">Manage your society with ease.</p>
        </header>

        <!-- Admin Login Form Card -->
        <div class="auth-glass-card">
          
          <!-- Auth Feedback Status Banner -->
          <div id="admin-login-status-banner" class="auth-status-banner" role="alert" aria-live="assertive">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:1px;">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span id="admin-login-status-text">Unable to log in. Please check your details and try again.</span>
          </div>

          <form id="form-admin-login" onsubmit="GrihamAdminAuthUI.handleAdminLogin(event)" novalidate>
            
            <!-- 1. Society ID Input Field -->
            <div class="form-group">
              <label class="form-label" for="admin-input-society-id" data-i18n="label_society_id">Society ID</label>
              <div class="input-wrapper" id="wrap-admin-society-id">
                <input 
                  type="text" 
                  id="admin-input-society-id" 
                  name="society_id"
                  class="form-input" 
                  placeholder="Enter Society ID" 
                  autocomplete="organization"
                  autocapitalize="characters"
                  spellcheck="false"
                  aria-describedby="admin-society-id-helper admin-society-id-error"
                  required
                >
              </div>
              <p class="form-helper" id="admin-society-id-helper" data-i18n="helper_society_id">Enter the Society ID provided by your society.</p>
              <p class="form-error-msg" id="admin-society-id-error">Please enter your Society ID</p>
            </div>

            <!-- 2. Phone Number Input Field -->
            <div class="form-group">
              <label class="form-label" for="admin-input-phone" data-i18n="label_phone">Phone Number</label>
              <div class="input-wrapper" id="wrap-admin-phone">
                <input 
                  type="tel" 
                  id="admin-input-phone" 
                  name="phone"
                  class="form-input" 
                  placeholder="Enter phone number" 
                  inputmode="numeric"
                  autocomplete="tel"
                  maxlength="15"
                  aria-describedby="admin-phone-error"
                  required
                >
              </div>
              <p class="form-error-msg" id="admin-phone-error">Please enter a valid phone number</p>
            </div>

            <!-- 3. Password Input Field with Show/Hide -->
            <div class="form-group">
              <label class="form-label" for="admin-input-password" data-i18n="label_password">Password</label>
              <div class="input-wrapper" id="wrap-admin-password">
                <input 
                  type="password" 
                  id="admin-input-password" 
                  name="password"
                  class="form-input" 
                  placeholder="Enter password" 
                  autocomplete="current-password"
                  aria-describedby="admin-password-error"
                  required
                >
                <button 
                  type="button" 
                  class="btn-toggle-password" 
                  id="btn-admin-toggle-pwd" 
                  onclick="GrihamAuthUI.togglePasswordVisibility('admin-input-password', 'icon-admin-pwd-eye', 'icon-admin-pwd-eye-off', this)" 
                  aria-label="Show password"
                  title="Toggle password visibility"
                >
                  <svg id="icon-admin-pwd-eye" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg id="icon-admin-pwd-eye-off" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="23" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <p class="form-error-msg" id="admin-password-error">Please enter your password</p>
            </div>

            <!-- Login Primary Action Button -->
            <button type="submit" class="btn-primary-action btn-admin-primary" id="btn-admin-submit-login" aria-label="Login as Admin">
              <span id="btn-admin-login-spinner" class="spinner-icon" style="display:none;" aria-hidden="true"></span>
              <span id="btn-admin-login-text" data-i18n="btn_login">Login</span>
            </button>

          </form>

        </div>

        <!-- Secondary Auth Links -->
        <div class="auth-links-col">
          <a href="#/auth/forgot-password" class="link-auth-secondary" id="link-admin-forgot-password" data-i18n="link_forgot_pwd">Forgot Password?</a>
        </div>

        <!-- Informational Notice Section -->
        <div class="admin-info-card">
          <svg class="admin-info-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <div class="admin-info-text" data-i18n="admin_notice_text">
            Admin access is available only to approved society administrators.
          </div>
        </div>

      </section>
`;
const GrihamAdminAuthUI = {
  isLoading: false,

  setFieldState(fieldKey, isValid, errorMessage = "") {
    const wrap = document.getElementById(`wrap-admin-${fieldKey}`);
    const errEl = document.getElementById(`admin-${fieldKey}-error`);

    if (wrap) {
      wrap.classList.toggle("field-error", !isValid);
    }
    if (errEl) {
      errEl.classList.toggle("visible", !isValid);
      if (errorMessage) errEl.textContent = errorMessage;
    }
  },

  showBanner(type, message) {
    const banner = document.getElementById("admin-login-status-banner");
    const text = document.getElementById("admin-login-status-text");
    if (!banner || !text) return;

    banner.className = `auth-status-banner ${type}`;
    banner.style.display = "flex";
    text.textContent = message;
  },

  hideBanner() {
    const banner = document.getElementById("admin-login-status-banner");
    if (banner) {
      banner.className = "auth-status-banner";
      banner.style.display = "none";
    }
  },

  resetForm() {
    this.hideBanner();
    ["society-id", "phone", "password"].forEach(key => this.setFieldState(key, true));

    const btnText = document.getElementById("btn-admin-login-text");
    const btnSpinner = document.getElementById("btn-admin-login-spinner");
    const btn = document.getElementById("btn-admin-submit-login");

    if (btnText) {
      btnText.textContent = I18N_DICTIONARY[GrihamState.language]?.btn_login || "Login";
      btnText.style.display = "inline";
    }
    if (btnSpinner) btnSpinner.style.display = "none";
    if (btn) btn.disabled = false;
    this.isLoading = false;
  },

  async handleAdminLogin(e) {
    e.preventDefault();
    if (this.isLoading) return;

    this.hideBanner();

    const societyIdInput = document.getElementById("admin-input-society-id");
    const phoneInput = document.getElementById("admin-input-phone");
    const passwordInput = document.getElementById("admin-input-password");

    const societyId = societyIdInput ? societyIdInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";

    let hasErrors = false;

    if (!societyId) {
      this.setFieldState("society-id", false, "Please enter your Society ID.");
      hasErrors = true;
    } else if (societyId.length < 3) {
      this.setFieldState("society-id", false, "Please enter a valid Society ID.");
      hasErrors = true;
    } else {
      this.setFieldState("society-id", true);
    }

    const cleanPhone = GrihamValidation.normalizePhone(phone);
    if (!cleanPhone) {
      this.setFieldState("phone", false, "Please enter your phone number.");
      hasErrors = true;
    } else if (!GrihamValidation.isValidPhone(cleanPhone)) {
      this.setFieldState("phone", false, "Please enter a valid phone number.");
      hasErrors = true;
    } else {
      this.setFieldState("phone", true);
    }

    if (!password) {
      this.setFieldState("password", false, "Please enter your password.");
      hasErrors = true;
    } else {
      this.setFieldState("password", true);
    }

    if (hasErrors) return;

    this.isLoading = true;
    const btn = document.getElementById("btn-admin-submit-login");
    const btnText = document.getElementById("btn-admin-login-text");
    const btnSpinner = document.getElementById("btn-admin-login-spinner");

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Logging in...";
    if (btnSpinner) btnSpinner.style.display = "inline-block";

    try {
      const response = await loginAdmin({
        society_id: societyId,
        phone: cleanPhone,
        password: password
      });

      if (response && response.access_token) {
        GrihamAuth.setSession(response.access_token, response.user, societyId);
        GrihamRouter.navigate('/admin/home');
      } else {
        const errorMsg = (response && response.message) || "Unable to log in. Please check your credentials.";
        this.showBanner("error", errorMsg);
      }
    } catch (err) {
      const errorMsg = (err && err.status === 400)
        ? "Invalid Society ID, phone number, or password."
        : "Something went wrong. Please try again.";
      this.showBanner("error", errorMsg);
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = I18N_DICTIONARY[GrihamState.language]?.btn_login || "Login";
      if (btnSpinner) btnSpinner.style.display = "none";
      this.isLoading = false;
    }
  }
};
