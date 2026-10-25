
/* HTML TEMPLATE EXTRACTED FROM index.html */
window.HTML_LOGIN = `
<section id="screen-entry" class="app-view active" aria-labelledby="brand-title">
        
        <!-- Hero Header -->
        <header class="brand-hero">
          <div class="brand-logo-pill" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 21h18"/>
              <path d="M5 21V7l8-4v18"/>
              <path d="M19 21V11l-6-3"/>
              <path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M9 18v.01"/>
            </svg>
          </div>
          <h1 class="brand-hero-title" id="brand-title">Griham</h1>
          <p class="brand-hero-tagline" data-i18n="tagline">"Your Society, Connected."</p>
        </header>

        <!-- Vertically Stacked Role Cards (Mobile-First) -->
        <div class="role-card-stack" role="region" aria-label="Select your role to log in">
          
          <!-- Role 1: Resident -->
          <article class="mobile-role-card" data-role="resident" id="card-resident">
            <div class="card-header-row">
              <div class="card-role-icon icon-resident" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div class="card-text-col">
                <h2 class="card-role-title" data-i18n="role_resident_title">Resident</h2>
                <p class="card-role-desc" data-i18n="role_resident_desc">
                  Manage your home, maintenance, complaints and society services.
                </p>
              </div>
            </div>
            <button class="btn-mobile-role btn-resident-style" onclick="GrihamRouter.navigate('/resident/login')" id="btn-resident-login" aria-label="Navigate to Resident Login">
              <span data-i18n="btn_resident_login">Resident Login</span>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </button>
          </article>

          <!-- Role 2: Admin -->
          <article class="mobile-role-card" data-role="admin" id="card-admin">
            <div class="card-header-row">
              <div class="card-role-icon icon-admin" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <div class="card-text-col">
                <h2 class="card-role-title" data-i18n="role_admin_title">Admin</h2>
                <p class="card-role-desc" data-i18n="role_admin_desc">
                  Manage society operations, residents, workers, amenities and notifications.
                </p>
              </div>
            </div>
            <button class="btn-mobile-role btn-admin-style" onclick="GrihamRouter.navigate('/admin/login')" id="btn-admin-login" aria-label="Navigate to Admin Login">
              <span data-i18n="btn_admin_login">Admin Login</span>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </button>
          </article>

          <!-- Role 3: Gatekeeper -->
          <article class="mobile-role-card" data-role="gatekeeper" id="card-gatekeeper">
            <div class="card-header-row">
              <div class="card-role-icon icon-gatekeeper" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  <circle cx="12" cy="16" r="1"/>
                </svg>
              </div>
              <div class="card-text-col">
                <h2 class="card-role-title" data-i18n="role_gatekeeper_title">Gatekeeper</h2>
                <p class="card-role-desc" data-i18n="role_gatekeeper_desc">
                  Manage worker attendance and society security notifications.
                </p>
              </div>
            </div>
            <button class="btn-mobile-role btn-gatekeeper-style" onclick="GrihamRouter.navigate('/gatekeeper/login')" id="btn-gatekeeper-login" aria-label="Navigate to Gatekeeper Login">
              <span data-i18n="btn_gatekeeper_login">Gatekeeper Login</span>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </button>
          </article>

        </div>

        <!-- Resident Registration CTA -->
        <section class="registration-section">
          <button class="btn-resident-register" onclick="GrihamRouter.navigate('/resident/register')" id="btn-register-resident" aria-label="Navigate to Resident Registration">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <line x1="20" y1="8" x2="20" y2="14"/>
              <line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
            <span data-i18n="btn_register_resident">Register as Resident</span>
          </button>
        </section>

        <!-- Global Bottom Utility Controls -->
        <footer class="mobile-bottom-bar" role="contentinfo">
          
          <!-- Language Selector Pill -->
          <div class="lang-pill-selector" title="Change Language">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <select id="lang-select" aria-label="Select Language">
              <option value="en" selected>English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
            </select>
          </div>

          <!-- Universally Recognizable Accessibility Button -->
          <button id="btn-a11y-trigger" class="btn-icon-utility" aria-label="Accessibility" title="Accessibility">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="4" r="2"/>
              <path d="M12 6v6"/>
              <path d="m8 10 4-1 4 1"/>
              <path d="m9 20 3-8 3 8"/>
              <path d="M6 13h12"/>
            </svg>
            <span data-i18n="btn_a11y">Accessibility</span>
          </button>

          <!-- Light / Dark Mode Toggle Button (Silent Switch) -->
          <button id="btn-theme-toggle" class="btn-icon-utility circle-only" aria-label="Toggle Light/Dark Theme" title="Toggle Theme">
            <svg class="theme-icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <svg class="theme-icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>

        </footer>

      </section>

<section id="screen-resident-login" class="app-view" aria-labelledby="resident-login-title">
        
        <!-- Top Navigation Bar with Back Button -->
        ${GrihamHeader.render({
          badge: 'Griham Resident',
          onBack: 'GrihamRouter.goBack()',
          backId: 'btn-login-back',
          backAriaLabel: 'Back'
        })}

        <!-- Brand & Login Title Header -->
        <header class="brand-hero">
          <div class="brand-logo-pill icon-resident" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <h1 class="brand-hero-title" id="resident-login-title" data-i18n="login_title">Welcome Back</h1>
          <p class="brand-hero-tagline" data-i18n="login_subtitle">Login to your Griham society account</p>
        </header>

        <!-- Resident Login Form Card -->
        <div class="auth-glass-card">
          
          <!-- Auth Feedback Status Banner -->
          <div id="login-status-banner" class="auth-status-banner" role="alert" aria-live="assertive">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:1px;">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span id="login-status-text">Unable to log in. Please check your details and try again.</span>
          </div>

          <form id="form-resident-login" onsubmit="GrihamAuthUI.handleResidentLogin(event)" novalidate>
            
            <!-- 1. Society ID Input Field -->
            <div class="form-group">
              <label class="form-label" for="input-society-id" data-i18n="label_society_id">Society ID</label>
              <div class="input-wrapper" id="wrap-society-id">
                <input 
                  type="text" 
                  id="input-society-id" 
                  name="society_id"
                  class="form-input" 
                  placeholder="Enter Society ID" 
                  autocomplete="organization"
                  autocapitalize="characters"
                  spellcheck="false"
                  aria-describedby="society-id-helper society-id-error"
                  required
                >
              </div>
              <p class="form-helper" id="society-id-helper" data-i18n="helper_society_id">Enter the Society ID provided by your society.</p>
              <p class="form-error-msg" id="society-id-error">Please enter your Society ID</p>
            </div>

            <!-- 2. Phone Number Input Field -->
            <div class="form-group">
              <label class="form-label" for="input-phone" data-i18n="label_phone">Phone Number</label>
              <div class="input-wrapper" id="wrap-phone">
                <input 
                  type="tel" 
                  id="input-phone" 
                  name="phone"
                  class="form-input" 
                  placeholder="Enter phone number" 
                  inputmode="numeric"
                  autocomplete="tel"
                  maxlength="15"
                  aria-describedby="phone-error"
                  required
                >
              </div>
              <p class="form-error-msg" id="phone-error">Please enter a valid phone number</p>
            </div>

            <!-- 3. Password Input Field with Show/Hide -->
            <div class="form-group">
              <label class="form-label" for="input-password" data-i18n="label_password">Password</label>
              <div class="input-wrapper" id="wrap-password">
                <input 
                  type="password" 
                  id="input-password" 
                  name="password"
                  class="form-input" 
                  placeholder="Enter password" 
                  autocomplete="current-password"
                  aria-describedby="password-error"
                  required
                >
                <button 
                  type="button" 
                  class="btn-toggle-password" 
                  id="btn-toggle-pwd" 
                  onclick="GrihamAuthUI.togglePasswordVisibility('input-password', 'icon-pwd-eye', 'icon-pwd-eye-off', this)" 
                  aria-label="Show password"
                  title="Toggle password visibility"
                >
                  <svg id="icon-pwd-eye" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg id="icon-pwd-eye-off" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="23" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <p class="form-error-msg" id="password-error">Please enter your password</p>
            </div>

            <!-- Login Primary Action Button -->
            <button type="submit" class="btn-primary-action" id="btn-submit-login" aria-label="Login to Griham">
              <span id="btn-login-spinner" class="spinner-icon" style="display:none;" aria-hidden="true"></span>
              <span id="btn-login-text" data-i18n="btn_login">Login</span>
            </button>

          </form>

        </div>

        <!-- Secondary Auth Links -->
        <div class="auth-links-col">
          <a href="#/auth/forgot-password" class="link-auth-secondary" id="link-forgot-password" data-i18n="link_forgot_pwd">Forgot Password?</a>
          <a href="#/resident/register" class="link-register-subtle" id="link-register-subtle">
            <span data-i18n="link_register_text">New to Griham?</span> <strong data-i18n="link_register_bold">Register as Resident</strong>
          </a>
        </div>

      </section>
`;
const GrihamAuthUI = {
  isLoading: false,

  togglePasswordVisibility(inputId, eyeIconId, eyeOffIconId, btn) {
    if (typeof GrihamAuth !== "undefined" && typeof GrihamAuth.togglePasswordVisibility === "function") {
      return GrihamAuth.togglePasswordVisibility(inputId, eyeIconId, eyeOffIconId, btn);
    }
    const input = document.getElementById(inputId);
    const eyeIcon = document.getElementById(eyeIconId);
    const eyeOffIcon = document.getElementById(eyeOffIconId);

    if (!input) return;

    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";

    if (eyeIcon && eyeOffIcon) {
      eyeIcon.style.display = isPassword ? "none" : "block";
      eyeOffIcon.style.display = isPassword ? "block" : "none";
    }

    if (btn) {
      btn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
    }
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
    const banner = document.getElementById("login-status-banner");
    const text = document.getElementById("login-status-text");
    if (!banner || !text) return;

    banner.className = `auth-status-banner ${type}`;
    text.textContent = message;
  },

  hideBanner() {
    const banner = document.getElementById("login-status-banner");
    if (banner) {
      banner.className = "auth-status-banner";
      banner.style.display = "none";
    }
  },

  resetForm() {
    this.hideBanner();
    ["society-id", "phone", "password"].forEach(id => this.setFieldState(id, true));
    
    const btnText = document.getElementById("btn-login-text");
    const btnSpinner = document.getElementById("btn-login-spinner");
    const btn = document.getElementById("btn-submit-login");

    if (btnText) btnText.style.display = "inline";
    if (btnSpinner) btnSpinner.style.display = "none";
    if (btn) btn.disabled = false;
    this.isLoading = false;
  },

  async handleResidentLogin(e) {
    e.preventDefault();
    if (this.isLoading) return;

    this.hideBanner();

    const societyIdInput = document.getElementById("input-society-id");
    const phoneInput = document.getElementById("input-phone");
    const passwordInput = document.getElementById("input-password");

    const societyId = societyIdInput ? societyIdInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";

    // Frontend Validations
    let hasErrors = false;

    // Society ID Validation
    if (!societyId) {
      this.setFieldState("society-id", false, "Please enter your Society ID");
      hasErrors = true;
    } else {
      this.setFieldState("society-id", true);
    }

    // Phone Validation (10-14 digits)
    const cleanPhone = GrihamValidation.normalizePhone(phone);
    if (!cleanPhone) {
      this.setFieldState("phone", false, "Please enter your phone number");
      hasErrors = true;
    } else if (!GrihamValidation.isValidPhone(cleanPhone)) {
      this.setFieldState("phone", false, "Please enter a valid 10-digit phone number");
      hasErrors = true;
    } else {
      this.setFieldState("phone", true);
    }

    // Password Validation
    if (!password) {
      this.setFieldState("password", false, "Please enter your password");
      hasErrors = true;
    } else {
      this.setFieldState("password", true);
    }

    if (hasErrors) return;

    // Start Loading State
    this.isLoading = true;
    const btn = document.getElementById("btn-submit-login");
    const btnText = document.getElementById("btn-login-text");
    const btnSpinner = document.getElementById("btn-login-spinner");

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Logging in...";
    if (btnSpinner) btnSpinner.style.display = "inline-block";

    try {
      // Call centralized API layer
      const response = await loginResident({
        society_id: societyId,
        phone: cleanPhone,
        password: password
      });

      // Success State
      if (btnText) btnText.textContent = "Success";
      if (btnSpinner) btnSpinner.style.display = "none";
      
      this.showBanner("success", `Welcome back! Logged in to society: ${societyId}`);
      
      // Store session securely without password
      if (response.access_token) {
        GrihamAuth.setSession(response.access_token, response.user, societyId);
        setTimeout(() => {
          GrihamRouter.navigate('/resident/home');
        }, 350);
      }

    } catch (err) {
      this.showBanner("error", "Unable to log in. Please check your details and try again.");
      
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Login";
      if (btnSpinner) btnSpinner.style.display = "none";
      this.isLoading = false;
    }
  }
};
