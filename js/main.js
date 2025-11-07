// Futuristic Company Website - Main JavaScript

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initResponsiveUtilities();
});

// Responsive utilities for better mobile experience
function initResponsiveUtilities() {
    // Fix viewport height on mobile browsers (address bar issue)
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set on load
    setViewportHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', function() {
        setTimeout(setViewportHeight, 100);
    });
    
    // Detect if user is on a touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
    
    // Add screen size class to body for conditional styling
    function updateScreenSizeClass() {
        const width = window.innerWidth;
        document.body.classList.remove('screen-mobile', 'screen-tablet', 'screen-desktop');
        
        if (width < 768) {
            document.body.classList.add('screen-mobile');
        } else if (width < 1024) {
            document.body.classList.add('screen-tablet');
        } else {
            document.body.classList.add('screen-desktop');
        }
    }
    
    updateScreenSizeClass();
    window.addEventListener('resize', updateScreenSizeClass);
}

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle with smooth transitions
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Prevent menu button from triggering document click handler
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle menu visibility with animation
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                // Trigger reflow for animation
                setTimeout(() => {
                    mobileMenu.classList.add('show');
                }, 10);
                // Prevent body scroll when menu is open
                document.body.style.overflow = 'hidden';
            } else {
                closeMobileMenu();
            }
            
            // Animate button
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
                mobileMenuBtn.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mobileMenuBtn.contains(event.target) || mobileMenu.contains(event.target);
            if (!isClickInsideNav && !mobileMenu.classList.contains('hidden')) {
                closeMobileMenu();
                mobileMenuBtn.classList.remove('active');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                closeMobileMenu();
                mobileMenuBtn.classList.remove('active');
            }
        });
        
        // Handle orientation change
        window.addEventListener('orientationchange', function() {
            if (!mobileMenu.classList.contains('hidden')) {
                closeMobileMenu();
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
    
    // Update active navigation state
    updateActiveNav();
    
    // Add scroll effect to navigation
    addScrollEffect();
}

// Helper function to close mobile menu
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.remove('show');
        // Wait for animation to complete before hiding
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Update active navigation link based on current page
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        // Handle both direct matches and index.html as default
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Add scroll effect to navigation bar
function addScrollEffect() {
    const nav = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 4px 20px rgba(6, 182, 212, 0.2)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// Initialize smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


// Contact Form Validation
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('success-message');
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Real-time validation on blur
    nameInput.addEventListener('blur', () => validateField(nameInput, 'Name is required'));
    emailInput.addEventListener('blur', () => validateEmail(emailInput));
    subjectInput.addEventListener('blur', () => validateField(subjectInput, 'Subject is required'));
    messageInput.addEventListener('blur', () => validateField(messageInput, 'Message is required'));
    
    // Clear error on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                clearError(input);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateField(nameInput, 'Name is required');
        const isEmailValid = validateEmail(emailInput);
        const isSubjectValid = validateField(subjectInput, 'Subject is required');
        const isMessageValid = validateField(messageInput, 'Message is required');
        
        // If all fields are valid, submit the form
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            submitForm(form, successMessage);
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.form-input.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
    
    // Validate a required field
    function validateField(input, errorMessage) {
        const value = input.value.trim();
        
        if (value === '') {
            showError(input, errorMessage);
            return false;
        } else {
            showSuccess(input);
            return true;
        }
    }
    
    // Validate email field
    function validateEmail(input) {
        const value = input.value.trim();
        
        if (value === '') {
            showError(input, 'Email is required');
            return false;
        } else if (!emailRegex.test(value)) {
            showError(input, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(input);
            return true;
        }
    }
    
    // Show error state
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        input.classList.add('error');
        input.classList.remove('success');
        
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        errorElement.classList.add('show');
    }
    
    // Show success state
    function showSuccess(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        input.classList.remove('error');
        input.classList.add('success');
        
        errorElement.classList.remove('show');
        setTimeout(() => {
            errorElement.classList.add('hidden');
        }, 300);
    }
    
    // Clear error state
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        input.classList.remove('error');
        
        errorElement.classList.remove('show');
        setTimeout(() => {
            errorElement.classList.add('hidden');
        }, 300);
    }
    
    // Submit form (simulated)
    function submitForm(form, successMessage) {
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Add loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Remove loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            
            // Show success message with animation
            successMessage.classList.remove('hidden');
            setTimeout(() => {
                successMessage.classList.add('show');
            }, 10);
            
            // Reset form
            form.reset();
            
            // Clear all success states
            form.querySelectorAll('.form-input').forEach(input => {
                input.classList.remove('success', 'error');
            });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 400);
            }, 5000);
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    }
}

// Initialize contact form if on contact page
if (document.getElementById('contact-form')) {
    initContactForm();
}


// Accessibility enhancements
function initAccessibility() {
    // Detect keyboard navigation
    detectKeyboardNavigation();
    
    // Update ARIA attributes for mobile menu
    updateMobileMenuAria();
    
    // Add keyboard support for interactive elements
    addKeyboardSupport();
    
    // Update aria-current for active navigation
    updateAriaCurrent();
}

// Detect when user is navigating with keyboard
function detectKeyboardNavigation() {
    let isKeyboardNav = false;
    
    // Detect Tab key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            isKeyboardNav = true;
            document.body.classList.add('keyboard-nav');
        }
    });
    
    // Detect mouse click
    document.addEventListener('mousedown', function() {
        isKeyboardNav = false;
        document.body.classList.remove('keyboard-nav');
    });
}

// Update ARIA attributes for mobile menu
function updateMobileMenuAria() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Update aria-expanded when menu toggles
        const originalClickHandler = mobileMenuBtn.onclick;
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = !mobileMenu.classList.contains('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded.toString());
        });
    }
}

// Add keyboard support for interactive elements
function addKeyboardSupport() {
    // Add Enter/Space key support for elements with role="button"
    document.querySelectorAll('[role="button"]').forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
        
        // Make sure it's focusable
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
    
    // Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                closeMobileMenu();
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.focus(); // Return focus to button
                }
            }
        }
    });
}

// Update aria-current for active navigation links
function updateAriaCurrent() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

// Initialize accessibility features
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccessibility);
} else {
    initAccessibility();
}
