const fs = require('fs');
const path = require('path');

// Read all mock files and extract top-level variable declarations (const MOCK_..., let MOCK_..., var MOCK_...)
const mockDir = 'frontend/js/mock';
const mockFiles = fs.readdirSync(mockDir).filter(f => f.endsWith('.js'));

console.log('=== CANONICAL MOCK DATASETS ===');
mockFiles.forEach(f => {
  const content = fs.readFileSync(path.join(mockDir, f), 'utf8');
  const decls = [...content.matchAll(/(?:const|let|var)\s+([A-Za-z0-9_]+)\s*=/g)].map(m => m[1]);
  const mockVars = decls.filter(d => d.includes('MOCK') || d.includes('DB') || d.includes('DATA'));
  console.log(`${f}:`, mockVars.join(', ') || decls.slice(0, 5).join(', '));
});

console.log('\n=== API MODULES ===');
const apiDir = 'frontend/js/api';
const apiFiles = fs.readdirSync(apiDir).filter(f => f.endsWith('.js'));
apiFiles.forEach(f => {
  const content = fs.readFileSync(path.join(apiDir, f), 'utf8');
  // Look for GrihamAPI methods or functions
  const methods = [...content.matchAll(/(?:GrihamAPI\s*\.\s*|window\.GrihamAPI\s*\.\s*)([A-Za-z0-9_]+)\s*=/g)].map(m => m[1]);
  const functions = [...content.matchAll(/function\s+([A-Za-z0-9_]+)\s*\(/g)].map(m => m[1]);
  console.log(`${f}:`, methods.length > 0 ? `(${methods.length} API methods) ${methods.slice(0, 8).join(', ')}...` : `functions: ${functions.slice(0, 5).join(', ')}`);
});
