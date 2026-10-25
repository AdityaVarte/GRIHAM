/**
 * GRIHAM FRONTEND - RESIDENT API LAYER
 * Centralized Resident API methods and Mock Adapter
 */

window.getResidentProfile = async function() {
  if (typeof apiGet === "function" && typeof API_CONFIG !== "undefined" && API_CONFIG.ENDPOINTS?.RESIDENT_PROFILE) {
    return apiGet(API_CONFIG.ENDPOINTS.RESIDENT_PROFILE);
  }
  return mockResidentAdapter("/v1/resident/profile", { method: "GET" }, {});
};

window.updateResidentProfile = async function(profileData) {
  if (typeof apiPut === "function" && typeof API_CONFIG !== "undefined" && API_CONFIG.ENDPOINTS?.RESIDENT_UPDATE_PROFILE) {
    return apiPut(API_CONFIG.ENDPOINTS.RESIDENT_UPDATE_PROFILE, profileData);
  }
  return mockResidentAdapter("/v1/resident/profile", { method: "PUT" }, profileData);
};

window.changeResidentPassword = async function(passwordData) {
  if (typeof apiPut === "function" && typeof API_CONFIG !== "undefined" && API_CONFIG.ENDPOINTS?.RESIDENT_CHANGE_PASSWORD) {
    return apiPut(API_CONFIG.ENDPOINTS.RESIDENT_CHANGE_PASSWORD, passwordData);
  }
  return mockResidentAdapter("/v1/resident/profile/password", { method: "PUT" }, passwordData);
};

window.deleteResidentAccount = async function() {
  if (typeof apiDelete === "function" && typeof API_CONFIG !== "undefined" && API_CONFIG.ENDPOINTS?.RESIDENT_DELETE_ACCOUNT) {
    return apiDelete(API_CONFIG.ENDPOINTS.RESIDENT_DELETE_ACCOUNT);
  }
  return mockResidentAdapter("/v1/resident/account", { method: "DELETE" }, {});
};

window.getWaterStatus = async function() {
  if (typeof apiGet === "function" && typeof API_CONFIG !== "undefined" && API_CONFIG.ENDPOINTS?.RESIDENT_WATER_STATUS) {
    return apiGet(API_CONFIG.ENDPOINTS.RESIDENT_WATER_STATUS);
  }
  return mockResidentAdapter("/v1/resident/water-status", { method: "GET" }, {});
};

window.getChairmanContact = async function() {
  return mockResidentAdapter("/v1/resident/chairman", { method: "GET" }, {});
};

window.getResidentRecentActivity = async function() {
  return mockResidentAdapter("/v1/resident/recent-activity", { method: "GET" }, {});
};

window.getResidentNotifications = async function() {
  return mockResidentAdapter("/v1/resident/notifications", { method: "GET" }, {});
};

window.markResidentNotificationRead = async function(notifId) {
  const db = window.MOCK_RESIDENTS_DB;
  if (db && Array.isArray(db.notifications)) {
    const item = db.notifications.find(n => n.id === notifId);
    if (item) item.unread = false;
  }
  return { status: "success", message: "Notification marked as read" };
};

// Reusable residents directory for lookup / admin
const MOCK_RESIDENTS_DIRECTORY = [
  { id: 'USR-001', name: 'Rajesh Kumar', wing: 'A', flatNumber: '204', phone: '+919876543210', societyId: 'GRIHAM-PUNE-001', occupancyType: 'Owner' },
  { id: 'USR-002', name: 'Priya Shah', wing: 'B', flatNumber: '204', phone: '+919812345678', societyId: 'GRIHAM-PUNE-001', occupancyType: 'Tenant' },
  { id: 'USR-003', name: 'Vikram Malhotra', wing: 'C', flatNumber: '501', phone: '+919822334455', societyId: 'GRIHAM-PUNE-001', occupancyType: 'Owner' },
  { id: 'USR-004', name: 'Sunita Krishnan', wing: 'A', flatNumber: '401', phone: '+919801234567', societyId: 'GRIHAM-PUNE-001', occupancyType: 'Owner' },
  { id: 'USR-005', name: 'Anita Desai', wing: 'A', flatNumber: '102', phone: '+919812345678', societyId: 'GRIHAM-PUNE-001', occupancyType: 'Owner' }
];

window.getResidents = async function(params = {}) {
  let list = [...MOCK_RESIDENTS_DIRECTORY];
  if (params.search) {
    const q = params.search.toLowerCase().trim();
    list = list.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.wing.toLowerCase().includes(q) ||
      r.flatNumber.toLowerCase().includes(q) ||
      r.phone.includes(q)
    );
  }
  return { status: 'success', data: list, total: list.length };
};

/**
 * Mock Resident Adapter
 */
window.mockResidentAdapter = async function(endpoint, options = {}, payload = {}) {
  const db = window.MOCK_RESIDENTS_DB || {};

  // 1a. Resident Change Password
  if (endpoint === (API_CONFIG?.ENDPOINTS?.RESIDENT_CHANGE_PASSWORD || "/v1/resident/profile/password")) {
    if (!payload.current_password) {
      const err = new Error("Current password is required");
      err.status = 400;
      throw err;
    }
    if (!payload.new_password || payload.new_password.length < 8) {
      const err = new Error("New password must be at least 8 characters");
      err.status = 400;
      throw err;
    }
    if (payload.new_password !== payload.confirm_password) {
      const err = new Error("New password and confirmation do not match");
      err.status = 400;
      throw err;
    }
    if (payload.current_password === "wrong") {
      const err = new Error("Current password entered is incorrect");
      err.status = 400;
      throw err;
    }

    return {
      status: "success",
      mock: true,
      message: "Password changed successfully"
    };
  }

  // 1b. Resident Delete Account
  if (endpoint === (API_CONFIG?.ENDPOINTS?.RESIDENT_DELETE_ACCOUNT || "/v1/resident/account")) {
    return {
      status: "success",
      mock: true,
      message: "Resident account scheduled for deactivation",
      deleted_at: new Date().toISOString()
    };
  }

  // 1c. Resident Profile (GET & PUT)
  if (endpoint === (API_CONFIG?.ENDPOINTS?.RESIDENT_PROFILE || "/v1/resident/profile") || endpoint === "/v1/resident/profile") {
    const sessionUser = typeof GrihamAuth !== "undefined" ? GrihamAuth.getUser() : null;

    if (options.method === "PUT") {
      if (!payload.name || !payload.name.trim()) {
        const err = new Error("Full name is required");
        err.status = 400;
        throw err;
      }
      if (payload.email && payload.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
        const err = new Error("Please enter a valid email address");
        err.status = 400;
        throw err;
      }

      if (!db.profile) db.profile = {};
      db.profile.name = payload.name.trim();
      db.profile.email = (payload.email || "").trim();
      if (payload.profilePhoto !== undefined) {
        db.profile.profilePhoto = payload.profilePhoto;
      }

      // Update session user cache if exists (without storing large base64 strings in localStorage)
      if (sessionUser) {
        sessionUser.name = db.profile.name;
        sessionUser.email = db.profile.email;
        if (db.profile.profilePhoto && typeof db.profile.profilePhoto === "string" && !db.profile.profilePhoto.startsWith("data:")) {
          sessionUser.profilePhoto = db.profile.profilePhoto;
        } else if (db.profile.profilePhoto === null) {
          sessionUser.profilePhoto = null;
        }
        if (typeof GrihamAuth !== "undefined") {
          GrihamAuth.setUser(sessionUser);
        }
      }

      return {
        status: "success",
        mock: true,
        message: "Profile updated successfully.",
        profile: {
          ...db.profile,
          ...(sessionUser || {}),
          name: db.profile.name,
          email: db.profile.email,
          profilePhoto: db.profile.profilePhoto
        }
      };
    }

    const profile = {
      ...(db.profile || {}),
      ...(sessionUser || {})
    };
    // Ensure consistent keys
    profile.name = (db.profile && db.profile.name) || profile.name || (sessionUser && sessionUser.name) || "Rajesh Kumar";
    profile.phone = (db.profile && db.profile.phone) || profile.phone || (sessionUser && sessionUser.phone) || "+919876543210";
    profile.email = (db.profile && db.profile.email !== undefined) ? db.profile.email : (profile.email || (sessionUser && sessionUser.email) || "rajesh.kumar@example.com");
    profile.wing = (db.profile && db.profile.wing) || profile.wing || (sessionUser && sessionUser.wing) || "A";
    profile.flatNumber = (db.profile && db.profile.flatNumber) || profile.flatNumber || profile.flat || (sessionUser && (sessionUser.flatNumber || sessionUser.flat)) || "204";
    profile.floorNumber = (db.profile && db.profile.floorNumber) || profile.floorNumber || 2;
    profile.occupancyType = (db.profile && db.profile.occupancyType) || profile.occupancyType || profile.resident_type || (sessionUser && (sessionUser.occupancyType || sessionUser.resident_type)) || "Owner";
    profile.societyName = (db.profile && db.profile.societyName) || profile.societyName || (sessionUser && sessionUser.societyName) || "Green Valley Residency";
    profile.societyId = (db.profile && db.profile.societyId) || profile.societyId || (sessionUser && sessionUser.societyId) || "GRIHAM-PUNE-001";
    profile.approvalStatus = (sessionUser && sessionUser.approvalStatus) || profile.approvalStatus || (db.profile && db.profile.approvalStatus) || "Approved";
    profile.profilePhoto = (db.profile && db.profile.profilePhoto !== undefined) ? db.profile.profilePhoto : (profile.profilePhoto || null);

    return {
      status: "success",
      mock: true,
      profile: profile
    };
  }

  // 2. Water Status
  if (endpoint === (API_CONFIG?.ENDPOINTS?.RESIDENT_WATER_STATUS || "/v1/resident/water-status") || endpoint.startsWith("/v1/resident/water-status")) {
    return {
      status: "success",
      mock: true,
      data: db.waterStatus || {
        status: "Normal Supply",
        indicator: "normal",
        schedule: "6:00 AM – 10:00 AM & 5:00 PM – 9:00 PM",
        nextUpdate: "Today, 6:00 PM",
        tankLevel: "85%",
        note: "Normal municipal water supply active."
      }
    };
  }

  // 3. Chairman Contact
  if (endpoint === "/v1/resident/chairman") {
    return {
      status: "success",
      mock: true,
      data: db.chairman || {
        name: "Rajesh Verma",
        role: "Society Chairman",
        phone: "+919876543210",
        email: "chairman@greenvalley.res",
        officeHours: "6:00 PM – 8:00 PM (Mon – Sat)",
        officeLocation: "Tower A, Ground Floor Society Office"
      }
    };
  }

  // 4. Resident Recent Activity
  if (endpoint === "/v1/resident/recent-activity") {
    const sessionUser = typeof GrihamAuth !== "undefined" ? GrihamAuth.getUser() : null;
    let maint = { ...(db.recentActivity?.maintenance || {}) };

    if (sessionUser && typeof MOCK_MAINTENANCE_DB !== "undefined" && MOCK_MAINTENANCE_DB.months) {
      const monthData = MOCK_MAINTENANCE_DB.months["2026-09"] || MOCK_MAINTENANCE_DB.months[Object.keys(MOCK_MAINTENANCE_DB.months)[0]];
      if (monthData && Array.isArray(monthData.payments)) {
        const p = monthData.payments.find(item => 
          (item.resident_id && item.resident_id === sessionUser.id) ||
          (item.wing === sessionUser.wing && String(item.flat) === String(sessionUser.flatNumber))
        );
        if (p) {
          maint.amount = p.amount || maint.amount || 3500;
          maint.month = monthData.month_name || "September 2026";
          maint.dueDate = p.due_date || maint.dueDate || "25 Sep 2026";
          maint.receiptUrl = p.receipt_url || null;
          maint.submittedAt = p.submitted_at || null;
          maint.rejectionReason = p.rejection_reason || null;
          maint.paymentMethod = p.payment_method || null;
          
          if (p.status === "paid_early" || p.status === "paid_ontime" || p.status === "paid_late" || p.status === "paid") {
            maint.status = "Paid";
          } else if (p.status === "pending_verification") {
            maint.status = "Pending Verification";
          } else if (p.status === "rejected") {
            maint.status = "Rejected";
          } else {
            maint.status = "Due";
          }
        }
      }
    }

    return {
      status: "success",
      mock: true,
      data: {
        ...(db.recentActivity || {}),
        maintenance: maint
      }
    };
  }

  // 5. Resident Notifications
  if (endpoint === "/v1/resident/notifications") {
    const list = db.notifications || [];
    const unreadCount = list.filter(n => n.unread).length;
    return {
      status: "success",
      mock: true,
      notifications: list,
      unreadCount: unreadCount
    };
  }

  return undefined;
};
