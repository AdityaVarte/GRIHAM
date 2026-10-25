/**
 * Griham Design System - Client Router & Access Guard
 * File: js/router.js
 *
 * Centralized router providing:
 * - Declarative route-to-role permissions
 * - Hash path normalization and alias resolution
 * - Route guards: Authentication (401) & Role Authorization (403)
 * - Safe fallback for unknown routes
 * - View rendering without duplicate access checks
 */

const GrihamRouter = {
  /**
   * Declarative Route-to-Role Permissions Mapping
   */
  ROUTE_PERMISSIONS: {
    // Public routes (accessible without session)
    "/": { public: true },
    "/entry": { public: true },
    "/resident/login": { public: true },
    "/resident/register": { public: true },
    "/auth/forgot-password": { public: true },
    "/admin/login": { public: true },
    "/gatekeeper/login": { public: true },

    // Admin-only protected routes
    "/admin/home": { role: "admin" },
    "/admin/sos": { role: "admin" },
    "/admin/maintenance": { role: "admin" },
    "/admin/complaints": { role: "admin" },
    "/admin/approvals": { role: "admin" },
    "/admin/workers": { role: "admin" },
    "/admin/amenities": { role: "admin" },
    "/admin/notifications": { role: "admin" },
    "/admin/profile": { role: "admin" },
    "/admin/bulk-service": { role: "admin" },
    "/admin/add-staff": { role: "admin" },

    // Resident-only protected routes
    "/resident/home": { role: "resident" },
    "/resident/profile": { role: "resident" },
    "/resident/maintenance": { role: "resident" },
    "/resident/complaints": { role: "resident" },
    "/resident/amenities": { role: "resident" },
    "/resident/services": { role: "resident" },
    "/resident/voting": { role: "resident" },

    // Gatekeeper protected routes
    "/gatekeeper/home": { role: "gatekeeper" },
    "/gatekeeper/visitors": { role: "gatekeeper" },
    "/gatekeeper/deliveries": { role: "gatekeeper" },
    "/gatekeeper/notifications": { role: "gatekeeper" },
    "/gatekeeper/profile": { role: "gatekeeper" }
  },

  /**
   * Route Aliases to support legacy or alternative URL hashes
   */
  ROUTE_ALIASES: {
    "admin-sos": "/admin/sos",
    "/admin-sos": "/admin/sos",
    "admin-approvals": "/admin/approvals",
    "admin-workers": "/admin/workers",
    "admin-amenities": "/admin/amenities",
    "admin-profile": "/admin/profile",
    "admin-bulk-service": "/admin/bulk-service",
    "/admin/bulk-services": "/admin/bulk-service",
    "admin-bulk-services": "/admin/bulk-service",
    "admin-add-staff": "/admin/add-staff",
    "/admin-add-staff": "/admin/add-staff",
    "resident-home": "/resident/home",
    "/resident-home": "/resident/home",
    "resident-profile": "/resident/profile",
    "/resident-profile": "/resident/profile",
    "resident-complaints": "/resident/complaints",
    "/resident-complaints": "/resident/complaints",
    "resident-services": "/resident/services",
    "/resident-services": "/resident/services",
    "resident-amenities": "/resident/amenities",
    "/resident-amenities": "/resident/amenities",
    "resident-maintenance": "/resident/maintenance",
    "/resident-maintenance": "/resident/maintenance",
    "resident-voting": "/resident/voting",
    "/resident-voting": "/resident/voting",
    "gatekeeper-login": "/gatekeeper/login",
    "/gatekeeper-login": "/gatekeeper/login",
    "gatekeeper-home": "/gatekeeper/home",
    "/gatekeeper-home": "/gatekeeper/home",
    "gatekeeper-visitors": "/gatekeeper/visitors",
    "/gatekeeper-visitors": "/gatekeeper/visitors",
    "gatekeeper/visitors": "/gatekeeper/visitors",
    "gatekeeper-deliveries": "/gatekeeper/deliveries",
    "/gatekeeper-deliveries": "/gatekeeper/deliveries",
    "deliveries": "/gatekeeper/deliveries",
    "/deliveries": "/gatekeeper/deliveries",
    "gatekeeper/deliveries": "/gatekeeper/deliveries",
    "gatekeeper-notifications": "/gatekeeper/notifications",
    "/gatekeeper-notifications": "/gatekeeper/notifications",
    "gatekeeper/notifications": "/gatekeeper/notifications",
    "gatekeeper-profile": "/gatekeeper/profile",
    "/gatekeeper-profile": "/gatekeeper/profile",
    "gatekeeper/profile": "/gatekeeper/profile"
  },

  /**
   * Route Definitions Table
   */
  routes: {
    "/": {
      screen: "entry",
      title: "Griham — Your Society, Connected"
    },
    "/entry": {
      screen: "entry",
      title: "Griham — Your Society, Connected"
    },
    "/resident/login": {
      screen: "resident-login",
      title: "Resident Login — Griham"
    },
    "/resident/register": {
      screen: "resident-register",
      title: "Resident Registration — Griham"
    },
    "/auth/forgot-password": {
      screen: "forgot-password",
      title: "Reset Password — Griham"
    },
    "/admin/login": {
      screen: "admin-login",
      title: "Admin Login — Griham"
    },
    "/admin/home": {
      screen: "admin-home",
      title: "Admin Dashboard — Griham"
    },
    "/admin/sos": {
      screen: "admin-sos",
      title: "Emergency SOS Alerts — Griham"
    },
    "admin-sos": {
      screen: "admin-sos",
      title: "Emergency SOS Alerts — Griham"
    },
    "/admin-sos": {
      screen: "admin-sos",
      title: "Emergency SOS Alerts — Griham"
    },
    "/admin/maintenance": {
      screen: "admin-maintenance",
      title: "Maintenance — Griham"
    },
    "/admin/complaints": {
      screen: "admin-complaints",
      title: "Complaints — Griham"
    },
    "/admin/approvals": {
      screen: "admin-approvals",
      title: "Pending Approvals — Griham"
    },
    "admin-approvals": {
      screen: "admin-approvals",
      title: "Pending Approvals — Griham"
    },
    "/admin/workers": {
      screen: "admin-workers",
      title: "Worker / Staff — Griham"
    },
    "admin-workers": {
      screen: "admin-workers",
      title: "Worker / Staff — Griham"
    },
    "/admin/amenities": {
      screen: "admin-amenities",
      title: "Amenities — Griham"
    },
    "admin-amenities": {
      screen: "admin-amenities",
      title: "Amenities — Griham"
    },
    "/admin/notifications": {
      screen: "admin-notifications",
      title: "Notifications — Griham"
    },
    "/admin/profile": {
      screen: "admin-profile",
      title: "Admin Profile & Society Settings — Griham"
    },
    "admin-profile": {
      screen: "admin-profile",
      title: "Admin Profile & Society Settings — Griham"
    },
    "/admin/bulk-service": {
      screen: "admin-bulk-service",
      title: "Service Requests — Griham"
    },
    "admin-bulk-service": {
      screen: "admin-bulk-service",
      title: "Service Requests — Griham"
    },
    "/admin/add-staff": {
      screen: "admin-add-staff",
      title: "Staff & Vendors — Griham"
    },
    "admin-add-staff": {
      screen: "admin-add-staff",
      title: "Staff & Vendors — Griham"
    },
    "/admin-add-staff": {
      screen: "admin-add-staff",
      title: "Staff & Vendors — Griham"
    },
    "/gatekeeper/login": {
      screen: "gatekeeper-login",
      title: "Gatekeeper Login — Griham"
    },
    "gatekeeper-login": {
      screen: "gatekeeper-login",
      title: "Gatekeeper Login — Griham"
    },
    "/gatekeeper-login": {
      screen: "gatekeeper-login",
      title: "Gatekeeper Login — Griham"
    },
    "/resident/home": {
      screen: "resident-home",
      title: "Resident Home — Griham"
    },
    "resident-home": {
      screen: "resident-home",
      title: "Resident Home — Griham"
    },
    "/resident-home": {
      screen: "resident-home",
      title: "Resident Home — Griham"
    },
    "/resident/profile": {
      screen: "resident-profile",
      title: "Resident Profile — Griham"
    },
    "resident-profile": {
      screen: "resident-profile",
      title: "Resident Profile — Griham"
    },
    "/resident-profile": {
      screen: "resident-profile",
      title: "Resident Profile — Griham"
    },
    "/resident/maintenance": {
      screen: "resident-maintenance",
      title: "Maintenance History — Griham"
    },
    "resident-maintenance": {
      screen: "resident-maintenance",
      title: "Maintenance History — Griham"
    },
    "/resident-maintenance": {
      screen: "resident-maintenance",
      title: "Maintenance History — Griham"
    },
    "/resident/complaints": {
      screen: "resident-complaints",
      title: "Complaints & Helpdesk — Griham"
    },
    "resident-complaints": {
      screen: "resident-complaints",
      title: "Complaints & Helpdesk — Griham"
    },
    "/resident-complaints": {
      screen: "resident-complaints",
      title: "Complaints & Helpdesk — Griham"
    },
    "/resident/amenities": {
      screen: "resident-amenities",
      title: "Amenity Bookings — Griham"
    },
    "resident-amenities": {
      screen: "resident-amenities",
      title: "Amenity Bookings — Griham"
    },
    "/resident-amenities": {
      screen: "resident-amenities",
      title: "Amenity Bookings — Griham"
    },
    "/resident/services": {
      screen: "resident-services",
      title: "Service Requests — Griham"
    },
    "resident-services": {
      screen: "resident-services",
      title: "Service Requests — Griham"
    },
    "/resident-services": {
      screen: "resident-services",
      title: "Service Requests — Griham"
    },
    "/resident/voting": {
      screen: "resident-voting",
      title: "Society Voting & Proposals — Griham"
    },
    "resident-voting": {
      screen: "resident-voting",
      title: "Society Voting & Proposals — Griham"
    },
    "/resident-voting": {
      screen: "resident-voting",
      title: "Society Voting & Proposals — Griham"
    },
    "/gatekeeper/home": {
      screen: "gatekeeper-home",
      title: "Security Terminal — Griham"
    },
    "gatekeeper-home": {
      screen: "gatekeeper-home",
      title: "Security Terminal — Griham"
    },
    "/gatekeeper-home": {
      screen: "gatekeeper-home",
      title: "Security Terminal — Griham"
    },
    "/gatekeeper/visitors": {
      screen: "gatekeeper-visitors",
      title: "Visitor Management — Griham"
    },
    "gatekeeper-visitors": {
      screen: "gatekeeper-visitors",
      title: "Visitor Management — Griham"
    },
    "/gatekeeper-visitors": {
      screen: "gatekeeper-visitors",
      title: "Visitor Management — Griham"
    },
    "/gatekeeper/deliveries": {
      screen: "gatekeeper-deliveries",
      title: "Delivery Management — Griham"
    },
    "gatekeeper-deliveries": {
      screen: "gatekeeper-deliveries",
      title: "Delivery Management — Griham"
    },
    "/gatekeeper-deliveries": {
      screen: "gatekeeper-deliveries",
      title: "Delivery Management — Griham"
    },
    "/gatekeeper/notifications": {
      screen: "gatekeeper-notifications",
      title: "Notifications — Security Terminal"
    },
    "gatekeeper-notifications": {
      screen: "gatekeeper-notifications",
      title: "Notifications — Security Terminal"
    },
    "/gatekeeper-notifications": {
      screen: "gatekeeper-notifications",
      title: "Notifications — Security Terminal"
    },
    "/gatekeeper/profile": {
      screen: "gatekeeper-profile",
      title: "Gatekeeper Profile — Griham"
    },
    "gatekeeper-profile": {
      screen: "gatekeeper-profile",
      title: "Gatekeeper Profile — Griham"
    },
    "/gatekeeper-profile": {
      screen: "gatekeeper-profile",
      title: "Gatekeeper Profile — Griham"
    }
  },

  /**
   * Initialize router event listeners and handle initial location
   */
  init() {
    window.addEventListener("hashchange", () => this.handleRoute());
    this.handleRoute();
  },

  /**
   * Programmatically navigate to a route
   * @param {string} path
   */
  navigate(path) {
    const current = window.location.hash.slice(1);
    if (current !== path) {
      GrihamState.historyStack.push(GrihamState.currentRoute);
      window.location.hash = path;
    } else {
      this.handleRoute();
    }
  },

  /**
   * Navigate back through history stack or fallback to entry
   */
  goBack() {
    if (GrihamState.historyStack && GrihamState.historyStack.length > 0) {
      const prev = GrihamState.historyStack.pop();
      window.location.hash = prev || "/entry";
    } else {
      window.location.hash = "/entry";
    }
  },

  /**
   * Normalize an incoming hash or pathname to canonical form
   * @param {string} rawPath
   * @returns {string}
   */
  normalizePath(rawPath) {
    if (!rawPath) return "/";
    let cleaned = String(rawPath).trim();
    if (cleaned.startsWith("#")) cleaned = cleaned.slice(1);
    if (!cleaned) return "/";

    // Strip query parameters for route matching
    if (cleaned.includes("?")) {
      cleaned = cleaned.split("?")[0];
    }

    if (this.ROUTE_ALIASES[cleaned]) {
      return this.ROUTE_ALIASES[cleaned];
    }

    if (!cleaned.startsWith("/")) cleaned = "/" + cleaned;
    if (this.ROUTE_ALIASES[cleaned]) {
      return this.ROUTE_ALIASES[cleaned];
    }

    if (cleaned.length > 1 && cleaned.endsWith("/")) {
      cleaned = cleaned.slice(0, -1);
    }

    return cleaned;
  },

  /**
   * Check if a route is publicly accessible without authentication
   * @param {string} path
   * @returns {boolean}
   */
  isPublicRoute(path) {
    const normalized = this.normalizePath(path);
    const perm = this.ROUTE_PERMISSIONS[normalized];
    return !!(perm && perm.public);
  },

  /**
   * Get the required role for a given route, if any
   * @param {string} path
   * @returns {string|null}
   */
  getRequiredRole(path) {
    const normalized = this.normalizePath(path);
    const perm = this.ROUTE_PERMISSIONS[normalized];
    return perm ? perm.role || null : null;
  },

  /**
   * Central Route Handler: executes route guards before activating screens
   */
  handleRoute() {
    const hash = window.location.hash || "";
    const rawHash = hash.startsWith("#") ? hash.slice(1) : hash;
    const resolvedPath = this.normalizePath(rawHash);
    const route = this.routes[resolvedPath] || this.routes[rawHash];

    // Safe fallback for completely unknown routes
    if (!route) {
      console.warn(`[RouteGuard] Unknown route "${rawHash}". Safe fallback redirect.`);
      const isAuth = typeof GrihamAuth !== "undefined" && GrihamAuth.isAuthenticated();
      if (isAuth) {
        const role = GrihamAuth.getRole();
        if (role === "admin") {
          this.navigate("/admin/home");
        } else if (role === "resident") {
          this.navigate("/resident/home");
        } else if (role === "gatekeeper") {
          this.navigate("/gatekeeper/home");
        } else {
          this.navigate("/entry");
        }
      } else {
        this.navigate("/entry");
      }
      return;
    }

    // =================================================================
    // CENTRAL ROUTE GUARD: Authentication & Role-Based Authorization
    // =================================================================
    const isPublic = this.isPublicRoute(resolvedPath);

    if (!isPublic) {
      const isAuth = typeof GrihamAuth !== "undefined" && GrihamAuth.isAuthenticated();

      // 1. Authentication Check (401 equivalent in frontend)
      if (!isAuth) {
        console.warn(`[RouteGuard] Unauthenticated access to "${resolvedPath}". Redirecting to login.`);
        const reqRole = this.getRequiredRole(resolvedPath);
        if (reqRole === "admin") {
          this.navigate("/admin/login");
        } else if (reqRole === "resident") {
          this.navigate("/resident/login");
        } else if (reqRole === "gatekeeper") {
          this.navigate("/gatekeeper/login");
        } else {
          this.navigate("/entry");
        }
        return;
      }

      // 2. Role Authorization Check (403 equivalent in frontend)
      const requiredRole = this.getRequiredRole(resolvedPath);
      if (requiredRole) {
        const hasAccess = typeof GrihamAuth !== "undefined" && GrihamAuth.hasRole(requiredRole);
        if (!hasAccess) {
          const currentRole = GrihamAuth.getRole();
          console.warn(`[RouteGuard] Unauthorized role "${currentRole}" access to "${resolvedPath}" (requires "${requiredRole}").`);

          if (typeof GrihamToast !== "undefined") {
            GrihamToast.show("Access Denied: You do not have permission to view this page.", "warning");
          }

          // Safe redirect to user's own home screen without clearing their valid session
          if (currentRole === "admin") {
            this.navigate("/admin/home");
          } else if (currentRole === "resident") {
            this.navigate("/resident/home");
          } else if (currentRole === "gatekeeper") {
            this.navigate("/gatekeeper/home");
          } else {
            this.navigate("/entry");
          }
          return;
        }
      }
    }

    // Update active route state and page title
    GrihamState.currentRoute = resolvedPath;
    document.title = route.title;

    // Deactivate all screens
    document.querySelectorAll(".app-view").forEach(el => el.classList.remove("active"));

    // Cleanup gatekeeper terminal timers/sheets if leaving
    if (route.screen !== "gatekeeper-home" && typeof GrihamGatekeeperHomeUI !== "undefined" && typeof GrihamGatekeeperHomeUI.destroy === "function") {
      GrihamGatekeeperHomeUI.destroy();
    }
    if (route.screen !== "gatekeeper-visitors" && typeof GrihamGatekeeperVisitorsUI !== "undefined" && typeof GrihamGatekeeperVisitorsUI.destroy === "function") {
      GrihamGatekeeperVisitorsUI.destroy();
    }
    if (route.screen !== "gatekeeper-deliveries" && typeof GrihamGatekeeperDeliveriesUI !== "undefined" && typeof GrihamGatekeeperDeliveriesUI.destroy === "function") {
      GrihamGatekeeperDeliveriesUI.destroy();
    }
    if (route.screen !== "gatekeeper-notifications" && typeof GrihamGatekeeperNotificationsUI !== "undefined" && typeof GrihamGatekeeperNotificationsUI.destroy === "function") {
      GrihamGatekeeperNotificationsUI.destroy();
    }
    if (route.screen !== "gatekeeper-profile" && typeof GrihamGatekeeperProfileUI !== "undefined" && typeof GrihamGatekeeperProfileUI.destroy === "function") {
      GrihamGatekeeperProfileUI.destroy();
    }

    // Activate and render current screen
    this.renderScreen(route);

    // Smooth scroll to container top
    const appEl = document.getElementById("app");
    if (appEl && typeof appEl.scrollTo === "function") {
      appEl.scrollTo({ top: 0, behavior: "smooth" });
    }
  },

  /**
   * Render and initialize screen view without duplicate access guards
   * @param {Object} route
   */
  renderScreen(route) {
    const screen = route.screen;

    if (screen === "entry") {
      const el = document.getElementById("screen-entry");
      if (el) el.classList.add("active");
    } else if (screen === "resident-login") {
      const el = document.getElementById("screen-resident-login");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamAuthUI !== "undefined" && typeof GrihamAuthUI.resetForm === "function") {
          GrihamAuthUI.resetForm();
        }
      }
    } else if (screen === "resident-register") {
      const el = document.getElementById("screen-resident-register");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamRegistrationUI !== "undefined" && typeof GrihamRegistrationUI.resetForm === "function") {
          GrihamRegistrationUI.resetForm();
        }
      }
    } else if (screen === "forgot-password") {
      const el = document.getElementById("screen-forgot-password");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamForgotPasswordUI !== "undefined" && typeof GrihamForgotPasswordUI.init === "function") {
          GrihamForgotPasswordUI.init();
        }
      }
    } else if (screen === "admin-login") {
      const el = document.getElementById("screen-admin-login");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamAdminAuthUI !== "undefined" && typeof GrihamAdminAuthUI.resetForm === "function") {
          GrihamAdminAuthUI.resetForm();
        }
      }
    } else if (screen === "gatekeeper-login") {
      const el = document.getElementById("screen-gatekeeper-login");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamGatekeeperAuthUI !== "undefined" && typeof GrihamGatekeeperAuthUI.resetForm === "function") {
          GrihamGatekeeperAuthUI.resetForm();
        }
      }
    } else if (screen === "gatekeeper-home") {
      const el = document.getElementById("screen-gatekeeper-home");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamGatekeeperHomeUI !== "undefined" && typeof GrihamGatekeeperHomeUI.init === "function") {
          GrihamGatekeeperHomeUI.init();
        }
      }
    } else if (screen === "gatekeeper-visitors") {
      const el = document.getElementById("screen-gatekeeper-visitors");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamGatekeeperVisitorsUI !== "undefined" && typeof GrihamGatekeeperVisitorsUI.init === "function") {
          GrihamGatekeeperVisitorsUI.init();
        }
      }
    } else if (screen === "gatekeeper-deliveries") {
      const el = document.getElementById("screen-gatekeeper-deliveries");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamGatekeeperDeliveriesUI !== "undefined" && typeof GrihamGatekeeperDeliveriesUI.init === "function") {
          GrihamGatekeeperDeliveriesUI.init();
        }
      }
    } else if (screen === "gatekeeper-notifications") {
      const el = document.getElementById("screen-gatekeeper-notifications");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamGatekeeperNotificationsUI !== "undefined" && typeof GrihamGatekeeperNotificationsUI.init === "function") {
          GrihamGatekeeperNotificationsUI.init();
        }
      }
    } else if (screen === "gatekeeper-profile") {
      const el = document.getElementById("screen-gatekeeper-profile");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamGatekeeperProfileUI !== "undefined" && typeof GrihamGatekeeperProfileUI.init === "function") {
          GrihamGatekeeperProfileUI.init();
        }
      }
    } else if (screen === "resident-home") {
      const el = document.getElementById("screen-resident-home");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamResidentHomeUI !== "undefined" && typeof GrihamResidentHomeUI.init === "function") {
          GrihamResidentHomeUI.init();
        }
      }
    } else if (screen === "resident-profile") {
      const el = document.getElementById("screen-resident-profile");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamResidentProfileUI !== "undefined" && typeof GrihamResidentProfileUI.init === "function") {
          GrihamResidentProfileUI.init();
        }
      }
    } else if (screen === "resident-complaints") {
      const el = document.getElementById("screen-resident-complaints");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamResidentComplaintsUI !== "undefined" && typeof GrihamResidentComplaintsUI.init === "function") {
          GrihamResidentComplaintsUI.init();
        }
      }
    } else if (screen === "resident-services") {
      const el = document.getElementById("screen-resident-services");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamResidentServicesUI !== "undefined" && typeof GrihamResidentServicesUI.init === "function") {
          GrihamResidentServicesUI.init();
        }
      }
    } else if (screen === "resident-amenities") {
      const el = document.getElementById("screen-resident-amenities");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamResidentAmenitiesUI !== "undefined" && typeof GrihamResidentAmenitiesUI.init === "function") {
          GrihamResidentAmenitiesUI.init();
        }
      }
    } else if (screen === "resident-maintenance") {
      const el = document.getElementById("screen-resident-maintenance");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamResidentMaintenanceUI !== "undefined" && typeof GrihamResidentMaintenanceUI.init === "function") {
          GrihamResidentMaintenanceUI.init();
        }
      }
    } else if (screen === "resident-voting") {
      const el = document.getElementById("screen-resident-voting");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamResidentVotingUI !== "undefined" && typeof GrihamResidentVotingUI.init === "function") {
          GrihamResidentVotingUI.init();
        }
      }
    } else if (screen === "admin-home") {
      const el = document.getElementById("screen-admin-home");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamAdminDashboardUI !== "undefined" && typeof GrihamAdminDashboardUI.init === "function") {
          GrihamAdminDashboardUI.init();
        }
      }
    } else if (screen === "admin-notifications") {
      const el = document.getElementById("screen-admin-notifications");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamAdminNotificationsUI !== "undefined" && typeof GrihamAdminNotificationsUI.init === "function") {
          GrihamAdminNotificationsUI.init();
        }
      }
    } else if (screen === "admin-maintenance") {
      const el = document.getElementById("screen-admin-maintenance");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamAdminMaintenanceUI !== "undefined" && typeof GrihamAdminMaintenanceUI.init === "function") {
          GrihamAdminMaintenanceUI.init();
        }
      }
    } else if (screen === "admin-complaints") {
      const el = document.getElementById("screen-admin-complaints");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamAdminComplaintsUI !== "undefined" && typeof GrihamAdminComplaintsUI.init === "function") {
          GrihamAdminComplaintsUI.init();
        }
      }
    } else if (screen === "admin-approvals") {
      const el = document.getElementById("screen-admin-approvals");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamAdminApprovalsUI !== "undefined" && typeof GrihamAdminApprovalsUI.init === "function") {
          GrihamAdminApprovalsUI.init();
        }
      }
    } else if (screen === "admin-workers") {
      const el = document.getElementById("screen-admin-workers");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamAdminWorkersUI !== "undefined" && typeof GrihamAdminWorkersUI.init === "function") {
          GrihamAdminWorkersUI.init();
        }
      }
    } else if (screen === "admin-amenities") {
      const el = document.getElementById("screen-admin-amenities");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamAdminAmenitiesUI !== "undefined" && typeof GrihamAdminAmenitiesUI.init === "function") {
          GrihamAdminAmenitiesUI.init();
        }
      }
    } else if (screen === "admin-bulk-service") {
      const el = document.getElementById("screen-admin-bulk-service");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamAdminBulkServiceUI !== "undefined" && typeof GrihamAdminBulkServiceUI.init === "function") {
          GrihamAdminBulkServiceUI.init();
        }
      }
    } else if (screen === "admin-profile") {
      const el = document.getElementById("screen-admin-profile");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamAdminProfileUI !== "undefined" && typeof GrihamAdminProfileUI.init === "function") {
          GrihamAdminProfileUI.init();
        }
      }
    } else if (screen === "admin-add-staff") {
      const el = document.getElementById("screen-admin-add-staff");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamAdminAddStaffUI !== "undefined" && typeof GrihamAdminAddStaffUI.init === "function") {
          GrihamAdminAddStaffUI.init();
        }
      }
    } else if (screen === "admin-sos") {
      const el = document.getElementById("screen-admin-sos");
      if (el) {
        el.classList.add("active");
        if (typeof GrihamAdminSosUI !== "undefined" && typeof GrihamAdminSosUI.init === "function") {
          GrihamAdminSosUI.init();
        }
      }
    } else if (screen === "placeholder") {
      const phScreen = document.getElementById("screen-placeholder");
      const badgeEl = document.getElementById("placeholder-badge-text");
      const iconWrap = document.getElementById("placeholder-icon-box");
      const titleEl = document.getElementById("placeholder-title");
      const descEl = document.getElementById("placeholder-desc");
      const epEl = document.getElementById("placeholder-endpoint-info");

      if (badgeEl) badgeEl.textContent = route.badge || "";
      if (iconWrap) {
        iconWrap.className = `placeholder-icon-wrap ${route.iconStyle || ""}`;
        iconWrap.innerHTML = route.iconSvg || "";
      }
      if (titleEl) titleEl.textContent = route.heading || "";
      if (descEl) descEl.textContent = route.desc || "";
      if (epEl) epEl.textContent = route.endpoint ? `Target: ${route.endpoint}` : "";

      if (phScreen) phScreen.classList.add("active");
    }
  }
};

window.GrihamRouter = GrihamRouter;
