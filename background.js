// Track tabs that are scheduled to be closed to avoid duplicate timers
const scheduledTabs = new Set();

// Delay before closing tab (in milliseconds)
const ZOOM_CLOSE_DELAY = 5000; // 5 seconds for Zoom tabs
const SLACK_CLOSE_DELAY = 10000; // 10 seconds for Slack tabs (longer since sometimes used intentionally)

function isSlackThreadUrl(url) {
  // Check if URL is a Slack thread link
  // Pattern: https://*.slack.com/archives/[CHANNEL_ID]/p[MESSAGE_ID]
  try {
    const urlObj = new URL(url);
    return (
      urlObj.hostname.endsWith('.slack.com') &&
      urlObj.pathname.includes('/archives/') &&
      urlObj.pathname.match(/\/p\d+/) !== null
    );
  } catch (e) {
    return false;
  }
}

function scheduleTabClose(tabId, url, delay, type) {
  // Avoid scheduling the same tab multiple times
  if (scheduledTabs.has(tabId)) {
    return;
  }

  scheduledTabs.add(tabId);
  console.log(`[Zen Auto Tab Closer] Scheduling ${type} tab ${tabId} to close in ${delay/1000} seconds:`, url);

  setTimeout(() => {
    // Close the tab after the delay
    browser.tabs.remove(tabId)
      .then(() => {
        console.log(`[Zen Auto Tab Closer] Successfully closed ${type} tab ${tabId}`);
        scheduledTabs.delete(tabId);
      })
      .catch((error) => {
        console.log(`[Zen Auto Tab Closer] Tab ${tabId} already closed or error:`, error.message);
        scheduledTabs.delete(tabId);
      });
  }, delay);
}

function checkForAutoCloseTabs(tab) {
  if (!tab.url) {
    return;
  }

  // Check if tab URL contains zoom.us and ends with #success
  if (tab.url.includes("zoom.us") && tab.url.endsWith("#success")) {
    scheduleTabClose(tab.id, tab.url, ZOOM_CLOSE_DELAY, "Zoom");
  }
  // Check if tab is a Slack thread link
  else if (isSlackThreadUrl(tab.url)) {
    scheduleTabClose(tab.id, tab.url, SLACK_CLOSE_DELAY, "Slack");
  }
}

// Listen for any tab updates (URL changes, navigation, etc.)
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only check when the URL changes
  if (changeInfo.url) {
    checkForAutoCloseTabs(tab);
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
    checkForAutoCloseTabs(tab);
  });
});

console.log("[Zen Auto Tab Closer] Extension loaded and monitoring tabs");

