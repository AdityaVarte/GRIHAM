const fs = require('fs');

console.log('=== CHECKING SOCIETY ISOLATION ACROSS MOCKS & APIS ===');

const mockFiles = [
  'frontend/js/mock/visitors.mock.js',
  'frontend/js/mock/deliveries.mock.js',
  'frontend/js/mock/complaints.mock.js',
  'frontend/js/mock/amenities.mock.js',
  'frontend/js/mock/maintenance.mock.js',
  'frontend/js/mock/approvals.mock.js',
  'frontend/js/mock/serviceRequests.mock.js',
  'frontend/js/mock/workers.mock.js',
  'frontend/js/mock/vendors.mock.js',
  'frontend/js/mock/sos.mock.js'
];

mockFiles.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  const checksSociety = code.includes('societyId') || code.includes('society_id');
  const checksActiveSociety = code.includes('activeSociety') || code.includes('getSocietyId');
  console.log(`${f.padEnd(42)} -> Society Key: ${checksSociety ? 'YES' : 'NO'}, Active Filtering: ${checksActiveSociety ? 'YES' : 'NO'}`);
});
