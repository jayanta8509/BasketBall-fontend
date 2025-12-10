# Basketball Chatbot Interface

A modern, responsive chatbot interface for basketball-related queries. This frontend connects to the Basketball API to provide answers about basketball teams, divisions, and more.

## Features

- 🏀 **Basketball-themed Design**: Clean, modern interface with basketball colors and icons
- 💬 **Real-time Chat**: Send messages and receive responses from the basketball bot
- ⏳ **Loading State**: Visual feedback during API calls (handles 2-minute response times)
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ⌨️ **Keyboard Support**: Press Enter to send messages (Shift+Enter for new lines)
- 🎨 **Smooth Animations**: Polished UI with transitions and animations

## API Integration

The chatbot connects to:
```
POST https://nexusflowaimcp.bestworks.cloud/api/v1/basketball/ask-question
```

### Request Format:
```json
{
  "question": "Your basketball question here"
}
```

### Response Format:
```json
{
  "answer": "The answer to your question...",
  "status": "success",
  "code": 200,
  "question": "Your original question"
}
```

## Files Structure

```
BasketBall-fontend/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Getting Started

1. **Download/Clone** the files to your local machine
2. **Open `index.html`** in your web browser
3. **Start chatting** with the basketball bot!

### Quick Start:
```bash
# Option 1: Direct file opening
# Double-click index.html or open it in your browser

# Option 2: Local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000
```

## Usage

1. Type your basketball-related question in the input field
2. Press Enter or click the send button
3. Wait for the response (loading indicator will show during API calls)
4. The bot will respond with information about teams, divisions, schedules, etc.

## Features in Detail

### Loading State Handling
- Shows animated loading indicator during API calls
- Handles long response times (up to 2+ minutes)
- Disables input during API calls to prevent duplicate requests
- Timeout handling with 3-minute maximum wait time

### Message Formatting
- Supports **bold text** formatting
- Supports *italic text* formatting
- Supports headers (# ## ###)
- Supports bullet lists
- Automatic link detection and formatting

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for all screen sizes
- Smooth scrolling and animations

## Browser Support

- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

### Colors
Edit the CSS variables in `styles.css` to customize the theme:
```css
:root {
  --primary-color: #FF6B35;
  --secondary-color: #F72585;
  --user-message-color: #6366F1;
  /* Add more colors as needed */
}
```

### API Endpoint
Update the API endpoint in `script.js`:
```javascript
this.apiEndpoint = "your-api-endpoint-here";
```

### Timeout Duration
Adjust the timeout in `script.js`:
```javascript
const timeoutId = setTimeout(() => controller.abort(), 180000); // 3 minutes
```

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Check if the API endpoint is accessible
   - Verify network connectivity
   - Check browser console for CORS errors

2. **Slow Response Times**
   - The loading indicator shows during API calls
   - Maximum wait time is set to 3 minutes
   - You can adjust this timeout in the script

3. **Styling Issues**
   - Ensure all three files (HTML, CSS, JS) are in the same directory
   - Check browser compatibility
   - Clear browser cache if needed

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).