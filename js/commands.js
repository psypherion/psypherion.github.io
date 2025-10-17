// Command definitions and handlers
const Commands = {
    help: {
        fn: () => `
<div class="help-command">help</div><div class="help-desc">Show available commands</div>
<div class="help-command">ascii [art_name]</div><div class="help-desc">Switch ASCII art (ascii-1, ascii-2, ascii-3, etc.)</div>
<div class="help-command">about</div><div class="help-desc">Learn more about me</div>
<div class="help-command">skills</div><div class="help-desc">View my technical skills</div>
<div class="help-command">projects</div><div class="help-desc">Explore my projects</div>
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
<div>I'm a developer passionate about backend, AI, and building cool web tech. I also play guitar, write, and try new platforms!</div>
<div style="margin-top: 8px;">Location: Kolkata, India <br> Education: MCA, Physics UG <br> Interests: Quant Dev, ML, Prime Numbers</div>`
    },

    skills: {
        fn: () => `<div class="section-title">→ Technical Skills</div>
<div class="skills-category">
<div class="category-title">Languages</div>
<span class="skill-tag">Python</span><span class="skill-tag">JavaScript</span><span class="skill-tag">TypeScript</span><span class="skill-tag">SQL</span><span class="skill-tag">Rust</span><span class="skill-tag">Go</span><span class="skill-tag">C++</span><span class="skill-tag">Java</span>
</div>
<div class="skills-category">
<div class="category-title">Frameworks & Libraries</div>
<span class="skill-tag">React</span><span class="skill-tag">Node.js</span><span class="skill-tag">Express</span><span class="skill-tag">FastAPI</span><span class="skill-tag">Django</span><span class="skill-tag">Flask</span><span class="skill-tag">TensorFlow</span><span class="skill-tag">PyTorch</span>
</div>
<div class="skills-category">
<div class="category-title">Tools & Technologies</div>
<span class="skill-tag">Docker</span><span class="skill-tag">Kubernetes</span><span class="skill-tag">Git</span><span class="skill-tag">PostgreSQL</span><span class="skill-tag">MongoDB</span><span class="skill-tag">Redis</span><span class="skill-tag">AWS</span><span class="skill-tag">Linux</span>
</div>
<div class="skills-category">
<div class="category-title">IDEs & Editors</div>
<span class="skill-tag">VS Code</span><span class="skill-tag">PyCharm</span><span class="skill-tag">IntelliJ IDEA</span><span class="skill-tag">Vim</span><span class="skill-tag">Jupyter</span>
</div>`
    },

    projects: {
        fn: () => `<div class="section-title">→ Projects</div>
<div class="project-item">
<div class="project-title">PingUp - Encrypted Chat</div>
<div>Dockerized backend, WebSocket, Crypto, PostgreSQL</div>
<a href="https://github.com/yourusername/pingup" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>
<div class="project-item">
<div class="project-title">PrimeGap ML</div>
<div>ML modeling gaps of prime numbers</div>
<a href="https://github.com/yourusername/primegap-ml" target="_blank" class="project-link">
Visit Repository
<svg class="arrow-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
</a>
</div>
<div class="project-item">
<div class="project-title">Video Scraper Suite</div>
<div>Browser automation, segmented reassembly</div>
<a href="https://github.com/yourusername/video-scraper" target="_blank" class="project-link">
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
<div style="margin-top: 12px;">📧 <a href="mailto:sayan84c@gmail.com" class="link">sayan84c@gmail.com</a> | 🐙 <a href="https://github.com/yourusername" class="link" target="_blank">github.com/yourusername</a></div>`
    },

    clear: {
        fn: () => {
            const outputLines = [...document.querySelectorAll('.output-line')];
            outputLines.forEach(line => line.parentNode.removeChild(line));
            return null;
        }
    }
};