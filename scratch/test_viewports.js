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
  console.log('=== TESTING MOBILE VIEWPORTS & OVERFLOW ===');
  try {
    execSync('taskkill /F /IM chrome.exe /T 2>nul || exit 0', { shell: 'cmd.exe' });
  } catch(e) {}
  await sleep(800);

  const tempUserDataDir = path.join(__dirname, 'temp_chrome_viewport_profile');
  if (fs.existsSync(tempUserDataDir)) {
    try { fs.rmSync(tempUserDataDir, { recursive: true, force: true }); } catch(e){}
  }

  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--user-data-dir=${tempUserDataDir}`,
    'about:blank'
  ]);

  await sleep(1500);

  const wsUrl = await getDebuggerUrl();
  const client = new CDPClient(wsUrl);
  await client.connect();
  await client.send('Page.navigate', { url: 'http://localhost:8085/index.html' });

  // Wait for complete
  for (let i = 0; i < 40; i++) {
    const ready = await client.eval('document.readyState === "complete" && typeof GrihamRouter !== "undefined"');
    if (ready) break;
    await sleep(250);
  }

  const viewports = [
    { name: '360×800', width: 360, height: 800 },
    { name: '375×812', width: 375, height: 812 },
    { name: '390×844', width: 390, height: 844 },
    { name: '412×915', width: 412, height: 915 }
  ];

  const screensToTest = [
    // Resident screens
    { role: 'resident', user: { id: 'USR-001', name: 'Rajesh Kumar', society_id: 'GRIHAM-PUNE-001', role: 'resident' }, route: '/resident/home' },
    { role: 'resident', user: { id: 'USR-001', name: 'Rajesh Kumar', society_id: 'GRIHAM-PUNE-001', role: 'resident' }, route: '/resident/maintenance' },
    { role: 'resident', user: { id: 'USR-001', name: 'Rajesh Kumar', society_id: 'GRIHAM-PUNE-001', role: 'resident' }, route: '/resident/complaints' },
    { role: 'resident', user: { id: 'USR-001', name: 'Rajesh Kumar', society_id: 'GRIHAM-PUNE-001', role: 'resident' }, route: '/resident/services' },
    { role: 'resident', user: { id: 'USR-001', name: 'Rajesh Kumar', society_id: 'GRIHAM-PUNE-001', role: 'resident' }, route: '/resident/amenities' },
    { role: 'resident', user: { id: 'USR-001', name: 'Rajesh Kumar', society_id: 'GRIHAM-PUNE-001', role: 'resident' }, route: '/resident/voting' },
    { role: 'resident', user: { id: 'USR-001', name: 'Rajesh Kumar', society_id: 'GRIHAM-PUNE-001', role: 'resident' }, route: '/resident/profile' },
    // Admin screens
    { role: 'admin', user: { id: 'ADM-001', name: 'Admin', society_id: 'GRIHAM-PUNE-001', role: 'admin' }, route: '/admin/home' },
    { role: 'admin', user: { id: 'ADM-001', name: 'Admin', society_id: 'GRIHAM-PUNE-001', role: 'admin' }, route: '/admin/maintenance' },
    { role: 'admin', user: { id: 'ADM-001', name: 'Admin', society_id: 'GRIHAM-PUNE-001', role: 'admin' }, route: '/admin/complaints' },
    { role: 'admin', user: { id: 'ADM-001', name: 'Admin', society_id: 'GRIHAM-PUNE-001', role: 'admin' }, route: '/admin/approvals' },
    { role: 'admin', user: { id: 'ADM-001', name: 'Admin', society_id: 'GRIHAM-PUNE-001', role: 'admin' }, route: '/admin/workers' },
    { role: 'admin', user: { id: 'ADM-001', name: 'Admin', society_id: 'GRIHAM-PUNE-001', role: 'admin' }, route: '/admin/amenities' },
    { role: 'admin', user: { id: 'ADM-001', name: 'Admin', society_id: 'GRIHAM-PUNE-001', role: 'admin' }, route: '/admin/bulk-service' },
    { role: 'admin', user: { id: 'ADM-001', name: 'Admin', society_id: 'GRIHAM-PUNE-001', role: 'admin' }, route: '/admin/add-staff' },
    { role: 'admin', user: { id: 'ADM-001', name: 'Admin', society_id: 'GRIHAM-PUNE-001', role: 'admin' }, route: '/admin/sos' },
    { role: 'admin', user: { id: 'ADM-001', name: 'Admin', society_id: 'GRIHAM-PUNE-001', role: 'admin' }, route: '/admin/profile' },
    // Gatekeeper screens
    { role: 'gatekeeper', user: { id: 'GTK-001', name: 'Amit Sharma', society_id: 'GRIHAM-PUNE-001', role: 'gatekeeper' }, route: '/gatekeeper/home' },
    { role: 'gatekeeper', user: { id: 'GTK-001', name: 'Amit Sharma', society_id: 'GRIHAM-PUNE-001', role: 'gatekeeper' }, route: '/gatekeeper/visitors' },
    { role: 'gatekeeper', user: { id: 'GTK-001', name: 'Amit Sharma', society_id: 'GRIHAM-PUNE-001', role: 'gatekeeper' }, route: '/gatekeeper/deliveries' },
    { role: 'gatekeeper', user: { id: 'GTK-001', name: 'Amit Sharma', society_id: 'GRIHAM-PUNE-001', role: 'gatekeeper' }, route: '/gatekeeper/notifications' },
    { role: 'gatekeeper', user: { id: 'GTK-001', name: 'Amit Sharma', society_id: 'GRIHAM-PUNE-001', role: 'gatekeeper' }, route: '/gatekeeper/profile' }
  ];

  let totalTested = 0;
  let totalOverflows = 0;

  for (const vp of viewports) {
    console.log(`\n=== Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(200);

    for (const s of screensToTest) {
      // Set session for the role
      await client.eval(`
        GrihamAuth.setSession({
          token: 'test_token_${s.role}',
          role: '${s.role}',
          user: ${JSON.stringify(s.user)}
        });
      `);
      await client.eval(`GrihamRouter.navigate('${s.route}')`);
      await sleep(150);

      // Check overflow
      const check = await client.eval(`(() => {
        const docW = document.documentElement.scrollWidth;
        const winW = window.innerWidth;
        const bodyW = document.body.scrollWidth;
        const appW = document.getElementById('app')?.scrollWidth || 0;
        const hasDocOverflow = docW > winW;
        
        // Find any elements exceeding container width
        const activeView = document.querySelector('.app-view.active');
        let overflowingEls = [];
        if (activeView) {
          const viewRect = activeView.getBoundingClientRect();
          const all = activeView.querySelectorAll('*');
          for (let el of all) {
            const r = el.getBoundingClientRect();
            if (r.width > viewRect.width + 2) {
              overflowingEls.push({
                tag: el.tagName,
                className: (el.className || '').toString().slice(0, 40),
                width: Math.round(r.width),
                containerWidth: Math.round(viewRect.width)
              });
            }
          }
        }
        return {
          docW,
          winW,
          hasDocOverflow,
          overflowCount: overflowingEls.length,
          samples: overflowingEls.slice(0, 3)
        };
      })()`);

      totalTested++;
      if (check.hasDocOverflow || check.overflowCount > 0) {
        totalOverflows++;
        console.error(`  [OVERFLOW] ${s.route} (docW=${check.docW}, winW=${check.winW}, overflowing=${check.overflowCount})`);
        if (check.samples.length > 0) {
          console.error('    Samples:', check.samples);
        }
      }
    }
  }

  console.log(`\nViewport & Overflow Results: Tested ${totalTested} combinations across 4 viewports.`);
  if (totalOverflows === 0) {
    console.log('PASS: ZERO horizontal overflow detected across all 4 viewports on all tested screens!');
  } else {
    console.error(`FAIL: Detected ${totalOverflows} overflow issues.`);
  }

  await client.close();
  try { chromeProcess.kill(); } catch(e) {}
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
