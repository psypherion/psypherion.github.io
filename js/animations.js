// Animation manager
const AnimationManager = {
    init() {
        this.initTerminalControls();
        this.initLogsWindow();
        this.initPDFViewer();
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
    }
};