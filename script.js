'use strict';

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// ===== SCROLL ANIMATIONS =====
const fadeTargets = document.querySelectorAll(
  '.esp-card, .local-card, .plano-item, .contato-card, .sobre-text, .sobre-image'
);

fadeTargets.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeTargets.forEach(el => observer.observe(el));


// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const activeSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeSectionObserver.observe(s));

// ===== SMOOTH SCROLL POLYFILL FOR OLDER MOBILE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== VILA NOVA CAROUSEL =====
(function () {
  let current = 0;
  let touchStartX = 0;

  const grid = document.querySelector('.vila-grid');
  const prevBtn = document.querySelector('.vila-carousel-prev');
  const nextBtn = document.querySelector('.vila-carousel-next');
  const dots = Array.from(document.querySelectorAll('.vila-dot'));
  const slides = grid ? Array.from(grid.querySelectorAll('.vila-photo')) : [];

  if (!grid || slides.length === 0) return;

  function goTo(index) {
    current = ((index % slides.length) + slides.length) % slides.length;
    grid.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  grid.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  grid.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  goTo(0);
}());

// ===== WHATSAPP MENU TOGGLE =====
const whatsappMenuToggle = document.querySelector('.whatsapp-menu-toggle');
const whatsappMenuOptions = document.querySelector('.whatsapp-menu-options');

if (whatsappMenuToggle && whatsappMenuOptions) {
  whatsappMenuToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = whatsappMenuOptions.classList.toggle('open');
    whatsappMenuToggle.setAttribute('aria-expanded', String(isOpen));
    whatsappMenuOptions.setAttribute('aria-hidden', String(!isOpen));
  });

  whatsappMenuOptions.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  document.addEventListener('click', () => {
    whatsappMenuOptions.classList.remove('open');
    whatsappMenuToggle.setAttribute('aria-expanded', 'false');
    whatsappMenuOptions.setAttribute('aria-hidden', 'true');
  });
}

