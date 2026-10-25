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

async function run() {
  console.log('=== TESTING ALL 10 ACCESSIBILITY CONTROLS ===');
  try {
    execSync('taskkill /F /IM chrome.exe /T 2>nul || exit 0', { shell: 'cmd.exe' });
  } catch(e) {}
  await sleep(800);

  const tempUserDataDir = path.join(__dirname, 'temp_chrome_a11y_profile');
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
  const client = new CDPClient(wsUrl);
  await client.connect();
  await client.send('Page.navigate', { url: 'http://localhost:8085/index.html' });

  for (let i = 0; i < 40; i++) {
    try {
      const ready = await client.eval('document.readyState === "complete" && typeof window.GrihamA11y !== "undefined"');
      if (ready) break;
    } catch(e) {}
    await sleep(250);
  }

  // 1 & 2. Text Sizing (Bigger / Smaller)
  const textScaleResult = await client.eval(`(() => {
    GrihamA11y.stepTextSize(1);
    const scaleUp = GrihamA11y.state.textScale;
    const dispUp = document.getElementById('a11y-scale-display')?.textContent;
    const varUp = document.documentElement.style.getPropertyValue('--font-scale');
    GrihamA11y.stepTextSize(-1);
    const scaleDown = GrihamA11y.state.textScale;
    const dispDown = document.getElementById('a11y-scale-display')?.textContent;
    const varDown = document.documentElement.style.getPropertyValue('--font-scale');
    return { scaleUp, dispUp, varUp, scaleDown, dispDown, varDown };
  })()`);
  const scalePass = Math.abs(textScaleResult.scaleUp - 1.15) < 0.01 && 
                    textScaleResult.dispUp === '115%' && 
                    Math.abs(textScaleResult.scaleDown - 1.0) < 0.01 && 
                    textScaleResult.dispDown === '100%';
  console.log('1 & 2. Bigger & Smaller Text:', scalePass ? 'PASS' : 'FAIL', textScaleResult);

  // 3. Text Spacing
  const spacingResult = await client.eval(`(() => {
    GrihamA11y.setTextSpacing(true);
    const active = document.documentElement.classList.contains('accessibility-text-spacing');
    GrihamA11y.setTextSpacing(false);
    const inactive = !document.documentElement.classList.contains('accessibility-text-spacing');
    return active && inactive;
  })()`);
  console.log('3. Text Spacing:', spacingResult ? 'PASS' : 'FAIL');

  // 4. Line Height
  const lineHeightResult = await client.eval(`(() => {
    GrihamA11y.setLineHeight(true);
    const active = document.documentElement.classList.contains('accessibility-line-height');
    GrihamA11y.setLineHeight(false);
    const inactive = !document.documentElement.classList.contains('accessibility-line-height');
    return active && inactive;
  })()`);
  console.log('4. Line Height:', lineHeightResult ? 'PASS' : 'FAIL');

  // 5. Saturation
  const satResult = await client.eval(`(() => {
    GrihamA11y.setSaturation('low');
    const hasLow = document.documentElement.getAttribute('data-saturation') === 'low';
    GrihamA11y.setSaturation('high');
    const hasHigh = document.documentElement.getAttribute('data-saturation') === 'high';
    GrihamA11y.setSaturation('normal');
    const hasNormal = !document.documentElement.hasAttribute('data-saturation');
    return hasLow && hasHigh && hasNormal;
  })()`);
  console.log('5. Saturation (Mono / Normal / High):', satResult ? 'PASS' : 'FAIL');

  // 6. Invert Colors
  const invertResult = await client.eval(`(() => {
    GrihamA11y.setInvertColors(true);
    const active = document.documentElement.classList.contains('accessibility-invert');
    GrihamA11y.setInvertColors(false);
    const inactive = !document.documentElement.classList.contains('accessibility-invert');
    return active && inactive;
  })()`);
  console.log('6. Invert Colors:', invertResult ? 'PASS' : 'FAIL');

  // 7. Cursor
  const cursorResult = await client.eval(`(() => {
    GrihamA11y.setLargeCursor(true);
    const active = document.documentElement.classList.contains('accessibility-large-cursor');
    GrihamA11y.setLargeCursor(false);
    const inactive = !document.documentElement.classList.contains('accessibility-large-cursor');
    return active && inactive;
  })()`);
  console.log('7. Large Cursor:', cursorResult ? 'PASS' : 'FAIL');

  // 8. Pause Animation
  const animResult = await client.eval(`(() => {
    GrihamA11y.setPauseAnimation(true);
    const active = document.documentElement.classList.contains('accessibility-reduce-motion');
    GrihamA11y.setPauseAnimation(false);
    const inactive = !document.documentElement.classList.contains('accessibility-reduce-motion');
    return active && inactive;
  })()`);
  console.log('8. Pause Animations:', animResult ? 'PASS' : 'FAIL');

  // 9. Hide Images
  const imgResult = await client.eval(`(() => {
    GrihamA11y.setHideImages(true);
    const active = document.documentElement.classList.contains('accessibility-hide-images');
    GrihamA11y.setHideImages(false);
    const inactive = !document.documentElement.classList.contains('accessibility-hide-images');
    return active && inactive;
  })()`);
  console.log('9. Hide Images:', imgResult ? 'PASS' : 'FAIL');

  // 10. Reset All Settings
  const resetResult = await client.eval(`(() => {
    GrihamA11y.stepTextSize(2);
    GrihamA11y.setTextSpacing(true);
    GrihamA11y.setLargeCursor(true);
    GrihamA11y.setSaturation('low');
    GrihamA11y.resetAllSettings();
    const st = GrihamA11y.state;
    const isReset = Math.abs(st.textScale - 1.0) < 0.01 && !st.textSpacing && !st.largeCursor && st.saturation === 'normal';
    const noClass = !document.documentElement.classList.contains('accessibility-text-spacing') && 
                    !document.documentElement.classList.contains('accessibility-large-cursor') &&
                    !document.documentElement.hasAttribute('data-saturation');
    return isReset && noClass;
  })()`);
  console.log('10. Reset All Settings:', resetResult ? 'PASS' : 'FAIL');

  // Verify excluded controls are NOT present
  const excludedCheck = await client.eval(`(() => {
    const code = GrihamA11y.toString();
    const panel = document.getElementById('a11y-sheet')?.innerHTML || '';
    return {
      hasHighlightLinks: panel.includes('Highlight Links') || code.includes('highlightLinks'),
      hasAdhdMode: panel.includes('ADHD Mode') || code.includes('adhdMode'),
      hasDyslexia: panel.includes('Dyslexia') || code.includes('dyslexia')
    };
  })()`);
  const excludedClean = !excludedCheck.hasHighlightLinks && !excludedCheck.hasAdhdMode && !excludedCheck.hasDyslexia;
  console.log('Excluded controls (Highlight Links, ADHD Mode, Dyslexia) properly excluded:', excludedClean ? 'PASS' : 'FAIL', excludedCheck);

  await client.close();
  try { chromeProcess.kill(); } catch(e) {}
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
