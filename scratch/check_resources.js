const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'frontend', 'index.html'), 'utf8');

const scriptSrcs = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
const linkHrefs = [...html.matchAll(/<link[^>]+href=["']([^"']+)["']/g)].map(m => m[1]).filter(h => !h.startsWith('http') && !h.startsWith('//'));

let missing = 0;
[...scriptSrcs, ...linkHrefs].forEach(rel => {
  const p = path.join(__dirname, '..', 'frontend', rel);
  if (!fs.existsSync(p)) {
    console.error('MISSING:', rel);
    missing++;
  }
});

if (missing === 0) {
  console.log(`PASS: All ${scriptSrcs.length} scripts and ${linkHrefs.length} stylesheets exist on disk!`);
} else {
  console.error(`FAIL: Total missing files: ${missing}`);
  process.exit(1);
}
