document.getElementById('saveLang').addEventListener('click', function () {
    const userLang = document.getElementById('userLang').value;
    const recipientLang = document.getElementById('recipientLang').value;

    // Save to local storage
    chrome.storage.sync.set({
        userLang: userLang,
        recipientLang: recipientLang
    }, function () {
        alert('Language preferences saved.');
    });
});
