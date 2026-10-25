document.addEventListener("DOMContentLoaded", () => {

  // Inject all extracted HTML templates dynamically
  const container = document.querySelector('.app-screen-container');
  if (container) {
    const htmlBlocks = Object.keys(window)
      .filter(key => key.startsWith('HTML_'))
      .map(key => window[key]);
    container.innerHTML = htmlBlocks.join('\n');
  }

  GrihamTheme.init();
  const themeBtn = document.getElementById("btn-theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", () => GrihamTheme.toggle());

  GrihamA11y.init();
  const a11yBtn = document.getElementById("btn-a11y-trigger");
  if (a11yBtn) a11yBtn.addEventListener("click", () => GrihamA11y.toggleSheet(true));

  // Close modals and sheets on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (typeof GrihamBottomSheet !== "undefined") {
        GrihamBottomSheet.closeAll();
      }
      if (typeof GrihamConfirmation !== "undefined") {
        GrihamConfirmation.close(false);
      }
      if (typeof GrihamA11y !== "undefined") {
        GrihamA11y.toggleSheet(false);
      }
      if (typeof GrihamAdminDashboardUI !== "undefined") {
        GrihamAdminDashboardUI.toggleAdminMenu(false);
      }
      if (typeof GrihamCallSelectorUI !== "undefined") {
        GrihamCallSelectorUI.close();
      }
      if (typeof GrihamGatekeeperHomeUI !== "undefined") {
        GrihamGatekeeperHomeUI.toggleMenu(false);
        GrihamGatekeeperHomeUI.closeLogoutConfirm();
      }
      if (typeof GrihamGatekeeperVisitorsUI !== "undefined") {
        GrihamGatekeeperVisitorsUI.closeDetail();
        GrihamGatekeeperVisitorsUI.closeWalkInModal();
      }
      if (typeof GrihamGatekeeperDeliveriesUI !== "undefined") {
        GrihamGatekeeperDeliveriesUI.closeDetail();
        GrihamGatekeeperDeliveriesUI.closeEntryModal();
      }
      if (typeof GrihamGatekeeperNotificationsUI !== "undefined") {
        GrihamGatekeeperNotificationsUI.closeDetail();
      }
      if (typeof GrihamGatekeeperProfileUI !== "undefined") {
        GrihamGatekeeperProfileUI.closeEditSheet();
        GrihamGatekeeperProfileUI.closeLogoutConfirm();
      }
    }
  });

  GrihamI18n.init();
  GrihamRouter.init();

  console.info("%c[Griham Mobile]%c Refactored Architecture Ready.", "color:#3b82f6;font-weight:bold;", "color:inherit;");
});
