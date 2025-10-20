// Command definitions and handlers
const Commands = {
    help: {
        fn: () => `
<div class="help-command">help</div><div class="help-desc">Show available commands</div>
<div class="help-command">ascii [art_name]</div><div class="help-desc">Switch ASCII art (ascii-1, ascii-2, ascii-3, etc.)</div>
<div class="help-command">about</div><div class="help-desc">Learn more about me</div>
<div class="help-command">skills</div><div class="help-desc">View my technical skills</div>
<div class="help-command">projects</div><div class="help-desc">Explore my projects</div>
<div class="help-command">open-source</div><div class="help-desc">View my open-source contributions</div>
<div class="help-command">tools</div><div class="help-desc">Check out my developer tools</div>
<div class="help-command">blogs</div><div class="help-desc">Read my blog posts</div>
<div class="help-command">ls [path]</div><div class="help-desc">List files and directories</div>
<div class="help-command">cat [file]</div><div class="help-desc">Display file contents</div>
<div class="help-command">contact</div><div class="help-desc">Get in touch with me</div>
<div class="help-command">clear</div><div class="help-desc">Clear the terminal display</div>`
    },

    ascii: {
        fn: (input) => {
            const parts = input.split(' ');
            if (parts.length < 2)
                return `<span class="error">Usage: ascii [ascii-1/ascii-2/ascii-3]</span>`;
            const artName = parts[1];
            AsciiManager.loadAsciiArt(artName);
            return `<span class="section-title">→ Switched ASCII art: ${artName}</span>`;
        }
    },

    about: {
        fn: () => `<div class="section-title">→ About Me</div>
<div>
Hello world! <br>
I'm Sayan Sarkar, a Python Developer and Data Science enthusiast with a deep interest in AI, low-level programming, and crafting innovative solutions. 
I enjoy solving real-world problems through creative thinking and code. 
</div>
<div style="margin-top: 8px;">
<strong>Education:</strong><br>
• B.Sc in Physics — University of Calcutta<br>
• MCA — MAKAUT (Main Campus) <br>
• NET Qualified in Computer Science and Applications
</div>
<div style="margin-top: 8px;">
<strong>Interests:</strong><br>
Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, Quantitative Development & Research, Low-Level Programming, Web 3.0 Technology
</div>
<div style="margin-top: 8px;">
<strong>Hobbies:</strong><br>
When I’m not programming, I’m probably reading philosophy or classical literature, pondering existential questions, playing chess, or writing.</div>
`
    },

    skills: {
        fn: () => `<div class="section-title">→ Technical Skills</div>
<div class="skills-category">
<div class="category-title">Languages</div>
<span class="skill-tag">Python</span><span class="skill-tag">C</span><span class="skill-tag">JavaScript</span><span class="skill-tag">Bash</span><span class="skill-tag">VB Script</span>
</div>
<div class="skills-category">
<div class="category-title">Frameworks & Libraries</div>
<span class="skill-tag">TensorFlow</span><span class="skill-tag">PyTorch</span><span class="skill-tag">Jraph</span><span class="skill-tag">Starlette</span><span class="skill-tag">Fast API</span><span class="skill-tag">Flask</span><span class="skill-tag">Django</span><span class="skill-tag">React</span><span class="skill-tag">Node.js</span><span class="skill-tag">Puter.js</span><span class="skill-tag">Express</span>
</div>
<div class="skills-category">
<div class="category-title">Tools & Technologies</div>
<span class="skill-tag">Docker</span><span class="skill-tag">Git</span><span class="skill-tag">PostgreSQL</span><span class="skill-tag">Redis</span><span class="skill-tag">Linux</span>
</div>
<div class="skills-category">
<div class="category-title">IDEs & Editors</div>
<span class="skill-tag">VS Code</span><span class="skill-tag">PyCharm</span><span class="skill-tag">Jupyter</span><span class="skill-tag">Neovim</span>
</div>`
    },

    projects: {
        fn: () => `<div class="section-title">→ Projects</div>
<div class="project-item">
<div class="project-title">Concurrent Pseudo Parallel Processor</div>
<div>C-Python middleware with low-level engine for true parallelism and low-latency performance</div>
<a href="https://github.com/psypherion/toolB" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>
<div class="project-item">
<div class="project-title">Breast Cancer Detection</div>
<div>Real-life radiologist inspired mechanism for medical imaging analysis</div>
<a href="https://github.com/psypherion/pinn-bcd" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>
<div class="project-item">
<div class="project-title">Multimodal Music Recommendation</div>
<div>Intelligent music recommendation system weaving acoustic features, lyrical content, and listener patterns</div>
<a href="https://github.com/psypherion/sur" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>
<div class="project-item">
<div class="project-title">Spoti-Tube Downloader</div>
<div>Lightweight Python script to download songs from Spotify playlists without premium membership</div>
<a href="https://github.com/psypherion/Spoti-Tube" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>
<div class="project-item">
<div class="project-title">Real-time Sudoku Solver</div>
<div>Computer vision based real-time sudoku puzzle solver</div>
<a href="https://github.com/psypherion/sudokuSolver" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>
<div class="project-item">
<div class="project-title">Resume Analyzer - Ascent</div>
<div>Streamlined web app for job seekers to upload resumes and receive instant feedback for FREE</div>
<a href="https://github.com/psypherion/ascent" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>`
    },

    'open-source': {
        fn: () => `<div class="section-title">→ Open Source Contributions</div>
<div class="project-item">
<div class="project-title">MEC-Net: Hippocampal Memory Consolidation Inspired Language Model</div>
<div>Novel ML architecture for continual learning through episodic and semantic memory systems</div>
<a href="https://github.com/psypherion/MEC-net" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>
<div class="project-item">
<div class="project-title">PingUp - Secure P2P Ephemeral Chat Room</div>
<div>Secure peer-to-peer ephemeral chat room with real-time messaging</div>
<a href="https://github.com/psypherion/pingup" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>
<div class="project-item">
<div class="project-title">GCSB Tracker Backend</div>
<div>Backend service to scrape Google Cloud Skills Boost profiles and track skill badges</div>
<a href="https://github.com/psypherion/gcsbtracker-backend" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>
<div class="project-item">
<div class="project-title">Auto Commit Message Generator</div>
<div>VS Code Plugin using Gemini API for automatic commit message generation</div>
<a href="#" target="_blank" class="project-link">
Coming Soon
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>`
    },

    tools: {
        fn: () => `<div class="section-title">→ Developer Tools</div>
<div class="project-item">
<div class="project-title">envtool</div>
<div>Simple, streamlined way of creating Python environments and automatic requirement library installation</div>
<a href="https://github.com/psypherion/envtool" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>
<div class="project-item">
<div class="project-title">autoGIT CLI</div>
<div>CLI tool for git commit, repo search, new repo creation for easy git access</div>
<a href="https://github.com/psypherion/autoGIT-cli" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>
<div class="project-item">
<div class="project-title">AssignEase</div>
<div>Streamlined way of creating programming assignments with automatic screenshot capture</div>
<a href="https://github.com/psypherion/AssignEase" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>
<div class="project-item">
<div class="project-title">tubeFetch CLI</div>
<div>Simple streamlined process of downloading YouTube videos and playlists directly from command line</div>
<a href="https://github.com/psypherion/tubeFetch-cli" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>`
    },

    blogs: {
        fn: () => {
            let output = '<div class="section-title">→ Blog Posts</div>';
            BlogManager.blogsData.forEach(blog => {
                output += `
<div class="blog-item" data-blog-id="${blog.id}">
<div class="blog-title">${blog.title}</div>
<div class="blog-subtitle">${blog.subtitle}</div>
<div class="blog-buttons">
<span class="blog-button read-here-btn" data-blog-id="${blog.id}">
<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/></svg>
Read Here
</span>
<a href="${blog.mediumLink}" target="_blank" class="blog-button">
<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.01 4.236-2.256 4.236-1.246 0-2.256-1.897-2.256-4.236 0-2.34 1.01-4.236 2.256-4.236 1.246 0 2.256 1.897 2.256 4.236zM16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.7-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795z"/></svg>
Visit Medium
</a>
</div>
</div>`;
            });

            setTimeout(() => {
                BlogManager.initBlogButtons();
            }, 100);

            return output;
        }
    },

    ls: {
        fn: (input) => {
            const parts = input.trim().split(' ');
            const path = parts.length > 1 ? parts[1] : FileSystem.currentPath;

            let targetPath = path;
            if (!targetPath.endsWith('/') && targetPath !== '/') {
                targetPath += '/';
            }

            if (!FileSystem.fileSystem[targetPath]) {
                return `<span class="error">ls: cannot access '${path}': No such file or directory</span>`;
            }

            let output = '<div class="file-list">';
            FileSystem.fileSystem[targetPath].forEach(item => {
                const isDir = item.endsWith('/');
                const className = isDir ? 'file-dir' : 'file-md';
                output += `<div class="file-item ${className}">${item}</div>`;
            });
            output += '</div>';
            return output;
        }
    },

    cat: {
        fn: async (input) => {
            const parts = input.trim().split(' ');
            if (parts.length < 2) {
                return `<span class="error">cat: missing file operand</span><br>Usage: cat [filename]`;
            }

            const filename = parts[1];
            const blog = BlogManager.blogsData.find(b => b.mdFile.endsWith(filename));

            if (!blog) {
                return `<span class="error">cat: ${filename}: No such file or directory</span>`;
            }

            try {
                const response = await fetch(blog.mdFile);
                if (!response.ok) throw new Error("File not found");
                const content = await response.text();
                return `<div class="blog-content">${Utils.parseMarkdown(content)}</div>`;
            } catch (error) {
                return `<span class="error">cat: ${filename}: Unable to read file</span><br><span style="color:#999">Note: Create markdown files at ${blog.mdFile}</span>`;
            }
        }
    },

    contact: {
        fn: () => `<div class="section-title">→ Contact</div>
<div style="margin-top: 12px;">📧 <a href="mailto:sayan84c@gmail.com" class="link">sayan84c@gmail.com</a> | 🐙 <a href="https://github.com/psypherion" class="link" target="_blank">github.com/psypherion</a></div>`
    },

    clear: {
        fn: () => {
            const outputLines = [...document.querySelectorAll('.output-line')];
            outputLines.forEach(line => line.parentNode.removeChild(line));
            return null;
        }
    }
};

// Tab functionality for eBook categories
document.addEventListener('DOMContentLoaded', function() {
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
});