/**
 * Automated End-to-End Verification Suite for Gatekeeper Notifications
 * Connected to Chrome CDP on port 9222
 */
const { spawn, execSync } = require('child_process');
const http = require('http');

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
          const isExpected = text.includes('401') || text.includes('Invalid credentials') ||
            text.includes('[RouteGuard] Unauthorized') || text.includes('Unauthenticated access') ||
            text.includes('already marked') || text.includes('[API Error]');
          if (!isExpected) {
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
    return res.result ? res.result.value : undefined;
  }

  async setViewport(w, h) {
    await this.send('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: h,
      deviceScaleFactor: 2,
      mobile: true
    });
  }
}

async function runVerification() {
  console.log('=== STARTING AUTOMATED VERIFICATION: GATEKEEPER NOTIFICATIONS ===\n');

  // Start local HTTP server
  const fs = require('fs');
  const path = require('path');
  const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, '..', 'frontend', req.url.split('?')[0]);
    if (req.url === '/' || req.url.startsWith('/?')) filePath = path.join(__dirname, '..', 'frontend', 'index.html');
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

  const chromeUserData = path.join(__dirname, '..', '.test_chrome_profile_notif');
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

  // Set standard iPhone viewport
  await cdp.setViewport(375, 812);
  await sleep(500);

  // -------------------------------------------------------------
  // TEST SECTION 1: AUTHENTICATION & GATEKEEPER LOGIN
  // -------------------------------------------------------------
  console.log('\n--- 1. Authentication & Gatekeeper Login ---');
  await cdp.eval(`
    GrihamRouter.navigate('/gatekeeper/login');
  `);
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

  // -------------------------------------------------------------
  // TEST SECTION 2: NAVIGATION & ROUTE REGISTRATION
  // -------------------------------------------------------------
  console.log('\n--- 2. Navigation & Role Access Guard ---');
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/notifications')`);
  await sleep(400);

  const notifHash = await cdp.eval(`window.location.hash`);
  assert('3. Navigates directly to /gatekeeper/notifications', notifHash === '#/gatekeeper/notifications', notifHash);

  const notifScreenActive = await cdp.eval(`
    document.getElementById('screen-gatekeeper-notifications').classList.contains('active')
  `);
  assert('4. Screen #screen-gatekeeper-notifications is active', notifScreenActive === true);

  const titleText = await cdp.eval(`document.getElementById('gk-notif-header-title').textContent.trim()`);
  assert('5. Header title correctly set for Notifications', titleText.includes('Notifications') || titleText.includes('सूचना'), titleText);

  // -------------------------------------------------------------
  // TEST SECTION 3: CANONICAL DATA & SUMMARY COUNTS
  // -------------------------------------------------------------
  console.log('\n--- 3. Canonical Data & Summary Counts ---');
  const totalCount = await cdp.eval(`parseInt(document.getElementById('gk-sum-val-total').textContent.trim())`);
  const unreadCount = await cdp.eval(`parseInt(document.getElementById('gk-sum-val-unread').textContent.trim())`);
  const readCount = await cdp.eval(`parseInt(document.getElementById('gk-sum-val-read').textContent.trim())`);

  assert('6. Total notification count is positive', totalCount > 0, `Total: ${totalCount}`);
  assert('7. Summary total equals unread + read', totalCount === (unreadCount + readCount), `Unread: ${unreadCount}, Read: ${readCount}`);

  // -------------------------------------------------------------
  // TEST SECTION 4: SOCIETY ISOLATION & AUDIENCE FILTERING
  // -------------------------------------------------------------
  console.log('\n--- 4. Society Isolation & Audience Targeting ---');
  const renderedNotifs = await cdp.eval(`
    GrihamGatekeeperNotificationsUI.notifications.map(n => ({ id: n.id, title: n.title, target: n.target, society: n.society_id }))
  `);

  const hasMumbaiNotif = renderedNotifs.some(n => n.id === 'notif-9' || n.society === 'GRIHAM-MUMBAI-002');
  assert('8. Society Data Isolation: Mumbai society notice hidden from Pune gatekeeper', hasMumbaiNotif === false);

  const hasWingOnlyNotif = renderedNotifs.some(n => n.id === 'notif-4' || n.id === 'notif-5');
  assert('9. Audience Targeting: Wing-only notices (Wing C / Wing A) excluded from security terminal', hasWingOnlyNotif === false);

  const hasGatekeeperNotice = renderedNotifs.some(n => n.id === 'notif-7' || n.id === 'notif-8');
  assert('10. Audience Targeting: Security & gatekeeper notices included in terminal list', hasGatekeeperNotice === true);

  const hasSocietyWideNotice = renderedNotifs.some(n => n.id === 'notif-1');
  assert('11. Audience Targeting: Society-wide announcements (Water update) included in terminal list', hasSocietyWideNotice === true);

  // -------------------------------------------------------------
  // TEST SECTION 5: NOTIFICATION CARDS LIST RENDERING
  // -------------------------------------------------------------
  console.log('\n--- 5. Notification Cards List Rendering ---');
  const cardCount = await cdp.eval(`document.querySelectorAll('#gk-notif-list-container .gk-notif-card').length`);
  assert('12. Notification cards rendered in list', cardCount > 0, `Cards: ${cardCount}`);

  const hasUnreadStyling = await cdp.eval(`
    document.querySelectorAll('#gk-notif-list-container .gk-notif-card.unread').length > 0
  `);
  assert('13. Unread notification cards have subtle visual distinction class (.unread)', hasUnreadStyling === true);

  // -------------------------------------------------------------
  // TEST SECTION 6: SEARCH & FILTERING
  // -------------------------------------------------------------
  console.log('\n--- 6. Search & Status/Category Filtering ---');
  // 1. Search by title
  await cdp.eval(`GrihamGatekeeperNotificationsUI.handleSearch('Verification')`);
  await sleep(350);
  const searchMatchCount = await cdp.eval(`document.querySelectorAll('#gk-notif-list-container .gk-notif-card').length`);
  const searchMatchTitle = await cdp.eval(`document.querySelector('#gk-notif-list-container .gk-notif-card .vcard-name')?.textContent || ''`);
  assert('14. Search by keyword returns matching notification', searchMatchCount === 1 && searchMatchTitle.includes('Verification'), `Found: ${searchMatchCount}, Title: ${searchMatchTitle}`);

  // Clear search
  await cdp.eval(`GrihamGatekeeperNotificationsUI.clearSearch()`);
  await sleep(300);

  // 2. Filter by Unread
  await cdp.eval(`GrihamGatekeeperNotificationsUI.setFilter('Unread')`);
  await sleep(300);
  const unreadCardCount = await cdp.eval(`document.querySelectorAll('#gk-notif-list-container .gk-notif-card').length`);
  assert('15. Filter by Unread isolates unread records', unreadCardCount === unreadCount, `Rendered: ${unreadCardCount}, Expected: ${unreadCount}`);

  // 3. Filter by Read
  await cdp.eval(`GrihamGatekeeperNotificationsUI.setFilter('Read')`);
  await sleep(300);
  const readCardCount = await cdp.eval(`document.querySelectorAll('#gk-notif-list-container .gk-notif-card').length`);
  assert('16. Filter by Read isolates read records', readCardCount === readCount, `Rendered: ${readCardCount}, Expected: ${readCount}`);

  // 4. Filter by Security Category
  await cdp.eval(`GrihamGatekeeperNotificationsUI.setFilter('Security')`);
  await sleep(300);
  const secCardCount = await cdp.eval(`document.querySelectorAll('#gk-notif-list-container .gk-notif-card').length`);
  assert('17. Category filter Security isolates security notices', secCardCount > 0, `Security notices: ${secCardCount}`);

  // Reset to All
  await cdp.eval(`GrihamGatekeeperNotificationsUI.setFilter('All')`);
  await sleep(300);

  // -------------------------------------------------------------
  // TEST SECTION 7: NOTIFICATION DETAIL BOTTOM SHEET
  // -------------------------------------------------------------
  console.log('\n--- 7. Notification Detail Bottom Sheet ---');
  await cdp.eval(`GrihamGatekeeperNotificationsUI.openDetail('notif-7')`);
  await sleep(350);

  const detailActive = await cdp.eval(`document.getElementById('sheet-gk-notif-detail').classList.contains('active')`);
  assert('18. Detail bottom sheet opens cleanly', detailActive === true);

  const detailTitle = await cdp.eval(`document.getElementById('gk-detail-content-heading').textContent`);
  const detailMessage = await cdp.eval(`document.getElementById('gk-detail-message').textContent`);
  assert('19. Detail sheet displays correct full notification content', detailTitle.includes('Verification') && detailMessage.includes('valid ID'), detailTitle);

  // Close sheet
  await cdp.eval(`GrihamGatekeeperNotificationsUI.closeDetail()`);
  await sleep(250);
  const detailClosed = await cdp.eval(`!document.getElementById('sheet-gk-notif-detail').classList.contains('active')`);
  assert('20. Detail sheet closes cleanly', detailClosed === true);

  // -------------------------------------------------------------
  // TEST SECTION 8: READ / UNREAD STATUS LIFECYCLE
  // -------------------------------------------------------------
  console.log('\n--- 8. Read / Unread Status Lifecycle ---');
  // notif-7 was initially unread. Toggle it to Read.
  await cdp.eval(`GrihamGatekeeperNotificationsUI.toggleReadStatus('notif-7')`);
  await sleep(350);

  const notif7StatusAfterRead = await cdp.eval(`
    GrihamGatekeeperNotificationsUI.notifications.find(n => n.id === 'notif-7').is_read
  `);
  assert('21. Notification marked as Read', notif7StatusAfterRead === true);

  const unreadCountAfterMarkRead = await cdp.eval(`parseInt(document.getElementById('gk-sum-val-unread').textContent)`);
  assert('22. Unread counter decrements after marking read', unreadCountAfterMarkRead === unreadCount - 1, `New: ${unreadCountAfterMarkRead}`);

  // Toggle notif-7 back to Unread
  await cdp.eval(`GrihamGatekeeperNotificationsUI.toggleReadStatus('notif-7')`);
  await sleep(350);

  const notif7StatusAfterUnread = await cdp.eval(`
    GrihamGatekeeperNotificationsUI.notifications.find(n => n.id === 'notif-7').unread
  `);
  assert('23. Notification marked as Unread', notif7StatusAfterUnread === true);

  // Per-user read state isolation: Verify canonical record read_by array
  const readByArray = await cdp.eval(`
    window.MOCK_NOTIFICATIONS_DB.notifications.find(n => n.id === 'notif-8').read_by
  `);
  assert('24. Canonical read_by array models per-user read state accurately', Array.isArray(readByArray) && readByArray.includes('GTK-001'), JSON.stringify(readByArray));

  // -------------------------------------------------------------
  // TEST SECTION 9: GATEKEEPER HOME INTEGRATION
  // -------------------------------------------------------------
  console.log('\n--- 9. Gatekeeper Home Integration ---');
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/home')`);
  await sleep(400);

  const homeScreenActive = await cdp.eval(`document.getElementById('screen-gatekeeper-home').classList.contains('active')`);
  assert('25. Navigated back to Gatekeeper Home', homeScreenActive === true);

  const homeBellExists = await cdp.eval(`!!document.getElementById('btn-gk-notifications')`);
  assert('26. Terminal topbar features Notification Bell entry point', homeBellExists === true);

  const homeBadgeText = await cdp.eval(`document.getElementById('gk-home-notif-badge')?.textContent.trim()`);
  assert('27. Terminal Notification Bell reflects live canonical unread count', parseInt(homeBadgeText) > 0, `Badge count: ${homeBadgeText}`);

  // Open notifications via bell
  await cdp.eval(`document.getElementById('btn-gk-notifications').click()`);
  await sleep(400);
  const landedOnNotifs = await cdp.eval(`window.location.hash === '#/gatekeeper/notifications'`);
  assert('28. Notification Bell navigates to /gatekeeper/notifications', landedOnNotifs === true);

  // -------------------------------------------------------------
  // TEST SECTION 10: INTERNATIONALIZATION (EN, HI, MR)
  // -------------------------------------------------------------
  console.log('\n--- 10. Internationalization ---');
  // Hindi
  await cdp.eval(`GrihamI18n.setLanguage('hi')`);
  await sleep(300);
  const titleHi = await cdp.eval(`document.getElementById('gk-notif-header-title').textContent.trim()`);
  assert('29. Hindi i18n applied to Gatekeeper Notifications', titleHi.includes('सूचनाएं') || titleHi.includes('सूचना'), titleHi);

  // Marathi
  await cdp.eval(`GrihamI18n.setLanguage('mr')`);
  await sleep(300);
  const titleMr = await cdp.eval(`document.getElementById('gk-notif-header-title').textContent.trim()`);
  assert('30. Marathi i18n applied to Gatekeeper Notifications', titleMr.includes('सूचना'), titleMr);

  // Restore English
  await cdp.eval(`GrihamI18n.setLanguage('en')`);
  await sleep(250);

  // -------------------------------------------------------------
  // TEST SECTION 11: ACCESSIBILITY (10 CONTROLS)
  // -------------------------------------------------------------
  console.log('\n--- 11. Accessibility Panel (10 Controls) ---');
  // 1. Bigger Text
  await cdp.eval(`GrihamA11y.stepTextSize(1)`);
  assert('31. A11y: Bigger Text', (await cdp.eval(`GrihamA11y.state.textScale`)) > 1.0);

  // 2. Smaller Text
  await cdp.eval(`GrihamA11y.stepTextSize(-1)`);
  assert('32. A11y: Smaller Text', (await cdp.eval(`GrihamA11y.state.textScale`)) === 1.0);

  // 3. Text Spacing
  await cdp.eval(`GrihamA11y.setTextSpacing(true)`);
  assert('33. A11y: Text Spacing', await cdp.eval(`document.documentElement.classList.contains('accessibility-text-spacing')`));

  // 4. Line Height
  await cdp.eval(`GrihamA11y.setLineHeight(true)`);
  assert('34. A11y: Line Height', await cdp.eval(`document.documentElement.classList.contains('accessibility-line-height')`));

  // 5. Saturation
  await cdp.eval(`GrihamA11y.setSaturation('high')`);
  assert('35. A11y: Saturation', (await cdp.eval(`GrihamA11y.state.saturation`)) === 'high');

  // 6. Invert Colors
  await cdp.eval(`GrihamA11y.setInvertColors(true)`);
  assert('36. A11y: Invert Colors', await cdp.eval(`document.documentElement.classList.contains('accessibility-invert')`));

  // 7. Large Cursor
  await cdp.eval(`GrihamA11y.setLargeCursor(true)`);
  assert('37. A11y: Large Cursor', await cdp.eval(`document.documentElement.classList.contains('accessibility-large-cursor')`));

  // 8. Pause Animation
  await cdp.eval(`GrihamA11y.setPauseAnimation(true)`);
  assert('38. A11y: Pause Animation', await cdp.eval(`document.documentElement.classList.contains('accessibility-reduce-motion')`));

  // 9. Hide Images
  await cdp.eval(`GrihamA11y.setHideImages(true)`);
  assert('39. A11y: Hide Images', await cdp.eval(`document.documentElement.classList.contains('accessibility-hide-images')`));

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
  assert('40. A11y: Reset All Settings', resetComplete === true);

  // -------------------------------------------------------------
  // TEST SECTION 12: RESPONSIVE VIEWPORTS & ZERO OVERFLOW
  // -------------------------------------------------------------
  console.log('\n--- 12. Responsive Viewports & Zero Overflow ---');
  const viewports = [
    { name: '360x800 (Compact Mobile)', w: 360, h: 800 },
    { name: '375x812 (Standard iPhone)', w: 375, h: 812 },
    { name: '390x844 (Modern iPhone)', w: 390, h: 844 },
    { name: '412x915 (Android Large)', w: 412, h: 915 }
  ];

  for (const vp of viewports) {
    await cdp.setViewport(vp.w, vp.h);
    await sleep(250);
    const overflow = await cdp.eval(`
      document.documentElement.scrollWidth > window.innerWidth ||
      document.getElementById('screen-gatekeeper-notifications').scrollWidth > window.innerWidth
    `);
    assert(`41. Responsive ${vp.name} zero horizontal overflow`, overflow === false);
  }

  // Restore standard iPhone viewport
  await cdp.setViewport(375, 812);

  // -------------------------------------------------------------
  // TEST SECTION 13: ROLE ISOLATION & PERMISSION GUARDS
  // -------------------------------------------------------------
  console.log('\n--- 13. Role Isolation & Permission Security ---');
  await cdp.eval(`GrihamRouter.navigate('/entry')`);
  await sleep(350);

  // Resident denied
  await cdp.eval(`
    GrihamAuth.setSession('mock-res-token', { role: 'resident', society_id: 'GRIHAM-PUNE-001' }, 'GRIHAM-PUNE-001');
    GrihamRouter.navigate('/gatekeeper/notifications');
  `);
  await sleep(400);
  const residentRedirect = await cdp.eval(`window.location.hash`);
  assert('42. Resident denied access -> redirected to /resident/home', residentRedirect === '#/resident/home', residentRedirect);

  await cdp.eval(`GrihamRouter.navigate('/entry')`);
  await sleep(350);

  // Admin denied
  await cdp.eval(`
    GrihamAuth.setSession('mock-adm-token', { role: 'admin', society_id: 'GRIHAM-PUNE-001' }, 'GRIHAM-PUNE-001');
    GrihamRouter.navigate('/gatekeeper/notifications');
  `);
  await sleep(400);
  const adminRedirect = await cdp.eval(`window.location.hash`);
  assert('43. Admin denied access -> redirected to /admin/home', adminRedirect === '#/admin/home', adminRedirect);

  await cdp.eval(`GrihamRouter.navigate('/entry')`);
  await sleep(350);

  // Unauthenticated denied
  await cdp.eval(`
    GrihamAuth.clearSession();
    GrihamRouter.navigate('/gatekeeper/notifications');
  `);
  await sleep(400);
  const unauthRedirect = await cdp.eval(`window.location.hash`);
  assert('44. Unauthenticated denied access -> redirected to /gatekeeper/login', unauthRedirect === '#/gatekeeper/login', unauthRedirect);

  // -------------------------------------------------------------
  // TEST SECTION 14: SYSTEM REGRESSION CHECKS
  // -------------------------------------------------------------
  console.log('\n--- 14. System Regression Checks ---');
  // Re-login gatekeeper
  await cdp.eval(`
    GrihamAuth.setSession('test-token', {
      id: 'GTK-001',
      name: 'Ramesh Patil',
      role: 'gatekeeper',
      station: 'Main Gate Security Station',
      society_id: 'GRIHAM-PUNE-001',
      societyName: 'Green Valley Residency'
    }, 'GRIHAM-PUNE-001');
  `);

  // 1. Gatekeeper Home
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/home')`);
  await sleep(350);
  assert('45. Gatekeeper Home renders without regression', await cdp.eval(`document.getElementById('screen-gatekeeper-home').classList.contains('active')`));

  // 2. Visitor Management
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/visitors')`);
  await sleep(350);
  assert('46. Visitor Management renders without regression', await cdp.eval(`document.getElementById('screen-gatekeeper-visitors').classList.contains('active')`));

  // 3. Delivery Management
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/deliveries')`);
  await sleep(350);
  assert('47. Delivery Management renders without regression', await cdp.eval(`document.getElementById('screen-gatekeeper-deliveries').classList.contains('active')`));

  // 4. Admin Notifications
  await cdp.eval(`
    GrihamAuth.setSession('test-adm-token', { id: 'ADM-001', role: 'admin', society_id: 'GRIHAM-PUNE-001' }, 'GRIHAM-PUNE-001');
    GrihamRouter.navigate('/admin/notifications');
  `);
  await sleep(400);
  assert('48. Admin Notifications screen renders without regression', await cdp.eval(`document.getElementById('screen-admin-notifications').classList.contains('active')`));

  // 5. Resident Voting
  await cdp.eval(`
    GrihamAuth.setSession('test-res-token', { id: 'USR-001', role: 'resident', society_id: 'GRIHAM-PUNE-001', wing: 'A', approval: 'Approved' }, 'GRIHAM-PUNE-001');
    GrihamRouter.navigate('/resident/voting');
  `);
  await sleep(400);
  assert('49. Resident Voting screen renders without regression', await cdp.eval(`document.getElementById('screen-resident-voting').classList.contains('active')`));

  // -------------------------------------------------------------
  // TEST SECTION 15: RUNTIME CONSOLE & NETWORK AUDIT
  // -------------------------------------------------------------
  console.log('\n--- 15. Console & Network Runtime Audit ---');
  assert('50. Zero unhandled console errors', cdp.consoleErrors.length === 0, cdp.consoleErrors.join(' | '));
  assert('51. Zero network resource failures (200 OK)', cdp.networkErrors.length === 0, cdp.networkErrors.join(' | '));

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
