// Animation manager
const AnimationManager = {
    init() {
        this.initTerminalControls();
        this.initLogsWindow();
        this.initPDFViewer();
        this.initPixelCats();
        this.initEBookReader();
        this.initMusicPlayer();
    },

    initTerminalControls() {
        const terminal = document.getElementById('terminal-container');
        const terminalIcon = document.getElementById('terminal-icon');
        const centerGif = document.getElementById('center-gif');
        const btnPrev = document.getElementById('btn-prev');
        const btnMinimize = document.getElementById('btn-minimize');
        const btnNext = document.getElementById('btn-next');

        btnPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            AsciiManager.prevAscii();
        });

        btnNext.addEventListener('click', (e) => {
            e.stopPropagation();
            AsciiManager.nextAscii();
        });

        btnMinimize.addEventListener('click', (e) => {
            e.stopPropagation();
            this.minimizeTerminal(terminal, centerGif, terminalIcon);
        });

        terminalIcon.addEventListener('click', () => {
            this.restoreTerminal(terminal, centerGif, terminalIcon);
        });
    },

    minimizeTerminal(terminal, centerGif, terminalIcon) {
        terminal.classList.add('minimized');

        setTimeout(() => {
            centerGif.classList.add('active');
        }, 300);

        setTimeout(() => {
            terminal.style.display = 'none';
            terminalIcon.classList.add('active');
        }, 1400);
    },

    restoreTerminal(terminal, centerGif, terminalIcon) {
        centerGif.classList.add('hiding');

        setTimeout(() => {
            centerGif.classList.remove('active', 'hiding');
            centerGif.style.display = 'none';
        }, 500);

        setTimeout(() => {
            terminal.style.display = 'block';
            terminal.classList.remove('minimized');
            terminal.classList.add('restoring');
            terminalIcon.classList.remove('active');

            setTimeout(() => {
                terminal.classList.remove('restoring');
            }, 1400);
        }, 200);
    },

    initLogsWindow() {
        const logsIcon = document.getElementById('logs-icon');
        const logsContainer = document.getElementById('logs-container');
        const logsClose = document.getElementById('logs-close');

        logsIcon.addEventListener('click', async () => {
            logsContainer.classList.add('active');
            document.body.style.overflow = 'hidden';
            await LogManager.loadLogs();
        });

        logsClose.addEventListener('click', () => {
            logsContainer.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        logsContainer.addEventListener('click', (e) => {
            if (e.target === logsContainer) {
                logsContainer.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && logsContainer.classList.contains('active')) {
                logsContainer.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    },

    initPDFViewer() {
        const resumeLink = document.getElementById('resume-link');
        const pdfModal = document.getElementById('pdf-modal');
        const pdfClose = document.getElementById('pdf-close');
        const pdfIframe = document.getElementById('pdf-iframe');
        const pdfPath = 'assets/pdf/resume.pdf'; // Fixed path

        if (resumeLink && pdfModal) {
            resumeLink.addEventListener('click', (e) => {
                e.preventDefault();
                pdfIframe.src = pdfPath;
                pdfModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            pdfClose.addEventListener('click', () => {
                pdfModal.classList.remove('active');
                pdfIframe.src = '';
                document.body.style.overflow = 'auto';
            });

            pdfModal.addEventListener('click', (e) => {
                if (e.target === pdfModal) {
                    pdfModal.classList.remove('active');
                    pdfIframe.src = '';
                    document.body.style.overflow = 'auto';
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
                    pdfModal.classList.remove('active');
                    pdfIframe.src = '';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    },

    initPixelCats() {
        const catsContainer = document.createElement('div');
        catsContainer.className = 'pixel-cats-container';

        const catCount = 3;

        for (let i = 0; i < catCount; i++) {
            const cat = document.createElement('div');
            cat.className = `pixel-cat cat-${i + 1}`;
            cat.innerHTML = this.getSpaceCatSVG(i);
            catsContainer.appendChild(cat);
        }

        document.body.appendChild(catsContainer);
        console.log('Space cats created!');
    },

    getSpaceCatSVG(catType) {
        const spaceCats = [
            // Space Cat 1 - Orange Tabby with Helmet
            `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <!-- Space Helmet -->
                <circle cx="20" cy="18" r="14" fill="none" stroke="#a0d2ff" stroke-width="2" stroke-dasharray="2 1" opacity="0.8"/>
                <circle cx="20" cy="18" r="12" fill="none" stroke="#a0d2ff" stroke-width="1" opacity="0.6"/>
                
                <!-- Helmet Reflection -->
                <path d="M 12,12 Q 20,8 28,12" stroke="#ffffff" stroke-width="1" fill="none" opacity="0.3"/>
                
                <!-- Body -->
                <rect x="14" y="22" width="12" height="8" fill="#ff8c00"/>
                <!-- Head -->
                <rect x="12" y="16" width="10" height="8" fill="#ff8c00"/>
                <!-- Ears -->
                <rect x="12" y="14" width="4" height="4" fill="#ff8c00"/>
                <rect x="18" y="14" width="4" height="4" fill="#ff8c00"/>
                <rect x="14" y="12" width="2" height="2" fill="#ff4500"/>
                <rect x="20" y="12" width="2" height="2" fill="#ff4500"/>
                <!-- Eyes -->
                <rect x="14" y="18" width="2" height="2" fill="#000"/>
                <rect x="18" y="18" width="2" height="2" fill="#000"/>
                <!-- Visor Reflection -->
                <rect x="15" y="17" width="1" height="1" fill="#a0d2ff" opacity="0.5"/>
                <rect x="19" y="17" width="1" height="1" fill="#a0d2ff" opacity="0.5"/>
                <!-- Nose -->
                <rect x="17" y="20" width="2" height="1" fill="#ff69b4"/>
                <!-- Mouth -->
                <rect x="16" y="22" width="4" height="1" fill="#000"/>
                <!-- Tail -->
                <rect x="24" y="24" width="8" height="2" fill="#ff8c00"/>
                <!-- Legs -->
                <rect x="14" y="30" width="2" height="4" fill="#ff8c00"/>
                <rect x="18" y="30" width="2" height="4" fill="#ff8c00"/>
                <rect x="22" y="30" width="2" height="4" fill="#ff8c00"/>
                <!-- Oxygen Tank -->
                <rect x="8" y="20" width="3" height="8" fill="#666"/>
                <rect x="7" y="19" width="5" height="1" fill="#888"/>
                <rect x="7" y="28" width="5" height="1" fill="#888"/>
            </svg>`,

            // Space Cat 2 - Gray Cat with Helmet
            `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <!-- Space Helmet -->
                <circle cx="20" cy="18" r="14" fill="none" stroke="#a0d2ff" stroke-width="2" stroke-dasharray="2 1" opacity="0.8"/>
                <circle cx="20" cy="18" r="12" fill="none" stroke="#a0d2ff" stroke-width="1" opacity="0.6"/>
                
                <!-- Helmet Reflection -->
                <path d="M 12,12 Q 20,8 28,12" stroke="#ffffff" stroke-width="1" fill="none" opacity="0.3"/>
                
                <!-- Body -->
                <rect x="16" y="20" width="10" height="10" fill="#a9a9a9"/>
                <!-- Head -->
                <rect x="14" y="14" width="8" height="8" fill="#a9a9a9"/>
                <!-- Ears -->
                <rect x="14" y="12" width="3" height="4" fill="#a9a9a9"/>
                <rect x="19" y="12" width="3" height="4" fill="#a9a9a9"/>
                <rect x="16" y="10" width="1" height="2" fill="#696969"/>
                <rect x="21" y="10" width="1" height="2" fill="#696969"/>
                <!-- Eyes -->
                <rect x="16" y="16" width="2" height="2" fill="#000"/>
                <rect x="18" y="16" width="2" height="2" fill="#000"/>
                <!-- Visor Reflection -->
                <rect x="17" y="15" width="1" height="1" fill="#a0d2ff" opacity="0.5"/>
                <rect x="19" y="15" width="1" height="1" fill="#a0d2ff" opacity="0.5"/>
                <!-- Nose -->
                <rect x="17" y="18" width="2" height="1" fill="#ffb6c1"/>
                <!-- Mouth -->
                <rect x="16" y="20" width="4" height="1" fill="#000"/>
                <!-- Tail -->
                <rect x="24" y="22" width="10" height="2" fill="#a9a9a9"/>
                <!-- Legs -->
                <rect x="16" y="30" width="2" height="4" fill="#a9a9a9"/>
                <rect x="20" y="30" width="2" height="4" fill="#a9a9a9"/>
                <rect x="24" y="30" width="2" height="4" fill="#a9a9a9"/>
                <!-- Oxygen Tank -->
                <rect x="28" y="18" width="3" height="8" fill="#666"/>
                <rect x="27" y="17" width="5" height="1" fill="#888"/>
                <rect x="27" y="26" width="5" height="1" fill="#888"/>
            </svg>`,

            // Space Cat 3 - Black Cat with Helmet
            `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <!-- Space Helmet -->
                <circle cx="20" cy="18" r="14" fill="none" stroke="#a0d2ff" stroke-width="2" stroke-dasharray="2 1" opacity="0.8"/>
                <circle cx="20" cy="18" r="12" fill="none" stroke="#a0d2ff" stroke-width="1" opacity="0.6"/>
                
                <!-- Helmet Reflection -->
                <path d="M 12,12 Q 20,8 28,12" stroke="#ffffff" stroke-width="1" fill="none" opacity="0.3"/>
                
                <!-- Body -->
                <rect x="14" y="22" width="12" height="8" fill="#2f2f2f"/>
                <!-- Head -->
                <rect x="12" y="16" width="10" height="8" fill="#2f2f2f"/>
                <!-- Ears -->
                <rect x="12" y="14" width="4" height="4" fill="#2f2f2f"/>
                <rect x="18" y="14" width="4" height="4" fill="#2f2f2f"/>
                <rect x="14" y="12" width="2" height="2" fill="#000"/>
                <rect x="20" y="12" width="2" height="2" fill="#000"/>
                <!-- Eyes -->
                <rect x="14" y="18" width="2" height="2" fill="#ffd700"/>
                <rect x="18" y="18" width="2" height="2" fill="#ffd700"/>
                <!-- Visor Reflection -->
                <rect x="15" y="17" width="1" height="1" fill="#a0d2ff" opacity="0.5"/>
                <rect x="19" y="17" width="1" height="1" fill="#a0d2ff" opacity="0.5"/>
                <!-- Nose -->
                <rect x="17" y="20" width="2" height="1" fill="#ff69b4"/>
                <!-- Mouth -->
                <rect x="16" y="22" width="4" height="1" fill="#fff"/>
                <!-- Tail -->
                <rect x="24" y="24" width="8" height="2" fill="#2f2f2f"/>
                <!-- Legs -->
                <rect x="14" y="30" width="2" height="4" fill="#2f2f2f"/>
                <rect x="18" y="30" width="2" height="4" fill="#2f2f2f"/>
                <rect x="22" y="30" width="2" height="4" fill="#2f2f2f"/>
                <!-- White paws -->
                <rect x="14" y="34" width="2" height="2" fill="#fff"/>
                <rect x="18" y="34" width="2" height="2" fill="#fff"/>
                <rect x="22" y="34" width="2" height="2" fill="#fff"/>
                <!-- Oxygen Tank -->
                <rect x="8" y="20" width="3" height="8" fill="#666"/>
                <rect x="7" y="19" width="5" height="1" fill="#888"/>
                <rect x="7" y="28" width="5" height="1" fill="#888"/>
            </svg>`
        ];

        return spaceCats[catType] || spaceCats[0];
    },

    // Fixed eBook Reader with proper PDF viewing
    initEBookReader() {
        const bookshelf = document.querySelector('.bookshelf-container');
        const ebookModal = document.getElementById('ebook-modal');
        const ebookClose = document.querySelector('.ebook-close');
        const backToLibrary = document.querySelector('.back-to-library');

        if (!bookshelf || !ebookModal || !ebookClose || !backToLibrary) {
            console.log('eBook elements not found, skipping eBook initialization');
            return;
        }

        // Event listeners for modal
        bookshelf.addEventListener('click', () => {
            ebookModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        ebookClose.addEventListener('click', () => {
            ebookModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        backToLibrary.addEventListener('click', () => {
            this.showEBookLibrary();
        });

        ebookModal.addEventListener('click', (e) => {
            if (e.target === ebookModal) {
                ebookModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Book click handlers
        this.initEBookLibrary();
    },

    initEBookLibrary() {
        const bookItems = document.querySelectorAll('.book-item');
        
        bookItems.forEach(book => {
            book.addEventListener('click', () => {
                const pdfPath = book.getAttribute('data-pdf');
                const title = book.getAttribute('data-title');
                this.openEBook(pdfPath, title);
            });
        });
    },

    openEBook(pdfPath, title) {
        const ebookLibrary = document.getElementById('ebook-library');
        const bookReader = document.getElementById('book-reader');
        const readerTitle = document.getElementById('reader-title');
        const pdfViewer = document.getElementById('pdf-viewer');

        if (!ebookLibrary || !bookReader || !readerTitle || !pdfViewer) {
            console.error('eBook reader elements not found');
            return;
        }

        // Show reader, hide library
        ebookLibrary.style.display = 'none';
        bookReader.classList.add('active');
        readerTitle.textContent = title;

        // Load PDF in iframe
        pdfViewer.src = pdfPath;

        // Initialize page navigation
        this.initEBookNavigation();
    },

    initEBookNavigation() {
        const prevPageBtn = document.getElementById('prev-page');
        const nextPageBtn = document.getElementById('next-page');
        const currentPageSpan = document.getElementById('current-page');
        const totalPagesSpan = document.getElementById('total-pages');

        if (!prevPageBtn || !nextPageBtn) return;

        let currentPage = 1;
        
        // Simple page navigation for demo
        prevPageBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                currentPageSpan.textContent = currentPage;
                // In a real implementation, you'd use PDF.js to navigate pages
            }
        };

        nextPageBtn.onclick = () => {
            currentPage++;
            currentPageSpan.textContent = currentPage;
            // In a real implementation, you'd use PDF.js to navigate pages
        };

        // Set initial values
        currentPageSpan.textContent = currentPage;
        totalPagesSpan.textContent = '?'; // Unknown without PDF.js
    },

    showEBookLibrary() {
        const ebookLibrary = document.getElementById('ebook-library');
        const bookReader = document.getElementById('book-reader');
        const pdfViewer = document.getElementById('pdf-viewer');

        if (ebookLibrary) ebookLibrary.style.display = 'grid';
        if (bookReader) bookReader.classList.remove('active');
        if (pdfViewer) pdfViewer.src = '';
    },

    // Music Player initialization
    initMusicPlayer() {
        const musicPlayer = document.querySelector('.music-player-container');
        const musicModal = document.getElementById('music-modal');
        const musicClose = document.querySelector('.music-close');

        if (!musicPlayer || !musicModal || !musicClose) {
            console.log('Music player elements not found, skipping music initialization');
            return;
        }

        // Basic music player functionality
        musicPlayer.addEventListener('click', () => {
            musicModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        musicClose.addEventListener('click', () => {
            musicModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        musicModal.addEventListener('click', (e) => {
            if (e.target === musicModal) {
                musicModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Initialize playlist
        this.initMusicPlaylist();
    },

    initMusicPlaylist() {
        const playlistItems = document.querySelectorAll('.playlist-item');
        const audioPlayer = document.getElementById('audio-player');
        const playBtn = document.getElementById('play-btn');
        const nowPlayingTitle = document.getElementById('now-playing-title');
        const nowPlayingArtist = document.getElementById('now-playing-artist');

        if (!playlistItems.length || !audioPlayer || !playBtn) return;

        playlistItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                const title = item.querySelector('.track-title').textContent;
                const artist = item.querySelector('.track-artist').textContent;

                // Update active state
                playlistItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Set audio source and play
                audioPlayer.src = src;
                nowPlayingTitle.textContent = title;
                nowPlayingArtist.textContent = artist;

                // Play audio
                audioPlayer.play();
                playBtn.textContent = '⏸';
            });
        });

        // Play/Pause button
        playBtn.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playBtn.textContent = '⏸';
            } else {
                audioPlayer.pause();
                playBtn.textContent = '▶';
            }
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    AnimationManager.init();
});

// eBook functionality
document.addEventListener('DOMContentLoaded', function() {
    const ebookModal = document.getElementById('ebook-modal');
    const bookReader = document.getElementById('book-reader');
    const pdfViewer = document.getElementById('pdf-viewer');
    const readerTitle = document.getElementById('reader-title');
    const backToLibraryBtn = document.querySelector('.back-to-library');
    const ebookCloseBtn = document.querySelector('.ebook-close');
    const bookshelfContainer = document.querySelector('.bookshelf-container');
    
    // Tab functionality
    const categoryBtns = document.querySelectorAll('.category-btn');
    const ebookLibraries = document.querySelectorAll('.ebook-library');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding library
            ebookLibraries.forEach(lib => {
                lib.classList.remove('active');
                if (lib.id === `${category}-library`) {
                    lib.classList.add('active');
                }
            });
        });
    });
    
    // Open eBook modal
    bookshelfContainer.addEventListener('click', function() {
        ebookModal.classList.add('active');
    });
    
    // Close eBook modal
    ebookCloseBtn.addEventListener('click', function() {
        ebookModal.classList.remove('active');
        bookReader.classList.remove('active');
    });
    
    // Back to library from reader
    backToLibraryBtn.addEventListener('click', function() {
        bookReader.classList.remove('active');
    });
    
    // Book item click handler
    document.querySelectorAll('.book-item').forEach(book => {
        book.addEventListener('click', function() {
            const pdfPath = this.getAttribute('data-pdf');
            const title = this.getAttribute('data-title');
            const author = this.getAttribute('data-author');
            
            if (pdfPath) {
                // Show the book reader
                bookReader.classList.add('active');
                readerTitle.textContent = title;
                
                // Load the PDF
                pdfViewer.src = pdfPath;
                
                // Add loading state
                pdfViewer.classList.add('loading');
                
                pdfViewer.onload = function() {
                    pdfViewer.classList.remove('loading');
                };
                
                pdfViewer.onerror = function() {
                    pdfViewer.classList.remove('loading');
                    pdfViewer.src = 'about:blank';
                    pdfViewer.innerHTML = `
                        <div style="display: flex; justify-content: center; align-items: center; height: 100%; flex-direction: column; color: #666;">
                            <div style="font-size: 18px; margin-bottom: 10px;">PDF Not Found</div>
                            <div style="font-size: 12px;">Unable to load: ${title}</div>
                            <div style="font-size: 10px; margin-top: 5px;">Path: ${pdfPath}</div>
                        </div>
                    `;
                };
            } else {
                // Show message for books without PDF
                bookReader.classList.add('active');
                readerTitle.textContent = title;
                pdfViewer.src = 'about:blank';
                pdfViewer.innerHTML = `
                    <div style="display: flex; justify-content: center; align-items: center; height: 100%; flex-direction: column; color: #666;">
                        <div style="font-size: 18px; margin-bottom: 10px;">No PDF Available</div>
                        <div style="font-size: 12px;">${title} by ${author}</div>
                        <div style="font-size: 10px; margin-top: 10px;">This book doesn't have a PDF version yet.</div>
                    </div>
                `;
            }
        });
    });
    
    // PDF navigation controls
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');
    
    // Simple PDF navigation (for basic iframe PDF viewing)
    let currentPage = 1;
    
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updatePdfPage();
        }
    });
    
    nextPageBtn.addEventListener('click', function() {
        currentPage++;
        updatePdfPage();
    });
    
    function updatePdfPage() {
        // This is a simple implementation for iframe PDF viewing
        // For full PDF.js implementation, you'd need more complex code
        currentPageSpan.textContent = currentPage;
        
        // Note: This basic page navigation might not work with all PDF viewers
        // For proper PDF navigation, consider integrating PDF.js
    }
    
    // Close modal when clicking outside
    ebookModal.addEventListener('click', function(e) {
        if (e.target === ebookModal) {
            ebookModal.classList.remove('active');
            bookReader.classList.remove('active');
        }
    });
});

