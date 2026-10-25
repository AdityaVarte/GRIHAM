/**
 * Comprehensive Automated End-to-End Verification Suite
 * Gatekeeper Visitor Management — Check-in / Check-out
 * Verified across Chrome CDP on port 9222
 */
const { spawn, execSync } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9222;
const SERVER_PORT = 8085;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getDebuggerUrl() {
  for (let i = 0; i < 25; i++) {
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
          // Ignore expected mock 401/400/409/404 logs from negative testing
          const isExpectedTestError = text.includes('401') || text.includes('Invalid credentials') ||
            text.includes('Invalid Society ID') || text.includes('Invalid Station PIN') ||
            text.includes('[RouteGuard] Unauthorized') || text.includes('Unauthenticated access') ||
            text.includes('already checked in') || text.includes('already checked out') ||
            text.includes('has not checked in') || text.includes('already exists for') ||
            text.includes('[API Error]');
          if (!isExpectedTestError) {
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
    await sleep(600);
  }

  async setViewport(width, height) {
    await this.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(150);
  }
}

async function runVerification() {
  console.log('=== STARTING AUTOMATED VERIFICATION: GATEKEEPER VISITOR MANAGEMENT ===');
  let results = [];
  function assert(title, condition, detail = '') {
    if (condition) {
      console.log(`[PASS] ${title}`);
      results.push({ title, status: 'PASS', detail });
    } else {
      console.error(`[FAIL] ${title} - ${detail}`);
      results.push({ title, status: 'FAIL', detail });
    }
  }

  // 1. Start Web Server
  let serverProcess;
  const serverPath = path.join(__dirname, 'server.js');
  try {
    serverProcess = spawn('node', [serverPath], { stdio: 'pipe' });
  } catch (e) {}
  await sleep(600);

  // 2. Launch Chrome
  const tempProfile = path.join(__dirname, 'temp_chrome_profile');
  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${tempProfile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--headless=new',
    '--disable-gpu',
    `http://localhost:${SERVER_PORT}/index.html`
  ], { detached: true, stdio: 'ignore' });

  await sleep(1500);

  const wsUrl = await getDebuggerUrl();
  const cdp = new CDPClient(wsUrl);
  await cdp.connect();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Network.enable');

  await cdp.navigate(`http://localhost:${SERVER_PORT}/index.html#/gatekeeper/login`);
  for (let i = 0; i < 30; i++) {
    try {
      if (await cdp.eval(`typeof GrihamAuth !== 'undefined' && typeof GrihamRouter !== 'undefined'`)) break;
    } catch(e) {}
    await sleep(200);
  }


  // -------------------------------------------------------------
  // TEST SECTION 1: AUTH & GATEKEEPER LOGIN
  // -------------------------------------------------------------
  console.log('\n--- 1. Authentication & Gatekeeper Login ---');
  await cdp.eval(`
    document.getElementById('gatekeeper-input-society-id').value = 'GRIHAM-PUNE-001';
    document.getElementById('gatekeeper-input-pin').value = '1234';
    document.getElementById('form-gatekeeper-login').dispatchEvent(new Event('submit', { cancelable: true }));
  `);
  await sleep(800);

  const currentRoute1 = await cdp.eval(`window.location.hash`);
  assert('1. Gatekeeper Login redirects to Terminal', currentRoute1 === '#/gatekeeper/home', currentRoute1);

  const isAuth = await cdp.eval(`GrihamAuth.isAuthenticated() && GrihamAuth.hasRole('gatekeeper')`);
  assert('2. Gatekeeper Session Active', isAuth === true);

  // -------------------------------------------------------------
  // TEST SECTION 2: NAVIGATION TO VISITOR MANAGEMENT & ROUTE GUARD
  // -------------------------------------------------------------
  console.log('\n--- 2. Navigation & Role Access Guard ---');
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/visitors')`);
  await sleep(400);

  const currentRoute2 = await cdp.eval(`window.location.hash`);
  assert('3. Navigates to /gatekeeper/visitors', currentRoute2 === '#/gatekeeper/visitors', currentRoute2);

  const isVisitorsScreenActive = await cdp.eval(`
    document.getElementById('screen-gatekeeper-visitors').classList.contains('active')
  `);
  assert('4. Screen #screen-gatekeeper-visitors is active', isVisitorsScreenActive === true);

  const pageTitle = await cdp.eval(`document.title`);
  assert('5. Page Title correctly set', pageTitle.includes('Visitor Management'), pageTitle);

  // -------------------------------------------------------------
  // TEST SECTION 3: SUMMARY & LIST RENDERING
  // -------------------------------------------------------------
  console.log('\n--- 3. Summary & Visitor List Rendering ---');
  const expCount = await cdp.eval(`document.getElementById('sum-val-expected').textContent.trim()`);
  const inCount = await cdp.eval(`document.getElementById('sum-val-checkedin').textContent.trim()`);
  const outCount = await cdp.eval(`document.getElementById('sum-val-checkedout').textContent.trim()`);
  assert('6. Summary counts render non-empty', parseInt(expCount) >= 0 && parseInt(inCount) >= 0 && parseInt(outCount) >= 0, `Expected: ${expCount}, In: ${inCount}, Out: ${outCount}`);

  const cardCount = await cdp.eval(`document.querySelectorAll('.gk-visitor-card').length`);
  assert('7. Visitor cards rendered', cardCount >= 3, `Count: ${cardCount}`);

  // Society isolation check: Make sure Rohan Deshmukh (GRIHAM-MUMBAI-002) is NOT displayed in Pune society!
  const crossSocietyVisible = await cdp.eval(`
    document.getElementById('visitor-list-container').innerText.includes('Rohan Deshmukh')
  `);
  assert('8. Society Data Isolation (Cross-society records hidden)', crossSocietyVisible === false);

  // -------------------------------------------------------------
  // TEST SECTION 4: SEARCH & FILTERING
  // -------------------------------------------------------------
  console.log('\n--- 4. Search & Filtering ---');
  // Search for "Rahul"
  await cdp.eval(`
    const input = document.getElementById('input-visitor-search');
    input.value = 'Rahul';
    input.dispatchEvent(new Event('input'));
  `);
  await sleep(400);
  const searchResultsCount = await cdp.eval(`document.querySelectorAll('.gk-visitor-card').length`);
  const rahulFound = await cdp.eval(`
    document.getElementById('visitor-list-container').innerText.includes('Rahul Sharma')
  `);
  assert('9. Search by visitor name returns matching record', searchResultsCount === 1 && rahulFound === true, `Results: ${searchResultsCount}`);

  // Clear search
  await cdp.eval(`GrihamGatekeeperVisitorsUI.clearSearch()`);
  await sleep(300);

  // Filter by "Expected"
  await cdp.eval(`GrihamGatekeeperVisitorsUI.setFilter('Expected')`);
  await sleep(300);
  const expectedPillActive = await cdp.eval(`document.getElementById('pill-filter-expected').classList.contains('active')`);
  const expectedOnly = await cdp.eval(`
    Array.from(document.querySelectorAll('.gk-visitor-card')).every(c => c.innerText.includes('Expected'))
  `);
  assert('10. Filter by Expected works', expectedPillActive === true && expectedOnly === true);

  // Filter by "Checked In"
  await cdp.eval(`GrihamGatekeeperVisitorsUI.setFilter('Checked In')`);
  await sleep(300);
  const checkedInOnly = await cdp.eval(`
    Array.from(document.querySelectorAll('.gk-visitor-card')).every(c => c.innerText.includes('Checked In'))
  `);
  assert('11. Filter by Checked In works', checkedInOnly === true);

  // Reset to "All"
  await cdp.eval(`GrihamGatekeeperVisitorsUI.setFilter('All')`);
  await sleep(300);

  // -------------------------------------------------------------
  // TEST SECTION 5: VISITOR DETAIL BOTTOM SHEET
  // -------------------------------------------------------------
  console.log('\n--- 5. Visitor Detail Bottom Sheet ---');
  await cdp.eval(`GrihamGatekeeperVisitorsUI.openDetail('VIS-2026-0001')`);
  await sleep(300);

  const isDetailOpen = await cdp.eval(`
    document.getElementById('sheet-visitor-detail').classList.contains('open') &&
    document.getElementById('detail-visitor-name').textContent.includes('Rahul Sharma')
  `);
  assert('12. Detail sheet opens with accurate visitor info', isDetailOpen === true);

  // Check In button visible for Expected visitor
  const checkInBtnVisible = await cdp.eval(`
    document.getElementById('btn-detail-checkin').style.display !== 'none'
  `);
  assert('13. Check-In CTA visible for Expected visitor', checkInBtnVisible === true);

  // Close detail
  await cdp.eval(`GrihamGatekeeperVisitorsUI.closeDetail()`);
  await sleep(200);
  const isDetailClosed = await cdp.eval(`!document.getElementById('sheet-visitor-detail').classList.contains('open')`);
  assert('14. Detail sheet closes cleanly', isDetailClosed === true);

  // -------------------------------------------------------------
  // TEST SECTION 6: CHECK-IN WORKFLOW
  // -------------------------------------------------------------
  console.log('\n--- 6. Check-in Workflow ---');
  // Check-in Rahul Sharma (VIS-2026-0001)
  const preCheckInStatus = await cdp.eval(`
    window.MOCK_VISITORS_DB.visitors.find(v => v.id === 'VIS-2026-0001').status
  `);
  assert('15. Pre-check status is Expected', preCheckInStatus === 'Expected');

  // Trigger check-in execution directly through controller method
  await cdp.eval(`GrihamGatekeeperVisitorsUI._executeCheckIn('VIS-2026-0001')`);
  await sleep(300);

  const postCheckIn = await cdp.eval(`(() => {
    const v = window.MOCK_VISITORS_DB.visitors.find(v => v.id === 'VIS-2026-0001');
    return ({ status: v.status, checkInAt: v.checkInAt });
  })()`);
  assert('16. Status transitioned to Checked In', postCheckIn.status === 'Checked In');
  assert('17. checkInAt timestamp recorded', !!postCheckIn.checkInAt);

  // Verify UI card updated
  const cardHasCheckedIn = await cdp.eval(`(() => {
    const card = Array.from(document.querySelectorAll('.gk-visitor-card')).find(c => c.innerText.includes('Rahul Sharma'));
    return card && card.innerText.includes('Checked In');
  })()`);
  assert('18. Visitor card reflects Checked In status', cardHasCheckedIn === true);

  // State Transition Integrity: Cannot check in an already checked in visitor
  let doubleCheckInBlocked = false;
  try {
    await cdp.eval(`window.checkInGatekeeperVisitor('VIS-2026-0001')`);
  } catch (e) {
    doubleCheckInBlocked = true;
  }
  assert('19. State Machine: Duplicate Check-In rejected', doubleCheckInBlocked === true);

  // -------------------------------------------------------------
  // TEST SECTION 7: CHECK-OUT WORKFLOW
  // -------------------------------------------------------------
  console.log('\n--- 7. Check-out Workflow ---');
  // Check-out Vikram Verma (VIS-2026-0002) who was Checked In
  const preCheckOutStatus = await cdp.eval(`(() => {
    return window.MOCK_VISITORS_DB.visitors.find(v => v.id === 'VIS-2026-0002').status;
  })()`);
  assert('20. Pre-checkout status is Checked In', preCheckOutStatus === 'Checked In');

  await cdp.eval(`GrihamGatekeeperVisitorsUI._executeCheckOut('VIS-2026-0002')`);
  await sleep(300);

  const postCheckOut = await cdp.eval(`(() => {
    const v = window.MOCK_VISITORS_DB.visitors.find(v => v.id === 'VIS-2026-0002');
    return ({ status: v.status, checkOutAt: v.checkOutAt });
  })()`);
  assert('21. Status transitioned to Checked Out', postCheckOut.status === 'Checked Out');
  assert('22. checkOutAt timestamp recorded', !!postCheckOut.checkOutAt);

  // State Transition Integrity: Cannot check out an Expected visitor
  let expectedCheckOutBlocked = false;
  try {
    await cdp.eval(`window.checkOutGatekeeperVisitor('VIS-2026-0004')`);
  } catch (e) {
    expectedCheckOutBlocked = true;
  }
  assert('23. State Machine: Checking out an Expected visitor blocked', expectedCheckOutBlocked === true);

  // State Transition Integrity: Cannot check out an already Checked Out visitor
  let doubleCheckOutBlocked = false;
  try {
    await cdp.eval(`window.checkOutGatekeeperVisitor('VIS-2026-0002')`);
  } catch (e) {
    doubleCheckOutBlocked = true;
  }
  assert('24. State Machine: Duplicate Check-Out blocked', doubleCheckOutBlocked === true);

  // -------------------------------------------------------------
  // TEST SECTION 8: WALK-IN REGISTRATION WORKFLOW
  // -------------------------------------------------------------
  console.log('\n--- 8. Walk-in Registration Workflow ---');
  await cdp.eval(`GrihamGatekeeperVisitorsUI.openWalkInModal()`);
  await sleep(200);

  const isWalkInOpen = await cdp.eval(`document.getElementById('sheet-walkin-visitor').classList.contains('open')`);
  assert('25. Walk-in sheet opens', isWalkInOpen === true);

  // Test Negative Validation (empty form submission)
  await cdp.eval(`
    document.getElementById('form-walkin-visitor').dispatchEvent(new Event('submit', { cancelable: true }));
  `);
  await sleep(150);
  const walkInValidationFailed = await cdp.eval(`
    document.getElementById('walkin-error-banner').style.display !== 'none'
  `);
  assert('26. Walk-in form validation prevents empty submission', walkInValidationFailed === true);

  // Fill in valid walk-in details
  await cdp.eval(`
    document.getElementById('walkin-input-name').value = 'Deepak Patil';
    document.getElementById('walkin-input-phone').value = '9822998877';
    document.getElementById('walkin-select-wing').value = 'A';
    document.getElementById('walkin-input-flat').value = '102';
    document.getElementById('walkin-input-resident').value = 'Amit Sharma';
    document.getElementById('walkin-select-purpose').value = 'Personal Visit';
    document.getElementById('walkin-input-notes').value = 'Friend visiting from Mumbai';
    document.getElementById('form-walkin-visitor').dispatchEvent(new Event('submit', { cancelable: true }));
  `);
  await sleep(400);

  const newVisitorRecord = await cdp.eval(`(() => {
    return window.MOCK_VISITORS_DB.visitors.find(v => v.visitorName === 'Deepak Patil');
  })()`);
  assert('27. Walk-in visitor created with canonical ID', newVisitorRecord && newVisitorRecord.id.startsWith('VIS-2026-'));
  assert('28. Walk-in automatically Checked In', newVisitorRecord && newVisitorRecord.status === 'Checked In' && !!newVisitorRecord.checkInAt);

  // Duplicate active visit test: Attempting to create duplicate active walk-in for same phone + same flat
  let duplicateActiveBlocked = false;
  try {
    await cdp.eval(`
      window.createGatekeeperVisitor({
        visitorName: 'Deepak Patil',
        visitorPhone: '9822998877',
        wing: 'A',
        flatNumber: '102',
        purpose: 'Duplicate visit attempt'
      })
    `);
  } catch (e) {
    duplicateActiveBlocked = true;
  }
  assert('29. Duplicate active visit prevented (same phone & flat)', duplicateActiveBlocked === true);

  // -------------------------------------------------------------
  // TEST SECTION 9: GATEKEEPER HOME INTEGRATION
  // -------------------------------------------------------------
  console.log('\n--- 9. Gatekeeper Home Integration ---');
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/home')`);
  await sleep(400);

  // Check Visitor Entry action card navigates to visitors
  await cdp.eval(`
    const btn = document.querySelector('.gk-qa-card[aria-label="Visitor Entry"]');
    btn && btn.click();
  `);
  await sleep(350);
  const routeAfterEntryClick = await cdp.eval(`window.location.hash`);
  assert('30. Home "Visitor Entry" navigates to Visitor Management', routeAfterEntryClick.includes('/gatekeeper/visitors'));

  // Navigate back to Home and verify Today's Gate Summary includes canonical count
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/home')`);
  await sleep(400);
  const homeSummaryVal = await cdp.eval(`document.getElementById('gk-val-visitors').textContent.trim()`);
  assert('31. Home Summary displays active visitor count', parseInt(homeSummaryVal) > 0, `Value: ${homeSummaryVal}`);

  // Return to visitors screen
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/visitors')`);
  await sleep(350);

  // -------------------------------------------------------------
  // TEST SECTION 10: INTERNATIONALIZATION (EN, HI, MR)
  // -------------------------------------------------------------
  console.log('\n--- 10. Internationalization ---');
  // Switch to Hindi
  await cdp.eval(`GrihamI18n.setLanguage('hi')`);
  await sleep(300);
  const titleHi = await cdp.eval(`document.getElementById('gk-visitors-header-title').textContent`);
  assert('32. Hindi i18n applied to Visitor Management', titleHi.includes('आगंतुक प्रबंधन'), titleHi);

  // Switch to Marathi
  await cdp.eval(`GrihamI18n.setLanguage('mr')`);
  await sleep(300);
  const titleMr = await cdp.eval(`document.getElementById('gk-visitors-header-title').textContent`);
  assert('33. Marathi i18n applied to Visitor Management', titleMr.includes('अभ्यागत व्यवस्थापन'), titleMr);

  // Revert to English
  await cdp.eval(`GrihamI18n.setLanguage('en')`);
  await sleep(300);

  // -------------------------------------------------------------
  // TEST SECTION 11: ACCESSIBILITY PANEL (10/10 SETTINGS)
  // -------------------------------------------------------------
  console.log('\n--- 11. Accessibility Panel ---');
  // 1 & 2. Text Scaling
  await cdp.eval(`GrihamA11y.stepTextSize(1)`);
  await sleep(100);
  const biggerTextActive = await cdp.eval(`GrihamA11y.state.textScale > 1`);
  assert('34. A11y: Bigger Text', biggerTextActive === true);

  await cdp.eval(`GrihamA11y.stepTextSize(-1)`);
  await sleep(100);
  const smallerTextActive = await cdp.eval(`GrihamA11y.state.textScale === 1.0`);
  assert('35. A11y: Smaller Text', smallerTextActive === true);

  // 3. Text Spacing
  await cdp.eval(`GrihamA11y.setTextSpacing(true)`);
  const textSpacingActive = await cdp.eval(`document.documentElement.classList.contains('accessibility-text-spacing')`);
  assert('36. A11y: Text Spacing', textSpacingActive === true);

  // 4. Line Height
  await cdp.eval(`GrihamA11y.setLineHeight(true)`);
  const lineHeightActive = await cdp.eval(`document.documentElement.classList.contains('accessibility-line-height')`);
  assert('37. A11y: Line Height', lineHeightActive === true);

  // 5. Saturation
  await cdp.eval(`GrihamA11y.setSaturation("high")`);
  const saturationActive = await cdp.eval(`document.documentElement.getAttribute('data-saturation') === 'high'`);
  assert('38. A11y: Saturation', saturationActive === true);

  // 6. Invert Colors
  await cdp.eval(`GrihamA11y.setInvertColors(true)`);
  const invertColorsActive = await cdp.eval(`document.documentElement.classList.contains('accessibility-invert')`);
  assert('39. A11y: Invert Colors', invertColorsActive === true);

  // 7. Large Cursor
  await cdp.eval(`GrihamA11y.setLargeCursor(true)`);
  const cursorActive = await cdp.eval(`document.documentElement.classList.contains('accessibility-large-cursor')`);
  assert('40. A11y: Large Cursor', cursorActive === true);

  // 8. Pause Animation
  await cdp.eval(`GrihamA11y.setPauseAnimation(true)`);
  const pauseAnimActive = await cdp.eval(`document.documentElement.classList.contains('accessibility-reduce-motion')`);
  assert('41. A11y: Pause Animation', pauseAnimActive === true);

  // 9. Hide Images
  await cdp.eval(`GrihamA11y.setHideImages(true)`);
  const hideImagesActive = await cdp.eval(`document.documentElement.classList.contains('accessibility-hide-images')`);
  assert('42. A11y: Hide Images', hideImagesActive === true);

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
  assert('43. A11y: Reset All Settings', resetComplete === true);

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
      document.getElementById('screen-gatekeeper-visitors').scrollWidth > window.innerWidth
    `);
    assert(`44. Responsive ${vp.name} zero horizontal overflow`, overflow === false);
  }

  // Restore mobile viewport
  await cdp.setViewport(375, 812);

  // -------------------------------------------------------------
  // TEST SECTION 13: ROLE ISOLATION & PERMISSION GUARDS
  // -------------------------------------------------------------
  console.log('\n--- 13. Role Isolation & Permission Security ---');
  // First navigate away to /entry
  await cdp.eval(`GrihamRouter.navigate('/entry')`);
  await sleep(350);

  // Resident accessing Visitor Management must be blocked
  await cdp.eval(`
    GrihamAuth.setSession('mock-res-token', { role: 'resident', society_id: 'GRIHAM-PUNE-001' }, 'GRIHAM-PUNE-001');
    GrihamRouter.navigate('/gatekeeper/visitors');
  `);
  await sleep(400);
  const residentRedirect = await cdp.eval(`window.location.hash`);
  assert('45. Resident denied access to /gatekeeper/visitors -> redirected to /resident/home', residentRedirect === '#/resident/home', residentRedirect);

  // Navigate away to /entry
  await cdp.eval(`GrihamRouter.navigate('/entry')`);
  await sleep(350);

  // Admin accessing Visitor Management must be blocked
  await cdp.eval(`
    GrihamAuth.setSession('mock-adm-token', { role: 'admin', society_id: 'GRIHAM-PUNE-001' }, 'GRIHAM-PUNE-001');
    GrihamRouter.navigate('/gatekeeper/visitors');
  `);
  await sleep(400);
  const adminRedirect = await cdp.eval(`window.location.hash`);
  assert('46. Admin denied access to /gatekeeper/visitors -> redirected to /admin/home', adminRedirect === '#/admin/home', adminRedirect);

  // Navigate away to /entry
  await cdp.eval(`GrihamRouter.navigate('/entry')`);
  await sleep(350);

  // Unauthenticated access must redirect to /gatekeeper/login
  await cdp.eval(`
    GrihamAuth.clearSession();
    GrihamRouter.navigate('/gatekeeper/visitors');
  `);
  await sleep(400);
  const unauthRedirect = await cdp.eval(`window.location.hash`);
  assert('47. Unauthenticated access denied -> redirected to /gatekeeper/login', unauthRedirect === '#/gatekeeper/login', unauthRedirect);

  // -------------------------------------------------------------
  // TEST SECTION 14: RUNTIME CONSOLE & NETWORK AUDIT
  // -------------------------------------------------------------
  console.log('\n--- 14. Console & Network Runtime Audit ---');
  assert('48. Zero unhandled console errors', cdp.consoleErrors.length === 0, cdp.consoleErrors.join(' | '));
  assert('49. Zero network resource failures (200 OK)', cdp.networkErrors.length === 0, cdp.networkErrors.join(' | '));

  console.log('\n=============================================================');
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  console.log(`TOTAL CHECKS: ${results.length} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('=============================================================\n');

  // Cleanup processes
  try {
    process.kill(-chromeProcess.pid);
  } catch (e) {
    try { execSync('taskkill /F /IM chrome.exe /T', { stdio: 'ignore' }); } catch(err){}
  }
  if (serverProcess) {
    serverProcess.kill();
  }

  process.exit(failed === 0 ? 0 : 1);
}

runVerification().catch(err => {
  console.error('Fatal test error:', err);
  try { execSync('taskkill /F /IM chrome.exe /T', { stdio: 'ignore' }); } catch(e){}
  process.exit(1);
});
