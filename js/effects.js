// Futuristic Company Website - Visual Effects

// Performance detection
let isLowEndDevice = false;
let prefersReducedMotion = false;

// Initialize effects on DOM load
document.addEventListener('DOMContentLoaded', function() {
    checkPerformance();
    checkReducedMotionPreference();
    initParticleSystem();
    initParallaxScrolling();
    initScrollAnimations();
    initResponsiveHandlers();
    initLazyLoadingForAllImages();
    optimizeAnimationPerformance();
    console.log('Effects system ready', { isLowEndDevice, prefersReducedMotion });
});

// Handle responsive adjustments on window resize
function initResponsiveHandlers() {
    let resizeTimer;
    let lastWidth = window.innerWidth;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        
        resizeTimer = setTimeout(function() {
            const currentWidth = window.innerWidth;
            
            // Only reinitialize if crossing major breakpoints
            if ((lastWidth < 768 && currentWidth >= 768) || 
                (lastWidth >= 768 && currentWidth < 768) ||
                (lastWidth < 480 && currentWidth >= 480) ||
                (lastWidth >= 480 && currentWidth < 480)) {
                
                console.log('Breakpoint crossed, adjusting effects');
                
                // Reinitialize particle system with new count
                const particlesContainer = document.getElementById('particles-container');
                if (particlesContainer && !prefersReducedMotion && !isLowEndDevice) {
                    particlesContainer.innerHTML = '';
                    initParticleSystem();
                }
            }
            
            lastWidth = currentWidth;
        }, 250);
    });
}

// Check device performance capabilities
function checkPerformance() {
    // Check for low-end device indicators
    const checks = {
        // Check hardware concurrency (CPU cores)
        lowCores: navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4,
        
        // Check device memory (if available)
        lowMemory: navigator.deviceMemory && navigator.deviceMemory < 4,
        
        // Check connection speed (if available)
        slowConnection: navigator.connection && 
                       (navigator.connection.effectiveType === 'slow-2g' || 
                        navigator.connection.effectiveType === '2g' ||
                        navigator.connection.effectiveType === '3g'),
        
        // Check if mobile device (generally less powerful)
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        
        // Check screen size as proxy for device capability
        smallScreen: window.innerWidth < 768
    };
    
    // Consider it low-end if multiple indicators are present
    const lowEndIndicators = Object.values(checks).filter(Boolean).length;
    isLowEndDevice = lowEndIndicators >= 2;
    
    // Log performance info for debugging
    if (isLowEndDevice) {
        console.log('Low-end device detected, optimizing effects', checks);
    }
    
    return isLowEndDevice;
}

// Check for reduced motion preference
function checkReducedMotionPreference() {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Listen for changes to the preference
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        prefersReducedMotion = e.matches;
        console.log('Reduced motion preference changed:', prefersReducedMotion);
        
        // Reinitialize effects with new preference
        if (prefersReducedMotion) {
            disableAnimations();
        }
    });
    
    return prefersReducedMotion;
}

// Disable animations for reduced motion preference
function disableAnimations() {
    // Make all animated elements visible immediately
    document.querySelectorAll('.reveal-on-scroll, .fade-in-up, .fade-in, .fade-in-left, .fade-in-right').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.classList.add('visible');
        element.classList.remove('hidden');
    });
    
    // Remove particle container if present
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
    }
}

// Particle System
function initParticleSystem() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    // Check for reduced motion preference
    if (prefersReducedMotion) {
        return;
    }
    
    // Disable particles on low-end devices
    if (isLowEndDevice) {
        console.log('Particles disabled for performance');
        return;
    }
    
    // Determine particle count based on screen size and performance
    const screenWidth = window.innerWidth;
    let particleCount;
    
    if (isLowEndDevice) {
        particleCount = 0; // Already handled above, but keeping for clarity
    } else if (screenWidth < 480) {
        // Small mobile devices - minimal particles
        particleCount = 10;
    } else if (screenWidth < 768) {
        // Mobile devices - reduced particles
        particleCount = 15;
    } else if (screenWidth < 1024) {
        // Tablets - moderate particles
        particleCount = 25;
    } else {
        // Desktop - full particle count
        particleCount = 40;
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 2-6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random color (cyan or purple tones)
    const colors = [
        'rgba(6, 182, 212, 0.6)',    // cyan
        'rgba(168, 85, 247, 0.6)',   // purple
        'rgba(34, 211, 238, 0.6)',   // light cyan
        'rgba(236, 72, 153, 0.6)'    // pink
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Random animation duration and delay
    const duration = Math.random() * 4 + 4; // 4-8 seconds
    const delay = Math.random() * 2; // 0-2 seconds
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
}

// Parallax Scrolling Effect
function initParallaxScrolling() {
    const parallaxElements = document.querySelectorAll('.parallax-bg > div');
    if (parallaxElements.length === 0) return;
    
    // Check for reduced motion preference
    if (prefersReducedMotion) {
        return;
    }
    
    // Disable parallax on low-end devices for better performance
    if (isLowEndDevice) {
        console.log('Parallax disabled for performance');
        return;
    }
    
    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const speed = parseFloat(element.dataset.speed) || 0.5;
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Scroll-triggered Fade-in Animations using Intersection Observer
function initScrollAnimations() {
    // Check for reduced motion preference
    if (prefersReducedMotion) {
        // Make all elements visible immediately
        document.querySelectorAll('.reveal-on-scroll, .fade-in-up, .fade-in, .fade-in-left, .fade-in-right').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.classList.add('visible');
            element.classList.remove('hidden');
        });
        return;
    }
    
    // Adjust observer options based on device performance
    const observerOptions = {
        threshold: isLowEndDevice ? 0.05 : 0.1, // Lower threshold for low-end devices
        rootMargin: isLowEndDevice ? '0px 0px -20px 0px' : '0px 0px -50px 0px' // Trigger earlier on low-end devices
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get delay from data attribute if present
                const delay = parseInt(entry.target.dataset.delay) || 0;
                
                // Reduce or remove delays on low-end devices
                const actualDelay = isLowEndDevice ? 0 : delay;
                
                // Trigger animation with delay
                setTimeout(() => {
                    if (entry.target.classList.contains('reveal-on-scroll')) {
                        entry.target.classList.add('revealed');
                    }
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('hidden');
                }, actualDelay);
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.reveal-on-scroll, .fade-in-up, .fade-in, .fade-in-left, .fade-in-right').forEach(element => {
        // Initially hide elements that should animate on scroll
        if (element.classList.contains('fade-in-up') || 
            element.classList.contains('fade-in') ||
            element.classList.contains('fade-in-left') ||
            element.classList.contains('fade-in-right')) {
            element.classList.add('hidden');
        }
        observer.observe(element);
    });
}

// Initialize lazy loading for all images on the page
function initLazyLoadingForAllImages() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: load all images immediately
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
        });
        return;
    }
    
    // Create Intersection Observer for lazy loading images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Load the image
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                
                // Load srcset if available
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
                
                // Add loaded class for fade-in effect
                img.addEventListener('load', function() {
                    img.classList.add('loaded');
                });
                
                // Stop observing this image
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px' // Start loading 50px before image enters viewport
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    console.log('Lazy loading initialized for', document.querySelectorAll('img[data-src]').length, 'images');
}

// Optimize animation performance
function optimizeAnimationPerformance() {
    // Remove will-change property after animations complete to save resources
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .project-card, .hover-tilt');
    
    animatedElements.forEach(element => {
        // Listen for animation end
        element.addEventListener('animationend', function() {
            element.style.willChange = 'auto';
        });
        
        // Listen for transition end
        element.addEventListener('transitionend', function() {
            if (!element.matches(':hover')) {
                element.style.willChange = 'auto';
            }
        });
    });
    
    // Pause animations when page is not visible (tab switching)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden, pause animations
            document.body.classList.add('animations-paused');
        } else {
            // Page is visible, resume animations
            document.body.classList.remove('animations-paused');
        }
    });
    
    // Throttle scroll-based animations on low-end devices
    if (isLowEndDevice) {
        console.log('Throttling animations for low-end device');
        
        // Reduce animation durations
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.3s !important;
                transition-duration: 0.2s !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('Animation performance optimizations applied');
}

// Monitor performance metrics
function monitorPerformance() {
    // Check if Performance API is available
    if (!window.performance || !window.performance.getEntriesByType) {
        return;
    }
    
    // Log performance metrics after page load
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.getEntriesByType('navigation')[0];
            
            if (perfData) {
                console.log('Performance Metrics:', {
                    'DNS Lookup': Math.round(perfData.domainLookupEnd - perfData.domainLookupStart) + 'ms',
                    'TCP Connection': Math.round(perfData.connectEnd - perfData.connectStart) + 'ms',
                    'Request Time': Math.round(perfData.responseStart - perfData.requestStart) + 'ms',
                    'Response Time': Math.round(perfData.responseEnd - perfData.responseStart) + 'ms',
                    'DOM Processing': Math.round(perfData.domComplete - perfData.domLoading) + 'ms',
                    'Total Load Time': Math.round(perfData.loadEventEnd - perfData.fetchStart) + 'ms'
                });
            }
            
            // Log resource timing
            const resources = window.performance.getEntriesByType('resource');
            const imageResources = resources.filter(r => r.initiatorType === 'img');
            const scriptResources = resources.filter(r => r.initiatorType === 'script');
            const styleResources = resources.filter(r => r.initiatorType === 'link' || r.initiatorType === 'css');
            
            console.log('Resource Loading:', {
                'Total Resources': resources.length,
                'Images': imageResources.length,
                'Scripts': scriptResources.length,
                'Stylesheets': styleResources.length
            });
            
            // Warn about slow resources
            resources.forEach(resource => {
                if (resource.duration > 1000) {
                    console.warn('Slow resource detected:', resource.name, Math.round(resource.duration) + 'ms');
                }
            });
        }, 1000);
    });
}

// Initialize performance monitoring
if (window.location.search.includes('debug=true')) {
    monitorPerformance();
}
