// ============================================
// LUXURY SLIDER FUNCTIONALITY
// ============================================

const collectionSlider = document.getElementById('collectionSlider');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
const sliderDotsContainer = document.getElementById('sliderDots');

let currentSlide = 0;
const slideWidth = 350; // Card width + gap

// Create dots for slider
function initializeDots() {
    const cardsCount = collectionSlider.querySelectorAll('.collection-card').length;
    for (let i = 0; i < cardsCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        sliderDotsContainer.appendChild(dot);
    }
}

// Navigate to specific slide
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
}

// Update slider position and dots
function updateSlider() {
    collectionSlider.scrollTo({
        left: currentSlide * slideWidth,
        behavior: 'smooth'
    });

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Previous slide
sliderPrev.addEventListener('click', () => {
    const maxSlides = collectionSlider.querySelectorAll('.collection-card').length;
    currentSlide = currentSlide > 0 ? currentSlide - 1 : maxSlides - 1;
    updateSlider();
});

// Next slide
sliderNext.addEventListener('click', () => {
    const maxSlides = collectionSlider.querySelectorAll('.collection-card').length;
    currentSlide = currentSlide < maxSlides - 1 ? currentSlide + 1 : 0;
    updateSlider();
});

// Initialize dots on page load
document.addEventListener('DOMContentLoaded', initializeDots);

// ============================================
// SMOOTH NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// BUTTON CLICK EFFECTS
// ============================================

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';

        // Press animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// ============================================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.collection-card, .advantage-card, .testimonial-card').forEach(card => {
    observer.observe(card);
});

// ============================================
// CARD HOVER EFFECTS
// ============================================

document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s ease';
    });

    card.addEventListener('click', function() {
        const title = this.querySelector('.card-title-luxury').textContent;
        console.log('Selected:', title);
        // Add navigation logic here
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============================================
// ACTIVE NAV LINK
// ============================================

const navLinks = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        sliderPrev.click();
    } else if (e.key === 'ArrowRight') {
        sliderNext.click();
    }
});

// ============================================
// TOUCH SUPPORT FOR SLIDER
// ============================================

let touchStartX = 0;
let touchEndX = 0;

collectionSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

collectionSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchStartX - touchEndX > swipeThreshold) {
        sliderNext.click();
    }
    
    if (touchEndX - touchStartX > swipeThreshold) {
        sliderPrev.click();
    }
}

// ============================================
// FORM HANDLING
// ============================================

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');
        // Add your form submission logic here
    });
});

// ============================================
// DEBOUNCE & THROTTLE UTILITIES
// ============================================

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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// DYNAMIC ELEMENT LOADING
// ============================================

function loadMoreCards() {
    const slider = document.getElementById('collectionSlider');
    // Add logic to load more cards
    console.log('Loading more cards...');
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard');
    });
}

// Get element offset
function getElementOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
    };
}

// Smooth scroll to element
function scrollToElement(selector, offset = 0) {
    const element = document.querySelector(selector);
    if (element) {
        const top = getElementOffset(element).top - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%cAETHER - Luxury Platform', 'font-size: 24px; font-weight: bold; color: #d4af37;');
console.log('%cPrecision Crafted Design', 'font-size: 14px; color: #888888;');

// ============================================
// LOCAL STORAGE - USER PREFERENCES
// ============================================

// Save user preferences
function savePreference(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Get user preferences
function getPreference(key) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
}

// ============================================
// ACCESSIBILITY FEATURES
// ============================================

// Focus trap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}
