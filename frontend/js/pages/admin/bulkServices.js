
/* HTML TEMPLATE EXTRACTED FROM index.html */
window.HTML_BULKSERVICES = `
<div class="sheet-backdrop" id="bs-create-backdrop" onclick="GrihamAdminBulkServiceUI.closeCreateSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="bs-create-sheet" role="dialog" aria-modal="true" aria-labelledby="bs-create-sheet-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminBulkServiceUI.closeCreateSheet()" aria-label="Close create bulk service sheet" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h2 class="sheet-title" id="bs-create-sheet-title">Create Bulk Service</h2>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-bs-create" onsubmit="GrihamAdminBulkServiceUI.submitCreateCampaign(event)" style="display:flex; flex-direction:column; gap:0.9rem; padding:0.35rem 0 1rem;">
      <div class="form-group">
        <label class="form-label" for="bs-create-category">Service Category <span style="color:#ef4444;">*</span></label>
        <div class="input-wrapper select-wrapper">
          <select id="bs-create-category" class="form-input" required aria-label="Service category">
            <option value="Maintenance">Maintenance (AC, Painting, Waterproofing)</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Cleaning">Cleaning &amp; Pest Control</option>
            <option value="Security">Security &amp; Intercom</option>
            <option value="Gardening">Gardening &amp; Landscaping</option>
            <option value="Other">Other Community Service</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="bs-create-name">Service Name <span style="color:#ef4444;">*</span></label>
        <div class="input-wrapper">
          <input type="text" id="bs-create-name" class="form-input" required placeholder="e.g. AC Servicing, Water Tank Cleaning" aria-label="Service Name">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="bs-create-desc">Description</label>
        <div class="input-wrapper">
          <textarea id="bs-create-desc" class="form-input form-textarea" rows="2" placeholder="e.g. Annual AC servicing at discounted bulk rate." aria-label="Description"></textarea>
        </div>
      </div>

      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="bs-create-required-count">Required Applicants <span style="color:#ef4444;">*</span></label>
          <div class="input-wrapper">
            <input type="number" id="bs-create-required-count" class="form-input" min="1" max="200" value="10" required onchange="GrihamAdminBulkServiceUI.handleCreateCountChange(this.value)" oninput="GrihamAdminBulkServiceUI.handleCreateCountChange(this.value)" aria-label="Required number of applicants">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="bs-create-priority">Priority</label>
          <div class="input-wrapper select-wrapper">
            <select id="bs-create-priority" class="form-input" aria-label="Priority">
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="bs-create-service-date">Preferred Service Date <span style="color:#ef4444;">*</span></label>
          <div class="input-wrapper">
            <input type="date" id="bs-create-service-date" class="form-input" required aria-label="Preferred service date">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="bs-create-deadline">Application Deadline <span style="color:#ef4444;">*</span></label>
          <div class="input-wrapper">
            <input type="date" id="bs-create-deadline" class="form-input" required aria-label="Application deadline">
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="bs-create-notes">Admin Notes (Optional)</label>
        <div class="input-wrapper">
          <textarea id="bs-create-notes" class="form-input form-textarea" rows="2" placeholder="Internal notes on potential vendors, bulk quotation goals..." aria-label="Admin notes"></textarea>
        </div>
      </div>

      <!-- Resident / Applicant Selection Section -->
      <div class="bs-picker-section">
        <div class="bs-picker-header">
          <div>
            <h3 class="bs-picker-title">Select Applicants</h3>
            <span class="bs-picker-hint" id="bs-create-applicant-status-hint">10 more applicants needed</span>
          </div>
          <div class="bs-picker-counter-badge" id="bs-create-applicant-counter">0 / 10 Applicants</div>
        </div>

        <div class="input-wrapper bs-picker-search-wrap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="input-icon-left" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="bs-create-resident-search" class="form-input" placeholder="Search by name, flat, wing, phone..." oninput="GrihamAdminBulkServiceUI.filterCreateResidentPicker(this.value)" aria-label="Search residents to add">
        </div>

        <div class="bs-resident-picker-list" id="bs-create-resident-list" role="group" aria-label="Select residents for bulk service">
          <!-- Dynamically populated resident checkboxes -->
        </div>
      </div>

      <div class="logout-btn-row" style="margin-top:0.6rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminBulkServiceUI.closeCreateSheet()">Cancel</button>
        <button type="submit" class="btn-primary-action btn-admin-style" id="btn-submit-bs-create" style="margin-top:0; min-height:46px;">
          <span id="btn-submit-bs-create-text">Create Bulk Service</span>
        </button>
      </div>
    </form>
  </div>

<div class="sheet-backdrop" id="bs-add-applicants-backdrop" onclick="GrihamAdminBulkServiceUI.closeAddApplicantsSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="bs-add-applicants-sheet" role="dialog" aria-modal="true" aria-labelledby="bs-add-applicants-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminBulkServiceUI.closeAddApplicantsSheet()" aria-label="Close add applicants sheet" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h2 class="sheet-title" id="bs-add-applicants-title">Add Applicants</h2>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <div style="padding:0.35rem 0 1rem; display:flex; flex-direction:column; gap:0.9rem;">
      <div class="bs-picker-header">
        <div>
          <h3 class="bs-picker-title" id="bs-add-sheet-service-name">Service Campaign</h3>
          <span class="bs-picker-hint" id="bs-add-applicant-status-hint">Select residents to add</span>
        </div>
        <div class="bs-picker-counter-badge" id="bs-add-applicant-counter">8 / 10 Applicants</div>
      </div>

      <div class="input-wrapper bs-picker-search-wrap">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="input-icon-left" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="bs-add-resident-search" class="form-input" placeholder="Search residents by name, wing, flat..." oninput="GrihamAdminBulkServiceUI.filterAddResidentPicker(this.value)" aria-label="Search residents">
      </div>

      <div class="bs-resident-picker-list" id="bs-add-resident-list" role="group" aria-label="Select additional residents">
        <!-- Dynamically rendered -->
      </div>

      <div class="logout-btn-row" style="margin-top:0.4rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminBulkServiceUI.closeAddApplicantsSheet()">Cancel</button>
        <button type="button" class="btn-primary-action btn-admin-style" id="btn-save-add-applicants" onclick="GrihamAdminBulkServiceUI.submitAddApplicants()" style="margin-top:0; min-height:46px;">
          <span>Add Selected Residents</span>
        </button>
      </div>
    </div>
  </div>

<div class="sheet-backdrop" id="bs-remove-applicant-backdrop" onclick="GrihamAdminBulkServiceUI.closeRemoveApplicantSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="bs-remove-applicant-sheet" role="dialog" aria-modal="true" aria-labelledby="bs-remove-applicant-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div style="display:flex; flex-direction:column; align-items:center; gap:0.9rem; text-align:center; padding:0.5rem 0 0.25rem;">
      <div class="logout-shield-icon" style="background:rgba(239,68,68,0.12); color:#ef4444; border:2px solid rgba(239,68,68,0.3);" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>
      <h3 class="logout-title" id="bs-remove-applicant-title">Remove Applicant?</h3>
      <p class="logout-message" style="font-size:0.9rem; line-height:1.5;">
        Are you sure you want to remove <strong id="bs-remove-resident-name" style="color:var(--text-primary);">Resident Name</strong> (<span id="bs-remove-resident-unit">A-102</span>) from this bulk service?
      </p>
      <div class="bs-remove-meta-badge" id="bs-remove-applicant-impact-note">Count will update from 8 / 10 to 7 / 10 Applicants</div>
    </div>

    <div class="logout-btn-row" style="margin-top:0.6rem;">
      <button type="button" class="btn-logout-cancel" onclick="GrihamAdminBulkServiceUI.closeRemoveApplicantSheet()">Keep Resident</button>
      <button type="button" class="btn-primary-action btn-danger-action" id="btn-confirm-remove-applicant" onclick="GrihamAdminBulkServiceUI.executeRemoveApplicant()" style="margin-top:0; min-height:44px;">
        <span>Remove Applicant</span>
      </button>
    </div>
  </div>

<div class="sheet-backdrop" id="bs-negotiation-backdrop" onclick="GrihamAdminBulkServiceUI.closeNegotiationSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="bs-negotiation-sheet" role="dialog" aria-modal="true" aria-labelledby="bs-negotiation-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminBulkServiceUI.closeNegotiationSheet()" aria-label="Close negotiation sheet" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h2 class="sheet-title" id="bs-negotiation-title">Record Vendor Negotiation</h2>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-bs-negotiation" onsubmit="GrihamAdminBulkServiceUI.submitNegotiation(event)" style="display:flex; flex-direction:column; gap:0.9rem; padding:0.35rem 0 1rem;">
      <div class="bs-negotiation-intro-banner">
        <div class="bs-nego-campaign-id" id="bs-nego-campaign-badge">BS-2026-0012</div>
        <div class="bs-nego-applicants-summary" id="bs-nego-applicants-summary">10 Applicants enrolled for AC Servicing</div>
      </div>

      <!-- Vendor Selection/Assignment -->
      <div class="form-group">
        <label class="form-label" for="bs-nego-vendor-select">Vendor / Service Provider <span style="color:#ef4444;">*</span></label>
        <div class="input-wrapper select-wrapper">
          <select id="bs-nego-vendor-select" class="form-input" required aria-label="Select vendor">
            <!-- Populated with category-compatible providers -->
          </select>
        </div>
      </div>

      <div class="form-row-2col">
        <div class="form-group">
          <label class="form-label" for="bs-nego-normal-price">Normal Individual Price (₹/person)</label>
          <div class="input-wrapper">
            <input type="number" id="bs-nego-normal-price" class="form-input" min="0" step="10" placeholder="e.g. 1000" oninput="GrihamAdminBulkServiceUI.recalcNegotiationMetrics()" aria-label="Normal price per person">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="bs-nego-quoted-price">Vendor Quoted Price (Total ₹)</label>
          <div class="input-wrapper">
            <input type="number" id="bs-nego-quoted-price" class="form-input" min="0" step="50" placeholder="e.g. 8000" oninput="GrihamAdminBulkServiceUI.recalcNegotiationMetrics()" aria-label="Vendor quoted bulk price">
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="bs-nego-agreed-price">Negotiated Bulk Price (Total ₹) <span style="color:#ef4444;">*</span></label>
        <div class="input-wrapper">
          <input type="number" id="bs-nego-agreed-price" class="form-input" min="0" step="50" required placeholder="e.g. 7000" oninput="GrihamAdminBulkServiceUI.recalcNegotiationMetrics()" aria-label="Final negotiated bulk price">
        </div>
      </div>

      <!-- Real-time Computed Price Breakdown Card -->
      <div class="bs-nego-summary-card">
        <div class="bs-nego-calc-row">
          <span class="bs-nego-calc-label">Calculated Price Per Resident</span>
          <strong class="bs-nego-calc-value" id="bs-nego-calc-per-applicant">₹700</strong>
        </div>
        <div class="bs-nego-calc-sub" id="bs-nego-calc-savings-sub">Saving ₹300 per resident (30% discount vs individual price)</div>
      </div>

      <div class="form-group">
        <label class="form-label" for="bs-nego-expected-date">Expected Service Date</label>
        <div class="input-wrapper">
          <input type="date" id="bs-nego-expected-date" class="form-input" aria-label="Expected service date">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="bs-nego-notes">Negotiation Notes</label>
        <div class="input-wrapper">
          <textarea id="bs-nego-notes" class="form-input form-textarea" rows="2" placeholder="Vendor agreed to discounted rate for 10 residents, including gas check..." aria-label="Negotiation notes"></textarea>
        </div>
      </div>

      <div class="logout-btn-row" style="margin-top:0.4rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminBulkServiceUI.closeNegotiationSheet()">Cancel</button>
        <button type="submit" class="btn-primary-action btn-admin-style" id="btn-save-negotiation" style="margin-top:0; min-height:46px;">
          <span>Save Negotiation &amp; Update</span>
        </button>
      </div>
    </form>
  </div>

<div class="sheet-backdrop" id="bs-status-backdrop" onclick="GrihamAdminBulkServiceUI.closeStatusSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="bs-status-sheet" role="dialog" aria-modal="true" aria-labelledby="bs-status-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminBulkServiceUI.closeStatusSheet()" aria-label="Close status sheet" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h2 class="sheet-title" id="bs-status-title">Update Status</h2>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <form id="form-bs-status" onsubmit="GrihamAdminBulkServiceUI.submitStatusUpdate(event)" style="display:flex; flex-direction:column; gap:0.9rem; padding:0.35rem 0 1rem;">
      <div class="bs-status-current-badge-wrap">
        <span style="font-size:0.8rem; color:var(--text-secondary);">Current Status:</span>
        <span class="sr-status-pill" id="bs-status-current-badge">Open</span>
      </div>

      <div class="form-group">
        <label class="form-label" for="bs-status-select">New Lifecycle Status <span style="color:#ef4444;">*</span></label>
        <div class="input-wrapper select-wrapper">
          <select id="bs-status-select" class="form-input" required aria-label="New status">
            <option value="Draft">Draft</option>
            <option value="Open">Open (Collecting Applicants)</option>
            <option value="Target Reached">Target Reached</option>
            <option value="Vendor Contacted">Vendor Contacted</option>
            <option value="Negotiated">Negotiated (Pricing Agreed)</option>
            <option value="Confirmed">Confirmed (Service Scheduled)</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="bs-status-notes">Status Update Notes (Optional)</label>
        <div class="input-wrapper">
          <textarea id="bs-status-notes" class="form-input form-textarea" rows="3" placeholder="Explain the reason or update details for residents..." aria-label="Status update notes"></textarea>
        </div>
      </div>

      <div class="logout-btn-row" style="margin-top:0.4rem;">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminBulkServiceUI.closeStatusSheet()">Cancel</button>
        <button type="submit" class="btn-primary-action btn-admin-style" id="btn-save-status" style="margin-top:0; min-height:46px;">
          <span>Update Status</span>
        </button>
      </div>
    </form>
  </div>

<div class="sheet-backdrop" id="bs-cancel-backdrop" onclick="GrihamAdminBulkServiceUI.closeCancelSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="bs-cancel-sheet" role="dialog" aria-modal="true" aria-labelledby="bs-cancel-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div style="display:flex; flex-direction:column; align-items:center; gap:0.9rem; text-align:center; padding:0.5rem 0 0.25rem;">
      <div class="logout-shield-icon" style="background:rgba(239,68,68,0.12); color:#ef4444; border:2px solid rgba(239,68,68,0.3);" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>
      <h3 class="logout-title" id="bs-cancel-title">Cancel Bulk Service?</h3>
      <p class="logout-message" id="bs-cancel-prompt" style="font-size:0.9rem; line-height:1.5;">
        Are you sure you want to cancel bulk service <strong id="bs-cancel-service-name">Service Name</strong>?
      </p>
    </div>

    <div class="form-group" style="padding:0 0.25rem;">
      <label class="form-label" for="bs-cancel-reason">Cancellation Reason (Optional)</label>
      <div class="input-wrapper">
        <textarea id="bs-cancel-reason" class="form-input form-textarea" rows="2" placeholder="e.g. Insufficient resident interest or vendor unavailable..." aria-label="Cancellation reason"></textarea>
      </div>
    </div>

    <div class="logout-btn-row" style="margin-top:0.6rem;">
      <button type="button" class="btn-logout-cancel" onclick="GrihamAdminBulkServiceUI.closeCancelSheet()">Keep Opportunity</button>
      <button type="button" class="btn-primary-action btn-danger-action" id="btn-execute-cancel-campaign" onclick="GrihamAdminBulkServiceUI.executeCancelCampaign()" style="margin-top:0; min-height:44px;">
        <span>Cancel Bulk Service</span>
      </button>
    </div>
  </div>

<section id="screen-admin-bulk-service" class="app-view" aria-labelledby="bulk-service-header-title">

        <!-- Top Sticky Header -->
        <div class="screen-top-bar screen-top-bar-sticky">
          ${GrihamHeader.renderBackButton({
            target: '/admin/home',
            id: 'btn-bulk-service-back',
            ariaLabel: 'Back to Admin Dashboard'
          })}
          
          <h1 class="top-bar-screen-title" id="bulk-service-header-title">Bulk Service</h1>
          
          <div class="top-bar-actions-cluster">
            <button type="button" class="btn-top-action-pill" id="btn-create-bs-top" onclick="GrihamAdminBulkServiceUI.openCreateSheet()" aria-label="Create Bulk Service" title="Create Bulk Service">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>+ Create</span>
            </button>
          </div>
        </div>

        <!-- Compact Overview Summary -->
        <div class="sr-overview-section">
          <div class="overview-title-row">
            <span class="overview-section-title">Bulk Services</span>
            <span class="overview-total-badge" id="bs-stat-total-badge">9 Total</span>
          </div>

          <div class="sr-summary-scroll">
            <div class="sr-summary-grid">
              <button type="button" class="sr-sum-card" onclick="GrihamAdminBulkServiceUI.setTab('All')" aria-label="View All Campaigns">
                <span class="sr-sum-label">Total</span>
                <strong class="sr-sum-val" id="bs-stat-total">9</strong>
              </button>
              <button type="button" class="sr-sum-card card-requested" onclick="GrihamAdminBulkServiceUI.setTab('Open')" aria-label="Filter Open">
                <span class="sr-sum-label">Open</span>
                <strong class="sr-sum-val" id="bs-stat-open">2</strong>
              </button>
              <button type="button" class="sr-sum-card card-progress" onclick="GrihamAdminBulkServiceUI.setTab('Target Reached')" aria-label="Filter Target Reached">
                <span class="sr-sum-label">Target Reached</span>
                <strong class="sr-sum-val" id="bs-stat-reached">1</strong>
              </button>
              <button type="button" class="sr-sum-card card-assigned" onclick="GrihamAdminBulkServiceUI.setTab('Negotiated')" aria-label="Filter Negotiated">
                <span class="sr-sum-label">Negotiated</span>
                <strong class="sr-sum-val" id="bs-stat-negotiated">2</strong>
              </button>
              <button type="button" class="sr-sum-card card-completed" onclick="GrihamAdminBulkServiceUI.setTab('Completed')" aria-label="Filter Completed">
                <span class="sr-sum-label">Completed</span>
                <strong class="sr-sum-val" id="bs-stat-completed">1</strong>
              </button>
            </div>
          </div>
        </div>

        <!-- Horizontally Scrollable Status Tabs -->
        <div class="sr-tabs-container" role="tablist" aria-label="Bulk Service Status Tabs">
          <button type="button" class="sr-tab-btn active" data-tab="All" role="tab" aria-selected="true" onclick="GrihamAdminBulkServiceUI.setTab('All')">All</button>
          <button type="button" class="sr-tab-btn" data-tab="Open" role="tab" aria-selected="false" onclick="GrihamAdminBulkServiceUI.setTab('Open')">Open</button>
          <button type="button" class="sr-tab-btn" data-tab="Target Reached" role="tab" aria-selected="false" onclick="GrihamAdminBulkServiceUI.setTab('Target Reached')">Target Reached</button>
          <button type="button" class="sr-tab-btn" data-tab="Vendor Contacted" role="tab" aria-selected="false" onclick="GrihamAdminBulkServiceUI.setTab('Vendor Contacted')">Contacted</button>
          <button type="button" class="sr-tab-btn" data-tab="Negotiated" role="tab" aria-selected="false" onclick="GrihamAdminBulkServiceUI.setTab('Negotiated')">Negotiated</button>
          <button type="button" class="sr-tab-btn" data-tab="Confirmed" role="tab" aria-selected="false" onclick="GrihamAdminBulkServiceUI.setTab('Confirmed')">Confirmed</button>
          <button type="button" class="sr-tab-btn" data-tab="In Progress" role="tab" aria-selected="false" onclick="GrihamAdminBulkServiceUI.setTab('In Progress')">In Progress</button>
          <button type="button" class="sr-tab-btn" data-tab="Completed" role="tab" aria-selected="false" onclick="GrihamAdminBulkServiceUI.setTab('Completed')">Completed</button>
          <button type="button" class="sr-tab-btn" data-tab="Cancelled" role="tab" aria-selected="false" onclick="GrihamAdminBulkServiceUI.setTab('Cancelled')">Cancelled</button>
          <button type="button" class="sr-tab-btn" data-tab="Draft" role="tab" aria-selected="false" onclick="GrihamAdminBulkServiceUI.setTab('Draft')">Draft</button>
        </div>

        <!-- Search & Sort Controls Bar -->
        <div class="sr-controls-bar">
          <div class="input-wrapper sr-search-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="input-icon-left" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              id="bs-search-input" 
              class="form-input sr-search-input" 
              placeholder="Search bulk services..." 
              oninput="GrihamAdminBulkServiceUI.handleSearch(this.value)" 
              aria-label="Search by ID, service name, category, vendor, or status"
            >
            <button type="button" class="btn-search-clear" id="btn-bs-search-clear" onclick="GrihamAdminBulkServiceUI.clearSearch()" style="display:none;" aria-label="Clear search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div class="sr-sort-wrapper">
            <select id="bs-sort-select" class="form-select sr-sort-select" onchange="GrihamAdminBulkServiceUI.handleSort(this.value)" aria-label="Sort bulk services">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="progress">Applicant Progress</option>
              <option value="priority">Priority</option>
              <option value="date">Service Date</option>
            </select>
          </div>
        </div>

        <!-- Filter Chips Bar: Category, Vendor, Applicant Progress -->
        <div class="sr-filter-chips-container">
          <div class="sr-filter-group-row">
            <span class="sr-filter-group-label">Category:</span>
            <div class="sr-chips-scroll" role="group" aria-label="Category Filters">
              <button type="button" class="sr-chip active" data-cat="all" onclick="GrihamAdminBulkServiceUI.setCategoryFilter('all')">All</button>
              <button type="button" class="sr-chip" data-cat="Maintenance" onclick="GrihamAdminBulkServiceUI.setCategoryFilter('Maintenance')">Maintenance</button>
              <button type="button" class="sr-chip" data-cat="Plumbing" onclick="GrihamAdminBulkServiceUI.setCategoryFilter('Plumbing')">Plumbing</button>
              <button type="button" class="sr-chip" data-cat="Electrical" onclick="GrihamAdminBulkServiceUI.setCategoryFilter('Electrical')">Electrical</button>
              <button type="button" class="sr-chip" data-cat="Cleaning" onclick="GrihamAdminBulkServiceUI.setCategoryFilter('Cleaning')">Cleaning</button>
              <button type="button" class="sr-chip" data-cat="Security" onclick="GrihamAdminBulkServiceUI.setCategoryFilter('Security')">Security</button>
              <button type="button" class="sr-chip" data-cat="Gardening" onclick="GrihamAdminBulkServiceUI.setCategoryFilter('Gardening')">Gardening</button>
              <button type="button" class="sr-chip" data-cat="Other" onclick="GrihamAdminBulkServiceUI.setCategoryFilter('Other')">Other</button>
            </div>
          </div>

          <div class="sr-filter-group-row">
            <span class="sr-filter-group-label">Vendor:</span>
            <div class="sr-chips-scroll" role="group" aria-label="Vendor Filters">
              <button type="button" class="sr-chip active" data-vendor="all" onclick="GrihamAdminBulkServiceUI.setVendorFilter('all')">All</button>
              <button type="button" class="sr-chip" data-vendor="assigned" onclick="GrihamAdminBulkServiceUI.setVendorFilter('assigned')">Assigned</button>
              <button type="button" class="sr-chip" data-vendor="unassigned" onclick="GrihamAdminBulkServiceUI.setVendorFilter('unassigned')">Not Assigned</button>
            </div>

            <span class="sr-filter-group-label" style="margin-left:0.5rem;">Target:</span>
            <div class="sr-chips-scroll" role="group" aria-label="Target Progress Filters">
              <button type="button" class="sr-chip active" data-prog="all" onclick="GrihamAdminBulkServiceUI.setProgressFilter('all')">All</button>
              <button type="button" class="sr-chip" data-prog="reached" onclick="GrihamAdminBulkServiceUI.setProgressFilter('reached')">Target Reached</button>
              <button type="button" class="sr-chip" data-prog="below" onclick="GrihamAdminBulkServiceUI.setProgressFilter('below')">Below Target</button>
            </div>
          </div>
        </div>

        <!-- Loading Skeleton -->
        <div id="bs-loading-skeleton" class="sr-loading-skeleton" style="display:none;">
          <div class="sr-card-skeleton"></div>
          <div class="sr-card-skeleton"></div>
          <div class="sr-card-skeleton"></div>
        </div>

        <!-- Error State -->
        <div id="bs-error-state" class="maint-error-card" style="display:none;">
          <svg class="dash-error-icon" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p class="dash-error-title">Unable to load bulk services.</p>
          <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminBulkServiceUI.loadData(true)" style="min-height:38px; font-size:0.82rem; padding:0.4rem 1.2rem; width:auto;">
            <span>Retry</span>
          </button>
        </div>

        <!-- Empty State -->
        <div id="bs-empty-state" class="maint-empty-card" style="display:none;">
          <div class="empty-icon-pill" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h3 class="empty-title" id="bs-empty-title">No bulk services found.</h3>
          <p class="empty-desc" id="bs-empty-desc">No bulk services match your selected filters or search criteria.</p>
          <button type="button" class="btn-filter-reset-action" onclick="GrihamAdminBulkServiceUI.resetFilters()">Clear Filters</button>
        </div>

        <!-- Bulk Services Cards List Container -->
        <div id="bs-cards-container" class="sr-cards-container">
          <!-- Populated dynamically by JS -->
        </div>

      </section>
`;
const GrihamAdminBulkServiceUI = {
  state: {
    campaigns: [],
    residents: [],
    categoryVendors: [],
    activeTab: "All",
    searchQuery: "",
    categoryFilter: "all",
    vendorFilter: "all",
    progressFilter: "all",
    sortBy: "newest",
    currentCampaign: null,
    targetCampaignId: null,
    createSelectedResidents: new Set(),
    addSelectedResidents: new Set(),
    removeTargetApplicant: null,
    isInitialized: false
  },

  init() {
    this.bindEventsOnce();
    this.loadData();
  },

  bindEventsOnce() {
    if (this.state.isInitialized) return;
    this.state.isInitialized = true;

    // Pre-fetch all society residents for manual selection
    if (typeof GrihamAPI.getResidents === "function") {
      GrihamAPI.getResidents().then(res => {
        if (res && res.residents) {
          this.state.residents = res.residents;
        }
      }).catch(err => console.warn("Failed to load residents database:", err));
    }
  },

  async loadData() {
    const skeleton = document.getElementById("bs-loading-skeleton");
    const container = document.getElementById("bs-cards-container");
    const emptyState = document.getElementById("bs-empty-state");
    const errorState = document.getElementById("bs-error-state");

    if (skeleton) skeleton.style.display = "flex";
    if (container) container.style.display = "none";
    if (emptyState) emptyState.style.display = "none";
    if (errorState) errorState.style.display = "none";

    try {
      const res = await GrihamAPI.getBulkServices();
      this.state.campaigns = (res && res.bulk_services) ? res.bulk_services : [];
      this.renderSummary();
      this.renderCards();
    } catch (err) {
      console.error("Error loading bulk service campaigns:", err);
      if (errorState) errorState.style.display = "block";
    } finally {
      if (skeleton) skeleton.style.display = "none";
    }
  },

  renderSummary() {
    const list = this.state.campaigns || [];
    const totalCount = list.filter(c => c.status !== "Cancelled").length;
    const openCount = list.filter(c => c.status === "Open").length;
    const reachedCount = list.filter(c => c.status === "Target Reached").length;
    const negotiatedCount = list.filter(c => c.status === "Negotiated" || c.status === "Confirmed").length;
    const completedCount = list.filter(c => c.status === "Completed").length;

    const totalEl = document.getElementById("bs-stat-total");
    const totalBadge = document.getElementById("bs-stat-total-badge");
    const openEl = document.getElementById("bs-stat-open");
    const reachedEl = document.getElementById("bs-stat-reached");
    const negoEl = document.getElementById("bs-stat-negotiated");
    const compEl = document.getElementById("bs-stat-completed");

    if (totalEl) totalEl.textContent = totalCount;
    if (totalBadge) totalBadge.textContent = `${totalCount} Opportunities`;
    if (openEl) openEl.textContent = openCount;
    if (reachedEl) reachedEl.textContent = reachedCount;
    if (negoEl) negoEl.textContent = negotiatedCount;
    if (compEl) compEl.textContent = completedCount;
  },

  setTab(tabName) {
    this.state.activeTab = tabName;
    if (typeof GrihamTabs !== "undefined") {
      GrihamTabs.activate(".sr-tabs-container", `[data-tab="${tabName}"]`);
    } else {
      document.querySelectorAll(".sr-tab-btn").forEach(btn => {
        const isMatch = btn.getAttribute("data-tab") === tabName;
        btn.classList.toggle("active", isMatch);
        btn.setAttribute("aria-selected", isMatch ? "true" : "false");
      });
    }
    this.renderCards();
  },

  handleSearch(query) {
    this.state.searchQuery = (query || "").trim().toLowerCase();
    if (typeof GrihamSearchBar !== "undefined") {
      GrihamSearchBar.syncClearButton("bs-search-input", "btn-bs-search-clear");
    } else {
      const clearBtn = document.getElementById("btn-bs-search-clear");
      if (clearBtn) {
        clearBtn.style.display = this.state.searchQuery ? "flex" : "none";
      }
    }
    this.renderCards();
  },

  clearSearch() {
    if (typeof GrihamSearchBar !== "undefined") {
      GrihamSearchBar.handleClear("bs-search-input", "btn-bs-search-clear", () => this.handleSearch(""));
    } else {
      const input = document.getElementById("bs-search-input");
      if (input) input.value = "";
      this.handleSearch("");
    }
  },

  handleSort(val) {
    this.state.sortBy = val || "newest";
    this.renderCards();
  },

  setCategoryFilter(cat) {
    this.state.categoryFilter = cat;
    document.querySelectorAll(".bs-filter-chip[data-bs-cat]").forEach(chip => {
      chip.classList.toggle("active", chip.getAttribute("data-bs-cat") === cat);
    });
    this.renderCards();
  },

  setVendorFilter(v) {
    this.state.vendorFilter = v;
    document.querySelectorAll(".bs-filter-chip[data-bs-vendor]").forEach(chip => {
      chip.classList.toggle("active", chip.getAttribute("data-bs-vendor") === v);
    });
    this.renderCards();
  },

  setProgressFilter(p) {
    this.state.progressFilter = p;
    document.querySelectorAll(".bs-filter-chip[data-bs-progress]").forEach(chip => {
      chip.classList.toggle("active", chip.getAttribute("data-bs-progress") === p);
    });
    this.renderCards();
  },

  resetFilters() {
    this.state.searchQuery = "";
    this.state.categoryFilter = "all";
    this.state.vendorFilter = "all";
    this.state.progressFilter = "all";
    this.state.activeTab = "All";
    this.state.sortBy = "newest";

    const searchInput = document.getElementById("bs-search-input");
    if (searchInput) searchInput.value = "";
    const clearBtn = document.getElementById("btn-bs-search-clear");
    if (clearBtn) clearBtn.style.display = "none";

    const sortSelect = document.getElementById("bs-sort-select");
    if (sortSelect) sortSelect.value = "newest";

    this.setTab("All");
    this.setCategoryFilter("all");
    this.setVendorFilter("all");
    this.setProgressFilter("all");
  },

  renderCards() {
    const container = document.getElementById("bs-cards-container");
    const emptyState = document.getElementById("bs-empty-state");
    const emptyTitle = document.getElementById("bs-empty-title");
    const emptyDesc = document.getElementById("bs-empty-desc");

    if (!container) return;

    let filtered = [...this.state.campaigns];

    // 1. Status Tab Filter
    if (this.state.activeTab !== "All") {
      filtered = filtered.filter(c => c.status === this.state.activeTab);
    }

    // 2. Category Filter
    if (this.state.categoryFilter !== "all") {
      filtered = filtered.filter(c => (c.category || "").toLowerCase() === this.state.categoryFilter.toLowerCase());
    }

    // 3. Vendor Filter
    if (this.state.vendorFilter === "assigned") {
      filtered = filtered.filter(c => !!c.vendorName);
    } else if (this.state.vendorFilter === "unassigned") {
      filtered = filtered.filter(c => !c.vendorName);
    }

    // 4. Progress Filter
    if (this.state.progressFilter === "below-target") {
      filtered = filtered.filter(c => (c.applicants ? c.applicants.length : 0) < c.requiredApplicants);
    } else if (this.state.progressFilter === "reached") {
      filtered = filtered.filter(c => (c.applicants ? c.applicants.length : 0) >= c.requiredApplicants);
    }

    // 5. Search Query (ID, service name, category, vendor, status)
    if (this.state.searchQuery) {
      const q = this.state.searchQuery;
      filtered = filtered.filter(c => {
        const idMatch = (c.id || "").toLowerCase().includes(q);
        const nameMatch = (c.serviceName || "").toLowerCase().includes(q);
        const catMatch = (c.category || "").toLowerCase().includes(q);
        const vendMatch = (c.vendorName || "").toLowerCase().includes(q);
        const statMatch = (c.status || "").toLowerCase().includes(q);
        return idMatch || nameMatch || catMatch || vendMatch || statMatch;
      });
    }

    // 6. Sorting
    filtered.sort((a, b) => {
      if (this.state.sortBy === "newest") {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      } else if (this.state.sortBy === "oldest") {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      } else if (this.state.sortBy === "progress") {
        const pctA = (a.applicants ? a.applicants.length : 0) / (a.requiredApplicants || 1);
        const pctB = (b.applicants ? b.applicants.length : 0) / (b.requiredApplicants || 1);
        return pctB - pctA;
      } else if (this.state.sortBy === "service-date") {
        return new Date(a.serviceDate || "2099-12-31") - new Date(b.serviceDate || "2099-12-31");
      } else if (this.state.sortBy === "priority") {
        const pOrder = { Urgent: 3, High: 2, Normal: 1 };
        return (pOrder[b.priority] || 1) - (pOrder[a.priority] || 1);
      }
      return 0;
    });

    if (filtered.length === 0) {
      container.style.display = "none";
      if (emptyState) {
        emptyState.style.display = "block";
        if (this.state.searchQuery) {
          if (emptyTitle) emptyTitle.textContent = "No matching bulk services.";
          if (emptyDesc) emptyDesc.textContent = `No campaigns found matching "${this.escapeHtml(this.state.searchQuery)}".`;
        } else {
          if (emptyTitle) emptyTitle.textContent = "No bulk services found.";
          if (emptyDesc) emptyDesc.textContent = "No campaigns match the selected filters or tab.";
        }
      }
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    container.style.display = "flex";

    // Build Cards HTML with prominent 8/10 Applicants display
    let html = "";
    filtered.forEach(c => {
      const applicantCount = c.applicants ? c.applicants.length : 0;
      const targetCount = c.requiredApplicants || 1;
      const isReached = applicantCount >= targetCount;
      const neededCount = targetCount - applicantCount;
      const progressPct = Math.min(100, Math.round((applicantCount / targetCount) * 100));

      const statusSlug = (c.status || "open").toLowerCase().replace(/\s+/g, "-");
      const isUrgent = c.priority === "Urgent";
      const isHigh = c.priority === "High";

      const serviceDateStr = c.serviceDate ? this.formatDate(c.serviceDate) : "TBD";
      const deadlineStr = c.applicationDeadline ? this.formatDate(c.applicationDeadline) : "Open";

      html += `
        <article 
          class="bs-campaign-card ${isReached ? 'card-target-reached' : ''}" 
          data-id="${this.escapeHtml(c.id)}"
          onclick="GrihamAdminBulkServiceUI.openDetail('${this.escapeHtml(c.id)}')"
          role="region"
          aria-label="Bulk service ${this.escapeHtml(c.serviceName)}, ${applicantCount} of ${targetCount} applicants, status ${this.escapeHtml(c.status)}"
        >
          <!-- Top Row: ID, Category, Priority, Status -->
          <div class="bs-card-top-row">
            <div class="bs-card-top-tags">
              <span class="bs-card-id-badge">${this.escapeHtml(c.id)}</span>
              <span class="bs-cat-pill">${this.escapeHtml(c.category)}</span>
              ${isUrgent ? `<span class="sr-priority-pill sr-priority-urgent">Urgent</span>` : (isHigh ? `<span class="sr-priority-pill" style="background:rgba(245,158,11,0.15); color:var(--color-brand-amber);">High</span>` : "")}
            </div>
            <span class="sr-status-tag sr-status-${statusSlug}">${this.escapeHtml(c.status)}</span>
          </div>

          <!-- Title & Brief Description -->
          <div class="bs-card-title-row">
            <h3 class="bs-card-title">${this.escapeHtml(c.serviceName)}</h3>
          </div>
          ${c.description ? `<p class="bs-card-desc">${this.escapeHtml(c.description)}</p>` : ""}

          <!-- MOST PROMINENT FEATURE: APPLICANT PROGRESS BANNER -->
          <div class="bs-card-applicants-banner ${isReached ? 'target-reached' : ''}">
            <div class="bs-applicant-headline-row">
              <span class="bs-applicant-count-text">
                <strong class="bs-count-num">${applicantCount} / ${targetCount}</strong> Applicants
              </span>
              <span class="bs-applicant-status-hint">
                ${isReached ? 'Target Reached ✓' : `${neededCount} more needed`}
              </span>
            </div>
            <div class="bs-progress-track" role="progressbar" aria-valuenow="${applicantCount}" aria-valuemin="0" aria-valuemax="${targetCount}">
              <div class="bs-progress-fill" style="width: ${progressPct}%;"></div>
            </div>
          </div>

          <!-- Secondary Metadata Grid -->
          <div class="bs-card-meta-grid">
            <div class="bs-meta-item">
              <span class="bs-meta-label">Service Date</span>
              <span class="bs-meta-val">${serviceDateStr}</span>
            </div>
            <div class="bs-meta-item">
              <span class="bs-meta-label">Application Deadline</span>
              <span class="bs-meta-val">${deadlineStr}</span>
            </div>
          </div>

          <!-- Vendor Negotiation Highlights (if applicable) -->
          ${c.negotiatedPrice ? `
            <div class="bs-card-nego-preview">
              <span>Negotiated: <strong>₹${c.negotiatedPrice.toLocaleString()}</strong> (${c.vendorName || "Vendor"})</span>
              <span class="bs-nego-price-badge">₹${c.pricePerApplicant || Math.round(c.negotiatedPrice / targetCount)} / person</span>
            </div>
          ` : ""}

          <!-- Footer Row: Vendor Status & Quick Actions -->
          <div class="bs-card-footer-row" onclick="event.stopPropagation()">
            <div class="bs-footer-vendor-status">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/>
              </svg>
              <span>${c.vendorName ? this.escapeHtml(c.vendorName) : "Vendor: Not Contacted"}</span>
            </div>

            <div class="bs-footer-actions">
              ${(!isReached && c.status === "Open") ? `
                <button 
                  type="button" 
                  class="btn-bs-card-action" 
                  onclick="GrihamAdminBulkServiceUI.openAddApplicantsSheet('${this.escapeHtml(c.id)}')"
                  aria-label="Add applicants to ${this.escapeHtml(c.serviceName)}"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>+ Applicants</span>
                </button>
              ` : ""}

              ${(isReached || c.status === "Vendor Contacted" || c.status === "Negotiated") ? `
                <button 
                  type="button" 
                  class="btn-bs-card-action btn-contact-vendor" 
                  onclick="GrihamAdminBulkServiceUI.contactVendor('${this.escapeHtml(c.id)}')"
                  aria-label="Contact vendor for ${this.escapeHtml(c.serviceName)}"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>Vendor</span>
                </button>
              ` : ""}

              <button 
                type="button" 
                class="btn-bs-card-action" 
                onclick="GrihamAdminBulkServiceUI.openDetail('${this.escapeHtml(c.id)}')"
                aria-label="View details for ${this.escapeHtml(c.serviceName)}"
              >
                <span>View</span>
              </button>
            </div>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;
  },

  openDetail(id) {
    const campaign = this.state.campaigns.find(c => c.id === id);
    if (!campaign) return;
    this.state.currentCampaign = campaign;
    this.state.targetCampaignId = id;

    const sheet = document.getElementById("bs-detail-sheet");
    const backdrop = document.getElementById("bs-detail-backdrop");
    const body = document.getElementById("bs-detail-body");

    if (!sheet || !body) return;

    const applicantCount = campaign.applicants ? campaign.applicants.length : 0;
    const targetCount = campaign.requiredApplicants || 1;
    const isReached = applicantCount >= targetCount;
    const neededCount = targetCount - applicantCount;
    const progressPct = Math.min(100, Math.round((applicantCount / targetCount) * 100));

    const statusSlug = (campaign.status || "open").toLowerCase().replace(/\s+/g, "-");
    const serviceDateStr = campaign.serviceDate ? this.formatDate(campaign.serviceDate) : "TBD";
    const deadlineStr = campaign.applicationDeadline ? this.formatDate(campaign.applicationDeadline) : "Open";

    // Build Applicants List HTML
    let applicantsListHtml = "";
    if (campaign.applicants && campaign.applicants.length > 0) {
      applicantsListHtml = campaign.applicants.map(app => `
        <div class="bs-applicant-item" id="bs-applicant-${this.escapeHtml(app.id)}">
          <div class="bs-applicant-left">
            <div class="bs-applicant-avatar">${this.escapeHtml(app.name ? app.name.charAt(0) : "R")}</div>
            <div class="bs-applicant-info">
              <strong class="bs-applicant-name">${this.escapeHtml(app.name)}</strong>
              <span class="bs-applicant-unit">Wing ${this.escapeHtml(app.wing)} • Flat ${this.escapeHtml(app.flatNumber)}</span>
              <span class="bs-applicant-phone">Phone: ${this.escapeHtml(app.phone || "—")}</span>
            </div>
          </div>
          <div class="bs-applicant-actions">
            <span class="bs-cat-pill" style="background:rgba(59,130,246,0.12); color:var(--admin-accent);">${this.escapeHtml(app.status || "Interested")}</span>
            <button 
              type="button" 
              class="btn-remove-applicant" 
              onclick="GrihamAdminBulkServiceUI.promptRemoveApplicant('${this.escapeHtml(campaign.id)}', '${this.escapeHtml(app.id)}')"
              aria-label="Remove ${this.escapeHtml(app.name)} from applicants"
              title="Remove applicant"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          </div>
        </div>
      `).join("");
    } else {
      applicantsListHtml = `
        <div class="maint-empty-card" style="padding:1.2rem; text-align:center;">
          <p class="empty-desc">No residents enrolled yet. Use "+ Add Applicants" below to select interested residents.</p>
        </div>
      `;
    }

    body.innerHTML = `
      <!-- Hero Box -->
      <div class="bs-detail-hero-box">
        <div class="bs-detail-id-row">
          <div style="display:flex; align-items:center; gap:0.45rem;">
            <span class="bs-card-id-badge">${this.escapeHtml(campaign.id)}</span>
            <span class="bs-cat-pill">${this.escapeHtml(campaign.category)}</span>
            <span class="sr-priority-pill ${campaign.priority === 'Urgent' ? 'sr-priority-urgent' : ''}">${this.escapeHtml(campaign.priority || 'Normal')}</span>
          </div>
          <span class="sr-status-tag sr-status-${statusSlug}">${this.escapeHtml(campaign.status)}</span>
        </div>

        <h3 class="bs-detail-title">${this.escapeHtml(campaign.serviceName)}</h3>
        <p class="bs-detail-desc">${this.escapeHtml(campaign.description || "No description provided.")}</p>
      </div>

      <!-- Prominent Applicant Progress Card -->
      <div class="bs-card-applicants-banner ${isReached ? 'target-reached' : ''}" style="padding:1.1rem;">
        <div class="bs-applicant-headline-row">
          <span class="bs-applicant-count-text">
            <strong class="bs-count-num">${applicantCount} / ${targetCount}</strong> Applicants
          </span>
          <span class="bs-applicant-status-hint">
            ${isReached ? 'Applicant Target Reached ✓' : `Need ${neededCount} more applicants`}
          </span>
        </div>
        <div class="bs-progress-track" style="height:10px; margin-top:0.4rem;">
          <div class="bs-progress-fill" style="width: ${progressPct}%;"></div>
        </div>
      </div>

      <!-- Primary Action Buttons Row -->
      <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
        ${!isReached ? `
          <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminBulkServiceUI.openAddApplicantsSheet('${this.escapeHtml(campaign.id)}')" style="flex:1; min-height:42px; margin-top:0;">
            <span>+ Add Applicants</span>
          </button>
        ` : ""}
        <button type="button" class="btn-primary-action btn-contact-vendor" onclick="GrihamAdminBulkServiceUI.contactVendor('${this.escapeHtml(campaign.id)}')" style="flex:1; min-height:42px; margin-top:0; background:rgba(16,185,129,0.15); border:1.5px solid rgba(16,185,129,0.4); color:var(--color-brand-emerald);">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>Contact Vendor</span>
        </button>
        <button type="button" class="btn-secondary-action" onclick="GrihamAdminBulkServiceUI.openNegotiationSheet('${this.escapeHtml(campaign.id)}')" style="flex:1; min-height:42px;">
          <span>Record Negotiation</span>
        </button>
      </div>

      <!-- Schedule & Deadlines Box -->
      <div class="sr-detail-section">
        <h4 class="sr-sec-title">Dates &amp; Schedule</h4>
        <div class="bs-card-meta-grid" style="margin-top:0.4rem;">
          <div class="bs-meta-item">
            <span class="bs-meta-label">Preferred Service Date</span>
            <strong class="bs-meta-val">${serviceDateStr}</strong>
          </div>
          <div class="bs-meta-item">
            <span class="bs-meta-label">Application Deadline</span>
            <strong class="bs-meta-val">${deadlineStr}</strong>
          </div>
        </div>
      </div>

      <!-- Vendor Negotiation Details Card -->
      <div class="bs-negotiation-box">
        <div class="bs-nego-box-header">
          <div class="bs-nego-box-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <span>Bulk Negotiation Summary</span>
          </div>
          <button type="button" class="btn-text-link" onclick="GrihamAdminBulkServiceUI.openNegotiationSheet('${this.escapeHtml(campaign.id)}')">Edit Pricing</button>
        </div>

        <div class="bs-nego-grid">
          <div class="bs-nego-metric">
            <span class="bs-nego-metric-label">Assigned Vendor</span>
            <span class="bs-nego-metric-val">${campaign.vendorName ? this.escapeHtml(campaign.vendorName) : "Not Selected"}</span>
          </div>
          <div class="bs-nego-metric">
            <span class="bs-nego-metric-label">Normal Individual Price</span>
            <span class="bs-nego-metric-val">${campaign.normalPrice ? `₹${campaign.normalPrice.toLocaleString()} / person` : "—"}</span>
          </div>
          <div class="bs-nego-metric">
            <span class="bs-nego-metric-label">Vendor Quoted Price</span>
            <span class="bs-nego-metric-val">${campaign.quotedPrice ? `₹${campaign.quotedPrice.toLocaleString()}` : "—"}</span>
          </div>
          <div class="bs-nego-metric">
            <span class="bs-nego-metric-label">Negotiated Bulk Price</span>
            <span class="bs-nego-metric-val highlight-price">${campaign.negotiatedPrice ? `₹${campaign.negotiatedPrice.toLocaleString()}` : "—"}</span>
          </div>
        </div>

        ${campaign.pricePerApplicant ? `
          <div style="display:flex; align-items:center; justify-content:space-between; padding:0.6rem 0.8rem; background:rgba(16,185,129,0.12); border-radius:var(--radius-sm);">
            <span style="font-size:0.82rem; font-weight:600; color:var(--text-primary);">Effective Price Per Resident:</span>
            <strong style="font-size:1.15rem; font-weight:800; color:var(--color-brand-emerald);">₹${campaign.pricePerApplicant.toLocaleString()}</strong>
          </div>
        ` : ""}

        ${campaign.negotiationNotes ? `
          <div class="bs-nego-notes-callout">
            <strong style="display:block; font-size:0.72rem; text-transform:uppercase; margin-bottom:0.15rem;">Negotiation Notes:</strong>
            ${this.escapeHtml(campaign.negotiationNotes)}
          </div>
        ` : ""}
      </div>

      <!-- Enrolled Applicants Section with Removal Action -->
      <div class="bs-applicants-section">
        <div class="bs-applicants-header-row">
          <h4 class="bs-applicants-title">Applicants (${applicantCount})</h4>
          ${!isReached ? `
            <button type="button" class="btn-text-link" onclick="GrihamAdminBulkServiceUI.openAddApplicantsSheet('${this.escapeHtml(campaign.id)}')">+ Add Residents</button>
          ` : ""}
        </div>
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          ${applicantsListHtml}
        </div>
      </div>

      <!-- Admin Actions Row: Update Status & Cancel Opportunity -->
      <div style="display:flex; gap:0.55rem; margin-top:0.5rem; padding-top:0.75rem; border-top:1px solid var(--glass-border);">
        <button type="button" class="btn-secondary-action" onclick="GrihamAdminBulkServiceUI.openStatusSheet('${this.escapeHtml(campaign.id)}')" style="flex:1; min-height:42px;">
          <span>Update Status</span>
        </button>
        <button type="button" class="btn-secondary-action" onclick="GrihamAdminBulkServiceUI.openCancelSheet('${this.escapeHtml(campaign.id)}')" style="flex:1; min-height:42px; color:#ef4444; border-color:rgba(239,68,68,0.3);">
          <span>Cancel Opportunity</span>
        </button>
      </div>
    `;

    GrihamBottomSheet.open("bs-detail-sheet", "bs-detail-backdrop");
  },

  closeDetailSheet() {
    GrihamBottomSheet.close("bs-detail-sheet", "bs-detail-backdrop");
  },

  // =========================================================================
  // CREATE BULK SERVICE & MANUAL APPLICANT SELECTION
  // =========================================================================
  openCreateSheet() {
    const sheet = document.getElementById("bs-create-sheet");
    const backdrop = document.getElementById("bs-create-backdrop");
    const form = document.getElementById("form-bs-create");

    if (form) form.reset();

    // Default dates: preferred service date +7 days, deadline +4 days
    const now = new Date();
    const prefDate = new Date(now.getTime() + 7 * 86400000).toISOString().split("T")[0];
    const deadDate = new Date(now.getTime() + 4 * 86400000).toISOString().split("T")[0];

    const prefEl = document.getElementById("bs-create-service-date");
    const deadEl = document.getElementById("bs-create-deadline");
    if (prefEl) prefEl.value = prefDate;
    if (deadEl) deadEl.value = deadDate;

    // Zero dummy residents!
    this.state.createSelectedResidents = new Set();
    this.handleCreateCountChange(10);
    this.renderCreateResidentList();

    GrihamBottomSheet.open("bs-create-sheet", "bs-create-backdrop");
  },

  closeCreateSheet() {
    GrihamBottomSheet.close("bs-create-sheet", "bs-create-backdrop");
  },

  handleCreateCountChange(val) {
    const target = parseInt(val, 10) || 1;
    const current = this.state.createSelectedResidents.size;
    const counterEl = document.getElementById("bs-create-applicant-counter");
    const hintEl = document.getElementById("bs-create-applicant-status-hint");

    if (counterEl) {
      counterEl.textContent = `${current} / ${target} Applicants`;
      counterEl.classList.toggle("reached", current >= target);
    }

    if (hintEl) {
      if (current >= target) {
        hintEl.textContent = "Applicant Target Reached ✓";
        hintEl.style.color = "var(--color-brand-emerald)";
      } else {
        const needed = target - current;
        hintEl.textContent = `${needed} more applicant${needed > 1 ? 's' : ''} needed`;
        hintEl.style.color = "var(--text-muted)";
      }
    }

    this.updateCreatePickerDisabledStates();
  },

  renderCreateResidentList(query = "") {
    const listEl = document.getElementById("bs-create-resident-list");
    if (!listEl) return;

    const q = (query || "").trim().toLowerCase();
    const all = this.state.residents || [];

    const filtered = all.filter(r => {
      const name = (r.name || "").toLowerCase();
      const flat = (r.flatNumber || "").toLowerCase();
      const wing = (r.wing || "").toLowerCase();
      const phone = (r.phone || "").toLowerCase();
      const socId = (r.societyId || "").toLowerCase();
      return name.includes(q) || flat.includes(q) || wing.includes(q) || phone.includes(q) || socId.includes(q);
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `<div style="text-align:center; padding:1rem; font-size:0.8rem; color:var(--text-muted);">No residents match your search.</div>`;
      return;
    }

    const targetCount = parseInt(document.getElementById("bs-create-required-count")?.value, 10) || 10;
    const currentCount = this.state.createSelectedResidents.size;
    const isTargetReached = currentCount >= targetCount;

    let html = "";
    filtered.forEach(r => {
      const isSelected = this.state.createSelectedResidents.has(r.id);
      const isDisabled = !isSelected && isTargetReached;

      html += `
        <div 
          class="bs-resident-picker-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}" 
          onclick="GrihamAdminBulkServiceUI.toggleCreateResident('${this.escapeHtml(r.id)}')"
          role="checkbox"
          aria-checked="${isSelected}"
        >
          <div class="bs-picker-card-left">
            <div class="bs-picker-checkbox">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="bs-picker-card-info">
              <strong class="bs-picker-res-name">${this.escapeHtml(r.name)}</strong>
              <span class="bs-picker-res-sub">Wing ${this.escapeHtml(r.wing)} • Flat ${this.escapeHtml(r.flatNumber)} • ${this.escapeHtml(r.phone || "")}</span>
            </div>
          </div>
        </div>
      `;
    });

    listEl.innerHTML = html;
  },

  filterCreateResidentPicker(q) {
    this.renderCreateResidentList(q);
  },

  toggleCreateResident(residentId) {
    const targetCount = parseInt(document.getElementById("bs-create-required-count")?.value, 10) || 10;

    if (this.state.createSelectedResidents.has(residentId)) {
      this.state.createSelectedResidents.delete(residentId);
    } else {
      if (this.state.createSelectedResidents.size >= targetCount) {
        this.showToast(`Applicant target reached (${targetCount}). Cannot select more.`);
        return;
      }
      this.state.createSelectedResidents.add(residentId);
    }

    this.handleCreateCountChange(targetCount);
    const searchVal = document.getElementById("bs-create-resident-search")?.value || "";
    this.renderCreateResidentList(searchVal);
  },

  updateCreatePickerDisabledStates() {
    const targetCount = parseInt(document.getElementById("bs-create-required-count")?.value, 10) || 10;
    const isTargetReached = this.state.createSelectedResidents.size >= targetCount;

    document.querySelectorAll("#bs-create-resident-list .bs-resident-picker-card").forEach(card => {
      const isSelected = card.classList.contains("selected");
      card.classList.toggle("disabled", !isSelected && isTargetReached);
    });
  },

  async submitCreateCampaign(event) {
    event.preventDefault();

    const category = document.getElementById("bs-create-category")?.value || "Maintenance";
    const serviceName = document.getElementById("bs-create-name")?.value.trim() || "";
    const description = document.getElementById("bs-create-desc")?.value.trim() || "";
    const requiredApplicants = parseInt(document.getElementById("bs-create-required-count")?.value, 10) || 10;
    const priority = document.getElementById("bs-create-priority")?.value || "Normal";
    const serviceDate = document.getElementById("bs-create-service-date")?.value || "";
    const applicationDeadline = document.getElementById("bs-create-deadline")?.value || "";
    const notes = document.getElementById("bs-create-notes")?.value.trim() || "";

    if (!serviceName) {
      this.showToast("Please provide a service name.", "warning");
      return;
    }

    // Map selected resident IDs to applicant objects
    const selectedApplicants = [];
    this.state.createSelectedResidents.forEach(resId => {
      const resident = this.state.residents.find(r => r.id === resId);
      if (resident) {
        selectedApplicants.push({
          id: resident.id,
          name: resident.name,
          wing: resident.wing,
          flatNumber: resident.flatNumber,
          phone: resident.phone,
          status: "Interested"
        });
      }
    });

    const isReached = selectedApplicants.length >= requiredApplicants;
    const initialStatus = isReached ? "Target Reached" : (selectedApplicants.length > 0 ? "Open" : "Open");

    const payload = {
      serviceName,
      category,
      description,
      requiredApplicants,
      applicants: selectedApplicants,
      serviceDate,
      applicationDeadline,
      priority,
      status: initialStatus,
      negotiationNotes: notes
    };

    try {
      const created = await GrihamAPI.createBulkService(payload);
      this.closeCreateSheet();
      this.showToast(`Created bulk service "${serviceName}" (${selectedApplicants.length}/${requiredApplicants} Applicants).`);
      await this.loadData();
      if (created && created.id) {
        this.openDetail(created.id);
      }
    } catch (err) {
      console.error("Failed to create bulk service:", err);
      this.showToast("Unable to create bulk service. Please try again.", "error");
    }
  },

  // =========================================================================
  // ADD APPLICANTS TO EXISTING CAMPAIGN
  // =========================================================================
  openAddApplicantsSheet(campaignId) {
    const campaign = this.state.campaigns.find(c => c.id === campaignId);
    if (!campaign) return;
    this.state.targetCampaignId = campaignId;

    const sheet = document.getElementById("bs-add-applicants-sheet");
    const backdrop = document.getElementById("bs-add-applicants-backdrop");
    const titleEl = document.getElementById("bs-add-sheet-service-name");

    if (titleEl) titleEl.textContent = campaign.serviceName;

    this.state.addSelectedResidents = new Set();
    this.updateAddApplicantsUI();
    this.renderAddResidentList();

    GrihamBottomSheet.open("bs-add-applicants-sheet", "bs-add-applicants-backdrop");
  },

  closeAddApplicantsSheet() {
    GrihamBottomSheet.close("bs-add-applicants-sheet", "bs-add-applicants-backdrop");
  },

  updateAddApplicantsUI() {
    const campaign = this.state.campaigns.find(c => c.id === this.state.targetCampaignId);
    if (!campaign) return;

    const currentCount = (campaign.applicants ? campaign.applicants.length : 0) + this.state.addSelectedResidents.size;
    const targetCount = campaign.requiredApplicants || 10;
    const counterEl = document.getElementById("bs-add-applicant-counter");
    const hintEl = document.getElementById("bs-add-applicant-status-hint");

    if (counterEl) {
      counterEl.textContent = `${currentCount} / ${targetCount} Applicants`;
      counterEl.classList.toggle("reached", currentCount >= targetCount);
    }

    if (hintEl) {
      if (currentCount >= targetCount) {
        hintEl.textContent = "Applicant Target Reached ✓";
        hintEl.style.color = "var(--color-brand-emerald)";
      } else {
        const needed = targetCount - currentCount;
        hintEl.textContent = `${needed} more applicant${needed > 1 ? 's' : ''} needed`;
        hintEl.style.color = "var(--text-muted)";
      }
    }
  },

  renderAddResidentList(query = "") {
    const listEl = document.getElementById("bs-add-resident-list");
    const campaign = this.state.campaigns.find(c => c.id === this.state.targetCampaignId);
    if (!listEl || !campaign) return;

    const enrolledIds = new Set((campaign.applicants || []).map(a => a.id));
    const available = (this.state.residents || []).filter(r => !enrolledIds.has(r.id));
    const q = (query || "").trim().toLowerCase();

    const filtered = available.filter(r => {
      const name = (r.name || "").toLowerCase();
      const flat = (r.flatNumber || "").toLowerCase();
      const wing = (r.wing || "").toLowerCase();
      const phone = (r.phone || "").toLowerCase();
      return name.includes(q) || flat.includes(q) || wing.includes(q) || phone.includes(q);
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `<div style="text-align:center; padding:1rem; font-size:0.8rem; color:var(--text-muted);">No additional residents available.</div>`;
      return;
    }

    const currentEnrolled = campaign.applicants ? campaign.applicants.length : 0;
    const totalSelected = currentEnrolled + this.state.addSelectedResidents.size;
    const isTargetReached = totalSelected >= campaign.requiredApplicants;

    let html = "";
    filtered.forEach(r => {
      const isSelected = this.state.addSelectedResidents.has(r.id);
      const isDisabled = !isSelected && isTargetReached;

      html += `
        <div 
          class="bs-resident-picker-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}" 
          onclick="GrihamAdminBulkServiceUI.toggleAddResident('${this.escapeHtml(r.id)}')"
          role="checkbox"
          aria-checked="${isSelected}"
        >
          <div class="bs-picker-card-left">
            <div class="bs-picker-checkbox">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="bs-picker-card-info">
              <strong class="bs-picker-res-name">${this.escapeHtml(r.name)}</strong>
              <span class="bs-picker-res-sub">Wing ${this.escapeHtml(r.wing)} • Flat ${this.escapeHtml(r.flatNumber)} • ${this.escapeHtml(r.phone || "")}</span>
            </div>
          </div>
        </div>
      `;
    });

    listEl.innerHTML = html;
  },

  filterAddResidentPicker(q) {
    this.renderAddResidentList(q);
  },

  toggleAddResident(residentId) {
    const campaign = this.state.campaigns.find(c => c.id === this.state.targetCampaignId);
    if (!campaign) return;

    const currentEnrolled = campaign.applicants ? campaign.applicants.length : 0;
    const currentTotal = currentEnrolled + this.state.addSelectedResidents.size;

    if (this.state.addSelectedResidents.has(residentId)) {
      this.state.addSelectedResidents.delete(residentId);
    } else {
      if (currentTotal >= campaign.requiredApplicants) {
        this.showToast(`Applicant target reached (${campaign.requiredApplicants}). Cannot add more.`);
        return;
      }
      this.state.addSelectedResidents.add(residentId);
    }

    this.updateAddApplicantsUI();
    const searchVal = document.getElementById("bs-add-resident-search")?.value || "";
    this.renderAddResidentList(searchVal);
  },

  async submitAddApplicants() {
    const campaign = this.state.campaigns.find(c => c.id === this.state.targetCampaignId);
    if (!campaign) return;

    if (this.state.addSelectedResidents.size === 0) {
      this.showToast("Please select at least one resident to add.", "warning");
      return;
    }

    const newApplicants = [];
    this.state.addSelectedResidents.forEach(resId => {
      const resident = this.state.residents.find(r => r.id === resId);
      if (resident) {
        newApplicants.push({
          id: resident.id,
          name: resident.name,
          wing: resident.wing,
          flatNumber: resident.flatNumber,
          phone: resident.phone,
          status: "Interested"
        });
      }
    });

    try {
      await GrihamAPI.addBulkServiceApplicants(campaign.id, newApplicants);
      this.closeAddApplicantsSheet();
      this.showToast(`Added ${newApplicants.length} applicant(s) to ${campaign.serviceName}.`);
      await this.loadData();
      this.openDetail(campaign.id);
    } catch (err) {
      console.error("Failed to add applicants:", err);
      this.showToast("Unable to add applicants. Please try again.", "error");
    }
  },

  // =========================================================================
  // REMOVE APPLICANT WITH CONFIRMATION
  // =========================================================================
  promptRemoveApplicant(campaignId, applicantId) {
    const campaign = this.state.campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    const applicant = (campaign.applicants || []).find(a => a.id === applicantId);
    if (!applicant) return;

    this.state.removeTargetApplicant = { campaignId, applicantId, applicant, campaign };

    const sheet = document.getElementById("bs-remove-applicant-sheet");
    const backdrop = document.getElementById("bs-remove-applicant-backdrop");
    const nameEl = document.getElementById("bs-remove-resident-name");
    const unitEl = document.getElementById("bs-remove-resident-unit");
    const noteEl = document.getElementById("bs-remove-applicant-impact-note");

    if (nameEl) nameEl.textContent = applicant.name;
    if (unitEl) unitEl.textContent = `Wing ${applicant.wing} • Flat ${applicant.flatNumber}`;

    const cur = campaign.applicants.length;
    const tgt = campaign.requiredApplicants;
    if (noteEl) noteEl.textContent = `Count will update from ${cur} / ${tgt} to ${cur - 1} / ${tgt} Applicants`;

    GrihamBottomSheet.open("bs-remove-applicant-sheet", "bs-remove-applicant-backdrop");
  },

  closeRemoveApplicantSheet() {
    GrihamBottomSheet.close("bs-remove-applicant-sheet", "bs-remove-applicant-backdrop");
    this.state.removeTargetApplicant = null;
  },

  async executeRemoveApplicant() {
    if (!this.state.removeTargetApplicant) return;
    const { campaignId, applicantId, applicant } = this.state.removeTargetApplicant;

    try {
      await GrihamAPI.removeBulkServiceApplicant(campaignId, applicantId);
      this.closeRemoveApplicantSheet();
      this.showToast(`Removed ${applicant.name} from bulk service.`);
      await this.loadData();
      this.openDetail(campaignId);
    } catch (err) {
      console.error("Failed to remove applicant:", err);
      this.showToast("Unable to remove applicant. Please try again.", "error");
    }
  },

  // =========================================================================
  // VENDOR CONTACT & CALL SELECTOR INTEGRATION
  // =========================================================================
  contactVendor(campaignId) {
    const campaign = this.state.campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    // Use existing reusable GrihamCallSelectorUI filtered by category
    if (typeof GrihamCallSelectorUI !== "undefined") {
      GrihamCallSelectorUI.open({
        category: campaign.category,
        contactType: "all",
        title: `Contact ${campaign.category} Vendor`,
        onSelect: (provider) => {
          this.state.targetCampaignId = campaignId;
          this.openNegotiationSheet(campaignId, provider);
        }
      });
    } else {
      this.showToast(`Contacting vendor for ${campaign.category} service.`, "info");
    }
  },

  // =========================================================================
  // VENDOR NEGOTIATION RECORDING
  // =========================================================================
  async openNegotiationSheet(campaignId, preselectedVendor = null) {
    const campaign = this.state.campaigns.find(c => c.id === campaignId);
    if (!campaign) return;
    this.state.targetCampaignId = campaignId;

    const sheet = document.getElementById("bs-negotiation-sheet");
    const backdrop = document.getElementById("bs-negotiation-backdrop");
    const idBadge = document.getElementById("bs-nego-campaign-badge");
    const summaryEl = document.getElementById("bs-nego-applicants-summary");
    const vendorSelect = document.getElementById("bs-nego-vendor-select");
    const normalPriceInput = document.getElementById("bs-nego-normal-price");
    const quotedPriceInput = document.getElementById("bs-nego-quoted-price");
    const agreedPriceInput = document.getElementById("bs-nego-agreed-price");
    const expectedDateInput = document.getElementById("bs-nego-expected-date");
    const notesInput = document.getElementById("bs-nego-notes");

    if (idBadge) idBadge.textContent = campaign.id;
    const count = campaign.applicants ? campaign.applicants.length : campaign.requiredApplicants;
    if (summaryEl) summaryEl.textContent = `${count} Applicants enrolled for ${campaign.serviceName}`;

    // Load category providers into select
    if (vendorSelect) {
      vendorSelect.innerHTML = `<option value="">Choose vendor / provider...</option>`;
      try {
        const res = await GrihamAPI.getContactsByCategory(campaign.category, { contact_type: "all" });
        const providers = (res && res.contacts) ? res.contacts : [];
        this.state.categoryVendors = providers;

        providers.forEach(p => {
          const isSelected = (preselectedVendor && preselectedVendor.id === p.id) || (campaign.vendorId === p.id);
          vendorSelect.innerHTML += `
            <option value="${this.escapeHtml(p.id)}" ${isSelected ? "selected" : ""}>
              ${this.escapeHtml(p.name)} (${this.escapeHtml(p.role || p.type || "Vendor")}) • ${this.escapeHtml(p.phone || "")}
            </option>
          `;
        });
      } catch (err) {
        console.warn("Could not fetch vendors for category:", err);
      }
    }

    if (normalPriceInput) normalPriceInput.value = campaign.normalPrice || "";
    if (quotedPriceInput) quotedPriceInput.value = campaign.quotedPrice || "";
    if (agreedPriceInput) agreedPriceInput.value = campaign.negotiatedPrice || "";
    if (expectedDateInput) expectedDateInput.value = campaign.serviceDate || "";
    if (notesInput) notesInput.value = campaign.negotiationNotes || "";

    this.recalcNegotiationMetrics();

    GrihamBottomSheet.open("bs-negotiation-sheet", "bs-negotiation-backdrop");
  },

  closeNegotiationSheet() {
    GrihamBottomSheet.close("bs-negotiation-sheet", "bs-negotiation-backdrop");
  },

  recalcNegotiationMetrics() {
    const campaign = this.state.campaigns.find(c => c.id === this.state.targetCampaignId);
    const applicantCount = campaign ? (campaign.applicants ? campaign.applicants.length : campaign.requiredApplicants) : 10;
    const safeCount = Math.max(1, applicantCount);

    const normalPrice = parseFloat(document.getElementById("bs-nego-normal-price")?.value) || 0;
    const agreedPrice = parseFloat(document.getElementById("bs-nego-agreed-price")?.value) || 0;
    const calcPerEl = document.getElementById("bs-nego-calc-per-applicant");
    const savingsEl = document.getElementById("bs-nego-calc-savings-sub");

    if (agreedPrice > 0) {
      const perApplicant = Math.round(agreedPrice / safeCount);
      if (calcPerEl) calcPerEl.textContent = `₹${perApplicant.toLocaleString()} / person`;

      if (normalPrice > 0 && normalPrice > perApplicant) {
        const savingPerPerson = normalPrice - perApplicant;
        const discountPct = Math.round((savingPerPerson / normalPrice) * 100);
        if (savingsEl) {
          savingsEl.textContent = `Saving ₹${savingPerPerson.toLocaleString()} per resident (${discountPct}% discount vs normal individual price)`;
          savingsEl.style.display = "block";
        }
      } else if (savingsEl) {
        savingsEl.textContent = `Total group price divided across ${safeCount} enrolled applicants.`;
        savingsEl.style.display = "block";
      }
    } else {
      if (calcPerEl) calcPerEl.textContent = "₹0";
      if (savingsEl) savingsEl.textContent = "Enter negotiated bulk price to calculate per-person cost.";
    }
  },

  async submitNegotiation(event) {
    if (event && typeof event.preventDefault === "function") event.preventDefault();

    const campaign = this.state.campaigns.find(c => c.id === this.state.targetCampaignId);
    if (!campaign) return;

    const vendorSelect = document.getElementById("bs-nego-vendor-select");
    let vendorId = vendorSelect ? vendorSelect.value : null;
    let vendorName = campaign.vendorName || null;
    if (vendorSelect && vendorSelect.selectedIndex >= 0) {
      const selectedOpt = vendorSelect.options[vendorSelect.selectedIndex];
      if (selectedOpt && selectedOpt.value) {
        vendorId = selectedOpt.value;
        vendorName = selectedOpt.text.split("(")[0].trim();
      }
    }
    if (!vendorName && vendorId) {
      vendorName = vendorId;
    }
    if (!vendorName) {
      vendorName = "Specialist " + campaign.category + " Provider";
    }

    const normalPrice = parseFloat(document.getElementById("bs-nego-normal-price")?.value) || null;
    const quotedPrice = parseFloat(document.getElementById("bs-nego-quoted-price")?.value) || null;
    const agreedPrice = parseFloat(document.getElementById("bs-nego-agreed-price")?.value) || 0;
    const expectedDate = document.getElementById("bs-nego-expected-date")?.value || campaign.serviceDate;
    const notes = document.getElementById("bs-nego-notes")?.value.trim() || "";

    const applicantCount = Math.max(1, campaign.applicants ? campaign.applicants.length : campaign.requiredApplicants);
    const pricePerApplicant = agreedPrice > 0 ? Math.round(agreedPrice / applicantCount) : null;

    const negotiationData = {
      vendorId,
      vendorName,
      normalPrice,
      quotedPrice,
      negotiatedPrice: agreedPrice,
      pricePerApplicant,
      serviceDate: expectedDate,
      negotiationNotes: notes
    };

    try {
      await GrihamAPI.updateBulkServiceNegotiation(campaign.id, negotiationData);
      this.closeNegotiationSheet();
      this.showToast(`Recorded negotiation for ${campaign.serviceName} (₹${pricePerApplicant}/person).`);
      await this.loadData();
      this.openDetail(campaign.id);
    } catch (err) {
      console.error("Failed to save negotiation:", err);
      this.showToast("Unable to save negotiation details. Please try again.", "error");
    }
  },

  // =========================================================================
  // STATUS UPDATE SHEET
  // =========================================================================
  openStatusSheet(campaignId) {
    const campaign = this.state.campaigns.find(c => c.id === campaignId);
    if (!campaign) return;
    this.state.targetCampaignId = campaignId;

    const sheet = document.getElementById("bs-status-sheet");
    const backdrop = document.getElementById("bs-status-backdrop");
    const currentBadge = document.getElementById("bs-status-current-badge");
    const select = document.getElementById("bs-status-select");
    const notes = document.getElementById("bs-status-notes");

    if (currentBadge) currentBadge.textContent = campaign.status;
    if (select) select.value = campaign.status;
    if (notes) notes.value = "";

    GrihamBottomSheet.open("bs-status-sheet", "bs-status-backdrop");
  },

  closeStatusSheet() {
    GrihamBottomSheet.close("bs-status-sheet", "bs-status-backdrop");
  },

  async submitStatusUpdate(event) {
    event.preventDefault();
    const campaignId = this.state.targetCampaignId;
    const newStatus = document.getElementById("bs-status-select")?.value;
    const notes = document.getElementById("bs-status-notes")?.value.trim();

    if (!campaignId || !newStatus) return;

    try {
      await GrihamAPI.updateBulkServiceStatus(campaignId, newStatus, notes);
      this.closeStatusSheet();
      this.showToast(`Status updated to ${newStatus}.`);
      await this.loadData();
      this.openDetail(campaignId);
    } catch (err) {
      console.error("Failed to update status:", err);
      this.showToast("Unable to update status. Please try again.", "error");
    }
  },

  // =========================================================================
  // CANCEL BULK SERVICE CAMPAIGN
  // =========================================================================
  openCancelSheet(campaignId) {
    const campaign = this.state.campaigns.find(c => c.id === campaignId);
    if (!campaign) return;
    this.state.targetCampaignId = campaignId;

    const sheet = document.getElementById("bs-cancel-sheet");
    const backdrop = document.getElementById("bs-cancel-backdrop");
    const nameEl = document.getElementById("bs-cancel-service-name");
    const promptEl = document.getElementById("bs-cancel-prompt");
    const reasonEl = document.getElementById("bs-cancel-reason");

    if (nameEl) nameEl.textContent = campaign.serviceName;
    if (promptEl) promptEl.textContent = `Are you sure you want to cancel bulk service ${campaign.serviceName}?`;
    if (reasonEl) reasonEl.value = "";

    GrihamBottomSheet.open("bs-cancel-sheet", "bs-cancel-backdrop");
  },

  closeCancelSheet() {
    GrihamBottomSheet.close("bs-cancel-sheet", "bs-cancel-backdrop");
  },

  async executeCancelCampaign() {
    const campaignId = this.state.targetCampaignId;
    const reason = document.getElementById("bs-cancel-reason")?.value.trim();
    if (!campaignId) return;

    try {
      await GrihamAPI.cancelBulkService(campaignId, reason);
      this.closeCancelSheet();
      this.closeDetailSheet();
      this.showToast("Bulk service campaign cancelled.");
      await this.loadData();
    } catch (err) {
      console.error("Failed to cancel campaign:", err);
      this.showToast("Unable to cancel bulk service. Please try again.", "error");
    }
  },

  closeAllSheets() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.closeAll();
    }
  },

  formatDate(dStr) {
    if (!dStr) return "";
    return GrihamDateTime.formatDate(dStr);
  },

  escapeHtml(str) {
    return window.escapeHtml(str);
  },

  showToast(msg, type = "info") {
    if (typeof GrihamToast !== "undefined") {
      GrihamToast.show(msg, type);
    }
  }
};
window.GrihamAdminBulkServiceUI = GrihamAdminBulkServiceUI;

