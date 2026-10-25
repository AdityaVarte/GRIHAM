

window.MOCK_ADMIN_PROFILE_DB = {
  profile: {
    id: "ADM-001",
    role: "admin",
    name: "Rajesh Kumar",
    phone: "+919876543210",
    email: "admin@example.com",
    societyId: "GRIHAM-PUNE-001",
    profilePhoto: null
  },
  society: {
    societyId: "GRIHAM-PUNE-001",
    name: "Griham Residency",
    address: "Baner",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411045",
    totalWings: 4,
    totalFlats: 240,
    adminName: "Rajesh Kumar"
  }
};

const MOCK_ADMIN_PROFILE_DB = window.MOCK_ADMIN_PROFILE_DB;

/**
 * CANONICAL NOTIFICATIONS, POLLS, PROPOSALS & VOTES STORE
 * Single authoritative source shared between Admin and Resident portals.
 */
window.MOCK_NOTIFICATIONS_DB = {
  notifications: [
    {
      id: "notif-1",
      type: "message",
      title: "Water supply update",
      message: "Scheduled maintenance of the overhead water tank will take place between 2 PM and 5 PM today. Kindly store adequate water.",
      category: "Water",
      priority: "Important",
      target: "All Residents",
      target_audience: "all",
      created_at: "Today, 9:30 AM",
      status: "Sent",
      society_id: "GRIHAM-PUNE-001",
      read_by: []
    },
    {
      id: "notif-2",
      type: "poll",
      title: "Weekend cleanup timing",
      question: "What time works best for the community garden & cleanup drive this Sunday?",
      category: "General",
      priority: "Normal",
      target: "All Residents",
      target_audience: "all",
      created_at: "Yesterday",
      status: "Active",
      deadline: "2026-10-15T20:00:00",
      allow_multiple: false,
      society_id: "GRIHAM-PUNE-001",
      read_by: [],
      options: [
        { id: "opt-1", text: "7:00 AM - 9:00 AM", votes: 42, pct: 60 },
        { id: "opt-2", text: "4:00 PM - 6:00 PM", votes: 28, pct: 40 }
      ],
      voters: [
        { resident_id: "USR-002", resident_name: "Priya Shah", wing: "B", flat: "204", selected_options: ["7:00 AM - 9:00 AM"], voted_at: "2026-09-25T10:00:00" }
      ]
    },
    {
      id: "notif-3",
      type: "proposal",
      title: "New security camera installation",
      description: "Upgrade our surveillance coverage to eliminate blind spots in visitor parking and basement lifts across Wing A and B.",
      reason: "Recent vehicle scratches and unauthorized entries reported in basement -2.",
      category: "Society Decision",
      priority: "Normal",
      target: "All Residents",
      target_audience: "all",
      created_at: "2 days ago",
      status: "Closed",
      deadline: "2026-09-24T23:59:59",
      society_id: "GRIHAM-PUNE-001",
      read_by: [],
      options: [
        { id: "prop-yes", text: "YES", votes: 61, pct: 78 },
        { id: "prop-no", text: "NO", votes: 17, pct: 22 }
      ],
      voters: [
        { resident_id: "USR-003", resident_name: "Vikram Malhotra", wing: "C", flat: "501", selected_options: ["YES"], voted_at: "2026-09-23T11:00:00" }
      ]
    },
    {
      id: "notif-4",
      type: "message",
      title: "Lift Maintenance in Wing C",
      message: "Passenger lift #2 in Wing C will undergo quarterly servicing tomorrow between 10 AM and 1 PM.",
      category: "Maintenance",
      priority: "Normal",
      target: "Selected Wing (Wing C)",
      target_audience: "wing",
      target_wing: "Wing C",
      created_at: "3 days ago",
      status: "Sent",
      society_id: "GRIHAM-PUNE-001",
      read_by: []
    },
    {
      id: "notif-5",
      type: "poll",
      title: "Wing A Lobby Renovation Color",
      question: "Which accent wall color scheme would Wing A residents prefer for the ground floor elevator lobby?",
      category: "Maintenance",
      priority: "Important",
      target: "Selected Wing (Wing A)",
      target_audience: "wing",
      target_wing: "Wing A",
      created_at: "Today, 8:00 AM",
      status: "Active",
      deadline: "2026-10-20T20:00:00",
      allow_multiple: true,
      max_options: 2,
      society_id: "GRIHAM-PUNE-001",
      read_by: [],
      options: [
        { id: "opt-w1", text: "Warm Terracotta & Sand", votes: 12, pct: 50 },
        { id: "opt-w2", text: "Cool Sage & Linen", votes: 8, pct: 33 },
        { id: "opt-w3", text: "Classic Slate & Cream", votes: 4, pct: 17 }
      ],
      voters: []
    },
    {
      id: "notif-6",
      type: "proposal",
      title: "Solar Rooftop Panel Installation",
      description: "Installation of a 25kW captive grid solar rooftop system on Clubhouse and Tower A to reduce common-area electricity billing by 45%.",
      reason: "Common area electricity tariff increases and subsidy available under Renewable Housing scheme.",
      category: "Society Decision",
      priority: "Normal",
      target: "All Residents",
      target_audience: "all",
      created_at: "Yesterday, 11:00 AM",
      status: "Active",
      deadline: "2026-10-25T18:00:00",
      society_id: "GRIHAM-PUNE-001",
      read_by: [],
      options: [
        { id: "prop-yes", text: "YES", votes: 34, pct: 85 },
        { id: "prop-no", text: "NO", votes: 6, pct: 15 }
      ],
      voters: []
    },
    {
      id: "notif-7",
      type: "message",
      title: "Visitor & Delivery Verification Protocol",
      message: "Security Notice: All courier delivery personnel must present valid ID. Pre-approved visitors must have matching pass codes before granting entry.",
      category: "Security",
      priority: "Important",
      target: "Gatekeepers & Security Staff",
      target_audience: "gatekeepers",
      created_at: "Today, 7:15 AM",
      status: "Sent",
      society_id: "GRIHAM-PUNE-001",
      read_by: []
    },
    {
      id: "notif-8",
      type: "message",
      title: "Night Shift Gate Lock Procedure",
      message: "From 11:00 PM to 5:00 AM, the secondary gate will remain bolted. All night traffic must be routed through Main Gate Station 1 with vehicle log entries.",
      category: "Operations",
      priority: "Normal",
      target: "Gatekeepers",
      target_audience: "gatekeepers",
      created_at: "Yesterday, 6:00 PM",
      status: "Sent",
      society_id: "GRIHAM-PUNE-001",
      read_by: ["GTK-001"]
    },
    {
      id: "notif-9",
      type: "message",
      title: "Mumbai Society Intercom Maintenance",
      message: "Security intercom lines in Mumbai society undergoing testing.",
      category: "Security",
      priority: "Normal",
      target: "Gatekeepers",
      target_audience: "gatekeepers",
      created_at: "Today, 10:00 AM",
      status: "Sent",
      society_id: "GRIHAM-MUMBAI-002",
      read_by: []
    }
  ]
};

