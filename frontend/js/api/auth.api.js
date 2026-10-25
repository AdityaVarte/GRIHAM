// Feature API: auth.api.js

window.loginResident = async function(credentials) {
  return apiPost(API_CONFIG.ENDPOINTS.AUTH_LOGIN, credentials);
}

window.loginAdmin = async function(credentials) {
  return apiPost(API_CONFIG.ENDPOINTS.AUTH_LOGIN, { ...credentials, role: "admin" });
}

window.loginGatekeeper = async function(credentials) {
  return apiPost(API_CONFIG.ENDPOINTS.AUTH_GATEKEEPER_LOGIN, credentials);
}

window.registerResident = async function(registrationData) {
  return apiPost(API_CONFIG.ENDPOINTS.AUTH_REGISTER, registrationData);
}

window.forgotPassword = async function(payload) {
  return apiPost(API_CONFIG.ENDPOINTS.AUTH_FORGOT_PASSWORD, payload);
}

window.verifyOtp = async function(payload) {
  return apiPost(API_CONFIG.ENDPOINTS.AUTH_VERIFY_OTP, payload);
}

window.resendOtp = async function(payload) {
  return apiPost(API_CONFIG.ENDPOINTS.AUTH_RESEND_OTP, payload);
}

window.resetPassword = async function(payload) {
  return apiPost(API_CONFIG.ENDPOINTS.AUTH_RESET_PASSWORD, payload);
}

window.mockAuthAdapter = async function(endpoint, options, payload) {
  if (endpoint === API_CONFIG.ENDPOINTS.AUTH_GATEKEEPER_LOGIN || (endpoint === API_CONFIG.ENDPOINTS.AUTH_LOGIN && payload && payload.role === "gatekeeper")) {
    const societyId = (payload.society_id || "").trim();
    const pin = (payload.station_pin || payload.password || "").trim();

    if (!societyId || !pin) {
      const error = new Error("Society ID and Station PIN are required");
      error.status = 400;
      throw error;
    }

    if (pin === "error" || pin === "0000") {
      const error = new Error("Invalid Station PIN.");
      error.status = 401;
      throw error;
    }

    const gatekeepersDb = window.MOCK_GATEKEEPERS_DB || { gatekeepers: [] };
    const matchingGk = (gatekeepersDb.gatekeepers || []).find(g => 
      g.societyId && g.societyId.toUpperCase() === societyId.toUpperCase() && g.status === "Active"
    );

    if (societyId.toUpperCase().includes("INVALID") || (!matchingGk && !societyId.toUpperCase().includes("GRIHAM"))) {
      const error = new Error("Invalid Society ID. Society not found.");
      error.status = 401;
      throw error;
    }

    return {
      status: "success",
      mock: true,
      access_token: "mock-jwt-token-gatekeeper-session",
      user: {
        id: matchingGk ? matchingGk.id : "GTK-001",
        society_id: societyId || (matchingGk ? matchingGk.societyId : "GRIHAM-PUNE-001"),
        societyName: "Green Valley Residency",
        role: "gatekeeper",
        name: matchingGk ? matchingGk.name : "Amit Sharma",
        phone: matchingGk ? matchingGk.phone : "+919876543211",
        station: "Main Gate Security Station",
        status: "Active"
      }
    };
  }

  if (endpoint === API_CONFIG.ENDPOINTS.AUTH_LOGIN) {
    if (payload.password === "error" || payload.phone === "0000000000" || payload.society_id === "INVALID") {
      const error = new Error("Invalid credentials");
      error.status = 401;
      throw error;
    }
    if (payload.role === "admin") {
      return {
        status: "success",
        mock: true,
        access_token: "mock-admin-token",
        user: {
          society_id: payload.society_id || "GRIHAM-PUNE-001",
          phone: payload.phone || "9876543210",
          role: "admin",
          name: "Society Administrator"
        }
      };
    }

    const cleanPhone = (payload.phone || "").replace(/\D/g, "");
    let residentUser = {
      id: "USR-001",
      society_id: payload.society_id || "GRIHAM-PUNE-001",
      societyName: "Green Valley Residency",
      phone: payload.phone || "9876543210",
      role: "resident",
      name: "Rajesh Kumar",
      wing: "A",
      flatNumber: "204",
      occupancyType: "Owner",
      approvalStatus: "Approved"
    };

    if (cleanPhone === "9812345678") {
      residentUser = {
        id: "USR-002",
        society_id: payload.society_id || "GRIHAM-PUNE-001",
        societyName: "Green Valley Residency",
        phone: "9812345678",
        role: "resident",
        name: "Priya Patil",
        wing: "A",
        flatNumber: "102",
        occupancyType: "Owner",
        approvalStatus: "Approved"
      };
    } else if (cleanPhone === "9801234567") {
      residentUser = {
        id: "USR-004",
        society_id: payload.society_id || "GRIHAM-PUNE-001",
        societyName: "Green Valley Residency",
        phone: "9801234567",
        role: "resident",
        name: "Sunita Krishnan",
        wing: "A",
        flatNumber: "401",
        occupancyType: "Owner",
        approvalStatus: "Approved"
      };
    } else if (cleanPhone === "9822334455") {
      residentUser = {
        id: "USR-003",
        society_id: payload.society_id || "GRIHAM-PUNE-001",
        societyName: "Green Valley Residency",
        phone: "9822334455",
        role: "resident",
        name: "Vikram Malhotra",
        wing: "B",
        flatNumber: "504",
        occupancyType: "Owner",
        approvalStatus: "Approved"
      };
    }

    return {
      status: "success",
      mock: true,
      access_token: "mock_jwt_token_resident_session",
      user: residentUser
    };
  }

  if (endpoint === API_CONFIG.ENDPOINTS.AUTH_REGISTER) {
    return {
      status: "success",
      mock: true,
      message: "Registration successful"
    };
  }

  if (endpoint === API_CONFIG.ENDPOINTS.AUTH_FORGOT_PASSWORD) {
    const cleanPhone = (payload.phone || "").replace(/\\D/g, "");
    const masked = cleanPhone.length > 4 
      ? "*".repeat(Math.max(2, cleanPhone.length - 4)) + cleanPhone.slice(-4)
      : "******" + cleanPhone;
    return {
      status: "otp_sent",
      mock: true,
      message: "OTP sent successfully to registered phone",
      society_id: payload.society_id,
      masked_phone: masked
    };
  }

  if (endpoint === API_CONFIG.ENDPOINTS.AUTH_VERIFY_OTP) {
    if (payload.otp === "000000" || payload.otp === "999999") {
      const error = new Error("Invalid or expired OTP");
      error.status = 400;
      throw error;
    }
    return {
      status: "verified",
      mock: true,
      message: "OTP verified successfully",
      reset_token: "mock_pwd_reset_token"
    };
  }

  if (endpoint === API_CONFIG.ENDPOINTS.AUTH_RESEND_OTP) {
    return {
      status: "otp_resent",
      mock: true,
      message: "A new 6-digit OTP has been sent"
    };
  }

  if (endpoint === API_CONFIG.ENDPOINTS.AUTH_RESET_PASSWORD) {
    if (!payload.new_password || payload.new_password.length < 8) {
      const error = new Error("Password must be at least 8 characters");
      error.status = 400;
      throw error;
    }
    return {
      status: "success",
      mock: true,
      message: "Password reset successful"
    };
  }

  return undefined;
};
