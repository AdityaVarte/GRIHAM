const fs = require('fs');

const mockDir = 'frontend/js/mock';
const files = fs.readdirSync(mockDir).filter(f => f.endsWith('.js'));

const statusSummary = {};

files.forEach(f => {
  const code = fs.readFileSync(mockDir + '/' + f, 'utf8');
  // Match status: "..." or status === "..."
  const matches = [...code.matchAll(/status\s*(?::|===|!==)\s*["']([^"']+)["']/g)].map(m => m[1]);
  if (matches.length > 0) {
    statusSummary[f] = [...new Set(matches)];
  }
});

console.log('=== STATUS SYSTEM INVENTORY FROM MOCKS ===');
for (const [file, statuses] of Object.entries(statusSummary)) {
  console.log(`${file}:`);
  console.log('  ' + statuses.join(', '));
}
