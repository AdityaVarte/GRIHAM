/**
 * GRIHAM FRONTEND - API ABSTRACTION & SERVICES
 * Centralized REST client abstraction and mock API layer.
 * Ready for integration with FastAPI backend.
 */

// =================================================================
// 1. API CONFIGURATION
// =================================================================
const API_CONFIG = {
  BASE_URL: "http://localhost:8000/api",
  TIMEOUT_MS: 8000,
  MOCK_MODE: true, // Set to false once FastAPI backend server is live
  ENDPOINTS: {
    AUTH_LOGIN: "/v1/auth/login",
    AUTH_GATEKEEPER_LOGIN: "/v1/auth/gatekeeper/login",
    AUTH_REGISTER: "/v1/auth/register",
    AUTH_FORGOT_PASSWORD: "/v1/auth/forgot-password",
    AUTH_VERIFY_OTP: "/v1/auth/verify-otp",
    AUTH_RESEND_OTP: "/v1/auth/resend-otp",
    AUTH_RESET_PASSWORD: "/v1/auth/reset-password",
    ADMIN_DASHBOARD: "/v1/admin/dashboard",
    ADMIN_NOTIFICATIONS: "/v1/admin/notifications",
    ADMIN_MAINT_SUMMARY: "/v1/admin/maintenance/summary",
    ADMIN_MAINT_PAYMENTS: "/v1/admin/maintenance/payments",
    ADMIN_MAINT_RECORD: "/v1/admin/maintenance/record",
    ADMIN_MAINT_HISTORY: "/v1/admin/maintenance/history",
    ADMIN_MAINT_MY: "/v1/admin/maintenance/my",
    ADMIN_COMPLAINTS: "/v1/admin/complaints",
    ADMIN_COMPLAINT_STATUS: "/v1/admin/complaints/status",
    ADMIN_COMPLAINT_ASSIGNMENT: "/v1/admin/complaints/assignment",
    ADMIN_STAFF_VENDORS: "/v1/admin/staff-vendors",
    ADMIN_WORKERS: "/v1/admin/workers",
    ADMIN_WORKER_DETAIL: "/v1/admin/workers/detail",
    ADMIN_WORKER_ATTENDANCE_BASE: "/v1/admin/workers/attendance",
    ADMIN_APPROVALS: "/v1/admin/approvals",
    ADMIN_APPROVALS_DECISION: "/v1/admin/approvals/decision",
    ADMIN_CONTACTS: "/v1/admin/contacts",
    ADMIN_AMENITIES: "/v1/admin/amenities",
    ADMIN_AMENITY_BOOKINGS: "/v1/admin/amenities/bookings",
    ADMIN_SERVICE_REQUESTS: "/v1/admin/service-requests",
    ADMIN_SERVICE_REQUESTS_BULK: "/v1/admin/service-requests/bulk",
    ADMIN_BULK_SERVICES: "/v1/admin/bulk-services",
    ADMIN_PROFILE: "/v1/admin/profile",
    ADMIN_SOCIETY: "/v1/admin/society",
    ADMIN_PROFILE_PASSWORD: "/v1/admin/profile/password",
    ADMIN_ACCOUNT: "/v1/admin/account",
    ADMIN_STAFF: "/v1/admin/staff",
    ADMIN_VENDORS: "/v1/admin/vendors",
    ADMIN_GATEKEEPERS: "/v1/admin/gatekeepers",
    ADMIN_SOS: "/v1/admin/sos",
    ADMIN_SOS_RESOLVE: "/v1/admin/sos",
    RESIDENT_PROFILE: "/v1/resident/profile",
    RESIDENT_UPDATE_PROFILE: "/v1/resident/profile",
    RESIDENT_CHANGE_PASSWORD: "/v1/resident/profile/password",
    RESIDENT_DELETE_ACCOUNT: "/v1/resident/account",
    RESIDENT_SOCIETY: "/v1/resident/society",
    RESIDENT_WATER_STATUS: "/v1/resident/water-status",
    RESIDENT_MAINT_CASH_PAYMENT: "/v1/resident/maintenance/cash-payment",
    RESIDENT_MAINT_HISTORY: "/v1/resident/maintenance/history",
    RESIDENT_MAINT_SUMMARY: "/v1/resident/maintenance/summary",
    RESIDENT_MAINT_PAYMENT_DETAIL: "/v1/resident/maintenance/payments",
    ADMIN_MAINT_APPROVE_PAYMENT: "/v1/admin/maintenance/payments/approve",
    ADMIN_MAINT_REJECT_PAYMENT: "/v1/admin/maintenance/payments/reject",
    RESIDENT_COMPLAINTS: "/v1/resident/complaints",
    RESIDENT_COMPLAINT_CANCEL: "/v1/resident/complaints/cancel",
    RESIDENT_SERVICE_REQUESTS: "/v1/resident/service-requests",
    RESIDENT_SERVICE_REQUEST_CANCEL: "/v1/resident/service-requests/cancel",
    RESIDENT_AMENITIES: "/v1/resident/amenities",
    RESIDENT_AMENITY_BOOKINGS: "/v1/resident/amenities/bookings",
    RESIDENT_AMENITY_BOOKING_CANCEL: "/v1/resident/amenities/bookings/cancel",
    SOCIETY_LOOKUP: "/v1/society/lookup",
    NOTIFICATIONS: "/v1/notifications",
    RESIDENT_VOTING: "/v1/resident/voting",
    PROFILE: "/v1/profile",
    GATEKEEPER_VISITORS: "/v1/gatekeeper/visitors",
    GATEKEEPER_VISITOR_DETAIL: "/v1/gatekeeper/visitors/detail",
    GATEKEEPER_VISITOR_CHECKIN: "/v1/gatekeeper/visitors/checkin",
    GATEKEEPER_VISITOR_CHECKOUT: "/v1/gatekeeper/visitors/checkout",
    GATEKEEPER_VISITOR_SUMMARY: "/v1/gatekeeper/visitors/summary",
    GATEKEEPER_DELIVERIES: "/v1/gatekeeper/deliveries",
    GATEKEEPER_DELIVERY_DETAIL: "/v1/gatekeeper/deliveries/detail",
    GATEKEEPER_DELIVERY_SUMMARY: "/v1/gatekeeper/deliveries/summary",
    GATEKEEPER_DELIVERY_ARRIVE: "/v1/gatekeeper/deliveries/arrive",
    GATEKEEPER_DELIVERY_ENTER: "/v1/gatekeeper/deliveries/enter",
    GATEKEEPER_DELIVERY_HANDOVER: "/v1/gatekeeper/deliveries/handover",
    GATEKEEPER_NOTIFICATIONS: "/v1/gatekeeper/notifications",
    GATEKEEPER_NOTIFICATION_DETAIL: "/v1/gatekeeper/notifications/detail",
    GATEKEEPER_NOTIFICATION_SUMMARY: "/v1/gatekeeper/notifications/summary",
    GATEKEEPER_NOTIFICATION_READ: "/v1/gatekeeper/notifications/read",
    GATEKEEPER_NOTIFICATION_UNREAD: "/v1/gatekeeper/notifications/unread",
    GATEKEEPER_PROFILE: "/v1/gatekeeper/profile"
  },
  /**
   * Safely construct endpoint paths with encoded parameters.
   * Eliminates duplicated URL string template construction across modules.
   * @param {string} base - Base endpoint string
   * @param {...(string|number)} segments - Path segments to append
   * @returns {string} - Clean combined URL
   */
  buildUrl: function(base, ...segments) {
    if (!base) return "";
    const cleanBase = base.replace(/\/+$/, "");
    const parts = segments
      .filter(s => s !== undefined && s !== null && s !== "")
      .map(s => encodeURIComponent(String(s)));
    return parts.length ? `${cleanBase}/${parts.join("/")}` : cleanBase;
  }
};

window.API_CONFIG = API_CONFIG;

// =================================================================
// 2. CENTRALIZED REQUEST HELPER
// =================================================================

/**
 * Centralized REST client abstraction.
 * All backend calls flow through this helper.
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const token = typeof GrihamAuth !== "undefined" ? GrihamAuth.getToken() : null;
  
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...options.headers
  };

  if (API_CONFIG.MOCK_MODE) {
    try {
      return await mockApiAdapter(endpoint, options);
    } catch (err) {
      if (err && (err.status === 401 || err.statusCode === 401)) {
        if (typeof GrihamAuth !== "undefined") {
          GrihamAuth.clearSession();
          if (typeof GrihamRouter !== "undefined") {
            const currentHash = window.location.hash || "";
            if (!GrihamRouter.isPublicRoute(currentHash)) {
              GrihamRouter.navigate("/entry");
            }
          }
        }
      }
      console.error(`[API Error] ${options.method || "GET"} ${endpoint}:`, err.message || "Request failed");
      throw err;
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT_MS);
    
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      if (response.status === 401) {
        if (typeof GrihamAuth !== "undefined") {
          GrihamAuth.clearSession();
          if (typeof GrihamRouter !== "undefined") {
            const currentHash = window.location.hash || "";
            if (!GrihamRouter.isPublicRoute(currentHash)) {
              GrihamRouter.navigate("/entry");
            }
          }
        }
      }
      const errData = await response.json().catch(() => ({ message: "Request failed" }));
      const err = new Error(errData.detail || errData.message || `HTTP ${response.status}`);
      err.status = response.status;
      throw err;
    }
    
    return await response.json();
  } catch (err) {
    console.error(`[API Error] ${options.method || "GET"} ${endpoint}:`, err.message || "Request failed");
    throw err;
  }
}

// =================================================================
// 3. HTTP METHOD HELPERS
// =================================================================
const apiGet = (endpoint, params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return apiRequest(qs ? `${endpoint}?${qs}` : endpoint, { method: "GET" });
};

const apiPost = (endpoint, data = {}) => {
  return apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(data)
  });
};

const apiPut = (endpoint, data = {}) => {
  return apiRequest(endpoint, {
    method: "PUT",
    body: JSON.stringify(data)
  });
};

const apiDelete = (endpoint) => {
  return apiRequest(endpoint, { method: "DELETE" });
};

window.apiRequest = apiRequest;
window.apiGet = apiGet;
window.apiPost = apiPost;
window.apiPut = apiPut;
window.apiDelete = apiDelete;

// =================================================================
// 4. API SERVICES / ENDPOINT CALLS
// =================================================================
async function mockApiAdapter(endpoint, options) {
  // Try dynamic feature adapters
  let payload = {};
  if (options.body) {
    try { payload = JSON.parse(options.body); } catch(e){}
  }
  
  const adapters = [window.mockAuthAdapter, window.mockResidentAdapter, window.mockAdminAdapter, window.mockMaintenanceAdapter, window.mockComplaintsAdapter, window.mockStaffAdapter, window.mockApprovalsAdapter, window.mockServiceRequestsAdapter, window.mockAmenitiesAdapter, window.mockWorkersAdapter, window.mockBulkServicesAdapter, window.mockSosAdapter, window.mockGatekeeperAdapter];
  
  for (const adapter of adapters) {
    if (adapter) {
      const result = await adapter(endpoint, options, payload);
      if (result !== undefined) return result;
    }
  }

  // Delay simulation
  await new Promise(r => setTimeout(r, 400 + Math.random() * 400));


  // 20b. Admin Amenity List Mock
  if ((endpoint === API_CONFIG.ENDPOINTS.ADMIN_AMENITIES || endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_AMENITIES + "?")) && (options.method === "GET" || !options.method)) {
    const db = (typeof MOCK_AMENITIES_DB !== "undefined" ? MOCK_AMENITIES_DB : window.MOCK_AMENITIES_DB);
    const list = db ? [...db.amenities] : [];
    const total = list.length;
    const available = list.filter(a => a.status === "Available").length;
    const maintenance = list.filter(a => a.status === "Maintenance").length;
    const disabled = list.filter(a => a.status === "Disabled").length;

    return {
      status: "success",
      mock: true,
      amenities: list,
      total,
      summary: {
        total,
        available,
        maintenance,
        disabled
      }
    };
  }

  // 21. Admin Amenity Detail Mock
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_AMENITIES + "/") && !endpoint.includes("/status") && !endpoint.includes("/bookings") && (options.method === "GET" || !options.method)) {
    const amenityId = endpoint.split("/").pop();
    const item = MOCK_AMENITIES_DB.amenities.find(a => a.id === amenityId);
    if (!item) {
      const err = new Error("Amenity not found");
      err.status = 404;
      throw err;
    }
    const todayStr = "2026-09-17";
    const todayCount = MOCK_AMENITIES_DB.bookings.filter(b => b.amenity_id === item.id && b.date === todayStr && b.status !== "Cancelled" && b.status !== "Rejected").length;
    return {
      status: "success",
      mock: true,
      amenity: {
        ...item,
        today_bookings_count: todayCount
      }
    };
  }

  // 22. Admin Amenity Create Mock
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_AMENITIES && options.method === "POST") {
    if (!payload.name || !payload.capacity || !payload.opening_time || !payload.closing_time || !payload.booking_duration) {
      const err = new Error("Required fields missing");
      err.status = 400;
      throw err;
    }
    const newAmn = {
      id: `AMN-${String(MOCK_AMENITIES_DB.nextAmenityId).padStart(3, "0")}`,
      name: payload.name.trim(),
      description: (payload.description || "").trim(),
      location: (payload.location || "").trim(),
      capacity: parseInt(payload.capacity, 10) || 10,
      opening_time: payload.opening_time,
      closing_time: payload.closing_time,
      booking_duration: parseFloat(payload.booking_duration) || 2,
      advance_booking_days: parseInt(payload.advance_booking_days, 10) || 14,
      requires_approval: payload.requires_approval === true || payload.requires_approval === "true",
      status: payload.status || "Available",
      rules: (payload.rules || "").trim(),
      icon: payload.icon || "hall"
    };
    MOCK_AMENITIES_DB.nextAmenityId += 1;
    MOCK_AMENITIES_DB.amenities.push(newAmn);
    return {
      status: "success",
      mock: true,
      message: `Amenity "${newAmn.name}" added successfully.`,
      amenity: newAmn
    };
  }

  // 23. Admin Amenity Update Mock
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_AMENITIES + "/") && !endpoint.includes("/status") && !endpoint.includes("/bookings") && options.method === "PUT") {
    const amenityId = endpoint.split("/").pop();
    const item = MOCK_AMENITIES_DB.amenities.find(a => a.id === amenityId);
    if (!item) {
      const err = new Error("Amenity not found");
      err.status = 404;
      throw err;
    }
    Object.assign(item, {
      name: payload.name ? payload.name.trim() : item.name,
      description: payload.description !== undefined ? payload.description.trim() : item.description,
      location: payload.location !== undefined ? payload.location.trim() : item.location,
      capacity: payload.capacity !== undefined ? parseInt(payload.capacity, 10) : item.capacity,
      opening_time: payload.opening_time || item.opening_time,
      closing_time: payload.closing_time || item.closing_time,
      booking_duration: payload.booking_duration !== undefined ? parseFloat(payload.booking_duration) : item.booking_duration,
      advance_booking_days: payload.advance_booking_days !== undefined ? parseInt(payload.advance_booking_days, 10) : item.advance_booking_days,
      requires_approval: payload.requires_approval !== undefined ? (payload.requires_approval === true || payload.requires_approval === "true") : item.requires_approval,
      rules: payload.rules !== undefined ? payload.rules.trim() : item.rules
    });
    return {
      status: "success",
      mock: true,
      message: `Amenity "${item.name}" updated successfully.`,
      amenity: item
    };
  }

  // 24. Admin Amenity Status/Block/Unblock Mock
  if (endpoint.includes("/status") && endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_AMENITIES) && options.method === "PUT") {
    const parts = endpoint.split("/");
    const amenityId = parts[parts.length - 2];
    const item = MOCK_AMENITIES_DB.amenities.find(a => a.id === amenityId);
    if (!item) {
      const err = new Error("Amenity not found");
      err.status = 404;
      throw err;
    }
    item.status = payload.status || item.status;
    if (payload.status === "Maintenance" || payload.status === "Disabled") {
      item.blocked_reason = payload.reason || "Maintenance scheduled by administrator.";
      item.blocked_start_date = payload.start_date || null;
      item.blocked_end_date = payload.end_date || null;
      item.blocked_note = payload.note || "";
    } else if (payload.status === "Available") {
      delete item.blocked_reason;
      delete item.blocked_start_date;
      delete item.blocked_end_date;
      delete item.blocked_note;
    }
    return {
      status: "success",
      mock: true,
      message: `Status updated to ${item.status}`,
      amenity: item
    };
  }

  // 25. Admin Amenity Bookings List Mock
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_AMENITY_BOOKINGS) && !endpoint.includes("/approve") && !endpoint.includes("/reject") && !endpoint.includes("/cancel") && (options.method === "GET" || !options.method)) {
    const urlObj = new URL("http://localhost" + endpoint);
    const dateParam = urlObj.searchParams.get("date");
    const amenityIdParam = urlObj.searchParams.get("amenity_id");
    const statusParam = urlObj.searchParams.get("status");

    let filtered = [...MOCK_AMENITIES_DB.bookings];
    if (dateParam) {
      filtered = filtered.filter(b => b.date === dateParam);
    }
    if (amenityIdParam && amenityIdParam !== "all") {
      filtered = filtered.filter(b => b.amenity_id === amenityIdParam);
    }
    if (statusParam && statusParam !== "all") {
      filtered = filtered.filter(b => b.status.toLowerCase() === statusParam.toLowerCase());
    }

    // Sort chronologically by start_time
    filtered.sort((a, b) => a.start_time.localeCompare(b.start_time));

    return {
      status: "success",
      mock: true,
      bookings: filtered,
      residents: MOCK_AMENITIES_DB.residentsList
    };
  }

  // 26. Admin Direct Create Amenity Booking Mock (with Interval Conflict check)
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_AMENITY_BOOKINGS && options.method === "POST") {
    const { amenity_id, resident_name, wing, flat, phone, date, start_time, end_time, people_count, purpose } = payload;
    
    if (!amenity_id || !date || !start_time || !end_time) {
      const err = new Error("Missing required booking fields");
      err.status = 400;
      throw err;
    }

    const amn = MOCK_AMENITIES_DB.amenities.find(a => a.id === amenity_id);
    if (!amn) {
      const err = new Error("Amenity not found");
      err.status = 404;
      throw err;
    }

    // Check if amenity is blocked/maintenance
    if (amn.status === "Maintenance" || amn.status === "Disabled") {
      const err = new Error(`Amenity is currently marked as ${amn.status}. Cannot book.`);
      err.status = 400;
      err.code = "AMENITY_BLOCKED";
      throw err;
    }

    // INTERVAL CONFLICT CHECK
    // Overlap rule: newStart < existingEnd AND newEnd > existingStart
    const newStart = start_time;
    const newEnd = end_time;

    const activeBookings = MOCK_AMENITIES_DB.bookings.filter(b => 
      b.amenity_id === amenity_id && 
      b.date === date && 
      (b.status === "Approved" || b.status === "Pending")
    );

    const conflictingBooking = activeBookings.find(b => {
      const existStart = b.start_time;
      const existEnd = b.end_time;
      // Overlap condition
      return (newStart < existEnd && newEnd > existStart);
    });

    if (conflictingBooking) {
      const err = new Error("Booking Conflict: This amenity is already booked during part of the selected time.");
      err.status = 409;
      err.code = "BOOKING_CONFLICT";
      err.conflict = conflictingBooking;
      throw err;
    }

    const newBooking = {
      id: `BK-2026-${String(MOCK_AMENITIES_DB.nextBookingId).padStart(4, "0")}`,
      amenity_id: amn.id,
      amenity_name: amn.name,
      resident_name: (resident_name || "Admin Direct").trim(),
      flat: (flat || "101").trim(),
      wing: (wing || "A").trim(),
      phone: phone || "+91 9876543210",
      date: date,
      start_time: start_time,
      end_time: end_time,
      people_count: parseInt(people_count, 10) || 1,
      purpose: (purpose || "Direct Admin Booking").trim(),
      status: "Approved", // Admin direct bookings are pre-approved
      created_at: new Date().toISOString(),
      approved_at: new Date().toISOString()
    };

    MOCK_AMENITIES_DB.nextBookingId += 1;
    MOCK_AMENITIES_DB.bookings.push(newBooking);

    return {
      status: "success",
      mock: true,
      message: `Booking ${newBooking.id} created successfully.`,
      booking: newBooking
    };
  }

  // 27. Admin Booking Approve Mock
  if (endpoint.includes("/approve") && endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_AMENITY_BOOKINGS) && options.method === "PUT") {
    const parts = endpoint.split("/");
    const bookingId = parts[parts.length - 2];
    const booking = MOCK_AMENITIES_DB.bookings.find(b => b.id === bookingId);
    if (!booking) {
      const err = new Error("Booking not found");
      err.status = 404;
      throw err;
    }
    booking.status = "Approved";
    booking.approved_at = new Date().toISOString();
    return {
      status: "success",
      mock: true,
      message: `Booking ${booking.id} approved successfully.`,
      booking
    };
  }

  // 28. Admin Booking Reject Mock
  if (endpoint.includes("/reject") && endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_AMENITY_BOOKINGS) && options.method === "PUT") {
    const parts = endpoint.split("/");
    const bookingId = parts[parts.length - 2];
    const booking = MOCK_AMENITIES_DB.bookings.find(b => b.id === bookingId);
    if (!booking) {
      const err = new Error("Booking not found");
      err.status = 404;
      throw err;
    }
    booking.status = "Rejected";
    booking.rejection_reason = payload.reason || "Rejected by administrator.";
    booking.rejected_at = new Date().toISOString();
    return {
      status: "success",
      mock: true,
      message: `Booking ${booking.id} rejected.`,
      booking
    };
  }

  // 29. Admin Booking Cancel Mock
  if (endpoint.includes("/cancel") && endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_AMENITY_BOOKINGS) && options.method === "PUT") {
    const parts = endpoint.split("/");
    const bookingId = parts[parts.length - 2];
    const booking = MOCK_AMENITIES_DB.bookings.find(b => b.id === bookingId);
    if (!booking) {
      const err = new Error("Booking not found");
      err.status = 404;
      throw err;
    }
    booking.status = "Cancelled";
    booking.cancel_reason = payload.reason || "Cancelled by administrator.";
    booking.cancelled_at = new Date().toISOString();
    return {
      status: "success",
      mock: true,
      message: `Booking ${booking.id} cancelled.`,
      booking
    };
  }

  // 13. Admin Resident Approval Decision (approve / reject)
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_APPROVALS_DECISION || endpoint === "/admin/approvals/decision") {
    const approval = MOCK_APPROVALS_DB.approvals.find(a => a.id === payload.id);
    if (!approval) {
      const err = new Error("Approval record not found");
      err.status = 404;
      throw err;
    }
    if (approval.status !== "pending" && approval.status !== "Pending") {
      const err = new Error("This application has already been reviewed");
      err.status = 409;
      throw err;
    }
    // Update the record
    const nowIso = "2026-09-17T15:00:00Z";
    if (payload.decision === "approved") {
      approval.status = "approved";
      approval.accountStatus = "Active";
      approval.approved_at = nowIso;
      approval.approvedAt = nowIso;
      approval.approvedBy = "Chairman";
    } else {
      approval.status = "rejected";
      approval.accountStatus = "Inactive";
      approval.rejection_reason = payload.rejection_reason || "Rejected by administrator.";
      approval.rejectionReason = approval.rejection_reason;
      approval.rejected_at = nowIso;
      approval.rejectedAt = nowIso;
      approval.rejectedBy = "Admin";
    }
    return {
      status: "success",
      mock: true,
      message: payload.decision === "approved"
        ? `${approval.fullName || approval.name} has been approved and will receive access to Griham.`
        : `${approval.fullName || approval.name}'s registration has been rejected.`,
      approval
    };
  }

  // 3. Resident Registration Mock
  if (endpoint === API_CONFIG.ENDPOINTS.AUTH_REGISTER) {
    return {
      status: "pending_approval",
      mock: true,
      message: "Registration submitted for admin approval",
      society_id: payload.society_id,
      phone: payload.phone
    };
  }

  // 4. Forgot Password Mock
  if (endpoint === API_CONFIG.ENDPOINTS.AUTH_FORGOT_PASSWORD) {
    const cleanPhone = (payload.phone || "").replace(/\D/g, "");
    const masked = cleanPhone.length >= 4 
      ? "*".repeat(Math.max(2, cleanPhone.length - 4)) + cleanPhone.slice(-4)
      : "******" + cleanPhone;
    return {
      status: "otp_sent",
      mock: true,
      message: "OTP sent successfully to registered phone",
      society_id: payload.society_id,
      masked_phone: masked
    };
  }

  // 5. Resend OTP Mock
  if (endpoint === API_CONFIG.ENDPOINTS.AUTH_RESEND_OTP) {
    return {
      status: "otp_resent",
      mock: true,
      message: "A new 6-digit OTP has been sent"
    };
  }


  return { status: "error", message: "Mock Endpoint not found or not implemented: " + endpoint };
}

// Global API Namespace

// Re-bundling GrihamAPI to avoid breaking UI that uses GrihamAPI.*
window.GrihamAPI = {
  loginResident: (...args) => (window.loginResident ? window.loginResident(...args) : Promise.reject(new Error("API not loaded"))),
  loginAdmin: (...args) => (window.loginAdmin ? window.loginAdmin(...args) : Promise.reject(new Error("API not loaded"))),
  registerResident: (...args) => (window.registerResident ? window.registerResident(...args) : Promise.reject(new Error("API not loaded"))),
  forgotPassword: (...args) => (window.forgotPassword ? window.forgotPassword(...args) : Promise.reject(new Error("API not loaded"))),
  verifyOtp: (...args) => (window.verifyOtp ? window.verifyOtp(...args) : Promise.reject(new Error("API not loaded"))),
  resendOtp: (...args) => (window.resendOtp ? window.resendOtp(...args) : Promise.reject(new Error("API not loaded"))),
  resetPassword: (...args) => (window.resetPassword ? window.resetPassword(...args) : Promise.reject(new Error("API not loaded"))),
  getAdminProfile: (...args) => (window.getAdminProfile ? window.getAdminProfile(...args) : Promise.reject(new Error("API not loaded"))),
  updateAdminProfile: (...args) => (window.updateAdminProfile ? window.updateAdminProfile(...args) : Promise.reject(new Error("API not loaded"))),
  getAdminSociety: (...args) => (window.getAdminSociety ? window.getAdminSociety(...args) : Promise.reject(new Error("API not loaded"))),
  updateAdminSociety: (...args) => (window.updateAdminSociety ? window.updateAdminSociety(...args) : Promise.reject(new Error("API not loaded"))),
  changeAdminPassword: (...args) => (window.changeAdminPassword ? window.changeAdminPassword(...args) : Promise.reject(new Error("API not loaded"))),
  deleteAdminAccount: (...args) => (window.deleteAdminAccount ? window.deleteAdminAccount(...args) : Promise.reject(new Error("API not loaded"))),
  getAdminDashboardData: (...args) => (window.getAdminDashboardData ? window.getAdminDashboardData(...args) : Promise.reject(new Error("API not loaded"))),
  getAdminNotifications: (...args) => (window.getAdminNotifications ? window.getAdminNotifications(...args) : Promise.reject(new Error("API not loaded"))),
  createAdminNotification: (...args) => (window.createAdminNotification ? window.createAdminNotification(...args) : Promise.reject(new Error("API not loaded"))),
  getMaintenanceSummary: (...args) => (window.getMaintenanceSummary ? window.getMaintenanceSummary(...args) : Promise.reject(new Error("API not loaded"))),
  getMaintenancePayments: (...args) => (window.getMaintenancePayments ? window.getMaintenancePayments(...args) : Promise.reject(new Error("API not loaded"))),
  recordMaintenancePayment: (...args) => (window.recordMaintenancePayment ? window.recordMaintenancePayment(...args) : Promise.reject(new Error("API not loaded"))),
  getMaintenanceHistory: (...args) => (window.getMaintenanceHistory ? window.getMaintenanceHistory(...args) : Promise.reject(new Error("API not loaded"))),
  getMyMaintenance: (...args) => (window.getMyMaintenance ? window.getMyMaintenance(...args) : Promise.reject(new Error("API not loaded"))),
  getResidentMaintenanceHistory: (...args) => (window.getResidentMaintenanceHistory ? window.getResidentMaintenanceHistory(...args) : Promise.reject(new Error("API not loaded"))),
  getResidentMaintenanceSummary: (...args) => (window.getResidentMaintenanceSummary ? window.getResidentMaintenanceSummary(...args) : Promise.reject(new Error("API not loaded"))),
  getResidentMaintenanceDetail: (...args) => (window.getResidentMaintenanceDetail ? window.getResidentMaintenanceDetail(...args) : Promise.reject(new Error("API not loaded"))),
  getAdminComplaints: (...args) => (window.getAdminComplaints ? window.getAdminComplaints(...args) : Promise.reject(new Error("API not loaded"))),
  getAdminComplaintDetail: (...args) => (window.getAdminComplaintDetail ? window.getAdminComplaintDetail(...args) : Promise.reject(new Error("API not loaded"))),
  updateAdminComplaintStatus: (...args) => (window.updateAdminComplaintStatus ? window.updateAdminComplaintStatus(...args) : Promise.reject(new Error("API not loaded"))),
  updateAdminComplaintAssignment: (...args) => (window.updateAdminComplaintAssignment ? window.updateAdminComplaintAssignment(...args) : Promise.reject(new Error("API not loaded"))),
  getResidentComplaints: (...args) => (window.getResidentComplaints ? window.getResidentComplaints(...args) : Promise.reject(new Error("API not loaded"))),
  getResidentComplaintDetail: (...args) => (window.getResidentComplaintDetail ? window.getResidentComplaintDetail(...args) : Promise.reject(new Error("API not loaded"))),
  createResidentComplaint: (...args) => (window.createResidentComplaint ? window.createResidentComplaint(...args) : Promise.reject(new Error("API not loaded"))),
  cancelResidentComplaint: (...args) => (window.cancelResidentComplaint ? window.cancelResidentComplaint(...args) : Promise.reject(new Error("API not loaded"))),
  getAvailableStaffAndVendors: (...args) => (window.getAvailableStaffAndVendors ? window.getAvailableStaffAndVendors(...args) : Promise.reject(new Error("API not loaded"))),
  getApprovals: (...args) => (window.getApprovals ? window.getApprovals(...args) : Promise.reject(new Error("API not loaded"))),
  getPendingApprovals: (...args) => (window.getPendingApprovals ? window.getPendingApprovals(...args) : Promise.reject(new Error("API not loaded"))),
  getApprovalById: (...args) => (window.getApprovalById ? window.getApprovalById(...args) : Promise.reject(new Error("API not loaded"))),
  approveRegistration: (...args) => (window.approveRegistration ? window.approveRegistration(...args) : Promise.reject(new Error("API not loaded"))),
  rejectRegistration: (...args) => (window.rejectRegistration ? window.rejectRegistration(...args) : Promise.reject(new Error("API not loaded"))),
  getApprovalHistory: (...args) => (window.getApprovalHistory ? window.getApprovalHistory(...args) : Promise.reject(new Error("API not loaded"))),
  updateApprovalDecision: (...args) => (window.updateApprovalDecision ? window.updateApprovalDecision(...args) : Promise.reject(new Error("API not loaded"))),
  getServiceRequests: (...args) => (window.getServiceRequests ? window.getServiceRequests(...args) : Promise.reject(new Error("API not loaded"))),
  getServiceRequestDetail: (...args) => (window.getServiceRequestDetail ? window.getServiceRequestDetail(...args) : Promise.reject(new Error("API not loaded"))),
  createServiceRequest: (...args) => (window.createServiceRequest ? window.createServiceRequest(...args) : Promise.reject(new Error("API not loaded"))),
  updateServiceRequest: (...args) => (window.updateServiceRequest ? window.updateServiceRequest(...args) : Promise.reject(new Error("API not loaded"))),
  updateServiceRequestStatus: (...args) => (window.updateServiceRequestStatus ? window.updateServiceRequestStatus(...args) : Promise.reject(new Error("API not loaded"))),
  updateServiceRequestAssignment: (...args) => (window.updateServiceRequestAssignment ? window.updateServiceRequestAssignment(...args) : Promise.reject(new Error("API not loaded"))),
  updateServiceRequestSchedule: (...args) => (window.updateServiceRequestSchedule ? window.updateServiceRequestSchedule(...args) : Promise.reject(new Error("API not loaded"))),
  bulkUpdateServiceRequestStatus: (...args) => (window.bulkUpdateServiceRequestStatus ? window.bulkUpdateServiceRequestStatus(...args) : Promise.reject(new Error("API not loaded"))),
  bulkUpdateServiceRequestAssignment: (...args) => (window.bulkUpdateServiceRequestAssignment ? window.bulkUpdateServiceRequestAssignment(...args) : Promise.reject(new Error("API not loaded"))),
  bulkUpdateServiceRequestSchedule: (...args) => (window.bulkUpdateServiceRequestSchedule ? window.bulkUpdateServiceRequestSchedule(...args) : Promise.reject(new Error("API not loaded"))),
  bulkCancelServiceRequests: (...args) => (window.bulkCancelServiceRequests ? window.bulkCancelServiceRequests(...args) : Promise.reject(new Error("API not loaded"))),
  getServiceRequestHistory: (...args) => (window.getServiceRequestHistory ? window.getServiceRequestHistory(...args) : Promise.reject(new Error("API not loaded"))),
  getWorkers: (...args) => (window.getWorkers ? window.getWorkers(...args) : Promise.reject(new Error("API not loaded"))),
  getWorkerDetail: (...args) => (window.getWorkerDetail ? window.getWorkerDetail(...args) : Promise.reject(new Error("API not loaded"))),
  updateWorker: (...args) => (window.updateWorker ? window.updateWorker(...args) : Promise.reject(new Error("API not loaded"))),
  getContactsByCategory: (...args) => (window.getContactsByCategory ? window.getContactsByCategory(...args) : Promise.reject(new Error("API not loaded"))),
  getStaffVendors: (...args) => (window.getStaffVendors ? window.getStaffVendors(...args) : Promise.reject(new Error("API not loaded"))),
  getAmenities: (...args) => (window.getAmenities ? window.getAmenities(...args) : Promise.reject(new Error("API not loaded"))),
  getAmenityDetail: (...args) => (window.getAmenityDetail ? window.getAmenityDetail(...args) : Promise.reject(new Error("API not loaded"))),
  getAmenityBookings: (...args) => (window.getAmenityBookings ? window.getAmenityBookings(...args) : Promise.reject(new Error("API not loaded"))),
  createAmenityBooking: (...args) => (window.createAmenityBooking ? window.createAmenityBooking(...args) : Promise.reject(new Error("API not loaded"))),
  rejectAmenityBooking: (...args) => (window.rejectAmenityBooking ? window.rejectAmenityBooking(...args) : Promise.reject(new Error("API not loaded"))),
  cancelAmenityBooking: (...args) => (window.cancelAmenityBooking ? window.cancelAmenityBooking(...args) : Promise.reject(new Error("API not loaded"))),
  getBulkServices: (...args) => (window.getBulkServices ? window.getBulkServices(...args) : Promise.resolve({ status: "success", campaigns: [], bulk_services: [] })),
  getBulkServiceDetail: (...args) => (window.getBulkServiceDetail ? window.getBulkServiceDetail(...args) : Promise.reject(new Error("API not loaded"))),
  createBulkService: (...args) => (window.createBulkService ? window.createBulkService(...args) : Promise.reject(new Error("API not loaded"))),
  addBulkServiceApplicants: (...args) => (window.addBulkServiceApplicants ? window.addBulkServiceApplicants(...args) : Promise.reject(new Error("API not loaded"))),
  removeBulkServiceApplicant: (...args) => (window.removeBulkServiceApplicant ? window.removeBulkServiceApplicant(...args) : Promise.reject(new Error("API not loaded"))),
  updateBulkServiceNegotiation: (...args) => (window.updateBulkServiceNegotiation ? window.updateBulkServiceNegotiation(...args) : Promise.reject(new Error("API not loaded"))),
  updateBulkServiceStatus: (...args) => (window.updateBulkServiceStatus ? window.updateBulkServiceStatus(...args) : Promise.reject(new Error("API not loaded"))),
  cancelBulkService: (...args) => (window.cancelBulkService ? window.cancelBulkService(...args) : Promise.reject(new Error("API not loaded"))),
  getStaff: (...args) => (window.getStaff ? window.getStaff(...args) : Promise.resolve({ status: "success", staff: [], summary: {} })),
  getStaffById: (...args) => (window.getStaffById ? window.getStaffById(...args) : Promise.reject(new Error("Not found"))),
  createWorker: (...args) => (window.createWorker ? window.createWorker(...args) : Promise.reject(new Error("API not loaded"))),
  createVendor: (...args) => (window.createVendor ? window.createVendor(...args) : Promise.reject(new Error("API not loaded"))),
  updateVendor: (...args) => (window.updateVendor ? window.updateVendor(...args) : Promise.reject(new Error("API not loaded"))),
  createGatekeeper: (...args) => (window.createGatekeeper ? window.createGatekeeper(...args) : Promise.reject(new Error("API not loaded"))),
  updateGatekeeper: (...args) => (window.updateGatekeeper ? window.updateGatekeeper(...args) : Promise.reject(new Error("API not loaded"))),
  deactivateStaff: (...args) => (window.deactivateStaff ? window.deactivateStaff(...args) : Promise.reject(new Error("API not loaded"))),
  getStaffByCategory: (...args) => (window.getStaffByCategory ? window.getStaffByCategory(...args) : Promise.resolve({ staff: [] })),
  checkDuplicatePhone: (...args) => (window.checkDuplicatePhone ? window.checkDuplicatePhone(...args) : Promise.resolve({ isDuplicate: false, existingRecord: null })),
  getAdminSOS: (...args) => (window.getAdminSOS ? window.getAdminSOS(...args) : Promise.resolve({ status: "success", alerts: [], summary: {} })),
  getAdminSOSById: (...args) => (window.getAdminSOSById ? window.getAdminSOSById(...args) : Promise.reject(new Error("Not found"))),
  resolveAdminSOS: (...args) => (window.resolveAdminSOS ? window.resolveAdminSOS(...args) : Promise.reject(new Error("API not loaded"))),
  getAdminSOSSummary: (...args) => (window.getAdminSOSSummary ? window.getAdminSOSSummary(...args) : Promise.resolve({ active: 0, resolvedToday: 0, total: 0 })),
  getResidentProfile: (...args) => (window.getResidentProfile ? window.getResidentProfile(...args) : Promise.resolve({ status: "success", profile: {} })),
  updateResidentProfile: (...args) => (window.updateResidentProfile ? window.updateResidentProfile(...args) : Promise.reject(new Error("API not loaded"))),
  changeResidentPassword: (...args) => (window.changeResidentPassword ? window.changeResidentPassword(...args) : Promise.reject(new Error("API not loaded"))),
  deleteResidentAccount: (...args) => (window.deleteResidentAccount ? window.deleteResidentAccount(...args) : Promise.reject(new Error("API not loaded"))),
  getWaterStatus: (...args) => (window.getWaterStatus ? window.getWaterStatus(...args) : Promise.resolve({ status: "success", data: {} })),
  getChairmanContact: (...args) => (window.getChairmanContact ? window.getChairmanContact(...args) : Promise.resolve({ status: "success", data: {} })),
  getResidentRecentActivity: (...args) => (window.getResidentRecentActivity ? window.getResidentRecentActivity(...args) : Promise.resolve({ status: "success", data: {} })),
  sendResidentSOS: (...args) => (window.sendResidentSOS ? window.sendResidentSOS(...args) : Promise.reject(new Error("API not loaded"))),
  submitCashPaymentReceipt: (...args) => (window.submitCashPaymentReceipt ? window.submitCashPaymentReceipt(...args) : Promise.reject(new Error("API not loaded"))),
  approveCashPayment: (...args) => (window.approveCashPayment ? window.approveCashPayment(...args) : Promise.reject(new Error("API not loaded"))),
  rejectCashPayment: (...args) => (window.rejectCashPayment ? window.rejectCashPayment(...args) : Promise.reject(new Error("API not loaded"))),
  getResidentServiceRequests: (...args) => (window.getResidentServiceRequests ? window.getResidentServiceRequests(...args) : Promise.reject(new Error("API not loaded"))),
  getResidentServiceRequestDetail: (...args) => (window.getResidentServiceRequestDetail ? window.getResidentServiceRequestDetail(...args) : Promise.reject(new Error("API not loaded"))),
  createResidentServiceRequest: (...args) => (window.createResidentServiceRequest ? window.createResidentServiceRequest(...args) : Promise.reject(new Error("API not loaded"))),
  cancelResidentServiceRequest: (...args) => (window.cancelResidentServiceRequest ? window.cancelResidentServiceRequest(...args) : Promise.reject(new Error("API not loaded"))),
  getResidentAmenities: (...args) => (window.getResidentAmenities ? window.getResidentAmenities(...args) : Promise.reject(new Error("API not loaded"))),
  getResidentAmenityDetail: (...args) => (window.getResidentAmenityDetail ? window.getResidentAmenityDetail(...args) : Promise.reject(new Error("API not loaded"))),
  getResidentAmenityAvailability: (...args) => (window.getResidentAmenityAvailability ? window.getResidentAmenityAvailability(...args) : Promise.reject(new Error("API not loaded"))),
  getResidentBookings: (...args) => (window.getResidentBookings ? window.getResidentBookings(...args) : Promise.reject(new Error("API not loaded"))),
  getResidentBookingDetail: (...args) => (window.getResidentBookingDetail ? window.getResidentBookingDetail(...args) : Promise.reject(new Error("API not loaded"))),
  createResidentBooking: (...args) => (window.createResidentBooking ? window.createResidentBooking(...args) : Promise.reject(new Error("API not loaded"))),
  cancelResidentBooking: (...args) => (window.cancelResidentBooking ? window.cancelResidentBooking(...args) : Promise.reject(new Error("API not loaded"))),
  getResidentVotingItems: (...args) => (window.getResidentVotingItems ? window.getResidentVotingItems(...args) : Promise.reject(new Error("API not loaded"))),
  getResidentVotingDetail: (...args) => (window.getResidentVotingDetail ? window.getResidentVotingDetail(...args) : Promise.reject(new Error("API not loaded"))),
  submitResidentVote: (...args) => (window.submitResidentVote ? window.submitResidentVote(...args) : Promise.reject(new Error("API not loaded"))),
  loginGatekeeper: (...args) => (window.loginGatekeeper ? window.loginGatekeeper(...args) : Promise.reject(new Error("API not loaded"))),
  getVisitors: (...args) => (window.getGatekeeperVisitors ? window.getGatekeeperVisitors(...args) : Promise.reject(new Error("API not loaded"))),
  getVisitorById: (...args) => (window.getGatekeeperVisitorById ? window.getGatekeeperVisitorById(...args) : Promise.reject(new Error("API not loaded"))),
  getVisitorSummary: (...args) => (window.getGatekeeperVisitorSummary ? window.getGatekeeperVisitorSummary(...args) : Promise.resolve({ expected: 0, checkedIn: 0, checkedOut: 0, totalToday: 0 })),
  checkInVisitor: (...args) => (window.checkInGatekeeperVisitor ? window.checkInGatekeeperVisitor(...args) : Promise.reject(new Error("API not loaded"))),
  checkOutVisitor: (...args) => (window.checkOutGatekeeperVisitor ? window.checkOutGatekeeperVisitor(...args) : Promise.reject(new Error("API not loaded"))),
  createVisitor: (...args) => (window.createGatekeeperVisitor ? window.createGatekeeperVisitor(...args) : Promise.reject(new Error("API not loaded"))),
  getDeliveries: (...args) => (window.getGatekeeperDeliveries ? window.getGatekeeperDeliveries(...args) : Promise.reject(new Error("API not loaded"))),
  getDeliveryById: (...args) => (window.getGatekeeperDeliveryById ? window.getGatekeeperDeliveryById(...args) : Promise.reject(new Error("API not loaded"))),
  getDeliverySummary: (...args) => (window.getGatekeeperDeliverySummary ? window.getGatekeeperDeliverySummary(...args) : Promise.resolve({ expected: 0, arrived: 0, entered: 0, handedOver: 0, active: 0, totalToday: 0 })),
  createDelivery: (...args) => (window.createGatekeeperDelivery ? window.createGatekeeperDelivery(...args) : Promise.reject(new Error("API not loaded"))),
  markDeliveryArrived: (...args) => (window.markGatekeeperDeliveryArrived ? window.markGatekeeperDeliveryArrived(...args) : Promise.reject(new Error("API not loaded"))),
  markDeliveryEntered: (...args) => (window.markGatekeeperDeliveryEntered ? window.markGatekeeperDeliveryEntered(...args) : Promise.reject(new Error("API not loaded"))),
  markDeliveryHandedOver: (...args) => (window.markGatekeeperDeliveryHandedOver ? window.markGatekeeperDeliveryHandedOver(...args) : Promise.reject(new Error("API not loaded"))),
  getGatekeeperNotifications: (...args) => (window.getGatekeeperNotifications ? window.getGatekeeperNotifications(...args) : Promise.reject(new Error("API not loaded"))),
  getGatekeeperNotificationById: (...args) => (window.getGatekeeperNotificationById ? window.getGatekeeperNotificationById(...args) : Promise.reject(new Error("API not loaded"))),
  getGatekeeperNotificationSummary: (...args) => (window.getGatekeeperNotificationSummary ? window.getGatekeeperNotificationSummary(...args) : Promise.resolve({ total: 0, unread: 0, read: 0 })),
  markGatekeeperNotificationRead: (...args) => (window.markGatekeeperNotificationRead ? window.markGatekeeperNotificationRead(...args) : Promise.reject(new Error("API not loaded"))),
  markGatekeeperNotificationUnread: (...args) => (window.markGatekeeperNotificationUnread ? window.markGatekeeperNotificationUnread(...args) : Promise.reject(new Error("API not loaded"))),
  getGatekeeperProfile: (...args) => (window.getGatekeeperProfile ? window.getGatekeeperProfile(...args) : Promise.reject(new Error("API not loaded"))),
  updateGatekeeperProfile: (...args) => (window.updateGatekeeperProfile ? window.updateGatekeeperProfile(...args) : Promise.reject(new Error("API not loaded")))
};

