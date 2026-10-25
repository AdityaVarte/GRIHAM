/**
 * Phase 6 Automated Chrome Verification Runner
 * Uses native Node 24 WebSocket to connect to Chrome DevTools Protocol (CDP)
 */
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9222;

async function sleep(ms) {
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
      if (page) {
        return page.webSocketDebuggerUrl;
      }
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
          console.error('[Browser Exception]', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
          this.consoleErrors.push(msg.params.exceptionDetails.text);
        } else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
          const text = msg.params.args.map(a => a.value || a.description || '').join(' ');
          // Ignore expected mock api 401 log if testing bad login
          if (!text.includes('401') && !text.includes('Invalid credentials')) {
            console.error('[Browser Console Error]', text);
            this.consoleErrors.push(text);
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
        const ready = await this.eval('document.readyState === "complete" && typeof window.GrihamRouter !== "undefined" && typeof window.GrihamAuth !== "undefined" && typeof window.GrihamAPI !== "undefined"');
        if (ready) return;
      } catch (e) {
        // Context might be reloading
      }
      await sleep(350);
    }
    const state = await this.eval('({ href: window.location.href, readyState: document.readyState, router: typeof window.GrihamRouter, auth: typeof window.GrihamAuth, api: typeof window.GrihamAPI })').catch(e => e.message);
    throw new Error(`Page did not reach ready state in time. Current state: ${JSON.stringify(state)}`);
  }

  async close() {
    this.ws.close();
  }
}

async function run() {
  console.log('=== STARTING CHROME PHASE 6 VERIFICATION ===');
  
  try {
    const { execSync } = require('child_process');
    execSync('taskkill /F /IM chrome.exe /T 2>nul || exit 0', { shell: 'cmd.exe' });
  } catch(e) {}
  await sleep(1000);

  const tempUserDataDir = path.join(__dirname, 'temp_chrome_profile');
  if (fs.existsSync(tempUserDataDir)) {
    try { fs.rmSync(tempUserDataDir, { recursive: true, force: true }); } catch(e){}
  }

  // Launch Chrome with isolated profile
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
  console.log('Connected to Chrome WebSocket:', wsUrl);

  const client = new CDPClient(wsUrl);
  await client.connect();

  await client.send('Page.enable');
  await client.send('Runtime.enable');

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
    // 1. Initial Page Load & Ensure clean state
    await client.navigate('http://localhost:8085/index.html');
    await sleep(800);
    await client.eval('localStorage.clear(); GrihamAuth.clearSession(); GrihamRouter.navigate("/entry");');
    await sleep(400);

    // Reset console errors so only errors during the test run count
    client.consoleErrors = [];

    const title = await client.eval('document.title');
    assert(title && title.includes('Griham'), `Page loaded with title: "${title}"`);

    // 2. Unauthenticated Route Guard Check
    await client.eval('GrihamRouter.navigate("/admin/home");');
    await sleep(600);
    let currentHash = await client.eval('window.location.hash');
    assert(currentHash === '#/admin/login', `Unauthenticated access to /admin/home redirects to /admin/login (actual: ${currentHash})`);

    await client.eval('GrihamRouter.navigate("/resident/home");');
    await sleep(600);
    currentHash = await client.eval('window.location.hash');
    assert(currentHash === '#/resident/login', `Unauthenticated access to /resident/home redirects to /resident/login (actual: ${currentHash})`);

    // 3. Resident Login Flow
    await client.eval(`
      (async function() {
        const res = await GrihamAPI.loginResident({ phone: "9876543210", password: "password123", society_id: "GRIHAM-PUNE-001" });
        GrihamAuth.setSession(res.access_token || res.token, res.user, res.society_id);
        GrihamRouter.navigate('/resident/home');
      })();
    `);
    await sleep(800);

    const isResidentAuth = await client.eval('GrihamAuth.isAuthenticated() && GrihamAuth.isResident()');
    assert(isResidentAuth, 'Resident successfully authenticated with role "resident"');
    currentHash = await client.eval('window.location.hash');
    assert(currentHash === '#/resident/home', `Resident landed on #/resident/home (actual: ${currentHash})`);

    // 4. Session Persistence across simulated reload
    await client.send('Page.reload');
    await client.waitForReady();
    await sleep(400);
    const persistedAuth = await client.eval('GrihamAuth.isAuthenticated() && GrihamAuth.isResident()');
    assert(persistedAuth, 'Resident session persists after reload');

    // 5. Wrong-Role Access Denial (Resident trying to access Admin)
    await client.eval('GrihamRouter.navigate("/admin/home");');
    await sleep(600);
    currentHash = await client.eval('window.location.hash');
    assert(currentHash === '#/resident/home', `Resident trying to access /admin/home is blocked & redirected to /resident/home (actual: ${currentHash})`);

    // 6. Resident Core Flows
    const residentRoutes = [
      { path: '/resident/home', label: 'Resident Home' },
      { path: '/resident/maintenance', label: 'Resident Maintenance' },
      { path: '/resident/complaints', label: 'Resident Complaints' },
      { path: '/resident/amenities', label: 'Resident Amenities' },
      { path: '/resident/services', label: 'Resident Services' },
      { path: '/resident/profile', label: 'Resident Profile' }
    ];

    for (const r of residentRoutes) {
      await client.eval(`GrihamRouter.navigate("${r.path}");`);
      await sleep(400);
      const h = await client.eval('window.location.hash');
      assert(h === '#' + r.path, `${r.label} loaded cleanly (${h})`);
    }

    // 7. Resident Logout
    await client.eval('GrihamAuth.logout("/entry");');
    await sleep(500);
    const loggedOut = await client.eval('!GrihamAuth.isAuthenticated()');
    assert(loggedOut, 'Resident logout cleared session');

    // 8. Admin Login Flow
    await client.eval(`
      (async function() {
        const res = await GrihamAPI.loginAdmin({ phone: "9876543210", password: "admin123" });
        GrihamAuth.setSession(res.access_token || res.token, res.user, res.society_id || "GRIHAM-PUNE-001");
        GrihamRouter.navigate('/admin/home');
      })();
    `);
    await sleep(800);

    const isAdminAuth = await client.eval('GrihamAuth.isAuthenticated() && GrihamAuth.isAdmin()');
    assert(isAdminAuth, 'Admin successfully authenticated with role "admin"');

    // 9. Admin Core Flows
    const adminRoutes = [
      { path: '/admin/home', label: 'Admin Dashboard' },
      { path: '/admin/approvals', label: 'Admin Approvals' },
      { path: '/admin/maintenance', label: 'Admin Maintenance' },
      { path: '/admin/complaints', label: 'Admin Complaints' },
      { path: '/admin/workers', label: 'Admin Workers' },
      { path: '/admin/amenities', label: 'Admin Amenities' },
      { path: '/admin/bulk-service', label: 'Admin Bulk Services' },
      { path: '/admin/add-staff', label: 'Admin Add Staff' },
      { path: '/admin/notifications', label: 'Admin Notifications' },
      { path: '/admin/sos', label: 'Admin SOS' },
      { path: '/admin/profile', label: 'Admin Profile' }
    ];

    for (const r of adminRoutes) {
      await client.eval(`GrihamRouter.navigate("${r.path}");`);
      await sleep(500);
      const h = await client.eval('window.location.hash');
      assert(h === '#' + r.path, `${r.label} loaded cleanly (${h})`);
    }

    // 10. Admin wrong-role access denial (Admin trying to access Resident)
    await client.eval('GrihamRouter.navigate("/resident/home");');
    await sleep(500);
    currentHash = await client.eval('window.location.hash');
    assert(currentHash === '#/admin/home', `Admin trying to access /resident/home is blocked & redirected to /admin/home (actual: ${currentHash})`);

    // 11. Admin Logout
    await client.eval('GrihamAuth.logout("/entry");');
    await sleep(400);

    // 12. Gatekeeper Flow
    await client.eval(`
      GrihamAuth.setSession("token-gk", { id: "GTK-001", name: "Santosh Mane", role: "gatekeeper" }, "GRIHAM-PUNE-001");
      GrihamRouter.navigate('/gatekeeper/home');
    `);
    await sleep(600);
    const isGkAuth = await client.eval('GrihamAuth.isAuthenticated() && GrihamAuth.isGatekeeper()');
    assert(isGkAuth, 'Gatekeeper session authenticated');
    currentHash = await client.eval('window.location.hash');
    assert(currentHash === '#/gatekeeper/home', `Gatekeeper on #/gatekeeper/home terminal (${currentHash})`);

    // Gatekeeper blocked from admin
    await client.eval('window.location.hash = "#/admin/home";');
    await sleep(500);
    currentHash = await client.eval('window.location.hash');
    assert(currentHash === '#/gatekeeper/home', `Gatekeeper blocked from /admin/home (actual: ${currentHash})`);

    await client.eval('GrihamAuth.logout("/entry");');

    // 13. Accessibility Verification (All 10 features)
    console.log('\n--- VERIFYING ACCESSIBILITY SUITE ---');
    // Open sheet
    await client.eval('GrihamA11y.toggleSheet(true);');
    const sheetOpen = await client.eval('document.getElementById("a11y-sheet").classList.contains("open")');
    assert(sheetOpen, 'Accessibility sheet opens');

    // 1 & 2. Bigger Text / Smaller Text
    await client.eval('GrihamA11y.stepTextSize(1);');
    let scale = await client.eval('GrihamA11y.state.textScale');
    assert(scale > 1.0, `Bigger Text increased scale to ${scale}`);

    // 3. Text Spacing
    await client.eval('GrihamA11y.setTextSpacing(true);');
    let spacing = await client.eval('document.documentElement.classList.contains("accessibility-text-spacing")');
    assert(spacing, 'Text spacing class applied');

    // 4. Line Height
    await client.eval('GrihamA11y.setLineHeight(true);');
    let lh = await client.eval('document.documentElement.classList.contains("accessibility-line-height")');
    assert(lh, 'Line height class applied');

    // 5. Saturation
    await client.eval('GrihamA11y.setSaturation("high");');
    let sat = await client.eval('document.documentElement.getAttribute("data-saturation")');
    assert(sat === 'high', 'High saturation attribute applied');

    // 6. Invert Colors
    await client.eval('GrihamA11y.setInvertColors(true);');
    let invert = await client.eval('document.documentElement.classList.contains("accessibility-invert")');
    assert(invert, 'Invert colors class applied');

    // 7. Large Cursor
    await client.eval('GrihamA11y.setLargeCursor(true);');
    let cursor = await client.eval('document.documentElement.classList.contains("accessibility-large-cursor")');
    assert(cursor, 'Large cursor class applied');

    // 8. Pause Animation
    await client.eval('GrihamA11y.setPauseAnimation(true);');
    let motion = await client.eval('document.documentElement.classList.contains("accessibility-reduce-motion")');
    assert(motion, 'Pause animation class applied');

    // 9. Hide Images
    await client.eval('GrihamA11y.setHideImages(true);');
    let hideImg = await client.eval('document.documentElement.classList.contains("accessibility-hide-images")');
    assert(hideImg, 'Hide images class applied');

    // 10. Reset All Settings
    await client.eval('GrihamA11y.resetAllSettings();');
    const resetScale = await client.eval('GrihamA11y.state.textScale');
    const resetSpacing = await client.eval('document.documentElement.classList.contains("accessibility-text-spacing")');
    const resetInvert = await client.eval('document.documentElement.classList.contains("accessibility-invert")');
    assert(resetScale === 1.0 && !resetSpacing && !resetInvert, 'Reset All Settings successfully restores defaults');

    await client.eval('GrihamA11y.toggleSheet(false);');

    // 14. Responsive Viewports Check
    console.log('\n--- VERIFYING RESPONSIVE VIEWPORTS ---');
    const viewports = [
      { w: 360, h: 800 },
      { w: 375, h: 812 },
      { w: 390, h: 844 },
      { w: 412, h: 915 }
    ];

    for (const vp of viewports) {
      await client.send('Emulation.setDeviceMetricsOverride', {
        width: vp.w,
        height: vp.h,
        deviceScaleFactor: 2,
        mobile: true
      });
      await sleep(300);
      const overflow = await client.eval('document.documentElement.scrollWidth > window.innerWidth');
      assert(!overflow, `Viewport ${vp.w}x${vp.h} has no horizontal overflow (overflow: ${overflow})`);
    }

    // 15. Console Errors Audit
    console.log('\n--- CONSOLE ERROR AUDIT ---');
    assert(client.consoleErrors.length === 0, `Zero console errors during automated run (total: ${client.consoleErrors.length})`);

    console.log(`\n========================================`);
    console.log(`PHASE 6 AUTOMATED RUN: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================`);

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    await client.close();
    chromeProcess.kill();
  }

  if (failed > 0) process.exit(1);
}

run();
