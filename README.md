# Griham — Your Society, Connected

Griham is a mobile-first residential society management platform designed to connect residents, administrators, and gatekeepers into a seamless, unified ecosystem.

## 🌟 Key Features

- **Resident Portal**: Access notices, log visitors, manage deliveries, trigger emergency SOS alerts, and engage with the society community.
- **Admin Management Suite**: Manage society members, handle bulk services, track analytics, maintain facility bookings, and configure society settings.
- **Gatekeeper Portal**: Rapid visitor verification, delivery logging, resident authorization checks, and station PIN security.
- **Authentication & Security**: Multi-role access control (Resident, Admin, Gatekeeper) with token management and password recovery.
- **Offline & Responsive**: Mobile-first responsive UI built with pure CSS tokens, dark mode support, and accessibility standards.

## 📁 Project Structure

```text
Griham/
├── frontend/
│   ├── assets/       # Static assets, icons, and illustrations
│   ├── css/          # Modular CSS architecture (tokens, components, screens)
│   ├── js/
│   │   ├── api/      # Network client and API configuration
│   │   ├── auth/     # Role-based authentication logic
│   │   ├── components/ # Reusable UI components
│   │   ├── mock/     # Mock data and test simulators
│   │   ├── pages/    # Role-specific views (resident, admin, gatekeeper, auth)
│   │   └── utils/    # Helper utilities and storage management
│   └── index.html    # Main application shell
├── scratch/          # Development audit scripts and test runners
└── README.md
```

## 🚀 Getting Started

To run the application locally, serve the `frontend/` directory using any static file server:

```bash
# Using Python
python -m http.server 8000 --directory frontend

# Using Node.js (npx serve)
npx serve frontend
```

Open `http://localhost:8000` in your browser.
