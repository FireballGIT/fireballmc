// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const fireOverlay = document.getElementById('fireOverlay');

// External links
const externalLinks = {
    'youtube': 'https://youtube.com/@FireballMC_YT',
    'reddit': 'https://reddit.com/r/bagstudios'
};

// Initialize the application
function init() {
    setupNavigation();
    setupFireEffects();
    setupParticleSystem();
}

// Navigation System
function setupNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const section = item.dataset.section;
            
            // Handle external links
            if (externalLinks[section]) {
                window.open(externalLinks[section], '_blank');
                return;
            }
            
            // Switch sections with fire transition
            switchSection(section);
        });
    });
}

function switchSection(targetSection) {
    // Create fire transition effect
    fireOverlay.classList.add('active');
    
    setTimeout(() => {
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from nav items
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Show target section
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.classList.add('active');
        }
        
        // Update active nav item
        const activeNavItem = document.querySelector(`[data-section="${targetSection}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
        
        // Remove fire overlay
        setTimeout(() => {
            fireOverlay.classList.remove('active');
        }, 100);
        
    }, 400);
}

// Fire Effects System
function setupFireEffects() {
    // Create floating fire particles
    createFireParticles();
    
    // Add flame flicker to titles
    const fireTitles = document.querySelectorAll('.fire-title');
    fireTitles.forEach(title => {
        title.addEventListener('mouseenter', createFlameBurst);
    });
}

function createFireParticles() {
    const particleCount = 20;
    const mainContent = document.querySelector('.main-content');
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'fire-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: radial-gradient(circle, #ff6b35 0%, #ff9a5a 50%, transparent 100%);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            z-index: 1;
        `;
        
        mainContent.appendChild(particle);
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    const duration = Math.random() * 4000 + 2000;
    const delay = Math.random() * 2000;
    
    setTimeout(() => {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.opacity = '0.8';
        
        const animation = particle.animate([
            { transform: 'translateY(0) scale(1)', opacity: 0.8 },
            { transform: `translateY(-${Math.random() * 300 + 100}px) scale(0)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            animateParticle(particle);
        };
    }, delay);
}

function createFlameBurst(event) {
    const element = event.target;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const flame = document.createElement('div');
        flame.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #ff6b35 0%, #ffd166 50%, transparent 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
        `;
        
        document.body.appendChild(flame);
        
        flame.animate([
            { transform: 'scale(0) translateY(0)', opacity: 1 },
            { transform: `scale(1.5) translateY(-30px)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => flame.remove();
    }
}

// Particle System for Interactive Effects
function setupParticleSystem() {
    // Add click effects
    document.addEventListener('click', (e) => {
        if (e.target.closest('.stat-card, .milestone, .video-card')) {
            createClickParticles(e.clientX, e.clientY);
        }
    });
}

function createClickParticles(x, y) {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #ffd166;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = Math.random() * 50 + 30;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }
}

// Progress Bar Animation
function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            }
        });
    });
    
    progressFills.forEach(fill => observer.observe(fill));
}

// Stat Counter Animation
function animateStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseFloat(finalValue.replace(/
