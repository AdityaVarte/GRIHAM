// Feature API: complaints.api.js

window.getAdminComplaints = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_COMPLAINTS, params);
}

window.getAdminComplaintDetail = async function(complaintId) {
  return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_COMPLAINTS, complaintId));
}

window.updateAdminComplaintStatus = async function(complaintId, status, reason = "") {
  return apiPut(API_CONFIG.ENDPOINTS.ADMIN_COMPLAINT_STATUS, { complaint_id: complaintId, status, reason });
}

window.updateAdminComplaintAssignment = async function(complaintId, assignee) {
  return apiPut(API_CONFIG.ENDPOINTS.ADMIN_COMPLAINT_ASSIGNMENT, { complaint_id: complaintId, assignee });
}

window.getResidentComplaints = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.RESIDENT_COMPLAINTS, params);
}

window.getResidentComplaintDetail = async function(complaintId) {
  return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.RESIDENT_COMPLAINTS, complaintId));
}

window.createResidentComplaint = async function(data) {
  return apiPost(API_CONFIG.ENDPOINTS.RESIDENT_COMPLAINTS, data);
}

window.cancelResidentComplaint = async function(complaintId, reason = "") {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.RESIDENT_COMPLAINTS, complaintId, "cancel"), { complaint_id: complaintId, reason });
}

window.mockComplaintsAdapter = async function(endpoint, options, payload) {
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_COMPLAINTS) && options.method === "GET") {
    const parts = endpoint.split("/");
    const specificId = parts[parts.length - 1];

    if (specificId && specificId.startsWith("CMP-")) {
      const item = MOCK_COMPLAINTS_DB.complaints.find(c => c.id === specificId);
      if (!item) {
        const error = new Error("Complaint not found");
        error.status = 404;
        throw error;
      }
      return {
        status: "success",
        mock: true,
        complaint: item
      };
    }

    return {
      status: "success",
      mock: true,
      summary: MOCK_COMPLAINTS_DB.summary,
      complaints: MOCK_COMPLAINTS_DB.complaints
    };
  }
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_COMPLAINT_STATUS && options.method === "PUT") {
    const complaint = MOCK_COMPLAINTS_DB.complaints.find(c => c.id === payload.complaint_id);
    if (!complaint) {
      const error = new Error("Complaint not found");
      error.status = 404;
      throw error;
    }

    const prevStatus = complaint.status;
    complaint.status = payload.status;
    
    // Add timeline entry
    const nowStr = "Just now";
    let timelineTitle = `Status updated to ${payload.status.toUpperCase()}`;
    let timelineNote = "";

    if (payload.status === "solved") {
      timelineTitle = "Complaint Resolved & Solved";
      timelineNote = payload.reason || "Marked as solved by Administrator";
    } else if (payload.status === "cancelled") {
      timelineTitle = "Complaint Cancelled";
      timelineNote = `Reason: ${payload.reason || "Cancelled by admin"}`;
    } else if (payload.status === "pending") {
      timelineTitle = "Complaint marked Pending";
      timelineNote = payload.reason || "Re-queued for review";
    }

    complaint.timeline.push({
      time: nowStr,
      title: timelineTitle,
      note: timelineNote
    });

    // Update summary counts
    if (prevStatus !== payload.status) {
      if (MOCK_COMPLAINTS_DB.summary[prevStatus] !== undefined) {
        MOCK_COMPLAINTS_DB.summary[prevStatus] = Math.max(0, MOCK_COMPLAINTS_DB.summary[prevStatus] - 1);
      }
      if (MOCK_COMPLAINTS_DB.summary[payload.status] !== undefined) {
        MOCK_COMPLAINTS_DB.summary[payload.status] += 1;
      }
      // Re-tally open = pending only
      MOCK_COMPLAINTS_DB.summary.open = MOCK_COMPLAINTS_DB.summary.pending || 0;
    }

    return {
      status: "success",
      mock: true,
      message: "Complaint status updated successfully",
      complaint
    };
  }
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_COMPLAINT_ASSIGNMENT && options.method === "PUT") {
    const complaint = MOCK_COMPLAINTS_DB.complaints.find(c => c.id === payload.complaint_id);
    if (!complaint) {
      const error = new Error("Complaint not found");
      error.status = 404;
      throw error;
    }

    complaint.assigned_to = payload.assignee;
    complaint.timeline.push({
      time: "Just now",
      title: `Assigned to ${payload.assignee.name}`,
      note: `Service: ${payload.assignee.role}`
    });

    return {
      status: "success",
      mock: true,
      message: "Complaint assignee updated successfully",
      complaint
    };
  }

  // Resident Complaints GET (list or specific item)
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.RESIDENT_COMPLAINTS) && options.method === "GET") {
    const parts = endpoint.split("/");
    const specificId = parts[parts.length - 1];

    if (specificId && specificId.startsWith("CMP-")) {
      const item = MOCK_COMPLAINTS_DB.complaints.find(c => c.id === specificId);
      if (!item) {
        const error = new Error("Complaint not found");
        error.status = 404;
        throw error;
      }
      return {
        status: "success",
        mock: true,
        complaint: item
      };
    }

    const sessionUser = (typeof GrihamAuth !== "undefined" && GrihamAuth.getUser()) || {};
    const residentName = sessionUser.name || "Rajesh Kumar";
    const residentWing = sessionUser.wing || "A";
    const residentFlat = String(sessionUser.flat || sessionUser.flatNumber || "204");

    const residentList = MOCK_COMPLAINTS_DB.complaints.filter(c => {
      const matchName = c.resident_name && c.resident_name.toLowerCase() === residentName.toLowerCase();
      const matchUnit = c.wing === residentWing && String(c.flat) === residentFlat;
      return matchName || matchUnit;
    });

    return {
      status: "success",
      mock: true,
      complaints: residentList,
      total: residentList.length
    };
  }

  // Resident Complaints POST (Raise Complaint)
  if (endpoint === API_CONFIG.ENDPOINTS.RESIDENT_COMPLAINTS && options.method === "POST") {
    const sessionUser = (typeof GrihamAuth !== "undefined" && GrihamAuth.getUser()) || {};
    const residentName = sessionUser.name || "Rajesh Kumar";
    const wing = sessionUser.wing || "A";
    const flat = String(sessionUser.flat || sessionUser.flatNumber || "204");

    const newSeq = MOCK_COMPLAINTS_DB.complaints.length + 45;
    const complaintId = `CMP-2026-00${newSeq}`;

    const newComplaint = {
      id: complaintId,
      title: payload.title || "Untitled Complaint",
      description: payload.description || "",
      category: payload.category || "General",
      priority: payload.is_urgent ? "Urgent" : "Normal",
      resident_name: residentName,
      wing: wing,
      flat: flat,
      created_at: "Just now",
      status: "pending",
      is_new: true,
      attachments: {
        images: payload.photo_url ? [{ name: payload.photo_name || "complaint_photo.jpg", size: payload.photo_size || "1.2 MB", url: payload.photo_url }] : [],
        audio: null,
        video: null
      },
      assigned_to: null,
      timeline: [
        { time: "Just now", title: "Complaint submitted by resident", note: "Reported via Resident App" },
        { time: "Just now", title: "Complaint marked Pending", note: "Awaiting administrator review & assignment" }
      ]
    };

    MOCK_COMPLAINTS_DB.complaints.unshift(newComplaint);

    if (MOCK_COMPLAINTS_DB.summary) {
      MOCK_COMPLAINTS_DB.summary.total = (MOCK_COMPLAINTS_DB.summary.total || 0) + 1;
      MOCK_COMPLAINTS_DB.summary.pending = (MOCK_COMPLAINTS_DB.summary.pending || 0) + 1;
      MOCK_COMPLAINTS_DB.summary.open = (MOCK_COMPLAINTS_DB.summary.open || 0) + 1;
    }

    return {
      status: "success",
      mock: true,
      message: "Complaint submitted successfully",
      complaint: newComplaint
    };
  }

  // Resident Complaints PUT (Cancel Complaint)
  if ((endpoint === API_CONFIG.ENDPOINTS.RESIDENT_COMPLAINT_CANCEL || (endpoint.includes("/v1/resident/complaints/") && endpoint.endsWith("/cancel"))) && options.method === "PUT") {
    let complaintId = payload.complaint_id;
    if (!complaintId) {
      const parts = endpoint.split("/");
      const cancelIdx = parts.indexOf("cancel");
      if (cancelIdx > 0) complaintId = parts[cancelIdx - 1];
    }

    const complaint = MOCK_COMPLAINTS_DB.complaints.find(c => c.id === complaintId);
    if (!complaint) {
      const error = new Error("Complaint not found");
      error.status = 404;
      throw error;
    }

    const prevStatus = complaint.status;
    complaint.status = "cancelled";

    complaint.timeline.push({
      time: "Just now",
      title: "Complaint Cancelled by resident",
      note: payload.reason ? `Reason: ${payload.reason}` : "Cancelled via Resident App"
    });

    if (MOCK_COMPLAINTS_DB.summary && prevStatus !== "cancelled") {
      if (MOCK_COMPLAINTS_DB.summary[prevStatus] !== undefined) {
        MOCK_COMPLAINTS_DB.summary[prevStatus] = Math.max(0, MOCK_COMPLAINTS_DB.summary[prevStatus] - 1);
      }
      MOCK_COMPLAINTS_DB.summary.cancelled = (MOCK_COMPLAINTS_DB.summary.cancelled || 0) + 1;
      MOCK_COMPLAINTS_DB.summary.open = MOCK_COMPLAINTS_DB.summary.pending || 0;
    }

    return {
      status: "success",
      mock: true,
      message: "Complaint cancelled successfully",
      complaint
    };
  }

  return undefined;
};
