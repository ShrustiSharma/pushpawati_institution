/* ============================================
   PUSHPAWATI INSTITUTIONS - JavaScript
   Smooth navigation and interactive features
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlideshow();
    initNavigation();
    initModal();
    initSmoothScroll();
    initCarouselHover();
    initStudentCards();
});

// ===== HERO SLIDESHOW =====
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 4500; // 4.5 seconds
    let slideshowInterval = null;

    function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    }

    function startSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
        slideshowInterval = setInterval(nextSlide, slideInterval);
    }

    // Start the slideshow
    startSlideshow();

    // Optional: Pause slideshow on hover for better UX
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            if (slideshowInterval) {
                clearInterval(slideshowInterval);
            }
        });
        
        heroSection.addEventListener('mouseleave', () => {
            startSlideshow();
        });
    }
}

// ===== MOBILE NAVIGATION MENU =====
function initNavigation() {
    const navToggle = document.querySelector('.navbar-toggle');
    const navLinks = document.getElementById('primary-nav');
    const navLinksItems = navLinks?.querySelectorAll('a');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            
            // Prevent body scroll when menu is open on mobile
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        if (navLinksItems) {
            navLinksItems.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                });
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('open') && 
                !navLinks.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===== CONTACT MODAL =====
function initModal() {
    const contactModal = document.getElementById('contact-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const contactNavLink = document.querySelector('a[href="#contact"]');

    function openContactModal() {
        if (!contactModal) return;
        contactModal.classList.add('active');
        contactModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Move focus to close button for accessibility
        if (closeModalBtn) {
            closeModalBtn.focus();
        }
    }

    function closeContactModal() {
        if (!contactModal) return;
        contactModal.classList.remove('active');
        contactModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Return focus to the triggering link if present
        if (contactNavLink) {
            contactNavLink.focus();
        }
    }

    if (contactNavLink && contactModal && closeModalBtn) {
        contactNavLink.addEventListener('click', function(e) {
            e.preventDefault();
            openContactModal();
        });

        closeModalBtn.addEventListener('click', closeContactModal);

        // Close modal when clicking outside the modal content
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                closeContactModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && contactModal.classList.contains('active')) {
                closeContactModal();
            }
        });
    }
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or a modal trigger
            if (href === '#' || href === '#contact') {
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 72; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== CAROUSEL HOVER EFFECT =====
function initCarouselHover() {
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        carouselTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
}

// ===== STUDENT CARDS INTERACTIVITY =====
function initStudentCards() {
    const studentCards = document.querySelectorAll('.student-card');
    studentCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            studentCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
        });
    });
}

// ===== SCROLL ANIMATIONS (Optional Enhancement) =====
// Intersection Observer for fade-in animations on scroll
if ('IntersectionObserver' in window) {
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

    // Observe elements that should animate on scroll
    document.querySelectorAll('.course-card, .student-card, .about-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
} 