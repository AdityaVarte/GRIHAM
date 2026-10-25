const fs = require('fs');
const lines = fs.readFileSync('frontend/js/constants.js', 'utf8').split('\n');
const dups = ['complaints_title', 'label_phone', 'label_email', 'btn_cancel', 'menu_add_staff', 'filter_all', 'label_joining_date', 'btn_edit_profile'];

dups.forEach(key => {
  console.log('=== ' + key + ' ===');
  lines.forEach((l, i) => {
    const trimmed = l.trim();
    if (trimmed.startsWith(key + ':') || trimmed.startsWith('"' + key + '":') || trimmed.startsWith("'" + key + "':")) {
      console.log(`${i + 1}: ${trimmed}`);
    }
  });
});
