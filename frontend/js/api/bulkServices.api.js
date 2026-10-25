// Feature API: bulkServices.api.js
// Dedicated API operations for Bulk Services Campaigns & Negotiations

window.getBulkServices = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_BULK_SERVICES, params);
};

window.getBulkServiceDetail = async function(bulkServiceId) {
  return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_BULK_SERVICES, bulkServiceId));
};

window.createBulkService = async function(data) {
  return apiPost(API_CONFIG.ENDPOINTS.ADMIN_BULK_SERVICES, data);
};

window.updateBulkService = async function(bulkServiceId, data) {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_BULK_SERVICES, bulkServiceId), data);
};

window.addBulkServiceApplicants = async function(bulkServiceId, applicants) {
  return apiPost(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_BULK_SERVICES, bulkServiceId, "applicants"), { applicants });
};

window.removeBulkServiceApplicant = async function(bulkServiceId, residentId) {
  return apiDelete(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_BULK_SERVICES, bulkServiceId, "applicants", residentId));
};

window.updateBulkServiceNegotiation = async function(bulkServiceId, negotiationData) {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_BULK_SERVICES, bulkServiceId, "negotiation"), negotiationData);
};

window.updateBulkServiceStatus = async function(bulkServiceId, status, notes = "") {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_BULK_SERVICES, bulkServiceId, "status"), { status, notes });
};

window.cancelBulkService = async function(bulkServiceId, reason = "") {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_BULK_SERVICES, bulkServiceId, "cancel"), { reason });
};

// =================================================================
// MOCK API ADAPTER FOR BULK SERVICES
// =================================================================

window.mockBulkServicesAdapter = async function(endpoint, options, payload) {
  const db = (typeof MOCK_BULK_SERVICES_DB !== "undefined" ? MOCK_BULK_SERVICES_DB : window.MOCK_BULK_SERVICES_DB);
  if (!db) return undefined;

  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_BULK_SERVICES)) {
    const rawPath = endpoint.split("?")[0];
    const parts = rawPath.replace(API_CONFIG.ENDPOINTS.ADMIN_BULK_SERVICES, "").split("/").filter(Boolean);
    const campaignId = parts[0] || "";
    const action = parts[1] || "";
    const extraId = parts[2] || "";

    // GET /v1/admin/bulk-services
    if (!campaignId && (options.method === "GET" || !options.method)) {
      const list = [...db.campaigns];
      const total = list.length;
      const open = list.filter(c => c.status === "Open").length;
      const targetReached = list.filter(c => c.status === "Target Reached").length;
      const negotiated = list.filter(c => c.status === "Negotiated" || c.status === "Confirmed").length;
      const completed = list.filter(c => c.status === "Completed").length;
      const inProgress = list.filter(c => c.status === "In Progress").length;

      return {
        status: "success",
        mock: true,
        summary: {
          total,
          open,
          target_reached: targetReached,
          negotiated,
          in_progress: inProgress,
          completed
        },
        campaigns: list,
        bulk_services: list
      };
    }

    // POST /v1/admin/bulk-services (Create campaign)
    if (!campaignId && options.method === "POST") {
      const idStr = `BS-2026-00${String(db.nextId++).padStart(2, "0")}`;
      const reqCount = parseInt(payload.requiredApplicants || payload.required_applicants || 10, 10);
      const appList = payload.applicants || [];
      const newCampaign = {
        id: idStr,
        serviceName: (payload.serviceName || payload.service_name || "New Bulk Service").trim(),
        category: payload.category || "Maintenance",
        description: (payload.description || "").trim(),
        requiredApplicants: reqCount,
        applicants: appList,
        serviceDate: payload.serviceDate || payload.service_date || "",
        applicationDeadline: payload.applicationDeadline || payload.application_deadline || "",
        priority: payload.priority || "Normal",
        status: appList.length >= reqCount ? "Target Reached" : (payload.status || "Open"),
        vendorId: null,
        vendorName: null,
        vendorPhone: null,
        vendorType: null,
        normalPrice: payload.normalPrice ? parseFloat(payload.normalPrice) : null,
        quotedPrice: null,
        negotiatedPrice: null,
        pricePerApplicant: null,
        negotiationNotes: payload.negotiationNotes || payload.adminNotes || "",
        createdAt: new Date().toISOString()
      };

      db.campaigns.unshift(newCampaign);
      return {
        status: "success",
        mock: true,
        campaign: newCampaign,
        message: `Bulk service ${idStr} created successfully.`
      };
    }

    // Lookup campaign
    const campaign = db.campaigns.find(c => c.id === campaignId);
    if (!campaign) {
      const err = new Error(`Bulk service ${campaignId} not found`);
      err.status = 404;
      throw err;
    }

    // GET /v1/admin/bulk-services/{id}
    if (campaignId && !action && (options.method === "GET" || !options.method)) {
      return { status: "success", mock: true, campaign };
    }

    // PUT /v1/admin/bulk-services/{id} (Update details)
    if (campaignId && !action && options.method === "PUT") {
      Object.assign(campaign, payload);
      return { status: "success", mock: true, campaign };
    }

    // POST /v1/admin/bulk-services/{id}/applicants (Add applicants)
    if (action === "applicants" && options.method === "POST") {
      const incoming = payload.applicants || [];
      const existingIds = new Set(campaign.applicants.map(a => a.id));
      let added = 0;
      for (const a of incoming) {
        if (!existingIds.has(a.id) && campaign.applicants.length < campaign.requiredApplicants) {
          campaign.applicants.push({
            id: a.id,
            name: a.name,
            wing: a.wing,
            flatNumber: a.flatNumber || a.flat || "101",
            phone: a.phone || "",
            status: a.status || "Interested"
          });
          existingIds.add(a.id);
          added++;
        }
      }
      if (campaign.applicants.length >= campaign.requiredApplicants && campaign.status === "Open") {
        campaign.status = "Target Reached";
      }
      return {
        status: "success",
        mock: true,
        campaign,
        message: `Added ${added} applicants.`
      };
    }

    // DELETE /v1/admin/bulk-services/{id}/applicants/{residentId}
    if (action === "applicants" && options.method === "DELETE") {
      const residentId = extraId;
      campaign.applicants = campaign.applicants.filter(a => a.id !== residentId);
      if (campaign.applicants.length < campaign.requiredApplicants && campaign.status === "Target Reached") {
        campaign.status = "Open";
      }
      return {
        status: "success",
        mock: true,
        campaign,
        message: "Applicant removed."
      };
    }

    // PUT /v1/admin/bulk-services/{id}/negotiation
    if (action === "negotiation" && options.method === "PUT") {
      if (payload.vendorId) campaign.vendorId = payload.vendorId;
      if (payload.vendorName) campaign.vendorName = payload.vendorName;
      if (payload.vendorPhone) campaign.vendorPhone = payload.vendorPhone;
      if (payload.vendorType) campaign.vendorType = payload.vendorType;

      if (payload.normalPrice !== undefined) campaign.normalPrice = payload.normalPrice !== null ? parseFloat(payload.normalPrice) : null;
      if (payload.quotedPrice !== undefined) campaign.quotedPrice = payload.quotedPrice !== null ? parseFloat(payload.quotedPrice) : null;
      if (payload.negotiatedPrice !== undefined) campaign.negotiatedPrice = payload.negotiatedPrice !== null ? parseFloat(payload.negotiatedPrice) : null;

      const appCount = campaign.applicants.length || campaign.requiredApplicants || 1;
      if (campaign.negotiatedPrice) {
        campaign.pricePerApplicant = Math.round(campaign.negotiatedPrice / appCount);
      }
      if (payload.negotiationNotes !== undefined) campaign.negotiationNotes = payload.negotiationNotes;
      if (payload.expectedServiceDate) campaign.serviceDate = payload.expectedServiceDate;

      if (campaign.status === "Open" || campaign.status === "Target Reached" || campaign.status === "Vendor Contacted") {
        campaign.status = "Negotiated";
      }

      return {
        status: "success",
        mock: true,
        campaign,
        message: "Negotiation details saved successfully."
      };
    }

    // PUT /v1/admin/bulk-services/{id}/status
    if (action === "status" && options.method === "PUT") {
      campaign.status = payload.status || campaign.status;
      if (payload.notes) {
        campaign.negotiationNotes = (campaign.negotiationNotes ? campaign.negotiationNotes + "\n" : "") + payload.notes;
      }
      return {
        status: "success",
        mock: true,
        campaign,
        message: `Status updated to ${campaign.status}.`
      };
    }

    // PUT /v1/admin/bulk-services/{id}/cancel
    if (action === "cancel" && options.method === "PUT") {
      campaign.status = "Cancelled";
      campaign.cancelReason = payload.reason || "Cancelled by Admin";
      return {
        status: "success",
        mock: true,
        campaign,
        message: "Bulk service cancelled."
      };
    }
  }
  return undefined;
};
