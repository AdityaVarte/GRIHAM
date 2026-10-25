/**
 * Automated End-to-End Verification Suite for Gatekeeper Delivery / Entry Handling
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
          // Ignore expected mock 401/400/409/404 logs from negative testing
          const isExpectedTestError = text.includes('401') || text.includes('Invalid credentials') ||
            text.includes('[RouteGuard] Unauthorized') || text.includes('Unauthenticated access') ||
            text.includes('already marked') || text.includes('already been') ||
            text.includes('must arrive') || text.includes('already exists for') ||
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
    await sleep(250);
  }
}

async function runVerification() {
  console.log('=== STARTING AUTOMATED VERIFICATION: GATEKEEPER DELIVERY / ENTRY HANDLING ===\n');
  let results = [];
  function assert(title, condition, detail = '') {
    if (condition) {
      console.log(`[PASS] ${title}`);
      results.push({ title, status: 'PASS' });
    } else {
      console.error(`[FAIL] ${title} - ${detail}`);
      results.push({ title, status: 'FAIL', detail });
    }
  }

  // 1. Ensure server is running
  let serverProcess = null;
  try {
    await new Promise((res, rej) => {
      const req = http.get('http://localhost:8085/index.html', res);
      req.on('error', () => {
        console.log('Starting local HTTP server on port 8085...');
        serverProcess = spawn('node', ['scratch/server.js'], { detached: true, stdio: 'ignore' });
        setTimeout(res, 800);
      });
    });
  } catch (e) {}

  // 2. Launch headless Chrome with CDP
  try {
    execSync('taskkill /F /IM chrome.exe /T 2>nul || exit 0', { shell: 'cmd.exe' });
  } catch(e) {}
  await sleep(600);

  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=375,812',
    'about:blank'
  ]);
  await sleep(1200);

  const wsUrl = await getDebuggerUrl();
  const cdp = new CDPClient(wsUrl);
  await cdp.connect();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Network.enable');

  // Load App
  await cdp.navigate('http://localhost:8085/index.html');
  for (let i = 0; i < 30; i++) {
    try {
      if (await cdp.eval(`typeof GrihamAuth !== 'undefined' && typeof GrihamRouter !== 'undefined'`)) break;
    } catch(e) {}
    await sleep(200);
  }


  // -------------------------------------------------------------
  // TEST SECTION 1: AUTHENTICATION & LOGIN REGRESSION
  // -------------------------------------------------------------
  console.log('\n--- 1. Authentication & Gatekeeper Login ---');
  await cdp.eval(`
    localStorage.clear();
    GrihamAuth.clearSession();
    GrihamRouter.navigate('/gatekeeper/login');
  `);
  await sleep(400);

  // Perform Gatekeeper login
  await cdp.eval(`
    document.getElementById('gatekeeper-input-society-id').value = 'GRIHAM-PUNE-001';
    document.getElementById('gatekeeper-input-pin').value = '1234';
    document.getElementById('form-gatekeeper-login').dispatchEvent(new Event('submit', { cancelable: true }));
  `);
  await sleep(600);

  const currentRoute = await cdp.eval(`window.location.hash`);
  assert('1. Gatekeeper Login redirects to Terminal', currentRoute === '#/gatekeeper/home', currentRoute);

  const isAuth = await cdp.eval(`GrihamAuth.isAuthenticated() && GrihamAuth.isGatekeeper()`);
  assert('2. Gatekeeper Session Active', isAuth === true);

  // -------------------------------------------------------------
  // TEST SECTION 2: NAVIGATION & ROLE ACCESS
  // -------------------------------------------------------------
  console.log('\n--- 2. Navigation & Role Access Guard ---');
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/deliveries')`);
  await sleep(400);

  const deliveryRoute = await cdp.eval(`window.location.hash`);
  assert('3. Navigates to /gatekeeper/deliveries', deliveryRoute === '#/gatekeeper/deliveries', deliveryRoute);

  const isDeliveriesScreenActive = await cdp.eval(`
    document.getElementById('screen-gatekeeper-deliveries').classList.contains('active')
  `);
  assert('4. Screen #screen-gatekeeper-deliveries is active', isDeliveriesScreenActive === true);

  const pageTitle = await cdp.eval(`document.title`);
  assert('5. Page Title correctly set for Deliveries', pageTitle.includes('Delivery Management'), pageTitle);

  // -------------------------------------------------------------
  // TEST SECTION 3: SUMMARY COUNTERS & DATA RENDERING
  // -------------------------------------------------------------
  console.log('\n--- 3. Summary & Delivery List Rendering ---');
  const summaryCounts = await cdp.eval(`({
    arrived: document.getElementById('sum-del-arrived')?.textContent,
    entered: document.getElementById('sum-del-entered')?.textContent,
    expected: document.getElementById('sum-del-expected')?.textContent
  })`);
  assert('6. Summary counts render correctly', parseInt(summaryCounts.arrived) >= 1 && parseInt(summaryCounts.entered) >= 1 && parseInt(summaryCounts.expected) >= 1);

  const cardCount = await cdp.eval(`document.querySelectorAll('#gk-deliveries-container .gk-delivery-card').length`);
  assert('7. Delivery cards rendered', cardCount >= 4, `Rendered: ${cardCount}`);

  // Society Data Isolation Check
  const hasCrossSociety = await cdp.eval(`
    !!document.querySelector('.gk-delivery-card [data-id="DEL-2026-0099"]') ||
    Array.from(document.querySelectorAll('.vcard-name')).some(el => el.textContent.includes('Imran'))
  `);
  assert('8. Society Data Isolation (Cross-society records hidden)', hasCrossSociety === false);

  // -------------------------------------------------------------
  // TEST SECTION 4: SEARCH & FILTERING
  // -------------------------------------------------------------
  console.log('\n--- 4. Search & Filtering ---');
  // Search by courier name "Swiggy"
  await cdp.eval(`GrihamGatekeeperDeliveriesUI.handleSearch('Swiggy')`);
  await sleep(350);
  const searchResultsCount = await cdp.eval(`document.querySelectorAll('#gk-deliveries-container .gk-delivery-card').length`);
  const searchCourierName = await cdp.eval(`document.querySelector('#gk-deliveries-container .vcard-name')?.textContent`);
  assert('9. Search by courier returns matching record', searchResultsCount === 1 && searchCourierName.includes('Swiggy'));

  // Clear search
  await cdp.eval(`GrihamGatekeeperDeliveriesUI.clearSearch()`);
  await sleep(300);

  // Filter by Arrived
  await cdp.eval(`GrihamGatekeeperDeliveriesUI.setFilter('Arrived')`);
  await sleep(300);
  const arrivedOnly = await cdp.eval(`(() => {
    const cards = Array.from(document.querySelectorAll('#gk-deliveries-container .gk-delivery-card'));
    return cards.length > 0 && cards.every(c => c.textContent.includes('Arrived'));
  })()`);
  assert('10. Filter by Arrived isolates Arrived records', arrivedOnly === true);

  // Filter by Entered
  await cdp.eval(`GrihamGatekeeperDeliveriesUI.setFilter('Entered')`);
  await sleep(300);
  const enteredOnly = await cdp.eval(`(() => {
    const cards = Array.from(document.querySelectorAll('#gk-deliveries-container .gk-delivery-card'));
    return cards.length > 0 && cards.every(c => c.textContent.includes('Entered'));
  })()`);
  assert('11. Filter by Entered isolates Entered records', enteredOnly === true);

  // Reset filter to All
  await cdp.eval(`GrihamGatekeeperDeliveriesUI.setFilter('All')`);
  await sleep(300);

  // -------------------------------------------------------------
  // TEST SECTION 5: DELIVERY DETAIL BOTTOM SHEET
  // -------------------------------------------------------------
  console.log('\n--- 5. Delivery Detail Bottom Sheet ---');
  await cdp.eval(`GrihamGatekeeperDeliveriesUI.openDetail('DEL-2026-0001')`);
  await sleep(250);

  const detailInfo = await cdp.eval(`({
    isOpen: document.getElementById('sheet-delivery-detail').classList.contains('visible'),
    name: document.querySelector('.vdetail-name')?.textContent,
    id: document.querySelector('.vdetail-id')?.textContent,
    recipient: document.querySelector('.vdetail-grid')?.textContent.includes('Amit Sharma'),
    flat: document.querySelector('.vdetail-grid')?.textContent.includes('A-102'),
    hasArriveCta: !!document.querySelector('.btn-sheet-primary.arrive')
  })`);
  assert('12. Detail sheet opens with accurate delivery info', detailInfo.isOpen && detailInfo.id === 'DEL-2026-0001' && detailInfo.recipient && detailInfo.flat);
  assert('13. Action CTA "Mark Arrived" visible for Expected delivery', detailInfo.hasArriveCta === true);

  // Close detail sheet
  await cdp.eval(`GrihamGatekeeperDeliveriesUI.closeDetail()`);
  await sleep(150);
  const isDetailClosed = await cdp.eval(`!document.getElementById('sheet-delivery-detail').classList.contains('visible')`);
  assert('14. Detail sheet closes cleanly', isDetailClosed === true);

  // -------------------------------------------------------------
  // TEST SECTION 6: WORKFLOW — EXPECTED → ARRIVED
  // -------------------------------------------------------------
  console.log('\n--- 6. Status Workflow: Expected -> Arrived ---');
  const preArriveStatus = await cdp.eval(`
    window.MOCK_DELIVERIES_DB.deliveries.find(d => d.id === 'DEL-2026-0001').status
  `);
  assert('15. Pre-arrive status is Expected', preArriveStatus === 'Expected');

  await cdp.eval(`GrihamGatekeeperDeliveriesUI.handleMarkArrived('DEL-2026-0001')`);
  await sleep(350);

  const postArriveStatus = await cdp.eval(`
    window.MOCK_DELIVERIES_DB.deliveries.find(d => d.id === 'DEL-2026-0001').status
  `);
  const arrivedTimestamp = await cdp.eval(`
    window.MOCK_DELIVERIES_DB.deliveries.find(d => d.id === 'DEL-2026-0001').arrivedAt
  `);
  assert('16. Status transitioned to Arrived', postArriveStatus === 'Arrived');
  assert('17. arrivedAt timestamp recorded', !!arrivedTimestamp);

  // State Machine Integrity: Cannot arrive an already Arrived delivery
  let duplicateArriveBlocked = false;
  try {
    await cdp.eval(`window.markGatekeeperDeliveryArrived('DEL-2026-0001')`);
  } catch (e) {
    duplicateArriveBlocked = true;
  }
  assert('18. State Machine: Duplicate Arrive rejected', duplicateArriveBlocked === true);

  // -------------------------------------------------------------
  // TEST SECTION 7: WORKFLOW — ARRIVED → ENTERED
  // -------------------------------------------------------------
  console.log('\n--- 7. Status Workflow: Arrived -> Entered ---');
  await cdp.eval(`GrihamGatekeeperDeliveriesUI.handleMarkEntered('DEL-2026-0001')`);
  await sleep(350);

  const postEnterStatus = await cdp.eval(`
    window.MOCK_DELIVERIES_DB.deliveries.find(d => d.id === 'DEL-2026-0001').status
  `);
  const enteredTimestamp = await cdp.eval(`
    window.MOCK_DELIVERIES_DB.deliveries.find(d => d.id === 'DEL-2026-0001').enteredAt
  `);
  assert('19. Status transitioned to Entered', postEnterStatus === 'Entered');
  assert('20. enteredAt timestamp recorded', !!enteredTimestamp);

  // State Machine: Cannot enter an Expected delivery
  let expectedEnterBlocked = false;
  try {
    // Attempting on an Expected delivery without arrival
    await cdp.eval(`
      const testExp = {
        id: 'DEL-TEST-EXP',
        societyId: 'GRIHAM-PUNE-001',
        courierName: 'Test Courier',
        courierPhone: '+919000000000',
        recipientName: 'Test Recipient',
        wing: 'A',
        flatNumber: '101',
        deliveryType: 'Courier',
        status: 'Expected'
      };
      window.MOCK_DELIVERIES_DB.deliveries.push(testExp);
      await window.markGatekeeperDeliveryEntered('DEL-TEST-EXP');
    `);
  } catch (e) {
    expectedEnterBlocked = true;
  }
  assert('21. State Machine: Cannot enter Expected delivery without arrival', expectedEnterBlocked === true);

  // -------------------------------------------------------------
  // TEST SECTION 8: WORKFLOW — ENTERED → HANDED OVER
  // -------------------------------------------------------------
  console.log('\n--- 8. Status Workflow: Entered -> Handed Over ---');
  await cdp.eval(`GrihamGatekeeperDeliveriesUI.handleMarkHandedOver('DEL-2026-0001')`);
  await sleep(350);

  const postHandoverStatus = await cdp.eval(`
    window.MOCK_DELIVERIES_DB.deliveries.find(d => d.id === 'DEL-2026-0001').status
  `);
  const handoverTimestamp = await cdp.eval(`
    window.MOCK_DELIVERIES_DB.deliveries.find(d => d.id === 'DEL-2026-0001').handedOverAt
  `);
  assert('22. Status transitioned to Handed Over', postHandoverStatus === 'Handed Over');
  assert('23. handedOverAt timestamp recorded', !!handoverTimestamp);

  // State Machine: Duplicate Handover blocked
  let duplicateHandoverBlocked = false;
  try {
    await cdp.eval(`window.markGatekeeperDeliveryHandedOver('DEL-2026-0001')`);
  } catch (e) {
    duplicateHandoverBlocked = true;
  }
  assert('24. State Machine: Duplicate Handover blocked', duplicateHandoverBlocked === true);

  // Direct Gate Handover (Arrived -> Handed Over without Entered)
  await cdp.eval(`GrihamGatekeeperDeliveriesUI.handleMarkHandedOver('DEL-2026-0002')`);
  await sleep(350);
  const directHandoverStatus = await cdp.eval(`
    window.MOCK_DELIVERIES_DB.deliveries.find(d => d.id === 'DEL-2026-0002').status
  `);
  assert('25. Direct Gate Handover (Arrived -> Handed Over) succeeds', directHandoverStatus === 'Handed Over');

  // -------------------------------------------------------------
  // TEST SECTION 9: INCOMING DELIVERY ENTRY REGISTRATION
  // -------------------------------------------------------------
  console.log('\n--- 9. Incoming Delivery Registration ---');
  await cdp.eval(`GrihamGatekeeperDeliveriesUI.openEntryModal()`);
  await sleep(200);

  const isEntryOpen = await cdp.eval(`document.getElementById('sheet-entry-delivery').classList.contains('visible')`);
  assert('26. Delivery entry sheet opens', isEntryOpen === true);

  // Negative validation (empty form)
  await cdp.eval(`document.getElementById('form-entry-delivery').dispatchEvent(new Event('submit', { cancelable: true }))`);
  await sleep(150);
  const validationErrorShown = await cdp.eval(`
    document.getElementById('delivery-error-banner').style.display !== 'none'
  `);
  assert('27. Form validation prevents empty submission', validationErrorShown === true);

  // Valid submission
  await cdp.eval(`
    document.getElementById('del-input-courier').value = 'Zomato (Karan)';
    document.getElementById('del-input-phone').value = '9876501234';
    document.getElementById('del-select-wing').value = 'B';
    document.getElementById('del-input-flat').value = '201';
    document.getElementById('del-input-recipient').value = 'Sneha Kulkarni';
    document.getElementById('del-select-type').value = 'Food Delivery';
    document.getElementById('del-input-desc').value = 'Biryani dinner meal box';
    document.getElementById('del-input-notes').value = 'Delivery at flat door';
    document.getElementById('form-entry-delivery').dispatchEvent(new Event('submit', { cancelable: true }));
  `);
  await sleep(400);

  const newDeliveryRecord = await cdp.eval(`(() => {
    return window.MOCK_DELIVERIES_DB.deliveries.find(d => d.courierName === 'Zomato (Karan)');
  })()`);
  assert('28. Incoming delivery created with canonical ID', newDeliveryRecord && newDeliveryRecord.id.startsWith('DEL-2026-'));
  assert('29. Incoming delivery automatically marked Arrived', newDeliveryRecord && newDeliveryRecord.status === 'Arrived' && !!newDeliveryRecord.arrivedAt);

  // Duplicate active delivery check: same courier phone, same flat, active status
  let duplicateActiveBlocked = false;
  try {
    await cdp.eval(`
      window.createGatekeeperDelivery({
        courierName: 'Zomato (Karan)',
        courierPhone: '9876501234',
        wing: 'B',
        flatNumber: '201',
        recipientName: 'Sneha Kulkarni',
        deliveryType: 'Food Delivery'
      })
    `);
  } catch (e) {
    duplicateActiveBlocked = true;
  }
  assert('30. Duplicate active delivery prevented (same phone, flat, type)', duplicateActiveBlocked === true);

  // -------------------------------------------------------------
  // TEST SECTION 10: GATEKEEPER HOME INTEGRATION
  // -------------------------------------------------------------
  console.log('\n--- 10. Gatekeeper Home Integration ---');
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/home')`);
  await sleep(400);

  // Check Delivery Entry action card navigates to deliveries?action=entry
  await cdp.eval(`
    const btn = document.querySelector('.gk-qa-card[aria-label="Delivery Entry"]');
    btn && btn.click();
  `);
  await sleep(400);
  const routeAfterEntryClick = await cdp.eval(`window.location.hash`);
  assert('31. Home "Delivery Entry" navigates to Delivery Management', routeAfterEntryClick.includes('/gatekeeper/deliveries'));

  const entrySheetAutoOpened = await cdp.eval(`
    document.getElementById('sheet-entry-delivery').classList.contains('visible')
  `);
  assert('32. Deep link action=entry automatically opens entry modal', entrySheetAutoOpened === true);

  await cdp.eval(`GrihamGatekeeperDeliveriesUI.closeEntryModal()`);
  await sleep(150);

  // Navigate back to Home and verify Today's Gate Summary includes canonical delivery count
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/home')`);
  await sleep(400);
  const homeDeliveriesVal = await cdp.eval(`document.getElementById('gk-val-deliveries').textContent.trim()`);
  assert('33. Home Summary displays active delivery count', parseInt(homeDeliveriesVal) > 0, `Value: ${homeDeliveriesVal}`);

  // Return to Deliveries
  await cdp.eval(`GrihamRouter.navigate('/gatekeeper/deliveries')`);
  await sleep(350);

  // -------------------------------------------------------------
  // TEST SECTION 11: INTERNATIONALIZATION (EN, HI, MR)
  // -------------------------------------------------------------
  console.log('\n--- 11. Internationalization ---');
  // Switch to Hindi
  await cdp.eval(`GrihamI18n.setLanguage('hi')`);
  await sleep(300);
  const titleHi = await cdp.eval(`document.getElementById('gk-deliveries-header-title').textContent`);
  assert('34. Hindi i18n applied to Delivery Management', titleHi.includes('वितरण प्रबंधन'), titleHi);

  // Switch to Marathi
  await cdp.eval(`GrihamI18n.setLanguage('mr')`);
  await sleep(300);
  const titleMr = await cdp.eval(`document.getElementById('gk-deliveries-header-title').textContent`);
  assert('35. Marathi i18n applied to Delivery Management', titleMr.includes('डिलिव्हरी व्यवस्थापन'), titleMr);

  // Revert to English
  await cdp.eval(`GrihamI18n.setLanguage('en')`);
  await sleep(300);

  // -------------------------------------------------------------
  // TEST SECTION 12: ACCESSIBILITY PANEL (10/10 SETTINGS)
  // -------------------------------------------------------------
  console.log('\n--- 12. Accessibility Panel ---');
  // 1 & 2. Text Scaling
  await cdp.eval(`GrihamA11y.stepTextSize(1)`);
  await sleep(100);
  const biggerTextActive = await cdp.eval(`GrihamA11y.state.textScale > 1`);
  assert('36. A11y: Bigger Text', biggerTextActive === true);

  await cdp.eval(`GrihamA11y.stepTextSize(-1)`);
  await sleep(100);
  const smallerTextActive = await cdp.eval(`GrihamA11y.state.textScale === 1.0`);
  assert('37. A11y: Smaller Text', smallerTextActive === true);

  // 3. Text Spacing
  await cdp.eval(`GrihamA11y.setTextSpacing(true)`);
  const textSpacingActive = await cdp.eval(`document.documentElement.classList.contains('accessibility-text-spacing')`);
  assert('38. A11y: Text Spacing', textSpacingActive === true);

  // 4. Line Height
  await cdp.eval(`GrihamA11y.setLineHeight(true)`);
  const lineHeightActive = await cdp.eval(`document.documentElement.classList.contains('accessibility-line-height')`);
  assert('39. A11y: Line Height', lineHeightActive === true);

  // 5. Saturation
  await cdp.eval(`GrihamA11y.setSaturation("high")`);
  const saturationActive = await cdp.eval(`document.documentElement.getAttribute('data-saturation') === 'high'`);
  assert('40. A11y: Saturation', saturationActive === true);

  // 6. Invert Colors
  await cdp.eval(`GrihamA11y.setInvertColors(true)`);
  const invertColorsActive = await cdp.eval(`document.documentElement.classList.contains('accessibility-invert')`);
  assert('41. A11y: Invert Colors', invertColorsActive === true);

  // 7. Large Cursor
  await cdp.eval(`GrihamA11y.setLargeCursor(true)`);
  const cursorActive = await cdp.eval(`document.documentElement.classList.contains('accessibility-large-cursor')`);
  assert('42. A11y: Large Cursor', cursorActive === true);

  // 8. Pause Animation
  await cdp.eval(`GrihamA11y.setPauseAnimation(true)`);
  const pauseAnimActive = await cdp.eval(`document.documentElement.classList.contains('accessibility-reduce-motion')`);
  assert('43. A11y: Pause Animation', pauseAnimActive === true);

  // 9. Hide Images
  await cdp.eval(`GrihamA11y.setHideImages(true)`);
  const hideImagesActive = await cdp.eval(`document.documentElement.classList.contains('accessibility-hide-images')`);
  assert('44. A11y: Hide Images', hideImagesActive === true);

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
  assert('45. A11y: Reset All Settings', resetComplete === true);

  // -------------------------------------------------------------
  // TEST SECTION 13: RESPONSIVE VIEWPORTS & ZERO OVERFLOW
  // -------------------------------------------------------------
  console.log('\n--- 13. Responsive Viewports & Zero Overflow ---');
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
      document.getElementById('screen-gatekeeper-deliveries').scrollWidth > window.innerWidth
    `);
    assert(`46. Responsive ${vp.name} zero horizontal overflow`, overflow === false);
  }

  // Restore mobile viewport
  await cdp.setViewport(375, 812);

  // -------------------------------------------------------------
  // TEST SECTION 14: ROLE ISOLATION & PERMISSION GUARDS
  // -------------------------------------------------------------
  console.log('\n--- 14. Role Isolation & Permission Security ---');
  // First navigate away to /entry
  await cdp.eval(`GrihamRouter.navigate('/entry')`);
  await sleep(350);

  // Resident accessing Deliveries must be blocked
  await cdp.eval(`
    GrihamAuth.setSession('mock-res-token', { role: 'resident', society_id: 'GRIHAM-PUNE-001' }, 'GRIHAM-PUNE-001');
    GrihamRouter.navigate('/gatekeeper/deliveries');
  `);
  await sleep(400);
  const residentRedirect = await cdp.eval(`window.location.hash`);
  assert('47. Resident denied access to /gatekeeper/deliveries -> redirected to /resident/home', residentRedirect === '#/resident/home', residentRedirect);

  // Navigate away to /entry
  await cdp.eval(`GrihamRouter.navigate('/entry')`);
  await sleep(350);

  // Admin accessing Deliveries must be blocked
  await cdp.eval(`
    GrihamAuth.setSession('mock-adm-token', { role: 'admin', society_id: 'GRIHAM-PUNE-001' }, 'GRIHAM-PUNE-001');
    GrihamRouter.navigate('/gatekeeper/deliveries');
  `);
  await sleep(400);
  const adminRedirect = await cdp.eval(`window.location.hash`);
  assert('48. Admin denied access to /gatekeeper/deliveries -> redirected to /admin/home', adminRedirect === '#/admin/home', adminRedirect);

  // Navigate away to /entry
  await cdp.eval(`GrihamRouter.navigate('/entry')`);
  await sleep(350);

  // Unauthenticated access must redirect to /gatekeeper/login
  await cdp.eval(`
    GrihamAuth.clearSession();
    GrihamRouter.navigate('/gatekeeper/deliveries');
  `);
  await sleep(400);
  const unauthRedirect = await cdp.eval(`window.location.hash`);
  assert('49. Unauthenticated access denied -> redirected to /gatekeeper/login', unauthRedirect === '#/gatekeeper/login', unauthRedirect);

  // -------------------------------------------------------------
  // TEST SECTION 15: VISITOR MANAGEMENT REGRESSION
  // -------------------------------------------------------------
  console.log('\n--- 15. Visitor Management Regression Check ---');
  await cdp.eval(`
    GrihamAuth.setSession('test-token', {
      id: 'GTK-001',
      name: 'Ramesh Patil',
      role: 'gatekeeper',
      station: 'Main Gate Security Station',
      society_id: 'GRIHAM-PUNE-001',
      societyName: 'Green Valley Residency'
    }, 'GRIHAM-PUNE-001');
    GrihamRouter.navigate('/gatekeeper/visitors');
  `);
  await sleep(400);

  const visitorScreenActive = await cdp.eval(`
    document.getElementById('screen-gatekeeper-visitors').classList.contains('active')
  `);
  assert('50. Visitor Management screen renders active without regression', visitorScreenActive === true);

  const visitorCount = await cdp.eval(`
    document.querySelectorAll('#visitor-list-container .gk-visitor-card').length
  `);
  assert('51. Visitor cards continue to render properly', visitorCount > 0, `Count: ${visitorCount}`);

  // -------------------------------------------------------------
  // TEST SECTION 16: RUNTIME CONSOLE & NETWORK AUDIT
  // -------------------------------------------------------------
  console.log('\n--- 16. Console & Network Runtime Audit ---');
  assert('52. Zero unhandled console errors', cdp.consoleErrors.length === 0, cdp.consoleErrors.join(' | '));
  assert('53. Zero network resource failures (200 OK)', cdp.networkErrors.length === 0, cdp.networkErrors.join(' | '));

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
    serverProcess.kill();
  }

  process.exit(failed === 0 ? 0 : 1);
}

runVerification().catch(err => {
  console.error('Fatal test error:', err);
  try { execSync('taskkill /F /IM chrome.exe /T', { stdio: 'ignore' }); } catch(e){}
  process.exit(1);
});
