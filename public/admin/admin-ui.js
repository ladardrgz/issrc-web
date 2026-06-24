(function markAdminReady() {
  const hideLoading = () => document.documentElement.classList.add('admin-ready');

  if (document.querySelector('[data-testid], [class*="App"], [class*="Authentication"]')) {
    hideLoading();
    return;
  }

  window.setTimeout(hideLoading, 1400);
})();
