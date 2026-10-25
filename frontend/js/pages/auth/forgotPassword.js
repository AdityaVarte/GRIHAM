
/* HTML TEMPLATE EXTRACTED FROM index.html */
window.HTML_FORGOTPASSWORD = `
<section id="screen-forgot-password" class="app-view" aria-labelledby="forgot-hero-title">
        
        <!-- Top Navigation Bar with Back Button -->
        <div class="screen-top-bar">
          ${GrihamHeader.renderBackButton({
            onClick: 'GrihamForgotPasswordUI.handleBack()',
            id: 'btn-forgot-back',
            ariaLabel: 'Back'
          })}
          <span class="top-bar-brand-badge" id="forgot-top-badge">Reset Password</span>
        </div>

        <!-- Brand & Recovery Hero Header -->
        <header class="brand-hero">
          <div class="brand-logo-pill icon-resident" id="forgot-hero-icon" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h1 class="brand-hero-title" id="forgot-hero-title" data-i18n="forgot_pwd_title">Forgot Password?</h1>
          <p class="brand-hero-tagline" id="forgot-hero-subtitle" data-i18n="forgot_pwd_subtitle">Enter your society details to reset your password.</p>
        </header>

        <!-- Subtle 3-Step Progress Stepper -->
        <div class="stepper-progress" role="progressbar" aria-valuemin="1" aria-valuemax="3" aria-valuenow="1" id="forgot-stepper">
          <div class="stepper-step active" id="stepper-step-1">
            <div class="stepper-circle" id="stepper-circle-1">1</div>
            <span class="stepper-label" data-i18n="step_account">Account</span>
          </div>
          <div class="stepper-connector" id="stepper-conn-1"></div>
          <div class="stepper-step" id="stepper-step-2">
            <div class="stepper-circle" id="stepper-circle-2">2</div>
            <span class="stepper-label" data-i18n="step_verification">Verification</span>
          </div>
          <div class="stepper-connector" id="stepper-conn-2"></div>
          <div class="stepper-step" id="stepper-step-3">
            <div class="stepper-circle" id="stepper-circle-3">3</div>
            <span class="stepper-label" data-i18n="step_new_pwd">New Password</span>
          </div>
        </div>

        <!-- Glass Auth Container for Steps -->
        <div class="auth-glass-card" id="forgot-glass-card">
          
          <!-- Recovery Status Banner -->
          <div id="forgot-status-banner" class="auth-status-banner" role="alert" aria-live="assertive">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:1px;">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span id="forgot-status-text">Unable to process request. Please try again.</span>
          </div>

          <!-- STEP 1: Enter Society ID + Phone Number -->
          <form id="forgot-step-1" onsubmit="GrihamForgotPasswordUI.handleSendOtp(event)" novalidate>
            
            <div class="form-group">
              <label class="form-label" for="forgot-society-id" data-i18n="label_society_id">Society ID</label>
              <div class="input-wrapper" id="wrap-forgot-society-id">
                <input 
                  type="text" 
                  id="forgot-society-id" 
                  name="society_id"
                  class="form-input" 
                  placeholder="Enter Society ID" 
                  autocomplete="organization"
                  autocapitalize="characters"
                  spellcheck="false"
                  aria-describedby="forgot-society-helper forgot-society-error"
                  required
                >
              </div>
              <p class="form-helper" id="forgot-society-helper" data-i18n="helper_society_id">Use the Society ID provided by your society.</p>
              <p class="form-error-msg" id="forgot-society-id-error">Please enter your Society ID</p>
            </div>

            <div class="form-group">
              <label class="form-label" for="forgot-phone" data-i18n="label_phone">Phone Number</label>
              <div class="input-wrapper" id="wrap-forgot-phone">
                <input 
                  type="tel" 
                  id="forgot-phone" 
                  name="phone"
                  class="form-input" 
                  placeholder="Enter phone number" 
                  inputmode="numeric"
                  autocomplete="tel"
                  maxlength="15"
                  aria-describedby="forgot-phone-error"
                  required
                >
              </div>
              <p class="form-error-msg" id="forgot-phone-error">Please enter a valid phone number</p>
            </div>

            <button type="submit" class="btn-primary-action" id="btn-send-otp" aria-label="Send OTP">
              <span id="btn-send-otp-spinner" class="spinner-icon" style="display:none;" aria-hidden="true"></span>
              <span id="btn-send-otp-text" data-i18n="btn_send_otp">Send OTP</span>
            </button>

          </form>

          <!-- STEP 2: 6-Digit OTP Verification -->
          <form id="forgot-step-2" style="display:none;" onsubmit="GrihamForgotPasswordUI.handleVerifyOtp(event)" novalidate>
            
            <div class="otp-phone-display" id="otp-phone-info-box">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color:var(--color-brand-blue); flex-shrink:0;">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>OTP sent to <strong id="otp-phone-masked">******3210</strong></span>
            </div>

            <div class="form-group" style="text-align:center;">
              <label class="form-label" style="text-align:center; display:block;" data-i18n="label_enter_otp">Enter 6-Digit OTP</label>
              
              ${GrihamOtpInput.render({
                count: 6,
                containerId: 'otp-digit-container',
                prefix: 'otp-digit-'
              })}
              <p class="form-error-msg" id="otp-error" style="text-align:center;">Please enter the 6-digit OTP</p>
            </div>

            <div class="otp-timer-row">
              <span id="otp-timer-text">Resend OTP in <strong id="otp-timer-count">30</strong>s</span>
              <button type="button" class="btn-resend-otp" id="btn-resend-otp" style="display:none;" onclick="GrihamForgotPasswordUI.handleResendOtp()" data-i18n="btn_resend_otp">Resend OTP</button>
            </div>

            <button type="submit" class="btn-primary-action" id="btn-verify-otp" aria-label="Verify OTP" style="margin-top:1.15rem;">
              <span id="btn-verify-otp-spinner" class="spinner-icon" style="display:none;" aria-hidden="true"></span>
              <span id="btn-verify-otp-text" data-i18n="btn_verify_otp">Verify OTP</span>
            </button>

          </form>

          <!-- STEP 3: Create New Password -->
          <form id="forgot-step-3" style="display:none;" onsubmit="GrihamForgotPasswordUI.handleResetPassword(event)" novalidate>
            
            <div class="form-group">
              <label class="form-label" for="reset-new-password" data-i18n="label_new_password">New Password</label>
              <div class="input-wrapper" id="wrap-reset-new-password">
                <input 
                  type="password" 
                  id="reset-new-password" 
                  name="new_password"
                  class="form-input" 
                  placeholder="Enter new password" 
                  autocomplete="new-password"
                  aria-describedby="reset-pwd-helper reset-new-pwd-error"
                  required
                >
                <button 
                  type="button" 
                  class="btn-toggle-password" 
                  id="btn-toggle-new-pwd" 
                  onclick="GrihamAuthUI.togglePasswordVisibility('reset-new-password', 'icon-new-pwd-eye', 'icon-new-pwd-eye-off', this)" 
                  aria-label="Show password"
                  title="Toggle password visibility"
                >
                  <svg id="icon-new-pwd-eye" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg id="icon-new-pwd-eye-off" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="23" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <p class="form-helper" id="reset-pwd-helper" data-i18n="helper_pwd_req">Use at least 8 characters.</p>
              <p class="form-error-msg" id="reset-new-pwd-error">Password must be at least 8 characters</p>
            </div>

            <div class="form-group">
              <label class="form-label" for="reset-confirm-password" data-i18n="label_confirm_password">Confirm Password</label>
              <div class="input-wrapper" id="wrap-reset-confirm-password">
                <input 
                  type="password" 
                  id="reset-confirm-password" 
                  name="confirm_password"
                  class="form-input" 
                  placeholder="Re-enter new password" 
                  autocomplete="new-password"
                  aria-describedby="reset-confirm-pwd-error"
                  required
                >
                <button 
                  type="button" 
                  class="btn-toggle-password" 
                  id="btn-toggle-confirm-pwd" 
                  onclick="GrihamAuthUI.togglePasswordVisibility('reset-confirm-password', 'icon-conf-pwd-eye', 'icon-conf-pwd-eye-off', this)" 
                  aria-label="Show password"
                  title="Toggle password visibility"
                >
                  <svg id="icon-conf-pwd-eye" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg id="icon-conf-pwd-eye-off" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="23" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <p class="form-error-msg" id="reset-confirm-pwd-error">Passwords do not match</p>
            </div>

            <button type="submit" class="btn-primary-action" id="btn-submit-reset-password" aria-label="Reset Password">
              <span id="btn-reset-spinner" class="spinner-icon" style="display:none;" aria-hidden="true"></span>
              <span id="btn-reset-text" data-i18n="btn_reset_pwd">Reset Password</span>
            </button>

          </form>

        </div>

        <!-- SUCCESS STATE: Password Reset Successful Confirmation Card -->
        <div class="auth-glass-card success-status-card" id="forgot-success-view" style="display:none;">
          <div class="success-icon-shield" aria-hidden="true">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <h2 class="success-title" data-i18n="success_reset_title">Password Reset Successful</h2>
          <p class="success-subtitle" data-i18n="success_reset_msg">Your password has been updated successfully.</p>

          <button type="button" class="btn-primary-action" onclick="GrihamRouter.navigate('/resident/login')" id="btn-forgot-back-login" aria-label="Back to Login">
            <span data-i18n="btn_back_login">Back to Login</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Secondary Login Link at Bottom -->
        <div class="auth-links-col" id="forgot-footer-links">
          <a href="#/resident/login" class="link-register-subtle">
            <span data-i18n="link_remember_pwd">Remember your password?</span> <strong data-i18n="link_login_bold">Resident Login</strong>
          </a>
        </div>

      </section>
`;
const GrihamForgotPasswordUI = {
  currentStep: 1, // 1: Account, 2: OTP Verification, 3: Reset Password, 4: Success
  isLoading: false,
  timerInterval: null,
  state: {
    society_id: "",
    phone: "",
    masked_phone: "",
    otp: "",
    timer: 30
  },

  init() {
    this.clearTimer();
    this.hideBanner();
    this.currentStep = 1;
    this.isLoading = false;
    this.state = {
      society_id: "",
      phone: "",
      masked_phone: "",
      otp: "",
      timer: 30
    };

    const societyInput = document.getElementById("forgot-society-id");
    const phoneInput = document.getElementById("forgot-phone");
    const newPwdInput = document.getElementById("reset-new-password");
    const confPwdInput = document.getElementById("reset-confirm-password");

    if (societyInput) societyInput.value = "";
    if (phoneInput) phoneInput.value = "";
    if (newPwdInput) newPwdInput.value = "";
    if (confPwdInput) confPwdInput.value = "";

    this.setFieldState("forgot-society-id", true);
    this.setFieldState("forgot-phone", true);
    this.setFieldState("reset-new-pwd", true);
    this.setFieldState("reset-confirm-pwd", true);
    const otpErr = document.getElementById("otp-error");
    if (otpErr) otpErr.classList.remove("visible");

    this.initOtpInputs();
    this.setStep(1);
  },

  setStep(step) {
    this.currentStep = step;
    this.hideBanner();

    const step1Form = document.getElementById("forgot-step-1");
    const step2Form = document.getElementById("forgot-step-2");
    const step3Form = document.getElementById("forgot-step-3");
    const successCard = document.getElementById("forgot-success-view");
    const glassCard = document.getElementById("forgot-glass-card");
    const footerLinks = document.getElementById("forgot-footer-links");
    const stepper = document.getElementById("forgot-stepper");

    const heroTitle = document.getElementById("forgot-hero-title");
    const heroSubtitle = document.getElementById("forgot-hero-subtitle");
    const topBadge = document.getElementById("forgot-top-badge");

    if (step1Form) step1Form.style.display = step === 1 ? "block" : "none";
    if (step2Form) step2Form.style.display = step === 2 ? "block" : "none";
    if (step3Form) step3Form.style.display = step === 3 ? "block" : "none";
    if (glassCard) glassCard.style.display = step <= 3 ? "block" : "none";
    if (successCard) successCard.style.display = step === 4 ? "flex" : "none";
    if (footerLinks) footerLinks.style.display = step <= 3 ? "flex" : "none";
    if (stepper) stepper.style.display = step <= 3 ? "flex" : "none";

    const step1El = document.getElementById("stepper-step-1");
    const step2El = document.getElementById("stepper-step-2");
    const step3El = document.getElementById("stepper-step-3");
    const conn1El = document.getElementById("stepper-conn-1");
    const conn2El = document.getElementById("stepper-conn-2");

    if (step === 1) {
      if (step1El) step1El.className = "stepper-step active";
      if (step2El) step2El.className = "stepper-step";
      if (step3El) step3El.className = "stepper-step";
      if (conn1El) conn1El.className = "stepper-connector";
      if (conn2El) conn2El.className = "stepper-connector";
      if (topBadge) topBadge.textContent = "Account";
      if (heroTitle) heroTitle.textContent = "Forgot Password?";
      if (heroSubtitle) heroSubtitle.textContent = "Enter your society details to reset your password.";
    } else if (step === 2) {
      if (step1El) step1El.className = "stepper-step completed";
      if (step2El) step2El.className = "stepper-step active";
      if (step3El) step3El.className = "stepper-step";
      if (conn1El) conn1El.className = "stepper-connector completed";
      if (conn2El) conn2El.className = "stepper-connector";
      if (topBadge) topBadge.textContent = "Verify OTP";
      if (heroTitle) heroTitle.textContent = "Verify OTP";
      if (heroSubtitle) heroSubtitle.textContent = "Enter the OTP sent to your registered phone number.";
    } else if (step === 3) {
      if (step1El) step1El.className = "stepper-step completed";
      if (step2El) step2El.className = "stepper-step completed";
      if (step3El) step3El.className = "stepper-step active";
      if (conn1El) conn1El.className = "stepper-connector completed";
      if (conn2El) conn2El.className = "stepper-connector completed";
      if (topBadge) topBadge.textContent = "New Password";
      if (heroTitle) heroTitle.textContent = "Create New Password";
      if (heroSubtitle) heroSubtitle.textContent = "Set a new password for your Griham account.";
    } else if (step === 4) {
      if (topBadge) topBadge.textContent = "Success";
      if (heroTitle) heroTitle.textContent = "Password Reset";
      if (heroSubtitle) heroSubtitle.textContent = "Account recovery complete";
    }

    const appEl = document.getElementById("app");
    if (appEl) appEl.scrollTo({ top: 0, behavior: "smooth" });
  },

  handleBack() {
    if (this.currentStep === 1) {
      GrihamRouter.goBack();
    } else if (this.currentStep === 2) {
      this.clearTimer();
      this.setStep(1);
    } else if (this.currentStep === 3) {
      this.setStep(2);
    } else {
      GrihamRouter.navigate("/resident/login");
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
    const banner = document.getElementById("forgot-status-banner");
    const text = document.getElementById("forgot-status-text");
    if (!banner || !text) return;

    banner.className = `auth-status-banner ${type}`;
    text.textContent = message;
  },

  hideBanner() {
    const banner = document.getElementById("forgot-status-banner");
    if (banner) {
      banner.className = "auth-status-banner";
      banner.style.display = "none";
    }
  },

  initOtpInputs() {
    if (typeof GrihamOtpInput !== "undefined") {
      GrihamOtpInput.init("otp-digit-container", {
        onInput: () => {
          const otpErr = document.getElementById("otp-error");
          if (otpErr) otpErr.classList.remove("visible");
        }
      });
      return;
    }
    const inputs = Array.from(document.querySelectorAll(".otp-digit-input"));
    inputs.forEach((input, index) => {
      input.value = "";
      input.classList.remove("field-error");

      input.oninput = (e) => {
        const val = e.target.value.replace(/\D/g, "");
        e.target.value = val ? val[val.length - 1] : "";
        
        const otpErr = document.getElementById("otp-error");
        if (otpErr) otpErr.classList.remove("visible");
        inputs.forEach(i => i.classList.remove("field-error"));

        if (e.target.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      };

      input.onkeydown = (e) => {
        if (e.key === "Backspace") {
          if (!input.value && index > 0) {
            inputs[index - 1].focus();
            inputs[index - 1].value = "";
            e.preventDefault();
          } else {
            input.value = "";
          }
        } else if (e.key === "ArrowLeft" && index > 0) {
          inputs[index - 1].focus();
        } else if (e.key === "ArrowRight" && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      };

      input.onpaste = (e) => {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "");
        if (pasteData) {
          for (let i = 0; i < inputs.length && i < pasteData.length; i++) {
            inputs[i].value = pasteData[i];
          }
          const nextIndex = Math.min(pasteData.length, inputs.length) - 1;
          if (inputs[nextIndex]) inputs[nextIndex].focus();
        }
      };
    });
  },

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  startOtpTimer() {
    this.clearTimer();
    this.state.timer = 30;
    
    const countEl = document.getElementById("otp-timer-count");
    const timerText = document.getElementById("otp-timer-text");
    const resendBtn = document.getElementById("btn-resend-otp");

    if (countEl) countEl.textContent = "30";
    if (timerText) timerText.style.display = "inline";
    if (resendBtn) resendBtn.style.display = "none";

    this.timerInterval = setInterval(() => {
      this.state.timer--;
      if (countEl) countEl.textContent = this.state.timer;

      if (this.state.timer <= 0) {
        this.clearTimer();
        if (timerText) timerText.style.display = "none";
        if (resendBtn) resendBtn.style.display = "inline-block";
      }
    }, 1000);
  },

  async handleSendOtp(e) {
    e.preventDefault();
    if (this.isLoading) return;

    this.hideBanner();

    const societyInput = document.getElementById("forgot-society-id");
    const phoneInput = document.getElementById("forgot-phone");

    const societyId = (societyInput?.value || "").trim();
    const phone = (phoneInput?.value || "").trim();

    let hasErrors = false;

    if (!societyId) {
      this.setFieldState("forgot-society-id", false, "Please enter your Society ID");
      hasErrors = true;
    } else {
      this.setFieldState("forgot-society-id", true);
    }

    const cleanPhone = GrihamValidation.normalizePhone(phone);
    if (!cleanPhone) {
      this.setFieldState("forgot-phone", false, "Please enter your phone number");
      hasErrors = true;
    } else if (!GrihamValidation.isValidPhone(cleanPhone)) {
      this.setFieldState("forgot-phone", false, "Please enter a valid 10-digit phone number");
      hasErrors = true;
    } else {
      this.setFieldState("forgot-phone", true);
    }

    if (hasErrors) return;

    this.isLoading = true;
    const btn = document.getElementById("btn-send-otp");
    const btnText = document.getElementById("btn-send-otp-text");
    const btnSpinner = document.getElementById("btn-send-otp-spinner");

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Sending OTP...";
    if (btnSpinner) btnSpinner.style.display = "inline-block";

    try {
      const response = await forgotPassword({
        society_id: societyId,
        phone: cleanPhone
      });

      this.state.society_id = societyId;
      this.state.phone = cleanPhone;
      this.state.masked_phone = response.masked_phone || GrihamFormat.maskPhone(cleanPhone);

      const maskedPhoneEl = document.getElementById("otp-phone-masked");
      if (maskedPhoneEl) maskedPhoneEl.textContent = this.state.masked_phone;

      this.setStep(2);
      this.startOtpTimer();

      setTimeout(() => {
        const firstDigit = document.getElementById("otp-digit-0");
        if (firstDigit) firstDigit.focus();
      }, 150);

    } catch (err) {
      this.showBanner("error", "Unable to find account. Please check your Society ID and Phone Number.");
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Send OTP";
      if (btnSpinner) btnSpinner.style.display = "none";
      this.isLoading = false;
    }
  },

  async handleResendOtp() {
    if (this.isLoading) return;
    this.isLoading = true;

    const resendBtn = document.getElementById("btn-resend-otp");
    if (resendBtn) {
      resendBtn.disabled = true;
      resendBtn.textContent = "Sending...";
    }

    try {
      await resendOtp({
        society_id: this.state.society_id,
        phone: this.state.phone
      });

      this.showBanner("success", "A new OTP code has been sent.");
      this.startOtpTimer();
    } catch (err) {
      this.showBanner("error", "Failed to resend OTP. Please try again.");
    } finally {
      if (resendBtn) {
        resendBtn.disabled = false;
        resendBtn.textContent = "Resend OTP";
      }
      this.isLoading = false;
    }
  },

  async handleVerifyOtp(e) {
    e.preventDefault();
    if (this.isLoading) return;

    this.hideBanner();

    const inputs = Array.from(document.querySelectorAll(".otp-digit-input"));
    const otpValue = (typeof GrihamOtpInput !== "undefined")
      ? GrihamOtpInput.getValue("otp-digit-container")
      : inputs.map(i => i.value.trim()).join("");
    const otpErr = document.getElementById("otp-error");

    if (otpValue.length < 6) {
      inputs.forEach(i => i.classList.add("field-error"));
      if (otpErr) {
        otpErr.textContent = "Please enter all 6 digits of the OTP";
        otpErr.classList.add("visible");
      }
      return;
    }

    this.isLoading = true;
    const btn = document.getElementById("btn-verify-otp");
    const btnText = document.getElementById("btn-verify-otp-text");
    const btnSpinner = document.getElementById("btn-verify-otp-spinner");

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Verifying...";
    if (btnSpinner) btnSpinner.style.display = "inline-block";

    try {
      await verifyOtp({
        society_id: this.state.society_id,
        phone: this.state.phone,
        otp: otpValue
      });

      this.state.otp = otpValue;
      this.clearTimer();

      this.setStep(3);

      setTimeout(() => {
        const pwdInput = document.getElementById("reset-new-password");
        if (pwdInput) pwdInput.focus();
      }, 150);

    } catch (err) {
      inputs.forEach(i => i.classList.add("field-error"));
      if (otpErr) {
        otpErr.textContent = "Invalid OTP. Please check the code and try again.";
        otpErr.classList.add("visible");
      }
      this.showBanner("error", "Invalid OTP. Please check the code and try again.");
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Verify OTP";
      if (btnSpinner) btnSpinner.style.display = "none";
      this.isLoading = false;
    }
  },

  async handleResetPassword(e) {
    e.preventDefault();
    if (this.isLoading) return;

    this.hideBanner();

    const newPwdInput = document.getElementById("reset-new-password");
    const confPwdInput = document.getElementById("reset-confirm-password");

    const newPassword = newPwdInput?.value || "";
    const confirmPassword = confPwdInput?.value || "";

    let hasErrors = false;

    if (!newPassword || newPassword.length < 8) {
      this.setFieldState("reset-new-pwd", false, "Password must be at least 8 characters");
      hasErrors = true;
    } else {
      this.setFieldState("reset-new-pwd", true);
    }

    if (!confirmPassword || confirmPassword !== newPassword) {
      this.setFieldState("reset-confirm-pwd", false, "Passwords do not match");
      hasErrors = true;
    } else {
      this.setFieldState("reset-confirm-pwd", true);
    }

    if (hasErrors) return;

    this.isLoading = true;
    const btn = document.getElementById("btn-submit-reset-password");
    const btnText = document.getElementById("btn-reset-text");
    const btnSpinner = document.getElementById("btn-reset-spinner");

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = "Resetting...";
    if (btnSpinner) btnSpinner.style.display = "inline-block";

    try {
      await resetPassword({
        society_id: this.state.society_id,
        phone: this.state.phone,
        otp: this.state.otp,
        new_password: newPassword
      });

      this.setStep(4);

      this.state = {
        society_id: "",
        phone: "",
        masked_phone: "",
        otp: "",
        timer: 30
      };

    } catch (err) {
      this.showBanner("error", "Unable to reset password. Please try again.");
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = "Reset Password";
      if (btnSpinner) btnSpinner.style.display = "none";
      this.isLoading = false;
    }
  }
};
