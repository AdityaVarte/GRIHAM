/**
 * GRIHAM FRONTEND - CANONICAL MOCK VISITORS DATABASE & ADAPTER
 * File: js/mock/visitors.mock.js
 * Society-Aware Security Terminal Visitor Management
 */

const MOCK_VISITORS_DB = {
  visitors: [
    {
      id: "VIS-2026-0001",
      societyId: "GRIHAM-PUNE-001",
      visitorName: "Rahul Sharma",
      visitorPhone: "+919876543210",
      residentName: "Amit Sharma",
      residentId: "USR-001",
      wing: "A",
      flatNumber: "102",
      purpose: "Personal Visit",
      visitorType: "Expected",
      expectedDate: "2026-09-30",
      expectedTime: "10:30 AM",
      checkInAt: null,
      checkOutAt: null,
      status: "Expected",
      notes: "Family guest visiting for lunch",
      createdAt: "2026-09-30T09:00:00"
    },
    {
      id: "VIS-2026-0002",
      societyId: "GRIHAM-PUNE-001",
      visitorName: "Vikram Verma",
      visitorPhone: "+919822114455",
      residentName: "Priya Nair",
      residentId: "USR-002",
      wing: "B",
      flatNumber: "302",
      purpose: "Internet Service Installation",
      visitorType: "Walk-in",
      expectedDate: "2026-09-30",
      expectedTime: "08:15 AM",
      checkInAt: "2026-09-30T08:15:00",
      checkOutAt: null,
      status: "Checked In",
      notes: "Broadband technician carrying tool bag",
      createdAt: "2026-09-30T08:15:00"
    },
    {
      id: "VIS-2026-0003",
      societyId: "GRIHAM-PUNE-001",
      visitorName: "Sneha Patel",
      visitorPhone: "+919855667788",
      residentName: "Rajesh Kumar",
      residentId: "USR-003",
      wing: "A",
      flatNumber: "204",
      purpose: "Document Delivery",
      visitorType: "Walk-in",
      expectedDate: "2026-09-30",
      expectedTime: "07:30 AM",
      checkInAt: "2026-09-30T07:30:00",
      checkOutAt: "2026-09-30T08:45:00",
      status: "Checked Out",
      notes: "Courier document handover completed",
      createdAt: "2026-09-30T07:30:00"
    },
    {
      id: "VIS-2026-0004",
      societyId: "GRIHAM-PUNE-001",
      visitorName: "Manish Joshi",
      visitorPhone: "+919811223344",
      residentName: "Sunita Krishnan",
      residentId: "USR-004",
      wing: "A",
      flatNumber: "401",
      purpose: "Interior Consultation",
      visitorType: "Expected",
      expectedDate: "2026-09-30",
      expectedTime: "11:45 AM",
      checkInAt: null,
      checkOutAt: null,
      status: "Expected",
      notes: "Architect consultation appointment",
      createdAt: "2026-09-30T08:30:00"
    },
    {
      id: "VIS-2026-0005",
      societyId: "GRIHAM-PUNE-001",
      visitorName: "Karan Johar",
      visitorPhone: "+919899887766",
      residentName: "Vikram Malhotra",
      residentId: "USR-005",
      wing: "B",
      flatNumber: "504",
      purpose: "Old Visit",
      visitorType: "Expected",
      expectedDate: "2026-09-29",
      expectedTime: "16:00 PM",
      checkInAt: null,
      checkOutAt: null,
      status: "Cancelled",
      notes: "Resident cancelled appointment",
      createdAt: "2026-09-29T14:00:00"
    },
    // Cross-society record for isolation verification
    {
      id: "VIS-2026-0099",
      societyId: "GRIHAM-MUMBAI-002",
      visitorName: "Rohan Deshmukh",
      visitorPhone: "+919922334455",
      residentName: "Mumbai Resident",
      residentId: "USR-MUM-01",
      wing: "C",
      flatNumber: "501",
      purpose: "Mumbai Society Visit",
      visitorType: "Expected",
      expectedDate: "2026-09-30",
      expectedTime: "12:00 PM",
      checkInAt: null,
      checkOutAt: null,
      status: "Expected",
      notes: "Must remain isolated from GRIHAM-PUNE-001",
      createdAt: "2026-09-30T09:00:00"
    }
  ],
  nextId: 6
};

window.MOCK_VISITORS_DB = MOCK_VISITORS_DB;

/**
 * Canonical Gatekeeper Feature Mock API Adapter
 */
window.mockGatekeeperAdapter = async function(endpoint, options, payload) {
  const method = (options.method || "GET").toUpperCase();
  const activeSociety = (typeof GrihamAuth !== "undefined" && GrihamAuth.getSocietyId()) || "GRIHAM-PUNE-001";

  // 1. GET /v1/gatekeeper/visitors (List with filtering and search)
  if ((endpoint === API_CONFIG.ENDPOINTS.GATEKEEPER_VISITORS || endpoint.startsWith(API_CONFIG.ENDPOINTS.GATEKEEPER_VISITORS + "?")) && method === "GET") {
    const urlObj = new URL("http://localhost" + endpoint);
    const filterStatus = urlObj.searchParams.get("status") || "All";
    const searchQuery = (urlObj.searchParams.get("search") || "").trim().toLowerCase();
    const societyParam = urlObj.searchParams.get("societyId") || activeSociety;

    const db = window.MOCK_VISITORS_DB;
    let list = (db.visitors || []).filter(v => v.societyId && v.societyId.toUpperCase() === societyParam.toUpperCase());

    // Apply status filter
    if (filterStatus && filterStatus !== "All") {
      list = list.filter(v => (v.status || "").toLowerCase() === filterStatus.toLowerCase());
    }

    // Apply search filter (name, phone, resident, flat, id, purpose)
    if (searchQuery) {
      list = list.filter(v => {
        const vName = (v.visitorName || "").toLowerCase();
        const vPhone = (v.visitorPhone || "").toLowerCase();
        const rName = (v.residentName || "").toLowerCase();
        const flat = `${v.wing || ""}-${v.flatNumber || ""}`.toLowerCase();
        const flatNum = (v.flatNumber || "").toLowerCase();
        const id = (v.id || "").toLowerCase();
        const purpose = (v.purpose || "").toLowerCase();
        return vName.includes(searchQuery) ||
               vPhone.includes(searchQuery) ||
               rName.includes(searchQuery) ||
               flat.includes(searchQuery) ||
               flatNum.includes(searchQuery) ||
               id.includes(searchQuery) ||
               purpose.includes(searchQuery);
      });
    }

    // Sort: Checked In first, then Expected, then Checked Out, newest created first
    const statusOrder = { "Checked In": 1, "Expected": 2, "Checked Out": 3, "Cancelled": 4 };
    list.sort((a, b) => {
      const orderA = statusOrder[a.status] || 99;
      const orderB = statusOrder[b.status] || 99;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    return {
      status: "success",
      mock: true,
      visitors: JSON.parse(JSON.stringify(list)),
      total: list.length
    };
  }

  // 2. GET /v1/gatekeeper/visitors/detail (Single visitor record)
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.GATEKEEPER_VISITOR_DETAIL) && method === "GET") {
    const urlObj = new URL("http://localhost" + endpoint);
    const visitorId = urlObj.searchParams.get("id");

    const db = window.MOCK_VISITORS_DB;
    const visitor = (db.visitors || []).find(v => v.id === visitorId && v.societyId.toUpperCase() === activeSociety.toUpperCase());

    if (!visitor) {
      const error = new Error("Visitor record not found.");
      error.status = 404;
      throw error;
    }

    return {
      status: "success",
      mock: true,
      visitor: JSON.parse(JSON.stringify(visitor))
    };
  }

  // 3. GET /v1/gatekeeper/visitors/summary (Counts for today)
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.GATEKEEPER_VISITOR_SUMMARY) && method === "GET") {
    const db = window.MOCK_VISITORS_DB;
    const societyVisitors = (db.visitors || []).filter(v => v.societyId && v.societyId.toUpperCase() === activeSociety.toUpperCase());

    const expected = societyVisitors.filter(v => v.status === "Expected").length;
    const checkedIn = societyVisitors.filter(v => v.status === "Checked In").length;
    const checkedOut = societyVisitors.filter(v => v.status === "Checked Out").length;
    const cancelled = societyVisitors.filter(v => v.status === "Cancelled").length;
    const totalToday = societyVisitors.filter(v => v.expectedDate === "2026-09-30" || (v.createdAt && v.createdAt.startsWith("2026-09-30"))).length;

    return {
      status: "success",
      mock: true,
      summary: {
        expected,
        checkedIn,
        checkedOut,
        cancelled,
        totalToday: totalToday || (expected + checkedIn + checkedOut),
        activeOnPremises: checkedIn
      }
    };
  }

  // 4. POST /v1/gatekeeper/visitors/checkin
  if (endpoint === API_CONFIG.ENDPOINTS.GATEKEEPER_VISITOR_CHECKIN && method === "POST") {
    const id = payload.id;
    if (!id) {
      const error = new Error("Visitor ID is required for check-in.");
      error.status = 400;
      throw error;
    }

    const db = window.MOCK_VISITORS_DB;
    const visitor = (db.visitors || []).find(v => v.id === id && v.societyId.toUpperCase() === activeSociety.toUpperCase());

    if (!visitor) {
      const error = new Error("Visitor not found.");
      error.status = 404;
      throw error;
    }

    // State machine check: ONLY Expected visitors can be checked in
    if (visitor.status === "Checked In") {
      const error = new Error("Visitor is already checked in.");
      error.status = 400;
      throw error;
    }
    if (visitor.status === "Checked Out") {
      const error = new Error("Cannot check in a visitor who has already checked out.");
      error.status = 400;
      throw error;
    }
    if (visitor.status === "Cancelled") {
      const error = new Error("Cannot check in a cancelled visitor pass.");
      error.status = 400;
      throw error;
    }

    const now = new Date();
    visitor.status = "Checked In";
    visitor.checkInAt = now.toISOString();
    if (payload.notes) {
      visitor.notes = visitor.notes ? `${visitor.notes} | ${payload.notes}` : payload.notes;
    }

    return {
      status: "success",
      mock: true,
      message: `Visitor ${visitor.visitorName} checked in successfully.`,
      visitor: JSON.parse(JSON.stringify(visitor))
    };
  }

  // 5. POST /v1/gatekeeper/visitors/checkout
  if (endpoint === API_CONFIG.ENDPOINTS.GATEKEEPER_VISITOR_CHECKOUT && method === "POST") {
    const id = payload.id;
    if (!id) {
      const error = new Error("Visitor ID is required for checkout.");
      error.status = 400;
      throw error;
    }

    const db = window.MOCK_VISITORS_DB;
    const visitor = (db.visitors || []).find(v => v.id === id && v.societyId.toUpperCase() === activeSociety.toUpperCase());

    if (!visitor) {
      const error = new Error("Visitor not found.");
      error.status = 404;
      throw error;
    }

    // State machine check: ONLY Checked In visitors can be checked out
    if (visitor.status === "Expected") {
      const error = new Error("Visitor has not checked in yet.");
      error.status = 400;
      throw error;
    }
    if (visitor.status === "Checked Out") {
      const error = new Error("Visitor has already checked out.");
      error.status = 400;
      throw error;
    }
    if (visitor.status === "Cancelled") {
      const error = new Error("Cannot check out a cancelled visitor pass.");
      error.status = 400;
      throw error;
    }

    const now = new Date();
    visitor.status = "Checked Out";
    visitor.checkOutAt = now.toISOString();
    if (payload.notes) {
      visitor.notes = visitor.notes ? `${visitor.notes} | ${payload.notes}` : payload.notes;
    }

    return {
      status: "success",
      mock: true,
      message: `Visitor ${visitor.visitorName} checked out successfully.`,
      visitor: JSON.parse(JSON.stringify(visitor))
    };
  }

  // 6. POST /v1/gatekeeper/visitors (Create walk-in visitor)
  if (endpoint === API_CONFIG.ENDPOINTS.GATEKEEPER_VISITORS && method === "POST") {
    const visitorName = (payload.visitorName || "").trim();
    const visitorPhone = (payload.visitorPhone || "").trim();
    const flatNumber = (payload.flatNumber || "").trim();
    const wing = (payload.wing || "A").trim().toUpperCase();
    const residentName = (payload.residentName || "").trim();
    const purpose = (payload.purpose || "Personal Visit").trim();
    const notes = (payload.notes || "").trim();

    if (!visitorName) {
      const error = new Error("Visitor name is required.");
      error.status = 400;
      throw error;
    }
    if (!visitorPhone) {
      const error = new Error("Visitor phone number is required.");
      error.status = 400;
      throw error;
    }
    if (typeof GrihamValidation !== "undefined" && !GrihamValidation.isValidPhone(visitorPhone)) {
      const error = new Error("Please enter a valid 10-to-14 digit phone number.");
      error.status = 400;
      throw error;
    }
    if (!flatNumber) {
      const error = new Error("Flat number is required.");
      error.status = 400;
      throw error;
    }

    const db = window.MOCK_VISITORS_DB;
    const cleanPhone = (typeof GrihamValidation !== "undefined") ? GrihamValidation.normalizePhone(visitorPhone) : visitorPhone.replace(/\D/g, "");

    // Duplicate check: Same visitor phone, same flat, active visit ("Expected" or "Checked In")
    const activeDuplicate = (db.visitors || []).find(v => {
      if (v.societyId.toUpperCase() !== activeSociety.toUpperCase()) return false;
      const vCleanPhone = (typeof GrihamValidation !== "undefined") ? GrihamValidation.normalizePhone(v.visitorPhone) : (v.visitorPhone || "").replace(/\D/g, "");
      const isSamePhone = vCleanPhone === cleanPhone;
      const isSameFlat = (v.flatNumber || "").toLowerCase() === flatNumber.toLowerCase() && (v.wing || "").toUpperCase() === wing;
      const isActive = v.status === "Checked In" || v.status === "Expected";
      return isSamePhone && isSameFlat && isActive;
    });

    if (activeDuplicate) {
      const error = new Error(`An active visit already exists for ${visitorName} at Flat ${wing}-${flatNumber} (Status: ${activeDuplicate.status}).`);
      error.status = 409;
      error.existingRecord = activeDuplicate;
      throw error;
    }

    const nextIdNum = db.nextId || (db.visitors.length + 1);
    const newId = `VIS-2026-${String(nextIdNum).padStart(4, "0")}`;
    db.nextId = nextIdNum + 1;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const timeStr = `${hours}:${minutes}`;

    const newRecord = {
      id: newId,
      societyId: activeSociety,
      visitorName,
      visitorPhone,
      residentName: residentName || `Resident (${wing}-${flatNumber})`,
      residentId: payload.residentId || "USR-AUTO",
      wing,
      flatNumber,
      purpose,
      visitorType: payload.visitorType || "Walk-in",
      expectedDate: "2026-09-30",
      expectedTime: timeStr,
      checkInAt: now.toISOString(),
      checkOutAt: null,
      status: "Checked In",
      notes,
      createdAt: now.toISOString()
    };

    db.visitors.unshift(newRecord);

    return {
      status: "success",
      mock: true,
      message: `Walk-in visitor ${visitorName} registered and checked in.`,
      visitor: JSON.parse(JSON.stringify(newRecord))
    };
  }

  return undefined;
};
