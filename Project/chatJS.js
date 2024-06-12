async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    input.value = '';
    if (message) {
        try {
            const chatBody = document.getElementById('chatBody');

                const userMessageContainer = document.createElement('div');
                userMessageContainer.className = 'user-message-container';
                const userMessage = document.createElement('div');
                userMessage.textContent = message;
                userMessage.className = 'user-message';
                userMessageContainer.appendChild(userMessage);
                chatBody.appendChild(userMessageContainer);


            const response = await fetch('http://127.0.0.1:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            const botResponseContainer = document.createElement('div');
            botResponseContainer.className = 'bot-response-container';
            const botResponse = document.createElement('div');
            botResponse.textContent = data; 
            botResponse.className = 'bot-response';
            botResponseContainer.appendChild(botResponse);
            chatBody.appendChild(botResponseContainer);

          // Scroll to bottom
          chatBody.scrollTop = chatBody.scrollHeight;

          // Clear input
          input.value = '';
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

document.getElementById('focusButton').addEventListener('click', function() {
    const chatBox = document.querySelector('.chat-box');
    const isMinimized = chatBox.classList.contains('minimized');
    
    if (isMinimized) {
        chatBox.classList.remove('minimized');
    }

    document.getElementById('chatInput').focus();
});

document.querySelector('.chat-header').addEventListener('click', function() {
    document.querySelector('.chat-box').classList.toggle('minimized');
});

document.getElementById('chatInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('modeResponseProcessed')) {
        return; // Exit the function if it has already run
    }
    const modeResponse = localStorage.getItem('modeResponse');
    if (modeResponse) {
        const data = JSON.parse(modeResponse);
        const chatBody = document.getElementById('chatBody');
           const botResponseContainer = document.createElement('div');
           botResponseContainer.className = 'bot-response-container';
           const botResponse = document.createElement('div');
           botResponse.textContent = data; 
           botResponse.className = 'bot-response';
           botResponseContainer.appendChild(botResponse);
           chatBody.appendChild(botResponseContainer);

        // Set a flag to indicate the response has been processed
        sessionStorage.setItem('modeResponseProcessed', 'true');
    } else {
        console.log('No mode response found in local storage.');
    }
});