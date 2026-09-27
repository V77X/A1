// =============================================
// SLIDER FUNCTIONALITY
// =============================================
const toolsSlider = document.getElementById('toolsSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const scrollAmount = 320; // Width of one card + gap

function scrollSlider(direction) {
    toolsSlider.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
    });
}

prevBtn.addEventListener('click', () => scrollSlider('prev'));
nextBtn.addEventListener('click', () => scrollSlider('next'));

// Auto-scroll indicator
toolsSlider.addEventListener('scroll', () => {
    const scrollLeft = toolsSlider.scrollLeft;
    const scrollWidth = toolsSlider.scrollWidth - toolsSlider.clientWidth;
    
    prevBtn.style.opacity = scrollLeft === 0 ? '0.5' : '1';
    nextBtn.style.opacity = scrollLeft >= scrollWidth - 10 ? '0.5' : '1';
});

// =============================================
// SMOOTH SCROLL FOR NAVIGATION
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// BUTTON CLICK HANDLERS
// =============================================
document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// =============================================
// CARD CLICK HANDLERS
// =============================================
document.querySelectorAll('.slider-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('.card-title').textContent;
        console.log('Card clicked:', title);
        // Add your navigation logic here
    });
});

// =============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// =============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// =============================================
// KEYBOARD NAVIGATION
// =============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') scrollSlider('prev');
    if (e.key === 'ArrowRight') scrollSlider('next');
});

// =============================================
// CONSOLE WELCOME MESSAGE
// =============================================
console.log('%cWelcome to Volo! 🚀', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
console.log('%cA premium glassmorphism platform', 'font-size: 14px; color: #8b5cf6;');

// =============================================
// PARALLAX EFFECT ON SCROLL
// =============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const elements = document.querySelectorAll('.hero-image');
    
    elements.forEach(element => {
        element.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

// =============================================
// MOBILE MENU TOGGLE (Optional)
// =============================================
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
}

// =============================================
// DARK MODE TOGGLE (Optional)
// =============================================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Load saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// =============================================
// FORM VALIDATION
// =============================================
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        // Add your form submission logic here
    });
});

// =============================================
// ACTIVE LINK INDICATOR
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// =============================================
// PERFORMANCE OPTIMIZATION
// =============================================
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
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// =============================================
// TOUCH SUPPORT FOR SLIDER
// =============================================
let isDown = false;
let startX;
let scrollLeft;

toolsSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - toolsSlider.offsetLeft;
    scrollLeft = toolsSlider.scrollLeft;
});

toolsSlider.addEventListener('mouseleave', () => {
    isDown = false;
});

toolsSlider.addEventListener('mouseup', () => {
    isDown = false;
});

toolsSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - toolsSlider.offsetLeft;
    const walk = (x - startX) * 1;
    toolsSlider.scrollLeft = scrollLeft - walk;
});

// =============================================
// SMOOTH PAGE LOAD ANIMATION
// =============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-out';
});

// =============================================
// UTILITY FUNCTIONS
// =============================================

// Debounce function for scroll events
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

// Throttle function for performance
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

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard!');
    }).catch(() => {
        console.log('Failed to copy');
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

// =============================================
// CUSTOM SCROLLBAR COLOR ANIMATION
// =============================================
window.addEventListener('scroll', throttle(() => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const scrollbar = document.querySelector('::-webkit-scrollbar-thumb');
    
    if (scrollPercentage > 50) {
        document.documentElement.style.setProperty('--scrollbar-color', '#8b5cf6');
    } else {
        document.documentElement.style.setProperty('--scrollbar-color', '#3b82f6');
    }
}, 100));

// =============================================
// FEATURE DETECTION
// =============================================
console.log('Browser Capabilities:');
console.log('Backdrop Filter Support:', CSS.supports('backdrop-filter', 'blur(10px)'));
console.log('Gradient Support:', CSS.supports('background', 'linear-gradient(45deg, #fff, #000)'));
console.log('Animation Support:', CSS.supports('animation', 'test 1s infinite'));

// =============================================
// ERROR HANDLING
// =============================================
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Add error logging to your server here
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
