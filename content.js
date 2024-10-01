chrome.storage.sync.get(['userLang', 'recipientLang'], function (data) {
    const userLang = data.userLang || 'en '; // Default to English if not set
    const recipientLang = data.recipientLang || 'en';

    // Translation API (Google Translate or similar)
    const apiUrl = `https://api.mymemory.translated.net/get?q=`;

    // Ensure the DOM is fully loaded before running the script
    document.addEventListener('DOMContentLoaded', function () {
        // Find all incoming chat messages
        const chats = document.querySelectorAll('.message-in .copyable-text');
        if (chats.length === 0) {
            console.error('No chat messages found! Check the selector for .message-in .copyable-text.');
        } else {
            // Translate existing chats
            chats.forEach(chat => {
                const originalText = chat.innerText;

                // Translate the chat message
                fetch(`${apiUrl}${encodeURIComponent(originalText)}&langpair=${recipientLang}|${userLang}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.responseData && data.responseData.translatedText) {
                            chat.innerText = data.responseData.translatedText;
                        } else {
                            console.error('Translation API failed to return translated text.');
                        }
                    })
                    .catch(err => console.error('Error in translation:', err));
            });
        }

        // Translate user input before sending
        const inputField = document.querySelector('.p3_M1'); // Check this selector
        if (!inputField) {
            console.error('Input field not found! Check the selector for .p3_M1.');
        } else {
            inputField.addEventListener('input', function () {
                const text = inputField.innerText;

                // Translate user input to recipient's language
                fetch(`${apiUrl}${encodeURIComponent(text)}&langpair=${userLang}|${recipientLang}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.responseData && data.responseData.translatedText) {
                            inputField.innerText = data.responseData.translatedText;
                        } else {
                            console.error('Translation API failed to return translated text.');
                        }
                    })
                    .catch(err => console.error('Error in translation:', err));
            });
        }
    });
});
