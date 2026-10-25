const fs = require('fs');

console.log('=== DUPLICATION AUDIT ===');

// 1. Duplicate Routes in router.js
const routerCode = fs.readFileSync('frontend/js/router.js', 'utf8');
const routePermMatches = [...routerCode.matchAll(/"([^"]+)":\s*\{\s*(?:public|role)/g)].map(m => m[1]);
const seenRoutes = new Set();
const duplicateRoutes = [];
routePermMatches.forEach(r => {
  if (seenRoutes.has(r)) duplicateRoutes.push(r);
  seenRoutes.add(r);
});
console.log('Duplicate Route Permissions:', duplicateRoutes.length > 0 ? duplicateRoutes : 'None');

// 2. Duplicate Translation Keys in constants.js
const constCode = fs.readFileSync('frontend/js/constants.js', 'utf8');
const enBlock = constCode.match(/en:\s*\{([\s\S]*?)\n\s*\},/)?.[1] || '';
const enKeys = [...enBlock.matchAll(/^\s*([a-zA-Z0-9_]+)\s*:/gm)].map(m => m[1]);
const seenKeys = new Set();
const dupKeys = [];
enKeys.forEach(k => {
  if (seenKeys.has(k)) dupKeys.push(k);
  seenKeys.add(k);
});
console.log('Duplicate Translation Keys in EN dictionary:', dupKeys.length > 0 ? dupKeys : 'None');

// 3. Duplicate API methods on GrihamAPI
const apiCode = fs.readFileSync('frontend/js/api/api.js', 'utf8');
const apiMethods = [...apiCode.matchAll(/^\s*([a-zA-Z0-9_]+)\s*:\s*\(\.\.\.args\)/gm)].map(m => m[1]);
const seenApis = new Set();
const dupApis = [];
apiMethods.forEach(m => {
  if (seenApis.has(m)) dupApis.push(m);
  seenApis.add(m);
});
console.log('Duplicate GrihamAPI facade methods:', dupApis.length > 0 ? dupApis : 'None');

// 4. Multiple controllers or mock databases
const mockFiles = fs.readdirSync('frontend/js/mock').filter(f => f.endsWith('.js'));
console.log('Mock files count:', mockFiles.length);
