/**
 * GRIHAM FRONTEND - CANONICAL MOCK DELIVERIES DATABASE & ADAPTER
 * File: js/mock/deliveries.mock.js
 * Society-Aware Security Terminal Delivery & Parcel Management
 */

const MOCK_DELIVERIES_DB = {
  deliveries: [
    {
      id: "DEL-2026-0001",
      societyId: "GRIHAM-PUNE-001",
      deliveryType: "Courier / Parcel",
      courierName: "BlueDart Express (Ramesh)",
      courierPhone: "+919876540001",
      recipientName: "Amit Sharma",
      recipientId: "USR-001",
      wing: "A",
      flatNumber: "102",
      description: "Important banking documents & cards",
      status: "Expected",
      arrivedAt: null,
      enteredAt: null,
      handedOverAt: null,
      notes: "Resident requested to hold at gate or verify PIN",
      createdAt: "2026-09-30T08:30:00"
    },
    {
      id: "DEL-2026-0002",
      societyId: "GRIHAM-PUNE-001",
      deliveryType: "Food Delivery",
      courierName: "Swiggy (Mahesh)",
      courierPhone: "+919822119900",
      recipientName: "Priya Nair",
      recipientId: "USR-002",
      wing: "B",
      flatNumber: "302",
      description: "Lunch meal from Mainland China",
      status: "Arrived",
      arrivedAt: "2026-09-30T09:15:00",
      enteredAt: null,
      handedOverAt: null,
      notes: "Arrived at Main Gate; waiting for resident call",
      createdAt: "2026-09-30T09:15:00"
    },
    {
      id: "DEL-2026-0003",
      societyId: "GRIHAM-PUNE-001",
      deliveryType: "E-commerce",
      courierName: "Amazon Logistics (Sunil)",
      courierPhone: "+919833445566",
      recipientName: "Rajesh Kumar",
      recipientId: "USR-003",
      wing: "A",
      flatNumber: "204",
      description: "Medium cardboard parcel box",
      status: "Entered",
      arrivedAt: "2026-09-30T08:45:00",
      enteredAt: "2026-09-30T08:50:00",
      handedOverAt: null,
      notes: "Delivering to door (Tower A, 2nd floor)",
      createdAt: "2026-09-30T08:45:00"
    },
    {
      id: "DEL-2026-0004",
      societyId: "GRIHAM-PUNE-001",
      deliveryType: "Grocery",
      courierName: "Blinkit (Sachin)",
      courierPhone: "+919811228899",
      recipientName: "Manish Joshi",
      recipientId: "USR-004",
      wing: "B",
      flatNumber: "105",
      description: "Grocery bag with fresh dairy & vegetables",
      status: "Handed Over",
      arrivedAt: "2026-09-30T07:40:00",
      enteredAt: "2026-09-30T07:45:00",
      handedOverAt: "2026-09-30T07:55:00",
      notes: "Handed over to resident at Tower B lobby",
      createdAt: "2026-09-30T07:40:00"
    },
    {
      id: "DEL-2026-0005",
      societyId: "GRIHAM-PUNE-001",
      deliveryType: "Courier / Parcel",
      courierName: "DTDC Courier (Kiran)",
      courierPhone: "+919866770011",
      recipientName: "Ananya Deshmukh",
      recipientId: "USR-005",
      wing: "A",
      flatNumber: "401",
      description: "Return package — mismatched delivery code",
      status: "Cancelled",
      arrivedAt: "2026-09-30T07:10:00",
      enteredAt: null,
      handedOverAt: null,
      notes: "Recipient refused package; courier left gate",
      createdAt: "2026-09-30T07:10:00"
    },
    // Cross-society isolation fixture
    {
      id: "DEL-2026-0099",
      societyId: "GRIHAM-MUMBAI-002",
      deliveryType: "Food Delivery",
      courierName: "Zomato Express (Imran)",
      courierPhone: "+919899001122",
      recipientName: "Rohit Shetty",
      recipientId: "USR-101",
      wing: "C",
      flatNumber: "501",
      description: "Pizza dinner box",
      status: "Expected",
      arrivedAt: null,
      enteredAt: null,
      handedOverAt: null,
      notes: "Cross-society isolation test record",
      createdAt: "2026-09-30T09:00:00"
    }
  ],
  nextId: 6
};

window.MOCK_DELIVERIES_DB = MOCK_DELIVERIES_DB;

/**
 * Delivery Mock Handlers
 */
async function handleDeliveryMock(endpoint, options, payload) {
  const method = (options.method || "GET").toUpperCase();
  const activeSociety = (typeof GrihamAuth !== "undefined" && GrihamAuth.getSocietyId()) || "GRIHAM-PUNE-001";

  // 1. GET /v1/gatekeeper/deliveries (List with filtering and search)
  if ((endpoint === API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERIES || endpoint.startsWith(API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERIES + "?")) && method === "GET") {
    const urlObj = new URL("http://localhost" + endpoint);
    const filterStatus = urlObj.searchParams.get("status") || "All";
    const searchQuery = (urlObj.searchParams.get("search") || "").trim().toLowerCase();
    const societyParam = urlObj.searchParams.get("societyId") || activeSociety;

    const db = window.MOCK_DELIVERIES_DB;
    let list = (db.deliveries || []).filter(d => d.societyId && d.societyId.toUpperCase() === societyParam.toUpperCase());

    // Status filter
    if (filterStatus && filterStatus !== "All") {
      list = list.filter(d => (d.status || "").toLowerCase() === filterStatus.toLowerCase());
    }

    // Search filter
    if (searchQuery) {
      list = list.filter(d => {
        const cName = (d.courierName || "").toLowerCase();
        const cPhone = (d.courierPhone || "").toLowerCase();
        const rName = (d.recipientName || "").toLowerCase();
        const flat = `${d.wing || ""}-${d.flatNumber || ""}`.toLowerCase();
        const flatNum = (d.flatNumber || "").toLowerCase();
        const id = (d.id || "").toLowerCase();
        const desc = (d.description || "").toLowerCase();
        const type = (d.deliveryType || "").toLowerCase();
        return cName.includes(searchQuery) ||
               cPhone.includes(searchQuery) ||
               rName.includes(searchQuery) ||
               flat.includes(searchQuery) ||
               flatNum.includes(searchQuery) ||
               id.includes(searchQuery) ||
               desc.includes(searchQuery) ||
               type.includes(searchQuery);
      });
    }

    // Sort: Active first (Arrived, Entered, Expected), then Handed Over, then Cancelled
    const statusOrder = { "Arrived": 1, "Entered": 2, "Expected": 3, "Handed Over": 4, "Cancelled": 5 };
    list.sort((a, b) => {
      const orderA = statusOrder[a.status] || 99;
      const orderB = statusOrder[b.status] || 99;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    return {
      status: "success",
      mock: true,
      deliveries: JSON.parse(JSON.stringify(list)),
      total: list.length
    };
  }

  // 2. GET /v1/gatekeeper/deliveries/detail (Single delivery record)
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERY_DETAIL) && method === "GET") {
    const urlObj = new URL("http://localhost" + endpoint);
    const deliveryId = urlObj.searchParams.get("id");

    const db = window.MOCK_DELIVERIES_DB;
    const delivery = (db.deliveries || []).find(d => d.id === deliveryId && d.societyId.toUpperCase() === activeSociety.toUpperCase());

    if (!delivery) {
      const error = new Error("Delivery record not found.");
      error.status = 404;
      throw error;
    }

    return {
      status: "success",
      mock: true,
      delivery: JSON.parse(JSON.stringify(delivery))
    };
  }

  // 3. GET /v1/gatekeeper/deliveries/summary (Counts for today)
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERY_SUMMARY) && method === "GET") {
    const db = window.MOCK_DELIVERIES_DB;
    const societyDeliveries = (db.deliveries || []).filter(d => d.societyId && d.societyId.toUpperCase() === activeSociety.toUpperCase());

    const expected = societyDeliveries.filter(d => d.status === "Expected").length;
    const arrived = societyDeliveries.filter(d => d.status === "Arrived").length;
    const entered = societyDeliveries.filter(d => d.status === "Entered").length;
    const handedOver = societyDeliveries.filter(d => d.status === "Handed Over").length;
    const cancelled = societyDeliveries.filter(d => d.status === "Cancelled").length;
    // Active deliveries: Expected + Arrived + Entered
    const active = expected + arrived + entered;
    const totalToday = societyDeliveries.length;

    return {
      status: "success",
      mock: true,
      summary: {
        expected,
        arrived,
        entered,
        handedOver,
        cancelled,
        active,
        totalToday
      }
    };
  }

  // 4. POST /v1/gatekeeper/deliveries/arrive (Mark Arrived at Gate)
  if (endpoint === API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERY_ARRIVE && method === "POST") {
    const deliveryId = payload.id;
    const notes = payload.notes || "";
    const db = window.MOCK_DELIVERIES_DB;
    const delivery = (db.deliveries || []).find(d => d.id === deliveryId && d.societyId.toUpperCase() === activeSociety.toUpperCase());

    if (!delivery) {
      const error = new Error("Delivery record not found.");
      error.status = 404;
      throw error;
    }

    if (delivery.status === "Arrived") {
      const error = new Error("Delivery is already marked as Arrived at gate.");
      error.status = 400;
      throw error;
    }

    if (delivery.status === "Entered" || delivery.status === "Handed Over") {
      const error = new Error(`Cannot mark Arrived: Delivery is already ${delivery.status}.`);
      error.status = 400;
      throw error;
    }

    if (delivery.status === "Cancelled") {
      const error = new Error("Cannot arrive a cancelled delivery.");
      error.status = 400;
      throw error;
    }

    delivery.status = "Arrived";
    delivery.arrivedAt = new Date().toISOString();
    if (notes) delivery.notes = delivery.notes ? `${delivery.notes} | ${notes}` : notes;

    return {
      status: "success",
      mock: true,
      message: `Delivery ${delivery.id} marked as Arrived at gate.`,
      delivery: JSON.parse(JSON.stringify(delivery))
    };
  }

  // 5. POST /v1/gatekeeper/deliveries/enter (Mark Entered Premises)
  if (endpoint === API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERY_ENTER && method === "POST") {
    const deliveryId = payload.id;
    const notes = payload.notes || "";
    const db = window.MOCK_DELIVERIES_DB;
    const delivery = (db.deliveries || []).find(d => d.id === deliveryId && d.societyId.toUpperCase() === activeSociety.toUpperCase());

    if (!delivery) {
      const error = new Error("Delivery record not found.");
      error.status = 404;
      throw error;
    }

    if (delivery.status === "Expected") {
      const error = new Error("Delivery must arrive at gate before entering premises.");
      error.status = 400;
      throw error;
    }

    if (delivery.status === "Entered") {
      const error = new Error("Delivery person has already entered premises.");
      error.status = 400;
      throw error;
    }

    if (delivery.status === "Handed Over") {
      const error = new Error("Delivery has already been handed over.");
      error.status = 400;
      throw error;
    }

    if (delivery.status === "Cancelled") {
      const error = new Error("Cannot grant entry to a cancelled delivery.");
      error.status = 400;
      throw error;
    }

    delivery.status = "Entered";
    delivery.enteredAt = new Date().toISOString();
    if (notes) delivery.notes = delivery.notes ? `${delivery.notes} | ${notes}` : notes;

    return {
      status: "success",
      mock: true,
      message: `Delivery person for ${delivery.id} granted entry to premises.`,
      delivery: JSON.parse(JSON.stringify(delivery))
    };
  }

  // 6. POST /v1/gatekeeper/deliveries/handover (Mark Handed Over)
  if (endpoint === API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERY_HANDOVER && method === "POST") {
    const deliveryId = payload.id;
    const notes = payload.notes || "";
    const db = window.MOCK_DELIVERIES_DB;
    const delivery = (db.deliveries || []).find(d => d.id === deliveryId && d.societyId.toUpperCase() === activeSociety.toUpperCase());

    if (!delivery) {
      const error = new Error("Delivery record not found.");
      error.status = 404;
      throw error;
    }

    if (delivery.status === "Handed Over") {
      const error = new Error("Delivery package has already been handed over.");
      error.status = 400;
      throw error;
    }

    if (delivery.status === "Expected") {
      const error = new Error("Delivery must arrive at gate before handover.");
      error.status = 400;
      throw error;
    }

    if (delivery.status === "Cancelled") {
      const error = new Error("Cannot handover a cancelled delivery.");
      error.status = 400;
      throw error;
    }

    delivery.status = "Handed Over";
    delivery.handedOverAt = new Date().toISOString();
    if (!delivery.enteredAt && delivery.arrivedAt) {
      // Direct handover at gate without entering premises
      delivery.notes = delivery.notes ? `${delivery.notes} | Direct handover at gate` : "Direct handover at gate";
    }
    if (notes) delivery.notes = delivery.notes ? `${delivery.notes} | ${notes}` : notes;

    return {
      status: "success",
      mock: true,
      message: `Delivery ${delivery.id} successfully handed over.`,
      delivery: JSON.parse(JSON.stringify(delivery))
    };
  }

  // 7. POST /v1/gatekeeper/deliveries (Record Incoming Delivery)
  if (endpoint === API_CONFIG.ENDPOINTS.GATEKEEPER_DELIVERIES && method === "POST") {
    const courierName = (payload.courierName || "").trim();
    const courierPhone = (payload.courierPhone || "").trim();
    const recipientName = (payload.recipientName || "").trim();
    const wing = (payload.wing || "A").trim().toUpperCase();
    const flatNumber = (payload.flatNumber || payload.flat || "").trim();
    const deliveryType = (payload.deliveryType || "Courier / Parcel").trim();
    const description = (payload.description || "Package delivery").trim();
    const notes = (payload.notes || "").trim();

    // Validation
    if (!courierName) {
      const error = new Error("Courier or delivery person name is required.");
      error.status = 400;
      throw error;
    }

    const cleanPhone = courierPhone.replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      const error = new Error("A valid 10-digit courier contact number is required.");
      error.status = 400;
      throw error;
    }

    if (!recipientName) {
      const error = new Error("Recipient resident name is required.");
      error.status = 400;
      throw error;
    }

    if (!flatNumber) {
      const error = new Error("Flat number is required.");
      error.status = 400;
      throw error;
    }

    const db = window.MOCK_DELIVERIES_DB;

    // Duplicate active delivery check: same society, same courier phone, same flat, active status
    const duplicate = (db.deliveries || []).find(d => {
      const sameSociety = d.societyId && d.societyId.toUpperCase() === activeSociety.toUpperCase();
      const dPhoneClean = (d.courierPhone || "").replace(/[^0-9]/g, "");
      const samePhone = dPhoneClean.endsWith(cleanPhone.slice(-10));
      const sameFlat = (d.wing || "").toUpperCase() === wing && (d.flatNumber || "").toLowerCase() === flatNumber.toLowerCase();
      const sameType = (d.deliveryType || "").toLowerCase() === deliveryType.toLowerCase();
      const isActive = d.status === "Expected" || d.status === "Arrived" || d.status === "Entered";
      return sameSociety && samePhone && sameFlat && sameType && isActive;
    });

    if (duplicate) {
      const error = new Error(`An active delivery (${duplicate.id}) already exists for this courier and flat. Please update the existing record.`);
      error.status = 409;
      throw error;
    }

    const nextIdNum = db.nextId || (db.deliveries.length + 1);
    db.nextId = nextIdNum + 1;
    const newId = `DEL-2026-${String(nextIdNum).padStart(4, "0")}`;
    const now = new Date();

    const newRecord = {
      id: newId,
      societyId: activeSociety,
      deliveryType,
      courierName,
      courierPhone: courierPhone.startsWith("+") ? courierPhone : `+91${cleanPhone.slice(-10)}`,
      recipientName,
      recipientId: payload.recipientId || "USR-AUTO",
      wing,
      flatNumber,
      description,
      status: payload.status || "Arrived",
      arrivedAt: now.toISOString(),
      enteredAt: null,
      handedOverAt: null,
      notes,
      createdAt: now.toISOString()
    };

    db.deliveries.unshift(newRecord);

    return {
      status: "success",
      mock: true,
      message: `Incoming delivery ${newId} recorded as Arrived.`,
      delivery: JSON.parse(JSON.stringify(newRecord))
    };
  }

  return undefined;
}

/**
 * CANONICAL GATEKEEPER NOTIFICATIONS MOCK ADAPTER HANDLER
 * Consumes window.MOCK_NOTIFICATIONS_DB (Single source shared with Admin & Resident Voting)
 */
async function handleGatekeeperNotificationMock(endpoint, options, payload) {
  const normEndpoint = endpoint ? endpoint.split("?")[0] : "";
  const queryParams = new URLSearchParams(endpoint.includes("?") ? endpoint.split("?")[1] : "");

  if (!normEndpoint.startsWith("/v1/gatekeeper/notifications")) {
    return undefined;
  }

  // Society & Gatekeeper Context
  const sessionUser = (typeof GrihamAuth !== "undefined" && typeof GrihamAuth.getUser === "function")
    ? GrihamAuth.getUser()
    : null;
  const societyId = (typeof GrihamAuth !== "undefined" && typeof GrihamAuth.getSocietyId === "function" && GrihamAuth.getSocietyId())
    || (sessionUser && sessionUser.society_id)
    || "GRIHAM-PUNE-001";
  const gatekeeperId = (sessionUser && sessionUser.id) || "GTK-001";

  const db = window.MOCK_NOTIFICATIONS_DB || { notifications: [] };
  const allNotifs = Array.isArray(db.notifications) ? db.notifications : [];

  // Helper: map notification for gatekeeper presentation
  const mapForGatekeeper = (n) => {
    const readList = Array.isArray(n.read_by) ? n.read_by : [];
    const isRead = readList.includes(gatekeeperId);
    return {
      id: n.id,
      type: n.type || "message",
      title: n.title || n.question || "Notice",
      message: n.message || n.description || n.question || "",
      question: n.question || "",
      description: n.description || "",
      reason: n.reason || "",
      category: n.category || "General",
      priority: n.priority || "Normal",
      target: n.target || "All Residents",
      target_audience: n.target_audience || "all",
      created_at: n.created_at || "Today",
      status: n.status || "Sent",
      society_id: n.society_id || n.societyId || "GRIHAM-PUNE-001",
      is_read: isRead,
      unread: !isRead,
      read_by: readList
    };
  };

  // Helper: check if notification is relevant to gatekeepers
  const isRelevantToGatekeeper = (n) => {
    const notifSoc = n.society_id || n.societyId || "GRIHAM-PUNE-001";
    if (notifSoc !== societyId) return false;

    const aud = (n.target_audience || "").toLowerCase();
    const targetStr = (n.target || "").toLowerCase();

    // Specific exclusion: Wing-only or private resident notices
    if (aud === "wing" || aud === "residents" || targetStr.includes("selected wing") || targetStr.includes("selected residents")) {
      return false;
    }

    // Inclusion: All / Gatekeepers / Security
    if (aud === "all" || aud === "gatekeepers" || aud === "gatekeeper" || targetStr.includes("all") || targetStr.includes("gatekeeper") || targetStr.includes("security")) {
      return true;
    }

    return true;
  };

  // 1. GET /v1/gatekeeper/notifications/summary
  if (normEndpoint === "/v1/gatekeeper/notifications/summary" && options.method === "GET") {
    const relevant = allNotifs.filter(isRelevantToGatekeeper).map(mapForGatekeeper);
    const unread = relevant.filter(n => n.unread).length;
    const read = relevant.filter(n => n.is_read).length;
    return {
      status: "success",
      mock: true,
      summary: {
        total: relevant.length,
        unread: unread,
        read: read
      }
    };
  }

  // 2. GET /v1/gatekeeper/notifications/detail
  if (normEndpoint === "/v1/gatekeeper/notifications/detail" && options.method === "GET") {
    const id = queryParams.get("id");
    const item = allNotifs.find(n => n.id === id);
    if (!item || !isRelevantToGatekeeper(item)) {
      const err = new Error("Notification not found or access denied.");
      err.status = 404;
      throw err;
    }
    return {
      status: "success",
      mock: true,
      notification: mapForGatekeeper(item)
    };
  }

  // 3. POST /v1/gatekeeper/notifications/read
  if (normEndpoint === "/v1/gatekeeper/notifications/read" && options.method === "POST") {
    const notifId = payload.id;
    const item = allNotifs.find(n => n.id === notifId);
    if (!item) {
      const err = new Error("Notification not found.");
      err.status = 404;
      throw err;
    }
    if (!Array.isArray(item.read_by)) item.read_by = [];
    if (!item.read_by.includes(gatekeeperId)) {
      item.read_by.push(gatekeeperId);
    }
    return {
      status: "success",
      mock: true,
      message: "Notification marked as read",
      notification: mapForGatekeeper(item)
    };
  }

  // 4. POST /v1/gatekeeper/notifications/unread
  if (normEndpoint === "/v1/gatekeeper/notifications/unread" && options.method === "POST") {
    const notifId = payload.id;
    const item = allNotifs.find(n => n.id === notifId);
    if (!item) {
      const err = new Error("Notification not found.");
      err.status = 404;
      throw err;
    }
    if (Array.isArray(item.read_by)) {
      item.read_by = item.read_by.filter(id => id !== gatekeeperId);
    }
    return {
      status: "success",
      mock: true,
      message: "Notification marked as unread",
      notification: mapForGatekeeper(item)
    };
  }

  // 5. GET /v1/gatekeeper/notifications (List with search & filter)
  if (normEndpoint === "/v1/gatekeeper/notifications" && options.method === "GET") {
    let list = allNotifs.filter(isRelevantToGatekeeper).map(mapForGatekeeper);

    const filter = queryParams.get("filter");
    if (filter === "Unread") {
      list = list.filter(n => n.unread);
    } else if (filter === "Read") {
      list = list.filter(n => n.is_read);
    } else if (filter && filter !== "All") {
      list = list.filter(n => n.category.toLowerCase() === filter.toLowerCase());
    }

    const search = (queryParams.get("search") || "").trim().toLowerCase();
    if (search) {
      list = list.filter(n =>
        n.title.toLowerCase().includes(search) ||
        n.message.toLowerCase().includes(search) ||
        n.category.toLowerCase().includes(search) ||
        n.id.toLowerCase().includes(search)
      );
    }

    return {
      status: "success",
      mock: true,
      notifications: list,
      total: list.length
    };
  }

  return undefined;
}

/**
 * Gatekeeper Profile Mock Handler
 * Source of truth: window.MOCK_GATEKEEPERS_DB.gatekeepers
 * Role and Society Isolation enforced.
 */
async function handleGatekeeperProfileMock(endpoint, options = {}, payload = {}) {
  const normEndpoint = endpoint ? endpoint.split("?")[0] : "";
  if (normEndpoint !== "/v1/gatekeeper/profile") {
    return undefined;
  }

  // 1. Session authentication & role authorization
  const sessionUser = (typeof GrihamAuth !== "undefined" && typeof GrihamAuth.getUser === "function")
    ? GrihamAuth.getUser()
    : null;

  if (!sessionUser) {
    const error = new Error("Unauthorized. Gatekeeper session required.");
    error.status = 401;
    throw error;
  }

  const role = (sessionUser.role || "").toLowerCase();
  if (role !== "gatekeeper") {
    const error = new Error("Forbidden. Profile access is restricted to Gatekeeper role.");
    error.status = 403;
    throw error;
  }

  const sessionSocietyId = (typeof GrihamAuth !== "undefined" && typeof GrihamAuth.getSocietyId === "function" && GrihamAuth.getSocietyId())
    || sessionUser.society_id
    || sessionUser.societyId
    || "GRIHAM-PUNE-001";

  // 2. Canonical gatekeepers database lookup
  if (!window.MOCK_GATEKEEPERS_DB || !Array.isArray(window.MOCK_GATEKEEPERS_DB.gatekeepers)) {
    window.MOCK_GATEKEEPERS_DB = { gatekeepers: [] };
  }

  let gk = window.MOCK_GATEKEEPERS_DB.gatekeepers.find(g => 
    g.id === sessionUser.id && (g.societyId || "").toUpperCase() === sessionSocietyId.toUpperCase()
  );

  if (!gk) {
    // If not found with matching society, verify if ID exists in a foreign society
    const foreignGk = window.MOCK_GATEKEEPERS_DB.gatekeepers.find(g => g.id === sessionUser.id);
    if (foreignGk && (foreignGk.societyId || "").toUpperCase() !== sessionSocietyId.toUpperCase()) {
      const error = new Error("Forbidden. Society isolation violation.");
      error.status = 403;
      throw error;
    }

    // Fallback/sync record for session user
    gk = {
      id: sessionUser.id || "GTK-001",
      type: "gatekeeper",
      name: sessionUser.name || "Amit Sharma",
      phone: sessionUser.phone || "+919876543211",
      email: sessionUser.email || "amit.sharma@example.com",
      societyId: sessionSocietyId,
      joiningDate: "2026-03-01",
      profilePhoto: sessionUser.profilePhoto || null,
      status: sessionUser.status || "Active"
    };
    window.MOCK_GATEKEEPERS_DB.gatekeepers.push(gk);
  }

  // Operation A: GET /v1/gatekeeper/profile
  if (options.method === "GET") {
    return {
      status: "success",
      mock: true,
      profile: {
        id: gk.id,
        type: "gatekeeper",
        name: gk.name,
        phone: gk.phone || "",
        email: gk.email || "",
        societyId: gk.societyId,
        station: sessionUser.station || "Main Gate Security Station",
        joiningDate: gk.joiningDate || "2026-03-01",
        profilePhoto: gk.profilePhoto || null,
        status: gk.status || "Active"
      }
    };
  }

  // Operation B: PUT /v1/gatekeeper/profile
  if (options.method === "PUT") {
    if (!payload.name || typeof payload.name !== "string" || !payload.name.trim()) {
      const error = new Error("Full name is required.");
      error.status = 400;
      throw error;
    }

    if (payload.phone !== undefined && payload.phone !== null && String(payload.phone).trim()) {
      if (typeof GrihamValidation !== "undefined" && typeof GrihamValidation.isValidPhone === "function") {
        if (!GrihamValidation.isValidPhone(payload.phone)) {
          const error = new Error("Please enter a valid phone number (10 to 14 digits).");
          error.status = 400;
          throw error;
        }
      }
    }

    if (payload.email !== undefined && payload.email !== null && String(payload.email).trim()) {
      if (typeof GrihamValidation !== "undefined" && typeof GrihamValidation.isValidEmail === "function") {
        if (!GrihamValidation.isValidEmail(payload.email)) {
          const error = new Error("Please enter a valid email address.");
          error.status = 400;
          throw error;
        }
      }
    }

    // Update canonical record in window.MOCK_GATEKEEPERS_DB
    // Non-editable fields (id, societyId, type, status, joiningDate) are strictly preserved
    gk.name = payload.name.trim();
    if (payload.phone !== undefined) gk.phone = String(payload.phone).trim();
    if (payload.email !== undefined) gk.email = String(payload.email).trim();
    if (payload.profilePhoto !== undefined) gk.profilePhoto = payload.profilePhoto;

    // Synchronize canonical session user without storing large base64 strings in localStorage
    const sessionUpdates = {
      name: gk.name,
      phone: gk.phone,
      email: gk.email
    };
    if (typeof gk.profilePhoto === "string" && !gk.profilePhoto.startsWith("data:")) {
      sessionUpdates.profilePhoto = gk.profilePhoto;
    } else if (gk.profilePhoto === null) {
      sessionUpdates.profilePhoto = null;
    }

    if (typeof GrihamAuth !== "undefined" && typeof GrihamAuth.updateUser === "function") {
      GrihamAuth.updateUser(sessionUpdates);
    }

    return {
      status: "success",
      mock: true,
      message: "Profile updated successfully.",
      profile: {
        id: gk.id,
        type: "gatekeeper",
        name: gk.name,
        phone: gk.phone || "",
        email: gk.email || "",
        societyId: gk.societyId,
        station: sessionUser.station || "Main Gate Security Station",
        joiningDate: gk.joiningDate || "2026-03-01",
        profilePhoto: gk.profilePhoto || null,
        status: gk.status || "Active"
      }
    };
  }

  return undefined;
}

// Chain into canonical window.mockGatekeeperAdapter
const existingGatekeeperAdapter = window.mockGatekeeperAdapter;
window.mockGatekeeperAdapter = async function(endpoint, options, payload) {
  const deliveryResult = await handleDeliveryMock(endpoint, options, payload);
  if (deliveryResult !== undefined) return deliveryResult;

  const notifResult = await handleGatekeeperNotificationMock(endpoint, options, payload);
  if (notifResult !== undefined) return notifResult;

  const profileResult = await handleGatekeeperProfileMock(endpoint, options, payload);
  if (profileResult !== undefined) return profileResult;

  if (typeof existingGatekeeperAdapter === "function") {
    return existingGatekeeperAdapter(endpoint, options, payload);
  }
  return undefined;
};

