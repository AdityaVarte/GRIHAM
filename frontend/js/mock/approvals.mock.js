/**
 * Griham Mock Database - Resident Registration Approvals
 * File: js/mock/approvals.mock.js
 */

const MOCK_APPROVALS_DB = {
  approvals: [
    // --- PENDING ---
    {
      id: "REG-2026-0042",
      status: "pending",
      name: "Aditya Sharma",
      fullName: "Aditya Sharma",
      phone: "+919876543210",
      email: "aditya@example.com",
      aadhar_last4: "8821",
      flat_number: "102",
      flat: "102",
      wing: "A",
      floor: 1,
      floorNumber: "1",
      occupancyType: "Owner",
      resident_type: "owner",
      owner_name: null,
      move_in_date: "01 Oct 2026",
      family_count: 3,
      society_name: "Green Valley Residency",
      societyId: "GRIHAM-PUNE-001",
      submitted_at: "2026-09-17T09:30:00Z",
      submittedAt: "2026-09-17T09:30:00Z",
      profilePhoto: null,
      rejectionReason: null,
      rejection_reason: null,
      approvedBy: null,
      rejectedBy: null,
      documents: [
        { name: "Aadhar_Aditya.pdf", type: "Identity Proof", size: "1.2 MB" },
        { name: "Sale_Deed_A102.pdf", type: "Ownership Proof", size: "3.4 MB" }
      ]
    },
    {
      id: "REG-2026-0043",
      status: "pending",
      name: "Priya Nair",
      fullName: "Priya Nair",
      phone: "+919876512340",
      email: "priya.nair@email.com",
      aadhar_last4: "4412",
      flat_number: "302",
      flat: "302",
      wing: "B",
      floor: 3,
      floorNumber: "3",
      occupancyType: "Owner",
      resident_type: "owner",
      owner_name: null,
      move_in_date: "01 Oct 2026",
      family_count: 3,
      society_name: "Green Valley Residency",
      societyId: "GRIHAM-PUNE-001",
      submitted_at: "2026-09-17T11:15:00Z",
      submittedAt: "2026-09-17T11:15:00Z",
      profilePhoto: null,
      rejectionReason: null,
      rejection_reason: null,
      approvedBy: null,
      rejectedBy: null,
      documents: [
        { name: "Aadhar_Card_Priya.pdf", type: "Identity Proof", size: "1.2 MB" }
      ]
    },
    {
      id: "REG-2026-0044",
      status: "pending",
      name: "Arjun Mehta",
      fullName: "Arjun Mehta",
      phone: "+919988776655",
      email: "arjun.mehta@gmail.com",
      aadhar_last4: "5531",
      flat_number: "104",
      flat: "104",
      wing: "A",
      floor: 1,
      floorNumber: "1",
      occupancyType: "Tenant",
      resident_type: "tenant",
      owner_name: "Rajesh Mehta",
      move_in_date: "15 Oct 2026",
      family_count: 2,
      society_name: "Green Valley Residency",
      societyId: "GRIHAM-PUNE-001",
      submitted_at: "2026-09-16T11:30:00Z",
      submittedAt: "2026-09-16T11:30:00Z",
      profilePhoto: null,
      rejectionReason: null,
      rejection_reason: null,
      approvedBy: null,
      rejectedBy: null,
      documents: [
        { name: "Rent_Agreement_A104.pdf", type: "Tenancy Agreement", size: "2.1 MB" }
      ]
    },
    {
      id: "REG-2026-0045",
      status: "pending",
      name: "Kavitha Sharma",
      fullName: "Kavitha Sharma",
      phone: "+919712345678",
      email: "k.sharma@outlook.com",
      aadhar_last4: "9912",
      flat_number: "501",
      flat: "501",
      wing: "C",
      floor: 5,
      floorNumber: "5",
      occupancyType: "Owner",
      resident_type: "owner",
      owner_name: null,
      move_in_date: "20 Oct 2026",
      family_count: 4,
      society_name: "Green Valley Residency",
      societyId: "GRIHAM-PUNE-001",
      submitted_at: "2026-09-16T15:45:00Z",
      submittedAt: "2026-09-16T15:45:00Z",
      profilePhoto: null,
      rejectionReason: null,
      rejection_reason: null,
      approvedBy: null,
      rejectedBy: null,
      documents: [
        { name: "Index2_C501.pdf", type: "Ownership Proof", size: "4.1 MB" }
      ]
    },
    {
      id: "REG-2026-0046",
      status: "pending",
      name: "Ravi Patel",
      fullName: "Ravi Patel",
      phone: "+919823456789",
      email: "ravipatel@yahoo.com",
      aadhar_last4: "3344",
      flat_number: "203",
      flat: "203",
      wing: "D",
      floor: 2,
      floorNumber: "2",
      occupancyType: "Tenant",
      resident_type: "tenant",
      owner_name: "Meena Patel",
      move_in_date: "05 Nov 2026",
      family_count: 1,
      society_name: "Green Valley Residency",
      societyId: "GRIHAM-PUNE-001",
      submitted_at: "2026-09-15T08:00:00Z",
      submittedAt: "2026-09-15T08:00:00Z",
      profilePhoto: null,
      rejectionReason: null,
      rejection_reason: null,
      approvedBy: null,
      rejectedBy: null,
      documents: [
        { name: "Lease_D203.pdf", type: "Tenancy Agreement", size: "1.9 MB" }
      ]
    },
    // --- APPROVED ---
    {
      id: "REG-2026-0038",
      status: "approved",
      name: "Sunita Krishnan",
      fullName: "Sunita Krishnan",
      phone: "+919801234567",
      email: "sunita.krishnan@gmail.com",
      aadhar_last4: "7723",
      flat_number: "401",
      flat: "401",
      wing: "A",
      floor: 4,
      floorNumber: "4",
      occupancyType: "Owner",
      resident_type: "owner",
      owner_name: null,
      move_in_date: "01 Sep 2026",
      family_count: 2,
      society_name: "Green Valley Residency",
      societyId: "GRIHAM-PUNE-001",
      submitted_at: "2026-09-01T10:20:00Z",
      submittedAt: "2026-09-01T10:20:00Z",
      approved_at: "2026-09-17T09:00:00Z",
      approvedAt: "2026-09-17T09:00:00Z",
      approvedBy: "Chairman",
      rejectionReason: null,
      rejection_reason: null,
      profilePhoto: null,
      documents: [
        { name: "Aadhar_Sunita.pdf", type: "Identity Proof", size: "1.0 MB" }
      ]
    },
    {
      id: "REG-2026-0039",
      status: "approved",
      name: "Deepak Joshi",
      fullName: "Deepak Joshi",
      phone: "+919765432100",
      email: "deepak.j@office.com",
      aadhar_last4: "4488",
      flat_number: "102",
      flat: "102",
      wing: "B",
      floor: 1,
      floorNumber: "1",
      occupancyType: "Tenant",
      resident_type: "tenant",
      owner_name: "Alok Joshi",
      move_in_date: "10 Sep 2026",
      family_count: 3,
      society_name: "Green Valley Residency",
      societyId: "GRIHAM-PUNE-001",
      submitted_at: "2026-09-05T14:10:00Z",
      submittedAt: "2026-09-05T14:10:00Z",
      approved_at: "2026-09-17T09:15:00Z",
      approvedAt: "2026-09-17T09:15:00Z",
      approvedBy: "Chairman",
      rejectionReason: null,
      rejection_reason: null,
      profilePhoto: null,
      documents: [
        { name: "RentAgreement_B102.pdf", type: "Tenancy Agreement", size: "2.3 MB" }
      ]
    },
    {
      id: "REG-2026-0040",
      status: "approved",
      name: "Rajesh Kumar",
      fullName: "Rajesh Kumar",
      phone: "+919876543210",
      email: "rajesh.kumar@example.com",
      aadhar_last4: "1029",
      flat_number: "102",
      flat: "102",
      wing: "A",
      floor: 1,
      floorNumber: "1",
      occupancyType: "Owner",
      resident_type: "owner",
      owner_name: null,
      move_in_date: "01 Aug 2026",
      family_count: 4,
      society_name: "Green Valley Residency",
      societyId: "GRIHAM-PUNE-001",
      submitted_at: "2026-08-01T10:00:00Z",
      submittedAt: "2026-08-01T10:00:00Z",
      approved_at: "2026-09-17T08:30:00Z",
      approvedAt: "2026-09-17T08:30:00Z",
      approvedBy: "Admin",
      rejectionReason: null,
      rejection_reason: null,
      profilePhoto: null,
      documents: []
    },
    // --- REJECTED ---
    {
      id: "REG-2026-0035",
      status: "rejected",
      name: "Rohit Verma",
      fullName: "Rohit Verma",
      phone: "+919600001234",
      email: "rohit.v@testmail.com",
      aadhar_last4: "0011",
      flat_number: "601",
      flat: "601",
      wing: "E",
      floor: 6,
      floorNumber: "6",
      occupancyType: "Owner",
      resident_type: "owner",
      owner_name: null,
      move_in_date: "15 Aug 2026",
      family_count: 2,
      society_name: "Green Valley Residency",
      societyId: "GRIHAM-PUNE-001",
      submitted_at: "2026-08-12T09:00:00Z",
      submittedAt: "2026-08-12T09:00:00Z",
      rejected_at: "2026-08-13T10:00:00Z",
      rejectedAt: "2026-08-13T10:00:00Z",
      rejectedBy: "Admin",
      rejectionReason: "Flat ownership or tenancy could not be verified.",
      rejection_reason: "Flat ownership or tenancy could not be verified.",
      profilePhoto: null,
      documents: []
    },
    {
      id: "REG-2026-0036",
      status: "rejected",
      name: "Rohit Patil",
      fullName: "Rohit Patil",
      phone: "+919711110000",
      email: "rohit.p@proton.me",
      aadhar_last4: "5566",
      flat_number: "204",
      flat: "204",
      wing: "B",
      floor: 2,
      floorNumber: "2",
      occupancyType: "Tenant",
      resident_type: "tenant",
      owner_name: "Suresh Patil",
      move_in_date: "20 Aug 2026",
      family_count: 1,
      society_name: "Green Valley Residency",
      societyId: "GRIHAM-PUNE-001",
      submitted_at: "2026-09-17T10:00:00Z",
      submittedAt: "2026-09-17T10:00:00Z",
      rejected_at: "2026-09-17T12:00:00Z",
      rejectedAt: "2026-09-17T12:00:00Z",
      rejectedBy: "Admin",
      rejectionReason: "Incorrect flat details",
      rejection_reason: "Incorrect flat details",
      profilePhoto: null,
      documents: []
    }
  ]
};

window.MOCK_APPROVALS_DB = MOCK_APPROVALS_DB;

/**
 * Mock Approvals Adapter for local & demo modes
 */
window.mockApprovalsAdapter = async function(endpoint, options, payload = {}) {
  const base = typeof API_CONFIG !== "undefined" ? API_CONFIG.ENDPOINTS.ADMIN_APPROVALS : "/v1/admin/approvals";
  const decisionEndpoint = typeof API_CONFIG !== "undefined" ? API_CONFIG.ENDPOINTS.ADMIN_APPROVALS_DECISION : "/v1/admin/approvals/decision";

  // GET /v1/admin/approvals
  if (endpoint === base || endpoint === "/admin/approvals" || endpoint.startsWith(base + "?")) {
    return {
      status: "success",
      mock: true,
      approvals: MOCK_APPROVALS_DB.approvals
    };
  }

  // PUT /v1/admin/approvals/decision
  if (endpoint === decisionEndpoint || endpoint === "/admin/approvals/decision") {
    const approval = MOCK_APPROVALS_DB.approvals.find(a => a.id === payload.id);
    if (!approval) {
      const err = new Error("Approval record not found");
      err.status = 404;
      throw err;
    }
    if (approval.status !== "pending" && approval.status !== "Pending") {
      const err = new Error("This application has already been reviewed");
      err.status = 409;
      throw err;
    }

    const nowIso = new Date().toISOString();
    if (payload.decision === "approved") {
      approval.status = "approved";
      approval.accountStatus = "Active";
      approval.approved_at = nowIso;
      approval.approvedAt = nowIso;
      approval.approvedBy = "Chairman";
    } else {
      approval.status = "rejected";
      approval.accountStatus = "Inactive";
      approval.rejection_reason = payload.rejection_reason || "Rejected by administrator.";
      approval.rejectionReason = approval.rejection_reason;
      approval.rejected_at = nowIso;
      approval.rejectedAt = nowIso;
      approval.rejectedBy = "Admin";
    }

    return {
      status: "success",
      mock: true,
      message: payload.decision === "approved"
        ? `${approval.fullName || approval.name} has been approved and will receive access to Griham.`
        : `${approval.fullName || approval.name}'s registration has been rejected.`,
      approval
    };
  }

  return undefined;
};
