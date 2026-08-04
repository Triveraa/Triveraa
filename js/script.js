/* ==========================================================================
   Triveraa Sonkupi Eco Resort — Interactions
   ========================================================================== */

'use strict';

/* ---------- Header scroll state ---------- */
const header = document.getElementById('header');

function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

function closeMenu() {
  nav.classList.remove('open');
}

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  nav.classList.toggle('open');
});

document.querySelectorAll('#nav a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
    closeMenu();
  }
});

/* ---------- Active nav link highlight ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

function updateActiveLink() {
  const scrollPos = window.scrollY + 120;
  let currentId = 'home';

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
  });
}

/* ---------- Stat counters: normalise "1000+" into data-count + <i .plus> ---------- */
document.querySelectorAll('.stat-num').forEach((num) => {
  const fullText = num.textContent.trim();
  const parts = fullText.match(/^(\d+)(\+)?$/);
  if (parts) {
    num.textContent = '';
    num.dataset.count = parts[1];
    if (parts[2]) {
      const plus = document.createElement('i');
      plus.className = 'plus';
      plus.textContent = '+';
      num.appendChild(plus);
    }
  }
});

function animateStat(statCard) {
  const num = statCard.querySelector('.stat-num');
  const target = parseInt(num.dataset.count, 10) || 0;
  const duration = 1600;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    num.childNodes[0].textContent = Math.floor(ease * target);
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }
  requestAnimationFrame(tick);
}

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll(
  '.about-grid, .highlights, .split, .explore-head, .explore-card, .stat-card, .menu-item, .g-item, .culture-panel, .contact-form-box'
);

revealEls.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('stat-card')) {
          animateStat(entry.target);
        }
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ---------- Explore horizontal scroll ---------- */
const exploreTrack = document.getElementById('exploreTrack');
const expPrev = document.getElementById('expPrev');
const expNext = document.getElementById('expNext');

const step = () => 232;

if (exploreTrack && expPrev && expNext) {
  expNext.addEventListener('click', () => {
    exploreTrack.scrollBy({ left: step(), behavior: 'smooth' });
  });
  expPrev.addEventListener('click', () => {
    exploreTrack.scrollBy({ left: -step(), behavior: 'smooth' });
  });
}

/* ---------- Contact form submit ---------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your inquiry! We will get back to you soon.');
    this.reset();
  });
}

onScroll();