/**
 * GRIHAM FRONTEND - RESIDENT VOTING & PROPOSALS CONTROLLER
 * Page: Resident Society Voting & Proposals (#/resident/voting)
 * Mobile-first Residential Society Management Platform
 * 
 * Reuses the canonical Admin notification/poll/proposal architecture.
 */

window.HTML_RESIDENT_VOTING = `
<!-- ================================================================= -->
<!-- RESIDENT VOTING BOTTOM SHEETS                                     -->
<!-- ================================================================= -->

<div class="sheet-backdrop" id="sheet-voting-detail-backdrop" onclick="GrihamResidentVotingUI.closeDetail()" aria-hidden="true"></div>

<div class="mobile-bottom-sheet" id="sheet-voting-detail" role="dialog" aria-modal="true" aria-labelledby="voting-detail-title" aria-hidden="true" style="padding-bottom:calc(2rem + var(--safe-bottom, 20px)); max-height:90vh; overflow-y:auto;">
  <div class="sheet-handle" aria-hidden="true"></div>

  <div class="sheet-header-row">
    <button type="button" class="btn-sheet-back" onclick="GrihamResidentVotingUI.closeDetail()" aria-label="Close voting details" title="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <h3 class="sheet-title" id="voting-detail-title">Poll Details</h3>
    <div style="width:24px;" aria-hidden="true"></div>
  </div>

  <div id="voting-detail-body" style="padding: 0.25rem 0.25rem 1rem; display:flex; flex-direction:column; gap:0.9rem;">
    <!-- Rendered dynamically by GrihamResidentVotingUI.renderDetailBody -->
  </div>
</div>

<!-- ================================================================= -->
<!-- RESIDENT VOTING SCREEN VIEW (#screen-resident-voting)             -->
<!-- ================================================================= -->
<section id="screen-resident-voting" class="app-view voting-view" aria-labelledby="voting-main-heading">

  <!-- Top App Bar -->
  \${GrihamHeader.render({
    badge: 'Resident Portal',
    backTarget: '/resident/home',
    backId: 'btn-voting-back',
    backAriaLabel: 'Back to Resident Home'
  })}

  <!-- Hero Section -->
  <header class="brand-hero" style="margin-bottom: 0.35rem;">
    <div class="brand-logo-pill icon-resident" aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 20V10"/>
        <path d="M12 20V4"/>
        <path d="M6 20v-6"/>
      </svg>
    </div>
    <h1 class="brand-hero-title" id="voting-main-heading" data-i18n="voting_hero_title">Society Voting & Proposals</h1>
    <p class="brand-hero-tagline" data-i18n="voting_hero_sub">Participate in active society polls and community decision proposals.</p>
  </header>

  <!-- Unapproved Resident Warning Banner -->
  <div id="voting-unapproved-banner" class="res-approval-banner" style="display:none; margin-bottom: 0.85rem;" role="alert">
    <div class="res-approval-icon-box" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </div>
    <div class="res-approval-content">
      <h3 class="res-approval-title">Voting Restricted</h3>
      <p class="res-approval-desc" data-i18n="voting_unapproved_warning">
        Voting is available only to approved residents. Your account registration is currently pending review.
      </p>
    </div>
  </div>

  <!-- Status Filter Tabs -->
  <div class="voting-tabs-group" role="tablist" aria-label="Voting Status Filter">
    <button type="button" class="btn-voting-tab active" id="tab-voting-all" role="tab" aria-selected="true" onclick="GrihamResidentVotingUI.setStatusFilter('all')">
      <span>All</span>
      <span class="tab-count-badge" id="count-voting-all">0</span>
    </button>
    <button type="button" class="btn-voting-tab" id="tab-voting-active" role="tab" aria-selected="false" onclick="GrihamResidentVotingUI.setStatusFilter('active')">
      <span data-i18n="tab_active_votes">Active</span>
      <span class="tab-count-badge" id="count-voting-active">0</span>
    </button>
    <button type="button" class="btn-voting-tab" id="tab-voting-voted" role="tab" aria-selected="false" onclick="GrihamResidentVotingUI.setStatusFilter('voted')">
      <span data-i18n="tab_voted">Voted</span>
      <span class="tab-count-badge" id="count-voting-voted">0</span>
    </button>
    <button type="button" class="btn-voting-tab" id="tab-voting-closed" role="tab" aria-selected="false" onclick="GrihamResidentVotingUI.setStatusFilter('closed')">
      <span data-i18n="tab_closed_votes">Closed</span>
      <span class="tab-count-badge" id="count-voting-closed">0</span>
    </button>
  </div>

  <!-- Type Secondary Filter Bar -->
  <div class="history-filter-bar" role="group" aria-label="Filter by Type" style="margin-bottom: 0.85rem;">
    <button type="button" class="btn-filter-chip active" id="chip-type-all" onclick="GrihamResidentVotingUI.setTypeFilter('all')">All Types</button>
    <button type="button" class="btn-filter-chip" id="chip-type-poll" onclick="GrihamResidentVotingUI.setTypeFilter('poll')">Polls</button>
    <button type="button" class="btn-filter-chip" id="chip-type-proposal" onclick="GrihamResidentVotingUI.setTypeFilter('proposal')">Proposals</button>
  </div>

  <!-- Skeleton Loader Container -->
  <div id="voting-skeleton-loader" style="display:none; flex-direction:column; gap:0.75rem;">
    <div class="dash-skeleton-card" style="height: 110px;"></div>
    <div class="dash-skeleton-card" style="height: 110px;"></div>
    <div class="dash-skeleton-card" style="height: 110px;"></div>
  </div>

  <!-- Items Cards List -->
  <div id="voting-items-list" style="display:flex; flex-direction:column; gap:0.75rem;">
    <!-- Injected dynamically by GrihamResidentVotingUI.renderList -->
  </div>

</section>
`;

window.GrihamResidentVotingUI = {
  state: {
    items: [],
    filterStatus: 'all', // 'all' | 'active' | 'voted' | 'closed'
    filterType: 'all',   // 'all' | 'poll' | 'proposal'
    isLoading: false,
    activeItem: null,
    selectedOptions: [], // For polls: array of selected option text or ids
    selectedDecision: null, // For proposals: "YES" | "NO"
    isSubmitting: false,
    isApproved: true
  },

  async init() {
    this.checkApproval();
    await this.loadItems();

    // Check if URL has a target ID parameter e.g. #/resident/voting?id=notif-2
    const hash = window.location.hash || '';
    if (hash.includes('?')) {
      const qs = hash.split('?')[1];
      const params = new URLSearchParams(qs);
      const targetId = params.get('id');
      if (targetId) {
        setTimeout(() => this.openDetail(targetId), 200);
      }
    }
  },

  checkApproval() {
    const isApproved = typeof GrihamAuth !== 'undefined' && typeof GrihamAuth.isApprovedResident === 'function'
      ? GrihamAuth.isApprovedResident()
      : true;
    this.state.isApproved = isApproved;

    const banner = document.getElementById('voting-unapproved-banner');
    if (banner) {
      banner.style.display = isApproved ? 'none' : 'flex';
    }
  },

  async loadItems(force = false) {
    if (this.state.isLoading) return;
    this.state.isLoading = true;

    const skeleton = document.getElementById('voting-skeleton-loader');
    const listEl = document.getElementById('voting-items-list');

    if (skeleton) skeleton.style.display = 'flex';
    if (listEl) listEl.innerHTML = '';

    try {
      const response = await getResidentVotingItems();
      if (response && Array.isArray(response.items)) {
        this.state.items = response.items;
        if (response.resident_approved !== undefined) {
          this.state.isApproved = !!response.resident_approved;
          const banner = document.getElementById('voting-unapproved-banner');
          if (banner) banner.style.display = this.state.isApproved ? 'none' : 'flex';
        }
      } else {
        this.state.items = [];
      }
      this.updateCounts();
      this.renderList();
    } catch (err) {
      console.error('[ResidentVoting] Failed to load voting items:', err);
      if (listEl) {
        listEl.innerHTML = `
          <div style="text-align:center; padding:2rem 1rem; color:var(--text-muted); font-size:0.88rem; background:var(--glass-bg); border:1px solid var(--glass-border); border-radius:var(--radius-md);">
            <p>Unable to load society polls and proposals.</p>
            <button type="button" class="btn-card-action" style="margin:0.75rem auto 0; width:auto; padding:0.4rem 1rem;" onclick="GrihamResidentVotingUI.loadItems(true)">
              Try Again
            </button>
          </div>
        `;
      }
    } finally {
      if (skeleton) skeleton.style.display = 'none';
      this.state.isLoading = false;
    }
  },

  updateCounts() {
    const items = this.state.items;
    const allCount = items.length;
    const activeCount = items.filter(i => i.status === 'Active').length;
    const votedCount = items.filter(i => i.has_voted).length;
    const closedCount = items.filter(i => i.status === 'Closed').length;

    const elAll = document.getElementById('count-voting-all');
    const elActive = document.getElementById('count-voting-active');
    const elVoted = document.getElementById('count-voting-voted');
    const elClosed = document.getElementById('count-voting-closed');

    if (elAll) elAll.textContent = allCount;
    if (elActive) elActive.textContent = activeCount;
    if (elVoted) elVoted.textContent = votedCount;
    if (elClosed) elClosed.textContent = closedCount;
  },

  setStatusFilter(status) {
    this.state.filterStatus = status;
    const tabMap = {
      all: 'tab-voting-all',
      active: 'tab-voting-active',
      voted: 'tab-voting-voted',
      closed: 'tab-voting-closed'
    };

    Object.keys(tabMap).forEach(key => {
      const btn = document.getElementById(tabMap[key]);
      if (btn) {
        btn.classList.toggle('active', key === status);
        btn.setAttribute('aria-selected', key === status);
      }
    });

    this.renderList();
  },

  setTypeFilter(type) {
    this.state.filterType = type;
    const chipMap = {
      all: 'chip-type-all',
      poll: 'chip-type-poll',
      proposal: 'chip-type-proposal'
    };

    Object.keys(chipMap).forEach(key => {
      const chip = document.getElementById(chipMap[key]);
      if (chip) chip.classList.toggle('active', key === type);
    });

    this.renderList();
  },

  renderList() {
    const container = document.getElementById('voting-items-list');
    if (!container) return;

    let filtered = [...this.state.items];

    // Status filter
    if (this.state.filterStatus === 'active') {
      filtered = filtered.filter(i => i.status === 'Active' && !i.has_voted);
    } else if (this.state.filterStatus === 'voted') {
      filtered = filtered.filter(i => i.has_voted);
    } else if (this.state.filterStatus === 'closed') {
      filtered = filtered.filter(i => i.status === 'Closed');
    }

    // Type filter
    if (this.state.filterType !== 'all') {
      filtered = filtered.filter(i => i.type === this.state.filterType);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:2.5rem 1rem; color:var(--text-muted); background:var(--glass-bg, rgba(30, 41, 59, 0.5)); border:1px solid var(--glass-border); border-radius:var(--radius-md);">
          <div style="font-size:1.75rem; margin-bottom:0.5rem;" aria-hidden="true">🗳️</div>
          <h3 style="font-size:calc(0.95rem * var(--font-scale, 1)); font-weight:700; color:var(--text-primary); margin-bottom:0.25rem;" data-i18n="empty_voting_title">
            No Polls or Proposals
          </h3>
          <p style="font-size:calc(0.8rem * var(--font-scale, 1)); color:var(--text-secondary); margin:0;" data-i18n="empty_voting_desc">
            There are no society polls or proposals matching this category.
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => {
      const isPoll = item.type === 'poll';
      const isUrgent = item.priority === 'Urgent';
      const isImportant = item.priority === 'Important';
      const isClosed = item.status === 'Closed';
      const hasVoted = item.has_voted;

      let statusBadgeLabel = item.status;
      if (hasVoted) statusBadgeLabel = 'Voted';
      else if (isClosed) statusBadgeLabel = 'Closed';
      else statusBadgeLabel = 'Active';

      const statusBadge = typeof GrihamStatusBadge !== 'undefined'
        ? GrihamStatusBadge.render({ status: statusBadgeLabel, variant: 'pill' })
        : `<span class="status-pill status-${statusBadgeLabel.toLowerCase()}">${statusBadgeLabel}</span>`;

      // Deadline format helper
      let deadlineText = '';
      if (item.deadline) {
        try {
          const d = new Date(item.deadline);
          const formatted = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
          deadlineText = isClosed ? `Ended ${formatted}` : `Ends ${formatted}`;
        } catch(e) {
          deadlineText = item.deadline;
        }
      }

      return `
        <article class="voting-card" onclick="GrihamResidentVotingUI.openDetail('${item.id}')" role="button" tabindex="0" aria-label="${isPoll ? 'Poll' : 'Proposal'}: ${escapeHtml(item.title)}">
          <div class="voting-card-top">
            <div class="voting-badge-cluster">
              <span class="voting-type-tag ${item.type}">${isPoll ? 'Poll' : 'Proposal'}</span>
              ${isUrgent ? '<span style="font-size:0.65rem; font-weight:800; color:#ef4444; background:rgba(239,68,68,0.14); padding:0.15rem 0.4rem; border-radius:4px;">URGENT</span>' : ''}
              ${isImportant ? '<span style="font-size:0.65rem; font-weight:800; color:var(--color-brand-amber, #f59e0b); background:rgba(245,158,11,0.14); padding:0.15rem 0.4rem; border-radius:4px;">IMPORTANT</span>' : ''}
              ${hasVoted ? '<span class="voting-voted-chip"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> Voted</span>' : ''}
            </div>
            ${statusBadge}
          </div>

          <h2 class="voting-card-title">${escapeHtml(item.title || item.question)}</h2>

          ${!isPoll && item.description ? `<p class="voting-card-desc">${escapeHtml(item.description)}</p>` : ''}

          <div class="voting-card-meta">
            <span class="voting-card-meta-item">📁 ${escapeHtml(item.category || 'General')}</span>
            <span class="voting-card-meta-item">👥 ${escapeHtml(item.target || 'All Residents')}</span>
            ${deadlineText ? `<span class="voting-card-meta-item">⏳ ${escapeHtml(deadlineText)}</span>` : ''}
          </div>

          <div class="voting-card-footer">
            <span style="color:var(--text-muted); font-size:0.75rem;">
              ${item.total_votes ? `${item.total_votes} votes cast` : (isPoll ? `${(item.options || []).length} options` : 'YES / NO voting')}
            </span>
            <span class="voting-action-btn">
              ${hasVoted || isClosed ? 'View Results' : 'Vote Now'}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </div>
        </article>
      `;
    }).join('');
  },

  openDetail(id) {
    const item = this.state.items.find(i => i.id === id);
    if (!item) return;

    this.state.activeItem = item;
    this.state.selectedOptions = [];
    this.state.selectedDecision = null;

    const titleEl = document.getElementById('voting-detail-title');
    if (titleEl) {
      titleEl.textContent = item.type === 'poll' ? 'Poll Details' : 'Proposal Details';
    }

    this.renderDetailBody();
    GrihamBottomSheet.open('sheet-voting-detail', 'sheet-voting-detail-backdrop');
  },

  closeDetail() {
    GrihamBottomSheet.close('sheet-voting-detail', 'sheet-voting-detail-backdrop');
    this.state.activeItem = null;
    this.state.selectedOptions = [];
    this.state.selectedDecision = null;
  },

  selectOption(optIdOrText) {
    const item = this.state.activeItem;
    if (!item || item.has_voted || item.status === 'Closed' || !this.state.isApproved) return;

    if (item.allow_multiple) {
      const idx = this.state.selectedOptions.indexOf(optIdOrText);
      if (idx > -1) {
        this.state.selectedOptions.splice(idx, 1);
      } else {
        const max = item.max_options || item.options.length;
        if (this.state.selectedOptions.length >= max) {
          if (typeof GrihamToast !== 'undefined') {
            GrihamToast.show(`You can select at most ${max} options.`, 'warning');
          }
          return;
        }
        this.state.selectedOptions.push(optIdOrText);
      }
    } else {
      this.state.selectedOptions = [optIdOrText];
    }

    this.updateDetailOptionsUI();
  },

  selectProposalDecision(decision) {
    const item = this.state.activeItem;
    if (!item || item.has_voted || item.status === 'Closed' || !this.state.isApproved) return;

    this.state.selectedDecision = decision;
    this.updateDetailOptionsUI();
  },

  updateDetailOptionsUI() {
    const item = this.state.activeItem;
    if (!item) return;

    if (item.type === 'poll') {
      const cards = document.querySelectorAll('.voting-option-card');
      cards.forEach(card => {
        const val = card.getAttribute('data-value');
        const isSel = this.state.selectedOptions.includes(val);
        card.classList.toggle('selected', isSel);
        card.setAttribute('aria-checked', isSel ? 'true' : 'false');
      });

      const submitBtn = document.getElementById('btn-submit-vote-action');
      if (submitBtn) {
        submitBtn.disabled = this.state.selectedOptions.length === 0 || !this.state.isApproved;
      }
    } else if (item.type === 'proposal') {
      const btnYes = document.getElementById('btn-vote-yes');
      const btnNo = document.getElementById('btn-vote-no');
      const dec = this.state.selectedDecision;

      if (btnYes) {
        btnYes.classList.toggle('selected', dec === 'YES');
        btnYes.setAttribute('aria-pressed', dec === 'YES' ? 'true' : 'false');
      }
      if (btnNo) {
        btnNo.classList.toggle('selected', dec === 'NO');
        btnNo.setAttribute('aria-pressed', dec === 'NO' ? 'true' : 'false');
      }

      const submitBtn = document.getElementById('btn-submit-vote-action');
      if (submitBtn) {
        submitBtn.disabled = !dec || !this.state.isApproved;
      }
    }
  },

  renderDetailBody() {
    const item = this.state.activeItem;
    const bodyEl = document.getElementById('voting-detail-body');
    if (!item || !bodyEl) return;

    const isPoll = item.type === 'poll';
    const isClosed = item.status === 'Closed';
    const hasVoted = item.has_voted;
    const showResults = item.show_results || hasVoted || isClosed;
    const canVote = !hasVoted && !isClosed && this.state.isApproved;

    // Header Badge row
    let statusLabel = item.status;
    if (hasVoted) statusLabel = 'Voted';
    else if (isClosed) statusLabel = 'Closed';
    else statusLabel = 'Active';

    const statusBadge = typeof GrihamStatusBadge !== 'undefined'
      ? GrihamStatusBadge.render({ status: statusLabel, variant: 'pill' })
      : `<span class="status-pill status-${statusLabel.toLowerCase()}">${statusLabel}</span>`;

    let deadlineDisplay = 'No deadline';
    if (item.deadline) {
      try {
        const d = new Date(item.deadline);
        deadlineDisplay = d.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      } catch(e) {
        deadlineDisplay = item.deadline;
      }
    }

    // Main Question / Proposal Content Box
    let mainContentHtml = '';
    if (isPoll) {
      mainContentHtml = `
        <div style="background:var(--input-bg, rgba(15, 23, 42, 0.6)); border:1px solid var(--input-border, rgba(255, 255, 255, 0.08)); border-radius:var(--radius-sm, 10px); padding:0.85rem; font-size:calc(0.92rem * var(--font-scale, 1)); font-weight:600; color:var(--text-primary); line-height:1.45;">
          ${escapeHtml(item.question || item.title)}
        </div>
      `;
    } else {
      mainContentHtml = `
        <div style="display:flex; flex-direction:column; gap:0.65rem;">
          <div style="background:var(--input-bg, rgba(15, 23, 42, 0.6)); border:1px solid var(--input-border, rgba(255, 255, 255, 0.08)); border-radius:var(--radius-sm, 10px); padding:0.85rem; font-size:calc(0.85rem * var(--font-scale, 1)); color:var(--text-primary); line-height:1.45;">
            <strong style="color:var(--resident-accent, #60a5fa); display:block; margin-bottom:0.3rem;">Description:</strong>
            ${escapeHtml(item.description || item.title)}
          </div>
          ${item.reason ? `
            <div style="background:var(--input-bg, rgba(15, 23, 42, 0.6)); border:1px solid var(--input-border, rgba(255, 255, 255, 0.08)); border-radius:var(--radius-sm, 10px); padding:0.85rem; font-size:calc(0.85rem * var(--font-scale, 1)); color:var(--text-primary); line-height:1.45;">
              <strong style="color:var(--color-brand-blue, #38bdf8); display:block; margin-bottom:0.3rem;">Reason & Context:</strong>
              ${escapeHtml(item.reason)}
            </div>
          ` : ''}
        </div>
      `;
    }

    // Interactive Voting Controls (if canVote)
    let votingControlsHtml = '';
    if (canVote) {
      if (isPoll) {
        const isMulti = item.allow_multiple;
        votingControlsHtml = `
          <div style="margin-top:0.4rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.45rem;">
              <span style="font-size:calc(0.82rem * var(--font-scale, 1)); font-weight:700; color:var(--text-primary);">
                ${isMulti ? `Select Options (Up to ${item.max_options || item.options.length})` : 'Choose exactly one option:'}
              </span>
              <span style="font-size:0.72rem; color:var(--text-muted);">${isMulti ? 'Multiple choice' : 'Single choice'}</span>
            </div>
            <div class="voting-options-container" role="${isMulti ? 'group' : 'radiogroup'}" aria-label="Poll Options">
              ${(item.options || []).map((opt, i) => `
                <div class="voting-option-card ${isMulti ? 'checkbox' : 'radio'}" data-value="${escapeHtml(opt.text)}" onclick="GrihamResidentVotingUI.selectOption('${escapeHtml(opt.text)}')" role="${isMulti ? 'checkbox' : 'radio'}" aria-checked="false" tabindex="0">
                  <div class="voting-option-left">
                    <span class="voting-control-indicator" aria-hidden="true"></span>
                    <span class="voting-option-text">${escapeHtml(opt.text)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else {
        votingControlsHtml = `
          <div style="margin-top:0.4rem;">
            <span style="font-size:calc(0.82rem * var(--font-scale, 1)); font-weight:700; color:var(--text-primary); display:block; margin-bottom:0.45rem;">
              Cast Your Vote:
            </span>
            <div class="proposal-voting-box" role="group" aria-label="Proposal Decision">
              <button type="button" class="btn-proposal-vote yes" id="btn-vote-yes" onclick="GrihamResidentVotingUI.selectProposalDecision('YES')" aria-pressed="false">
                <span class="proposal-vote-label">YES</span>
                <span class="proposal-vote-sub">In Favor</span>
              </button>
              <button type="button" class="btn-proposal-vote no" id="btn-vote-no" onclick="GrihamResidentVotingUI.selectProposalDecision('NO')" aria-pressed="false">
                <span class="proposal-vote-label">NO</span>
                <span class="proposal-vote-sub">Oppose</span>
              </button>
            </div>
          </div>
        `;
      }
    }

    // Results Display (if showResults)
    let resultsHtml = '';
    if (showResults) {
      const mySelections = item.user_voted_options || [];
      const total = item.total_votes || 0;

      if (isPoll) {
        resultsHtml = `
          <div style="margin-top:0.35rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.45rem;">
              <span style="font-size:calc(0.84rem * var(--font-scale, 1)); font-weight:700; color:var(--text-primary);">Voting Results</span>
              <span style="font-size:0.75rem; color:var(--text-muted);">${total} total votes</span>
            </div>
            <div class="voting-results-box">
              ${(item.options || []).map(opt => {
                const isMyVote = mySelections.includes(opt.text) || mySelections.includes(opt.id);
                const pct = opt.pct !== undefined ? opt.pct : (total > 0 ? Math.round(((opt.votes || 0) / total) * 100) : 0);
                const votes = opt.votes !== undefined ? opt.votes : 0;
                return `
                  <div class="voting-result-row">
                    <div class="voting-result-meta">
                      <span class="voting-result-label">
                        ${escapeHtml(opt.text)}
                        ${isMyVote ? '<span class="my-vote-badge">Your Vote</span>' : ''}
                      </span>
                      <span class="voting-result-stat">${votes} (${pct}%)</span>
                    </div>
                    <div class="voting-result-track" aria-hidden="true">
                      <div class="voting-result-fill" style="width: ${pct}%;"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      } else {
        const yesOpt = (item.options || []).find(o => o.text === 'YES') || { votes: 0, pct: 0 };
        const noOpt = (item.options || []).find(o => o.text === 'NO') || { votes: 0, pct: 0 };
        const myDecision = mySelections[0] || null;

        resultsHtml = `
          <div style="margin-top:0.35rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.45rem;">
              <span style="font-size:calc(0.84rem * var(--font-scale, 1)); font-weight:700; color:var(--text-primary);">Proposal Results</span>
              <span style="font-size:0.75rem; color:var(--text-muted);">${total} total votes</span>
            </div>
            <div class="proposal-stats-grid">
              <div class="prop-stat-box yes">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:0.78rem; font-weight:700;">YES</span>
                  ${myDecision === 'YES' ? '<span class="my-vote-badge" style="background:#fff; color:#059669;">Your Vote</span>' : ''}
                </div>
                <span class="prop-count-num">${yesOpt.votes || 0}</span>
                <span style="font-size:0.74rem; opacity:0.85;">${yesOpt.pct || 0}% Support</span>
              </div>
              <div class="prop-stat-box no">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:0.78rem; font-weight:700;">NO</span>
                  ${myDecision === 'NO' ? '<span class="my-vote-badge" style="background:#fff; color:#dc2626;">Your Vote</span>' : ''}
                </div>
                <span class="prop-count-num">${noOpt.votes || 0}</span>
                <span style="font-size:0.74rem; opacity:0.85;">${noOpt.pct || 0}% Oppose</span>
              </div>
            </div>
          </div>
        `;
      }
    }

    // Submit or Status Button
    let actionBtnHtml = '';
    if (canVote) {
      actionBtnHtml = `
        <button type="button" class="btn-primary-action btn-resident-style" id="btn-submit-vote-action" onclick="GrihamResidentVotingUI.handleVoteSubmit()" disabled style="margin-top:0.75rem; width:100%; min-height:48px;">
          <span id="btn-vote-spinner" class="spinner-icon" style="display:none;" aria-hidden="true"></span>
          <span id="btn-vote-text" data-i18n="btn_submit_vote">Submit Vote</span>
        </button>
      `;
    } else if (hasVoted) {
      actionBtnHtml = `
        <div style="margin-top:0.75rem; text-align:center; padding:0.75rem; background:rgba(16, 185, 129, 0.1); border:1px solid rgba(16, 185, 129, 0.25); border-radius:var(--radius-sm); color:#10b981; font-size:calc(0.84rem * var(--font-scale, 1)); font-weight:700; display:flex; align-items:center; justify-content:center; gap:0.4rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Vote Submitted — Thank you!</span>
        </div>
      `;
    } else if (isClosed) {
      actionBtnHtml = `
        <div style="margin-top:0.75rem; text-align:center; padding:0.75rem; background:rgba(255, 255, 255, 0.05); border:1px solid var(--glass-border); border-radius:var(--radius-sm); color:var(--text-muted); font-size:calc(0.84rem * var(--font-scale, 1)); font-weight:600;">
          Voting has concluded for this item.
        </div>
      `;
    } else if (!this.state.isApproved) {
      actionBtnHtml = `
        <div style="margin-top:0.75rem; text-align:center; padding:0.75rem; background:rgba(245, 158, 11, 0.12); border:1px solid rgba(245, 158, 11, 0.3); border-radius:var(--radius-sm); color:var(--color-brand-amber, #f59e0b); font-size:calc(0.82rem * var(--font-scale, 1)); font-weight:600;">
          Your registration is pending approval. You cannot cast a vote at this time.
        </div>
      `;
    }

    bodyEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="voting-type-tag ${item.type}">${isPoll ? 'POLL' : 'PROPOSAL'}</span>
        ${statusBadge}
      </div>

      <h2 style="font-family:var(--font-family-display); font-size:calc(1.1rem * var(--font-scale)); font-weight:700; color:var(--text-primary); line-height:1.3; margin:0;">
        ${escapeHtml(item.title || item.question)}
      </h2>

      <div class="voting-detail-meta-grid">
        <div><span style="color:var(--text-muted);">Category:</span> <strong>${escapeHtml(item.category || 'General')}</strong></div>
        <div><span style="color:var(--text-muted);">Priority:</span> <strong>${escapeHtml(item.priority || 'Normal')}</strong></div>
        <div style="grid-column:1 / -1;"><span style="color:var(--text-muted);">Target:</span> <strong>${escapeHtml(item.target || 'All Residents')}</strong></div>
        <div style="grid-column:1 / -1;"><span style="color:var(--text-muted);">Deadline:</span> <strong>${escapeHtml(deadlineDisplay)}</strong></div>
      </div>

      ${mainContentHtml}
      ${votingControlsHtml}
      ${resultsHtml}
      ${actionBtnHtml}
    `;
  },

  handleVoteSubmit() {
    const item = this.state.activeItem;
    if (!item) return;

    if (!this.state.isApproved) {
      if (typeof GrihamToast !== 'undefined') {
        GrihamToast.show('Only approved residents can vote.', 'warning');
      }
      return;
    }

    let summary = '';
    if (item.type === 'proposal') {
      if (!this.state.selectedDecision) {
        if (typeof GrihamToast !== 'undefined') GrihamToast.show('Please select YES or NO.', 'warning');
        return;
      }
      summary = `Vote: ${this.state.selectedDecision}`;
    } else {
      if (this.state.selectedOptions.length === 0) {
        if (typeof GrihamToast !== 'undefined') GrihamToast.show('Please select an option.', 'warning');
        return;
      }
      summary = `Option(s): ${this.state.selectedOptions.join(', ')}`;
    }

    // Confirmation step before submitting
    if (typeof GrihamConfirmation !== 'undefined') {
      GrihamConfirmation.open({
        title: 'Submit this vote?',
        message: `Confirm your selection for "${item.title || item.question}": ${summary}. Once submitted, your vote cannot be changed.`,
        confirmText: 'Confirm Vote',
        cancelText: 'Cancel',
        isDanger: false,
        onConfirm: () => this.executeVote()
      });
    } else {
      this.executeVote();
    }
  },

  async executeVote() {
    const item = this.state.activeItem;
    if (!item || this.state.isSubmitting) return;

    this.state.isSubmitting = true;
    const btn = document.getElementById('btn-submit-vote-action');
    const spinner = document.getElementById('btn-vote-spinner');
    const btnText = document.getElementById('btn-vote-text');

    if (btn) btn.disabled = true;
    if (spinner) spinner.style.display = 'inline-block';
    if (btnText) btnText.textContent = 'Submitting...';

    try {
      const payload = item.type === 'proposal'
        ? { decision: this.state.selectedDecision }
        : { selected_options: this.state.selectedOptions };

      const response = await submitResidentVote(item.id, payload);

      if (typeof GrihamToast !== 'undefined') {
        GrihamToast.show('Your vote has been submitted successfully!', 'success');
      }

      // Update active item representation
      if (response && response.data) {
        Object.assign(item, response.data);
      } else {
        item.has_voted = true;
        item.user_voted_options = item.type === 'proposal' ? [this.state.selectedDecision] : this.state.selectedOptions;
        item.status = 'Voted';
      }

      // Reload fresh list in background to sync total counts
      await this.loadItems();

      // Refresh active item from list
      const fresh = this.state.items.find(i => i.id === item.id);
      if (fresh) {
        this.state.activeItem = fresh;
        this.renderDetailBody();
      } else {
        this.closeDetail();
      }

    } catch (err) {
      console.error('[ResidentVoting] Vote submission failed:', err);
      const msg = err.message || 'Unable to record your vote. Please try again.';
      if (typeof GrihamToast !== 'undefined') {
        GrihamToast.show(msg, err.status === 409 ? 'warning' : 'error');
      }
      if (err.status === 409) {
        await this.loadItems();
        const fresh = this.state.items.find(i => i.id === item.id);
        if (fresh) {
          this.state.activeItem = fresh;
          this.renderDetailBody();
        }
      }
    } finally {
      this.state.isSubmitting = false;
      if (btn) btn.disabled = false;
      if (spinner) spinner.style.display = 'none';
      if (btnText) btnText.textContent = 'Submit Vote';
    }
  }
};
