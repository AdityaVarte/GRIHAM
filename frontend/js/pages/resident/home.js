/**
 * GRIHAM FRONTEND - RESIDENT HOME CONTROLLER
 * Page: Resident Home (#resident-home or #/resident/home)
 * Mobile-first Residential Society Management App
 */

window.HTML_RESIDENT_HOME = `
<!-- ================================================================= -->
<!-- RESIDENT BOTTOM SHEETS & MODALS                                   -->
<!-- ================================================================= -->

<!-- 1. CONTACT CHAIRMAN BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-chairman-backdrop" onclick="GrihamResidentHomeUI.closeContactChairman()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-chairman" role="dialog" aria-modal="true" aria-labelledby="chairman-sheet-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentHomeUI.closeContactChairman()" aria-label="Close Contact Chairman Sheet">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="chairman-sheet-title">Contact Chairman</h3>
    <div style="width:24px;" aria-hidden="true"></div>
  </div>

  <div style="padding: 0.5rem 0.25rem 1rem;">
    <div class="res-sheet-profile-header">
      <div class="res-avatar-box" style="width:44px; height:44px; font-size:1rem; background:linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
        <span id="res-chairman-initials">RV</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:0.15rem;">
        <strong style="font-size:0.95rem; color:var(--text-primary);" id="res-chairman-name">Rajesh Verma</strong>
        <span style="font-size:0.75rem; color:var(--admin-accent); font-weight:600;" id="res-chairman-role">Society Chairman</span>
        <span style="font-size:0.74rem; color:var(--text-muted);" id="res-chairman-phone-display">+91 98765 43210</span>
      </div>
    </div>

    <div style="background:rgba(255,255,255,0.04); border-radius:10px; padding:0.75rem; font-size:0.76rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:0.4rem; margin-bottom:0.85rem;">
      <div style="display:flex; align-items:center; gap:0.4rem;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <span>Office Hours: <strong id="res-chairman-hours" style="color:var(--text-primary);">6:00 PM – 8:00 PM (Mon – Sat)</strong></span>
      </div>
      <div style="display:flex; align-items:center; gap:0.4rem;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        <span id="res-chairman-office">Tower A, Ground Floor Society Office</span>
      </div>
    </div>

    <div class="res-chairman-actions">
      <a href="tel:+919876543210" class="btn-contact-call" id="btn-call-chairman" aria-label="Call Chairman">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span>Call</span>
      </a>
      <a href="sms:+919876543210" class="btn-contact-msg" id="btn-msg-chairman" aria-label="Send Message to Chairman">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>Message</span>
      </a>
    </div>
  </div>
</div>

<!-- 2. RESIDENT NOTIFICATIONS BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-notif-backdrop" onclick="GrihamResidentHomeUI.closeNotifications()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-notif" role="dialog" aria-modal="true" aria-labelledby="res-notif-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentHomeUI.closeNotifications()" aria-label="Close Notifications Sheet">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="res-notif-title">Notifications</h3>
    <button type="button" onclick="GrihamResidentHomeUI.markAllNotificationsRead()" style="background:transparent; border:none; color:var(--resident-accent); font-size:0.75rem; font-weight:700; cursor:pointer;" id="btn-res-mark-all-read">
      Mark Read
    </button>
  </div>

  <div id="res-notif-list" style="padding:0.5rem 0.2rem 1.5rem; display:flex; flex-direction:column; gap:0.6rem; max-height:60vh; overflow-y:auto;">
    <!-- Injected by JS -->
  </div>
</div>

<!-- 3. RESIDENT MAINTENANCE PAYMENT / DETAIL SHEET -->
<div class="sheet-backdrop" id="sheet-res-maint-backdrop" onclick="GrihamResidentHomeUI.closeMaintenance()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-maint" role="dialog" aria-modal="true" aria-labelledby="res-maint-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentHomeUI.closeMaintenance()" aria-label="Close Maintenance Details">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="res-maint-title">Maintenance Dues</h3>
    <div style="width:24px;" aria-hidden="true"></div>
  </div>

  <div style="padding:0.5rem 0.25rem 1.5rem; display:flex; flex-direction:column; gap:0.75rem;">
    <div style="background:rgba(255,255,255,0.05); border:1px solid var(--glass-border); border-radius:12px; padding:1rem; text-align:center;">
      <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;" id="res-maint-sheet-month">September 2026</span>
      <div style="font-size:1.8rem; font-weight:800; color:var(--text-primary); margin:0.3rem 0;" id="res-maint-sheet-amount">₹3,500</div>
      <span class="res-recent-badge badge-due" id="res-maint-sheet-badge">Payment Due</span>
      <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.45rem;" id="res-maint-sheet-duedate">Due date: 25 Sep 2026</div>
    </div>

    <div style="background:rgba(255,255,255,0.03); border-radius:10px; padding:0.75rem; font-size:0.76rem; display:flex; flex-direction:column; gap:0.4rem;">
      <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
        <span>Society Maintenance</span>
        <span style="font-weight:600; color:var(--text-primary);">₹2,500</span>
      </div>
      <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
        <span>Sinking & Reserve Fund</span>
        <span style="font-weight:600; color:var(--text-primary);">₹500</span>
      </div>
      <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
        <span>Water & Utility Charges</span>
        <span style="font-weight:600; color:var(--text-primary);">₹500</span>
      </div>
      <div style="height:1px; background:rgba(255,255,255,0.08); margin:0.2rem 0;"></div>
      <div style="display:flex; justify-content:space-between; font-weight:700; color:var(--text-primary);">
        <span>Total Payable</span>
        <span style="color:var(--admin-accent);" id="res-maint-total-payable">₹3,500</span>
      </div>
    </div>

    <!-- PENDING VERIFICATION ALERT BOX -->
    <div class="res-verification-banner" id="res-maint-verification-banner" style="display:none;">
      <div class="res-approval-icon-box" style="background:rgba(245,158,11,0.2); color:#f59e0b;" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
      <div class="res-approval-content" style="flex:1;">
        <h4 class="res-approval-title" style="color:#f59e0b; font-size:0.85rem;">Cash Payment Pending Verification</h4>
        <p class="res-approval-desc" id="res-maint-verification-desc" style="font-size:0.75rem;">
          Receipt submitted. Awaiting society administration verification.
        </p>
        <button type="button" class="btn-sheet-action" onclick="GrihamResidentHomeUI.openSubmittedReceipt()" style="margin-top:0.4rem; padding:0.35rem 0.75rem; font-size:0.75rem; border-radius:6px; background:rgba(245,158,11,0.2); border:1px solid rgba(245,158,11,0.4); color:#f59e0b; font-weight:700; cursor:pointer; width:fit-content;">
          View Submitted Receipt
        </button>
      </div>
    </div>

    <!-- REJECTION ALERT BOX -->
    <div class="res-rejection-banner" id="res-maint-rejection-banner" style="display:none;">
      <div class="res-approval-icon-box" style="background:rgba(239,68,68,0.2); color:#ef4444;" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <div class="res-approval-content" style="flex:1;">
        <h4 class="res-approval-title" style="color:#ef4444; font-size:0.85rem;">Payment Rejected by Admin</h4>
        <p class="res-approval-desc" id="res-maint-rejection-desc" style="font-size:0.75rem; color:#fca5a5;">
          Reason: Receipt was unclear.
        </p>
        <button type="button" class="btn-sheet-action" onclick="GrihamResidentHomeUI.openCashPaymentForm()" style="margin-top:0.4rem; padding:0.35rem 0.75rem; font-size:0.75rem; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid rgba(239,68,68,0.4); color:#ef4444; font-weight:700; cursor:pointer; width:fit-content;">
          Submit Corrected Receipt
        </button>
      </div>
    </div>

    <!-- ACTION BUTTONS -->
    <div id="res-maint-action-btns" style="display:flex; flex-direction:column; gap:0.55rem; margin-top:0.25rem;">
      <button type="button" class="btn-primary-action" id="btn-res-pay-now" onclick="GrihamResidentHomeUI.simulatePayMaintenance()" style="width:100%; min-height:44px; font-size:0.9rem; font-weight:700; border-radius:10px; background:linear-gradient(135deg, #10b981 0%, #059669 100%); color:#ffffff; border:none; cursor:pointer;">
        Pay ₹3,500 Online
      </button>

      <button type="button" class="btn-paid-cash" id="btn-res-paid-cash" onclick="GrihamResidentHomeUI.openCashPaymentForm()" aria-label="Paid by Cash — Upload Receipt">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
        <span>Paid by Cash — Upload Receipt</span>
      </button>

      <button type="button" class="btn-secondary-action" id="btn-res-view-receipt-paid" onclick="GrihamResidentHomeUI.openSubmittedReceipt()" style="display:none; width:100%; min-height:40px; font-size:0.8rem; font-weight:600; border-radius:10px; background:rgba(16,185,129,0.15); color:#10b981; border:1px solid rgba(16,185,129,0.35); cursor:pointer;">
        View Receipt
      </button>

      <button type="button" class="btn-secondary-action" onclick="GrihamResidentHomeUI.closeMaintenance(); GrihamRouter.navigate('/resident/maintenance');" style="width:100%; min-height:40px; font-size:0.8rem; font-weight:600; border-radius:10px; background:rgba(255,255,255,0.06); color:var(--text-secondary); border:1px solid var(--glass-border); cursor:pointer;">
        View Maintenance History
      </button>
    </div>
  </div>
</div>

<!-- 3B. CASH PAYMENT RECEIPT SUBMISSION BOTTOM SHEET -->
<div class="sheet-backdrop" id="sheet-res-cash-payment-backdrop" onclick="GrihamResidentHomeUI.closeCashPaymentForm()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-cash-payment" role="dialog" aria-modal="true" aria-labelledby="cash-payment-sheet-title" aria-hidden="true">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentHomeUI.closeCashPaymentForm()" aria-label="Close Cash Payment Form">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="cash-payment-sheet-title">Paid by Cash</h3>
    <div style="width:24px;" aria-hidden="true"></div>
  </div>

  <form id="form-res-cash-payment" onsubmit="GrihamResidentHomeUI.handleCashFormSubmit(event)" style="padding:0.4rem 0.25rem 1.5rem; display:flex; flex-direction:column;" novalidate>
    <p style="font-size:0.78rem; color:var(--text-muted); margin:0 0 0.85rem; line-height:1.35;">
      Report maintenance paid in cash to the society office. Upload your receipt/acknowledgment photo for Admin verification.
    </p>

    <!-- Field 1: Month -->
    <div class="res-form-group">
      <label for="res-cash-month" class="res-form-label">Maintenance Month *</label>
      <select id="res-cash-month" class="res-form-select" onchange="GrihamResidentHomeUI.onCashMonthChanged(this.value)">
        <option value="2026-09" selected>September 2026</option>
        <option value="2026-08">August 2026</option>
        <option value="2026-07">July 2026</option>
      </select>
    </div>

    <!-- Field 2: Amount Paid -->
    <div class="res-form-group">
      <label for="res-cash-amount" class="res-form-label">
        <span>Amount Paid (₹) *</span>
        <span style="font-size:0.68rem; color:var(--text-muted); font-weight:normal;">Numbers only</span>
      </label>
      <input type="number" id="res-cash-amount" class="res-form-input" placeholder="e.g. 3500" min="1" step="1" value="3500" required>
      <span class="res-form-error" id="err-cash-amount">Please enter a valid amount greater than ₹0.</span>
    </div>

    <!-- Field 3: Payment Date -->
    <div class="res-form-group">
      <label for="res-cash-date" class="res-form-label">Payment Date *</label>
      <input type="date" id="res-cash-date" class="res-form-input" required>
      <span class="res-form-error" id="err-cash-date">Payment date cannot be in the future.</span>
    </div>

    <!-- Field 4: Receipt Photo Upload & Preview -->
    <div class="res-form-group">
      <label class="res-form-label">Receipt Photo *</label>
      <input type="file" id="input-cash-receipt-file" accept="image/jpeg,image/png,image/webp,image/jpg" capture="environment" style="display:none;" onchange="GrihamResidentHomeUI.onReceiptFileChanged(this)">

      <!-- Dropzone -->
      <div class="res-receipt-dropzone" id="res-receipt-dropzone" onclick="GrihamResidentHomeUI.triggerReceiptFileSelect()" role="button" tabindex="0" aria-label="Upload cash receipt photo">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="color:var(--text-muted);">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <div style="font-size:0.8rem; font-weight:700; color:var(--text-primary);">
          Select or Capture Receipt Photo
        </div>
        <div class="res-receipt-upload-btns">
          <button type="button" class="btn-upload-choice" onclick="event.stopPropagation(); GrihamResidentHomeUI.triggerReceiptFileSelect()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            <span>Camera</span>
          </button>
          <button type="button" class="btn-upload-choice" onclick="event.stopPropagation(); GrihamResidentHomeUI.triggerReceiptFileSelect()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>Gallery / Files</span>
          </button>
        </div>
        <span style="font-size:0.68rem; color:var(--text-muted); margin-top:0.15rem;">
          Supported formats: JPG, PNG, WEBP (Max 5MB)
        </span>
      </div>

      <!-- Preview Box -->
      <div class="res-receipt-preview-wrap" id="res-receipt-preview-wrap">
        <div class="res-receipt-preview-img-box">
          <img id="img-receipt-preview" class="res-receipt-preview-img" src="" alt="Receipt Preview">
        </div>
        <div class="res-receipt-preview-meta">
          <span class="res-receipt-preview-filename" id="txt-receipt-filename">receipt.jpg</span>
          <div class="res-receipt-actions-row">
            <button type="button" class="btn-receipt-replace" onclick="GrihamResidentHomeUI.triggerReceiptFileSelect()" aria-label="Replace receipt photo">
              Replace
            </button>
            <button type="button" class="btn-receipt-remove" onclick="GrihamResidentHomeUI.removeReceiptFile()" aria-label="Remove receipt photo">
              Remove
            </button>
          </div>
        </div>
      </div>

      <span class="res-form-error" id="err-cash-receipt">Please upload a valid receipt image (max 5MB).</span>
    </div>

    <!-- Field 5: Optional Note -->
    <div class="res-form-group">
      <label for="res-cash-notes" class="res-form-label">
        <span>Note (Optional)</span>
        <span style="font-size:0.68rem; color:var(--text-muted); font-weight:normal;">Optional</span>
      </label>
      <textarea id="res-cash-notes" class="res-form-textarea" rows="2" placeholder="e.g. Paid in cash to Treasurer at society office..."></textarea>
    </div>

    <!-- Duplicate Protection Alert Box -->
    <div id="res-cash-duplicate-err" class="res-form-error" style="font-size:0.78rem; margin:0 0 0.75rem; background:rgba(239,68,68,0.12); padding:0.6rem; border-radius:8px; border:1px solid rgba(239,68,68,0.3);"></div>

    <!-- Submit Button -->
    <button type="submit" class="btn-primary-action" id="btn-cash-form-submit" style="width:100%; min-height:46px; font-size:0.92rem; font-weight:700; border-radius:10px; background:linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color:#ffffff; border:none; cursor:pointer;">
      Submit Cash Payment
    </button>
  </form>
</div>

<!-- 3C. SUBMISSION CONFIRMATION & SUCCESS MODAL -->
<div class="modal-backdrop" id="modal-res-cash-confirm-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-cash-confirm-title" aria-hidden="true">
  <div class="sos-modal-card">
    <!-- Confirmation View -->
    <div id="res-cash-confirm-view">
      <div class="sos-modal-header">
        <div class="sos-modal-icon" style="background:rgba(245, 158, 11, 0.2); color:#f59e0b; border:1px solid rgba(245, 158, 11, 0.4);">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
            <rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>
          </svg>
        </div>
        <div>
          <h4 class="sos-modal-title" id="modal-cash-confirm-title">Submit Cash Payment?</h4>
          <span style="font-size:0.75rem; color:var(--text-muted);">Verification Proof</span>
        </div>
      </div>

      <p class="sos-modal-desc" style="margin:0.75rem 0 1rem;">
        You are submitting a cash maintenance payment for verification.
      </p>

      <div style="background:rgba(255,255,255,0.04); border:1px solid var(--glass-border); border-radius:10px; padding:0.75rem; font-size:0.78rem; display:flex; flex-direction:column; gap:0.4rem; margin-bottom:1.1rem;">
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Month:</span>
          <strong style="color:var(--text-primary);" id="confirm-cash-month">September 2026</strong>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Amount:</span>
          <strong style="color:var(--admin-accent);" id="confirm-cash-amount">₹3,500</strong>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Payment Date:</span>
          <strong style="color:var(--text-primary);" id="confirm-cash-date">19 Sep 2026</strong>
        </div>
        <div style="margin-top:0.35rem; display:flex; align-items:center; gap:0.5rem;">
          <span style="color:var(--text-muted);">Receipt:</span>
          <img id="confirm-cash-thumb" src="" alt="Thumbnail" style="width:36px; height:36px; object-fit:cover; border-radius:4px; border:1px solid var(--glass-border);">
          <span style="font-size:0.72rem; color:var(--text-secondary);" id="confirm-cash-receipt-status">Photo attached</span>
        </div>
      </div>

      <div class="sos-modal-btn-row">
        <button type="button" class="btn-modal-cancel" onclick="GrihamResidentHomeUI.closeCashConfirm()" id="btn-cancel-cash-confirm">Cancel</button>
        <button type="button" class="btn-modal-confirm-resolve" onclick="GrihamResidentHomeUI.executeCashPaymentSubmission()" id="btn-submit-cash-confirm" style="background:#f59e0b; border-color:#d97706; color:#ffffff;">Submit</button>
      </div>
    </div>

    <!-- Success View -->
    <div id="res-cash-success-view" style="display:none; text-align:center; padding:0.5rem 0.2rem;">
      <div style="width:52px; height:52px; border-radius:50%; background:rgba(245, 158, 11, 0.2); border:2px solid #f59e0b; color:#f59e0b; display:flex; align-items:center; justify-content:center; margin:0 auto 0.85rem;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
      <h4 style="font-size:1.15rem; font-weight:800; color:#ffffff; margin:0 0 0.4rem;">Cash Payment Submitted</h4>
      <p style="font-size:0.82rem; color:var(--text-secondary); margin:0 0 0.85rem;">
        Your payment receipt has been submitted for verification.
      </p>
      <div style="background:rgba(255,255,255,0.05); border-radius:8px; padding:0.6rem; font-size:0.75rem; color:var(--text-muted); margin-bottom:1.1rem; text-align:left;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem;">
          <span>Status:</span>
          <span class="res-recent-badge badge-verification" style="font-size:0.7rem;">PENDING VERIFICATION</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span>Next Step:</span>
          <span style="color:var(--text-primary);">Admin will review and approve receipt</span>
        </div>
      </div>
      <button type="button" class="btn-primary-action" onclick="GrihamResidentHomeUI.closeCashConfirmSuccess()" style="width:100%; min-height:42px; font-size:0.88rem; font-weight:700; border-radius:10px; background:var(--surface-secondary); color:#ffffff; border:1px solid var(--glass-border); cursor:pointer;">
        Done
      </button>
    </div>
  </div>
</div>

<!-- 3D. RECEIPT VIEWER MODAL -->
<div class="modal-backdrop" id="modal-res-receipt-viewer-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-receipt-viewer-title" aria-hidden="true">
  <div class="sos-modal-card" style="max-width:420px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
      <h4 class="sos-modal-title" id="modal-receipt-viewer-title">Submitted Receipt</h4>
      <button type="button" class="btn-sheet-back" onclick="GrihamResidentHomeUI.closeReceiptViewer()" aria-label="Close receipt viewer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <div style="border-radius:10px; overflow:hidden; background:#000000; display:flex; align-items:center; justify-content:center; max-height:260px;">
      <img id="view-receipt-large-img" class="modal-receipt-img" src="" alt="Cash Payment Receipt">
    </div>

    <div style="margin-top:0.75rem; background:rgba(255,255,255,0.04); border-radius:8px; padding:0.65rem; font-size:0.76rem; display:flex; flex-direction:column; gap:0.3rem;">
      <div style="display:flex; justify-content:space-between;">
        <span style="color:var(--text-muted);">Amount:</span>
        <strong style="color:var(--text-primary);" id="view-receipt-amount">₹3,500</strong>
      </div>
      <div style="display:flex; justify-content:space-between;">
        <span style="color:var(--text-muted);">Payment Date:</span>
        <strong style="color:var(--text-primary);" id="view-receipt-date">19 Sep 2026</strong>
      </div>
      <div style="display:flex; justify-content:space-between;">
        <span style="color:var(--text-muted);">Status:</span>
        <span class="res-recent-badge badge-verification" id="view-receipt-status-badge">Pending Verification</span>
      </div>
    </div>

    <button type="button" class="btn-primary-action" onclick="GrihamResidentHomeUI.closeReceiptViewer()" style="width:100%; min-height:40px; font-size:0.85rem; font-weight:700; border-radius:8px; margin-top:0.75rem; background:rgba(255,255,255,0.08); border:1px solid var(--glass-border); color:#ffffff; cursor:pointer;">
      Close
    </button>
  </div>
</div>

<!-- 4. SOS CONFIRMATION & SUCCESS MODAL -->
<div class="modal-backdrop" id="modal-res-sos-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-res-sos-title" aria-hidden="true">
  <div class="sos-modal-card" id="card-res-sos-modal">
    <!-- CONFIRMATION VIEW -->
    <div id="res-sos-view-confirm">
      <div class="sos-modal-header">
        <div class="sos-modal-icon" style="background:rgba(239, 68, 68, 0.2); color:#ef4444; border:1px solid rgba(239,68,68,0.4);">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div>
          <h4 class="sos-modal-title" id="modal-res-sos-title">Send SOS Alert?</h4>
          <span style="font-size:0.75rem; color:var(--text-muted);">Emergency Assistance</span>
        </div>
      </div>

      <p class="sos-modal-desc" style="margin: 0.85rem 0 1.25rem;">
        An emergency alert will be sent to the society administration.
      </p>

      <div class="sos-modal-btn-row">
        <button type="button" class="btn-modal-cancel" onclick="GrihamResidentHomeUI.closeSOS()" id="btn-cancel-res-sos">Cancel</button>
        <button type="button" class="btn-modal-confirm-resolve" onclick="GrihamResidentHomeUI.confirmSOS()" id="btn-confirm-res-sos" style="background:#ef4444; border-color:#dc2626;">Send SOS</button>
      </div>
    </div>

    <!-- SUCCESS VIEW -->
    <div id="res-sos-view-success" style="display:none; text-align:center; padding:0.5rem 0.2rem;">
      <div style="width:52px; height:52px; border-radius:50%; background:rgba(16, 185, 129, 0.2); border:2px solid #10b981; color:#10b981; display:flex; align-items:center; justify-content:center; margin:0 auto 0.85rem;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h4 style="font-size:1.15rem; font-weight:800; color:#ffffff; margin:0 0 0.4rem;">SOS Alert Sent</h4>
      <p style="font-size:0.85rem; color:var(--text-secondary); margin:0 0 0.85rem;" id="res-sos-success-timestamp">
        Your emergency alert was sent at 10:42 AM.
      </p>
      <div style="background:rgba(255,255,255,0.05); border-radius:8px; padding:0.6rem; font-size:0.75rem; color:var(--text-muted); margin-bottom:1.1rem; text-align:left;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem;">
          <span>Alert ID:</span>
          <strong style="color:var(--text-primary);" id="res-sos-alert-id">SOS-2026-0045</strong>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span>Status:</span>
          <span style="color:#ef4444; font-weight:700;">Broadcast to Security & Admin</span>
        </div>
      </div>
      <button type="button" class="btn-primary-action" onclick="GrihamResidentHomeUI.closeSOS()" style="width:100%; min-height:42px; font-size:0.88rem; font-weight:700; border-radius:10px; background:var(--surface-secondary); color:#ffffff; border:1px solid var(--glass-border); cursor:pointer;">
        Dismiss
      </button>
    </div>
  </div>
</div>

<!-- 5. RESIDENT THREE-DOT MENU DROPDOWN -->
<div class="sheet-backdrop" id="res-menu-backdrop" onclick="GrihamResidentHomeUI.toggleMenu(false)" aria-hidden="true"></div>
<div class="res-menu-dropdown" id="res-menu-dropdown" role="menu" aria-label="Resident Menu Options">
  <button type="button" class="res-menu-item" onclick="GrihamResidentHomeUI.handleMenuNav('/resident/profile')" role="menuitem" id="menu-res-profile">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    <span>Profile</span>
  </button>
  <button type="button" class="res-menu-item" onclick="GrihamResidentHomeUI.handleMenuNav('/resident/maintenance')" role="menuitem" id="menu-res-maint">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
    <span>Maintenance History</span>
  </button>
  <button type="button" class="res-menu-item" onclick="GrihamResidentHomeUI.handleMenuNav('/resident/complaints')" role="menuitem" id="menu-res-complaints">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
    <span>Complaints</span>
  </button>
  <button type="button" class="res-menu-item" onclick="GrihamResidentHomeUI.handleMenuNav('/resident/amenities')" role="menuitem" id="menu-res-amenities">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    <span>Amenities</span>
  </button>
  <div class="res-menu-divider"></div>
  <button type="button" class="res-menu-item" onclick="GrihamResidentHomeUI.openLogoutConfirm()" role="menuitem" id="menu-res-logout" style="color:#ef4444;">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
    <span>Logout</span>
  </button>
</div>

<!-- 6. RESIDENT LOGOUT CONFIRMATION SHEET -->
<div class="sheet-backdrop" id="sheet-res-logout-backdrop" onclick="GrihamResidentHomeUI.closeLogoutConfirm()" aria-hidden="true"></div>
<div class="mobile-bottom-sheet" id="sheet-res-logout" role="dialog" aria-modal="true" aria-labelledby="res-logout-dialog-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom, 20px));">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="logout-confirm-card">
    <div class="logout-shield-icon" aria-hidden="true">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
    </div>
    <h2 class="logout-title" id="res-logout-dialog-title">Logout?</h2>
    <p class="logout-message">Are you sure you want to log out of your resident account?</p>
    <div class="logout-btn-row">
      <button type="button" class="btn-logout-cancel" onclick="GrihamResidentHomeUI.closeLogoutConfirm()" id="btn-cancel-res-logout">
        Cancel
      </button>
      <button type="button" class="btn-logout-confirm" onclick="GrihamResidentHomeUI.confirmLogout()" id="btn-confirm-res-logout">
        Logout
      </button>
    </div>
  </div>
</div>

<!-- ================================================================= -->
<!-- MAIN SCREEN VIEW: Resident Home (#screen-resident-home)           -->
<!-- ================================================================= -->
<section id="screen-resident-home" class="app-view" aria-labelledby="res-greeting-name">

  <!-- TOP BAR -->
  <div class="res-header-bar">
    <div class="res-greeting-wrap">
      <span class="res-greeting-time" id="res-greeting-time">Good Morning,</span>
      <h1 class="res-greeting-name" id="res-greeting-name">Rajesh</h1>
    </div>

    <div class="res-header-actions">
      <!-- Notification Bell -->
      ${GrihamHeader.renderNotificationBell({
        id: 'btn-res-notif',
        onClick: 'GrihamResidentHomeUI.openNotifications()',
        badgeId: 'res-notif-badge',
        customClass: 'res-icon-btn',
        title: 'Resident Notifications',
        ariaLabel: 'Notifications'
      })}

      <!-- Accessibility Settings Trigger -->
      <button type="button" class="res-icon-btn" id="btn-res-a11y" onclick="GrihamA11y.toggleSheet(true)" aria-label="Accessibility Settings" title="Accessibility Panel">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
          <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
          <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
          <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
          <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
        </svg>
      </button>

      <!-- Three-Dot Menu Trigger -->
      ${GrihamHeader.renderThreeDotTrigger({
        id: 'btn-res-menu-trigger',
        onClick: 'GrihamResidentHomeUI.toggleMenu()',
        customClass: 'res-icon-btn',
        title: 'More options',
        ariaLabel: 'Resident Menu'
      })}
    </div>
  </div>

  <!-- LOADING SKELETON STATE -->
  <div id="res-home-loading" style="display:none; padding:1rem; flex-direction:column; gap:0.85rem;">
    <div class="dash-card">
      <div class="skeleton-box" style="height:20px; width:45%; margin-bottom:0.5rem;"></div>
      <div class="skeleton-box" style="height:55px; width:100%;"></div>
    </div>
    <div class="dash-card">
      <div class="skeleton-box" style="height:20px; width:35%; margin-bottom:0.5rem;"></div>
      <div class="skeleton-box" style="height:45px; width:100%;"></div>
    </div>
    <div class="dash-card">
      <div class="skeleton-box" style="height:20px; width:50%; margin-bottom:0.5rem;"></div>
      <div class="skeleton-box" style="height:80px; width:100%;"></div>
    </div>
  </div>

  <!-- ERROR STATE -->
  <div id="res-home-error" style="display:none; padding:2rem 1rem; text-align:center; flex-direction:column; align-items:center; gap:0.75rem;">
    <div style="width:48px; height:48px; border-radius:50%; background:rgba(239, 68, 68, 0.15); color:#ef4444; display:flex; align-items:center; justify-content:center;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    </div>
    <p style="color:var(--text-primary); font-size:0.95rem; font-weight:700; margin:0;">Unable to load your information.</p>
    <p style="color:var(--text-muted); font-size:0.8rem; margin:0;">Please check your connection and try again.</p>
    <button type="button" class="btn-primary-action" onclick="GrihamResidentHomeUI.loadData()" style="width:auto; padding:0.55rem 1.4rem; font-size:0.85rem; margin-top:0.5rem;">
      Retry
    </button>
  </div>

  <!-- MAIN CONTENT CONTAINER -->
  <div id="res-home-content" style="display:flex; flex-direction:column;">

    <!-- 1. RESIDENT PROFILE IDENTITY SUMMARY CARD -->
    <div class="res-profile-section">
      <div class="res-identity-card" id="res-identity-card">
        <div class="res-avatar-box" id="res-avatar-box">
          <span id="res-avatar-initials">RK</span>
        </div>
        <div class="res-identity-info">
          <div class="res-identity-name-row">
            <h2 class="res-identity-name" id="res-profile-name">Rajesh Kumar</h2>
            <span class="res-occupancy-pill" id="res-profile-occupancy">Owner</span>
          </div>
          <span class="res-identity-unit" id="res-profile-unit">Wing A • Flat 204</span>
          <span class="res-identity-society" id="res-profile-society">Griham Residency</span>
        </div>
      </div>
    </div>

    <!-- 2. PENDING APPROVAL WARNING BANNER -->
    <div class="res-approval-banner" id="res-approval-banner" style="display:none;" role="alert">
      <div class="res-approval-icon-box" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <div class="res-approval-content">
        <h3 class="res-approval-title" id="res-approval-title">Account Pending Approval</h3>
        <p class="res-approval-desc" id="res-approval-desc">
          Some resident features will become available after your registration is approved.
        </p>
      </div>
    </div>

    <!-- 3. EMERGENCY SOS ACTION BANNER -->
    <div class="res-sos-section">
      <button type="button" class="res-sos-banner-btn" id="btn-res-trigger-sos" onclick="GrihamResidentHomeUI.openSOSConfirm()" aria-label="Trigger Emergency SOS Alert">
        <div class="res-sos-left">
          <div class="res-sos-ring-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div class="res-sos-title-col">
            <span class="res-sos-title">SOS</span>
            <span class="res-sos-sub">Emergency alert to administration</span>
          </div>
        </div>
        <span class="res-sos-trigger-pill">SOS</span>
      </button>
    </div>

    <!-- 4. WATER SUPPLY STATUS CARD -->
    <div class="res-water-section">
      <div class="res-water-card" id="res-water-card">
        <div class="res-water-header">
          <div class="res-water-title-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="color:#38bdf8;">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
            <span>Water Status</span>
          </div>
          <span class="res-water-status-pill status-normal" id="res-water-status-badge">Normal Supply</span>
        </div>
        <div class="res-water-timing-row">
          <span id="res-water-schedule">Supply Active</span>
          <span id="res-water-next-update" style="color:var(--text-muted); font-size:0.72rem;">Next update: 6:00 PM</span>
        </div>
        <p class="res-water-note" id="res-water-note">Normal municipal water supply active.</p>
      </div>
    </div>

    <!-- 5. QUICK ACTIONS SECTION -->
    <div class="res-actions-section">
      <h3 class="res-actions-title">Quick Actions</h3>
      <div class="res-actions-grid">

        <!-- 1. Contact Chairman -->
        <button type="button" class="res-action-card" id="btn-qa-chairman" onclick="GrihamResidentHomeUI.openContactChairman()" aria-label="Contact Chairman">
          <div class="res-action-icon-wrap amber" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <span class="res-action-title">Contact Chairman</span>
          <span class="res-action-sub">Call / Msg</span>
        </button>

        <!-- 2. Pay Maintenance -->
        <button type="button" class="res-action-card" id="btn-qa-maint" onclick="GrihamResidentHomeUI.openMaintenance()" aria-label="Pay Maintenance">
          <div class="res-action-icon-wrap emerald" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <rect x="2" y="5" width="20" height="14" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
          </div>
          <span class="res-action-title">Pay Maintenance</span>
          <span class="res-action-sub" id="res-qa-maint-sub">₹3,500 Due</span>
        </button>

        <!-- 3. Request Service -->
        <button type="button" class="res-action-card" id="btn-qa-service" onclick="GrihamResidentHomeUI.handleRequestService()" aria-label="Request Service">
          <div class="res-action-icon-wrap blue" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <span class="res-action-title">Request Service</span>
          <span class="res-action-sub" id="res-qa-service-sub">Repairs</span>
        </button>

      </div>
    </div>

    <!-- 6. RECENT INFORMATION SUMMARY CARDS -->
    <div class="res-recent-section">
      <h3 class="res-actions-title" style="margin-bottom:0.15rem;">Recent Society Information</h3>

      <!-- 1. Latest Maintenance -->
      <div class="res-recent-card" id="res-recent-maint-card" onclick="GrihamResidentHomeUI.openMaintenance()" role="button" tabindex="0" aria-label="Maintenance Status">
        <div class="res-recent-left">
          <div class="res-recent-icon" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          </div>
          <div class="res-recent-info">
            <span class="res-recent-label">Maintenance</span>
            <span class="res-recent-val" id="res-recent-maint-val">₹3,500 Due (Sep 2026)</span>
          </div>
        </div>
        <span class="res-recent-badge badge-due" id="res-recent-maint-badge">Due</span>
      </div>

      <!-- 2. Latest Complaint -->
      <div class="res-recent-card" id="res-recent-complaint-card" onclick="GrihamRouter.navigate('/resident/complaints')" role="button" tabindex="0" aria-label="Latest Complaint Status">
        <div class="res-recent-left">
          <div class="res-recent-icon" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </div>
          <div class="res-recent-info">
            <span class="res-recent-label">Latest Complaint</span>
            <span class="res-recent-val" id="res-recent-complaint-val">Water pressure low</span>
          </div>
        </div>
        <span class="res-recent-badge badge-pending" id="res-recent-complaint-badge">In Progress</span>
      </div>

      <!-- 3. Latest Service Request -->
      <div class="res-recent-card" id="res-recent-service-card" onclick="GrihamResidentHomeUI.handleRequestService('SR-2026-0019')" role="button" tabindex="0" aria-label="Latest Service Request Status">
        <div class="res-recent-left">
          <div class="res-recent-icon" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <div class="res-recent-info">
            <span class="res-recent-label">Service Request</span>
            <span class="res-recent-val" id="res-recent-service-val">AC Coil Cleaning</span>
          </div>
        </div>
        <span class="res-recent-badge badge-pending" id="res-recent-service-badge">Scheduled</span>
      </div>

      <!-- 4. Upcoming Amenity Booking -->
      <div class="res-recent-card" id="res-recent-amenity-card" onclick="GrihamResidentHomeUI.handleAmenityBooking('BK-2026-0089')" role="button" tabindex="0" aria-label="Upcoming Amenity Booking">
        <div class="res-recent-left">
          <div class="res-recent-icon" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div class="res-recent-info">
            <span class="res-recent-label">Upcoming Amenity</span>
            <span class="res-recent-val" id="res-recent-amenity-val">Clubhouse Hall (22 Sep)</span>
          </div>
        </div>
        <span class="res-recent-badge badge-paid" id="res-recent-amenity-badge">Confirmed</span>
      </div>

      <!-- 5. Active Society Voting / Polls -->
      <div class="res-recent-card" id="res-recent-voting-card" onclick="GrihamRouter.navigate('/resident/voting')" role="button" tabindex="0" aria-label="Society Voting and Proposals">
        <div class="res-recent-left">
          <div class="res-recent-icon" aria-hidden="true" style="color:var(--resident-accent, #60a5fa);">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
          </div>
          <div class="res-recent-info">
            <span class="res-recent-label">Society Voting</span>
            <span class="res-recent-val" id="res-recent-voting-val">Weekend cleanup timing</span>
          </div>
        </div>
        <span class="res-recent-badge badge-pending" id="res-recent-voting-badge">Active</span>
      </div>

    </div>

    <!-- 7. SOCIETY STAFF DIRECTORY CARD -->
    <div class="res-staff-card" id="res-staff-card">
      <div class="res-staff-info">
        <h4 class="res-staff-title">Society Staff</h4>
        <span class="res-staff-sub">Security, plumbers, electricians & maintenance staff</span>
      </div>
      <button type="button" class="btn-view-staff" id="btn-view-staff" onclick="GrihamResidentHomeUI.openStaffDirectory()" aria-label="View Society Staff Directory">
        <span>View Staff</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>

  </div>

  <!-- 8. BOTTOM NAVIGATION BAR -->
  <nav class="res-bottom-nav" aria-label="Resident Navigation">
    <button type="button" class="res-nav-item active" onclick="GrihamRouter.navigate('/resident/home')" aria-label="Home" aria-current="page" id="res-nav-home">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span>Home</span>
    </button>
    <button type="button" class="res-nav-item" onclick="GrihamResidentHomeUI.handleRequestService()" aria-label="Services" id="res-nav-services">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      <span>Services</span>
    </button>
    <button type="button" class="res-nav-item" onclick="GrihamRouter.navigate('/resident/complaints')" aria-label="Complaints" id="res-nav-complaints">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      <span>Complaints</span>
    </button>
    <button type="button" class="res-nav-item" onclick="GrihamRouter.navigate('/resident/profile')" aria-label="Profile" id="res-nav-profile">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span>Profile</span>
    </button>
  </nav>

</section>
`;

/**
 * Controller Object for Resident Home
 */
window.GrihamResidentHomeUI = {
  state: {
    isLoading: false,
    profile: null,
    water: null,
    chairman: null,
    activity: null,
    notifications: [],
    unreadNotifCount: 0
  },

  /**
   * Initialize Resident Home
   */
  async init() {
    if (typeof GrihamAuth !== "undefined" && !GrihamAuth.hasRole("resident")) {
      return;
    }
    await this.loadData();
  },

  /**
   * Load all Resident Home data concurrently with graceful error handling
   */
  async loadData() {
    if (this.state.isLoading) return;
    this.state.isLoading = true;

    const loadingEl = document.getElementById("res-home-loading");
    const contentEl = document.getElementById("res-home-content");
    const errorEl = document.getElementById("res-home-error");

    if (loadingEl) loadingEl.style.display = "flex";
    if (contentEl) contentEl.style.display = "none";
    if (errorEl) errorEl.style.display = "none";

    try {
      const [profileRes, waterRes, chairmanRes, activityRes, notifRes] = await Promise.allSettled([
        typeof getResidentProfile === "function" ? getResidentProfile() : Promise.resolve({}),
        typeof getWaterStatus === "function" ? getWaterStatus() : Promise.resolve({}),
        typeof getChairmanContact === "function" ? getChairmanContact() : Promise.resolve({}),
        typeof getResidentRecentActivity === "function" ? getResidentRecentActivity() : Promise.resolve({}),
        typeof getResidentNotifications === "function" ? getResidentNotifications() : Promise.resolve({})
      ]);

      // 1. Profile Data
      if (profileRes.status === "fulfilled" && profileRes.value) {
        this.state.profile = profileRes.value.profile || profileRes.value.data || profileRes.value;
      } else {
        const sessionUser = typeof GrihamAuth !== "undefined" ? GrihamAuth.getUser() : {};
        this.state.profile = sessionUser || {};
      }

      // 2. Water Status
      if (waterRes.status === "fulfilled" && waterRes.value) {
        this.state.water = waterRes.value.data || waterRes.value;
      }

      // 3. Chairman Contact
      if (chairmanRes.status === "fulfilled" && chairmanRes.value) {
        this.state.chairman = chairmanRes.value.data || chairmanRes.value;
      }

      // 4. Recent Activity
      if (activityRes.status === "fulfilled" && activityRes.value) {
        this.state.activity = activityRes.value.data || activityRes.value;
      }

      // 5. Notifications
      if (notifRes.status === "fulfilled" && notifRes.value) {
        this.state.notifications = notifRes.value.notifications || [];
        this.state.unreadNotifCount = notifRes.value.unreadCount ?? this.state.notifications.filter(n => n.unread).length;
      }

      this.render();

      if (loadingEl) loadingEl.style.display = "none";
      if (contentEl) contentEl.style.display = "flex";
    } catch (err) {
      console.error("[Resident Home] Failed to load resident data:", err);
      if (loadingEl) loadingEl.style.display = "none";
      if (errorEl) errorEl.style.display = "flex";
    } finally {
      this.state.isLoading = false;
    }
  },

  /**
   * Render all Resident Home sections
   */
  render() {
    this.renderHeader();
    this.renderProfileCard();
    this.renderApprovalStatus();
    this.renderWaterStatus();
    this.renderChairmanDetails();
    this.renderQuickActions();
    this.renderRecentActivity();
    this.renderNotificationsBadge();
  },

  /**
   * Time-based greeting helper
   */
  getTimeGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning,";
    if (hour < 17) return "Good Afternoon,";
    return "Good Evening,";
  },

  /**
   * 1. Render Header Greeting & Name
   */
  renderHeader() {
    const greetingTimeEl = document.getElementById("res-greeting-time");
    const greetingNameEl = document.getElementById("res-greeting-name");

    if (greetingTimeEl) greetingTimeEl.textContent = this.getTimeGreeting();

    const fullName = (this.state.profile && this.state.profile.name) || "Resident";
    const firstName = fullName.split(" ")[0] || "Resident";
    if (greetingNameEl) greetingNameEl.textContent = firstName;
  },

  /**
   * 2. Render Resident Profile Summary Card
   */
  renderProfileCard() {
    const p = this.state.profile || {};

    const nameEl = document.getElementById("res-profile-name");
    const unitEl = document.getElementById("res-profile-unit");
    const occEl = document.getElementById("res-profile-occupancy");
    const socEl = document.getElementById("res-profile-society");
    const avatarEl = document.getElementById("res-avatar-initials");

    const fullName = p.name || "Rajesh Kumar";
    if (nameEl) nameEl.textContent = fullName;

    const wing = p.wing || "A";
    const flat = p.flatNumber || p.flat || "204";
    if (unitEl) unitEl.textContent = `Wing ${wing} • Flat ${flat}`;

    const occupancy = p.occupancyType || p.resident_type || "Owner";
    if (occEl) occEl.textContent = occupancy;

    const societyName = p.societyName || "Griham Residency";
    if (socEl) socEl.textContent = societyName;

    // Avatar initials
    if (avatarEl) {
      avatarEl.textContent = GrihamFormat.initials(fullName, "RK");
    }
  },

  /**
   * 3. Render Approval Status & Disable Restricted Features
   */
  renderApprovalStatus() {
    const p = this.state.profile || {};
    const status = (p.approvalStatus || "Approved").toLowerCase();

    const bannerEl = document.getElementById("res-approval-banner");
    const titleEl = document.getElementById("res-approval-title");
    const descEl = document.getElementById("res-approval-desc");

    const qaServiceBtn = document.getElementById("btn-qa-service");
    const qaServiceSub = document.getElementById("res-qa-service-sub");
    const navServicesBtn = document.getElementById("res-nav-services");

    if (status === "pending") {
      if (bannerEl) bannerEl.style.display = "flex";
      if (titleEl) titleEl.textContent = "Account Pending Approval";
      if (descEl) descEl.textContent = "Some resident features will become available after your registration is approved.";

      // Disable restricted actions
      if (qaServiceBtn) {
        qaServiceBtn.classList.add("disabled");
        qaServiceBtn.setAttribute("aria-disabled", "true");
      }
      if (qaServiceSub) qaServiceSub.textContent = "Pending Approval";
      if (navServicesBtn) navServicesBtn.style.opacity = "0.5";
    } else if (status === "rejected") {
      if (bannerEl) {
        bannerEl.style.display = "flex";
        bannerEl.style.borderColor = "#ef4444";
        bannerEl.style.background = "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(30, 41, 59, 0.85) 100%)";
      }
      if (titleEl) {
        titleEl.textContent = "Registration Rejected";
        titleEl.style.color = "#ef4444";
      }
      if (descEl) descEl.textContent = "Your registration was not approved. Please contact society administration.";

      // Disable restricted actions
      if (qaServiceBtn) {
        qaServiceBtn.classList.add("disabled");
        qaServiceBtn.setAttribute("aria-disabled", "true");
      }
      if (qaServiceSub) qaServiceSub.textContent = "Disabled";
      if (navServicesBtn) navServicesBtn.style.opacity = "0.5";
    } else {
      // Approved
      if (bannerEl) bannerEl.style.display = "none";
      if (qaServiceBtn) {
        qaServiceBtn.classList.remove("disabled");
        qaServiceBtn.removeAttribute("aria-disabled");
      }
      if (qaServiceSub) qaServiceSub.textContent = "Repairs";
      if (navServicesBtn) navServicesBtn.style.opacity = "1";
    }
  },

  /**
   * 4. Render Water Status Card
   */
  renderWaterStatus() {
    const w = this.state.water || {
      status: "Normal Supply",
      indicator: "normal",
      schedule: "Supply Active",
      nextUpdate: "Today, 6:00 PM",
      note: "Normal municipal water supply active."
    };

    const badgeEl = document.getElementById("res-water-status-badge");
    const schedEl = document.getElementById("res-water-schedule");
    const nextEl = document.getElementById("res-water-next-update");
    const noteEl = document.getElementById("res-water-note");

    if (badgeEl) {
      badgeEl.textContent = w.status || "Normal Supply";
      badgeEl.className = "res-water-status-pill";
      if ((w.indicator || "").toLowerCase() === "interrupted" || (w.status || "").toLowerCase().includes("interrupted")) {
        badgeEl.classList.add("status-interrupted");
      } else {
        badgeEl.classList.add("status-normal");
      }
    }

    if (schedEl) schedEl.textContent = w.schedule || "Supply Active";
    if (nextEl) nextEl.textContent = `Next update: ${w.nextUpdate || "6:00 PM"}`;
    if (noteEl) noteEl.textContent = w.note || "Municipal water supply normal. Overhead tanks are adequate.";
  },

  /**
   * 5. Populate Chairman Contact Info
   */
  renderChairmanDetails() {
    const c = this.state.chairman || {
      name: "Rajesh Verma",
      role: "Society Chairman",
      phone: "+919876543210",
      officeHours: "6:00 PM – 8:00 PM (Mon – Sat)",
      officeLocation: "Tower A, Ground Floor Society Office"
    };

    const nameEl = document.getElementById("res-chairman-name");
    const roleEl = document.getElementById("res-chairman-role");
    const phoneEl = document.getElementById("res-chairman-phone-display");
    const hoursEl = document.getElementById("res-chairman-hours");
    const officeEl = document.getElementById("res-chairman-office");
    const callBtn = document.getElementById("btn-call-chairman");
    const msgBtn = document.getElementById("btn-msg-chairman");
    const initialsEl = document.getElementById("res-chairman-initials");

    if (nameEl) nameEl.textContent = c.name || "Rajesh Verma";
    if (roleEl) roleEl.textContent = c.role || "Society Chairman";

    const phone = c.phone || "+919876543210";
    if (phoneEl) phoneEl.textContent = phone;
    if (hoursEl) hoursEl.textContent = c.officeHours || "6:00 PM – 8:00 PM";
    if (officeEl) officeEl.textContent = c.officeLocation || "Society Office";

    if (callBtn) callBtn.href = `tel:${phone}`;
    if (msgBtn) msgBtn.href = `sms:${phone}`;

    if (initialsEl && c.name) {
      initialsEl.textContent = GrihamFormat.initials(c.name, "RV");
    }
  },

  /**
   * 6. Render Quick Actions Subtext
   */
  renderQuickActions() {
    const act = this.state.activity || {};
    const maint = act.maintenance || {};

    const maintSub = document.getElementById("res-qa-maint-sub");
    if (maintSub) {
      if (maint.status === "Pending Verification" || maint.status === "pending_verification") {
        maintSub.textContent = "Pending Verification";
      } else if (maint.status === "Rejected" || maint.status === "rejected") {
        maintSub.textContent = "Rejected (Due)";
      } else if (maint.status === "Paid" || maint.status === "paid_ontime" || maint.status === "paid_early") {
        maintSub.textContent = "Paid";
      } else if (maint.amount) {
        maintSub.textContent = `${GrihamFormat.currency(maint.amount)} Due`;
      } else {
        maintSub.textContent = "No Outstanding Amount";
      }
    }
  },

  /**
   * 7. Render Recent Information Cards
   */
  renderRecentActivity() {
    const act = this.state.activity || {};

    // Maintenance
    const maint = act.maintenance || {};
    const isVerification = (maint.status === "Pending Verification" || maint.status === "pending_verification");
    const isRejected = (maint.status === "Rejected" || maint.status === "rejected");
    const isPaid = (maint.status === "Paid" || maint.status === "paid_ontime" || maint.status === "paid_early");

    const maintValEl = document.getElementById("res-recent-maint-val");
    const maintBadgeEl = document.getElementById("res-recent-maint-badge");
    if (maintValEl) {
      if (isVerification) {
        maintValEl.textContent = `${GrihamFormat.currency(maint.amount || 3500)} (Cash Pending Review)`;
      } else if (isRejected) {
        maintValEl.textContent = `${GrihamFormat.currency(maint.amount || 3500)} Due (Receipt Rejected)`;
      } else if (isPaid) {
        maintValEl.textContent = `Paid (${maint.month || "Current"})`;
      } else {
        maintValEl.textContent = `${GrihamFormat.currency(maint.amount || 3500)} Due (${maint.month || "Current"})`;
      }
    }
    if (maintBadgeEl) {
      if (isVerification) {
        maintBadgeEl.textContent = "Pending Verification";
        maintBadgeEl.className = "res-recent-badge badge-verification";
      } else if (isRejected) {
        maintBadgeEl.textContent = "Rejected";
        maintBadgeEl.className = "res-recent-badge badge-rejected";
      } else if (isPaid) {
        maintBadgeEl.textContent = "Paid";
        maintBadgeEl.className = "res-recent-badge badge-paid";
      } else {
        maintBadgeEl.textContent = maint.status || "Due";
        maintBadgeEl.className = "res-recent-badge badge-due";
      }
    }

    // Sheet values
    const maintSheetMonth = document.getElementById("res-maint-sheet-month");
    const maintSheetAmt = document.getElementById("res-maint-sheet-amount");
    const maintSheetBadge = document.getElementById("res-maint-sheet-badge");
    const maintSheetDue = document.getElementById("res-maint-sheet-duedate");
    const totalPayableEl = document.getElementById("res-maint-total-payable");
    const verificationBanner = document.getElementById("res-maint-verification-banner");
    const verificationDesc = document.getElementById("res-maint-verification-desc");
    const rejectionBanner = document.getElementById("res-maint-rejection-banner");
    const rejectionDesc = document.getElementById("res-maint-rejection-desc");
    const btnPayNow = document.getElementById("btn-res-pay-now");
    const btnPaidCash = document.getElementById("btn-res-paid-cash");
    const btnViewReceiptPaid = document.getElementById("btn-res-view-receipt-paid");

    if (maintSheetMonth) maintSheetMonth.textContent = maint.month || "September 2026";
    if (maintSheetAmt) maintSheetAmt.textContent = GrihamFormat.currency(maint.amount || 3500);
    if (totalPayableEl) totalPayableEl.textContent = GrihamFormat.currency(maint.amount || 3500);
    if (maintSheetDue) maintSheetDue.textContent = `Due date: ${maint.dueDate || "25 Sep 2026"}`;

    if (isVerification) {
      if (maintSheetBadge) {
        maintSheetBadge.textContent = "Pending Verification";
        maintSheetBadge.className = "res-recent-badge badge-verification";
      }
      if (verificationBanner) verificationBanner.style.display = "flex";
      if (verificationDesc) {
        const subDate = maint.submittedAt ? GrihamDateTime.formatDate(maint.submittedAt, 'short') : "Recently";
        verificationDesc.textContent = `Cash receipt submitted on ${subDate}. Awaiting society administrator review.`;
      }
      if (rejectionBanner) rejectionBanner.style.display = "none";
      if (btnPayNow) btnPayNow.style.display = "none";
      if (btnPaidCash) btnPaidCash.style.display = "none";
      if (btnViewReceiptPaid) btnViewReceiptPaid.style.display = "none";
    } else if (isRejected) {
      if (maintSheetBadge) {
        maintSheetBadge.textContent = "Receipt Rejected";
        maintSheetBadge.className = "res-recent-badge badge-rejected";
      }
      if (verificationBanner) verificationBanner.style.display = "none";
      if (rejectionBanner) rejectionBanner.style.display = "flex";
      if (rejectionDesc) {
        rejectionDesc.textContent = `Admin Remark: "${maint.rejectionReason || 'Receipt was unclear / invalid photo'}". Please submit a corrected receipt.`;
      }
      if (btnPayNow) btnPayNow.style.display = "block";
      if (btnPaidCash) btnPaidCash.style.display = "inline-flex";
      if (btnViewReceiptPaid) btnViewReceiptPaid.style.display = "none";
    } else if (isPaid) {
      if (maintSheetBadge) {
        maintSheetBadge.textContent = "Paid";
        maintSheetBadge.className = "res-recent-badge badge-paid";
      }
      if (verificationBanner) verificationBanner.style.display = "none";
      if (rejectionBanner) rejectionBanner.style.display = "none";
      if (btnPayNow) btnPayNow.style.display = "none";
      if (btnPaidCash) btnPaidCash.style.display = "none";
      if (btnViewReceiptPaid) btnViewReceiptPaid.style.display = "block";
    } else {
      if (maintSheetBadge) {
        maintSheetBadge.textContent = "Payment Due";
        maintSheetBadge.className = "res-recent-badge badge-due";
      }
      if (verificationBanner) verificationBanner.style.display = "none";
      if (rejectionBanner) rejectionBanner.style.display = "none";
      if (btnPayNow) btnPayNow.style.display = "block";
      if (btnPaidCash) btnPaidCash.style.display = "inline-flex";
      if (btnViewReceiptPaid) btnViewReceiptPaid.style.display = "none";
    }

    // Complaint
    const comp = act.complaint || {};
    const compValEl = document.getElementById("res-recent-complaint-val");
    const compBadgeEl = document.getElementById("res-recent-complaint-badge");
    if (compValEl) compValEl.textContent = comp.title || "No recent complaints";
    if (compBadgeEl) {
      compBadgeEl.textContent = comp.status || "None";
      compBadgeEl.className = `res-recent-badge ${comp.status === "Resolved" ? "badge-paid" : "badge-pending"}`;
    }

    // Service Request
    const srv = act.serviceRequest || {};
    const srvValEl = document.getElementById("res-recent-service-val");
    const srvBadgeEl = document.getElementById("res-recent-service-badge");
    if (srvValEl) srvValEl.textContent = srv.serviceName || "No active service requests";
    if (srvBadgeEl) {
      srvBadgeEl.textContent = srv.status || "None";
      srvBadgeEl.className = `res-recent-badge ${srv.status === "Completed" ? "badge-paid" : "badge-pending"}`;
    }

    // Amenity Booking
    const amen = act.amenityBooking || {};
    const amenValEl = document.getElementById("res-recent-amenity-val");
    const amenBadgeEl = document.getElementById("res-recent-amenity-badge");
    if (amenValEl) {
      amenValEl.textContent = amen.amenityName ? `${amen.amenityName} (${amen.date || "Upcoming"})` : "No upcoming bookings";
    }
    if (amenBadgeEl) {
      amenBadgeEl.textContent = amen.status || "None";
      amenBadgeEl.className = `res-recent-badge ${amen.status === "Confirmed" ? "badge-paid" : "badge-pending"}`;
    }

    // Society Voting / Polls
    const votingValEl = document.getElementById("res-recent-voting-val");
    const votingBadgeEl = document.getElementById("res-recent-voting-badge");
    const notifs = (typeof MOCK_NOTIFICATIONS_DB !== "undefined" && Array.isArray(MOCK_NOTIFICATIONS_DB.notifications))
      ? MOCK_NOTIFICATIONS_DB.notifications.filter(n => n.type === "poll" || n.type === "proposal")
      : [];
    const sessionUser = typeof GrihamAuth !== "undefined" ? GrihamAuth.getUser() : null;
    const residentId = sessionUser?.id || "USR-001";
    const activeVoting = notifs.find(n => n.status === "Active" || !n.status);

    if (votingValEl) {
      votingValEl.textContent = activeVoting ? (activeVoting.title || activeVoting.question) : "View Society Polls & Decisions";
    }
    if (votingBadgeEl) {
      const hasVoted = activeVoting && Array.isArray(activeVoting.voters) && activeVoting.voters.some(v => v.resident_id === residentId);
      votingBadgeEl.textContent = hasVoted ? "Voted" : (activeVoting ? "Active" : "Open");
      votingBadgeEl.className = `res-recent-badge ${hasVoted ? "badge-paid" : "badge-pending"}`;
    }
  },

  /**
   * 8. Notification Badge
   */
  renderNotificationsBadge() {
    const badgeEl = document.getElementById("res-notif-badge");
    if (!badgeEl) return;

    if (this.state.unreadNotifCount > 0) {
      badgeEl.style.display = "block";
    } else {
      badgeEl.style.display = "none";
    }
  },

  /* ================================================================= */
  /* SOS ACTIONS & FLOW                                                */
  /* ================================================================= */

  openSOSConfirm() {
    const modal = document.getElementById("modal-res-sos-backdrop");
    const confirmView = document.getElementById("res-sos-view-confirm");
    const successView = document.getElementById("res-sos-view-success");

    if (confirmView) confirmView.style.display = "block";
    if (successView) successView.style.display = "none";

    if (modal) {
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    }
  },

  closeSOS() {
    const modal = document.getElementById("modal-res-sos-backdrop");
    if (modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  },

  async confirmSOS() {
    const confirmBtn = document.getElementById("btn-confirm-res-sos");
    if (confirmBtn) {
      confirmBtn.textContent = "Sending...";
      confirmBtn.disabled = true;
    }

    const p = this.state.profile || {};
    const payload = {
      residentId: p.id || "USR-001",
      residentName: p.name || "Rajesh Kumar",
      phone: p.phone || "+919876543210",
      wing: p.wing || "A",
      flatNumber: p.flatNumber || "204",
      societyId: p.societyId || "GRIHAM-PUNE-001",
      emergencyType: "Medical / Security Emergency",
      message: "Emergency assistance requested from Resident Home."
    };

    try {
      let res;
      if (typeof window.sendResidentSOS === "function") {
        res = await window.sendResidentSOS(payload);
      } else if (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.sendResidentSOS === "function") {
        res = await GrihamAPI.sendResidentSOS(payload);
      } else {
        // Safe fallback mock SOS
        res = { status: "success", alert: { id: `SOS-${Date.now()}` } };
      }

      const confirmView = document.getElementById("res-sos-view-confirm");
      const successView = document.getElementById("res-sos-view-success");
      const timeEl = document.getElementById("res-sos-success-timestamp");
      const idEl = document.getElementById("res-sos-alert-id");

      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (timeEl) timeEl.textContent = `Your emergency alert was sent at ${formattedTime}.`;
      if (idEl && res && res.alert) idEl.textContent = res.alert.id || "SOS-2026-LIVE";

      if (confirmView) confirmView.style.display = "none";
      if (successView) successView.style.display = "block";

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Emergency SOS alert broadcasted to Security & Admin", "success");
      }
    } catch (err) {
      console.error("[Resident Home] Failed to send SOS:", err);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Failed to send SOS alert. Please call security directly.", "error");
      }
    } finally {
      if (confirmBtn) {
        confirmBtn.textContent = "Send SOS";
        confirmBtn.disabled = false;
      }
    }
  },

  /* ================================================================= */
  /* CHAIRMAN CONTACT SHEET                                            */
  /* ================================================================= */

  openContactChairman() {
    GrihamBottomSheet.open("sheet-res-chairman", "sheet-res-chairman-backdrop");
  },

  closeContactChairman() {
    GrihamBottomSheet.close("sheet-res-chairman", "sheet-res-chairman-backdrop");
  },

  /* ================================================================= */
  /* NOTIFICATIONS SHEET                                               */
  /* ================================================================= */

  openNotifications() {
    this.closeAllSheets();
    const sheet = document.getElementById("sheet-res-notif");
    const backdrop = document.getElementById("sheet-res-notif-backdrop");
    const listEl = document.getElementById("res-notif-list");

    if (listEl) {
      // Combine resident notifications with society polls & proposals
      const societyNotifs = (typeof MOCK_NOTIFICATIONS_DB !== "undefined" && Array.isArray(MOCK_NOTIFICATIONS_DB.notifications))
        ? MOCK_NOTIFICATIONS_DB.notifications.filter(n => n.type === "poll" || n.type === "proposal")
        : [];
      
      const sessionUser = typeof GrihamAuth !== "undefined" ? GrihamAuth.getUser() : null;
      const residentId = sessionUser?.id || "USR-001";

      const combined = [
        ...societyNotifs.map(sn => ({
          id: sn.id,
          title: sn.title || sn.question,
          message: sn.type === "poll" ? (sn.question || sn.title) : (sn.description || sn.reason || "Community proposal for society approval."),
          time: sn.created_at || "Recent",
          type: sn.type,
          isPollOrProp: true,
          hasVoted: Array.isArray(sn.voters) && sn.voters.some(v => v.resident_id === residentId)
        })),
        ...(this.state.notifications || [])
      ];

      if (combined.length === 0) {
        listEl.innerHTML = `
          <div style="text-align:center; padding:2rem 1rem; color:var(--text-muted); font-size:0.85rem;">
            No new notifications.
          </div>
        `;
      } else {
        listEl.innerHTML = combined.map(n => `
          <div style="background:${n.unread ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.04)'}; border:1px solid ${n.unread ? 'rgba(59, 130, 246, 0.3)' : 'var(--glass-border)'}; border-radius:10px; padding:0.75rem; display:flex; flex-direction:column; gap:0.35rem; ${n.isPollOrProp ? 'cursor:pointer;' : ''}" ${n.isPollOrProp ? `onclick="GrihamResidentHomeUI.closeNotifications(); GrihamRouter.navigate('/resident/voting?id=${n.id}');"` : ''}>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:0.35rem;">
                ${n.isPollOrProp ? `<span class="voting-type-tag ${n.type}" style="font-size:0.62rem; padding:0.1rem 0.4rem;">${n.type.toUpperCase()}</span>` : ''}
                <strong style="font-size:0.84rem; color:var(--text-primary);">${escapeHtml(n.title || 'Notification')}</strong>
              </div>
              <span style="font-size:0.68rem; color:var(--text-muted);">${escapeHtml(n.time || '')}</span>
            </div>
            <p style="font-size:0.76rem; color:var(--text-secondary); margin:0; line-height:1.35;">${escapeHtml(n.message || '')}</p>
            ${n.isPollOrProp ? `
              <div style="display:flex; justify-content:flex-end; margin-top:0.2rem;">
                <span style="font-size:0.72rem; color:var(--resident-accent); font-weight:700; display:inline-flex; align-items:center; gap:0.2rem;">
                  ${n.hasVoted ? 'View Results' : 'Vote Now'} &rarr;
                </span>
              </div>
            ` : ''}
          </div>
        `).join("");
      }
    }

    GrihamBottomSheet.open("sheet-res-notif", "sheet-res-notif-backdrop");
  },

  closeNotifications() {
    GrihamBottomSheet.close("sheet-res-notif", "sheet-res-notif-backdrop");
  },

  markAllNotificationsRead() {
    this.state.notifications.forEach(n => { n.unread = false; });
    this.state.unreadNotifCount = 0;
    this.renderNotificationsBadge();
    this.openNotifications();
    if (typeof GrihamToast !== "undefined") {
      GrihamToast.show("All notifications marked as read", "success");
    }
  },

  /* ================================================================= */
  /* MAINTENANCE FLOW                                                  */
  /* ================================================================= */

  openMaintenance() {
    this.closeAllSheets();
    GrihamBottomSheet.open("sheet-res-maint", "sheet-res-maint-backdrop");
  },

  closeMaintenance() {
    GrihamBottomSheet.close("sheet-res-maint", "sheet-res-maint-backdrop");
  },

  simulatePayMaintenance() {
    const btn = document.getElementById("btn-res-pay-now");
    if (btn) {
      btn.textContent = "Processing Payment...";
      btn.disabled = true;
    }

    setTimeout(() => {
      // Update canonical MOCK_MAINTENANCE_DB
      if (typeof MOCK_MAINTENANCE_DB !== "undefined" && MOCK_MAINTENANCE_DB.months && MOCK_MAINTENANCE_DB.months["2026-09"]) {
        const m = MOCK_MAINTENANCE_DB.months["2026-09"];
        const sessionUser = typeof GrihamAuth !== "undefined" ? GrihamAuth.getUser() : {};
        const p = m.payments.find(item => 
          (item.resident_id && item.resident_id === (sessionUser.id || "USR-001")) ||
          (item.wing === (sessionUser.wing || "A") && String(item.flat) === String(sessionUser.flatNumber || sessionUser.flat || "204"))
        );
        if (p) {
          const wasPending = p.status === "pending" || p.status === "pending_verification";
          p.status = "paid_ontime";
          p.status_label = "Paid";
          p.payment_method = "Online";
          p.payment_date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
          p.ref_no = p.ref_no || `UPI-ONL-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
          p.timing_info = `Paid Online`;
          p.notes = "Online maintenance payment";
          if (wasPending) {
            m.collected += p.amount;
            m.pending = Math.max(0, m.pending - p.amount);
            m.percentage = Number(((m.collected / m.expected) * 100).toFixed(1));
            m.status_counts.pending = Math.max(0, m.status_counts.pending - 1);
            m.status_counts.paid_ontime = (m.status_counts.paid_ontime || 0) + 1;
          }
        }
      }

      if (this.state.activity && this.state.activity.maintenance) {
        this.state.activity.maintenance.status = "Paid";
        this.state.activity.maintenance.paymentMethod = "Online";
      }
      this.renderQuickActions();
      this.renderRecentActivity();
      this.closeMaintenance();

      if (btn) {
        btn.textContent = "Pay ₹3,500 Online";
        btn.disabled = false;
      }

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Payment successful! Receipt generated.", "success");
      }
    }, 1000);
  },

  /* ================================================================= */
  /* ACTION GUARDS & HANDLERS                                          */
  /* ================================================================= */

  handleRequestService(targetRequestId = null) {
    const p = this.state.profile || {};
    const status = (p.approvalStatus || "Approved").toLowerCase();

    if (status === "pending") {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Service requests are disabled while your registration is pending approval.", "warning");
      } else {
        alert("Service requests are disabled while your registration is pending approval.");
      }
      return;
    }

    if (status === "rejected") {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Registration not approved. Please contact society administration.", "error");
      } else {
        alert("Registration not approved.");
      }
      return;
    }

    if (targetRequestId) {
      try {
        sessionStorage.setItem("griham_target_service_id", targetRequestId);
      } catch (_) {}
    }

    GrihamRouter.navigate("/resident/services");
  },

  handleAmenityBooking(targetBookingId = null) {
    const p = this.state.profile || {};
    const status = (p.approvalStatus || "Approved").toLowerCase();

    if (status === "pending") {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Amenity booking is disabled while your registration is pending approval.", "warning");
      } else {
        alert("Amenity booking is disabled while your registration is pending approval.");
      }
      return;
    }

    if (status === "rejected") {
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Registration not approved. Please contact society administration.", "error");
      } else {
        alert("Registration not approved.");
      }
      return;
    }

    if (targetBookingId) {
      try {
        sessionStorage.setItem("griham_target_amenity_booking_id", targetBookingId);
      } catch (_) {}
    }

    GrihamRouter.navigate("/resident/amenities");
  },

  /* ================================================================= */
  /* STAFF DIRECTORY SELECTOR INTEGRATION                              */
  /* ================================================================= */

  openStaffDirectory() {
    if (typeof GrihamCallSelectorUI !== "undefined") {
      GrihamCallSelectorUI.open({
        title: "Society Staff & Services",
        contactType: "all",
        category: "all"
      });
    } else {
      console.warn("[Resident Home] GrihamCallSelectorUI is not loaded.");
    }
  },

  /* ================================================================= */
  /* THREE-DOT MENU & LOGOUT                                           */
  /* ================================================================= */

  toggleMenu(open) {
    const menu = document.getElementById("res-menu-dropdown");
    const backdrop = document.getElementById("res-menu-backdrop");
    const isOpen = open !== undefined ? open : (menu && !menu.classList.contains("open"));

    if (menu && backdrop) {
      menu.classList.toggle("open", isOpen);
      backdrop.classList.toggle("open", isOpen);
    }
  },

  handleMenuNav(route) {
    this.toggleMenu(false);
    GrihamRouter.navigate(route);
  },

  openLogoutConfirm() {
    this.toggleMenu(false);
    this.closeAllSheets();
    if (typeof GrihamConfirmation !== "undefined") {
      GrihamConfirmation.open({
        title: "Logout?",
        message: "Are you sure you want to log out of your resident account?",
        confirmText: "Logout",
        cancelText: "Cancel",
        isDanger: true,
        onConfirm: () => this.confirmLogout()
      });
      return;
    }
    const sheet = document.getElementById("sheet-res-logout");
    const backdrop = document.getElementById("sheet-res-logout-backdrop");
    if (sheet && backdrop) {
      sheet.classList.add("open");
      backdrop.classList.add("open");
      sheet.setAttribute("aria-hidden", "false");
    }
  },

  closeLogoutConfirm() {
    if (typeof GrihamConfirmation !== "undefined") {
      GrihamConfirmation.close(false);
    }
    const sheet = document.getElementById("sheet-res-logout");
    const backdrop = document.getElementById("sheet-res-logout-backdrop");
    if (sheet && backdrop) {
      sheet.classList.remove("open");
      backdrop.classList.remove("open");
      sheet.setAttribute("aria-hidden", "true");
    }
  },

  confirmLogout() {
    this.closeLogoutConfirm();
    if (typeof GrihamAuth !== "undefined") {
      GrihamAuth.logout("/entry");
    } else {
      GrihamRouter.navigate("/entry");
    }
  },

  closeAllSheets() {
    if (typeof GrihamBottomSheet !== "undefined") {
      GrihamBottomSheet.closeAll();
    }
    this.closeCashConfirm();
    this.closeReceiptViewer();
    this.closeSOS();
    this.toggleMenu(false);
    this.closeLogoutConfirm();
  },

  /* ================================================================= */
  /* CASH PAYMENT SUBMISSION FLOW                                      */
  /* ================================================================= */

  selectedReceiptFile: null,
  receiptPreviewUrl: null,
  pendingSubmissionData: null,

  openCashPaymentForm() {
    this.closeAllSheets();
    const sheet = document.getElementById("sheet-res-cash-payment");
    const backdrop = document.getElementById("sheet-res-cash-payment-backdrop");
    
    // Check duplicate pending verification
    const currentMaint = (this.state.activity && this.state.activity.maintenance) || {};
    const isAlreadyPending = (currentMaint.status === "Pending Verification" || currentMaint.status === "pending_verification");
    const dupAlert = document.getElementById("res-cash-duplicate-err");

    if (dupAlert) {
      if (isAlreadyPending) {
        dupAlert.textContent = "A cash payment for this month is currently pending verification. You cannot submit multiple payments until Admin reviews the active submission.";
        dupAlert.style.display = "block";
      } else {
        dupAlert.textContent = "";
        dupAlert.style.display = "none";
      }
    }

    // Reset fields
    const monthSelect = document.getElementById("res-cash-month");
    const amountInput = document.getElementById("res-cash-amount");
    const dateInput = document.getElementById("res-cash-date");
    const notesInput = document.getElementById("res-cash-notes");

    if (monthSelect) monthSelect.value = "2026-09";
    if (amountInput) amountInput.value = currentMaint.amount || 3500;
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.value = today;
    }
    if (notesInput) notesInput.value = "";

    this.clearCashFormErrors();
    this.removeReceiptFile();

    GrihamBottomSheet.open("sheet-res-cash-payment", "sheet-res-cash-payment-backdrop");
  },

  closeCashPaymentForm() {
    GrihamBottomSheet.close("sheet-res-cash-payment", "sheet-res-cash-payment-backdrop");
  },

  onCashMonthChanged(val) {
    // Keep aligned
  },

  triggerReceiptFileSelect() {
    const input = document.getElementById("input-cash-receipt-file");
    if (input) input.click();
  },

  onReceiptFileChanged(input) {
    if (input.files && input.files[0]) {
      this.handleReceiptFile(input.files[0]);
    }
  },

  handleReceiptFile(file) {
    const errEl = document.getElementById("err-cash-receipt");
    const check = GrihamValidation.validateFile(file, {
      maxSizeBytes: 5 * 1024 * 1024,
      allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    });

    if (!check.valid) {
      if (errEl) {
        errEl.textContent = check.error;
        errEl.style.display = "block";
      }
      return;
    }

    if (errEl) errEl.style.display = "none";

    this.selectedReceiptFile = file;
    if (this.receiptPreviewUrl && this.receiptPreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(this.receiptPreviewUrl);
    }
    this.receiptPreviewUrl = URL.createObjectURL(file);

    const dropzone = document.getElementById("res-receipt-dropzone");
    const previewWrap = document.getElementById("res-receipt-preview-wrap");
    const previewImg = document.getElementById("img-receipt-preview");
    const filenameEl = document.getElementById("txt-receipt-filename");

    if (dropzone) dropzone.style.display = "none";
    if (previewWrap) previewWrap.style.display = "flex";
    if (previewImg) previewImg.src = this.receiptPreviewUrl;
    if (filenameEl) {
      filenameEl.textContent = `${file.name} (${GrihamValidation.formatFileSize(file.size)})`;
    }
  },

  removeReceiptFile() {
    this.selectedReceiptFile = null;
    if (this.receiptPreviewUrl && this.receiptPreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(this.receiptPreviewUrl);
    }
    this.receiptPreviewUrl = null;

    const fileInput = document.getElementById("input-cash-receipt-file");
    if (fileInput) fileInput.value = "";

    const dropzone = document.getElementById("res-receipt-dropzone");
    const previewWrap = document.getElementById("res-receipt-preview-wrap");
    const previewImg = document.getElementById("img-receipt-preview");

    if (dropzone) dropzone.style.display = "flex";
    if (previewWrap) previewWrap.style.display = "none";
    if (previewImg) previewImg.src = "";
  },

  clearCashFormErrors() {
    ["err-cash-amount", "err-cash-date", "err-cash-receipt", "res-cash-duplicate-err"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
  },

  handleCashFormSubmit(e) {
    e.preventDefault();
    this.clearCashFormErrors();

    const month = document.getElementById("res-cash-month")?.value || "2026-09";
    const amountVal = document.getElementById("res-cash-amount")?.value;
    const dateVal = document.getElementById("res-cash-date")?.value;
    const notesVal = document.getElementById("res-cash-notes")?.value || "";

    let hasErr = false;

    const amount = Number(amountVal);
    if (!amountVal || isNaN(amount) || amount <= 0) {
      const err = document.getElementById("err-cash-amount");
      if (err) err.style.display = "block";
      hasErr = true;
    }

    if (!dateVal) {
      const err = document.getElementById("err-cash-date");
      if (err) {
        err.textContent = "Please select the date payment was made.";
        err.style.display = "block";
      }
      hasErr = true;
    } else {
      const chosenDate = new Date(dateVal);
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);
      if (chosenDate > endOfToday) {
        const err = document.getElementById("err-cash-date");
        if (err) {
          err.textContent = "Payment date cannot be in the future.";
          err.style.display = "block";
        }
        hasErr = true;
      }
    }

    if (!this.receiptPreviewUrl) {
      const err = document.getElementById("err-cash-receipt");
      if (err) {
        err.textContent = "Please upload a receipt or payment acknowledgment photo.";
        err.style.display = "block";
      }
      hasErr = true;
    }

    // Duplicate check
    const currentMaint = (this.state.activity && this.state.activity.maintenance) || {};
    if (currentMaint.status === "Pending Verification" || currentMaint.status === "pending_verification") {
      const dupAlert = document.getElementById("res-cash-duplicate-err");
      if (dupAlert) {
        dupAlert.textContent = "A cash payment submission is already pending verification. Duplicate submissions are prevented.";
        dupAlert.style.display = "block";
      }
      hasErr = true;
    }

    if (hasErr) return;

    this.pendingSubmissionData = {
      month,
      amount,
      payment_date: dateVal,
      notes: notesVal,
      receipt_url: this.receiptPreviewUrl
    };

    this.openCashConfirm();
  },

  openCashConfirm() {
    if (!this.pendingSubmissionData) return;

    const monthEl = document.getElementById("confirm-cash-month");
    const amountEl = document.getElementById("confirm-cash-amount");
    const dateEl = document.getElementById("confirm-cash-date");
    const thumbEl = document.getElementById("confirm-cash-thumb");

    const monthNames = {
      "2026-09": "September 2026",
      "2026-08": "August 2026",
      "2026-07": "July 2026",
      "2026-10": "October 2026"
    };

    if (monthEl) monthEl.textContent = monthNames[this.pendingSubmissionData.month] || this.pendingSubmissionData.month;
    if (amountEl) amountEl.textContent = GrihamFormat.currency(this.pendingSubmissionData.amount);
    if (dateEl) {
      dateEl.textContent = GrihamDateTime.formatDate(this.pendingSubmissionData.payment_date, "standard");
    }
    if (thumbEl && this.pendingSubmissionData.receipt_url) {
      thumbEl.src = this.pendingSubmissionData.receipt_url;
    }

    const confirmView = document.getElementById("res-cash-confirm-view");
    const successView = document.getElementById("res-cash-success-view");
    if (confirmView) confirmView.style.display = "block";
    if (successView) successView.style.display = "none";

    const modal = document.getElementById("modal-res-cash-confirm-backdrop");
    if (modal) {
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    }
  },

  closeCashConfirm() {
    const modal = document.getElementById("modal-res-cash-confirm-backdrop");
    if (modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  },

  async executeCashPaymentSubmission() {
    if (!this.pendingSubmissionData) return;

    const submitBtn = document.getElementById("btn-submit-cash-confirm");
    if (submitBtn) {
      submitBtn.textContent = "Submitting Receipt...";
      submitBtn.disabled = true;
    }

    const p = this.state.profile || {};
    const payload = {
      month: this.pendingSubmissionData.month,
      amount: this.pendingSubmissionData.amount,
      payment_date: this.pendingSubmissionData.payment_date,
      notes: this.pendingSubmissionData.notes,
      receipt_url: this.pendingSubmissionData.receipt_url,
      resident_name: p.name || "Rajesh Kumar",
      wing: p.wing || "A",
      flat: p.flatNumber || "204"
    };

    try {
      let res;
      if (typeof submitCashPaymentReceipt === "function") {
        res = await submitCashPaymentReceipt(payload);
      } else if (typeof GrihamAPI !== "undefined" && typeof GrihamAPI.submitCashPaymentReceipt === "function") {
        res = await GrihamAPI.submitCashPaymentReceipt(payload);
      } else {
        res = { status: "success", payment: { status: "pending_verification" } };
      }

      // Update state
      if (!this.state.activity) this.state.activity = {};
      if (!this.state.activity.maintenance) this.state.activity.maintenance = {};
      this.state.activity.maintenance.status = "Pending Verification";
      this.state.activity.maintenance.amount = payload.amount;
      this.state.activity.maintenance.paymentDate = payload.payment_date;
      this.state.activity.maintenance.submittedAt = new Date().toISOString();
      this.state.activity.maintenance.receiptUrl = payload.receipt_url;
      this.state.activity.maintenance.rejectionReason = null;

      this.renderQuickActions();
      this.renderRecentActivity();

      const confirmView = document.getElementById("res-cash-confirm-view");
      const successView = document.getElementById("res-cash-success-view");
      if (confirmView) confirmView.style.display = "none";
      if (successView) successView.style.display = "block";

      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show("Cash payment submitted for Admin verification", "success");
      }
    } catch (err) {
      console.error("[Resident Home] Cash payment submission failed:", err);
      if (typeof GrihamToast !== "undefined") {
        GrihamToast.show(err.message || "Failed to submit cash payment.", "error");
      }
    } finally {
      if (submitBtn) {
        submitBtn.textContent = "Submit";
        submitBtn.disabled = false;
      }
    }
  },

  closeCashConfirmSuccess() {
    this.closeCashConfirm();
    this.closeCashPaymentForm();
    this.openMaintenance();
  },

  openSubmittedReceipt() {
    const maint = (this.state.activity && this.state.activity.maintenance) || {};
    const receiptImg = document.getElementById("view-receipt-large-img");
    const amountEl = document.getElementById("view-receipt-amount");
    const dateEl = document.getElementById("view-receipt-date");
    const statusBadge = document.getElementById("view-receipt-status-badge");

    const imgUrl = maint.receiptUrl || this.receiptPreviewUrl || "assets/receipt-placeholder.png";
    if (receiptImg) receiptImg.src = imgUrl;

    if (amountEl) amountEl.textContent = GrihamFormat.currency(maint.amount || 3500);
    if (dateEl) {
      dateEl.textContent = maint.paymentDate || "19 Sep 2026";
    }
    if (statusBadge) {
      const cls = typeof GrihamStatusBadge !== "undefined" ? GrihamStatusBadge.getStatusClass(maint.status) : "badge-verification";
      if (maint.status === "Paid" || maint.status === "paid_ontime") {
        statusBadge.textContent = "Verified (Paid)";
        statusBadge.className = `res-recent-badge ${cls}`;
      } else if (maint.status === "Rejected" || maint.status === "rejected") {
        statusBadge.textContent = "Rejected";
        statusBadge.className = `res-recent-badge ${cls}`;
      } else {
        statusBadge.textContent = "Pending Verification";
        statusBadge.className = `res-recent-badge ${cls}`;
      }
    }

    const modal = document.getElementById("modal-res-receipt-viewer-backdrop");
    if (modal) {
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    }
  },

  closeReceiptViewer() {
    const modal = document.getElementById("modal-res-receipt-viewer-backdrop");
    if (modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  }
};
