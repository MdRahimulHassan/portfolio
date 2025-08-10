// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Update active link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Initialize active link on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Intersection Observer for animations
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

// Animate elements on scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .stat');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');

    // Form validation
    function validateForm() {
        let isValid = true;
        
        formInputs.forEach(input => {
            const value = input.value.trim();
            
            // Remove previous error styling
            input.classList.remove('error');
            
            // Check if field is empty
            if (value === '') {
                input.classList.add('error');
                isValid = false;
            }
            
            // Email validation
            if (input.type === 'email' && value !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    input.classList.add('error');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send the form data to your server here
            console.log('Form submitted successfully');
        } else {
            showNotification('Please fill in all fields correctly.', 'error');
        }
    });
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(300px);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add error styles to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .contact-form input.error,
    .contact-form textarea.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .nav-link.active {
        color: #2563eb !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    const originalHTML = element.innerHTML;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                // Handle HTML tags
                const tagEnd = text.indexOf('>', i);
                if (tagEnd !== -1) {
                    element.innerHTML += text.substring(i, tagEnd + 1);
                    i = tagEnd + 1;
                }
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }
    
    // Extract text content for typing, preserve HTML structure
    const textContent = element.textContent || element.innerText || '';
    element.textContent = '';
    
    let textIndex = 0;
    function typeText() {
        if (textIndex < textContent.length) {
            element.textContent += textContent.charAt(textIndex);
            textIndex++;
            setTimeout(typeText, speed);
        } else {
            // Restore original HTML after typing is complete
            element.innerHTML = originalHTML;
        }
    }
    
    typeText();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setTimeout(() => {
            typeWriter(heroTitle, heroTitle.textContent, 80);
        }, 1000);
    }
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button dynamically
function addScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Scroll to top');
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
    `;
    
    button.addEventListener('click', scrollToTop);
    
    button.addEventListener('mouseenter', () => {
        button.style.background = '#1d4ed8';
        button.style.transform = window.pageYOffset > 300 ? 'translateY(0) scale(1.1)' : 'translateY(100px) scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = '#2563eb';
        button.style.transform = window.pageYOffset > 300 ? 'translateY(0) scale(1)' : 'translateY(100px) scale(1)';
    });
    
    document.body.appendChild(button);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
            button.style.transform = 'translateY(0)';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
            button.style.transform = 'translateY(100px)';
        }
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTopButton);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.3;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skills animation on scroll
function animateSkills() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((skill, index) => {
        skill.style.animationDelay = `${index * 0.1}s`;
        skill.classList.add('animate-in');
    });
}

// Project cards hover effects
function initProjectHovers() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
            }
        }, 50);
    });
}

// Initialize stats animation when about section is in view
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                animateSkills();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    statsObserver.observe(aboutSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading screen after a short delay
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }, 500);
});

// Initialize project hover effects
document.addEventListener('DOMContentLoaded', initProjectHovers);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Enter key on nav links
    if (e.key === 'Enter' && e.target.classList.contains('nav-link')) {
        e.target.click();
    }
});

// Add dynamic year to footer
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.footer p');
    if (footer) {
        footer.innerHTML = footer.innerHTML.replace('2025', new Date().getFullYear());
    }
});

// Performance optimization - throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateActiveNavLink();
}, 100));

// Console message for developers
console.log('%c👋 Hello Developer!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio code!', 'color: #6b7280; font-size: 14px;');
console.log('%cFeel free to reach out if you have any questions.', 'color: #6b7280; font-size: 14px;');

// Error handling for missing elements
if (!hamburger || !navMenu) {
    console.warn('Navigation elements not found. Some features may not work.');
}

// Add some additional CSS for animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .skill-tag {
        animation-fill-mode: both;
    }
    
    .loaded {
        overflow-x: hidden;
    }
    
    /* Focus styles for accessibility */
    .nav-link:focus,
    .btn:focus,
    .social-link:focus,
    .project-link:focus {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
    }
    
    /* Smooth transitions for all interactive elements */
    .nav-link,
    .btn,
    .social-link,
    .project-link,
    .skill-tag,
    .project-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(additionalStyles);