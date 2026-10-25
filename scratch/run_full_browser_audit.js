const http = require('http');
const { spawn, execSync } = require('child_process');
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
        http.get(`http://127.0.0.1:${DEBUG_PORT}/json/list`, r => {
          let data = '';
          r.on('data', chunk => data += chunk);
          r.on('end', () => resolve(JSON.parse(data)));
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
    this.consoleLogs = [];
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
          const text = msg.params.exceptionDetails.text + ' ' + (msg.params.exceptionDetails.exception?.description || '');
          this.consoleErrors.push(text);
        } else if (msg.method === 'Runtime.consoleAPICalled') {
          const text = msg.params.args.map(a => a.value || a.description || '').join(' ');
          if (msg.params.type === 'error') {
            this.consoleErrors.push(text);
          } else {
            this.consoleLogs.push({ type: msg.params.type, text });
          }
        } else if (msg.method === 'Network.responseReceived') {
          if (msg.params.response.status >= 400) {
            this.networkErrors.push({ url: msg.params.response.url, status: msg.params.response.status });
          }
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const reqId = this.id++;
      this.callbacks.set(reqId, { resolve, reject });
      this.ws.send(JSON.stringify({ id: reqId, method, params }));
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

  async close() {
    this.ws.close();
  }
}

async function main() {
  console.log('=== RUNNING COMPREHENSIVE BROWSER AUDIT ===');
  try {
    execSync('taskkill /F /IM chrome.exe /T 2>nul || exit 0', { shell: 'cmd.exe' });
  } catch(e) {}
  await sleep(800);

  const tempUserDataDir = path.join(__dirname, 'temp_chrome_audit_profile');
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
    'http://localhost:8085/index.html'
  ]);

  await sleep(1500);

  const wsUrl = await getDebuggerUrl();
  const client = new CDPClient(wsUrl);
  await client.connect();
  await client.send('Network.enable');
  await client.send('Runtime.enable');

  // Wait for complete ready state
  for (let i = 0; i < 40; i++) {
    const ready = await client.eval('document.readyState === "complete" && typeof GrihamRouter !== "undefined"');
    if (ready) break;
    await sleep(200);
  }

  console.log('App loaded successfully in headless Chrome.');

  // 1. Inspect Globals
  const globals = await client.eval(`({
    router: typeof GrihamRouter,
    auth: typeof GrihamAuth,
    storage: typeof GrihamStorage,
    state: typeof GrihamState,
    api: typeof GrihamAPI,
    a11y: typeof GrihamA11y,
    i18n: typeof GrihamI18n,
    theme: typeof GrihamTheme,
    toast: typeof GrihamToast,
    modal: typeof GrihamConfirmation,
    loader: typeof GrihamLoader,
    emptyState: typeof GrihamEmptyState,
    errorState: typeof GrihamErrorState,
    bottomSheet: typeof GrihamBottomSheet,
    statusBadge: typeof GrihamStatusBadge,
    callSelector: typeof GrihamCallSelectorUI
  })`);
  console.log('\n--- Core Architecture Globals ---');
  console.table(globals);

  // 2. Mock Databases
  const mockDbs = await client.eval(`
    Object.keys(window).filter(k => k.startsWith('MOCK_')).map(k => ({
      name: k,
      type: typeof window[k],
      keys: typeof window[k] === 'object' && window[k] !== null ? Object.keys(window[k]) : []
    }))
  `);
  console.log('\n--- Canonical Mock Datasets in Window ---');
  console.table(mockDbs);

  // 3. API Methods on GrihamAPI
  const apiMethods = await client.eval(`Object.keys(GrihamAPI)`);
  console.log(`\n--- GrihamAPI methods (${apiMethods.length}) ---`);
  console.log(apiMethods.join(', '));

  // 4. Test Public Routes
  console.log('\n--- Testing Public Routes ---');
  const publicRoutes = ['/', '/entry', '/resident/login', '/resident/register', '/auth/forgot-password', '/admin/login', '/gatekeeper/login'];
  for (const r of publicRoutes) {
    await client.eval(`GrihamRouter.navigate('${r}')`);
    await sleep(200);
    const info = await client.eval(`({
      route: GrihamState.currentRoute,
      activeView: document.querySelector('.app-view.active')?.id,
      title: document.title
    })`);
    console.log(`Route: ${r.padEnd(25)} -> activeView: ${(info.activeView || 'NONE').padEnd(25)} title: ${info.title}`);
  }

  // 5. Test Unauthorized Access (401 Redirects)
  console.log('\n--- Testing Protected Routes Unauthenticated (401 Redirect) ---');
  const testProtected = [
    { route: '/admin/home', expectedRedirect: '/admin/login' },
    { route: '/resident/home', expectedRedirect: '/resident/login' },
    { route: '/gatekeeper/home', expectedRedirect: '/gatekeeper/login' }
  ];
  for (const t of testProtected) {
    await client.eval(`GrihamRouter.navigate('${t.route}')`);
    await sleep(200);
    const curr = await client.eval(`window.location.hash.slice(1)`);
    const passed = curr === t.expectedRedirect;
    console.log(`Access ${t.route.padEnd(20)} -> redirected to: ${curr.padEnd(20)} [${passed ? 'PASS' : 'FAIL'}]`);
  }

  // 6. Test Role Isolation (403 Forbidden)
  console.log('\n--- Testing Role Authorization (403 Forbidden Redirect) ---');
  // Log in as Resident
  await client.eval(`
    GrihamAuth.setSession({
      token: 'test_token',
      role: 'resident',
      user: { id: 'RES-001', name: 'Aarav Sharma', societyId: 'GRIHAM-PUNE-001' }
    });
  `);
  // Resident accessing /admin/home
  await client.eval(`GrihamRouter.navigate('/admin/home')`);
  await sleep(200);
  const residentAdminBlocked = await client.eval(`window.location.hash.slice(1)`);
  console.log(`Resident to /admin/home -> redirected to: ${residentAdminBlocked} [${residentAdminBlocked === '/resident/home' ? 'PASS' : 'FAIL'}]`);

  // Resident accessing /gatekeeper/home
  await client.eval(`GrihamRouter.navigate('/gatekeeper/home')`);
  await sleep(200);
  const residentGkBlocked = await client.eval(`window.location.hash.slice(1)`);
  console.log(`Resident to /gatekeeper/home -> redirected to: ${residentGkBlocked} [${residentGkBlocked === '/resident/home' ? 'PASS' : 'FAIL'}]`);

  // Log in as Admin
  await client.eval(`
    GrihamAuth.setSession({
      token: 'admin_token',
      role: 'admin',
      user: { id: 'ADM-001', name: 'Society Secretary', societyId: 'GRIHAM-PUNE-001' }
    });
  `);
  // Admin accessing /resident/home
  await client.eval(`GrihamRouter.navigate('/resident/home')`);
  await sleep(200);
  const adminResidentBlocked = await client.eval(`window.location.hash.slice(1)`);
  console.log(`Admin to /resident/home -> redirected to: ${adminResidentBlocked} [${adminResidentBlocked === '/admin/home' ? 'PASS' : 'FAIL'}]`);

  // Log in as Gatekeeper
  await client.eval(`
    GrihamAuth.setSession({
      token: 'gk_token',
      role: 'gatekeeper',
      user: { id: 'GK-001', name: 'Ramesh Shinde', societyId: 'GRIHAM-PUNE-001' }
    });
  `);
  // Gatekeeper accessing /admin/home
  await client.eval(`GrihamRouter.navigate('/admin/home')`);
  await sleep(200);
  const gkAdminBlocked = await client.eval(`window.location.hash.slice(1)`);
  console.log(`Gatekeeper to /admin/home -> redirected to: ${gkAdminBlocked} [${gkAdminBlocked === '/gatekeeper/home' ? 'PASS' : 'FAIL'}]`);

  // 7. Check All 10 Accessibility Controls
  console.log('\n--- Checking 10 Accessibility Controls in GrihamA11y ---');
  const a11yChecks = await client.eval(`({
    hasInit: typeof GrihamA11y.init === 'function',
    hasToggleSheet: typeof GrihamA11y.toggleSheet === 'function',
    settings: Object.keys(GrihamA11y.state || {}),
    controlsDom: Array.from(document.querySelectorAll('[data-a11y-action]')).map(el => el.getAttribute('data-a11y-action'))
  })`);
  console.log('GrihamA11y state keys:', a11yChecks.settings);
  console.log('GrihamA11y DOM control actions:', a11yChecks.controlsDom);

  // 8. Internationalization Audit
  console.log('\n--- Checking Internationalization (I18N_DICTIONARY) ---');
  const i18nInfo = await client.eval(`({
    languages: Object.keys(I18N_DICTIONARY || {}),
    enCount: Object.keys(I18N_DICTIONARY?.en || {}).length,
    hiCount: Object.keys(I18N_DICTIONARY?.hi || {}).length,
    mrCount: Object.keys(I18N_DICTIONARY?.mr || {}).length,
    currentLang: GrihamI18n.currentLang
  })`);
  console.log('Languages available:', i18nInfo.languages);
  console.log(`Key counts: EN=${i18nInfo.enCount}, HI=${i18nInfo.hiCount}, MR=${i18nInfo.mrCount}`);

  // Missing keys check
  const missingKeys = await client.eval(`(() => {
    const en = Object.keys(I18N_DICTIONARY.en);
    const hi = new Set(Object.keys(I18N_DICTIONARY.hi));
    const mr = new Set(Object.keys(I18N_DICTIONARY.mr));
    return {
      missingInHi: en.filter(k => !hi.has(k)),
      missingInMr: en.filter(k => !mr.has(k))
    };
  })()`);
  console.log(`Missing in Hindi: ${missingKeys.missingInHi.length}`);
  if (missingKeys.missingInHi.length > 0) console.log('Sample:', missingKeys.missingInHi.slice(0, 10));
  console.log(`Missing in Marathi: ${missingKeys.missingInMr.length}`);
  if (missingKeys.missingInMr.length > 0) console.log('Sample:', missingKeys.missingInMr.slice(0, 10));

  // Console errors and network errors
  console.log('\n--- Console Errors & Network Errors ---');
  console.log('Console Errors caught:', client.consoleErrors.length);
  if (client.consoleErrors.length > 0) {
    client.consoleErrors.forEach(e => console.log('  [ERROR]', e));
  }
  console.log('Network 4xx/5xx errors:', client.networkErrors.length);
  if (client.networkErrors.length > 0) {
    client.networkErrors.forEach(e => console.log('  [NET]', e.url, e.status));
  }

  await client.close();
  try {
    chromeProcess.kill();
  } catch(e) {}
  console.log('\nAudit check script completed successfully.');
}

main().catch(err => {
  console.error('Audit run failed:', err);
  process.exit(1);
});
