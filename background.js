async function translateText(text, targetLanguage) {
    const url = 'https://libretranslate.com/translate';

    const data = {
        q: text,
        source: 'auto',  // Automatically detect the source language
        target: targetLanguage,
        format: 'text'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result.translatedText;
    } catch (error) {
        console.error('Error translating text:', error);
    }
}

// Example usage
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "translate") {
        translateText(request.text, request.targetLang).then(translatedText => {
            sendResponse({ translatedText });
        });
        return true;  // Keep the message channel open for async response
    }
});
