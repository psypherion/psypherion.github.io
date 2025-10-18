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
        const pdfPath = '/path/to/your-resume.pdf';

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

    // PDF.js integration for eBook reader
    initEBookReader() {
        // Check if bookshelf element exists
        const bookshelf = document.querySelector('.bookshelf-container');
        if (!bookshelf) {
            console.error('Bookshelf container not found!');
            return;
        }

        const ebookModal = document.getElementById('ebook-modal');
        const ebookClose = document.querySelector('.ebook-close');
        const backToLibrary = document.querySelector('.back-to-library');
        const ebookLibrary = document.getElementById('ebook-library');
        const bookReader = document.getElementById('book-reader');

        // Check if required elements exist
        if (!ebookModal || !ebookClose || !backToLibrary || !ebookLibrary || !bookReader) {
            console.error('Required eBook elements not found!');
            return;
        }
        
        // PDF.js configuration
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        } else {
            console.error('PDF.js library not loaded!');
        }
        
        // Load PDF books from assets/pdf/ directory
        this.pdfBooks = [
            {
                id: 1,
                title: "JavaScript Guide",
                author: "Mozilla Foundation",
                filename: "javascript-guide.pdf",
                color: "#000000ff"
            },
            {
                id: 2,
                title: "CSS Handbook",
                author: "Web Standards",
                filename: "css-handbook.pdf",
                color: "#4ECDC4"
            },
            {
                id: 3,
                title: "HTML5 Reference",
                author: "W3C Consortium",
                filename: "html5-reference.pdf",
                color: "#FFE66D"
            },
            {
                id: 4,
                title: "React Tutorial",
                author: "Facebook Open Source",
                filename: "react-tutorial.pdf",
                color: "#95E1D3"
            },
            {
                id: 5,
                title: "Node.js Guide",
                author: "Node.js Foundation",
                filename: "nodejs-guide.pdf",
                color: "#F8B195"
            },
            {
                id: 6,
                title: "Python Basics",
                author: "Python Software",
                filename: "python-basics.pdf",
                color: "#6A89CC"
            }
        ];

        // Initialize library
        this.initLibrary(this.pdfBooks, ebookLibrary);

        // Event listeners
        bookshelf.addEventListener('click', () => {
            console.log('Bookshelf clicked!');
            ebookModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        ebookClose.addEventListener('click', () => {
            this.closeEBookModal(ebookModal, bookReader);
        });

        backToLibrary.addEventListener('click', () => {
            this.showLibrary(bookReader);
        });

        ebookModal.addEventListener('click', (e) => {
            if (e.target === ebookModal) {
                this.closeEBookModal(ebookModal, bookReader);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && ebookModal.classList.contains('active')) {
                this.closeEBookModal(ebookModal, bookReader);
            }
        });

        // Book reader navigation
        this.initBookReader();
    },

    initLibrary(books, libraryElement) {
        if (!libraryElement) {
            console.error('Library element not found!');
            return;
        }

        libraryElement.innerHTML = '';
        
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book-item';
            bookElement.innerHTML = `
                <div class="book-cover" style="background: linear-gradient(135deg, ${book.color}, ${this.darkenColor(book.color)})">
                    ${book.title.split(' ').map(word => word[0]).join('')}
                </div>
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author}</div>
                <div class="book-pages">PDF Document</div>
            `;
            
            bookElement.addEventListener('click', () => {
                console.log('Book clicked:', book.title);
                this.openPDF(book);
            });
            
            libraryElement.appendChild(bookElement);
        });
    },

    darkenColor(color) {
        // Simple function to darken a color for gradient
        return color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) - 40)).toString(16)).substr(-2));
    },

    async openPDF(book) {
        const bookReader = document.getElementById('book-reader');
        const readerTitle = document.getElementById('reader-title');
        const ebookLibrary = document.getElementById('ebook-library');
        
        readerTitle.textContent = book.title;
        ebookLibrary.style.display = 'none';
        bookReader.classList.add('active');
        
        // Show loading state
        const leftPage = document.getElementById('left-page');
        const rightPage = document.getElementById('right-page');
        leftPage.innerHTML = '<div class="loading">Loading PDF</div>';
        rightPage.innerHTML = '';
        
        try {
            // Load PDF from assets/pdf/ directory
            const pdfPath = `assets/pdf/${book.filename}`;
            const loadingTask = pdfjsLib.getDocument(pdfPath);
            const pdf = await loadingTask.promise;
            
            this.currentPDF = {
                pdfDoc: pdf,
                book: book,
                currentPage: 1,
                totalPages: pdf.numPages
            };
            
            await this.renderPDFPages();
        } catch (error) {
            console.error('Error loading PDF:', error);
            leftPage.innerHTML = '<div class="error">Error loading PDF. Please try again.</div>';
            rightPage.innerHTML = '';
        }
    },

    async renderPDFPages() {
        if (!this.currentPDF) return;
        
        const leftPage = document.getElementById('left-page');
        const rightPage = document.getElementById('right-page');
        const leftPageNum = document.getElementById('left-page-number');
        const rightPageNum = document.getElementById('right-page-number');
        const currentPageEl = document.getElementById('current-page');
        const totalPagesEl = document.getElementById('total-pages');
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        
        const { pdfDoc, currentPage, totalPages } = this.currentPDF;
        
        // Clear previous content
        leftPage.innerHTML = '';
        rightPage.innerHTML = '';
        
        // Render left page (current page)
        if (currentPage <= totalPages) {
            const page = await pdfDoc.getPage(currentPage);
            await this.renderPage(page, leftPage);
            leftPageNum.textContent = currentPage;
        }
        
        // Render right page (next page, if exists)
        if (currentPage + 1 <= totalPages) {
            const page = await pdfDoc.getPage(currentPage + 1);
            await this.renderPage(page, rightPage);
            rightPageNum.textContent = currentPage + 1;
        } else {
            rightPageNum.textContent = '';
        }
        
        // Update controls
        currentPageEl.textContent = Math.ceil(currentPage / 2);
        totalPagesEl.textContent = Math.ceil(totalPages / 2);
        prevBtn.disabled = currentPage <= 1;
        nextBtn.disabled = currentPage >= totalPages - 1;
    },

    async renderPage(page, container) {
        const viewport = page.getViewport({ scale: 1.5 });
        
        // Prepare canvas for rendering
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Render PDF page to canvas
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        
        await page.render(renderContext).promise;
        
        // Convert canvas to image and scale appropriately
        const img = document.createElement('img');
        img.src = canvas.toDataURL();
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        
        container.innerHTML = '';
        container.appendChild(img);
    },

    initBookReader() {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        
        if (!prevBtn || !nextBtn) {
            console.error('Book reader buttons not found!');
            return;
        }

        prevBtn.addEventListener('click', () => {
            this.previousPage();
        });
        
        nextBtn.addEventListener('click', () => {
            this.nextPage();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('ebook-modal').classList.contains('active') && 
                document.getElementById('book-reader').classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    this.previousPage();
                } else if (e.key === 'ArrowRight') {
                    this.nextPage();
                }
            }
        });
    },

    // Update the page navigation methods for PDF
    previousPage() {
        if (this.currentPDF && this.currentPDF.currentPage > 1) {
            this.currentPDF.currentPage -= 2;
            if (this.currentPDF.currentPage < 1) {
                this.currentPDF.currentPage = 1;
            }
            this.renderPDFPages();
            this.animatePageTurn('prev');
        }
    },

    nextPage() {
        if (this.currentPDF && this.currentPDF.currentPage < this.currentPDF.totalPages - 1) {
            this.currentPDF.currentPage += 2;
            this.renderPDFPages();
            this.animatePageTurn('next');
        }
    },

    closeEBookModal(modal, reader) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        this.showLibrary(reader);
    },

    showLibrary(reader) {
        const ebookLibrary = document.getElementById('ebook-library');
        ebookLibrary.style.display = 'grid';
        reader.classList.remove('active');
    },

    animatePageTurn(direction) {
        const pageTurn = document.getElementById('page-turn');
        if (!pageTurn) return;

        const pageTurnFront = pageTurn.querySelector('.page-turn-front');
        const pageTurnBack = pageTurn.querySelector('.page-turn-back');
        
        // Trigger animation
        pageTurn.classList.add('active');
        
        // Reset animation after completion
        setTimeout(() => {
            pageTurn.classList.remove('active');
        }, 800);
    },

    // Enhanced Music Player functionality with background playback
    initMusicPlayer() {
        const musicPlayer = document.querySelector('.music-player-container');
        const musicModal = document.getElementById('music-modal');
        const musicClose = document.querySelector('.music-close');
        const playlist = document.getElementById('music-playlist');
        const audioPlayer = document.getElementById('audio-player');
        let fileInput = document.getElementById('music-file-input');

        // Create file input if it doesn't exist
        if (!fileInput) {
            fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.id = 'music-file-input';
            fileInput.accept = 'audio/*';
            fileInput.multiple = true;
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);
        }
        this.fileInput = fileInput;
        
        // Local playlist storage
        this.localPlaylist = JSON.parse(localStorage.getItem('musicPlayerPlaylist')) || [];
        this.currentTrack = null;
        this.isPlaying = false;
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.bufferLength = null;
        
        // Initialize playlist
        this.initPlaylist(playlist);
        
        // Event listeners
        musicPlayer.addEventListener('click', (e) => {
            // Don't open modal if clicking on mini player
            if (!e.target.closest('.mini-player')) {
                musicModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        musicClose.addEventListener('click', () => {
            musicModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            // Don't pause audio - allow background playback
        });
        
        musicModal.addEventListener('click', (e) => {
            if (e.target === musicModal) {
                musicModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                // Don't pause audio - allow background playback
            }
        });

        // Click on vinyl to play/pause
        musicPlayer.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            if (this.isPlaying) {
                this.pauseAudio();
            } else if (this.currentTrack) {
                this.playAudio();
            }
        });
        
        // Initialize audio visualizer
        this.initAudioVisualizer();
        
        // Initialize player controls
        this.initPlayerControls();

        // Initialize file upload
        this.initFileUpload();

        // Initialize mini player
        this.initMiniPlayer();

        // Load last played track
        this.loadLastPlayedTrack();
    },

    initFileUpload() {
        const uploadButton = document.querySelector('.upload-button');
        if (!uploadButton) return;
        
        uploadButton.addEventListener('click', () => {
            this.fileInput.click();
        });

        this.fileInput.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
        });
    },

    handleFileUpload(files) {
        for (let file of files) {
            if (file.type.startsWith('audio/')) {
                const track = {
                    id: Date.now() + Math.random(),
                    title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
                    artist: 'Local File',
                    duration: '--:--',
                    file: URL.createObjectURL(file),
                    isLocal: true
                };
                
                this.localPlaylist.push(track);
                this.addTrackToPlaylist(track);
            }
        }
        
        // Save to localStorage
        this.savePlaylistToStorage();
    },

    addTrackToPlaylist(track) {
        const playlist = document.getElementById('music-playlist');
        const trackElement = document.createElement('div');
        trackElement.className = 'playlist-item';
        trackElement.innerHTML = `
            <div class="track-number">${this.localPlaylist.length}</div>
            <div class="track-info">
                <div class="track-title">${track.title}</div>
                <div class="track-artist">${track.artist}</div>
            </div>
            <div class="track-duration">${track.duration}</div>
        `;
        
        trackElement.addEventListener('click', () => {
            this.playTrack(track);
        });
        
        playlist.appendChild(trackElement);
    },

    initPlaylist(playlistElement) {
        if (!playlistElement) {
            console.error('Playlist element not found!');
            return;
        }

        playlistElement.innerHTML = '';
        
        // Add upload area
        const uploadArea = document.createElement('div');
        uploadArea.className = 'file-upload-area';
        uploadArea.innerHTML = `
            <button class="upload-button">+ Add Local Music Files</button>
            <div class="upload-info">Supports MP3, WAV, OGG files</div>
        `;
        playlistElement.appendChild(uploadArea);
        
        // Add local tracks
        this.localPlaylist.forEach((track, index) => {
            this.addTrackToPlaylist(track);
        });
    },

    initMiniPlayer() {
        // Create mini player if it doesn't exist
        let miniPlayer = document.querySelector('.mini-player');
        if (!miniPlayer) {
            miniPlayer = document.createElement('div');
            miniPlayer.className = 'mini-player';
            miniPlayer.innerHTML = `
                <div class="mini-player-info">
                    <div class="mini-player-title" id="mini-player-title">No track selected</div>
                    <div class="mini-player-artist" id="mini-player-artist">-</div>
                </div>
                <div class="mini-player-controls">
                    <button class="mini-player-btn" id="mini-prev">⏮</button>
                    <button class="mini-player-btn" id="mini-play">▶</button>
                    <button class="mini-player-btn" id="mini-next">⏭</button>
                    <button class="mini-player-btn" id="mini-close">×</button>
                </div>
            `;
            document.body.appendChild(miniPlayer);
        }

        // Mini player event listeners
        const miniPlayBtn = document.getElementById('mini-play');
        const miniPrevBtn = document.getElementById('mini-prev');
        const miniNextBtn = document.getElementById('mini-next');
        const miniCloseBtn = document.getElementById('mini-close');

        if (miniPlayBtn) {
            miniPlayBtn.addEventListener('click', () => {
                if (this.isPlaying) {
                    this.pauseAudio();
                } else if (this.currentTrack) {
                    this.playAudio();
                }
            });
        }

        if (miniPrevBtn) {
            miniPrevBtn.addEventListener('click', () => {
                this.previousTrack();
            });
        }

        if (miniNextBtn) {
            miniNextBtn.addEventListener('click', () => {
                this.nextTrack();
            });
        }

        if (miniCloseBtn) {
            miniCloseBtn.addEventListener('click', () => {
                this.stopAudio();
                miniPlayer.classList.remove('active');
            });
        }
    },

    updateMiniPlayer() {
        const miniPlayer = document.querySelector('.mini-player');
        const miniTitle = document.getElementById('mini-player-title');
        const miniArtist = document.getElementById('mini-player-artist');
        const miniPlayBtn = document.getElementById('mini-play');

        if (miniPlayer && miniTitle && miniArtist && miniPlayBtn) {
            if (this.currentTrack) {
                miniTitle.textContent = this.currentTrack.title;
                miniArtist.textContent = this.currentTrack.artist;
                miniPlayBtn.textContent = this.isPlaying ? '⏸' : '▶';
                miniPlayer.classList.add('active');
            } else {
                miniPlayer.classList.remove('active');
            }
        }
    },

    savePlaylistToStorage() {
        // Only save metadata, not blob URLs
        const playlistToSave = this.localPlaylist.map(track => ({
            ...track,
            file: track.isLocal ? null : track.file // Don't save blob URLs
        }));
        localStorage.setItem('musicPlayerPlaylist', JSON.stringify(playlistToSave));
    },

    loadLastPlayedTrack() {
        const lastTrack = localStorage.getItem('lastPlayedTrack');
        if (lastTrack) {
            const track = JSON.parse(lastTrack);
            // For local files, we can't restore blob URLs, so skip
            if (!track.isLocal) {
                this.currentTrack = track;
                this.updateMiniPlayer();
            }
        }
    },

    async playTrack(track) {
        // Save last played track
        localStorage.setItem('lastPlayedTrack', JSON.stringify(track));
        
        // Update UI
        document.querySelectorAll('.playlist-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const playlistItems = document.querySelectorAll('.playlist-item');
        const trackIndex = this.localPlaylist.findIndex(t => t.id === track.id);
        if (playlistItems[trackIndex + 1]) { // +1 because of upload area
            playlistItems[trackIndex + 1].classList.add('active');
        }
        
        const nowPlayingTitle = document.getElementById('now-playing-title');
        const nowPlayingArtist = document.getElementById('now-playing-artist');
        
        if (nowPlayingTitle) nowPlayingTitle.textContent = track.title;
        if (nowPlayingArtist) nowPlayingArtist.textContent = track.artist;
        
        this.currentTrack = track;
        
        // Load and play audio
        const audioPlayer = document.getElementById('audio-player');
        if (audioPlayer) {
            audioPlayer.src = track.file;
        }
        
        await this.setupAudioVisualizer();
        await this.playAudio();
    },

    initAudioVisualizer() {
        const visualizer = document.getElementById('audio-visualizer');
        if (!visualizer) return;

        visualizer.innerHTML = '';
        
        // Create 64 bars for the visualizer
        for (let i = 0; i < 64; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            bar.style.height = '2px';
            visualizer.appendChild(bar);
        }
    },

    initPlayerControls() {
        const playBtn = document.getElementById('play-btn');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const progressBar = document.getElementById('progress-bar');
        const volumeBar = document.getElementById('volume-bar');
        const audioPlayer = document.getElementById('audio-player');

        if (!playBtn || !prevBtn || !nextBtn || !progressBar || !volumeBar || !audioPlayer) {
            console.error('Player controls elements not found!');
            return;
        }
        
        playBtn.addEventListener('click', () => {
            if (this.isPlaying) {
                this.pauseAudio();
            } else {
                this.playAudio();
            }
        });
        
        prevBtn.addEventListener('click', () => {
            this.previousTrack();
        });
        
        nextBtn.addEventListener('click', () => {
            this.nextTrack();
        });
        
        progressBar.addEventListener('click', (e) => {
            if (!this.currentTrack) return;
            
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audioPlayer.currentTime = percent * audioPlayer.duration;
        });
        
        volumeBar.addEventListener('click', (e) => {
            const rect = volumeBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audioPlayer.volume = percent;
            const volumeLevel = document.getElementById('volume-level');
            if (volumeLevel) {
                volumeLevel.style.width = `${percent * 100}%`;
            }
        });
        
        // Update progress
        audioPlayer.addEventListener('timeupdate', () => {
            this.updateProgress();
        });
        
        audioPlayer.addEventListener('loadedmetadata', () => {
            this.updateDuration();
        });
        
        audioPlayer.addEventListener('ended', () => {
            this.nextTrack();
        });
    },

    async setupAudioVisualizer() {
        const audioPlayer = document.getElementById('audio-player');
        if (!audioPlayer) return;
        
        // Create audio context if it doesn't exist
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
        
        // Create analyser
        this.analyser = this.audioContext.createAnalyser();
        const source = this.audioContext.createMediaElementSource(audioPlayer);
        source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        
        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        
        // Start visualization
        this.visualize();
    },

    visualize() {
        if (!this.analyser || !this.isPlaying) return;
        
        requestAnimationFrame(() => this.visualize());
        
        this.analyser.getByteFrequencyData(this.dataArray);
        
        const visualizer = document.getElementById('audio-visualizer');
        if (!visualizer) return;

        const bars = visualizer.getElementsByClassName('visualizer-bar');
        
        for (let i = 0; i < bars.length; i++) {
            const value = this.dataArray[i] / 255;
            const height = Math.max(2, value * 100);
            bars[i].style.height = `${height}px`;
            bars[i].style.background = `hsl(${value * 120}, 70%, 50%)`;
        }
    },

    playAudio() {
        if (!this.currentTrack) return;
        
        const audioPlayer = document.getElementById('audio-player');
        const playBtn = document.getElementById('play-btn');
        
        if (!audioPlayer || !playBtn) return;

        audioPlayer.play().then(() => {
            this.isPlaying = true;
            playBtn.textContent = '⏸';
            
            // Update vinyl state
            const musicPlayerContainer = document.querySelector('.music-player-container');
            if (musicPlayerContainer) {
                musicPlayerContainer.classList.add('playing');
                musicPlayerContainer.classList.remove('paused');
            }
            
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            this.visualize();
            this.updateMiniPlayer();
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
    },

    pauseAudio() {
        const audioPlayer = document.getElementById('audio-player');
        const playBtn = document.getElementById('play-btn');
        
        if (!audioPlayer || !playBtn) return;

        audioPlayer.pause();
        this.isPlaying = false;
        playBtn.textContent = '▶';
        
        // Update vinyl state
        const musicPlayerContainer = document.querySelector('.music-player-container');
        if (musicPlayerContainer) {
            musicPlayerContainer.classList.remove('playing');
            musicPlayerContainer.classList.add('paused');
        }
        
        this.updateMiniPlayer();
    },

    stopAudio() {
        this.pauseAudio();
        this.currentTrack = null;
        const audioPlayer = document.getElementById('audio-player');
        if (audioPlayer) {
            audioPlayer.src = '';
        }
        
        // Reset vinyl state
        const musicPlayerContainer = document.querySelector('.music-player-container');
        if (musicPlayerContainer) {
            musicPlayerContainer.classList.remove('playing', 'paused');
        }
        this.updateMiniPlayer();
    },

    previousTrack() {
        if (!this.currentTrack || this.localPlaylist.length === 0) return;
        
        const currentIndex = this.localPlaylist.findIndex(t => t.id === this.currentTrack.id);
        const prevIndex = (currentIndex - 1 + this.localPlaylist.length) % this.localPlaylist.length;
        this.playTrack(this.localPlaylist[prevIndex]);
    },

    nextTrack() {
        if (!this.currentTrack || this.localPlaylist.length === 0) return;
        
        const currentIndex = this.localPlaylist.findIndex(t => t.id === this.currentTrack.id);
        const nextIndex = (currentIndex + 1) % this.localPlaylist.length;
        this.playTrack(this.localPlaylist[nextIndex]);
    },

    updateProgress() {
        const audioPlayer = document.getElementById('audio-player');
        const progress = document.getElementById('progress');
        const currentTime = document.getElementById('current-time');
        
        if (audioPlayer && audioPlayer.duration) {
            const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            if (progress) progress.style.width = `${percent}%`;
            
            // Update time display
            if (currentTime) currentTime.textContent = this.formatTime(audioPlayer.currentTime);
        }
    },

    updateDuration() {
        const audioPlayer = document.getElementById('audio-player');
        const duration = document.getElementById('duration');
        
        if (duration && audioPlayer) duration.textContent = this.formatTime(audioPlayer.duration);
    },

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    AnimationManager.init();
});