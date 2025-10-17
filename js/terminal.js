// Terminal input and command handling
const TerminalManager = {
    init() {
        this.initTerminalInput();
        this.setupCommandHandler();
    },

    initTerminalInput() {
        const commandInput = document.getElementById('command-input');
        const cursor = document.getElementById('cursor');
        const commandSection = document.querySelector('.command-section');

        function updateCursorPosition() {
            const prompt = commandSection.querySelector('.prompt');
            const promptWidth = prompt.offsetWidth;
            const temp = document.createElement('span');
            temp.style.visibility = 'hidden';
            temp.style.position = 'absolute';
            temp.style.font = window.getComputedStyle(commandInput).font;
            temp.textContent = commandInput.value || '';
            document.body.appendChild(temp);
            const textWidth = temp.offsetWidth;
            document.body.removeChild(temp);
            cursor.style.left = (promptWidth + textWidth + 8) + 'px';
        }

        commandInput.addEventListener('input', updateCursorPosition);
        commandInput.addEventListener('focus', updateCursorPosition);

        commandInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                this.handleCommand(commandInput.value);
                commandInput.value = '';
                updateCursorPosition();
            }
        });

        document.getElementById('terminal-output').addEventListener('click', () => {
            commandInput.focus();
            updateCursorPosition();
        });

        updateCursorPosition();
    },

    setupCommandHandler() {
        this.handleCommand = (cmd) => {
            const trimmed = cmd.trim();
            if (!trimmed) return;
            Utils.addOutput(cmd, true);
            const [cmdWord] = trimmed.split(' ');
            if (Commands[cmdWord]) {
                const result = Commands[cmdWord].fn(trimmed);
                if (result instanceof Promise) {
                    result.then(output => {
                        if (output) Utils.addOutput(output);
                    });
                } else {
                    if (result) Utils.addOutput(result);
                }
            } else {
                Utils.addOutput(`<span class="error">Unknown command: ${trimmed}</span><br>Type <span class="command">help</span> for all commands.`);
            }
        };
    }
};