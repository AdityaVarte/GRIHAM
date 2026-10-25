// Feature API: serviceRequests.api.js
// Dedicated API operations for Service Requests

window.getServiceRequests = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS, params);
};

window.getServiceRequestDetail = async function(requestId) {
  return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS, requestId));
};

window.createServiceRequest = async function(data) {
  return apiPost(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS, data);
};

window.updateServiceRequest = async function(requestId, data) {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS, requestId), data);
};

window.updateServiceRequestStatus = async function(requestId, status, note = "") {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS, requestId, "status"), { status, note });
};

window.updateServiceRequestAssignment = async function(requestId, assignmentData) {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS, requestId, "assignment"), assignmentData);
};

window.updateServiceRequestSchedule = async function(requestId, scheduleData) {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS, requestId, "schedule"), scheduleData);
};

window.bulkUpdateServiceRequestStatus = async function(requestIds, status, note = "") {
  return apiPost(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS_BULK, "status"), { request_ids: requestIds, status, note });
};

window.bulkUpdateServiceRequestAssignment = async function(payload) {
  return apiPost(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS_BULK, "assignment"), payload);
};

window.bulkUpdateServiceRequestSchedule = async function(requestIds, scheduleData) {
  return apiPost(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS_BULK, "schedule"), { request_ids: requestIds, ...scheduleData });
};

window.bulkCancelServiceRequests = async function(requestIds, reason = "") {
  return apiPost(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS_BULK, "cancel"), { request_ids: requestIds, reason });
};

window.getServiceRequestHistory = async function(requestId) {
  return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS, requestId, "history"));
};

// =================================================================
// RESIDENT SERVICE REQUEST OPERATIONS
// =================================================================

window.getResidentServiceRequests = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.RESIDENT_SERVICE_REQUESTS, params);
};

window.getResidentServiceRequestDetail = async function(requestId) {
  return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.RESIDENT_SERVICE_REQUESTS, requestId));
};

window.createResidentServiceRequest = async function(data) {
  return apiPost(API_CONFIG.ENDPOINTS.RESIDENT_SERVICE_REQUESTS, data);
};

window.cancelResidentServiceRequest = async function(requestId, reason = "") {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.RESIDENT_SERVICE_REQUESTS, requestId, "cancel"), { request_id: requestId, reason });
};

