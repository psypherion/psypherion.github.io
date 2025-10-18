// Interactive Tree and Mug Game
const TreeMugGame = {
    treeStates: ['healthy', 'slightly-damaged', 'damaged', 'dying', 'dead'],
    mugStates: ['empty', '25', '50', '75', 'full'],

    currentTreeState: 0,
    currentMugState: 0,

    gameState: {
        treeState: 0,
        mugState: 0
    },

    init() {
        this.createTreeSVG();
        this.createMugSVG();
        this.setupEventListeners();
        this.updateTooltips();
    },

    createTreeSVG() {
        const treeSvg = document.getElementById('tree-svg');
        treeSvg.innerHTML = this.generateTreeSVG(this.currentTreeState);
    },

    createMugSVG() {
        const mugSvg = document.getElementById('mug-svg');
        mugSvg.innerHTML = this.generateMugSVG(this.currentMugState);
    },

    generateTreeSVG(state) {
        const colors = {
            healthy: {
                trunk: '#8B4513',
                trunkDark: '#654321',
                leaves: '#228B22',
                dark: '#1a5f1a',
                branch: '#A0522D',
                fruit: '#DC143C'
            },
            'slightly-damaged': {
                trunk: '#A0522D',
                trunkDark: '#6b3819',
                leaves: '#6B8E23',
                dark: '#4a5f17',
                branch: '#8B7355',
                fruit: '#B22222'
            },
            damaged: {
                trunk: '#CD853F',
                trunkDark: '#8B6914',
                leaves: '#808080',
                dark: '#505050',
                branch: '#A0826D',
                fruit: '#8B0000'
            },
            dying: {
                trunk: '#D2B48C',
                trunkDark: '#B8860B',
                leaves: '#A0522D',
                dark: '#6b3819',
                branch: '#BC8F8F',
                fruit: '#800000'
            },
            dead: {
                trunk: '#696969',
                trunkDark: '#404040',
                leaves: '#404040',
                dark: '#202020',
                branch: '#4F4F4F',
                fruit: '#2F4F4F'
            }
        };

        const currentColors = colors[this.treeStates[state]] || colors.healthy;

        return `
                    <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated; image-rendering: crisp-edges;">
                        <!-- Main Trunk with taper -->
                        <rect x="46" y="58" width="8" height="6" fill="${currentColors.trunk}" />
                        <rect x="44" y="64" width="12" height="6" fill="${currentColors.trunk}" />
                        <rect x="43" y="70" width="14" height="6" fill="${currentColors.trunk}" />
                        <rect x="42" y="76" width="16" height="5" fill="${currentColors.trunk}" />
                        <rect x="40" y="81" width="20" height="5" fill="${currentColors.trunk}" />

                        <!-- Trunk texture/bark -->
                        <rect x="46" y="60" width="2" height="2" fill="${currentColors.trunkDark}" />
                        <rect x="50" y="66" width="2" height="2" fill="${currentColors.trunkDark}" />
                        <rect x="53" y="72" width="3" height="4" fill="${currentColors.trunkDark}" opacity="0.5" />
                        <rect x="54" y="78" width="3" height="3" fill="${currentColors.trunkDark}" opacity="0.5" />
                        <rect x="45" y="74" width="2" height="2" fill="${currentColors.trunkDark}" />
                        <rect x="48" y="82" width="4" height="3" fill="${currentColors.trunkDark}" opacity="0.4" />

                        <!-- Left major branch system -->
                        <rect x="36" y="56" width="10" height="3" fill="${currentColors.branch}" />
                        <rect x="32" y="53" width="8" height="3" fill="${currentColors.branch}" />
                        <rect x="28" y="50" width="6" height="3" fill="${currentColors.branch}" />
                        <rect x="26" y="46" width="5" height="4" fill="${currentColors.branch}" />
                        <rect x="24" y="42" width="4" height="4" fill="${currentColors.branch}" />

                        <!-- Left mid branches -->
                        <rect x="34" y="48" width="6" height="3" fill="${currentColors.branch}" />
                        <rect x="30" y="44" width="5" height="4" fill="${currentColors.branch}" />
                        <rect x="36" y="40" width="4" height="3" fill="${currentColors.branch}" />

                        <!-- Right major branch system -->
                        <rect x="54" y="56" width="10" height="3" fill="${currentColors.branch}" />
                        <rect x="60" y="53" width="8" height="3" fill="${currentColors.branch}" />
                        <rect x="66" y="49" width="6" height="4" fill="${currentColors.branch}" />
                        <rect x="70" y="45" width="5" height="4" fill="${currentColors.branch}" />
                        <rect x="72" y="40" width="4" height="5" fill="${currentColors.branch}" />

                        <!-- Right mid branches -->
                        <rect x="60" y="48" width="6" height="3" fill="${currentColors.branch}" />
                        <rect x="64" y="43" width="5" height="5" fill="${currentColors.branch}" />
                        <rect x="58" y="38" width="4" height="4" fill="${currentColors.branch}" />

                        <!-- Center upper branches -->
                        <rect x="44" y="44" width="6" height="3" fill="${currentColors.branch}" />
                        <rect x="50" y="44" width="6" height="3" fill="${currentColors.branch}" />
                        <rect x="42" y="36" width="5" height="4" fill="${currentColors.branch}" />
                        <rect x="53" y="34" width="5" height="4" fill="${currentColors.branch}" />
                        <rect x="46" y="28" width="4" height="4" fill="${currentColors.branch}" />
                        <rect x="50" y="24" width="3" height="4" fill="${currentColors.branch}" />

                        <!-- Left foliage cluster (bottom) -->
                        <rect x="22" y="48" width="14" height="6" fill="${currentColors.leaves}" />
                        <rect x="20" y="54" width="16" height="7" fill="${currentColors.leaves}" />
                        <rect x="24" y="61" width="12" height="5" fill="${currentColors.leaves}" />
                        <rect x="26" y="40" width="10" height="8" fill="${currentColors.leaves}" />
                        <rect x="28" y="34" width="8" height="6" fill="${currentColors.leaves}" />

                        <!-- Left cluster shadows -->
                        <rect x="32" y="54" width="4" height="7" fill="${currentColors.dark}" />
                        <rect x="30" y="48" width="3" height="6" fill="${currentColors.dark}" />
                        <rect x="33" y="61" width="3" height="4" fill="${currentColors.dark}" />

                        <!-- Right foliage cluster (bottom) -->
                        <rect x="64" y="47" width="14" height="7" fill="${currentColors.leaves}" />
                        <rect x="64" y="54" width="16" height="8" fill="${currentColors.leaves}" />
                        <rect x="68" y="62" width="10" height="5" fill="${currentColors.leaves}" />
                        <rect x="66" y="38" width="12" height="9" fill="${currentColors.leaves}" />
                        <rect x="70" y="32" width="8" height="6" fill="${currentColors.leaves}" />

                        <!-- Right cluster shadows -->
                        <rect x="74" y="54" width="4" height="8" fill="${currentColors.dark}" />
                        <rect x="76" y="47" width="2" height="7" fill="${currentColors.dark}" />
                        <rect x="75" y="62" width="3" height="4" fill="${currentColors.dark}" />

                        <!-- Center-left foliage cluster -->
                        <rect x="36" y="36" width="12" height="8" fill="${currentColors.leaves}" />
                        <rect x="34" y="44" width="14" height="8" fill="${currentColors.leaves}" />
                        <rect x="38" y="52" width="10" height="6" fill="${currentColors.leaves}" />
                        <rect x="40" y="28" width="8" height="8" fill="${currentColors.leaves}" />
                        <rect x="38" y="22" width="6" height="6" fill="${currentColors.leaves}" />

                        <!-- Center-left shadows -->
                        <rect x="44" y="44" width="4" height="8" fill="${currentColors.dark}" />
                        <rect x="45" y="52" width="3" height="5" fill="${currentColors.dark}" />

                        <!-- Center-right foliage cluster -->
                        <rect x="52" y="34" width="12" height="10" fill="${currentColors.leaves}" />
                        <rect x="52" y="44" width="14" height="8" fill="${currentColors.leaves}" />
                        <rect x="54" y="52" width="10" height="6" fill="${currentColors.leaves}" />
                        <rect x="54" y="26" width="10" height="8" fill="${currentColors.leaves}" />
                        <rect x="56" y="18" width="8" height="8" fill="${currentColors.leaves}" />

                        <!-- Center-right shadows -->
                        <rect x="62" y="44" width="4" height="8" fill="${currentColors.dark}" />
                        <rect x="61" y="52" width="3" height="5" fill="${currentColors.dark}" />

                        <!-- Top center foliage cluster -->
                        <rect x="44" y="20" width="10" height="8" fill="${currentColors.leaves}" />
                        <rect x="42" y="12" width="12" height="8" fill="${currentColors.leaves}" />
                        <rect x="46" y="6" width="6" height="6" fill="${currentColors.leaves}" />

                        <!-- Top shadows -->
                        <rect x="52" y="12" width="2" height="8" fill="${currentColors.dark}" />

                        <!-- Fruits on healthy trees -->
                        ${state === 0 ? `
                            <rect x="30" y="56" width="3" height="3" fill="${currentColors.fruit}" />
                            <rect x="42" y="50" width="3" height="3" fill="${currentColors.fruit}" />
                            <rect x="56" y="48" width="3" height="3" fill="${currentColors.fruit}" />
                            <rect x="70" y="52" width="3" height="3" fill="${currentColors.fruit}" />
                            <rect x="46" y="34" width="3" height="3" fill="${currentColors.fruit}" />
                            <rect x="60" y="38" width="3" height="3" fill="${currentColors.fruit}" />
                            <rect x="36" y="42" width="3" height="3" fill="${currentColors.fruit}" />
                        ` : ''}

                        <!-- Fewer fruits on slightly damaged -->
                        ${state === 1 ? `
                            <rect x="42" y="50" width="3" height="3" fill="${currentColors.fruit}" />
                            <rect x="56" y="48" width="3" height="3" fill="${currentColors.fruit}" />
                            <rect x="46" y="34" width="3" height="3" fill="${currentColors.fruit}" />
                            <rect x="36" y="42" width="3" height="3" fill="${currentColors.fruit}" />
                        ` : ''}

                        <!-- Damage indicators scattered -->
                        ${state >= 2 ? '<rect x="44" y="30" width="4" height="4" fill="#8B0000" /><rect x="34" y="38" width="3" height="3" fill="#8B0000" /><rect x="68" y="48" width="3" height="3" fill="#8B0000" />' : ''}
                        ${state >= 3 ? '<rect x="58" y="42" width="4" height="4" fill="#8B0000" /><rect x="40" y="52" width="3" height="3" fill="#8B0000" /><rect x="72" y="56" width="3" height="3" fill="#8B0000" />' : ''}
                        ${state === 4 ? '<rect x="50" y="36" width="4" height="4" fill="#8B0000" /><rect x="30" y="50" width="3" height="3" fill="#8B0000" /><rect x="64" y="50" width="3" height="3" fill="#8B0000" /><rect x="46" y="20" width="3" height="3" fill="#8B0000" />' : ''}
                    </svg>
                `;
    },

    generateMugSVG(state) {
        const waterHeights = [0, 12, 24, 36, 48];
        const waterHeight = waterHeights[state];
        const waterY = 68 - waterHeight;

        return `
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated; image-rendering: crisp-edges;">
                        <!-- Mug body (metallic silver/steel) -->
                        <rect x="32" y="24" width="36" height="4" fill="#B8B8B8" />
                        <rect x="28" y="28" width="44" height="4" fill="#C0C0C0" />
                        <rect x="28" y="32" width="44" height="36" fill="#A8A8A8" />
                        <rect x="32" y="68" width="36" height="4" fill="#787878" />

                        <!-- Metallic highlights (left side) -->
                        <rect x="28" y="32" width="4" height="32" fill="#DCDCDC" />
                        <rect x="32" y="34" width="4" height="28" fill="#E8E8E8" />
                        <rect x="36" y="36" width="2" height="24" fill="#F0F0F0" />

                        <!-- Metallic shadows (right side) -->
                        <rect x="68" y="32" width="4" height="36" fill="#707070" />
                        <rect x="64" y="34" width="4" height="32" fill="#808080" />
                        <rect x="60" y="36" width="2" height="28" fill="#909090" />

                        <!-- Metal rim shine -->
                        <rect x="34" y="24" width="8" height="2" fill="#E8E8E8" />
                        <rect x="56" y="24" width="6" height="2" fill="#909090" />

                        <!-- Mug inner rim (darker metal) -->
                        <rect x="32" y="28" width="36" height="4" fill="#505050" />
                        <rect x="34" y="29" width="4" height="2" fill="#606060" />

                        <!-- Handle (metallic steel) -->
                        <rect x="72" y="36" width="4" height="4" fill="#A0A0A0" />
                        <rect x="76" y="40" width="4" height="20" fill="#A8A8A8" />
                        <rect x="72" y="60" width="4" height="4" fill="#A0A0A0" />
                        <rect x="68" y="64" width="4" height="4" fill="#989898" />

                        <!-- Handle metallic highlight -->
                        <rect x="76" y="42" width="2" height="16" fill="#C8C8C8" />
                        <rect x="74" y="44" width="2" height="12" fill="#D8D8D8" />

                        <!-- Handle shadow -->
                        <rect x="78" y="44" width="2" height="12" fill="#707070" />

                        <!-- Bottom metallic reflection -->
                        <rect x="34" y="66" width="8" height="2" fill="#C0C0C0" />
                        <rect x="56" y="66" width="6" height="2" fill="#787878" />

                        <!-- Water -->
                        ${state > 0 ? `
                            <!-- Water body -->
                            <rect x="32" y="${waterY}" width="36" height="${waterHeight}" fill="#1E90FF" />

                            <!-- Water highlights -->
                            <rect x="34" y="${waterY + 4}" width="6" height="4" fill="#87CEEB" opacity="0.7" />
                            <rect x="42" y="${waterY + 8}" width="4" height="4" fill="#87CEEB" opacity="0.5" />
                            <rect x="52" y="${waterY + 6}" width="3" height="3" fill="#B0E0E6" opacity="0.6" />

                            <!-- Water shadows -->
                            <rect x="62" y="${waterY + 4}" width="6" height="${Math.min(waterHeight - 8, 20)}" fill="#1873CC" opacity="0.4" />
                        ` : ''}

                        <!-- Water surface shine -->
                        ${state > 0 ? `
                            <rect x="34" y="${waterY}" width="30" height="2" fill="#87CEEB" opacity="0.9" />
                            <rect x="36" y="${waterY + 2}" width="12" height="1" fill="#B0E0E6" opacity="0.7" />
                        ` : ''}

                        <!-- Bubbles when full (pixelated) -->
                        ${state === 4 ? `
                            <rect x="44" y="36" width="3" height="3" fill="#87CEEB" opacity="0.8">
                                <animate attributeName="y" from="36" to="30" dur="2s" repeatCount="indefinite" />
                                <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
                            </rect>
                            <rect x="54" y="40" width="2" height="2" fill="#87CEEB" opacity="0.8">
                                <animate attributeName="y" from="40" to="32" dur="1.8s" repeatCount="indefinite" />
                                <animate attributeName="opacity" from="0.8" to="0" dur="1.8s" repeatCount="indefinite" />
                            </rect>
                            <rect x="50" y="38" width="2" height="2" fill="#B0E0E6" opacity="0.8">
                                <animate attributeName="y" from="38" to="30" dur="2.2s" repeatCount="indefinite" />
                                <animate attributeName="opacity" from="0.8" to="0" dur="2.2s" repeatCount="indefinite" />
                            </rect>
                            <rect x="58" y="42" width="2" height="2" fill="#87CEEB" opacity="0.7">
                                <animate attributeName="y" from="42" to="34" dur="1.9s" repeatCount="indefinite" />
                                <animate attributeName="opacity" from="0.7" to="0" dur="1.9s" repeatCount="indefinite" />
                            </rect>
                        ` : ''}
                    </svg>
                `;
    },

    setupEventListeners() {
        const treeContainer = document.getElementById('tree-container');
        const mugContainer = document.getElementById('mug-container');

        treeContainer.addEventListener('click', () => this.handleTreeClick());
        mugContainer.addEventListener('click', () => this.handleMugClick());
    },

    handleTreeClick() {
        const treeSvg = document.getElementById('tree-svg');
        const mugSvg = document.getElementById('mug-svg');

        // If tree is dead and mug is full, water the tree
        if (this.currentTreeState === 4 && this.currentMugState === 4) {
            this.waterTree();
            return;
        }

        // If tree is dead but mug isn't full, show shake animation
        if (this.currentTreeState === 4) {
            treeSvg.classList.add('shake');
            this.showMessage('The tree needs water! Fill the mug first.');
            setTimeout(() => treeSvg.classList.remove('shake'), 500);
            return;
        }

        // Normal tree click - damage the tree
        treeSvg.classList.add('pulse');
        setTimeout(() => treeSvg.classList.remove('pulse'), 500);

        this.currentTreeState = Math.min(this.currentTreeState + 1, 4);
        this.updateTree();

        if (this.currentTreeState === 4) {
            this.showMessage('The tree has died! Fill the mug with water to revive it.');
        }
    },

    handleMugClick() {
        const mugSvg = document.getElementById('mug-svg');

        // If mug is full and tree is alive, show message
        if (this.currentMugState === 4 && this.currentTreeState < 4) {
            mugSvg.classList.add('shake');
            this.showMessage('The tree looks healthy! No need to water it.');
            setTimeout(() => mugSvg.classList.remove('shake'), 500);
            return;
        }

        // If mug is full and tree is dead, show message to click tree
        if (this.currentMugState === 4) {
            mugSvg.classList.add('bounce');
            this.showMessage('Click on the tree to water it!');
            setTimeout(() => mugSvg.classList.remove('bounce'), 600);
            return;
        }

        // Normal mug click - fill the mug
        mugSvg.classList.add('pulse');
        setTimeout(() => mugSvg.classList.remove('pulse'), 500);

        this.currentMugState = Math.min(this.currentMugState + 1, 4);
        this.updateMug();

        if (this.currentMugState === 4) {
            this.showMessage('Mug is full! Click on the dead tree to water it.');
        }
    },

    waterTree() {
        const treeSvg = document.getElementById('tree-svg');
        const mugSvg = document.getElementById('mug-svg');
        const treeContainer = document.getElementById('tree-container');

        // Animate mug element
        mugSvg.classList.add('pulse');

        this.showMessage('🌱 The tree is being watered!');

        // Create water drops
        this.createWaterDrops(treeContainer);

        // Reset states after animation
        setTimeout(() => {
            this.currentTreeState = 0;
            this.currentMugState = 0;
            this.updateTree();
            this.updateMug();
            treeSvg.classList.add('bounce');
            mugSvg.classList.remove('pulse');
            this.showMessage('🌱 The tree has been revived!');
            setTimeout(() => treeSvg.classList.remove('bounce'), 600);
        }, 2000);
    },

    createWaterDrops(container) {
        const dropCount = 15;
        const drops = [];

        for (let i = 0; i < dropCount; i++) {
            const drop = document.createElement('div');
            drop.className = 'water-drop';

            // Random horizontal position across the tree
            const leftPos = 20 + Math.random() * 60;
            drop.style.left = `${leftPos}%`;

            // Random delay for staggered effect
            drop.style.animationDelay = `${Math.random() * 0.5}s`;

            // Slight variation in animation duration
            drop.style.animationDuration = `${1.5 + Math.random() * 0.5}s`;

            container.appendChild(drop);
            drops.push(drop);
        }

        // Remove drops after animation
        setTimeout(() => {
            drops.forEach(drop => drop.remove());
        }, 2500);
    },

    updateTree() {
        const treeSvg = document.getElementById('tree-svg');
        const treeContainer = document.getElementById('tree-container');

        // Remove all state classes
        this.treeStates.forEach(state => {
            treeSvg.classList.remove(`tree-${state}`);
        });

        // Add current state class
        treeSvg.classList.add(`tree-${this.treeStates[this.currentTreeState]}`);

        // Update SVG content
        treeSvg.innerHTML = this.generateTreeSVG(this.currentTreeState);
        this.updateTooltips();
    },

    updateMug() {
        const mugSvg = document.getElementById('mug-svg');
        const mugContainer = document.getElementById('mug-container');

        // Remove all state classes
        this.mugStates.forEach(state => {
            mugSvg.classList.remove(`mug-${state}`);
        });

        // Add current state class
        mugSvg.classList.add(`mug-${this.mugStates[this.currentMugState]}`);

        // Update SVG content
        mugSvg.innerHTML = this.generateMugSVG(this.currentMugState);
        this.updateTooltips();
    },

    updateTooltips() {
        const treeTooltip = document.getElementById('tree-tooltip');
        const mugTooltip = document.getElementById('mug-tooltip');

        if (this.currentTreeState === 4) {
            treeTooltip.textContent = this.currentMugState === 4 ?
                'Click to water the plant!' : 'Water the plant';
        } else {
            treeTooltip.textContent = 'Click the tree';
        }

        if (this.currentMugState === 4) {
            mugTooltip.textContent = this.currentTreeState === 4 ?
                'Click on the plant!' : 'Mug is full!';
        } else {
            mugTooltip.textContent = 'Click to fill with water';
        }
    },

    showMessage(text) {
        const message = document.getElementById('game-message');
        message.textContent = text;
        message.classList.add('show');

        setTimeout(() => {
            message.classList.remove('show');
        }, 3000);
    },

    resetGame() {
        this.currentTreeState = 0;
        this.currentMugState = 0;
        this.updateTree();
        this.updateMug();
        this.showMessage('Game reset!');
    }
};