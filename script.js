// SEO Tools Company Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTestimonialsCarousel();
    initScrollAnimations();
    initNavigationHighlighting();
    initSmoothScrolling();
    initMobileMenu();
    initLazyLoading();
    initAccessibilityFeatures();
});

// Testimonials Carousel
function initTestimonialsCarousel() {
    const wrapper = document.querySelector('.testimonials-wrapper');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentIndex = 0;
    const totalTestimonials = 3;

    if (!wrapper || dots.length === 0) return;

    function updateCarousel(index) {
        const translateX = -index * 100;
        wrapper.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }

    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
        });
    });

    // Auto-advance carousel
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % totalTestimonials;
        updateCarousel(nextIndex);
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all sections for reveal animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });

    // Observe service cards for staggered animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Navigation Highlighting
function initNavigationHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveNavLink(id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    function updateActiveNavLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile Menu (if needed for future expansion)
function initMobileMenu() {
    // Placeholder for mobile menu functionality
    // This can be expanded when mobile navigation is needed
    console.log('Mobile menu initialized');
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.classList.add('loaded');
        });
    }
}

// Accessibility Features
function initAccessibilityFeatures() {
    // Keyboard navigation for testimonials
    const dots = document.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const wrapper = document.querySelector('.testimonials-wrapper');
                const translateX = -index * 100;
                wrapper.style.transform = `translateX(${translateX}%)`;
                
                // Update active dot
                dots.forEach((d, i) => {
                    d.classList.toggle('active', i === index);
                });
            }
        });
    });

    // Skip to main content link (for screen readers)
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Focus management for modal-like elements
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or dropdowns
            const activeElements = document.querySelectorAll('.active');
            activeElements.forEach(element => {
                if (element.classList.contains('modal') || element.classList.contains('dropdown')) {
                    element.classList.remove('active');
                }
            });
        }
    });
}

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle scroll events
const throttledScrollHandler = debounce(() => {
    // Handle scroll-based animations efficiently
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Service card hover effects enhancement
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// CTA button enhancement
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Example usage:
    // trackEvent('button_click', { button: 'cta', section: 'hero' });
    // trackEvent('scroll', { section: 'services' });
}

// Track important user interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track CTA button clicks
    const ctaButton = document.querySelector('button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            trackEvent('cta_click', { location: 'hero' });
        });
    }
    
    // Track service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceName = card.querySelector('h3').textContent;
            trackEvent('service_click', { service: serviceName });
        });
    });
    
    // Track navigation clicks
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const section = link.getAttribute('href').substring(1);
            trackEvent('navigation_click', { section: section });
        });
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Console log for development
console.log('SEO Tools Company website loaded successfully!');