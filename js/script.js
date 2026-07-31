// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav ul');
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// Accommodation data
const accommodations = {
  cottage: {
    name: 'Cottage',
    icon: 'fa-home',
    price: '₹3,500',
    desc: 'Cozy cottage surrounded by flowering gardens. Perfect for couples seeking romance and tranquility.'
  },
  tent: {
    name: 'Tent',
    icon: 'fa-campground',
    price: '₹2,500',
    desc: 'Experience glamping at its finest. Sleep under the stars with modern camping comforts.'
  },
  'premium-cottage': {
    name: 'Premium Cottage',
    icon: 'fa-crown',
    price: '₹6,500',
    desc: 'Spacious premium villa with private lake view. Ideal for families and special occasions.'
  }
};

// Modal elements
const modal = document.getElementById('bookingModal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalIcon = document.querySelector('.modal-icon i');
const accTypeInput = document.getElementById('accommodationType');

// Open modal
function openModal(type) {
  const acc = accommodations[type];
  if (!acc) return;
  modalTitle.textContent = `Book ${acc.name}`;
  modalDesc.textContent = acc.desc;
  modalPrice.textContent = acc.price;
  modalIcon.className = `fas ${acc.icon}`;
  accTypeInput.value = type;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  document.getElementById('bookingForm').reset();
}

modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Book buttons
document.querySelectorAll('.btn-book').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.acc-card');
    const type = card.dataset.accommodation;
    openModal(type);
  });
});

// Click on card opens modal
document.querySelectorAll('.acc-card').forEach(card => {
  card.addEventListener('click', () => {
    openModal(card.dataset.accommodation);
  });
});

// Footer accommodation links
document.querySelectorAll('[data-accommodation]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(link.dataset.accommodation);
  });
});

// Booking form submit
document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const accName = accommodations[accTypeInput.value]?.name || '';
  alert(`Thank you! Your booking request for ${accName} has been received. We will confirm availability shortly.`);
  closeModal();
});

// Contact form submit
document.querySelector('.contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for your inquiry! We will get back to you soon.');
  this.reset();
});

// Smooth reveal on scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.acc-card, .gallery-item, .contact-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});