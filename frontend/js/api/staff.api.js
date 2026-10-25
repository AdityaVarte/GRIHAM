// Feature API: staff.api.js
// Centralized Staff, Vendor, and Gatekeeper API & Mock Management

window.getAvailableStaffAndVendors = async function() {
  if (typeof apiGet === "function" && typeof API_CONFIG !== "undefined" && API_CONFIG.ENDPOINTS) {
    return apiGet(API_CONFIG.ENDPOINTS.ADMIN_STAFF_VENDORS);
  }
  return mockStaffAdapter("/v1/admin/staff-vendors", { method: "GET" }, {});
};

/**
 * Normalizes phone numbers for deterministic matching (digits only)
 */
function normalizePhoneNumber(phone) {
  if (!phone) return "";
  return String(phone).replace(/\D/g, "");
}

/**
 * Check whether a phone number is already registered within the SAME Society ID.
 * Excludes record with `excludeId` when editing.
 */
window.checkDuplicatePhone = async function(phone, societyId, excludeId = null) {
  const normTarget = normalizePhoneNumber(phone);
  if (!normTarget || !societyId) return { isDuplicate: false, existingRecord: null };

  const targetSociety = String(societyId).trim().toUpperCase();

  // Search across Workers
  const workers = (typeof MOCK_WORKERS_DB !== "undefined" && MOCK_WORKERS_DB.workers) || [];
  for (const w of workers) {
    if (excludeId && w.id === excludeId) continue;
    const wSoc = String(w.societyId || "GRIHAM-PUNE-001").trim().toUpperCase();
    if (wSoc === targetSociety && normalizePhoneNumber(w.phone) === normTarget) {
      return {
        isDuplicate: true,
        existingRecord: {
          id: w.id,
          name: w.name,
          type: "Worker",
          role: w.role || "Worker",
          category: w.category || "General",
          phone: w.phone,
          societyId: wSoc,
          status: w.status
        }
      };
    }
  }

  // Search across Vendors
  const vendors = (typeof MOCK_VENDORS_DB !== "undefined" && MOCK_VENDORS_DB.vendors) || [];
  for (const v of vendors) {
    if (excludeId && v.id === excludeId) continue;
    const vSoc = String(v.societyId || "GRIHAM-PUNE-001").trim().toUpperCase();
    if (vSoc === targetSociety && normalizePhoneNumber(v.phone) === normTarget) {
      return {
        isDuplicate: true,
        existingRecord: {
          id: v.id,
          name: v.name,
          contactPerson: v.contactPerson,
          type: "Vendor",
          role: v.category || "Vendor",
          category: v.category || "General",
          phone: v.phone,
          societyId: vSoc,
          status: v.status
        }
      };
    }
  }

  // Search across Gatekeepers
  const gatekeepers = (typeof MOCK_GATEKEEPERS_DB !== "undefined" && MOCK_GATEKEEPERS_DB.gatekeepers) || [];
  for (const g of gatekeepers) {
    if (excludeId && g.id === excludeId) continue;
    const gSoc = String(g.societyId || "GRIHAM-PUNE-001").trim().toUpperCase();
    if (gSoc === targetSociety && normalizePhoneNumber(g.phone) === normTarget) {
      return {
        isDuplicate: true,
        existingRecord: {
          id: g.id,
          name: g.name,
          type: "Gatekeeper",
          role: "Gatekeeper",
          category: "Security",
          phone: g.phone,
          societyId: gSoc,
          status: g.status
        }
      };
    }
  }

  return { isDuplicate: false, existingRecord: null };
};

/**
 * Get all staff/vendors/gatekeepers with optional filters
 */
window.getStaff = async function(params = {}) {
  // Simulate network latency
  await new Promise(r => setTimeout(r, 90));

  const workers = ((typeof MOCK_WORKERS_DB !== "undefined" && MOCK_WORKERS_DB.workers) || []).map(w => ({
    ...w,
    type: "worker",
    category: w.category || "Other",
    societyId: w.societyId || "GRIHAM-PUNE-001",
    joiningDate: w.joiningDate || w.joining_date || "2025-01-01"
  }));

  const vendors = ((typeof MOCK_VENDORS_DB !== "undefined" && MOCK_VENDORS_DB.vendors) || []).map(v => ({
    ...v,
    type: "vendor",
    societyId: v.societyId || "GRIHAM-PUNE-001",
    addedDate: v.addedDate || "2026-01-01"
  }));

  const gatekeepers = ((typeof MOCK_GATEKEEPERS_DB !== "undefined" && MOCK_GATEKEEPERS_DB.gatekeepers) || []).map(g => ({
    ...g,
    type: "gatekeeper",
    role: "Gatekeeper",
    category: "Security",
    societyId: g.societyId || "GRIHAM-PUNE-001",
    joiningDate: g.joiningDate || "2026-01-01"
  }));

  const allRecords = [...workers, ...vendors, ...gatekeepers];

  // Calculate dynamic summary stats
  const activeCount = allRecords.filter(r => r.status === "Active").length;
  const summary = {
    total: allRecords.length,
    workers: workers.length,
    vendors: vendors.length,
    gatekeepers: gatekeepers.length,
    active: activeCount
  };

  let filtered = [...allRecords];

  // Type filter
  if (params.type && params.type !== "all") {
    filtered = filtered.filter(r => r.type.toLowerCase() === params.type.toLowerCase());
  }

  // Category filter
  if (params.category && params.category !== "all") {
    filtered = filtered.filter(r => (r.category || "").toLowerCase() === params.category.toLowerCase());
  }

  // Status filter
  if (params.status && params.status !== "all") {
    filtered = filtered.filter(r => (r.status || "").toLowerCase() === params.status.toLowerCase());
  }

  // Search filter
  if (params.search) {
    const q = params.search.trim().toLowerCase();
    filtered = filtered.filter(r => {
      const nameMatch = (r.name || "").toLowerCase().includes(q);
      const phoneMatch = (r.phone || "").toLowerCase().includes(q);
      const roleMatch = (r.role || "").toLowerCase().includes(q);
      const catMatch = (r.category || "").toLowerCase().includes(q);
      const contactMatch = (r.contactPerson || "").toLowerCase().includes(q);
      return nameMatch || phoneMatch || roleMatch || catMatch || contactMatch;
    });
  }

  return {
    status: "success",
    mock: true,
    staff: filtered,
    summary: summary
  };
};

/**
 * Get staff record by ID
 */
window.getStaffById = async function(id) {
  await new Promise(r => setTimeout(r, 60));
  const res = await window.getStaff();
  const record = (res.staff || []).find(r => r.id === id);
  if (!record) {
    throw new Error(`Record with ID ${id} not found.`);
  }
  return { status: "success", mock: true, data: record };
};

/**
 * Create a new Worker
 */
window.createWorker = async function(data) {
  await new Promise(r => setTimeout(r, 120));
  const { name, phone, email, role, category, societyId, joiningDate, profilePhoto, status } = data;

  if (!name || !name.trim()) throw new Error("Full Name is required.");
  if (!phone || !phone.trim()) throw new Error("Phone Number is required.");
  if (!role || !role.trim()) throw new Error("Role is required.");
  if (!category || !category.trim()) throw new Error("Category is required.");
  if (!societyId || !societyId.trim()) throw new Error("Society ID is required.");
  if (!joiningDate || !joiningDate.trim()) throw new Error("Joining Date is required.");

  // Check duplicate phone per society
  const dup = await window.checkDuplicatePhone(phone, societyId);
  if (dup.isDuplicate) {
    const err = new Error("This phone number is already registered in this society.");
    err.duplicateRecord = dup.existingRecord;
    throw err;
  }

  if (typeof MOCK_WORKERS_DB === "undefined") {
    window.MOCK_WORKERS_DB = { workers: [], nextId: 1 };
  }

  const nextNum = MOCK_WORKERS_DB.nextId || (MOCK_WORKERS_DB.workers.length + 1);
  MOCK_WORKERS_DB.nextId = nextNum + 1;
  const newId = `WRK-${String(nextNum).padStart(3, "0")}`;

  const newWorker = {
    id: newId,
    type: "worker",
    name: name.trim(),
    phone: phone.trim(),
    email: (email || "").trim(),
    role: role.trim(),
    category: category.trim(),
    societyId: societyId.trim().toUpperCase(),
    joiningDate: joiningDate.trim(),
    worker_id: newId,
    joining_date: joiningDate.trim(),
    employment_type: "Full Time",
    emergency_contact: null,
    attendance: "Present",
    check_in: null,
    check_out: null,
    status: status || "Active",
    avatar: profilePhoto || null
  };

  MOCK_WORKERS_DB.workers.unshift(newWorker);
  return { status: "success", mock: true, data: newWorker };
};

/**
 * Update existing Worker
 */
window.updateWorker = async function(id, data) {
  await new Promise(r => setTimeout(r, 100));
  const workers = (typeof MOCK_WORKERS_DB !== "undefined" && MOCK_WORKERS_DB.workers) || [];
  const worker = workers.find(w => w.id === id);
  if (!worker) throw new Error(`Worker with ID ${id} not found.`);

  // Society ID must be read-only during edit
  const societyId = worker.societyId || "GRIHAM-PUNE-001";

  if (data.phone && data.phone !== worker.phone) {
    const dup = await window.checkDuplicatePhone(data.phone, societyId, id);
    if (dup.isDuplicate) {
      const err = new Error("This phone number is already registered in this society.");
      err.duplicateRecord = dup.existingRecord;
      throw err;
    }
    worker.phone = data.phone.trim();
  }

  if (data.name) worker.name = data.name.trim();
  if (data.email !== undefined) worker.email = (data.email || "").trim();
  if (data.role) worker.role = data.role.trim();
  if (data.category) worker.category = data.category.trim();
  if (data.joiningDate) {
    worker.joiningDate = data.joiningDate.trim();
    worker.joining_date = data.joiningDate.trim();
  }
  if (data.status) worker.status = data.status;
  if (data.profilePhoto !== undefined) worker.avatar = data.profilePhoto;

  return { status: "success", mock: true, data: worker };
};

/**
 * Create a new Vendor
 */
window.createVendor = async function(data) {
  await new Promise(r => setTimeout(r, 120));
  const { name, contactPerson, phone, email, category, address, serviceDescription, societyId, addedDate, status } = data;

  if (!name || !name.trim()) throw new Error("Business Name is required.");
  if (!contactPerson || !contactPerson.trim()) throw new Error("Contact Person is required.");
  if (!phone || !phone.trim()) throw new Error("Phone Number is required.");
  if (!category || !category.trim()) throw new Error("Category is required.");
  if (!societyId || !societyId.trim()) throw new Error("Society ID is required.");

  // Duplicate phone check
  const dup = await window.checkDuplicatePhone(phone, societyId);
  if (dup.isDuplicate) {
    const err = new Error("This phone number is already registered in this society.");
    err.duplicateRecord = dup.existingRecord;
    throw err;
  }

  if (typeof MOCK_VENDORS_DB === "undefined") {
    window.MOCK_VENDORS_DB = { vendors: [], nextId: 1 };
  }

  const nextNum = MOCK_VENDORS_DB.nextId || (MOCK_VENDORS_DB.vendors.length + 1);
  MOCK_VENDORS_DB.nextId = nextNum + 1;
  const newId = `VEN-${String(nextNum).padStart(3, "0")}`;

  const nowStr = new Date().toISOString().split("T")[0];
  const newVendor = {
    id: newId,
    type: "vendor",
    name: name.trim(),
    contactPerson: contactPerson.trim(),
    category: category.trim(),
    phone: phone.trim(),
    email: (email || "").trim(),
    address: (address || "").trim(),
    serviceDescription: (serviceDescription || "").trim(),
    societyId: societyId.trim().toUpperCase(),
    addedDate: addedDate ? addedDate.trim() : nowStr,
    status: status || "Active"
  };

  MOCK_VENDORS_DB.vendors.unshift(newVendor);
  return { status: "success", mock: true, data: newVendor };
};

/**
 * Update existing Vendor
 */
window.updateVendor = async function(id, data) {
  await new Promise(r => setTimeout(r, 100));
  const vendors = (typeof MOCK_VENDORS_DB !== "undefined" && MOCK_VENDORS_DB.vendors) || [];
  const vendor = vendors.find(v => v.id === id);
  if (!vendor) throw new Error(`Vendor with ID ${id} not found.`);

  // Society ID is read-only
  const societyId = vendor.societyId || "GRIHAM-PUNE-001";

  if (data.phone && data.phone !== vendor.phone) {
    const dup = await window.checkDuplicatePhone(data.phone, societyId, id);
    if (dup.isDuplicate) {
      const err = new Error("This phone number is already registered in this society.");
      err.duplicateRecord = dup.existingRecord;
      throw err;
    }
    vendor.phone = data.phone.trim();
  }

  if (data.name) vendor.name = data.name.trim();
  if (data.contactPerson) vendor.contactPerson = data.contactPerson.trim();
  if (data.email !== undefined) vendor.email = (data.email || "").trim();
  if (data.category) vendor.category = data.category.trim();
  if (data.address !== undefined) vendor.address = (data.address || "").trim();
  if (data.serviceDescription !== undefined) vendor.serviceDescription = (data.serviceDescription || "").trim();
  if (data.status) vendor.status = data.status;

  return { status: "success", mock: true, data: vendor };
};

/**
 * Create a new Gatekeeper
 */
window.createGatekeeper = async function(data) {
  await new Promise(r => setTimeout(r, 120));
  const { name, phone, email, societyId, joiningDate, profilePhoto, status } = data;

  if (!name || !name.trim()) throw new Error("Full Name is required.");
  if (!phone || !phone.trim()) throw new Error("Phone Number is required.");
  if (!societyId || !societyId.trim()) throw new Error("Society ID is required.");
  if (!joiningDate || !joiningDate.trim()) throw new Error("Joining Date is required.");

  // Duplicate phone check
  const dup = await window.checkDuplicatePhone(phone, societyId);
  if (dup.isDuplicate) {
    const err = new Error("This phone number is already registered in this society.");
    err.duplicateRecord = dup.existingRecord;
    throw err;
  }

  if (typeof MOCK_GATEKEEPERS_DB === "undefined") {
    window.MOCK_GATEKEEPERS_DB = { gatekeepers: [], nextId: 1 };
  }

  const nextNum = MOCK_GATEKEEPERS_DB.nextId || (MOCK_GATEKEEPERS_DB.gatekeepers.length + 1);
  MOCK_GATEKEEPERS_DB.nextId = nextNum + 1;
  const newId = `GTK-${String(nextNum).padStart(3, "0")}`;

  const newGtk = {
    id: newId,
    type: "gatekeeper",
    name: name.trim(),
    phone: phone.trim(),
    email: (email || "").trim(),
    societyId: societyId.trim().toUpperCase(),
    joiningDate: joiningDate.trim(),
    profilePhoto: profilePhoto || null,
    status: status || "Active"
  };

  MOCK_GATEKEEPERS_DB.gatekeepers.unshift(newGtk);
  return { status: "success", mock: true, data: newGtk };
};

/**
 * Update existing Gatekeeper
 */
window.updateGatekeeper = async function(id, data) {
  await new Promise(r => setTimeout(r, 100));
  const gatekeepers = (typeof MOCK_GATEKEEPERS_DB !== "undefined" && MOCK_GATEKEEPERS_DB.gatekeepers) || [];
  const gtk = gatekeepers.find(g => g.id === id);
  if (!gtk) throw new Error(`Gatekeeper with ID ${id} not found.`);

  // Society ID is read-only
  const societyId = gtk.societyId || "GRIHAM-PUNE-001";

  if (data.phone && data.phone !== gtk.phone) {
    const dup = await window.checkDuplicatePhone(data.phone, societyId, id);
    if (dup.isDuplicate) {
      const err = new Error("This phone number is already registered in this society.");
      err.duplicateRecord = dup.existingRecord;
      throw err;
    }
    gtk.phone = data.phone.trim();
  }

  if (data.name) gtk.name = data.name.trim();
  if (data.email !== undefined) gtk.email = (data.email || "").trim();
  if (data.joiningDate) gtk.joiningDate = data.joiningDate.trim();
  if (data.status) gtk.status = data.status;
  if (data.profilePhoto !== undefined) gtk.profilePhoto = data.profilePhoto;

  return { status: "success", mock: true, data: gtk };
};

/**
 * Soft Deactivate staff/vendor/gatekeeper record (status = "Inactive")
 */
window.deactivateStaff = async function(id) {
  await new Promise(r => setTimeout(r, 100));

  // 1. Check Workers
  if (typeof MOCK_WORKERS_DB !== "undefined" && MOCK_WORKERS_DB.workers) {
    const w = MOCK_WORKERS_DB.workers.find(item => item.id === id);
    if (w) {
      w.status = "Inactive";
      return { status: "success", mock: true, message: "Worker deactivated successfully.", data: w };
    }
  }

  // 2. Check Vendors
  if (typeof MOCK_VENDORS_DB !== "undefined" && MOCK_VENDORS_DB.vendors) {
    const v = MOCK_VENDORS_DB.vendors.find(item => item.id === id);
    if (v) {
      v.status = "Inactive";
      return { status: "success", mock: true, message: "Vendor deactivated successfully.", data: v };
    }
  }

  // 3. Check Gatekeepers
  if (typeof MOCK_GATEKEEPERS_DB !== "undefined" && MOCK_GATEKEEPERS_DB.gatekeepers) {
    const g = MOCK_GATEKEEPERS_DB.gatekeepers.find(item => item.id === id);
    if (g) {
      g.status = "Inactive";
      return { status: "success", mock: true, message: "Gatekeeper deactivated successfully.", data: g };
    }
  }

  throw new Error(`Record with ID ${id} not found.`);
};

/**
 * Get staff by Category
 */
window.getStaffByCategory = async function(category) {
  return window.getStaff({ category: category, status: "Active" });
};

/**
 * Existing Mock Staff Adapter for backward compatibility
 */
window.mockStaffAdapter = async function(endpoint, options, payload = {}) {
  if (endpoint === (API_CONFIG?.ENDPOINTS?.ADMIN_STAFF_VENDORS || "/v1/admin/staff-vendors")) {
    const res = await window.getStaff();
    return {
      status: "success",
      mock: true,
      staff_vendors: res.staff
    };
  }

  if (endpoint.startsWith("/v1/admin/staff") || endpoint.startsWith("/admin/staff")) {
    const method = options?.method || "GET";
    if (method === "GET") {
      return window.getStaff();
    }
  }

  if (endpoint.startsWith(API_CONFIG?.ENDPOINTS?.ADMIN_CONTACTS || "/v1/admin/contacts")) {
    let qCategory = "";
    let qType = "";
    try {
      const u = new URL("http://localhost" + endpoint);
      qCategory = u.searchParams.get("category") || "";
      qType = u.searchParams.get("contact_type") || "";
    } catch (_) {}
    const rawCategory = (payload.category || qCategory || "").trim().toLowerCase();
    const contactType = (payload.contact_type || qType || "all").toLowerCase();

    const categoryMap = {
      "security": "security",
      "security guard": "security",
      "cleaner": "cleaning",
      "cleaning": "cleaning",
      "housekeeping": "cleaning",
      "electrician": "electrical",
      "electrical": "electrical",
      "plumber": "plumbing",
      "plumbing": "plumbing",
      "gardener": "gardening",
      "gardening": "gardening",
      "carpentry": "carpentry",
      "carpenter": "carpentry",
      "appliance repair": "appliance repair",
      "appliance": "appliance repair",
      "pest control": "pest control",
      "pest": "pest control",
      "maintenance": "maintenance",
      "maintenance worker": "maintenance",
      "lift": "maintenance",
      "elevator": "maintenance",
      "other": "other"
    };

    const targetCategory = categoryMap[rawCategory] || rawCategory;
    const staffRes = await window.getStaff({ status: "Active" });
    const activeStaff = staffRes.staff || [];

    let contacts = activeStaff.map(s => ({
      id: s.id,
      name: s.name,
      type: s.type,
      category: categoryMap[(s.category || "").toLowerCase()] || s.category || "other",
      role: s.role || (s.type === "vendor" ? (s.category || "Vendor") : s.type),
      phone: s.phone,
      status: s.status,
      attendance: s.attendance || null
    }));

    if (contactType !== "all") {
      contacts = contacts.filter(c => c.type.toLowerCase() === contactType);
    }

    if (targetCategory && targetCategory !== "all") {
      contacts = contacts.filter(c => c.category === targetCategory);
    }

    return {
      status: "success",
      mock: true,
      category: targetCategory,
      total: contacts.length,
      contacts: contacts
    };
  }

  return undefined;
};

window.getStaffVendors = async function(params = {}) {
  await new Promise(r => setTimeout(r, 80));
  if (typeof getContactsByCategory === 'function') {
    return getContactsByCategory(params.category || 'All');
  }
  return { status: 'success', data: [] };
};

// Sync with GrihamAPI namespace if already defined
if (typeof window.GrihamAPI !== "undefined") {
  window.GrihamAPI.getStaff = window.getStaff;
  window.GrihamAPI.getStaffById = window.getStaffById;
  window.GrihamAPI.createWorker = window.createWorker;
  window.GrihamAPI.updateWorker = window.updateWorker;
  window.GrihamAPI.createVendor = window.createVendor;
  window.GrihamAPI.updateVendor = window.updateVendor;
  window.GrihamAPI.createGatekeeper = window.createGatekeeper;
  window.GrihamAPI.updateGatekeeper = window.updateGatekeeper;
  window.GrihamAPI.deactivateStaff = window.deactivateStaff;
  window.GrihamAPI.getStaffByCategory = window.getStaffByCategory;
  window.GrihamAPI.checkDuplicatePhone = window.checkDuplicatePhone;
  window.GrihamAPI.getStaffVendors = window.getStaffVendors;
}

