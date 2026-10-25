// Feature API: gatekeeper.api.js

window.getContactsByCategory = async function(category, options = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_CONTACTS, { category, ...options });
};

window.getStaffVendors = async function(params = {}) {
  return window.getContactsByCategory(params.category || 'All');
};

/**
 * Gatekeeper Visitor Management API Operations
 */
window.getGatekeeperVisitors = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.GATEKEEPER_VISITORS, params);
};

window.getGatekeeperVisitorById = async function(visitorId) {
  return apiGet(API_CONFIG.ENDPOINTS.GATEKEEPER_VISITOR_DETAIL, { id: visitorId });
};

window.getGatekeeperVisitorSummary = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.GATEKEEPER_VISITOR_SUMMARY, params);
};

window.checkInGatekeeperVisitor = async function(visitorId, notes = "") {
  return apiPost(API_CONFIG.ENDPOINTS.GATEKEEPER_VISITOR_CHECKIN, { id: visitorId, notes });
};

window.checkOutGatekeeperVisitor = async function(visitorId, notes = "") {
  return apiPost(API_CONFIG.ENDPOINTS.GATEKEEPER_VISITOR_CHECKOUT, { id: visitorId, notes });
};

window.createGatekeeperVisitor = async function(visitorData = {}) {
  return apiPost(API_CONFIG.ENDPOINTS.GATEKEEPER_VISITORS, visitorData);
};

/**
 * Gatekeeper Delivery Management API Operations
 */
window.getGatekeeperDeliveries = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERIES, params);
};

window.getGatekeeperDeliveryById = async function(deliveryId) {
  return apiGet(API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERY_DETAIL, { id: deliveryId });
};

window.getGatekeeperDeliverySummary = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERY_SUMMARY, params);
};

window.createGatekeeperDelivery = async function(deliveryData = {}) {
  return apiPost(API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERIES, deliveryData);
};

window.markGatekeeperDeliveryArrived = async function(deliveryId, notes = "") {
  return apiPost(API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERY_ARRIVE, { id: deliveryId, notes });
};

window.markGatekeeperDeliveryEntered = async function(deliveryId, notes = "") {
  return apiPost(API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERY_ENTER, { id: deliveryId, notes });
};

window.markGatekeeperDeliveryHandedOver = async function(deliveryId, notes = "") {
  return apiPost(API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERY_HANDOVER, { id: deliveryId, notes });
};

/**
 * Gatekeeper Notification Management API Operations
 */
window.getGatekeeperNotifications = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.GATEKEEPER_NOTIFICATIONS, params);
};

window.getGatekeeperNotificationById = async function(notificationId) {
  return apiGet(API_CONFIG.ENDPOINTS.GATEKEEPER_NOTIFICATION_DETAIL, { id: notificationId });
};

window.getGatekeeperNotificationSummary = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.GATEKEEPER_NOTIFICATION_SUMMARY, params);
};

window.markGatekeeperNotificationRead = async function(notificationId) {
  return apiPost(API_CONFIG.ENDPOINTS.GATEKEEPER_NOTIFICATION_READ, { id: notificationId });
};

window.markGatekeeperNotificationUnread = async function(notificationId) {
  return apiPost(API_CONFIG.ENDPOINTS.GATEKEEPER_NOTIFICATION_UNREAD, { id: notificationId });
};

/**
 * Gatekeeper Profile Management API Operations
 */
window.getGatekeeperProfile = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.GATEKEEPER_PROFILE, params);
};

window.updateGatekeeperProfile = async function(profileData = {}) {
  return apiPut(API_CONFIG.ENDPOINTS.GATEKEEPER_PROFILE, profileData);
};
