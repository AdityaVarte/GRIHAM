/**
 * Automated End-to-End Verification Suite for Gatekeeper Home / Security Terminal
 * Connected to Chrome CDP on port 9222
 */
const { spawn, execSync } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9222;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getDebuggerUrl() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${DEBUG_PORT}/json/list`, res => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
      });
      const page = res && res.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch (e) {
      await sleep(300);
    }
  }
  throw new Error('Could not connect to Chrome debugging port');
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
    this.consoleErrors = [];
    this.networkErrors = [];
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = err => reject(err);
      this.ws.onmessage = evt => {
        const msg = JSON.parse(evt.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(new Error(msg.error.message));
          else resolve(msg.result);
        } else if (msg.method === 'Runtime.exceptionThrown') {
          const text = msg.params.exceptionDetails?.text || 'Exception';
          const desc = msg.params.exceptionDetails?.exception?.description || '';
          console.error('[Browser Exception]', text, desc);
          this.consoleErrors.push(text + ' ' + desc);
        } else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
          const text = msg.params.args.map(a => a.value || a.description || '').join(' ');
          // Ignore expected mock 401 logs when testing invalid login
          if (!text.includes('401') && !text.includes('Invalid credentials') && !text.includes('Invalid Society ID') && !text.includes('Invalid Station PIN')) {
            console.error('[Browser Console Error]', text);
            this.consoleErrors.push(text);
          }
        } else if (msg.method === 'Network.responseReceived') {
          const resp = msg.params.response;
          if (resp && resp.status >= 400 && !resp.url.includes('favicon.ico')) {
            console.error('[Network Error]', resp.status, resp.url);
            this.networkErrors.push(`${resp.status} ${resp.url}`);
          }
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      const detail = res.exceptionDetails.exception?.description || res.exceptionDetails.text || JSON.stringify(res.exceptionDetails);
      throw new Error(`Eval failed on: ${expr}\nDetail: ${detail}`);
    }
    return res.result?.value;
  }

  async navigate(url) {
    await this.send('Page.navigate', { url });
    await this.waitForReady();
  }

  async waitForReady() {
    for (let i = 0; i < 40; i++) {
      try {
        const ready = await this.eval('document.readyState === "complete" && typeof window.GrihamRouter !== "undefined" && typeof window.GrihamAuth !== "undefined"');
        if (ready) return;
      } catch (e) {}
      await sleep(300);
    }
    throw new Error('Page did not reach ready state in time');
  }

  async close() {
    this.ws.close();
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('STARTING GATEKEEPER HOME / SECURITY TERMINAL E2E VERIFICATION');
  console.log('====================================================\n');

  try {
    execSync('taskkill /F /IM chrome.exe /T 2>nul || exit 0', { shell: 'cmd.exe' });
  } catch(e) {}
  await sleep(1000);

  const tempUserDataDir = path.join(__dirname, 'temp_chrome_gk_profile');
  if (fs.existsSync(tempUserDataDir)) {
    try { fs.rmSync(tempUserDataDir, { recursive: true, force: true }); } catch(e){}
  }

  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--user-data-dir=${tempUserDataDir}`,
    '--window-size=390,844',
    'about:blank'
  ]);

  await sleep(1500);

  const wsUrl = await getDebuggerUrl();
  console.log('Connected to Chrome Debugger:', wsUrl);

  const client = new CDPClient(wsUrl);
  await client.connect();

  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('Network.enable');

  let passed = 0;
  let failed = 0;

  function assert(cond, msg) {
    if (cond) {
      console.log(`[PASS] ${msg}`);
      passed++;
    } else {
      console.error(`[FAIL] ${msg}`);
      failed++;
    }
  }

  try {
    // 1. Load Application
    console.log('\n--- 1. APP LOAD & INITIAL STATE ---');
    await client.navigate('http://localhost:8085/index.html');
    await sleep(600);
    await client.eval('localStorage.clear(); GrihamAuth.clearSession(); GrihamRouter.navigate("/entry");');
    await sleep(300);

    const title = await client.eval('document.title');
    assert(title.includes('Griham'), `App loaded with title: "${title}"`);

    // 2. Gatekeeper Login Regression Check
    console.log('\n--- 2. GATEKEEPER LOGIN REGRESSION ---');
    await client.eval('GrihamRouter.navigate("/gatekeeper/login");');
    await sleep(400);

    let currentHash = await client.eval('window.location.hash');
    assert(currentHash === '#/gatekeeper/login', `Navigated to Gatekeeper Login: ${currentHash}`);

    // Verify form elements exist
    const formInputsExist = await client.eval(`
      !!document.getElementById('gatekeeper-input-society-id') &&
      !!document.getElementById('gatekeeper-input-pin') &&
      !!document.getElementById('btn-gatekeeper-submit-login')
    `);
    assert(formInputsExist, 'Society ID input, Station PIN input, and Login button present');

    // Attempt invalid login
    await client.eval(`
      document.getElementById('gatekeeper-input-society-id').value = 'INVALID-ID';
      document.getElementById('gatekeeper-input-pin').value = '0000';
    `);
    await client.eval('document.getElementById("form-gatekeeper-login").dispatchEvent(new Event("submit", { cancelable: true }));');
    await sleep(600);

    const bannerVisible = await client.eval('document.getElementById("gatekeeper-login-status-banner").style.display !== "none"');
    assert(bannerVisible, 'Invalid credentials triggers error status banner');

    // Submit valid credentials
    await client.eval(`
      document.getElementById('gatekeeper-input-society-id').value = 'GRIHAM-PUNE-001';
      document.getElementById('gatekeeper-input-pin').value = '1234';
    `);
    await client.eval('document.getElementById("form-gatekeeper-login").dispatchEvent(new Event("submit", { cancelable: true }));');
    await sleep(800);

    currentHash = await client.eval('window.location.hash');
    assert(currentHash === '#/gatekeeper/home', `Valid login navigates to #/gatekeeper/home (actual: ${currentHash})`);

    const isGkAuth = await client.eval('GrihamAuth.isAuthenticated() && GrihamAuth.isGatekeeper()');
    assert(isGkAuth, 'Session authenticated with role "gatekeeper"');

    // 3. Gatekeeper Home Route & DOM Rendering
    console.log('\n--- 3. GATEKEEPER HOME RENDERING ---');
    const screenActive = await client.eval('document.getElementById("screen-gatekeeper-home").classList.contains("active")');
    assert(screenActive, 'Screen #screen-gatekeeper-home has class "active"');

    const terminalTitle = await client.eval('document.getElementById("gk-terminal-title").textContent.trim()');
    assert(terminalTitle.includes('Security Terminal'), `Terminal title matches: "${terminalTitle}"`);

    // Society Context
    const societyContext = await client.eval(`({
      name: document.getElementById('gk-society-name')?.textContent.trim(),
      station: document.getElementById('gk-station-subtitle')?.textContent.trim(),
      code: document.getElementById('gk-society-code')?.textContent.trim()
    })`);
    assert(societyContext.name === 'Green Valley Residency', `Society name displayed: "${societyContext.name}"`);
    assert(societyContext.code === 'GRIHAM-PUNE-001', `Society code displayed: "${societyContext.code}"`);
    assert(societyContext.station === 'Main Gate Security Station', `Station subtitle displayed: "${societyContext.station}"`);

    // Terminal Status Card & Guard On Duty
    const terminalCard = await client.eval(`({
      status: document.getElementById('gk-status-label')?.textContent.trim(),
      guardName: document.getElementById('gk-guard-name')?.textContent.trim(),
      guardId: document.getElementById('gk-guard-id')?.textContent.trim(),
      guardInitials: document.getElementById('gk-guard-initials')?.textContent.trim(),
      clockTime: document.getElementById('gk-clock-time')?.textContent.trim()
    })`);
    assert(terminalCard.status === 'Terminal Active', `Status badge: "${terminalCard.status}"`);
    assert(terminalCard.guardName === 'Amit Sharma', `Guard on duty name: "${terminalCard.guardName}"`);
    assert(terminalCard.guardId === 'GTK-001', `Guard badge ID: "${terminalCard.guardId}"`);
    assert(terminalCard.guardInitials === 'AS', `Guard initials avatar: "${terminalCard.guardInitials}"`);
    assert(terminalCard.clockTime && terminalCard.clockTime.includes(':'), `Live terminal clock displaying: "${terminalCard.clockTime}"`);

    // Quick Actions
    const quickActions = await client.eval(`
      Array.from(document.querySelectorAll('.gk-qa-card')).map(card => ({
        title: card.querySelector('.gk-qa-title')?.textContent.trim(),
        pill: card.querySelector('.gk-coming-soon-pill')?.textContent.trim(),
        disabled: card.getAttribute('aria-disabled')
      }))
    `);
    assert(quickActions.length === 4, `All 4 Quick Actions rendered (found ${quickActions.length})`);
    assert(quickActions.every(q => q.pill === 'Coming Soon' && q.disabled === 'true'), 'All 4 Quick Actions marked as Coming Soon and aria-disabled="true"');

    // Test clicking a Coming Soon action -> triggers toast notification
    await client.eval('document.querySelector(".gk-qa-card").click();');
    await sleep(400);
    const toastVisible = await client.eval('!!document.querySelector(".toast, .griham-toast")');
    assert(toastVisible, 'Clicking Coming Soon action displays info toast');

    // Today's Gate Summary (real empty counts, not fabricated)
    const summaryCounts = await client.eval(`({
      visitors: document.getElementById('gk-val-visitors')?.textContent.trim(),
      deliveries: document.getElementById('gk-val-deliveries')?.textContent.trim(),
      vehicles: document.getElementById('gk-val-vehicles')?.textContent.trim()
    })`);
    assert(summaryCounts.visitors === '0' && summaryCounts.deliveries === '0' && summaryCounts.vehicles === '0',
      `Gate summary values are genuine 0 empty state (visitors: ${summaryCounts.visitors}, deliveries: ${summaryCounts.deliveries}, vehicles: ${summaryCounts.vehicles})`);

    // Recent Gate Activity Empty State
    const emptyStateText = await client.eval('document.getElementById("gk-activity-container")?.textContent.trim()');
    assert(emptyStateText.includes('No Gate Activity Recorded'), 'Recent activity shows canonical GrihamEmptyState');

    // End Shift Button
    const endShiftBtn = await client.eval('!!document.getElementById("btn-gk-end-shift")');
    assert(endShiftBtn, 'Direct End Shift / Logout button present on page');

    // 4. Session Persistence Across Reload
    console.log('\n--- 4. SESSION PERSISTENCE ---');
    await client.send('Page.reload');
    await client.waitForReady();
    await sleep(600);

    const reloadedHash = await client.eval('window.location.hash');
    const reloadedAuth = await client.eval('GrihamAuth.isAuthenticated() && GrihamAuth.isGatekeeper()');
    assert(reloadedAuth, 'Gatekeeper session persists in GrihamStorage after reload');
    assert(reloadedHash === '#/gatekeeper/home', `Remains on #/gatekeeper/home after reload (actual: ${reloadedHash})`);

    const reloadedGuardName = await client.eval('document.getElementById("gk-guard-name")?.textContent.trim()');
    assert(reloadedGuardName === 'Amit Sharma', `Guard name intact after reload: "${reloadedGuardName}"`);

    // 5. Logout & Modals
    console.log('\n--- 5. LOGOUT FLOW & DIALOGS ---');
    // Open terminal options menu
    await client.eval('GrihamGatekeeperHomeUI.toggleMenu(true);');
    await sleep(300);
    const menuOpen = await client.eval('document.getElementById("sheet-gk-menu").classList.contains("visible")');
    assert(menuOpen, 'Terminal Options bottom sheet opens');

    // Close with Escape key
    await client.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', windowsVirtualKeyCode: 27 });
    await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', windowsVirtualKeyCode: 27 });
    await sleep(300);
    const menuClosed = await client.eval('!document.getElementById("sheet-gk-menu").classList.contains("visible")');
    assert(menuClosed, 'Terminal Options menu closes on Escape key');

    // Open logout confirm sheet via direct End Shift button
    await client.eval('document.getElementById("btn-gk-end-shift").click();');
    await sleep(300);
    const logoutSheetOpen = await client.eval('document.getElementById("sheet-gk-logout").classList.contains("visible")');
    assert(logoutSheetOpen, 'Logout confirmation sheet opens');

    // Test cancel
    await client.eval('document.getElementById("btn-cancel-gk-logout").click();');
    await sleep(300);
    const logoutSheetClosed = await client.eval('!document.getElementById("sheet-gk-logout").classList.contains("visible")');
    assert(logoutSheetClosed, 'Logout sheet closes on Cancel');

    // Confirm logout
    await client.eval('document.getElementById("btn-gk-end-shift").click();');
    await sleep(200);
    await client.eval('document.getElementById("btn-confirm-gk-logout").click();');
    await sleep(600);

    const postLogoutHash = await client.eval('window.location.hash');
    const isLoggedOut = await client.eval('!GrihamAuth.isAuthenticated() && GrihamAuth.getUser() === null');
    assert(isLoggedOut, 'Session cleared upon confirmed logout');
    assert(postLogoutHash === '#/gatekeeper/login', `Redirected to Gatekeeper Login: ${postLogoutHash}`);

    // 6. Unauthenticated Access Protection
    console.log('\n--- 6. UNAUTHENTICATED ACCESS PROTECTION ---');
    await client.eval('GrihamRouter.navigate("/gatekeeper/home");');
    await sleep(500);
    const blockedHash = await client.eval('window.location.hash');
    assert(blockedHash === '#/gatekeeper/login', `Unauthenticated /gatekeeper/home redirected to /gatekeeper/login (actual: ${blockedHash})`);

    // 7. Role Isolation Checks
    console.log('\n--- 7. ROLE ISOLATION (403 CHECKS) ---');
    // Resident -> Gatekeeper denial
    await client.eval(`
      GrihamAuth.setSession("token-resident", { id: "USR-001", name: "Rajesh Kumar", role: "resident" }, "GRIHAM-PUNE-001");
      GrihamRouter.navigate('/gatekeeper/home');
    `);
    await sleep(500);
    let roleDeniedHash = await client.eval('window.location.hash');
    assert(roleDeniedHash === '#/resident/home', `Resident trying to access /gatekeeper/home blocked -> redirected to /resident/home (actual: ${roleDeniedHash})`);

    // Admin -> Gatekeeper denial
    await client.eval(`
      GrihamAuth.setSession("token-admin", { id: "ADM-001", name: "Administrator", role: "admin" }, "GRIHAM-PUNE-001");
      GrihamRouter.navigate('/gatekeeper/home');
    `);
    await sleep(500);
    roleDeniedHash = await client.eval('window.location.hash');
    assert(roleDeniedHash === '#/admin/home', `Admin trying to access /gatekeeper/home blocked -> redirected to /admin/home (actual: ${roleDeniedHash})`);

    // Gatekeeper -> Resident & Admin denial
    await client.eval(`
      GrihamAuth.setSession("token-gk", { id: "GTK-001", name: "Amit Sharma", role: "gatekeeper", station: "Main Gate Security Station" }, "GRIHAM-PUNE-001");
      GrihamRouter.navigate('/gatekeeper/home');
    `);
    await sleep(500);

    await client.eval('GrihamRouter.navigate("/admin/home");');
    await sleep(500);
    roleDeniedHash = await client.eval('window.location.hash');
    assert(roleDeniedHash === '#/gatekeeper/home', `Gatekeeper accessing /admin/home blocked -> redirected to /gatekeeper/home (actual: ${roleDeniedHash})`);

    await client.eval('GrihamRouter.navigate("/resident/home");');
    await sleep(500);
    roleDeniedHash = await client.eval('window.location.hash');
    assert(roleDeniedHash === '#/gatekeeper/home', `Gatekeeper accessing /resident/home blocked -> redirected to /gatekeeper/home (actual: ${roleDeniedHash})`);

    // 8. Internationalization (English, Hindi, Marathi)
    console.log('\n--- 8. INTERNATIONALIZATION (EN, HI, MR) ---');
    // Ensure on gatekeeper home
    await client.eval('GrihamRouter.navigate("/gatekeeper/home");');
    await sleep(400);

    // Hindi
    await client.eval('GrihamI18n.setLanguage("hi");');
    await sleep(400);
    let hiTitle = await client.eval('document.getElementById("gk-terminal-title").textContent.trim()');
    let hiStatus = await client.eval('document.getElementById("gk-status-label").textContent.trim()');
    assert(hiTitle.includes('सुरक्षा टर्मिनल'), `Hindi terminal title translated: "${hiTitle}"`);
    assert(hiStatus === 'टर्मिनल सक्रिय', `Hindi terminal status translated: "${hiStatus}"`);

    // Marathi
    await client.eval('GrihamI18n.setLanguage("mr");');
    await sleep(400);
    let mrTitle = await client.eval('document.getElementById("gk-terminal-title").textContent.trim()');
    let mrStatus = await client.eval('document.getElementById("gk-status-label").textContent.trim()');
    assert(mrTitle.includes('सुरक्षा टर्मिनल'), `Marathi terminal title translated: "${mrTitle}"`);
    assert(mrStatus === 'टर्मिनल सक्रिय', `Marathi terminal status translated: "${mrStatus}"`);

    // Back to English
    await client.eval('GrihamI18n.setLanguage("en");');
    await sleep(400);
    let enTitle = await client.eval('document.getElementById("gk-terminal-title").textContent.trim()');
    assert(enTitle === 'Security Terminal', `Restored to English: "${enTitle}"`);

    // 9. Accessibility Suite on Gatekeeper Home (All 10 Features)
    console.log('\n--- 9. ACCESSIBILITY SUITE (ALL 10 FEATURES) ---');
    // 1 & 2. Bigger & Smaller Text
    await client.eval('GrihamA11y.stepTextSize(1);');
    let scale = await client.eval('GrihamA11y.state.textScale');
    assert(scale > 1.0, `1. Bigger Text scale: ${scale}`);

    await client.eval('GrihamA11y.stepTextSize(-1);');
    scale = await client.eval('GrihamA11y.state.textScale');
    assert(scale === 1.0, `2. Smaller Text scale restored: ${scale}`);

    // 3. Text Spacing
    await client.eval('GrihamA11y.setTextSpacing(true);');
    let hasSpacing = await client.eval('document.documentElement.classList.contains("accessibility-text-spacing")');
    assert(hasSpacing, '3. Text Spacing class applied to documentElement');

    // 4. Line Height
    await client.eval('GrihamA11y.setLineHeight(true);');
    let hasLineHeight = await client.eval('document.documentElement.classList.contains("accessibility-line-height")');
    assert(hasLineHeight, '4. Line Height class applied');

    // 5. Saturation
    await client.eval('GrihamA11y.setSaturation("high");');
    let satVal = await client.eval('document.documentElement.getAttribute("data-saturation")');
    assert(satVal === 'high', '5. High Saturation attribute set');

    // 6. Invert Colors
    await client.eval('GrihamA11y.setInvertColors(true);');
    let hasInvert = await client.eval('document.documentElement.classList.contains("accessibility-invert")');
    assert(hasInvert, '6. Invert Colors class applied');

    // 7. Large Cursor
    await client.eval('GrihamA11y.setLargeCursor(true);');
    let hasCursor = await client.eval('document.documentElement.classList.contains("accessibility-large-cursor")');
    assert(hasCursor, '7. Large Cursor class applied');

    // 8. Pause Animation
    await client.eval('GrihamA11y.setPauseAnimation(true);');
    let hasPause = await client.eval('document.documentElement.classList.contains("accessibility-reduce-motion")');
    assert(hasPause, '8. Pause Animation class applied');

    // 9. Hide Images
    await client.eval('GrihamA11y.setHideImages(true);');
    let hasHideImg = await client.eval('document.documentElement.classList.contains("accessibility-hide-images")');
    assert(hasHideImg, '9. Hide Images class applied');

    // 10. Reset All Settings
    await client.eval('GrihamA11y.resetAllSettings();');
    const isCleanA11y = await client.eval(`
      GrihamA11y.state.textScale === 1.0 &&
      !document.documentElement.classList.contains("accessibility-text-spacing") &&
      !document.documentElement.classList.contains("accessibility-line-height") &&
      !document.documentElement.classList.contains("accessibility-invert") &&
      !document.documentElement.classList.contains("accessibility-large-cursor") &&
      !document.documentElement.classList.contains("accessibility-reduce-motion") &&
      !document.documentElement.classList.contains("accessibility-hide-images")
    `);
    assert(isCleanA11y, '10. Reset All Settings restores defaults completely');

    // 10. Responsive Viewports & Zero Horizontal Overflow
    console.log('\n--- 10. RESPONSIVE VIEWPORTS & ZERO OVERFLOW ---');
    const viewports = [
      { w: 360, h: 800, label: '360x800' },
      { w: 375, h: 812, label: '375x812' },
      { w: 390, h: 844, label: '390x844' },
      { w: 412, h: 915, label: '412x915' }
    ];

    for (const vp of viewports) {
      await client.send('Emulation.setDeviceMetricsOverride', {
        width: vp.w,
        height: vp.h,
        deviceScaleFactor: 2,
        mobile: true
      });
      await sleep(350);

      const overflow = await client.eval(`
        document.documentElement.scrollWidth > window.innerWidth ||
        document.getElementById('screen-gatekeeper-home').scrollWidth > window.innerWidth
      `);
      assert(!overflow, `Viewport ${vp.label} has ZERO horizontal overflow`);
    }

    // 11. Event Listener & Resource Cleanup Check
    console.log('\n--- 11. CLEANUP & TIMER AUDIT ---');
    // Navigate away and back
    await client.eval('GrihamRouter.navigate("/entry");');
    await sleep(300);
    const clockCleared = await client.eval('GrihamGatekeeperHomeUI.clockTimer === null');
    assert(clockCleared, 'Clock timer interval cleared when navigating away');

    // Navigate back to gatekeeper home
    await client.eval('GrihamRouter.navigate("/gatekeeper/home");');
    await sleep(300);
    const clockRestarted = await client.eval('GrihamGatekeeperHomeUI.clockTimer !== null');
    assert(clockRestarted, 'Clock timer reinitialized when navigating back');

    // 12. Console Errors & Network Audit
    console.log('\n--- 12. CONSOLE & NETWORK AUDIT ---');
    assert(client.consoleErrors.length === 0, `Zero console errors during execution (total: ${client.consoleErrors.length})`);
    assert(client.networkErrors.length === 0, `Zero network/resource failures (total: ${client.networkErrors.length})`);

    console.log('\n====================================================');
    console.log(`FINAL RESULT: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================\n');

  } catch (err) {
    console.error('Test run error:', err);
    failed++;
  } finally {
    await client.close();
    chromeProcess.kill();
  }

  if (failed > 0) process.exit(1);
}

runTests();
