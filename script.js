// Calculate days until November 1, 2025
function calculateDaysRemaining() {
    const targetDate = new Date('2025-11-01');
    const today = new Date();
    const timeDiff = targetDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
}

// Update the days remaining display
function updateDaysRemaining() {
    const daysElement = document.getElementById('days-remaining');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (daysElement) {
        const daysLeft = calculateDaysRemaining();
        daysElement.textContent = daysLeft;

        // Trigger fade-in animation after content is set
        if (scrollIndicator) {
            scrollIndicator.style.animation = 'fadeIn 0.6s ease-in-out forwards';
        }
    }
}

// Initialize days remaining on page load
document.addEventListener('DOMContentLoaded', function() {
    updateDaysRemaining();
    
    // Handle hero image loading
    const heroSection = document.querySelector('.hero');
    const heroImage = new Image();
    heroImage.src = 'img/hero-warehouses.jpg';
    
    heroImage.onload = function() {
        heroSection.classList.add('loaded');
    };
    
    // If image is already cached
    if (heroImage.complete) {
        heroSection.classList.add('loaded');
    }
});


// Hide/show navigation on scroll for desktop only
let lastScrollTop = 0;
const navigation = document.querySelector('.navigation');
let isHoveringNav = false;

// Detect if device has touch capability
const hasTouchCapability = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function updateNavVisibility() {
    // For touch-capable devices, always show navigation
    // For non-touch devices >= 768px, apply hide/show behavior
    if (hasTouchCapability) {
        // Touch devices always show navigation
        navigation.style.transform = 'translateY(0)';
    } else if (window.innerWidth < 768) {
        // Small screens always show navigation
        navigation.style.transform = 'translateY(0)';
    } else {
        // Desktop without touch: hide/show based on scroll/hover
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100 || isHoveringNav) {
            // Show navigation when scrolled down or hovering
            navigation.style.transform = 'translateY(0)';
        } else {
            // Hide navigation at the top of the page
            navigation.style.transform = 'translateY(-100%)';
        }
        
        lastScrollTop = scrollTop;
    }
}

// Mouse hover detection for navigation area
navigation.addEventListener('mouseenter', function() {
    isHoveringNav = true;
    updateNavVisibility();
});

navigation.addEventListener('mouseleave', function() {
    isHoveringNav = false;
    updateNavVisibility();
});

// Detect mouse near top of screen to show nav (only for non-touch devices)
if (!hasTouchCapability) {
    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth >= 768) {
            if (e.clientY < 60) {
                isHoveringNav = true;
                updateNavVisibility();
            } else if (e.clientY > 100 && !navigation.contains(e.target)) {
                isHoveringNav = false;
                updateNavVisibility();
            }
        }
    });
}

// Initial setup
updateNavVisibility();

// Listen for scroll events
window.addEventListener('scroll', updateNavVisibility);
window.addEventListener('resize', updateNavVisibility);

// Smooth scroll for navigation links and scroll indicator
document.querySelectorAll('nav a, .scroll-indicator').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Check if hamburger menu is visible (mobile/tablet)
                const isHamburgerVisible = window.innerWidth <= 767 ||
                                          !window.matchMedia('(hover: hover)').matches ||
                                          !window.matchMedia('(pointer: fine)').matches;

                // No offset needed when hamburger is visible, 60px offset for desktop nav
                const headerOffset = isHamburgerVisible ? 0 : 60;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});


// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('active');
    });
});

// Add fade-in animation on scroll
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

// Apply animation to timeline items only
document.querySelectorAll('.timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Lightbox functionality for full-width images
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImage');
    const closeBtn = document.querySelector('.lightbox-close');
    
    // Add click event to all clickable-image elements
    document.querySelectorAll('.clickable-image').forEach(img => {
        img.addEventListener('click', function() {
            modal.classList.add('active');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal when clicking the X
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === modalImg) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
});
