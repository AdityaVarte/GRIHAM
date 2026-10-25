const fs = require('fs');

let content = fs.readFileSync('frontend/js/constants.js', 'utf8');

// 1. complaints_title -> dashboard_recent_complaints in line 97, 516, 935
content = content.replace('complaints_title: "Recent Complaints",', 'dashboard_recent_complaints: "Recent Complaints",');
content = content.replace('complaints_title: "हाल की शिकायतें",', 'dashboard_recent_complaints: "हाल की शिकायतें",');
content = content.replace('complaints_title: "अलीकडील तक्रारी",', 'dashboard_recent_complaints: "अलीकडील तक्रारी",');

// 2. label_email in workers section -> label_email_optional
content = content.replace('label_email: "Email (optional)",', 'label_email_optional: "Email (optional)",');
content = content.replace('label_email: "ईमेल (वैकल्पिक)",', 'label_email_optional: "ईमेल (वैकल्पिक)",');
content = content.replace('label_email: "ईमेल (पर्यायी)",', 'label_email_optional: "ईमेल (पर्यायी)",');

// 3. Remove redundant duplicate lines
const removeLines = [
  // EN
  '    label_phone: "Phone Number",\n',
  '    btn_cancel: "Cancel",\n',
  '    menu_add_staff: "Add Vendor / Worker / Gatekeeper",\n',
  '    filter_all: "All",\n',
  '    label_joining_date: "Joining Date",\n',
  '    btn_edit_profile: "Edit Profile",\n',
  // HI
  '    label_phone: "फ़ोन नंबर",\n',
  '    btn_cancel: "रद्द करें",\n',
  '    menu_add_staff: "विक्रेता / कार्यकर्ता / द्वारपाल जोड़ें",\n',
  '    filter_all: "सभी (All)",\n',
  '    label_joining_date: "कार्यभार ग्रहण तिथि",\n',
  '    btn_edit_profile: "प्रोफाइल संपादित करें",\n',
  // MR
  '    label_phone: "फोन नंबर",\n',
  '    btn_cancel: "रद्द करा",\n',
  '    menu_add_staff: "विक्रेता / कामगार / सुरक्षारक्षक जोडा",\n',
  '    filter_all: "सर्व (All)",\n',
  '    label_joining_date: "सामील होण्याची तारीख",\n',
  '    btn_edit_profile: "प्रोफाइल संपादित करा",\n'
];

removeLines.forEach(l => {
  // Replace only the SECOND occurrence
  const idx1 = content.indexOf(l);
  if (idx1 !== -1) {
    const idx2 = content.indexOf(l, idx1 + l.length);
    if (idx2 !== -1) {
      content = content.slice(0, idx2) + content.slice(idx2 + l.length);
    }
  }
});

fs.writeFileSync('frontend/js/constants.js', content, 'utf8');
console.log('constants.js successfully deduplicated!');
