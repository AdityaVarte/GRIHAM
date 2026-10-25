const http = require('http');
const { execSync, spawn } = require('child_process');

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getWsUrl() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const list = JSON.parse(data);
          const page = list.find(p => p.type === 'page');
          if (page && page.webSocketDebuggerUrl) resolve(page.webSocketDebuggerUrl);
          else reject(new Error('No page target found'));
        } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function main() {
  // Start server if needed
  let serverProcess = null;
  try {
    await new Promise((res, rej) => {
      http.get('http://localhost:8085/index.html', res).on('error', () => {
        serverProcess = spawn('node', ['scratch/server.js'], { detached: true, stdio: 'ignore' });
        setTimeout(res, 600);
      });
    });
  } catch(e) {}

  let chromeProcess = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    'http://localhost:8085/index.html'
  ]);
  await sleep(1000);

  const wsUrl = await getWsUrl();
  const ws = new WebSocket(wsUrl);
  let id = 1;
  const callbacks = new Map();
  ws.onmessage = evt => {
    const msg = JSON.parse(evt.data);
    if (msg.id && callbacks.has(msg.id)) {
      const { resolve, reject } = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    }
  };
  await new Promise((res, rej) => {
    ws.onopen = () => res();
    ws.onerror = err => rej(err);
  });

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const reqId = id++;
      callbacks.set(reqId, { resolve, reject });
      ws.send(JSON.stringify({ id: reqId, method, params }));
    });
  }

  async function evalJs(expr) {
    const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return res.result?.value;
  }

  // Full login
  await evalJs(`GrihamRouter.navigate('/gatekeeper/login')`);
  await sleep(400);
  await evalJs(`
    document.getElementById('gatekeeper-input-society-id').value = 'GRIHAM-PUNE-001';
    document.getElementById('gatekeeper-input-pin').value = '1234';
    document.getElementById('form-gatekeeper-login').dispatchEvent(new Event('submit', { cancelable: true }));
  `);
  await sleep(600);
  await evalJs(`GrihamRouter.navigate('/gatekeeper/profile')`);
  await sleep(600);

  // Set 360x800
  await send('Emulation.setDeviceMetricsOverride', {
    width: 360,
    height: 800,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sleep(500);

  const overflowInfo = await evalJs(`(() => {
    const docW = document.documentElement.scrollWidth;
    const bodyW = document.body.scrollWidth;
    const screen = document.getElementById('screen-gatekeeper-profile');
    const screenActive = screen ? screen.classList.contains('active') : false;
    const screenW = screen ? screen.scrollWidth : 0;
    const screenClientW = screen ? screen.clientWidth : 0;
    const screenOffsetW = screen ? screen.offsetWidth : 0;
    const winW = window.innerWidth;

    const screenOverflowing = [];
    if (screen) {
      screen.querySelectorAll('*').forEach(el => {
        if (el.scrollWidth > winW) {
          screenOverflowing.push({
            tag: el.tagName,
            id: el.id,
            className: el.className,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            offsetWidth: el.offsetWidth
          });
        }
      });
    }

    return {
      docW,
      bodyW,
      hash: window.location.hash,
      activeScreens: Array.from(document.querySelectorAll('.app-view.active')).map(s => s.id),
      screenActive,
      screenW,
      screenClientW,
      screenOffsetW,
      winW,
      screenOverflowing
    };
  })()`);

  console.log('OVERFLOW DIAGNOSTIC:', JSON.stringify(overflowInfo, null, 2));

  ws.close();
  chromeProcess.kill();
  if (serverProcess) serverProcess.kill();
  process.exit(0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
