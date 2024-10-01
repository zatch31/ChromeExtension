// Function to detect and translate chat messages
async function translateMessage(message, targetLanguage) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURI(message)}`;
    try {
        let response = await fetch(url);
        let result = await response.json();
        return result[0][0][0];
    } catch (error) {
        console.error('Translation error:', error);
        return message;
    }
}

// Function to insert translation buttons into WhatsApp UI
function addTranslateButton() {
    const chatboxes = document.querySelectorAll('.message-in .selectable-text');

    chatboxes.forEach((chatbox) => {
        if (!chatbox.querySelector('.translate-button')) {
            let translateButton = document.createElement('button');
            translateButton.innerText = 'Translate';
            translateButton.className = 'translate-button';
            translateButton.style.marginLeft = '10px';

            // Attach click event to translate the message
            translateButton.addEventListener('click', async () => {
                const message = chatbox.innerText;
                const translatedText = await translateMessage(message, 'en'); // Default language: English
                chatbox.innerText = translatedText;
            });

            chatbox.appendChild(translateButton);
        }
    });
}

// Observer to track new messages
const observer = new MutationObserver(() => {
    addTranslateButton();
});

// Start observing the chat list for new messages
observer.observe(document.querySelector('body'), {
    childList: true,
    subtree: true
});
// Monitor input box for sending messages
document.querySelector('footer .selectable-text').addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const inputBox = event.target;
        const message = inputBox.innerText;

        // Get language preferences
        chrome.storage.sync.get(['inputLanguage', 'outputLanguage'], async (data) => {
            const translatedMessage = await translateMessage(message, data.outputLanguage);

            // Replace message with translated version
            inputBox.innerText = translatedMessage;
        });
    }
});
