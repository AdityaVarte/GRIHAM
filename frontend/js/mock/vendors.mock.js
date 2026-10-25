// Mock Database for Vendors and Gatekeepers
// Society-Aware Staff & Provider Management

const MOCK_VENDORS_DB = {
  vendors: [
    {
      id: "VEN-001",
      type: "vendor",
      name: "Ramesh Plumbing Services",
      contactPerson: "Ramesh Kumar",
      category: "Plumbing",
      phone: "+919812345678",
      email: "ramesh@example.com",
      address: "Shop 12, Market Yard, Pune",
      serviceDescription: "Residential pipeline repair, faucet fixing, water tank maintenance",
      societyId: "GRIHAM-PUNE-001",
      addedDate: "2026-02-10",
      status: "Active"
    },
    {
      id: "VEN-002",
      type: "vendor",
      name: "Volts & Amps Electrical AMC",
      contactPerson: "Santosh Shinde",
      category: "Electrical",
      phone: "+919877012345",
      email: "contact@voltsamps.in",
      address: "45 Sinhagad Road, Pune",
      serviceDescription: "Society transformer, generator AMC, streetlights and wiring repair",
      societyId: "GRIHAM-PUNE-001",
      addedDate: "2026-01-20",
      status: "Active"
    },
    {
      id: "VEN-003",
      type: "vendor",
      name: "CleanPro Housekeeping Services",
      contactPerson: "Sunita Deshmukh",
      category: "Cleaning",
      phone: "+919822099887",
      email: "service@cleanpro.com",
      address: "B-4 Commercial Complex, Kothrud, Pune",
      serviceDescription: "Daily common area cleaning, lobby sanitization, waste collection",
      societyId: "GRIHAM-PUNE-001",
      addedDate: "2025-11-15",
      status: "Active"
    },
    {
      id: "VEN-004",
      type: "vendor",
      name: "SecureEye Systems & CCTV",
      contactPerson: "Kavita Rao",
      category: "Security",
      phone: "+919811122334",
      email: "info@secureeye.co.in",
      address: "102 IT Park, Hinjewadi, Pune",
      serviceDescription: "CCTV surveillance, automated boom barriers, video door phone AMC",
      societyId: "GRIHAM-PUNE-001",
      addedDate: "2026-02-01",
      status: "Active"
    },
    {
      id: "VEN-005",
      type: "vendor",
      name: "GreenThumb Landscaping",
      contactPerson: "Mahesh Patil",
      category: "Gardening",
      phone: "+919890012345",
      email: "mahesh@greenthumb.org",
      address: "Alandi Road, Pune",
      serviceDescription: "Lawn upkeep, tree trimming, seasonal flower plantation, drip irrigation",
      societyId: "GRIHAM-PUNE-001",
      addedDate: "2026-01-05",
      status: "Active"
    },
    {
      id: "VEN-006",
      type: "vendor",
      name: "Apex Lift Solutions AMC",
      contactPerson: "Ganesh Kulkarni",
      category: "Maintenance",
      phone: "+919845011223",
      email: "support@apexlifts.com",
      address: "Industrial Area, Bhosari, Pune",
      serviceDescription: "Elevator routine monthly servicing, breakdown callouts, safety certifications",
      societyId: "GRIHAM-PUNE-001",
      addedDate: "2025-10-10",
      status: "Active"
    },
    {
      id: "VEN-007",
      type: "vendor",
      name: "PestShield Terminators AMC",
      contactPerson: "Deepak Verma",
      category: "Cleaning",
      phone: "+919833211223",
      email: "deepak@pestshield.in",
      address: "Camp Area, Pune",
      serviceDescription: "Bi-monthly society cockroach, mosquito fogging, termite eradication",
      societyId: "GRIHAM-PUNE-001",
      addedDate: "2026-02-18",
      status: "Inactive"
    },
    {
      id: "VEN-008",
      type: "vendor",
      name: "Reliable City Solutions",
      contactPerson: "Vikram Jadhav",
      category: "Other",
      phone: "+919899054321",
      email: "vikram@reliablecity.com",
      address: "FC Road, Shivajinagar, Pune",
      serviceDescription: "General society equipment repairs, civil touch-ups, gate welding",
      societyId: "GRIHAM-PUNE-001",
      addedDate: "2025-12-01",
      status: "Active"
    }
  ],
  nextId: 9
};

const MOCK_GATEKEEPERS_DB = {
  gatekeepers: [
    {
      id: "GTK-001",
      type: "gatekeeper",
      name: "Amit Sharma",
      phone: "+919876543211",
      email: "amit.sharma@example.com",
      societyId: "GRIHAM-PUNE-001",
      joiningDate: "2026-03-01",
      profilePhoto: null,
      status: "Active"
    },
    {
      id: "GTK-002",
      type: "gatekeeper",
      name: "Baban Gaikwad",
      phone: "+919822334411",
      email: "baban.gaikwad@example.com",
      societyId: "GRIHAM-PUNE-001",
      joiningDate: "2025-08-14",
      profilePhoto: null,
      status: "Active"
    },
    {
      id: "GTK-003",
      type: "gatekeeper",
      name: "Dnyaneshwar More",
      phone: "+919850123412",
      email: "",
      societyId: "GRIHAM-PUNE-001",
      joiningDate: "2025-12-01",
      profilePhoto: null,
      status: "Active"
    },
    {
      id: "GTK-004",
      type: "gatekeeper",
      name: "Raju Bhosale",
      phone: "+919860987654",
      email: "raju.b@example.com",
      societyId: "GRIHAM-PUNE-001",
      joiningDate: "2024-05-10",
      profilePhoto: null,
      status: "Inactive"
    },
    {
      id: "GTK-005",
      type: "gatekeeper",
      name: "Santosh Mane",
      phone: "+919821876543",
      email: "santosh.mane@example.com",
      societyId: "GRIHAM-PUNE-001",
      joiningDate: "2026-01-11",
      profilePhoto: null,
      status: "Active"
    },
    {
      id: "GTK-006",
      type: "gatekeeper",
      name: "Kishore Pandhare",
      phone: "+919823456799",
      email: "",
      societyId: "GRIHAM-MUMBAI-002",
      joiningDate: "2026-02-15",
      profilePhoto: null,
      status: "Active"
    }
  ],
  nextId: 7
};

window.MOCK_VENDORS_DB = MOCK_VENDORS_DB;
window.MOCK_GATEKEEPERS_DB = MOCK_GATEKEEPERS_DB;
