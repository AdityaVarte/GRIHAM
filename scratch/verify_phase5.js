/**
 * Phase 5 Verification Script: verify_phase5.js
 * Simulates browser environment and validates the consolidated API architecture,
 * endpoint definitions, URL construction, and mock datasets.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- STARTING PHASE 5 VERIFICATION ---');

// 1. Setup DOM/Browser mock context
const windowMock = {
  location: { hash: '#/admin/dashboard' },
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
  JSON: JSON
};

windowMock.window = windowMock;
windowMock.globalThis = windowMock;

// Mock localStorage
const storage = {};
windowMock.localStorage = {
  getItem: (k) => (storage[k] !== undefined ? storage[k] : null),
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

const context = vm.createContext(windowMock);

// Load script in context
function loadScript(relPath) {
  const code = fs.readFileSync(path.join(__dirname, '..', relPath), 'utf8');
  vm.runInContext(code, context, { filename: relPath });
}

// 2. Load scripts in the order from index.html
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
  'frontend/js/api/sos.api.js'
];

scriptsToLoad.forEach(s => {
  try {
    loadScript(s);
  } catch (err) {
    console.error(`Failed to load ${s}:`, err);
    process.exit(1);
  }
});

console.log('All scripts loaded successfully into VM context.');

// 3. Verification Assertions
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

async function runTests() {
  // Test 1: API_CONFIG and buildUrl
  const API_CONFIG = windowMock.API_CONFIG;
  assert(API_CONFIG && typeof API_CONFIG === 'object', 'API_CONFIG exists');
  assert(typeof API_CONFIG.buildUrl === 'function', 'API_CONFIG.buildUrl is a function');
  
  const testUrl1 = API_CONFIG.buildUrl('/v1/admin/amenities', 'AMN-001');
  assert(testUrl1 === '/v1/admin/amenities/AMN-001', `buildUrl single param: ${testUrl1}`);

  const testUrl2 = API_CONFIG.buildUrl('/v1/admin/bulk-services', 'BS-001', 'applicants', 'USR 102');
  assert(testUrl2 === '/v1/admin/bulk-services/BS-001/applicants/USR%20102', `buildUrl multi-param + encoding: ${testUrl2}`);

  const testUrl3 = API_CONFIG.buildUrl('/v1/admin/amenities/', null, 'status', undefined, '');
  assert(testUrl3 === '/v1/admin/amenities/status', `buildUrl null/undefined filtering: ${testUrl3}`);

  // Test 2: Approvals API functions
  assert(typeof windowMock.getApprovals === 'function', 'window.getApprovals exists');
  assert(typeof windowMock.getPendingApprovals === 'function', 'window.getPendingApprovals exists');
  assert(typeof windowMock.getApprovalById === 'function', 'window.getApprovalById exists');
  assert(typeof windowMock.approveRegistration === 'function', 'window.approveRegistration exists');
  assert(typeof windowMock.rejectRegistration === 'function', 'window.rejectRegistration exists');
  assert(typeof windowMock.updateApprovalDecision === 'function', 'window.updateApprovalDecision exists');

  // Test Approvals API execution with mock
  const approvalsRes = await windowMock.getApprovals();
  assert(approvalsRes && approvalsRes.status === 'success' && Array.isArray(approvalsRes.approvals), 'getApprovals returns approval list');
  assert(approvalsRes.approvals.length > 0, `getApprovals returned ${approvalsRes.approvals.length} approvals`);

  const pendingRes = await windowMock.getPendingApprovals();
  assert(pendingRes && pendingRes.status === 'success' && Array.isArray(pendingRes.approvals), 'getPendingApprovals returns pending approvals');
  assert(pendingRes.approvals.every(a => a.status.toLowerCase() === 'pending'), 'All returned approvals are pending');

  // Test 3: Service Requests API functions
  assert(typeof windowMock.getServiceRequests === 'function', 'window.getServiceRequests exists');
  assert(typeof windowMock.getServiceRequestDetail === 'function', 'window.getServiceRequestDetail exists');
  assert(typeof windowMock.createServiceRequest === 'function', 'window.createServiceRequest exists');
  assert(typeof windowMock.updateServiceRequest === 'function', 'window.updateServiceRequest exists');
  assert(typeof windowMock.updateServiceRequestStatus === 'function', 'window.updateServiceRequestStatus exists');
  assert(typeof windowMock.bulkUpdateServiceRequestStatus === 'function', 'window.bulkUpdateServiceRequestStatus exists');

  const srRes = await windowMock.getServiceRequests();
  assert(srRes && srRes.status === 'success' && Array.isArray(srRes.requests), 'getServiceRequests returns requests');
  assert(srRes.requests.length > 0, `getServiceRequests returned ${srRes.requests.length} service requests`);

  // Test 4: Amenities API functions
  assert(typeof windowMock.getAmenities === 'function', 'window.getAmenities exists');
  assert(typeof windowMock.getAmenityDetail === 'function', 'window.getAmenityDetail exists');
  assert(typeof windowMock.createAmenity === 'function', 'window.createAmenity exists');
  assert(typeof windowMock.getAmenityBookings === 'function', 'window.getAmenityBookings exists');

  const amnRes = await windowMock.getAmenities();
  assert(amnRes && amnRes.status === 'success' && Array.isArray(amnRes.amenities), 'getAmenities returns amenities list');

  // Test 5: Bulk Services API functions
  assert(typeof windowMock.getBulkServices === 'function', 'window.getBulkServices exists');
  assert(typeof windowMock.getBulkServiceDetail === 'function', 'window.getBulkServiceDetail exists');
  assert(typeof windowMock.createBulkService === 'function', 'window.createBulkService exists');
  assert(typeof windowMock.updateBulkServiceNegotiation === 'function', 'window.updateBulkServiceNegotiation exists');

  const bulkRes = await windowMock.getBulkServices();
  assert(bulkRes && bulkRes.status === 'success' && Array.isArray(bulkRes.campaigns), 'getBulkServices returns campaigns list');

  // Test 6: GrihamAPI namespace mapping
  const GrihamAPI = windowMock.GrihamAPI;
  assert(GrihamAPI && typeof GrihamAPI === 'object', 'window.GrihamAPI exists');
  assert(typeof GrihamAPI.getApprovals === 'function', 'GrihamAPI.getApprovals exists');
  assert(typeof GrihamAPI.getServiceRequests === 'function', 'GrihamAPI.getServiceRequests exists');
  assert(typeof GrihamAPI.getAmenities === 'function', 'GrihamAPI.getAmenities exists');
  assert(typeof GrihamAPI.getBulkServices === 'function', 'GrihamAPI.getBulkServices exists');

  // Test 7: Mock Data Ownership Verification
  assert(windowMock.MOCK_APPROVALS_DB !== undefined, 'MOCK_APPROVALS_DB loaded in approvals.mock.js');
  assert(windowMock.MOCK_SERVICE_REQUESTS_DB !== undefined, 'MOCK_SERVICE_REQUESTS_DB loaded in serviceRequests.mock.js');
  assert(windowMock.MOCK_BULK_SERVICES_DB !== undefined, 'MOCK_BULK_SERVICES_DB loaded in bulkServices.mock.js');

  const bulkFileContent = fs.readFileSync(path.join(__dirname, '../frontend/js/api/bulkServices.api.js'), 'utf8');
  assert(!bulkFileContent.includes('const MOCK_APPROVALS_DB'), 'bulkServices.api.js does not contain MOCK_APPROVALS_DB');
  assert(!bulkFileContent.includes('const MOCK_SERVICE_REQUESTS_DB'), 'bulkServices.api.js does not contain MOCK_SERVICE_REQUESTS_DB');
  assert(!bulkFileContent.includes('const MOCK_STAFF_VENDORS_DB'), 'bulkServices.api.js does not contain MOCK_STAFF_VENDORS_DB');

  const amenitiesFileContent = fs.readFileSync(path.join(__dirname, '../frontend/js/api/amenities.api.js'), 'utf8');
  assert(!amenitiesFileContent.includes('getServiceRequests'), 'amenities.api.js does not contain getServiceRequests');

  const srFileContent = fs.readFileSync(path.join(__dirname, '../frontend/js/api/serviceRequests.api.js'), 'utf8');
  assert(!srFileContent.includes('getApprovals'), 'serviceRequests.api.js does not contain getApprovals');
  assert(srFileContent.includes('getServiceRequests'), 'serviceRequests.api.js contains getServiceRequests');

  // Test 8: Centralized 401 Session Handling
  windowMock.GrihamAuth.setSession({
    token: 'test-token',
    user: { id: 'USR-001', role: 'resident', name: 'Test User' }
  });
  assert(windowMock.GrihamAuth.isAuthenticated(), 'User authenticated before 401 test');

  // Force 401 error through mock adapter
  try {
    await windowMock.loginResident({ phone: '0000000000', password: 'error' });
  } catch (err) {
    assert(err.status === 401, 'Mock login with invalid credentials returned 401');
  }
  // After 401 in apiRequest, GrihamAuth session was cleared
  assert(!windowMock.GrihamAuth.isAuthenticated(), 'GrihamAuth session cleared on 401');

  console.log('\n--- VERIFICATION SUMMARY ---');
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('ALL PHASE 5 CHECKS PASSED PERFECTLY!\n');
  }
}

runTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
