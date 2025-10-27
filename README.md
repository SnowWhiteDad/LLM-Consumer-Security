# Reference Architecture for Securing Data Flows Across Enterprise AI Systems Consuming LLMs

A professional web application for viewing the reference architecture PDF document. Built with HTML, CSS, and JavaScript using Mozilla's PDF.js library, featuring a modern enterprise design with smooth animations.

## Features

- Automatic PDF loading on page load
- Page navigation (next/previous)
- Zoom controls (in/out)
- Keyboard navigation support (arrow keys, +/-)
- Smooth animations and transitions
- Professional blue and gray color scheme
- Responsive design for all devices
- Clean, modern enterprise UI

## Live Demo

Once deployed to GitHub Pages, this application will be available at:
`https://snowwhitedad.github.io/LLM-Consumer-Security/`

## Setup

To use this application, simply place your PDF document in the root directory with the filename:

```
document.pdf
```

The application will automatically load and display this PDF when the page loads.

## Navigation

- **Previous/Next Buttons**: Navigate through pages
- **Arrow Keys**: Use left/right or up/down arrow keys to navigate
- **Zoom Buttons**: Use +/- buttons to zoom in and out
- **Keyboard Zoom**: Press + or - keys to zoom

## Deploying to GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select the branch you want to deploy (e.g., `main` or `claude/create-web-app-011CUXBqwEtDdiFvjHFVfVLU`)
4. Click "Save"
5. Your site will be published at `https://snowwhitedad.github.io/LLM-Consumer-Security/`

## File Structure

```
.
├── index.html      # Main HTML page
├── styles.css      # Styling with animations and color theme
├── app.js          # PDF rendering and interaction logic
├── document.pdf    # Your PDF document (to be added)
└── README.md       # This file
```

## Technology Stack

- **HTML5**: Structure
- **CSS3**: Styling with gradients, animations, and responsive design
- **JavaScript (ES6)**: PDF rendering and interaction logic
- **PDF.js**: Mozilla's PDF rendering library (loaded via CDN)

## Design

The application features:
- Professional blue gradient color scheme (#1e3a8a to #3b82f6)
- Smooth fade-in and slide-in animations
- Hover effects with ripple animations
- Custom scrollbar styling
- Responsive design for mobile and desktop

## Browser Support

Works in all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript
- CSS3 Animations
- Fetch API

## Local Development

To run locally:

1. Clone the repository
2. Add your `document.pdf` file to the root directory
3. Open `index.html` in a web browser, or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```
4. Navigate to `http://localhost:8000`

## License

This project is open source and available under the MIT License.

## Credits

Built with [PDF.js](https://mozilla.github.io/pdf.js/) by Mozilla.
