// Feature API: admin.api.js

window.getAdminProfile = async function() {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_PROFILE);
}

window.updateAdminProfile = async function(profileData) {
  return apiPut(API_CONFIG.ENDPOINTS.ADMIN_PROFILE, profileData);
}

window.getAdminSociety = async function() {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_SOCIETY);
}

window.updateAdminSociety = async function(societyData) {
  return apiPut(API_CONFIG.ENDPOINTS.ADMIN_SOCIETY, societyData);
}

window.changeAdminPassword = async function(passwordData) {
  return apiPut(API_CONFIG.ENDPOINTS.ADMIN_PROFILE_PASSWORD, passwordData);
}

window.deleteAdminAccount = async function() {
  return apiDelete(API_CONFIG.ENDPOINTS.ADMIN_ACCOUNT);
}

window.getAdminDashboardData = async function() {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_DASHBOARD);
}

window.getAdminNotifications = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_NOTIFICATIONS, params);
}

window.createAdminNotification = async function(payload) {
  return apiPost(API_CONFIG.ENDPOINTS.ADMIN_NOTIFICATIONS, payload);
}

// Canonical Resident Voting & Proposals API (reuses canonical notification architecture)
window.getResidentVotingItems = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.RESIDENT_VOTING, params);
};

window.getResidentVotingDetail = async function(id) {
  return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.RESIDENT_VOTING, id));
};

window.submitResidentVote = async function(id, payload) {
  return apiPost(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.RESIDENT_VOTING, id, "vote"), payload);
};


window.mockAdminAdapter = async function(endpoint, options, payload) {
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_PROFILE) {
    if (options.method === "PUT") {
      if (!payload.name || !payload.name.trim()) {
        const err = new Error("Full name is required");
        err.status = 400;
        throw err;
      }
      if (!payload.phone || !payload.phone.trim()) {
        const err = new Error("Phone number is required");
        err.status = 400;
        throw err;
      }
      const cleanPhone = payload.phone.replace(/[\s-]/g, "");
      if (!/^\+?[0-9]{10,14}$/.test(cleanPhone)) {
        const err = new Error("Please enter a valid phone number");
        err.status = 400;
        throw err;
      }
      if (payload.email && payload.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
        const err = new Error("Please enter a valid email address");
        err.status = 400;
        throw err;
      }

      MOCK_ADMIN_PROFILE_DB.profile.name = payload.name.trim();
      MOCK_ADMIN_PROFILE_DB.profile.phone = cleanPhone;
      MOCK_ADMIN_PROFILE_DB.profile.email = (payload.email || "").trim();
      if (payload.profilePhoto !== undefined) {
        MOCK_ADMIN_PROFILE_DB.profile.profilePhoto = payload.profilePhoto;
      }
      MOCK_ADMIN_PROFILE_DB.society.adminName = MOCK_ADMIN_PROFILE_DB.profile.name;

      return {
        status: "success",
        mock: true,
        message: "Profile updated successfully",
        data: { ...MOCK_ADMIN_PROFILE_DB.profile }
      };
    }

    return {
      status: "success",
      mock: true,
      data: { ...MOCK_ADMIN_PROFILE_DB.profile }
    };
  }
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_SOCIETY) {
    if (options.method === "PUT") {
      if (!payload.name || !payload.name.trim()) {
        const err = new Error("Society name is required");
        err.status = 400;
        throw err;
      }
      if (!payload.address || !payload.address.trim()) {
        const err = new Error("Address is required");
        err.status = 400;
        throw err;
      }
      if (!payload.city || !payload.city.trim()) {
        const err = new Error("City is required");
        err.status = 400;
        throw err;
      }
      if (!payload.state || !payload.state.trim()) {
        const err = new Error("State is required");
        err.status = 400;
        throw err;
      }
      if (!payload.pincode || !/^[0-9]{6}$/.test(String(payload.pincode).trim())) {
        const err = new Error("Please enter a valid 6-digit pincode");
        err.status = 400;
        throw err;
      }

      MOCK_ADMIN_PROFILE_DB.society.name = payload.name.trim();
      MOCK_ADMIN_PROFILE_DB.society.address = payload.address.trim();
      MOCK_ADMIN_PROFILE_DB.society.city = payload.city.trim();
      MOCK_ADMIN_PROFILE_DB.society.state = payload.state.trim();
      MOCK_ADMIN_PROFILE_DB.society.pincode = String(payload.pincode).trim();

      return {
        status: "success",
        mock: true,
        message: "Society details updated successfully",
        data: { ...MOCK_ADMIN_PROFILE_DB.society }
      };
    }

    return {
      status: "success",
      mock: true,
      data: { ...MOCK_ADMIN_PROFILE_DB.society }
    };
  }
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_PROFILE_PASSWORD) {
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
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_ACCOUNT) {
    return {
      status: "success",
      mock: true,
      message: "Admin account scheduled for deactivation",
      deleted_at: new Date().toISOString()
    };
  }
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_DASHBOARD) {
    const socId = (typeof GrihamAuth !== "undefined" && GrihamAuth.getSocietyId()) || "GRIHAM-PUNE-001";
    let sosData = { active: false };
    if (typeof MOCK_SOS_DB !== "undefined" && Array.isArray(MOCK_SOS_DB.alerts)) {
      const activeAlert = MOCK_SOS_DB.alerts.find(a => a.status === "Active");
      if (activeAlert) {
        sosData = {
          active: true,
          flat: `${activeAlert.wing || "B"}-${activeAlert.flatNumber || "204"}`,
          resident: activeAlert.residentName || "Rajesh Kumar",
          time: "Just now",
          status: "Assistance Requested",
          note: `${activeAlert.emergencyType}: ${activeAlert.message}`
        };
      }
    } else {
      sosData = {
        active: true,
        flat: "B-204",
        resident: "R. Sharma",
        time: "2 mins ago",
        status: "Assistance Requested",
        note: "Medical / Security Alert triggered from flat B-204."
      };
    }
    return {
      status: "success",
      mock: true,
      society: {
        society_code: socId,
        name: "Green Valley Residency"
      },
      sos: sosData,
      maintenance: {
        collected: 184500,
        expected: 210000,
        remaining: 25500,
        percentage: 87.8,
        monthly_history: [
          { month: "Apr", collected: 172000, expected: 200000, pct: 86 },
          { month: "May", collected: 185000, expected: 205000, pct: 90 },
          { month: "Jun", collected: 179000, expected: 210000, pct: 85 },
          { month: "Jul", collected: 198000, expected: 210000, pct: 94 },
          { month: "Aug", collected: 184500, expected: 210000, pct: 88 }
        ]
      },
      complaints: [
        { id: 1, title: "Water leakage", flat: "B-204", time: "Today", status: "In Progress" },
        { id: 2, title: "Lift issue", flat: "A-302", time: "Yesterday", status: "Pending" }
      ],
      workers: {
        present: 8,
        absent: 2,
        half_day: 1
      },
      amenities: {
        total: 5,
        today_bookings: 2
      },
      pending_approvals: 4
    };
  }
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_NOTIFICATIONS) {
    const db = window.MOCK_NOTIFICATIONS_DB || { notifications: [] };
    if (options.method === "POST") {
      const notifId = "notif-" + Date.now();
      const isSched = !!payload.is_scheduled;
      const target = payload.target || "All Residents";
      let targetAudience = "all";
      let targetWing = "";
      if (target.includes("Selected Wing")) {
        targetAudience = "wing";
        const m = target.match(/Wing [A-Z]/i);
        if (m) targetWing = m[0];
      } else if (target.includes("Selected Residents")) {
        targetAudience = "residents";
      }

      const newNotif = {
        id: notifId,
        type: payload.type || "message",
        title: payload.title || payload.question || "",
        message: payload.message || "",
        question: payload.question || "",
        description: payload.description || "",
        reason: payload.reason || "",
        category: payload.category || "General",
        priority: payload.priority || "Normal",
        target: target,
        target_audience: targetAudience,
        target_wing: targetWing,
        target_residents: payload.target_residents || [],
        created_at: isSched ? `Scheduled: ${payload.schedule_date || 'Upcoming'}` : "Just now",
        status: isSched ? "Scheduled" : (payload.type === "message" ? "Sent" : "Active"),
        allow_multiple: !!payload.allow_multiple,
        deadline: payload.deadline || (isSched && payload.schedule_date ? `${payload.schedule_date}T${payload.schedule_time || '23:59:59'}` : null),
        options: (payload.options || []).map((o, idx) => ({
          id: o.id || `opt-${idx + 1}`,
          text: typeof o === "string" ? o.trim() : (o.text || `Option ${idx + 1}`),
          votes: 0,
          pct: 0
        })),
        voters: []
      };

      if (Array.isArray(db.notifications)) {
        db.notifications.unshift(newNotif);
      }

      return {
        status: "success",
        mock: true,
        notification_id: notifId,
        message: isSched ? "Notification scheduled successfully" : "Notification sent successfully",
        created_at: newNotif.created_at,
        data: newNotif
      };
    }
    return {
      status: "success",
      mock: true,
      notifications: db.notifications || []
    };
  }

  // =================================================================
  // CANONICAL RESIDENT VOTING & PROPOSALS ADAPTER
  // =================================================================
  if (endpoint === API_CONFIG.ENDPOINTS.RESIDENT_VOTING || endpoint.startsWith(API_CONFIG.ENDPOINTS.RESIDENT_VOTING + "/") || endpoint.startsWith(API_CONFIG.ENDPOINTS.RESIDENT_VOTING + "?")) {
    const db = window.MOCK_NOTIFICATIONS_DB || { notifications: [] };
    const sessionUser = typeof GrihamAuth !== "undefined" ? GrihamAuth.getUser() : null;

    if (!sessionUser) {
      const err = new Error("Authentication required to access voting.");
      err.status = 401;
      throw err;
    }

    const isApproved = typeof GrihamAuth !== "undefined" && typeof GrihamAuth.isApprovedResident === "function" 
      ? GrihamAuth.isApprovedResident() 
      : ((sessionUser.approvalStatus || sessionUser.approval || "Approved").toLowerCase() === "approved");

    const residentWing = (sessionUser.wing || "").trim().toUpperCase();
    const residentId = sessionUser.id || "USR-001";

    // Helper: Determine if current resident is eligible for a notification
    const isEligible = (item) => {
      const aud = (item.target_audience || "").toLowerCase();
      const targetStr = (item.target || "").toLowerCase();

      if (aud === "all" || targetStr === "all residents" || !item.target) {
        return true;
      }
      if (aud === "wing" || targetStr.includes("selected wing")) {
        const itemWing = (item.target_wing || (targetStr.match(/wing\s+([a-z0-9]+)/i)?.[1] || "")).toUpperCase();
        return itemWing ? itemWing === residentWing || itemWing === `WING ${residentWing}` : true;
      }
      if (aud === "residents" || targetStr.includes("selected residents")) {
        if (Array.isArray(item.target_residents) && item.target_residents.length > 0) {
          return item.target_residents.includes(residentId);
        }
        return true;
      }
      return true;
    };

    // Helper: Build safe resident-facing projection (strips voter identities)
    const mapForResident = (item) => {
      const voters = item.voters || [];
      const voterRecord = voters.find(v => v.resident_id === residentId);
      const hasVoted = !!voterRecord;
      const isExpired = item.deadline ? (new Date() > new Date(item.deadline)) : false;
      const isClosed = item.status === "Closed" || isExpired;
      const totalVotes = (item.options || []).reduce((sum, o) => sum + (o.votes || 0), 0);

      // Results are visible if resident has already voted OR the poll/proposal is closed
      const showResults = hasVoted || isClosed;

      return {
        id: item.id,
        type: item.type, // "poll" | "proposal"
        title: item.title || item.question,
        question: item.question || item.title,
        description: item.description || "",
        reason: item.reason || "",
        category: item.category || "General",
        priority: item.priority || "Normal",
        target: item.target || "All Residents",
        created_at: item.created_at || "Recently",
        deadline: item.deadline || null,
        status: isClosed ? "Closed" : (hasVoted ? "Voted" : "Active"),
        allow_multiple: !!item.allow_multiple,
        max_options: item.max_options || (item.options ? item.options.length : 1),
        has_voted: hasVoted,
        user_voted_options: voterRecord ? voterRecord.selected_options : null,
        voted_at: voterRecord ? voterRecord.voted_at : null,
        total_votes: totalVotes,
        show_results: showResults,
        options: (item.options || []).map(o => ({
          id: o.id || o.text,
          text: o.text,
          votes: showResults ? (o.votes || 0) : undefined,
          pct: showResults ? (o.pct !== undefined ? o.pct : (totalVotes > 0 ? Math.round(((o.votes || 0) / totalVotes) * 100) : 0)) : undefined
        }))
      };
    };

    // 1. Submit Vote (POST /v1/resident/voting/:id/vote)
    if (endpoint.endsWith("/vote") && options.method === "POST") {
      const parts = endpoint.split("/");
      const voteIdx = parts.lastIndexOf("vote");
      const itemId = parts[voteIdx - 1];

      if (!isApproved) {
        const err = new Error("Voting is restricted. Your resident registration is pending approval.");
        err.status = 403;
        throw err;
      }

      const item = (db.notifications || []).find(n => n.id === itemId);
      if (!item) {
        const err = new Error("Poll or Proposal not found.");
        err.status = 404;
        throw err;
      }

      if (!isEligible(item)) {
        const err = new Error("You are not eligible to vote on this society item based on audience targeting.");
        err.status = 403;
        throw err;
      }

      const isExpired = item.deadline ? (new Date() > new Date(item.deadline)) : false;
      if (item.status === "Closed" || isExpired) {
        const err = new Error("Voting has closed for this poll/proposal.");
        err.status = 400;
        throw err;
      }

      item.voters = item.voters || [];
      const existingVote = item.voters.find(v => v.resident_id === residentId);
      if (existingVote) {
        const err = new Error("You have already submitted a vote for this item. Duplicate votes are not permitted.");
        err.status = 409;
        throw err;
      }

      let selectedList = [];
      if (item.type === "proposal") {
        const decision = (payload.decision || "").trim().toUpperCase();
        if (decision !== "YES" && decision !== "NO") {
          const err = new Error("Please select either YES or NO to vote on this proposal.");
          err.status = 400;
          throw err;
        }
        selectedList = [decision];
      } else {
        const selected = Array.isArray(payload.selected_options) ? payload.selected_options : [];
        if (selected.length === 0) {
          const err = new Error("Please select at least one voting option.");
          err.status = 400;
          throw err;
        }
        if (!item.allow_multiple && selected.length > 1) {
          const err = new Error("Only one option can be selected for this poll.");
          err.status = 400;
          throw err;
        }
        const maxAllowed = item.max_options || item.options.length;
        if (selected.length > maxAllowed) {
          const err = new Error(`You can select at most ${maxAllowed} options for this poll.`);
          err.status = 400;
          throw err;
        }
        // Verify each option exists
        const validTexts = item.options.map(o => o.text);
        const validIds = item.options.map(o => o.id);
        const allValid = selected.every(s => validTexts.includes(s) || validIds.includes(s));
        if (!allValid) {
          const err = new Error("One or more selected options are invalid.");
          err.status = 400;
          throw err;
        }
        selectedList = selected;
      }

      // Record canonical vote
      const voteTimestamp = new Date().toISOString();
      item.voters.push({
        resident_id: residentId,
        resident_name: sessionUser.name || "Resident",
        wing: residentWing,
        flat: sessionUser.flatNumber || sessionUser.flat || "204",
        selected_options: selectedList,
        voted_at: voteTimestamp
      });

      // Update canonical vote counts & percentages
      item.options.forEach(opt => {
        if (selectedList.includes(opt.text) || selectedList.includes(opt.id)) {
          opt.votes = (opt.votes || 0) + 1;
        }
      });
      const newTotal = item.options.reduce((sum, o) => sum + (o.votes || 0), 0);
      item.options.forEach(opt => {
        opt.pct = newTotal > 0 ? Math.round(((opt.votes || 0) / newTotal) * 100) : 0;
      });

      return {
        status: "success",
        mock: true,
        message: "Your vote has been recorded successfully.",
        data: mapForResident(item)
      };
    }

    // 2. Single Detail (GET /v1/resident/voting/:id)
    if (endpoint.startsWith(API_CONFIG.ENDPOINTS.RESIDENT_VOTING + "/") && (options.method === "GET" || !options.method)) {
      const itemId = endpoint.split("/").pop();
      const item = (db.notifications || []).find(n => n.id === itemId && (n.type === "poll" || n.type === "proposal"));

      if (!item) {
        const err = new Error("Poll or Proposal not found.");
        err.status = 404;
        throw err;
      }

      if (!isEligible(item)) {
        const err = new Error("You are not eligible to view this item based on audience targeting.");
        err.status = 403;
        throw err;
      }

      return {
        status: "success",
        mock: true,
        data: mapForResident(item),
        resident_approved: isApproved
      };
    }

    // 3. List All Eligible Polls & Proposals (GET /v1/resident/voting)
    if (options.method === "GET" || !options.method) {
      const allPollsProps = (db.notifications || []).filter(n => n.type === "poll" || n.type === "proposal");
      const eligibleItems = allPollsProps.filter(isEligible).map(mapForResident);

      return {
        status: "success",
        mock: true,
        items: eligibleItems,
        total: eligibleItems.length,
        resident_approved: isApproved,
        resident_wing: residentWing
      };
    }
  }

  return undefined;
};
