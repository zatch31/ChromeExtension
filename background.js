chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ inputLanguage: 'en', outputLanguage: 'en' });
});
