// PDF.js worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// State management
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.5;

// Get DOM elements
const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageNumSpan = document.getElementById('page-num');
const pageCountSpan = document.getElementById('page-count');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');
const zoomLevelSpan = document.getElementById('zoom-level');
const pdfControls = document.getElementById('pdf-controls');
const placeholder = document.querySelector('.placeholder');

/**
 * Render the page with smooth transition
 */
function renderPage(num) {
    pageRendering = true;

    // Add loading class
    canvas.classList.add('loading');

    pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        const renderTask = page.render(renderContext);

        renderTask.promise.then(function() {
            pageRendering = false;
            canvas.classList.remove('loading');

            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });

    // Update page counters
    pageNumSpan.textContent = num;
}

/**
 * Queue page rendering if another page is being rendered
 */
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

/**
 * Show previous page
 */
function onPrevPage() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
    updateButtons();
}

/**
 * Show next page
 */
function onNextPage() {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
    updateButtons();
}

/**
 * Update button states with smooth transitions
 */
function updateButtons() {
    prevPageBtn.disabled = pageNum <= 1;
    nextPageBtn.disabled = pageNum >= pdfDoc.numPages;
}

/**
 * Zoom in
 */
function onZoomIn() {
    scale += 0.25;
    if (scale > 3) scale = 3;
    zoomLevelSpan.textContent = Math.round(scale * 100) + '%';
    queueRenderPage(pageNum);
}

/**
 * Zoom out
 */
function onZoomOut() {
    scale -= 0.25;
    if (scale < 0.5) scale = 0.5;
    zoomLevelSpan.textContent = Math.round(scale * 100) + '%';
    queueRenderPage(pageNum);
}

/**
 * Load and display PDF with smooth animations
 */
function loadPDF(url) {
    const loadingTask = pdfjsLib.getDocument(url);

    loadingTask.promise.then(function(pdf) {
        pdfDoc = pdf;
        pageCountSpan.textContent = pdf.numPages;

        // Smooth transition: hide placeholder, show controls and canvas
        setTimeout(() => {
            placeholder.style.display = 'none';
            pdfControls.style.display = 'flex';
            canvas.classList.add('active');
        }, 300);

        // Reset to first page
        pageNum = 1;
        renderPage(pageNum);
        updateButtons();
    }).catch(function(error) {
        console.error('Error loading PDF:', error);
        placeholder.querySelector('p').textContent = 'Error loading document: ' + error.message;
        placeholder.classList.remove('loading');
    });
}

/**
 * Auto-load PDF on page load
 * The PDF file should be named 'document.pdf' and placed in the root directory
 */
function autoLoadPDF() {
    // Name of the PDF file in the root directory
    const pdfFileName = 'document.pdf';

    // Start loading animation
    placeholder.classList.add('loading');

    // Load the PDF
    loadPDF(pdfFileName);
}

// Event listeners for navigation
prevPageBtn.addEventListener('click', onPrevPage);
nextPageBtn.addEventListener('click', onNextPage);
zoomInBtn.addEventListener('click', onZoomIn);
zoomOutBtn.addEventListener('click', onZoomOut);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (!pdfDoc) return;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        onPrevPage();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        onNextPage();
    } else if (e.key === '+' || e.key === '=') {
        onZoomIn();
    } else if (e.key === '-' || e.key === '_') {
        onZoomOut();
    }
});

// Auto-load PDF when page loads
window.addEventListener('DOMContentLoaded', autoLoadPDF);
