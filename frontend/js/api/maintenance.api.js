// Feature API: maintenance.api.js

window.getMaintenanceSummary = async function(month = "2026-09") {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_MAINT_SUMMARY, { month });
}

window.getMaintenancePayments = async function(month = "2026-09", params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_MAINT_PAYMENTS, { month, ...params });
}

window.recordMaintenancePayment = async function(paymentData) {
  return apiPost(API_CONFIG.ENDPOINTS.ADMIN_MAINT_RECORD, paymentData);
}

window.getMaintenanceHistory = async function() {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_MAINT_HISTORY);
}

window.getMyMaintenance = async function() {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_MAINT_MY);
}

window.submitCashPaymentReceipt = async function(paymentData) {
  if (typeof apiPost === "function" && typeof API_CONFIG !== "undefined" && API_CONFIG.ENDPOINTS?.RESIDENT_MAINT_CASH_PAYMENT) {
    return apiPost(API_CONFIG.ENDPOINTS.RESIDENT_MAINT_CASH_PAYMENT, paymentData);
  }
  return mockMaintenanceAdapter("/v1/resident/maintenance/cash-payment", { method: "POST" }, paymentData);
};

window.approveCashPayment = async function(paymentId, notes = "") {
  if (typeof apiPut === "function" && typeof API_CONFIG !== "undefined" && API_CONFIG.ENDPOINTS?.ADMIN_MAINT_APPROVE_PAYMENT) {
    return apiPut(API_CONFIG.ENDPOINTS.ADMIN_MAINT_APPROVE_PAYMENT, { payment_id: paymentId, notes });
  }
  return mockMaintenanceAdapter("/v1/admin/maintenance/payments/approve", { method: "PUT" }, { payment_id: paymentId, notes });
};

window.rejectCashPayment = async function(paymentId, rejectionReason = "") {
  if (typeof apiPut === "function" && typeof API_CONFIG !== "undefined" && API_CONFIG.ENDPOINTS?.ADMIN_MAINT_REJECT_PAYMENT) {
    return apiPut(API_CONFIG.ENDPOINTS.ADMIN_MAINT_REJECT_PAYMENT, { payment_id: paymentId, rejection_reason: rejectionReason });
  }
  return mockMaintenanceAdapter("/v1/admin/maintenance/payments/reject", { method: "PUT" }, { payment_id: paymentId, rejection_reason: rejectionReason });
};

// =================================================================
// RESIDENT MAINTENANCE OPERATIONS
// =================================================================

window.getResidentMaintenanceHistory = async function(params = {}) {
  if (typeof apiGet === "function" && typeof API_CONFIG !== "undefined" && API_CONFIG.ENDPOINTS?.RESIDENT_MAINT_HISTORY) {
    return apiGet(API_CONFIG.ENDPOINTS.RESIDENT_MAINT_HISTORY, params);
  }
  return mockMaintenanceAdapter("/v1/resident/maintenance/history", { method: "GET" }, params);
};

window.getResidentMaintenanceSummary = async function() {
  if (typeof apiGet === "function" && typeof API_CONFIG !== "undefined" && API_CONFIG.ENDPOINTS?.RESIDENT_MAINT_SUMMARY) {
    return apiGet(API_CONFIG.ENDPOINTS.RESIDENT_MAINT_SUMMARY);
  }
  return mockMaintenanceAdapter("/v1/resident/maintenance/summary", { method: "GET" });
};

window.getResidentMaintenanceDetail = async function(paymentId) {
  if (typeof apiGet === "function" && typeof API_CONFIG !== "undefined" && API_CONFIG.ENDPOINTS?.RESIDENT_MAINT_PAYMENT_DETAIL) {
    return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.RESIDENT_MAINT_PAYMENT_DETAIL, paymentId));
  }
  return mockMaintenanceAdapter(`/v1/resident/maintenance/payments/${paymentId}`, { method: "GET" });
};



window.mockMaintenanceAdapter = async function(endpoint, options = {}, payload) {
  if (!payload && options && options.body) {
    try { payload = typeof options.body === "string" ? JSON.parse(options.body) : options.body; } catch(e) { payload = {}; }
  }
  payload = payload || {};
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_MAINT_SUMMARY)) {
    const urlObj = new URL("http://localhost" + endpoint);
    const monthKey = urlObj.searchParams.get("month") || "2026-09";
    const monthData = MOCK_MAINTENANCE_DB.months[monthKey] || MOCK_MAINTENANCE_DB.months["2026-09"];
    
    return {
      status: "success",
      mock: true,
      data: {
        month: monthData.month,
        month_name: monthData.month_name,
        due_date: monthData.due_date,
        expected: monthData.expected,
        collected: monthData.collected,
        pending: monthData.pending,
        percentage: monthData.percentage,
        status_counts: monthData.status_counts
      }
    };
  }
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_MAINT_PAYMENTS) && options.method !== "POST") {
    const urlObj = new URL("http://localhost" + endpoint);
    const monthKey = urlObj.searchParams.get("month") || "2026-09";
    const monthData = MOCK_MAINTENANCE_DB.months[monthKey] || MOCK_MAINTENANCE_DB.months["2026-09"];
    
    return {
      status: "success",
      mock: true,
      month: monthData.month,
      month_name: monthData.month_name,
      payments: monthData.payments || []
    };
  }
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_MAINT_RECORD || (endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_MAINT_PAYMENTS) && options.method === "POST")) {
    const monthKey = payload.month || "2026-09";
    const monthData = MOCK_MAINTENANCE_DB.months[monthKey] || MOCK_MAINTENANCE_DB.months["2026-09"];
    
    // Find payment record to update or add
    let target = monthData.payments.find(p => p.id === payload.payment_id || (p.flat === payload.flat && p.wing === payload.wing));
    const paymentDateFormatted = payload.payment_date ? new Date(payload.payment_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "Today";
    const refNumber = payload.ref_no || `${(payload.payment_method || 'UPI').toUpperCase()}-${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    if (target) {
      target.status = "paid_ontime";
      target.status_label = "Paid (Recorded)";
      target.payment_date = paymentDateFormatted;
      target.timing_info = `Recorded on ${paymentDateFormatted}`;
      target.payment_method = payload.payment_method || "Cash";
      target.ref_no = refNumber;
      target.notes = payload.notes || "Manual payment recorded by Administrator";
      target.amount = Number(payload.amount) || target.amount;
    } else {
      target = {
        id: "pay-" + Date.now(),
        resident_name: payload.resident_name || "Resident",
        wing: payload.wing || "A",
        flat: payload.flat || "101",
        amount: Number(payload.amount) || 3500,
        due_date: monthData.due_date,
        status: "paid_ontime",
        status_label: "Paid (Recorded)",
        payment_date: paymentDateFormatted,
        timing_info: `Recorded on ${paymentDateFormatted}`,
        payment_method: payload.payment_method || "Cash",
        ref_no: refNumber,
        notes: payload.notes || "Payment recorded"
      };
      monthData.payments.push(target);
    }

    // Recalculate summary totals
    monthData.collected += target.amount;
    monthData.pending = Math.max(0, monthData.pending - target.amount);
    monthData.percentage = Number(((monthData.collected / monthData.expected) * 100).toFixed(1));
    monthData.status_counts.pending = Math.max(0, monthData.status_counts.pending - 1);
    monthData.status_counts.paid_ontime += 1;

    return {
      status: "success",
      mock: true,
      message: "Maintenance payment recorded successfully",
      payment: target
    };
  }
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_MAINT_HISTORY) {
    return {
      status: "success",
      mock: true,
      history: [
        { month: "2026-09", month_name: "September 2026", expected: 210000, collected: 184500, pending: 25500, percentage: 87.9, status: "Ongoing" },
        { month: "2026-08", month_name: "August 2026", expected: 210000, collected: 198000, pending: 12000, percentage: 94.3, status: "Closed" },
        { month: "2026-07", month_name: "July 2026", expected: 210000, collected: 205000, pending: 5000, percentage: 97.6, status: "Closed" },
        { month: "2026-06", month_name: "June 2026", expected: 210000, collected: 192500, pending: 17500, percentage: 91.7, status: "Closed" },
        { month: "2026-05", month_name: "May 2026", expected: 205000, collected: 185000, pending: 20000, percentage: 90.2, status: "Closed" }
      ]
    };
  }
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_MAINT_MY) {
    return {
      status: "success",
      mock: true,
      admin_resident: {
        name: "Rajesh Verma",
        role: "Chairman",
        wing: "A",
        flat: "402",
        monthly_dues: 3500,
        current_status: "Paid Early",
        current_month: "September 2026",
        paid_date: "1 Sep 2026",
        payment_method: "UPI",
        ref_no: "UPI-1192840283",
        history: [
          { month: "September 2026", amount: 3500, status: "Paid Early", date: "1 Sep 2026", method: "UPI", ref: "UPI-1192840283" },
          { month: "August 2026", amount: 3500, status: "Paid Early", date: "2 Aug 2026", method: "UPI", ref: "UPI-9920194820" },
          { month: "July 2026", amount: 3500, status: "Paid Early", date: "1 Jul 2026", method: "UPI", ref: "UPI-8819203912" },
          { month: "June 2026", amount: 3500, status: "Paid On Time", date: "5 Jun 2026", method: "UPI", ref: "UPI-7719203810" },
          { month: "May 2026", amount: 3500, status: "Paid Early", date: "3 May 2026", method: "Bank Transfer", ref: "NEFT-3918204910" }
        ]
      }
    };
  }
  // 1. POST /v1/resident/maintenance/cash-payment
  if ((endpoint === (API_CONFIG?.ENDPOINTS?.RESIDENT_MAINT_CASH_PAYMENT || "/v1/resident/maintenance/cash-payment") || endpoint.includes("/resident/maintenance/cash-payment")) && options.method === "POST") {
    const monthKey = payload.month || "2026-09";
    const monthData = MOCK_MAINTENANCE_DB.months[monthKey] || MOCK_MAINTENANCE_DB.months["2026-09"];
    if (!monthData) throw new Error("Maintenance month record not found");

    const residentName = payload.resident_name || "Rajesh Kumar";
    const wing = payload.wing || "A";
    const flat = payload.flat || "204";

    // Duplicate payment protection: prevent multiple active submissions for same resident + month
    const existing = monthData.payments.find(p => (p.id === payload.payment_id || (p.flat === flat && p.wing === wing)));
    if (existing && existing.status === "pending_verification") {
      const err = new Error(`A cash payment for ${monthData.month_name || monthKey} is already pending verification. Please wait for Admin review.`);
      err.status = 409;
      throw err;
    }

    const formattedPaymentDate = payload.payment_date 
      ? new Date(payload.payment_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      : "Today";

    let target = existing;
    if (target) {
      target.status = "pending_verification";
      target.status_label = "Pending Verification";
      target.amount = Number(payload.amount) || target.amount;
      target.payment_method = "Cash";
      target.payment_date = formattedPaymentDate;
      target.timing_info = `Cash submitted • ${formattedPaymentDate}`;
      target.receipt_url = payload.receipt_url || payload.receipt_preview || null;
      target.submitted_at = new Date().toISOString();
      target.notes = payload.notes || "Paid in cash at society office";
      target.rejection_reason = null;
    } else {
      target = {
        id: "pay-" + Date.now(),
        resident_name: residentName,
        wing: wing,
        flat: flat,
        amount: Number(payload.amount) || 3500,
        due_date: monthData.due_date || "25 Sep 2026",
        status: "pending_verification",
        status_label: "Pending Verification",
        payment_date: formattedPaymentDate,
        timing_info: `Cash submitted • ${formattedPaymentDate}`,
        payment_method: "Cash",
        receipt_url: payload.receipt_url || payload.receipt_preview || null,
        submitted_at: new Date().toISOString(),
        notes: payload.notes || "Paid in cash at society office",
        rejection_reason: null
      };
      monthData.payments.unshift(target);
    }

    // Update status counts
    monthData.status_counts.pending_verification = (monthData.status_counts.pending_verification || 0) + 1;
    monthData.status_counts.pending = Math.max(0, (monthData.status_counts.pending || 1) - 1);

    // Sync to MOCK_RESIDENTS_DB
    if (window.MOCK_RESIDENTS_DB && window.MOCK_RESIDENTS_DB.recentActivity && window.MOCK_RESIDENTS_DB.recentActivity.maintenance) {
      window.MOCK_RESIDENTS_DB.recentActivity.maintenance.status = "Pending Verification";
      window.MOCK_RESIDENTS_DB.recentActivity.maintenance.amount = target.amount;
      window.MOCK_RESIDENTS_DB.recentActivity.maintenance.receiptUrl = target.receipt_url;
      window.MOCK_RESIDENTS_DB.recentActivity.maintenance.submittedAt = target.submitted_at;
      window.MOCK_RESIDENTS_DB.recentActivity.maintenance.paymentDate = target.payment_date;
      window.MOCK_RESIDENTS_DB.recentActivity.maintenance.paymentMethod = "Cash";
      window.MOCK_RESIDENTS_DB.recentActivity.maintenance.rejectionReason = null;
    }

    return {
      status: "success",
      mock: true,
      message: "Cash payment receipt submitted for verification",
      payment: target
    };
  }

  // 2. PUT /v1/admin/maintenance/payments/approve
  if ((endpoint === (API_CONFIG?.ENDPOINTS?.ADMIN_MAINT_APPROVE_PAYMENT || "/v1/admin/maintenance/payments/approve") || endpoint.includes("/admin/maintenance/payments/approve")) && options.method === "PUT") {
    const paymentId = payload.payment_id;
    let target = null;
    let targetMonthData = null;
    for (const mKey of Object.keys(MOCK_MAINTENANCE_DB.months)) {
      const m = MOCK_MAINTENANCE_DB.months[mKey];
      const p = m.payments.find(item => item.id === paymentId || String(item.id) === String(paymentId) || (payload.flat && item.flat === payload.flat && item.wing === payload.wing));
      if (p) {
        target = p;
        targetMonthData = m;
        break;
      }
    }

    if (!target) {
      throw new Error("Payment record not found");
    }

    const wasPendingVerification = target.status === "pending_verification";
    target.status = "paid_ontime";
    target.status_label = "Paid";
    target.verified_at = new Date().toISOString();
    target.verified_by = "Rajesh Verma (Admin)";
    target.ref_no = target.ref_no || `CASH-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    target.timing_info = `Verified Cash Payment`;
    if (payload.notes) target.notes = (target.notes ? target.notes + " • " : "") + payload.notes;

    if (targetMonthData) {
      targetMonthData.collected += target.amount;
      targetMonthData.pending = Math.max(0, targetMonthData.pending - target.amount);
      targetMonthData.percentage = Number(((targetMonthData.collected / targetMonthData.expected) * 100).toFixed(1));
      if (wasPendingVerification) {
        targetMonthData.status_counts.pending_verification = Math.max(0, (targetMonthData.status_counts.pending_verification || 1) - 1);
      }
      targetMonthData.status_counts.paid_ontime = (targetMonthData.status_counts.paid_ontime || 0) + 1;
    }

    if (window.MOCK_RESIDENTS_DB && window.MOCK_RESIDENTS_DB.recentActivity && window.MOCK_RESIDENTS_DB.recentActivity.maintenance) {
      window.MOCK_RESIDENTS_DB.recentActivity.maintenance.status = "Paid";
      window.MOCK_RESIDENTS_DB.recentActivity.maintenance.verifiedAt = target.verified_at;
      window.MOCK_RESIDENTS_DB.recentActivity.maintenance.verifiedBy = target.verified_by;
      window.MOCK_RESIDENTS_DB.recentActivity.maintenance.refNo = target.ref_no;
      window.MOCK_RESIDENTS_DB.recentActivity.maintenance.rejectionReason = null;
    }

    return {
      status: "success",
      mock: true,
      message: "Cash payment approved successfully",
      payment: target
    };
  }

  // 3. PUT /v1/admin/maintenance/payments/reject
  if ((endpoint === (API_CONFIG?.ENDPOINTS?.ADMIN_MAINT_REJECT_PAYMENT || "/v1/admin/maintenance/payments/reject") || endpoint.includes("/admin/maintenance/payments/reject")) && options.method === "PUT") {
    const paymentId = payload.payment_id;
    const reason = (payload.rejection_reason || "").trim();
    if (!reason) {
      throw new Error("A rejection reason is required.");
    }

    let target = null;
    let targetMonthData = null;
    for (const mKey of Object.keys(MOCK_MAINTENANCE_DB.months)) {
      const m = MOCK_MAINTENANCE_DB.months[mKey];
      const p = m.payments.find(item => item.id === paymentId || String(item.id) === String(paymentId) || (payload.flat && item.flat === payload.flat && item.wing === payload.wing));
      if (p) {
        target = p;
        targetMonthData = m;
        break;
      }
    }

    if (!target) {
      throw new Error("Payment record not found");
    }

    const wasPendingVerification = target.status === "pending_verification";
    target.status = "rejected";
    target.status_label = "Rejected";
    target.rejection_reason = reason;
    target.timing_info = `Rejected: ${reason}`;

    if (targetMonthData && wasPendingVerification) {
      targetMonthData.status_counts.pending_verification = Math.max(0, (targetMonthData.status_counts.pending_verification || 1) - 1);
      targetMonthData.status_counts.pending = (targetMonthData.status_counts.pending || 0) + 1;
    }

    if (window.MOCK_RESIDENTS_DB && window.MOCK_RESIDENTS_DB.recentActivity && window.MOCK_RESIDENTS_DB.recentActivity.maintenance) {
      window.MOCK_RESIDENTS_DB.recentActivity.maintenance.status = "Rejected";
      window.MOCK_RESIDENTS_DB.recentActivity.maintenance.rejectionReason = reason;
    }

    return {
      status: "success",
      mock: true,
      message: "Payment rejected",
      payment: target
    };
  }

  // 4. GET /v1/resident/maintenance/history
  if ((endpoint.startsWith("/v1/resident/maintenance/history") || (API_CONFIG?.ENDPOINTS?.RESIDENT_MAINT_HISTORY && endpoint.startsWith(API_CONFIG.ENDPOINTS.RESIDENT_MAINT_HISTORY))) && options.method !== "POST" && options.method !== "PUT") {
    const sessionUser = typeof GrihamAuth !== "undefined" ? GrihamAuth.getUser() : null;
    if (!sessionUser) {
      const err = new Error("Authentication required to view maintenance history.");
      err.status = 401;
      throw err;
    }

    const urlObj = new URL("http://localhost" + endpoint);
    const filterStatus = (urlObj.searchParams.get("status") || (payload && payload.status) || "all").toLowerCase();
    const searchQuery = (urlObj.searchParams.get("search") || (payload && payload.search) || "").trim().toLowerCase();
    const sortOrder = (urlObj.searchParams.get("sort") || (payload && payload.sort) || "newest").toLowerCase();

    const dbMonths = (typeof MOCK_MAINTENANCE_DB !== "undefined" && MOCK_MAINTENANCE_DB.months) ? MOCK_MAINTENANCE_DB.months : {};
    const monthKeys = Object.keys(dbMonths);

    // Sort month keys
    if (sortOrder === "oldest") {
      monthKeys.sort();
    } else {
      monthKeys.sort().reverse();
    }

    const records = [];

    for (const mKey of monthKeys) {
      const m = dbMonths[mKey];
      if (!m || !Array.isArray(m.payments)) continue;

      // Find record belonging strictly to the authenticated resident
      const p = m.payments.find(item => 
        (item.resident_id && item.resident_id === sessionUser.id) ||
        (sessionUser.wing && item.wing === sessionUser.wing && String(item.flat) === String(sessionUser.flatNumber || sessionUser.flat))
      );

      if (p) {
        const record = {
          ...p,
          month_key: mKey,
          month_name: m.month_name,
          month_due_date: m.due_date
        };

        // Normalize status
        let normStatus = (record.status || "pending").toLowerCase();
        if (normStatus.startsWith("paid")) normStatus = "paid";

        // Filter by status
        if (filterStatus !== "all") {
          if (filterStatus === "paid" && normStatus !== "paid") continue;
          if (filterStatus === "pending" && (normStatus !== "pending" && normStatus !== "due")) continue;
          if (filterStatus === "pending_verification" && normStatus !== "pending_verification") continue;
          if (filterStatus === "rejected" && normStatus !== "rejected") continue;
        }

        // Search query filter
        if (searchQuery) {
          const matchMonth = (record.month_name || "").toLowerCase().includes(searchQuery);
          const matchRef = (record.ref_no || "").toLowerCase().includes(searchQuery);
          const matchMethod = (record.payment_method || "").toLowerCase().includes(searchQuery);
          const matchNotes = (record.notes || "").toLowerCase().includes(searchQuery);
          if (!matchMonth && !matchRef && !matchMethod && !matchNotes) continue;
        }

        records.push(record);
      }
    }

    return {
      status: "success",
      mock: true,
      count: records.length,
      data: records
    };
  }

  // 5. GET /v1/resident/maintenance/summary
  if ((endpoint.startsWith("/v1/resident/maintenance/summary") || (API_CONFIG?.ENDPOINTS?.RESIDENT_MAINT_SUMMARY && endpoint.startsWith(API_CONFIG.ENDPOINTS.RESIDENT_MAINT_SUMMARY))) && options.method !== "POST" && options.method !== "PUT") {
    const sessionUser = typeof GrihamAuth !== "undefined" ? GrihamAuth.getUser() : null;
    if (!sessionUser) {
      const err = new Error("Authentication required to view maintenance summary.");
      err.status = 401;
      throw err;
    }

    const dbMonths = (typeof MOCK_MAINTENANCE_DB !== "undefined" && MOCK_MAINTENANCE_DB.months) ? MOCK_MAINTENANCE_DB.months : {};
    const monthKeys = Object.keys(dbMonths).sort().reverse();

    let currentDues = 0;
    let totalPaid = 0;
    let pendingVerificationAmount = 0;
    let pendingVerificationCount = 0;
    let paidCount = 0;
    let totalCount = 0;
    let currentMonthRecord = null;

    for (const mKey of monthKeys) {
      const m = dbMonths[mKey];
      if (!m || !Array.isArray(m.payments)) continue;

      const p = m.payments.find(item => 
        (item.resident_id && item.resident_id === sessionUser.id) ||
        (sessionUser.wing && item.wing === sessionUser.wing && String(item.flat) === String(sessionUser.flatNumber || sessionUser.flat))
      );

      if (p) {
        totalCount++;
        const s = (p.status || "").toLowerCase();
        const amt = Number(p.amount) || 3500;

        if (s.startsWith("paid")) {
          totalPaid += amt;
          paidCount++;
        } else if (s === "pending_verification") {
          pendingVerificationAmount += amt;
          pendingVerificationCount++;
        } else if (s === "pending" || s === "rejected" || s === "due") {
          currentDues += amt;
        }

        if (!currentMonthRecord) {
          currentMonthRecord = {
            ...p,
            month_key: mKey,
            month_name: m.month_name,
            month_due_date: m.due_date
          };
        }
      }
    }

    return {
      status: "success",
      mock: true,
      data: {
        current_dues: currentDues,
        total_paid: totalPaid,
        pending_verification_amount: pendingVerificationAmount,
        pending_verification_count: pendingVerificationCount,
        paid_count: paidCount,
        total_payments_count: totalCount,
        current_month: currentMonthRecord ? currentMonthRecord.month_name : "September 2026",
        current_month_status: currentMonthRecord ? (currentMonthRecord.status_label || currentMonthRecord.status) : "Pending",
        current_month_due_date: currentMonthRecord ? currentMonthRecord.due_date : "25 Sep 2026",
        monthly_dues_rate: 3500,
        flat: sessionUser.flatNumber || sessionUser.flat || "204",
        wing: sessionUser.wing || "A",
        resident_name: sessionUser.name || "Rajesh Kumar"
      }
    };
  }

  // 6. GET /v1/resident/maintenance/payments/:id
  if (endpoint.startsWith("/v1/resident/maintenance/payments/") && options.method !== "POST" && options.method !== "PUT") {
    const sessionUser = typeof GrihamAuth !== "undefined" ? GrihamAuth.getUser() : null;
    if (!sessionUser) {
      const err = new Error("Authentication required.");
      err.status = 401;
      throw err;
    }

    const parts = endpoint.split("/");
    const paymentId = parts[parts.length - 1].split("?")[0];

    const dbMonths = (typeof MOCK_MAINTENANCE_DB !== "undefined" && MOCK_MAINTENANCE_DB.months) ? MOCK_MAINTENANCE_DB.months : {};
    let foundPayment = null;
    let foundMonth = null;

    for (const mKey of Object.keys(dbMonths)) {
      const m = dbMonths[mKey];
      if (!m || !Array.isArray(m.payments)) continue;
      const p = m.payments.find(item => item.id === paymentId || String(item.id) === String(paymentId));
      if (p) {
        foundPayment = p;
        foundMonth = m;
        break;
      }
    }

    if (!foundPayment) {
      const err = new Error("Payment record not found.");
      err.status = 404;
      throw err;
    }

    // Security check: ensure payment belongs to authenticated resident
    const isOwner = (foundPayment.resident_id && foundPayment.resident_id === sessionUser.id) ||
      (sessionUser.wing && foundPayment.wing === sessionUser.wing && String(foundPayment.flat) === String(sessionUser.flatNumber || sessionUser.flat));

    if (!isOwner && sessionUser.role !== "admin") {
      const err = new Error("Forbidden: You are not authorized to view this payment record.");
      err.status = 403;
      throw err;
    }

    return {
      status: "success",
      mock: true,
      data: {
        ...foundPayment,
        month_name: foundMonth ? foundMonth.month_name : "September 2026",
        month_due_date: foundMonth ? foundMonth.due_date : "25 Sep 2026"
      }
    };
  }

  return undefined;
};
