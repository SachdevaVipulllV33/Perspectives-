// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '60px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'linear-gradient(135deg, #ff6b9d, #667eea)';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '1rem';
        navMenu.style.gap = '0.5rem';
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.style.display = 'none';
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simulate form submission
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon!`);
        
        // Reset form
        contactForm.reset();
    });
}

// Add to Cart functionality
const addToCartButtons = document.querySelectorAll('.btn-secondary');
let cartCount = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        cartCount++;
        
        // Get product name
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
        // Show feedback
        button.textContent = '✓ Added to Cart';
        button.style.backgroundColor = '#90EE90';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '';
        }, 2000);
        
        console.log(`${productName} added to cart. Total items: ${cartCount}`);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations - fade in elements as they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
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

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scroll down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scroll up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

navbar.style.transition = 'transform 0.3s ease';

// Add sparkle effect on click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary')) {
        createSparkles(e.pageX, e.pageY);
    }
});

function createSparkles(x, y) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.textContent = '✨';
        
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        const duration = 1000 + Math.random() * 500;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress > 1) {
                sparkle.remove();
                return;
            }
            
            sparkle.style.opacity = 1 - progress;
            sparkle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${-progress * 100}px)`;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Easter egg: konami code for surprise message
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            showEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function showEasterEgg() {
    alert('🎉 You found the Blingy Tumblers secret code! 🎉\n\nUse code SPARKLE20 for 20% off your first order!');
}
