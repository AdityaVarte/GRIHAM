// Mock Data & Adapter: serviceRequests.mock.js
// Dedicated mock dataset and adapter for Service Requests

const MOCK_SERVICE_CATALOG = [
  {
    id: "cat-plumbing",
    category: "Plumbing",
    name: "Plumbing & Sanitary",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    desc: "Tap leaks, drainage, pipe blockage, flush valve",
    estimatedRate: "From ₹250",
    popularItems: [
      "Tap / Faucet Leak Repair",
      "Kitchen Sink Drainage Blockage",
      "Toilet Cistern / Flush Tank Repair",
      "Concealed Pipe Seepage Inspection"
    ]
  },
  {
    id: "cat-electrical",
    category: "Electrical",
    name: "Electrical Repairs",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    desc: "Short circuits, wiring, fans, lights, MCB tripping",
    estimatedRate: "From ₹200",
    popularItems: [
      "Switch / Socket Replacement (16A / 6A)",
      "Ceiling Fan Speed Regulator Repair",
      "MCB Tripping & Short Circuit Fix",
      "Tube Light & Foyer LED Strip Fitting"
    ]
  },
  {
    id: "cat-appliance",
    category: "Appliance Repair",
    name: "AC & Appliance Service",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="6" y1="8" x2="6" y2="8"/><line x1="6" y1="16" x2="6" y2="16"/></svg>`,
    desc: "AC coil cleaning, gas checkup, washing machine, geyser",
    estimatedRate: "From ₹499",
    popularItems: [
      "AC Deep Coil Cleaning & Gas Check",
      "Water Heater / Geyser Thermostat Repair",
      "Washing Machine Inlet Vibration",
      "Microwave & Refrigerator Checkup"
    ]
  },
  {
    id: "cat-cleaning",
    category: "Cleaning",
    name: "Home & Deep Cleaning",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    desc: "Balcony glass, bathroom deep clean, sofa sanitization",
    estimatedRate: "From ₹599",
    popularItems: [
      "Balcony French Windows & Grill Wash",
      "Bathroom Floor & Tile Acid Scrubbing",
      "Kitchen Exhaust & Chimney Degreasing",
      "Sofa & Mattress Vacuum Sanitization"
    ]
  },
  {
    id: "cat-carpentry",
    category: "Carpentry",
    name: "Carpentry & Furniture",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l-3-3Z"/></svg>`,
    desc: "Door locks, sliding rails, hinges, wardrobe repairs",
    estimatedRate: "From ₹300",
    popularItems: [
      "Sliding Balcony Door Track Alignment",
      "Main Door Smart Lock / Latch Fitting",
      "Wardrobe Drawer Slide & Hinge Fix",
      "Wooden Furniture Joint Tightening"
    ]
  },
  {
    id: "cat-pest",
    category: "Pest Control",
    name: "Pest Control Services",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="6"/><path d="M12 6V2"/><path d="M12 22v-4"/><path d="M6 12H2"/><path d="M22 12h-4"/><path d="m4.93 4.93 2.83 2.83"/><path d="m16.24 16.24 2.83 2.83"/><path d="m4.93 19.07 2.83-2.83"/><path d="m16.24 7.76 2.83-2.83"/></svg>`,
    desc: "Cockroach gel baiting, termite inspection, bedbugs",
    estimatedRate: "From ₹650",
    popularItems: [
      "Herbal Cockroach Gel Treatment",
      "Modular Kitchen Termite Inspection",
      "Mosquito & Drain Fly Fogging",
      "General Pest Spray Treatment"
    ]
  },
  {
    id: "cat-other",
    category: "Other",
    name: "Civil & General Society",
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
    desc: "Masonry patchup, digital doorbell, painting touchups",
    estimatedRate: "From ₹350",
    popularItems: [
      "Wall Tile Patchwork & Grouting",
      "Digital Doorbell / Intercom Wiring",
      "Ceiling Waterproofing Seepage Check",
      "Curtain Rod & Wall Mount Drilling"
    ]
  }
];

window.MOCK_SERVICE_CATALOG = MOCK_SERVICE_CATALOG;

const MOCK_SERVICE_REQUESTS_DB = {
  nextId: 52,
  catalog: MOCK_SERVICE_CATALOG,
  summary: {
    total: 19,
    requested: 5,
    assigned: 5,
    in_progress: 6,
    completed: 3,
    cancelled: 2
  },
  requests: [
    {
      id: "SR-2026-0019",
      category: "Appliance Repair",
      title: "AC Coil Cleaning & Checkup",
      description: "Pre-festival annual AC deep cleaning, blower coil washing, and refrigerant gas pressure check.",
      residentId: "USR-001",
      residentName: "Rajesh Kumar",
      wing: "A",
      flatNumber: "204",
      phone: "+91 9876543210",
      requestedAt: "2026-09-20T10:00:00",
      preferredDate: "2026-09-25",
      preferredStartTime: "11:00",
      preferredEndTime: "13:00",
      scheduledDate: "2026-09-25",
      scheduledStartTime: "11:00",
      scheduledEndTime: "13:00",
      priority: "Normal",
      status: "Scheduled",
      assignedProviderId: "vendor-app-1",
      assignedProviderName: "CoolBreeze AMC & Services",
      assignedProviderType: "Vendor",
      assignedProviderPhone: "+91 98112 44556",
      quotedCost: "₹750",
      attachments: [],
      history: [
        { timestamp: "20 Sep 2026 • 10:00 AM", title: "Request created by Rajesh Kumar", note: "AC coil servicing requested" },
        { timestamp: "20 Sep 2026 • 11:30 AM", title: "Admin scheduled CoolBreeze AMC & Services", note: "Scheduled for 25 Sep • 11:00 AM" }
      ]
    },
    {
      id: "SR-2026-0050",
      category: "Plumbing",
      title: "Kitchen sink drainage blockage",
      description: "Severe grease and food waste clogging causing kitchen sink backflow into cabinet.",
      residentId: "USR-002",
      residentName: "Priya Sharma",
      wing: "B",
      flatNumber: "204",
      phone: "+91 9712345678",
      requestedAt: "2026-09-18T08:30:00",
      preferredDate: "2026-09-18",
      preferredStartTime: "11:00",
      preferredEndTime: "13:00",
      scheduledDate: null,
      scheduledStartTime: null,
      scheduledEndTime: null,
      priority: "Urgent",
      status: "Requested",
      assignedProviderId: null,
      assignedProviderName: null,
      assignedProviderType: null,
      assignedProviderPhone: null,
      attachments: [
        { name: "sink_overflow.jpg", type: "Photo", size: "1.2 MB", url: "" }
      ],
      history: [
        { timestamp: "18 Sep 2026 • 08:30 AM", title: "Request created by Priya Sharma", note: "Marked Urgent due to overflow" }
      ]
    },
    {
      id: "SR-2026-0049",
      category: "Electrical",
      title: "Main circuit breaker tripping intermittently",
      description: "Living room and kitchen lights cut off every 20 minutes when refrigerator compressor starts.",
      residentId: "USR-003",
      residentName: "Amit Patil",
      wing: "C",
      flatNumber: "301",
      phone: "+91 9823456789",
      requestedAt: "2026-09-18T07:45:00",
      preferredDate: "2026-09-18",
      preferredStartTime: "14:00",
      preferredEndTime: "16:00",
      scheduledDate: null,
      scheduledStartTime: null,
      scheduledEndTime: null,
      priority: "Urgent",
      status: "Requested",
      assignedProviderId: null,
      assignedProviderName: null,
      assignedProviderType: null,
      assignedProviderPhone: null,
      attachments: [
        { name: "mcb_trip_spark.mp4", type: "Video", size: "2.8 MB", url: "" }
      ],
      history: [
        { timestamp: "18 Sep 2026 • 07:45 AM", title: "Request created by Amit Patil", note: "Electrical safety risk flagged" }
      ]
    },
    {
      id: "SR-2026-0048",
      category: "Carpentry",
      title: "Balcony wooden sliding door alignment",
      description: "Balcony sliding glass door frame bottom rollers stuck and scraping against marble floor.",
      residentId: "USR-004",
      residentName: "Sunita Krishnan",
      wing: "A",
      flatNumber: "401",
      phone: "+91 9801234567",
      requestedAt: "2026-09-17T16:20:00",
      preferredDate: "2026-09-19",
      preferredStartTime: "10:00",
      preferredEndTime: "12:00",
      scheduledDate: null,
      scheduledStartTime: null,
      scheduledEndTime: null,
      priority: "Normal",
      status: "Requested",
      assignedProviderId: null,
      assignedProviderName: null,
      assignedProviderType: null,
      assignedProviderPhone: null,
      attachments: [
        { name: "slider_rail_photo.jpg", type: "Photo", size: "850 KB", url: "" }
      ],
      history: [
        { timestamp: "17 Sep 2026 • 04:20 PM", title: "Request created by Sunita Krishnan", note: "Preferred weekend slot requested" }
      ]
    },
    {
      id: "SR-2026-0047",
      category: "Pest Control",
      title: "Termite inspection for kitchen cabinets",
      description: "Small wood dust heaps observed beneath modular sink cabinet, suspected drywood termites.",
      residentId: "USR-007",
      residentName: "Rohan Deshmukh",
      wing: "B",
      flatNumber: "303",
      phone: "+91 9833445566",
      requestedAt: "2026-09-17T14:10:00",
      preferredDate: "2026-09-20",
      preferredStartTime: "09:00",
      preferredEndTime: "11:00",
      scheduledDate: null,
      scheduledStartTime: null,
      scheduledEndTime: null,
      priority: "Normal",
      status: "Requested",
      assignedProviderId: null,
      assignedProviderName: null,
      assignedProviderType: null,
      assignedProviderPhone: null,
      attachments: [],
      history: [
        { timestamp: "17 Sep 2026 • 02:10 PM", title: "Request created by Rohan Deshmukh", note: "Termite treatment inspection" }
      ]
    },
    {
      id: "SR-2026-0046",
      category: "Appliance Repair",
      title: "Washing machine water inlet vibrating",
      description: "Inlet solenoid valve vibrating with heavy shuddering during rinse cycles.",
      residentId: "USR-008",
      residentName: "Anita Desai",
      wing: "B",
      flatNumber: "302",
      phone: "+91 9711110000",
      requestedAt: "2026-09-17T11:00:00",
      preferredDate: "2026-09-19",
      preferredStartTime: "15:00",
      preferredEndTime: "17:00",
      scheduledDate: null,
      scheduledStartTime: null,
      scheduledEndTime: null,
      priority: "Normal",
      status: "Requested",
      assignedProviderId: null,
      assignedProviderName: null,
      assignedProviderType: null,
      assignedProviderPhone: null,
      attachments: [
        { name: "valve_noise_sample.m4a", type: "Voice", size: "340 KB", url: "" }
      ],
      history: [
        { timestamp: "17 Sep 2026 • 11:00 AM", title: "Request created by Anita Desai", note: "Voice audio attached" }
      ]
    },
    {
      id: "SR-2026-0045",
      category: "Plumbing",
      title: "Flush tank valve continuous running water",
      description: "Dual flush toilet cistern valve fails to shut off, constantly draining water into bowl.",
      residentId: "USR-005",
      residentName: "Arjun Mehta",
      wing: "A",
      flatNumber: "104",
      phone: "+91 9988776655",
      requestedAt: "2026-09-17T10:15:00",
      preferredDate: "2026-09-18",
      preferredStartTime: "14:00",
      preferredEndTime: "16:00",
      scheduledDate: "2026-09-18",
      scheduledStartTime: "14:00",
      scheduledEndTime: "16:00",
      priority: "Urgent",
      status: "Assigned",
      assignedProviderId: "vendor-plumb-2",
      assignedProviderName: "Patil Plumbing",
      assignedProviderType: "Vendor",
      assignedProviderPhone: "+91 98231 44556",
      attachments: [
        { name: "cistern_float.jpg", type: "Photo", size: "910 KB", url: "" }
      ],
      history: [
        { timestamp: "17 Sep 2026 • 10:15 AM", title: "Request created by Arjun Mehta", note: "Water wastage urgency" },
        { timestamp: "17 Sep 2026 • 11:00 AM", title: "Admin assigned Patil Plumbing", note: "Scheduled for 18 Sep afternoon" }
      ]
    },
    {
      id: "SR-2026-0044",
      category: "Electrical",
      title: "Balcony ceiling fan speed regulator burned",
      description: "Wall mounted fan regulator emitting burnt plastic smell and stuck on high speed.",
      residentId: "USR-006",
      residentName: "Vikram Malhotra",
      wing: "D",
      flatNumber: "502",
      phone: "+91 9811223344",
      requestedAt: "2026-09-17T09:40:00",
      preferredDate: "2026-09-19",
      preferredStartTime: "11:00",
      preferredEndTime: "13:00",
      scheduledDate: "2026-09-19",
      scheduledStartTime: "11:00",
      scheduledEndTime: "13:00",
      priority: "Normal",
      status: "Assigned",
      assignedProviderId: "staff-2",
      assignedProviderName: "Suresh Patil",
      assignedProviderType: "Worker",
      assignedProviderPhone: "+91 97654 32100",
      attachments: [],
      history: [
        { timestamp: "17 Sep 2026 • 09:40 AM", title: "Request created by Vikram Malhotra", note: "" },
        { timestamp: "17 Sep 2026 • 10:30 AM", title: "Admin assigned Suresh Patil", note: "Assigned society electrician" }
      ]
    },
    {
      id: "SR-2026-0043",
      category: "Cleaning",
      title: "Deep balcony glass & grill cleaning",
      description: "Post-monsoon dirt residue and pigeon bird stains on double glass French windows.",
      residentId: "USR-009",
      residentName: "Deepak Nair",
      wing: "D",
      flatNumber: "104",
      phone: "+91 9899001122",
      requestedAt: "2026-09-17T08:20:00",
      preferredDate: "2026-09-20",
      preferredStartTime: "09:00",
      preferredEndTime: "11:00",
      scheduledDate: "2026-09-20",
      scheduledStartTime: "09:00",
      scheduledEndTime: "11:00",
      priority: "Normal",
      status: "Assigned",
      assignedProviderId: "vendor-3",
      assignedProviderName: "CleanPro Housekeeping Services",
      assignedProviderType: "Vendor",
      assignedProviderPhone: "+91 98220 99887",
      attachments: [],
      history: [
        { timestamp: "17 Sep 2026 • 08:20 AM", title: "Request created by Deepak Nair", note: "" },
        { timestamp: "17 Sep 2026 • 09:15 AM", title: "Admin assigned CleanPro Housekeeping Services", note: "Cleaning agency dispatched" }
      ]
    },
    {
      id: "SR-2026-0041",
      category: "Carpentry",
      title: "Master bedroom wardrobe handle replacement",
      description: "Brass handle screws sheared off inside hinge cavity, unable to open middle drawer.",
      residentId: "USR-010",
      residentName: "Kavitha Sharma",
      wing: "C",
      flatNumber: "501",
      phone: "+91 9712345678",
      requestedAt: "2026-09-16T18:00:00",
      preferredDate: "2026-09-19",
      preferredStartTime: "15:00",
      preferredEndTime: "17:00",
      scheduledDate: "2026-09-19",
      scheduledStartTime: "15:00",
      scheduledEndTime: "17:00",
      priority: "Normal",
      status: "Assigned",
      assignedProviderId: "vendor-carp-1",
      assignedProviderName: "WoodCraft Solutions & Carpentry",
      assignedProviderType: "Vendor",
      assignedProviderPhone: "+91 98221 33445",
      attachments: [
        { name: "broken_drawer_handle.jpg", type: "Photo", size: "720 KB", url: "" }
      ],
      history: [
        { timestamp: "16 Sep 2026 • 06:00 PM", title: "Request created by Kavitha Sharma", note: "" },
        { timestamp: "17 Sep 2026 • 09:00 AM", title: "Admin assigned WoodCraft Solutions & Carpentry", note: "Carpentry vendor confirmed" }
      ]
    },
    {
      id: "SR-2026-0042",
      category: "Plumbing",
      title: "Bathroom pipe leakage",
      description: "Water is leaking from the concealed bathroom pipe behind washbasin wall.",
      residentId: "USR-001",
      residentName: "Rajesh Kumar",
      wing: "A",
      flatNumber: "204",
      phone: "+91 9876543210",
      requestedAt: "2026-09-17T09:15:00",
      preferredDate: "2026-09-18",
      preferredStartTime: "10:00",
      preferredEndTime: "12:00",
      scheduledDate: "2026-09-18",
      scheduledStartTime: "10:00",
      scheduledEndTime: "12:00",
      priority: "Urgent",
      status: "In Progress",
      assignedProviderId: "vendor-plumb-1",
      assignedProviderName: "Ramesh Plumbing Services",
      assignedProviderType: "Vendor",
      assignedProviderPhone: "+91 98765 01234",
      attachments: [
        { name: "pipe_seepage_wall.jpg", type: "Photo", size: "1.4 MB", url: "" },
        { name: "water_drip_clip.mp4", type: "Video", size: "3.5 MB", url: "" }
      ],
      history: [
        { timestamp: "17 Sep 2026 • 09:15 AM", title: "Request created by Rajesh Kumar", note: "Leakage dampness noted" },
        { timestamp: "17 Sep 2026 • 09:30 AM", title: "Admin assigned Ramesh Plumbing Services", note: "Scheduled for 18 Sep 10:00 AM" },
        { timestamp: "18 Sep 2026 • 10:05 AM", title: "Worker marked request In Progress", note: "Wall tiling opened for inspection" }
      ]
    },
    {
      id: "SR-2026-0040",
      category: "Electrical",
      title: "Short circuit spark in utility room socket",
      description: "Sparks observed when washing machine was plugged into 16A industrial wall socket.",
      residentId: "USR-011",
      residentName: "Rohit Verma",
      wing: "E",
      flatNumber: "601",
      phone: "+91 9600001234",
      requestedAt: "2026-09-17T08:00:00",
      preferredDate: "2026-09-18",
      preferredStartTime: "09:30",
      preferredEndTime: "11:30",
      scheduledDate: "2026-09-18",
      scheduledStartTime: "09:30",
      scheduledEndTime: "11:30",
      priority: "Urgent",
      status: "In Progress",
      assignedProviderId: "vendor-6",
      assignedProviderName: "Volts & Amps Electrical AMC",
      assignedProviderType: "Vendor",
      assignedProviderPhone: "+91 98770 12345",
      attachments: [
        { name: "charred_switch_box.jpg", type: "Photo", size: "1.1 MB", url: "" }
      ],
      history: [
        { timestamp: "17 Sep 2026 • 08:00 AM", title: "Request created by Rohit Verma", note: "Electrical hazard" },
        { timestamp: "17 Sep 2026 • 08:30 AM", title: "Admin assigned Volts & Amps Electrical AMC", note: "Technician dispatched" },
        { timestamp: "18 Sep 2026 • 09:30 AM", title: "Worker marked request In Progress", note: "Replacement 16A socket and rewiring underway" }
      ]
    },
    {
      id: "SR-2026-0039",
      category: "Appliance Repair",
      title: "Air conditioner compressor cooling failure",
      description: "Master bedroom split AC blower runs but outdoor unit compressor fails to start.",
      residentId: "USR-002",
      residentName: "Priya Sharma",
      wing: "B",
      flatNumber: "204",
      phone: "+91 9712345678",
      requestedAt: "2026-09-16T17:15:00",
      preferredDate: "2026-09-18",
      preferredStartTime: "11:00",
      preferredEndTime: "13:00",
      scheduledDate: "2026-09-18",
      scheduledStartTime: "11:00",
      scheduledEndTime: "13:00",
      priority: "Urgent",
      status: "In Progress",
      assignedProviderId: "vendor-app-1",
      assignedProviderName: "CoolTech AC & Appliance Services",
      assignedProviderType: "Vendor",
      assignedProviderPhone: "+91 98112 44556",
      attachments: [],
      history: [
        { timestamp: "16 Sep 2026 • 05:15 PM", title: "Request created by Priya Sharma", note: "" },
        { timestamp: "17 Sep 2026 • 09:00 AM", title: "Admin assigned CoolTech AC & Appliance Services", note: "AC technician scheduled" },
        { timestamp: "18 Sep 2026 • 11:00 AM", title: "Worker marked request In Progress", note: "Capacitor and gas pressure testing" }
      ]
    },
    {
      id: "SR-2026-0038",
      category: "Cleaning",
      title: "Water tank seepage residue washdown",
      description: "Stain and mineral salt residue cleaning on terrace wall and utility terrace tiles.",
      residentId: "USR-003",
      residentName: "Amit Patil",
      wing: "C",
      flatNumber: "301",
      phone: "+91 9823456789",
      requestedAt: "2026-09-16T15:30:00",
      preferredDate: "2026-09-18",
      preferredStartTime: "08:00",
      preferredEndTime: "10:00",
      scheduledDate: "2026-09-18",
      scheduledStartTime: "08:00",
      scheduledEndTime: "10:00",
      priority: "Normal",
      status: "In Progress",
      assignedProviderId: "vendor-3b",
      assignedProviderName: "Sparkle Sanitation & Waste",
      assignedProviderType: "Vendor",
      assignedProviderPhone: "+91 98334 55667",
      attachments: [
        { name: "salt_residue_wall.jpg", type: "Photo", size: "980 KB", url: "" }
      ],
      history: [
        { timestamp: "16 Sep 2026 • 03:30 PM", title: "Request created by Amit Patil", note: "" },
        { timestamp: "17 Sep 2026 • 10:00 AM", title: "Admin assigned Sparkle Sanitation & Waste", note: "" },
        { timestamp: "18 Sep 2026 • 08:15 AM", title: "Worker marked request In Progress", note: "Jet spray cleaning in progress" }
      ]
    },
    {
      id: "SR-2026-0037",
      category: "Pest Control",
      title: "General cockroach pest spray treatment",
      description: "Cockroaches emerging from kitchen sink trap drain pipe into cooking counter area.",
      residentId: "USR-004",
      residentName: "Sunita Krishnan",
      wing: "A",
      flatNumber: "401",
      phone: "+91 9801234567",
      requestedAt: "2026-09-16T12:00:00",
      preferredDate: "2026-09-18",
      preferredStartTime: "10:30",
      preferredEndTime: "12:30",
      scheduledDate: "2026-09-18",
      scheduledStartTime: "10:30",
      scheduledEndTime: "12:30",
      priority: "Normal",
      status: "In Progress",
      assignedProviderId: "vendor-pest-1",
      assignedProviderName: "PestShield Terminators AMC",
      assignedProviderType: "Vendor",
      assignedProviderPhone: "+91 98332 11223",
      attachments: [],
      history: [
        { timestamp: "16 Sep 2026 • 12:00 PM", title: "Request created by Sunita Krishnan", note: "" },
        { timestamp: "17 Sep 2026 • 11:30 AM", title: "Admin assigned PestShield Terminators AMC", note: "" },
        { timestamp: "18 Sep 2026 • 10:30 AM", title: "Worker marked request In Progress", note: "Gel baiting and spray applied" }
      ]
    },
    {
      id: "SR-2026-0036",
      category: "Other",
      title: "Main door digital lock battery terminal reset",
      description: "Smart digital lock warning beep on low voltage and fingerprint sensor not responding.",
      residentId: "USR-001",
      residentName: "Rajesh Kumar",
      wing: "A",
      flatNumber: "204",
      phone: "+91 9876543210",
      requestedAt: "2026-09-16T09:10:00",
      preferredDate: "2026-09-18",
      preferredStartTime: "13:00",
      preferredEndTime: "14:30",
      scheduledDate: "2026-09-18",
      scheduledStartTime: "13:00",
      scheduledEndTime: "14:30",
      priority: "Normal",
      status: "In Progress",
      assignedProviderId: "vendor-7",
      assignedProviderName: "Reliable City Solutions",
      assignedProviderType: "Vendor",
      assignedProviderPhone: "+91 98990 54321",
      attachments: [
        { name: "digital_lock_error.jpg", type: "Photo", size: "640 KB", url: "" }
      ],
      history: [
        { timestamp: "16 Sep 2026 • 09:10 AM", title: "Request created by Rajesh Kumar", note: "" },
        { timestamp: "16 Sep 2026 • 11:00 AM", title: "Admin assigned Reliable City Solutions", note: "" },
        { timestamp: "18 Sep 2026 • 01:00 PM", title: "Worker marked request In Progress", note: "Backup power terminal connected" }
      ]
    },
    {
      id: "SR-2026-0035",
      category: "Plumbing",
      title: "Kitchen faucet aerator replacement",
      description: "Low water pressure and uneven spraying due to calcium deposits in faucet mesh.",
      residentId: "USR-007",
      residentName: "Rohan Deshmukh",
      wing: "B",
      flatNumber: "303",
      phone: "+91 9833445566",
      requestedAt: "2026-09-15T11:00:00",
      preferredDate: "2026-09-17",
      preferredStartTime: "10:00",
      preferredEndTime: "12:00",
      scheduledDate: "2026-09-17",
      scheduledStartTime: "10:00",
      scheduledEndTime: "12:00",
      priority: "Normal",
      status: "Completed",
      assignedProviderId: "staff-plumb",
      assignedProviderName: "Society Plumber",
      assignedProviderType: "Worker",
      assignedProviderPhone: "+91 97654 32109",
      attachments: [
        { name: "aerator_mesh.jpg", type: "Photo", size: "450 KB", url: "" }
      ],
      history: [
        { timestamp: "15 Sep 2026 • 11:00 AM", title: "Request created by Rohan Deshmukh", note: "" },
        { timestamp: "15 Sep 2026 • 12:30 PM", title: "Admin assigned Society Plumber", note: "" },
        { timestamp: "17 Sep 2026 • 10:15 AM", title: "Worker marked request In Progress", note: "" },
        { timestamp: "17 Sep 2026 • 11:30 AM", title: "Request marked Completed", note: "New aerator installed, pressure restored" }
      ]
    },
    {
      id: "SR-2026-0034",
      category: "Electrical",
      title: "Foyer LED strip replacement",
      description: "Entrance foyer cove light strip burnt out and flickering.",
      residentId: "USR-008",
      residentName: "Anita Desai",
      wing: "B",
      flatNumber: "302",
      phone: "+91 9711110000",
      requestedAt: "2026-09-15T09:30:00",
      preferredDate: "2026-09-16",
      preferredStartTime: "14:00",
      preferredEndTime: "16:00",
      scheduledDate: "2026-09-16",
      scheduledStartTime: "14:00",
      scheduledEndTime: "16:00",
      priority: "Normal",
      status: "Completed",
      assignedProviderId: "WRK-003",
      assignedProviderName: "Maya Sharma",
      assignedProviderType: "Worker",
      assignedProviderPhone: "+91 9988776655",
      attachments: [],
      history: [
        { timestamp: "15 Sep 2026 • 09:30 AM", title: "Request created by Anita Desai", note: "" },
        { timestamp: "15 Sep 2026 • 10:15 AM", title: "Admin assigned Maya Sharma", note: "" },
        { timestamp: "16 Sep 2026 • 02:00 PM", title: "Worker marked request In Progress", note: "" },
        { timestamp: "16 Sep 2026 • 03:20 PM", title: "Request marked Completed", note: "Driver and LED strip replaced" }
      ]
    },
    {
      id: "SR-2026-0033",
      category: "Carpentry",
      title: "Shoe rack hinge screw tightening",
      description: "Entry shoe cabinet door sagging and rubbing bottom baseboard.",
      residentId: "USR-009",
      residentName: "Deepak Nair",
      wing: "D",
      flatNumber: "104",
      phone: "+91 9899001122",
      requestedAt: "2026-09-14T14:00:00",
      preferredDate: "2026-09-16",
      preferredStartTime: "11:00",
      preferredEndTime: "12:30",
      scheduledDate: "2026-09-16",
      scheduledStartTime: "11:00",
      scheduledEndTime: "12:30",
      priority: "Normal",
      status: "Completed",
      assignedProviderId: "staff-carp",
      assignedProviderName: "Society Carpenter",
      assignedProviderType: "Worker",
      assignedProviderPhone: "+91 97654 88990",
      attachments: [],
      history: [
        { timestamp: "14 Sep 2026 • 02:00 PM", title: "Request created by Deepak Nair", note: "" },
        { timestamp: "14 Sep 2026 • 03:00 PM", title: "Admin assigned Society Carpenter", note: "" },
        { timestamp: "16 Sep 2026 • 11:00 AM", title: "Worker marked request In Progress", note: "" },
        { timestamp: "16 Sep 2026 • 11:45 AM", title: "Request marked Completed", note: "Hinges aligned and tightened" }
      ]
    },
    {
      id: "SR-2026-0032",
      category: "Other",
      title: "Duplicate request for ceiling light check",
      description: "Duplicate request submitted accidentally by family member.",
      residentId: "USR-010",
      residentName: "Kavitha Sharma",
      wing: "C",
      flatNumber: "501",
      phone: "+91 9712345678",
      requestedAt: "2026-09-14T10:00:00",
      preferredDate: "2026-09-15",
      preferredStartTime: "10:00",
      preferredEndTime: "11:00",
      scheduledDate: null,
      scheduledStartTime: null,
      scheduledEndTime: null,
      priority: "Normal",
      status: "Cancelled",
      assignedProviderId: null,
      assignedProviderName: null,
      assignedProviderType: null,
      assignedProviderPhone: null,
      attachments: [],
      history: [
        { timestamp: "14 Sep 2026 • 10:00 AM", title: "Request created by Kavitha Sharma", note: "" },
        { timestamp: "14 Sep 2026 • 10:30 AM", title: "Request Cancelled", note: "Cancelled by resident: Duplicate ticket" }
      ]
    },
    {
      id: "SR-2026-0031",
      category: "Plumbing",
      title: "Outdoor garden hose fitting test",
      description: "External garden bib tap connection loose thread testing.",
      residentId: "USR-011",
      residentName: "Rohit Verma",
      wing: "E",
      flatNumber: "601",
      phone: "+91 9600001234",
      requestedAt: "2026-09-13T16:00:00",
      preferredDate: "2026-09-14",
      preferredStartTime: "11:00",
      preferredEndTime: "12:00",
      scheduledDate: null,
      scheduledStartTime: null,
      scheduledEndTime: null,
      priority: "Normal",
      status: "Cancelled",
      assignedProviderId: null,
      assignedProviderName: null,
      assignedProviderType: null,
      assignedProviderPhone: null,
      attachments: [],
      history: [
        { timestamp: "13 Sep 2026 • 04:00 PM", title: "Request created by Rohit Verma", note: "" },
        { timestamp: "13 Sep 2026 • 05:30 PM", title: "Request Cancelled", note: "Cancelled: Tightened connector with Teflon tape independently" }
      ]
    }
  ]
};

window.MOCK_SERVICE_REQUESTS_DB = MOCK_SERVICE_REQUESTS_DB;

window.mockServiceRequestsAdapter = async function(endpoint, options, payload) {
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS_BULK) && options.method === "POST") {
    const subAction = endpoint.split("/").pop();

    if (subAction === "status") {
      const { request_ids = [], status = "In Progress", note = "" } = payload;
      let count = 0;
      request_ids.forEach(id => {
        const item = MOCK_SERVICE_REQUESTS_DB.requests.find(r => r.id === id);
        if (item) {
          item.status = status;
          item.history.unshift({
            timestamp: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + " • " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
            title: `Admin bulk updated status to ${status}`,
            note: note || "Applied via bulk management console"
          });
          count++;
        }
      });
      return {
        status: "success",
        mock: true,
        message: `Updated status for ${count} service requests to ${status}.`,
        count
      };
    }

    if (subAction === "assignment") {
      let count = 0;
      if (payload.category_assignments && Array.isArray(payload.category_assignments)) {
        // Grouped assignment by category
        payload.category_assignments.forEach(group => {
          (group.request_ids || []).forEach(id => {
            const item = MOCK_SERVICE_REQUESTS_DB.requests.find(r => r.id === id);
            if (item) {
              item.assignedProviderId = group.provider_id;
              item.assignedProviderName = group.provider_name;
              item.assignedProviderType = group.provider_type || "Vendor";
              item.assignedProviderPhone = group.provider_phone || "";
              if (item.status === "Requested") {
                item.status = "Assigned";
              }
              item.history.unshift({
                timestamp: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + " • " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
                title: `Admin assigned ${group.provider_name}`,
                note: `Category bulk assignment (${group.category || item.category})`
              });
              count++;
            }
          });
        });
      } else {
        // Single provider assignment for all selected
        const { request_ids = [], provider_id, provider_name, provider_type, provider_phone } = payload;
        request_ids.forEach(id => {
          const item = MOCK_SERVICE_REQUESTS_DB.requests.find(r => r.id === id);
          if (item) {
            item.assignedProviderId = provider_id;
            item.assignedProviderName = provider_name;
            item.assignedProviderType = provider_type || "Vendor";
            item.assignedProviderPhone = provider_phone || "";
            if (item.status === "Requested") {
              item.status = "Assigned";
            }
            item.history.unshift({
              timestamp: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + " • " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
              title: `Admin assigned ${provider_name}`,
              note: "Assigned via bulk action"
            });
            count++;
          }
        });
      }
      return {
        status: "success",
        mock: true,
        message: `Assigned provider to ${count} service requests.`,
        count
      };
    }

    if (subAction === "schedule") {
      const { request_ids = [], date, start_time, end_time } = payload;
      let count = 0;
      request_ids.forEach(id => {
        const item = MOCK_SERVICE_REQUESTS_DB.requests.find(r => r.id === id);
        if (item) {
          item.scheduledDate = date;
          item.scheduledStartTime = start_time;
          item.scheduledEndTime = end_time;
          item.history.unshift({
            timestamp: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + " • " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
            title: `Admin scheduled service slot`,
            note: `${date} • ${start_time} – ${end_time}`
          });
          count++;
        }
      });
      return {
        status: "success",
        mock: true,
        message: `Scheduled ${count} service requests.`,
        count
      };
    }

    if (subAction === "cancel") {
      const { request_ids = [], reason = "" } = payload;
      let count = 0;
      request_ids.forEach(id => {
        const item = MOCK_SERVICE_REQUESTS_DB.requests.find(r => r.id === id);
        if (item) {
          item.status = "Cancelled";
          item.history.unshift({
            timestamp: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + " • " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
            title: `Request Cancelled`,
            note: reason ? `Reason: ${reason}` : "Cancelled by Admin via bulk action"
          });
          count++;
        }
      });
      return {
        status: "success",
        mock: true,
        message: `Cancelled ${count} service requests.`,
        count
      };
    }
  }
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS + "/") && !endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS_BULK)) {
    const parts = endpoint.split("/");
    const lastPart = parts[parts.length - 1];
    const prevPart = parts[parts.length - 2];

    // Status update
    if (lastPart === "status" && options.method === "PUT") {
      const requestId = prevPart;
      const item = MOCK_SERVICE_REQUESTS_DB.requests.find(r => r.id === requestId);
      if (!item) {
        const err = new Error("Service request not found");
        err.status = 404;
        throw err;
      }
      item.status = payload.status || item.status;
      item.history.unshift({
        timestamp: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + " • " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        title: `Status changed to ${item.status}`,
        note: payload.note || ""
      });
      return {
        status: "success",
        mock: true,
        message: `Status updated to ${item.status}`,
        request: item
      };
    }

    // Assignment update
    if (lastPart === "assignment" && options.method === "PUT") {
      const requestId = prevPart;
      const item = MOCK_SERVICE_REQUESTS_DB.requests.find(r => r.id === requestId);
      if (!item) {
        const err = new Error("Service request not found");
        err.status = 404;
        throw err;
      }
      item.assignedProviderId = payload.provider_id || item.assignedProviderId;
      item.assignedProviderName = payload.provider_name || item.assignedProviderName;
      item.assignedProviderType = payload.provider_type || item.assignedProviderType || "Vendor";
      item.assignedProviderPhone = payload.provider_phone || item.assignedProviderPhone || "";
      if (item.status === "Requested") {
        item.status = "Assigned";
      }
      item.history.unshift({
        timestamp: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + " • " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        title: `Admin assigned ${item.assignedProviderName}`,
        note: `Contact: ${item.assignedProviderPhone}`
      });
      return {
        status: "success",
        mock: true,
        message: `Assigned to ${item.assignedProviderName}`,
        request: item
      };
    }

    // Schedule update
    if (lastPart === "schedule" && options.method === "PUT") {
      const requestId = prevPart;
      const item = MOCK_SERVICE_REQUESTS_DB.requests.find(r => r.id === requestId);
      if (!item) {
        const err = new Error("Service request not found");
        err.status = 404;
        throw err;
      }
      item.scheduledDate = payload.date || item.scheduledDate;
      item.scheduledStartTime = payload.start_time || item.scheduledStartTime;
      item.scheduledEndTime = payload.end_time || item.scheduledEndTime;
      item.history.unshift({
        timestamp: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + " • " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        title: `Admin scheduled service slot`,
        note: `${item.scheduledDate} • ${item.scheduledStartTime} – ${item.scheduledEndTime}`
      });
      return {
        status: "success",
        mock: true,
        message: `Service scheduled for ${item.scheduledDate}`,
        request: item
      };
    }

    // History retrieval
    if (lastPart === "history" && (options.method === "GET" || !options.method)) {
      const requestId = prevPart;
      const item = MOCK_SERVICE_REQUESTS_DB.requests.find(r => r.id === requestId);
      if (!item) {
        const err = new Error("Service request not found");
        err.status = 404;
        throw err;
      }
      return {
        status: "success",
        mock: true,
        history: item.history
      };
    }

    // Get specific request details
    if (options.method === "GET" || !options.method) {
      const requestId = lastPart;
      const item = MOCK_SERVICE_REQUESTS_DB.requests.find(r => r.id === requestId);
      if (!item) {
        const err = new Error("Service request not found");
        err.status = 404;
        throw err;
      }
      return {
        status: "success",
        mock: true,
        request: item
      };
    }
  }
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS || endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_SERVICE_REQUESTS + "?")) {
    // POST: Create Service Request on Behalf of Resident
    if (options.method === "POST") {
      const idStr = `SR-2026-00${String(MOCK_SERVICE_REQUESTS_DB.nextId++).padStart(2, "0")}`;
      const now = new Date();
      const timeStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + " • " + now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

      const newReq = {
        id: idStr,
        category: payload.category || "Other",
        title: (payload.title || "").trim() || "General Service Request",
        description: (payload.description || "").trim() || "No description provided.",
        residentId: payload.resident_id || "USR-GEN",
        residentName: payload.resident_name || "Resident",
        wing: payload.wing || "A",
        flatNumber: payload.flat_number || payload.flat || "101",
        phone: payload.phone || "+91 9876543210",
        requestedAt: now.toISOString(),
        preferredDate: payload.preferred_date || new Date(Date.now() + 86400000).toISOString().split("T")[0],
        preferredStartTime: payload.preferred_start_time || "10:00",
        preferredEndTime: payload.preferred_end_time || "12:00",
        scheduledDate: null,
        scheduledStartTime: null,
        scheduledEndTime: null,
        priority: payload.priority || "Normal",
        status: "Requested",
        assignedProviderId: null,
        assignedProviderName: null,
        assignedProviderType: null,
        assignedProviderPhone: null,
        attachments: [],
        history: [
          {
            timestamp: timeStr,
            title: `Request created by Admin on behalf of ${payload.resident_name || "Resident"}`,
            note: "Submitted via Admin Service Request Management"
          }
        ]
      };

      MOCK_SERVICE_REQUESTS_DB.requests.unshift(newReq);
      return {
        status: "success",
        mock: true,
        message: `Service request ${idStr} created successfully.`,
        request: newReq
      };
    }

    // GET: List Service Requests with dynamic filtering & summary
    let list = [...MOCK_SERVICE_REQUESTS_DB.requests];

    let search = "";
    let statusFilter = "all";
    let catFilter = "all";
    let priorityFilter = "all";
    let assignFilter = "all";

    try {
      const u = new URL("http://localhost" + endpoint);
      search = (u.searchParams.get("search") || "").trim().toLowerCase();
      statusFilter = (u.searchParams.get("status") || "all").toLowerCase();
      catFilter = (u.searchParams.get("category") || "all").toLowerCase();
      priorityFilter = (u.searchParams.get("priority") || "all").toLowerCase();
      assignFilter = (u.searchParams.get("assignment") || "all").toLowerCase();
    } catch (_) {}

    // Calculate live counts
    const requestedCount = list.filter(r => r.status === "Requested").length;
    const assignedCount = list.filter(r => r.status === "Assigned").length;
    const inProgressCount = list.filter(r => r.status === "In Progress").length;
    const completedCount = list.filter(r => r.status === "Completed").length;
    const cancelledCount = list.filter(r => r.status === "Cancelled").length;
    const activeTotal = requestedCount + assignedCount + inProgressCount + completedCount;

    const summary = {
      total: activeTotal,
      requested: requestedCount,
      assigned: assignedCount,
      in_progress: inProgressCount,
      completed: completedCount,
      cancelled: cancelledCount
    };

    return {
      status: "success",
      mock: true,
      summary,
      total: list.length,
      requests: list,
      service_requests: list,
      residents: (typeof MOCK_AMENITIES_DB !== "undefined" && MOCK_AMENITIES_DB.residentsList) ? MOCK_AMENITIES_DB.residentsList : []
    };
  }

  // =================================================================
  // RESIDENT SERVICE REQUESTS ADAPTER OPERATIONS
  // =================================================================

  // GET: Resident service requests (list or single item)
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.RESIDENT_SERVICE_REQUESTS) && (options.method === "GET" || !options.method)) {
    const parts = endpoint.split("/");
    const specificId = parts[parts.length - 1];

    if (specificId && specificId.startsWith("SR-")) {
      const item = MOCK_SERVICE_REQUESTS_DB.requests.find(r => r.id === specificId);
      if (!item) {
        const error = new Error("Service request not found");
        error.status = 404;
        throw error;
      }
      return {
        status: "success",
        mock: true,
        request: item
      };
    }

    const sessionUser = (typeof GrihamAuth !== "undefined" && GrihamAuth.getUser()) || {};
    const residentName = sessionUser.name || "Rajesh Kumar";
    const residentWing = sessionUser.wing || "A";
    const residentFlat = String(sessionUser.flat || sessionUser.flatNumber || "204");
    const residentId = sessionUser.id || "USR-001";

    const residentList = MOCK_SERVICE_REQUESTS_DB.requests.filter(r => {
      const matchName = r.residentName && r.residentName.toLowerCase() === residentName.toLowerCase();
      const matchUnit = r.wing === residentWing && String(r.flatNumber) === residentFlat;
      const matchId = r.residentId && r.residentId === residentId;
      return matchName || matchUnit || matchId;
    });

    const requestedCount = residentList.filter(r => r.status === "Requested").length;
    const scheduledCount = residentList.filter(r => r.status === "Scheduled" || r.status === "Assigned").length;
    const inProgressCount = residentList.filter(r => r.status === "In Progress").length;
    const completedCount = residentList.filter(r => r.status === "Completed").length;
    const cancelledCount = residentList.filter(r => r.status === "Cancelled").length;
    const activeTotal = requestedCount + scheduledCount + inProgressCount;

    return {
      status: "success",
      mock: true,
      requests: residentList,
      total: residentList.length,
      summary: {
        total: residentList.length,
        active: activeTotal,
        requested: requestedCount,
        scheduled: scheduledCount,
        assigned: scheduledCount,
        in_progress: inProgressCount,
        completed: completedCount,
        cancelled: cancelledCount
      },
      catalog: MOCK_SERVICE_CATALOG
    };
  }

  // POST: Resident create service request
  if (endpoint === API_CONFIG.ENDPOINTS.RESIDENT_SERVICE_REQUESTS && options.method === "POST") {
    const sessionUser = (typeof GrihamAuth !== "undefined" && GrihamAuth.getUser()) || {};
    const idStr = `SR-2026-00${String(MOCK_SERVICE_REQUESTS_DB.nextId++).padStart(2, "0")}`;
    const now = new Date();
    const timeStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + " • " + now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const newReq = {
      id: idStr,
      category: payload.category || "Other",
      title: (payload.title || "").trim() || "Service Request",
      description: (payload.description || "").trim() || "",
      residentId: sessionUser.id || "USR-001",
      residentName: sessionUser.name || "Rajesh Kumar",
      wing: sessionUser.wing || "A",
      flatNumber: String(sessionUser.flat || sessionUser.flatNumber || "204"),
      phone: sessionUser.phone || "+91 9876543210",
      requestedAt: now.toISOString(),
      preferredDate: payload.preferred_date || new Date(Date.now() + 86400000).toISOString().split("T")[0],
      preferredStartTime: payload.preferred_start_time || "10:00",
      preferredEndTime: payload.preferred_end_time || "12:00",
      scheduledDate: null,
      scheduledStartTime: null,
      scheduledEndTime: null,
      priority: payload.priority || (payload.is_urgent ? "Urgent" : "Normal"),
      status: "Requested",
      assignedProviderId: null,
      assignedProviderName: null,
      assignedProviderType: null,
      assignedProviderPhone: null,
      quotedCost: payload.estimated_rate || null,
      attachments: payload.attachments || [],
      history: [
        {
          timestamp: timeStr,
          title: "Request submitted by resident",
          note: `Preferred slot: ${payload.preferred_date || "Upcoming"} • ${payload.preferred_start_time || "10:00"} – ${payload.preferred_end_time || "12:00"}`
        },
        {
          timestamp: timeStr,
          title: "Awaiting administration scheduling",
          note: "Society maintenance desk will assign technician"
        }
      ]
    };

    MOCK_SERVICE_REQUESTS_DB.requests.unshift(newReq);

    return {
      status: "success",
      mock: true,
      message: `Service request ${idStr} submitted successfully.`,
      request: newReq
    };
  }

  // PUT: Resident cancel service request
  if ((endpoint === API_CONFIG.ENDPOINTS.RESIDENT_SERVICE_REQUEST_CANCEL || (endpoint.includes("/v1/resident/service-requests/") && endpoint.endsWith("/cancel"))) && options.method === "PUT") {
    let requestId = payload.request_id;
    if (!requestId) {
      const parts = endpoint.split("/");
      const cancelIdx = parts.indexOf("cancel");
      if (cancelIdx > 0) requestId = parts[cancelIdx - 1];
    }

    const item = MOCK_SERVICE_REQUESTS_DB.requests.find(r => r.id === requestId);
    if (!item) {
      const err = new Error("Service request not found");
      err.status = 404;
      throw err;
    }

    const now = new Date();
    const timeStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + " • " + now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    item.status = "Cancelled";
    item.history.unshift({
      timestamp: timeStr,
      title: "Request Cancelled by resident",
      note: payload.reason ? `Reason: ${payload.reason}` : "Cancelled via Resident App"
    });

    return {
      status: "success",
      mock: true,
      message: `Service request ${requestId} cancelled.`,
      request: item
    };
  }

  return undefined;
};
