// Floating Technologies Animation
class FloatingTechnologies {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.technologies = [
            { name: 'React', color: '#61DAFB', icon: '⚛️' },
            { name: 'Flutter', color: '#02569B', icon: '📱' },
            { name: 'Python', color: '#3776AB', icon: '🐍' },
            { name: 'JavaScript', color: '#F7DF1E', icon: '⚡' },
            { name: 'Swift', color: '#FA7343', icon: '🍎' },
            { name: 'Kotlin', color: '#7F52FF', icon: '🤖' },
            { name: 'Node.js', color: '#339933', icon: '🟢' },
            { name: 'AI/ML', color: '#FF6F00', icon: '🤖' },
            { name: 'UI/UX', color: '#FF3366', icon: '🎨' },
            { name: 'Cloud', color: '#4285F4', icon: '☁️' }
        ];
        
        this.items = [];
        this.init();
        this.animate();
    }
    
    init() {
        const rect = this.container.getBoundingClientRect();
        
        this.technologies.forEach((tech, index) => {
            const element = document.createElement('div');
            element.className = 'tech-float-item';
            element.innerHTML = `
                <div class="tech-icon">${tech.icon}</div>
                <div class="tech-name">${tech.name}</div>
            `;
            element.style.borderColor = tech.color;
            this.container.appendChild(element);
            
            this.items.push({
                element,
                x: Math.random() * (rect.width - 100),
                y: Math.random() * (rect.height - 100),
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                color: tech.color
            });
        });
    }
    
    animate() {
        const rect = this.container.getBoundingClientRect();
        
        this.items.forEach(item => {
            // Update position
            item.x += item.vx;
            item.y += item.vy;
            
            // Bounce off walls
            if (item.x <= 0 || item.x >= rect.width - 100) {
                item.vx *= -1;
                item.x = Math.max(0, Math.min(rect.width - 100, item.x));
            }
            if (item.y <= 0 || item.y >= rect.height - 100) {
                item.vy *= -1;
                item.y = Math.max(0, Math.min(rect.height - 100, item.y));
            }
            
            // Apply position
            item.element.style.transform = `translate(${item.x}px, ${item.y}px)`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FloatingTechnologies('tech-float-container');
});
