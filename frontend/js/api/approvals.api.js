/**
 * Griham Feature API - Resident Registration Approvals
 * File: js/api/approvals.api.js
 *
 * Dedicated domain API module for reviewing, approving, and rejecting
 * pending resident registrations.
 */

window.getApprovals = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_APPROVALS, params);
};

window.getPendingApprovals = async function(params = {}) {
  const res = await apiGet(API_CONFIG.ENDPOINTS.ADMIN_APPROVALS, params);
  const approvals = (res.approvals || []).filter(a => a.status === "pending" || a.status === "Pending");
  return { status: "success", approvals };
};

window.getApprovalById = async function(id) {
  const res = await apiGet(API_CONFIG.ENDPOINTS.ADMIN_APPROVALS);
  const approval = (res.approvals || []).find(a => a.id === id);
  if (!approval) {
    const err = new Error("Registration not found");
    err.status = 404;
    throw err;
  }
  return { status: "success", approval };
};

window.updateApprovalDecision = async function(approvalId, decision, rejectionReason = "") {
  return apiPut(API_CONFIG.ENDPOINTS.ADMIN_APPROVALS_DECISION, {
    id: approvalId,
    decision,
    rejection_reason: rejectionReason
  });
};

window.approveRegistration = async function(id) {
  return window.updateApprovalDecision(id, "approved");
};

window.rejectRegistration = async function(id, reason = "") {
  return window.updateApprovalDecision(id, "rejected", reason);
};

window.getApprovalHistory = async function(params = {}) {
  const res = await apiGet(API_CONFIG.ENDPOINTS.ADMIN_APPROVALS, params);
  const history = (res.approvals || []).filter(a => a.status !== "pending" && a.status !== "Pending");
  return { status: "success", history, approvals: res.approvals || [] };
};
