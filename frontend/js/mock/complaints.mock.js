const MOCK_COMPLAINTS_DB = {
  summary: {
    total: 24,
    open: 9,
    pending: 9,
    solved: 3,
    cancelled: 2
  },
  complaints: [
    {
      id: "CMP-2026-0043",
      title: "Water pressure low in kitchen",
      resident_name: "Rajesh Kumar",
      wing: "A",
      flat: "204",
      category: "Water",
      created_at: "Today, 10:15 AM",
      status: "working",
      is_new: false,
      description: "Water pressure has significantly dropped in the kitchen tap since yesterday evening. Barely a trickle coming through during morning supply.",
      attachments: {
        images: [],
        audio: null,
        video: null
      },
      assigned_to: {
        id: "staff-1",
        name: "Ramesh Kumar",
        role: "Society Maintenance / Plumber",
        phone: "+91 97654 32101"
      },
      timeline: [
        { time: "Today, 10:15 AM", title: "Complaint submitted by resident", note: "Reported via Resident App" },
        { time: "Today, 11:30 AM", title: "Assigned to Ramesh Kumar (Plumber)", note: "Inspection scheduled for today afternoon" }
      ]
    },
    {
      id: "CMP-2026-0035",
      title: "Lobby hallway light bulb fused",
      resident_name: "Rajesh Kumar",
      wing: "A",
      flat: "204",
      category: "Electrical",
      created_at: "10 Sep 2026",
      status: "solved",
      is_new: false,
      description: "The ceiling light bulb outside flat A-204 was fused and flickered continuously.",
      attachments: {
        images: [],
        audio: null,
        video: null
      },
      assigned_to: {
        id: "staff-2",
        name: "Suresh Patil",
        role: "Society Electrician",
        phone: "+91 97654 32100"
      },
      timeline: [
        { time: "10 Sep, 4:00 PM", title: "Complaint submitted", note: "" },
        { time: "11 Sep, 11:00 AM", title: "Assigned to Suresh Patil (Electrician)", note: "" },
        { time: "11 Sep, 3:30 PM", title: "Complaint Resolved & Solved", note: "LED bulb replaced with new 12W lamp" }
      ]
    },
    {
      id: "CMP-2026-0042",
      title: "Water leakage in master bathroom",
      resident_name: "Rahul Sharma",
      wing: "B",
      flat: "204",
      category: "Water",
      created_at: "Today, 9:30 AM",
      status: "pending",
      is_new: true,
      description: "Water leakage has been noticed near the concealed bathroom pipeline since yesterday morning. The wall is damp and seepage has begun affecting flat B-104 below.",
      attachments: {
        images: [
          { name: "leakage_wall.jpg", size: "1.2 MB", url: "photo_wall_damp" },
          { name: "pipe_joint.jpg", size: "850 KB", url: "photo_pipe_joint" }
        ],
        audio: { name: "resident_voice_note.m4a", duration: "0:18", size: "320 KB" },
        video: { name: "dripping_water_video.mp4", duration: "0:12", size: "3.8 MB" }
      },
      assigned_to: {
        id: "vendor-1",
        name: "ABC Plumbing Services",
        role: "Plumbing Contractor Vendor",
        phone: "+91 98231 44556"
      },
      timeline: [
        { time: "Today, 9:30 AM", title: "Complaint submitted by resident", note: "Created via Resident Portal" },
        { time: "Today, 10:15 AM", title: "Complaint marked Pending", note: "Reviewed by Society Admin" },
        { time: "Today, 11:00 AM", title: "Assigned to ABC Plumbing Services", note: "Work order dispatched" }
      ]
    },
    {
      id: "CMP-2026-0041",
      title: "Main lift stopping abruptly between floors",
      resident_name: "Priya Patil",
      wing: "A",
      flat: "102",
      category: "Maintenance",
      created_at: "Today, 8:15 AM",
      status: "pending",
      is_new: true,
      description: "Lift #1 in Wing A experienced severe jerks and stalled for 3 minutes near floor 4 with 2 passengers inside. Urgent technician visit and brake check required.",
      attachments: {
        images: [
          { name: "lift_panel_error.jpg", size: "920 KB", url: "photo_lift_panel" }
        ],
        audio: null,
        video: null
      },
      assigned_to: {
        id: "vendor-2",
        name: "Apex Lift Solutions AMC",
        role: "Elevator AMC Service",
        phone: "+91 98450 11223"
      },
      timeline: [
        { time: "Today, 8:15 AM", title: "Complaint submitted by resident", note: "Safety flag raised" },
        { time: "Today, 8:45 AM", title: "Complaint marked Pending", note: "Chairman alerted" }
      ]
    },
    {
      id: "CMP-2026-0040",
      title: "Corridor light flickering and short circuit sound",
      resident_name: "Amit Deshmukh",
      wing: "A",
      flat: "101",
      category: "Electrical",
      created_at: "Yesterday, 6:00 PM",
      status: "pending",
      is_new: false,
      description: "Ceiling lights in the 1st-floor lobby are flickering constantly with a buzzing sound from the MCB distribution box.",
      attachments: {
        images: [],
        audio: { name: "buzzing_sound.m4a", duration: "0:10", size: "180 KB" },
        video: null
      },
      assigned_to: {
        id: "staff-2",
        name: "Suresh Patil",
        role: "Society Electrician",
        phone: "+91 97654 32100"
      },
      timeline: [
        { time: "Yesterday, 6:00 PM", title: "Complaint submitted" },
        { time: "Yesterday, 7:00 PM", title: "Assigned to Suresh Patil (Electrician)" }
      ]
    },
    {
      id: "CMP-2026-0039",
      title: "Garbage collection missed for 3 days",
      resident_name: "Sunita Kulkarni",
      wing: "C",
      flat: "301",
      category: "Cleaning",
      created_at: "Yesterday, 11:30 AM",
      status: "pending",
      is_new: false,
      description: "Housekeeping door-to-door waste collection was skipped for flats on the 3rd floor Wing C since Wednesday.",
      attachments: {
        images: [
          { name: "doorstep_bins.jpg", size: "1.1 MB", url: "photo_bins" }
        ],
        audio: null,
        video: null
      },
      assigned_to: {
        id: "vendor-3",
        name: "CleanPro Housekeeping Services",
        role: "Housekeeping Agency",
        phone: "+91 98220 99887"
      },
      timeline: [
        { time: "Yesterday, 11:30 AM", title: "Complaint submitted" },
        { time: "Yesterday, 12:00 PM", title: "Complaint marked Pending" }
      ]
    },
    {
      id: "CMP-2026-0038",
      title: "Basement -2 visitor parking camera blind spot",
      resident_name: "Vikram Malhotra",
      wing: "B",
      flat: "504",
      category: "Security",
      created_at: "14 Sep 2026",
      status: "solved",
      is_new: false,
      description: "CCTV coverage angle near visitor slot B-14 was misaligned after the recent basement painting work.",
      attachments: {
        images: [
          { name: "camera_angle.jpg", size: "780 KB", url: "photo_camera" }
        ],
        audio: null,
        video: null
      },
      assigned_to: {
        id: "vendor-4",
        name: "SecureEye Systems",
        role: "CCTV & Security Vendor",
        phone: "+91 98111 22334"
      },
      timeline: [
        { time: "14 Sep, 10:00 AM", title: "Complaint submitted" },
        { time: "14 Sep, 12:30 PM", title: "Assigned to SecureEye Systems" },
        { time: "15 Sep, 4:30 PM", title: "Complaint Resolved & Solved", note: "Camera repositioned and tested" }
      ]
    },
    {
      id: "CMP-2026-0037",
      title: "Water pressure low on top floors",
      resident_name: "Ananya Joshi",
      wing: "D",
      flat: "201",
      category: "Water",
      created_at: "13 Sep 2026",
      status: "solved",
      is_new: false,
      description: "Water pressure in kitchen taps was weak during evening supply hours.",
      attachments: {
        images: [],
        audio: null,
        video: null
      },
      assigned_to: {
        id: "staff-1",
        name: "Ramesh Kumar",
        role: "Society Maintenance Worker",
        phone: "+91 97654 32101"
      },
      timeline: [
        { time: "13 Sep, 6:00 PM", title: "Complaint submitted" },
        { time: "13 Sep, 6:30 PM", title: "Assigned to Ramesh Kumar" },
        { time: "14 Sep, 10:00 AM", title: "Booster pump valve cleared & Solved" }
      ]
    },
    {
      id: "CMP-2026-0036",
      title: "Clubhouse AC remote missing",
      resident_name: "Deepak Nair",
      wing: "D",
      flat: "104",
      category: "Other",
      created_at: "12 Sep 2026",
      status: "cancelled",
      is_new: false,
      description: "Remote for the AC in clubhouse hall 1 could not be found.",
      attachments: {
        images: [],
        audio: null,
        video: null
      },
      assigned_to: null,
      timeline: [
        { time: "12 Sep, 3:00 PM", title: "Complaint submitted" },
        { time: "12 Sep, 4:00 PM", title: "Complaint Cancelled", note: "Reason: Resident found remote inside guard desk drawer" }
      ]
    }
  ]
};
