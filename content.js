// Example to detect messages and send them for translation
const messages = document.querySelectorAll('.message-text');  // WhatsApp message class selector

messages.forEach(message => {
    const text = message.innerText;

    // Send the message to background for translation
    chrome.runtime.sendMessage({
        action: "translate",
        text: text,
        targetLang: "es"  // Example target language: Spanish
    }, (response) => {
        if (response.translatedText) {
            // Replace message text with translated text
            message.innerText = response.translatedText;
        }
    });
});
