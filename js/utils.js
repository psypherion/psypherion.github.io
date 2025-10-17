// Utility functions
const Utils = {
    // Parse markdown to HTML
    parseMarkdown(md) {
        let html = md;
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
        html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        html = html.split('\n\n').map(para => {
            if (!para.match(/^<[hupol]/)) {
                return '<p>' + para + '</p>';
            }
            return para;
        }).join('\n');
        return html;
    },

    // Add output to terminal
    addOutput(content, isCommand = false) {
        const div = document.createElement('div');
        div.className = 'output-line';
        div.innerHTML = isCommand
            ? `<span class="prompt">visitor@portfolio:~$</span> <span class="command">${content}</span>`
            : content;
        const terminalBody = document.getElementById('terminal-output');
        const commandSection = terminalBody.querySelector('.command-section');
        terminalBody.insertBefore(div, commandSection);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Escape HTML
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
};