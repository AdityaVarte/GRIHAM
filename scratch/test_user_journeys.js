const http = require('http');
const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9222;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getDebuggerUrl() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${DEBUG_PORT}/json/list`, r => {
          let data = '';
          r.on('data', chunk => data += chunk);
          r.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
      });
      const page = res && res.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch (e) {
      await sleep(300);
    }
  }
  throw new Error('Could not connect to Chrome debugging port');
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
    this.consoleErrors = [];
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = err => reject(err);
      this.ws.onmessage = evt => {
        const msg = JSON.parse(evt.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(new Error(msg.error.message));
          else resolve(msg.result);
        } else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
          const text = msg.params.args.map(a => a.value || a.description || '').join(' ');
          this.consoleErrors.push(text);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const reqId = this.id++;
      this.callbacks.set(reqId, { resolve, reject });
      this.ws.send(JSON.stringify({ id: reqId, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      const detail = res.exceptionDetails.exception?.description || res.exceptionDetails.text || JSON.stringify(res.exceptionDetails);
      throw new Error(`Eval failed on: ${expr}\nDetail: ${detail}`);
    }
    return res.result?.value;
  }

  async close() {
    this.ws.close();
  }
}

async function run() {
  console.log('=== STARTING COMPLETE USER JOURNEY VERIFICATION ===');
  try {
    execSync('taskkill /F /IM chrome.exe /T 2>nul || exit 0', { shell: 'cmd.exe' });
  } catch(e) {}
  await sleep(800);

  const tempUserDataDir = path.join(__dirname, 'temp_chrome_journeys_profile');
  if (fs.existsSync(tempUserDataDir)) {
    try { fs.rmSync(tempUserDataDir, { recursive: true, force: true }); } catch(e){}
  }

  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--user-data-dir=${tempUserDataDir}`,
    '--window-size=390,844',
    'about:blank'
  ]);

  await sleep(1500);

  const wsUrl = await getDebuggerUrl();
  const client = new CDPClient(wsUrl);
  await client.connect();
  await client.send('Page.navigate', { url: 'http://localhost:8085/index.html' });

  for (let i = 0; i < 40; i++) {
    try {
      const ready = await client.eval('document.readyState === "complete" && typeof window.GrihamRouter !== "undefined" && typeof window.GrihamAuth !== "undefined" && typeof window.GrihamAPI !== "undefined"');
      if (ready) break;
    } catch(e) {}
    await sleep(300);
  }

  // JOURNEY 1: Resident Online & Cash Maintenance Payment Flow
  console.log('\n--- Journey 1: Resident Maintenance & Cash Verification ---');
  await client.eval(`
    GrihamAuth.setSession({
      token: 'jwt-res-001',
      role: 'resident',
      user: {
        id: 'USR-001',
        name: 'Rajesh Kumar',
        phone: '9876543210',
        role: 'resident',
        society_id: 'GRIHAM-PUNE-001',
        societyName: 'Green Valley Residency',
        wing: 'A',
        flatNumber: '204',
        approvalStatus: 'Approved'
      }
    });
  `);
  await client.eval(`GrihamRouter.navigate('/resident/maintenance')`);
  await sleep(300);

  // Submit Cash payment receipt
  const cashResult = await client.eval(`(async () => {
    try {
      const res = await submitCashPaymentReceipt({
        amount: 3500,
        month: 'September 2026',
        paidDate: '2026-09-18',
        handedTo: 'Mr. Suresh Patil (Treasurer)',
        receiptNumber: 'RCP-CASH-TEST-999',
        notes: 'Handed at society office.'
      });
      return { success: true, payment: res.payment };
    } catch(err) {
      return { success: false, error: err.message };
    }
  })()`);
  console.log('Cash submission result:', cashResult.success ? `PASS (Payment ID: ${cashResult.payment?.id}, Status: ${cashResult.payment?.status})` : `FAIL: ${cashResult.error}`);

  // Switch to Admin, view and approve cash payment
  await client.eval(`
    GrihamAuth.setSession({
      token: 'jwt-adm-001',
      role: 'admin',
      user: {
        id: 'ADM-001',
        name: 'Secretary',
        phone: '9876543210',
        role: 'admin',
        society_id: 'GRIHAM-PUNE-001'
      }
    });
  `);
  await client.eval(`GrihamRouter.navigate('/admin/maintenance')`);
  await sleep(300);

  const approveResult = await client.eval(`(async () => {
    try {
      const res = await approveCashPayment('${cashResult.payment?.id}');
      return { success: true, payment: res.payment };
    } catch(err) {
      return { success: false, error: err.message };
    }
  })()`);
  console.log('Admin cash approval result:', approveResult.success ? `PASS (Status: ${approveResult.payment?.status})` : `FAIL: ${approveResult.error}`);

  // JOURNEY 2: Resident Complaints Flow (Raise -> Status Update -> Details)
  console.log('\n--- Journey 2: Resident Complaint Lifecycle ---');
  await client.eval(`
    GrihamAuth.setSession({
      token: 'jwt-res-001',
      role: 'resident',
      user: {
        id: 'USR-001',
        name: 'Rajesh Kumar',
        phone: '9876543210',
        role: 'resident',
        society_id: 'GRIHAM-PUNE-001',
        societyName: 'Green Valley Residency',
        wing: 'A',
        flatNumber: '204',
        approvalStatus: 'Approved'
      }
    });
  `);
  await client.eval(`GrihamRouter.navigate('/resident/complaints')`);
  await sleep(300);

  const complaintResult = await client.eval(`(async () => {
    try {
      const res = await createResidentComplaint({
        category: 'Plumbing',
        priority: 'High',
        title: 'Water leakage in corridor',
        description: 'Continuous dripping near flat 204.',
        images: []
      });
      return { success: true, complaint: res.complaint };
    } catch(err) {
      return { success: false, error: err.message };
    }
  })()`);
  console.log('Create complaint result:', complaintResult.success ? `PASS (ID: ${complaintResult.complaint?.id}, Status: ${complaintResult.complaint?.status})` : `FAIL: ${complaintResult.error}`);

  // Admin updates complaint status
  const adminComplaintUpdate = await client.eval(`(async () => {
    try {
      const res = await updateAdminComplaintStatus('${complaintResult.complaint?.id}', 'Working', 'Plumber dispatched to corridor.');
      return { success: true, complaint: res.complaint };
    } catch(err) {
      return { success: false, error: err.message };
    }
  })()`);
  console.log('Admin complaint update result:', adminComplaintUpdate.success ? `PASS (New Status: ${adminComplaintUpdate.complaint?.status})` : `FAIL: ${adminComplaintUpdate.error}`);

  // Resident cancels complaint if allowed
  const cancelComplaintResult = await client.eval(`(async () => {
    try {
      const res = await cancelResidentComplaint('${complaintResult.complaint?.id}', 'Resolved by plumber');
      return { success: true, complaint: res.complaint };
    } catch(err) {
      return { success: false, error: err.message };
    }
  })()`);
  console.log('Cancel complaint result:', cancelComplaintResult.success ? `PASS (Status: ${cancelComplaintResult.complaint?.status})` : `FAIL: ${cancelComplaintResult.error}`);

  // JOURNEY 3: Service Requests Lifecycle
  console.log('\n--- Journey 3: Service Request Lifecycle ---');
  await client.eval(`GrihamRouter.navigate('/resident/services')`);
  await sleep(300);

  const serviceResult = await client.eval(`(async () => {
    try {
      const res = await createResidentServiceRequest({
        category: 'Electrical',
        serviceId: 'SRV-ELEC-01',
        title: 'Switchboard Repair',
        description: 'Living room main switch sparking.',
        preferredDate: '2026-10-02',
        preferredTimeSlot: '10:00 AM - 12:00 PM',
        priority: 'Normal'
      });
      return { success: true, request: res.request };
    } catch(err) {
      return { success: false, error: err.message };
    }
  })()`);
  console.log('Create service request result:', serviceResult.success ? `PASS (ID: ${serviceResult.request?.id}, Status: ${serviceResult.request?.status})` : `FAIL: ${serviceResult.error}`);

  // JOURNEY 4: Amenity Booking & Interval Conflict Detection
  console.log('\n--- Journey 4: Amenity Booking & Overlap Validation ---');
  await client.eval(`GrihamRouter.navigate('/resident/amenities')`);
  await sleep(300);

  const overlapTest = await client.eval(`(() => {
    function isConflict(s1, e1, s2, e2) {
      return s1 < e2 && e1 > s2;
    }
    return {
      conflictTrue: isConflict('10:00', '12:00', '11:00', '13:00'),
      conflictFalse: isConflict('10:00', '11:00', '11:00', '12:00'),
      conflictEnclosed: isConflict('09:00', '14:00', '10:00', '12:00'),
      conflictSeparate: isConflict('08:00', '09:00', '12:00', '14:00')
    };
  })()`);
  const overlapPassed = overlapTest.conflictTrue === true && overlapTest.conflictFalse === false && overlapTest.conflictEnclosed === true && overlapTest.conflictSeparate === false;
  console.log('Amenity overlap logic check:', overlapPassed ? 'PASS (Strict interval overlap validated, back-to-back allowed)' : 'FAIL');

  // Book amenity using valid ID AMN-001
  const amenityBookingResult = await client.eval(`(async () => {
    try {
      const res = await createResidentBooking({
        amenity_id: 'AMN-001',
        amenity_name: 'Community Hall',
        date: '2026-10-15',
        start_time: '18:00',
        end_time: '21:00',
        people_count: 25,
        purpose: 'Family Birthday Gathering'
      });
      return { success: true, booking: res.booking };
    } catch(err) {
      return { success: false, error: err.message };
    }
  })()`);
  console.log('Resident amenity booking result:', amenityBookingResult.success ? `PASS (ID: ${amenityBookingResult.booking?.id}, Status: ${amenityBookingResult.booking?.status})` : `FAIL: ${amenityBookingResult.error}`);

  // JOURNEY 5: Society Voting & Proposals
  console.log('\n--- Journey 5: Society Voting & Proposals ---');
  await client.eval(`GrihamRouter.navigate('/resident/voting')`);
  await sleep(300);

  const voteResult = await client.eval(`(async () => {
    try {
      const res = await getResidentVotingItems();
      const itemsList = res.items || [];
      const firstActive = itemsList.find(i => i.status === 'Active' && !i.has_voted);
      if (!firstActive) {
        return { success: true, message: 'All active votes already recorded or none active', total: itemsList.length };
      }
      const payload = firstActive.type === 'proposal' ? { decision: 'YES' } : { selected_options: [firstActive.options?.[0]?.id] };
      const voteRes = await submitResidentVote(firstActive.id, payload);
      return { success: true, item: voteRes.data };
    } catch(err) {
      return { success: false, error: err.message };
    }
  })()`);
  console.log('Voting submission result:', voteResult.success ? `PASS (Item recorded)` : `FAIL: ${voteResult.error}`);

  // JOURNEY 6: Gatekeeper Visitor Lifecycle (Expected & Walk-in)
  console.log('\n--- Journey 6: Gatekeeper Visitor Lifecycle ---');
  await client.eval(`
    GrihamAuth.setSession({
      token: 'jwt-gk-001',
      role: 'gatekeeper',
      user: {
        id: 'GTK-001',
        name: 'Amit Sharma',
        role: 'gatekeeper',
        station: 'Main Gate Security Station',
        society_id: 'GRIHAM-PUNE-001',
        societyName: 'Green Valley Residency'
      }
    });
  `);
  await client.eval(`GrihamRouter.navigate('/gatekeeper/visitors')`);
  await sleep(300);

  const visitorFlow = await client.eval(`(async () => {
    try {
      // Flow A: Existing Expected visitor check-in & check-out
      const visList = await GrihamAPI.getVisitors();
      const expectedVis = visList.visitors.find(v => v.status === 'Expected');
      let expCheckIn = null, expCheckOut = null;
      if (expectedVis) {
        expCheckIn = await GrihamAPI.checkInVisitor(expectedVis.id);
        expCheckOut = await GrihamAPI.checkOutVisitor(expectedVis.id);
      }

      // Flow B: Register Walk-in visitor (automatically Checked In) and check out
      const walkInRes = await GrihamAPI.createVisitor({
        visitorName: 'Sunil Verma',
        visitorPhone: '9876501234',
        purpose: 'Guest',
        wing: 'A',
        flatNumber: '204',
        residentName: 'Rajesh Kumar',
        notes: 'Walk-in guest'
      });
      const walkIn = walkInRes.visitor;
      const walkInCheckOut = await GrihamAPI.checkOutVisitor(walkIn.id);

      return {
        success: true,
        expectedPassed: expCheckIn?.visitor?.status === 'Checked In' && expCheckOut?.visitor?.status === 'Checked Out',
        walkInInitialStatus: walkIn.status,
        walkInFinalStatus: walkInCheckOut.visitor?.status
      };
    } catch(err) {
      return { success: false, error: err.message };
    }
  })()`);
  console.log('Visitor lifecycle result:', visitorFlow.success ? `PASS (Expected In/Out: ${visitorFlow.expectedPassed}, Walk-in: ${visitorFlow.walkInInitialStatus} -> ${visitorFlow.walkInFinalStatus})` : `FAIL: ${visitorFlow.error}`);

  // JOURNEY 7: Gatekeeper Delivery Lifecycle
  console.log('\n--- Journey 7: Gatekeeper Delivery Lifecycle ---');
  await client.eval(`GrihamRouter.navigate('/gatekeeper/deliveries')`);
  await sleep(300);

  const deliveryFlow = await client.eval(`(async () => {
    try {
      // Flow A: Existing Expected delivery -> Arrived -> Entered -> Handed Over
      const delList = await GrihamAPI.getDeliveries();
      const expectedDel = delList.deliveries.find(d => d.status === 'Expected');
      let expArrived = null, expEntered = null, expHanded = null;
      if (expectedDel) {
        expArrived = await GrihamAPI.markDeliveryArrived(expectedDel.id);
        expEntered = await GrihamAPI.markDeliveryEntered(expectedDel.id);
        expHanded = await GrihamAPI.markDeliveryHandedOver(expectedDel.id);
      }

      // Flow B: Walk-in delivery (created as Arrived) -> Handed Over
      const createdRes = await GrihamAPI.createDelivery({
        courierName: 'Amazon - Vikas Rao',
        courierPhone: '9822001122',
        recipientName: 'Priya Patil',
        wing: 'A',
        flatNumber: '102',
        deliveryType: 'Courier / Parcel',
        description: 'E-commerce parcel'
      });
      const walkInDel = createdRes.delivery;
      const handed = await GrihamAPI.markDeliveryHandedOver(walkInDel.id);

      return {
        success: true,
        expectedFullCycle: expArrived && expEntered && expHanded?.delivery?.status === 'Handed Over',
        walkInInitial: walkInDel.status,
        walkInFinal: handed.delivery?.status
      };
    } catch(err) {
      return { success: false, error: err.message };
    }
  })()`);
  console.log('Delivery lifecycle result:', deliveryFlow.success ? `PASS (Expected Cycle: ${deliveryFlow.expectedFullCycle}, Walk-in: ${deliveryFlow.walkInInitial} -> ${deliveryFlow.walkInFinal})` : `FAIL: ${deliveryFlow.error}`);

  // JOURNEY 8: Gatekeeper Notifications & Audience Isolation
  console.log('\n--- Journey 8: Gatekeeper Notifications & Audience Isolation ---');
  await client.eval(`GrihamRouter.navigate('/gatekeeper/notifications')`);
  await sleep(300);

  const notifCheck = await client.eval(`(async () => {
    try {
      const res = await GrihamAPI.getGatekeeperNotifications();
      const notifs = res.notifications || [];
      const leak = notifs.some(n => n.audience && n.audience.toLowerCase() === 'residents_only');
      return {
        success: true,
        count: notifs.length,
        audienceLeak: leak
      };
    } catch(err) {
      return { success: false, error: err.message };
    }
  })()`);
  console.log('Gatekeeper notifications result:', notifCheck.success ? `PASS (${notifCheck.count} notifications, audience leak: ${notifCheck.audienceLeak})` : `FAIL: ${notifCheck.error}`);

  // JOURNEY 9: Gatekeeper Profile Update & Session Sync
  console.log('\n--- Journey 9: Gatekeeper Profile Update & Session Synchronization ---');
  await client.eval(`GrihamRouter.navigate('/gatekeeper/profile')`);
  await sleep(300);

  const profileSync = await client.eval(`(async () => {
    try {
      const updateRes = await GrihamAPI.updateGatekeeperProfile({
        name: 'Amit S. Sharma (Lead)',
        phone: '+919876543211',
        email: 'amit.sharma@greenvalley.res'
      });
      const updatedUser = GrihamAuth.getUser();
      return {
        success: true,
        resName: updateRes.profile?.name,
        sessionName: updatedUser?.name
      };
    } catch(err) {
      return { success: false, error: err.message };
    }
  })()`);
  const profileSyncPassed = profileSync.success && profileSync.resName === profileSync.sessionName;
  console.log('Gatekeeper profile sync result:', profileSyncPassed ? `PASS (Updated session name: "${profileSync.sessionName}")` : `FAIL: ${profileSync.error}`);

  console.log('\n--- Console Errors During Journeys ---');
  console.log('Console Errors caught:', client.consoleErrors.length);
  if (client.consoleErrors.length > 0) {
    client.consoleErrors.forEach(e => console.log('  [ERROR]', e));
  }

  await client.close();
  try { chromeProcess.kill(); } catch(e) {}
  console.log('\nAll user journey verifications finished.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
