// This script listens for events such as tab updates and clicks on the extension icon.

chrome.runtime.onInstalled.addListener(() => {
    console.log('What to Watch Tonight Extension Installed');
  });
  
  // Listener for tab changes
  chrome.tabs.onActivated.addListener((activeInfo) => {
    console.log('Active tab changed:', activeInfo);
  });
  
  // Event listener for when a user clicks on the extension icon
  chrome.action.onClicked.addListener((tab) => {
    console.log('Extension icon clicked on tab:', tab);
    // You can also perform actions such as opening a new tab, sending messages, etc.
  });
  