// =============================================
// MODERN PORTFOLIO WEBSITE - JAVASCRIPT
// Author: Baskar's Portfolio
// =============================================

// =============================================
// NAVIGATION & SCROLL EFFECTS
// =============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll and active link indicator
window.addEventListener('scroll', () => {
    let currentSection = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// =============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// =============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill progress bars
document.querySelectorAll('.skill-progress').forEach(element => {
    observer.observe(element);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(element => {
    element.classList.add('slide-in-bottom');
    observer.observe(element);
});

// Observe about content
const aboutText = document.querySelector('.about-text');
if (aboutText) {
    observer.observe(aboutText);
}

// =============================================
// SCROLL INDICATOR
// =============================================

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });

    // Hide scroll indicator when scrolled
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0.5';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// =============================================
// FORM HANDLING
// =============================================

const contactForm = document.getElementById('contactForm');
const formNotice = document.getElementById('formNotice');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            showFormNotice('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormNotice('Please enter a valid email address', 'error');
            return;
        }

        // Show success message (in a real application, you'd send the form to a backend)
        showFormNotice('✓ Message sent successfully! I will get back to you soon.', 'success');

        // Reset form
        contactForm.reset();

        // Log form data (in production, send to backend)
        console.log({
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString()
        });
    });
}

function showFormNotice(message, type) {
    formNotice.textContent = message;
    formNotice.className = `form-notice ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formNotice.textContent = '';
        formNotice.className = 'form-notice';
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// =============================================
// DYNAMIC SKILL PROGRESS ANIMATION
// =============================================

const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar && !progressBar.classList.contains('animated')) {
                progressBar.classList.add('animated');
                const targetWidth = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
            }
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// =============================================
// FLOATING CARDS INTERACTION
// =============================================

const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
        this.style.transform = 'scale(1) rotate(0)';
    });
});

// =============================================
// TYPING ANIMATION (Optional Enhancement)
// =============================================

function typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// =============================================
// DARK MODE TOGGLE (Optional Enhancement)
// =============================================

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function applyColorScheme(isDark) {
    if (isDark) {
        document.documentElement.style.colorScheme = 'dark';
    } else {
        document.documentElement.style.colorScheme = 'light';
    }
}

// Apply based on system preference
applyColorScheme(prefersDarkScheme.matches);

// Listen for changes
prefersDarkScheme.addEventListener('change', ({ matches }) => {
    applyColorScheme(matches);
});

// =============================================
// PARALLAX EFFECT (Optional Enhancement)
// =============================================

function parallax() {
    const elements = document.querySelectorAll('.about-image, .hero-visual');
    
    elements.forEach(element => {
        const scrollPosition = window.scrollY;
        const elementPosition = element.offsetTop;
        
        if (window.scrollY <= elementPosition + window.innerHeight) {
            element.style.transform = `translateY(${(scrollPosition - elementPosition) * 0.5}px)`;
        }
    });
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(parallax);
}, { passive: true });

// =============================================
// PAGE LOADING ANIMATION
// =============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// =============================================
// UTILITY FUNCTIONS
// =============================================

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Get current scroll position
function getCurrentScroll() {
    return window.scrollY || document.documentElement.scrollTop;
}

// =============================================
// ANALYTICS & TRACKING (Optional)
// =============================================

// Track page views
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully');
    console.log('User Agent:', navigator.userAgent);
    console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);
});

// Track navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const target = link.getAttribute('href').slice(1);
        console.log(`Navigated to: ${target}`);
    });
});

// =============================================
// KEYBOARD NAVIGATION
// =============================================

document.addEventListener('keydown', (e) => {
    // Scroll to next section with arrow down
    if (e.key === 'ArrowDown') {
        const sections = Array.from(document.querySelectorAll('section'));
        const currentIndex = sections.findIndex(s => {
            const rect = s.getBoundingClientRect();
            return rect.top < window.innerHeight * 0.3;
        });

        if (currentIndex < sections.length - 1) {
            sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// =============================================
// ACCESSIBILITY ENHANCEMENTS
// =============================================

// Add aria-labels to icon-only buttons
document.querySelectorAll('a[href*="linkedin"]').forEach(link => {
    link.setAttribute('aria-label', 'Visit LinkedIn profile');
});

document.querySelectorAll('a[href*="github"]').forEach(link => {
    link.setAttribute('aria-label', 'Visit GitHub profile');
});

// =============================================
// PERFORMANCE OPTIMIZATION
// =============================================

// Lazy load images (if any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Debounce scroll event
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-related operations here
    });
}, { passive: true });

// =============================================
// INITIALIZATION
// =============================================

console.log('✨ Portfolio website initialized successfully!');
