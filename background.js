// Track tabs that are scheduled to be closed to avoid duplicate timers
const scheduledTabs = new Set();

// Delay before closing tab (in milliseconds)
const CLOSE_DELAY = 5000; // 5 seconds

function checkForZoomSuccessTab(tab) {
  // Check if tab URL contains zoom.us and ends with #success
  if (tab.url && tab.url.includes("zoom.us") && tab.url.endsWith("#success")) {
    // Avoid scheduling the same tab multiple times
    if (scheduledTabs.has(tab.id)) {
      return;
    }
    
    scheduledTabs.add(tab.id);
    console.log(`[Zen Zoom Tab Closer] Scheduling tab ${tab.id} to close in ${CLOSE_DELAY/1000} seconds:`, tab.url);
    
    setTimeout(() => {
      // Close the tab after the delay
      browser.tabs.remove(tab.id)
        .then(() => {
          console.log(`[Zen Zoom Tab Closer] Successfully closed tab ${tab.id}`);
          scheduledTabs.delete(tab.id);
        })
        .catch((error) => {
          console.log(`[Zen Zoom Tab Closer] Tab ${tab.id} already closed or error:`, error.message);
          scheduledTabs.delete(tab.id);
        });
    }, CLOSE_DELAY);
  }
}

// Listen for any tab updates (URL changes, navigation, etc.)
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only check when the URL changes
  if (changeInfo.url) {
    checkForZoomSuccessTab(tab);
  }
});

// Clean up scheduled tabs when they're closed manually
browser.tabs.onRemoved.addListener((tabId) => {
  if (scheduledTabs.has(tabId)) {
    scheduledTabs.delete(tabId);
  }
});

// Check all existing tabs on extension startup (in case any success tabs are already open)
browser.tabs.query({}).then(tabs => {
  tabs.forEach(tab => {
    checkForZoomSuccessTab(tab);
  });
});

console.log("[Zen Zoom Tab Closer] Extension loaded and monitoring tabs");

