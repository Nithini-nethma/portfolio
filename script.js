// Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Hero Background Particles
function resizeHeroCanvas() {
    const canvas = document.getElementById('hero-bg');
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function animateHeroParticles() {
    const canvas = document.getElementById('hero-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const particles = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: 8 + Math.random() * 12,
            dx: (Math.random() - 0.5) * 0.7,
            dy: (Math.random() - 0.5) * 0.7,
            color: `rgba(0,255,255,${0.15 + Math.random() * 0.25})`
        });
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            // Move
            p.x += p.dx;
            p.y += p.dy;

            // Bounce off edges
            if (p.x < 0 || p.x > w) p.dx *= -1;
            if (p.y < 0 || p.y > h) p.dy *= -1;
        }
        requestAnimationFrame(draw);
    }
    draw();
}

// Typing Animation (Multiple Roles)
const roles = ["Front-end Developer", "UI/UX Designer", "Database Manager"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTitle = document.getElementById("typed-title");

function typeRole() {
    if (!typedTitle) return;

    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typedTitle.textContent = currentRole.substring(0, charIndex--);
    } else {
        typedTitle.textContent = currentRole.substring(0, charIndex++);
    }

    let speed = isDeleting ? 80 : 120;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000; // pause before deleting
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeRole, speed);
}

// Skills Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = width;
        }, 300);
    });
}

// Intersection Observer for Skills
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('✅ Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// On Page Load
window.addEventListener('DOMContentLoaded', () => {
    resizeHeroCanvas();
    animateHeroParticles();
    typeRole(); // <-- Starts typing animation

    // Hero image animation
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        setTimeout(() => {
            heroImage.classList.add('animated');
        }, 300);
    }

    // Profile image shake on click
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('click', () => {
            profileImg.classList.add('shake');
            setTimeout(() => {
                profileImg.classList.remove('shake');
            }, 500);
        });
    }
});

// Re-animate background on resize
window.addEventListener('resize', () => {
    resizeHeroCanvas();
    animateHeroParticles();
});
