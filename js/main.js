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
        title: "Heretic",
        subtitle: "Were they really messengers of divine wisdom?",
        mediumLink: "https://medium.com/@psypherion/heretic-d6b5569bc4e0",
        mdFile: "/assets/blogs/heretic.md"
    },
    {
        id: 2,
        title: "Were they really messengers of divine wisdom?",
        subtitle: "Exploring patterns in the distribution of prime numbers and their mathematical significance",
        mediumLink: "https://medium.com/@psypherion/were-they-really-messengers-of-divine-wisdom-a95d62db8873",
        mdFile: "/assets/blogs/messengers.md"
    },
    {
        id: 3,
        title: "Building a Google Cloud Skills Boost Tracker Backend",
        subtitle: "Security, optimization, and deployment strategies for containerized applications",
        mediumLink: "https://medium.com/@psypherion/building-a-google-cloud-skills-boost-tracker-backend-f14e2521c678",
        mdFile: "/assets/blogs/google cloud skill boost tracker.md"
    },
    {
        id: 4,
        title: "Learning Rust",
        subtitle: "A journey into systems programming with Rust",
        mediumLink: "https://medium.com/@psypherion/learning-rust-488dfd459011",
        mdFile: "/assets/blogs/rust-1.md"
    },
    {
        id: 5,
        title: "rant.",
        subtitle: "Personal thoughts and reflections",
        mediumLink: "https://medium.com/@psypherion/rant-f27ff7c1e669",
        mdFile: "/assets/blogs/rant-2.md"
    },
    {
        id: 6,
        title: "rant.",
        subtitle: "Personal thoughts and reflections",
        mediumLink: "https://medium.com/@psypherion/rant-f487f95b615b",
        mdFile: "/assets/blogs/rant-1.md"
    },
    {
        id: 7,
        title: "I Am Therefore I Must Torture",
        subtitle: "Philosophical exploration of existence and suffering",
        mediumLink: "https://medium.com/@psypherion/i-am-therefore-i-must-torture-e64a0c7c41d9",
        mdFile: "/assets/blogs/i have no mouth.md"
    },
    {
        id: 8,
        title: "Understanding Love — 2",
        subtitle: "Continuing the exploration of love and relationships",
        mediumLink: "https://medium.com/@psypherion/understanding-love-2-01cfc4c7beb9",
        mdFile: "/assets/blogs/understanding-love-2.md"
    },
    {
        id: 9,
        title: "envtool : create & manage python environments easily",
        subtitle: "A tool for simplifying Python environment management",
        mediumLink: "https://medium.com/@psypherion/envtool-create-manage-python-environments-easily-5d1d298c2e74",
        mdFile: "/assets/blogs/envtool.md"
    },
    {
        id: 10,
        title: "chatX: A Real-Time Simple Text-Based Chat Server from Scratch",
        subtitle: "Building a real-time chat application from the ground up",
        mediumLink: "https://medium.com/@psypherion/chatx-a-real-time-simple-text-based-chat-server-from-scratch-d107b728e88b",
        mdFile: "/assets/blogs/chatX.md"
    },
    {
        id: 11,
        title: "Simplifying GitHub Operations with autoGIT-cli",
        subtitle: "A CLI tool for automating GitHub workflows",
        mediumLink: "https://medium.com/@psypherion/simplifying-github-operations-with-autogit-cli-44534d3c2b50",
        mdFile: "/assets/blogs/autoGIT.md"
    },
    {
        id: 12,
        title: "paperBot-CLI: Your Research Paper Assistant",
        subtitle: "A command-line tool for research paper management",
        mediumLink: "https://medium.com/@psypherion/paperbot-cli-your-research-paper-assistant-ae38929b193f",
        mdFile: "/assets/blogs/paperBOT.md"
    },
    {
        id: 13,
        title: "Building a Simple Neural Network from Scratch in Python",
        subtitle: "Understanding neural networks by building one from the ground up",
        mediumLink: "https://medium.com/@psypherion/building-a-simple-neural-network-from-scratch-in-python-8fb722882e5a",
        mdFile: "/assets/blogs/nn.md"
    },
    {
        id: 14,
        title: "Understanding Love",
        subtitle: "Exploring the nature and meaning of love",
        mediumLink: "https://medium.com/@psypherion/understanding-love-7da44523ec79",
        mdFile: "/assets/blogs/understandingg-love.md"
    },
    {
        id: 15,
        title: "Three Body Problem",
        subtitle: "Exploring the famous physics problem and its implications",
        mediumLink: "https://medium.com/@psypherion/three-body-problem-b6731242116e",
        mdFile: "/assets/blogs/threebody.md"
    },
    {
        id: 16,
        title: "Boyer-Moore Majority Vote Algorithm",
        subtitle: "Understanding and implementing the efficient majority element algorithm",
        mediumLink: "https://medium.com/@psypherion/boyer-moore-majority-vote-algorithm-2e6692dd670d",
        mdFile: "/assets/blogs/boyermoore.md"
    },
    {
        id: 17,
        title: "Machine Learning (Self- Study) — 1",
        subtitle: "Beginning the journey into machine learning through self-study",
        mediumLink: "https://medium.com/@psypherion/machine-learning-self-study-1-7c6c8a7b0c5a",
        mdFile: "/assets/blogs/statistics-1.md"
    },
    {
        id: 18,
        title: "The NLP Landscape from 1960s to 2020",
        subtitle: "Historical overview of Natural Language Processing developments",
        mediumLink: "https://medium.com/@psypherion/the-nlp-landscape-from-1960s-to-2020s-ec73e2efd095",
        mdFile: "/assets/blogs/nlp.md"
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
        '/assets/blogs/': ['fastapi-guide.md', 'prime-gaps.md', 'docker-production.md'],
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