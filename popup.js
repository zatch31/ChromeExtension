document.getElementById('save-btn').addEventListener('click', () => {
    const inputLang = document.getElementById('input-language').value;
    const outputLang = document.getElementById('output-language').value;

    // Save preferences in Chrome storage
    chrome.storage.sync.set({
        inputLanguage: inputLang,
        outputLanguage: outputLang
    }, () => {
        alert('Language preferences saved!');
    });
});
