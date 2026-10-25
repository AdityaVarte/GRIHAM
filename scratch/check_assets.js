const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const p = path.join(dir, item);
    if (fs.statSync(p).isDirectory()) files.push(...walk(p));
    else if (p.endsWith('.js') || p.endsWith('.html') || p.endsWith('.css')) files.push(p);
  }
  return files;
}

const files = walk('frontend');
const assetRefs = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /(?:src|href)=['"]([^'"]+\.(?:png|jpg|jpeg|svg|webp|ico))['"]|url\(['"]?([^'")\s]+\.(?:png|jpg|jpeg|svg|webp|ico))['"]?\)/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const ref = match[1] || match[2];
    if (ref && !ref.startsWith('http') && !ref.startsWith('data:')) {
      assetRefs.push({ ref, from: f });
    }
  }
});

let missing = 0;
const seen = new Set();
assetRefs.forEach(({ ref, from }) => {
  if (seen.has(ref)) return;
  seen.add(ref);
  let targetPath;
  if (ref.startsWith('/')) {
    targetPath = path.join('frontend', ref.slice(1));
  } else {
    targetPath = path.join(path.dirname(from), ref);
  }
  if (!fs.existsSync(targetPath)) {
    console.log('Missing asset:', ref, 'referenced from:', from);
    missing++;
  }
});

console.log('Checked ' + seen.size + ' unique asset references. Missing: ' + missing);
