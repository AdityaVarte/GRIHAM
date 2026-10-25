// Feature API: workers.api.js

window.getWorkers = async function(params = {}) {
  return apiGet(API_CONFIG.ENDPOINTS.ADMIN_WORKERS, params);
}

window.getWorkerDetail = async function(workerId) {
  return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_WORKERS, workerId));
}

window.createWorker = async function(workerData) {
  return apiPost(API_CONFIG.ENDPOINTS.ADMIN_WORKERS, workerData);
}

window.updateWorker = async function(workerId, workerData) {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_WORKERS, workerId), workerData);
}

window.updateWorkerAttendance = async function(workerId, attendanceData) {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_WORKER_ATTENDANCE_BASE, workerId), attendanceData);
}

window.getWorkerAttendanceHistory = async function(workerId, params = {}) {
  return apiGet(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_WORKER_ATTENDANCE_BASE, workerId), params);
}

window.deactivateWorker = async function(workerId) {
  return apiPut(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.ADMIN_WORKERS, workerId, "deactivate"), {});
}


window.mockWorkersAdapter = async function(endpoint, options, payload) {
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_WORKERS && options.method === "GET") {
    const all = MOCK_WORKERS_DB.workers.filter(w => w.status === "Active");
    return {
      status: "success",
      mock: true,
      workers: all,
      summary: {
        total: all.length,
        present: all.filter(w => w.attendance === "Present").length,
        absent: all.filter(w => w.attendance === "Absent").length,
        half_day: all.filter(w => w.attendance === "Half Day").length,
        on_leave: all.filter(w => w.attendance === "On Leave").length
      }
    };
  }
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_WORKERS + "/") && options.method === "GET" && !endpoint.includes("/attendance") && !endpoint.includes("/deactivate")) {
    const workerId = endpoint.split("/").pop();
    const worker = MOCK_WORKERS_DB.workers.find(w => w.id === workerId);
    if (!worker) {
      const error = new Error("Worker not found");
      error.status = 404;
      throw error;
    }
    return {
      status: "success",
      mock: true,
      worker
    };
  }
  if (endpoint === API_CONFIG.ENDPOINTS.ADMIN_WORKERS && options.method === "POST") {
    const newWorker = {
      id: `WRK-${String(MOCK_WORKERS_DB.nextId).padStart(3, "0")}`,
      worker_id: `WRK-${String(MOCK_WORKERS_DB.nextId).padStart(3, "0")}`,
      name: payload.name || "New Worker",
      phone: payload.phone || "",
      email: payload.email || "",
      role: payload.role || "Other",
      joining_date: payload.joining_date || new Date().toISOString().split("T")[0],
      employment_type: payload.employment_type || "Full Time",
      emergency_contact: payload.emergency_contact || null,
      attendance: "Present",
      check_in: null,
      check_out: null,
      status: "Active",
      avatar: null
    };
    MOCK_WORKERS_DB.nextId += 1;
    MOCK_WORKERS_DB.workers.push(newWorker);
    return {
      status: "success",
      mock: true,
      message: `Worker ${newWorker.name} added successfully.`,
      worker: newWorker
    };
  }
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_WORKERS + "/") && !endpoint.includes("/attendance") && !endpoint.includes("/deactivate") && options.method === "PUT") {
    const workerId = endpoint.split("/").pop();
    const worker = MOCK_WORKERS_DB.workers.find(w => w.id === workerId);
    if (!worker) {
      const error = new Error("Worker not found");
      error.status = 404;
      throw error;
    }
    Object.assign(worker, {
      name: payload.name || worker.name,
      phone: payload.phone || worker.phone,
      email: payload.email || worker.email,
      role: payload.role || worker.role,
      employment_type: payload.employment_type || worker.employment_type,
      emergency_contact: payload.emergency_contact || worker.emergency_contact
    });
    return {
      status: "success",
      mock: true,
      message: `Worker ${worker.name} updated successfully.`,
      worker
    };
  }
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_WORKER_ATTENDANCE_BASE + "/") && options.method === "PUT") {
    const workerId = endpoint.split("/").pop();
    const worker = MOCK_WORKERS_DB.workers.find(w => w.id === workerId);
    if (!worker) {
      const error = new Error("Worker not found");
      error.status = 404;
      throw error;
    }
    worker.attendance = payload.status || worker.attendance;
    worker.check_in = payload.check_in || (payload.status === "Present" ? null : null);
    worker.check_out = payload.check_out || null;

    // Add to attendance history
    const monthKey = payload.date ? payload.date.substring(0, 7) : new Date().toISOString().substring(0, 7);
    if (!MOCK_WORKERS_DB.attendanceHistory[monthKey]) {
      MOCK_WORKERS_DB.attendanceHistory[monthKey] = {};
    }
    if (!MOCK_WORKERS_DB.attendanceHistory[monthKey][workerId]) {
      MOCK_WORKERS_DB.attendanceHistory[monthKey][workerId] = [];
    }
    const existingIdx = MOCK_WORKERS_DB.attendanceHistory[monthKey][workerId].findIndex(
      r => r.date === (payload.date || new Date().toISOString().split("T")[0])
    );
    const histEntry = {
      date: payload.date || new Date().toISOString().split("T")[0],
      day: payload.day || new Date().toLocaleDateString("en-US", { weekday: "long" }),
      status: payload.status,
      check_in: payload.check_in || null,
      check_out: payload.check_out || null
    };
    if (existingIdx >= 0) {
      MOCK_WORKERS_DB.attendanceHistory[monthKey][workerId][existingIdx] = histEntry;
    } else {
      MOCK_WORKERS_DB.attendanceHistory[monthKey][workerId].push(histEntry);
    }

    return {
      status: "success",
      mock: true,
      message: `Attendance updated for ${worker.name}.`,
      worker
    };
  }
  if (endpoint.startsWith(API_CONFIG.ENDPOINTS.ADMIN_WORKER_ATTENDANCE_BASE + "/") && options.method === "GET") {
    const parts = endpoint.split("/");
    const workerId = parts[parts.length - 1]; // Last segment is worker ID
    const monthKey = new URLSearchParams(endpoint.split("?")[1] || "").get("month");
    const worker = MOCK_WORKERS_DB.workers.find(w => w.id === workerId);
    if (!worker) {
      const error = new Error("Worker not found");
      error.status = 404;
      throw error;
    }
    const history = monthKey
      ? (MOCK_WORKERS_DB.attendanceHistory[monthKey]?.[workerId] || [])
      : Object.values(MOCK_WORKERS_DB.attendanceHistory)
          .flatMap(m => m[workerId] || [])
          .sort((a, b) => b.date.localeCompare(a.date));

    return {
      status: "success",
      mock: true,
      worker_id: workerId,
      month: monthKey || "all",
      attendance: history
    };
  }
  return undefined;
};
