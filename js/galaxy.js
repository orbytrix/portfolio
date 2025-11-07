// Galaxy Animation for Hero Section
class GalaxyAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.shootingStars = [];
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        // Create stars
        const starCount = window.innerWidth < 768 ? 100 : 200;
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 1.5,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random()
            });
        }
    }
    
    createShootingStar() {
        if (Math.random() < 0.01) {
            this.shootingStars.push({
                x: Math.random() * this.canvas.width,
                y: 0,
                length: Math.random() * 80 + 20,
                speed: Math.random() * 10 + 5,
                opacity: 1
            });
        }
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw and update stars
        this.stars.forEach(star => {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(6, 182, 212, ${star.opacity})`;
            this.ctx.fill();
            
            // Move star
            star.y += star.speed;
            if (star.y > this.canvas.height) {
                star.y = 0;
                star.x = Math.random() * this.canvas.width;
            }
            
            // Twinkle effect
            star.opacity += (Math.random() - 0.5) * 0.1;
            star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        });
        
        // Create and draw shooting stars
        this.createShootingStar();
        this.shootingStars = this.shootingStars.filter(star => {
            this.ctx.beginPath();
            this.ctx.moveTo(star.x, star.y);
            this.ctx.lineTo(star.x + star.length, star.y + star.length);
            this.ctx.strokeStyle = `rgba(168, 85, 247, ${star.opacity})`;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            star.x += star.speed;
            star.y += star.speed;
            star.opacity -= 0.01;
            
            return star.opacity > 0 && star.x < this.canvas.width;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize hero messages animation
function initHeroMessages() {
    const messages = document.querySelectorAll('.hero-message');
    messages.forEach((message, index) => {
        const delay = parseInt(message.dataset.delay) * 1000;
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, delay);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GalaxyAnimation('galaxy-canvas');
    initHeroMessages();
});
