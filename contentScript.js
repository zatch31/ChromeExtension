chrome.storage.sync.get(['userLang', 'recipientLang'], function (data) {
    const userLang = data.userLang || 'en'; // Default to English if not set
    const recipientLang = data.recipientLang || 'en';

    // Translation API (Google Translate or similar)
    const apiUrl = `https://api.mymemory.translated.net/get?q=`;

    // Translate existing chats (fetching chat elements and translating)
    const chats = document.querySelectorAll('.message-in .copyable-text');

    chats.forEach(chat => {
        const originalText = chat.innerText;

        fetch(`${apiUrl}${encodeURIComponent(originalText)}&langpair=${recipientLang}|${userLang}`)
            .then(response => response.json())
            .then(data => {
                chat.innerText = data.responseData.translatedText;
            })
            .catch(err => console.error('Error in translation:', err));
    });

    // Translate message before sending
    const inputField = document.querySelector('.p3_M1');
    inputField.addEventListener('input', function () {
        const text = inputField.innerText;

        // Translate user input to recipient's language
        fetch(`${apiUrl}${encodeURIComponent(text)}&langpair=${userLang}|${recipientLang}`)
            .then(response => response.json())
            .then(data => {
                inputField.innerText = data.responseData.translatedText;
            })
            .catch(err => console.error('Error in translation:', err));
    });
});
