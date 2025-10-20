// ebook.js - PDF Viewer Implementation

// PDF.js worker configuration
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// State management
let currentPdfDoc = null;
let currentPageNum = 1;
let totalPages = 0;
let pageRendering = false;
let pageNumPending = null;
let currentScale = 1.5;
let currentPdfUrl = '';
let currentBookTitle = '';

// DOM Elements
const ebookModal = document.getElementById('ebook-modal');
const bookshelfContainer = document.querySelector('.bookshelf-container');
const ebookClose = document.querySelector('.ebook-close');
const backToLibrary = document.querySelector('.back-to-library');
const bookReader = document.getElementById('book-reader');
const pdfCanvas = document.getElementById('pdf-canvas');
const pdfContext = pdfCanvas.getContext('2d');
const pdfLoading = document.getElementById('pdf-loading');
const readerTitle = document.getElementById('reader-title');
const currentPageSpan = document.getElementById('current-page');
const totalPagesSpan = document.getElementById('total-pages');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');

// Create and insert back button in reader header
const readerHeader = document.querySelector('.reader-header');
const readerBackBtn = document.createElement('button');
readerBackBtn.className = 'reader-back-btn';
readerBackBtn.innerHTML = '← Back to Library';
readerBackBtn.addEventListener('click', () => {
    closePdfReader();
    showLibrary();
});
readerHeader.insertBefore(readerBackBtn, readerTitle);

// Create download control
const readerControlsExtra = document.querySelector('.reader-controls');
const downloadControl = document.createElement('div');
downloadControl.className = 'download-control';
downloadControl.innerHTML = `
    <button class="reader-btn download-btn" id="download-pdf" title="Download PDF">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>
        <span class="download-text">Download</span>
    </button>
`;
readerControlsExtra.appendChild(downloadControl);

// Get download button after it's added to DOM
const downloadBtn = document.getElementById('download-pdf');

// Download functionality
downloadBtn.addEventListener('click', async () => {
    try {
        downloadBtn.disabled = true;
        const originalHTML = downloadBtn.innerHTML;
        
        downloadBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="spinning">
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
            </svg>
        `;
        
        const response = await fetch(currentPdfUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentBookTitle}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = originalHTML;
    } catch (error) {
        console.error('Download error:', error);
        alert('Failed to download PDF. Please try again.');
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            <span class="download-text">Download</span>
        `;
    }
});

// Category buttons
const categoryBtns = document.querySelectorAll('.category-btn');
const readingLibrary = document.getElementById('reading-library');
const writingLibrary = document.getElementById('writing-library');

// Open modal when bookshelf is clicked
bookshelfContainer.addEventListener('click', () => {
    ebookModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close modal
ebookClose.addEventListener('click', closeModal);
ebookModal.addEventListener('click', (e) => {
    if (e.target === ebookModal) {
        closeModal();
    }
});

function closeModal() {
    ebookModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    closePdfReader();
}

// Back to library
backToLibrary.addEventListener('click', () => {
    closePdfReader();
    showLibrary();
});

function closePdfReader() {
    bookReader.classList.remove('active');
    backToLibrary.style.display = 'none';
    if (currentPdfDoc) {
        currentPdfDoc.destroy();
        currentPdfDoc = null;
    }
}

function showLibrary() {
    // Show the category navigation
    document.querySelector('.ebook-categories-nav').style.display = 'flex';
    
    // Determine which category is currently active
    const activeBtn = document.querySelector('.category-btn.active');
    const activeCategory = activeBtn ? activeBtn.dataset.category : 'reading';
    
    // Hide all libraries first
    document.querySelectorAll('.ebook-library').forEach(lib => {
        lib.classList.remove('active');
        lib.style.display = 'none';
    });
    
    // Show the correct library based on active category
    if (activeCategory === 'reading') {
        readingLibrary.classList.add('active');
        readingLibrary.style.display = 'grid';
    } else {
        writingLibrary.classList.add('active');
        writingLibrary.style.display = 'grid';
    }
}

// Category switching
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Hide all libraries first
        readingLibrary.classList.remove('active');
        writingLibrary.classList.remove('active');
        readingLibrary.style.display = 'none';
        writingLibrary.style.display = 'none';
        
        // Show corresponding library
        const category = btn.dataset.category;
        if (category === 'reading') {
            readingLibrary.classList.add('active');
            readingLibrary.style.display = 'grid';
        } else {
            writingLibrary.classList.add('active');
            writingLibrary.style.display = 'grid';
        }
    });
});

// Book item click handlers
document.querySelectorAll('.book-item').forEach(item => {
    item.addEventListener('click', () => {
        const pdfSrc = item.dataset.pdf;
        const title = item.dataset.title;
        openPdfReader(pdfSrc, title);
    });
});

// Open PDF reader
async function openPdfReader(pdfSrc, title) {
    bookReader.classList.add('active');
    backToLibrary.style.display = 'block';
    readerTitle.textContent = title;
    pdfLoading.style.display = 'flex';
    
    // Store current PDF info
    currentPdfUrl = pdfSrc;
    currentBookTitle = title;
    
    // Hide the library grids and category nav
    readingLibrary.style.display = 'none';
    writingLibrary.style.display = 'none';
    document.querySelector('.ebook-categories-nav').style.display = 'none';
    
    try {
        // Load PDF
        const loadingTask = pdfjsLib.getDocument(pdfSrc);
        currentPdfDoc = await loadingTask.promise;
        totalPages = currentPdfDoc.numPages;
        currentPageNum = 1;
        
        // Update UI
        totalPagesSpan.textContent = totalPages;
        currentPageSpan.textContent = currentPageNum;
        
        // Render first page
        await renderPage(currentPageNum);
        
        pdfLoading.style.display = 'none';
    } catch (error) {
        console.error('Error loading PDF:', error);
        pdfLoading.innerHTML = '<div style="color: #ff6b6b;">Error loading PDF. Please try again.</div>';
    }
}

// Render page
async function renderPage(num) {
    pageRendering = true;
    
    try {
        const page = await currentPdfDoc.getPage(num);
        
        // Calculate scale to fit canvas
        const viewport = page.getViewport({ scale: currentScale });
        
        // Set canvas dimensions
        pdfCanvas.height = viewport.height;
        pdfCanvas.width = viewport.width;
        
        // Render PDF page
        const renderContext = {
            canvasContext: pdfContext,
            viewport: viewport
        };
        
        await page.render(renderContext).promise;
        
        pageRendering = false;
        
        // Update page number display
        currentPageSpan.textContent = num;
        
        // Update button states
        prevPageBtn.disabled = num <= 1;
        nextPageBtn.disabled = num >= totalPages;
        
        // If there's a pending page render, do it now
        if (pageNumPending !== null) {
            renderPage(pageNumPending);
            pageNumPending = null;
        }
    } catch (error) {
        console.error('Error rendering page:', error);
        pageRendering = false;
    }
}

// Queue page render
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

// Previous page
prevPageBtn.addEventListener('click', () => {
    if (currentPageNum <= 1) return;
    currentPageNum--;
    queueRenderPage(currentPageNum);
});

// Next page
nextPageBtn.addEventListener('click', () => {
    if (currentPageNum >= totalPages) return;
    currentPageNum++;
    queueRenderPage(currentPageNum);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!bookReader.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentPageNum > 1) {
            currentPageNum--;
            queueRenderPage(currentPageNum);
        }
    } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentPageNum < totalPages) {
            currentPageNum++;
            queueRenderPage(currentPageNum);
        }
    } else if (e.key === 'Escape') {
        e.preventDefault();
        if (bookReader.classList.contains('active')) {
            closePdfReader();
        } else {
            closeModal();
        }
    }
});

// Zoom controls (optional enhancement)
let zoomLevel = 1.5;

document.addEventListener('wheel', (e) => {
    if (!bookReader.classList.contains('active')) return;
    if (!e.ctrlKey && !e.metaKey) return;
    
    e.preventDefault();
    
    if (e.deltaY < 0) {
        // Zoom in
        currentScale = Math.min(currentScale + 0.1, 3);
    } else {
        // Zoom out
        currentScale = Math.max(currentScale - 0.1, 0.5);
    }
    
    updateZoomLevel();
    queueRenderPage(currentPageNum);
}, { passive: false });

// Responsive canvas sizing
function updateCanvasSize() {
    if (currentPdfDoc && bookReader.classList.contains('active')) {
        queueRenderPage(currentPageNum);
    }
}

window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(updateCanvasSize, 250);
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

pdfCanvas.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

pdfCanvas.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next page
            if (currentPageNum < totalPages) {
                currentPageNum++;
                queueRenderPage(currentPageNum);
            }
        } else {
            // Swipe right - previous page
            if (currentPageNum > 1) {
                currentPageNum--;
                queueRenderPage(currentPageNum);
            }
        }
    }
}

console.log('eBook reader initialized successfully');