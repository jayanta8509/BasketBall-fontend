class BasketballChatbot {
    constructor() {
        this.apiEndpoint = "https://arsalaanrasulbask.bestworks.cloud/api/v1/basketball/ask-question";
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.loadingIndicator = document.getElementById('loadingIndicator');

        this.initializeEventListeners();
        this.setupAutoResize();
    }

    initializeEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());

        // Send message on Enter key (without Shift)
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Focus input when page loads
        window.addEventListener('load', () => {
            this.messageInput.focus();
        });
    }

    setupAutoResize() {
        // Auto-resize input field for multi-line messages
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        });
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();

        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');

        // Clear input and reset height
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';

        // Disable input and send button
        this.setInputState(false);

        // Show loading indicator
        this.showLoading();

        try {
            // Call API
            const response = await this.callAPI(message);

            // Hide loading indicator
            this.hideLoading();

            // Add bot response to chat
            if (response.status === 'success' && response.answer) {
                this.addMessage(response.answer, 'bot');
            } else {
                this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
            }
        } catch (error) {
            console.error('API Error:', error);
            this.hideLoading();
            this.addMessage('Sorry, I\'m having trouble connecting. Please try again later.', 'bot');
        } finally {
            // Re-enable input and send button
            this.setInputState(true);
            this.messageInput.focus();
        }
    }

    async callAPI(question) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 180000); // 3 minutes timeout (extra 60s buffer)

        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: question,
                    user_id: this.getUserId()
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    getUserId() {
        // Try to get existing user_id from localStorage
        let userId = localStorage.getItem('basketball_chat_user_id');

        // If no user_id exists, create a new one
        if (!userId) {
            userId = this.generateUserId();
            localStorage.setItem('basketball_chat_user_id', userId);
        }

        return userId;
    }

    generateUserId() {
        // Generate a random user ID (similar format to the example)
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result + Math.floor(Math.random() * 100);
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = `message-avatar ${sender}-avatar`;
        avatar.textContent = sender === 'bot' ? '🏀' : '👤';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        // Convert markdown-like formatting to HTML
        const formattedContent = this.formatMessage(content);
        messageContent.innerHTML = formattedContent;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);

        this.chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        this.scrollToBottom();

        // Add animation
        setTimeout(() => {
            messageDiv.style.opacity = '1';
        }, 10);
    }

    formatMessage(content) {
        // Convert **bold** to <strong>
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Convert *italic* to <em>
        content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Convert newlines to <br>
        content = content.replace(/\n/g, '<br>');

        // Convert ### headers to smaller headers
        content = content.replace(/### (.*?)(<br>|$)/g, '<h4>$1</h4>');

        // Convert ## headers to smaller headers
        content = content.replace(/## (.*?)(<br>|$)/g, '<h3>$1</h3>');

        // Convert # headers to smaller headers
        content = content.replace(/# (.*?)(<br>|$)/g, '<h2>$1</h2>');

        // Convert - list items to bullet points
        content = content.replace(/^- (.*?)(<br>|$)/gm, '<li>$1</li>');

        // Wrap consecutive <li> in <ul>
        content = content.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');

        return content;
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showLoading() {
        this.loadingIndicator.classList.add('active');
    }

    hideLoading() {
        this.loadingIndicator.classList.remove('active');
    }

    setInputState(enabled) {
        this.messageInput.disabled = !enabled;
        this.sendButton.disabled = !enabled;

        if (enabled) {
            this.sendButton.style.cursor = 'pointer';
            this.messageInput.style.cursor = 'text';
        } else {
            this.sendButton.style.cursor = 'not-allowed';
            this.messageInput.style.cursor = 'not-allowed';
        }
    }
}

// Initialize the chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BasketballChatbot();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        document.getElementById('messageInput').focus();
    }
});