// Feature API: amenities.api.js
// Dedicated API operations for Amenities and Bookings

window.getAmenities = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_AMENITIES, params);
};

window.getAmenityDetail = async function(amenityId) {
  return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_AMENITIES, amenityId));
};

window.createAmenity = async function(data) {
  return apiPost(API_CONFIG.ENDPOINTS.ADMIN_AMENITIES, data);
};

window.updateAmenity = async function(amenityId, data) {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_AMENITIES, amenityId), data);
};

window.setAmenityStatus = async function(amenityId, statusPayload) {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_AMENITIES, amenityId, "status"), statusPayload);
};

window.getAmenityBookings = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_AMENITY_BOOKINGS, params);
};

window.createAmenityBooking = async function(data) {
  return apiPost(API_CONFIG.ENDPOINTS.ADMIN_AMENITY_BOOKINGS, data);
};

window.approveAmenityBooking = async function(bookingId) {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_AMENITY_BOOKINGS, bookingId, "approve"), {});
};

window.rejectAmenityBooking = async function(bookingId, reason = "") {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_AMENITY_BOOKINGS, bookingId, "reject"), { reason });
};

window.cancelAmenityBooking = async function(bookingId, reason = "") {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_AMENITY_BOOKINGS, bookingId, "cancel"), { reason });
};

// =================================================================
// RESIDENT AMENITY OPERATIONS
// =================================================================

window.getResidentAmenities = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.RESIDENT_AMENITIES, params);
};

window.getResidentAmenityDetail = async function(amenityId) {
  return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.RESIDENT_AMENITIES, amenityId));
};

window.getResidentAmenityAvailability = async function(amenityId, date) {
  return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.RESIDENT_AMENITIES, amenityId, "availability"), { date });
};

window.getResidentBookings = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.RESIDENT_AMENITY_BOOKINGS, params);
};

window.getResidentBookingDetail = async function(bookingId) {
  return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.RESIDENT_AMENITY_BOOKINGS, bookingId));
};

window.createResidentBooking = async function(data) {
  return apiPost(API_CONFIG.ENDPOINTS.RESIDENT_AMENITY_BOOKINGS, data);
};

window.cancelResidentBooking = async function(bookingId, reason = "") {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.RESIDENT_AMENITY_BOOKINGS, bookingId, "cancel"), { booking_id: bookingId, reason });
};

