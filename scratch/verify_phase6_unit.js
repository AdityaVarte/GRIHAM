/**
 * Phase 6 Unit & Contract Verification: verify_phase6_unit.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- STARTING PHASE 6 UNIT & CONTRACT VERIFICATION ---');

const storage = {};
let _hash = '#/';
const windowMock = {
  location: {
    get hash() { return _hash; },
    set hash(v) {
      _hash = v.startsWith('#') ? v : '#' + v;
      if (context && context.GrihamRouter) {
        context.GrihamRouter.handleRoute();
      }
    }
  },
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  Date: Date,
  Math: Math,
  URL: URL,
  URLSearchParams: URLSearchParams,
  console: console,
  Set: Set,
  Map: Map,
  Array: Array,
  Object: Object,
  String: String,
  Number: Number,
  Boolean: Boolean,
  Promise: Promise,
  encodeURIComponent: encodeURIComponent,
  decodeURIComponent: decodeURIComponent,
  Error: Error,
  JSON: JSON,
  localStorage: {
    getItem: (k) => (storage[k] !== undefined ? storage[k] : null),
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; },
    clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
  },
  addEventListener: () => {},
  removeEventListener: () => {},
  document: {
    title: '',
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    documentElement: {
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false,
        toggle: () => false
      },
      style: {}
    },
    body: {
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false,
        toggle: () => false
      },
      style: {}
    }
  }
};

windowMock.window = windowMock;
windowMock.globalThis = windowMock;

const context = vm.createContext(windowMock);

function loadScript(relPath) {
  const code = fs.readFileSync(path.join(__dirname, '..', relPath), 'utf8');
  vm.runInContext(code, context, { filename: relPath });
}

// Load scripts in order
const scriptsToLoad = [
  'frontend/js/utils/helpers.js',
  'frontend/js/utils/dateTime.js',
  'frontend/js/utils/formatting.js',
  'frontend/js/utils/permissions.js',
  'frontend/js/utils/storage.js',
  'frontend/js/utils/validation.js',
  'frontend/js/auth.js',
  'frontend/js/constants.js',
  'frontend/js/state.js',
  'frontend/js/mock/admin.mock.js',
  'frontend/js/mock/amenities.mock.js',
  'frontend/js/mock/approvals.mock.js',
  'frontend/js/mock/auth.mock.js',
  'frontend/js/mock/bulkServices.mock.js',
  'frontend/js/mock/complaints.mock.js',
  'frontend/js/mock/maintenance.mock.js',
  'frontend/js/mock/residents.mock.js',
  'frontend/js/mock/serviceRequests.mock.js',
  'frontend/js/mock/vendors.mock.js',
  'frontend/js/mock/workers.mock.js',
  'frontend/js/mock/sos.mock.js',
  'frontend/js/api/api.js',
  'frontend/js/api/admin.api.js',
  'frontend/js/api/amenities.api.js',
  'frontend/js/api/approvals.api.js',
  'frontend/js/api/auth.api.js',
  'frontend/js/api/bulkServices.api.js',
  'frontend/js/api/complaints.api.js',
  'frontend/js/api/gatekeeper.api.js',
  'frontend/js/api/maintenance.api.js',
  'frontend/js/api/resident.api.js',
  'frontend/js/api/serviceRequests.api.js',
  'frontend/js/api/staff.api.js',
  'frontend/js/api/workers.api.js',
  'frontend/js/api/sos.api.js',
  'frontend/js/router.js',
  'frontend/js/components/accessibilityPanel.js'
];

scriptsToLoad.forEach(s => loadScript(s));

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Unauthenticated Route Guards
assert(context.GrihamRouter !== undefined, 'GrihamRouter is defined');
assert(context.GrihamAuth !== undefined, 'GrihamAuth is defined');
assert(!context.GrihamAuth.isAuthenticated(), 'Initial state is unauthenticated');

// Test unauthenticated redirects
context.location.hash = '#/admin/home';
context.GrihamRouter.handleRoute();
assert(context.location.hash === '#/admin/login', 'Unauthenticated /admin/home redirects to /admin/login');

context.location.hash = '#/resident/home';
context.GrihamRouter.handleRoute();
assert(context.location.hash === '#/resident/login', 'Unauthenticated /resident/home redirects to /resident/login');

context.location.hash = '#/gatekeeper/home';
context.GrihamRouter.handleRoute();
assert(context.location.hash === '#/gatekeeper/login', 'Unauthenticated /gatekeeper/home redirects to /gatekeeper/login');

// 2. Resident Role & Authorization Check
context.GrihamAuth.setSession('token-resident', { id: 'usr-1', name: 'Rajesh', role: 'resident' }, 'GRIHAM-PUNE-001');
assert(context.GrihamAuth.isAuthenticated(), 'Resident session is authenticated');
assert(context.GrihamAuth.getRole() === 'resident', 'Resident role is resident');
assert(context.GrihamAuth.isResident(), 'isResident() returns true');
assert(!context.GrihamAuth.isAdmin(), 'isAdmin() returns false for resident');

// Resident accessing resident home
context.location.hash = '#/resident/home';
context.GrihamRouter.handleRoute();
assert(context.location.hash === '#/resident/home', 'Resident can access /resident/home');

// Resident accessing admin home (403 unauthorized)
context.location.hash = '#/admin/home';
context.GrihamRouter.handleRoute();
assert(context.location.hash === '#/resident/home', 'Resident accessing /admin/home is blocked and redirected to /resident/home');

// Resident accessing gatekeeper home (403 unauthorized)
context.location.hash = '#/gatekeeper/home';
context.GrihamRouter.handleRoute();
assert(context.location.hash === '#/resident/home', 'Resident accessing /gatekeeper/home is blocked and redirected to /resident/home');

// 3. Admin Role & Authorization Check
context.GrihamAuth.setSession('token-admin', { id: 'adm-1', name: 'Chairman', role: 'admin' }, 'GRIHAM-PUNE-001');
assert(context.GrihamAuth.isAdmin(), 'isAdmin() returns true for admin');
assert(!context.GrihamAuth.isResident(), 'isResident() returns false for admin');

// Admin accessing admin routes
context.location.hash = '#/admin/home';
context.GrihamRouter.handleRoute();
assert(context.location.hash === '#/admin/home', 'Admin can access /admin/home');

context.location.hash = '#/admin/approvals';
context.GrihamRouter.handleRoute();
assert(context.location.hash === '#/admin/approvals', 'Admin can access /admin/approvals');

context.location.hash = '#/admin/amenities';
context.GrihamRouter.handleRoute();
assert(context.location.hash === '#/admin/amenities', 'Admin can access /admin/amenities');

context.location.hash = '#/admin/bulk-service';
context.GrihamRouter.handleRoute();
assert(context.location.hash === '#/admin/bulk-service', 'Admin can access /admin/bulk-service');

context.location.hash = '#/admin/add-staff';
context.GrihamRouter.handleRoute();
assert(context.location.hash === '#/admin/add-staff', 'Admin can access /admin/add-staff');

// Admin accessing resident home (403 unauthorized)
context.location.hash = '#/resident/home';
context.GrihamRouter.handleRoute();
assert(context.location.hash === '#/admin/home', 'Admin accessing /resident/home is blocked and redirected to /admin/home');

// 4. Gatekeeper Role & Authorization Check
context.GrihamAuth.setSession('token-gk', { id: 'gk-1', name: 'Security Ramu', role: 'gatekeeper' }, 'GRIHAM-PUNE-001');
assert(context.GrihamAuth.isGatekeeper(), 'isGatekeeper() returns true for gatekeeper');
assert(!context.GrihamAuth.isAdmin(), 'isAdmin() returns false for gatekeeper');

// Gatekeeper accessing gatekeeper route
context.location.hash = '#/gatekeeper/home';
context.GrihamRouter.handleRoute();
assert(context.location.hash === '#/gatekeeper/home', 'Gatekeeper can access /gatekeeper/home');

// Gatekeeper accessing admin route (403 unauthorized)
context.location.hash = '#/admin/home';
context.GrihamRouter.handleRoute();
assert(context.location.hash === '#/gatekeeper/home', 'Gatekeeper accessing /admin/home is blocked and redirected to /gatekeeper/home');

// 5. Logout Check
context.GrihamAuth.logout('/entry');
assert(!context.GrihamAuth.isAuthenticated(), 'GrihamAuth.logout() clears authentication');
assert(context.GrihamAuth.getUser() === null, 'User object is cleared on logout');

// 6. Accessibility Component
assert(typeof context.GrihamA11y !== 'undefined', 'GrihamA11y is defined');
assert(typeof context.GrihamA11y.toggleSheet === 'function', 'GrihamA11y.toggleSheet is a function');
assert(typeof context.GrihamA11y.stepTextSize === 'function', 'GrihamA11y.stepTextSize is a function');
assert(typeof context.GrihamA11y.setTextSpacing === 'function', 'GrihamA11y.setTextSpacing is a function');
assert(typeof context.GrihamA11y.setLineHeight === 'function', 'GrihamA11y.setLineHeight is a function');
assert(typeof context.GrihamA11y.setSaturation === 'function', 'GrihamA11y.setSaturation is a function');
assert(typeof context.GrihamA11y.setInvertColors === 'function', 'GrihamA11y.setInvertColors is a function');
assert(typeof context.GrihamA11y.setLargeCursor === 'function', 'GrihamA11y.setLargeCursor is a function');
assert(typeof context.GrihamA11y.setPauseAnimation === 'function', 'GrihamA11y.setPauseAnimation is a function');
assert(typeof context.GrihamA11y.setHideImages === 'function', 'GrihamA11y.setHideImages is a function');
assert(typeof context.GrihamA11y.resetAllSettings === 'function', 'GrihamA11y.resetAllSettings is a function');

console.log(`\n--- SUMMARY: ${passed} PASSED, ${failed} FAILED ---`);
if (failed > 0) process.exit(1);
