/* ==========================================================================
   Triveraa Sonkupi Eco Resort — Interactions
   ========================================================================== */

'use strict';

/* ---------- Nav links (split left / right of the centered logo) ---------- */
const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'overview', label: 'Overview' },
  { id: 'scenic', label: 'Explore' },
  { id: 'culture', label: 'Culture' },
  { id: 'cuisine', label: 'Dining' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

const leftCount = Math.ceil(navLinks.length / 2);
const leftLinks = navLinks.slice(0, leftCount);
const rightLinks = navLinks.slice(leftCount);

function buildNav(container, links) {
  const ul = document.createElement('ul');
  links.forEach(({ id, label }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + id;
    a.className = 'nav-link';
    a.dataset.target = id;
    a.textContent = label;
    li.appendChild(a);
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

const navLeft = document.getElementById('navLeft');
const navRight = document.getElementById('navRight');
buildNav(navLeft, leftLinks);
buildNav(navRight, rightLinks);

/* ---------- Header scroll state ---------- */
const header = document.getElementById('header');

function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
}
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById('menuToggle');
const headNavs = document.querySelectorAll('.nav');

function closeMenu() {
  headNavs.forEach((n) => n.classList.remove('open'));
  menuToggle.classList.remove('active');
}

// Mobile: merge both lists into a single dropdown
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  document.body.classList.toggle('nav-open');
  menuToggle.classList.toggle('open', document.body.classList.contains('nav-open'));
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    menuToggle.classList.remove('open');
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.header') && document.body.classList.contains('nav-open')) {
    document.body.classList.remove('nav-open');
    menuToggle.classList.remove('open');
  }
});

/* ---------- Active nav link highlight ---------- */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollPos = window.scrollY + 140;
  let currentId = 'home';

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.getAttribute('id');
    }
  });

  allNavLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.target === currentId);
  });
}

/* ---------- Stat counters ---------- */
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

function animateStat(card) {
  const num = card.querySelector('.stat-num');
  const target = parseInt(num.dataset.count, 10) || 0;
  const duration = 1600;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    num.childNodes[0].textContent = Math.floor(ease * target);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll(
  '.about-grid, .highlights, .split, .heritage-grid, .explore-head, .explore-card, .stat-card, .menu-item, .g-item, .culture-panel'
);
revealEls.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('stat-card')) animateStat(entry.target);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach((el) => revealObserver.observe(el));

/* ---------- Explore horizontal scroll ---------- */
const exploreTrack = document.getElementById('exploreTrack');
const expPrev = document.getElementById('expPrev');
const expNext = document.getElementById('expNext');
if (exploreTrack && expPrev && expNext) {
  expNext.addEventListener('click', () => exploreTrack.scrollBy({ left: 232, behavior: 'smooth' }));
  expPrev.addEventListener('click', () => exploreTrack.scrollBy({ left: -232, behavior: 'smooth' }));
}

/* ---------- Contact form ---------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your inquiry! We will get back to you soon.');
    this.reset();
  });
}

onScroll();