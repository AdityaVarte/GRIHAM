const MOCK_AMENITIES_DB = {
  amenities: [
    {
      id: "AMN-001",
      name: "Community Hall",
      description: "Main society community banquet hall for family gatherings, celebrations, and society AGM.",
      location: "Ground Floor, Clubhouse Block",
      capacity: 80,
      opening_time: "08:00",
      closing_time: "22:00",
      booking_duration: 4,
      advance_booking_days: 30,
      requires_approval: true,
      status: "Available",
      icon: "hall",
      rules: "No loud DJ music after 10 PM. Cleaning fee applies if left untidy."
    },
    {
      id: "AMN-002",
      name: "Swimming Pool",
      description: "Semi-olympic temperature-controlled swimming pool with dedicated kids splash area.",
      location: "Clubhouse Terrace, 1st Floor",
      capacity: 20,
      opening_time: "06:00",
      closing_time: "21:00",
      booking_duration: 2,
      advance_booking_days: 14,
      requires_approval: false,
      status: "Available",
      icon: "pool",
      rules: "Proper nylon/lycra swimwear mandatory. Shower before entering."
    },
    {
      id: "AMN-003",
      name: "Society Gym & Fitness",
      description: "Equipped gym with cardiovascular stations, free weights, and stretching mats.",
      location: "Clubhouse, Ground Floor",
      capacity: 15,
      opening_time: "05:30",
      closing_time: "22:00",
      booking_duration: 2,
      advance_booking_days: 7,
      requires_approval: false,
      status: "Available",
      icon: "gym",
      rules: "Wipe down equipment after use. Gym shoes only."
    },
    {
      id: "AMN-004",
      name: "Tennis & Badminton Court",
      description: "All-weather synthetic multisport court with professional floodlighting.",
      location: "Sports Arena, East Wing",
      capacity: 6,
      opening_time: "06:00",
      closing_time: "21:30",
      booking_duration: 1,
      advance_booking_days: 7,
      requires_approval: false,
      status: "Available",
      icon: "court",
      rules: "Non-marking sports shoes compulsory."
    },
    {
      id: "AMN-005",
      name: "Rooftop Party Gazebo",
      description: "Scenic rooftop deck with pergolas, BBQ station, and ambient lighting.",
      location: "Tower B, 14th Floor Roof",
      capacity: 30,
      opening_time: "17:00",
      closing_time: "23:00",
      booking_duration: 3,
      advance_booking_days: 21,
      requires_approval: true,
      status: "Maintenance",
      blocked_reason: "Pergola ceiling weatherproofing and lighting replacement.",
      icon: "gazebo",
      rules: "No fireworks or open flames on timber decking."
    },
    {
      id: "AMN-006",
      name: "Mini Theatre & AV Lounge",
      description: "Acoustically treated 18-seat private cinema with 4K projector and surround sound.",
      location: "Basement 1, Amenities Wing",
      capacity: 18,
      opening_time: "10:00",
      closing_time: "22:00",
      booking_duration: 3,
      advance_booking_days: 14,
      requires_approval: true,
      status: "Available",
      icon: "theatre",
      rules: "No outside hot food or drinks. Leave room tidy."
    }
  ],
  bookings: [
    {
      id: "BK-2026-0041",
      amenity_id: "AMN-001",
      amenity_name: "Community Hall",
      resident_name: "Rajesh Kumar",
      flat: "102",
      wing: "A",
      phone: "+91 9876543210",
      date: "2026-09-17",
      start_time: "08:00",
      end_time: "10:00",
      people_count: 25,
      purpose: "Daughter's 5th Birthday Pooja & Breakfast",
      status: "Approved",
      created_at: "2026-09-14T10:30:00Z",
      approved_at: "2026-09-14T12:00:00Z"
    },
    {
      id: "BK-2026-0042",
      amenity_id: "AMN-001",
      amenity_name: "Community Hall",
      resident_name: "Priya Sharma",
      flat: "204",
      wing: "B",
      phone: "+91 9712345678",
      date: "2026-09-17",
      start_time: "10:30",
      end_time: "12:30",
      people_count: 40,
      purpose: "Classical Music Baithak & Tea Gathering",
      status: "Pending",
      created_at: "2026-09-16T15:45:00Z"
    },
    {
      id: "BK-2026-0043",
      amenity_id: "AMN-001",
      amenity_name: "Community Hall",
      resident_name: "Amit Patil",
      flat: "301",
      wing: "C",
      phone: "+91 9823456789",
      date: "2026-09-17",
      start_time: "15:00",
      end_time: "17:00",
      people_count: 15,
      purpose: "Society Floor Committee Pre-meet",
      status: "Approved",
      created_at: "2026-09-15T09:14:00Z",
      approved_at: "2026-09-15T11:00:00Z"
    },
    {
      id: "BK-2026-0044",
      amenity_id: "AMN-002",
      amenity_name: "Swimming Pool",
      resident_name: "Sunita Krishnan",
      flat: "401",
      wing: "A",
      phone: "+91 9801234567",
      date: "2026-09-17",
      start_time: "07:00",
      end_time: "08:30",
      people_count: 4,
      purpose: "Morning Swimming Session with family",
      status: "Approved",
      created_at: "2026-09-16T18:00:00Z"
    },
    {
      id: "BK-2026-0045",
      amenity_id: "AMN-003",
      amenity_name: "Society Gym & Fitness",
      resident_name: "Arjun Mehta",
      flat: "104",
      wing: "A",
      phone: "+91 9988776655",
      date: "2026-09-17",
      start_time: "06:00",
      end_time: "07:30",
      people_count: 2,
      purpose: "Fitness training",
      status: "Completed",
      created_at: "2026-09-16T19:00:00Z"
    },
    {
      id: "BK-2026-0046",
      amenity_id: "AMN-006",
      amenity_name: "Mini Theatre & AV Lounge",
      resident_name: "Vikram Malhotra",
      flat: "502",
      wing: "D",
      phone: "+91 9811223344",
      date: "2026-09-17",
      start_time: "18:00",
      end_time: "21:00",
      people_count: 12,
      purpose: "Documentary Screening & Discussion",
      status: "Pending",
      created_at: "2026-09-16T14:20:00Z"
    },
    {
      id: "BK-2026-0047",
      amenity_id: "AMN-004",
      amenity_name: "Tennis & Badminton Court",
      resident_name: "Rohan Deshmukh",
      flat: "303",
      wing: "B",
      phone: "+91 9833445566",
      date: "2026-09-17",
      start_time: "17:30",
      end_time: "18:30",
      people_count: 4,
      purpose: "Badminton doubles friendly match",
      status: "Approved",
      created_at: "2026-09-16T20:00:00Z"
    },
    {
      id: "BK-2026-0048",
      amenity_id: "AMN-001",
      amenity_name: "Community Hall",
      resident_name: "Anita Desai",
      flat: "302",
      wing: "B",
      phone: "+91 9711110000",
      date: "2026-09-18",
      start_time: "11:00",
      end_time: "15:00",
      people_count: 50,
      purpose: "Silver Jubilee Anniversary Celebration",
      status: "Approved",
      created_at: "2026-09-12T11:00:00Z"
    },
    {
      id: "BK-2026-0049",
      amenity_id: "AMN-006",
      amenity_name: "Mini Theatre & AV Lounge",
      resident_name: "Deepak Nair",
      flat: "104",
      wing: "D",
      phone: "+91 9899001122",
      date: "2026-09-18",
      start_time: "19:00",
      end_time: "21:30",
      people_count: 15,
      purpose: "Family movie evening",
      status: "Pending",
      created_at: "2026-09-16T16:00:00Z"
    },
    {
      id: "BK-2026-0050",
      amenity_id: "AMN-001",
      amenity_name: "Community Hall",
      resident_name: "Suresh Gupta",
      flat: "404",
      wing: "C",
      phone: "+91 9822334455",
      date: "2026-09-19",
      start_time: "18:00",
      end_time: "21:00",
      people_count: 60,
      purpose: "Family Dinner Reception",
      status: "Cancelled",
      cancel_reason: "Resident rescheduled event",
      created_at: "2026-09-10T12:00:00Z"
    },
    {
      id: "BK-2026-0051",
      amenity_id: "AMN-004",
      amenity_name: "Tennis & Badminton Court",
      resident_name: "Karan Johar",
      flat: "201",
      wing: "A",
      phone: "+91 9733445566",
      date: "2026-09-16",
      start_time: "07:00",
      end_time: "08:00",
      people_count: 2,
      purpose: "Tennis practice",
      status: "Completed",
      created_at: "2026-09-15T10:00:00Z"
    },
    {
      id: "BK-2026-0052",
      amenity_id: "AMN-001",
      amenity_name: "Community Hall",
      resident_name: "Rohit Verma",
      flat: "601",
      wing: "E",
      phone: "+91 9600001234",
      date: "2026-09-15",
      start_time: "14:00",
      end_time: "18:00",
      people_count: 35,
      purpose: "Product launch meet",
      status: "Rejected",
      rejection_reason: "Commercial product events not permitted in society hall without AGM approval.",
      created_at: "2026-09-14T09:00:00Z"
    },
    {
      id: "BK-2026-0089",
      amenity_id: "AMN-001",
      amenity_name: "Community Hall",
      resident_name: "Rajesh Kumar",
      flat: "204",
      wing: "A",
      phone: "+91 9876543210",
      date: "2026-09-22",
      start_time: "16:00",
      end_time: "18:00",
      people_count: 20,
      purpose: "Family Anniversary Celebration & High Tea",
      status: "Approved",
      created_at: "2026-09-18T10:00:00Z",
      approved_at: "2026-09-18T11:00:00Z"
    }
  ],
  residentsList: [
    { name: "Rajesh Kumar", wing: "A", flat: "204", phone: "+91 9876543210" },
    { name: "Priya Sharma", wing: "B", flat: "204", phone: "+91 9712345678" },
    { name: "Amit Patil", wing: "C", flat: "301", phone: "+91 9823456789" },
    { name: "Sunita Krishnan", wing: "A", flat: "401", phone: "+91 9801234567" },
    { name: "Arjun Mehta", wing: "A", flat: "104", phone: "+91 9988776655" },
    { name: "Vikram Malhotra", wing: "D", flat: "502", phone: "+91 9811223344" },
    { name: "Rohan Deshmukh", wing: "B", flat: "303", phone: "+91 9833445566" },
    { name: "Anita Desai", wing: "B", flat: "302", phone: "+91 9711110000" },
    { name: "Deepak Nair", wing: "D", flat: "104", phone: "+91 9899001122" },
    { name: "Kavitha Sharma", wing: "C", flat: "501", phone: "+91 9712345678" },
  ],
  nextAmenityId: 7,
  nextBookingId: 90
};

window.MOCK_AMENITIES_DB = MOCK_AMENITIES_DB;

/**
 * Dedicated mock adapter for Amenity & Booking operations (Resident & Admin)
 */
window.mockAmenitiesAdapter = async function(endpoint, options = {}, payload = {}) {
  const method = (options.method || "GET").toUpperCase();

  // 1. GET: Resident Amenities List
  if ((endpoint === API_CONFIG.ENDPOINTS.RESIDENT_AMENITIES || endpoint.startsWith(API_CONFIG.ENDPOINTS.RESIDENT_AMENITIES + "?")) && method === "GET") {
    const list = [...MOCK_AMENITIES_DB.amenities];
    const total = list.length;
    const available = list.filter(a => a.status === "Available").length;
    const maintenance = list.filter(a => a.status === "Maintenance").length;

    return {
      status: "success",
      mock: true,
      amenities: list,
      total,
      summary: {
        total,
        available,
        maintenance
      }
    };
  }

  // 2. GET: Resident Amenity Availability by Date
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.RESIDENT_AMENITIES + "/") && endpoint.includes("/availability") && method === "GET") {
    const parts = endpoint.split("/");
    const availIdx = parts.indexOf("availability");
    const amenityId = parts[availIdx - 1];

    const amn = MOCK_AMENITIES_DB.amenities.find(a => a.id === amenityId);
    if (!amn) {
      const err = new Error("Amenity not found");
      err.status = 404;
      throw err;
    }

    let dateParam = "2026-09-17";
    try {
      const urlObj = new URL("http://localhost" + endpoint);
      dateParam = urlObj.searchParams.get("date") || dateParam;
    } catch (_) {}

    const activeBookings = MOCK_AMENITIES_DB.bookings.filter(b =>
      b.amenity_id === amn.id &&
      b.date === dateParam &&
      (b.status === "Approved" || b.status === "Pending")
    );

    const bookedSlots = activeBookings.map(b => ({
      id: b.id,
      start_time: b.start_time,
      end_time: b.end_time,
      status: b.status
    }));

    return {
      status: "success",
      mock: true,
      amenity_id: amn.id,
      name: amn.name,
      date: dateParam,
      opening_time: amn.opening_time,
      closing_time: amn.closing_time,
      booking_duration: amn.booking_duration,
      status: amn.status,
      is_available: amn.status === "Available",
      booked_slots: bookedSlots
    };
  }

  // 3. GET: Resident Amenity Detail
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.RESIDENT_AMENITIES + "/") && !endpoint.includes("/bookings") && !endpoint.includes("/availability") && method === "GET") {
    const amenityId = endpoint.split("/").pop();
    const amn = MOCK_AMENITIES_DB.amenities.find(a => a.id === amenityId);
    if (!amn) {
      const err = new Error("Amenity not found");
      err.status = 404;
      throw err;
    }

    return {
      status: "success",
      mock: true,
      amenity: amn
    };
  }

  // 4. GET: Resident Bookings List (Authenticated Resident Only)
  if ((endpoint === API_CONFIG.ENDPOINTS.RESIDENT_AMENITY_BOOKINGS || endpoint.startsWith(API_CONFIG.ENDPOINTS.RESIDENT_AMENITY_BOOKINGS + "?")) && method === "GET") {
    const sessionUser = (typeof GrihamAuth !== "undefined" && GrihamAuth.getUser()) ||
                        (typeof GrihamState !== "undefined" && GrihamState.currentUser) || {};
    const residentName = (sessionUser.name || "Rajesh Kumar").toLowerCase();
    const residentFlat = String(sessionUser.flat || sessionUser.flatNumber || "204");
    const residentWing = sessionUser.wing || "A";

    const myBookings = MOCK_AMENITIES_DB.bookings.filter(b => {
      const matchName = b.resident_name && b.resident_name.toLowerCase() === residentName;
      const matchUnit = b.wing === residentWing && String(b.flat) === residentFlat;
      const matchId = b.resident_id && sessionUser.id && b.resident_id === sessionUser.id;
      return matchName || matchUnit || matchId;
    });

    // Sort: newest dates and start times first
    myBookings.sort((a, b) => {
      const cmpDate = (b.date || "").localeCompare(a.date || "");
      if (cmpDate !== 0) return cmpDate;
      return (b.start_time || "").localeCompare(a.start_time || "");
    });

    const activeCount = myBookings.filter(b => b.status === "Approved" || b.status === "Pending").length;
    const completedCount = myBookings.filter(b => b.status === "Completed").length;

    return {
      status: "success",
      mock: true,
      bookings: myBookings,
      total: myBookings.length,
      summary: {
        total: myBookings.length,
        active: activeCount,
        completed: completedCount
      }
    };
  }

  // 5. GET: Resident Single Booking Detail
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.RESIDENT_AMENITY_BOOKINGS + "/") && !endpoint.includes("/cancel") && method === "GET") {
    const bookingId = endpoint.split("/").pop();
    const item = MOCK_AMENITIES_DB.bookings.find(b => b.id === bookingId);
    if (!item) {
      const err = new Error("Booking not found");
      err.status = 404;
      throw err;
    }
    return {
      status: "success",
      mock: true,
      booking: item
    };
  }

  // 6. POST: Resident Create Amenity Booking
  if (endpoint === API_CONFIG.ENDPOINTS.RESIDENT_AMENITY_BOOKINGS && method === "POST") {
    const sessionUser = (typeof GrihamAuth !== "undefined" && GrihamAuth.getUser()) ||
                        (typeof GrihamState !== "undefined" && GrihamState.currentUser) || {};
    const approval = (sessionUser.approvalStatus || sessionUser.approval || "Approved").toLowerCase();

    // Approval guard check
    if (approval === "pending") {
      const err = new Error("Booking amenities is disabled while your registration is pending approval.");
      err.status = 403;
      err.code = "REGISTRATION_PENDING";
      throw err;
    }
    if (approval === "rejected") {
      const err = new Error("Registration not approved. Please contact society administration.");
      err.status = 403;
      err.code = "REGISTRATION_REJECTED";
      throw err;
    }

    const { amenity_id, date, start_time, end_time, people_count, purpose } = payload;
    if (!amenity_id || !date || !start_time || !end_time) {
      const err = new Error("Please fill in all required booking fields (Amenity, Date, Start Time, End Time).");
      err.status = 400;
      throw err;
    }

    const amn = MOCK_AMENITIES_DB.amenities.find(a => a.id === amenity_id);
    if (!amn) {
      const err = new Error("Selected amenity not found.");
      err.status = 404;
      throw err;
    }

    if (amn.status === "Maintenance" || amn.status === "Disabled") {
      const err = new Error(`${amn.name} is currently under ${amn.status}. Bookings are closed.`);
      err.status = 400;
      err.code = "AMENITY_BLOCKED";
      throw err;
    }

    // Operating hours check
    if (start_time < amn.opening_time || end_time > amn.closing_time || start_time >= end_time) {
      const err = new Error(`Selected timing must be within operating hours (${amn.opening_time} – ${amn.closing_time}).`);
      err.status = 400;
      throw err;
    }

    // Max duration check
    const [sh, sm] = start_time.split(":").map(Number);
    const [eh, em] = end_time.split(":").map(Number);
    const durationHours = (eh * 60 + em - (sh * 60 + sm)) / 60;
    if (durationHours > amn.booking_duration) {
      const err = new Error(`Maximum booking duration for ${amn.name} is ${amn.booking_duration} hours.`);
      err.status = 400;
      throw err;
    }

    // Capacity check
    const guests = parseInt(people_count, 10) || 1;
    if (guests > amn.capacity) {
      const err = new Error(`Guest count exceeds maximum capacity of ${amn.capacity} people.`);
      err.status = 400;
      throw err;
    }

    // INTERVAL CONFLICT CHECK:
    // Overlap condition: newStart < existingEnd AND newEnd > existingStart
    const newStart = start_time;
    const newEnd = end_time;

    const activeBookings = MOCK_AMENITIES_DB.bookings.filter(b =>
      b.amenity_id === amenity_id &&
      b.date === date &&
      (b.status === "Approved" || b.status === "Pending")
    );

    const conflictingBooking = activeBookings.find(b => {
      return (newStart < b.end_time && newEnd > b.start_time);
    });

    if (conflictingBooking) {
      const err = new Error(`Time slot conflict: already booked from ${conflictingBooking.start_time} to ${conflictingBooking.end_time}.`);
      err.status = 409;
      err.code = "BOOKING_CONFLICT";
      err.conflict = conflictingBooking;
      throw err;
    }

    const bookingStatus = amn.requires_approval ? "Pending" : "Approved";
    const newBooking = {
      id: `BK-2026-${String(MOCK_AMENITIES_DB.nextBookingId++).padStart(4, "0")}`,
      amenity_id: amn.id,
      amenity_name: amn.name,
      resident_id: sessionUser.id || "USR-001",
      resident_name: sessionUser.name || "Rajesh Kumar",
      flat: String(sessionUser.flat || sessionUser.flatNumber || "204"),
      wing: sessionUser.wing || "A",
      phone: sessionUser.phone || "+91 9876543210",
      date: date,
      start_time: start_time,
      end_time: end_time,
      people_count: guests,
      purpose: (purpose || "Amenity Booking").trim(),
      status: bookingStatus,
      created_at: new Date().toISOString(),
      approved_at: amn.requires_approval ? null : new Date().toISOString()
    };

    MOCK_AMENITIES_DB.bookings.unshift(newBooking);

    return {
      status: "success",
      mock: true,
      message: `Amenity booking ${newBooking.id} created successfully!`,
      booking: newBooking
    };
  }

  // 7. PUT: Resident Cancel Booking
  if ((endpoint === API_CONFIG.ENDPOINTS.RESIDENT_AMENITY_BOOKING_CANCEL || (endpoint.startsWith(API_CONFIG.ENDPOINTS.RESIDENT_AMENITY_BOOKINGS + "/") && endpoint.endsWith("/cancel"))) && method === "PUT") {
    let bookingId = payload.booking_id;
    if (!bookingId) {
      const parts = endpoint.split("/");
      const cancelIdx = parts.indexOf("cancel");
      if (cancelIdx > 0) bookingId = parts[cancelIdx - 1];
    }

    const booking = MOCK_AMENITIES_DB.bookings.find(b => b.id === bookingId);
    if (!booking) {
      const err = new Error("Booking not found");
      err.status = 404;
      throw err;
    }

    if (booking.status === "Cancelled" || booking.status === "Rejected" || booking.status === "Completed") {
      const err = new Error(`Cannot cancel a booking that is ${booking.status}.`);
      err.status = 400;
      throw err;
    }

    booking.status = "Cancelled";
    booking.cancel_reason = payload.reason || "Cancelled by resident";
    booking.cancelled_at = new Date().toISOString();

    return {
      status: "success",
      mock: true,
      message: `Booking ${booking.id} cancelled successfully.`,
      booking
    };
  }

  return undefined;
};

