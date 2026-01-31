// Premium Futuristic Portfolio - JavaScript

// Current language state
let currentLang = 'en';

// Translations
const translations = {
  en: {
    phrases: [
      'Machine Learning Engineer',
      'AI Research Enthusiast', 
      'Deep Learning Developer',
      'Data Science Specialist'
    ]
  },
  id: {
    phrases: [
      'Insinyur Machine Learning',
      'Peneliti Kecerdasan Buatan',
      'Pengembang Deep Learning', 
      'Spesialis Data Science'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Loading Screen
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1500);

  // Neural Network Canvas Animation
  initNeuralNetwork();

  // Typing Animation
  initTypingAnimation();

  // Scroll Reveal Animations
  initScrollReveal();

  // Mobile Menu
  initMobileMenu();

  // Smooth Scroll for Navigation
  initSmoothScroll();

  // Contact Form
  initContactForm();

  // Language Toggle
  initLanguageToggle();

  // Theme Toggle
  initThemeToggle();
});

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const html = document.documentElement;
  
  // Check for saved user preference, if any, on load of the website
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icons
    const isDark = theme === 'dark';
    document.querySelectorAll('.sun-icon').forEach(el => el.classList.toggle('hidden', !isDark)); // Show sun in dark mode (to switch to light)
    document.querySelectorAll('.moon-icon').forEach(el => el.classList.toggle('hidden', isDark)); // Show moon in light mode (to switch to dark)
  }

  function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
}

// Neural Network Background
function initNeuralNetwork() {
  const canvas = document.getElementById('neural-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(100, 181, 246, 0.4)';
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(100, 181, 246, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  resize();
  init();
  animate();

  window.addEventListener('resize', () => {
    resize();
    init();
  });
}

// Typing Animation
let typingTimeout;
function initTypingAnimation() {
  const typedText = document.getElementById('typed-text');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const phrases = translations[currentLang].phrases;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typedText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    typingTimeout = setTimeout(type, typeSpeed);
  }

  setTimeout(type, 1000);
}

// Scroll Reveal
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// Mobile Menu
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  });
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    const subject = encodeURIComponent('Portfolio Contact: ' + data.name);
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
    const recipient = 'elsandeputra890@gmail.com';

    // Device detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    } else {
      // Desktop: Open Gmail in browser
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank');
    }
    
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = currentLang === 'en' ? 'Message Sent!' : 'Pesan Terkirim!';
    btn.style.background = '#64B5F6';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// Language Toggle
function initLanguageToggle() {
  const langToggle = document.getElementById('lang-toggle');
  const langToggleMobile = document.getElementById('lang-toggle-mobile');

  function switchLanguage(lang) {
    currentLang = lang;
    
    // Update toggle buttons
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    // Update all translatable elements
    document.querySelectorAll('[data-en][data-id]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        el.innerHTML = text;
      }
    });

    // Clear and restart typing animation
    clearTimeout(typingTimeout);
    const typedText = document.getElementById('typed-text');
    typedText.textContent = '';
    initTypingAnimation();
  }

  function handleToggleClick(e) {
    const option = e.target.closest('.lang-option');
    if (option && option.dataset.lang !== currentLang) {
      switchLanguage(option.dataset.lang);
    }
  }

  if (langToggle) langToggle.addEventListener('click', handleToggleClick);
  if (langToggleMobile) langToggleMobile.addEventListener('click', handleToggleClick);
}

// Navigation background on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 100) {
    nav.classList.add('nav-scrolled');
    nav.classList.remove('bg-nav'); // Remove the Tailwind class to let CSS take over if needed, or just let CSS precedence work
  } else {
    nav.classList.remove('nav-scrolled');
    nav.classList.add('bg-nav');
  }
});
