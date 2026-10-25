/**
 * GRIHAM FRONTEND - GATEKEEPER LOGIN CONTROLLER & VIEW
 * Screen: Gatekeeper Security Station Login (#/gatekeeper/login)
 * Mobile-first Residential Society Management Platform
 */

/* HTML TEMPLATE EXTRACTED FOR DYNAMIC SCREEN INJECTION */
window.HTML_GATEKEEPERLOGIN = `
<section id="screen-gatekeeper-login" class="app-view" aria-labelledby="gatekeeper-login-title">
  
  <!-- Top Navigation Bar with Back Button -->
  <div class="screen-top-bar">
    ${GrihamHeader.renderBackButton({
      onClick: 'GrihamRouter.goBack()',
      id: 'btn-gatekeeper-login-back',
      ariaLabel: 'Back'
    })}
    <span class="top-bar-brand-badge" style="border-color:var(--gatekeeper-border); color:var(--gatekeeper-accent);">Gate Security</span>
  </div>

  <!-- Brand & Terminal Title Header -->
  <header class="brand-hero">
    <div class="brand-logo-pill icon-gatekeeper" aria-hidden="true">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        <circle cx="12" cy="16" r="1"/>
      </svg>
    </div>
    <h1 class="brand-hero-title" id="gatekeeper-login-title" data-i18n="gatekeeper_login_title">Gatekeeper Login</h1>
    <p class="brand-hero-tagline" data-i18n="gatekeeper_login_subtitle">Gate Security & Terminal Console</p>
  </header>

  <!-- Gatekeeper Login Form Card -->
  <div class="auth-glass-card">
    
    <!-- Auth Feedback Status Banner -->
    <div id="gatekeeper-login-status-banner" class="auth-status-banner" role="alert" aria-live="assertive" style="display:none;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:1px;">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span id="gatekeeper-login-status-text">Unable to log in. Please check your credentials.</span>
    </div>

    <form id="form-gatekeeper-login" onsubmit="GrihamGatekeeperAuthUI.handleGatekeeperLogin(event)" novalidate>
      
      <!-- 1. Society ID Input Field -->
      <div class="form-group">
        <label class="form-label" for="gatekeeper-input-society-id" data-i18n="label_society_id">Society ID</label>
        <div class="input-wrapper" id="wrap-gatekeeper-society-id">
          <input 
            type="text" 
            id="gatekeeper-input-society-id" 
            name="society_id"
            class="form-input" 
            placeholder="Enter Society ID" 
            autocomplete="organization"
            autocapitalize="characters"
            spellcheck="false"
            aria-describedby="gatekeeper-society-id-helper gatekeeper-society-id-error"
            required
          >
        </div>
        <p class="form-helper" id="gatekeeper-society-id-helper" data-i18n="helper_society_id">Enter the Society ID provided by your society.</p>
        <p class="form-error-msg" id="gatekeeper-society-id-error">Please enter your Society ID</p>
      </div>

      <!-- 2. Station PIN Input Field -->
      <div class="form-group">
        <label class="form-label" for="gatekeeper-input-pin" data-i18n="label_station_pin">Station PIN</label>
        <div class="input-wrapper" id="wrap-gatekeeper-pin">
          <input 
            type="password" 
            id="gatekeeper-input-pin" 
            name="station_pin"
            class="form-input" 
            placeholder="Enter 4-to-6 digit PIN" 
            inputmode="numeric"
            maxlength="6"
            autocomplete="current-password"
            aria-describedby="gatekeeper-pin-helper gatekeeper-pin-error"
            required
          >
          <button 
            type="button" 
            class="btn-toggle-password" 
            id="btn-gatekeeper-toggle-pin" 
            onclick="GrihamAuthUI.togglePasswordVisibility('gatekeeper-input-pin', 'icon-gk-pin-eye', 'icon-gk-pin-eye-off', this)" 
            aria-label="Show PIN"
            title="Toggle PIN visibility"
          >
            <svg id="icon-gk-pin-eye" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <svg id="icon-gk-pin-eye-off" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="23" x2="23" y2="23"/>
            </svg>
          </button>
        </div>
        <p class="form-helper" id="gatekeeper-pin-helper" data-i18n="helper_station_pin">Enter your 4-digit security station PIN.</p>
        <p class="form-error-msg" id="gatekeeper-pin-error">Please enter your Station PIN</p>
      </div>

      <!-- Login Primary Action Button -->
      <button type="submit" class="btn-primary-action btn-gatekeeper-style" id="btn-gatekeeper-submit-login" aria-label="Login as Gatekeeper">
        <span id="btn-gatekeeper-login-spinner" class="spinner-icon" style="display:none;" aria-hidden="true"></span>
        <span id="btn-gatekeeper-login-text" data-i18n="btn_login">Login</span>
      </button>

    </form>

  </div>

  <!-- Informational Notice Section -->
  <div class="admin-info-card" style="margin-top:1rem; border-color:var(--gatekeeper-border);">
    <svg class="admin-info-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color:var(--gatekeeper-accent);">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      <circle cx="12" cy="16" r="1"/>
    </svg>
    <div class="admin-info-text" data-i18n="gatekeeper_notice_text">
      Gatekeeper access is restricted to authorized society security personnel.
    </div>
  </div>

</section>
`;

const GrihamGatekeeperAuthUI = {
  isLoading: false,

  setFieldState(fieldKey, isValid, errorMessage = "") {
    const wrap = document.getElementById(`wrap-gatekeeper-${fieldKey}`);
    const errEl = document.getElementById(`gatekeeper-${fieldKey}-error`);

    if (wrap) {
      wrap.classList.toggle("field-error", !isValid);
    }
    if (errEl) {
      errEl.classList.toggle("visible", !isValid);
      if (errorMessage) errEl.textContent = errorMessage;
    }
  },

  showBanner(type, message) {
    const banner = document.getElementById("gatekeeper-login-status-banner");
    const text = document.getElementById("gatekeeper-login-status-text");
    if (!banner || !text) return;

    banner.className = `auth-status-banner ${type}`;
    banner.style.display = "flex";
    text.textContent = message;
  },

  hideBanner() {
    const banner = document.getElementById("gatekeeper-login-status-banner");
    if (banner) {
      banner.className = "auth-status-banner";
      banner.style.display = "none";
    }
  },

  resetForm() {
    this.hideBanner();
    ["society-id", "pin"].forEach(key => this.setFieldState(key, true));

    const btnText = document.getElementById("btn-gatekeeper-login-text");
    const btnSpinner = document.getElementById("btn-gatekeeper-login-spinner");
    const btn = document.getElementById("btn-gatekeeper-submit-login");

    if (btnText) {
      btnText.textContent = I18N_DICTIONARY[GrihamState.language]?.btn_login || "Login";
      btnText.style.display = "inline";
    }
    if (btnSpinner) btnSpinner.style.display = "none";
    if (btn) btn.disabled = false;
    this.isLoading = false;
  },

  async handleGatekeeperLogin(e) {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    if (this.isLoading) return;

    this.hideBanner();

    const societyIdInput = document.getElementById("gatekeeper-input-society-id");
    const pinInput = document.getElementById("gatekeeper-input-pin");

    const societyId = societyIdInput ? societyIdInput.value.trim() : "";
    const pin = pinInput ? pinInput.value.trim() : "";

    let hasErrors = false;

    // 1. Society ID validation
    if (!societyId) {
      this.setFieldState("society-id", false, "Please enter your Society ID.");
      hasErrors = true;
    } else if (societyId.length < 3) {
      this.setFieldState("society-id", false, "Please enter a valid Society ID.");
      hasErrors = true;
    } else {
      this.setFieldState("society-id", true);
    }

    // 2. Station PIN validation
    if (!pin) {
      this.setFieldState("pin", false, "Please enter your Station PIN.");
      hasErrors = true;
    } else if (!/^\d{4,6}$/.test(pin)) {
      this.setFieldState("pin", false, "Please enter a valid 4-to-6 digit Station PIN.");
      hasErrors = true;
    } else {
      this.setFieldState("pin", true);
    }

    if (hasErrors) return;

    this.isLoading = true;
    const btn = document.getElementById("btn-gatekeeper-submit-login");
    const btnText = document.getElementById("btn-gatekeeper-login-text");
    const btnSpinner = document.getElementById("btn-gatekeeper-login-spinner");

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Verifying Station...";
    if (btnSpinner) btnSpinner.style.display = "inline-block";

    try {
      const loginFn = typeof window.loginGatekeeper === "function" 
        ? window.loginGatekeeper 
        : (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.loginGatekeeper === "function" 
            ? GrihamAPI.loginGatekeeper 
            : null);

      if (!loginFn) {
        throw new Error("Gatekeeper login service is not available.");
      }

      const response = await loginFn({
        society_id: societyId,
        station_pin: pin
      });

      if (response && response.access_token) {
        GrihamAuth.setSession(response.access_token, response.user, societyId);
        GrihamRouter.navigate('/gatekeeper/home');
      } else {
        const errorMsg = (response && response.message) || "Unable to log in. Please check your credentials.";
        this.showBanner("error", errorMsg);
      }
    } catch (err) {
      const errorMsg = (err && (err.status === 401 || err.status === 400))
        ? (err.message || "Invalid Society ID or Station PIN.")
        : (err.message || "Something went wrong. Please try again.");
      this.showBanner("error", errorMsg);
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = I18N_DICTIONARY[GrihamState.language]?.btn_login || "Login";
      if (btnSpinner) btnSpinner.style.display = "none";
      this.isLoading = false;
    }
  }
};

window.GrihamGatekeeperAuthUI = GrihamGatekeeperAuthUI;
