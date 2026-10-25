
/* HTML TEMPLATE EXTRACTED FROM index.html */
window.HTML_NOTIFICATIONS = `
<div class="sheet-backdrop" id="notif-confirm-backdrop" onclick="GrihamAdminNotificationsUI.closeConfirmSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="notif-confirm-sheet" role="dialog" aria-modal="true" aria-labelledby="notif-confirm-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom));">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="logout-confirm-card">
      <div class="brand-logo-pill icon-admin" style="margin:0 auto 0.75rem auto;" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      </div>

      <h2 class="logout-title" id="notif-confirm-title" data-i18n="notif_confirm_heading">Send this notification?</h2>
      <p class="logout-message" style="margin-bottom:0.75rem;" data-i18n="notif_confirm_sub">Review your notification summary before broadcasting to residents.</p>

      <!-- Compact Summary Card -->
      <div style="background:var(--btn-secondary-bg); border:1px solid var(--btn-secondary-border); border-radius:var(--radius-sm); padding:0.75rem 0.85rem; text-align:left; display:flex; flex-direction:column; gap:0.4rem; font-size:calc(0.82rem * var(--font-scale)); margin-bottom:1rem;">
        <div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Type:</span> <strong style="color:var(--admin-accent);" id="confirm-summary-type">Message</strong></div>
        <div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Audience:</span> <strong style="color:var(--text-primary);" id="confirm-summary-audience">All Residents</strong></div>
        <div style="display:flex; justify-content:space-between;"><span style="color:var(--text-muted);">Title/Question:</span> <strong style="color:var(--text-primary); text-align:right; max-width:60%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" id="confirm-summary-title">Water Supply Update</strong></div>
        <div style="display:none; justify-content:space-between;" id="confirm-summary-schedule-row"><span style="color:var(--text-muted);">Schedule:</span> <strong style="color:var(--color-brand-blue);" id="confirm-summary-schedule">Today, 5:00 PM</strong></div>
      </div>

      <div class="logout-btn-row">
        <button type="button" class="btn-logout-cancel" onclick="GrihamAdminNotificationsUI.closeConfirmSheet()" id="btn-cancel-notif-send" data-i18n="btn_cancel">
          Cancel
        </button>
        <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminNotificationsUI.executeSend()" id="btn-execute-send" style="margin-top:0; min-height:44px;">
          <span id="btn-execute-text" data-i18n="btn_send">Send</span>
        </button>
      </div>
    </div>
  </div>

<div class="sheet-backdrop" id="notif-success-backdrop" onclick="GrihamAdminNotificationsUI.closeSuccessSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="notif-success-sheet" role="dialog" aria-modal="true" aria-labelledby="notif-success-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom));">
    <div class="sheet-handle" aria-hidden="true"></div>

    <div class="logout-confirm-card">
      <div class="reg-success-icon" aria-hidden="true" style="margin: 0 auto 0.75rem auto; width:52px; height:52px;">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <h2 class="logout-title" id="notif-success-title">Notification Sent</h2>
      <p class="logout-message" id="notif-success-desc" style="margin-bottom:1.25rem;">The notification has been sent successfully.</p>

      <button type="button" class="btn-primary-action btn-admin-style" onclick="GrihamAdminNotificationsUI.closeSuccessSheet()" id="btn-notif-success-done" style="width:100%; min-height:46px;">
        <span data-i18n="btn_done">Done</span>
      </button>
    </div>
  </div>

<div class="sheet-backdrop" id="notif-detail-backdrop" onclick="GrihamAdminNotificationsUI.closeDetailSheet()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="notif-detail-sheet" role="dialog" aria-modal="true" aria-labelledby="notif-detail-header-title" aria-hidden="true">
    <div class="sheet-handle" aria-hidden="true"></div>

    <!-- Header with Left Arrow Back Button -->
    <div class="sheet-header-row">
      <button class="btn-sheet-back" onclick="GrihamAdminNotificationsUI.closeDetailSheet()" aria-label="Go back" title="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <h3 class="sheet-title" id="notif-detail-header-title">Notification Details</h3>
      <div class="sheet-header-spacer" aria-hidden="true"></div>
    </div>

    <!-- Detail Content Box -->
    <div id="notif-detail-body" style="display:flex; flex-direction:column; gap:0.9rem; padding: 0.25rem 0;">
      <!-- Dynamically filled by JS -->
    </div>
  </div>

<section id="screen-admin-notifications" class="app-view notif-view" aria-labelledby="admin-notif-heading">
        
        <!-- Top App Bar (Back to Admin Home) -->
        ${GrihamHeader.render({
          badge: 'Admin Portal',
          backTarget: '/admin/home',
          backId: 'btn-notif-back',
          backAriaLabel: 'Back to Admin Dashboard'
        })}

        <!-- Header / Hero Section -->
        <header class="brand-hero" style="margin-bottom: 0.15rem;">
          <div class="brand-logo-pill icon-admin" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </div>
          <h1 class="brand-hero-title" id="admin-notif-heading" data-i18n="notif_hero_title">Send Notification</h1>
          <p class="brand-hero-tagline" data-i18n="notif_hero_subtitle">Keep residents informed about important society updates.</p>
        </header>

        <!-- Segmented Control / Glass Tabs -->
        <div class="notif-tabs-group" role="tablist" aria-label="Notification Type Selection">
          <button type="button" class="btn-notif-tab active" id="tab-notif-msg" role="tab" aria-selected="true" onclick="GrihamAdminNotificationsUI.switchType('message')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span data-i18n="tab_message">Message</span>
          </button>
          <button type="button" class="btn-notif-tab" id="tab-notif-poll" role="tab" aria-selected="false" onclick="GrihamAdminNotificationsUI.switchType('poll')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            <span data-i18n="tab_poll">Poll</span>
          </button>
          <button type="button" class="btn-notif-tab" id="tab-notif-prop" role="tab" aria-selected="false" onclick="GrihamAdminNotificationsUI.switchType('proposal')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            <span data-i18n="tab_proposal">Proposal</span>
          </button>
        </div>

        <!-- Notification Creation Form Card -->
        <div class="notif-form-card">
          
          <!-- Inline Validation / Error Banner -->
          <div id="notif-form-error" class="auth-status-banner" role="alert" aria-live="assertive" style="display:none; margin-bottom: 0.75rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span id="notif-form-error-text">Please complete all required fields.</span>
          </div>

          <form id="form-admin-notification" onsubmit="GrihamAdminNotificationsUI.handleFormSubmit(event)" novalidate>
            
            <!-- TYPE 1: MESSAGE PANEL -->
            <div id="panel-notif-msg" class="notif-type-panel" role="tabpanel" aria-labelledby="tab-notif-msg">
              
              <div class="form-group">
                <label class="form-label" for="input-msg-title" data-i18n="label_notif_title">Title</label>
                <div class="input-wrapper" id="wrap-msg-title">
                  <input type="text" id="input-msg-title" class="form-input" placeholder="Enter notification title" required>
                </div>
                <p class="form-error-msg" id="err-msg-title">Please enter a notification title.</p>
              </div>

              <div class="form-group">
                <label class="form-label" for="input-msg-body" data-i18n="label_notif_msg">Message</label>
                <div class="input-wrapper" id="wrap-msg-body">
                  <textarea id="input-msg-body" class="notif-textarea" placeholder="Write your message..." rows="4" required></textarea>
                </div>
                <p class="form-error-msg" id="err-msg-body">Please enter a message.</p>
              </div>

              <div class="form-group">
                <label class="form-label" for="select-msg-category" data-i18n="label_category">Category</label>
                <div class="input-wrapper">
                  <select id="select-msg-category" class="form-select">
                    <option value="General">General</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Water">Water</option>
                    <option value="Security">Security</option>
                    <option value="Event">Event</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" data-i18n="label_priority">Priority</label>
                <div class="priority-chip-group" role="group" aria-label="Notification Priority">
                  <button type="button" class="btn-priority-chip active" data-priority="Normal" onclick="GrihamAdminNotificationsUI.setPriority('Normal')">Normal</button>
                  <button type="button" class="btn-priority-chip" data-priority="Important" onclick="GrihamAdminNotificationsUI.setPriority('Important')">Important</button>
                  <button type="button" class="btn-priority-chip urgent" data-priority="Urgent" onclick="GrihamAdminNotificationsUI.setPriority('Urgent')">Urgent</button>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="select-msg-audience" data-i18n="label_audience">Audience</label>
                <div class="input-wrapper">
                  <select id="select-msg-audience" class="form-select" onchange="GrihamAdminNotificationsUI.handleAudienceChange('msg', this.value)">
                    <option value="All Residents">All Residents</option>
                    <option value="Selected Wing">Selected Wing</option>
                    <option value="Selected Residents">Selected Residents</option>
                  </select>
                </div>
              </div>

              <div class="form-group" id="wrap-msg-wing" style="display:none;">
                <label class="form-label" for="select-msg-wing" data-i18n="label_select_wing">Select Wing</label>
                <div class="input-wrapper">
                  <select id="select-msg-wing" class="form-select">
                    <option value="Wing A">Wing A</option>
                    <option value="Wing B">Wing B</option>
                    <option value="Wing C">Wing C</option>
                    <option value="Wing D">Wing D</option>
                  </select>
                </div>
              </div>

              <div class="form-group" id="wrap-msg-residents" style="display:none;">
                <label class="form-label" data-i18n="label_select_residents">Select Residents</label>
                <div class="input-wrapper">
                  <input type="text" class="form-input" id="search-msg-residents" placeholder="Search flat or name..." oninput="GrihamAdminNotificationsUI.filterMockResidents('msg', this.value)">
                </div>
                <div class="mock-resident-list" id="list-msg-residents">
                  <!-- Injected by JS -->
                </div>
              </div>

            </div>

            <!-- TYPE 2: POLL PANEL -->
            <div id="panel-notif-poll" class="notif-type-panel" role="tabpanel" aria-labelledby="tab-notif-poll" style="display:none;">
              
              <div class="form-group">
                <label class="form-label" for="input-poll-question" data-i18n="label_poll_question">Poll Question</label>
                <div class="input-wrapper" id="wrap-poll-question">
                  <input type="text" id="input-poll-question" class="form-input" placeholder="What would you like residents to vote on?">
                </div>
                <p class="form-error-msg" id="err-poll-question">Please enter a poll question.</p>
              </div>

              <div class="form-group">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
                  <label class="form-label" style="margin-bottom:0;" data-i18n="label_poll_options">Options (Min 2, Max 6)</label>
                  <span style="font-size:0.75rem; color:var(--text-muted);" id="poll-option-count-label">2 / 6</span>
                </div>
                
                <div class="poll-options-builder" id="poll-options-list">
                  <!-- Dynamically rendered by JS -->
                </div>
                
                <button type="button" class="btn-add-option" id="btn-add-poll-option" onclick="GrihamAdminNotificationsUI.addPollOption()">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span data-i18n="btn_add_option">+ Add Option</span>
                </button>
                <p class="form-error-msg" id="err-poll-options">Please provide at least 2 non-empty poll options.</p>
              </div>

              <div class="schedule-toggle-row">
                <div>
                  <div style="font-size:calc(0.85rem * var(--font-scale)); font-weight:600; color:var(--text-primary);" data-i18n="label_multi_select">Allow multiple selections</div>
                  <div style="font-size:calc(0.72rem * var(--font-scale)); color:var(--text-secondary);">Residents can vote on more than one option</div>
                </div>
                <label class="touch-switch">
                  <input type="checkbox" id="chk-poll-multiple" aria-label="Allow multiple selections">
                  <span class="switch-track"></span>
                </label>
              </div>

              <div class="form-group">
                <label class="form-label" for="select-poll-category" data-i18n="label_category">Category</label>
                <div class="input-wrapper">
                  <select id="select-poll-category" class="form-select">
                    <option value="General">General</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Event">Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="select-poll-audience" data-i18n="label_audience">Audience</label>
                <div class="input-wrapper">
                  <select id="select-poll-audience" class="form-select" onchange="GrihamAdminNotificationsUI.handleAudienceChange('poll', this.value)">
                    <option value="All Residents">All Residents</option>
                    <option value="Selected Wing">Selected Wing</option>
                    <option value="Selected Residents">Selected Residents</option>
                  </select>
                </div>
              </div>

              <div class="form-group" id="wrap-poll-wing" style="display:none;">
                <label class="form-label" for="select-poll-wing" data-i18n="label_select_wing">Select Wing</label>
                <div class="input-wrapper">
                  <select id="select-poll-wing" class="form-select">
                    <option value="Wing A">Wing A</option>
                    <option value="Wing B">Wing B</option>
                    <option value="Wing C">Wing C</option>
                    <option value="Wing D">Wing D</option>
                  </select>
                </div>
              </div>

              <div class="form-group" id="wrap-poll-residents" style="display:none;">
                <label class="form-label" data-i18n="label_select_residents">Select Residents</label>
                <div class="input-wrapper">
                  <input type="text" class="form-input" id="search-poll-residents" placeholder="Search flat or name..." oninput="GrihamAdminNotificationsUI.filterMockResidents('poll', this.value)">
                </div>
                <div class="mock-resident-list" id="list-poll-residents">
                  <!-- Injected by JS -->
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" data-i18n="label_schedule_delivery">Delivery Timing</label>
                <div class="schedule-toggle-row">
                  <div>
                    <div style="font-size:calc(0.85rem * var(--font-scale)); font-weight:600; color:var(--text-primary);" data-i18n="label_schedule_notif">Schedule for later</div>
                    <div style="font-size:calc(0.72rem * var(--font-scale)); color:var(--text-secondary);">Specify date and time to broadcast</div>
                  </div>
                  <label class="touch-switch">
                    <input type="checkbox" id="chk-poll-schedule" onchange="GrihamAdminNotificationsUI.toggleSchedule('poll', this.checked)" aria-label="Schedule for later">
                    <span class="switch-track"></span>
                  </label>
                </div>

                <div class="schedule-inputs-grid" id="wrap-poll-schedule-fields" style="display:none;">
                  <div>
                    <label class="form-label" style="font-size:0.75rem;" for="input-poll-date" data-i18n="label_date">Date</label>
                    <div class="input-wrapper">
                      <input type="date" id="input-poll-date" class="form-input" style="font-size:0.85rem;">
                    </div>
                  </div>
                  <div>
                    <label class="form-label" style="font-size:0.75rem;" for="input-poll-time" data-i18n="label_time">Time</label>
                    <div class="input-wrapper">
                      <input type="time" id="input-poll-time" class="form-input" style="font-size:0.85rem;">
                    </div>
                  </div>
                </div>
                <p class="form-error-msg" id="err-poll-schedule">Please select a valid future date and time.</p>
              </div>

            </div>

            <!-- TYPE 3: PROPOSAL PANEL -->
            <div id="panel-notif-prop" class="notif-type-panel" role="tabpanel" aria-labelledby="tab-notif-prop" style="display:none;">
              
              <div class="form-group">
                <label class="form-label" for="input-prop-title" data-i18n="label_prop_title">Proposal Title</label>
                <div class="input-wrapper" id="wrap-prop-title">
                  <input type="text" id="input-prop-title" class="form-input" placeholder="Enter proposal title">
                </div>
                <p class="form-error-msg" id="err-prop-title">Please enter a proposal title.</p>
              </div>

              <div class="form-group">
                <label class="form-label" for="input-prop-desc" data-i18n="label_prop_desc">Proposal Description</label>
                <div class="input-wrapper" id="wrap-prop-desc">
                  <textarea id="input-prop-desc" class="notif-textarea" placeholder="Detailed explanation of the proposal..." rows="3"></textarea>
                </div>
                <p class="form-error-msg" id="err-prop-desc">Please enter proposal details.</p>
              </div>

              <div class="form-group">
                <label class="form-label" for="input-prop-reason" data-i18n="label_prop_reason">Reason / Context</label>
                <div class="input-wrapper" id="wrap-prop-reason">
                  <textarea id="input-prop-reason" class="notif-textarea" placeholder="Why is this proposal necessary?" rows="2"></textarea>
                </div>
                <p class="form-error-msg" id="err-prop-reason">Please provide the context/reason.</p>
              </div>

              <div class="form-group">
                <label class="form-label" data-i18n="label_voting_options">Voting Choices (Fixed)</label>
                <div class="proposal-fixed-box">
                  <span style="font-size:calc(0.82rem * var(--font-scale)); font-weight:600; color:var(--text-primary);">Resident Choice:</span>
                  <div class="proposal-vote-badge-row">
                    <span class="vote-pill-yes">YES</span>
                    <span class="vote-pill-no">NO</span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="select-prop-category" data-i18n="label_category">Category</label>
                <div class="input-wrapper">
                  <select id="select-prop-category" class="form-select">
                    <option value="General">General</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Society Decision">Society Decision</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="select-prop-audience" data-i18n="label_audience">Audience</label>
                <div class="input-wrapper">
                  <select id="select-prop-audience" class="form-select" onchange="GrihamAdminNotificationsUI.handleAudienceChange('prop', this.value)">
                    <option value="All Residents">All Residents</option>
                    <option value="Selected Wing">Selected Wing</option>
                    <option value="Selected Residents">Selected Residents</option>
                  </select>
                </div>
              </div>

              <div class="form-group" id="wrap-prop-wing" style="display:none;">
                <label class="form-label" for="select-prop-wing" data-i18n="label_select_wing">Select Wing</label>
                <div class="input-wrapper">
                  <select id="select-prop-wing" class="form-select">
                    <option value="Wing A">Wing A</option>
                    <option value="Wing B">Wing B</option>
                    <option value="Wing C">Wing C</option>
                    <option value="Wing D">Wing D</option>
                  </select>
                </div>
              </div>

              <div class="form-group" id="wrap-prop-residents" style="display:none;">
                <label class="form-label" data-i18n="label_select_residents">Select Residents</label>
                <div class="input-wrapper">
                  <input type="text" class="form-input" id="search-prop-residents" placeholder="Search flat or name..." oninput="GrihamAdminNotificationsUI.filterMockResidents('prop', this.value)">
                </div>
                <div class="mock-resident-list" id="list-prop-residents">
                  <!-- Injected by JS -->
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" data-i18n="label_schedule_delivery">Delivery Timing</label>
                <div class="schedule-toggle-row">
                  <div>
                    <div style="font-size:calc(0.85rem * var(--font-scale)); font-weight:600; color:var(--text-primary);" data-i18n="label_schedule_notif">Schedule for later</div>
                    <div style="font-size:calc(0.72rem * var(--font-scale)); color:var(--text-secondary);">Specify date and time to broadcast</div>
                  </div>
                  <label class="touch-switch">
                    <input type="checkbox" id="chk-prop-schedule" onchange="GrihamAdminNotificationsUI.toggleSchedule('prop', this.checked)" aria-label="Schedule for later">
                    <span class="switch-track"></span>
                  </label>
                </div>

                <div class="schedule-inputs-grid" id="wrap-prop-schedule-fields" style="display:none;">
                  <div>
                    <label class="form-label" style="font-size:0.75rem;" for="input-prop-date" data-i18n="label_date">Date</label>
                    <div class="input-wrapper">
                      <input type="date" id="input-prop-date" class="form-input" style="font-size:0.85rem;">
                    </div>
                  </div>
                  <div>
                    <label class="form-label" style="font-size:0.75rem;" for="input-prop-time" data-i18n="label_time">Time</label>
                    <div class="input-wrapper">
                      <input type="time" id="input-prop-time" class="form-input" style="font-size:0.85rem;">
                    </div>
                  </div>
                </div>
                <p class="form-error-msg" id="err-prop-schedule">Please select a valid future date and time.</p>
              </div>

            </div>

            <!-- Primary Form Action Button -->
            <button type="submit" class="btn-primary-action btn-admin-action" id="btn-notif-submit" style="margin-top: 0.5rem;" aria-label="Send Notification">
              <span id="btn-notif-spinner" class="spinner-icon" style="display:none;" aria-hidden="true"></span>
              <span id="btn-notif-text" data-i18n="btn_send_notif">Send Notification</span>
            </button>

          </form>

        </div>

        <!-- NOTIFICATION HISTORY SECTION -->
        <div class="notif-history-section">
          
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.65rem;">
            <h2 class="dash-card-heading" style="font-size: calc(1.05rem * var(--font-scale)); font-weight:700;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="color:var(--admin-accent);"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span data-i18n="recent_notifs_title">Recent Notifications</span>
            </h2>
            <button type="button" onclick="GrihamAdminNotificationsUI.loadHistory(true)" class="btn-card-action" style="padding:0.25rem 0.5rem; font-size:0.75rem; border:none; background:transparent;" aria-label="Refresh notifications">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            </button>
          </div>

          <!-- History Filter Chips -->
          <div class="history-filter-bar" role="group" aria-label="Filter Notification History">
            <button type="button" class="btn-filter-chip active" data-filter="all" onclick="GrihamAdminNotificationsUI.setFilter('all')">All</button>
            <button type="button" class="btn-filter-chip" data-filter="message" onclick="GrihamAdminNotificationsUI.setFilter('message')">Messages</button>
            <button type="button" class="btn-filter-chip" data-filter="poll" onclick="GrihamAdminNotificationsUI.setFilter('poll')">Polls</button>
            <button type="button" class="btn-filter-chip" data-filter="proposal" onclick="GrihamAdminNotificationsUI.setFilter('proposal')">Proposals</button>
          </div>

          <!-- History Skeleton Loader -->
          <div id="notif-history-skeleton" style="display:none; flex-direction:column; gap:0.65rem; margin-top:0.65rem;">
            <div class="dash-skeleton-card" style="height: 80px;"></div>
            <div class="dash-skeleton-card" style="height: 80px;"></div>
            <div class="dash-skeleton-card" style="height: 80px;"></div>
          </div>

          <!-- History Cards List Container -->
          <div class="notif-history-list" id="notif-history-items" style="margin-top:0.65rem;">
            <!-- Rendered by JS -->
          </div>

        </div>

      </section>
`;
const GrihamAdminNotificationsUI = {
  activeType: "message", // "message" | "poll" | "proposal"
  activePriority: "Normal", // "Normal" | "Important" | "Urgent"
  activeFilter: "all", // "all" | "message" | "poll" | "proposal"
  pollOptions: ["", ""],
  isPollScheduled: false,
  isPropScheduled: false,
  isLoadingHistory: false,
  isSubmitting: false,
  pendingPayload: null,
  
  mockResidentsList: [
    { id: "res-1", flat: "A-101", name: "Rajiv Sharma", wing: "Wing A" },
    { id: "res-2", flat: "A-202", name: "Priya Mehta", wing: "Wing A" },
    { id: "res-3", flat: "B-104", name: "Amit Patel", wing: "Wing B" },
    { id: "res-4", flat: "B-204", name: "R. Sharma", wing: "Wing B" },
    { id: "res-5", flat: "C-301", name: "Vikram Desai", wing: "Wing C" },
    { id: "res-6", flat: "C-402", name: "Sunita Rao", wing: "Wing C" },
    { id: "res-7", flat: "D-102", name: "Neha Joshi", wing: "Wing D" },
    { id: "res-8", flat: "D-305", name: "Karan Verma", wing: "Wing D" }
  ],
  selectedResidents: {
    msg: [],
    poll: [],
    prop: []
  },
  notificationsHistory: [],

  init() {
    this.renderPollOptions();
    this.renderMockResidents("msg");
    this.renderMockResidents("poll");
    this.renderMockResidents("prop");
    this.loadHistory();
  },

  switchType(type) {
    this.activeType = type;
    
    const tabMap = { message: "tab-notif-msg", poll: "tab-notif-poll", proposal: "tab-notif-prop" };
    if (typeof GrihamTabs !== "undefined") {
      GrihamTabs.activate(".notif-type-tabs", tabMap[type]);
    } else {
      document.getElementById("tab-notif-msg")?.classList.toggle("active", type === "message");
      document.getElementById("tab-notif-poll")?.classList.toggle("active", type === "poll");
      document.getElementById("tab-notif-prop")?.classList.toggle("active", type === "proposal");
      
      document.getElementById("tab-notif-msg")?.setAttribute("aria-selected", type === "message");
      document.getElementById("tab-notif-poll")?.setAttribute("aria-selected", type === "poll");
      document.getElementById("tab-notif-prop")?.setAttribute("aria-selected", type === "proposal");
    }

    const panelMsg = document.getElementById("panel-notif-msg");
    const panelPoll = document.getElementById("panel-notif-poll");
    const panelProp = document.getElementById("panel-notif-prop");

    if (panelMsg) panelMsg.style.display = type === "message" ? "flex" : "none";
    if (panelPoll) panelPoll.style.display = type === "poll" ? "flex" : "none";
    if (panelProp) panelProp.style.display = type === "proposal" ? "flex" : "none";

    this.clearErrors();
    this.updateSubmitButtonLabel();
  },

  setPriority(pri) {
    this.activePriority = pri;
    document.querySelectorAll(".btn-priority-chip").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-priority") === pri);
    });
  },

  handleAudienceChange(prefix, value) {
    const wingWrap = document.getElementById(`wrap-${prefix}-wing`);
    const resWrap = document.getElementById(`wrap-${prefix}-residents`);

    if (wingWrap) wingWrap.style.display = value === "Selected Wing" ? "block" : "none";
    if (resWrap) resWrap.style.display = value === "Selected Residents" ? "block" : "none";
  },

  renderMockResidents(prefix, filterText = "") {
    const container = document.getElementById(`list-${prefix}-residents`);
    if (!container) return;

    const q = filterText.trim().toLowerCase();
    const filtered = this.mockResidentsList.filter(r => 
      r.name.toLowerCase().includes(q) || r.flat.toLowerCase().includes(q) || r.wing.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      container.innerHTML = `<span style="font-size:0.75rem; color:var(--text-muted); padding:0.25rem;">No matching residents found</span>`;
      return;
    }

    container.innerHTML = filtered.map(r => {
      const isSel = this.selectedResidents[prefix].includes(r.id);
      return `
        <button type="button" class="resident-select-chip ${isSel ? 'selected' : ''}" onclick="GrihamAdminNotificationsUI.toggleResident('${prefix}', '${r.id}')">
          <span>${r.flat}: ${r.name}</span>
          ${isSel ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
        </button>
      `;
    }).join("");
  },

  filterMockResidents(prefix, val) {
    this.renderMockResidents(prefix, val);
  },

  toggleResident(prefix, id) {
    const list = this.selectedResidents[prefix];
    const idx = list.indexOf(id);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(id);
    }
    const searchInput = document.getElementById(`search-${prefix}-residents`);
    this.renderMockResidents(prefix, searchInput?.value || "");
  },

  renderPollOptions() {
    const container = document.getElementById("poll-options-list");
    const countLabel = document.getElementById("poll-option-count-label");
    const addBtn = document.getElementById("btn-add-poll-option");
    if (!container) return;

    if (countLabel) countLabel.textContent = `${this.pollOptions.length} / 6`;
    if (addBtn) addBtn.disabled = this.pollOptions.length >= 6;

    container.innerHTML = this.pollOptions.map((opt, i) => {
      const showDelete = this.pollOptions.length > 2;
      return `
        <div class="poll-option-row">
          <input type="text" class="form-input poll-option-input" value="${escapeHtml(opt)}" placeholder="Option ${i + 1}" oninput="GrihamAdminNotificationsUI.onPollOptionInput(${i}, this.value)" aria-label="Poll option ${i + 1}">
          ${showDelete ? `
            <button type="button" class="btn-remove-option" onclick="GrihamAdminNotificationsUI.removePollOption(${i})" aria-label="Remove option ${i + 1}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          ` : ''}
        </div>
      `;
    }).join("");
  },

  onPollOptionInput(index, value) {
    this.pollOptions[index] = value;
  },

  addPollOption() {
    if (this.pollOptions.length < 6) {
      this.pollOptions.push("");
      this.renderPollOptions();
    }
  },

  removePollOption(index) {
    if (this.pollOptions.length > 2) {
      this.pollOptions.splice(index, 1);
      this.renderPollOptions();
    }
  },

  toggleSchedule(prefix, isScheduled) {
    if (prefix === "poll") this.isPollScheduled = isScheduled;
    if (prefix === "prop") this.isPropScheduled = isScheduled;

    const fields = document.getElementById(`wrap-${prefix}-schedule-fields`);
    if (fields) fields.style.display = isScheduled ? "grid" : "none";

    this.updateSubmitButtonLabel();
  },

  updateSubmitButtonLabel() {
    const btnText = document.getElementById("btn-notif-text");
    if (!btnText) return;

    let scheduled = false;
    if (this.activeType === "poll") scheduled = this.isPollScheduled;
    if (this.activeType === "proposal") scheduled = this.isPropScheduled;

    btnText.textContent = scheduled ? "Schedule Notification" : "Send Notification";
  },

  clearErrors() {
    const banner = document.getElementById("notif-form-error");
    if (banner) banner.style.display = "none";
    document.querySelectorAll(".form-error-msg").forEach(el => el.classList.remove("visible"));
    document.querySelectorAll(".input-wrapper").forEach(el => el.classList.remove("field-error"));
  },

  showError(msg) {
    const banner = document.getElementById("notif-form-error");
    const text = document.getElementById("notif-form-error-text");
    if (banner && text) {
      text.textContent = msg;
      banner.style.display = "flex";
    }
  },

  validateForm() {
    this.clearErrors();
    let isValid = true;

    if (this.activeType === "message") {
      const title = document.getElementById("input-msg-title")?.value.trim();
      const body = document.getElementById("input-msg-body")?.value.trim();

      if (!title) {
        document.getElementById("wrap-msg-title")?.classList.add("field-error");
        document.getElementById("err-msg-title")?.classList.add("visible");
        isValid = false;
      }
      if (!body) {
        document.getElementById("wrap-msg-body")?.classList.add("field-error");
        document.getElementById("err-msg-body")?.classList.add("visible");
        isValid = false;
      }

      if (!isValid) {
        this.showError("Please enter a notification title and message.");
      }

    } else if (this.activeType === "poll") {
      const question = document.getElementById("input-poll-question")?.value.trim();
      const filledOptions = this.pollOptions.filter(o => o.trim().length > 0);

      if (!question) {
        document.getElementById("wrap-poll-question")?.classList.add("field-error");
        document.getElementById("err-poll-question")?.classList.add("visible");
        isValid = false;
      }
      if (filledOptions.length < 2) {
        document.getElementById("err-poll-options")?.classList.add("visible");
        isValid = false;
      }
      if (this.isPollScheduled) {
        const date = document.getElementById("input-poll-date")?.value;
        const time = document.getElementById("input-poll-time")?.value;
        if (!date || !time) {
          document.getElementById("err-poll-schedule")?.classList.add("visible");
          isValid = false;
        }
      }

      if (!isValid) {
        this.showError("Please enter a question and at least 2 poll options.");
      }

    } else if (this.activeType === "proposal") {
      const title = document.getElementById("input-prop-title")?.value.trim();
      const desc = document.getElementById("input-prop-desc")?.value.trim();
      const reason = document.getElementById("input-prop-reason")?.value.trim();

      if (!title) {
        document.getElementById("wrap-prop-title")?.classList.add("field-error");
        document.getElementById("err-prop-title")?.classList.add("visible");
        isValid = false;
      }
      if (!desc) {
        document.getElementById("wrap-prop-desc")?.classList.add("field-error");
        document.getElementById("err-prop-desc")?.classList.add("visible");
        isValid = false;
      }
      if (!reason) {
        document.getElementById("wrap-prop-reason")?.classList.add("field-error");
        document.getElementById("err-prop-reason")?.classList.add("visible");
        isValid = false;
      }
      if (this.isPropScheduled) {
        const date = document.getElementById("input-prop-date")?.value;
        const time = document.getElementById("input-prop-time")?.value;
        if (!date || !time) {
          document.getElementById("err-prop-schedule")?.classList.add("visible");
          isValid = false;
        }
      }

      if (!isValid) {
        this.showError("Please complete all proposal fields.");
      }
    }

    return isValid;
  },

  handleFormSubmit(e) {
    if (e) e.preventDefault();
    if (this.isSubmitting) return;

    if (!this.validateForm()) return;

    let payload = {};
    if (this.activeType === "message") {
      const aud = document.getElementById("select-msg-audience")?.value || "All Residents";
      let audDetail = aud;
      if (aud === "Selected Wing") audDetail = `${aud} (${document.getElementById("select-msg-wing")?.value})`;
      if (aud === "Selected Residents") audDetail = `${aud} (${this.selectedResidents.msg.length} selected)`;

      payload = {
        type: "message",
        title: document.getElementById("input-msg-title")?.value.trim(),
        message: document.getElementById("input-msg-body")?.value.trim(),
        category: document.getElementById("select-msg-category")?.value || "General",
        priority: this.activePriority,
        target: audDetail,
        is_scheduled: false
      };
    } else if (this.activeType === "poll") {
      const aud = document.getElementById("select-poll-audience")?.value || "All Residents";
      let audDetail = aud;
      if (aud === "Selected Wing") audDetail = `${aud} (${document.getElementById("select-poll-wing")?.value})`;
      if (aud === "Selected Residents") audDetail = `${aud} (${this.selectedResidents.poll.length} selected)`;

      payload = {
        type: "poll",
        title: document.getElementById("input-poll-question")?.value.trim(),
        question: document.getElementById("input-poll-question")?.value.trim(),
        options: this.pollOptions.filter(o => o.trim().length > 0).map(o => ({ text: o.trim(), votes: 0, pct: 0 })),
        allow_multiple: document.getElementById("chk-poll-multiple")?.checked || false,
        category: document.getElementById("select-poll-category")?.value || "General",
        priority: "Normal",
        target: audDetail,
        is_scheduled: this.isPollScheduled,
        schedule_date: document.getElementById("input-poll-date")?.value || "",
        schedule_time: document.getElementById("input-poll-time")?.value || ""
      };
    } else if (this.activeType === "proposal") {
      const aud = document.getElementById("select-prop-audience")?.value || "All Residents";
      let audDetail = aud;
      if (aud === "Selected Wing") audDetail = `${aud} (${document.getElementById("select-prop-wing")?.value})`;
      if (aud === "Selected Residents") audDetail = `${aud} (${this.selectedResidents.prop.length} selected)`;

      payload = {
        type: "proposal",
        title: document.getElementById("input-prop-title")?.value.trim(),
        description: document.getElementById("input-prop-desc")?.value.trim(),
        reason: document.getElementById("input-prop-reason")?.value.trim(),
        options: [{ text: "YES", votes: 0, pct: 0 }, { text: "NO", votes: 0, pct: 0 }],
        category: document.getElementById("select-prop-category")?.value || "Society Decision",
        priority: "Normal",
        target: audDetail,
        is_scheduled: this.isPropScheduled,
        schedule_date: document.getElementById("input-prop-date")?.value || "",
        schedule_time: document.getElementById("input-prop-time")?.value || ""
      };
    }

    this.pendingPayload = payload;
    this.openConfirmSheet(payload);
  },

  openConfirmSheet(p) {
    const typeEl = document.getElementById("confirm-summary-type");
    const audEl = document.getElementById("confirm-summary-audience");
    const titleEl = document.getElementById("confirm-summary-title");
    const schedRow = document.getElementById("confirm-summary-schedule-row");
    const schedEl = document.getElementById("confirm-summary-schedule");
    const titleHeading = document.getElementById("notif-confirm-title");
    const sendBtnText = document.getElementById("btn-execute-text");

    if (typeEl) typeEl.textContent = p.type.toUpperCase();
    if (audEl) audEl.textContent = p.target;
    if (titleEl) titleEl.textContent = p.title || p.question;

    if (p.is_scheduled && schedRow && schedEl) {
      schedRow.style.display = "flex";
      schedEl.textContent = `${p.schedule_date} at ${p.schedule_time}`;
      if (titleHeading) titleHeading.textContent = "Schedule this notification?";
      if (sendBtnText) sendBtnText.textContent = "Schedule";
    } else {
      if (schedRow) schedRow.style.display = "none";
      if (titleHeading) titleHeading.textContent = "Send this notification?";
      if (sendBtnText) sendBtnText.textContent = "Send";
    }

    GrihamBottomSheet.open("notif-confirm-sheet", "notif-confirm-backdrop");
  },

  closeConfirmSheet() {
    GrihamBottomSheet.close("notif-confirm-sheet", "notif-confirm-backdrop");
  },

  async executeSend() {
    if (this.isSubmitting || !this.pendingPayload) return;
    this.isSubmitting = true;

    const btn = document.getElementById("btn-execute-send");
    const btnText = document.getElementById("btn-execute-text");
    const isScheduled = this.pendingPayload.is_scheduled;

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = isScheduled ? "Scheduling..." : "Sending...";

    try {
      const response = await createAdminNotification(this.pendingPayload);

      const newNotif = {
        id: response?.notification_id || `notif-${Date.now()}`,
        type: this.pendingPayload.type,
        title: this.pendingPayload.title || this.pendingPayload.question,
        message: this.pendingPayload.message,
        question: this.pendingPayload.question,
        description: this.pendingPayload.description,
        reason: this.pendingPayload.reason,
        category: this.pendingPayload.category,
        priority: this.pendingPayload.priority || "Normal",
        target: this.pendingPayload.target,
        created_at: isScheduled ? `Scheduled: ${this.pendingPayload.schedule_date}` : "Just now",
        status: isScheduled ? "Scheduled" : "Sent",
        options: this.pendingPayload.options || []
      };

      this.notificationsHistory.unshift(newNotif);

      this.closeConfirmSheet();
      this.openSuccessSheet(isScheduled);

    } catch (err) {
      console.error("[Notifications] Failed to send notification:", err);
      this.closeConfirmSheet();
      this.showError("Unable to send notification. Please try again.");
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = isScheduled ? "Schedule" : "Send";
      this.isSubmitting = false;
    }
  },

  openSuccessSheet(isScheduled) {
    const titleEl = document.getElementById("notif-success-title");
    const descEl = document.getElementById("notif-success-desc");

    if (titleEl) titleEl.textContent = isScheduled ? "Notification Scheduled" : "Notification Sent";
    if (descEl) descEl.textContent = isScheduled ? "Your notification has been scheduled." : "The notification has been sent successfully.";

    GrihamBottomSheet.open("notif-success-sheet", "notif-success-backdrop");
  },

  closeSuccessSheet() {
    GrihamBottomSheet.close("notif-success-sheet", "notif-success-backdrop");
    this.resetForm();
    this.renderHistory();
  },

  resetForm() {
    const msgTitle = document.getElementById("input-msg-title");
    const msgBody = document.getElementById("input-msg-body");
    if (msgTitle) msgTitle.value = "";
    if (msgBody) msgBody.value = "";

    const pollQ = document.getElementById("input-poll-question");
    if (pollQ) pollQ.value = "";
    this.pollOptions = ["", ""];
    this.renderPollOptions();

    const propTitle = document.getElementById("input-prop-title");
    const propDesc = document.getElementById("input-prop-desc");
    const propReason = document.getElementById("input-prop-reason");
    if (propTitle) propTitle.value = "";
    if (propDesc) propDesc.value = "";
    if (propReason) propReason.value = "";

    const chkPollSched = document.getElementById("chk-poll-schedule");
    const chkPropSched = document.getElementById("chk-prop-schedule");
    if (chkPollSched) chkPollSched.checked = false;
    if (chkPropSched) chkPropSched.checked = false;
    this.toggleSchedule("poll", false);
    this.toggleSchedule("prop", false);

    this.selectedResidents = { msg: [], poll: [], prop: [] };
    this.renderMockResidents("msg");
    this.renderMockResidents("poll");
    this.renderMockResidents("prop");

    this.setPriority("Normal");
    this.clearErrors();
    this.pendingPayload = null;
  },

  async loadHistory(force = false) {
    if (this.isLoadingHistory) return;
    if (this.notificationsHistory.length > 0 && !force) {
      this.renderHistory();
      return;
    }

    this.isLoadingHistory = true;
    const skeleton = document.getElementById("notif-history-skeleton");
    const itemsList = document.getElementById("notif-history-items");

    if (skeleton) skeleton.style.display = "flex";
    if (itemsList) itemsList.innerHTML = "";

    try {
      const response = await getAdminNotifications();
      if (response && Array.isArray(response.notifications)) {
        this.notificationsHistory = response.notifications;
      }
      this.renderHistory();
    } catch (err) {
      console.error("[Notifications] Failed to load history:", err);
      if (itemsList) {
        itemsList.innerHTML = `
          <div style="text-align:center; padding:1.25rem 0.5rem; color:var(--text-muted); font-size:0.85rem;">
            <p>Unable to load notification history.</p>
            <button type="button" class="btn-card-action" style="margin:0.5rem auto 0; width:auto;" onclick="GrihamAdminNotificationsUI.loadHistory(true)">Try Again</button>
          </div>
        `;
      }
    } finally {
      if (skeleton) skeleton.style.display = "none";
      this.isLoadingHistory = false;
    }
  },

  setFilter(filter) {
    this.activeFilter = filter;
    document.querySelectorAll(".btn-filter-chip").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-filter") === filter);
    });
    this.renderHistory();
  },

  renderHistory() {
    const container = document.getElementById("notif-history-items");
    if (!container) return;

    let list = this.notificationsHistory;
    if (this.activeFilter !== "all") {
      list = list.filter(n => n.type === this.activeFilter);
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:1.5rem 0.5rem; color:var(--text-muted); font-size:0.85rem; background:var(--glass-bg); border:1px solid var(--glass-border); border-radius:var(--radius-md);">
          No ${this.activeFilter === 'all' ? '' : this.activeFilter} notifications found.
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(item => {
      const isUrgent = item.priority === "Urgent";
      const isImportant = item.priority === "Important";
      const isClosed = item.status === "Closed";
      const isScheduled = item.status === "Scheduled";
      
      let badgeColor = "var(--color-brand-emerald)";
      if (isClosed) badgeColor = "var(--text-muted)";
      if (isScheduled) badgeColor = "var(--color-brand-blue)";

      return `
        <article class="notif-history-card" onclick="GrihamAdminNotificationsUI.openDetail('${item.id}')" role="button" tabindex="0" aria-label="Notification: ${escapeHtml(item.title)}">
          <div class="notif-card-top">
            <span class="notif-type-tag ${item.type}">${item.type}</span>
            <div style="display:flex; align-items:center; gap:0.35rem;">
              ${isUrgent ? '<span style="font-size:0.68rem; font-weight:700; color:#ef4444; background:rgba(239,68,68,0.12); padding:0.15rem 0.4rem; border-radius:4px;">URGENT</span>' : ''}
              ${isImportant ? '<span style="font-size:0.68rem; font-weight:700; color:var(--color-brand-amber); background:rgba(245,158,11,0.12); padding:0.15rem 0.4rem; border-radius:4px;">IMPORTANT</span>' : ''}
              <span style="font-size:0.72rem; font-weight:600; color:${badgeColor};">${item.status}</span>
            </div>
          </div>

          <h3 class="notif-card-title">${escapeHtml(item.title)}</h3>

          <div style="font-size:calc(0.78rem * var(--font-scale)); color:var(--text-secondary); display:flex; gap:0.5rem; flex-wrap:wrap;">
            <span>📁 ${escapeHtml(item.category)}</span>
            <span>👥 ${escapeHtml(item.target)}</span>
          </div>

          <div class="notif-card-footer">
            <span>🕒 ${escapeHtml(item.created_at)}</span>
            <span style="display:flex; align-items:center; gap:0.25rem; color:var(--admin-accent); font-weight:600;">
              Details
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </div>
        </article>
      `;
    }).join("");
  },

  openDetail(id) {
    const canonicalItem = (typeof MOCK_NOTIFICATIONS_DB !== "undefined" && Array.isArray(MOCK_NOTIFICATIONS_DB.notifications))
      ? MOCK_NOTIFICATIONS_DB.notifications.find(n => n.id === id)
      : null;
    const item = canonicalItem || this.notificationsHistory.find(n => n.id === id);
    if (!item) return;

    const bodyEl = document.getElementById("notif-detail-body");
    if (!bodyEl) return;

    let contentSection = "";
    if (item.type === "message") {
      contentSection = `
        <div style="background:var(--input-bg); border:1px solid var(--input-border); border-radius:var(--radius-sm); padding:0.85rem; font-size:calc(0.88rem * var(--font-scale)); color:var(--text-primary); line-height:1.5; white-space:pre-wrap;">
          ${escapeHtml(item.message || "")}
        </div>
      `;
    } else if (item.type === "poll") {
      const opts = item.options || [
        { text: "Option A", votes: 42, pct: 60 },
        { text: "Option B", votes: 28, pct: 40 }
      ];
      const totalVotes = opts.reduce((acc, o) => acc + (o.votes || 0), 0);

      contentSection = `
        <div style="margin-bottom:0.35rem;">
          <p style="font-size:calc(0.9rem * var(--font-scale)); font-weight:600; color:var(--text-primary); margin-bottom:0.75rem;">${escapeHtml(item.question || item.title)}</p>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.5rem;">Mock Voting Breakdown (${totalVotes} votes total):</div>
          ${opts.map((opt, i) => `
            <div class="poll-stat-row">
              <div class="poll-stat-meta">
                <span>${escapeHtml(opt.text)}</span>
                <span style="color:var(--admin-accent);">${opt.votes || 0} votes (${opt.pct || 0}%)</span>
              </div>
              <div class="poll-stat-track">
                <div class="poll-stat-fill" style="width:${opt.pct || (totalVotes ? Math.round((opt.votes/totalVotes)*100) : 0)}%;"></div>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    } else if (item.type === "proposal") {
      const opts = item.options || [
        { text: "YES", votes: 61, pct: 78 },
        { text: "NO", votes: 17, pct: 22 }
      ];
      const yesOpt = opts.find(o => o.text === "YES") || { votes: 61, pct: 78 };
      const noOpt = opts.find(o => o.text === "NO") || { votes: 17, pct: 22 };

      contentSection = `
        <div style="display:flex; flex-direction:column; gap:0.65rem;">
          <div style="background:var(--input-bg); border:1px solid var(--input-border); border-radius:var(--radius-sm); padding:0.85rem; font-size:calc(0.85rem * var(--font-scale)); color:var(--text-primary); line-height:1.45;">
            <strong style="color:var(--admin-accent); display:block; margin-bottom:0.25rem;">Description:</strong>
            ${escapeHtml(item.description || item.title)}
          </div>
          
          ${item.reason ? `
            <div style="background:var(--input-bg); border:1px solid var(--input-border); border-radius:var(--radius-sm); padding:0.85rem; font-size:calc(0.85rem * var(--font-scale)); color:var(--text-primary); line-height:1.45;">
              <strong style="color:var(--color-brand-blue); display:block; margin-bottom:0.25rem;">Reason & Context:</strong>
              ${escapeHtml(item.reason)}
            </div>
          ` : ''}

          <div style="margin-top:0.25rem;">
            <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.4rem;">Mock Proposal Voting Results:</div>
            <div class="proposal-stats-grid">
              <div class="prop-stat-box yes">
                <span style="font-size:0.75rem; font-weight:700;">YES</span>
                <span class="prop-count-num">${yesOpt.votes || 61}</span>
                <span style="font-size:0.72rem; opacity:0.8;">${yesOpt.pct || 78}% Support</span>
              </div>
              <div class="prop-stat-box no">
                <span style="font-size:0.75rem; font-weight:700;">NO</span>
                <span class="prop-count-num">${noOpt.votes || 17}</span>
                <span style="font-size:0.72rem; opacity:0.8;">${noOpt.pct || 22}% Oppose</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    bodyEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="notif-type-tag ${item.type}">${item.type}</span>
        <span style="font-size:0.75rem; font-weight:600; color:var(--color-brand-emerald);">${item.status}</span>
      </div>

      <h2 style="font-family:var(--font-family-display); font-size:calc(1.1rem * var(--font-scale)); font-weight:700; color:var(--text-primary); line-height:1.3;">
        ${escapeHtml(item.title)}
      </h2>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.45rem; background:var(--btn-secondary-bg); border:1px solid var(--btn-secondary-border); border-radius:var(--radius-sm); padding:0.65rem 0.8rem; font-size:calc(0.78rem * var(--font-scale));">
        <div><span style="color:var(--text-muted);">Category:</span> <strong>${escapeHtml(item.category)}</strong></div>
        <div><span style="color:var(--text-muted);">Priority:</span> <strong>${escapeHtml(item.priority || "Normal")}</strong></div>
        <div style="grid-column:1 / -1;"><span style="color:var(--text-muted);">Audience:</span> <strong>${escapeHtml(item.target)}</strong></div>
        <div style="grid-column:1 / -1;"><span style="color:var(--text-muted);">Created:</span> <strong>${escapeHtml(item.created_at)}</strong></div>
      </div>

      ${contentSection}
    `;

    GrihamBottomSheet.open("notif-detail-sheet", "notif-detail-backdrop");
  },

  closeDetailSheet() {
    GrihamBottomSheet.close("notif-detail-sheet", "notif-detail-backdrop");
  },

  closeAllSheets() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.closeAll();
    }
  }
};
