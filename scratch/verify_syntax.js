const fs = require('fs');
const path = require('path');
const cp = require('child_process');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.js')) {
      results.push(fullPath);
    }
  }
  return results;
}

const jsFiles = walk(path.join(__dirname, '..', 'frontend'));
let errorCount = 0;

for (const file of jsFiles) {
  try {
    cp.execFileSync(process.execPath, ['-c', file], { stdio: 'pipe' });
  } catch (err) {
    console.error('Syntax error in:', file, err.message);
    errorCount++;
  }
}

console.log(`Syntax check completed. Checked ${jsFiles.length} files. Errors found: ${errorCount}`);
if (errorCount > 0) process.exit(1);
