const GrihamState = {
  theme: localStorage.getItem("griham_theme") || "dark",
  language: localStorage.getItem("griham_lang") || "en",
  currentRoute: "/",
  historyStack: []
};

const GrihamTheme = {
  init() {
    this.applyTheme(GrihamState.theme);
  },

  toggle() {
    const next = GrihamState.theme === "dark" ? "light" : "dark";
    this.applyTheme(next);
  },

  applyTheme(theme) {
    GrihamState.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("griham_theme", theme);

    const sunIcon = document.querySelector(".theme-icon-sun");
    const moonIcon = document.querySelector(".theme-icon-moon");

    if (theme === "dark") {
      if (sunIcon) sunIcon.style.display = "block";
      if (moonIcon) moonIcon.style.display = "none";
    } else {
      if (sunIcon) sunIcon.style.display = "none";
      if (moonIcon) moonIcon.style.display = "block";
    }
  }
};

const GrihamI18n = {
  init() {
    const select = document.getElementById("lang-select");
    if (select) {
      select.value = GrihamState.language;
      select.addEventListener("change", (e) => this.setLanguage(e.target.value));
    }
    this.translate(GrihamState.language);
  },

  setLanguage(lang) {
    if (!I18N_DICTIONARY[lang]) return;
    GrihamState.language = lang;
    localStorage.setItem("griham_lang", lang);
    this.translate(lang);
  },

  translate(lang) {
    const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY["en"];
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });
  },

  t(key, fallback = "") {
    const lang = (typeof GrihamState !== "undefined" && GrihamState.language) || "en";
    const dict = (typeof I18N_DICTIONARY !== "undefined" && (I18N_DICTIONARY[lang] || I18N_DICTIONARY["en"])) || {};
    return dict[key] || fallback || key;
  },

  applyTranslations(lang) {
    this.translate(lang || GrihamState.language);
  }
};

const GrihamA11y = {
  STORAGE_KEY: "griham_a11y_settings",

  // 10 Core Accessibility Settings
  state: {
    textScale: 1.0,          // 1. Bigger Text / 2. Smaller Text
    textSpacing: false,      // 3. Text Spacing
    lineHeight: false,       // 4. Line Height
    saturation: "normal",    // 5. Saturation (low, normal, high)
    invertColors: false,     // 6. Invert Colors
    largeCursor: false,      // 7. Cursor
    pauseAnimation: false,   // 8. Pause Animation
    hideImages: false        // 9. Hide Images
  },

  init() {
    this.loadSettings();
    this.applyAll();
  },

  loadSettings() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.state = { ...this.state, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn("[Griham A11y] Failed to parse stored settings:", e);
    }
  },

  saveSettings() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
  },

  toggleSheet(open) {
    const sheet = document.getElementById("a11y-sheet");
    const backdrop = document.getElementById("a11y-backdrop");
    const isOpen = open !== undefined ? open : !sheet.classList.contains("open");
    
    if (isOpen) {
      sheet.classList.add("open");
      backdrop.classList.add("open");
      const trigger = document.getElementById("btn-a11y-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "true");
    } else {
      sheet.classList.remove("open");
      backdrop.classList.remove("open");
      const trigger = document.getElementById("btn-a11y-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    }
  },

  stepTextSize(direction) {
    const steps = [0.85, 1.0, 1.15, 1.28, 1.40];
    let currentIndex = steps.findIndex(s => Math.abs(s - this.state.textScale) < 0.03);
    if (currentIndex === -1) currentIndex = 1;

    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= steps.length) nextIndex = steps.length - 1;

    this.setTextScale(steps[nextIndex]);
  },

  setTextScale(scale) {
    this.state.textScale = scale;
    document.documentElement.style.setProperty("--font-scale", scale);
    
    const display = document.getElementById("a11y-scale-display");
    if (display) display.textContent = `${Math.round(scale * 100)}%`;
    
    this.saveSettings();
  },

  setTextSpacing(enabled) {
    this.state.textSpacing = enabled;
    document.documentElement.classList.toggle("accessibility-text-spacing", enabled);
    const chk = document.getElementById("a11y-toggle-spacing");
    if (chk) chk.checked = enabled;
    this.saveSettings();
  },

  setLineHeight(enabled) {
    this.state.lineHeight = enabled;
    document.documentElement.classList.toggle("accessibility-line-height", enabled);
    const chk = document.getElementById("a11y-toggle-lineheight");
    if (chk) chk.checked = enabled;
    this.saveSettings();
  },

  setSaturation(mode) {
    this.state.saturation = mode;
    if (mode === "normal") {
      document.documentElement.removeAttribute("data-saturation");
    } else {
      document.documentElement.setAttribute("data-saturation", mode);
    }

    document.querySelectorAll(".btn-sat-chip").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-sat") === mode);
    });

    this.saveSettings();
  },

  setInvertColors(enabled) {
    this.state.invertColors = enabled;
    document.documentElement.classList.toggle("accessibility-invert", enabled);
    const chk = document.getElementById("a11y-toggle-invert");
    if (chk) chk.checked = enabled;
    this.saveSettings();
  },

  setLargeCursor(enabled) {
    this.state.largeCursor = enabled;
    document.documentElement.classList.toggle("accessibility-large-cursor", enabled);
    const chk = document.getElementById("a11y-toggle-cursor");
    if (chk) chk.checked = enabled;
    this.saveSettings();
  },

  setPauseAnimation(enabled) {
    this.state.pauseAnimation = enabled;
    document.documentElement.classList.toggle("accessibility-reduce-motion", enabled);
    const chk = document.getElementById("a11y-toggle-motion");
    if (chk) chk.checked = enabled;
    this.saveSettings();
  },

  setHideImages(enabled) {
    this.state.hideImages = enabled;
    document.documentElement.classList.toggle("accessibility-hide-images", enabled);
    const chk = document.getElementById("a11y-toggle-images");
    if (chk) chk.checked = enabled;
    this.saveSettings();
  },

  resetAllSettings() {
    this.state = {
      textScale: 1.0,
      textSpacing: false,
      lineHeight: false,
      saturation: "normal",
      invertColors: false,
      largeCursor: false,
      pauseAnimation: false,
      hideImages: false
    };

    localStorage.removeItem(this.STORAGE_KEY);
    this.applyAll();
  },

  applyAll() {
    this.setTextScale(this.state.textScale);
    this.setTextSpacing(this.state.textSpacing);
    this.setLineHeight(this.state.lineHeight);
    this.setSaturation(this.state.saturation);
    this.setInvertColors(this.state.invertColors);
    this.setLargeCursor(this.state.largeCursor);
    this.setPauseAnimation(this.state.pauseAnimation);
    this.setHideImages(this.state.hideImages);
  }
};

window.GrihamState = GrihamState;
window.GrihamTheme = GrihamTheme;
window.GrihamI18n = GrihamI18n;
window.GrihamA11y = GrihamA11y;
