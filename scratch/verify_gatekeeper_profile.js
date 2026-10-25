/**
 * Automated End-to-End Verification Suite for Gatekeeper Profile
 * Tests Authentication, Routing, Data Rendering, Privacy, Ownership,
 * Editing Validation, Session Consistency, Persistence, Logout,
 * Home Integration, i18n, A11y (10 controls), Viewports, and Regressions.
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
          const text = (msg.params.args || []).map(a => a.value || a.description || '').join(' ');
          console.error('[Console Error]', text);
          this.consoleErrors.push(text);
        } else if (msg.method === 'Network.responseReceived') {
          const status = msg.params.response?.status;
          const url = msg.params.response?.url;
          if (status >= 400 && !url.includes('favicon.ico')) {
            this.networkErrors.push(`${status} ${url}`);
          }
        }
      };
    });
  }

  async send(method, params = {}) {
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
      const msg = res.exceptionDetails.exception?.description || res.exceptionDetails.text;
      throw new Error(`Eval error: ${msg}`);
    }
    return res.result?.value;
  }

  async setViewport(width, height) {
    await this.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: true
    });
  }
}

async function runVerification() {
  console.log('=============================================================');
  console.log('GRIHAM GATEKEEPER PROFILE — AUTOMATED VERIFICATION SUITE');
  console.log('=============================================================\n');

  // Start static HTTP server on port 8086
  const frontendDir = path.join(__dirname, '..', 'frontend');
  const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    if (reqUrl === '/') reqUrl = '/index.html';
    const filePath = path.join(frontendDir, reqUrl);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      const ext = path.extname(filePath);
      const mimes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.svg': 'image/svg+xml',
        '.json': 'application/json'
      };
      res.writeHead(200, { 'Content-Type': mimes[ext] || 'text/plain' });
      res.end(data);
    });
  });

  const serverProcess = await new Promise((res) => {
    server.listen(8086, '127.0.0.1', () => {
      console.log('Starting local HTTP server on port 8086...');
      res(server);
    });
  });

  // Launch Chrome
  try { execSync('taskkill /F /IM chrome.exe /T', { stdio: 'ignore' }); } catch(e){}
  await sleep(600);

  const chromeUserData = path.join(__dirname, '..', '.test_chrome_profile_gk');
  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${chromeUserData}`,
    '--disable-extensions',
    'http://127.0.0.1:8086/#/gatekeeper/login'
  ], { detached: true, stdio: 'ignore' });

  await sleep(1500);

  const wsUrl = await getDebuggerUrl();
  const cdp = new CDPClient(wsUrl);
  await cdp.connect();
  await cdp.send('Runtime.enable');
  await cdp.send('Network.enable');

  const results = [];
  function assert(name, condition, extra = '') {
    if (condition) {
      console.log(`[PASS] ${name}`);
      results.push({ name, status: 'PASS' });
    } else {
      console.error(`[FAIL] ${name} ${extra ? '-> ' + extra : ''}`);
      results.push({ name, status: 'FAIL', extra });
    }
  }

  // Set standard viewport
  await cdp.setViewport(375, 812);
  await sleep(500);

  // Wait for application scripts to load
  for (let i = 0; i < 40; i++) {
    try {
      const ready = await cdp.eval(`typeof GrihamRouter !== 'undefined' && typeof GrihamAuth !== 'undefined'`);
      if (ready) break;
    } catch (e) {}
    await sleep(200);
  }

  // -------------------------------------------------------------
  // TEST SECTION 1: AUTHENTICATION & GATEKEEPER LOGIN
  // -------------------------------------------------------------
  console.log('\n--- 1. Authentication & Gatekeeper Login ---');
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/login')`);
  await sleep(400);

  await cdp.eval(`
    document.getElementById('gatekeeper-input-society-id').value = 'GRIHAM-PUNE-001';
    document.getElementById('gatekeeper-input-pin').value = '1234';
    document.getElementById('form-gatekeeper-login').dispatchEvent(new Event('submit', { cancelable: true }));
  `);
  await sleep(600);

  const currentHash = await cdp.eval(`window.location.hash`);
  assert('1. Gatekeeper Login redirects to Terminal', currentHash === '#/gatekeeper/home', currentHash);

  const isAuth = await cdp.eval(`GrihamAuth.isAuthenticated() && GrihamAuth.isGatekeeper()`);
  assert('2. Gatekeeper Session Active', isAuth === true);

  const sessionUser = await cdp.eval(`GrihamAuth.getUser()`);
  assert('3. Session contains canonical GTK-001 identity', sessionUser && sessionUser.id === 'GTK-001', JSON.stringify(sessionUser));

  // -------------------------------------------------------------
  // TEST SECTION 2: NAVIGATION & ROUTING
  // -------------------------------------------------------------
  console.log('\n--- 2. Navigation & Route Registration ---');
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/profile')`);
  await sleep(400);

  const profileHash = await cdp.eval(`window.location.hash`);
  assert('4. Navigates directly to /gatekeeper/profile', profileHash === '#/gatekeeper/profile', profileHash);

  const profileActive = await cdp.eval(`
    document.getElementById('screen-gatekeeper-profile').classList.contains('active')
  `);
  assert('5. Screen #screen-gatekeeper-profile is active', profileActive === true);

  const titleText = await cdp.eval(`document.getElementById('gk-profile-header-title').textContent.trim()`);
  assert('6. Header title matches Gatekeeper Profile', titleText === 'Gatekeeper Profile', titleText);

  // -------------------------------------------------------------
  // TEST SECTION 3: PROFILE DATA RENDERING
  // -------------------------------------------------------------
  console.log('\n--- 3. Profile Data Rendering ---');
  const nameDisplay = await cdp.eval(`document.getElementById('gk-profile-name').textContent.trim()`);
  assert('7. Full name renders correctly', nameDisplay === 'Amit Sharma', nameDisplay);

  const idDisplay = await cdp.eval(`document.getElementById('gk-profile-id').textContent.trim()`);
  assert('8. Gatekeeper ID renders GTK-001', idDisplay === 'GTK-001', idDisplay);

  const socDisplay = await cdp.eval(`document.getElementById('gk-profile-society-id').textContent.trim()`);
  assert('9. Society ID renders GRIHAM-PUNE-001', socDisplay === 'GRIHAM-PUNE-001', socDisplay);

  const phoneDisplay = await cdp.eval(`document.getElementById('gk-profile-phone').textContent.trim()`);
  assert('10. Phone renders correctly', phoneDisplay.includes('9876543211'), phoneDisplay);

  const emailDisplay = await cdp.eval(`document.getElementById('gk-profile-email').textContent.trim()`);
  assert('11. Email renders correctly', emailDisplay === 'amit.sharma@example.com', emailDisplay);

  const stationDisplay = await cdp.eval(`document.getElementById('gk-profile-station').textContent.trim()`);
  assert('12. Duty Station renders', stationDisplay.includes('Security Station'), stationDisplay);

  const statusDisplay = await cdp.eval(`document.getElementById('gk-profile-status-text').textContent.trim()`);
  assert('13. Status renders Active', statusDisplay === 'Active', statusDisplay);

  // -------------------------------------------------------------
  // TEST SECTION 4: SECURITY & DATA PRIVACY
  // -------------------------------------------------------------
  console.log('\n--- 4. Security & Data Privacy ---');
  const pageHtml = await cdp.eval(`document.getElementById('screen-gatekeeper-profile').innerHTML`);
  assert('14. Password never exposed in profile view', !pageHtml.toLowerCase().includes('password') || !pageHtml.includes('1234'));
  assert('15. Station PIN never exposed in profile view', !pageHtml.includes('1234') && !pageHtml.includes('station_pin'));
  assert('16. Auth token never exposed in DOM', !pageHtml.includes('mock-jwt-token'));

  // -------------------------------------------------------------
  // TEST SECTION 5: OWNERSHIP & SOCIETY ISOLATION
  // -------------------------------------------------------------
  console.log('\n--- 5. Ownership & Society Isolation ---');
  // Attempt to load another gatekeeper's profile via query params
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/profile?id=GTK-006&society_id=GRIHAM-MUMBAI-002')`);
  await sleep(400);

  const idAfterQuery = await cdp.eval(`document.getElementById('gk-profile-id').textContent.trim()`);
  assert('17. Query manipulation cannot hijack identity (still GTK-001)', idAfterQuery === 'GTK-001', idAfterQuery);

  const socAfterQuery = await cdp.eval(`document.getElementById('gk-profile-society-id').textContent.trim()`);
  assert('18. Society isolation preserved (still GRIHAM-PUNE-001)', socAfterQuery === 'GRIHAM-PUNE-001', socAfterQuery);

  // Reset route back to clean #/gatekeeper/profile
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/profile')`);
  await sleep(300);

  // -------------------------------------------------------------
  // TEST SECTION 6: GATEKEEPER HOME INTEGRATION
  // -------------------------------------------------------------
  console.log('\n--- 6. Gatekeeper Home Integration ---');
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/home')`);
  await sleep(400);

  // Open terminal options menu
  await cdp.eval(`GrihamGatekeeperHomeUI.toggleMenu(true)`);
  await sleep(300);

  const profileMenuItemExists = await cdp.eval(`!!document.getElementById('btn-gk-menu-profile')`);
  assert('19. Gatekeeper Profile option exists in terminal menu', profileMenuItemExists === true);

  // Click Profile option
  await cdp.eval(`document.getElementById('btn-gk-menu-profile').click()`);
  await sleep(400);

  const reachedProfileHash = await cdp.eval(`window.location.hash`);
  assert('20. Menu click navigates to /gatekeeper/profile', reachedProfileHash === '#/gatekeeper/profile', reachedProfileHash);

  // -------------------------------------------------------------
  // TEST SECTION 7: EDIT PROFILE MODAL & VALIDATION
  // -------------------------------------------------------------
  console.log('\n--- 7. Profile Editing Flow & Validation ---');
  // Open edit sheet
  await cdp.eval(`document.getElementById('btn-open-edit-gk-profile').click()`);
  await sleep(300);

  const editSheetOpen = await cdp.eval(`
    document.getElementById('sheet-gk-edit-profile').classList.contains('active')
  `);
  assert('21. Edit Profile bottom sheet opens', editSheetOpen === true);

  const editNameVal = await cdp.eval(`document.getElementById('gk-edit-name').value`);
  assert('22. Existing name prefilled in form', editNameVal === 'Amit Sharma', editNameVal);

  const editPhoneVal = await cdp.eval(`document.getElementById('gk-edit-phone').value`);
  assert('23. Existing phone prefilled in form', editPhoneVal.includes('9876543211'), editPhoneVal);

  const editIdDisabled = await cdp.eval(`document.getElementById('gk-edit-id').disabled`);
  assert('24. Gatekeeper ID is read-only / disabled', editIdDisabled === true);

  const editSocDisabled = await cdp.eval(`document.getElementById('gk-edit-society-id').disabled`);
  assert('25. Society ID is read-only / disabled', editSocDisabled === true);

  // Validation 1: Required Name
  await cdp.eval(`
    document.getElementById('gk-edit-name').value = '';
    document.getElementById('form-gk-edit-profile').dispatchEvent(new Event('submit', { cancelable: true }));
  `);
  await sleep(200);

  const nameErr = await cdp.eval(`document.getElementById('gk-edit-name-err').textContent.trim()`);
  assert('26. Empty name rejected with validation message', nameErr.length > 0, nameErr);

  // Validation 2: Invalid Phone
  await cdp.eval(`
    document.getElementById('gk-edit-name').value = 'Amit Sharma';
    document.getElementById('gk-edit-phone').value = '12345';
    document.getElementById('form-gk-edit-profile').dispatchEvent(new Event('submit', { cancelable: true }));
  `);
  await sleep(200);

  const phoneErr = await cdp.eval(`document.getElementById('gk-edit-phone-err').textContent.trim()`);
  assert('27. Invalid phone rejected with validation message', phoneErr.length > 0, phoneErr);

  // Validation 3: Invalid Email
  await cdp.eval(`
    document.getElementById('gk-edit-phone').value = '+919876543211';
    document.getElementById('gk-edit-email').value = 'not-an-email';
    document.getElementById('form-gk-edit-profile').dispatchEvent(new Event('submit', { cancelable: true }));
  `);
  await sleep(200);

  const emailErr = await cdp.eval(`document.getElementById('gk-edit-email-err').textContent.trim()`);
  assert('28. Invalid email rejected with validation message', emailErr.length > 0, emailErr);

  // Cancel action restores state
  await cdp.eval(`document.getElementById('btn-cancel-gk-edit').click()`);
  await sleep(300);

  const editSheetClosed = await cdp.eval(`
    !document.getElementById('sheet-gk-edit-profile').classList.contains('active')
  `);
  assert('29. Cancel closes edit sheet without saving', editSheetClosed === true);

  // -------------------------------------------------------------
  // TEST SECTION 8: SUCCESSFUL SAVE & SESSION CONSISTENCY
  // -------------------------------------------------------------
  console.log('\n--- 8. Save Changes & Session Synchronization ---');
  // Re-open and apply valid changes
  await cdp.eval(`document.getElementById('btn-open-edit-gk-profile').click()`);
  await sleep(300);

  await cdp.eval(`
    document.getElementById('gk-edit-name').value = 'Amit S. Sharma';
    document.getElementById('gk-edit-phone').value = '+919876543299';
    document.getElementById('gk-edit-email').value = 'amit.updated@example.com';
    document.getElementById('form-gk-edit-profile').dispatchEvent(new Event('submit', { cancelable: true }));
  `);
  await sleep(500);

  const updatedNameDisplay = await cdp.eval(`document.getElementById('gk-profile-name').textContent.trim()`);
  assert('30. Profile name updated in view', updatedNameDisplay === 'Amit S. Sharma', updatedNameDisplay);

  const updatedPhoneDisplay = await cdp.eval(`document.getElementById('gk-profile-phone').textContent.trim()`);
  assert('31. Profile phone updated in view', updatedPhoneDisplay === '+919876543299', updatedPhoneDisplay);

  const updatedEmailDisplay = await cdp.eval(`document.getElementById('gk-profile-email').textContent.trim()`);
  assert('32. Profile email updated in view', updatedEmailDisplay === 'amit.updated@example.com', updatedEmailDisplay);

  // Session consistency check
  const updatedSessionUser = await cdp.eval(`GrihamAuth.getUser()`);
  assert('33. GrihamAuth user session synchronized with updated name', updatedSessionUser.name === 'Amit S. Sharma', updatedSessionUser.name);
  assert('34. GrihamAuth user session synchronized with updated phone', updatedSessionUser.phone === '+919876543299', updatedSessionUser.phone);

  // Verify Terminal Home displays updated guard name
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/home')`);
  await sleep(400);

  const homeGuardName = await cdp.eval(`document.getElementById('gk-guard-name').textContent.trim()`);
  assert('35. Gatekeeper Home automatically displays updated guard name', homeGuardName === 'Amit S. Sharma', homeGuardName);

  // Return to Profile
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/profile')`);
  await sleep(400);

  // -------------------------------------------------------------
  // TEST SECTION 9: CANONICAL LOGOUT FLOW
  // -------------------------------------------------------------
  console.log('\n--- 9. Canonical Logout Flow ---');
  // Trigger logout modal
  await cdp.eval(`document.getElementById('btn-gk-profile-logout').click()`);
  await sleep(300);

  const logoutSheetOpen = await cdp.eval(`
    document.getElementById('sheet-gk-profile-logout').classList.contains('active')
  `);
  assert('36. Logout confirmation sheet opens', logoutSheetOpen === true);

  // Cancel logout
  await cdp.eval(`document.getElementById('btn-cancel-gk-profile-logout').click()`);
  await sleep(300);

  const logoutSheetClosed = await cdp.eval(`
    !document.getElementById('sheet-gk-profile-logout').classList.contains('active')
  `);
  assert('37. Cancel dismisses logout sheet', logoutSheetClosed === true);

  // Re-open and confirm logout
  await cdp.eval(`document.getElementById('btn-gk-profile-logout').click()`);
  await sleep(300);
  await cdp.eval(`document.getElementById('btn-confirm-gk-profile-logout').click()`);
  await sleep(600);

  const postLogoutHash = await cdp.eval(`window.location.hash`);
  assert('38. Canonical logout redirects to /gatekeeper/login', postLogoutHash === '#/gatekeeper/login', postLogoutHash);

  const postLogoutAuth = await cdp.eval(`GrihamAuth.isAuthenticated()`);
  assert('39. Session is completely cleared', postLogoutAuth === false);

  // Attempt to access protected profile while logged out
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/profile')`);
  await sleep(400);

  const blockedHash = await cdp.eval(`window.location.hash`);
  assert('40. Unauthenticated access blocked -> redirected to login', blockedHash === '#/gatekeeper/login', blockedHash);

  // -------------------------------------------------------------
  // TEST SECTION 10: ROLE AUTHORIZATION GUARDS
  // -------------------------------------------------------------
  console.log('\n--- 10. Role Authorization Guards ---');
  // Resident blocked from Gatekeeper Profile
  await cdp.eval(`
    GrihamAuth.setSession('test-res-token', {
      id: 'USR-001',
      name: 'Rajesh Kumar',
      role: 'resident',
      society_id: 'GRIHAM-PUNE-001',
      wing: 'A',
      approval: 'Approved'
    }, 'GRIHAM-PUNE-001');
    GrihamRouter.navigate('/gatekeeper/profile');
  `);
  await sleep(400);

  const resBlockedHash = await cdp.eval(`window.location.hash`);
  assert('41. Resident role blocked from Gatekeeper Profile', resBlockedHash === '#/resident/home', resBlockedHash);

  // Admin blocked from Gatekeeper Profile
  await cdp.eval(`
    GrihamAuth.setSession('test-adm-token', {
      id: 'ADM-001',
      name: 'Society Chairman',
      role: 'admin',
      society_id: 'GRIHAM-PUNE-001'
    }, 'GRIHAM-PUNE-001');
    GrihamRouter.navigate('/gatekeeper/profile');
  `);
  await sleep(400);

  const admBlockedHash = await cdp.eval(`window.location.hash`);
  assert('42. Admin role blocked from Gatekeeper Profile', admBlockedHash === '#/admin/home', admBlockedHash);

  // Re-login gatekeeper for remaining checks
  await cdp.eval(`
    GrihamAuth.setSession('test-gk-token', {
      id: 'GTK-001',
      name: 'Amit Sharma',
      role: 'gatekeeper',
      station: 'Main Gate Security Station',
      society_id: 'GRIHAM-PUNE-001',
      societyName: 'Green Valley Residency'
    }, 'GRIHAM-PUNE-001');
    GrihamRouter.navigate('/gatekeeper/profile');
  `);
  await sleep(400);

  // -------------------------------------------------------------
  // TEST SECTION 11: I18N (ENGLISH, HINDI, MARATHI)
  // -------------------------------------------------------------
  console.log('\n--- 11. Internationalization (i18n) ---');
  // English
  await cdp.eval(`GrihamI18n.setLanguage('en')`);
  await sleep(300);
  const enTitle = await cdp.eval(`document.getElementById('gk-profile-header-title').textContent.trim()`);
  assert('43. English translation works', enTitle === 'Gatekeeper Profile', enTitle);

  // Hindi
  await cdp.eval(`GrihamI18n.setLanguage('hi')`);
  await sleep(300);
  const hiTitle = await cdp.eval(`document.getElementById('gk-profile-header-title').textContent.trim()`);
  assert('44. Hindi translation works', hiTitle === 'गेटकीपर प्रोफाइल', hiTitle);

  // Marathi
  await cdp.eval(`GrihamI18n.setLanguage('mr')`);
  await sleep(300);
  const mrTitle = await cdp.eval(`document.getElementById('gk-profile-header-title').textContent.trim()`);
  assert('45. Marathi translation works', mrTitle === 'गेटकीपर प्रोफाइल', mrTitle);

  // Reset to English
  await cdp.eval(`GrihamI18n.setLanguage('en')`);
  await sleep(300);

  // -------------------------------------------------------------
  // TEST SECTION 12: ACCESSIBILITY (ALL 10 CONTROLS)
  // -------------------------------------------------------------
  console.log('\n--- 12. Accessibility Controls (10 Controls) ---');
  // 1. Bigger Text
  await cdp.eval(`GrihamA11y.stepTextSize(1)`);
  assert('46.1. A11y: Bigger Text', (await cdp.eval(`GrihamA11y.state.textScale`)) > 1.0);

  // 2. Smaller Text
  await cdp.eval(`GrihamA11y.stepTextSize(-1)`);
  assert('46.2. A11y: Smaller Text', (await cdp.eval(`GrihamA11y.state.textScale`)) === 1.0);

  // 3. Text Spacing
  await cdp.eval(`GrihamA11y.setTextSpacing(true)`);
  assert('46.3. A11y: Text Spacing', await cdp.eval(`document.documentElement.classList.contains('accessibility-text-spacing')`));

  // 4. Line Height
  await cdp.eval(`GrihamA11y.setLineHeight(true)`);
  assert('46.4. A11y: Line Height', await cdp.eval(`document.documentElement.classList.contains('accessibility-line-height')`));

  // 5. Saturation
  await cdp.eval(`GrihamA11y.setSaturation('high')`);
  assert('46.5. A11y: Saturation', (await cdp.eval(`GrihamA11y.state.saturation`)) === 'high');

  // 6. Invert Colors
  await cdp.eval(`GrihamA11y.setInvertColors(true)`);
  assert('46.6. A11y: Invert Colors', await cdp.eval(`document.documentElement.classList.contains('accessibility-invert')`));

  // 7. Large Cursor
  await cdp.eval(`GrihamA11y.setLargeCursor(true)`);
  assert('46.7. A11y: Large Cursor', await cdp.eval(`document.documentElement.classList.contains('accessibility-large-cursor')`));

  // 8. Pause Animation
  await cdp.eval(`GrihamA11y.setPauseAnimation(true)`);
  assert('46.8. A11y: Pause Animation', await cdp.eval(`document.documentElement.classList.contains('accessibility-reduce-motion')`));

  // 9. Hide Images
  await cdp.eval(`GrihamA11y.setHideImages(true)`);
  assert('46.9. A11y: Hide Images', await cdp.eval(`document.documentElement.classList.contains('accessibility-hide-images')`));

  // 10. Reset All Settings
  await cdp.eval(`GrihamA11y.resetAllSettings()`);
  await sleep(150);
  const resetComplete = await cdp.eval(`
    GrihamA11y.state.textScale === 1.0 &&
    !document.documentElement.classList.contains('accessibility-text-spacing') &&
    !document.documentElement.classList.contains('accessibility-line-height') &&
    !document.documentElement.classList.contains('accessibility-invert') &&
    !document.documentElement.classList.contains('accessibility-large-cursor') &&
    !document.documentElement.classList.contains('accessibility-reduce-motion') &&
    !document.documentElement.classList.contains('accessibility-hide-images')
  `);
  assert('46.10. A11y: Reset All Settings', resetComplete === true);

  // -------------------------------------------------------------
  // TEST SECTION 13: RESPONSIVE VIEWPORTS & ZERO OVERFLOW
  // -------------------------------------------------------------
  console.log('\n--- 13. Responsive Mobile Viewports ---');
  const viewports = [
    { w: 360, h: 800, name: '360x800' },
    { w: 375, h: 812, name: '375x812' },
    { w: 390, h: 844, name: '390x844' },
    { w: 412, h: 915, name: '412x915' }
  ];

  for (let i = 0; i < viewports.length; i++) {
    const vp = viewports[i];
    await cdp.setViewport(vp.w, vp.h);
    await sleep(300);

    const overflow = await cdp.eval(`
      document.documentElement.scrollWidth > window.innerWidth ||
      document.body.scrollWidth > window.innerWidth ||
      document.getElementById('screen-gatekeeper-profile').scrollWidth > window.innerWidth
    `);

    assert(`47.${i + 1}. Viewport ${vp.name} zero horizontal overflow`, overflow === false);
  }

  // -------------------------------------------------------------
  // TEST SECTION 14: SYSTEM REGRESSION CHECKS
  // -------------------------------------------------------------
  console.log('\n--- 14. System Regression Checks ---');
  // 1. Gatekeeper Home
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/home')`);
  await sleep(350);
  assert('48. Gatekeeper Home renders without regression', await cdp.eval(`document.getElementById('screen-gatekeeper-home').classList.contains('active')`));

  // 2. Visitor Management
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/visitors')`);
  await sleep(350);
  assert('49. Visitor Management renders without regression', await cdp.eval(`document.getElementById('screen-gatekeeper-visitors').classList.contains('active')`));

  // 3. Delivery Management
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/deliveries')`);
  await sleep(350);
  assert('50. Delivery Management renders without regression', await cdp.eval(`document.getElementById('screen-gatekeeper-deliveries').classList.contains('active')`));

  // 4. Gatekeeper Notifications
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/notifications')`);
  await sleep(350);
  assert('51. Gatekeeper Notifications renders without regression', await cdp.eval(`document.getElementById('screen-gatekeeper-notifications').classList.contains('active')`));

  // 5. Admin Dashboard
  await cdp.eval(`
    GrihamAuth.setSession('test-adm-token', { id: 'ADM-001', role: 'admin', society_id: 'GRIHAM-PUNE-001' }, 'GRIHAM-PUNE-001');
    GrihamRouter.navigate('/admin/home');
  `);
  await sleep(350);
  assert('52. Admin Dashboard renders without regression', await cdp.eval(`document.getElementById('screen-admin-home').classList.contains('active')`));

  // 6. Resident Home
  await cdp.eval(`
    GrihamAuth.setSession('test-res-token', { id: 'USR-001', role: 'resident', society_id: 'GRIHAM-PUNE-001', wing: 'A', approval: 'Approved' }, 'GRIHAM-PUNE-001');
    GrihamRouter.navigate('/resident/home');
  `);
  await sleep(350);
  assert('53. Resident Home renders without regression', await cdp.eval(`document.getElementById('screen-resident-home').classList.contains('active')`));

  // -------------------------------------------------------------
  // TEST SECTION 15: RUNTIME CONSOLE & NETWORK AUDIT
  // -------------------------------------------------------------
  console.log('\n--- 15. Console & Network Runtime Audit ---');
  assert('54. Zero unhandled console errors', cdp.consoleErrors.length === 0, cdp.consoleErrors.join(' | '));
  assert('55. Zero network resource failures (200 OK)', cdp.networkErrors.length === 0, cdp.networkErrors.join(' | '));

  console.log('\n=============================================================');
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  console.log(`TOTAL CHECKS: ${results.length} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('=============================================================\n');

  // Cleanup
  try {
    process.kill(-chromeProcess.pid);
  } catch (e) {
    try { execSync('taskkill /F /IM chrome.exe /T', { stdio: 'ignore' }); } catch(err){}
  }
  if (serverProcess) {
    serverProcess.close();
  }

  process.exit(failed === 0 ? 0 : 1);
}

runVerification().catch(err => {
  console.error('Fatal test error:', err);
  try { execSync('taskkill /F /IM chrome.exe /T', { stdio: 'ignore' }); } catch(e){}
  process.exit(1);
});
