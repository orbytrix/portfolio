// Futuristic Company Website - Projects Management

// State elements
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const emptyState = document.getElementById('empty-state');
const projectsGrid = document.getElementById('projects-grid');
const errorMessage = document.getElementById('error-message');

// Load projects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});

/**
 * Fetch and load projects from JSON file
 */
async function loadProjects() {
    try {
        // Show loading state
        showLoadingState();

        // Try to fetch projects data
        const response = await fetch('data/projects.json');

        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON data
        const data = await response.json();

        // Validate data structure
        if (!data || !data.projects) {
            throw new Error('Invalid project data structure');
        }

        // Check if projects array is empty
        if (data.projects.length === 0) {
            showEmptyState();
            return;
        }

        // Render projects
        renderProjects(data.projects);

    } catch (error) {
        console.error('Error loading projects:', error);
        // Use fallback data if fetch fails (e.g., when opening file:// directly)
        loadFallbackProjects();
    }
}

/**
 * Load fallback projects data (for file:// protocol or fetch errors)
 */
function loadFallbackProjects() {
    const fallbackProjects = [
        {
            id: "ai-business-assistant",
            title: "AI Business Assistant - VoiceFlow",
            description: "Voice-activated AI assistant that manages business operations like a CEO, understanding natural language and making autonomous decisions.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
            technologies: ["AI/ML", "Python", "Natural Language Processing", "Voice Recognition", "TensorFlow"],
            category: "Artificial Intelligence",
            date: "2024-10",
            featured: true,
            link: "#"
        },
        {
            id: "ecommerce-mobile-app",
            title: "ShopEase - E-Commerce Mobile App",
            description: "Cross-platform mobile shopping app built with Flutter, featuring AI-powered product recommendations and seamless checkout.",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
            technologies: ["Flutter", "Dart", "Firebase", "AI/ML", "Stripe"],
            category: "Mobile Development",
            date: "2024-09",
            featured: true,
            link: "#"
        },
        {
            id: "healthcare-management-system",
            title: "MediCare Pro - Healthcare Management",
            description: "Comprehensive healthcare management system with patient portals, appointment scheduling, and telemedicine capabilities.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
            technologies: ["React", "Node.js", "MongoDB", "WebRTC", "AWS"],
            category: "Web Development",
            date: "2024-08",
            featured: false,
            link: "#"
        },
        {
            id: "fitness-tracking-ios-app",
            title: "FitTrack - iOS Fitness App",
            description: "Native iOS fitness tracking app with AI-powered workout plans, nutrition tracking, and social features.",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
            technologies: ["Swift", "SwiftUI", "CoreML", "HealthKit", "Firebase"],
            category: "Mobile Development",
            date: "2024-07",
            featured: true,
            link: "#"
        },
        {
            id: "restaurant-management-app",
            title: "RestaurantHub - Management Platform",
            description: "Complete restaurant management solution with POS, inventory, staff scheduling, and customer loyalty programs.",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
            technologies: ["React", "React Native", "Node.js", "PostgreSQL", "Redis"],
            category: "Web & Mobile",
            date: "2024-06",
            featured: false,
            link: "#"
        },
        {
            id: "real-estate-platform",
            title: "PropFinder - Real Estate Platform",
            description: "Modern real estate platform with virtual tours, AI-powered property matching, and integrated mortgage calculators.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
            technologies: ["Next.js", "TypeScript", "Three.js", "PostgreSQL", "AWS"],
            category: "Web Development",
            date: "2024-05",
            featured: false,
            link: "#"
        },
        {
            id: "education-learning-app",
            title: "EduLearn - Online Learning Platform",
            description: "Interactive online learning platform with live classes, AI tutoring, progress tracking, and gamification.",
            image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
            technologies: ["React", "Python", "Django", "WebRTC", "TensorFlow"],
            category: "EdTech",
            date: "2024-04",
            featured: false,
            link: "#"
        },
        {
            id: "social-media-android-app",
            title: "ConnectNow - Social Networking App",
            description: "Native Android social networking app with real-time messaging, stories, and AI-powered content discovery.",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
            technologies: ["Kotlin", "Android Jetpack", "Firebase", "WebRTC", "ML Kit"],
            category: "Mobile Development",
            date: "2024-03",
            featured: false,
            link: "#"
        },
        {
            id: "inventory-management-system",
            title: "StockMaster - Inventory Management",
            description: "Cloud-based inventory management system with barcode scanning, automated reordering, and multi-location support.",
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
            technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "Docker"],
            category: "Business Software",
            date: "2024-02",
            featured: false,
            link: "#"
        },
        {
            id: "travel-booking-platform",
            title: "TravelEase - Booking Platform",
            description: "Comprehensive travel booking platform with flights, hotels, activities, and AI-powered trip planning.",
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
            technologies: ["React", "Node.js", "GraphQL", "MongoDB", "Stripe"],
            category: "Travel Tech",
            date: "2024-01",
            featured: false,
            link: "#"
        },
        {
            id: "crm-sales-platform",
            title: "SalesPro - CRM & Sales Platform",
            description: "Modern CRM system with lead management, sales pipeline, email automation, and analytics dashboard.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
            technologies: ["Angular", "NestJS", "PostgreSQL", "Redis", "Elasticsearch"],
            category: "Business Software",
            date: "2023-12",
            featured: false,
            link: "#"
        }
    ];

    renderProjects(fallbackProjects);
}

/**
 * Render project cards to the grid
 * @param {Array} projects - Array of project objects
 */
function renderProjects(projects) {
    // Clear existing content
    projectsGrid.innerHTML = '';

    // Create and append project cards
    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsGrid.appendChild(projectCard);
    });

    // Show projects grid
    showProjectsGrid();
}

/**
 * Create a project card element
 * @param {Object} project - Project data object
 * @param {number} index - Project index for animation delay
 * @returns {HTMLElement} Project card element
 */
function createProjectCard(project, index) {
    // Create card container
    const card = document.createElement('article');
    card.className = 'glass-card overflow-hidden project-card project-card-stagger group';
    card.style.animationDelay = `${index * 0.1}s`;
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', `Project: ${escapeHtml(project.title)}`);

    // Add data attribute for 3D tilt effect
    card.dataset.tiltEnabled = 'true';

    // Create card content
    card.innerHTML = `
        <!-- Project Image -->
        <div class="relative h-48 overflow-hidden bg-slate-800 project-image-placeholder">
            <img 
                data-src="${escapeHtml(project.image)}" 
                alt="${escapeHtml(project.title)} project screenshot"
                class="project-image w-full h-full object-cover transition-all duration-500"
                loading="lazy"
                onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23334155%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%236b7280%22 font-family=%22Arial%22 font-size=%2220%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImage Not Available%3C/text%3E%3C/svg%3E'; this.alt='${escapeHtml(project.title)} - Image not available'"
            />
            ${project.featured ? '<div class="absolute top-4 right-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold neon-glow" aria-label="Featured project">Featured</div>' : ''}
        </div>

        <!-- Project Content -->
        <div class="p-6">
            <!-- Project Title -->
            <h3 class="project-title text-2xl font-bold mb-3 text-cyan-400 transition-all duration-300">
                ${escapeHtml(project.title)}
            </h3>

            <!-- Project Description -->
            <p class="text-gray-400 mb-4 line-clamp-3">
                ${escapeHtml(project.description)}
            </p>

            <!-- Project Category & Date -->
            <div class="flex items-center gap-4 mb-4 text-sm text-gray-500" aria-label="Project metadata">
                <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    <span class="sr-only">Category:</span>
                    ${escapeHtml(project.category)}
                </span>
                <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span class="sr-only">Date:</span>
                    ${formatDate(project.date)}
                </span>
            </div>

            <!-- Technologies -->
            <div class="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies used">
                ${project.technologies.slice(0, 3).map(tech => `
                    <span class="tech-badge px-3 py-1 bg-slate-800 text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/30 transition-all duration-300" role="listitem">
                        ${escapeHtml(tech)}
                    </span>
                `).join('')}
                ${project.technologies.length > 3 ? `
                    <span class="px-3 py-1 bg-slate-800 text-gray-400 rounded-full text-xs font-medium border border-gray-500/30" role="listitem" aria-label="${project.technologies.length - 3} more technologies">
                        +${project.technologies.length - 3} more
                    </span>
                ` : ''}
            </div>

            <!-- View Project Link -->
            ${project.link ? `
                <a 
                    href="${escapeHtml(project.link)}" 
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                    aria-label="View ${escapeHtml(project.title)} project (opens in new tab)"
                >
                    View Project
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </a>
            ` : ''}
        </div>
    `;

    // Initialize 3D tilt effect for this card
    init3DTiltEffect(card);

    return card;
}

/**
 * Format date string to readable format
 * @param {string} dateStr - Date string (YYYY-MM format)
 * @returns {string} Formatted date
 */
function formatDate(dateStr) {
    if (!dateStr) return 'N/A';

    try {
        const [year, month] = dateStr.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch (error) {
        return dateStr;
    }
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Show loading state
 */
function showLoadingState() {
    loadingState.classList.remove('hidden');
    errorState.classList.add('hidden');
    emptyState.classList.add('hidden');
    projectsGrid.classList.add('hidden');
}

/**
 * Show error state
 * @param {string} message - Error message to display
 */
function showErrorState(message) {
    loadingState.classList.add('hidden');
    errorState.classList.remove('hidden');
    emptyState.classList.add('hidden');
    projectsGrid.classList.add('hidden');

    if (message) {
        errorMessage.textContent = message;
    }
}

/**
 * Show empty state
 */
function showEmptyState() {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    emptyState.classList.remove('hidden');
    projectsGrid.classList.add('hidden');
}

/**
 * Show projects grid
 */
function showProjectsGrid() {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    emptyState.classList.add('hidden');
    projectsGrid.classList.remove('hidden');

    // Initialize lazy loading for project images
    initLazyLoading();
}

/**
 * Initialize lazy loading for project images using Intersection Observer
 */
function initLazyLoading() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: load all images immediately
        document.querySelectorAll('.project-image[data-src]').forEach(img => {
            loadImage(img);
        });
        return;
    }

    // Create Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px' // Start loading 50px before image enters viewport
    });

    // Observe all project images
    document.querySelectorAll('.project-image[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Load an image and handle loading state
 * @param {HTMLImageElement} img - Image element to load
 */
function loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;

    // Create a new image to preload
    const tempImg = new Image();

    tempImg.onload = () => {
        img.src = src;
        img.classList.add('loaded');
        // Remove placeholder background from parent
        const parent = img.parentElement;
        if (parent) {
            parent.classList.remove('project-image-placeholder');
        }
    };

    tempImg.onerror = () => {
        // Trigger the onerror handler on the actual image
        img.src = src;
    };

    tempImg.src = src;
}

/**
 * Initialize 3D tilt effect on a project card
 * @param {HTMLElement} card - Project card element
 */
function init3DTiltEffect(card) {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    // Check if tilt is enabled for this card
    if (card.dataset.tiltEnabled !== 'true') {
        return;
    }

    // Tilt settings
    const maxTilt = 10; // Maximum tilt angle in degrees
    const perspective = 1000; // Perspective value

    card.addEventListener('mouseenter', function () {
        card.classList.add('tilt-active');
    });

    card.addEventListener('mousemove', function (e) {
        if (!card.classList.contains('tilt-active')) return;

        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;

        // Calculate mouse position relative to card center
        const centerX = rect.left + cardWidth / 2;
        const centerY = rect.top + cardHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate tilt angles
        const rotateX = (mouseY / cardHeight) * maxTilt * -1;
        const rotateY = (mouseX / cardWidth) * maxTilt;

        // Apply 3D transform
        card.style.transform = `
            perspective(${perspective}px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
            scale(1.03)
        `;
    });

    card.addEventListener('mouseleave', function () {
        card.classList.remove('tilt-active');
        // Reset transform with smooth transition
        card.style.transform = '';
    });
}
