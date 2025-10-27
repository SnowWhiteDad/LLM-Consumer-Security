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
const pdfUpload = document.getElementById('pdf-upload');
const loadSampleBtn = document.getElementById('load-sample');
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
 * Render the page
 */
function renderPage(num) {
    pageRendering = true;

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
 * Update button states
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
 * Load and display PDF
 */
function loadPDF(url) {
    const loadingTask = pdfjsLib.getDocument(url);

    loadingTask.promise.then(function(pdf) {
        pdfDoc = pdf;
        pageCountSpan.textContent = pdf.numPages;

        // Show controls and canvas
        pdfControls.style.display = 'flex';
        canvas.classList.add('active');
        placeholder.style.display = 'none';

        // Reset to first page
        pageNum = 1;
        renderPage(pageNum);
        updateButtons();
    }).catch(function(error) {
        console.error('Error loading PDF:', error);
        alert('Error loading PDF: ' + error.message);
    });
}

/**
 * Handle file upload
 */
pdfUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const typedArray = new Uint8Array(this.result);
            loadPDF(typedArray);
        };
        fileReader.readAsArrayBuffer(file);
    } else {
        alert('Please select a valid PDF file');
    }
});

/**
 * Load sample PDF - using a publicly available sample
 */
loadSampleBtn.addEventListener('click', function() {
    // Use a sample PDF from a CDN or create one
    // For now, we'll use a sample PDF from PDF.js examples
    const sampleURL = 'sample-article.pdf';

    // Check if sample exists, otherwise use an external sample
    fetch(sampleURL)
        .then(response => {
            if (response.ok) {
                loadPDF(sampleURL);
            } else {
                // Fallback to an external sample PDF
                loadPDF('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf');
            }
        })
        .catch(() => {
            // If local sample doesn't exist, use external
            loadPDF('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf');
        });
});

// Event listeners
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
    }
});
