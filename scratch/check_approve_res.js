const http = require('http');

async function check() {
  const tabs = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/list', r => {
      let data = '';
      r.on('data', chunk => data += chunk);
      r.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
  const page = tabs.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `(async () => {
        const res = await window.approveCashPayment('pay-sep-rk');
        return { keys: Object.keys(res), raw: res };
      })()`,
      returnByValue: true,
      awaitPromise: true
    }
  }));
  ws.onmessage = (evt) => {
    const msg = JSON.parse(evt.data);
    console.log('Result:', JSON.stringify(msg.result?.result?.value, null, 2));
    ws.close();
    process.exit(0);
  };
}
check().catch(console.error);
