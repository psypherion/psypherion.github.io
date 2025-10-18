class StarsBackground {
    constructor() {
        this.container = null;
        this.starCount = 90;
        this.shootingStarCount = 15;
        this.constellationCount = 10;
        this.init();
    }

    init() {
        this.createContainer();
        this.generateStars();
        this.generateShootingStars();
        this.generateConstellations();
        this.startRandomBlinks();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'stars-container';
        document.body.appendChild(this.container);
    }

    generateStars() {
        for (let i = 0; i < this.starCount; i++) {
            const star = document.createElement('div');
            const size = Math.random();
            
            // Assign size class
            if (size < 0.4) star.className = 'star tiny';
            else if (size < 0.7) star.className = 'star small';
            else if (size < 0.9) star.className = 'star medium';
            else star.className = 'star large';

            // Random position
            const left = Math.random() * 100;
            const top = Math.random() * 100;

            // Random animation
            const animations = ['starBlink', 'starBlink2', 'starBlink3', 'starBlink4', 'starTwinkle'];
            const animation = animations[Math.floor(Math.random() * animations.length)];
            
            // Random properties
            const duration = 2 + Math.random() * 4; // 2-6 seconds
            const delay = Math.random() * 5; // 0-5 seconds delay
            const opacity = 0.3 + Math.random() * 0.7; // 0.3-1 opacity

            star.style.left = `${left}%`;
            star.style.top = `${top}%`;
            star.style.animationName = animation;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;
            star.style.opacity = opacity;

            // Add some stars with multiple blinks
            if (Math.random() > 0.8) {
                star.style.animationIterationCount = 'infinite, infinite';
            }

            this.container.appendChild(star);
        }
    }

    generateShootingStars() {
        for (let i = 0; i < this.shootingStarCount; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            
            // Random start position
            const startX = Math.random() * 100;
            const startY = Math.random() * 50; // Start from top half
            
            // Random delay and duration
            const delay = Math.random() * 15; // 0-15 seconds delay
            const duration = 2 + Math.random() * 3; // 2-5 seconds duration
            
            shootingStar.style.left = `${startX}%`;
            shootingStar.style.top = `${startY}%`;
            shootingStar.style.animationDelay = `${delay}s`;
            shootingStar.style.animationDuration = `${duration}s`;

            this.container.appendChild(shootingStar);
        }
    }

    generateConstellations() {
        for (let i = 0; i < this.constellationCount; i++) {
            const constellation = document.createElement('div');
            constellation.className = 'constellation';
            
            // Random position
            const left = 10 + Math.random() * 80; // Avoid edges
            const top = 10 + Math.random() * 80;
            
            // Random size and timing
            const size = 1 + Math.random() * 2; // 1-3px
            const delay = Math.random() * 10;
            const duration = 6 + Math.random() * 8; // 6-14 seconds
            
            constellation.style.left = `${left}%`;
            constellation.style.top = `${top}%`;
            constellation.style.width = `${size}px`;
            constellation.style.height = `${size}px`;
            constellation.style.animationDelay = `${delay}s`;
            constellation.style.animationDuration = `${duration}s`;

            this.container.appendChild(constellation);

            // Add small stars around constellation
            this.addConstellationStars(left, top);
        }
    }

    addConstellationStars(centerX, centerY) {
        const starCount = 3 + Math.floor(Math.random() * 4); // 3-6 stars
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star small';
            
            // Position around constellation center
            const angle = (i / starCount) * Math.PI * 2;
            const distance = 2 + Math.random() * 8; // 2-10% distance
            const left = centerX + Math.cos(angle) * distance;
            const top = centerY + Math.sin(angle) * distance;
            
            // Random timing
            const delay = Math.random() * 5;
            const duration = 3 + Math.random() * 4;
            
            star.style.left = `${left}%`;
            star.style.top = `${top}%`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${duration}s`;

            this.container.appendChild(star);
        }
    }

    startRandomBlinks() {
        // Additional random blinking for some stars
        setInterval(() => {
            const stars = this.container.querySelectorAll('.star');
            const randomStar = stars[Math.floor(Math.random() * stars.length)];
            
            if (randomStar && Math.random() > 0.7) {
                this.triggerExtraBlink(randomStar);
            }
        }, 1000);
    }

    triggerExtraBlink(star) {
        const originalAnimation = star.style.animation;
        
        // Quick blink
        star.style.animation = 'none';
        setTimeout(() => {
            star.style.animation = 'starBlink 0.3s ease-in-out';
            setTimeout(() => {
                star.style.animation = originalAnimation;
            }, 300);
        }, 10);
    }

    // Method to adjust star density based on performance
    adjustDensity() {
        const stars = this.container.querySelectorAll('.star');
        const currentCount = stars.length;
        
        // Reduce count if too many stars (for performance)
        if (currentCount > 200) {
            const toRemove = currentCount - 150;
            for (let i = 0; i < toRemove; i++) {
                if (stars[i]) {
                    stars[i].remove();
                }
            }
        }
    }

    // Cleanup method
    destroy() {
        if (this.container) {
            this.container.remove();
        }
    }
}

// Initialize stars when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.starsBackground = new StarsBackground();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StarsBackground;
}