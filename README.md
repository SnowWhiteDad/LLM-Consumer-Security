# PDF Article Viewer

A simple, elegant web application for viewing PDF documents online. Built with HTML, CSS, and JavaScript using Mozilla's PDF.js library.

## Features

- Upload and view PDF documents
- Page navigation (next/previous)
- Zoom controls (in/out)
- Keyboard navigation support (arrow keys)
- Responsive design
- Clean, modern UI

## Live Demo

Once deployed to GitHub Pages, this application will be available at:
`https://[your-username].github.io/[repository-name]/`

## Usage

1. **Upload a PDF**: Click the "Choose PDF File" button to upload any PDF document from your computer
2. **Load Sample**: Click "Load Sample Article" to view a demo PDF
3. **Navigate**: Use the Previous/Next buttons or arrow keys to navigate through pages
4. **Zoom**: Use the +/- buttons to zoom in and out

## Adding Your Own Sample PDF

To add your own sample PDF article:

1. Add a PDF file named `sample-article.pdf` to the root directory of this repository
2. The "Load Sample Article" button will automatically load this file
3. Commit and push the changes

## Deploying to GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select the branch you want to deploy (e.g., `main` or `claude/create-web-app-011CUXBqwEtDdiFvjHFVfVLU`)
4. Click "Save"
5. Your site will be published at `https://[your-username].github.io/[repository-name]/`

## Technology Stack

- **HTML5**: Structure
- **CSS3**: Styling with modern gradients and responsive design
- **JavaScript (ES6)**: PDF rendering logic
- **PDF.js**: Mozilla's PDF rendering library (loaded via CDN)

## Browser Support

Works in all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript
- Fetch API

## Local Development

To run locally:

1. Clone the repository
2. Open `index.html` in a web browser
3. Or use a local server (recommended):
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```

## License

This project is open source and available under the MIT License.

## Credits

Built with [PDF.js](https://mozilla.github.io/pdf.js/) by Mozilla.
