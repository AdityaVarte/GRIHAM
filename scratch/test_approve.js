const WebSocket = require('ws');
const http = require('http');

http.get('http://127.0.0.1:9222/json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const tabs = JSON.parse(data);
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
    ws.on('open', () => {
      ws.send(JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: {
          expression: '(async () => { return await window.approveCashPayment("pay-sep-rk"); })()',
          awaitPromise: true,
          returnByValue: true
        }
      }));
    });
    ws.on('message', (msg) => {
      console.log('Approve result:', JSON.parse(msg).result?.result?.value);
      ws.close();
    });
  });
});
