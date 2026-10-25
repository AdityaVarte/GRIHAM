/**
 * GRIHAM FRONTEND - MOCK RESIDENT DATABASE
 * Society: Green Valley Residency (GRIHAM-PUNE-001)
 */

window.MOCK_RESIDENTS_DB = {
  profile: {
    id: "USR-001",
    role: "resident",
    name: "Rajesh Kumar",
    phone: "+919876543210",
    email: "rajesh.kumar@example.com",
    societyId: "GRIHAM-PUNE-001",
    societyName: "Green Valley Residency",
    wing: "A",
    flatNumber: "204",
    floorNumber: 2,
    occupancyType: "Owner",
    approvalStatus: "Approved", // "Approved", "Pending", "Rejected"
    profilePhoto: null
  },

  chairman: {
    name: "Rajesh Verma",
    role: "Society Chairman",
    phone: "+919876543210",
    email: "chairman@greenvalley.res",
    officeHours: "6:00 PM – 8:00 PM (Mon – Sat)",
    officeLocation: "Tower A, Ground Floor Society Office",
    availabilityNote: "Available on phone for urgent community concerns."
  },

  waterStatus: {
    status: "Normal Supply",
    indicator: "normal", // "normal", "interrupted", "maintenance"
    schedule: "6:00 AM – 10:00 AM & 5:00 PM – 9:00 PM",
    nextUpdate: "Today, 6:00 PM",
    tankLevel: "85% (Main Overhead Reservoir)",
    note: "Municipal water supply normal. Adequate storage in overhead tanks."
  },

  recentActivity: {
    maintenance: {
      month: "September 2026",
      amount: 3500,
      status: "Due", // "Due" or "Paid"
      dueDate: "25 Sep 2026",
      lastPaid: "1 Aug 2026 (₹3,500 via UPI)"
    },
    complaint: {
      id: "CMP-2026-0042",
      title: "Water pressure low in master bath",
      category: "Plumbing",
      status: "In Progress",
      date: "Yesterday, 4:30 PM",
      assignee: "Suresh Patil (Plumber)"
    },
    serviceRequest: {
      id: "SR-2026-0019",
      serviceName: "AC Coil Cleaning & Checkup",
      status: "Scheduled",
      scheduledTime: "Tomorrow, 11:00 AM",
      vendor: "CoolBreeze AMC"
    },
    amenityBooking: {
      id: "BK-2026-0089",
      amenityName: "Clubhouse Multi-purpose Hall",
      date: "22 Sep 2026",
      timeSlot: "4:00 PM – 6:00 PM",
      status: "Confirmed"
    }
  },

  notifications: [
    {
      id: "NOTIF-RES-01",
      title: "Water Supply Normal",
      message: "Evening supply will be active from 5:00 PM to 9:00 PM. Overhead tanks are at 85%.",
      time: "1 hour ago",
      unread: true,
      category: "Utility"
    },
    {
      id: "NOTIF-RES-02",
      title: "September Maintenance Dues",
      message: "Maintenance bill for September (₹3,500) has been generated. Due date: 25 Sep 2026.",
      time: "1 day ago",
      unread: true,
      category: "Finance"
    },
    {
      id: "NOTIF-RES-03",
      title: "Society General Meeting",
      message: "Annual General Body meeting will be held on Sunday, 27 Sep at 10:30 AM in the Clubhouse.",
      time: "3 days ago",
      unread: false,
      category: "Community"
    }
  ]
};

console.info("[Mock Resident DB] Initialized with resident profile and society info.");
