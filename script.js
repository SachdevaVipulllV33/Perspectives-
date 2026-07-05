// Mobile menu toggle with proper touch support
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
    hamburger.addEventListener('touchend', toggleMobileMenu);
}

function toggleMobileMenu(e) {
    e.preventDefault();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form submission with proper mobile handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Log submission
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon!`);
        
        // Reset form
        contactForm.reset();
    });
}

// Add to Cart functionality with proper touch support
const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cartCount = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', handleAddToCart);
    button.addEventListener('touchend', handleAddToCart);
});

function handleAddToCart(e) {
    e.preventDefault();
    cartCount++;
    
    // Get product name
    const productCard = this.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    
    // Show feedback
    const originalText = this.textContent;
    this.textContent = '✓ Added!';
    this.style.backgroundColor = '#90EE90';
    
    // Reset button after 2 seconds
    setTimeout(() => {
        this.textContent = originalText;
        this.style.backgroundColor = '';
    }, 2000);
    
    console.log(`${productName} added to cart. Total items: ${cartCount}`);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Scroll animations - fade in elements as they come into view
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards and sections
document.querySelectorAll('.product-card, .custom-content, .about-text, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Prevent double-tap zoom on iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Blingy Tumblers website loaded successfully!');
});