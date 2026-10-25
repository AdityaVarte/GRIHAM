/**
 * GRIHAM FRONTEND - ADMIN SOS API LAYER
 * Handles REST endpoints and mock adapter for Emergency SOS alerts.
 */

window.getAdminSOS = async function(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const endpoint = qs ? `${API_CONFIG.ENDPOINTS.ADMIN_SOS}?${qs}` : API_CONFIG.ENDPOINTS.ADMIN_SOS;
  return apiGet(endpoint);
};

window.getAdminSOSById = async function(sosId) {
  return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_SOS, sosId));
};

window.resolveAdminSOS = async function(sosId, payload = {}) {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_SOS, sosId, "resolve"), payload);
};

window.getAdminSOSSummary = async function() {
  const res = await window.getAdminSOS({ limit: 1 });
  return res.summary || { active: 0, resolvedToday: 0, total: 0 };
};

window.sendResidentSOS = async function(payload = {}) {
  const baseEndpoint = API_CONFIG?.ENDPOINTS?.ADMIN_SOS || "/v1/admin/sos";
  return apiPost(baseEndpoint, payload);
};

/**
 * Mock SOS API Adapter for local / demo mode
 */
window.mockSosAdapter = async function(endpoint, options, payload = {}) {
  const db = window.MOCK_SOS_DB;
  if (!db || !Array.isArray(db.alerts)) {
    return undefined;
  }

  const baseEndpoint = API_CONFIG?.ENDPOINTS?.ADMIN_SOS || "/v1/admin/sos";

  // 1. POST /v1/admin/sos (Resident sends emergency alert)
  if (endpoint === baseEndpoint && options.method === "POST") {
    const nextNum = db.nextId || (db.alerts.length + 20);
    db.nextId = nextNum + 1;
    const newId = `SOS-2026-${String(nextNum).padStart(4, "0")}`;

    const newAlert = {
      id: newId,
      residentId: payload.residentId || "USR-001",
      residentName: payload.residentName || "Rajesh Kumar",
      phone: payload.phone || "+919876543210",
      wing: payload.wing || "A",
      flatNumber: payload.flatNumber || "204",
      emergencyType: payload.emergencyType || "General Emergency",
      message: payload.message || "Emergency alert sent from Resident Home.",
      location: payload.location || `Flat ${payload.wing || "A"}-${payload.flatNumber || "204"}`,
      status: "Active",
      createdAt: new Date().toISOString(),
      resolvedAt: null,
      resolvedBy: null,
      resolutionNote: null,
      societyId: payload.societyId || "GRIHAM-PUNE-001"
    };

    db.alerts.unshift(newAlert);

    return {
      status: "success",
      mock: true,
      message: "SOS Alert Sent",
      alert: newAlert
    };
  }

  // 2. PUT /v1/admin/sos/{id}/resolve
  if (endpoint.startsWith(baseEndpoint) && endpoint.includes("/resolve") && options.method === "PUT") {
    const parts = endpoint.split("/");
    // endpoint format: /v1/admin/sos/{id}/resolve
    const resolveIdx = parts.indexOf("resolve");
    const sosId = parts[resolveIdx - 1];

    const alert = db.alerts.find(a => a.id.toLowerCase() === (sosId || "").toLowerCase());
    if (!alert) {
      const err = new Error("Emergency SOS alert not found");
      err.status = 404;
      throw err;
    }

    alert.status = "Resolved";
    alert.resolvedAt = new Date().toISOString();
    alert.resolvedBy = payload.resolvedBy || "Society Administrator";
    alert.resolutionNote = payload.resolutionNote || "Resolved and verified by on-duty administrator.";

    return {
      status: "success",
      mock: true,
      message: "SOS alert resolved successfully",
      alert: { ...alert }
    };
  }

  // 2. GET /v1/admin/sos/{id} (Single detail)
  if (endpoint.startsWith(baseEndpoint + "/") && !endpoint.includes("?") && (options.method === "GET" || !options.method)) {
    const sosId = endpoint.split("/").pop();
    const alert = db.alerts.find(a => a.id.toLowerCase() === (sosId || "").toLowerCase());
    if (!alert) {
      const err = new Error("Emergency SOS alert not found");
      err.status = 404;
      throw err;
    }
    return {
      status: "success",
      mock: true,
      alert: { ...alert }
    };
  }

  // 3. GET /v1/admin/sos (List with filters, search, sort, and summary)
  if (endpoint === baseEndpoint || endpoint.startsWith(baseEndpoint + "?")) {
    let params = {};
    if (endpoint.includes("?")) {
      const qs = endpoint.split("?")[1];
      params = Object.fromEntries(new URLSearchParams(qs).entries());
    }

    const statusFilter = (params.status || "all").toLowerCase();
    const dateFilter = (params.dateRange || "all").toLowerCase();
    const searchQuery = (params.search || "").trim().toLowerCase();
    const sortOrder = (params.sort || "newest").toLowerCase();
    const startDate = params.startDate ? new Date(params.startDate) : null;
    const endDate = params.endDate ? new Date(params.endDate) : null;

    const now = new Date();
    const todayDateStr = now.toISOString().split("T")[0];

    // Compute live summary from database
    const activeCount = db.alerts.filter(a => a.status === "Active").length;
    const resolvedTodayCount = db.alerts.filter(a => {
      if (a.status !== "Resolved" || !a.resolvedAt) return false;
      return a.resolvedAt.split("T")[0] === todayDateStr;
    }).length;
    const totalCount = db.alerts.length;

    let filtered = db.alerts.slice();

    // Filter by Status
    if (statusFilter === "active") {
      filtered = filtered.filter(a => a.status === "Active");
    } else if (statusFilter === "resolved") {
      filtered = filtered.filter(a => a.status === "Resolved");
    }

    // Filter by Date Range
    if (dateFilter === "today") {
      filtered = filtered.filter(a => a.createdAt && a.createdAt.split("T")[0] === todayDateStr);
    } else if (dateFilter === "7days" || dateFilter === "last7") {
      const cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(a => new Date(a.createdAt) >= cutoff);
    } else if (dateFilter === "30days" || dateFilter === "last30") {
      const cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(a => new Date(a.createdAt) >= cutoff);
    } else if (dateFilter === "custom") {
      if (startDate) {
        filtered = filtered.filter(a => new Date(a.createdAt) >= startDate);
      }
      if (endDate) {
        // Set end of day
        const endDay = new Date(endDate);
        endDay.setHours(23, 59, 59, 999);
        filtered = filtered.filter(a => new Date(a.createdAt) <= endDay);
      }
    }

    // Filter by Search Query
    if (searchQuery) {
      filtered = filtered.filter(a => {
        const idMatch = (a.id || "").toLowerCase().includes(searchQuery);
        const nameMatch = (a.residentName || "").toLowerCase().includes(searchQuery);
        const wingMatch = (a.wing || "").toLowerCase().includes(searchQuery);
        const flatMatch = (a.flatNumber || "").toLowerCase().includes(searchQuery);
        const wingFlatMatch = `${a.wing || ""}-${a.flatNumber || ""}`.toLowerCase().includes(searchQuery);
        const queryDigits = searchQuery.replace(/\D/g, "");
        const phoneMatch = queryDigits.length >= 3 && (a.phone || "").replace(/\D/g, "").includes(queryDigits);
        const typeMatch = (a.emergencyType || "").toLowerCase().includes(searchQuery);
        const msgMatch = (a.message || "").toLowerCase().includes(searchQuery);
        return idMatch || nameMatch || wingMatch || flatMatch || wingFlatMatch || phoneMatch || typeMatch || msgMatch;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === "oldest" ? timeA - timeB : timeB - timeA;
    });

    return {
      status: "success",
      mock: true,
      alerts: filtered,
      summary: {
        active: activeCount,
        resolvedToday: resolvedTodayCount,
        total: totalCount
      }
    };
  }

  return undefined; // Not an SOS endpoint, let other adapters handle
};
