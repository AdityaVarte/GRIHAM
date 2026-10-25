/**
 * GRIHAM FRONTEND - MOCK SOS ALERTS DATABASE
 * Society: GRIHAM-PUNE-001
 */

(function() {
  const today = new Date();
  const formatISO = (daysAgo, hours, minutes) => {
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    d.setHours(hours, minutes, 0, 0);
    return d.toISOString();
  };

  const initialAlerts = [
    {
      id: "SOS-2026-0019",
      residentId: "USR-002",
      residentName: "Anita Desai",
      phone: "+919812345678",
      wing: "A",
      flatNumber: "102",
      emergencyType: "Fire / Smoke",
      message: "Smoke alarm triggered near kitchen corridor. Please send security check immediately.",
      location: "Flat A-102 • Kitchen corridor",
      status: "Active",
      createdAt: formatISO(0, 11, 15),
      resolvedAt: null,
      resolvedBy: null,
      resolutionNote: null,
      societyId: "GRIHAM-PUNE-001"
    },
    {
      id: "SOS-2026-0018",
      residentId: "USR-001",
      residentName: "Rajesh Kumar",
      phone: "+919876543210",
      wing: "B",
      flatNumber: "204",
      emergencyType: "Medical Assistance",
      message: "Elderly resident feeling severe dizziness and chest tightness. Need immediate first-aid.",
      location: "Flat B-204 • Master Bedroom",
      status: "Active",
      createdAt: formatISO(0, 10, 42),
      resolvedAt: null,
      resolvedBy: null,
      resolutionNote: null,
      societyId: "GRIHAM-PUNE-001"
    },
    {
      id: "SOS-2026-0017",
      residentId: "USR-003",
      residentName: "Sunil Patil",
      phone: "+919765432109",
      wing: "C",
      flatNumber: "305",
      emergencyType: "Lift Stuck",
      message: "Passenger lift stuck between 3rd and 4th floors with two occupants.",
      location: "Tower C • Passenger Elevator 1",
      status: "Resolved",
      createdAt: formatISO(0, 8, 30),
      resolvedAt: formatISO(0, 9, 15),
      resolvedBy: "Society Administrator",
      resolutionNote: "Technician manually released lift brake. Both residents evacuated safely.",
      societyId: "GRIHAM-PUNE-001"
    },
    {
      id: "SOS-2026-0016",
      residentId: "USR-004",
      residentName: "Meera Iyer",
      phone: "+919823456789",
      wing: "D",
      flatNumber: "402",
      emergencyType: "Security Alert",
      message: "Unidentified person attempting to force balcony grille.",
      location: "Tower D • Flat 402 Balcony",
      status: "Resolved",
      createdAt: formatISO(0, 7, 10),
      resolvedAt: formatISO(0, 7, 45),
      resolvedBy: "Society Administrator",
      resolutionNote: "Night guard responded and intercepted unauthorized vendor. Security log updated.",
      societyId: "GRIHAM-PUNE-001"
    },
    {
      id: "SOS-2026-0015",
      residentId: "USR-005",
      residentName: "Vikram Malhotra",
      phone: "+919934567890",
      wing: "B",
      flatNumber: "101",
      emergencyType: "Water Pipeline Burst",
      message: "Severe main water riser burst causing flooding on floor 1.",
      location: "Tower B • 1st Floor Common Corridor",
      status: "Resolved",
      createdAt: formatISO(0, 6, 0),
      resolvedAt: formatISO(0, 7, 0),
      resolvedBy: "Society Administrator",
      resolutionNote: "Master riser valve isolated. Plumber replaced cracked union coupling.",
      societyId: "GRIHAM-PUNE-001"
    },
    {
      id: "SOS-2026-0014",
      residentId: "USR-006",
      residentName: "Pooja Hegde",
      phone: "+919845678901",
      wing: "A",
      flatNumber: "504",
      emergencyType: "Medical Assistance",
      message: "Child sustained deep cut from broken glass table. Heavy bleeding.",
      location: "Flat A-504 • Living Room",
      status: "Resolved",
      createdAt: formatISO(0, 1, 20),
      resolvedAt: formatISO(0, 2, 5),
      resolvedBy: "Society Administrator",
      resolutionNote: "First aid administered by society doctor; transported safely to clinic.",
      societyId: "GRIHAM-PUNE-001"
    },
    {
      id: "SOS-2026-0013",
      residentId: "USR-007",
      residentName: "Rohan Joshi",
      phone: "+919756789012",
      wing: "C",
      flatNumber: "203",
      emergencyType: "Electrical Hazard",
      message: "Sparking and burning smell from floor distribution board.",
      location: "Tower C • 2nd Floor Electric Shaft",
      status: "Resolved",
      createdAt: formatISO(0, 0, 15),
      resolvedAt: formatISO(0, 1, 0),
      resolvedBy: "Society Administrator",
      resolutionNote: "Tripped faulty MCB and replaced burnt terminal connector.",
      societyId: "GRIHAM-PUNE-001"
    },
    {
      id: "SOS-2026-0012",
      residentId: "USR-008",
      residentName: "Kavita Nair",
      phone: "+919867890123",
      wing: "B",
      flatNumber: "301",
      emergencyType: "Security Threat",
      message: "Harassment by delivery personnel refusing to exit premises.",
      location: "Tower B • Floor 3 Lobby",
      status: "Resolved",
      createdAt: formatISO(2, 16, 20),
      resolvedAt: formatISO(2, 16, 50),
      resolvedBy: "Society Administrator",
      resolutionNote: "Security gate staff accompanied delivery person off-site and blacklisted vendor pass.",
      societyId: "GRIHAM-PUNE-001"
    },
    {
      id: "SOS-2026-0011",
      residentId: "USR-009",
      residentName: "Deepak Verma",
      phone: "+919878901234",
      wing: "A",
      flatNumber: "403",
      emergencyType: "Medical Assistance",
      message: "Severe allergic reaction with swelling. Needs urgent antihistamine or ambulance.",
      location: "Flat A-403 • Dining Area",
      status: "Resolved",
      createdAt: formatISO(4, 21, 10),
      resolvedAt: formatISO(4, 22, 0),
      resolvedBy: "Society Administrator",
      resolutionNote: "Ambulance arrived within 15 mins. Resident treated and stable.",
      societyId: "GRIHAM-PUNE-001"
    },
    {
      id: "SOS-2026-0010",
      residentId: "USR-010",
      residentName: "Sanjay Gupta",
      phone: "+919889012345",
      wing: "D",
      flatNumber: "202",
      emergencyType: "Lift Stuck",
      message: "Freight elevator power cutoff; 1 passenger inside with heavy groceries.",
      location: "Tower D • Service Elevator",
      status: "Resolved",
      createdAt: formatISO(6, 14, 5),
      resolvedAt: formatISO(6, 14, 40),
      resolvedBy: "Society Administrator",
      resolutionNote: "Inverter backup restored; lift brought to Ground floor.",
      societyId: "GRIHAM-PUNE-001"
    },
    {
      id: "SOS-2026-0009",
      residentId: "USR-011",
      residentName: "Alok Sharma",
      phone: "+919890123456",
      wing: "C",
      flatNumber: "104",
      emergencyType: "Fire / Smoke",
      message: "Dry waste bin fire in basement parking slot 42.",
      location: "Basement 1 • Parking Bay C-42",
      status: "Resolved",
      createdAt: formatISO(12, 19, 30),
      resolvedAt: formatISO(12, 19, 55),
      resolvedBy: "Society Administrator",
      resolutionNote: "Extinguished with ABC dry powder extinguisher. No vehicle damaged.",
      societyId: "GRIHAM-PUNE-001"
    },
    {
      id: "SOS-2026-0008",
      residentId: "USR-012",
      residentName: "Neha Kulkarni",
      phone: "+919901234567",
      wing: "B",
      flatNumber: "502",
      emergencyType: "Medical Assistance",
      message: "Elderly resident heart palpitation.",
      location: "Flat B-502",
      status: "Resolved",
      createdAt: formatISO(18, 9, 0),
      resolvedAt: formatISO(18, 9, 45),
      resolvedBy: "Society Administrator",
      resolutionNote: "Cardiologist resident on 3rd floor attended promptly.",
      societyId: "GRIHAM-PUNE-001"
    },
    {
      id: "SOS-2026-0007",
      residentId: "USR-013",
      residentName: "Prakash Rao",
      phone: "+919912345678",
      wing: "A",
      flatNumber: "303",
      emergencyType: "Security Alert",
      message: "Broken window glass found in basement storage.",
      location: "Basement 2 • Storage Unit A",
      status: "Resolved",
      createdAt: formatISO(24, 23, 15),
      resolvedAt: formatISO(24, 23, 45),
      resolvedBy: "Society Administrator",
      resolutionNote: "Patrol guard secured area; window pane replaced next morning.",
      societyId: "GRIHAM-PUNE-001"
    }
  ];

  window.MOCK_SOS_DB = {
    alerts: initialAlerts,
    nextId: 20
  };

  console.info("[Mock SOS DB] Initialized with " + initialAlerts.length + " emergency alerts.");
})();
