/* Minimal interaction — no framework, no bloat */

// Gentle reveal on scroll (intersection observer)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.product-tile, .note-card, .day-step, .quality-text, .hero-copy').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';
  el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
  revealObserver.observe(el);
});

// When revealed, apply class that resets styles
const style = document.createElement('style');
style.textContent = `
.revealed { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(style);

// Nav scroll shadow hint
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  const y = window.scrollY;
  if (y > 10) {
    nav.style.borderBottomColor = 'rgba(18,18,18,0.12)';
  } else {
    nav.style.borderBottomColor = 'rgba(18,18,18,0.06)';
  }
  lastScroll = y;
}, { passive: true });
