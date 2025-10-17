// Main application initialization
const App = {
    async init() {
        // Initialize all components
        await AsciiManager.init();
        TerminalManager.init();
        AnimationManager.init();
        TreeMugGame.init();
        
        // Set up observers
        this.setupObservers();
        
        // Initial fade in
        this.initialFadeIn();
    },

    initialFadeIn() {
        document.querySelector('.terminal-container').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.terminal-container').style.transition = 'opacity 0.6s';
            document.querySelector('.terminal-container').style.opacity = '1';
        }, 100);
    },

    setupObservers() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const terminal = document.getElementById('terminal-container');
                    const logsIcon = document.getElementById('logs-icon');
                    if (terminal.classList.contains('minimized') || terminal.style.display === 'none') {
                        logsIcon.classList.add('active');
                    } else {
                        logsIcon.classList.remove('active');
                    }
                }
            });
        });

        observer.observe(document.getElementById('terminal-container'), { attributes: true });
    }
};

// Data managers
const AsciiManager = {
    asciiArtFiles: {
        'ascii-1': '/ascii/ascii_1.txt',
        'ascii-2': '/ascii/ascii_2.txt',
        'ascii-3': '/ascii/ascii_3.txt',
        'ascii-4': '/ascii/ascii_4.txt',
        'ascii-5': '/ascii/ascii_5.txt',
        'ascii-6': '/ascii/ascii_6.txt',
        'ascii-7': '/ascii/ascii_7.txt',
        'ascii-8': '/ascii/ascii_8.txt',
        'ascii-9': '/ascii/ascii_9.txt',
        'ascii-10': '/ascii/ascii_10.txt',
        'ascii-11': '/ascii/ascii_11.txt',
        'ascii-12': '/ascii/ascii_12.txt',
        'default': '/ascii/ascii_1.txt'
    },

    currentAsciiIndex: 1,
    asciiKeys: [],

    async init() {
        this.asciiKeys = Object.keys(this.asciiArtFiles).filter(key => key !== 'default');
        await this.loadAsciiArt('default');
    },

    async loadAsciiArt(name) {
        let file = this.asciiArtFiles[name] || this.asciiArtFiles['default'];
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error("Not found");
            let art = await response.text();

            art = art.replace(/\u00A0/g, ' ');
            art = art.replace(/\t/g, '    ');

            const asciiElement = document.getElementById('ascii-art');
            asciiElement.style.opacity = '0';
            setTimeout(() => {
                asciiElement.textContent = art;
                asciiElement.style.transition = 'opacity 0.3s';
                asciiElement.style.opacity = '1';
            }, 150);
        } catch {
            document.getElementById('ascii-art').textContent = 'ASCII art not found for: ' + name;
        }
    },

    loadAsciiByIndex(index) {
        if (index < 1) index = this.asciiKeys.length;
        if (index > this.asciiKeys.length) index = 1;
        this.currentAsciiIndex = index;
        this.loadAsciiArt(this.asciiKeys[index - 1]);
    },

    nextAscii() {
        this.loadAsciiByIndex(this.currentAsciiIndex + 1);
    },

    prevAscii() {
        this.loadAsciiByIndex(this.currentAsciiIndex - 1);
    }
};

const BlogManager = {
    blogsData: [
        {
            id: 1,
            title: "Building Scalable APIs with FastAPI",
            subtitle: "A deep dive into creating high-performance REST APIs with Python's fastest web framework",
            mediumLink: "https://medium.com/@yourhandle/building-scalable-apis-fastapi",
            mdFile: "/blogs/fastapi-guide.md"
        },
        {
            id: 2,
            title: "Understanding Prime Number Gaps",
            subtitle: "Exploring patterns in the distribution of prime numbers and their mathematical significance",
            mediumLink: "https://medium.com/@yourhandle/prime-number-gaps",
            mdFile: "/blogs/prime-gaps.md"
        },
        {
            id: 3,
            title: "Docker Best Practices for Production",
            subtitle: "Security, optimization, and deployment strategies for containerized applications",
            mediumLink: "https://medium.com/@yourhandle/docker-best-practices",
            mdFile: "/blogs/docker-production.md"
        }
    ],

    initBlogButtons() {
        document.querySelectorAll('.read-here-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const blogId = parseInt(e.currentTarget.dataset.blogId);
                const blog = this.blogsData.find(b => b.id === blogId);
                if (blog) {
                    await this.displayBlogContent(blog);
                }
            });
        });
    },

    async displayBlogContent(blog) {
        try {
            const response = await fetch(blog.mdFile);
            if (!response.ok) throw new Error("File not found");
            const content = await response.text();
            const parsedContent = Utils.parseMarkdown(content);

            Utils.addOutput(`<div class="section-title">→ ${blog.title}</div>
<div class="blog-content">${parsedContent}</div>
<div style="margin-top: 12px; color: #666; font-size: 11px;">
Read the full article on <a href="${blog.mediumLink}" target="_blank" class="link">Medium</a>
</div>`);
        } catch (error) {
            Utils.addOutput(`<span class="error">Error loading blog content</span><br><span style="color:#999">Note: Create a markdown file at ${blog.mdFile}</span>`);
        }
    }
};

const FileSystem = {
    fileSystem: {
        '/': ['blogs/', 'projects/', 'resume.pdf', 'logs/'],
        '/blogs/': ['fastapi-guide.md', 'prime-gaps.md', 'docker-production.md'],
        '/projects/': ['pingup/', 'primegap-ml/', 'video-scraper/'],
        '/logs/': ['2024-12.txt', '2025-01.txt', '2025-02.txt']
    },
    currentPath: '/'
};

const LogManager = {
    logsData: [
        { file: '/logs/2025-02.txt', date: 'February 2025' },
        { file: '/logs/2025-01.txt', date: 'January 2025' },
        { file: '/logs/2024-12.txt', date: 'December 2024' }
    ],

    async loadLogs() {
        const logsBody = document.getElementById('logs-body');
        logsBody.innerHTML = '';

        for (const log of this.logsData) {
            try {
                const response = await fetch(log.file);
                if (!response.ok) throw new Error("File not found");
                const content = await response.text();

                const lines = content.split('\n').filter(line => line.trim());
                lines.forEach(line => {
                    const entry = document.createElement('div');
                    entry.className = 'log-entry';
                    entry.innerHTML = `
                        <div class="log-date">${log.date}</div>
                        <div class="log-content">• ${line.trim()}</div>
                    `;
                    logsBody.appendChild(entry);
                });
            } catch (error) {
                const entry = document.createElement('div');
                entry.className = 'log-entry';
                entry.innerHTML = `
                    <div class="log-date">${log.date}</div>
                    <div class="log-content" style="color: #999;">No updates for this period. Create file at ${log.file}</div>
                `;
                logsBody.appendChild(entry);
            }
        }
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});